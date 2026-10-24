// Builds web-ready copies of the client's portfolio photography and video.
//
//   node scripts/build-portfolio.mjs            # process new/changed images
//   node scripts/build-portfolio.mjs --videos   # also encode web videos (needs FFmpeg)
//   node scripts/build-portfolio.mjs --sheets   # also write contact sheets (for curation)
//   node scripts/build-portfolio.mjs --only=<slug>
//
// The originals in portfolio-originals/ are READ ONLY — never moved, renamed or
// modified. For every image this writes two resized, EXIF-rotated WebP copies
// to public/portfolio-web/<slug>/, and a per-project manifest to
// src/data/portfolio/<slug>.json listing every image (with dimensions, so the
// gallery can respect each photo's own proportions) plus any videos found.
// Manifests are loaded lazily, one project at a time (see data/portfolio.js).
//
// Videos listed in VIDEOS below get a web copy at
// public/portfolio-web/videos/<slug>/<name>.mp4 (H.264/AAC, ≤1080p,
// "faststart" so playback begins before the whole file downloads), and the
// manifest points at that copy — the site never serves the originals.
// Encoding needs FFmpeg (on PATH, or set FFMPEG_PATH); already web-ready
// small files are copied as-is.
//
// PDFs and anything else that isn't a photo or video are ignored. A project
// whose folder doesn't exist yet is skipped with a warning; add the folder
// and re-run.

import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
// Kept outside public/ so Vite never copies the multi-GB masters into dist/.
const SRC_DIR = path.join(ROOT, "portfolio-originals");
const OUT_DIR = path.join(ROOT, "public", "portfolio-web");
const MANIFEST_DIR = path.join(ROOT, "src", "data", "portfolio");
const SHEETS_DIR = process.env.SHEETS_DIR || path.join(ROOT, ".portfolio-sheets");

// slug (matches data/projects.js) → source folders inside portfolio-originals/.
// `group` labels images from multi-folder projects (Bahrban).
const PROJECTS = {
  "house-82b": [{ dir: "82B" }],
  "house-84c": [{ dir: "84C" }],
  "house-87b": [{ dir: "87B" }],
  "bahrban-hunza": [
    { dir: "BAHRBAN/AERIAL VIDEOGRAPHY", group: "aerial" },
    { dir: "BAHRBAN/WORK IN PROGRESS", group: "progress" },
    // BAHRBAN/ECATALOG (PDFs, logo) is intentionally excluded.
  ],
  "stone-villa": [{ dir: "BTK - STONE HOUSE" }],
  "box-home": [{ dir: "Box home" }],
  "casa-solara": [{ dir: "CASA SOLARA" }],
  "courtyard-home": [{ dir: "COURTYARD HOME" }],
  "mahum-offices": [{ dir: "MAHUM OFFICES I" }],
  "marine-tower-offices": [{ dir: "Marine Tower Office" }],
  "pool-house": [{ dir: "Pool House" }],
  "tabbani-house": [{ dir: "Tabbani House" }],
  vsurfaces: [{ dir: "VSurfaces" }],
};

// Original video (path inside portfolio-originals/) → web copy name.
// `copy: true` = already small and web-ready (H.264, faststart): copied as-is.
const VIDEOS = {
  "82B/Mahum Builders Fashion Film FHD 1080p Version.mp4": { name: "house-82b-fashion-film" },
  "BAHRBAN/AERIAL VIDEOGRAPHY/LOCATION & KKH ACCESSBILITY VIEW.MOV": { name: "bahrban-location-aerial" },
  "CASA SOLARA/CASA SOLARA VIDEO.mp4": { name: "casa-solara-project-film" },
  "VSurfaces/WhatsApp Video 2024-11-21 at 5.28.43 PM.mp4": { name: "vsurfaces-project-video", copy: true },
};
// Original images (path inside portfolio-originals/) left off the site at the
// client's request. They stay in the archive but get no web copy and no
// manifest entry.
const EXCLUDE = new Set([
  "CASA SOLARA/11.jpg",
]);

const FFMPEG = process.env.FFMPEG_PATH || "ffmpeg";

const SIZES = { large: 2000, thumb: 960 };
const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const VIDEO_EXT = new Set([".mp4", ".mov", ".webm", ".m4v"]);

const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });
const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "image";
// Repo-relative path of an original file, recorded in the manifest for
// reference only — originals are never served by the site.
const originalPath = (rel) => `portfolio-originals/${rel}`;

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function isFresh(out, srcStat) {
  try {
    return (await fs.stat(out)).mtimeMs >= srcStat.mtimeMs;
  } catch {
    return false;
  }
}

