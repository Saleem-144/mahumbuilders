import { cn } from "../../lib/cn";
import Reveal from "../Reveal/Reveal";

/**
 * The client's own project film(s), shown after the gallery, served from the
 * site's own web copies (public/portfolio-web/videos/). preload="metadata"
 * fetches only the small header (the copies are encoded "faststart"); the
 * film itself downloads when the visitor presses play. Never autoplays.
 */
export default function ProjectVideo({ videos, poster, title }) {
  if (!videos?.length) return null;

  return (
    <section className="pb-16 sm:pb-24">
      <div className="container-edit">
        <Reveal className="mb-8 flex items-baseline justify-between gap-6 border-t border-[color:var(--color-line)] pt-6 sm:mb-10">
          <span className="eyebrow">{videos.length > 1 ? "Project Films" : "Project Film"}</span>
        </Reveal>

        <div className="flex flex-col gap-10 sm:gap-14">
          {videos.map((video) => {
            // Frame matches the film's own proportions (read at build time),
            // so the poster fills it without cropping the film; if the size is
            // unknown the film is letterboxed instead. Tall videos are capped by height.
            const ratio = video.w && video.h ? video.w / video.h : 16 / 9;
            return (
              <Reveal
                key={video.src}
                as="figure"
                className="mx-auto w-full max-w-5xl"
                style={{ maxWidth: ratio < 1 ? `min(100%, calc(78svh * ${ratio}))` : undefined }}
              >
                <div className="overflow-hidden bg-[color:var(--color-ink)]" style={{ aspectRatio: ratio }}>
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    poster={poster}
                    className={cn("h-full w-full", video.w && video.h ? "object-cover" : "object-contain")}
                    aria-label={`${title} — ${video.label}`}
                  >
                    <source src={video.src} type="video/mp4" />
                  </video>
                </div>
                <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                  <span className="font-display text-lg font-medium text-[color:var(--color-ink)]">{video.label}</span>
                  <span className="eyebrow">{title}</span>
                </figcaption>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
