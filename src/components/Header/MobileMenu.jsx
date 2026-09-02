import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { Link } from "../../router/Router";
import { navLinks, company } from "../../data/nav";
import { cn } from "../../lib/cn";

export default function MobileMenu({ open, onClose, location }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-40 bg-[color:var(--color-ink)] text-[color:var(--color-paper)] lg:hidden"
          data-testid="mobile-menu"
        >
          <div className="container-edit flex h-[76px] items-center justify-end sm:h-[88px]">
            <button
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--color-line-dark)]"
            >
              <X size={19} strokeWidth={1.6} />
            </button>
          </div>

          <nav className="container-edit mt-6 flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.08 + i * 0.05 }}
              >
                <Link
                  to={link.path}
                  onClick={onClose}
                  className={cn(
                    "font-display block border-b border-[color:var(--color-line-dark)] py-5 text-4xl font-medium sm:text-5xl",
                    location === link.path ? "text-[color:var(--color-brass-light)]" : "text-[color:var(--color-paper)]"
                  )}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="container-edit absolute bottom-10 left-0 right-0 flex flex-col gap-2 text-sm text-[color:var(--color-mist-light)]"
          >
            <a href={`tel:${company.phones[0].replace(/[^\d+]/g, "")}`}>{company.phones[0]}</a>
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
