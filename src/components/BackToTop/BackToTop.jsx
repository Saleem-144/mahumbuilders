import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Mobile-only "back to top" button. Fixed bottom-right, appears once the
 * visitor has scrolled a short distance down, hidden again near the top.
 * Uses Lenis (if active, per SmoothScroll) for a consistent smooth scroll,
 * falling back to the native smooth-scroll API otherwise. Desktop/tablet
 * never render it — the header nav already gives quick access up there.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    if (window.__lenis?.scrollTo) {
      window.__lenis.scrollTo(0, { duration: 1.1 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-5 right-5 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-line)] bg-[color:var(--color-paper)]/95 text-[color:var(--color-ink)] shadow-[0_8px_20px_-6px_rgba(16,15,12,0.25)] backdrop-blur-sm transition-[opacity,transform,border-color,color] duration-300 ease-out hover:border-[color:var(--color-brass)] hover:text-[color:var(--color-brass)] sm:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <ArrowUp size={17} strokeWidth={1.75} />
    </button>
  );
}
