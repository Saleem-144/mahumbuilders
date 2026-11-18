import { useState } from "react";
import PageIntro from "../../components/PageIntro/PageIntro";
import ProjectIndex from "../../components/ProjectIndex/ProjectIndex";
import Photo from "../../components/Photo/Photo";
import Reveal from "../../components/Reveal/Reveal";
import CTA from "../../components/CTA/CTA";
import { Link } from "../../router/Router";
import { projects } from "../../data/projects";
import { usePageMeta } from "../../lib/usePageMeta";
import { PAGES } from "../../data/seo";
import { cn } from "../../lib/cn";

// Projects on sale first, then newest first; projects without a confirmed year
// go last, in data order.
const sorted = [...projects].sort(
  (a, b) => Number(Boolean(b.status)) - Number(Boolean(a.status)) || (Number(b.year) || 0) - (Number(a.year) || 0)
);

const FILTERS = [
  { key: "all", label: "All", match: () => true },
  { key: "residential", label: "Residential", match: (p) => p.sector === "Residential" },
  { key: "commercial", label: "Commercial", match: (p) => p.sector === "Commercial" },
  { key: "hospitality", label: "Hospitality", match: (p) => p.sector === "Hospitality" },
  { key: "booking", label: "On Booking", match: (p) => Boolean(p.status) },
].map((f) => ({ ...f, count: sorted.filter(f.match).length })).filter((f) => f.count > 0);

// Large-image view: two columns, the second offset downwards, so the grid
// reads like a printed portfolio rather than a row of cards.
function Gallery({ items }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16">
      {items.map((project, i) => (
        <Reveal key={project.slug} className={cn(i % 2 === 1 && "sm:mt-20")}>
          <Link to={`/projects/${project.slug}`} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Photo
                src={project.cover.src}
                srcSet={project.cover.large ? `${project.cover.src} 960w, ${project.cover.large} 2000w` : undefined}
                sizes="(min-width: 640px) 50vw, 100vw"
                alt={project.cover.alt}
                fallback={project.title}
                zoom={false}
                className="h-full w-full"
                imgClassName="transition-transform duration-[1.2s] ease-[var(--ease-out-editorial)] group-hover:scale-[1.04]"
              />
              {project.status && (
                <span className="index-label absolute left-4 top-4 bg-[color:var(--color-paper)] px-3 py-1.5 text-[color:var(--color-ink)]">
                  {project.status}
                </span>
              )}
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-[color:var(--color-line)] pt-4">
              <h2 className="text-[clamp(1.375rem,1.9vw,1.75rem)] font-normal leading-tight text-[color:var(--color-ink)]">{project.title}</h2>
              <span className="index-label shrink-0 text-[color:var(--color-mist)]">{project.sector}</span>
            </div>
            {project.location && <p className="mt-2 text-sm text-[color:var(--color-mist)]">{project.location}</p>}
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

export default function Projects() {
  usePageMeta({ ...PAGES["/projects"], path: "/projects" });
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState("index");
  const active = FILTERS.find((f) => f.key === filter) ?? FILTERS[0];
  const items = sorted.filter(active.match);

  return (
    <>
      <PageIntro
        eyebrow={`Portfolio · ${projects.length} Projects`}
        title="Projects"
        description="Homes, commercial buildings, office interiors and hospitality projects by MAHUM Builders, in Karachi and the Hunza valley."
      />

      <section className="pb-16 sm:pb-24">
        <div className="container-edit">
          {/* Filters and view switch */}
          <div className="mb-8 flex flex-col gap-6 sm:mb-10 lg:flex-row lg:items-center lg:justify-between">
            <div role="tablist" aria-label="Filter projects" className="scrollbar-none -mx-6 flex gap-6 overflow-x-auto px-6 sm:mx-0 sm:flex-wrap sm:px-0 sm:gap-x-8">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  role="tab"
                  aria-selected={f.key === filter}
                  onClick={() => setFilter(f.key)}
                  className={cn(
                    "group flex shrink-0 items-baseline gap-1.5 pb-1.5 pt-2 text-[0.6875rem] font-medium uppercase tracking-[0.2em] transition-colors",
                    f.key === filter
                      ? "border-b border-[color:var(--color-ink)] text-[color:var(--color-ink)]"
                      : "border-b border-transparent text-[color:var(--color-mist)] hover:text-[color:var(--color-ink)]"
                  )}
                >
                  {f.label}
                  <sup className="text-[0.625rem] tracking-normal">{f.count}</sup>
                </button>
              ))}
            </div>
            <div className="hidden items-center gap-5 text-[0.6875rem] font-medium uppercase tracking-[0.2em] sm:flex">
              {[
                ["index", "List"],
                ["gallery", "Gallery"],
              ].map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={view === key}
                  onClick={() => setView(key)}
                  className={cn("transition-colors", view === key ? "text-[color:var(--color-ink)]" : "text-[color:var(--color-mist)] hover:text-[color:var(--color-ink)]")}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div key={`${filter}-${view}`}>
            {view === "index" ? <ProjectIndex projects={items} /> : <Gallery items={items} />}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
