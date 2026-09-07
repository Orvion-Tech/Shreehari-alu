import type { Metadata } from "next";
import ServiceCategoryPage from "@/components/services/ServiceCategoryPage";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd";

const CANONICAL = "/services/louvers-sun-control";

export const metadata: Metadata = {
  // The root layout's title template appends the company name.
  title: "Aluminium Louvers & Sun Control Systems",
  description:
    "Operable aluminium louvre systems and fixed external sunshades that manage solar heat gain, daylight, glare and privacy on facades and terraces.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Aluminium Louvers & Sun Control Systems | Shreehari Alu Corporation",
    description:
      "Operable aluminium louvre systems and fixed external sunshades that manage solar heat gain, daylight, glare and privacy on facades and terraces.",
    url: CANONICAL,
  },
};

export default function Page() {
  return (
    <>
      <ServiceJsonLd slug="louvers-sun-control" />
      <BreadcrumbJsonLd
        trail={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Louvers & Sun Control", path: CANONICAL },
        ]}
      />
      <ServiceCategoryPage slug="louvers-sun-control" />
    </>
  );
}
