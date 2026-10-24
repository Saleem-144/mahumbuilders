import PageIntro from "../../components/PageIntro/PageIntro";
import ProjectGrid from "../../components/ProjectGrid/ProjectGrid";
import { projects } from "../../data/projects";
import { useDocumentTitle } from "../../lib/useDocumentTitle";

// Newest first; projects without a confirmed year go last, in data order.
const sorted = [...projects].sort((a, b) => (Number(b.year) || 0) - (Number(a.year) || 0));

export default function Projects() {
  useDocumentTitle("Projects");

  return (
    <>
      <PageIntro
        eyebrow="Portfolio"
        title="Projects"
        description="Homes, commercial buildings, office interiors and hospitality projects by MAHUM Builders."
      />

      <section className="py-10 sm:py-14 lg:py-16">
        <div className="container-edit">
          <ProjectGrid projects={sorted} columns={3} variant="editorial" />
        </div>
      </section>
    </>
  );
}
