import { RevealGroup } from "../../../components/Reveal/Reveal";
import StatBlock from "../../../components/StatBlock/StatBlock";
import { stats } from "../../../data/stats";

export default function StatsSection() {
  return (
    <section id="at-a-glance" className="border-b border-[color:var(--color-line)] py-20 sm:py-24">
      <div className="container-edit">
        <p className="eyebrow mb-10">At a Glance</p>
        <RevealGroup className="grid grid-cols-2 gap-y-10 sm:grid-cols-5">
          {stats.map((s) => (
            <StatBlock key={s.label} {...s} />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
