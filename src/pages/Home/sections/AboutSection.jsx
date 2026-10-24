import Reveal from "../../../components/Reveal/Reveal";
import Photo from "../../../components/Photo/Photo";
import Button from "../../../components/Button/Button";
import { images } from "../../../data/images";

export default function AboutSection() {
  return (
    <section className="py-10 sm:py-14 lg:py-16">
      <div className="container-edit grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="order-2 aspect-[4/3] overflow-hidden lg:order-1 lg:aspect-auto lg:h-full lg:max-h-[420px]">
          <Photo
            src={images.homeIntro.src}
            srcSet={`${images.homeIntro.src} 960w, ${images.homeIntro.large} 2000w`}
            sizes="(min-width: 1024px) 50vw, 100vw"
            alt={images.homeIntro.alt}
            fallback={images.homeIntro.fallback}
            className="h-full w-full"
          />
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="eyebrow">About MAHUM</span>
            <h2 className="text-balance mt-5 text-[clamp(2rem,4vw,3.25rem)] font-medium text-[color:var(--color-ink)]">
              Building in Karachi since 1988
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="mt-7 space-y-5 text-[1.0625rem] leading-relaxed text-[color:var(--color-mist)]">
            <p>
              MAHUM was founded in 1988 by Hasan Mustafa, a civil engineer from NED University. Since then
              the company has completed more than 300 residential and commercial projects.
            </p>
            <p>
              We handle a project from start to finish: the land, design, approvals, construction,
              finishing and utility connections. Our architects, engineers and project managers stay on the
              job until handover, so the client deals with one company throughout.
            </p>
          </Reveal>
          <Reveal delay={0.16} className="mt-9">
            <Button to="/about" variant="text">
              More About MAHUM
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
