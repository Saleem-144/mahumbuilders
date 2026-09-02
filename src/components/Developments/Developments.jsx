import Reveal from "../Reveal/Reveal";
import Photo from "../Photo/Photo";
import Button from "../Button/Button";
import { images } from "../../data/images";

/**
 * "Two Ways We Build" — purely informational: it explains MAHUM's two lines
 * of work as two premium, self-contained cards. Each card's CTA goes to a
 * general destination — the Projects listing, or Contact — never to an
 * individual project, so this section never sorts any specific project into
 * either bucket. Deliberately compact (controlled image height, tight
 * internal rhythm) so the whole section reads within roughly one viewport
 * on desktop, without feeling cramped.
 */
const WAYS = [
  {
    number: "01",
    eyebrow: "MAHUM Development",
    title: "Projects We Conceive & Deliver",
    description:
      "Developments MAHUM initiates, finances and delivers as our own — from land acquisition and design through to a finished, ready-to-open space.",
    image: images.mountainWide,
    ctaLabel: "View Our Projects",
    ctaTo: "/projects",
  },
  {
    number: "02",
    eyebrow: "Client Projects",
    title: "Turn-Key Construction For Our Clients",
    description:
      "End-to-end construction delivered on behalf of our clients — a single point of accountability from grey structure through to handover.",
    image: images.commercialFacade,
    ctaLabel: "Contact Us",
    ctaTo: "/contact",
  },
];

function WayCard({ way }) {
  return (
    <Reveal
      as="article"
      className="group flex h-full flex-col border border-[color:var(--color-line)] transition-colors duration-500 hover:border-[color:var(--color-mist-light)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden lg:aspect-[2.4/1]">
        <Photo
          src={way.image.src}
          alt={way.image.alt}
          fallback={way.image.fallback}
          zoom={false}
          className="h-full w-full"
          imgClassName="transition-transform duration-[650ms] ease-[var(--ease-out-editorial)] group-hover:scale-[1.035]"
        />
      </div>
      <div className="flex flex-1 flex-col border-t border-[color:var(--color-line)] px-5 py-5 sm:px-6 sm:py-4">
        <div className="flex items-baseline gap-2.5">
          <span className="font-display text-sm text-[color:var(--color-mist-light)]">{way.number}</span>
          <span className="eyebrow text-[color:var(--color-brass)]">{way.eyebrow}</span>
        </div>
        <h3 className="font-display mt-2 text-lg font-medium leading-snug text-[color:var(--color-ink)] sm:text-xl">
          {way.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-mist)] sm:text-[0.9375rem]">
          {way.description}
        </p>
        <Button
          to={way.ctaTo}
          variant="text"
          className="mt-auto self-start pt-4 transition-colors duration-300 group-hover:text-[color:var(--color-brass)]"
        >
          {way.ctaLabel}
        </Button>
      </div>
    </Reveal>
  );
}

export default function Developments() {
  return (
    <section className="border-t border-[color:var(--color-line)] py-8 sm:py-10 lg:py-6">
      <div className="container-edit">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Two Ways We Build</span>
          <h2 className="text-balance mt-2 text-[clamp(1.75rem,3vw,2.5rem)] font-medium text-[color:var(--color-ink)]">
            Our Developments &amp; Client Projects
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-mist)] sm:text-[0.9375rem]">
            MAHUM operates across two distinct lines of work: developments we conceive and deliver as our
            own, and turn-key construction executed on behalf of our clients — from land acquisition
            through to handover.
          </p>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:mt-8 sm:grid-cols-2 sm:gap-6 lg:mt-6 lg:gap-7">
          {WAYS.map((way) => (
            <WayCard key={way.number} way={way} />
          ))}
        </div>
      </div>
    </section>
  );
}
