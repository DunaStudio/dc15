import HeroSection from "./sections/HeroSection";
import CarouselSection from "./sections/CarouselSection";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";
import CamionetaSection from "./sections/CamionetaSection";
import UbicationBanner from "./sections/UbicationBanner";
import BrandsSection from "./sections/BrandsBanner";

export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center flex-col">
      <HeroSection />
      <AboutSection />
      <CarouselSection />
      <UbicationBanner />
      <CamionetaSection />
      <BrandsSection />
      <ContactSection />
    </div>
  );
}
