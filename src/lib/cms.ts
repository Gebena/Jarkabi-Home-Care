import { defaultBrand, defaultServices, provincesSeed } from "@/lib/brand";
import {
  demoBlogPosts,
  demoFaqs,
  demoTeamMembers,
  demoTestimonials,
} from "@/lib/caregiver-demo-fallbacks";
import { getPayloadClient } from "@/lib/payload";
import type { Locale } from "@/i18n/routing";
import type { ServiceCategory } from "@/lib/services-config";
import { resolveServiceSlug } from "@/lib/services-config";

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
  category: ServiceCategory;
  featured: boolean;
  sortOrder: number;
};

export type ServiceDetailData = ServiceData & {
  blocks: unknown[] | null;
  seoTitle?: string;
  seoDescription?: string;
};

export type ServiceAvailabilityData = {
  serviceSlug: string;
  provinceSlug: string;
  citySlug?: string;
  status: "active" | "coming_soon" | "paused" | "not_served";
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

function mapServiceDoc(doc: Record<string, unknown>): ServiceData {
  return {
    slug: String(doc.slug ?? ""),
    title: typeof doc.title === "string" ? doc.title : String(doc.title ?? ""),
    summary: typeof doc.summary === "string" ? doc.summary : String(doc.summary ?? ""),
    category: (doc.category as ServiceCategory) || "daily-living",
    featured: Boolean(doc.featured),
    sortOrder: typeof doc.sortOrder === "number" ? doc.sortOrder : 0,
  };
}

function fallbackServices(locale: Locale): ServiceData[] {
  const lang = locale in defaultServices[0].title ? locale : "en";
  return defaultServices.map((s) => ({
    slug: s.slug,
    title: s.title[lang as keyof typeof s.title] ?? s.title.en,
    summary: s.summary[lang as keyof typeof s.summary] ?? s.summary.en,
    category: s.category,
    featured: s.featured,
    sortOrder: s.sortOrder,
  }));
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
    return docs.map(mapServiceDoc);
  });

  if (!result.ok) return fallbackServices(locale);
  return result.data;
}

export async function getService(slug: string, locale: Locale): Promise<ServiceDetailData | null> {
  const canonicalSlug = resolveServiceSlug(slug);

  const result = await safePayload(async () => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "services",
      locale,
      where: { slug: { equals: canonicalSlug }, published: { equals: true } },
      limit: 1,
    });
    const doc = docs[0];
    if (!doc) return null;
    return {
      ...mapServiceDoc(doc),
      blocks: (doc.blocks as unknown[]) ?? null,
      seoTitle: typeof doc.seoTitle === "string" ? doc.seoTitle : undefined,
      seoDescription: typeof doc.seoDescription === "string" ? doc.seoDescription : undefined,
    };
  });

  if (result.ok && result.data) return result.data;

  const fallback = fallbackServices(locale).find((s) => s.slug === canonicalSlug);
  if (!fallback) return null;
  return { ...fallback, blocks: null };
}

export async function getServiceAvailability(): Promise<ServiceAvailabilityData[]> {
  const result = await safePayload(async () => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "service-availability",
      limit: 200,
      depth: 2,
    });

    return docs
      .map((doc) => {
        const service = doc.service as { slug?: string } | number | null;
        const province = doc.province as { slug?: string } | number | null;
        const city = doc.city as { slug?: string } | number | null;
        const serviceSlug = typeof service === "object" && service?.slug ? service.slug : null;
        const provinceSlug = typeof province === "object" && province?.slug ? province.slug : null;
        const citySlug = typeof city === "object" && city?.slug ? city.slug : undefined;
        if (!serviceSlug || !provinceSlug) return null;
        return {
          serviceSlug,
          provinceSlug,
          citySlug,
          status: doc.status as ServiceAvailabilityData["status"],
        };
      })
      .filter(Boolean) as ServiceAvailabilityData[];
  });

  if (!result.ok) {
    return defaultServices.map((s) => ({
      serviceSlug: s.slug,
      provinceSlug: "ontario",
      status: "active" as const,
    }));
  }
  return result.data;
}

