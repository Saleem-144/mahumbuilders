import SectionHeading from "../../../components/SectionHeading/SectionHeading";
import ServiceCard from "../../../components/ServiceCard/ServiceCard";
import { RevealGroup } from "../../../components/Reveal/Reveal";
import Button from "../../../components/Button/Button";
import { services } from "../../../data/services";

export default function ServicesSection() {
  return (
    <section className="border-t border-[color:var(--color-line)] py-10 sm:py-14 lg:py-16">
      <div className="container-edit">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="What We Do"
            title="Our Services"
            description="Turn-key solutions designed to take the stress out of every client's journey — from land acquisition to final handover."
          />
          <Button to="/services" variant="ghost" className="shrink-0">
            All Services
          </Button>
        </div>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.number} service={s} />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
