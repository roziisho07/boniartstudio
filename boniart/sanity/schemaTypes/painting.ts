// schemas/painting.ts
import { defineField, defineType } from 'sanity'

export const painting = defineType({
  name: 'painting',
  title: 'Painting',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: Rule => Rule.required().integer().min(1900).max(2100)
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility'
        }
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'exhibitionText',
      title: 'Exhibition Text',
      type: 'string',
      description: 'e.g. Solo Exhibition, The Rose Art Museum, Waltham, MA, August-October 2023'
    }),
    defineField({
      name: 'medium',
      title: 'Medium',
      type: 'string'
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'string'
    })
  ],
  preview: {
    select: {
      title: 'title',
      year: 'year',
      media: 'image'
    },
    prepare({ title, year, media }) {
      return {
        title,
        subtitle: year ? `Created in ${year}` : 'No year specified',
        media
      }
    }
  }
})