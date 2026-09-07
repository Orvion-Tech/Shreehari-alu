import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF/WebP to browsers that accept them. The source assets in
    // public/ are ~30 MB of PNG/JPG; this is what keeps the delivered bytes
    // (and therefore LCP) small.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },

  async redirects() {
    return [
      // Service divisions were restructured to match the client's company
      // profile (six categories). Keep the previous URLs working.
      { source: "/services/doors-windows", destination: "/services/windows-doors", permanent: true },
      { source: "/services/glazing-facades", destination: "/services/glazing-systems", permanent: true },
      { source: "/services/outdoor-shading", destination: "/services/louvers-sun-control", permanent: true },
      { source: "/services/interior-partitions", destination: "/services", permanent: true },

      // These three pages were folded into sections of other pages. They were
      // previously runtime redirect() stubs, which emit a temporary 307 —
      // search engines keep the old URL indexed and split ranking signals
      // between the two. A permanent 308 consolidates them onto the target.
      { source: "/gallery", destination: "/projects#gallery", permanent: true },
      { source: "/industries", destination: "/about#industries", permanent: true },
      { source: "/why-choose-us", destination: "/about#why-choose-us", permanent: true },
    ];
  },
};

export default nextConfig;
