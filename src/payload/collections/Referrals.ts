import type { CollectionConfig } from "payload";

export const Referrals: CollectionConfig = {
  slug: "referrals",
  admin: {
    useAsTitle: "organizationName",
    defaultColumns: ["organizationName", "province", "status", "createdAt"],
  },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: "organizationName", type: "text", required: true },
    { name: "contactName", type: "text", required: true },
    { name: "phone", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "province", type: "text", required: true },
    { name: "city", type: "text" },
    {
      name: "referrerType",
      type: "select",
      options: [
        "Hospital",
        "Physician",
        "Nurse",
        "Social Worker",
        "Case Manager",
        "Community Organization",
        "Retirement Residence",
        "Other",
      ],
    },
    { name: "clientSummary", type: "textarea" },
    { name: "notes", type: "textarea" },
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
  ],
};
