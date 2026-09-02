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

export default function About() {
  return (
    <>
      <PageIntro
        eyebrow={`Est. ${company.foundedYear}`}
        title="An esteemed firm shaping Pakistan's real estate landscape"
        description="Founded by Mr. Hasan Mustafa, MAHUM has carved an illustrious path across construction and real estate development — surpassing expectations and setting new benchmarks for luxury and safety."
      />

      {/* Company Introduction */}
      <section className="py-10 sm:py-14 lg:py-16">
        <div className="container-edit grid grid-cols-1 items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="aspect-[4/3] overflow-hidden lg:aspect-auto lg:h-[420px]">
            <Photo src={images.aboutFacade.src} alt={images.aboutFacade.alt} fallback={images.aboutFacade.fallback} className="h-full w-full" />
          </Reveal>
          <div className="space-y-6 pt-2 text-[1.0625rem] leading-relaxed text-[color:var(--color-mist)] lg:pt-10">
            <Reveal as="p">
              Welcome to MAHUM, an esteemed real estate development and construction firm that stands as a
              beacon of excellence in the industry. Established in 1989 by the visionary Mr. Hasan Mustafa,
              MAHUM has boasted over three decades of unwavering commitment to delivering unparalleled
              quality and sophistication in every project undertaken.
            </Reveal>
            <Reveal as="p" delay={0.06}>
              Our portfolio comprises 300+ expertly executed residential and commercial developments. At
              MAHUM, we craft environments, not just buildings — redefining luxury living and working with
              precision, innovation, and the highest quality standards.
            </Reveal>
            <Reveal as="p" delay={0.12}>
              Our seasoned professionals — architects, engineers, and project managers — collaborate
              harmoniously, where every detail is meticulously considered to create masterpieces. As we
              build on our legacy, MAHUM remains dedicated to pushing the boundaries of excellence, creating
              timeless spaces that define the pinnacle of luxury and safety in the industry.
            </Reveal>
          </div>
        </div>
      </section>

      {/* History / Journey */}
      <section className="border-t border-[color:var(--color-line)] bg-[color:var(--color-paper-dim)] py-10 sm:py-14 lg:py-16">
        <div className="container-edit">
          <SectionHeading eyebrow="Our Journey" title="From Humble Beginning to an Enduring Legacy" />

          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-12">
            <Reveal as="div">
              <h3 className="font-display text-xl font-medium text-[color:var(--color-ink)]">Born from Vision</h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-[color:var(--color-mist)]">
                Founded in 1989 by Mr. Hasan Mustafa, MAHUM has risen from a singular residential project to
                a prominent force in Pakistan's real estate landscape. Driven by a steadfast commitment to
                quality and innovation, we have continuously expanded our portfolio, venturing beyond
                residential developments and into commercial construction, interior design, and the
                burgeoning hospitality sector.
              </p>
            </Reveal>
            <Reveal as="div" delay={0.08}>
              <h3 className="font-display text-xl font-medium text-[color:var(--color-ink)]">Beyond Bricks and Mortar</h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-[color:var(--color-mist)]">
                Our iconic office towers redefine the city's business district, while meticulous interior
                designs breathe life into retail spaces. Soon to come, BAHRBAN — our flagship hotel project —
                promises to redefine regional luxury with its unmatched sophistication.
              </p>
            </Reveal>
            <Reveal as="div" delay={0.16}>
              <h3 className="font-display text-xl font-medium text-[color:var(--color-ink)]">A Testament to Dedication</h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-[color:var(--color-mist)]">
                Each MAHUM project embodies our core values: unwavering commitment to quality, relentless
                pursuit of innovation, and exceeding client expectations. Our journey is a testament to the
                power of vision, dedication, and a collaborative spirit that drives us to shape the future of
                Pakistan's skyline, one project at a time.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="border-t border-[color:var(--color-line)] py-10 sm:py-14 lg:py-16">
        <div className="container-edit">
          <p className="eyebrow mb-10">By the Numbers</p>
          <RevealGroup className="grid grid-cols-2 gap-y-10 sm:grid-cols-5">
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
              Where Innovation Meets Legacy. Redefining Construction, Locally.
            </h2>
            <p className="mt-7 text-[1.0625rem] leading-relaxed text-[color:var(--color-mist-light)]">
              Our USP lies in our holistic and client-centric approach, seamlessly blending innovation,
              precision, and a commitment to excellence. Years of expertise meet cutting-edge solutions. We
              craft residential, commercial, and hospitality spaces that elevate every brand and exceed
              expectations, both in Pakistan and beyond.
            </p>
          </Reveal>
        </div>
      </section>

      <Developments />

      <CTA />
    </>
  );
}
