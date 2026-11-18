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
    <section className="flex min-h-[85svh] items-end pb-20 pt-40 sm:pb-28">
      <div className="container-edit">
        <Reveal>
          <p className="index-label text-[color:var(--color-mist)]">Error 404</p>
          <h1 className="mt-6 text-[clamp(3.5rem,10vw,9rem)] font-normal leading-[0.92] tracking-[-0.025em] text-[color:var(--color-ink)]">
            This page <em className="italic text-[color:var(--color-mist)]">isn't here.</em>
          </h1>
          <p className="mt-8 max-w-md text-[0.9375rem] leading-relaxed text-[color:var(--color-mist)]">
            The page you're looking for doesn't exist or may have moved.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button to="/">Back Home</Button>
            <Button to="/projects" variant="ghost">
              View Projects
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
