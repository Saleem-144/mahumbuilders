import { cn } from "../../lib/cn";

// Thin drawn arrow used across buttons and links. The shaft stretches on
// hover of the nearest `.group`, which reads more architectural than an icon.
export default function Arrow({ className, direction = "right" }) {
  return (
    <svg
      viewBox="0 0 30 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      aria-hidden="true"
      className={cn(
        "h-2.5 w-[1.375rem] shrink-0 overflow-visible transition-transform duration-500 ease-[var(--ease-out-editorial)] group-hover:translate-x-1.5",
        direction === "down" && "rotate-90",
        direction === "up-right" && "-rotate-45",
        className
      )}
    >
      <path d="M0 5h28.5M24.5 1l4.25 4-4.25 4" strokeLinecap="square" />
    </svg>
  );
}
