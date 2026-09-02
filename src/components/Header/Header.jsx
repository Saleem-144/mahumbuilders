import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "../../router/Router";
import { navLinks, company } from "../../data/nav";
import Button from "../Button/Button";
import MobileMenu from "./MobileMenu";
import { cn } from "../../lib/cn";

// Routes whose hero sits full-bleed and dark directly under the header —
// the header needs light text there until the page is scrolled past it.
const DARK_HERO_ROUTES = [/^\/$/, /^\/projects\/[^/]+$/];

export default function Header() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu on route change. Adjusted during render (the
  // pattern React recommends for "reset state when a prop changes") rather
  // than in an effect, so it doesn't trigger an extra cascading render.
  const [menuLocation, setMenuLocation] = useState(location);
  if (location !== menuLocation) {
    setMenuLocation(location);
    if (menuOpen) setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  const hasDarkHero = DARK_HERO_ROUTES.some((re) => re.test(location));
  const light = hasDarkHero && !scrolled && !menuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled || menuOpen
            ? "border-b border-[color:var(--color-line)] bg-[color:var(--color-paper)]/90 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="container-edit flex h-[76px] items-center justify-between sm:h-[88px]">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-baseline gap-1.5 shrink-0 sm:gap-2"
          >
            <span
              className={cn(
                "font-display text-lg font-medium tracking-tight sm:text-xl lg:text-[1.375rem] transition-colors duration-300",
                light ? "text-[color:var(--color-paper)]" : "text-[color:var(--color-ink)]"
              )}
            >
              MAHUM
            </span>
            <span
              className={cn(
                "text-[0.5625rem] uppercase tracking-[0.16em] sm:text-[0.6875rem] sm:tracking-[0.2em] transition-colors duration-300",
                light ? "text-[color:var(--color-mist-light)]" : "text-[color:var(--color-mist)]"
              )}
            >
              Builders
            </span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {navLinks.map((link) => {
              const active = location === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "link-underline text-[0.8125rem] font-medium uppercase tracking-[0.12em] transition-colors duration-300",
                    light
                      ? active
                        ? "text-[color:var(--color-paper)]"
                        : "text-[color:var(--color-mist-light)] hover:text-[color:var(--color-paper)]"
                      : active
                        ? "text-[color:var(--color-ink)]"
                        : "text-[color:var(--color-mist)] hover:text-[color:var(--color-ink)]"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden sm:inline-flex">
              <Button
                to="/contact"
                variant="ghost"
                icon={false}
                className={cn(
                  "!py-2.5 !px-5 text-xs transition-colors duration-300",
                  light && "!border-[color:var(--color-line-dark)] !text-[color:var(--color-paper)] hover:!border-[color:var(--color-paper)]"
                )}
              >
                {`Enquire — ${company.phones[0]}`}
              </Button>
            </div>
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden",
                light && !menuOpen
                  ? "border-[color:var(--color-line-dark)] text-[color:var(--color-paper)]"
                  : "border-[color:var(--color-line)] text-[color:var(--color-ink)]"
              )}
            >
              {menuOpen ? <X size={19} strokeWidth={1.6} /> : <Menu size={19} strokeWidth={1.6} />}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} location={location} />
    </>
  );
}
