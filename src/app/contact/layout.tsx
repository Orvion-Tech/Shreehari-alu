import type { Metadata } from "next";

/**
 * page.tsx in this folder is a Client Component, and Next.js only supports
 * metadata exports from Server Components — so the metadata lives here in the
 * segment's layout instead. This layout renders nothing of its own.
 */
export const metadata: Metadata = {
  title: "Contact — Aluminium Facade Contractor in Ahmedabad",
  description:
    "Talk to Shreehari Alu Corporation about aluminium windows, doors, structural glazing, skylights, louvers or balustrades. Workshop and office at Gota, Ahmedabad, Gujarat.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Aluminium Facade Contractor in Ahmedabad | Shreehari Alu Corporation",
    description:
      "Talk to Shreehari Alu Corporation about aluminium windows, doors, structural glazing, skylights, louvers or balustrades. Workshop and office at Gota, Ahmedabad, Gujarat.",
    url: "/contact",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
