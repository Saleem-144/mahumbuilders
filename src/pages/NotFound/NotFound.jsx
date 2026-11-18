import Reveal from "../../components/Reveal/Reveal";
import Button from "../../components/Button/Button";
import { usePageMeta } from "../../lib/usePageMeta";

export default function NotFound() {
  usePageMeta({
    title: "Page Not Found | MAHUM Builders",
    description: "The page you're looking for doesn't exist or may have moved.",
    noindex: true,
  });

  return (
    <section className="flex min-h-[70svh] items-end pb-16 pt-36 sm:pb-20">
      <div className="container-edit">
        <Reveal>
          <p className="index-label text-[color:var(--color-mist)]">404</p>
          <h1 className="mt-5 text-[clamp(2.25rem,5vw,3.75rem)] font-normal leading-[1.08] text-[color:var(--color-ink)]">
            Page Not Found
          </h1>
          <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-[color:var(--color-mist)]">
            The page you're looking for doesn't exist or may have moved.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/">Back Home</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
