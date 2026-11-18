import SectionHeading from "../../../components/SectionHeading/SectionHeading";
import ProjectIndex from "../../../components/ProjectIndex/ProjectIndex";
import Button from "../../../components/Button/Button";
import Reveal from "../../../components/Reveal/Reveal";
import { featuredProjects, projects } from "../../../data/projects";

export default function FeaturedProjectsSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-edit">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Selected Work"
            title="Featured Projects"
            description="A selection of our recent homes, commercial buildings and our hotel project in Hunza."
          />
          <Reveal className="shrink-0">
            <Button to="/projects" variant="ghost">
              All {projects.length} Projects
            </Button>
          </Reveal>
        </div>

        <div className="mt-10 sm:mt-12">
          <ProjectIndex projects={featuredProjects} />
        </div>
      </div>
    </section>
  );
}
