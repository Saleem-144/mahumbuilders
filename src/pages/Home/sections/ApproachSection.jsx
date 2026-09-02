import SectionHeading from "../../../components/SectionHeading/SectionHeading";
import { RevealGroup, RevealItem } from "../../../components/Reveal/Reveal";
import { turnkeyStages } from "../../../data/services";

export default function ApproachSection() {
  return (
    <section className="bg-[color:var(--color-ink)] py-10 text-[color:var(--color-paper)] sm:py-14 lg:py-16">
      <div className="container-edit">
        <SectionHeading
          light
          eyebrow="Our Approach"
          title="The Turn-Key Approach"
          description="A single point of accountability from the first site visit to the final handover."
        />

        <RevealGroup className="mt-10 divide-y divide-[color:var(--color-line-dark)] border-t border-[color:var(--color-line-dark)]">
          {turnkeyStages.map((stage) => (
            <RevealItem key={stage.number}>
              <div className="grid grid-cols-1 gap-2 py-4 sm:grid-cols-[5rem_1fr_1.4fr] sm:items-baseline sm:gap-8 sm:py-5">
                <span className="font-display text-lg text-[color:var(--color-mist-light)]">{stage.number}</span>
                <span className="font-display text-xl font-medium sm:text-2xl">{stage.title}</span>
                <span className="text-[0.9375rem] leading-relaxed text-[color:var(--color-mist-light)] sm:text-right">
                  {stage.description}
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
