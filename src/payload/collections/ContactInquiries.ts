import type { CollectionConfig } from "payload";

export const ContactInquiries: CollectionConfig = {
  slug: "contact-inquiries",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "subject", "createdAt"],
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "phone", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "subject", type: "text", required: true },
    { name: "message", type: "textarea", required: true },
    { name: "locale", type: "text" },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "In progress", value: "in_progress" },
        { label: "Closed", value: "closed" },
      ],
    },
  ],
};
