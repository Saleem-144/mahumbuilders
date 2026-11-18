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
  light = false,
  align = "left",
  className,
  titleClassName,
}) {
  const muted = light ? "text-[color:var(--color-stone)]" : "text-[color:var(--color-mist)]";
  return (
    <Reveal className={cn("max-w-4xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className={cn("index-label mb-4", muted)}>{eyebrow}</p>}
      <h2
        className={cn(
          "text-balance text-[clamp(1.75rem,3vw,2.625rem)] font-normal leading-[1.12]",
          light ? "text-[color:var(--color-paper)]" : "text-[color:var(--color-ink)]",
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 max-w-xl text-[0.9375rem] leading-relaxed", align === "center" && "mx-auto", muted)}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
