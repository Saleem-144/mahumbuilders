import { Link } from "../../router/Router";
import { ArrowUpRight } from "lucide-react";
import Photo from "../Photo/Photo";
import { RevealItem } from "../Reveal/Reveal";
import { cn } from "../../lib/cn";

export default function ProjectCard({ project, size = "md" }) {
  return (
    <RevealItem>
      <Link to={`/projects/${project.slug}`} className="group block">
        <div
          className={cn(
            "overflow-hidden",
            size === "lg" ? "aspect-[4/5] sm:aspect-[16/10]" : "aspect-[4/5]"
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

        {project.category && (
          <span className="mt-3 inline-block eyebrow text-[color:var(--color-brass)]">{project.category}</span>
        )}
      </Link>
    </RevealItem>
  );
}
