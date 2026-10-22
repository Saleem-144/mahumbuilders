export const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Projects", path: "/projects" },
  { label: "Contact", path: "/contact" },
];

export const company = {
  name: "MAHUM Builders",
  legalName: "MAHUM",
  tagline: "Where Innovation Meets Legacy",
  founded: "Mr. Hasan Mustafa",
  foundedYear: "1988",
  address: "#401, 59D, Murtaza Lane – 1, Phase 8, DHA",
  // What the Contact page map searches for. Google doesn't recognise the
  // street address on its own, so this targets MAHUM's Google Maps business
  // listing (Bldg C59D, Al-Murtaza Commercial, DHA Phase 8), which pins the
  // office exactly and shows the company name.
  mapQuery: "MAHUM Builders, Al-Murtaza Commercial, DHA Phase 8, Karachi",
  phones: ["(021) 35833415", "0301 8242419"],
  email: "info@mbd-pk.com",
  social: {
    label: "/mahumbuilders",
    url: "https://facebook.com/mahumbuilders",
  },
  instagram: {
    label: "@mahumbuilders",
    url: "https://www.instagram.com/mahumbuilders?igsi=MW9sOGdnMnJnOTJpYg%3D%3D",
  },
};

// `tel:` href in international format for a Pakistani number as displayed
// above: "(021) 35833415" → "tel:+922135833415", "0301 8242419" →
// "tel:+923018242419". Only the leading trunk "0" becomes "+92"; the digits
// themselves are unchanged.
export function telHref(phone) {
  const digits = phone.replace(/\D/g, "");
  return `tel:${digits.startsWith("0") ? `+92${digits.slice(1)}` : `+${digits}`}`;
}
