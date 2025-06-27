import RuedaImg from "@/assets/rueda.png";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="min-h-screen w-screen flex justify-center items-center p-10 flex-col gap-2 bg-radial-[at_50%_100%] from-white to-[#D2D7DC] overflow-hidden relative">
      <h1 className="uppercase font-bold text-center text-xl border ">
        Pagina de ruedas
      </h1>
      <p className="text-center text-lg max-w-[50%]">
        esta es una muy linda pagina para que compres tus ruedas chinas
        favoritas, no tenemos imagenes de nuestros productos pero creenos que
        estan muy buenas
      </p>

      {/* Contenedor exterior: posiciona y recorta la imagen a la mitad en la parte inferior */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[400px] w-[1000px] overflow-hidden flex justify-center items-top">
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
  );
}
