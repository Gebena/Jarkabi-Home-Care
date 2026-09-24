import type { Block } from "payload";

export const heroBlock: Block = {
  slug: "hero",
  labels: { singular: "Hero", plural: "Heroes" },
  fields: [
    { name: "headline", type: "text", localized: true, required: true },
    { name: "subheadline", type: "text", localized: true },
    { name: "body", type: "textarea", localized: true },
    { name: "primaryCtaLabel", type: "text", localized: true },
    { name: "primaryCtaHref", type: "text" },
    { name: "secondaryCtaLabel", type: "text", localized: true },
    { name: "secondaryCtaHref", type: "text" },
    { name: "image", type: "upload", relationTo: "media" },
  ],
};

export const trustBarBlock: Block = {
  slug: "trustBar",
  labels: { singular: "Trust Bar", plural: "Trust Bars" },
  fields: [
    {
      name: "items",
      type: "array",
      fields: [{ name: "label", type: "text", localized: true, required: true }],
    },
  ],
};

export const richTextBlock: Block = {
  slug: "richText",
  labels: { singular: "Rich Text", plural: "Rich Text" },
  fields: [
    { name: "eyebrow", type: "text", localized: true },
    { name: "headline", type: "text", localized: true },
    { name: "body", type: "textarea", localized: true },
  ],
};

export const serviceGridBlock: Block = {
  slug: "serviceGrid",
  labels: { singular: "Service Grid", plural: "Service Grids" },
  fields: [
    { name: "headline", type: "text", localized: true },
    {
      name: "services",
      type: "relationship",
      relationTo: "services",
      hasMany: true,
    },
  ],
};

export const processTimelineBlock: Block = {
  slug: "processTimeline",
  labels: { singular: "Process Timeline", plural: "Process Timelines" },
  fields: [
    { name: "headline", type: "text", localized: true },
    {
      name: "steps",
      type: "array",
      fields: [
        { name: "title", type: "text", localized: true, required: true },
        { name: "description", type: "textarea", localized: true },
      ],
    },
  ],
};

export const ctaBannerBlock: Block = {
  slug: "ctaBanner",
  labels: { singular: "CTA Banner", plural: "CTA Banners" },
  fields: [
    { name: "headline", type: "text", localized: true },
    { name: "body", type: "textarea", localized: true },
    { name: "buttonLabel", type: "text", localized: true },
    { name: "buttonHref", type: "text" },
  ],
};

export const faqAccordionBlock: Block = {
  slug: "faqAccordion",
  labels: { singular: "FAQ Accordion", plural: "FAQ Accordions" },
  fields: [
    { name: "headline", type: "text", localized: true },
    {
      name: "faqs",
      type: "relationship",
      relationTo: "faqs",
      hasMany: true,
    },
  ],
};

export const pageBlocks = [
  heroBlock,
  trustBarBlock,
  richTextBlock,
  serviceGridBlock,
  processTimelineBlock,
  ctaBannerBlock,
  faqAccordionBlock,
];
