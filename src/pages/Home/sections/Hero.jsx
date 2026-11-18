import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Button from "../../../components/Button/Button";
import Arrow from "../../../components/Arrow/Arrow";
import { Link } from "../../../router/Router";
import { company } from "../../../data/nav";
import { INTRO_DELAY } from "../../../lib/intro";

// A 10-second, silent loop cut from the client's own Casa Solara film
// (public/portfolio-web/videos/hero). Phones get a lighter 960px encode.
const VIDEO = {
  desktop: "/portfolio-web/videos/hero/casa-solara-dusk-1600.mp4",
  mobile: "/portfolio-web/videos/hero/casa-solara-dusk-960.mp4",
  poster: "/portfolio-web/videos/hero/casa-solara-dusk-poster.webp",
};

export default function Hero() {
  const scope = useRef(null);
  const video = useRef(null);
  const progress = useRef(null);
  const [reduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // Headline and details rise in once the brand intro has cleared.
  useEffect(() => {
    if (reduced || !scope.current) return undefined;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: INTRO_DELAY });
      tl.set(".hero-line", { yPercent: 110 })
        .set(".hero-fade", { opacity: 0, y: 14 })
        .set(".hero-media", { scale: 1.12 })
        .to(".hero-media", { scale: 1, duration: 2.4, ease: "power2.out" }, 0)
        .to(".hero-line", { yPercent: 0, duration: 1.2, stagger: 0.1 }, 0.15)
        .to(".hero-fade", { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 }, 0.7);
    }, scope);
    return () => ctx.revert();
  }, [reduced]);

  // Thin progress line along the bottom that tracks the loop.
  useEffect(() => {
    const v = video.current;
    if (!v || reduced) return undefined;
    let raf;
    const tick = () => {
      if (progress.current && v.duration) {
        progress.current.style.transform = `scaleX(${v.currentTime / v.duration})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <section
      ref={scope}
      className="grain relative flex h-[100svh] min-h-[600px] flex-col justify-end overflow-hidden bg-[color:var(--color-ink)] text-[color:var(--color-paper)]"
    >
      <div className="hero-media absolute inset-0">
        {reduced ? (
          <img src={VIDEO.poster} alt="" className="h-full w-full object-cover" />
        ) : (
          <video
            ref={video}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={VIDEO.poster}
            aria-hidden="true"
          >
            <source src={VIDEO.mobile} type="video/mp4" media="(max-width: 767px)" />
            <source src={VIDEO.desktop} type="video/mp4" />
          </video>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-ink)] via-[color:var(--color-ink)]/35 to-[color:var(--color-ink)]/25" />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[color:var(--color-ink)]/70 to-transparent" />

      <div className="container-edit relative w-full pb-8 sm:pb-10">
        <p className="hero-fade eyebrow mb-6 text-[color:var(--color-stone)] sm:mb-8">
          Est. {company.foundedYear} · Karachi
        </p>

        <h1 className="text-[clamp(2.6rem,9.5vw,9rem)] font-normal leading-[0.92] tracking-[-0.025em]">
          <span className="block overflow-hidden pb-[0.06em]">
            <span className="hero-line block">Where Innovation</span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <span className="hero-line block">
              Meets <em className="font-normal italic text-[color:var(--color-stone)]">Legacy</em>
            </span>
          </span>
        </h1>

        <div className="hero-fade mt-10 grid grid-cols-1 items-end gap-8 sm:mt-14 lg:grid-cols-[1fr_auto]">
          <p className="max-w-md text-[0.9375rem] leading-relaxed text-[color:var(--color-paper)]/80">
            Real estate development and construction in Karachi since 1988. Homes, offices and hotels,
            built and handed over ready to use.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button to="/projects" variant="inverse">
              View Projects
            </Button>
            <Button to="/contact" variant="ghost-light">
              Inquire
            </Button>
          </div>
        </div>

        {/* Caption bar: what's on screen, and the loop's progress. */}
        <div className="hero-fade mt-10 border-t border-white/15 pt-4 sm:mt-14">
          <div className="flex items-center justify-between gap-6 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-[color:var(--color-paper)]/70">
            <Link to="/projects/casa-solara" className="group inline-flex items-center gap-3 hover:text-[color:var(--color-paper)]">
              <span className="hidden sm:inline">Now showing</span>
              <span className="text-[color:var(--color-paper)]">Casa Solara, Phase 8, DHA</span>
              <Arrow className="hidden sm:block" />
            </Link>
            <span className="hidden items-center gap-3 sm:inline-flex">
              Scroll
              <span className="relative block h-8 w-px overflow-hidden bg-white/20">
                <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2.2s_ease-in-out_infinite] bg-white" />
              </span>
            </span>
          </div>
          <div className="mt-4 h-px w-full bg-white/10">
            <div ref={progress} className="h-px w-full origin-left scale-x-0 bg-white/70" />
          </div>
        </div>
      </div>
    </section>
  );
}
