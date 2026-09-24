import type { CollectionConfig } from "payload";

export const BlogPosts: CollectionConfig = {
  slug: "blog-posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "publishedAt", "published"],
  },
  fields: [
    { name: "title", type: "text", localized: true, required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "excerpt", type: "textarea", localized: true },
    { name: "body", type: "richText", localized: true },
    {
      name: "category",
      type: "select",
      options: [
        "Aging at Home",
        "Choosing Home Care",
        "Hospital Discharge",
        "Dementia",
        "Caregiver Support",
        "Home Safety",
        "Canadian Home-Care Information",
      ],
    },
    {
      name: "province",
      type: "relationship",
      relationTo: "provinces",
      admin: { description: "Optional — for province-specific articles" },
    },
    { name: "publishedAt", type: "date" },
    { name: "published", type: "checkbox", defaultValue: false },
    { name: "seoTitle", type: "text", localized: true },
    { name: "seoDescription", type: "textarea", localized: true },
  ],
};
