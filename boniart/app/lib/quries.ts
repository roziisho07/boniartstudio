export const getYearsQuery = `
  *[_type == "painting" && defined(year)].year
`

export const getPaintingsByYearQuery = `
  *[_type == "painting" && year == $year] | order(_createdAt desc) {
    _id,
    title,
    slug,
    year,
    image {
      ...,
      asset->,
      alt
    },
    exhibitionText,
    medium,
    dimensions
  }
`

export const getPaintingBySlugQuery = `
  *[_type == "painting" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    year,
    "image": {
      ...image,
      "asset": image.asset->,
      "lqip": image.asset->metadata.lqip,
      "dimensions": image.asset->metadata.dimensions
    },
    exhibitionText,
    medium,
    dimensions,
    "next": *[_type == "painting" && year == ^.year && slug.current > ^.slug.current][0] {
      slug,
      title
    },
    "previous": *[_type == "painting" && year == ^.year && slug.current < ^.slug.current] | order(slug desc)[0] {
      slug,
      title
    }
  }
`

/**
 * Get all paintings (for sitemap or archive)
 */
export const getAllPaintingsQuery = `
  *[_type == "painting"] | order(year desc, title asc) {
    _id,
    title,
    slug,
    year,
    "image": image.asset->url,
    exhibitionText,
    medium,
    dimensions
  }
`

/**
 * Get recent paintings (for homepage preview)
 */
export const getRecentPaintingsQuery = `
  *[_type == "painting"] | order(year desc, _createdAt desc)[0...6] {
    _id,
    title,
    slug,
    year,
    "image": {
      ...image,
      "asset": image.asset->,
      "lqip": image.asset->metadata.lqip
    },
    exhibitionText
  }
`

// ==================== ABOUT QUERIES ====================

/**
 * Get about page content
 */
export const getAboutQuery = `
  *[_type == "about"][0] {
    _id,
    _updatedAt,
    title,
    aboutImage {
      ...,
      asset->,
      alt,
      caption
    },
    content,
    cv
  }
`

/**
 * Get about page with just text (for SEO/meta descriptions)
 */
export const getAboutMetaQuery = `
  *[_type == "about"][0] {
    "plainText": pt::text(content)
  }
`

// ==================== NEWS/PRESS QUERIES ====================

/**
 * Get all news/press entries
 */
export const getNewsPressQuery = `
  *[_type == "newsPress"][0] {
    _id,
    _updatedAt,
    title,
    entries[] | order(featured desc, date desc) {
      _key,
      date,
      title,
      publication,
      link,
      featured,
      description
    }
  }
`

/**
 * Get only featured news entries
 */
export const getFeaturedNewsQuery = `
  *[_type == "newsPress"][0] {
    "featured": entries[featured == true] | order(date desc)[0...3] {
      _key,
      date,
      title,
      publication,
      link,
      description
    }
  }
`

/**
 * Get latest news entry
 */
export const getLatestNewsQuery = `
  *[_type == "newsPress"][0] {
    "latest": entries | order(date desc)[0] {
      _key,
      date,
      title,
      publication,
      link,
      description
    }
  }
`

// ==================== CONTACT QUERIES ====================

/**
 * Get contact information
 */
export const getContactQuery = `
  *[_type == "contact"][0] {
    _id,
    _updatedAt,
    title,
    info,
    email,
    instagram,
    galleryRepresentation
  }
`

// ==================== SITE QUERIES ====================

/**
 * Get all site content for static generation
 */
export const getAllSiteContentQuery = `
  {
    "years": *[_type == "painting" && defined(year)] | order(year desc) {
      year,
      "count": count(*[_type == "painting" && year == ^.year])
    } | unique,
    "about": *[_type == "about"][0] {
      _id,
      title,
      "hasContent": defined(content)
    },
    "newsPress": *[_type == "newsPress"][0] {
      _id,
      title,
      "entryCount": count(entries)
    },
    "contact": *[_type == "contact"][0] {
      _id,
      title,
      email,
      instagram
    }
  }
`

/**
 * Get sitemap data
 */
export const getSitemapDataQuery = `
  {
    "paintings": *[_type == "painting"] {
      slug,
      _updatedAt
    },
    "years": *[_type == "painting" && defined(year)] | order(year desc) {
      year
    } | unique
  }
`

/**
 * Search paintings by title or medium
 */
export const searchPaintingsQuery = `
  *[
    _type == "painting" && 
    (title match $search + "*" || medium match $search + "*")
  ] | order(year desc) {
    _id,
    title,
    slug,
    year,
    "image": {
      "asset": image.asset->,
      "lqip": image.asset->metadata.lqip
    },
    medium
  }
`