import { useEffect, useRef, useState, useCallback } from "react";
import Photo from "../Photo/Photo";

/**
 * Continuous, button-free media marquee (caudra.com-style).
 * - Auto-scrolls at a constant, gentle speed via native scrollLeft.
 * - Seamless loop: the item list is rendered twice back-to-back in a single
 *   flat row (uniform gap throughout — no extra gap at the seam), and the
 *   scroll position wraps once it reaches the exact start of the second copy.
 * - No prev/next controls, no pagination dots, no edge fade/mask — the row
 *   simply drifts, pausing on hover/touch and resuming shortly after.
 * - Respects prefers-reduced-motion (autoplay disabled; row stays swipeable).
 */
export default function MediaCarousel({ items }) {
  const trackRef = useRef(null);
  const markerRef = useRef(null); // first card of the 2nd copy — marks one full loop
  const pausedRef = useRef(false);
  const resumeTimeout = useRef(null);
  const rafRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const loop = [...items, ...items];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return undefined;
    const track = trackRef.current;
    if (!track) return undefined;

    const speed = 0.45; // px per frame, ~27px/s at 60fps — smooth & unhurried
    // Track position as a float outside the DOM: reading scrollLeft back each
    // frame quantizes to whole pixels, so a sub-pixel speed would never
    // accumulate (0 + 0.45 rounds to 0 forever). Writing from our own
    // accumulator sidesteps that.
    let pos = track.scrollLeft;

    function frame() {
      if (!pausedRef.current && markerRef.current) {
        const setWidth = markerRef.current.offsetLeft;
        pos += speed;
        if (pos >= setWidth) pos -= setWidth;
        track.scrollLeft = pos;
      } else {
        pos = track.scrollLeft;
      }
      rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reducedMotion]);

  const pause = useCallback(() => {
    pausedRef.current = true;
    clearTimeout(resumeTimeout.current);
  }, []);

  const resumeSoon = useCallback((delay = 900) => {
    clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => {
      pausedRef.current = false;
    }, delay);
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={pause}
      onMouseLeave={() => resumeSoon(200)}
      onTouchStart={pause}
      onTouchEnd={() => resumeSoon(1200)}
    >
      <div
        ref={trackRef}
        onScroll={() => {
          pause();
          resumeSoon(1400);
        }}
        className="scrollbar-none flex gap-4 overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {loop.map((item, i) => (
          <div
            data-card
            ref={i === items.length ? markerRef : undefined}
            key={i}
            className="w-[54vw] shrink-0 sm:w-[30vw] lg:w-[19vw]"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-xl">
              {item.type === "video" ? (
                <video
                  src={item.src}
                  poster={item.poster}
                  muted
                  loop
                  playsInline
                  autoPlay
                  className="h-full w-full object-cover"
                />
              ) : (
                <Photo src={item.src} alt={item.alt} fallback={item.fallback} zoom={false} className="h-full w-full" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
