import type { MetadataRoute } from "next";
import {
  getAbout,
  getContact,
  getInSituMedia,
  getNewsPress,
  getYears,
} from "./lib/api";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://shahidhassanboni.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [years, about, newsPress, inSituMedia, contact] = await Promise.all([
    getYears(),
    getAbout(),
    getNewsPress(),
    getInSituMedia(),
    getContact(),
  ]);
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
      lastModified: about?._updatedAt ? new Date(about._updatedAt) : now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/news-press`,
      lastModified: newsPress?._updatedAt
        ? new Date(newsPress._updatedAt)
        : now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/in-situ-media`,
      lastModified: inSituMedia?._updatedAt
        ? new Date(inSituMedia._updatedAt)
        : now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: contact?._updatedAt ? new Date(contact._updatedAt) : now,
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
