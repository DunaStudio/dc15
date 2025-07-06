import HeroSection from "./sections/HeroSection";
import CarouselSection from "./sections/CarouselSection";
import AboutSection from "./sections/AboutSection";
import Footer from "./components/Footer";
import ContactSection from "./sections/ContactSection";
import CamionetaSection from "./sections/CamionetaSection";
import UbicationBanner from "./sections/UbicationBanner";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center flex-col">
      <HeroSection />
      <AboutSection />
      <CarouselSection />
      <UbicationBanner />
      {/* <div className="flex flex-col justify-center items-center min-h-screen w-full bg-[#20699B] text-white">
        <p>otra seccion meganashe</p>
      </div> */}
      {/* <CamionetaSection /> */}
      {/* <ContactSection /> */}
      {/* <Footer /> */}
    </div>
  );
}
