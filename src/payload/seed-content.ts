import type { Payload } from "payload";
import {
  demoBlogPosts,
  demoFaqs,
  demoTeamMembers,
  demoTestimonials,
} from "@/lib/caregiver-demo-fallbacks";
import { buildServiceBlocks } from "@/payload/seed-service-blocks";

const faqCategoryMap: Record<string, string> = {
  "Getting started": "getting-started",
  Safety: "caregivers",
  "Care matching": "languages",
  "Clinical care": "nursing",
  Locations: "service-areas",
  Billing: "costs",
};

const blogCategoryMap: Record<string, string> = {
  "Choosing Home Care": "Choosing Home Care",
  "Family Caregiver Support": "Caregiver Support",
  "Senior Health & Well-Being": "Aging at Home",
};

/**
 * Seeds editorial CMS collections when empty — FAQs, blog, team, testimonials, careers.
 * Safe to run on every boot; skips collections that already have records.
 */
export async function seedEditorialContent(payload: Payload) {
  const { totalDocs: faqCount } = await payload.count({ collection: "faqs" });
  if (faqCount === 0) {
    for (const [index, faq] of demoFaqs.entries()) {
      await payload.create({
        collection: "faqs",
        data: {
          question: faq.question,
          answer: faq.answer,
          category: (faq.category && faqCategoryMap[faq.category]) ?? "getting-started",
          sortOrder: index * 10,
        },
      });
    }
    console.info(`[seed] Created ${demoFaqs.length} FAQ entries.`);
  }

  const { totalDocs: blogCount } = await payload.count({ collection: "blog-posts" });
  if (blogCount === 0) {
    for (const post of demoBlogPosts) {
      await payload.create({
        collection: "blog-posts",
        data: {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          category: blogCategoryMap[post.category] ?? "Choosing Home Care",
          published: true,
          publishedAt: post.publishedAt ?? new Date().toISOString(),
        },
      });
    }
    console.info(`[seed] Created ${demoBlogPosts.length} blog posts.`);
  }

  const { totalDocs: teamCount } = await payload.count({ collection: "team-members" });
  if (teamCount === 0) {
    for (const [index, member] of demoTeamMembers.entries()) {
      await payload.create({
        collection: "team-members",
        data: {
          name: member.name,
          role: member.role,
          bio: member.bio,
          category: index < 2 ? "Clinical Leadership" : "Care Team",
          isPlaceholder: true,
          published: true,
          sortOrder: index * 10,
        },
      });
    }
    console.info(`[seed] Created ${demoTeamMembers.length} team members.`);
  }

  const { totalDocs: testimonialCount } = await payload.count({ collection: "testimonials" });
  if (testimonialCount === 0) {
    for (const item of demoTestimonials) {
      await payload.create({
        collection: "testimonials",
        data: {
          quote: item.quote,
          attribution: item.attribution,
          relation: item.relation,
          isPlaceholder: true,
          published: true,
        },
      });
    }
    console.info(`[seed] Created ${demoTestimonials.length} testimonials.`);
  }

  const { totalDocs: careerCount } = await payload.count({ collection: "careers" });
  if (careerCount === 0) {
    await payload.create({
      collection: "careers",
      data: {
        title: "Personal Support Worker — Ottawa",
        slug: "psw-ottawa",
        summary:
          "Support clients across Ottawa with personal care, companionship and help around the home. Consistent client assignments and coordinator support.",
        profession: "Personal Support Worker",
        employmentType: "Part-time",
        published: true,
      },
    });
    console.info("[seed] Created sample career posting.");
  }

  await seedServiceBlocks(payload);
}

/**
 * Backfills CMS page blocks on services that have none — safe on every boot.
 */
export async function seedServiceBlocks(payload: Payload) {
  const { docs } = await payload.find({
    collection: "services",
    limit: 20,
  });

  let updated = 0;
  for (const service of docs) {
    const slug = String(service.slug);
    const blocks = service.blocks as unknown[] | null | undefined;
    if (blocks?.length) continue;

    const seeded = buildServiceBlocks(slug);
    if (!seeded.length) continue;

    await payload.update({
      collection: "services",
      id: service.id,
      data: { blocks: seeded },
    });
    updated += 1;
  }

  if (updated > 0) {
    console.info(`[seed] Backfilled blocks on ${updated} service(s).`);
  }
}
