import SectionHeading from "../../../components/SectionHeading/SectionHeading";
import ProjectGrid from "../../../components/ProjectGrid/ProjectGrid";
import Button from "../../../components/Button/Button";
import { featuredProjects } from "../../../data/projects";

export default function FeaturedProjectsSection() {
  return (
    <section className="border-t border-[color:var(--color-line)] py-10 sm:py-14 lg:py-16">
      <div className="container-edit">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Selected Work"
            title="Featured Projects"
            description="A selection of our recent homes, commercial buildings and our hotel project in Hunza."
          />
          <Button to="/projects" variant="ghost" className="shrink-0">
            Recent Projects
          </Button>
        </div>

        <div className="mt-10 sm:mt-16">
          <ProjectGrid projects={featuredProjects} columns={3} />
        </div>
      </div>
    </section>
  );
}
