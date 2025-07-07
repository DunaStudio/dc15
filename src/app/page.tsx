import HeroSection from "./sections/HeroSection";
import CarouselSection from "./sections/CarouselSection";
import AboutSection from "./sections/AboutSection";
import Footer from "./components/Footer";
import ContactSection from "./sections/ContactSection";
import CamionetaSection from "./sections/CamionetaSection";
import UbicationBanner from "./sections/UbicationBanner";
import BrandsBanner from "./sections/BrandsBanner";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center flex-col">
      <HeroSection />
      <AboutSection />
      <CarouselSection />
      <UbicationBanner />
      <CamionetaSection />
      <BrandsBanner />
      <ContactSection />
    </div>
  );
}
