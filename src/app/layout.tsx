import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sistema de Novedades - InfoMira Itagüí",
  description:
    "Sistema integral para el seguimiento y gestión de solicitudes. InfoMira Itagüí - Gestión eficiente de novedades.",
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 relative overflow-hidden bg-gradient-to-br from-background via-secondary/20 to-background">
              {/* Background decorative elements con colores corporativos */}
              <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary-light/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-accent/3 rounded-full blur-3xl" />
              </div>
              <div className="relative z-10">
                {children}
              </div>
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
