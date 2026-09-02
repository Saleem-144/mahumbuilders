import Reveal from "../Reveal/Reveal";
import { cn } from "../../lib/cn";

export default function PageIntro({ eyebrow, title, description, className }) {
  return (
    <section className={cn("border-b border-[color:var(--color-line)] pb-10 pt-28 sm:pb-14 sm:pt-36 lg:pb-16 lg:pt-40", className)}>
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
