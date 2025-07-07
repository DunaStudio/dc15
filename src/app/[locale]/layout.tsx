import type React from "react";
import type { Metadata } from "next";
import { Be_Vietnam_Pro, Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import WspButton from "./components/WspButton";
import Footer from "./components/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const vietnamPro = Be_Vietnam_Pro({
  variable: "--font-vietnam-pro",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "DC15",
  description:
    "DC15, compañía líder en soluciones de movilidad técnica, presenta Lorgian, su línea de neumáticos especializada para maquinaria agrícola, logística e industrial.Desarrollada bajo los más altos estándares de ingeniería, Lorgian nace como la evolución tecnológica de DC15, combinando robustez, eficiencia y rendimiento para los entornos de trabajo más exigentes.",
  icons: {
    icon: "/icon.png",
  },
};

export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale === "en" ? "en" : "es";

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body
        className={` ${vietnamPro.variable} ${raleway.variable} antialiased scroll-smooth`}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Navbar />
          {children}
          <WspButton />
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
