import Hero from "./sections/Hero";
import StatsSection from "./sections/StatsSection";
import AboutSection from "./sections/AboutSection";
import FeaturedProjectsSection from "./sections/FeaturedProjectsSection";
import ServicesSection from "./sections/ServicesSection";
import ApproachSection from "./sections/ApproachSection";
import MediaSection from "./sections/MediaSection";
import Developments from "../../components/Developments/Developments";
import CTA from "../../components/CTA/CTA";
import { useDocumentTitle } from "../../lib/useDocumentTitle";

export default function Home() {
  useDocumentTitle("MAHUM Builders — Where Innovation Meets Legacy", { full: true });

  return (
    <>
      <Hero />
      <StatsSection />
      <AboutSection />
      <Developments />
      <FeaturedProjectsSection />
      <ServicesSection />
      <ApproachSection />
      <MediaSection />
      <CTA />
    </>
  );
}
