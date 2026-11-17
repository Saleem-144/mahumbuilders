// Google Analytics 4. Paste the property's Measurement ID ("G-XXXXXXXXXX")
// here to switch tracking on; while it is empty nothing is loaded or sent.
//
// Page views (including in-app navigation) and PDF brochure downloads are
// recorded automatically by GA4's enhanced measurement. On top of that the
// site sends:
//   generate_lead   a contact-form inquiry was delivered
//   contact_click   a phone number or email address was clicked (method: phone | email)
export const GA_MEASUREMENT_ID = "";

let started = false;

export function initAnalytics() {
  if (started || !GA_MEASUREMENT_ID || typeof window === "undefined") return;
  started = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  document.addEventListener("click", (e) => {
    const link = e.target.closest?.('a[href^="tel:"], a[href^="mailto:"]');
    if (!link) return;
    const method = link.getAttribute("href").startsWith("tel:") ? "phone" : "email";
    trackEvent("contact_click", { method, link_url: link.getAttribute("href") });
  });
}

export function trackEvent(name, params = {}) {
  if (started && window.gtag) window.gtag("event", name, params);
}
