// Search and share metadata for every page: titles, descriptions, preview
// images and canonical URLs. Used in the browser (usePageMeta) and at build
// time (vite.config.js), which writes a pre-filled HTML file per page and the
// sitemap, so search engines and WhatsApp/Facebook previews see the right
// details without running the app.

export const SITE_URL = "https://www.mbd-pk.com";
export const SITE_NAME = "MAHUM Builders";

export const DEFAULT_IMAGE = {
  path: "/og-cover.jpg",
  alt: "Casa Solara by MAHUM Builders at dusk, street elevation with lit timber screens",
};

// Static pages, keyed by route.
export const PAGES = {
  "/": {
    title: "MAHUM Builders | Where Innovation Meets Legacy",
    description:
      "MAHUM Builders is a real estate development and construction company in Karachi, established in 1988, with more than 300 residential and commercial projects completed.",
  },
  "/about": {
    title: "About Us | MAHUM Builders",
    description:
      "MAHUM Builders was founded in Karachi in 1988 by Hasan Mustafa, a civil engineer licensed by the Pakistan Engineering Council. More than 300 projects completed.",
  },
  "/services": {
    title: "Turn-Key Construction Services | MAHUM Builders",
    description:
      "Turn-key construction in Karachi: land acquisition, design, DHA and CBC approvals, grey structure, finishing, project management and utility connections.",
  },
  "/projects": {
    title: "Projects | MAHUM Builders",
    description:
      "Homes, commercial buildings, office interiors and hospitality projects by MAHUM Builders in Karachi and Hunza, including Casa Bellini, now available on booking.",
  },
  "/contact": {
    title: "Contact Us | MAHUM Builders",
    description:
      "Contact MAHUM Builders in Phase 8, DHA, Karachi. Call (021) 35833415, email info@mbd-pk.com or send an inquiry through the website.",
  },
};

// One-line summary of MAHUM's role on a project. Shown on the project page
// and used in its search description.
export function describeProject(project) {
  if (project.overview) return project.overview;
  if (!project.type && !project.scope && !project.category) return null;
  if (project.category === "MAHUM Development") {
    return `${project.title} is a MAHUM development, planned, financed and built by our own team.`;
  }
  if (project.category === "Client Project" && project.client) {
    return `MAHUM built ${project.title} for ${project.client} as a turn-key project, from grey structure to handover.`;
  }
  const as = project.type ? ` as a ${project.type.toLowerCase()}` : "";
  return `MAHUM delivered ${project.title}${as}, from grey structure to handover.`;
}

// Trims to roughly what Google shows in a result, ending on a whole word.
function clip(text, max = 160) {
  if (text.length <= max) return text;
  return `${text.slice(0, text.lastIndexOf(" ", max - 1)).replace(/[,.;:]$/, "")}…`;
}

export function projectSeo(project) {
  const lead = [project.title, project.location].filter(Boolean).join(", ");
  const summary = describeProject(project) ?? `${project.title} by ${SITE_NAME}.`;
  const where = project.location ? ` Location: ${project.location}.` : "";
  return {
    path: `/projects/${project.slug}`,
    title: `${lead} | ${SITE_NAME}`,
    // Projects on sale carry their own, written for search results.
    description: project.seoDescription ?? clip(`${summary}${where}`),
    image: { path: `/og/${project.slug}.jpg`, alt: project.cover.alt },
  };
}

export const absoluteUrl = (path) => `${SITE_URL}${path === "/" ? "/" : path}`;
