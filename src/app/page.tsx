import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import EngineeringSection from "./sections/EngineeringSection";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center flex-col">
      <HeroSection />
      <EngineeringSection />
      <AboutSection />

      <div className="flex flex-col justify-center items-center min-h-screen w-full bg-blue-600 text-white">
        <p>otra seccion meganashe</p>
      </div>
    </div>
  );
}
