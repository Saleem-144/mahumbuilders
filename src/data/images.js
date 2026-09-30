// Third-party stock photography (Unsplash) used as placeholder imagery.
// MAHUM's own project photography will replace these as it becomes available —
// swap the URLs below and every page picks up the change automatically.
//
// Each entry carries a `fallback` label rendered by <Photo /> if the remote
// image ever fails to load, so the layout never shows a broken-image icon.

import { portfolioImage } from "./portfolio";

const u = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const images = {
  heroExterior: {
    src: u("photo-1600566753086-00f18fb6b3ea", 2400),
    alt: "Contemporary residential facade at dusk with warm interior lighting",
    fallback: "Architectural Photography",
  },
  aboutFacade: {
    src: u("photo-1600585154340-be6161a56a0c", 1800),
    alt: "Modern minimalist residence with reflecting pool",
    fallback: "MAHUM Project",
  },
  ownDevelopment: {
    src: u("photo-1469474968028-56623f02e42e", 1800),
    alt: "Mountain valley landscape in Northern Pakistan",
    fallback: "MAHUM Development",
  },
  clientProject: {
    src: u("photo-1600607687939-ce8a6c25118c", 1800),
    alt: "Turn-key residential construction, exterior view",
    fallback: "Client Project",
  },
  servicesFacade: {
    src: u("photo-1600585152915-d208bec867a1", 1600),
    alt: "Architectural facade detail with clean geometric lines",
    fallback: "Construction Detail",
  },
  detailStair: {
    src: u("photo-1618221195710-dd6b41faaea6", 1600),
    alt: "Interior staircase with architectural lighting",
    fallback: "Interior Detail",
  },
  detailMaterial: {
    src: u("photo-1600047509782-20d39a953885", 1400),
    alt: "Close detail of concrete and stone construction materials",
    fallback: "Material Detail",
  },
  interiorLiving: {
    src: u("photo-1600607687644-aac4c3eac7f4", 1800),
    alt: "Minimal living room interior with natural light",
    fallback: "Interior",
  },
  interiorKitchen: {
    src: u("photo-1600489000022-c2086d79f9d4", 1600),
    alt: "Modern kitchen interior with clean cabinetry",
    fallback: "Interior",
  },
  interiorBath: {
    src: u("photo-1600566752355-35792bedcfea", 1600),
    alt: "Marble bathroom interior with natural lighting",
    fallback: "Interior",
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
  bedroomMinimal: {
    src: u("photo-1600210492486-724fe5c67fb0", 1600),
    alt: "Minimal bedroom interior with natural materials",
    fallback: "Interior",
  },
  mountainWide: {
    src: u("photo-1506905925346-21bda4d32df4", 2000),
    alt: "Wide mountain range landscape",
    fallback: "Mountain Site",
  },
  mountainSnow: {
    src: u("photo-1506905925346-21bda4d32df4", 1600),
    alt: "Snow-capped mountains under clear sky",
    fallback: "Bahrban Hunza — Site",
  },
  villaExterior: {
    src: u("photo-1600566753190-17f0baa2a6c3", 1800),
    alt: "Contemporary villa exterior in daylight",
    fallback: "Residential Project",
  },
  poolTerrace: {
    src: u("photo-1600585154526-990dced4db0d", 1800),
    alt: "Outdoor terrace and living space",
    fallback: "Residential Project",
  },
  ctaExterior: {
    src: u("photo-1449844908441-8829872d2607", 2200),
    alt: "Dramatic mountain landscape at golden hour",
    fallback: "MAHUM Builders",
  },
  // Real client photography (public/PORTFOLIO → public/portfolio-web).
  constructionFrame: {
    ...portfolioImage(
      "bahrban-hunza",
      "progress-wip-2",
      "Steel structural frame rising on concrete piers during construction at Bahrban, Hunza"
    ),
    fallback: "Construction Execution",
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
// `likeCount` is placeholder data for the hover overlay — a realistic-looking
// figure, not a real social metric. Omit it to hide the overlay for a card.
const card = (slug, id, label, tag, alt, likeCount) => ({
  type: "image",
  ...portfolioImage(slug, id, alt),
  fallback: `${label} — ${tag}`,
  label,
  tag,
  likeCount,
});

export const carouselMedia = [
  card("casa-solara", "51", "Casa Solara", "Exterior", "Casa Solara at dusk, lit timber-screened facade", 68),
  card("casa-solara", "9", "Casa Solara", "Interior", "Casa Solara floating timber staircase in a double-height hall", 92),
  card("house-82b", "31", "House 82B", "Exterior", "House 82B at dusk, cantilevered upper volume", 54),
  card("house-82b", "43", "House 82B", "Interior", "House 82B timber staircase with glass balustrade", 101),
  card("pool-house", "asa-8943", "Pool House", "Courtyard", "Pool House courtyard pool beneath timber screens", 77),
  card("stone-villa", "5", "Stone Villa", "Exterior", "Stone Villa stone-clad facade and glass balcony", 63),
  card("stone-villa", "11", "Stone Villa", "Interior", "Stone Villa bathroom with backlit mirror and stone basin", 88),
  card("vsurfaces", "2", "VSurfaces", "Exterior", "VSurfaces building at dusk with illuminated signage", 95),
  card("vsurfaces", "10", "VSurfaces", "Interior", "VSurfaces open-tread staircase lined with planting", 71),
  card("tabbani-house", "17", "Tabbani House", "Interior", "Tabbani House cantilevered timber staircase", 84),
  card("courtyard-home", "elevation-vii", "Courtyard Home", "Exterior", "Courtyard Home at dusk, timber-screened upper floor", 59),
  card("bahrban-hunza", "progress-wip-19", "Bahrban Hunza", "Construction", "Bahrban cabin under construction in the Hunza valley", 90),
];
