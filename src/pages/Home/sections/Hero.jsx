import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import Photo from "../../../components/Photo/Photo";
import Button from "../../../components/Button/Button";
import { images } from "../../../data/images";
import { company } from "../../../data/nav";

export default function Hero() {
  const scope = useRef(null);

  // One deliberate, high-impact GSAP moment for the hero reveal — everything
  // else on the site uses the subtler Framer Motion section reveals.
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !scope.current) return undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.set(".hero-word", { yPercent: 110 })
        .set(".hero-figure", { scale: 1.08, opacity: 0 })
        .set(".hero-fade", { opacity: 0, y: 16 })
        .to(".hero-figure", { opacity: 1, scale: 1, duration: 1.4 }, 0.1)
        .to(".hero-word", { yPercent: 0, duration: 1.1, stagger: 0.09 }, 0.35)
        .to(".hero-fade", { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, 0.9);
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={scope} className="relative flex min-h-[100svh] items-end overflow-hidden bg-[color:var(--color-ink)] text-[color:var(--color-paper)]">
      <div className="absolute inset-0">
        <Photo
          src={images.heroExterior.src}
          alt={images.heroExterior.alt}
          fallback={images.heroExterior.fallback}
          zoom={false}
          loading="eager"
          className="hero-figure h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-ink)] via-[color:var(--color-ink)]/45 to-[color:var(--color-ink)]/25" />
        {/* Independent top scrim so the fixed header stays legible regardless
            of how bright the underlying photo is, even before the section's
            main gradient has much effect near the very top. */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[color:var(--color-ink)]/70 to-transparent sm:h-48" />
      </div>

      <div className="container-edit relative w-full pb-16 pt-40 sm:pb-24 sm:pt-48">
        <p className="hero-fade eyebrow mb-6 text-[color:var(--color-mist-light)]">
          Est. {company.foundedYear} · Karachi
        </p>

        <h1 className="max-w-4xl text-[clamp(2.75rem,7.5vw,6rem)] font-medium leading-[1.02]">
          <span className="block overflow-hidden">
            <span className="hero-word block">Where Innovation</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-word block">Meets Legacy</span>
          </span>
        </h1>

        <div className="hero-fade mt-10 flex flex-col items-start justify-between gap-8 border-t border-[color:var(--color-line-dark)] pt-8 sm:flex-row sm:items-end">
          <p className="max-w-md text-[1.0625rem] leading-relaxed text-[color:var(--color-mist-light)]">
            A real estate development and construction firm delivering turn-key residential, commercial
            and hospitality projects across Pakistan for over three decades.
          </p>
          <div className="flex shrink-0 items-center gap-4">
            <Button to="/projects" variant="inverse">
              View Our Work
            </Button>
            <Button to="/contact" variant="ghost" className="!border-[color:var(--color-line-dark)] !text-[color:var(--color-paper)] hover:!border-[color:var(--color-paper)]">
              Contact
            </Button>
          </div>
        </div>
      </div>

      <a
        href="#at-a-glance"
        className="absolute bottom-8 right-6 hidden items-center gap-2 text-xs uppercase tracking-[0.14em] text-[color:var(--color-mist-light)] sm:right-10 sm:flex"
      >
        Scroll
        <ArrowUpRight size={13} className="rotate-90" />
      </a>
    </section>
  );
}
