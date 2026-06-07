import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "José Adrián Coello | Líder Transformacional · Estratega Comercial",
  description:
    "Oficial Senior Corporativo con más de 7 años de trayectoria en gestión estratégica comercial. La excelencia es mi estándar, la intuición es mi brújula y el crecimiento es mi único destino.",
  keywords: [
    "José Adrián Coello Moreira",
    "Estratega Comercial",
    "Líder Transformacional",
    "Cámara de Comercio de Guayaquil",
    "CCG",
    "Ventas",
    "Marketing",
    "Consultoría",
  ],
  authors: [{ name: "José Adrián Coello Moreira" }],
  icons: {
    icon: "/images/jose/alfombra-roja.jpg",
  },
  openGraph: {
    title: "José Adrián Coello | Líder Transformacional · Estratega Comercial",
    description:
      "Oficial Senior Corporativo en la Cámara de Comercio de Guayaquil. La excelencia es mi estándar.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "José Adrián Coello | Líder Transformacional",
    description:
      "Oficial Senior Corporativo en la Cámara de Comercio de Guayaquil.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
