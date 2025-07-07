"use client";
import type React from "react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { useTranslations } from "next-intl";
import Tyre1 from "@/assets/images/products/ImageMR1.webp";
import Tyre2 from "@/assets/images/products/ImageR2.webp";
import Tyre3 from "@/assets/images/products/ImageTH201.webp";
import Tyre4 from "@/assets/images/products/ImageTH202.webp";
import Tyre5 from "@/assets/images/products/ImageTH900.webp";

export default function CarouselSection() {
  const t = useTranslations("products");

  const productos = [
    {
      id: 1,
      imagen: Tyre1,
      nombre: t("items.mr1.name"),
      descripcion: t("items.mr1.description"),
    },
    {
      id: 2,
      imagen: Tyre2,
      nombre: t("items.r2.name"),
      descripcion: t("items.r2.description"),
    },
    {
      id: 3,
      imagen: Tyre3,
      nombre: t("items.th201.name"),
      descripcion: t("items.th201.description"),
    },
    {
      id: 4,
      imagen: Tyre4,
      nombre: t("items.th202.name"),
      descripcion: t("items.th202.description"),
    },
    {
      id: 5,
      imagen: Tyre5,
      nombre: t("items.th900.name"),
      descripcion: t("items.th900.description"),
    },
    {
      id: 6,
      imagen: Tyre1,
      nombre: "Producto 6",
      descripcion: "Descripción del producto 6.",
    },
  ];

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
              className="text-white text-title w-full translate-y-full opacity-0 text-center lg:text-left"
            >
              {t("title1")}
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2
              ref={titleRefLineTwo}
              className="text-white text-title w-full translate-y-full opacity-0 text-center lg:text-left"
            >
              {t("title2")}
            </h2>
          </div>
          <div className="overflow-hidden mt-4">
            <p
              ref={paragraphRef}
              className="text-subtitle text-white/80 max-w-3xl translate-y-full opacity-0 text-center lg:text-left"
            >
              {t("description")}
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
                  <div className="relative rounded overflow-hidden group bg-white flex flex-col h-full min-h-[350px]">
                    <div className="flex-1 flex items-center justify-center p-6 bg-white min-h-[200px]">
                      <Image
                        src={producto.imagen || "/placeholder.svg"}
                        alt={producto.nombre}
                        width={300}
                        height={300}
                        className="object-contain max-w-full max-h-full scale-110 group-hover:scale-125 transition-all ease-in-out duration-200"
                      />
                    </div>

                    <div className="bg-white p-4 border-t border-gray-100">
                      <h3 className="text-[14px] md:text-[16px] lg:text-[18px] font-bold text-black mb-2">
                        {producto.nombre}
                      </h3>
                      <p className="text-gray-600 text-[12px] md:text-[14px] lg:text-[15px] leading-relaxed">
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
                aria-label={t("prevButton")}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-gray-500/50 text-gray-500/50 font-main  mt-4 p-3 lg:p-4 hover:backdrop-blur-xl hover:text-primary hover:border-primary transition duration-300 cursor-pointer backdrop-blur-lg hover:bg-white"
                aria-label={t("nextButton")}
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
                aria-label={`${t("goToPage")} ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
