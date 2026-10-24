import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "../../lib/cn";

const EASE = [0.16, 1, 0.3, 1];

// How "wide" a row of the index grid should be, as a sum of image aspect
// ratios — roughly three landscape frames per row on desktop, two on
// tablet, one on phones (portraits pair up naturally).
function useRowTarget() {
  const get = () => (window.innerWidth >= 1024 ? 3.4 : window.innerWidth >= 640 ? 2.3 : 1.25);
  const [target, setTarget] = useState(get);
  useEffect(() => {
    const onResize = () => setTarget(get());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return target;
}

// Groups images into justified rows: every image in a row shares one height
// and keeps its own proportions, so nothing is cropped.
function toRows(images, target) {
  const rows = [];
  let row = [];
  let sum = 0;
  images.forEach((img, index) => {
    row.push({ img, index });
    sum += img.w / img.h;
    if (sum >= target) {
      rows.push({ items: row, filler: 0 });
      row = [];
      sum = 0;
    }
  });
  if (row.length) rows.push({ items: row, filler: Math.max(target - sum, 0) });
  return rows;
}

/**
 * Full-screen project gallery. Two views share one overlay:
 *  - "grid": every project image as a justified, uncropped index.
 *  - "image": a single image, with prev/next, arrow keys, swipe and a counter.
 * Opened either from "View All Images" (starts on the grid) or by clicking a
 * curated image on the page (starts on that image; closing it closes the
 * overlay). Rendered in a portal so page transforms never affect it; page
 * scroll (and Lenis) is paused while it's open.
 */
export default function GalleryOverlay({ open, images, title, startIndex = null, onClose }) {
  const [view, setView] = useState(null); // { mode: "grid" | "image", index, fromGrid }
  const closeRef = useRef(null);
  const gridScrollRef = useRef(null);
  const touchX = useRef(null);
  const rowTarget = useRowTarget();

  // Reset the view each time the overlay opens (adjusted during render, the
  // same pattern Header uses for route changes).
  const [openedWith, setOpenedWith] = useState(null);
  const openKey = open ? `open:${startIndex}` : null;
  if (openKey !== openedWith) {
    setOpenedWith(openKey);
    if (open) {
      setView(startIndex == null ? { mode: "grid", index: 0, fromGrid: false } : { mode: "image", index: startIndex, fromGrid: false });
    }
  }

  const total = images.length;
  const go = useCallback(
    (delta) => setView((v) => ({ ...v, index: (v.index + delta + total) % total })),
    [total]
  );

  const back = useCallback(() => {
    if (view?.mode === "image" && view.fromGrid) setView((v) => ({ ...v, mode: "grid" }));
    else onClose();
  }, [view, onClose]);

  // Scroll lock + focus management.
  useEffect(() => {
    if (!open) return undefined;
    const previouslyFocused = document.activeElement;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    window.__lenis?.stop();
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      html.style.overflow = prevOverflow;
      window.__lenis?.start();
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") back();
      else if (view?.mode === "image" && e.key === "ArrowRight") go(1);
      else if (view?.mode === "image" && e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, view, back, go]);

  // Warm the neighbouring full-size images so next/prev feels instant.
  useEffect(() => {
    if (!open || view?.mode !== "image" || total < 2) return;
    [1, -1].forEach((d) => {
      const img = new Image();
      img.src = images[(view.index + d + total) % total].src;
    });
  }, [open, view, images, total]);

  const current = view?.mode === "image" ? images[view.index] : null;

  return createPortal(
    <AnimatePresence>
      {open && view && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${title}: image gallery`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="fixed inset-0 z-[60] flex flex-col bg-[color:var(--color-ink)] text-[color:var(--color-paper)]"
        >
          {/* Top bar */}
          <div className="container-edit flex h-[76px] shrink-0 items-center justify-between gap-4 border-b border-[color:var(--color-line-dark)] sm:h-[88px]">
            <div className="flex min-w-0 items-center gap-4">
              {view.mode === "image" && view.fromGrid && (
                <button
                  type="button"
                  onClick={() => setView((v) => ({ ...v, mode: "grid" }))}
                  aria-label="Back to all images"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[color:var(--color-line-dark)] transition-colors duration-300 hover:border-[color:var(--color-mist-light)]"
                >
                  <ArrowLeft size={18} strokeWidth={1.6} />
                </button>
              )}
              <div className="min-w-0">
                <p className="font-display truncate text-lg font-medium sm:text-xl">{title}</p>
                <p className="eyebrow mt-0.5 text-[color:var(--color-mist-light)]">
                  {view.mode === "image" ? (
                    <span className="tabular-nums">
                      {String(view.index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                    </span>
                  ) : (
                    `${total} Images`
                  )}
                </p>
              </div>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close gallery"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[color:var(--color-line-dark)] transition-colors duration-300 hover:border-[color:var(--color-mist-light)]"
            >
              <X size={19} strokeWidth={1.6} />
            </button>
          </div>

          {view.mode === "grid" ? (
            <div ref={gridScrollRef} data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain">
              <div className="container-edit flex flex-col gap-2 py-6 sm:gap-3 sm:py-10">
                {toRows(images, rowTarget).map((row, r) => (
                  <div key={r} className="flex gap-2 sm:gap-3">
                    {row.items.map(({ img, index }) => (
                      <button
                        key={img.id}
                        type="button"
                        onClick={() => setView({ mode: "image", index, fromGrid: true })}
                        aria-label={`Open image ${index + 1} of ${total}`}
                        className="group relative overflow-hidden bg-[color:var(--color-charcoal)]"
                        style={{ flex: `${img.w / img.h} 1 0%`, aspectRatio: `${img.w} / ${img.h}` }}
                      >
                        <img
                          src={img.thumb}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-[transform,opacity] duration-700 ease-[var(--ease-out-editorial)] group-hover:scale-[1.03] group-hover:opacity-90"
                        />
                      </button>
                    ))}
                    {row.filler > 0 && <div aria-hidden="true" style={{ flex: `${row.filler} 1 0%` }} />}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div
              className="relative flex min-h-0 flex-1 items-center justify-center px-4 py-5 sm:px-24 sm:py-8"
              onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
              onTouchEnd={(e) => {
                if (touchX.current == null) return;
                const dx = e.changedTouches[0].clientX - touchX.current;
                touchX.current = null;
                if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={current.id}
                  src={current.src}
                  alt={`${title}: image ${view.index + 1} of ${total}`}
                  width={current.w}
                  height={current.h}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="h-auto max-h-full w-auto max-w-full select-none object-contain"
                  draggable={false}
                />
              </AnimatePresence>

              {total > 1 && (
                <>
                  <NavButton side="left" onClick={() => go(-1)} label="Previous image">
                    <ChevronLeft size={20} strokeWidth={1.5} />
                  </NavButton>
                  <NavButton side="right" onClick={() => go(1)} label="Next image">
                    <ChevronRight size={20} strokeWidth={1.5} />
                  </NavButton>
                </>
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

function NavButton({ side, onClick, label, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "absolute bottom-5 flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--color-line-dark)] bg-[color:var(--color-ink)]/60 backdrop-blur-sm transition-colors duration-300 hover:border-[color:var(--color-mist-light)] sm:bottom-auto sm:top-1/2 sm:h-12 sm:w-12 sm:-translate-y-1/2",
        side === "left" ? "left-4 sm:left-8" : "right-4 sm:right-8"
      )}
    >
      {children}
    </button>
  );
}
