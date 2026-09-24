import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: { useAsTitle: "attribution" },
  fields: [
    { name: "quote", type: "textarea", localized: true, required: true },
    { name: "attribution", type: "text", required: true },
    { name: "relation", type: "text", localized: true },
    {
      name: "isPlaceholder",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description: "Mark true until a genuine testimonial is approved for publication.",
      },
    },
    { name: "published", type: "checkbox", defaultValue: false },
    {
      name: "city",
      type: "relationship",
      relationTo: "cities",
    },
  ],
};
