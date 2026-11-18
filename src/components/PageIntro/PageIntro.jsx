import Reveal from "../Reveal/Reveal";
import { cn } from "../../lib/cn";

// Opening block for inner pages: a very large serif title with the
// description set off to the right on wide screens.
export default function PageIntro({ eyebrow, title, description, aside, className }) {
  return (
    <section className={cn("pb-10 pt-28 sm:pb-14 sm:pt-36 lg:pt-40", className)}>
      <div className="container-edit">
        <Reveal>
          {eyebrow && <p className="index-label mb-5 text-[color:var(--color-mist)]">{eyebrow}</p>}
          <h1 className="text-balance max-w-[20ch] text-[clamp(2.25rem,5vw,3.75rem)] font-normal leading-[1.08] text-[color:var(--color-ink)]">
            {title}
          </h1>
        </Reveal>
        {(description || aside) && (
          <Reveal
            delay={0.08}
            className="mt-8 grid grid-cols-1 gap-6 border-t border-[color:var(--color-line)] pt-6 sm:mt-10 lg:grid-cols-12"
          >
            {aside && <div className="lg:col-span-5">{aside}</div>}
            {description && (
              <p className={cn("max-w-xl text-[0.9375rem] leading-relaxed text-[color:var(--color-mist)] sm:text-base", aside ? "lg:col-span-7" : "lg:col-span-6 lg:col-start-7")}>
                {description}
              </p>
            )}
          </Reveal>
        )}
      </div>
    </section>
  );
}
