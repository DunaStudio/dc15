import Image from "next/image";
import Logo from "@/assets/LogoDC15-Fondo.png";

export default function Navbar() {
  return (
    <div className="flex flex-row justify-between items-center border bg-white p-4 w-max-content absolute mt-10 max-auto gap-[200px] ">
      <Image src={Logo} alt="Logo" className="w-10 h-10" />
      <ul className="flex flex-row gap-4">
        <li>inicio</li>
        <li>nosotros</li>
        <li>productos</li>
        <li>contacto</li>
      </ul>
      <div>
        <p>Cambiar idioma</p>
      </div>
    </div>
  );
}
