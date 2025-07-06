"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";

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
  {
    id: 4,
    imagen: ImgCarousel1,
    nombre: "Producto 4",
    descripcion: "Descripción del producto 4.",
  },
  {
    id: 5,
    imagen: ImgCarousel2,
    nombre: "Producto 5",
    descripcion: "Descripción del producto 5.",
  },
  {
    id: 6,
    imagen: ImgCarousel3,
    nombre: "Producto 6",
    descripcion: "Descripción del producto 6.",
  },
  {
    id: 7,
    imagen: ImgCarousel1,
    nombre: "Producto 7",
    descripcion: "Aplicaciones logísticas con tracción industrial reforzada.",
  },
  {
    id: 8,
    imagen: ImgCarousel2,
    nombre: "Producto 8",
    descripcion: "Descripción del producto 8.",
  },
  {
    id: 9,
    imagen: ImgCarousel3,
    nombre: "Producto 9",
    descripcion: "Descripción del producto 9.",
  },
  {
    id: 10,
    imagen: ImgCarousel1,
    nombre: "Producto 10",
    descripcion: "Descripción del producto 10.",
  },
  {
    id: 11,
    imagen: ImgCarousel2,
    nombre: "Producto 11",
    descripcion: "Descripción del producto 11.",
  },
  {
    id: 12,
    imagen: ImgCarousel3,
    nombre: "Producto 12",
    descripcion: "Descripción del producto 12.",
  },
  {
    id: 13,
    imagen: ImgCarousel1,
    nombre: "Producto 13",
    descripcion: "Descripción del producto 13.",
  },
  {
    id: 14,
    imagen: ImgCarousel2,
    nombre: "Producto 14",
    descripcion: "Descripción del producto 14.",
  },
  {
    id: 15,
    imagen: ImgCarousel3,
    nombre: "Producto 15",
    descripcion: "Descripción del producto 15.",
  },
  {
    id: 16,
    imagen: ImgCarousel1,
    nombre: "Producto 16",
    descripcion: "Aplicaciones logísticas con tracción industrial reforzada.",
  },
  {
    id: 17,
    imagen: ImgCarousel2,
    nombre: "MR-1",
    descripcion: "Carcasa reforzada para uso agrícola intensivo.",
  },
  {
    id: 18,
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

  const titleRefLineOne = useRef<HTMLHeadingElement>(null);
  const titleRefLineTwo = useRef<HTMLHeadingElement>(null);

  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          const tl = gsap.timeline({
            defaults: { ease: "power3.out", duration: 0.9 },
          });

          tl.to(titleRefLineOne.current, { y: 0, opacity: 1 })
            .to(titleRefLineTwo.current, { y: 0, opacity: 1 }, "-=0.7")
            .to(paragraphRef.current, { y: 0, opacity: 1 }, "-=0.7");

          setHasAnimated(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [hasAnimated]);

  const getItemsPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 4;
      if (window.innerWidth >= 768) return 3;
      return 2;
    }
    return 2;
  };

  const [itemsPerView, setItemsPerView] = useState(0);

  useEffect(() => {
    setItemsPerView(getItemsPerView());

    const handleResize = () => {
      setItemsPerView(getItemsPerView());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, productos.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
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
      setIsDragging(false);
      setTranslateX(0);
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

  const translatePercentage = (currentIndex * 100) / itemsPerView;

  const itemWidthClasses = {
    2: "w-1/2",
    3: "w-1/3",
    4: "w-1/4",
  };

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative py-16 overflow-hidden bg-primary"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-left mb-12">
          <div className="overflow-hidden">
            <h2
              ref={titleRefLineOne}
              className="text-white font-main text-[38px] md:text-[46px] lg:text-[52px] w-full font-[400] leading-[1.2] translate-y-full opacity-0"
            >
              Productos que marcan
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2
              ref={titleRefLineTwo}
              className="text-white font-main text-[38px] md:text-[46px] lg:text-[52px] w-full font-[400] leading-[1.2] translate-y-full opacity-0"
            >
              la diferencia
            </h2>
          </div>

          <div className="overflow-hidden mt-4">
            <p
              ref={paragraphRef}
              className="text-[14px] md:text-[18px] lg:text-[22px] text-white/80 max-w-3xl leading-[1.2] translate-y-full opacity-0"
            >
              Tecnología, durabilidad y rendimiento para enfrentar los desafíos
              más exigentes con la máxima confiabilidad.
            </p>
          </div>
        </div>

        <div className="relative">
          <div
            className="relative overflow-hidden rounded-sm cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-200 ease-out"
              style={{
                transform: `translateX(calc(-${translatePercentage}% + ${
                  isDragging ? translateX : 0
                }px))`,
                transitionDuration: isDragging ? "0ms" : "200ms",
              }}
            >
              {productos.map((producto, index) => (
                <div
                  key={`${producto.id}-${index}`}
                  className={`flex-shrink-0 px-2 ${
                    itemWidthClasses[
                      itemsPerView as keyof typeof itemWidthClasses
                    ] || "w-full"
                  }`}
                >
                  <div className="relative rounded overflow-hidden h-[300px] md:h-[350px] xl:h-[400px] group bg-white">
                    <div className="absolute inset-0 flex items-center justify-center p-8 overflow-hidden bg-white">
                      <Image
                        src={producto.imagen || "/placeholder.svg"}
                        alt={producto.nombre}
                        width={300}
                        height={300}
                        className="object-contain max-w-full max-h-full group-hover:scale-110 transition-all ease-in-out duration-200"
                      />
                    </div>

                    <div className="absolute bottom-0 w-full bg-white p-2 md:p-3 rounded shadow-lg border border-gray-100 lg:transition-transform lg:duration-300 lg:ease-out lg:translate-y-[calc(100%-55px)] lg:group-hover:translate-y-0 rounded-t-lg">
                      {" "}
                      <h3 className="text-[12px] md:text-[14px] lg:text-[16px] font-bold text-black mb-3 mt-1">
                        {" "}
                        {producto.nombre}
                      </h3>
                      <p className="text-gray-800 text-[12px] md:text-[14px] lg:text-[16px] leading-relaxed">
                        {producto.descripcion}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {productos.length > itemsPerView && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-gray-500/50 text-gray-500/50 font-main  mt-4 p-3 lg:p-4 hover:backdrop-blur-xl hover:text-primary hover:border-primary transition duration-300 cursor-pointer backdrop-blur-lg hover:bg-white"
                aria-label="Producto anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-gray-500/50 text-gray-500/50 font-main  mt-4 p-3 lg:p-4 hover:backdrop-blur-xl hover:text-primary hover:border-primary transition duration-300 cursor-pointer backdrop-blur-lg hover:bg-white"
                aria-label="Siguiente producto"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}
        </div>

        {productos.length > itemsPerView && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: maxIndex + 1 }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Ir a la página ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
