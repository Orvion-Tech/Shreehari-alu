import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Shree Hari Alu | Premium Aluminium Architectural Systems",
  description: "Transforming Spaces with Premium Aluminium Architectural Systems. Innovative Windows, Doors, Facades, Skylights, Pergolas & Structural Glazing Solutions.",
  keywords: "Premium Aluminium Windows, Aluminium Doors Manufacturer, Structural Glazing Company, Facade Contractor, Curtain Wall System, Glass Facade Solutions, Aluminium Architectural Systems, Skylight Manufacturer, Pergola Solutions, Glass Railing Systems",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${poppins.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-background text-body font-sans">
        <Header />
        <main className="flex-grow pt-24">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
