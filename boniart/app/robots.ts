import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://shahidhassanboni.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/studio/", "/studio/*", "/api/revalidate"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/studio", "/studio/", "/studio/*", "/api/revalidate"],
      },
    ],
    sitemap: [`${siteUrl}/sitemap.xml`],
    host: siteUrl,
  };
}
