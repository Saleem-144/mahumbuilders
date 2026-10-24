// Source: MAHUM Builders Company Profile, "Our Services" (p.05)
// `icon` names a lucide-react icon, `image` a key from data/images.js, and
// `tags` are short labels drawn directly from each service's own source text
// (never invented) — all three power the ServiceCard grid.
export const services = [
  {
    number: "01",
    title: "Land Acquisition",
    description:
      "We help clients find and buy the right plot, and check that the location suits what they want to build.",
    icon: "MapPin",
    image: "serviceLand",
    tags: ["Site Identification", "Acquisition"],
  },
  {
    number: "02",
    title: "Design and Architecture",
    description:
      "We work with a panel of approved architects and designers to produce a design that fits the client's brief and the site.",
    icon: "PenTool",
    image: "serviceDesign",
    tags: ["Architecture", "Interior Design"],
  },
  {
    number: "03",
    title: "Approvals from All Authorities",
    description:
      "We get the approvals needed from DHA, CBC and other authorities, so the client doesn't have to deal with the paperwork.",
    icon: "ShieldCheck",
    image: "serviceApprovals",
    tags: ["DHA", "CBC", "Approvals"],
  },
  {
    number: "04",
    title: "Construction Execution",
    description:
      "We carry out the full build, from grey structure and MEP to finishing. The building is handed over ready to use, with only furniture and curtains left to the client.",
    icon: "Building2",
    image: "serviceConstruction",
    tags: ["Grey Structure", "MEP", "Turn-Key"],
  },
  {
    number: "05",
    title: "Project Management",
    description:
      "Every project gets a budget with cost and time plans, a detailed BOQ, a work breakdown structure (WBS) and Gantt charts, so the client can follow progress against clear milestones.",
    icon: "ListChecks",
    image: "serviceManagement",
    tags: ["BOQs", "WBS", "Gantt Charts"],
  },
  {
    number: "06",
    title: "Utility Connections",
    description:
      "We arrange all utility connections for the building, which saves the client time and effort.",
    icon: "Zap",
    image: "serviceUtilities",
    tags: ["Utilities", "Handover"],
  },
];

export const interiorRevamp = {
  title: "Interior Revamp",
  description:
    "We also refit the interiors of existing buildings for corporate clients, improving the layout, services and finishes to suit how the business works today.",
};

// Source: p.05, "Seamlessly Navigating the Construction Landscape"
export const turnkeyStages = [
  { number: "01", title: "Land Acquisition", description: "Finding and securing a suitable plot." },
  { number: "02", title: "Design and Architecture", description: "Design by our panel of approved architects, suited to the site." },
  { number: "03", title: "Authority Approvals", description: "Approvals from DHA, CBC and other authorities." },
  { number: "04", title: "Complete Construction Execution", description: "Structure, mechanical, electrical and plumbing work." },
  { number: "05", title: "Project Management", description: "Budgets, BOQs, WBS and Gantt charts with clear milestones." },
  { number: "06", title: "Finishing and Utility Connections", description: "Finishing works and utility connections, through to handover." },
];
