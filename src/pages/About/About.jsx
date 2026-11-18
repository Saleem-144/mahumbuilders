import PageIntro from "../../components/PageIntro/PageIntro";
import Reveal from "../../components/Reveal/Reveal";
import { RevealGroup, RevealItem } from "../../components/Reveal/Reveal";
import Photo from "../../components/Photo/Photo";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import StatsStrip from "../../components/StatsStrip/StatsStrip";
import Developments from "../../components/Developments/Developments";
import Leadership from "../../components/Leadership/Leadership";
import CTA from "../../components/CTA/CTA";
import { images } from "../../data/images";
import { company } from "../../data/nav";
import { usePageMeta } from "../../lib/usePageMeta";
import { PAGES } from "../../data/seo";

const HISTORY = [
  {
    title: "How It Started",
    text: "Hasan Mustafa started MAHUM in 1988 with a single residential project. Over the years the company moved into commercial construction, interior work and, more recently, hospitality.",
  },
  {
    title: "What We Build Today",
    text: "Our work today includes private homes, office buildings and commercial interiors in Karachi. Our first hotel, BAHRBAN in Hunza, is currently under construction.",
  },
  {
    title: "How We Work",
    text: "We agree the scope, materials and schedule with the client before work starts, and we supervise our own sites through to handover. The same standards apply whether we are building a home or an office.",
  },
];

export default function About() {
  usePageMeta({ ...PAGES["/about"], path: "/about" });

  return (
    <>
      <PageIntro
        eyebrow={`Est. ${company.foundedYear}`}
        title="About MAHUM Builders"
        description="Founded by Hasan Mustafa in 1988, MAHUM develops and builds residential, commercial and hospitality projects in Pakistan."
      />

      {/* Company introduction */}
      <section className="pb-14 sm:pb-20">
        <div className="container-edit grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <Photo
              src={images.aboutIntro.src}
              srcSet={`${images.aboutIntro.src} 960w, ${images.aboutIntro.large} 2000w`}
              sizes="(min-width: 1024px) 58vw, 100vw"
              alt={images.aboutIntro.alt}
              fallback={images.aboutIntro.fallback}
              className="aspect-[4/3] w-full"
            />
            <p className="mt-3 text-xs text-[color:var(--color-mist)]">Stone Villa, BTK Hills, Bahria Town</p>
          </Reveal>
          <div className="space-y-6 text-[0.9375rem] leading-relaxed text-[color:var(--color-mist)] lg:col-span-4 lg:col-start-9 lg:self-end">
            <Reveal as="p" className="statement text-[clamp(1.25rem,1.8vw,1.5rem)] text-[color:var(--color-ink)]">
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

      {/* History */}
      <section className="bg-[color:var(--color-paper-dim)] py-12 sm:py-16 lg:py-20">
        <div className="container-edit">
          <SectionHeading eyebrow="Our Journey" title="Our History" />
          <RevealGroup className="mt-10 border-b border-[color:var(--color-line)] sm:mt-12">
            {HISTORY.map((m) => (
              <RevealItem
                key={m.title}
                className="group grid grid-cols-1 gap-y-2 border-t border-[color:var(--color-line)] py-6 sm:py-7 lg:grid-cols-12 lg:gap-x-10"
              >
                <h3 className="self-center text-[1.0625rem] leading-snug text-[color:var(--color-ink)] sm:text-[1.125rem] lg:col-span-5 font-sans font-medium tracking-normal">
                  {m.title}
                </h3>
                <p className="max-w-xl self-center text-[0.9375rem] leading-relaxed text-[color:var(--color-mist)] lg:col-span-7">
                  {m.text}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Figures */}
      <section className="py-14 sm:py-20">
        <div className="container-edit">
          <p className="index-label mb-8 text-[color:var(--color-mist)]">By the Numbers</p>
          <StatsStrip />
        </div>
      </section>

      <Leadership />

      {/* Philosophy */}
      <section className="grain relative overflow-hidden bg-[color:var(--color-umber)] py-16 text-[color:var(--color-paper)] sm:py-20 lg:py-24">
        <div className="container-edit grid grid-cols-1 gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <p className="index-label text-[color:var(--color-stone)]">Company Philosophy</p>
          </Reveal>
          <Reveal className="lg:col-span-9">
            <h2 className="text-[clamp(1.875rem,3.5vw,2.875rem)] font-normal leading-[1.1]">
              Where Innovation Meets Legacy
            </h2>
            <p className="mt-6 max-w-2xl text-[0.9375rem] leading-relaxed text-[color:var(--color-stone)]">
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
