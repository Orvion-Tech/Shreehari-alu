import type { Metadata } from "next";
import ServiceCategoryPage from "@/components/services/ServiceCategoryPage";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";

const CANONICAL = "/services/glazing-systems";

export const metadata: Metadata = {
  // The root layout's title template appends the company name.
  title: "Structural & Spider Glazing Systems",
  description:
    "Spider glazing, semi unitized, structural and point-fixed glazing, frameless glass systems, shopfront glazing and louvre facades for commercial buildings in Ahmedabad.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Structural & Spider Glazing Systems | Shreehari Alu Corporation",
    description:
      "Spider glazing, semi unitized, structural and point-fixed glazing, frameless glass systems, shopfront glazing and louvre facades for commercial buildings in Ahmedabad.",
    url: CANONICAL,
  },
};

export default function Page() {
  return (
    <>
      <ServiceJsonLd slug="glazing-systems" />
      <BreadcrumbJsonLd
        trail={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Glazing Systems", path: CANONICAL },
        ]}
      />
      <ServiceCategoryPage slug="glazing-systems" />
    </>
  );
}
