"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import ImgCarousel1 from "@/assets/ImgCarousel1.jpg";
import ImgCarousel2 from "@/assets/ImgCarousel2.jpg";
import ImgCarousel3 from "@/assets/ImgCarousel3.jpg";

const productos = [
  {
    id: 1,
    imagen: ImgCarousel1,
    nombre: "TH657",
    descripcion: "Aplicaciones logísticas con tracción industrial reforzada.",
  },
  {
    id: 2,
    imagen: ImgCarousel2,
    nombre: "MR-1",
    descripcion: "Carcasa reforzada para uso agrícola intensivo.",
  },
  {
    id: 3,
    imagen: ImgCarousel3,
    nombre: "TH202",
    descripcion:
      "Alta estabilidad y resistencia para montacargas industriales.",
  },
];

export default function CarouselSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % productos.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + productos.length) % productos.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const diff = clientX - startX;
    setTranslateX(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (translateX > 50) {
      prevSlide();
    } else if (translateX < -50) {
      nextSlide();
    }

    setTranslateX(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleDragMove(e.clientX);
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleDragEnd();
      }
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging, startX]);

  return (
    <>
      <section
        className="relative py-16 overflow-hidden"
        style={{
          fontFamily: "Be Vietnam Pro, sans-serif",
          background: "linear-gradient(135deg, #20699B 0%, #1a5a85 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-left mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              PRODUCTOS QUE MARCAN
              <br />
              LA DIFERENCIA
            </h2>
            <p className="text-xl text-white/90 max-w-3xl">
              Tecnología, durabilidad y rendimiento para enfrentar los desafíos
              más exigentes con la máxima confiabilidad.
            </p>
          </div>

          <div className="relative">
            <div
              ref={carouselRef}
              className="relative overflow-hidden rounded-lg cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-300 ease-out"
                style={{
                  transform: `translateX(calc(-${currentIndex * 100}% + ${
                    isDragging ? translateX : 0
                  }px))`,
                  transitionDuration: isDragging ? "0ms" : "300ms",
                }}
              >
                {productos.map((producto, slideIndex) => (
                  <div key={producto.id} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 px-4">
                      <div className="md:hidden">
                        <div
                          className="relative rounded shadow-lg overflow-hidden h-[500px]"
                          style={{ backgroundColor: "#ffffff" }}
                        >
                          <div
                            className="absolute inset-0 flex items-center justify-center p-8"
                            style={{
                              background: "#ffffff",
                            }}
                          >
                            <Image
                              src={producto.imagen || "/placeholder.svg"}
                              alt={producto.nombre}
                              width={300}
                              height={300}
                              className="object-contain max-w-full max-h-full drop-shadow-lg"
                              style={{
                                filter:
                                  "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
                              }}
                            />
                          </div>

                          <div className="absolute bottom-8 left-6 right-6 bg-white/95 backdrop-blur-sm p-5 rounded shadow-lg border border-gray-100">
                            <h3 className="text-2xl font-bold text-black mb-3">
                              {producto.nombre}
                            </h3>
                            <p className="text-gray-800 leading-relaxed">
                              {producto.descripcion}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="hidden md:contents">
                        {productos.map((item) => (
                          <div
                            key={item.id}
                            className="relative rounded shadow-lg overflow-hidden h-[500px]"
                            style={{ backgroundColor: "#ffffff" }}
                          >
                            <div
                              className="absolute inset-0 flex items-center justify-center p-8"
                              style={{
                                background: "#ffffff",
                              }}
                            >
                              <Image
                                src={item.imagen || "/placeholder.svg"}
                                alt={item.nombre}
                                width={300}
                                height={300}
                                className="object-contain max-w-full max-h-full drop-shadow-lg"
                                style={{
                                  filter:
                                    "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
                                }}
                              />
                            </div>

                            <div className="absolute bottom-8 left-6 right-6 bg-white/95 backdrop-blur-sm p-5 rounded shadow-lg border border-gray-100">
                              <h3 className="text-2xl font-bold text-black mb-3">
                                {item.nombre}
                              </h3>
                              <p className="text-gray-800 leading-relaxed">
                                {item.descripcion}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white text-[#20699B] p-3 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-lg z-10 shadow-md"
              aria-label="Producto anterior"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-[#20699B] p-3 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-lg z-10 shadow-md"
              aria-label="Siguiente producto"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="flex justify-center mt-8 space-x-2 md:hidden">
            {productos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Ir al producto ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-16 bg-gray-100"
        style={{
          fontFamily: "Be Vietnam Pro, sans-serif",
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-bold text-[#20699B]">
                SIEMPRE CERCA
                <br />
                TUYO
              </h2>
            </div>

            <div className="flex-1 flex flex-col items-start gap-6">
              <p className="text-lg text-gray-700 max-w-2xl">
                Estamos expandiendo nuestra red de distribución. Contactanos
                para conocer el punto más cercano.
              </p>
              <button className="bg-white text-[#20699B] px-8 py-4 rounded hover:bg-gray-50 transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-[#20699B]">
                Contáctanos
              </button>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t-2 border-gray-800"></div>
        </div>
      </section>
    </>
  );
}
