// Whether the brand intro (logo reveal) plays on this page load: once per
// browser session, and never when the visitor prefers reduced motion.
// Decided once, at load, so the intro and the hero animation agree.
const KEY = "mahum-intro-seen";

function decide() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    if (sessionStorage.getItem(KEY)) return false;
    sessionStorage.setItem(KEY, "1");
  } catch {
    return false;
  }
  return true;
}

export const INTRO_ACTIVE = decide();

// How long page-entry animations should wait for the intro to clear (s).
export const INTRO_DELAY = INTRO_ACTIVE ? 1.45 : 0;
