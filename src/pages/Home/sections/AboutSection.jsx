import Reveal from "../../../components/Reveal/Reveal";
import Photo from "../../../components/Photo/Photo";
import Button from "../../../components/Button/Button";
import { images } from "../../../data/images";

export default function AboutSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-edit grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="order-2 aspect-[4/3] overflow-hidden lg:order-1 lg:aspect-auto lg:h-full lg:max-h-[420px]">
          <Photo src={images.aboutFacade.src} alt={images.aboutFacade.alt} fallback={images.aboutFacade.fallback} className="h-full w-full" />
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="eyebrow">Company Introduction</span>
            <h2 className="text-balance mt-5 text-[clamp(2rem,4vw,3.25rem)] font-medium text-[color:var(--color-ink)]">
              An esteemed firm shaping Pakistan's real estate landscape since 1989
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="mt-7 space-y-5 text-[1.0625rem] leading-relaxed text-[color:var(--color-mist)]">
            <p>
              MAHUM is a real estate development and construction firm established in 1989 by Mr. Hasan
              Mustafa. Over three decades, the company has carved an illustrious path — delivering
              unparalleled quality across construction, real estate development, project management and
              turn-key solutions.
            </p>
            <p>
              Our seasoned professionals — architects, engineers and project managers — collaborate
              harmoniously, with every detail meticulously considered to create masterpieces that redefine
              luxury living and working.
            </p>
          </Reveal>
          <Reveal delay={0.16} className="mt-9">
            <Button to="/about" variant="text">
              More About MAHUM
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
