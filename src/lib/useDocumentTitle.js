import { useEffect } from "react";

const SITE = "MAHUM Builders";

// Sets the browser tab / search-result title for the current page. Pass the
// page name ("About Us") to get "About Us | MAHUM Builders", or a full title
// with `{ full: true }` to use it as-is (the home page).
export function useDocumentTitle(title, { full = false } = {}) {
  useEffect(() => {
    document.title = full ? title : `${title} | ${SITE}`;
  }, [title, full]);
}
