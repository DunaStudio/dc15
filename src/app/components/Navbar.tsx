"use client";
import Image from "next/image";
import Logo from "@/assets/LogoDC15-Fondo.png";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { useRef } from "react";

export default function Navbar() {
  const [currentLanguage, setCurrentLanguage] = useState("ESP");
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
      setShouldRenderMobileMenu(true); // Mostrar antes de animar entrada

      // Animación de entrada
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
    const newLanguage = currentLanguage === "ESP" ? "ENG" : "ESP";
    setCurrentLanguage(newLanguage);
    console.log(`Idioma cambiado a: ${newLanguage}`);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMobileMenuOpen(false);
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
              width={60}
              height={60}
            />
          </Link>
        </div>

        <ul className="hidden md:flex flex-row gap-6 text-gray-700 bg-white rounded-full py-4 px-8 mx-auto border border-gray-200 text-[12px]">
          <li className="hover:text-primary cursor-pointer transition-colors">
            <button
              onClick={() => scrollToSection("hero")}
              className="outline-none"
            >
              INICIO
            </button>
          </li>
          <li className="hover:text-primary cursor-pointer transition-colors">
            <button
              onClick={() => scrollToSection("about")}
              className="outline-none"
            >
              NOSOTROS
            </button>
          </li>
          <li className="hover:text-primary cursor-pointer transition-colors">
            <button
              onClick={() => scrollToSection("products")}
              className="outline-none"
            >
              PRODUCTOS
            </button>
          </li>
          <li className="hover:text-primary cursor-pointer transition-colors">
            <button
              onClick={() => scrollToSection("contact")}
              className="outline-none"
            >
              CONTACTO
            </button>
          </li>
          <li className="hover:text-primary cursor-pointer transition-colors">
            ALGO MAS?
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
                  { label: "INICIO", id: "hero" },
                  { label: "NOSOTROS", id: "about" },
                  { label: "PRODUCTOS", id: "products" },
                  { label: "CONTACTO", id: "contact" },
                  { label: "ALGO MAS?", id: "" },
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
