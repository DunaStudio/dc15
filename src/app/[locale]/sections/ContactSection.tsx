"use client";
import type React from "react";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactSection() {
  const t = useTranslations("contact");

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
          text: t("form.success"),
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
        text: t("form.error"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-16 overflow-hidden"
      style={{
        fontFamily: "Be Vietnam Pro, sans-serif",
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-black/70 backdrop-blur-sm p-8 rounded-lg border border-white">
            <h2 className="font-main text-[38px] md:text-[46px] lg:text-[52px] text-white mb-6">
              {t("title")}
            </h2>
            <p className="text-[14px] md:text-[18px] text-neutral-300 mb-8">
              {t("description")}
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="nombre"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    {t("form.nombre")}
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder={t("form.placeholders.nombre")}
                    className="w-full px-0 py-3 border-0 border-b border-neutral-600 bg-transparent focus:outline-none focus:border-white transition-all text-white placeholder:text-neutral-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="apellido"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    {t("form.apellido")}
                  </label>
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleInputChange}
                    placeholder={t("form.placeholders.apellido")}
                    className="w-full px-0 py-3 border-0 border-b border-neutral-600 bg-transparent focus:outline-none focus:border-white transition-all text-white placeholder:text-neutral-500"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="telefono"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    {t("form.telefono")}
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    placeholder={t("form.placeholders.telefono")}
                    className="w-full px-0 py-3 border-0 border-b border-neutral-600 bg-transparent focus:outline-none focus:border-white transition-all text-white placeholder:text-neutral-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    {t("form.email")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t("form.placeholders.email")}
                    className="w-full px-0 py-3 border-0 border-b border-neutral-600 bg-transparent focus:outline-none focus:border-white transition-all text-white placeholder:text-neutral-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-4">
                  {t("form.tipoNeumatico")}
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { key: "agricola", label: t("form.tipoOptions.agricola") },
                    { key: "auto", label: t("form.tipoOptions.auto") },
                    { key: "otros", label: t("form.tipoOptions.otros") },
                  ].map((tipo) => (
                    <button
                      key={tipo.key}
                      type="button"
                      onClick={() => handleTipoNeumaticoChange(tipo.label)}
                      className={`px-4 py-3 rounded-lg border transition-all font-medium ${
                        formData.tipoNeumatico === tipo.label
                          ? "bg-white text-primary border-white"
                          : "bg-neutral-800/60 text-gray-300 border-neutral-600 hover:border-white hover:bg-neutral-700/60 hover:text-white"
                      }`}
                    >
                      {tipo.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label
                  htmlFor="comentarios"
                  className="block text-sm font-medium text-white mb-2"
                >
                  {t("form.comentarios")}
                </label>
                <textarea
                  id="comentarios"
                  name="comentarios"
                  value={formData.comentarios}
                  onChange={handleInputChange}
                  placeholder={t("form.placeholders.comentarios")}
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
                {isSubmitting ? t("form.submitting") : t("form.submit")}
              </button>
            </form>
          </div>
          <div className="h-full min-h-[600px]">
            <div className="w-full h-full rounded-lg overflow-hidden border-2 border-neutral-700/50 bg-black/30 backdrop-blur-sm">
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
