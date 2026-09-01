import { RevealGroup } from "../Reveal/Reveal";
import ProjectCard from "../ProjectCard/ProjectCard";
import { cn } from "../../lib/cn";

export default function ProjectGrid({ projects, columns = 3, variant = "default", className }) {
  const editorial = variant === "editorial";

  return (
    <RevealGroup
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2",
        editorial ? "gap-x-6 gap-y-12 lg:gap-x-8 lg:gap-y-14" : "gap-x-8 gap-y-16",
        columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2",
        className
      )}
    >
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} variant={variant} />
      ))}
    </RevealGroup>
  );
}
