import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import CookieBanner from "@/components/CookieBanner";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

export const metadata: Metadata = {
  title: "Loremar | Arrocería y Cocina de Mercado",
  description: "Especialistas en arroces y cocina de mercado en el corazón de Sabadell. Restaurante Loremar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
        <CookieBanner />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
