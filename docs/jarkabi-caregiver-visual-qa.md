# Jarkabi × Care Giver Home Page 01 — Visual QA checklist

Compare **https://jarkabi.ca/en** side-by-side with the licensed Care Giver Home Page 01 demo (`index.html`).

**Breakpoints to verify:** 375 · 390 · 430 · 768 · 1024 · 1280 · 1440 · 1920

Legend: `[x]` done · `[ ]` needs work · `[~]` partial

---

## Global chrome

| Check | Desktop | Tablet | Mobile | Notes |
|---|---|---|---|---|
| [x] Correct logo / JARKABI wordmark | | | | Serif display + HOME CARE descriptor |
| [x] Sticky white header | | | | Shadow on scroll |
| [x] Dropdown nav (About, Types Of Care, Knowledge Center) | | | | Portal menus — hero cannot block clicks |
| [x] Tan **Request Care** CTA | | | | Header + mobile sheet |
| [x] Plum footer four columns | | | | No demo addresses/phones |
| [x] Jarkabi branding completed | | | | No Care Giver / ThemeArc / demo names |

---

## Section 1 — Hero (dual-layer gliding photos)

| Check | Desktop | Tablet | Mobile | Notes |
|---|---|---|---|---|
| [x] Correct images (`main-slider/1–3.jpg`) | | | | Licensed assets |
| [x] Two-layer depth (full bleed + right glide panel) | | | | `GlidingHeroBackground` |
| [x] Smooth horizontal glide on slide change | | | | 1.4s ease-out |
| [x] Plum left gradient wash | | | | Text readable |
| [x] Serif headline hierarchy | | | | Script line + H1 + body |
| [x] Tan primary CTA + outline secondary | | | | Request Care / Explore Services |
| [x] Square prev/next arrows (md+) | | | | |
| [x] Slide dots | | | | |
| [x] Reduced-motion fallback | | | | Static single layer |
| [x] Jarkabi copy (not demo lorem) | | | | Ottawa service area |

---

## Section 2 — Intro band

| Check | Desktop | Tablet | Mobile | Notes |
|---|---|---|---|---|
| [x] Mist background | | | | `AboutPreview` |
| [x] Centred serif headline + italic sub | | | | |
| [x] Trust checkmarks | | | | |
| [x] Outline **Read More** → `/about` | | | | |

---

## Section 3 — Enrich / Empower / Engage

| Check | Desktop | Tablet | Mobile | Notes |
|---|---|---|---|---|
| [x] Correct photos (`service-1–3.jpg`) | | | | |
| [x] Teal / brick / ocean overlays | | | | Demo-exact rgba tokens |
| [x] Hover lift + CTA pill reveal | | | | |
| [x] Full-bleed three-column grid (lg) | | | | Stacks 1 → 2 → 3 |
| [x] Section height ~17rem min | | | | |

---

## Section 4 — Services grid

| Check | Desktop | Tablet | Mobile | Notes |
|---|---|---|---|---|
| [x] Left-aligned heading + tan rule | | | | |
| [x] Square service cards | | | | `service-4–7` + extended set |
| [x] Tan sweep hover | | | | |
| [x] Outline arrow links | | | | |

---

## Section 5 — Here For You Always

| Check | Desktop | Tablet | Mobile | Notes |
|---|---|---|---|---|
| [x] Plum panel + pattern texture | | | | |
| [x] Checklist + italic tan callout | | | | |
| [x] Overlapping `video-img.jpg` | | | | Negative margin overlap |
| [x] Play button (decorative) | | | | Lightbox optional |

---

## Section 6 — What is Home Care

| Check | Desktop | Tablet | Mobile | Notes |
|---|---|---|---|---|
| [x] Licensed Flaticon line icons | | | | |
| [x] Tan left rule fill-on-hover | | | | `care-tasks-section` |

---

## Sections 7–15

| Section | Image | Background | Spacing | Typography | Colour | Animation | Branding |
|---|---|---|---|---|---|---|---|
| Care process [x] | — | mist | [x] | [x] | [x] | — | [x] |
| Statistics [x] | — | plum-deep | [x] | [x] | [x] | — | [x] |
| CTA banner [x] | quality-1 | gradient + texture | [x] | [x] | [x] | — | [x] |
| Testimonials [x] | author-* | blush | [x] | [x] | [x] | carousel + autoplay | [x] — demo fallbacks until CMS |
| Team [x] | team-* | white | [x] | [x] | [x] | hover overlay | [x] |
| Location finder [x] | post-* | ocean + texture | [x] | [x] | [x] | — | [x] |
| Blog preview [x] | news-* | white | [x] | [x] | [x] | — | [x] |
| Trust bar [x] | — | mist | [x] | [x] | [x] | — | [x] |
| Contact band [x] | — | white | [x] | [x] | [x] | — | [x] |

