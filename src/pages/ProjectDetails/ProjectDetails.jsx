import { useParams } from "../../router/Router";
import { getProjectBySlug, projects } from "../../data/projects";
import Reveal from "../../components/Reveal/Reveal";
import Photo from "../../components/Photo/Photo";
import ProjectMeta from "../../components/ProjectMeta/ProjectMeta";
import ProjectGrid from "../../components/ProjectGrid/ProjectGrid";
import CTA from "../../components/CTA/CTA";
import Button from "../../components/Button/Button";
import NotFound from "../NotFound/NotFound";

function roleDescription(project) {
  const scopeText = project.scope?.join(", ").toLowerCase() ?? "turn-key construction";
  if (project.category === "MAHUM Development") {
    return `${project.title} is one of MAHUM's own developments — conceived, financed and delivered in-house, covering ${scopeText}.`;
  }
  if (project.category === "Client Project") {
    return `Delivered as a turn-key project for ${project.client}, MAHUM's scope covered ${scopeText}, taking the project from grey structure through to a finished, handover-ready space.`;
  }
  return `MAHUM delivered ${project.title} as a ${project.type?.toLowerCase()}, covering ${scopeText} from inception to handover.`;
}

export default function ProjectDetails() {
  const { slug } = useParams("/projects/:slug");
  const project = getProjectBySlug(slug);

  if (!project) return <NotFound />;

  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <section className="relative flex h-[70svh] min-h-[420px] items-end overflow-hidden bg-[color:var(--color-ink)] text-[color:var(--color-paper)]">
        <div className="absolute inset-0">
          <Photo src={project.cover.src} alt={project.cover.alt} fallback={project.title} zoom={false} loading="eager" className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-ink)] via-[color:var(--color-ink)]/35 to-[color:var(--color-ink)]/10" />
          {/* Independent top scrim so the fixed header stays legible regardless of photo brightness. */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[color:var(--color-ink)]/70 to-transparent sm:h-48" />
        </div>
        <div className="container-edit relative w-full pb-14 pt-40">
          <Reveal>
            {project.category && <span className="eyebrow text-[color:var(--color-mist-light)]">{project.category}</span>}
            <h1 className="mt-4 text-[clamp(2.5rem,6.5vw,5.5rem)] font-medium">{project.title}</h1>
            <p className="mt-3 text-[color:var(--color-mist-light)]">{project.location}</p>
          </Reveal>
        </div>
      </section>

      <section className="py-10 sm:py-14 lg:py-16">
        <div className="container-edit grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <ProjectMeta project={project} />
          <Reveal delay={0.05}>
            <span className="eyebrow">Overview</span>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-[color:var(--color-mist)]">
              {roleDescription(project)}
            </p>
            {project.featuredNote && (
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-[color:var(--color-mist)]">
                {project.featuredNote}
              </p>
            )}
          </Reveal>
        </div>
      </section>

      {project.gallery?.length > 0 && (
        <section className="pb-24 sm:pb-32">
          <div className="container-edit grid grid-cols-1 gap-6 sm:grid-cols-2">
            {project.gallery.map((img, i) => (
              <Reveal
                key={i}
                delay={i * 0.06}
                className={i === 0 ? "sm:col-span-2 aspect-[16/9] overflow-hidden" : "aspect-[4/5] overflow-hidden"}
              >
                <Photo src={img.src} alt={img.alt} fallback={project.title} className="h-full w-full" />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="border-t border-[color:var(--color-line)] py-10 sm:py-14 lg:py-16">
        <div className="container-edit">
          <div className="flex items-end justify-between">
            <span className="eyebrow">Related Projects</span>
            <Button to="/projects" variant="text">
              All Projects
            </Button>
          </div>
          <div className="mt-12">
            <ProjectGrid projects={related} columns={3} />
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
