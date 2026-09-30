import PageIntro from "../../components/PageIntro/PageIntro";
import ProjectGrid from "../../components/ProjectGrid/ProjectGrid";
import { projects } from "../../data/projects";

// Newest first; projects without a confirmed year go last, in data order.
const sorted = [...projects].sort((a, b) => (Number(b.year) || 0) - (Number(a.year) || 0));

export default function Projects() {
  return (
    <>
      <PageIntro
        eyebrow="Portfolio"
        title="Projects"
        description="Turn-key developments across residential, commercial and hospitality — from concept to handover."
      />

      <section className="py-10 sm:py-14 lg:py-16">
        <div className="container-edit">
          <ProjectGrid projects={sorted} columns={3} variant="editorial" />
        </div>
      </section>
    </>
  );
}
