import SectionHeading from "../SectionHeading/SectionHeading";
import Reveal from "../Reveal/Reveal";
import { leadership } from "../../data/leadership";

// Leadership as editorial rows: a small portrait, the name in large serif and
// a short profile. (The supplied portraits are small, so they stay small.)
export default function Leadership() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-edit">
        <SectionHeading eyebrow="Meet the Team" title="Leadership" />

        <div className="mt-10 border-b border-[color:var(--color-line)] sm:mt-12">
          {leadership.map((person) => (
            <Reveal
              key={person.slug}
              className="grid grid-cols-[5.5rem_1fr] gap-x-6 gap-y-6 border-t border-[color:var(--color-line)] py-8 sm:grid-cols-[7rem_1fr] sm:gap-x-10 lg:grid-cols-12 lg:py-10"
            >
              <div className="lg:col-span-2">
                <div className="aspect-[4/5] w-full max-w-[8.5rem] overflow-hidden bg-[color:var(--color-stone)]">
                  <img
                    src={person.photo}
                    alt={person.name}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale contrast-[1.05]"
                  />
                </div>
              </div>
              <div className="lg:col-span-4">
                <h3 className="text-[clamp(1.5rem,2.2vw,1.875rem)] font-normal leading-tight text-[color:var(--color-ink)]">
                  {person.name}
                </h3>
                <p className="index-label mt-3 text-[color:var(--color-mist)]">{person.role}</p>
              </div>
              <p className="col-span-2 max-w-xl text-[0.9375rem] leading-relaxed text-[color:var(--color-mist)] lg:col-span-6">
                {person.vision}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
