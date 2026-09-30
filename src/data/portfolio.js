// Real client photography. Each project's full image/video list lives in its
// own generated manifest (src/data/portfolio/<slug>.json — written by
// scripts/build-portfolio.mjs), and Vite splits each one into a separate
// chunk, so a project page only ever downloads its own list.
const manifests = import.meta.glob("./portfolio/*.json", { import: "default" });

export function loadPortfolio(slug) {
  const load = manifests[`./portfolio/${slug}.json`];
  return load ? load() : Promise.resolve(null);
}

// A single photo, by the id the build script gave it (a slug of the original
// filename). `src` is the gallery-sized copy, `large` the full-width one.
export const portfolioImage = (slug, id, alt) => ({
  src: `/portfolio-web/${slug}/${id}-960.webp`,
  large: `/portfolio-web/${slug}/${id}-2000.webp`,
  alt,
});
