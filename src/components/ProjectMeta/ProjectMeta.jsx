import Reveal from "../Reveal/Reveal";

function Row({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-1.5 border-t border-[color:var(--color-line)] py-5 sm:flex-row sm:items-baseline sm:justify-between sm:py-6">
      <span className="eyebrow shrink-0 sm:w-40">{label}</span>
      <span className="text-[color:var(--color-ink)] sm:text-right">{value}</span>
    </div>
  );
}

export default function ProjectMeta({ project }) {
  return (
    <Reveal className="border-b border-[color:var(--color-line)]">
      <Row label="Location" value={project.location} />
      <Row label="Completion" value={project.year} />
      <Row label="Type" value={project.type} />
      <Row label="Architect" value={project.architect} />
      <Row label="Client" value={project.client} />
      <Row label="Area" value={project.area} />
      <Row label="Scope" value={project.scope?.join(" · ")} />
      <Row label="Category" value={project.category} />
    </Reveal>
  );
}
