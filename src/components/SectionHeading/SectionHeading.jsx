import Reveal from "../Reveal/Reveal";
import { cn } from "../../lib/cn";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  index,
  light = false,
  className,
  titleClassName,
}) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <div className={cn("flex items-center gap-3 mb-4", align === "center" && "justify-center")}>
        {index && <span className={cn("eyebrow", light && "text-[color:var(--color-mist-light)]")}>{index}</span>}
        {eyebrow && <span className={cn("eyebrow", light && "text-[color:var(--color-mist-light)]")}>{eyebrow}</span>}
      </div>
      <h2
        className={cn(
          "text-balance text-[clamp(2rem,4vw,3.25rem)] font-medium",
          light ? "text-[color:var(--color-paper)]" : "text-[color:var(--color-ink)]",
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 max-w-xl text-[1.0625rem] leading-relaxed",
            align === "center" && "mx-auto",
            light ? "text-[color:var(--color-mist-light)]" : "text-[color:var(--color-mist)]"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
