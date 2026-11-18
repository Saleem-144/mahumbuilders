import { useEffect, useState } from "react";
import { useParams } from "../../router/Router";
import { getProjectBySlug, photographedProjects } from "../../data/projects";
import { loadPortfolio } from "../../data/portfolio";
import Reveal from "../../components/Reveal/Reveal";
import Photo from "../../components/Photo/Photo";
import ProjectMeta from "../../components/ProjectMeta/ProjectMeta";
import Arrow from "../../components/Arrow/Arrow";
import ProjectGallery from "../../components/ProjectGallery/ProjectGallery";
import ProjectVideo from "../../components/ProjectVideo/ProjectVideo";
import {
  BrochureButton,
  ProjectPlans,
  ProjectSpecifications,
  ProjectUnits,
} from "../../components/ProjectOffering/ProjectOffering";
import CTA from "../../components/CTA/CTA";
import { Link } from "../../router/Router";
import NotFound from "../NotFound/NotFound";
import { usePageMeta } from "../../lib/usePageMeta";
import { describeProject, projectSeo } from "../../data/seo";

const META_FIELDS = ["status", "location", "year", "type", "architect", "client", "area", "plot", "design", "groundBreaking", "scope", "category"];

// Loads only this project's image/video manifest (its own small chunk).
function usePortfolio(slug, enabled) {
  const [state, setState] = useState({ slug: null, data: null });
  useEffect(() => {
    if (!enabled) return undefined;
    let cancelled = false;
    loadPortfolio(slug).then((data) => {
      if (!cancelled) setState({ slug, data });
    });
    return () => {
      cancelled = true;
    };
  }, [slug, enabled]);
  return state.slug === slug ? state.data : null;
}

// The project after this one (wrapping round), so every project page leads
// on to another like the pages of a portfolio.
function nextAfter(project) {
  const list = photographedProjects;
  const i = list.findIndex((p) => p.slug === project.slug);
  return list[(i + 1) % list.length];
}

