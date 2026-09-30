import { useMemo, useState } from "react";
import Reveal from "../Reveal/Reveal";
import Photo from "../Photo/Photo";
import Button from "../Button/Button";
import GalleryOverlay from "../GalleryOverlay/GalleryOverlay";

/**
 * Curated project gallery. `rows` (from data/projects.js) is a hand-picked
 * selection laid out row by row — a single id is a full-width frame, two or
 * three ids share a row. Images in a row are sized by their own aspect ratio
 * so they share one height and are never cropped (full-width frames get at
 * most a light trim to 16:9). On phones every image stacks, uncropped.
 *
 * "View All Images" (only when the project has more than the curated set)
 * opens the full gallery overlay; clicking any curated image opens it on
 * that image.
 */
export default function ProjectGallery({ title, rows, images }) {
  const [overlay, setOverlay] = useState({ open: false, start: null });

  const indexById = useMemo(() => new Map(images.map((img, i) => [img.id, i])), [images]);
  const layout = useMemo(
    () =>
      rows
        .map((row) => row.filter((id) => indexById.has(id)).map((id) => images[indexById.get(id)]))
        .filter((row) => row.length > 0),
    [rows, images, indexById]
  );
  const shown = layout.flat().length;

  if (shown === 0) return null;

  return (
    <section className="pb-16 sm:pb-24">
      <div className="container-edit">
        <Reveal className="mb-8 flex items-baseline justify-between gap-6 border-t border-[color:var(--color-line)] pt-6 sm:mb-10">
          <span className="eyebrow">Project Gallery</span>
          <span className="eyebrow tabular-nums">{images.length} Images</span>
        </Reveal>

        <div className="flex flex-col gap-4 sm:gap-6">
          {layout.map((row, r) => (
            <Reveal key={r} className="flex flex-col gap-4 sm:flex-row sm:gap-6">
              {row.map((img) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setOverlay({ open: true, start: indexById.get(img.id) })}
                  aria-label={`${title} — view image ${indexById.get(img.id) + 1} of ${images.length}`}
                  className="block w-full cursor-zoom-in text-left sm:w-auto"
                  style={{ flex: `${img.w / img.h} 1 0%` }}
                >
                  <Photo
                    src={img.thumb}
                    srcSet={`${img.thumb} 960w, ${img.src} 2000w`}
                    sizes={row.length === 1 ? "(min-width: 1440px) 1312px, 100vw" : `(min-width: 640px) ${Math.round(100 / row.length)}vw, 100vw`}
                    width={img.w}
                    height={img.h}
                    alt=""
                    fallback={title}
                    className="w-full [aspect-ratio:var(--ar)] sm:[aspect-ratio:var(--ar-sm)]"
                    style={{
                      "--ar": `${img.w} / ${img.h}`,
                      // Full-width frames are held to 16:9 at most, so a 3:2
                      // photo doesn't outgrow the screen (a light trim only).
                      "--ar-sm": row.length === 1 ? Math.max(img.w / img.h, 16 / 9) : `${img.w} / ${img.h}`,
                    }}
                  />
                </button>
              ))}
            </Reveal>
          ))}
        </div>

        {images.length > shown && (
          <Reveal className="mt-12 flex justify-center sm:mt-16">
            <Button variant="ghost" onClick={() => setOverlay({ open: true, start: null })}>
              View All {images.length} Images
            </Button>
          </Reveal>
        )}
      </div>

      <GalleryOverlay
        open={overlay.open}
        startIndex={overlay.start}
        images={images}
        title={title}
        onClose={() => setOverlay({ open: false, start: null })}
      />
    </section>
  );
}
