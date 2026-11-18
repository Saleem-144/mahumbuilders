import Reveal from "../../../components/Reveal/Reveal";
import Button from "../../../components/Button/Button";
import StatsStrip from "../../../components/StatsStrip/StatsStrip";

// Who MAHUM is, in the client's approved words, followed by the key figures.
export default function AboutSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-edit">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <p className="index-label mb-4 text-[color:var(--color-mist)]">About MAHUM</p>
            <h2 className="text-balance text-[clamp(1.75rem,3vw,2.625rem)] font-normal leading-[1.12] text-[color:var(--color-ink)]">
              Building in Karachi since 1988
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="space-y-5 text-[0.9375rem] leading-relaxed text-[color:var(--color-mist)] lg:col-span-6 lg:col-start-7">
            <p>
              MAHUM was founded in 1988 by Hasan Mustafa, a civil engineer from NED University. Since then
              the company has completed more than 300 residential and commercial projects.
            </p>
            <p>
              We handle a project from start to finish: the land, design, approvals, construction,
              finishing and utility connections. Our architects, engineers and project managers stay on the
              job until handover, so the client deals with one company throughout.
            </p>
            <div className="pt-2">
              <Button to="/about" variant="text">
                More About MAHUM
              </Button>
            </div>
          </Reveal>
        </div>

        <StatsStrip className="mt-12 sm:mt-14" />
      </div>
    </section>
  );
}
