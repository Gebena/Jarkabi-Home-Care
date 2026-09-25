# Care Giver → Jarkabi section map

Section-level mapping for **Care Giver Home Page 01** and shared inner-page patterns. Each row is a visible band in the licensed demo, rebuilt as a React component with Tailwind utilities reading tokens from `src/styles/caregiver-interface.css`.

**Responsive rule of thumb:** Care Giver uses Bootstrap breakpoints; Jarkabi uses Tailwind `sm` (640) · `md` (768) · `lg` (1024) · `xl` (1280) · `2xl` (1536). Validate at 375 · 390 · 430 · 768 · 1024 · 1280 · 1440 · 1920.

---

## Global chrome

| Care Giver section | React component | File | Responsive | Assets | Animation / behaviour | Notes |
|---|---|---|---|---|---|---|
| Top bar (phone, hours — some demos) | optional — not on Home 01 | — | — | — | — | Jarkabi uses phone in header when Brand Settings provides it |
| Sticky header | `SiteHeader` | `layout/site-header.tsx` | Collapses to sheet nav `< xl` | `BrandWordmark` | Shadow on scroll | Spec §32 nav |
| Mobile menu | `MobileNav` | `layout/mobile-nav.tsx` | Sheet from right | — | shadcn `Sheet` | main + secondary nav |
| Footer (4-col plum) | `SiteFooter` | `layout/site-footer.tsx` | 1 → 2 → 4 columns | social SVGs | — | Newsletter form UI only until ESP wired |

---

## Home Page 01 — section order

| # | Care Giver section | React component | File | Responsive | Assets | Animation | Status |
|---|---|---|---|---|---|---|---|
| 1 | Hero slider — plum left panel, photo right, square arrows, dots | `HeroSection` | `home/hero-section.tsx` | Panel stacks below photo on mobile | 3× hero WebP | React autoplay slider; respects `prefers-reduced-motion` | **completed** |
| 2 | Intro band — centred serif headline + italic sub + body | `AboutPreview` | `home/about-preview.tsx` | centred all breakpoints | — | — | **completed** |
| 3 | Three pillars — Enrich / Empower / Engage colour blocks | `PillarsSection` | `home/pillars-section.tsx` | 1 col → 3 col | pillar photos | hover lift on images | **completed** |
| 4 | Services grid — square cards, outline arrows | `ServicesGrid` + `ServiceCard` | `home/services-grid.tsx`, `ui/service-card.tsx` | 1 → 2 → 4 | service photography | card hover | **completed** |
| 5 | “Here For You Always” — plum panel + overlapping photo | `WhyChooseUs` | `home/why-choose-us.tsx` | panel + image stack | `jarkabi-why-tea-conversation` | play button decorative | **completed** |
| 6 | “What is Home Care” — icon task grid | `CareTasksSection` | `home/care-tasks-section.tsx` | 2 → 3 → 4 col | Lucide icons | — | **completed** |
| 7 | Three-step process | `CareProcess` | `home/care-process.tsx` | horizontal → stacked | — | scroll reveal optional | **completed** |
| 8 | Statistics strip on deep plum | `StatisticsSection` | `home/statistics-section.tsx` | 2 → 4 col | — | no fake counters — commitments instead | **completed** |
| 9 | CTA banner — photo + overlay + outline button | `CallToAction` | `ui/call-to-action.tsx` | full-bleed | `jarkabi-cta-hands` | — | **completed** |
| 10 | Testimonials — blush band, speech bubbles | `TestimonialSection` | `home/testimonial-section.tsx` | carousel / grid | avatars | React state slider | **partial** — needs CMS content |
| 11 | Team grid — coloured name bars | `TeamSection` | `home/team-section.tsx` | 2 → 4 col | monogram tiles | hover | **partial** — real photos pending |
| 12 | Location finder — blue band + search card | `LocationFinder` | `home/location-finder.tsx` | collage + form stack | location photos | form → `/locations` | **completed** |
| 13 | News & Articles — 3 cards | `BlogPreview` | `home/blog-preview.tsx` | 1 → 3 col | blog fallbacks | — | **completed** |
| 14 | Trust / accreditation strip | `TrustBar` | `home/trust-bar.tsx` | horizontal scroll small | — | — | **completed** |
| 15 | Map / contact band | `ContactSection` | `home/contact-section.tsx` | form + map area | — | links to `/contact` | **completed** |

---

## Shared inner-page sections

| Care Giver pattern | React component | File | Used on |
|---|---|---|---|
| Inner banner — title on textured photo | `PageHero` | `sections/page-hero.tsx` | About, Services, Contact, … |
| Breadcrumbs | `Breadcrumbs` | `ui/breadcrumbs.tsx` | Service detail, resources |
| Service detail body | service template | `app/(site)/[locale]/services/[slug]/page.tsx` | each service |
| FAQ accordion | `FAQSection` | `sections/faq-section.tsx` | where FAQs seeded |
| Sidebar CTA | `CallToAction` | `ui/call-to-action.tsx` | inner pages |
| Contact form block | `ContactForm` | `forms/contact-form.tsx` | Contact, homepage band |

---

## Design tokens (Tailwind)

All sections consume tokens defined in `src/styles/caregiver-interface.css` and mapped in `globals.css`:

| Token | Care Giver role |
|---|---|
| `plum`, `plum-deep`, `plum-footer` | hero overlay, feature panels, footer |
| `tan`, `tan-dark`, `tan-ink` | buttons, accents, readable tan text |
| `blush`, `blush-soft` | testimonial band |
| `care-teal`, `care-brick`, `care-ocean` | pillar blocks, team bars, location band |
| `coral` | active nav, “Continue reading” |
| `ink`, `body`, `mist` | type and alternating backgrounds |
| `font-display` (Frank Ruhl Libre) | headings, wordmark |
| `font-sans` (Quicksand) | UI, body, buttons |

---

## Accessibility notes per section

| Section | Requirement |
|---|---|
| Hero slider | `aria-roledescription="carousel"`, live region for slide changes, pause on focus/hover |
| Testimonials | Real quotes only; no fabricated reviews |
| Forms | Labels, `aria-invalid`, server + client validation (Zod + RHF) |
| Colour | Tan-on-white adjusted to `tan-ink` for AA text contrast |
| Motion | Carousels respect `prefers-reduced-motion` |

---

## Visual comparison checklist (spec §35)

For each section above, compare Jarkabi vs licensed Care Giver Home Page 01:

- [ ] Layout width and horizontal padding
- [ ] Section vertical rhythm (`py-*`)
- [ ] Heading scale (serif display)
- [ ] Button geometry (square corners, uppercase tracking)
- [ ] Image aspect ratios (hero 16:9-ish, service cards 1:1)
- [ ] Pillar block colours exact hue
- [ ] Footer column balance

**Blocker:** Unpack `/templates/caregiver/` to open the original HTML locally for pixel comparison.