async function processImage(srcPath, outBase) {
  const srcStat = await fs.stat(srcPath);
  const largeOut = `${outBase}-${SIZES.large}.webp`;
  const thumbOut = `${outBase}-${SIZES.thumb}.webp`;

  if (!(await isFresh(largeOut, srcStat)) || !(await isFresh(thumbOut, srcStat))) {
    const input = sharp(srcPath, { failOn: "none" }).rotate(); // apply EXIF orientation
    await Promise.all([
      input
        .clone()
        .resize({ width: SIZES.large, height: SIZES.large, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 78 })
        .toFile(largeOut),
      input
        .clone()
        .resize({ width: SIZES.thumb, withoutEnlargement: true })
        .webp({ quality: 72 })
        .toFile(thumbOut),
    ]);
  }
  const { width, height } = await sharp(largeOut).metadata();
  return { w: width, h: height, largeOut, thumbOut };
}

// Reads a video's display size from its MP4/QuickTime track header ("tkhd")
// without decoding it. The header can sit at either end of the file, so only
// the first and last few MB are scanned. Returns null if not found.
async function videoSize(file) {
  const handle = await fs.open(file, "r");
  try {
    const { size } = await handle.stat();
    const chunk = Math.min(size, 8 * 1024 * 1024);
    const read = async (pos) => {
      const buf = Buffer.alloc(chunk);
      await handle.read(buf, 0, chunk, pos);
      return buf;
    };
    for (const buf of [await read(0), await read(Math.max(size - chunk, 0))]) {
      for (let i = buf.indexOf("tkhd"); i !== -1; i = buf.indexOf("tkhd", i + 4)) {
        const boxSize = buf.readUInt32BE(i - 4);
        const end = i - 4 + boxSize;
        if (boxSize < 84 || end > buf.length) continue;
        const w = buf.readUInt32BE(end - 8) >>> 16;
        const h = buf.readUInt32BE(end - 4) >>> 16;
        if (w && h) return { w, h };
      }
    }
    return null;
  } finally {
    await handle.close();
  }
}

// Web copy of one video. Encodes (or copies) it when --videos is passed;
// otherwise uses a copy made on an earlier run. Returns the manifest entry,
// or null if there's no web copy yet — the original is never referenced.
async function buildVideo(slug, rel, srcPath) {
  const config = VIDEOS[rel];
  if (!config) {
    console.warn(`  ! ${slug}: video "${rel}" has no entry in VIDEOS — skipped`);
    return null;
  }
  const outDir = path.join(OUT_DIR, "videos", slug);
  const out = path.join(outDir, `${config.name}.mp4`);

  if (process.argv.includes("--videos") && !(await isFresh(out, await fs.stat(srcPath)))) {
    await fs.mkdir(outDir, { recursive: true });
    const tmp = `${out}.part.mp4`;
    if (config.copy) {
      await fs.copyFile(srcPath, tmp);
    } else {
      console.log(`  … encoding ${rel}`);
      // H.264 High / yuv420p plays everywhere. CRF 22 keeps architectural
      // detail; the 4 Mbps cap (≈ streaming-service 1080p) replaces the
      // 20–45 Mbps editing-master bitrates and keeps every file well under
      // GitHub's 100 MB per-file limit. Never upscales; anything wider than
      // 1920 (e.g. the 2.7K drone clip) comes down to 1080p.
      const args = [
        "-hide_banner", "-loglevel", "error", "-stats", "-y",
        "-i", srcPath,
        "-map", "0:v:0", "-map", "0:a:0?",
        "-vf", "scale='min(1920,iw)':-2",
        "-c:v", "libx264", "-preset", "slow", "-crf", "22",
        "-profile:v", "high", "-pix_fmt", "yuv420p",
        "-maxrate", "4M", "-bufsize", "8M",
        "-c:a", "aac", "-b:a", "128k", "-ac", "2",
        "-movflags", "+faststart",
        tmp,
      ];
      const run = spawnSync(FFMPEG, args, { stdio: "inherit" });
      if (run.error || run.status !== 0) {
        await fs.rm(tmp, { force: true });
        throw new Error(`FFmpeg failed on ${rel}: ${run.error?.message ?? `exit ${run.status}`}`);
      }
    }
    await fs.rename(tmp, out);
  }

  if (!(await exists(out))) {
    console.warn(`  ! ${slug}: no web copy of "${rel}" yet — run with --videos (left out of the manifest)`);
    return null;
  }
  const [srcStat, outStat] = await Promise.all([fs.stat(srcPath), fs.stat(out)]);
  const mb = (b) => (b / 1048576).toFixed(1);
  console.log(`  ▶ ${config.name}.mp4 — ${mb(srcStat.size)} MB → ${mb(outStat.size)} MB`);
  return {
    src: `/portfolio-web/videos/${slug}/${config.name}.mp4`,
    ...(await videoSize(out)),
    original: originalPath(rel),
  };
}

