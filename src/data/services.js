// Source: MAHUM Builders Company Profile, "Our Services" (p.05)
// `icon` names a lucide-react icon, `image` a key from data/images.js, and
// `tags` are short labels drawn directly from each service's own source text
// (never invented) — all three power the ServiceCard grid.
export const services = [
  {
    number: "01",
    title: "Land Acquisition",
    description:
      "MAHUM specializes in identifying and acquiring prime locations for each client's project, ensuring that every aspect aligns with the client's vision and objectives.",
    icon: "MapPin",
    image: "mountainWide",
    tags: ["Site Identification", "Acquisition"],
  },
  {
    number: "02",
    title: "Design & Architecture Service",
    description:
      "The company's panel of approved architects and designers collaborates to create innovative and aesthetically pleasing designs that harmonize with each client's aspirations and the surrounding environment.",
    icon: "PenTool",
    image: "detailStair",
    tags: ["Architecture", "Interior Design"],
  },
  {
    number: "03",
    title: "Approvals from All Authorities",
    description:
      "Navigating the complexities of regulatory compliance, MAHUM secures approvals from relevant authorities, including DHA, CBC, and others, ensuring a hassle-free and expeditious process.",
    icon: "ShieldCheck",
    image: "commercialFacade",
    tags: ["DHA", "CBC", "Approvals"],
  },
  {
    number: "04",
    title: "Construction Execution",
    description:
      "From the initial grey phase to the meticulous installation of MEP systems, the company undertakes every aspect of construction with precision. MAHUM's commitment extends to completing the finishing touches until the project is turn-key, leaving only the interior fit-outs, such as furniture and curtains, for the client.",
    icon: "Building2",
    image: "detailMaterial",
    tags: ["Grey Structure", "MEP", "Turn-Key"],
  },
  {
    number: "05",
    title: "Project Management",
    description:
      "MAHUM's seasoned project management team ensures efficiency by delivering comprehensive project budgets, including cost and time planning, alongside detailed project BOQs, Work Breakdown Structures (WBS), and Gantt charts, providing clear visibility, greater control, and well-defined milestones throughout the construction journey.",
    icon: "ListChecks",
    image: "officeReception",
    tags: ["BOQs", "WBS", "Gantt Charts"],
  },
  {
    number: "06",
    title: "Utility Connections",
    description:
      "The company takes care of all utility connections, streamlining the process and saving its clients valuable time and effort.",
    icon: "Zap",
    image: "interiorKitchen",
    tags: ["Utilities", "Handover"],
  },
];

export const interiorRevamp = {
  title: "Interior Revamp Solutions",
  description:
    "In addition to its turn-key construction services, MAHUM offers specialized Interior Revamp Solutions, tailored for corporate projects. This involves conducting interior works within existing structures, enhancing functionality and aesthetics to meet the evolving needs of each client's business.",
};

// Source: p.05, "Seamlessly Navigating the Construction Landscape"
export const turnkeyStages = [
  { number: "01", title: "Land Acquisition", description: "Identifying and securing prime locations aligned with the client's vision." },
  { number: "02", title: "Design & Architecture", description: "Innovative, site-responsive design developed with MAHUM's panel of approved architects." },
  { number: "03", title: "Authority Approvals", description: "Securing approvals from DHA, CBC, and other relevant authorities." },
  { number: "04", title: "Grey Construction (Civil & MEP)", description: "Precision execution from structure through mechanical, electrical and plumbing systems." },
  { number: "05", title: "Project Management", description: "Cost and time planning, BOQs, WBS and Gantt charts providing clear milestones throughout." },
  { number: "06", title: "Finishing & Utility Connections", description: "Finishing works and utility connections carried through to a turn-key handover." },
];
