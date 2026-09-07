import type { Metadata } from "next";
import { SITE_TITLE_TEMPLATE } from "@/lib/seo";

const TITLE = "Services — Aluminium Windows, Doors & Glazing Systems";
const DESCRIPTION =
  "Six divisions covering aluminium windows and doors, glazing systems, glass and roof solutions, louvers and sun control, cladding and facade panels, and balustrades and railings.";

/**
 * page.tsx in this folder is a Client Component, and Next.js only supports
 * metadata exports from Server Components — so the hub page's metadata lives
 * here instead.
 *
 * `title` is declared as an object rather than a plain string on purpose: a
 * plain string here would satisfy this segment but drop the root layout's
 * title template for the six category pages nested below, leaving them without
 * the company name in their <title>.
 */
export const metadata: Metadata = {
  title: {
    default: TITLE,
    template: SITE_TITLE_TEMPLATE,
  },
  description: DESCRIPTION,
  alternates: { canonical: "/services" },
  openGraph: {
    title: `${TITLE} | Shreehari Alu Corporation`,
    description: DESCRIPTION,
    url: "/services",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
