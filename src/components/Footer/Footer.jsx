import { Link } from "../../router/Router";
import { navLinks, company } from "../../data/nav";

// lucide-react no longer ships brand/logo icons (Facebook, Instagram, etc.),
// so these two are small local outline glyphs matching the site's existing
// line-icon weight (strokeWidth 1.5, rounded caps/joins) rather than a new
// icon library.
function FacebookIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 3h-2a5 5 0 0 0-5 5v3H6v4h2v6h4v-6h3l1-4h-4V8a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
      <circle cx="12" cy="12" r="3.7" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[color:var(--color-ink)] text-[color:var(--color-mist-light)]">
      <div className="container-edit pt-12 pb-6 sm:pt-16">
        <div className="grid grid-cols-1 gap-10 border-b border-[color:var(--color-line-dark)] pb-10 sm:grid-cols-3">
          <div>
            <span className="font-display block text-2xl font-medium text-[color:var(--color-paper)]">MAHUM</span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed">
              {company.tagline}. Est. {company.foundedYear} — a Karachi-based real estate development and
              construction firm.
            </p>
          </div>

          <div>
            <span className="eyebrow text-[color:var(--color-mist-light)]/70">Navigate</span>
            <ul className="mt-3 flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="link-underline text-sm text-[color:var(--color-paper)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="eyebrow text-[color:var(--color-mist-light)]/70">Contact</span>
            <ul className="mt-3 flex flex-col gap-2.5 text-sm">
              <li>
                <a href={`tel:${company.phones[0].replace(/[^\d+]/g, "")}`} className="link-underline text-[color:var(--color-paper)]">
                  {company.phones[0]}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="link-underline text-[color:var(--color-paper)]">
                  {company.email}
                </a>
              </li>
              <li className="max-w-[220px] leading-relaxed">{company.address}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center gap-5 pt-5 text-xs text-[color:var(--color-mist-light)]/60 sm:grid sm:grid-cols-3 sm:items-center sm:gap-4">
          <span className="text-center sm:justify-self-start sm:text-left">
            © {year} MAHUM Builders. All rights reserved.
          </span>

          <div className="flex items-center gap-5 sm:justify-self-center">
            <a
              href={company.social.url}
              target="_blank"
              rel="noreferrer"
              aria-label="Visit MAHUM Builders on Facebook (opens in a new tab)"
              className="text-[color:var(--color-mist-light)] transition-colors duration-300 hover:text-[color:var(--color-paper)]"
            >
              <FacebookIcon />
            </a>
            <a
              href={company.instagram.url}
              target="_blank"
              rel="noreferrer"
              aria-label="Visit MAHUM Builders on Instagram (opens in a new tab)"
              className="text-[color:var(--color-mist-light)] transition-colors duration-300 hover:text-[color:var(--color-paper)]"
            >
              <InstagramIcon />
            </a>
          </div>

          <span className="text-center sm:justify-self-end sm:text-right">
            Founded {company.foundedYear} by {company.founded}
          </span>
        </div>
      </div>
    </footer>
  );
}
