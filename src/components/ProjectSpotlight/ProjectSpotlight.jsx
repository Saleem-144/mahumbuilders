import Photo from "../Photo/Photo";
import Reveal from "../Reveal/Reveal";
import Button from "../Button/Button";
import { Link } from "../../router/Router";
import { projects } from "../../data/projects";
import { describeProject } from "../../data/seo";

// Home page feature for one completed project: a large photograph that opens
// the project, beside its key details. The text comes from the project data,
// so nothing here needs separate copy.
export default function ProjectSpotlight({ slug, image }) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) return null;
  const photo = image ?? project.cover;
  const href = `/projects/${project.slug}`;
  const facts = [
    ["Area", project.area],
    ["Plot Size", project.plot],
    ["Completion", project.year],
  ].filter(([, v]) => v);

  return (
    <section className="grid grid-cols-1 bg-[color:var(--color-paper-dim)] lg:grid-cols-2">
      <Link
        to={href}
        aria-label={`View ${project.title}`}
        className="group relative block min-h-[50svh] overflow-hidden lg:order-2 lg:min-h-[72svh]"
      >
        <Photo
          src={photo.large ?? photo.src}
          srcSet={photo.large ? `${photo.src} 960w, ${photo.large} 2000w` : undefined}
          sizes="(min-width: 1024px) 50vw, 100vw"
          alt={photo.alt}
          fallback={project.title}
          zoom={false}
          className="absolute inset-0 h-full w-full"
          imgClassName="transition-transform duration-[1.6s] ease-[var(--ease-out-editorial)] group-hover:scale-[1.03]"
        />
      </Link>

      <div className="flex flex-col justify-between gap-10 px-6 py-12 sm:px-12 sm:py-16 lg:px-14 xl:px-20">
        <Reveal>
          <p className="index-label text-[color:var(--color-mist)]">Featured Project</p>
          <h2 className="mt-5 text-[clamp(2.25rem,4vw,3.25rem)] font-normal leading-[1.05] text-[color:var(--color-ink)]">
            <Link to={href} className="transition-colors hover:text-[color:var(--color-mist)]">
              {project.title}
            </Link>
          </h2>
          <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-[color:var(--color-mist)]">
            {describeProject(project)}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <dl className="grid grid-cols-1 border-t border-[color:var(--color-line)] sm:grid-cols-3">
            {facts.map(([label, value], i) => (
              <div
                key={label}
                className={`border-b border-[color:var(--color-line)] py-5 sm:border-b-0 sm:py-6 ${i > 0 ? "sm:border-l sm:pl-5" : ""}`}
              >
                <dt className="index-label text-[color:var(--color-mist)]">{label}</dt>
                <dd className="mt-2 whitespace-nowrap text-[1.25rem] font-light leading-none text-[color:var(--color-ink)]">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm text-[color:var(--color-mist)]">
            {project.location}
            {project.architect && `. Architect: ${project.architect}`}
          </p>
          <div className="mt-8">
            <Button to={href}>View Project</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
