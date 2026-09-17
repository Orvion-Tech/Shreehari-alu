import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat, Poppins } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import {
  COMPANY_NAME,
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_TITLE_DEFAULT,
  SITE_TITLE_TEMPLATE,
  SITE_URL,
} from "@/lib/seo";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// Editorial serif reserved for hero-scale display type. Montserrat carries
// every other heading; pairing one high-contrast serif against it is what
// gives the opening screen its "architectural magazine" register.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  // Lets every other route declare canonical/OG URLs as relative paths.
  metadataBase: new URL(SITE_URL),
  title: {
    // `template` applies to child segments only, so the home page uses
    // `default` — see the Next.js metadata docs.
    default: SITE_TITLE_DEFAULT,
    template: SITE_TITLE_TEMPLATE,
  },
  description: SITE_DESCRIPTION,
  applicationName: COMPANY_NAME,
  authors: [{ name: COMPANY_NAME }],
  creator: COMPANY_NAME,
  publisher: COMPANY_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: COMPANY_NAME,
    title: SITE_TITLE_DEFAULT,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE_DEFAULT,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Stops iOS Safari turning numbers in body copy into phone links, which
  // otherwise breaks the layout on product pages.
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  category: "Construction",
  // Paste the token from Google Search Console here when you verify the site.
  // verification: { google: "..." },
};

export const viewport: Viewport = {
  themeColor: "#00515C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${montserrat.variable} ${poppins.variable} ${cormorant.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-background text-body font-sans">
        <OrganizationJsonLd />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
