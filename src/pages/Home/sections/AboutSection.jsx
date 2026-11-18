import Reveal from "../../../components/Reveal/Reveal";
import Photo from "../../../components/Photo/Photo";
import Button from "../../../components/Button/Button";
import StatsStrip from "../../../components/StatsStrip/StatsStrip";
import { images } from "../../../data/images";
import { portfolioImage } from "../../../data/portfolio";

const stairHall = portfolioImage("casa-solara", "21", "Casa Solara stair hall, timber treads under a cascading pendant light");

// Opening statement: who MAHUM is in one sentence, the key figures, and a
// pair of photographs set at different scales.
export default function AboutSection() {
  return (
    <section className="py-20 sm:py-28 lg:py-36">
      <div className="container-edit">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-3">
            <p className="index-label flex items-center gap-4 text-[color:var(--color-mist)]">
              <span>01</span>
              <span className="h-px w-8 bg-[color:var(--color-ink)]/25" />
              <span>About MAHUM</span>
            </p>
          </Reveal>
          <div className="lg:col-span-9">
            <Reveal as="p" className="statement text-[clamp(1.875rem,3.6vw,3.375rem)] text-[color:var(--color-ink)]">
              Since 1988, MAHUM has developed and built more than 300 homes and commercial buildings in
              Karachi. <span className="text-[color:var(--color-mist)]">Today we are building our first hotel, in the Hunza valley.</span>
            </Reveal>
            <Reveal delay={0.08} className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">
              <p className="text-[0.9375rem] leading-relaxed text-[color:var(--color-mist)]">
                MAHUM was founded by Hasan Mustafa, a civil engineer from NED University. We handle a
                project from start to finish: the land, design, approvals, construction, finishing and
                utility connections.
              </p>
              <div className="flex items-end sm:justify-end">
                <Button to="/about" variant="text">
                  Our Story
                </Button>
              </div>
            </Reveal>
          </div>
        </div>

        <StatsStrip className="mt-16 sm:mt-24" />

        <div className="mt-16 grid grid-cols-12 gap-4 sm:mt-24 sm:gap-6">
          <Reveal className="col-span-12 sm:col-span-8">
            <Photo
              src={images.homeIntro.src}
              srcSet={`${images.homeIntro.src} 960w, ${images.homeIntro.large} 2000w`}
              sizes="(min-width: 640px) 66vw, 100vw"
              alt={images.homeIntro.alt}
              fallback={images.homeIntro.fallback}
              className="aspect-[3/2] w-full"
            />
            <p className="mt-3 text-xs text-[color:var(--color-mist)]">House 82B, Phase 8, DHA</p>
          </Reveal>
          <Reveal delay={0.1} className="col-span-7 col-start-6 sm:col-span-4 sm:col-start-9 sm:mt-40">
            <Photo
              src={stairHall.src}
              srcSet={`${stairHall.src} 960w, ${stairHall.large} 2000w`}
              sizes="(min-width: 640px) 33vw, 60vw"
              alt={stairHall.alt}
              fallback="Casa Solara"
              className="aspect-[3/4] w-full"
            />
            <p className="mt-3 text-xs text-[color:var(--color-mist)]">Casa Solara, stair hall</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
