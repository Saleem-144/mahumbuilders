import PageIntro from "../../components/PageIntro/PageIntro";
import ProjectGrid from "../../components/ProjectGrid/ProjectGrid";
import { projects } from "../../data/projects";

const sorted = [...projects].sort((a, b) => Number(b.year) - Number(a.year));

export default function Projects() {
  return (
    <>
      <PageIntro
        eyebrow="Portfolio"
        title="Projects"
        description="Eleven turn-key developments across residential, commercial and hospitality — from concept to handover."
      />

      {/* Reduced top padding vs. the site's usual py-24/py-32 so the denser
          editorial grid begins right after the intro, not with a large gap
          more suited to the old, sparser 2-column layout. Bottom padding is
          unchanged to keep the section's closing rhythm consistent. */}
      <section className="pb-24 pt-12 sm:pb-32 sm:pt-16">
        <div className="container-edit">
          <ProjectGrid projects={sorted} columns={3} variant="editorial" />
        </div>
      </section>
    </>
  );
}
