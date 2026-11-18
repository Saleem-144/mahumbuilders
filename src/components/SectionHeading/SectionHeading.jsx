import Reveal from "../Reveal/Reveal";
import { cn } from "../../lib/cn";

/**
 * Editorial section heading: a small index label ("01  About"), a large serif
 * title, and an optional short description beside or below it.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  index,
  light = false,
  align = "left",
  className,
  titleClassName,
}) {
  const muted = light ? "text-[color:var(--color-stone)]" : "text-[color:var(--color-mist)]";
  return (
    <Reveal className={cn("max-w-4xl", align === "center" && "mx-auto text-center", className)}>
      {(index || eyebrow) && (
        <p className={cn("index-label mb-5 flex items-center gap-4 sm:mb-6", align === "center" && "justify-center", muted)}>
          {index && <span>{index}</span>}
          {index && eyebrow && <span className={cn("h-px w-8", light ? "bg-white/30" : "bg-[color:var(--color-ink)]/25")} />}
          {eyebrow && <span>{eyebrow}</span>}
        </p>
      )}
      <h2
        className={cn(
          "text-balance text-[clamp(2.25rem,5vw,4.25rem)] font-normal leading-[1.02]",
          light ? "text-[color:var(--color-paper)]" : "text-[color:var(--color-ink)]",
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-6 max-w-xl text-[0.9375rem] leading-relaxed", align === "center" && "mx-auto", muted)}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
