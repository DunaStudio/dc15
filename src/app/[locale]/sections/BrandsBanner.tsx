"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import logoLorgian from "@/assets/images/lorgianLogo.png";
import logoHaida from "@/assets/images/haidaLogo.png";
import { useLocale, useTranslations } from "next-intl";
import { gsap } from "gsap";

export default function BrandsSection() {
  const t = useTranslations("brands");
  const locale = useLocale();

  const titleRefLineOne = useRef<HTMLHeadingElement>(null);
  const titleRefLineTwo = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.set(
      [titleRefLineOne.current, titleRefLineTwo.current, paragraphRef.current],
      {
        y: 100,
        opacity: 0,
      }
    );

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

  return (
    <section ref={sectionRef} className="w-full py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[200px] max-w-7xl mx-auto">
          <div className="flex flex-col justify-center space-y-6 pr-0 md:pr-8">
            <div className="overflow-hidden">
              <h2
                ref={titleRefLineOne}
                className="text-title text-gray-900 text-center lg:text-start"
              >
                {t("title1")} <br /> {t("title2")}
              </h2>
            </div>

            <div className="overflow-hidden">
              <p
                ref={paragraphRef}
                className="text-subtitle text-neutral-500 text-center lg:text-start"
              >
                {t("description")}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center space-y-8 pl-0 md:pl-8 mt-10 lg:mt-0">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
              <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex justify-center items-center">
                <Image
                  src={logoLorgian}
                  alt="Logo Lorgian"
                  width={180}
                  height={60}
                  className="h-12 md:h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex justify-center items-center">
                <Image
                  src={logoHaida}
                  alt="Logo Haida"
                  width={180}
                  height={60}
                  className="h-12 md:h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
