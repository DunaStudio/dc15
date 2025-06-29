"use client";

import { useEffect, useRef, useState } from "react";
import { Shield, Cog, Target, Award } from "lucide-react";

const engineeringFeatures = [
  {
    icon: Shield,
    title: "Compuestos Optimizados",
    description:
      "Máxima resistencia a la abrasión con tecnología de materiales avanzados. Formulaciones especializadas que garantizan durabilidad excepcional en condiciones extremas.",
  },
  {
    icon: Cog,
    title: "Carcasa Reforzada",
    description:
      "Modelos estructurales diseñados para soportar cargas elevadas. Ingeniería de refuerzo que proporciona estabilidad y resistencia superior.",
  },
  {
    icon: Target,
    title: "Patrones Adaptados",
    description:
      "Banda de rodadura optimizada para terrenos agrícolas y superficies urbanas. Diseños específicos que maximizan la tracción y el rendimiento en cada aplicación.",
  },
  {
    icon: Award,
    title: "Control de Calidad",
    description:
      "Sistema integral desde el desarrollo técnico hasta la entrega. Rigurosos ensayos que garantizan rendimiento operativo y durabilidad.",
  },
];

export default function EngineeringSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(
              entry.target.getAttribute("data-index") || "0"
            );
            setVisibleItems((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    const items = sectionRef.current?.querySelectorAll("[data-index]");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-slate-400 via-slate-200 to-[#D2D7DC]"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-main">
            Ingeniería y Tecnología
          </h2>
          <p className="text-lg text-gray-700 font-secondary max-w-3xl mx-auto">
            El diseño estructural de los neumáticos DC15 contempla los más altos
            estándares de ingeniería para garantizar rendimiento superior en
            cada aplicación
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {engineeringFeatures.map((feature, index) => {
            const Icon = feature.icon;
            const isVisible = visibleItems.includes(index);

            return (
              <div
                key={index}
                data-index={index}
                className={`group p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-700 transform ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 font-main group-hover:text-gray-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 font-secondary mb-3 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
