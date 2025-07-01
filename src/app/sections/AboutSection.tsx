"use client";

import { useState, useEffect, useRef } from "react";

const storySteps = [
  {
    id: 0,
    title: "DC15",
    subtitle: "Especialistas en Neumáticos Industriales",
    content:
      "En DC15 somos especialistas en el diseño, desarrollo, comercialización e importación de neumáticos y cámaras para maquinaria agrícola, logística e industrial.",
  },
  {
    id: 1,
    title: "Calidad de Ingeniería",
    subtitle: "Compuestos Optimizados",
    content:
      "Desarrollamos compuestos optimizados para máxima resistencia a la abrasión y carcasas reforzadas para soportar cargas elevadas.",
  },
  {
    id: 2,
    title: "Eficiencia Operativa",
    subtitle: "Adaptados a Cada Terreno",
    content:
      "Creamos patrones de banda adaptados a cada terreno, desde campos agrícolas hasta superficies urbanas, garantizando una tracción estable y segura.",
  },
  {
    id: 3,
    title: "Innovación Constante",
    subtitle: "Control de Calidad Integral",
    content:
      "Aplicamos un control de calidad integral, desde el desarrollo técnico hasta la entrega, asegurando que cada neumático cumpla con los más altos estándares de rendimiento.",
  },
  {
    id: 4,
    title: "Nuestro Catálogo",
    subtitle: "Soluciones Especializadas",
    content:
      "Con un catálogo completo que incluye soluciones para tractores, montacargas y plataformas elevadoras, DC15 se ha consolidado como un socio confiable para el mercado OEM y aftermarket.",
  },
  {
    id: 5,
    title: "Elija DC15",
    subtitle: "Compromiso con la Excelencia",
    content:
      "Elija una marca que se compromete con la durabilidad, la eficiencia y el rendimiento técnico superior.",
  },
];

export default function AboutSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      if (sectionTop <= 0 && sectionTop > -(sectionHeight - windowHeight)) {
        const scrollWithinSection = Math.abs(sectionTop);
        const maxScrollWithinSection = sectionHeight - windowHeight;
        const progress = scrollWithinSection / maxScrollWithinSection;

        const newStep = Math.min(
          Math.floor(progress * storySteps.length),
          storySteps.length - 1
        );

        if (newStep !== activeStep && !isAnimating) {
          setIsAnimating(true);
          setActiveStep(newStep);

          // Reset animation state after animation completes
          setTimeout(() => {
            setIsAnimating(false);
          }, 1000);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeStep, isAnimating]);

  return (
    <div ref={sectionRef} className="min-h-[600vh] relative bg-white">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-8 w-full">
          {/* Progress indicator */}
          <div className="absolute top-8 right-8 z-10">
            <div className="flex flex-col space-y-2">
              {storySteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-8 rounded-full transition-all duration-500 ease-out ${
                    index <= activeStep
                      ? "bg-black scale-110"
                      : "bg-gray-300 scale-100"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Main content */}
          <div className="text-center space-y-8">
            {/* Step counter */}
            <div
              className={`text-sm text-gray-400 font-light tracking-widest transition-all duration-800 ease-out  ${
                isAnimating
                  ? "opacity-0 transform translate-y-4"
                  : "opacity-100 transform translate-y-0"
              }`}
              style={{ transitionDelay: "0ms" }}
            >
              {String(activeStep + 1).padStart(2, "0")} /{" "}
              {String(storySteps.length).padStart(2, "0")}
            </div>

            {/* Title */}
            <div className="space-y-4">
              <h1
                className={`text-5xl md:text-6xl font-light text-black transition-all duration-900 ease-out ${
                  isAnimating
                    ? "opacity-0 transform translate-y-8"
                    : "opacity-100 transform translate-y-0"
                }`}
                style={{ transitionDelay: "100ms" }}
              >
                {storySteps[activeStep].title}
              </h1>
              <h2
                className={`text-xl md:text-2xl text-gray-600 font-light transition-all duration-900 ease-out ${
                  isAnimating
                    ? "opacity-0 transform translate-y-8"
                    : "opacity-100 transform translate-y-0"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                {storySteps[activeStep].subtitle}
              </h2>
            </div>

            {/* Content */}
            <div className="max-w-2xl mx-auto space-y-6">
              <p
                className={`text-lg text-gray-700 leading-relaxed transition-all duration-900 ease-out ${
                  isAnimating
                    ? "opacity-0 transform translate-y-8"
                    : "opacity-100 transform translate-y-0"
                }`}
                style={{ transitionDelay: "300ms" }}
              >
                {storySteps[activeStep].content}
              </p>
            </div>

            {/* Scroll indicator */}
            {activeStep < storySteps.length - 1 && (
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                  <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
