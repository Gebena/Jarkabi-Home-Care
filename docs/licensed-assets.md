# Licensed asset record

Jarkabi Home Care is built from two templates the owner legally purchased. This file records
what was reused from each, and where every image on the site comes from.

## Licences held

| Template | Author | Marketplace | Item / licence | Role in this project |
|---|---|---|---|---|
| **Care Giver** | ThemeArc | ThemeForest item `23847564` | Envato Elements licence `KVZ473J956` | **Visual reference only** — layout, colour palette, typography, section order, spacing |
| **Seniar** | KodeSolution | ThemeForest | Purchased by the owner | **Engineering reference only** — Next.js / React application structure, routing, component approach |

## What was reused, and what was not

### Care Giver

Reused: design decisions — Home Page 01 section order, the plum/tan/blush palette, the
serif-display-over-rounded-sans type pairing, the square (non-pill) button geometry, the
three colour-block pillar treatment, the plum feature panel with an overlapping photo, the
speech-bubble testimonial cards, and the four-column dark footer.

Not reused: no Care Giver HTML, CSS, JavaScript, jQuery plugin, Bootstrap build or image file
exists in this repository. Every section was re-implemented as a React component styled with
Tailwind utilities. The Care Giver package is not vendored and its source files are not
redistributed.

### Seniar

Reused: the Next.js App Router project shape, the localised `[locale]` route tree, the
reusable-section component approach, and the responsive breakpoint strategy.

Not reused: no Seniar branding, copy, imagery or Bootstrap 5 stylesheet ships. Seniar's own
homepage layout was replaced by the Care Giver Home Page 01 layout.

## Licensed template files (local — not in Git)

| Path | Status | Action |
|---|---|---|
| `/templates/caregiver/` | **Present** — 25 HTML demos, css/js/images/fonts (unpacked 2026-09-25) | Agent: extract permitted assets into `public/` |
| `/templates/caregiver-icons-flat/` | **Present** — Flaticon SVG/PNG/EPS icon pack | Optional: wire icons where Care Giver uses flaticon |
| `/templates/seniar/` | **Empty** | Owner: unzip Seniar React package here |
| `/templates/licenses/caregiver-envato-elements.pdf` | Present | Envato Elements licence `KVZ473J956` |

When `/templates/caregiver/` is populated, the agent will:

1. Inventory every `.html` demo page and update `docs/caregiver-page-map.md`.
2. Copy **permitted** images, icons, and fonts into `jarkabi-home-care/public/` subfolders.
3. Register each copied file in the table below (original filename → final path → pages used).
4. Replace AI placeholder photography where licensed demo photos are cleared for end-product use.

Homepage hero, service cards, about collage, location finder, blog fallbacks, and the "Here For You Always" panel use licensed Care Giver template photos via `src/lib/site-images.ts`. The legacy AI placeholder set in `public/images/photography/` has been removed from the repository.

---

## Template assets copied into `public/` (2026-09-25)

| Source (template) | Production path | Used on |
|---|---|---|
| `images/background/pattern-1.png` | `public/images/caregiver-licensed/backgrounds/pattern-1.png` | Home — "Here For You Always" plum panel texture |
| `images/background/1.png` | `public/images/caregiver-licensed/backgrounds/1.png` | Home + inner pages — mid-page CTA texture |
| `images/background/2.png` | `public/images/caregiver-licensed/backgrounds/2.png` | Home — location finder band texture |
| Flaticon `189-hair.svg` | `public/icons/caregiver/189-hair.svg` | Home — care tasks grid |
| Flaticon `186-elder.svg` | `public/icons/caregiver/186-elder.svg` | Home — care tasks grid |
| Flaticon `180-medicine.svg` | `public/icons/caregiver/180-medicine.svg` | Home — care tasks grid |
| Flaticon `187-walk.svg` | `public/icons/caregiver/187-walk.svg` | Home — care tasks grid |
| Flaticon `183-groceries.svg` | `public/icons/caregiver/183-groceries.svg` | Home — care tasks grid |
| Flaticon `188-deal.svg` | `public/icons/caregiver/188-deal.svg` | Home — care tasks grid |

Wiring: `src/lib/caregiver-assets.ts`.

### Bulk copy (2026-09-25 — full demo pass)

| Source folder | Production path | Used on |
|---|---|---|
| `images/background/*` | `public/images/caregiver-licensed/backgrounds/` | Page banners, CTA textures |
| `images/gallery/*` (19 placeholders in package) | `public/images/caregiver-licensed/gallery/*.webp` | `/gallery` — real curated photography replaces grey template JPEGs |
| `images/resource/*` (52 files) | `public/images/caregiver-licensed/resource/` | Team, testimonials, blog, service detail, how-care-works |
| `images/main-slider/1–3.jpg` | `public/images/caregiver-licensed/main-slider/` | Homepage hero slider |

Registry: `src/lib/caregiver-assets.ts`, homepage slots: `src/lib/site-images.ts`, demo copy: `src/lib/caregiver-demo-fallbacks.ts`.

**Home Page 02–05:** intentionally **not** implemented — spec §32 uses Home Page 01 only. Variants remain reference-only in `/templates/caregiver/index-2.html` … `index-5.html`.

---

## Photography (licensed Care Giver assets)

Production photography comes from the licensed Care Giver template package in
`public/images/caregiver-licensed/`, registered in `src/lib/caregiver-assets.ts` and assigned
to page slots in `src/lib/site-images.ts`. Run `npm run verify:images` after editing either
file.

### Outstanding

- **Commission real photography.** The Care Giver Envato licence covers template demo photos for
  the owner's deployment; replace with real, consented photography of Jarkabi clients and staff
  when available — update paths in `site-images.ts`.
- **Team portraits.** Team cards render a monogram, not a face: putting a stranger's
  photograph above a real colleague's name misrepresents them. Add a per-member image field to
  the Payload team collection alongside real staff photography.
- **Testimonials** render only from the CMS. The homepage shows an honest empty state rather
  than sample quotes, so no fabricated review can ship.
- **The commitments band** replaced Care Giver's achievement counters (500+ families served,
  98% satisfaction) with claims the business can stand behind. Restore counters only once
  there are real numbers.

## Fonts

| Role | Font | Licence |
|---|---|---|
| Display / headings | Frank Ruhl Libre | SIL Open Font License 1.1, served by `next/font` |
| Body / navigation | Quicksand | SIL Open Font License 1.1, served by `next/font` |

Care Giver's own licensed webfonts are not redistributed; these are open-licence equivalents
chosen for the same high-contrast-serif over rounded-sans pairing.

## Icons

`lucide-react` (ISC licence). No Care Giver or Seniar icon fonts are bundled.
