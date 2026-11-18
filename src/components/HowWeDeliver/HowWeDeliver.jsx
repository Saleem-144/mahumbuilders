import SectionHeading from "../SectionHeading/SectionHeading";
import { RevealGroup, RevealItem } from "../Reveal/Reveal";
import { deliveryStages } from "../../data/delivery";
import { cn } from "../../lib/cn";

/**
 * MAHUM's five delivery stages as a timeline: one hairline with a marker per
 * stage and a large numeral above each. Horizontal on desktop, vertical on
 * phones. `dark` sets it on the brand's deep umber.
 */
export default function HowWeDeliver({ dark = false }) {
  const line = dark ? "bg-white/20" : "bg-[color:var(--color-line)]";
  return (
    <section
      className={cn(
        "py-12 sm:py-16 lg:py-20",
        dark ? "bg-[color:var(--color-umber)] text-[color:var(--color-paper)]" : "border-t border-[color:var(--color-line)]"
      )}
    >
      <div className="container-edit">
        <SectionHeading
          light={dark}
          eyebrow="How We Deliver"
          title="Five stages, from brief to handover"
          description="Every project goes through the same five stages, so clients always know what happens next."
        />

        <RevealGroup className="relative mt-12 grid grid-cols-1 gap-0 sm:mt-16 lg:grid-cols-5 lg:gap-8">
          {/* Desktop: one continuous hairline through the markers. */}
          <span aria-hidden="true" className={cn("absolute left-0 right-0 top-[57px] hidden h-px lg:block", line)} />

          {deliveryStages.map((stage, i) => (
            <RevealItem key={stage.number} className="group relative grid grid-cols-[2.5rem_1fr] gap-x-5 pb-10 last:pb-0 lg:block lg:pb-0">
              {/* Phones: vertical hairline between markers. */}
              {i < deliveryStages.length - 1 && (
                <span aria-hidden="true" className={cn("absolute bottom-0 left-[1.1rem] top-12 w-px lg:hidden", line)} />
              )}

              <span
                className={cn(
                  "text-[2rem] font-light leading-none tabular-nums transition-colors duration-500 lg:block lg:text-[2.5rem]",
                  dark ? "text-[color:var(--color-stone)] group-hover:text-[color:var(--color-paper)]" : "text-[color:var(--color-mist)] group-hover:text-[color:var(--color-ink)]"
                )}
              >
                {stage.number}
              </span>

              <div className="lg:mt-0">
                <span
                  aria-hidden="true"
                  className={cn(
                    "mb-6 mt-3 hidden h-2.5 w-2.5 rotate-45 border transition-colors duration-500 lg:block",
                    dark
                      ? "border-[color:var(--color-stone)] bg-[color:var(--color-umber)] group-hover:bg-[color:var(--color-stone)]"
                      : "border-[color:var(--color-ink)]/50 bg-[color:var(--color-paper)] group-hover:bg-[color:var(--color-ink)]"
                  )}
                />
                <p className={cn("index-label", dark ? "text-[color:var(--color-stone)]" : "text-[color:var(--color-mist)]")}>{stage.name}</p>
                <h3 className="mt-3 text-[1.0625rem] leading-snug font-sans font-medium tracking-normal">{stage.title}</h3>
                <p className={cn("mt-3 max-w-xs text-[0.875rem] leading-relaxed", dark ? "text-[color:var(--color-stone)]" : "text-[color:var(--color-mist)]")}>
                  {stage.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
