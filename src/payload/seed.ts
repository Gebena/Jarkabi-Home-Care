import type { Payload } from "payload";
import { defaultBrand, defaultServices, ottawaCities, provincesSeed } from "@/lib/brand";
import { seedEditorialContent } from "@/payload/seed-content";
import { allServiceBlockMap } from "@/payload/seed-service-blocks";

export async function seedDatabase(payload: Payload) {
  await seedEditorialContent(payload);

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

  const serviceBlocks = allServiceBlockMap();

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
