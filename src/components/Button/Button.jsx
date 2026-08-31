import { ArrowUpRight } from "lucide-react";
import { Link } from "../../router/Router";
import { cn } from "../../lib/cn";

const variants = {
  primary: "bg-[color:var(--color-ink)] text-[color:var(--color-paper)] hover:bg-[color:var(--color-ink-soft)]",
  ghost: "bg-transparent text-[color:var(--color-ink)] border border-[color:var(--color-line)] hover:border-[color:var(--color-ink)]",
  inverse: "bg-[color:var(--color-paper)] text-[color:var(--color-ink)] hover:bg-[color:var(--color-brass-light)]",
  text: "bg-transparent text-inherit px-0",
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
    "group inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300",
    variant === "text" && "rounded-none px-0 py-1 gap-1.5 text-[0.8125rem] uppercase tracking-[0.12em]",
    variants[variant],
    className
  );

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <ArrowUpRight
          size={variant === "text" ? 14 : 16}
          strokeWidth={1.75}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
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
