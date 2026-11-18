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

// Milestones, all taken from facts already on the site (company profile and
// project details).
const HISTORY = [
  { year: "1988", title: "MAHUM is founded", text: "Hasan Mustafa starts the company in Karachi with a single residential project." },
  {
    year: "2014",
    title: "A second generation",
    text: "Umair Hasan joins and leads operations as the company moves into contracting, commercial construction and interiors.",
  },
  { year: "2019", title: "MAHUM Offices", text: "Our own five-storey office building is completed in Phase 8, DHA." },
  { year: "2025", title: "Casa Solara", text: "A 10,000 sq. ft. villa on a 666 sq. yd. plot is completed in Phase 8, DHA." },
  { year: "2026", title: "BAHRBAN, Hunza", text: "Our first hotel, in the Hunza valley, is under construction." },
  { year: "2027", title: "Casa Bellini", text: "Ground breaking is expected for a neoclassical retail and apartment building on Khayaban-e-Nishat." },
];

export default function About() {
  usePageMeta({ ...PAGES["/about"], path: "/about" });

  return (
    <>
      <PageIntro
        eyebrow={`Est. ${company.foundedYear} · Karachi`}
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
              A real estate development and construction company, based in Karachi since 1988.
            </Reveal>
            <Reveal as="p" delay={0.06}>
              MAHUM was established by Hasan Mustafa, a civil engineer licensed by the Pakistan Engineering
              Council. Since then we have completed more than 300 projects, around 250 residential and 50
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
          <SectionHeading index="01" eyebrow="Our Journey" title="From one house to three hundred projects" />
          <RevealGroup className="mt-10 border-b border-[color:var(--color-line)] sm:mt-12">
            {HISTORY.map((m) => (
              <RevealItem
                key={m.year}
                className="group grid grid-cols-[4.5rem_1fr] gap-x-6 border-t border-[color:var(--color-line)] py-5 sm:grid-cols-[7rem_1fr] sm:py-6 lg:grid-cols-12 lg:gap-x-10"
              >
                <span className="text-[1.5rem] font-light leading-none tabular-nums text-[color:var(--color-mist)] transition-colors duration-500 group-hover:text-[color:var(--color-ink)] sm:text-[1.875rem] lg:col-span-2">
                  {m.year}
                </span>
                <h3 className="self-center text-[1.0625rem] leading-snug text-[color:var(--color-ink)] sm:text-[1.125rem] lg:col-span-4 font-sans font-medium tracking-normal">
                  {m.title}
                </h3>
                <p className="col-start-2 mt-2 max-w-lg self-center text-[0.9375rem] leading-relaxed text-[color:var(--color-mist)] lg:col-span-6 lg:col-start-auto lg:mt-0">
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

      <Leadership index="02" />

      {/* Philosophy */}
      <section className="grain relative overflow-hidden bg-[color:var(--color-umber)] py-16 text-[color:var(--color-paper)] sm:py-20 lg:py-24">
        <div className="container-edit grid grid-cols-1 gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <p className="index-label text-[color:var(--color-stone)]">Company Philosophy</p>
          </Reveal>
          <Reveal className="lg:col-span-9">
            <h2 className="text-[clamp(1.875rem,3.5vw,2.875rem)] font-normal leading-[1.1]">
              Where innovation <span className="text-[color:var(--color-stone)]">meets legacy.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-[0.9375rem] leading-relaxed text-[color:var(--color-stone)]">
              Clients come to us because we take care of the whole project. One team handles the land,
              design, approvals, construction and finishing, so the client has one point of contact and one
              company responsible for the result.
            </p>
          </Reveal>
        </div>
      </section>

      <Developments index="03" />

      <CTA />
    </>
  );
}
