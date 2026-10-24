import PageIntro from "../../components/PageIntro/PageIntro";
import Reveal from "../../components/Reveal/Reveal";
import Photo from "../../components/Photo/Photo";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import StatBlock from "../../components/StatBlock/StatBlock";
import { RevealGroup } from "../../components/Reveal/Reveal";
import Developments from "../../components/Developments/Developments";
import Leadership from "../../components/Leadership/Leadership";
import CTA from "../../components/CTA/CTA";
import { images } from "../../data/images";
import { stats } from "../../data/stats";
import { company } from "../../data/nav";
import { useDocumentTitle } from "../../lib/useDocumentTitle";

export default function About() {
  useDocumentTitle("About Us");

  return (
    <>
      <PageIntro
        eyebrow={`Est. ${company.foundedYear}`}
        title="About MAHUM Builders"
        description="Founded by Hasan Mustafa in 1988, MAHUM develops and builds residential, commercial and hospitality projects in Pakistan."
      />

      {/* Company Introduction */}
      <section className="py-10 sm:py-14 lg:py-16">
        <div className="container-edit grid grid-cols-1 items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="aspect-[4/3] overflow-hidden lg:aspect-auto lg:h-[420px]">
            <Photo
              src={images.aboutIntro.src}
              srcSet={`${images.aboutIntro.src} 960w, ${images.aboutIntro.large} 2000w`}
              sizes="(min-width: 1024px) 50vw, 100vw"
              alt={images.aboutIntro.alt}
              fallback={images.aboutIntro.fallback}
              className="h-full w-full"
            />
          </Reveal>
          <div className="space-y-6 pt-2 text-[1.0625rem] leading-relaxed text-[color:var(--color-mist)] lg:pt-10">
            <Reveal as="p">
              MAHUM is a real estate development and construction company based in Karachi. It was
              established in 1988 by Hasan Mustafa, a civil engineer licensed by the Pakistan Engineering
              Council.
            </Reveal>
            <Reveal as="p" delay={0.06}>
              Since then we have completed more than 300 projects, around 250 residential and 50
              commercial. Some are developments we start ourselves; others are built for private and
              corporate clients.
            </Reveal>
            <Reveal as="p" delay={0.12}>
              Our architects, engineers and project managers work together on every job. We pay close
              attention to build quality and site safety, and we stay with each project until it is handed
              over.
            </Reveal>
          </div>
        </div>
      </section>

      {/* History / Journey */}
      <section className="border-t border-[color:var(--color-line)] bg-[color:var(--color-paper-dim)] py-10 sm:py-14 lg:py-16">
        <div className="container-edit">
          <SectionHeading eyebrow="Our Journey" title="Our History" />

          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-12">
            <Reveal as="div">
              <h3 className="font-display text-xl font-medium text-[color:var(--color-ink)]">How It Started</h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-[color:var(--color-mist)]">
                Hasan Mustafa started MAHUM in 1988 with a single residential project. Over the years the
                company moved into commercial construction, interior work and, more recently, hospitality.
              </p>
            </Reveal>
            <Reveal as="div" delay={0.08}>
              <h3 className="font-display text-xl font-medium text-[color:var(--color-ink)]">What We Build Today</h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-[color:var(--color-mist)]">
                Our work today includes private homes, office buildings and commercial interiors in Karachi.
                Our first hotel, BAHRBAN in Hunza, is currently under construction.
              </p>
            </Reveal>
            <Reveal as="div" delay={0.16}>
              <h3 className="font-display text-xl font-medium text-[color:var(--color-ink)]">How We Work</h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-[color:var(--color-mist)]">
                We agree the scope, materials and schedule with the client before work starts, and we
                supervise our own sites through to handover. The same standards apply whether we are building
                a home or an office.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="border-t border-[color:var(--color-line)] py-10 sm:py-14 lg:py-16">
        <div className="container-edit">
          <p className="eyebrow mb-10">By the Numbers</p>
          <RevealGroup className="grid grid-cols-2 gap-y-10 sm:grid-cols-4">
            {stats.map((s) => (
              <StatBlock key={s.label} {...s} />
            ))}
          </RevealGroup>
        </div>
      </section>

      <Leadership />

      {/* Philosophy / Vision */}
      <section className="border-t border-[color:var(--color-line)] bg-[color:var(--color-ink)] py-10 text-[color:var(--color-paper)] sm:py-14 lg:py-16">
        <div className="container-edit max-w-3xl">
          <Reveal>
            <span className="eyebrow text-[color:var(--color-mist-light)]">Company Philosophy</span>
            <h2 className="text-balance mt-5 text-[clamp(2rem,4.5vw,3.5rem)] font-medium">
              Where Innovation Meets Legacy
            </h2>
            <p className="mt-7 text-[1.0625rem] leading-relaxed text-[color:var(--color-mist-light)]">
              Clients come to us because we take care of the whole project. One team handles the land,
              design, approvals, construction and finishing, so the client has one point of contact and one
              company responsible for the result.
            </p>
          </Reveal>
        </div>
      </section>

      <Developments />

      <CTA />
    </>
  );
}
