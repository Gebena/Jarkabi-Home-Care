# Care Giver → Jarkabi Home Care component map

**Formula:** CARE GIVER visual design + SENIAR technical architecture = JARKABI HOME CARE

- **Visual reference:** Care Giver (ThemeArc, ThemeForest `23847564`) — **Home Page 01 only**.
  Live demo inspected at `https://preview.themeplace.pro/?g=23847564`.
- **Engineering foundation:** the Seniar-derived Next.js 16 App Router application in this
  repository (`src/app/[locale]/…`, `next-intl` routing, Payload CMS data layer, Tailwind CSS v4).
- **Rule:** no Care Giver HTML, jQuery, Bootstrap grid or template CSS is carried over. Every
  section is re-implemented as a reusable React component styled with Tailwind utilities that read
  from the central Jarkabi colour tokens.

---

## 1. Home Page 01 section order

The order below is Care Giver Home Page 01 top-to-bottom. It is preserved as closely as the
Jarkabi content model allows.

| # | Care Giver section | Jarkabi React component | File | Seniar route / structure |
|---|---|---|---|---|
| — | Sticky white header, serif wordmark + tagline, inline nav, tan "Ask a question" pill | `SiteHeader` | `src/components/layout/site-header.tsx` | Rendered once in `src/app/[locale]/layout.tsx` |
| — | Off-canvas mobile menu | `MobileNavigation` | `src/components/layout/mobile-nav.tsx` | Nested inside `SiteHeader` |
| 1 | Hero slider — full-bleed photo, plum overlay panel on the left, serif headline, tan `LEARN MORE`, square prev/next arrows, slide dots | `HeroSection` | `src/components/home/hero-section.tsx` | `src/app/[locale]/page.tsx` |
| 2 | Light-mist intro band — centred navy serif heading, italic serif subheading, muted paragraph | `AboutPreview` | `src/components/home/about-preview.tsx` | `src/app/[locale]/page.tsx` → links to `/about` |
| 3 | Three edge-to-edge colour blocks: teal *Enrich*, brick *Empower*, blue *Engage* over photo overlays | `PillarsSection` | `src/components/home/pillars-section.tsx` | `src/app/[locale]/page.tsx` |
| 4 | "What Services We offer" — left-aligned serif heading, tan dash under the subtitle, square outline arrows, four square-image cards | `ServicesGrid` + `ServiceCard` | `src/components/home/services-grid.tsx`, `src/components/home/service-card.tsx` | Data from `getServices()`; cards link to `/services/[slug]` |
| 5 | "Here For You Always" — plum panel, white checklist, italic tan dementia callout, overlapping photo with circular play button | `WhyChooseUs` | `src/components/home/why-choose-us.tsx` | `src/app/[locale]/page.tsx` → links to `/why-jarkabi` |
| 6 | "What is Home Care…" — centred serif heading over a grid of outlined line-icon care tasks | `CareTasksSection` | `src/components/home/care-tasks-section.tsx` | `src/app/[locale]/page.tsx` |
| 7 | Three-step care process on mist background | `CareProcess` | `src/components/home/care-process.tsx` | `src/app/[locale]/page.tsx` → links to `/how-care-works` |
| 8 | Statistics strip on plum | `StatisticsSection` | `src/components/home/statistics-section.tsx` | `src/app/[locale]/page.tsx` |
| 9 | "Share Your Cares. Inspire Others." — full-bleed photo, dark overlay, white outline button | `CallToAction` | `src/components/home/call-to-action.tsx` | `src/app/[locale]/page.tsx` → links to `/contact` |
| 10 | "What Our Clients Says" — rose-blush band, short white rule, white speech-bubble cards with tail, avatar + stars | `TestimonialSection` | `src/components/home/testimonial-section.tsx` | Data from `getTestimonials()` |
| 11 | Team grid — four portraits, each with a coloured name bar | `TeamSection` | `src/components/home/team-section.tsx` | Data from `getTeamMembers()` → `/about` |
| 12 | Location finder — ocean-blue band, tilted photos, beige search card with `GO` | `LocationFinder` | `src/components/home/location-finder.tsx` | Data from `getProvinces()` → `/locations/[province]` |
| 13 | "News & Articles" — three cards with coral "Continue Reading" link | `BlogPreview` | `src/components/home/blog-preview.tsx` | Data from `getBlogPosts()` → `/resources/[slug]` |
| 14 | Trust/accreditation strip | `TrustBar` | `src/components/home/trust-bar.tsx` | `src/app/[locale]/page.tsx` |
| 15 | Full-width map band above the footer | `ContactSection` | `src/components/home/contact-section.tsx` | `src/app/[locale]/page.tsx` → `/contact` |
| — | Dark-plum footer — brand column with circular socials, Quick Links, Contact Info, Newsletter with tan `SUBSCRIBE`, bottom bar | `Footer` | `src/components/layout/site-footer.tsx` | Rendered once in `src/app/[locale]/layout.tsx` |

Care Giver's demo renders sections 10–13 in a slightly different order across its sliders. Jarkabi
keeps the visual flow (social proof → people → coverage → knowledge) which matches the demo's
strongest sequence and avoids an empty carousel when the CMS has no records yet.

