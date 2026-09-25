import type { Payload } from "payload";
import { defaultBrand, defaultServices, ottawaCities, provincesSeed } from "@/lib/brand";

export async function seedDatabase(payload: Payload) {
  const { totalDocs: provinceCount } = await payload.count({
    collection: "provinces",
  });

  if (provinceCount > 0) {
    return;
  }

  const users = await payload.find({ collection: "users", limit: 1 });
  if (users.totalDocs === 0) {
    try {
      await payload.create({
        collection: "users",
        data: {
          email: "admin@jarkabi.ca",
          password: "ChangeMeNow123!",
          role: "super_admin",
          firstName: "Admin",
          lastName: "User",
        },
      });
      console.info("[seed] Created admin@jarkabi.ca — change password immediately.");
    } catch {
      console.info("[seed] Admin user already exists.");
    }
  }

  await payload.updateGlobal({
    slug: "brand-settings",
    data: {
      agencyName: "Jarkabi Home Care",
      tagline: "Exceptional Care. Right at Home.",
      email: "care@jarkabi.ca",
      websiteUrl: "https://jarkabi.ca",
      primaryPhone: "[PRIMARY PHONE]",
      tollFreePhone: "[TOLL-FREE PHONE]",
      businessHours: defaultBrand.businessHours,
      ottawaOfficeAddress: "[OTTAWA OFFICE ADDRESS]",
    },
  });

  const provinceIds: Record<string, number | string> = {};

  for (const province of provincesSeed) {
    const created = await payload.create({
      collection: "provinces",
      data: {
        name: province.name.en,
        slug: province.slug,
        code: province.code,
        status: province.status,
      },
    });
    provinceIds[province.slug] = created.id;
  }

  for (const citySlug of ottawaCities) {
    await payload.create({
      collection: "cities",
      data: {
        name: citySlug.charAt(0).toUpperCase() + citySlug.slice(1),
        slug: citySlug,
        province: provinceIds.ontario,
        status: "active",
      },
    });
  }

  const serviceBlocks: Record<string, unknown[]> = {
    "personal-care": [
      {
        blockType: "richText",
        eyebrow: "Overview",
        headline: "Respectful support for daily routines",
        body:
          "Personal care helps individuals maintain comfort, dignity and independence with bathing, dressing, grooming and mobility support at home.",
      },
      {
        blockType: "processTimeline",
        headline: "How care begins",
        steps: [
          { title: "Talk with us", description: "Share your needs and preferences." },
          { title: "Care assessment", description: "We review health, routine and home context." },
          { title: "Personalized plan", description: "A plan shaped around the person, not the schedule." },
          { title: "Care begins", description: "Matched caregivers start with continuity in mind." },
        ],
      },
    ],
    "registered-nursing": [
      {
        blockType: "richText",
        eyebrow: "Clinical care",
        headline: "Professional nursing at home",
        body:
          "Registered nurses and registered practical nurses provide skilled clinical support at home — wound care, medication administration, catheter and ostomy support, and monitoring after a hospital stay — within the scope of practice set by their regulatory college.",
      },
      {
        blockType: "trustBar",
        items: [
          { label: "Professional oversight" },
          { label: "Continuity of care" },
          { label: "Family communication" },
        ],
      },
    ],
    "dementia-support": [
      {
        blockType: "richText",
        eyebrow: "Specialty care",
        headline: "Support rooted in familiarity and dignity",
        body:
          "Dementia support emphasizes routine, meaningful activity, caregiver consistency and respectful communication for individuals and families.",
      },
    ],
  };

  for (const service of defaultServices) {
    const created = await payload.create({
      collection: "services",
      data: {
        title: service.title.en,
        slug: service.slug,
        summary: service.summary.en,
        category: service.category,
        featured: service.featured,
        published: true,
        sortOrder: service.sortOrder,
        blocks: serviceBlocks[service.slug],
      },
    });

    await payload.create({
      collection: "service-availability",
      data: {
        service: created.id,
        province: provinceIds.ontario,
        status: "active",
      },
    });
  }

  await payload.create({
    collection: "blog-posts",
    data: {
      title: "Choosing Home Care in Ottawa",
      slug: "choosing-home-care-ottawa",
      excerpt: "A practical guide for families exploring home care options in the National Capital Region.",
      category: "Choosing Home Care",
      published: true,
      publishedAt: new Date().toISOString(),
    },
  });

  await payload.create({
    collection: "careers",
    data: {
      title: "Personal Support Worker — Ottawa",
      slug: "psw-ottawa",
      summary:
        "Support clients across Ottawa with personal care, companionship and help around the home. Consistent client assignments and coordinator support.",
      profession: "Personal Support Worker",
      employmentType: "Part-time",
      published: false,
    },
  });

  await payload.create({
    collection: "legal-pages",
    data: {
      title: "Privacy Policy",
      slug: "privacy",
      published: false,
      reviewRequired: true,
    },
  });

  console.info("[seed] National location and service data ready.");
}
