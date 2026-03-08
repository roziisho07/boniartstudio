import { defineField, defineType } from "sanity";

export const about = defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "About",
    }),
    defineField({
      name: "aboutImage",
      title: "About Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
        {
          name: "caption",
          type: "string",
          title: "Caption",
        },
      ],
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Underline", value: "underline" },
              { title: "Strike", value: "strike-through" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "cvData",
      title: "CV Data (Structured)",
      type: "object",
      initialValue: {
        headline: "Visual Artist | Art Teacher",
        personalDetails: {
          dateOfBirth: "25 August 1992",
          nationality: "Pakistani",
          languages: ["English", "Urdu"],
        },
        contactDetails: {
          email: "shahidhason@gmail.com",
          mobile: "+92 344 5082197",
          addressLines: [
            "P.O. Village Moorkhun",
            "Tehsil Gojal",
            "District Hunza",
            "Pakistan",
          ],
        },
        socialProfiles: [
          {
            platform: "Instagram",
            url: "https://instagram.com/shahid.hassan.boni",
            handle: "instagram.com/shahid.hassan.boni",
          },
          {
            platform: "Facebook",
            url: "https://facebook.com/boni.artist",
            handle: "facebook.com/boni.artist",
          },
        ],
        profile:
          "Shahid Hassan Boni is a visual artist based in Hunza Valley and Lahore, Pakistan. He graduated from the National College of Arts (NCA), Lahore in 2021 with distinction, majoring in Indo-Persian Miniature Painting. Since graduating, he has been actively exhibiting his work both nationally and internationally.",
        exhibitions: [
          { year: 2025, title: "Traces of Roots" },
          {
            year: 2024,
            title: "Noor",
            type: "Solo Exhibition",
            venue: "Old House Contemporary, Gulkin",
          },
          {
            year: 2024,
            title: "Tangible",
            type: "Group Exhibition",
            venue: "Pristine Contemporary, New Delhi, India",
          },
          {
            year: 2023,
            title: "Botany of Desires",
            venue: "Frieze, 9 Cork Street, Mayfair, London",
          },
          {
            year: 2023,
            title: "Pardakht",
            type: "Solo Exhibition",
            venue: "Numaishgah, Lahore",
          },
          {
            year: 2022,
            title: "Free Will",
            type: "Group Exhibition",
            venue: "Alhamra Arts Council, Lahore",
          },
          {
            year: 2022,
            title: "Spaces of Inquiry",
            type: "Two-Person Exhibition",
            venue: "Numaishgah, Lahore",
          },
          {
            year: 2021,
            title: "Stars of Tomorrow",
            type: "Four-Person Exhibition",
            venue: "Full Circle Gallery, Karachi",
          },
          {
            year: 2021,
            title: "Group Exhibition",
            type: "Group Exhibition",
            venue: "Pakistan Art Forum, Lahore",
          },
        ],
        workExperience: [
          {
            year: "2022",
            role: "Art Director",
            organization: "International Feature Film Yasmeen",
          },
          {
            year: "2021",
            role: "Art Teacher",
            organization: "Youth Assisting Youth (YAY)",
          },
          {
            year: "2019",
            role: "Conducted Art and Design Workshops",
            organization: "Hashoo Foundation",
          },
          {
            year: "2018",
            role: "Creative Head",
            organization: "Thermocut Sculpture Studio, Lahore",
          },
        ],
        education: [
          {
            period: "2015 - 2021",
            degree: "Bachelor of Fine Arts (BFA)",
            specialization: "Miniature Painting",
            institution: "National College of Arts (NCA), Lahore",
            notes: "Graduated with Distinction",
          },
          {
            period: "2011 - 2014",
            degree: "Bachelor in Commerce",
            institution: "Punjab University, Lahore",
          },
          {
            period: "2009 - 2011",
            degree: "Intermediate in Commerce",
            institution: "Aga Khan Higher Secondary School, Gilgit",
          },
          {
            period: "2009",
            degree: "Matriculation",
            institution: "Al-Amyn Model School, Gulmit, Gojal, Hunza",
          },
        ],
      },
      fields: [
        defineField({
          name: "headline",
          title: "Headline",
          type: "string",
          initialValue: "Visual Artist | Art Teacher",
        }),
        defineField({
          name: "personalDetails",
          title: "Personal Details",
          type: "object",
          fields: [
            defineField({
              name: "dateOfBirth",
              title: "Date of Birth",
              type: "string",
            }),
            defineField({
              name: "nationality",
              title: "Nationality",
              type: "string",
            }),
            defineField({
              name: "languages",
              title: "Languages",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
        }),
        defineField({
          name: "contactDetails",
          title: "Contact Details",
          type: "object",
          fields: [
            defineField({ name: "email", title: "Email", type: "string" }),
            defineField({ name: "mobile", title: "Mobile", type: "string" }),
            defineField({
              name: "addressLines",
              title: "Address Lines",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
        }),
        defineField({
          name: "socialProfiles",
          title: "Social Profiles",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "platform",
                  title: "Platform",
                  type: "string",
                }),
                defineField({ name: "url", title: "URL", type: "url" }),
                defineField({
                  name: "handle",
                  title: "Handle/Text",
                  type: "string",
                }),
              ],
              preview: {
                select: { title: "platform", subtitle: "handle" },
              },
            },
          ],
        }),
        defineField({
          name: "profile",
          title: "Profile",
          type: "text",
          rows: 5,
        }),
        defineField({
          name: "exhibitions",
          title: "Exhibitions",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "year", title: "Year", type: "number" }),
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({
                  name: "type",
                  title: "Type",
                  type: "string",
                  options: {
                    list: [
                      { title: "Solo Exhibition", value: "Solo Exhibition" },
                      { title: "Group Exhibition", value: "Group Exhibition" },
                      {
                        title: "Two-Person Exhibition",
                        value: "Two-Person Exhibition",
                      },
                      {
                        title: "Four-Person Exhibition",
                        value: "Four-Person Exhibition",
                      },
                      { title: "Art Fair", value: "Art Fair" },
                      { title: "Other", value: "Other" },
                    ],
                  },
                }),
                defineField({ name: "venue", title: "Venue", type: "string" }),
                defineField({
                  name: "cityCountry",
                  title: "City/Country",
                  type: "string",
                }),
              ],
              preview: {
                select: {
                  title: "title",
                  subtitle: "year",
                  venue: "venue",
                },
                prepare({ title, subtitle, venue }) {
                  return {
                    title: title || "Untitled Exhibition",
                    subtitle: [subtitle, venue].filter(Boolean).join(" • "),
                  };
                },
              },
            },
          ],
        }),
        defineField({
          name: "workExperience",
          title: "Work Experience",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "year", title: "Year", type: "string" }),
                defineField({ name: "role", title: "Role", type: "string" }),
                defineField({
                  name: "organization",
                  title: "Organization",
                  type: "string",
                }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "text",
                  rows: 3,
                }),
              ],
              preview: {
                select: {
                  title: "role",
                  org: "organization",
                  year: "year",
                },
                prepare({ title, org, year }) {
                  return {
                    title: title || "Work Experience",
                    subtitle: [year, org].filter(Boolean).join(" • "),
                  };
                },
              },
            },
          ],
        }),
        defineField({
          name: "education",
          title: "Education",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "period",
                  title: "Period",
                  type: "string",
                }),
                defineField({
                  name: "degree",
                  title: "Degree",
                  type: "string",
                }),
                defineField({
                  name: "specialization",
                  title: "Specialization",
                  type: "string",
                }),
                defineField({
                  name: "institution",
                  title: "Institution",
                  type: "string",
                }),
                defineField({ name: "notes", title: "Notes", type: "string" }),
              ],
              preview: {
                select: {
                  title: "degree",
                  subtitle: "institution",
                  period: "period",
                },
                prepare({ title, subtitle, period }) {
                  return {
                    title: title || "Education",
                    subtitle: [period, subtitle].filter(Boolean).join(" • "),
                  };
                },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "cv",
      title: "CV (Legacy Portable Text)",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
  ],
});
