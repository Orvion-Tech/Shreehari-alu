import type { Metadata } from "next";
import ServiceCategoryPage from "@/components/services/ServiceCategoryPage";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";

const CANONICAL = "/services/cladding-facade-panels";

export const metadata: Metadata = {
  // The root layout's title template appends the company name.
  title: "ACP Cladding & Aluminium Facade Panels",
  description:
    "Cladding panels, aluminium composite panels (ACP), metal mesh facades and ventilated rainscreen build-ups for commercial and residential elevations.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "ACP Cladding & Aluminium Facade Panels | Shreehari Alu Corporation",
    description:
      "Cladding panels, aluminium composite panels (ACP), metal mesh facades and ventilated rainscreen build-ups for commercial and residential elevations.",
    url: CANONICAL,
  },
};

export default function Page() {
  return (
    <>
      <ServiceJsonLd slug="cladding-facade-panels" />
      <BreadcrumbJsonLd
        trail={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Cladding & Facade Panels", path: CANONICAL },
        ]}
      />
      <ServiceCategoryPage slug="cladding-facade-panels" />
    </>
  );
}
