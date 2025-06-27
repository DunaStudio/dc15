import Image from "next/image";
import Navbar from "./components/Navbar";
import HeroSection from "./sections/HeroSection";
import RuedaImg from "@/assets/rueda.png";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="min-h-screen w-full relative flex justify-center items-end overflow-hidden">
        <HeroSection />
        {/* Contenedor exterior: posiciona y recorta la imagen a la mitad */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[400px] w-[1000px] overflow-hidden flex justify-center items-top border">
          {/* Contenedor interior: se encarga de la animación de giro */}
          <div className="animate-[spin_15s_linear_infinite] h-[1000px] w-[1000px]">
            <Image
              src={RuedaImg}
              alt="Rueda Image"
              className="h-[1000px] w-[1000px] origin-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
