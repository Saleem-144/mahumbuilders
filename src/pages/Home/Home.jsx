import Hero from "./sections/Hero";
import AboutSection from "./sections/AboutSection";
import FeaturedProjectsSection from "./sections/FeaturedProjectsSection";
import ServicesSection from "./sections/ServicesSection";
import MediaSection from "./sections/MediaSection";
import NowBooking from "../../components/NowBooking/NowBooking";
import Developments from "../../components/Developments/Developments";
import HowWeDeliver from "../../components/HowWeDeliver/HowWeDeliver";
import CTA from "../../components/CTA/CTA";
import { usePageMeta } from "../../lib/usePageMeta";
import { PAGES } from "../../data/seo";
import ProjectSpotlight from "../../components/ProjectSpotlight/ProjectSpotlight";
import { images } from "../../data/images";

export default function Home() {
  usePageMeta({ ...PAGES["/"], path: "/" });

  return (
    <>
      <Hero />
      <AboutSection />
      <ProjectSpotlight slug="house-82b" image={images.homeIntro} />
      <FeaturedProjectsSection />
      <NowBooking />
      <Developments />
      <ServicesSection />
      <HowWeDeliver dark />
      <MediaSection />
      <CTA />
    </>
  );
}
