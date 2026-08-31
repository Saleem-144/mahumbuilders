import { RevealItem } from "../Reveal/Reveal";
import Counter from "../Counter/Counter";
import { cn } from "../../lib/cn";

export default function StatBlock({ prefix, value, label, note, light = false }) {
  return (
    <RevealItem className="border-t border-[color:var(--color-line)] py-6 first:border-t-0 sm:border-t-0 sm:border-l sm:first:border-l-0 sm:py-0 sm:px-6 lg:px-8">
      <div className="flex items-baseline gap-1.5">
        {prefix && (
          <span
            className={cn(
              "font-display text-base font-medium sm:text-lg",
              light ? "text-[color:var(--color-mist-light)]" : "text-[color:var(--color-mist)]"
            )}
          >
            {prefix}
          </span>
        )}
        <div
          className={cn(
            "font-display text-[clamp(2.25rem,4.5vw,3.5rem)] font-medium leading-none tabular-nums",
            light ? "text-[color:var(--color-paper)]" : "text-[color:var(--color-ink)]"
          )}
        >
          <Counter value={value} />
        </div>
      </div>
      <div className={cn("mt-3 text-sm", light ? "text-[color:var(--color-mist-light)]" : "text-[color:var(--color-mist)]")}>
        {label}
      </div>
      {note && (
        <div className={cn("mt-1 text-xs", light ? "text-[color:var(--color-mist-light)]/70" : "text-[color:var(--color-mist)]/70")}>
          {note}
        </div>
      )}
    </RevealItem>
  );
}
