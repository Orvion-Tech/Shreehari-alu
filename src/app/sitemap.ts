import type { MetadataRoute } from "next";
import { SERVICE_CATEGORIES } from "@/data/services";
import { absoluteUrl } from "@/lib/seo";

/**
 * Served at /sitemap.xml. Submit this URL in Google Search Console.
 *
 * Only canonical, indexable routes belong here. /gallery, /industries and
 * /why-choose-us are redirects, so they are deliberately excluded — listing a
 * redirect in a sitemap is a Search Console warning.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }[] = [
    { path: "/", changeFrequency: "monthly", priority: 1 },
    { path: "/services", changeFrequency: "monthly", priority: 0.9 },
    { path: "/projects", changeFrequency: "monthly", priority: 0.8 },
    { path: "/about", changeFrequency: "yearly", priority: 0.7 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
    { path: "/request-quote", changeFrequency: "yearly", priority: 0.8 },
  ];

  const categoryRoutes = SERVICE_CATEGORIES.map((category) => ({
    path: `/services/${category.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...categoryRoutes].map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
