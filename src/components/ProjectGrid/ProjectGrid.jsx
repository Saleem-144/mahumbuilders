import { RevealGroup } from "../Reveal/Reveal";
import ProjectCard from "../ProjectCard/ProjectCard";
import { cn } from "../../lib/cn";

export default function ProjectGrid({ projects, columns = 3, className }) {
  return (
    <RevealGroup
      className={cn(
        "grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2",
        columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2",
        className
      )}
    >
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </RevealGroup>
  );
}
