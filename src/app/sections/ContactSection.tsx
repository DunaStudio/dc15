"use client";

import type React from "react";
import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    tipoNeumatico: "",
    comentarios: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({
    type: "",
    text: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTipoNeumaticoChange = (tipo: string) => {
    setFormData((prev) => ({
      ...prev,
      tipoNeumatico: tipo,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage({ type: "", text: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatusMessage({
          type: "success",
          text: "¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.",
        });
        setFormData({
          nombre: "",
          apellido: "",
          telefono: "",
          email: "",
          tipoNeumatico: "",
          comentarios: "",
        });
      } else {
        throw new Error("Hubo un problema al enviar el formulario.");
      }
    } catch (error) {
      setStatusMessage({
        type: "error",
        text: "Error al enviar el mensaje. Por favor, inténtalo de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="relative py-16 overflow-hidden"
      style={{
        fontFamily: "Be Vietnam Pro, sans-serif",
        background:
          "linear-gradient(135deg, #1a1a1a 0%, #000000 50%, #2a2a2a 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(80, 80, 80, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(60, 60, 60, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(40, 40, 40, 0.4) 0%, transparent 30%)
          `,
          backgroundSize: "150px 150px, 200px 200px, 100px 100px",
        }}
      ></div>

      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 3px,
              rgba(255, 255, 255, 0.05) 3px,
              rgba(255, 255, 255, 0.05) 6px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 3px,
              rgba(0, 0, 0, 0.3) 3px,
              rgba(0, 0, 0, 0.3) 6px
            )
          `,
        }}
      ></div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-16 left-8 opacity-15">
          <div className="flex space-x-2">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-12 bg-gray-400 rounded-sm transform rotate-45"
              ></div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-20 right-12 opacity-15">
          <div className="flex space-x-2">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-10 bg-gray-500 rounded-sm transform -rotate-45"
              ></div>
            ))}
          </div>
        </div>

        <div className="absolute top-1/3 left-16 opacity-10">
          <svg width="100" height="20" viewBox="0 0 100 20">
            <path
              d="M0,10 L10,5 L20,15 L30,5 L40,15 L50,5 L60,15 L70,5 L80,15 L90,5 L100,10"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>

        <div className="absolute bottom-1/3 right-20 opacity-10">
          <svg width="80" height="15" viewBox="0 0 80 15">
            <path
              d="M0,7 L8,3 L16,11 L24,3 L32,11 L40,3 L48,11 L56,3 L64,11 L72,3 L80,7"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </div>

        <div className="absolute top-20 right-1/4 w-32 h-32 border-2 border-gray-600/30 rounded-full opacity-20">
          <div className="w-full h-full border-2 border-gray-500/20 rounded-full m-2"></div>
        </div>
        <div className="absolute bottom-24 left-1/3 w-20 h-20 border border-gray-600/40 rounded-full opacity-25"></div>

        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-600/30 to-transparent"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-500/20 to-transparent mt-4"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-black/70 backdrop-blur-sm p-8 rounded-lg border border-gray-700/50 shadow-2xl">
            <h2 className="text-3xl font-bold text-[#20699B] mb-6">CONTACTO</h2>
            <p className="text-gray-300 mb-8">
              ¿Querés saber más sobre nuestros productos o encontrar el punto de
              venta más cercano? Completá el formulario y un especialista de
              DC15 se pondrá en contacto a la brevedad.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="nombre"
                    className="block text-sm font-medium text-[#20699B] mb-2"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Ingresá tu nombre"
                    className="w-full px-0 py-3 border-0 border-b-2 border-gray-600 bg-transparent focus:outline-none focus:border-[#20699B] transition-all text-white placeholder:text-gray-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="apellido"
                    className="block text-sm font-medium text-[#20699B] mb-2"
                  >
                    Apellido
                  </label>
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleInputChange}
                    placeholder="Ingresá tu apellido"
                    className="w-full px-0 py-3 border-0 border-b-2 border-gray-600 bg-transparent focus:outline-none focus:border-[#20699B] transition-all text-white placeholder:text-gray-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="telefono"
                    className="block text-sm font-medium text-[#20699B] mb-2"
                  >
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    placeholder="Ingresá tu teléfono"
                    className="w-full px-0 py-3 border-0 border-b-2 border-gray-600 bg-transparent focus:outline-none focus:border-[#20699B] transition-all text-white placeholder:text-gray-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#20699B] mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Ingresá tu email"
                    className="w-full px-0 py-3 border-0 border-b-2 border-gray-600 bg-transparent focus:outline-none focus:border-[#20699B] transition-all text-white placeholder:text-gray-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#20699B] mb-4">
                  ¿Qué tipo de neumático estás buscando?
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {["Agrícola / Industrial", "Auto / Camioneta", "Otros"].map(
                    (tipo) => (
                      <button
                        key={tipo}
                        type="button"
                        onClick={() => handleTipoNeumaticoChange(tipo)}
                        className={`px-4 py-3 rounded-lg border transition-all font-medium ${
                          formData.tipoNeumatico === tipo
                            ? "bg-[#20699B] text-white border-[#20699B] shadow-lg shadow-[#20699B]/25"
                            : "bg-gray-800/60 text-gray-300 border-gray-600 hover:border-[#20699B] hover:bg-gray-700/60 hover:text-white"
                        }`}
                      >
                        {tipo}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="comentarios"
                  className="block text-sm font-medium text-[#20699B] mb-2"
                >
                  Comentarios
                </label>
                <textarea
                  id="comentarios"
                  name="comentarios"
                  value={formData.comentarios}
                  onChange={handleInputChange}
                  placeholder="Escribí aquí tu consulta"
                  rows={4}
                  className="w-full px-0 py-3 border-0 border-b-2 border-gray-600 bg-transparent focus:outline-none focus:border-[#20699B] transition-all resize-vertical text-white placeholder:text-gray-500"
                />
              </div>

              {statusMessage.text && (
                <div
                  className={`p-3 rounded-md text-sm ${
                    statusMessage.type === "success"
                      ? "bg-green-900/50 text-green-300 border border-green-700"
                      : "bg-red-900/50 text-red-300 border border-red-700"
                  }`}
                >
                  {statusMessage.text}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#20699B] text-white px-8 py-3 rounded-lg hover:bg-[#1a5a85] transition-all font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-[#20699B]/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
              </button>
            </form>
          </div>

          <div className="h-full min-h-[600px]">
            <div className="w-full h-full rounded-lg overflow-hidden shadow-2xl border-2 border-gray-700/50 bg-black/30 backdrop-blur-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3348.8234567890123!2d-68.5213473!3d-31.5354642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96813ffd11b5e73b%3A0x2d0b475afdbbede7!2sAntonino%20Aberastain%20Sur%20137%20Piso%3A2%2C%20J5400%20San%20Juan!5e0!3m2!1ses!2sar!4v1234567890123!5m2!1ses!2sar"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación DC15 Neumáticos"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
