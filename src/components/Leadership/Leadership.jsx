import SectionHeading from "../SectionHeading/SectionHeading";
import Reveal from "../Reveal/Reveal";
import { leadership } from "../../data/leadership";

export default function Leadership() {
  return (
    <section className="border-t border-[color:var(--color-line)] py-24 sm:py-32">
      <div className="container-edit">
        <SectionHeading eyebrow="Meet the Team" title="Leadership" />

        <div className="mt-16 grid grid-cols-1 gap-14 sm:grid-cols-2 sm:gap-10 lg:gap-16">
          {leadership.map((person) => (
            <Reveal key={person.slug} className="flex gap-6 sm:gap-8">
              <div className="w-28 shrink-0 overflow-hidden bg-[color:var(--color-stone)] sm:w-36">
                <img
                  src={person.photo}
                  alt={person.name}
                  className="h-full w-full object-cover grayscale contrast-[1.05] brightness-[1.03]"
                  loading="lazy"
                />
              </div>
              <div>
                <h3 className="font-display text-xl font-medium text-[color:var(--color-ink)] sm:text-2xl">
                  {person.name}
                </h3>
                <p className="eyebrow mt-1.5">{person.role}</p>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-[color:var(--color-mist)]">
                  {person.vision}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
