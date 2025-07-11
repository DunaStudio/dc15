"use client";

import Image from "next/image";
import logoLorgian from "@/assets/images/lorgianLogo.png";
import logoHaida from "@/assets/images/haidaLogo.png";
import { useLocale, useTranslations } from "next-intl";

export default function BrandsSection() {
  const t = useTranslations("brands");

  const locale = useLocale();

  console.log("Locale actual:", locale);
  console.log("Brands translations:", {
    title1: t("title1"),
    title2: t("title2"),
    description: t("description"),
  });

  return (
    <section className="w-full py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[200px] max-w-7xl mx-auto">
          <div className="flex flex-col justify-center space-y-6 pr-0 md:pr-8">
            <h2 className="text-title text-gray-900 text-center lg:text-start">
              {t("title1")} <br /> {t("title2")}
            </h2>
            <p className="text-subtitle text-neutral-500 text-center lg:text-start">
              {t("description")}
            </p>
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
