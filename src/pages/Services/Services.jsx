import PageIntro from "../../components/PageIntro/PageIntro";
import Reveal from "../../components/Reveal/Reveal";
import { RevealGroup, RevealItem } from "../../components/Reveal/Reveal";
import Photo from "../../components/Photo/Photo";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import CTA from "../../components/CTA/CTA";
import HowWeDeliver from "../../components/HowWeDeliver/HowWeDeliver";
import { services, interiorRevamp, turnkeyStages } from "../../data/services";
import { images } from "../../data/images";
import { usePageMeta } from "../../lib/usePageMeta";
import { PAGES } from "../../data/seo";
import { cn } from "../../lib/cn";

// One service: photograph and text side by side, alternating sides down the
// page so the list reads like a printed brochure rather than a card grid.
function ServiceRow({ service, flip }) {
  const img = images[service.image];
  return (
    <article className="grid grid-cols-1 items-center gap-8 border-t border-[color:var(--color-line)] py-10 sm:py-14 lg:grid-cols-12 lg:gap-10">
      <Reveal className={cn("lg:col-span-6", flip && "lg:order-2 lg:col-start-7")}>
        <Photo
          src={img.src}
          srcSet={img.large ? `${img.src} 960w, ${img.large} 2000w` : undefined}
          sizes="(min-width: 1024px) 50vw, 100vw"
          alt={img.alt}
          fallback={service.title}
          className="aspect-[4/3] w-full"
        />
      </Reveal>
      <Reveal delay={0.06} className={cn("lg:col-span-5", flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-8")}>
        <span className="index-label text-[color:var(--color-mist)]">
          {service.number}
        </span>
        <h2 className="mt-4 text-[clamp(1.625rem,2.4vw,2.125rem)] font-normal leading-[1.12] text-[color:var(--color-ink)]">
          {service.title}
        </h2>
        <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-[color:var(--color-mist)]">{service.description}</p>
        {service.tags?.length > 0 && (
          <p className="index-label mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[color:var(--color-ink)]">
            {service.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </p>
        )}
      </Reveal>
    </article>
  );
}

export default function Services() {
  usePageMeta({ ...PAGES["/services"], path: "/services" });

  return (
    <>
      <PageIntro
        eyebrow="What We Do"
        title="Our Services"
        description="We take care of every stage of a construction project, from buying the land to handing over the finished building."
      />

      <section className="pb-10 sm:pb-14">
        <div className="container-edit">
          {services.map((s, i) => (
            <ServiceRow key={s.number} service={s} flip={i % 2 === 1} />
          ))}
        </div>
      </section>

      {/* Interior revamp: a full-bleed band */}
      <section className="grain relative flex min-h-[60svh] items-end overflow-hidden bg-[color:var(--color-ink)] text-[color:var(--color-paper)]">
        <Photo
          src={images.interiorRevamp.large ?? images.interiorRevamp.src}
          alt={images.interiorRevamp.alt}
          fallback={images.interiorRevamp.fallback}
          zoom={false}
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-ink)] via-[color:var(--color-ink)]/45 to-[color:var(--color-ink)]/10" />
        <div className="container-edit relative w-full py-12 sm:py-16">
          <Reveal className="max-w-2xl">
            <p className="index-label text-[color:var(--color-stone)]">Also Offered</p>
            <h2 className="mt-4 text-[clamp(2rem,3.5vw,3rem)] font-normal leading-[1.08]">{interiorRevamp.title}</h2>
            <p className="mt-5 max-w-lg text-[0.9375rem] leading-relaxed text-[color:var(--color-paper)]/85">
              {interiorRevamp.description}
            </p>
          </Reveal>
        </div>
      </section>

      {/* The turn-key approach */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container-edit">
          <SectionHeading eyebrow="Our Approach" title="The Turn-Key Approach" description="One team responsible for the project, from the first site visit to handover." />
          <RevealGroup className="mt-10 border-b border-[color:var(--color-line)] sm:mt-12">
            {turnkeyStages.map((stage) => (
              <RevealItem
                key={stage.number}
                className="grid grid-cols-[3rem_1fr] gap-x-5 border-t border-[color:var(--color-line)] py-5 sm:grid-cols-[5rem_1fr] lg:grid-cols-12 lg:gap-x-10"
              >
                <span className="index-label pt-1 text-[color:var(--color-mist)] lg:col-span-1">{stage.number}</span>
                <h3 className="text-[1.0625rem] leading-snug text-[color:var(--color-ink)] sm:text-[1.125rem] lg:col-span-5 font-sans font-medium tracking-normal">
                  {stage.title}
                </h3>
                <p className="col-start-2 mt-2 max-w-md text-[0.9375rem] leading-relaxed text-[color:var(--color-mist)] lg:col-span-6 lg:col-start-auto lg:mt-0">
                  {stage.description}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <HowWeDeliver dark />

      <CTA />
    </>
  );
}
