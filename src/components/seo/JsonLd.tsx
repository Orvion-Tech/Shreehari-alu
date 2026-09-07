/**
 * Structured data (schema.org JSON-LD).
 *
 * This is what lets Google show the business as a rich result — company name,
 * address, opening hours, service catalogue and breadcrumb trail — rather than
 * a plain blue link. Validate any change at https://search.google.com/test/rich-results
 *
 * Escaping follows the Next.js JSON-LD guide: `<` is escaped so page data can
 * never break out of the script tag.
 */

import {
  COMPANY_NAME,
  NAP,
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_URL,
  absoluteUrl,
  isPlaceholder,
} from "@/lib/seo";
import { SERVICE_CATEGORIES } from "@/data/services";

function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\u003c"),
      }}
    />
  );
}

/** Stable @id so every other node can reference the same organisation. */
const ORG_ID = `${SITE_URL}/#organization`;

/**
 * Sitewide organisation + website data. Rendered once, in the root layout.
 *
 * Typed as HomeAndConstructionBusiness (a LocalBusiness subtype) because the
 * company fabricates and installs on site — that is the type Google maps to
 * local/"near me" results for this trade.
 */
export function OrganizationJsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": ORG_ID,
    name: COMPANY_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    logo: absoluteUrl("/shreehari-alu-corporation-logo.svg"),
    image: absoluteUrl(OG_IMAGE.url),
    address: {
      "@type": "PostalAddress",
      streetAddress: NAP.streetAddress,
      addressLocality: NAP.addressLocality,
      addressRegion: NAP.addressRegion,
      postalCode: NAP.postalCode,
      addressCountry: NAP.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: NAP.latitude,
      longitude: NAP.longitude,
    },
    // Unverified placeholders are omitted rather than published: a wrong phone
    // number in structured data actively harms local ranking.
    ...(isPlaceholder(NAP.telephone) ? {} : { telephone: NAP.telephone }),
    ...(isPlaceholder(NAP.email) ? {} : { email: NAP.email }),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:30",
        closes: "18:30",
      },
    ],
    areaServed: [
      { "@type": "City", name: "Ahmedabad" },
      { "@type": "State", name: "Gujarat" },
      { "@type": "Country", name: "India" },
    ],
    knowsAbout: SERVICE_CATEGORIES.map((c) => c.label),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Aluminium architectural systems",
      itemListElement: SERVICE_CATEGORIES.map((category) => ({
        "@type": "OfferCatalog",
        name: category.label,
        url: absoluteUrl(`/services/${category.slug}`),
        itemListElement: category.systems.map((system) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: system.title,
            description: system.simpleDesc,
          },
        })),
      })),
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: COMPANY_NAME,
    description: SITE_DESCRIPTION,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-IN",
  };

  return (
    <>
      <JsonLdScript data={organization} />
      <JsonLdScript data={website} />
    </>
  );
}

/**
 * Breadcrumb trail. Google renders this as the path shown under the page
 * title in search results, replacing the raw URL.
 */
export function BreadcrumbJsonLd({
  trail,
}: {
  trail: { name: string; path: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };

  return <JsonLdScript data={data} />;
}

/** Per-category service data, listing every system in that division. */
export function ServiceJsonLd({ slug }: { slug: string }) {
  const category = SERVICE_CATEGORIES.find((c) => c.slug === slug);
  if (!category) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: category.label,
    description: category.description,
    serviceType: category.label,
    url: absoluteUrl(`/services/${category.slug}`),
    image: absoluteUrl(category.heroImage),
    provider: { "@id": ORG_ID },
    areaServed: [
      { "@type": "City", name: "Ahmedabad" },
      { "@type": "State", name: "Gujarat" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${category.label} systems`,
      itemListElement: category.systems.map((system) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: system.title,
          description: system.simpleDesc,
        },
      })),
    },
  };

  return <JsonLdScript data={data} />;
}
