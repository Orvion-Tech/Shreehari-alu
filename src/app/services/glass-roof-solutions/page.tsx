import type { Metadata } from "next";
import ServiceCategoryPage from "@/components/services/ServiceCategoryPage";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";

const CANONICAL = "/services/glass-roof-solutions";

export const metadata: Metadata = {
  // The root layout's title template appends the company name.
  title: "Skylights, Roof Glazing & Glass Canopies",
  description:
    "Skylights, skylight louvers, roof glazing, glass canopies and structural glass floors engineered for daylight, drainage and load safety.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Skylights, Roof Glazing & Glass Canopies | Shreehari Alu Corporation",
    description:
      "Skylights, skylight louvers, roof glazing, glass canopies and structural glass floors engineered for daylight, drainage and load safety.",
    url: CANONICAL,
  },
};

export default function Page() {
  return (
    <>
      <ServiceJsonLd slug="glass-roof-solutions" />
      <BreadcrumbJsonLd
        trail={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Glass & Roof Solutions", path: CANONICAL },
        ]}
      />
      <ServiceCategoryPage slug="glass-roof-solutions" />
    </>
  );
}
