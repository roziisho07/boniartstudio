import { client } from "@/sanity/lib/client";
import { type TypedObject } from "sanity";
import {
  getAboutQuery,
  getContactQuery,
  getLatestYearQuery,
  getNewsPressQuery,
  getPaintingsByYearQuery,
  getYearsQuery,
} from "./quries";

const SANITY_TAGS = {
  all: "sanity",
  paintings: "sanity:painting",
  years: "sanity:years",
  about: "sanity:about",
  newsPress: "sanity:newsPress",
  contact: "sanity:contact",
} as const;

const sanityFetch = async <T>(
  query: string,
  params: Record<string, unknown> = {},
  tags: string[] = [],
) => {
  return client.fetch<T>(query, params, {
    next: {
      tags: [SANITY_TAGS.all, ...tags],
    },
  });
};

export { SANITY_TAGS };

type PortableTextBlock = TypedObject;

export interface Painting {
  _id: string;
  title: string;
  slug: { current: string };
  year: number;
  image: Record<string, unknown>;
  exhibitionText?: string;
  medium?: string;
  dimensions?: string;
}

export interface AboutPageData {
  _id: string;
  _updatedAt: string;
  title: string;
  aboutImage?: {
    alt?: string;
    caption?: string;
    asset?: Record<string, unknown>;
  };
  cvData?: {
    headline?: string;
    personalDetails?: {
      dateOfBirth?: string;
      nationality?: string;
      languages?: string[];
    };
    contactDetails?: {
      email?: string;
      mobile?: string;
      addressLines?: string[];
    };
    socialProfiles?: Array<{
      platform?: string;
      url?: string;
      handle?: string;
    }>;
    profile?: string;
    exhibitions?: Array<{
      year?: number;
      title?: string;
      type?: string;
      venue?: string;
      cityCountry?: string;
    }>;
    workExperience?: Array<{
      year?: string;
      role?: string;
      organization?: string;
      description?: string;
    }>;
    education?: Array<{
      period?: string;
      degree?: string;
      specialization?: string;
      institution?: string;
      notes?: string;
    }>;
  };
  content: PortableTextBlock[];
  cv?: PortableTextBlock[];
}

export interface NewsEntry {
  _key: string;
  date?: string;
  title?: string;
  publication?: string;
  link?: string;
  featured?: boolean;
  description?: PortableTextBlock[];
}

export interface NewsPressData {
  _id: string;
  _updatedAt: string;
  title: string;
  entries: NewsEntry[];
}

export interface ContactData {
  _id: string;
  _updatedAt: string;
  title: string;
  info: PortableTextBlock[];
  email?: string;
  instagram?: string;
  galleryRepresentation?: string;
}

export async function getYears(): Promise<number[]> {
  const years = await sanityFetch<number[]>(getYearsQuery, {}, [
    SANITY_TAGS.paintings,
    SANITY_TAGS.years,
  ]);
  return [...new Set(years)].sort((a, b) => b - a);
}

export async function getLatestYear(): Promise<number | null> {
  const latestYear = await sanityFetch<number | null>(getLatestYearQuery, {}, [
    SANITY_TAGS.paintings,
    SANITY_TAGS.years,
  ]);
  if (typeof latestYear === "number" && Number.isInteger(latestYear)) {
    return latestYear;
  }

  return null;
}

export async function getPaintingsByYear(year: number) {
  if (!Number.isFinite(year)) {
    return [];
  }

  return sanityFetch<Painting[]>(getPaintingsByYearQuery, { year }, [
    SANITY_TAGS.paintings,
    SANITY_TAGS.years,
  ]);
}

export async function getAbout() {
  return sanityFetch<AboutPageData | null>(getAboutQuery, {}, [
    SANITY_TAGS.about,
  ]);
}

export async function getNewsPress() {
  const data = await sanityFetch<NewsPressData | null>(getNewsPressQuery, {}, [
    SANITY_TAGS.newsPress,
  ]);

  if (!data) {
    return null;
  }

  return {
    ...data,
    entries: data.entries ?? [],
  };
}

export async function getContact() {
  const data = await sanityFetch<ContactData | null>(getContactQuery, {}, [
    SANITY_TAGS.contact,
  ]);

  if (!data) {
    return null;
  }

  return {
    ...data,
    info: data.info ?? [],
  };
}