async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (next < items.length) {
        const i = next++;
        results[i] = await fn(items[i], i);
      }
    })
  );
  return results;
}

async function contactSheet(slug, images) {
  const tile = 300;
  const labelH = 26;
  const cols = 6;
  const rows = Math.ceil(images.length / cols);
  const composites = await Promise.all(
    images.map(async (img, i) => {
      const buf = await sharp(path.join(ROOT, "public", img.thumb))
        .resize(tile, tile, { fit: "contain", background: "#ffffff" })
        .toBuffer();
      return { input: buf, left: (i % cols) * tile, top: Math.floor(i / cols) * (tile + labelH) };
    })
  );
  const labels = images
    .map((img, i) => {
      const x = (i % cols) * tile + 6;
      const y = Math.floor(i / cols) * (tile + labelH) + tile + 18;
      const name = img.id.replace(/&/g, "&amp;").replace(/</g, "&lt;").slice(0, 40);
      return `<text x="${x}" y="${y}" font-family="Arial" font-size="15" fill="#000">${i}: ${name}</text>`;
    })
    .join("");
  const width = cols * tile;
  const height = rows * (tile + labelH);
  composites.push({
    input: Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">${labels}</svg>`),
    left: 0,
    top: 0,
  });
  await fs.mkdir(SHEETS_DIR, { recursive: true });
  await sharp({ create: { width, height, channels: 3, background: "#ffffff" } })
    .composite(composites)
    .jpeg({ quality: 80 })
    .toFile(path.join(SHEETS_DIR, `${slug}.jpg`));
}

async function buildProject(slug, sources) {
  const images = [];
  const videos = [];
  const usedIds = new Set();
  let foundAny = false;

  for (const { dir, group } of sources) {
    const abs = path.join(SRC_DIR, dir);
    if (!(await exists(abs))) {
      console.warn(`  ! ${slug}: folder "${dir}" not found — skipped`);
      continue;
    }
    foundAny = true;
    const files = (await fs.readdir(abs, { withFileTypes: true }))
      .filter((d) => d.isFile())
      .map((d) => d.name)
      .sort(collator.compare);

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (VIDEO_EXT.has(ext)) {
        const video = await buildVideo(slug, `${dir}/${file}`, path.join(abs, file));
        if (video) videos.push(video);
        continue;
      }
      if (!IMAGE_EXT.has(ext)) continue; // PDFs, etc.
      if (EXCLUDE.has(`${dir}/${file}`)) continue;

      let id = slugify((group ? `${group}-` : "") + path.parse(file).name);
      for (let n = 2; usedIds.has(id); n++) id = `${slugify(path.parse(file).name)}-${n}`;
      usedIds.add(id);
      images.push({ id, file: `${dir}/${file}`, group, abs: path.join(abs, file) });
    }
  }

  if (!foundAny) return null;

  const outDir = path.join(OUT_DIR, slug);
  await fs.mkdir(outDir, { recursive: true });

  const processed = await mapLimit(images, 4, async (img) => {
    const { w, h } = await processImage(img.abs, path.join(outDir, img.id));
    const base = `/portfolio-web/${slug}/${img.id}`;
    return {
      id: img.id,
      ...(img.group && { group: img.group }),
      src: `${base}-${SIZES.large}.webp`,
      thumb: `${base}-${SIZES.thumb}.webp`,
      w,
      h,
      original: originalPath(img.file),
    };
  });

  const manifest = { slug, images: processed, videos };
  await fs.mkdir(MANIFEST_DIR, { recursive: true });
  await fs.writeFile(path.join(MANIFEST_DIR, `${slug}.json`), JSON.stringify(manifest, null, 2) + "\n");

  if (process.argv.includes("--sheets")) await contactSheet(slug, processed);
  return manifest;
}

const only = process.argv.find((a) => a.startsWith("--only="))?.slice(7);
for (const [slug, sources] of Object.entries(PROJECTS)) {
  if (only && only !== slug) continue;
  const t = Date.now();
  const m = await buildProject(slug, sources);
  if (m) {
    console.log(
      `✓ ${slug}: ${m.images.length} images, ${m.videos.length} video(s) — ${((Date.now() - t) / 1000).toFixed(1)}s`
    );
  }
}
