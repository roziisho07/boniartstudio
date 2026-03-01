import { defineField, defineType } from 'sanity'

export const newsPress = defineType({
  name: 'newsPress',
  title: 'News & Press',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'News & Press'
    }),
    defineField({
      name: 'entries',
      title: 'Entries',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'entry',
          title: 'Entry',
          fields: [
            defineField({
              name: 'date',
              title: 'Date',
              type: 'date',
              options: {
                dateFormat: 'YYYY-MM-DD'
              }
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string'
            }),
            defineField({
              name: 'publication',
              title: 'Publication',
              type: 'string'
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'url'
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [{ type: 'block' }]
            }),
            defineField({
              name: 'featured',
              title: 'Featured',
              type: 'boolean',
              initialValue: false
            })
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'publication',
              date: 'date'
            },
            prepare({ title, subtitle, date }) {
              return {
                title: title || 'Untitled',
                subtitle: date ? `${date} · ${subtitle || ''}` : subtitle
              }
            }
          }
        }
      ]
    })
  ]
})