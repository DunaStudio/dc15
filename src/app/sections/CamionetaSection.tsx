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

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            COMPROMETIDOS CON LA SOSTENIBILIDAD
            <br />Y LA EFICIENCIA EN NUESTROS PRODUCTOS.
          </h2>
          <p className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            En DC15, nos esforzamos por utilizar materiales que minimizan el
            impacto ambiental. Nuestras tecnologías de reciclaje avanzadas nos
            permiten producir neumáticos que son duraderos y sostenibles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="group bg-black/30 backdrop-blur-sm p-8 rounded-lg border border-white/10 transition-all duration-300 ease-in-out hover:bg-black/45 hover:backdrop-blur-md hover:border-[#20699B]/60 hover:shadow-lg hover:shadow-[#20699B]/20 hover:scale-[1.02]">
            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#20699B] transition-colors duration-300">
              EFICIENCIA
            </h3>
            <p className="text-white/90 leading-relaxed group-hover:text-white transition-colors duration-300">
              Diseñamos nuestros neumáticos para maximizar el rendimiento con el
              menor uso posible de material. Esto reduce el desperdicio, mejora
              la eficiencia energética y prolonga la vida útil de cada
              neumático.
            </p>
          </div>

          <div className="group bg-black/30 backdrop-blur-sm p-8 rounded-lg border border-white/10 transition-all duration-300 ease-in-out hover:bg-black/45 hover:backdrop-blur-md hover:border-[#20699B]/60 hover:shadow-lg hover:shadow-[#20699B]/20 hover:scale-[1.02]">
            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#20699B] transition-colors duration-300">
              RECICLAJE
            </h3>
            <p className="text-white/90 leading-relaxed group-hover:text-white transition-colors duration-300">
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
