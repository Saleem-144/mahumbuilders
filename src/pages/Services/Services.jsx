import PageIntro from "../../components/PageIntro/PageIntro";
import Reveal from "../../components/Reveal/Reveal";
import Photo from "../../components/Photo/Photo";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import { RevealGroup } from "../../components/Reveal/Reveal";
import CTA from "../../components/CTA/CTA";
import { services, interiorRevamp, turnkeyStages } from "../../data/services";
import { images } from "../../data/images";

export default function Services() {
  return (
    <>
      <PageIntro
        eyebrow="What We Do"
        title="Turn-Key Construction Solutions"
        description="MAHUM understands the complexities inherent in any construction project — offering a comprehensive suite of turn-key solutions designed to take the stress out of each client's journey, from land acquisition to final handover."
      />

      <section className="py-20 sm:py-28">
        <div className="container-edit">
          <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.number} service={s} />
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Interior Revamp callout */}
      <section className="border-t border-[color:var(--color-line)] py-24 sm:py-32">
        <div className="container-edit grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="order-2 aspect-[16/11] overflow-hidden lg:order-1">
            <Photo src={images.officeInterior.src} alt={images.officeInterior.alt} fallback={images.officeInterior.fallback} className="h-full w-full" />
          </Reveal>
          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="eyebrow">Also Offered</span>
              <h2 className="font-display mt-5 text-3xl font-medium text-[color:var(--color-ink)] sm:text-4xl">
                {interiorRevamp.title}
              </h2>
              <p className="mt-6 text-[1.0625rem] leading-relaxed text-[color:var(--color-mist)]">
                {interiorRevamp.description}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Turnkey approach */}
      <section className="border-t border-[color:var(--color-line)] bg-[color:var(--color-ink)] py-16 text-[color:var(--color-paper)] sm:py-20">
        <div className="container-edit">
          <SectionHeading light eyebrow="How We Deliver" title="The Turn-Key Approach" />
          <div className="mt-10 divide-y divide-[color:var(--color-line-dark)] border-t border-[color:var(--color-line-dark)]">
            {turnkeyStages.map((stage) => (
              <Reveal key={stage.number}>
                <div className="grid grid-cols-1 gap-2 py-4 sm:grid-cols-[5rem_1fr_1.4fr] sm:items-baseline sm:gap-8 sm:py-5">
                  <span className="font-display text-lg text-[color:var(--color-mist-light)]">{stage.number}</span>
                  <span className="font-display text-xl font-medium sm:text-2xl">{stage.title}</span>
                  <span className="text-[0.9375rem] leading-relaxed text-[color:var(--color-mist-light)] sm:text-right">
                    {stage.description}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA
        eyebrow="Ready When You Are"
        title="Let's Discuss Your Project."
        description="From land acquisition to final handover — tell us what you're building."
        ctaLabel="Start a Conversation"
      />
    </>
  );
}
