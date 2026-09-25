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

## Photography

The Care Giver demo photographs are supplied for preview purposes and are **not
redistributable** under the Envato licence — templates ship them as placeholders precisely
because the end user is expected to substitute their own. Jarkabi therefore has its own set,
composed to match Care Giver's direction: warm, naturally lit, candid senior care.

> **These are AI-generated photographs, not photographs of real people.** Nobody in them is a
> Jarkabi client, caregiver or employee, and no scene depicted actually happened. They are
> placeholders that look like the site's intended photography instead of looking like stock.
> **Replace them with real, consented photography of Jarkabi clients and staff before
> launch.** Until then, no image on this site is presented as evidence of anything — no
> caption, testimonial, statistic or credential is attached to any face.

The files live in `public/images/photography` as WebP (quality 82; 6.3 MB of source PNG
compresses to 1.8 MB). Nothing is hotlinked from a third-party CDN, so there is no external
dependency and no photo ID that can be retired out from under the site.

All photography is wired up centrally in `src/lib/site-images.ts` — no component holds an
image path of its own. Run `npm run verify:images` after editing it: the script checks every
referenced file exists and flags anything in the directory nothing points at.

### The set

Every alt text below was written after looking at the frame, because descriptions written from
the brief are frequently wrong — four of these were corrected on review.

| File | What it shows | Where it is used |
|---|---|---|
| `jarkabi-hero-care-conversation` | A care worker beside a smiling older man in his living room, hand on his shoulder | Hero slide 1 |
| `jarkabi-hero-kitchen-tea` | A care worker pouring tea for an older woman at a kitchen counter | Hero slide 2 |
| `jarkabi-hero-garden-walk` | A care worker steadying an older woman's walking frame on a garden path | Hero slide 3 |
| `jarkabi-pillar-enrich` | Two women looking through a photo album on a sofa | Pillar 1 "Enrich", `/about` |
| `jarkabi-pillar-empower` | An older man watering herbs on a windowsill, care worker alongside | Pillar 2 "Empower" |
| `jarkabi-pillar-engage` | An older woman and a care worker laughing over a board game | Pillar 3 "Engage", `/about` |
| `jarkabi-why-tea-conversation` | An older woman talking with a care worker across a teapot | "Here For You Always" panel, `/about` lead image |
| `jarkabi-cta-hands` | An older woman smiling as someone holds her hands across a table | Mid-page call to action |
| `jarkabi-page-banner-texture` | Hands resting on a knitted blanket beside a mug — no face | Banner behind every inner page title |
| `jarkabi-location-home-visit` | A care worker greeted at a front door | Location finder collage |
| `jarkabi-location-couple-home` | An older couple laughing over a photo album | Location finder collage |
| `jarkabi-blog-family-planning` | A daughter and her older mother talking over a notebook | Resource card fallback |
| `jarkabi-blog-home-safety` | A care worker fitting a grab rail while an older man looks on | Resource card fallback |
| `jarkabi-blog-nutrition` | An older woman and a care worker chopping vegetables together | Resource card fallback |
| `svc-personal-care` | A care worker helping an older woman fasten her cardigan | Personal care card |
| `svc-senior-home-care` | An older woman with tea under a blanket, care worker tidying behind | Senior home care card, service fallback |
| `svc-companion-care` | An older man laughing over tea beside a companion on a garden bench | Companion care card |
| `svc-registered-nursing` | A nurse taking an older man's blood pressure at his table | Registered nursing card |
| `svc-dementia-support` | A care worker and an older woman looking through old photographs | Dementia support card |
| `svc-respite-care` | A family member handing over to a care worker at the front door | Respite care card |
| `svc-post-hospital-care` | A care worker supporting an older man as he rises from his armchair | Post-hospital care card |
| `svc-palliative-care` | A care worker at an older woman's bedside, holding her hand | Palliative care card |

Service, pillar, collage and resource images sit behind headings that already name the
subject, so they carry `alt=""` and are hidden from screen readers. The hero, the
"Here For You Always" panel and the `/about` lead image are the ones that announce themselves,
and their alt text is the description above.

### Outstanding

- **Commission or licence real photography.** The owner holds the Care Giver Envato licence,
  so the demo photographs may be used in the owner's own deployment even though they cannot be
  redistributed through this repository — replacing the files in `public/images/photography`
  is all that is required, since every path is resolved through `site-images.ts`.
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
