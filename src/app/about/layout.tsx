import type { Metadata } from "next";

/**
 * page.tsx in this folder is a Client Component, and Next.js only supports
 * metadata exports from Server Components — so the metadata lives here in the
 * segment's layout instead. This layout renders nothing of its own.
 */
export const metadata: Metadata = {
  title: "About Us — 30+ Years in Aluminium Facades",
  description:
    "Shreehari Alu Corporation has fabricated and installed aluminium windows, doors, glazing and facade systems in Ahmedabad for over three decades. Our quality process, values and the sectors we serve.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us — 30+ Years in Aluminium Facades | Shreehari Alu Corporation",
    description:
      "Shreehari Alu Corporation has fabricated and installed aluminium windows, doors, glazing and facade systems in Ahmedabad for over three decades. Our quality process, values and the sectors we serve.",
    url: "/about",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
