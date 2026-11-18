import { RevealGroup, RevealItem } from "../Reveal/Reveal";
import Counter from "../Counter/Counter";
import { stats } from "../../data/stats";
import { cn } from "../../lib/cn";

// Key figures as one row separated by hairlines (no boxes): 2 x 2 on phones,
// 4 across on desktop.
const CELL = [
  "",
  "border-l pl-5 sm:pl-8",
  "border-t lg:border-t-0 lg:border-l lg:pl-8",
  "border-l border-t pl-5 sm:pl-8 lg:border-t-0",
];

export default function StatsStrip({ light = false, className }) {
  const line = light ? "border-white/15" : "border-[color:var(--color-line)]";
  return (
    <RevealGroup className={cn("grid grid-cols-2 border-t lg:grid-cols-4", line, className)}>
      {stats.map((s, i) => (
        <RevealItem key={s.label} className={cn("py-7 sm:py-9", CELL[i], line)}>
          <div
            className={cn(
              "font-display text-[clamp(2.75rem,5.5vw,4.75rem)] font-light leading-none tabular-nums",
              light ? "text-[color:var(--color-paper)]" : "text-[color:var(--color-ink)]"
            )}
          >
            <Counter value={s.value} />
          </div>
          <p className={cn("mt-3 text-[0.8125rem]", light ? "text-[color:var(--color-stone)]" : "text-[color:var(--color-mist)]")}>
            {s.label}
          </p>
          {s.note && (
            <p className={cn("mt-1 text-xs", light ? "text-[color:var(--color-stone)]/70" : "text-[color:var(--color-mist)]/75")}>
              {s.note}
            </p>
          )}
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
