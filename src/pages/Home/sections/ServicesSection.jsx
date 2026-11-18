import { useState } from "react";
import SectionHeading from "../../../components/SectionHeading/SectionHeading";
import Button from "../../../components/Button/Button";
import Reveal from "../../../components/Reveal/Reveal";
import { services } from "../../../data/services";
import { images } from "../../../data/images";
import { cn } from "../../../lib/cn";

// Services as a numbered list beside a single photograph that changes with
// the service being hovered (or tapped), instead of a grid of cards.
export default function ServicesSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-[color:var(--color-paper-dim)] py-12 sm:py-16 lg:py-20">
      <div className="container-edit">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="What We Do"
            title="Our Services"
            description="Everything a building project needs, from finding the land to the final handover."
          />
          <Reveal className="shrink-0">
            <Button to="/services" variant="ghost">
              All Services
            </Button>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 sm:mt-12 lg:grid-cols-12 lg:gap-14">
          {/* Photograph for the active service (desktop: sticky beside the list). */}
          <Reveal className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 aspect-[4/3] overflow-hidden bg-[color:var(--color-stone)]">
              {services.map((s, i) => {
                const img = images[s.image];
                return (
                  <img
                    key={s.number}
                    src={img.large ?? img.src}
                    alt={i === active ? img.alt : ""}
                    loading="lazy"
                    decoding="async"
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-[var(--ease-out-editorial)]",
                      i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                    )}
                  />
                );
              })}
            </div>
          </Reveal>

          <ol className="border-b border-[color:var(--color-line)] lg:col-span-7">
            {services.map((s, i) => (
              <li key={s.number}>
                <Reveal>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-expanded={i === active}
                    className="group grid w-full grid-cols-[2.5rem_1fr] gap-x-4 border-t border-[color:var(--color-line)] py-5 text-left sm:grid-cols-[3.5rem_1fr]"
                  >
                    <span className={cn("index-label pt-1.5 transition-colors", i === active ? "text-[color:var(--color-ink)]" : "text-[color:var(--color-mist)]")}>
                      {s.number}
                    </span>
                    <span>
                      <span
                        className={cn(
                          "block text-[1.0625rem] font-medium leading-snug transition-[color,transform] duration-500 ease-[var(--ease-out-editorial)] sm:text-[1.125rem]",
                          i === active ? "translate-x-1 text-[color:var(--color-ink)]" : "text-[color:var(--color-ink)]/45 group-hover:text-[color:var(--color-ink)]/80"
                        )}
                      >
                        {s.title}
                      </span>
                      <span
                        className={cn(
                          "grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-editorial)]",
                          i === active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        )}
                      >
                        <span className="overflow-hidden">
                          <span className="block max-w-lg pt-3 text-[0.9375rem] leading-relaxed text-[color:var(--color-mist)]">
                            {s.description}
                          </span>
                          {/* Phones: show the photo inline under the open service. */}
                          <img
                            src={images[s.image].src}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            className="mt-5 aspect-[16/10] w-full object-cover lg:hidden"
                          />
                        </span>
                      </span>
                    </span>
                  </button>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
