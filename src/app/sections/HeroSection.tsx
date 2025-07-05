import RuedaImg from "@/assets/rueda.png";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="min-h-screen w-screen flex items-center p-10 flex-col gap-2 bg-radial-[at_50%_100%] from-white to-[#D2D7DC] overflow-hidden relative">
      <h1 className="uppercase text-center font-main text-[64px] mt-[20vh] max-w-[70%] text-[#094474] font-[900]">
        Neumáticos creados para rendir, diseñados para durar
      </h1>
      <p className="text-center text-[18px] max-w-[50%] font-secondary text-[#20699B] font-[400]">
        Descubre nuestra gama de neumáticos y cámaras de aire de alto
        rendimiento, diseñados para ofrecer durabilidad y eficiencia en cada
        aplicación.
      </p>
    </div>
  );
}