function NextProject({ project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="grain group relative flex min-h-[70svh] items-end overflow-hidden bg-[color:var(--color-ink)] text-[color:var(--color-paper)]"
    >
      <Photo
        src={project.cover.large ?? project.cover.src}
        alt={project.cover.alt}
        fallback={project.title}
        zoom={false}
        className="absolute inset-0 h-full w-full opacity-70 transition-opacity duration-700 group-hover:opacity-90"
        imgClassName={`transition-transform duration-[1.6s] ease-[var(--ease-out-editorial)] group-hover:scale-[1.04] ${project.coverClassName ?? ""}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-ink)] via-[color:var(--color-ink)]/30 to-transparent" />
      <div className="container-edit relative w-full pb-12 sm:pb-16">
        <p className="index-label text-[color:var(--color-stone)]">Next Project</p>
        <div className="mt-5 flex items-end justify-between gap-6">
          <h2 className="text-[clamp(3rem,9vw,8.5rem)] font-normal leading-[0.92] tracking-[-0.02em]">{project.title}</h2>
          <Arrow className="mb-4 h-4 w-12 shrink-0 sm:mb-6" />
        </div>
        {project.location && <p className="mt-4 text-sm text-[color:var(--color-stone)]">{project.location}</p>}
      </div>
    </Link>
  );
}

export default function ProjectDetails() {
  const { slug } = useParams("/projects/:slug");
  const project = getProjectBySlug(slug);
  const portfolio = usePortfolio(slug, Boolean(project?.galleryRows));
  // Set here (not left to <NotFound />) because a parent's effect runs after
  // its child's, and would otherwise overwrite the 404 details.
  usePageMeta(
    project
      ? projectSeo(project)
      : { title: "Page Not Found | MAHUM Builders", description: "This project page doesn't exist.", noindex: true }
  );

  if (!project) return <NotFound />;

  const next = nextAfter(project);
  const overview = describeProject(project);
  const hasMeta = META_FIELDS.some((f) => project[f]);

  const videos =
    portfolio?.videos.map((v, i) => ({ ...v, label: project.film?.labels?.[i] ?? "Project Film" })) ?? [];
  const posterImg = portfolio?.images.find((img) => img.id === project.film?.poster);

  return (
    <>
      <section className="grain relative flex h-[88svh] min-h-[520px] items-end overflow-hidden bg-[color:var(--color-ink)] text-[color:var(--color-paper)]">
        <div className="absolute inset-0">
          <Photo src={project.cover.large ?? project.cover.src} alt={project.cover.alt} fallback={project.title} zoom={false} loading="eager" className="h-full w-full" imgClassName={project.coverClassName} />
          <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-ink)] via-[color:var(--color-ink)]/30 to-[color:var(--color-ink)]/5" />
          {/* Independent top scrim so the fixed header stays legible regardless of photo brightness. */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[color:var(--color-ink)]/70 to-transparent sm:h-48" />
        </div>
        <div className="container-edit relative w-full pb-10 pt-40 sm:pb-14">
          <Reveal>
            <p className="index-label flex flex-wrap items-center gap-x-4 gap-y-2 text-[color:var(--color-stone)]">
              {[project.status ?? project.category, project.sector].filter(Boolean).map((label, i) => (
                <span key={label} className="flex items-center gap-4">
                  {i > 0 && <span className="h-px w-8 bg-white/30" />}
                  {label}
                </span>
              ))}
            </p>
            <h1 className="mt-5 text-[clamp(3.25rem,11vw,10rem)] font-normal leading-[0.9] tracking-[-0.025em]">{project.title}</h1>
          </Reveal>
          <Reveal delay={0.08} className="mt-8 flex flex-col gap-6 border-t border-white/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[color:var(--color-stone)]">
              {[project.location, project.year].filter(Boolean).join(" · ")}
            </p>
            {project.brochure && <BrochureButton brochure={project.brochure} variant="inverse" />}
          </Reveal>
        </div>
      </section>

      {hasMeta || overview ? (
        <section className="pt-20 sm:pt-28 lg:pt-32">
          <div className="container-edit grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
            {overview && (
              <Reveal className="lg:col-span-7">
                <p className="index-label text-[color:var(--color-mist)]">Overview</p>
                <p className="statement mt-6 text-[clamp(1.625rem,2.8vw,2.5rem)] text-[color:var(--color-ink)]">{overview}</p>
                {project.featuredNote && (
                  <p className="mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-[color:var(--color-mist)]">
                    {project.featuredNote}
                  </p>
                )}
              </Reveal>
            )}
            {hasMeta && (
              <div className={overview ? "lg:col-span-4 lg:col-start-9" : "lg:col-span-6"}>
                <ProjectMeta project={project} />
              </div>
            )}
          </div>
        </section>
      ) : (
        <div className="h-16 sm:h-24" />
      )}

      {project.units && <ProjectUnits units={project.units} brochure={project.brochure} />}

      {project.galleryRows ? (
        portfolio ? (
          <>
            <ProjectGallery
              title={project.title}
              rows={project.galleryRows}
              images={portfolio.images}
              eyebrow={project.galleryEyebrow}
              note={project.galleryNote}
            />
            <ProjectVideo videos={videos} poster={posterImg?.src} title={project.title} />
          </>
        ) : (
          // Reserve space while the (small) manifest chunk loads, so the page doesn't jump.
          <div className="min-h-[60vh]" aria-hidden="true" />
        )
      ) : (
        project.gallery?.length > 0 && (
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
        )
      )}

      {project.plans && <ProjectPlans title={project.title} manifest={project.plansManifest} plans={project.plans} />}
      {project.specifications && <ProjectSpecifications items={project.specifications} />}

      {next && next.slug !== project.slug && <NextProject project={next} />}

      {project.status ? (
        <CTA
          eyebrow={project.status}
          title={`Interested in ${project.title}?`}
          description="Get in touch to book an apartment or a shop, or to ask about rates and the payment schedule."
          ctaLabel="Send an Inquiry"
        />
      ) : (
        <CTA />
      )}
    </>
  );
}
