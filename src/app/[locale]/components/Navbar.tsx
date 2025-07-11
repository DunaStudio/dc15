"use client";
import Image from "next/image";
import Logo from "@/assets/LogoDC15-Fondo.png";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "../navigation";
import { scrollToSection } from "@/lib/utils";

export default function Navbar() {
  const t = useTranslations("navbar");
  const locale = useLocale();
  const [currentLanguage, setCurrentLanguage] = useState(
    locale === "es" ? "ESP" : "ENG"
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [shouldRenderMobileMenu, setShouldRenderMobileMenu] = useState(false);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const menuItemRefs = useRef<HTMLButtonElement[]>([]);

  menuItemRefs.current = [];

  const addToMenuItems = (el: HTMLButtonElement) => {
    if (el && !menuItemRefs.current.includes(el)) {
      menuItemRefs.current.push(el);
    }
  };

  useEffect(() => {
    setCurrentLanguage(locale === "es" ? "ESP" : "ENG");
  }, [locale]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (shouldRenderMobileMenu) {
      gsap.fromTo(
        menuPanelRef.current,
        { x: "100%" },
        {
          x: 0,
          duration: 0.4,
          ease: "power3.out",
        }
      );
      gsap.fromTo(
        menuItemRefs.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          delay: 0.2,
          ease: "power2.out",
          duration: 0.4,
        }
      );
    }
  }, [shouldRenderMobileMenu]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      setShouldRenderMobileMenu(true);
      gsap.fromTo(
        menuPanelRef.current,
        { x: "100%" },
        {
          x: 0,
          duration: 0.4,
          ease: "power3.out",
        }
      );
      gsap.fromTo(
        menuItemRefs.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          delay: 0.2,
          ease: "power2.out",
          duration: 0.4,
        }
      );
    } else if (shouldRenderMobileMenu) {
      gsap.to(menuPanelRef.current, {
        x: "100%",
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => {
          setShouldRenderMobileMenu(false);
        },
      });
    }
  }, [isMobileMenuOpen]);

  const toggleLanguage = () => {
    const newLocale = locale === "es" ? "en" : "es";
    const currentPath = window.location.pathname;
    let newPath: string;

    if (currentPath === "/" || currentPath === "") {
      newPath = `/${newLocale}`;
    } else if (currentPath.startsWith("/es")) {
      newPath = currentPath.replace("/es", `/${newLocale}`);
    } else if (currentPath.startsWith("/en")) {
      newPath = currentPath.replace("/en", `/${newLocale}`);
    } else {
      newPath = `/${newLocale}${currentPath}`;
    }

    newPath = newPath.replace(/\/+/g, "/");
    if (newPath.length > 1 && newPath.endsWith("/")) {
      newPath = newPath.slice(0, -1);
    }

    window.location.href = newPath;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex flex-row justify-between items-center p-4 mx-auto max-w-7xl mt-5 text-[14px]">
        <div className="flex items-center">
          <Link href={"/"}>
            <Image
              src={Logo || "/placeholder.svg"}
              alt="Logo"
              className="w-[55px] h-[55px] lg:w-[100px] lg:h-[100px] 2xl:w-[120px] 2xl:h-[120px] transition-all duration-300"
            />
          </Link>
        </div>

        <ul className="hidden md:flex flex-row gap-6 text-gray-700 bg-white rounded-full py-4 px-8 mx-auto border border-gray-200 text-[12px]">
          <li className="hover:text-primary cursor-pointer transition-colors">
            <button
              onClick={() => scrollToSection("hero")}
              className="outline-none"
            >
              {t("inicio")}
            </button>
          </li>
          <li className="hover:text-primary cursor-pointer transition-colors">
            <button
              onClick={() => scrollToSection("about")}
              className="outline-none"
            >
              {t("nosotros")}
            </button>
          </li>
          <li className="hover:text-primary cursor-pointer transition-colors">
            <button
              onClick={() => scrollToSection("products")}
              className="outline-none"
            >
              {t("productos")}
            </button>
          </li>
          <li className="hover:text-primary cursor-pointer transition-colors">
            <button
              onClick={() => scrollToSection("contact")}
              className="outline-none"
            >
              {t("contacto")}
            </button>
          </li>
        </ul>

        <button
          onClick={toggleLanguage}
          className="bg-white text-gray-700 hover:text-primary hover:bg-gray-50 px-5 py-4 rounded-full font-medium transition-all duration-200 border border-gray-200 text-[12px] hidden md:block"
        >
          {currentLanguage}
        </button>

        <button
          className="md:hidden fixed right-3 z-50 p-3 bg-white rounded-full border border-primary"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <X className="text-primary" />
          ) : (
            <Menu className="text-primary" />
          )}
        </button>
      </nav>

      {shouldRenderMobileMenu && (
        <div
          ref={menuPanelRef}
          className="md:hidden fixed inset-0 z-40 bg-white menu-panel"
        >
          <div className="flex flex-col h-full pt-20 px-8">
            <nav className="flex-1 flex justify-center items-center">
              <ul className="space-y-8 text-center">
                {[
                  { label: t("inicio"), id: "hero" },
                  { label: t("nosotros"), id: "about" },
                  { label: t("productos"), id: "products" },
                  { label: t("contacto"), id: "contact" },
                ].map(({ label, id }, i) => (
                  <li key={label}>
                    <button
                      ref={addToMenuItems}
                      onClick={() => {
                        if (id) scrollToSection(id);
                      }}
                      className="text-[16px] font-medium text-gray-700 hover:text-primary transition-colors outline-none w-full py-2"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="pb-8">
              <button
                onClick={toggleLanguage}
                className="w-full bg-primary text-white hover:bg-primary/90 px-8 py-4 rounded-full font-medium transition-all duration-200 text-lg"
              >
                {currentLanguage}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