export async function getServicesForLocation(
  locale: Locale,
  provinceSlug: string,
  citySlug?: string,
): Promise<ServiceData[]> {
  const [services, availability] = await Promise.all([
    getServices(locale),
    getServiceAvailability(),
  ]);

  const activeSlugs = new Set(
    availability
      .filter((row) => {
        if (row.provinceSlug !== provinceSlug || row.status !== "active") return false;
        if (!citySlug) return !row.citySlug;
        return !row.citySlug || row.citySlug === citySlug;
      })
      .map((row) => row.serviceSlug),
  );

  if (activeSlugs.size === 0) return services;
  return services.filter((service) => activeSlugs.has(service.slug));
}

export async function getRelatedServices(
  locale: Locale,
  currentSlug: string,
  category: ServiceCategory,
  limit = 3,
): Promise<ServiceData[]> {
  const services = await getServices(locale);
  return services
    .filter((service) => service.slug !== currentSlug && service.category === category)
    .slice(0, limit);
}

export type BlogPostData = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  image?: string;
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
  if (result.ok && result.data.length > 0) return result.data;
  return demoBlogPosts;
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
  if (result.ok && result.data) return result.data;
  return demoBlogPosts.find((post) => post.slug === slug) ?? null;
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

export type TeamMemberData = {
  name: string;
  role: string;
  bio: string;
  category?: string;
  photo?: string;
};

export type TestimonialData = {
  quote: string;
  attribution: string;
  relation: string;
  photo?: string;
};

export type FaqData = {
  question: string;
  answer: string;
  category?: string;
};

export async function getTeamMembers(locale: Locale): Promise<TeamMemberData[]> {
  const result = await safePayload(async () => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "team-members",
      locale,
      where: { published: { equals: true }, isPlaceholder: { equals: false } },
      limit: 12,
      sort: "sortOrder",
    });
    return docs.map((doc) => ({
      name: String(doc.name),
      role: String(doc.role),
      bio: String(doc.bio ?? ""),
      category: doc.category ? String(doc.category) : undefined,
      photo: doc.photo && typeof doc.photo === "object" && "url" in doc.photo
        ? String((doc.photo as { url?: string }).url ?? "")
        : undefined,
    }));
  });
  if (result.ok && result.data.length > 0) {
    return result.data.map((member, index) => ({
      ...member,
      photo:
        member.photo ||
        demoTeamMembers[index % demoTeamMembers.length]?.photo ||
        demoTeamMembers[0]?.photo,
    }));
  }
  return demoTeamMembers;
}

export async function getTestimonials(locale: Locale): Promise<TestimonialData[]> {
  const result = await safePayload(async () => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "testimonials",
      locale,
      where: { published: { equals: true }, isPlaceholder: { equals: false } },
      limit: 6,
    });
    return docs.map((doc) => ({
      quote: String(doc.quote),
      attribution: String(doc.attribution),
      relation: String(doc.relation ?? ""),
      photo: doc.photo && typeof doc.photo === "object" && "url" in doc.photo
        ? String((doc.photo as { url?: string }).url ?? "")
        : undefined,
    }));
  });
  if (result.ok && result.data.length > 0) return result.data;
  return demoTestimonials;
}

export async function getFaqs(locale: Locale, category?: string): Promise<FaqData[]> {
  const result = await safePayload(async () => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "faqs",
      locale,
      where: category ? { category: { equals: category } } : {},
      limit: 50,
      sort: "sortOrder",
    });
    return docs.map((doc) => ({
      question: String(doc.question),
      answer: String(doc.answer),
      category: doc.category ? String(doc.category) : undefined,
    }));
  });
  if (result.ok && result.data.length > 0) return result.data;
  return demoFaqs;
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
