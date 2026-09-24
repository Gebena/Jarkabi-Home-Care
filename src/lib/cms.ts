import { defaultBrand, defaultServices, provincesSeed } from "@/lib/brand";
import { getPayloadClient } from "@/lib/payload";
import type { Locale } from "@/i18n/routing";

export type BrandData = {
  agencyName: string;
  tagline: string;
  primaryPhone: string;
  tollFreePhone: string;
  email: string;
  websiteUrl: string;
  businessHours: string;
  ottawaOfficeAddress: string;
};

export type ProvinceData = {
  slug: string;
  code: string;
  name: string;
  status: "active" | "coming_soon" | "paused" | "not_served";
};

export type ServiceData = {
  slug: string;
  title: string;
  summary: string;
};

export type CityData = {
  slug: string;
  name: string;
  status: "active" | "coming_soon" | "paused" | "not_served";
};

const cmsUnavailable = { ok: false as const };

async function safePayload<T>(fn: () => Promise<T>): Promise<{ ok: true; data: T } | { ok: false }> {
  try {
    return { ok: true, data: await fn() };
  } catch {
    return cmsUnavailable;
  }
}

export async function getBrand(locale: Locale): Promise<BrandData> {
  const result = await safePayload(async () => {
    const payload = await getPayloadClient();
    const brand = await payload.findGlobal({ slug: "brand-settings", locale });
    return {
      agencyName: brand.agencyName || defaultBrand.agencyName,
      tagline: brand.tagline || defaultBrand.tagline,
      primaryPhone: brand.primaryPhone || defaultBrand.primaryPhone,
      tollFreePhone: brand.tollFreePhone || defaultBrand.tollFreePhone,
      email: brand.email || defaultBrand.email,
      websiteUrl: brand.websiteUrl || defaultBrand.websiteUrl,
      businessHours: brand.businessHours || defaultBrand.businessHours,
      ottawaOfficeAddress: brand.ottawaOfficeAddress || defaultBrand.ottawaOfficeAddress,
    };
  });

  if (!result.ok) return { ...defaultBrand };
  return result.data;
}

export async function getProvinces(locale: Locale): Promise<ProvinceData[]> {
  const result = await safePayload(async () => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "provinces",
      locale,
      limit: 20,
      sort: "name",
    });
    return docs.map((doc) => ({
      slug: doc.slug,
      code: doc.code,
      name: typeof doc.name === "string" ? doc.name : String(doc.name),
      status: doc.status as ProvinceData["status"],
    }));
  });

  if (!result.ok) {
    const lang = locale in provincesSeed[0].name ? locale : "en";
    return provincesSeed.map((p) => ({
      slug: p.slug,
      code: p.code,
      name: p.name[lang as keyof typeof p.name] ?? p.name.en,
      status: p.status,
    }));
  }
  return result.data;
}

export async function getCitiesByProvince(
  provinceSlug: string,
  locale: Locale,
): Promise<CityData[]> {
  const result = await safePayload(async () => {
    const payload = await getPayloadClient();
    const province = await payload.find({
      collection: "provinces",
      where: { slug: { equals: provinceSlug } },
      limit: 1,
    });
    const provinceId = province.docs[0]?.id;
    if (!provinceId) return [];

    const { docs } = await payload.find({
      collection: "cities",
      locale,
      where: { province: { equals: provinceId } },
      limit: 50,
      sort: "name",
    });

    return docs.map((doc) => ({
      slug: doc.slug,
      name: typeof doc.name === "string" ? doc.name : String(doc.name),
      status: doc.status as CityData["status"],
    }));
  });

  return result.ok ? result.data : [];
}

export async function getServices(locale: Locale): Promise<ServiceData[]> {
  const result = await safePayload(async () => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "services",
      locale,
      where: { published: { equals: true } },
      limit: 50,
      sort: "sortOrder",
    });
    return docs.map((doc) => ({
      slug: doc.slug,
      title: typeof doc.title === "string" ? doc.title : String(doc.title),
      summary: typeof doc.summary === "string" ? doc.summary : String(doc.summary ?? ""),
    }));
  });

  if (!result.ok) {
    const lang = locale in defaultServices[0].title ? locale : "en";
    return defaultServices.map((s) => ({
      slug: s.slug,
      title: s.title[lang as keyof typeof s.title] ?? s.title.en,
      summary: s.summary[lang as keyof typeof s.summary] ?? s.summary.en,
    }));
  }
  return result.data;
}

export type BlogPostData = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
};

export type CareerData = {
  slug: string;
  title: string;
  summary: string;
  profession: string;
  employmentType: string;
};

export async function getBlogPosts(locale: Locale): Promise<BlogPostData[]> {
  const result = await safePayload(async () => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "blog-posts",
      locale,
      where: { published: { equals: true } },
      limit: 50,
      sort: "-publishedAt",
    });
    return docs.map((doc) => ({
      slug: doc.slug,
      title: String(doc.title),
      excerpt: String(doc.excerpt ?? ""),
      category: String(doc.category ?? ""),
      publishedAt: String(doc.publishedAt ?? doc.createdAt),
    }));
  });
  return result.ok ? result.data : [];
}

export async function getBlogPost(slug: string, locale: Locale) {
  const result = await safePayload(async () => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "blog-posts",
      locale,
      where: { slug: { equals: slug }, published: { equals: true } },
      limit: 1,
    });
    return docs[0] ?? null;
  });
  return result.ok ? result.data : null;
}

export async function getCareers(locale: Locale): Promise<CareerData[]> {
  const result = await safePayload(async () => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "careers",
      locale,
      where: { published: { equals: true } },
      limit: 50,
    });
    return docs.map((doc) => ({
      slug: doc.slug,
      title: String(doc.title),
      summary: String(doc.summary ?? ""),
      profession: String(doc.profession ?? ""),
      employmentType: String(doc.employmentType ?? ""),
    }));
  });
  return result.ok ? result.data : [];
}

export async function getCareer(slug: string, locale: Locale) {
  const result = await safePayload(async () => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "careers",
      locale,
      where: { slug: { equals: slug }, published: { equals: true } },
      limit: 1,
    });
    return docs[0] ?? null;
  });
  return result.ok ? result.data : null;
}

export async function getLegalPage(slug: string, locale: Locale) {
  const result = await safePayload(async () => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "legal-pages",
      locale,
      where: { slug: { equals: slug }, published: { equals: true } },
      limit: 1,
    });
    return docs[0] ?? null;
  });
  return result.ok ? result.data : null;
}

export async function getPageBlocks(slug: string, locale: Locale) {
  const result = await safePayload(async () => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "pages",
      locale,
      where: { slug: { equals: slug }, published: { equals: true } },
      limit: 1,
    });
    return docs[0]?.blocks ?? null;
  });
  return result.ok ? result.data : null;
}
