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

      <div className="container-edit mt-14">
        <MediaCarousel items={carouselMedia} />
      </div>
    </section>
  );
}
