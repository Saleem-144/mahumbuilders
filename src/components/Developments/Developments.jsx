import Reveal from "../Reveal/Reveal";
import Photo from "../Photo/Photo";
import Arrow from "../Arrow/Arrow";
import SectionHeading from "../SectionHeading/SectionHeading";
import { Link } from "../../router/Router";
import { images } from "../../data/images";

/**
 * "Two Ways We Build": MAHUM's two lines of work as two tall, full-bleed
 * image panels. Each links to a general destination (Projects or Contact),
 * never to a single project.
 */
const WAYS = [
  {
    number: "01",
    eyebrow: "MAHUM Development",
    title: "Our Own Developments",
    description:
      "Projects MAHUM starts, finances and builds itself, from buying the land to a finished building ready for use.",
    image: images.ownDevelopmentBahrban,
    ctaLabel: "View Our Projects",
    ctaTo: "/projects",
  },
  {
    number: "02",
    eyebrow: "Client Projects",
    title: "Turn-Key Construction for Clients",
    description:
      "We build on the client's behalf and stay responsible for the job from grey structure to handover.",
    image: images.clientProjectDusk,
    ctaLabel: "Contact Us",
    ctaTo: "/contact",
  },
];

function WayPanel({ way }) {
  return (
    <Link
      to={way.ctaTo}
      className="group relative flex min-h-[62svh] flex-col justify-end overflow-hidden text-[color:var(--color-paper)] lg:min-h-[74svh]"
    >
      <Photo
        src={way.image.large ?? way.image.src}
        alt={way.image.alt}
        fallback={way.image.fallback}
        zoom={false}
        className="absolute inset-0 h-full w-full"
        imgClassName="transition-transform duration-[1.4s] ease-[var(--ease-out-editorial)] group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-ink)]/95 via-[color:var(--color-ink)]/55 via-55% to-[color:var(--color-ink)]/10" />

      <div className="relative p-6 sm:p-8 lg:p-10">
        <p className="index-label flex items-center gap-4 text-[color:var(--color-stone)]">
          <span>{way.number}</span>
          <span className="h-px w-8 bg-white/30" />
          <span>{way.eyebrow}</span>
        </p>
        <h3 className="mt-4 max-w-[18ch] text-[clamp(1.75rem,2.6vw,2.375rem)] font-normal leading-[1.1]">{way.title}</h3>
        <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-[color:var(--color-paper)]/80">{way.description}</p>
        <span className="mt-6 inline-flex items-center gap-4 text-[0.6875rem] font-medium uppercase tracking-[0.2em]">
          {way.ctaLabel}
          <Arrow />
        </span>
      </div>
    </Link>
  );
}

export default function Developments() {
  return (
    <section className="bg-[color:var(--color-paper)]">
      <div className="container-edit py-14 sm:py-20">
        <SectionHeading
          eyebrow="Two Ways We Build"
          title="Our Developments and Client Projects"
          description="We work in two ways: we develop our own projects, and we build turn-key projects for clients."
        />
      </div>
      <Reveal className="grid grid-cols-1 lg:grid-cols-2">
        {WAYS.map((way) => (
          <WayPanel key={way.number} way={way} />
        ))}
      </Reveal>
    </section>
  );
}
