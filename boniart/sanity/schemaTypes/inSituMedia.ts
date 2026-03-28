import { defineField, defineType } from "sanity";

export const inSituMedia = defineType({
  name: "inSituMedia",
  title: "In Situ & Media",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "In Situ & Media",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "items",
      title: "Media Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "mediaImage",
          title: "Image Item",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              fields: [
                {
                  name: "alt",
                  type: "string",
                  title: "Alternative text",
                },
              ],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "array",
              of: [{ type: "block" }],
            }),
          ],
          preview: {
            select: {
              title: "caption",
              media: "image",
            },
            prepare({ title, media }) {
              return {
                title: title || "Image item",
                subtitle: "Image",
                media,
              };
            },
          },
        },
        {
          type: "object",
          name: "mediaVideo",
          title: "YouTube Video Item",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "youtubeUrl",
              title: "YouTube URL",
              type: "url",
              validation: (Rule) =>
                Rule.required().uri({
                  allowRelative: false,
                  scheme: ["http", "https"],
                }),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "array",
              of: [{ type: "block" }],
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "youtubeUrl",
            },
            prepare({ title, subtitle }) {
              return {
                title: title || "Video item",
                subtitle: subtitle || "YouTube URL",
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
