"use client";
import Image from "next/image";
import CamionetaImg from "@/assets/Camioneta.png";
import { useTranslations } from "next-intl";

export default function CamionetaSection() {
  const t = useTranslations("camioneta");

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
          <h2 className=" text-[24px] md:text-[30px] lg:text-[36px] font-main font-[400] leading-[1.2]">
            {t("title")}
          </h2>
          <p className="text-[14px] md:text-[18px] max-w-4xl mx-auto mt-5">
            {t("description")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="group bg-black/30 backdrop-blur-sm p-8 rounded-lg border border-white/10 transition-all duration-200 ease-in-out hover:bg-white hover:backdrop-blur-md hover:border-white/60 ">
            <h3 className="font-main text-[24px] md:text-[28px] lg:text-[32px] w-full font-[600] leading-[1.2] mb-4 text-white group-hover:text-black transition-colors duration-200">
              {t("efficiency.title")}
            </h3>
            <p className="text-white/90 leading-relaxed group-hover:text-black transition-colors duration-200">
              {t("efficiency.description")}
            </p>
          </div>
          <div className="group bg-black/30 backdrop-blur-sm p-8 rounded-lg border border-white/10 transition-all duration-200 ease-in-out hover:bg-white hover:backdrop-blur-md hover:border-white/60">
            <h3 className="font-main text-[24px] md:text-[28px] lg:text-[32px] w-full font-[600] leading-[1.2] mb-4 text-white group-hover:text-black transition-colors duration-200">
              {t("recycling.title")}
            </h3>
            <p className="text-white/90 leading-relaxed group-hover:text-black transition-colors duration-200">
              {t("recycling.description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
