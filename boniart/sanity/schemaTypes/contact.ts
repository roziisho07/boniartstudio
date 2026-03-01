import { defineField, defineType } from 'sanity'

export const contact = defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Contact'
    }),
    defineField({
      name: 'info',
      title: 'Contact Information',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' }
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL'
                  }
                ]
              },
              {
                name: 'email',
                type: 'object',
                title: 'Email',
                fields: [
                  {
                    name: 'address',
                    type: 'string',
                    title: 'Email address'
                  }
                ]
              }
            ]
          }
        }
      ]
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string'
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram',
      type: 'url'
    }),
    defineField({
      name: 'galleryRepresentation',
      title: 'Gallery Representation',
      type: 'string'
    })
  ]
})