---

## Inner pages (spot check)

| Page | Banner photo | Sidebar / cards | Branding |
|---|---|---|---|
| `/about` [x] | started.jpg | mission.jpg + collage | [x] |
| `/services` [x] | started.jpg | left-aligned category bands + specialty links | [x] |
| `/why-jarkabi` [x] | started.jpg | plum intro + alternating photo bands + grid | [x] |
| `/faq` [x] | started.jpg | sidebar quick links + contact widget | [x] |
| `/resources` [x] | started.jpg | search sidebar + lined categories + widget | [x] |
| `/services/[slug]` [x] | per-service | lined sidebar + widget | [x] |
| `/team` [x] | started.jpg | team cards + social hover | [x] |
| `/gallery` [x] | gallery 1–19 | grid | [x] |
| `/contact` [x] | started.jpg | form + plum office panel | [x] |
| `/nursing` [x] | started.jpg | alternating photo sections | [x] |
| `/dementia-care` [x] | started.jpg | alternating photo sections | [x] |
| `/caregivers` [x] | started.jpg | alternating photo sections | [x] |
| `/careers` [x] | started.jpg | plum intro + team photo + sidebar widget | [x] |
| `/testimonials` [x] | started.jpg | featured carousel + full grid | [x] |
| `/legal/*` [x] | started.jpg | policy sidebar nav + contact widget | [x] |
| `/referrals` [x] | started.jpg | plum intro + partner sidebar + form | [x] |
| `/how-care-works` [x] | started.jpg | process steps + alternating photo bands | [x] |
| `/gallery` [x] | started.jpg | grid + lightbox prev/next counter | [x] |
| `/locations` [x] | started.jpg | ocean intro band + tilted prints + map | [x] |
| `/growing-across-canada` [x] | started.jpg | plum intro + feature cards | [x] |
| `/team` [x] | started.jpg | plum intro + team grid hover cards | [x] |
| `/services/[slug]` [x] | per-service | hero gradient + teal contact panel + sidebar | [x] |
| `/careers/[slug]` [x] | started.jpg | role sidebar + application form | [x] |
| `/locations/[province]` [x] | started.jpg | city list + sidebar widget | [x] |
| `/locations/[province]/[city]` [x] | started.jpg | ocean city band + service cards + sidebar | [x] |
| `/[province]/[city]/[service]` [x] | per-service | full service detail layout + sidebar | [x] |
| Homepage trust/contact/stats [x] | — | mist trust bar, patterned plum contact, stats borders | [x] |

---

## Performance & accessibility

| Check | Status |
|---|---|
| [x] WebP/optimized JPEG served via Next Image | |
| [x] Lazy load below fold | |
| [x] `prefers-reduced-motion` respected on hero | |
| [x] Focus states on nav, buttons, forms | |
| [x] Meaningful alt on hero lead slide | |
| [x] Decorative photos use `alt=""` | |

---

## Review log

| Date | Reviewer | Result |
|---|---|---|
| 2026-09-25 | Cloud Agent | Hero dual-layer glide implemented; AboutPreview restored; asset registry + QA doc created |
| 2026-09-25 | Cloud Agent | Inner banners use started.jpg; testimonial carousel; specialty + contact photo layouts |
| 2026-09-25 | Cloud Agent | Pass 3: Why Jarkabi photo bands; services category bands; FAQ/resources sidebar widget; hero/pillar pixel tuning |
| 2026-09-25 | Cloud Agent | Pass 4: BlogPostCard polish; careers intro; testimonials carousel; legal sidebar nav |
| 2026-09-25 | Cloud Agent | Pass 5: Referrals intro; how-care-works photo bands; gallery lightbox; locations/growing intros |
| 2026-09-25 | Cloud Agent | Pass 6: Team intro; service detail contact panel; career/province sidebars |
| 2026-09-25 | Cloud Agent | Pass 7: City pages; local SEO service layout; homepage trust/contact/stats polish |
| 2026-09-25 | Cloud Agent | **Production verified** — PR #229 merged; jarkabi.ca/en live; sync to Jarkabi-Home-Care @ e0dd300 |
