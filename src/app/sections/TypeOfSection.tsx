"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import AutoelevadorImg from "@/assets/images/TypeOfTires/Autoelevador.jpg";
import CamionetaImg from "@/assets/images/TypeOfTires/Camioneta.webp";
import EquipoVialImg from "@/assets/images/TypeOfTires/EquipoVial.jpg";

const tireTypes = [
  {
    id: 0,
    title: "Autoelevador",
    description:
      "Neumáticos especializados para equipos de elevación y manejo de materiales. Diseñados con compuestos resistentes al desgaste y estructuras reforzadas que garantizan estabilidad y seguridad en operaciones de carga pesada.",
    image: AutoelevadorImg,
  },
  {
    id: 1,
    title: "Camioneta",
    description:
      "Cubiertas de alto rendimiento para vehículos comerciales ligeros. Ofrecen excelente tracción en diferentes superficies, durabilidad extendida y eficiencia de combustible para maximizar la productividad de tu flota.",
    image: CamionetaImg,
  },
  {
    id: 2,
    title: "Equipo Vial",
    description:
      "Neumáticos robustos para maquinaria de construcción y obras viales. Construidos para resistir condiciones extremas, con banda de rodadura especializada que proporciona tracción superior en terrenos difíciles.",
    image: EquipoVialImg,
  },
];

export default function TypeOfSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(section);

    const handleScroll = () => {
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      if (sectionTop <= 0 && sectionTop > -(sectionHeight - windowHeight)) {
        const scrollWithinSection = Math.abs(sectionTop);
        const maxScrollWithinSection = sectionHeight - windowHeight;
        const progress = scrollWithinSection / maxScrollWithinSection;

        let newIndex = 0;
        if (progress < 0.25) {
          newIndex = 0;
        } else if (progress < 0.6) {
          newIndex = 1;
        } else {
          newIndex = 2;
        }

        if (newIndex !== activeIndex) {
          setActiveIndex(newIndex);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeIndex]);

  return (
    <div ref={sectionRef} className="min-h-[250vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center bg-white">
        <div className="max-w-6xl mx-auto px-8 w-full h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full">
            <div className="flex flex-col justify-center">
              <div className="mb-12">
                <h2 className="text-3xl font-light text-black">
                  Tipos de Neumáticos
                </h2>
              </div>

              <div className="space-y-8 relative">
                {tireTypes.map((tire, index) => (
                  <div
                    key={tire.id}
                    className={`py-6 pl-6 relative transition-all duration-300 ${
                      activeIndex === index ? "opacity-100" : "opacity-40"
                    }`}
                  >
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-px transition-all duration-300 ${
                        activeIndex === index ? "bg-black" : "bg-transparent"
                      }`}
                    ></div>
                    <h3 className="text-lg font-medium text-black mb-3 tracking-wide">
                      {tire.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed font-light max-w-md">
                      {tire.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative w-96 h-72">
                {tireTypes.map((tire, index) => (
                  <div
                    key={tire.id}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      activeIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                      <Image
                        src={tire.image || "/placeholder.svg"}
                        alt={`Neumáticos para ${tire.title}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 384px"
                        quality={95}
                        priority={index === 0}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
