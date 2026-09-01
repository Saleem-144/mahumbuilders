import { useEffect, useRef, useState, useCallback } from "react";
import { Heart } from "lucide-react";
import Photo from "../Photo/Photo";

// Roughly how long one card's full width takes to drift past and be
// replaced — the brief calls for ~6–8s per card, so this targets the
// midpoint. Speed is derived from this (see the rAF loop below) rather
// than hardcoded, so it stays consistent across breakpoints where card
// width itself changes (54vw / 30vw / 19vw).
const MS_PER_CARD = 7000;

/**
 * Continuous, button-free media marquee (Instagram-strip style).
 * - Auto-scrolls at a constant, clearly-visible speed via native scrollLeft,
 *   paced in real time (px/ms, driven off the rAF timestamp) rather than a
 *   fixed px-per-frame amount — so it moves at the same visible speed
 *   regardless of the display's refresh rate.
 * - Seamless loop: the item list is rendered twice back-to-back in a single
 *   flat row (uniform gap throughout — no extra gap at the seam), and the
 *   scroll position wraps once it reaches the exact start of the second copy.
 * - No prev/next controls, no pagination dots, no edge fade/mask — the row
 *   simply drifts, pausing on hover/touch and resuming from the exact same
 *   position shortly after (never restarts).
 * - Each card carries a static "@mahumbuilders" handle badge (top-left) and,
 *   when the item has a `likeCount`, a like-count overlay that fades in on
 *   hover — both purely presentational, no Instagram integration.
 * - Respects prefers-reduced-motion (autoplay disabled; row stays swipeable).
 */
export default function MediaCarousel({ items }) {
  const trackRef = useRef(null);
  const markerRef = useRef(null); // first card of the 2nd copy — marks one full loop
  const pausedRef = useRef(false);
  const resumeTimeout = useRef(null);
  const rafRef = useRef(null);
  // True for every frame we programmatically set scrollLeft ourselves. The
  // write below fires the track's native `scroll` event, which the onScroll
  // handler otherwise treats as a user-initiated scroll and pauses on — this
  // flag lets that handler tell "we just moved it" apart from "the user is
  // dragging/swiping it" so autoplay doesn't perpetually self-pause.
  const autoScrollingRef = useRef(false);
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

    // Track position as a float outside the DOM: reading scrollLeft back
    // each frame quantizes to whole pixels, so a sub-pixel speed would
    // never accumulate. Writing from our own accumulator sidesteps that.
    let pos = track.scrollLeft;
    let lastTime = null;

    function frame(time) {
      if (lastTime === null) lastTime = time;
      const dt = time - lastTime;
      lastTime = time;

      if (!pausedRef.current && markerRef.current) {
        const setWidth = markerRef.current.offsetLeft; // width of one full set (items.length cards + gaps)
        const pxPerCard = setWidth / items.length;
        const speed = pxPerCard / MS_PER_CARD; // px per ms, recomputed live so resizes are picked up automatically
        pos += speed * dt;
        if (pos >= setWidth) pos -= setWidth;
        autoScrollingRef.current = true;
        track.scrollLeft = pos;
      } else {
        // Paused (hover/touch) or being scrolled by the user — stay in sync
        // with the real scroll position so resuming never jumps.
        autoScrollingRef.current = false;
        pos = track.scrollLeft;
      }
      rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reducedMotion, items.length]);

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
          // Ignore scroll events caused by our own autoplay writes — only a
          // real user drag/swipe/wheel should trigger this pause.
          if (autoScrollingRef.current) return;
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
            className="group w-[54vw] shrink-0 sm:w-[30vw] lg:w-[19vw]"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
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

              <span className="absolute left-2 top-2 z-10 rounded-full bg-white/90 px-2.5 py-1 text-[0.6875rem] font-medium text-[color:var(--color-ink)] backdrop-blur-sm sm:left-3 sm:top-3">
                @mahumbuilders
              </span>

              {item.likeCount != null && (
                <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex scale-95 items-center gap-1.5 rounded-full bg-[color:var(--color-ink)]/55 px-4 py-2 backdrop-blur-sm transition-transform duration-300 group-hover:scale-100">
                    <Heart size={15} strokeWidth={1.75} className="fill-[color:var(--color-paper)] text-[color:var(--color-paper)]" />
                    <span className="text-sm font-medium text-[color:var(--color-paper)]">{item.likeCount}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
