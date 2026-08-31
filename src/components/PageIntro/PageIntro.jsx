import Reveal from "../Reveal/Reveal";
import { cn } from "../../lib/cn";

export default function PageIntro({ eyebrow, title, description, className }) {
  return (
    <section className={cn("border-b border-[color:var(--color-line)] pb-16 pt-40 sm:pb-20 sm:pt-52", className)}>
      <div className="container-edit">
        <Reveal className="max-w-3xl">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1 className="text-balance mt-5 text-[clamp(2.5rem,6vw,4.5rem)] font-medium text-[color:var(--color-ink)]">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-[color:var(--color-mist)]">
              {description}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
