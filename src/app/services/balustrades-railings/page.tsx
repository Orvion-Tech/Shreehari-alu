import type { Metadata } from "next";
import ServiceCategoryPage from "@/components/services/ServiceCategoryPage";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";

const CANONICAL = "/services/balustrades-railings";

export const metadata: Metadata = {
  // The root layout's title template appends the company name.
  title: "Glass Balustrades & Aluminium Railings",
  description:
    "Glass balustrades, aluminium railings and handrails for balconies, terraces, staircases, ramps and roof edges, detailed for code-compliant handrail loading.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Glass Balustrades & Aluminium Railings | Shreehari Alu Corporation",
    description:
      "Glass balustrades, aluminium railings and handrails for balconies, terraces, staircases, ramps and roof edges, detailed for code-compliant handrail loading.",
    url: CANONICAL,
  },
};

export default function Page() {
  return (
    <>
      <ServiceJsonLd slug="balustrades-railings" />
      <BreadcrumbJsonLd
        trail={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Balustrades & Railings", path: CANONICAL },
        ]}
      />
      <ServiceCategoryPage slug="balustrades-railings" />
    </>
  );
}
