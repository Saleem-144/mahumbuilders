import Reveal from "../../components/Reveal/Reveal";
import Button from "../../components/Button/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] items-center justify-center py-32 text-center">
      <Reveal>
        <span className="eyebrow">404</span>
        <h1 className="font-display mt-5 text-4xl font-medium text-[color:var(--color-ink)] sm:text-5xl">
          Page Not Found
        </h1>
        <p className="mx-auto mt-5 max-w-sm text-[color:var(--color-mist)]">
          The page you're looking for doesn't exist or may have moved.
        </p>
        <div className="mt-8 flex justify-center">
          <Button to="/">Back Home</Button>
        </div>
      </Reveal>
    </section>
  );
}
