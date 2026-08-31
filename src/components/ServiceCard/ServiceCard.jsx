import { MapPin, PenTool, ShieldCheck, Building2, ListChecks, Zap } from "lucide-react";
import { RevealItem } from "../Reveal/Reveal";
import Photo from "../Photo/Photo";
import { images } from "../../data/images";

const ICONS = { MapPin, PenTool, ShieldCheck, Building2, ListChecks, Zap };

/**
 * Premium image-backed service card — dark scrim over a full-bleed photo,
 * an icon badge, title/description, and short factual tag chips. The photo
 * keeps its natural color at all times (only scale changes on hover) and
 * falls back to a clean labeled panel if it ever fails to load.
 */
export default function ServiceCard({ service }) {
  const Icon = ICONS[service.icon] ?? Building2;
  const image = images[service.image];

  return (
    <RevealItem className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-[color:var(--color-ink)] transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-16px_rgba(16,15,12,0.35)] sm:aspect-[3/4]">
      <Photo
        src={image.src}
        alt={image.alt}
        fallback={service.title}
        zoom={false}
        className="absolute inset-0 h-full w-full"
        imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.06]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--color-ink)] via-[color:var(--color-ink)]/75 to-[color:var(--color-ink)]/35 transition-opacity duration-500 group-hover:via-[color:var(--color-ink)]/60" />

      <div className="relative flex h-full flex-col justify-between p-6 sm:p-7">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--color-paper)]/25 bg-[color:var(--color-paper)]/10 backdrop-blur-sm transition-colors duration-300 group-hover:border-[color:var(--color-brass-light)]/60">
          <Icon size={19} strokeWidth={1.5} className="text-[color:var(--color-paper)]" />
        </div>

        <div>
          <span className="font-display text-xs text-[color:var(--color-mist-light)]">{service.number}</span>
          <h3 className="font-display mt-2 text-xl font-medium leading-snug text-[color:var(--color-paper)] sm:text-2xl">
            {service.title}
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-[color:var(--color-mist-light)] line-clamp-3">
            {service.description}
          </p>
          {service.tags?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[color:var(--color-paper)]/20 px-2.5 py-1 text-[0.6875rem] uppercase tracking-wide text-[color:var(--color-paper)]/75"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </RevealItem>
  );
}
