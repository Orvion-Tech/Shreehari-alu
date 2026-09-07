import type { MetadataRoute } from "next";
import { COMPANY_NAME, COMPANY_SHORT, SITE_DESCRIPTION } from "@/lib/seo";

/**
 * Web app manifest. Required for the "Installable / PWA" checks in Lighthouse
 * and used by Android when a visitor adds the site to their home screen.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: COMPANY_NAME,
    short_name: COMPANY_SHORT,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#FAF9F5",
    theme_color: "#00515C",
    icons: [
      // Square, padded so Android's mask cannot crop the mark.
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
