import Reveal from "../Reveal/Reveal";
import Button from "../Button/Button";
import Photo from "../Photo/Photo";
import { images } from "../../data/images";

export default function CTA({
  eyebrow = "Let's Build Together",
  title = "Let's Build Something Lasting.",
  description = "New developments, construction projects, and turn-key solutions — start the conversation with MAHUM's team.",
  ctaLabel = "Start a Conversation",
  ctaTo = "/contact",
}) {
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-ink)] text-[color:var(--color-paper)]">
      <div className="absolute inset-0 opacity-[0.35]">
        <Photo src={images.ctaExterior.src} alt="" fallback="" zoom={false} className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-ink)] via-[color:var(--color-ink)]/70 to-[color:var(--color-ink)]/40" />
      </div>
      <div className="container-edit relative py-16 sm:py-20 text-center">
        <Reveal>
          <span className="eyebrow text-[color:var(--color-mist-light)]">{eyebrow}</span>
          <h2 className="text-balance mx-auto mt-4 max-w-3xl text-[clamp(2rem,4.5vw,3.5rem)] font-medium">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-[color:var(--color-mist-light)]">
            {description}
          </p>
          <div className="mt-8 flex justify-center">
            <Button to={ctaTo} variant="inverse">
              {ctaLabel}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
