# Care Giver → Jarkabi page map

**Formula:** CARE GIVER visual design + SENIAR technical architecture = **JARKABI HOME CARE**

**Primary reference:** Care Giver **Home Page 01** (ThemeArc, ThemeForest `23847564`, Envato Elements `KVZ473J956`).

**Template source:** Licensed files live at `/templates/caregiver/` (gitignored). **Unpacked 2026-09-25** from the owner's Google Drive upload (15.7 MB main package + icon pack in `/templates/caregiver-icons-flat/`).

**Status legend:** `completed` · `partial` · `planned` · `n/a` (not relevant to Jarkabi)

---

## Home variants

| Care Giver page | Jarkabi route | React entry | Assets | Content source | Status |
|---|---|---|---|---|---|
| Home Page 01 (`index.html` / `index-1.html`) | `/[locale]` | `src/app/(site)/[locale]/page.tsx` + `src/components/home/*` | `public/images/photography/*`, `src/lib/site-images.ts` | Care Giver demo copy adapted in `messages/en.json` → Jarkabi / Ottawa | **completed** |
| Home Page 02 | — | — | — | — | **n/a** — do not combine without approval |
| Home Page 03 | — | — | — | — | **n/a** |

---

## Core marketing pages

| Care Giver page | Jarkabi route | React components | Assets | Content source | Status |
|---|---|---|---|---|---|
| About Us | `/[locale]/about` | `PageHero`, mission band, `CallToAction`, healthcare collage, `TestimonialSection`, values | page banner + about photography | CMS + `messages` | **partial** — Care Giver section order matched |
| Services listing | `/[locale]/services` | `PageHero`, listing intro, category grids, `CallToAction` | service photography set | `getServices()` Payload | **partial** — left-aligned category bands |
| Service Details | `/[locale]/services/[slug]` | `BlockRenderer`, `ServiceDetailSections`, `ServiceSidebar` | per-service images | Payload `Services` | **partial** — 8/4 sidebar layout added |
| Team | `/[locale]/about` (team band) + future `/team` | `TeamSection`, `TeamCard` | monogram placeholders until real photos | `getTeamMembers()` | **partial** |
| Team Details | — | — | — | — | **planned** — map to `/about` anchor or `/careers` |
| Testimonials | homepage band + `/why-jarkabi` | `TestimonialSection` | avatar placeholders | `getTestimonials()` | **partial** — empty until CMS records |
| FAQ | `/[locale]/resources` + service pages | `FAQAccordion` (where used) | — | Payload `FAQs` | **partial** |
| Gallery | — | — | licensed gallery images when template unpacked | — | **planned** |
| Blog listing | `/[locale]/resources` | `BlogPreview`, resources grid | blog photography set | `getBlogPosts()` | **completed** |
| Blog Details | `/[locale]/resources/[slug]` | article template | featured image | Payload `BlogPosts` | **partial** |
| Contact | `/[locale]/contact` | form + office panel, care request, `ContactSection` | about photography placeholder | Brand Settings + form API | **partial** — Care Giver two-column form layout |
| Appointment / Request Care | `/[locale]/contact` (primary CTA) | `ContactForm`, `/api/care-request` | — | Zod + RHF | **completed** |

---

## Specialty & caregiver pages (Care Giver demos → Jarkabi equivalents)

| Care Giver page | Jarkabi route | React components | Status |
|---|---|---|---|
| Caregiver landing | `/[locale]/caregivers` | `specialty-page.tsx` shell | **partial** |
| Nursing / Medical care | `/[locale]/nursing` | `specialty-page.tsx` | **partial** |
| Dementia / Memory care | `/[locale]/dementia-care` | `specialty-page.tsx` | **partial** |
| Senior care (generic) | `/[locale]/services/senior-home-care` | service detail | **completed** |
| Pricing | — | — | **planned** — only if Jarkabi offers published rates |
| 404 | `not-found.tsx` | branded 404 | **partial** |
| Coming Soon | — | — | **n/a** |

---

## Jarkabi-only pages (no Care Giver equivalent — keep Seniar architecture)

