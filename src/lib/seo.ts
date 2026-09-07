/**
 * Central SEO configuration.
 *
 * Everything that search engines and social platforms read about this site
 * resolves from here: canonical URLs, Open Graph tags, the sitemap, robots.txt
 * and the JSON-LD structured data.
 *
 * ── BEFORE GOING LIVE ────────────────────────────────────────────────────────
 * Set NEXT_PUBLIC_SITE_URL in your hosting environment (or .env.production) to
 * the real domain, e.g. https://www.shreeharialu.com — with no trailing slash.
 * Canonical tags, the sitemap and OG image URLs are all built from it, so an
 * incorrect value here will mis-index the whole site.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.shreeharialu.com"
).replace(/\/$/, "");

/** One spelling of the company name, used everywhere. */
export const COMPANY_NAME = "Shreehari Alu Corporation";
export const COMPANY_SHORT = "Shreehari Alu";

export const SITE_TITLE_DEFAULT =
  "Aluminium Windows, Doors & Structural Glazing in Ahmedabad | Shreehari Alu Corporation";

export const SITE_TITLE_TEMPLATE = `%s | ${COMPANY_NAME}`;

export const SITE_DESCRIPTION =
  "Shreehari Alu Corporation fabricates and installs aluminium windows, doors, structural and spider glazing, skylights, louvers, cladding and glass balustrades across Ahmedabad and Gujarat. Over three decades of facade experience.";

/**
 * Name/Address/Phone. Google cross-checks these against Google Business Profile
 * and directory listings, so they must match those listings character for
 * character.
 *
 * PHONE and EMAIL below are still the template placeholders — the client's
 * profile PDF carries them as images, so they have not been verified yet.
 * `isPlaceholder` keeps unverified values out of the structured data: a wrong
 * phone number in schema is worse for local ranking than no phone number.
 */
export const NAP = {
  streetAddress: "5, Varahee Industrial Estate, Nr. Vandematram Bridge, Gota",
  addressLocality: "Ahmedabad",
  addressRegion: "Gujarat",
  postalCode: "382481",
  addressCountry: "IN",
  /** TODO: replace with the client's real number, then delete this comment. */
  telephone: "+91 98765 43210",
  /** TODO: replace with the client's real address, then delete this comment. */
  email: "info@shreeharialu.com",
  latitude: 23.0348,
  longitude: 72.5404,
} as const;

const PLACEHOLDERS = ["+91 98765 43210", "info@shreeharialu.com"];

export function isPlaceholder(value: string): boolean {
  return PLACEHOLDERS.includes(value);
}

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Default social share image. Replace with a branded 1200x630 asset. */
export const OG_IMAGE = {
  url: "/hero_courtyard_villa.png",
  width: 1200,
  height: 630,
  alt: `${COMPANY_NAME} — aluminium architectural systems`,
} as const;

/**
 * Social profiles. The footer renders this row only when the list is non-empty,
 * so the site shows nothing rather than the four placeholder links that used to
 * point at "#".
 *
 * Add entries as { label, href } once the client's real profiles exist.
 */
export const SOCIAL_LINKS: { label: string; href: string }[] = [];
