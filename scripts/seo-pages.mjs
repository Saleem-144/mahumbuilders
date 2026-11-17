// Vite build plugin: after the app is built, writes
//   - one HTML file per page and project (dist/about.html,
//     dist/projects/<slug>.html, ...) with that page's title, description,
//     canonical URL and share preview already filled in, so Google and
//     WhatsApp/Facebook link previews see the right details without running
//     the app (Vercel's `cleanUrls` serves /about from about.html);
//   - a 1200×630 JPEG share image per project (dist/og/<slug>.jpg);
//   - dist/sitemap.xml listing every page;
//   - dist/404.html, shown by Vercel (with a 404 status) for unknown paths.
// Page data comes from src/data/seo.js and src/data/projects.js.

import fs from "node:fs/promises";
import path from "node:path";
import { createServer } from "vite";
import sharp from "sharp";

const escape = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function setMeta(html, key, value) {
  const re = new RegExp(`(<meta\\s+(?:name|property)="${key}"\\s+content=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`seo-pages: <meta ${key}> not found in index.html`);
  return html.replace(re, `$1${escape(value)}$2`);
}

function fillHead(html, { title, description, url, imageUrl, imageAlt }) {
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${escape(url)}$2`);
  html = setMeta(html, "description", description);
  html = setMeta(html, "og:title", title);
  html = setMeta(html, "og:description", description);
  html = setMeta(html, "og:url", url);
  html = setMeta(html, "og:image", imageUrl);
  html = setMeta(html, "og:image:alt", imageAlt);
  html = setMeta(html, "twitter:title", title);
  html = setMeta(html, "twitter:description", description);
  html = setMeta(html, "twitter:image", imageUrl);
  html = setMeta(html, "twitter:image:alt", imageAlt);
  return html;
}

export default function seoPages() {
  let root;
  let outDir;
  return {
    name: "mahum-seo-pages",
    apply: "build",
    configResolved(config) {
      root = config.root;
      outDir = path.resolve(root, config.build.outDir);
    },
    async closeBundle() {
      // Load the site's own data modules (they use Vite features such as
      // import.meta.glob, so they're loaded through a throwaway Vite server).
      const server = await createServer({
        root,
        configFile: false,
        logLevel: "error",
        appType: "custom",
        server: { middlewareMode: true, hmr: false },
      });
      let seo, projects;
      try {
        seo = await server.ssrLoadModule("/src/data/seo.js");
        ({ projects } = await server.ssrLoadModule("/src/data/projects.js"));
      } finally {
        await server.close();
      }

      const template = await fs.readFile(path.join(outDir, "index.html"), "utf8");
      const pages = [
        ...Object.entries(seo.PAGES).map(([route, page]) => ({ route, ...page, image: seo.DEFAULT_IMAGE })),
        ...projects.map((project) => {
          const meta = seo.projectSeo(project);
          return { route: meta.path, ...meta, coverFile: project.cover.large ?? project.cover.src };
        }),
      ];

      await fs.mkdir(path.join(outDir, "og"), { recursive: true });
      for (const page of pages) {
        if (page.coverFile) {
          // Share images must be JPEG/PNG for WhatsApp and Facebook.
          await sharp(path.join(root, "public", page.coverFile))
            .resize(1200, 630, { fit: "cover", position: "attention" })
            .jpeg({ quality: 80, mozjpeg: true })
            .toFile(path.join(outDir, page.image.path));
        }
        const html = fillHead(template, {
          title: page.title,
          description: page.description,
          url: seo.absoluteUrl(page.route),
          imageUrl: seo.absoluteUrl(page.image.path),
          imageAlt: page.image.alt,
        });
        const file = page.route === "/" ? "index.html" : `${page.route.slice(1)}.html`;
        await fs.mkdir(path.dirname(path.join(outDir, file)), { recursive: true });
        await fs.writeFile(path.join(outDir, file), html);
      }

      // Vercel serves 404.html (with a 404 status) for any path that has no
      // file, so unknown URLs get the site's own "Page Not Found" screen: the
      // app boots and renders its NotFound page for the unmatched route.
      let notFound = fillHead(template, {
        title: "Page Not Found | MAHUM Builders",
        description: "The page you're looking for doesn't exist or may have moved.",
        url: seo.absoluteUrl("/"),
        imageUrl: seo.absoluteUrl(seo.DEFAULT_IMAGE.path),
        imageAlt: seo.DEFAULT_IMAGE.alt,
      });
      notFound = setMeta(notFound, "robots", "noindex, follow");
      await fs.writeFile(path.join(outDir, "404.html"), notFound);

      const urls = pages.map((p) => `  <url><loc>${seo.absoluteUrl(p.route)}</loc></url>`).join("\n");
      await fs.writeFile(
        path.join(outDir, "sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
      );
      console.log(`seo-pages: ${pages.length} pages, ${projects.length} share images, sitemap.xml`);
    },
  };
}
