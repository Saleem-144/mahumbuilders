import SectionHeading from "../SectionHeading/SectionHeading";
import { RevealGroup, RevealItem } from "../Reveal/Reveal";
import { deliveryStages } from "../../data/delivery";
import { cn } from "../../lib/cn";

/**
 * "How We Deliver" — MAHUM's five-stage delivery process, read as a single
 * connected journey rather than a set of cards.
 *
 * - Desktop (lg+): a hairline rule runs the width of the section with a tick
 *   at each stage. Odd stages (01 / 03 / 05) sit above the rule, even stages
 *   (02 / 04) sit below it, each joined to its tick by a short connector —
 *   closer to an elevation drawing than a card grid. The final stage
 *   (05 — Deliver) carries a permanent brass accent marking the handover
 *   moment; every other stage takes the same accent on hover only.
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
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-[color:var(--color-line)]"
          />
          <RevealGroup className="relative grid grid-cols-5" stagger={0.1}>
            {deliveryStages.map((stage, i) => {
              const above = i % 2 === 0;
              const isLast = i === last;
              return (
                <RevealItem key={stage.number} y={above ? -14 : 14} className="relative">
                  <div
                    className={cn(
                      "group relative flex flex-col items-center px-4 text-center",
                      above ? "justify-end pb-16" : "justify-start pt-16"
                    )}
                    style={{ minHeight: "12rem" }}
                  >
                    <span
                      className={cn(
                        "font-display block text-[3.25rem] font-light leading-none transition-colors duration-300 xl:text-6xl",
                        isLast
                          ? "text-[color:var(--color-brass)]"
                          : "text-[color:var(--color-ink)] group-hover:text-[color:var(--color-brass)]"
                      )}
                    >
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
                        "absolute left-1/2 w-px -translate-x-1/2 transition-colors duration-300",
                        isLast
                          ? "bg-[color:var(--color-brass)]"
                          : "bg-[color:var(--color-line)] group-hover:bg-[color:var(--color-brass-light)]",
                        above ? "bottom-0 h-16" : "top-0 h-16"
                      )}
                    />
                  </div>

                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-300",
                      isLast
                        ? "h-2.5 w-2.5 bg-[color:var(--color-brass)]"
                        : "h-1.5 w-1.5 bg-[color:var(--color-mist-light)] group-hover:bg-[color:var(--color-brass)]"
                    )}
                  />
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
