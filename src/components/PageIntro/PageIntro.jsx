import Reveal from "../Reveal/Reveal";
import { cn } from "../../lib/cn";

// Opening block for inner pages: a very large serif title with the
// description set off to the right on wide screens.
export default function PageIntro({ eyebrow, title, description, aside, className }) {
  return (
    <section className={cn("pb-14 pt-32 sm:pb-20 sm:pt-44 lg:pb-24 lg:pt-52", className)}>
      <div className="container-edit">
        <Reveal>
          {eyebrow && <p className="index-label mb-6 text-[color:var(--color-mist)] sm:mb-8">{eyebrow}</p>}
          <h1 className="text-balance max-w-[16ch] text-[clamp(3rem,9vw,8rem)] font-normal leading-[0.95] tracking-[-0.025em] text-[color:var(--color-ink)]">
            {title}
          </h1>
        </Reveal>
        {(description || aside) && (
          <Reveal
            delay={0.08}
            className="mt-10 grid grid-cols-1 gap-8 border-t border-[color:var(--color-line)] pt-8 sm:mt-14 lg:grid-cols-12"
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