## 2. Deviations from the Care Giver demo, and why

| Care Giver | Jarkabi | Reason |
|---|---|---|
| "Visiting Angels", "(1800) 574 9687", "256, Victory Street, New York" | Jarkabi Home Care brand, Ottawa service area, brand settings from Payload | Demo branding and contact details must not ship |
| Lorem ipsum testimonial text | Testimonials from `getTestimonials()`, with an honest empty state | No fabricated reviews |
| "About Hotel" footer link (demo copy bug) | Real Jarkabi quick links | Correctness |
| Google Maps embed with a development-only watermark | Static service-area band linking to `/locations` | No API key required, no third-party script on first paint |
| Desktop-only fixed pixel widths | Fluid Tailwind breakpoints | Must work on mobile, tablet, laptop, desktop |
| Low-contrast tan text on white | Darkened tan for small text, tan preserved for large display text | WCAG AA contrast |
| jQuery slider (`owl.carousel`) | React state + `useEffect` autoplay with reduced-motion support | No jQuery in a React app |
| Counter strip: 500+ families served, 98% satisfaction | Commitments the business controls — 24/7 availability, 7 languages, 1:1 care plans, free first consultation | Jarkabi has not launched; the same page says testimonials arrive "after launch" |
| Team grid of demo portraits | Monogram tiles until real staff photography exists | A stock face above a real colleague's name misrepresents them |
| Demo photography (not redistributable under the Envato licence) | Jarkabi's own set in `public/images/photography`, same direction and warmth | See `docs/licensed-assets.md` — these are placeholders pending real, consented photography |

## 3. Styling architecture

```
src/styles/caregiver-interface.css   Care Giver palette as --cg-* custom properties (single source)
src/app/globals.css                  @theme inline maps --cg-* into Tailwind colour utilities
src/components/home/*                Tailwind utility classes only — no template CSS
```

Colour tokens exposed to Tailwind:

| Token | Utility | Hex | Care Giver usage |
|---|---|---|---|
| `--color-plum` | `bg-plum` / `text-plum` | `#5b2e42` | Hero overlay, "Here For You Always" panel |
| `--color-plum-deep` | `bg-plum-deep` | `#4a2336` | Section contrast, statistics strip |
| `--color-plum-footer` | `bg-plum-footer` | `#43263a` | Footer |
| `--color-tan` | `bg-tan` / `text-tan` | `#d9a894` | Primary buttons, italic callouts, dashes |
| `--color-tan-dark` | `bg-tan-dark` | `#b87658` | Hover state for tan surfaces |
| `--color-tan-ink` | `text-tan-ink` | `#96552f` | Tan used as *text*; `--color-tan` itself is only 2.1:1 on white |
| `--color-blush` | `bg-blush` | `#ddb4a6` | Testimonial band |
| `--color-blush-soft` | `bg-blush-soft` | `#f0dcd4` | Tints |
| `--color-care-teal` | `bg-care-teal` | `#0d7f68` | *Enrich* pillar |
| `--color-care-brick` | `bg-care-brick` | `#b0322f` | *Empower* pillar |
| `--color-care-ocean` | `bg-care-ocean` | `#2472b8` | *Engage* pillar, team name bars, location finder |
| `--color-coral` | `text-coral` | `#b8542c` | Active nav link, "Continue Reading" |
| `--color-ink` | `text-ink` | `#1a2b3c` | Headings |
| `--color-body` | `text-body` | `#566070` | Body copy |
| `--color-mist` | `bg-mist` | `#eceff3` | Alternating section background |

Several of these are darker than the Care Giver demo. Care Giver puts white type on its tan
buttons (2.1:1) and light tan type on white (2.1:1), and the brief says not to sacrifice
accessibility for visual similarity, so tan keeps its role as a *surface* colour while a
darker `--color-tan-ink` carries it as *text*. Tan surfaces pair with plum type at 5.2:1.
`axe-core` reports zero violations at 1680, 1366, 834 and 390 wide.

Two rules for this palette:

- Colour values live only in `src/styles/caregiver-interface.css`. Components use the Tailwind
  utilities, never a hex.
- That file defines tokens only. `globals.css` is imported after it, so a component rule
  written there loses to the legacy definition and silently does nothing.

## 4. Typography

| Role | Care Giver | Jarkabi | Token |
|---|---|---|---|
| Display / headings / wordmark | High-contrast transitional serif | `Frank Ruhl Libre` via `next/font` | `--font-display`, `font-display` |
| Body / nav / buttons | Geometric rounded sans | `Quicksand` via `next/font` | `--font-sans`, `font-sans` |

## 5. Inner pages (phase 2)

Built on the same components once the homepage is visually accurate:

`/about`, `/services`, `/services/[slug]`, `/why-jarkabi`, `/caregivers`, `/nursing`,
`/dementia-care`, `/how-care-works`, `/locations`, `/resources`, `/resources/[slug]`,
`/careers`, `/contact`, `/referrals`.

Each reuses `PageHero`, `ServicesGrid`, `WhyChooseUs`, `TestimonialSection`, `CallToAction` and
`ContactSection` rather than introducing new one-off layouts.
