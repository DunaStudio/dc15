"use client";
import Image from "next/image";
import Logo from "@/assets/LogoDC15-Fondo.png";
import { useState } from "react";

export default function Navbar() {
  const [currentLanguage, setCurrentLanguage] = useState("ESP");

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "ESP" ? "ENG" : "ESP";
    setCurrentLanguage(newLanguage);
    console.log(`Idioma cambiado a: ${newLanguage}`);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex flex-row justify-between items-center p-4 mx-auto max-w-7xl mt-5">
      <div className="flex items-center">
        <Image src={Logo} alt="Logo" width={60} height={60} />
      </div>

      <ul className="flex flex-row gap-6 text-gray-700 bg-white rounded-full py-4 px-8 mx-auto">
        <li className="hover:text-blue-600 cursor-pointer transition-colors">
          Inicio
        </li>
        <li className="hover:text-blue-600 cursor-pointer transition-colors">
          Nosotros
        </li>
        <li className="hover:text-blue-600 cursor-pointer transition-colors">
          Productos
        </li>
        <li className="hover:text-blue-600 cursor-pointer transition-colors">
          Contacto
        </li>
        <li className="hover:text-blue-600 cursor-pointer transition-colors">
          Contacto
        </li>
      </ul>

      <button
        onClick={toggleLanguage}
        className="bg-white text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-4 py-2 rounded-full font-medium transition-all duration-200 border border-gray-200"
      >
        {currentLanguage}
      </button>
    </nav>
  );
}
