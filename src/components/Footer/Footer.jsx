import { ArrowUpRight } from "lucide-react";
import { Link } from "../../router/Router";
import { navLinks, company } from "../../data/nav";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[color:var(--color-ink)] text-[color:var(--color-mist-light)]">
      <div className="container-edit pt-12 pb-6 sm:pt-16">
        <div className="grid grid-cols-1 gap-10 border-b border-[color:var(--color-line-dark)] pb-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
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

          <div>
            <span className="eyebrow text-[color:var(--color-mist-light)]/70">Follow</span>
            <ul className="mt-3 flex flex-col gap-2.5 text-sm">
              <li>
                <a
                  href={company.social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline inline-flex items-center gap-1.5 text-[color:var(--color-paper)]"
                >
                  {company.social.label}
                  <ArrowUpRight size={13} strokeWidth={1.75} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-5 text-xs text-[color:var(--color-mist-light)]/60 sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} MAHUM Builders. All rights reserved.</span>
          <span>Founded {company.foundedYear} by {company.founded}</span>
        </div>
      </div>
    </footer>
  );
}
