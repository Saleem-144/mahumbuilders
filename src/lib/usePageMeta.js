import { useEffect } from "react";
import { DEFAULT_IMAGE, absoluteUrl } from "../data/seo";

function setAttr(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el && value != null) el.setAttribute(attr, value);
}

// Keeps the document title, description, canonical URL and share tags in step
// with the current page while the visitor navigates. (Each page's HTML file is
// already pre-filled at build time; this covers in-app navigation.)
export function usePageMeta({ title, description, path, image = DEFAULT_IMAGE, noindex = false }) {
  useEffect(() => {
    document.title = title;
    const url = path ? absoluteUrl(path) : null;
    const imageUrl = absoluteUrl(image.path);

    setAttr('meta[name="description"]', "content", description);
    setAttr('link[rel="canonical"]', "href", url);
    setAttr('meta[property="og:title"]', "content", title);
    setAttr('meta[property="og:description"]', "content", description);
    setAttr('meta[property="og:url"]', "content", url);
    setAttr('meta[property="og:image"]', "content", imageUrl);
    setAttr('meta[property="og:image:alt"]', "content", image.alt);
    setAttr('meta[name="twitter:title"]', "content", title);
    setAttr('meta[name="twitter:description"]', "content", description);
    setAttr('meta[name="twitter:image"]', "content", imageUrl);
    setAttr('meta[name="twitter:image:alt"]', "content", image.alt);

    // Keep "Page Not Found" out of search results.
    let robots = document.head.querySelector('meta[name="robots"]');
    if (robots) robots.setAttribute("content", noindex ? "noindex, follow" : "index, follow");
  }, [title, description, path, image.path, image.alt, noindex]);
}
