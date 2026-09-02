import SectionHeading from "../SectionHeading/SectionHeading";
import { RevealGroup, RevealItem } from "../Reveal/Reveal";
import { deliveryStages } from "../../data/delivery";
import { cn } from "../../lib/cn";

/**
 * "How We Deliver" — MAHUM's five-stage delivery process, read as a single
 * connected journey rather than a set of cards.
 *
 * - Desktop (lg+): each stage alternates above/below a shared centerline,
 *   joined to it by a short connector — closer to an elevation drawing
 *   than a card grid. Every stage (including the final handover) takes a
 *   brass accent on hover only, never permanently.
 * - Tablet (sm–lg, incl. ~834px): a static 3+2 grid beneath a single rule.
 * - Mobile (<sm): a genuine vertical process, each stage joined to the next
 *   by a short connecting rule.
 */
export default function HowWeDeliver() {
  const last = deliveryStages.length - 1;

  return (
    <section className="border-t border-[color:var(--color-line)] py-10 sm:py-14 lg:py-16">
      <div className="container-edit">
        <SectionHeading
          eyebrow="How We Deliver"
          title="From vision to completion."
          description="Every MAHUM project is approached as a considered process — bringing planning, construction, finishing and coordination together to deliver spaces with clarity and purpose."
        />

        {/* Desktop — connected horizontal timeline */}
        <div className="relative mt-28 hidden lg:block">
          <RevealGroup className="relative grid grid-cols-5" stagger={0.1}>
            {deliveryStages.map((stage, i) => {
              const above = i % 2 === 0;
              return (
                <RevealItem key={stage.number} y={above ? -14 : 14} className="relative">
                  <div
                    className={cn(
                      "group relative flex flex-col items-center px-4 text-center",
                      above ? "justify-end pb-16" : "justify-start pt-16"
                    )}
                    style={{ minHeight: "12rem" }}
                  >
                    <span className="font-display block text-[3.25rem] font-light leading-none text-[color:var(--color-ink)] transition-colors duration-300 group-hover:text-[color:var(--color-brass)] xl:text-6xl">
                      {stage.number}
                    </span>
                    <p className="eyebrow mt-4">{stage.name}</p>
                    <h3 className="font-display mt-2 text-base font-medium text-[color:var(--color-ink)]">
                      {stage.title}
                    </h3>
                    <p className="mt-2.5 max-w-[13rem] text-[0.8125rem] leading-relaxed text-[color:var(--color-mist)]">
                      {stage.description}
                    </p>

                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute left-1/2 w-px -translate-x-1/2 bg-[color:var(--color-line)] transition-colors duration-300 group-hover:bg-[color:var(--color-brass-light)]",
                        above ? "bottom-0 h-16" : "top-0 h-16"
                      )}
                    />
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>

        {/* Tablet — static 3+2 grid */}
        <RevealGroup className="mt-16 hidden grid-cols-3 gap-x-8 gap-y-14 border-t border-[color:var(--color-line)] pt-12 sm:grid lg:hidden">
          {deliveryStages.map((stage, i) => {
            const isLast = i === last;
            return (
              <RevealItem key={stage.number}>
                <span
                  className={cn(
                    "font-display block text-5xl font-light leading-none",
                    isLast ? "text-[color:var(--color-brass)]" : "text-[color:var(--color-ink)]"
                  )}
                >
                  {stage.number}
                </span>
                <p className="eyebrow mt-4">{stage.name}</p>
                <h3 className="font-display mt-2 text-lg font-medium text-[color:var(--color-ink)]">
                  {stage.title}
                </h3>
                <p className="mt-2.5 max-w-[16rem] text-sm leading-relaxed text-[color:var(--color-mist)]">
                  {stage.description}
                </p>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Mobile — genuine vertical process */}
        <RevealGroup className="mt-14 flex flex-col sm:hidden">
          {deliveryStages.map((stage, i) => {
            const isLast = i === last;
            return (
              <RevealItem key={stage.number} className="relative pb-10 pl-9 last:pb-0">
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-[0.28rem] top-9 w-px bg-[color:var(--color-line)]"
                  />
                )}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-0 top-2 h-[0.4rem] w-[0.4rem] rounded-full",
                    isLast ? "bg-[color:var(--color-brass)]" : "bg-[color:var(--color-mist-light)]"
                  )}
                />
                <span
                  className={cn(
                    "font-display block text-4xl font-light leading-none",
                    isLast ? "text-[color:var(--color-brass)]" : "text-[color:var(--color-ink)]"
                  )}
                >
                  {stage.number}
                </span>
                <p className="eyebrow mt-3">{stage.name}</p>
                <h3 className="font-display mt-2 text-lg font-medium text-[color:var(--color-ink)]">
                  {stage.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[color:var(--color-mist)]">
                  {stage.description}
                </p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
