import type { CollectionConfig } from "payload";

export const TeamMembers: CollectionConfig = {
  slug: "team-members",
  admin: { useAsTitle: "name" },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "role", type: "text", localized: true, required: true },
    { name: "bio", type: "textarea", localized: true },
    { name: "photo", type: "upload", relationTo: "media" },
    {
      name: "category",
      type: "select",
      options: ["Leadership", "Clinical Leadership", "Care Team", "Local Team"],
    },
    {
      name: "city",
      type: "relationship",
      relationTo: "cities",
      admin: { description: "Optional — for local team display" },
    },
    { name: "isPlaceholder", type: "checkbox", defaultValue: true },
    { name: "published", type: "checkbox", defaultValue: false },
    { name: "sortOrder", type: "number", defaultValue: 0 },
  ],
};
