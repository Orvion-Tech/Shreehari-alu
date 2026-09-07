import type { Metadata } from "next";
import ServiceCategoryPage from "@/components/services/ServiceCategoryPage";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";

const CANONICAL = "/services/windows-doors";

export const metadata: Metadata = {
  // The root layout's title template appends the company name.
  title: "Aluminium Windows & Doors in Ahmedabad",
  description:
    "Sliding windows and doors, openable and fixed windows, sliding and folding doors, pivot doors and acoustic systems, fabricated and installed across Ahmedabad and Gujarat.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Aluminium Windows & Doors in Ahmedabad | Shreehari Alu Corporation",
    description:
      "Sliding windows and doors, openable and fixed windows, sliding and folding doors, pivot doors and acoustic systems, fabricated and installed across Ahmedabad and Gujarat.",
    url: CANONICAL,
  },
};

export default function Page() {
  return (
    <>
      <ServiceJsonLd slug="windows-doors" />
      <BreadcrumbJsonLd
        trail={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Windows & Doors", path: CANONICAL },
        ]}
      />
      <ServiceCategoryPage slug="windows-doors" />
    </>
  );
}
