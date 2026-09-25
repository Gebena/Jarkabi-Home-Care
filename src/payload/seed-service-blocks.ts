import { demoServiceDetails } from "@/lib/caregiver-demo-fallbacks";
import { defaultServices } from "@/lib/brand";

const clinicalSlugs = new Set(["skilled-nursing", "hospital-discharge", "after-surgery-care", "end-of-life-care"]);

function formatBullets(bullets: string[]) {
  return bullets.map((item) => `• ${item}`).join("\n");
}

/** Converts demo service detail copy into Payload page blocks for CMS seeding. */
export function buildServiceBlocks(slug: string): unknown[] {
  const detail = demoServiceDetails[slug];
  if (!detail) return [];

  const blocks: unknown[] = [
    {
      blockType: "richText",
      eyebrow: "Overview",
      headline: detail.tagline,
      body: detail.paragraphs.join("\n\n"),
    },
    {
      blockType: "richText",
      headline: detail.inlineTitle,
      body: detail.inlineBody,
    },
    {
      blockType: "richText",
      headline: detail.bulletsTitle,
      body: formatBullets(detail.bullets),
    },
    {
      blockType: "richText",
      headline: detail.closingTitle,
      body: detail.closingBody,
    },
  ];

  if (clinicalSlugs.has(slug)) {
    blocks.splice(2, 0, {
      blockType: "trustBar",
      items: [
        { label: "Professional oversight" },
        { label: "Scope of practice" },
        { label: "Family communication" },
      ],
    });
  }

  blocks.push({
    blockType: "ctaBanner",
    headline: detail.contactPrompt,
    buttonLabel: "Request Care",
    buttonHref: "/contact",
  });

  return blocks;
}

/** All eleven Care Giver service slugs with demo detail blocks. */
export function allServiceBlockMap(): Record<string, unknown[]> {
  return Object.fromEntries(
    defaultServices.map((service) => [service.slug, buildServiceBlocks(service.slug)]),
  );
}
