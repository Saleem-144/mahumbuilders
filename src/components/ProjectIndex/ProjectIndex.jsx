import { useEffect, useRef, useState } from "react";
import { Link } from "../../router/Router";
import Arrow from "../Arrow/Arrow";
import { RevealGroup, RevealItem } from "../Reveal/Reveal";
import { cn } from "../../lib/cn";

const canHover = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/**
 * Editorial project list. Each row is a large project name with its location,
 * sector and year. On desktop, hovering a row shows that project's photo
 * floating beside the cursor; the other rows dim. On touch screens each row
 * carries a small thumbnail instead.
 */
export default function ProjectIndex({ projects, light = false }) {
  const [active, setActive] = useState(null);
  const [hoverable] = useState(canHover);
  const preview = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  // Ease the preview towards the cursor for a soft, trailing motion.
  useEffect(() => {
    if (!hoverable) return undefined;
    let raf;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.14;
      pos.current.y += (target.current.y - pos.current.y) * 0.14;
      if (preview.current) {
        preview.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hoverable]);

  // Scrolling moves the list away from a resting cursor without firing
  // mouseleave, so hide the preview until the pointer moves again.
  useEffect(() => {
    if (!hoverable) return undefined;
    const hide = () => setActive(null);
    window.addEventListener("scroll", hide, { passive: true });
    return () => window.removeEventListener("scroll", hide);
  }, [hoverable]);

  const onMove = (e) => {
    target.current = { x: e.clientX + 170, y: e.clientY };
    if (active === null) pos.current = { ...target.current };
  };

  const ink = light ? "text-[color:var(--color-paper)]" : "text-[color:var(--color-ink)]";
  const muted = light ? "text-[color:var(--color-stone)]" : "text-[color:var(--color-mist)]";
  const line = light ? "border-white/15" : "border-[color:var(--color-line)]";

  return (
    <div onMouseMove={hoverable ? onMove : undefined} onMouseLeave={() => setActive(null)}>
      <RevealGroup className={cn("group/list border-b", line)}>
        {projects.map((project, i) => (
          <RevealItem key={project.slug}>
            <Link
              to={`/projects/${project.slug}`}
              onMouseEnter={() => setActive(project.slug)}
              onMouseMove={() => active !== project.slug && setActive(project.slug)}
              onFocus={() => setActive(project.slug)}
              className={cn(
                "group grid grid-cols-[2rem_minmax(0,1fr)_4.5rem] items-center gap-x-4 border-t py-5 transition-opacity duration-500 sm:grid-cols-[3rem_minmax(0,1fr)_6rem] sm:py-6",
                "lg:grid-cols-[3.5rem_minmax(0,1.7fr)_minmax(0,1fr)_minmax(0,0.6fr)_3rem] lg:py-7",
                hoverable && "group-hover/list:opacity-35 hover:!opacity-100",
                line
              )}
            >
              <span className={cn("index-label self-start pt-2 lg:self-center lg:pt-0", muted)}>
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="min-w-0">
                <span className={cn("flex flex-wrap items-baseline gap-x-4 gap-y-1", ink)}>
                  <span className="font-display text-[clamp(1.75rem,4vw,3.5rem)] font-normal leading-[1.05] transition-transform duration-500 ease-[var(--ease-out-editorial)] group-hover:translate-x-2">
                    {project.title}
                  </span>
                  {project.status && (
                    <span className={cn("index-label whitespace-nowrap border px-2.5 py-1", light ? "border-white/30" : "border-[color:var(--color-ink)]/30")}>
                      {project.status}
                    </span>
                  )}
                </span>
                <span className={cn("mt-1.5 block text-[0.8125rem] lg:hidden", muted)}>
                  {[project.location, project.sector].filter(Boolean).join(" · ")}
                </span>
              </span>

              <span className={cn("hidden text-sm lg:block", muted)}>{project.location}</span>
              <span className={cn("hidden text-sm lg:block", muted)}>{project.sector}</span>

              {/* Touch screens: thumbnail. Desktop: arrow. */}
              <span className="aspect-[4/3] w-full overflow-hidden bg-[color:var(--color-stone)] lg:hidden">
                <img src={project.cover.src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </span>
              <span className={cn("hidden justify-end lg:flex", ink)}>
                <Arrow />
              </span>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>

      {hoverable && (
        <div
          ref={preview}
          aria-hidden="true"
          className={cn(
            "pointer-events-none fixed left-0 top-0 z-30 aspect-[4/3] w-[min(26vw,380px)] overflow-hidden transition-[opacity,scale] duration-500 ease-[var(--ease-out-editorial)]",
            active ? "scale-100 opacity-100" : "scale-90 opacity-0"
          )}
        >
          {projects.map((project) => (
            <img
              key={project.slug}
              src={project.cover.src}
              alt=""
              loading="lazy"
              decoding="async"
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
                active === project.slug ? "opacity-100" : "opacity-0"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
