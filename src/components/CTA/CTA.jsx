import Reveal from "../Reveal/Reveal";
import Photo from "../Photo/Photo";
import Arrow from "../Arrow/Arrow";
import { Link } from "../../router/Router";
import { images } from "../../data/images";
import { company, telHref } from "../../data/nav";

// Closing invitation used at the foot of most pages: a large serif line, one
// clear action, and the direct contact details beside it.
export default function CTA({
  eyebrow = "Let's Build Together",
  title = "Planning a project?",
  description = "Tell us what you want to build and our team will get back to you.",
  ctaLabel = "Get in Touch",
  ctaTo = "/contact",
}) {
  return (
    <section className="grain relative overflow-hidden bg-[color:var(--color-ink)] text-[color:var(--color-paper)]">
      <div className="absolute inset-0 opacity-30">
        <Photo
          src={images.ctaExterior.src}
          srcSet={`${images.ctaExterior.src} 960w, ${images.ctaExterior.large} 2000w`}
          sizes="100vw"
          alt=""
          fallback=""
          zoom={false}
          className="h-full w-full"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--color-ink)] via-[color:var(--color-ink)]/80 to-[color:var(--color-ink)]/40" />

      <div className="container-edit relative py-24 sm:py-32 lg:py-40">
        <Reveal>
          <p className="index-label text-[color:var(--color-stone)]">{eyebrow}</p>
          <h2 className="mt-6 max-w-[14ch] text-[clamp(3rem,8vw,7.5rem)] font-normal leading-[0.95] tracking-[-0.02em]">
            {title}
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="mt-12 grid grid-cols-1 gap-10 border-t border-white/15 pt-8 sm:mt-16 lg:grid-cols-12">
          <p className="max-w-md text-[0.9375rem] leading-relaxed text-[color:var(--color-stone)] lg:col-span-5">{description}</p>
          <div className="flex flex-col gap-1 text-[0.9375rem] lg:col-span-3">
            <a href={telHref(company.phones[0])} className="link-underline w-fit py-1">
              {company.phones[0]}
            </a>
            <a href={`mailto:${company.email}`} className="link-underline w-fit py-1">
              {company.email}
            </a>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link
              to={ctaTo}
              className="group inline-flex items-center gap-5 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-none"
            >
              <span className="link-underline pb-1">{ctaLabel}</span>
              <Arrow className="h-3.5 w-9" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
