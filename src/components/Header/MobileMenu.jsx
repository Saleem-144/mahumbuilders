import { AnimatePresence, motion } from "motion/react";
import { Link } from "../../router/Router";
import { navLinks, company, telHref } from "../../data/nav";
import { cn } from "../../lib/cn";

const EASE = [0.16, 1, 0.3, 1];

// Full-screen menu for phones and tablets. The header (logo and close button)
// stays on top of it in light colours, so the menu reads as one dark screen.
export default function MobileMenu({ open, onClose, location }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="fixed inset-0 z-40 flex flex-col bg-[color:var(--color-umber)] pt-[76px] text-[color:var(--color-paper)] sm:pt-[88px] lg:hidden"
          data-testid="mobile-menu"
        >
          <nav className="container-edit mt-6 flex flex-col border-b border-white/10">
            {navLinks.map((link, i) => {
              const active = location === link.path;
              return (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.06 + i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    onClick={onClose}
                    className="flex items-baseline gap-5 border-t border-white/10 py-4"
                  >
                    <span className="index-label w-6 text-[color:var(--color-stone)]/70">{String(i + 1).padStart(2, "0")}</span>
                    <span
                      className={cn(
                        "font-display text-[1.75rem] leading-none sm:text-[2.125rem]",
                        active ? "italic text-[color:var(--color-stone)]" : "text-[color:var(--color-paper)]"
                      )}
                    >
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="container-edit mt-auto flex flex-col gap-6 pb-10"
          >
            <Link
              to="/contact"
              onClick={onClose}
              className="inline-flex w-fit items-center bg-[color:var(--color-paper)] px-7 py-4 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-[color:var(--color-ink)]"
            >
              Send an Inquiry
            </Link>
            <div className="flex flex-col gap-1.5 text-sm text-[color:var(--color-stone)]">
              <a href={telHref(company.phones[0])} className="w-fit">{company.phones[0]}</a>
              <a href={`mailto:${company.email}`} className="w-fit">{company.email}</a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
