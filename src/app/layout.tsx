import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import Script from "next/script";
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
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-C4KD3QYF3D`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-C4KD3QYF3D');
            `,
          }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
