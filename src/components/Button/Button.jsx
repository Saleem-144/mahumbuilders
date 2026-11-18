import { Link } from "../../router/Router";
import { cn } from "../../lib/cn";
import Arrow from "../Arrow/Arrow";

const variants = {
  primary: "bg-[color:var(--color-ink)] text-[color:var(--color-paper)] hover:bg-[color:var(--color-umber)]",
  ghost: "bg-transparent text-[color:var(--color-ink)] border border-[color:var(--color-ink)]/25 hover:border-[color:var(--color-ink)]",
  inverse: "bg-[color:var(--color-paper)] text-[color:var(--color-ink)] hover:bg-[color:var(--color-paper-dim)]",
  "ghost-light": "bg-transparent text-[color:var(--color-paper)] border border-white/30 hover:border-white/80",
  text: "bg-transparent text-inherit",
};

export default function Button({
  to,
  href,
  onClick,
  type = "button",
  variant = "primary",
  icon = true,
  className,
  children,
  ...rest
}) {
  const classes = cn(
    "group inline-flex items-center gap-3 sm:gap-4 text-[0.6875rem] font-medium uppercase tracking-[0.2em] transition-colors duration-300",
    variant === "text" ? "py-2" : "px-5 py-3.5 sm:px-7 sm:py-4",
    variants[variant],
    className
  );

  const content = (
    <>
      <span>{children}</span>
      {icon && <Arrow />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...rest}>
      {content}
    </button>
  );
}
