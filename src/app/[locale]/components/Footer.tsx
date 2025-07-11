"use client";
import Image from "next/image";
import Logo from "@/assets/LogoDC15-Fondo.png";
import { useTranslations } from "next-intl";
import { scrollToSection } from "@/lib/utils";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 lg:py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col lg:flex-row items-center gap-4 mx-auto lg:mx-0 w-full lg:w-auto">
              <Image
                src={Logo || "/placeholder.svg"}
                alt="Logo DC15"
                width={60}
                height={60}
              />
              <div className="text-sm text-center lg:text-left flex flex-col gap-2">
                <p>Antonino Aberastain Sur 137 Piso: 2</p>
                <p>J5400 San Juan</p>
                <p>info@dc15sas.com</p>
                <p>0261115-681-6162</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-start lg:flex-row gap-6 text-sm mx-auto lg:mx-0">
            <button
              onClick={() => scrollToSection("hero")}
              className="hover:text-gray-300 transition-colors w-max cursor-pointer"
            >
              {t("inicio")}
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="hover:text-gray-300 transition-colors w-max cursor-pointer"
            >
              {t("nosotros")}
            </button>
            <button
              onClick={() => scrollToSection("products")}
              className="hover:text-gray-300 transition-colors w-max cursor-pointer"
            >
              {t("productos")}
            </button>
            <button className="hover:text-gray-300 transition-colors w-max cursor-pointer">
              {t("otroCosa")}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-gray-300 transition-colors w-max cursor-pointer"
            >
              {t("contacto")}
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-4 border-t border-gray-800 text-sm">
          <p>{t("copyright")}</p>
          <p>
            {t("developed")} <span className="font-bold">Duna Studio</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
