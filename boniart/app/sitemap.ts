import type { MetadataRoute } from "next";
import { getYears } from "./lib/api";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://shahidhassanboni.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const years = await getYears();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/news-press`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const yearRoutes: MetadataRoute.Sitemap = years.map((year) => ({
    url: `${siteUrl}/year/${year}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...yearRoutes];
}
