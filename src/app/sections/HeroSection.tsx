import RuedaImg from "@/assets/rueda.png";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="min-h-screen w-screen flex items-center p-10 flex-col gap-2 bg-radial-[at_50%_100%] from-white to-[#D2D7DC] overflow-hidden relative">
      <h1 className="uppercase text-center font-main text-[64px] mt-[20vh] max-w-[70%] text-[#094474] font-[900]">
        Tecnología y Rendimiento en Movimiento
      </h1>
      <p className="text-center text-[18px] max-w-[50%] font-secondary text-[#20699B] font-[400]">
        esta es una muy linda pagina para que compres tus ruedas chinas
        favoritas, no tenemos imagenes de nuestros productos pero creenos que
        estan muy buenas
      </p>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[50vw] max-w-[800px] h-[45vw] md:h-[40vw] lg:h-[35vw] xl:h-[25vw] max-h-[400px] overflow-hidden">
        <div className="animate-[spin_15s_linear_infinite] w-full aspect-square">
          <Image
            src={RuedaImg}
            alt="Rueda Image"
            width={800}
            height={800}
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
