import type { CollectionConfig } from "payload";

export const CareRequests: CollectionConfig = {
  slug: "care-requests",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "city", "province", "status", "createdAt"],
  },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "phone", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "province", type: "text", required: true },
    { name: "city", type: "text", required: true },
    { name: "postalCode", type: "text", required: true },
    { name: "relationship", type: "text" },
    { name: "careType", type: "text" },
    { name: "startDate", type: "text" },
    { name: "hours", type: "text" },
    { name: "preferredLanguage", type: "text" },
    { name: "contactTime", type: "text" },
    { name: "notes", type: "textarea" },
    { name: "urgentCare", type: "checkbox", defaultValue: false },
    { name: "consentContact", type: "checkbox", defaultValue: false },
    { name: "consentMarketing", type: "checkbox", defaultValue: false },
    { name: "locale", type: "text" },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "Contacted", value: "contacted" },
        { label: "Closed", value: "closed" },
      ],
    },
    { name: "routedOffice", type: "text" },
    { name: "areaServed", type: "checkbox", defaultValue: true },
  ],
};
