import SectionHeading from "../../../components/SectionHeading/SectionHeading";
import MediaCarousel from "../../../components/MediaCarousel/MediaCarousel";
import { carouselMedia } from "../../../data/images";

export default function MediaSection() {
  return (
    <section className="border-t border-[color:var(--color-line)] py-24 sm:py-32">
      <div className="container-edit">
        <SectionHeading
          eyebrow="From Site to Structure"
          title="Life at MAHUM"
          description="A closer look at materials, interiors and completed spaces from across the portfolio."
        />
      </div>

      {/* Edge-to-edge: breaks out of container-edit's max-width/padding so
          the track itself runs flush to both viewport edges, while the
          heading above stays inside the normal content container. */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-14 w-screen">
        <MediaCarousel items={carouselMedia} />
      </div>
    </section>
  );
}
