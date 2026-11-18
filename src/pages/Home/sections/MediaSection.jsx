import SectionHeading from "../../../components/SectionHeading/SectionHeading";
import MediaCarousel from "../../../components/MediaCarousel/MediaCarousel";
import Button from "../../../components/Button/Button";
import Reveal from "../../../components/Reveal/Reveal";
import { carouselMedia } from "../../../data/images";
import { company } from "../../../data/nav";

export default function MediaSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-edit flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading
          eyebrow="From Site to Structure"
          title="Life at MAHUM"
          description="Photos from our sites and finished projects."
        />
        <Reveal className="shrink-0">
          <Button href={company.instagram.url} target="_blank" rel="noreferrer" variant="ghost">
            Follow {company.instagram.label}
          </Button>
        </Reveal>
      </div>

      {/* Edge-to-edge: the track runs flush to both viewport edges. */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-10 w-screen sm:mt-12">
        <MediaCarousel items={carouselMedia} />
      </div>
    </section>
  );
}
