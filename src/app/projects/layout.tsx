import type { Metadata } from "next";

/**
 * page.tsx in this folder is a Client Component, and Next.js only supports
 * metadata exports from Server Components — so the metadata lives here in the
 * segment's layout instead. This layout renders nothing of its own.
 */
export const metadata: Metadata = {
  title: "Projects — Aluminium Glazing & Facade Work",
  description:
    "Completed residential, commercial, hospitality and institutional projects using Shreehari Alu Corporation aluminium windows, doors, structural glazing and facade systems.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects — Aluminium Glazing & Facade Work | Shreehari Alu Corporation",
    description:
      "Completed residential, commercial, hospitality and institutional projects using Shreehari Alu Corporation aluminium windows, doors, structural glazing and facade systems.",
    url: "/projects",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
