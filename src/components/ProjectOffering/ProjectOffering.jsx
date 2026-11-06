import { useEffect, useState } from "react";
import { Check, Download } from "lucide-react";
import Button from "../Button/Button";
import GalleryOverlay from "../GalleryOverlay/GalleryOverlay";
import Reveal from "../Reveal/Reveal";
import SectionHeading from "../SectionHeading/SectionHeading";
import { loadPortfolio } from "../../data/portfolio";

// Sections for a project that is for sale (see `units`, `plans`,
// `specifications` and `brochure` in data/projects.js). Prices and payment
// schedules are left to the downloadable brochure, as the client asked.

export function BrochureButton({ brochure, variant = "primary" }) {
  return (
    <Button href={brochure.href} download={brochure.filename} variant={variant} icon={false}>
      <span className="inline-flex items-center gap-2.5">
        <Download size={16} strokeWidth={1.75} aria-hidden="true" />
        Download Brochure
        <span className="font-normal opacity-70">PDF, {brochure.size}</span>
      </span>
    </Button>
  );
}

export function ProjectUnits({ units, brochure }) {
  return (
    <section className="border-t border-[color:var(--color-line)] py-10 sm:py-14 lg:py-16">
      <div className="container-edit">
        <SectionHeading eyebrow="Available on Booking" title="Apartments and Shops" />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-3">
          {units.map((unit, i) => (
            <Reveal
              key={unit.name}
              delay={i * 0.06}
              className="flex flex-col border border-[color:var(--color-line)] p-6 sm:p-7"
            >
              <p className="eyebrow">{unit.name}</p>
              <p className="font-display mt-4 text-3xl font-medium text-[color:var(--color-ink)]">{unit.size}</p>
              <p className="mt-1.5 text-sm text-[color:var(--color-mist)]">{unit.sizeNote}</p>
              <ul className="mt-6 space-y-2.5 border-t border-[color:var(--color-line)] pt-5 text-[0.9375rem] leading-relaxed text-[color:var(--color-ink)]">
                {unit.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
          <BrochureButton brochure={brochure} />
          <p className="text-sm text-[color:var(--color-mist)]">Rates and the payment schedule are in the brochure.</p>
        </Reveal>
      </div>
    </section>
  );
}

function PlanButton({ plan, label, onOpen, large = false }) {
  return (
    <figure>
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View floor plan: ${label}`}
        className="block w-full cursor-zoom-in border border-[color:var(--color-line)] bg-white p-3 transition-colors duration-300 hover:border-[color:var(--color-mist-light)]"
      >
        <img
          src={large ? plan.src : plan.thumb}
          alt={`Casa Bellini floor plan: ${label}`}
          width={plan.w}
          height={plan.h}
          loading="lazy"
          decoding="async"
          className="h-auto w-full"
        />
      </button>
      <figcaption className="mt-3 text-sm text-[color:var(--color-ink)]">{label}</figcaption>
    </figure>
  );
}

export function ProjectPlans({ title, manifest, plans }) {
  const [images, setImages] = useState(null);
  const [overlay, setOverlay] = useState({ open: false, start: null });

  useEffect(() => {
    let cancelled = false;
    loadPortfolio(manifest).then((data) => {
      if (!cancelled) setImages(data?.images ?? []);
    });
    return () => {
      cancelled = true;
    };
  }, [manifest]);

  if (!images?.length) return null;

  const items = plans
    .map((plan) => ({ ...plan, index: images.findIndex((img) => img.id === plan.id) }))
    .filter((plan) => plan.index >= 0);
  const [first, ...rest] = items;
  const open = (index) => setOverlay({ open: true, start: index });

  return (
    <section className="border-t border-[color:var(--color-line)] py-10 sm:py-14 lg:py-16">
      <div className="container-edit">
        <SectionHeading eyebrow="Typical Layouts" title="Floor Plans" />

        <div className="mt-10 grid grid-cols-1 items-start gap-8 sm:mt-12 lg:grid-cols-[5fr_6fr] lg:gap-10">
          <Reveal>
            <PlanButton plan={images[first.index]} label={first.label} onOpen={() => open(first.index)} large />
          </Reveal>
          <Reveal delay={0.06} className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6">
            {rest.map((plan) => (
              <PlanButton key={plan.id} plan={images[plan.index]} label={plan.label} onOpen={() => open(plan.index)} />
            ))}
          </Reveal>
        </div>
      </div>

      <GalleryOverlay
        open={overlay.open}
        startIndex={overlay.start}
        images={images}
        title={`${title} floor plans`}
        onClose={() => setOverlay({ open: false, start: null })}
      />
    </section>
  );
}

export function ProjectSpecifications({ items }) {
  return (
    <section className="border-t border-[color:var(--color-line)] py-10 sm:py-14 lg:py-16">
      <div className="container-edit">
        <SectionHeading eyebrow="What Is Included" title="Specifications" />
        <Reveal className="mt-10 sm:mt-12">
          <ul className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 border-t border-[color:var(--color-line)] py-3.5 text-[0.9375rem] leading-relaxed text-[color:var(--color-ink)]"
              >
                <Check size={16} strokeWidth={1.75} aria-hidden="true" className="mt-1 shrink-0 text-[color:var(--color-brass)]" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
