import Image from "next/image";
import logoLorgian from "@/assets/images/lorgianLogo.png";
import logoHaida from "@/assets/images/haidaLogo.png";

export default function BrandsSection() {
  return (
    <section className="w-full py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[200px] max-w-7xl mx-auto">
          <div className="flex flex-col justify-center space-y-6 pr-0 md:pr-8">
            <h2 className="text-title text-gray-900 text-center lg:text-start">
              Marcas con las <br /> que trabajamos
            </h2>
            <p className="text-subtitle text-primary text-center lg:text-start">
              Colaboramos con marcas líderes en la industria para brindarte la
              mejor experiencia y calidad en nuestros servicios. Construyendo
              alianzas estratégicas para tu éxito.
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
