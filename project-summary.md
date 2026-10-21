# MAHUM Builders — Website

Corporate website for **MAHUM Builders**, a Karachi-based real estate development and construction firm (est. 1988). It presents the company, its turn-key services, its portfolio of client projects and own developments, and contact details.

Production URL (configured in `index.html`): `https://www.mahumbuilders.com/`

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | React 19, built with Vite 8 |
| Styling | Tailwind CSS 4 (via `@tailwindcss/vite`) plus design tokens and utilities in `src/styles/globals.css` |
| Animation | `motion` (section reveals, overlays), GSAP (home hero intro only) |
| Smooth scroll | Lenis (disabled when the visitor prefers reduced motion) |
| Icons | `lucide-react` (Facebook/Instagram glyphs are local SVGs in the footer) |
| Image processing | `sharp` (dev dependency, used only by the portfolio build script) |
| Routing | Small in-house client-side router: `src/router/Router.jsx` |

## Pages and routes

| Route | Page | Source |
| --- | --- | --- |
| `/` | Home | `src/pages/Home/` (sections in `sections/`) |
| `/about` | About Us | `src/pages/About/About.jsx` |
| `/services` | Services | `src/pages/Services/Services.jsx` |
| `/projects` | Projects listing | `src/pages/Projects/Projects.jsx` |
| `/projects/:slug` | Project detail | `src/pages/ProjectDetails/ProjectDetails.jsx` |
| `/contact` | Contact Us | `src/pages/Contact/Contact.jsx` |
| anything else | 404 | `src/pages/NotFound/NotFound.jsx` |

Routes are declared in `src/App.jsx`. Each page sets its own browser title with `useDocumentTitle` (`src/lib/useDocumentTitle.js`).

## Project structure

```
index.html                 HTML shell, SEO + Open Graph meta tags
vercel.json                SPA fallback so deep links (e.g. /projects/casa-solara) resolve
brand/                     Client logo guideline PDF + logo/icon SVGs extracted from it
public/
  favicon.svg, favicon.ico, apple-touch-icon.png   Brand icon (from the guideline)
  og-cover.jpg             Social-share image (1200×630, from the Casa Solara cover photo)
  portfolio-web/           Optimized WebP photos + web videos (generated, committed)
portfolio-originals/       Client's full-size master photos/videos (local only, git-ignored)
scripts/build-portfolio.mjs  Builds public/portfolio-web/ and the manifests from the originals
src/
  App.jsx, main.jsx
  router/Router.jsx        Router, <Link>, useParams, scroll-to-top on navigation
  components/              Reusable UI (Header, Footer, ProjectGallery, GalleryOverlay, ...)
  pages/                   One folder per page
  data/                    All site content (see below)
  assets/leadership/       Leadership portraits (bundled by Vite)
  lib/                     Small helpers (cn, useDocumentTitle)
  styles/globals.css       Fonts, color tokens, shared utility classes
```

## Content and data

All copy and project data lives in `src/data/`, so content changes rarely touch components.

- `nav.js` — navigation links and company details (address, phones, email, social links). `telHref()` turns a displayed phone number into an international `tel:+92…` link.
- `projects.js` — the portfolio. Each project has a `slug`, `title`, and only the fields confirmed by the company profile (`location`, `year`, `architect`, `client`, `type`, `area`, `scope`, `category`). Missing fields are simply not rendered. `featuredProjects` sets the home-page selection.
- `portfolio/<slug>.json` — generated per-project image/video manifests (do not edit by hand). Loaded lazily, one project per page.
- `portfolio.js` — manifest loader and the `portfolioImage()` helper for referencing a specific photo.
- `images.js` — shared imagery: real portfolio photos, remaining Unsplash placeholders, and the "Life at MAHUM" carousel cards.
- `services.js`, `delivery.js`, `stats.js`, `leadership.js` — page copy sourced from the company profile.

**Do not add information that has not been supplied by the client.** Several projects intentionally have only a title until details are confirmed.

### Adding or updating a photographed project

1. Put the original folder under `portfolio-originals/`.
2. Map the slug to that folder in `PROJECTS` in `scripts/build-portfolio.mjs` (and any videos in `VIDEOS`).
3. Run `npm run portfolio` (add `-- --videos` to encode videos, which needs FFmpeg; `-- --sheets` writes contact sheets for picking images).
4. Add or update the entry in `src/data/projects.js`: `cover`, curated `galleryRows` (image ids from the generated manifest), and an optional `film`.

The script only reprocesses new or changed images. The originals are read-only and are never served by the site.

## Setup and commands

Requires Node.js 20.19+ (Vite 8).

```bash
npm install
npm run dev        # local dev server
npm run lint       # ESLint
npm run build      # production build into dist/
npm run preview    # serve the production build locally
npm run portfolio  # regenerate optimized portfolio images + manifests
```

## Deployment

- Build command: `npm run build`. Output directory: `dist/` (about 200 MB, almost all of it portfolio photos and videos).
- `vercel.json` rewrites unknown paths to `index.html` so the client-side routes work on direct visits and refreshes. If the site is hosted somewhere other than Vercel, replace it with that host's SPA fallback setting.
- Keep the originals out of `public/`: everything in `public/` is copied into `dist/` as-is.

## Known gaps (need client input)

- **Contact form is not connected.** `Contact.jsx` validates the form and shows a thank-you message, but nothing is sent yet. It needs an email/form endpoint.
- **Placeholder photography.** The home hero, About images, CTA backgrounds, service cards, and the Marine Tower Offices and Box Home projects still use Unsplash stock images.
- **Project details pending.** House 84C, Courtyard Home, Pool House and Tabbani House have photos but no confirmed location, year, architect or scope.
- **Map embed** points to "Phase 8 DHA Karachi" generally, not the exact office address.
