import { client } from '@/sanity/lib/client'
import { type TypedObject } from 'sanity'
import {
  getAboutQuery,
  getContactQuery,
  getNewsPressQuery,
  getPaintingsByYearQuery,
  getYearsQuery,
} from './quries'

type PortableTextBlock = TypedObject

export interface Painting {
  _id: string
  title: string
  slug: { current: string }
  year: number
  image: Record<string, unknown>
  exhibitionText?: string
  medium?: string
  dimensions?: string
}

export interface AboutPageData {
  _id: string
  _updatedAt: string
  title: string
  aboutImage?: {
    alt?: string
    caption?: string
    asset?: Record<string, unknown>
  }
  content: PortableTextBlock[]
  cv?: PortableTextBlock[]
}

export interface NewsEntry {
  _key: string
  date?: string
  title?: string
  publication?: string
  link?: string
  featured?: boolean
  description?: PortableTextBlock[]
}

export interface NewsPressData {
  _id: string
  _updatedAt: string
  title: string
  entries: NewsEntry[]
}

export interface ContactData {
  _id: string
  _updatedAt: string
  title: string
  info: PortableTextBlock[]
  email?: string
  instagram?: string
  galleryRepresentation?: string
}

export async function getYears(): Promise<number[]> {
  const years = await client.fetch<number[]>(getYearsQuery)
  return [...new Set(years)].sort((a, b) => b - a)
}

export async function getLatestYear(): Promise<number> {
  const years = await getYears()
  return years[0] || new Date().getFullYear()
}

export async function getPaintingsByYear(year: number) {
  if (!Number.isFinite(year)) {
    return []
  }

  return client.fetch<Painting[]>(getPaintingsByYearQuery, { year })
}

export async function getAbout() {
  return client.fetch<AboutPageData | null>(getAboutQuery)
}

export async function getNewsPress() {
  const data = await client.fetch<NewsPressData | null>(getNewsPressQuery)

  if (!data) {
    return null
  }

  return {
    ...data,
    entries: data.entries ?? [],
  }
}

export async function getContact() {
  const data = await client.fetch<ContactData | null>(getContactQuery)

  if (!data) {
    return null
  }

  return {
    ...data,
    info: data.info ?? [],
  }
}