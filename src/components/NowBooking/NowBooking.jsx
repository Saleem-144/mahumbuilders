import Photo from "../Photo/Photo";
import Reveal from "../Reveal/Reveal";
import Button from "../Button/Button";
import { BrochureButton } from "../ProjectOffering/ProjectOffering";
import { projects } from "../../data/projects";

// Home page feature for the project currently on sale (the first project
// with a `status`). Renders nothing when no project is on sale.
export default function NowBooking() {
  const project = projects.find((p) => p.status && p.units);
  if (!project) return null;

  return (
    <section className="grid grid-cols-1 bg-[color:var(--color-umber)] text-[color:var(--color-paper)] lg:grid-cols-2">
      <div className="relative min-h-[50svh] overflow-hidden lg:min-h-[72svh]">
        <Photo
          src={project.cover.large ?? project.cover.src}
          alt={project.cover.alt}
          fallback={project.title}
          zoom={false}
          className="absolute inset-0 h-full w-full"
          imgClassName="transition-transform duration-[1.6s] ease-[var(--ease-out-editorial)] hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-col justify-between gap-10 px-6 py-12 sm:px-12 sm:py-16 lg:px-14 xl:px-20">
        <Reveal>
          <p className="index-label flex items-center gap-4 text-[color:var(--color-stone)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-stone)] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--color-stone)]" />
            </span>
            {project.status}
          </p>
          <h2 className="mt-5 text-[clamp(2.25rem,4vw,3.25rem)] font-normal leading-[1.05]">
            {project.title}
          </h2>
          <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-[color:var(--color-stone)]">
            {project.overview}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <dl className="grid grid-cols-1 border-t border-white/15 sm:grid-cols-3">
            {project.units.map((unit, i) => (
              <div
                key={unit.name}
                className={`border-b border-white/15 py-5 sm:border-b-0 sm:py-6 ${i > 0 ? "sm:border-l sm:pl-5" : ""}`}
              >
                <dt className="index-label text-[color:var(--color-stone)]">{unit.name}</dt>
                <dd className="mt-2 flex items-baseline gap-1.5 whitespace-nowrap">
                  <span className="text-[1.5rem] font-light leading-none">{unit.size.split(" ")[0]}</span>
                  <span className="text-xs text-[color:var(--color-stone)]">{unit.size.split(" ").slice(1).join(" ")}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm text-[color:var(--color-stone)]">
            {project.location}. Ground breaking {project.groundBreaking?.replace(/^Expected /, "expected ")}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to={`/projects/${project.slug}`} variant="inverse">
              View Project
            </Button>
            <BrochureButton brochure={project.brochure} variant="ghost-light" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