| Jarkabi route | Purpose | Status |
|---|---|---|
| `/[locale]/how-care-works` | Process / onboarding | **completed** |
| `/[locale]/why-jarkabi` | Differentiators | **completed** |
| `/[locale]/why-choose-us` | Legacy alias → redirect or merge | **partial** |
| `/[locale]/locations` | National coverage hub | **completed** |
| `/[locale]/locations/[province]` | Province hub | **completed** |
| `/[locale]/locations/[province]/[city]` | City hub | **completed** |
| `/[locale]/[province]/[city]/[service]` | Local SEO landing | **completed** |
| `/[locale]/careers` | Jobs list | **partial** |
| `/[locale]/careers/[slug]` | Job detail + application | **partial** |
| `/[locale]/referrals` | Referral form | **completed** |
| `/[locale]/legal/*` | Privacy, terms, accessibility | **partial** |
| `/[locale]/growing-across-canada` | Expansion narrative | **completed** |
| `/admin` | Payload CMS | **completed** |

---

## Navigation mapping (spec §32)

| Care Giver demo nav | Jarkabi header (`mainNav`) |
|---|---|
| Home | Home |
| About | About |
| Services (+ dropdown in some demos) | Services |
| — | How Care Works |
| — | Why Jarkabi |
| Blog / News | Resources |
| — | Careers |
| Contact | Contact |
| Header CTA (“Ask a question”) | **Request Care** → `/contact` |

Secondary/footer: Locations, Our Caregivers, Referrals.

---

## Implementation phases (from master brief §37)

| Phase | Deliverable | Status |
|---|---|---|
| 1 | Inspect licensed Care Giver files | **completed** — 25 HTML demos + assets at `/templates/caregiver/` |
| 2 | Inspect Seniar / Jarkabi architecture | **completed** — this repo |
| 3 | Page inventory | **this document** |
| 4 | `caregiver-page-map.md` | **this document** |
| 5 | `licensed-assets.md` | see companion doc |
| 6 | Layout shell | **completed** — `(site)/[locale]/layout.tsx` |
| 7 | Header | **completed** — `site-header.tsx` |
| 8 | Home Page 01 | **completed** — visual QA ongoing |
| 9 | Visual comparison | **ongoing** — needs side-by-side with unpacked template |
| 10 | Footer | **completed** — `site-footer.tsx` |
| 11 | Inner pages | **partial** — see tables above |
| 12–20 | Tailwind, branding, React interactions, Supabase, QA, SEO | **partial** — see `docs/PROGRESS.md` |

---

## Licensed HTML inventory (`/templates/caregiver/`)

| Care Giver file | Demo purpose |
|---|---|
| `index.html` | **Home Page 01** (primary reference) |
| `index-2.html` | Home Page 02 |
| `index-3.html` | Home Page 03 |
| `index-4.html` | Home Page 04 |
| `index-5.html` | Home Page 05 |
| `about.html` | About Us |
| `blog.html` | Blog listing |
| `blog-detail.html` | Blog detail |
| `team.html` | Team listing |
| `testimonial.html` | Testimonials |
| `faq.html` | FAQ |
| `gallery.html` | Gallery |
| `contact.html` | Contact |
| `caregiver.html` | Caregiver landing |
| `care.html` | Care services overview |
| `nursing.html` | Nursing care |
| `personal-care.html` | Personal care |
| `respite-care.html` | Respite care |
| `special-care.html` | Special care |
| `elderly-service.html` | Elderly services |
| `life-care.html` | Life care |
| `chronical.html` | Chronic care |
| `discharge.html` | Discharge care |
| `support.html` | Support services |
| `surgery.html` | Surgery recovery |
| `started.html` | Getting started |

Also present: `documentation/` (ThemeArc help site), `css/`, `js/`, `images/` (107 files), `fonts/`, `plugins/`.

## Next actions

1. Copy permitted images into `jarkabi-home-care/public/images/caregiver-licensed/` and register each file in `docs/licensed-assets.md`.
2. Side-by-side visual comparison at 1920 / 1440 / 1280 / 1024 / 768 / 430 / 390 / 375 px for Home Page 01 first, then each inner page.
3. Inner-page visual pass using the HTML demos above.
