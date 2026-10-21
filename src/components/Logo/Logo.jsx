import { MARK, WORDMARK, EST } from "./logoPaths";
import { cn } from "../../lib/cn";

// One part of the logo (mark, wordmark or year) as an inline SVG, filled
// with the current text colour so it follows the surrounding light/dark
// styling. Height is set by the caller; width follows the part's proportions.
function Part({ part, className, hairline = false }) {
  return (
    <svg
      viewBox={`0 0 ${part.w} ${part.h}`}
      className={cn("block w-auto", className)}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      // The house outline is a hairline (≈1/150 of the mark's height). At
      // header size that is a fraction of a pixel, so a thin screen-space
      // stroke keeps it from fading out without visibly changing the drawing.
      {...(hairline && { stroke: "currentColor", strokeWidth: 0.2 })}
    >
      {part.paths.map((d) => (
        <path key={d.slice(0, 24)} d={d} vectorEffect={hairline ? "non-scaling-stroke" : undefined} />
      ))}
    </svg>
  );
}

/**
 * MAHUM Builders logo, from the client's brand guideline.
 * - "lockup": mark beside the "MAHUM BUILDERS" wordmark — for the header.
 * - "stacked": mark above wordmark and "est 1988", as in the guideline.
 */
export default function Logo({ variant = "lockup", className }) {
  if (variant === "stacked") {
    return (
      <span role="img" aria-label="MAHUM Builders, est 1988" className={cn("inline-flex flex-col items-center", className)}>
        <Part part={MARK} hairline className="h-[4.5rem]" />
        <Part part={WORDMARK} className="mt-2.5 h-[0.6875rem]" />
        <Part part={EST} className="mt-2 h-[0.5625rem]" />
      </span>
    );
  }

  return (
    <span role="img" aria-label="MAHUM Builders" className={cn("inline-flex items-center gap-2.5 sm:gap-3", className)}>
      <Part part={MARK} hairline className="h-10 sm:h-12" />
      <Part part={WORDMARK} className="h-[0.5625rem] sm:h-[0.6875rem]" />
    </span>
  );
}
