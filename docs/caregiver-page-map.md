# Care Giver → Jarkabi page map

**Formula:** CARE GIVER visual design + SENIAR technical architecture = **JARKABI HOME CARE**

**Primary reference:** Care Giver **Home Page 01** (ThemeArc, ThemeForest `23847564`, Envato Elements `KVZ473J956`).

**Template source:** Licensed files must live at `/templates/caregiver/` (gitignored). That folder is currently **empty** on the Cloud Agent VM — unpack your purchased zip locally or upload to the agent before file-level asset extraction. Until then, this map is maintained from the prior preview audit plus the implemented Next.js routes.

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
| About Us | `/[locale]/about` | `PageHero`, `AboutPreview`, `PillarsSection`, `StatisticsSection`, `TeamSection` | `jarkabi-pillar-*`, page banner | CMS + `messages` | **partial** — layout matches; copy review pending |
| Services listing | `/[locale]/services` | `PageHero`, `ServicesGrid`, `CallToAction` | service photography set | `getServices()` Payload | **completed** |
| Service Details | `/[locale]/services/[slug]` | service detail template | per-service images | Payload `Services` | **partial** — structure done; Care Giver detail layout pass pending |
| Team | `/[locale]/about` (team band) + future `/team` | `TeamSection`, `TeamCard` | monogram placeholders until real photos | `getTeamMembers()` | **partial** |
| Team Details | — | — | — | — | **planned** — map to `/about` anchor or `/careers` |
| Testimonials | homepage band + `/why-jarkabi` | `TestimonialSection` | avatar placeholders | `getTestimonials()` | **partial** — empty until CMS records |
| FAQ | `/[locale]/resources` + service pages | `FAQAccordion` (where used) | — | Payload `FAQs` | **partial** |
| Gallery | — | — | licensed gallery images when template unpacked | — | **planned** |
| Blog listing | `/[locale]/resources` | `BlogPreview`, resources grid | blog photography set | `getBlogPosts()` | **completed** |
| Blog Details | `/[locale]/resources/[slug]` | article template | featured image | Payload `BlogPosts` | **partial** |
| Contact | `/[locale]/contact` | contact form + map band | — | Brand Settings + form API | **completed** |
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
| 1 | Inspect licensed Care Giver files | **blocked** — `/templates/caregiver/` empty; license PDF present |
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

## Next actions when template is unpacked

1. Run a file-level diff: list every `.html` under `/templates/caregiver/` and add a row to this table.
2. Copy permitted images into `jarkabi-home-care/public/images/caregiver-licensed/` and register each file in `docs/licensed-assets.md`.
3. Side-by-side visual comparison at 1920 / 1440 / 1280 / 1024 / 768 / 430 / 390 / 375 px for Home Page 01 first, then each inner page.
