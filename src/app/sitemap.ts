import { locales } from "@/i18n/routing";
import { getBlogPosts, getCareers, getProvinces, getServices } from "@/lib/cms";
import { ottawaCities, provincesSeed } from "@/lib/brand";
import { siteUrl } from "@/lib/seo";
import type { MetadataRoute } from "next";

const staticPages = [
  "",
  "/about",
  "/services",
  "/how-care-works",
  "/why-jarkabi",
  "/locations",
  "/resources",
  "/faq",
  "/gallery",
  "/team",
  "/testimonials",
  "/careers",
  "/contact",
  "/referrals",
  "/caregivers",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${siteUrl}/${locale}${page}`,
        lastModified: now,
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : 0.7,
      });
    }
  }

  const [services, posts, careers] = await Promise.all([
    getServices("en"),
    getBlogPosts("en"),
    getCareers("en"),
  ]);

  for (const locale of locales) {
    for (const service of services) {
      entries.push({
        url: `${siteUrl}/${locale}/services/${service.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
      });

      for (const province of provincesSeed.filter((p) => p.status === "active")) {
        for (const city of ottawaCities) {
          entries.push({
            url: `${siteUrl}/${locale}/${province.slug}/${city}/${service.slug}`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.75,
          });
        }
      }
    }

    for (const post of posts) {
      entries.push({
        url: `${siteUrl}/${locale}/resources/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }

    for (const career of careers) {
      entries.push({
        url: `${siteUrl}/${locale}/careers/${career.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.65,
      });
    }
  }

  const provinces = await getProvinces("en");
  for (const locale of locales) {
    for (const province of provinces.filter((p) => p.status === "active")) {
      entries.push({
        url: `${siteUrl}/${locale}/locations/${province.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
