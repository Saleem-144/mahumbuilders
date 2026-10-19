// Site imagery. Almost everything is MAHUM's own photography (served from
// public/portfolio-web via portfolioImage). The few Unsplash entries left are
// placeholders for the Marine Tower Offices, Box Home and MAHUM Residency
// projects until their real photos arrive.
//
// Each entry carries a `fallback` label rendered by <Photo /> if the remote
// image ever fails to load, so the layout never shows a broken-image icon.

import { portfolioImage } from "./portfolio";

const u = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const images = {
  aboutFacade: {
    src: u("photo-1600585154340-be6161a56a0c", 1800),
    alt: "Modern minimalist residence with reflecting pool",
    fallback: "MAHUM Project",
  },
  officeInterior: {
    src: u("photo-1497366216548-37526070297c", 1800),
    alt: "Contemporary commercial office interior",
    fallback: "Commercial Interior",
  },
  officeReception: {
    src: u("photo-1497366811353-6870744d04b2", 1600),
    alt: "Office reception area with warm timber finishes",
    fallback: "Commercial Interior",
  },
  commercialFacade: {
    src: u("photo-1486406146926-c627a92ad1ab", 1800),
    alt: "Glass and steel commercial building facade",
    fallback: "Commercial Development",
  },
  poolTerrace: {
    src: u("photo-1600585154526-990dced4db0d", 1800),
    alt: "Outdoor terrace and living space",
    fallback: "Residential Project",
  },
  // Real client photography (portfolio-originals → public/portfolio-web).
  // Service cards (keys referenced from data/services.js).
  serviceLand: {
    ...portfolioImage(
      "bahrban-hunza",
      "progress-dd482b36-75e6-4501-a6e7-6e2fd6609aeb",
      "Snow-capped Karakoram peaks above the BAHRBAN site in Hunza"
    ),
    fallback: "Land Acquisition",
  },
  serviceDesign: {
    ...portfolioImage("casa-solara", "5", "Casa Solara — timber-screened facade and glass balcony"),
    fallback: "Design and Architecture",
  },
  serviceApprovals: {
    ...portfolioImage("house-87b", "14", "House 87B — completed street elevation in DHA Phase 8"),
    fallback: "Approvals",
  },
  serviceConstruction: {
    ...portfolioImage(
      "bahrban-hunza",
      "progress-wip-7",
      "BAHRBAN cabin under construction — clad volumes on a stone base, with scaffolding"
    ),
    fallback: "Construction Execution",
  },
  serviceManagement: {
    ...portfolioImage(
      "bahrban-hunza",
      "progress-9232ba4d-ffb6-4e58-a4db-15ed92643df0",
      "BAHRBAN site in progress — steel cabin frames laid out across the valley"
    ),
    fallback: "Project Management",
  },
  serviceUtilities: {
    ...portfolioImage("house-82b", "21", "House 82B — finished kitchen with fitted cabinetry and lighting"),
    fallback: "Utility Connections",
  },
  // Services page "Interior Revamp Solutions".
  interiorRevamp: {
    ...portfolioImage("vsurfaces", "7", "VSurfaces showroom — finished commercial interior"),
    fallback: "Interior Revamp",
  },
  // Background of the closing call-to-action band on every page.
  ctaExterior: {
    ...portfolioImage("bahrban-hunza", "aerial-aerial-view", "Aerial view of the Hunza valley"),
    fallback: "MAHUM Builders",
  },
  // Home page hero (full-bleed, under a dark gradient).
  heroExterior: {
    ...portfolioImage(
      "courtyard-home",
      "elevation-viii",
      "Courtyard Home at dusk — lit timber-screened upper floor over glazed living spaces"
    ),
    fallback: "MAHUM Project",
  },
  // About page "Company Introduction".
  aboutIntro: {
    ...portfolioImage(
      "stone-villa",
      "1a",
      "Stone Villa — stone-clad facade and cantilevered roof framed by trees"
    ),
    fallback: "MAHUM Project",
  },
  // Home page "Company Introduction".
  homeIntro: {
    ...portfolioImage(
      "house-82b",
      "39",
      "House 82B at dusk — cantilevered upper volumes above a lit, planted boundary wall"
    ),
    fallback: "MAHUM Project",
  },
  // "Two Ways We Build" (Developments section).
  ownDevelopmentBahrban: {
    ...portfolioImage(
      "bahrban-hunza",
      "progress-264a6ebd-bb0b-47dc-8b69-f99d1e418eab",
      "Bahrban, Hunza — gabled cabins with full-height glazing rising among poplars in the mountain valley"
    ),
    fallback: "MAHUM Development",
  },
  clientProjectDusk: {
    ...portfolioImage(
      "casa-solara",
      "49",
      "Turn-key residence at dusk — timber-screened upper floor above a lit stone boundary wall"
    ),
    fallback: "Client Project",
  },
};

// Home page "Life at MAHUM" carousel — the client's own photography, each
// card captioned with its project and what it shows (`label` / `tag`).
const card = (slug, id, label, tag, alt) => ({
  type: "image",
  ...portfolioImage(slug, id, alt),
  fallback: `${label} — ${tag}`,
  label,
  tag,
});

export const carouselMedia = [
  card("casa-solara", "51", "Casa Solara", "Exterior", "Casa Solara at dusk, lit timber-screened facade"),
  card("casa-solara", "9", "Casa Solara", "Interior", "Casa Solara floating timber staircase in a double-height hall"),
  card("house-82b", "31", "House 82B", "Exterior", "House 82B at dusk, cantilevered upper volume"),
  card("house-82b", "43", "House 82B", "Interior", "House 82B timber staircase with glass balustrade"),
  card("pool-house", "asa-8943", "Pool House", "Courtyard", "Pool House courtyard pool beneath timber screens"),
  card("stone-villa", "5", "Stone Villa", "Exterior", "Stone Villa stone-clad facade and glass balcony"),
  card("stone-villa", "11", "Stone Villa", "Interior", "Stone Villa bathroom with backlit mirror and stone basin"),
  card("vsurfaces", "2", "VSurfaces", "Exterior", "VSurfaces building at dusk with illuminated signage"),
  card("vsurfaces", "10", "VSurfaces", "Interior", "VSurfaces open-tread staircase lined with planting"),
  card("tabbani-house", "17", "Tabbani House", "Interior", "Tabbani House cantilevered timber staircase"),
  card("courtyard-home", "elevation-vii", "Courtyard Home", "Exterior", "Courtyard Home at dusk, timber-screened upper floor"),
  card("bahrban-hunza", "progress-wip-19", "BAHRBAN", "Construction", "Bahrban cabin under construction in the Hunza valley"),
];
