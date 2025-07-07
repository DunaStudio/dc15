"use client";

import Image from "next/image";
import Logo from "@/assets/LogoDC15-Fondo.png";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Image
                src={Logo || "/placeholder.svg"}
                alt="Logo DC15"
                width={60}
                height={60}
              />
              <div className="text-sm">
                <p>Antonino Aberastain Sur 137 Piso: 2</p>
                <p>J5400 San Juan</p>
                <p>info@dc15neumaticos.com</p>
                <p>0261115-681-6162</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 text-sm">
            <button
              onClick={() => scrollToSection("hero")}
              className="hover:text-gray-300 transition-colors"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="hover:text-gray-300 transition-colors"
            >
              Nosotros
            </button>
            <button
              onClick={() => scrollToSection("products")}
              className="hover:text-gray-300 transition-colors"
            >
              Productos
            </button>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Otro cosa
            </a>
            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-gray-300 transition-colors"
            >
              Contacto
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-4 border-t border-gray-800 text-sm">
          <p>© 2025 DC15. Todos los derechos reservados.</p>
          <p>
            Desarrollado por <span className="font-bold">Duna Studio</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
