"use client";

import Image from "next/image";
import CamionetaImg from "@/assets/Camioneta.png";

export default function CamionetaSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center"
      style={{ fontFamily: "Be Vietnam Pro, sans-serif" }}
    >
      <div className="absolute inset-0">
        <Image
          src={CamionetaImg || "/placeholder.svg"}
          alt="Camioneta en paisaje desértico"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-white py-8">
        <div className="text-center mb-16">
          <h2 className="text-title">
            Comprometidos con la sostenibilidad
            <br />Y la eficiencia en nuestros productos.
          </h2>
          <p className="text-subtitle max-w-4xl mx-auto mt-5">
            En DC15, nos esforzamos por utilizar materiales que minimizan el
            impacto ambiental. Nuestras tecnologías de reciclaje avanzadas nos
            permiten producir neumáticos que son duraderos y sostenibles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="group bg-black/30 backdrop-blur-sm p-8 rounded-lg border border-white/10 transition-all duration-200 ease-in-out hover:bg-white hover:backdrop-blur-md hover:border-white/60 ">
            <h3 className="font-main text-[14px] md:text-[18px] lg:text-[22px] w-full font-[600] leading-[1.2] mb-4 text-white group-hover:text-black transition-colors duration-200 text-center lg:text-left">
              Eficiencia
            </h3>
            <p className="text-white/90 leading-relaxed group-hover:text-black transition-colors duration-200 text-[12px] md:text-[16px] text-center lg:text-left">
              Diseñamos nuestros neumáticos para maximizar el rendimiento con el
              menor uso posible de material. Esto reduce el desperdicio, mejora
              la eficiencia energética y prolonga la vida útil de cada
              neumático.
            </p>
          </div>

          <div className="group bg-black/30 backdrop-blur-sm p-8 rounded-lg border border-white/10 transition-all duration-200 ease-in-out hover:bg-white hover:backdrop-blur-md hover:border-white/60">
            <h3 className="font-main text-[14px] md:text-[18px] lg:text-[22px] w-full font-[600] leading-[1.2] mb-4 text-white group-hover:text-black transition-colors duration-200 text-center lg:text-left">
              Reciclaje
            </h3>
            <p className="text-white/90 leading-relaxed group-hover:text-black transition-colors duration-200 text-[12px] md:text-[16px] text-center lg:text-left">
              Incorporamos prácticas de reciclaje en cada etapa del proceso,
              desde la fabricación hasta el fin de vida útil del neumático.
              Apostamos por una producción responsable que cuida nuestro
              planeta.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
