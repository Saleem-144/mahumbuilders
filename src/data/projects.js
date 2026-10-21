import { images } from "./images";
import { portfolioImage } from "./portfolio";

// Source: MAHUM Builders Company Profile, "Portfolio" (p.07–11).
// Only fields confirmed by the company profile are populated — nothing here
// is invented. `category` ("MAHUM Development" / "Client Project") is only
// set where the source text explicitly supports it.
//
// Photography:
// - Projects with real client photography (portfolio-originals/) have
//   `galleryRows` — a hand-curated selection, laid out row by row (one id =
//   full-width frame; two or three ids share a row). Ids are the image ids in
//   the project's generated manifest (src/data/portfolio/<slug>.json); the
//   full set is reachable through "View All Images". `film` labels the
//   project's video(s) (files come from the manifest) and names a poster.
// - Projects without photography yet keep their placeholder `gallery`.

// MAHUM's scope on every project, as confirmed by the client.
const SCOPE = ["Grey", "Finishing", "Hard and Soft Interiors"];

export const projects = [
  {
    slug: "casa-solara",
    title: "Casa Solara",
    location: "Phase 8, DHA, Karachi",
    year: "2025",
    architect: "Rehman & Rahman",
    type: "Real Estate Development Project",
    area: "10,000+ sq. ft.",
    plot: "666 sq. yd.",
    scope: SCOPE,
    category: null,
    cover: portfolioImage("casa-solara", "48", "Casa Solara at dusk — street elevation with timber screens lit from within"),
    galleryRows: [["5"], ["4", "9", "51"], ["34", "56"], ["30", "15"], ["32", "39"]],
    film: { labels: ["Casa Solara — Project Film"], poster: "48" },
  },
  {
    slug: "house-87b",
    title: "House 87B",
    location: "Phase 8, DHA, Karachi",
    year: "2023",
    architect: "Coalesce",
    type: "Real Estate Development Project",
    area: "8,000 sq. ft.",
    plot: "500 sq. yd.",
    scope: SCOPE,
    category: null,
    cover: portfolioImage("house-87b", "17", "House 87B at dusk — timber-screened terrace above the lit white boundary wall"),
    galleryRows: [["14"], ["5", "15", "6"], ["13", "8"], ["11", "16"], ["12", "2"]],
  },
  {
    slug: "vsurfaces",
    title: "VSurfaces",
    location: "Bukhari Commercial, DHA, Karachi",
    year: "2023",
    client: "Venus Carpets",
    architect: "TSM Design Studio",
    type: "Turn-key Commercial Build",
    area: "12,500 sq. ft.",
    plot: "200 sq. yd.",
    scope: SCOPE,
    category: "Client Project",
    cover: portfolioImage("vsurfaces", "6", "VSurfaces facade — travertine cladding and illuminated signage above the showroom glazing"),
    galleryRows: [["8"], ["1", "2", "5"], ["7", "9"], ["10", "11", "4"]],
    film: { labels: ["VSurfaces — Project Video"], poster: "2" },
  },
  {
    slug: "house-82b",
    title: "House 82B",
    location: "Phase 8, DHA, Karachi",
    year: "2022",
    architect: "Shahzad Brothers",
    type: "Real Estate Development Project",
    area: "8,300 sq. ft.",
    plot: "500 sq. yd.",
    scope: SCOPE,
    category: null,
    cover: portfolioImage("house-82b", "40", "House 82B at dusk — stone-clad upper volume and lit entrance"),
    galleryRows: [["1"], ["2", "31"], ["3"], ["43", "36"], ["44", "21"], ["10", "26"]],
    film: { labels: ["MAHUM Builders — Fashion Film"], poster: "39" },
  },
  {
    slug: "stone-villa",
    title: "Stone Villa",
    location: "BTK Hills, Bahria Town, Karachi",
    year: "2023",
    architect: "Rehman & Rahman",
    type: "Turn-key Residential Build",
    area: "5,500 sq. ft.",
    plot: "500 sq. yd.",
    scope: SCOPE,
    category: null,
    cover: portfolioImage("stone-villa", "1a", "Stone Villa — stone-clad facade and cantilevered roof, corner view"),
    galleryRows: [["2a"], ["5", "7", "10"], ["17", "21"], ["16", "11", "26"]],
  },
  {
    slug: "marine-tower-offices",
    title: "Marine Tower Offices",
    location: "Clifton, Karachi",
    year: "2023",
    architect: "NAQSH",
    type: "Turn-key Interior",
    area: "2,500 sq. ft.",
    scope: SCOPE,
    category: null,
    cover: images.officeReception,
    gallery: [images.officeReception, images.officeInterior],
  },
  {
    slug: "mahum-offices",
    title: "MAHUM Offices",
    location: "Phase 8, DHA, Karachi",
    year: "2019",
    architect: "Shahzad Brothers",
    type: "Real Estate Development Project",
    area: "5,800 sq. ft.",
    scope: SCOPE,
    category: null,
    cover: portfolioImage("mahum-offices", "mahum-offices", "MAHUM Offices — slender five-storey commercial building"),
    galleryRows: [
      ["21462488-1860174444000527-1207944980551245250-n", "22045900-1860174627333842-4392918316279884858-n", "22195791-1860174474000524-5278552101757792849-n"],
      ["22045606-1860174610667177-7833348877152228331-n", "22046908-1860174544000517-2789455463052330859-n"],
      ["22089138-1860174617333843-7489230472515616425-n", "22141011-1860174527333852-3326879260806139669-n"],
      ["22090131-1860174540667184-6768023978301788821-n", "mahum-offices"],
    ],
  },
  {
    slug: "box-home",
    title: "Box Home",
    location: "Phase 8, DHA, Karachi",
    year: "2020",
    client: "Shahid Khan Afridi",
    architect: "Shahzad Brothers",
    type: "Turn-key Residential Build",
    area: "7,800 sq. ft.",
    scope: SCOPE,
    category: "Client Project",
    cover: portfolioImage(
      "box-home",
      "41158175-2379979385353361-4915519040102858752-n",
      "Box Home at dusk — lit two-storey facade with timber screens and boundary wall"
    ),
    // Walk-through order: arrival, entrance, lobby, living, kitchen, bedrooms,
    // bathrooms, basement.
    galleryRows: [
      ["40615066-2376215502396416-5972119147113349120-n", "41079360-2379979335353366-1184218510386003968-n", "tmr5nfui"],
      ["court", "entrace-foyer", "entrance-lobby"],
      ["lobby"],
      ["lounge-kitchen", "lounge"],
      ["q557zzlq", "jjriesjc"],
      ["master", "tvelt-ag", "ulbedroom"],
      ["masterbath", "ndbf3n8q", "bath-1"],
      ["basement-hall", "ul-lounge"],
    ],
  },
  {
    slug: "bahrban-hunza",
    title: "BAHRBAN",
    location: "Hunza, GB, Pakistan",
    year: "2026",
    architect: "Coalesce",
    type: "Hotel Development",
    area: "35,000 sq. ft.",
    scope: SCOPE,
    category: "MAHUM Development",
    featuredNote: "MAHUM's flagship hotel project, redefining regional luxury.",
    cover: portfolioImage("bahrban-hunza", "progress-wip-22", "BAHRBAN, Hunza — gabled cabin with a full-height glazed end against the mountains"),
    galleryRows: [
      ["aerial-aerial-view"],
      ["aerial-clear-aerial-view-of-land", "aerial-high-altitude-view"],
      ["progress-0e07e631-5ddb-426e-8dc4-a7c56359cc6c", "progress-3c41d327-e30a-48b5-abfc-126189a16fec", "progress-wip-19"],
      ["progress-264a6ebd-bb0b-47dc-8b69-f99d1e418eab", "progress-wip-1"],
      ["progress-6ac4d910-b5e8-46f7-a575-d5cfb824a8ff", "progress-wip-21"],
    ],
    film: { labels: ["Location and KKH Accessibility View"], poster: "aerial-clear-aerial-view-of-land" },
  },

  // Projects supplied as photography first; details as confirmed by the
  // client. Add year, architect, area, etc. here once known — the detail
  // page shows only the fields that exist.
  {
    slug: "house-84c",
    title: "House 84C",
    location: "Phase 6, DHA, Karachi",
    type: "Real Estate Development Project",
    scope: SCOPE,
    cover: portfolioImage("house-84c", "kpot8qva", "House 84C at dusk — lit double-height facade and boundary wall"),
    galleryRows: [["4uewwe6a"], ["yy7qfy8q", "8diyp01a", "wknpa57w"], ["rtasrskq", "rzs0dhpq"], ["iysw6zhw", "imispwmq"]],
  },
  {
    slug: "courtyard-home",
    title: "Courtyard Home",
    location: "Phase 6, DHA, Karachi",
    type: "Real Estate Development Project",
    scope: SCOPE,
    cover: portfolioImage("courtyard-home", "elevation-viii", "Courtyard Home at dusk — timber-screened upper floor over glazed living spaces"),
    galleryRows: [
      ["courtyard-iv"],
      ["elevation-vii", "courtyard-iii", "elevation-iii"],
      ["elevation-i", "main-gate"],
      ["staircase-i", "master-bed-iv"],
      ["kitchen-iv", "master-bath-i"],
    ],
  },
  {
    slug: "pool-house",
    title: "Pool House",
    location: "Phase 6, DHA, Karachi",
    type: "Real Estate Development Project",
    scope: SCOPE,
    cover: portfolioImage("pool-house", "asa-8999", "Pool House at dusk — courtyard pool framed by timber screens"),
    galleryRows: [["asa-7308"], ["asa-8943", "asa-8887"], ["asa-8901", "asa-8987"], ["asa-7379", "asa-7416", "asa-9133"], ["asa-7403", "asa-7359"]],
  },
  {
    slug: "tabbani-house",
    title: "Tabbani House",
    location: "Phase 6, DHA, Karachi",
    type: "Turn-key Residential Build",
    scope: SCOPE,
    cover: portfolioImage("tabbani-house", "9", "Tabbani House — white two-storey facade with dark-clad entrance portal"),
    galleryRows: [["3"], ["1", "7", "12"], ["14", "8"], ["17", "15", "20"]],
  },
];

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug);

// Projects with real client photography.
export const photographedProjects = projects.filter((p) => p.galleryRows);

// Home page "Featured Projects" — photographed projects only.
export const featuredProjects = [
  "casa-solara",
  "bahrban-hunza",
  "house-82b",
  "stone-villa",
  "vsurfaces",
  "pool-house",
].map(getProjectBySlug);
