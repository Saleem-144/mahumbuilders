// Third-party stock photography (Unsplash) used as placeholder imagery.
// MAHUM's own project photography will replace these as it becomes available —
// swap the URLs below and every page picks up the change automatically.
//
// Each entry carries a `fallback` label rendered by <Photo /> if the remote
// image ever fails to load, so the layout never shows a broken-image icon.

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
    fallback: "Bahrban Hunza — Site",
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
};

export const carouselMedia = [
  { type: "image", ...images.detailStair },
  { type: "image", ...images.interiorLiving },
  { type: "image", ...images.commercialFacade },
  { type: "image", ...images.interiorBath },
  { type: "image", ...images.villaExterior },
  { type: "image", ...images.officeReception },
  { type: "image", ...images.detailMaterial },
  { type: "image", ...images.poolTerrace },
  // To add real footage later: { type: "video", src: "/media/site-walkthrough.mp4", poster: images.heroExterior.src, alt: "..." }
];
