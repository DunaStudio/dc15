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
      id="contact"
      className="relative py-8 lg:py-16 overflow-hidden"
      style={{
        fontFamily: "Be Vietnam Pro, sans-serif",
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white  p-8 rounded-lg border">
            <h2 className="text-title text-black mb-6">Contacto</h2>
            <p className="text-subtitle text-black mb-8">
              ¿Querés saber más sobre nuestros productos o encontrar el punto de
              venta más cercano? Completá el formulario y un especialista de
              DC15 se pondrá en contacto a la brevedad.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="nombre"
                    className="block text-sm font-medium text-black mb-2"
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
                    className="w-full px-0 py-3 border-0 border-b border-neutral-600 bg-transparent focus:outline-none focus:border-black transition-all text-black placeholder:text-neutral-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="apellido"
                    className="block text-sm font-medium text-black mb-2"
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
                    className="w-full px-0 py-3 border-0 border-b border-neutral-600 bg-transparent focus:outline-none focus:border-black transition-all text-black placeholder:text-neutral-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="telefono"
                    className="block text-sm font-medium text-black mb-2"
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
                    className="w-full px-0 py-3 border-0 border-b border-neutral-600 bg-transparent focus:outline-none focus:border-black transition-all text-black placeholder:text-neutral-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-black mb-2"
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
                    className="w-full px-0 py-3 border-0 border-b border-neutral-600 bg-transparent focus:outline-none focus:border-black transition-all text-black placeholder:text-neutral-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-4">
                  ¿Qué tipo de neumático estás buscando?
                </label>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {["Agrícola / Industrial", "Auto / Camioneta", "Otros"].map(
                    (tipo) => (
                      <button
                        key={tipo}
                        type="button"
                        onClick={() => handleTipoNeumaticoChange(tipo)}
                        className={`px-4 py-3 rounded-lg border transition-all font-medium text-[12px] md:text-[14px] ${
                          formData.tipoNeumatico === tipo
                            ? "bg-primary text-white border-primary"
                            : "bg-white text-primary border-primary hover:border-white hover:bg-neutral-700/60 hover:text-white"
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
                  className="block text-sm font-medium text-white mb-2"
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
                  className="w-full px-0 py-3 border-0 border-b-2 border-neutral-600 bg-transparent focus:outline-none focus:border-white transition-all resize-vertical text-white placeholder:text-neutral-500"
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
                className="bg-white text-primary px-8 py-3 rounded-lg hover:bg-white transition-all font-medium transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
              </button>
            </form>
          </div>

          <div className="h-full min-h-[600px]">
            <div className="w-full h-full rounded-lg overflow-hidden ">
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
