import Reveal from "../Reveal/Reveal";
import Photo from "../Photo/Photo";
import Button from "../Button/Button";
import { images } from "../../data/images";
import { getProjectBySlug } from "../../data/projects";

const ownDevelopment = getProjectBySlug("bahrban-hunza");
const clientProject = getProjectBySlug("vsurfaces");

function Panel({ eyebrow, title, description, image, project, cta }) {
  return (
    <div className="group">
      <Reveal className="aspect-[4/3] overflow-hidden sm:aspect-[16/11]">
        <Photo src={image.src} alt={image.alt} fallback={image.fallback} className="h-full w-full" />
      </Reveal>
      <Reveal delay={0.05} className="mt-7">
        <span className="eyebrow text-[color:var(--color-brass)]">{eyebrow}</span>
        <h3 className="font-display mt-3 text-2xl font-medium text-[color:var(--color-ink)] sm:text-3xl">
          {title}
        </h3>
        <p className="mt-4 max-w-md text-[1.0625rem] leading-relaxed text-[color:var(--color-mist)]">
          {description}
        </p>
        {project && (
          <Button to={`/projects/${project.slug}`} variant="text" className="mt-6">
            {cta}
          </Button>
        )}
      </Reveal>
    </div>
  );
}

export default function Developments() {
  return (
    <section className="border-t border-[color:var(--color-line)] py-20 sm:py-24">
      <div className="container-edit">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Two Ways We Build</span>
          <h2 className="text-balance mt-5 text-[clamp(2rem,4vw,3.25rem)] font-medium text-[color:var(--color-ink)]">
            Our Developments &amp; Client Projects
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-[color:var(--color-mist)]">
            MAHUM operates across two distinct lines of work: developments we conceive and deliver as our
            own, and turn-key construction executed on behalf of our clients — from land acquisition
            through to handover.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:gap-12">
          <Panel
            eyebrow="MAHUM Development"
            title={ownDevelopment.title}
            description={ownDevelopment.featuredNote}
            image={images.mountainWide}
            project={ownDevelopment}
            cta="View This Development"
          />
          <Panel
            eyebrow="Client Project"
            title={clientProject.title}
            description={`A turn-key commercial build delivered for ${clientProject.client}, from grey construction through finishing.`}
            image={images.commercialFacade}
            project={clientProject}
            cta="View This Project"
          />
        </div>
      </div>
    </section>
  );
}
