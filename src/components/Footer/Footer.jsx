import { Link } from "../../router/Router";
import { navLinks, company, telHref } from "../../data/nav";
import Logo from "../Logo/Logo";
import Arrow from "../Arrow/Arrow";
import { WORDMARK } from "../Logo/logoPaths";
import { FacebookIcon, InstagramIcon } from "../SocialIcons/SocialIcons";

function Column({ title, children }) {
  return (
    <div>
      <p className="index-label text-[color:var(--color-stone)]/70">{title}</p>
      <div className="mt-5 flex flex-col gap-3 text-[0.875rem] text-[color:var(--color-paper)]">{children}</div>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const toTop = () => {
    if (window.__lenis?.scrollTo) window.__lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="overflow-hidden bg-[color:var(--color-umber)] text-[color:var(--color-stone)]">
      <div className="container-edit pt-14 sm:pt-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-4">
            <Logo variant="stacked" className="text-[color:var(--color-paper)]" />
            <p className="mt-6 max-w-xs text-[0.875rem] leading-relaxed">
              {company.tagline}. Real estate development and construction in Karachi since {company.foundedYear}.
            </p>
          </div>

          <div className="lg:col-span-2 lg:col-start-6">
            <Column title="Navigate">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} className="link-underline w-fit">
                  {link.label}
                </Link>
              ))}
            </Column>
          </div>

          <div className="lg:col-span-3">
            <Column title="Contact">
              {company.phones.map((p) => (
                <a key={p} href={telHref(p)} className="link-underline w-fit">
                  {p}
                </a>
              ))}
              <a href={`mailto:${company.email}`} className="link-underline w-fit">
                {company.email}
              </a>
              <span className="max-w-[16rem] leading-relaxed text-[color:var(--color-stone)]">
                {company.address}, Karachi
              </span>
            </Column>
          </div>

          <div className="lg:col-span-2">
            <Column title="Follow">
              <a href={company.instagram.url} target="_blank" rel="noreferrer" className="group inline-flex w-fit items-center gap-2.5">
                <InstagramIcon size={15} />
                <span className="link-underline">Instagram</span>
              </a>
              <a href={company.social.url} target="_blank" rel="noreferrer" className="group inline-flex w-fit items-center gap-2.5">
                <FacebookIcon size={15} />
                <span className="link-underline">Facebook</span>
              </a>
            </Column>
          </div>
        </div>

        {/* The brand wordmark, set across the full width. */}
        <svg
          viewBox={`0 0 ${WORDMARK.w} ${WORDMARK.h}`}
          className="mt-12 block w-full text-[color:var(--color-paper)]/[0.07] sm:mt-16"
          fill="currentColor"
          aria-hidden="true"
        >
          {WORDMARK.paths.map((d) => (
            <path key={d.slice(0, 24)} d={d} />
          ))}
        </svg>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 py-6 text-xs text-[color:var(--color-stone)]/70 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} MAHUM Builders. Founded {company.foundedYear} by {company.founded}.
          </span>
          <button type="button" onClick={toTop} className="group inline-flex w-fit items-center gap-3 uppercase tracking-[0.2em] hover:text-[color:var(--color-paper)]">
            Back to top
            <Arrow className="-rotate-90 group-hover:translate-x-0 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </footer>
  );
}
