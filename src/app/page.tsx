import HeroSection from "./sections/HeroSection";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center flex-col">
      <HeroSection />

      <div className="flex flex-col justify-center items-center min-h-screen w-full bg-blue-600 text-white">
        <p>otra seccion</p>
      </div>
    </div>
  );
}
