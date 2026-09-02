import { Link } from "../../router/Router";
import { ArrowUpRight } from "lucide-react";
import Photo from "../Photo/Photo";
import { RevealItem } from "../Reveal/Reveal";
import { cn } from "../../lib/cn";

export default function ProjectCard({ project, size = "md", variant = "default" }) {
  if (variant === "editorial") {
    return <EditorialProjectCard project={project} />;
  }

  return (
    <RevealItem>
      <Link to={`/projects/${project.slug}`} className="group block">
        <div
          className={cn(
            "overflow-hidden rounded-2xl",
            size === "lg" ? "aspect-[4/5] sm:aspect-[16/10]" : "aspect-[5/6]"
          )}
        >
          <Photo src={project.cover.src} alt={project.cover.alt} fallback={project.title} className="h-full w-full" />
        </div>

        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-medium text-[color:var(--color-ink)] sm:text-2xl">
              {project.title}
            </h3>
            <p className="mt-1.5 text-sm text-[color:var(--color-mist)]">{project.location}</p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2 pt-1">
            <span className="text-sm text-[color:var(--color-mist)]">{project.year}</span>
            <ArrowUpRight
              size={17}
              strokeWidth={1.5}
              className="text-[color:var(--color-ink)] opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
            />
          </div>
        </div>
      </Link>
    </RevealItem>
  );
}

/**
 * Denser, editorial portfolio-grid treatment used only by the /projects
 * listing (see ProjectGrid's `variant` prop). Smaller, more landscape
 * imagery and stable metadata beneath — the image is the only thing that
 * moves on hover, everything a visitor needs to scan (title, location,
 * year, category) is always visible, never hover-gated.
 */
function EditorialProjectCard({ project }) {
  return (
    <RevealItem>
      <Link to={`/projects/${project.slug}`} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Photo
            src={project.cover.src}
            alt={project.cover.alt}
            fallback={project.title}
            zoom={false}
            className="h-full w-full"
            imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.025]"
          />
          {/* Subtle dark scrim + "View Project" — image-only hover, no layout shift */}
          <div className="pointer-events-none absolute inset-0 bg-[color:var(--color-ink)]/0 transition-colors duration-500 ease-out group-hover:bg-[color:var(--color-ink)]/20" />
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.14em] text-[color:var(--color-paper)]">
              View Project
              <ArrowUpRight size={13} strokeWidth={1.75} />
            </span>
          </span>
        </div>

        <div className="mt-4 flex items-baseline justify-between gap-4">
          <h3 className="font-display text-lg font-medium text-[color:var(--color-ink)] sm:text-xl">
            {project.title}
          </h3>
          <span className="shrink-0 text-sm text-[color:var(--color-mist)]">{project.year}</span>
        </div>
        <p className="mt-1 text-sm text-[color:var(--color-mist)]">{project.location}</p>
      </Link>
    </RevealItem>
  );
}
