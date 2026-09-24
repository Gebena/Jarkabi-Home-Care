# SEO Architecture — Jarkabi Home Care

**Domain:** https://jarkabi.ca  
**Brand in titles:** `Page Name | Jarkabi Home Care`

---

## Current state

| Feature | Status |
|---------|--------|
| `metadataBase` | ✅ `https://jarkabi.ca` |
| Per-page titles | ✅ Most pages |
| Open Graph basics | ⚠️ Partial — no OG images |
| Twitter cards | ❌ |
| `sitemap.xml` | ❌ |
| `robots.txt` | ❌ |
| JSON-LD structured data | ❌ |
| hreflang (7 locales) | ❌ (en/fr only) |
| Canonical URLs | ⚠️ Partial |
| Breadcrumbs | ❌ |

---

## URL structure

### Current

```
/{locale}/services/{slug}
/{locale}/locations/{province}/{city}
/{locale}/resources/{slug}
```

### Target (local SEO) §70

```
/{locale}/ontario/
/{locale}/ontario/ottawa/
/{locale}/ontario/ottawa/home-care/
/{locale}/ontario/ottawa/dementia-care/
```

Implement via Next.js dynamic routes in Phase 7–8. Only generate pages for `ACTIVE` locations §44.

---

## Metadata pattern

```ts
export const metadata: Metadata = {
  title: "Personal Care",
  description: "Compassionate personal care at home in Ottawa...",
  alternates: {
    canonical: "https://jarkabi.ca/en/ontario/ottawa/personal-care",
    languages: {
      en: "https://jarkabi.ca/en/...",
      fr: "https://jarkabi.ca/fr/...",
      // all 7 locales
    },
  },
  openGraph: {
    title: "Personal Care | Jarkabi Home Care",
    description: "...",
    url: "https://jarkabi.ca/en/...",
    siteName: "Jarkabi Home Care",
    locale: "en_CA",
    type: "website",
    images: [{ url: "/og/personal-care.jpg", width: 1200, height: 630 }],
  },
};
```

CMS fields: `seoTitle`, `seoDescription` on services, blog, pages.

---

## Structured data (Phase 13) §71

| Schema | Pages |
|--------|-------|
| `Organization` | Homepage |
| `LocalBusiness` | Ottawa location page (real address + phone only) |
| `Service` | Service detail pages |
| `FAQPage` | FAQ / service FAQs |
| `Article` | Blog posts |
| `BreadcrumbList` | All inner pages |
| `JobPosting` | Career detail pages |

**Rules:**
- Do not claim medical credentials not verified
- Do not use fake review schema
- Phone/address must match Brand Settings

---

## Sitemap (planned)

`src/app/sitemap.ts` — dynamic generation from:

- Static pages (all locales × ACTIVE locations)
- CMS services, blog posts, careers
- `lastmod` from CMS `updatedAt`
- `priority` — homepage 1.0, services 0.8, blog 0.6

---

## Robots (planned)

`src/app/robots.ts`:

```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api
Sitemap: https://jarkabi.ca/sitemap.xml
```

---

## Local SEO (Ottawa launch)

| Element | Source |
|---------|--------|
| NAP (name, address, phone) | Brand Settings — **must be real** |
| Service area | Ottawa + surrounding communities (editable) |
| Google Business Profile | External — link when live |
| Location page content | Unique Ottawa copy — not duplicated across cities |

---

## Content SEO guidelines §74

- Canadian English spelling (en-CA)
- Grade 7–9 readability for family audiences
- H1 once per page; logical heading hierarchy
- Alt text on all meaningful images
- Internal linking: services ↔ locations ↔ resources

---

## Implementation checklist (Phase 13)

- [ ] `sitemap.ts`
- [ ] `robots.ts`
- [ ] JSON-LD components in `src/components/seo/`
- [ ] OG image generator or static templates per page type
- [ ] hreflang for 7 locales
- [ ] Breadcrumb component
- [ ] CMS `seo_metadata` collection (optional)

---

*See also: [`migration-strategy.md`](./migration-strategy.md) Phase 13*
