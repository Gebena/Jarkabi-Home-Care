# Care Giver licensed assets — usage registry

**Licence:** Envato Elements `KVZ473J956` (ThemeForest item `23847564`)  
**Local source (gitignored):** `/templates/caregiver/`  
**Production copy:** `public/images/caregiver-licensed/`  
**Registry code:** `src/lib/site-images.ts`, `src/lib/caregiver-assets.ts`

Do not delete or replace an asset listed here without updating this file and running `npm run verify:images`.

---

## Homepage — Home Page 01

| Original file | Care Giver section | Jarkabi component | Public path | Notes |
|---|---|---|---|---|
| `main-slider/1.jpg` | Hero slide 1 | `HeroSection` → `GlidingHeroBackground` | `/images/caregiver-licensed/main-slider/1.jpg` | Depth + glide layer |
| `main-slider/2.jpg` | Hero slide 2 | `HeroSection` → `GlidingHeroBackground` | `/images/caregiver-licensed/main-slider/2.jpg` | Depth + glide layer |
| `main-slider/3.jpg` | Hero slide 3 | `HeroSection` → `GlidingHeroBackground` | `/images/caregiver-licensed/main-slider/3.jpg` | Depth + glide layer |
| — | Intro band (no photo) | `AboutPreview` | — | Mist background, typography only |
| `resource/service-1.jpg` | Enrich pillar | `PillarsSection` | `/images/caregiver-licensed/resource/service-1.jpg` | Teal overlay |
| `resource/service-2.jpg` | Empower pillar | `PillarsSection` | `/images/caregiver-licensed/resource/service-2.jpg` | Brick overlay |
| `resource/service-3.jpg` | Engage pillar | `PillarsSection` | `/images/caregiver-licensed/resource/service-3.jpg` | Ocean overlay |
| `resource/service-4–7.jpg` | Service carousel | `ServiceCard` / `ServicesGrid` | per slug in `site-images.ts` | Square cards |
| `resource/video-img.jpg` | Here For You Always | `WhyChooseUs` | `/images/caregiver-licensed/resource/video-img.jpg` | Overlapping photo + play |
| `backgrounds/pattern-1.png` | Plum panel texture | `WhyChooseUs` | `/images/caregiver-licensed/backgrounds/pattern-1.png` | Repeat overlay |
| `resource/quality-1.jpg` | CTA banner | `CallToAction` | `/images/caregiver-licensed/resource/quality-1.jpg` | Full-bleed + gradient |
| `backgrounds/1.png` | CTA texture | `CallToAction` | `/images/caregiver-licensed/backgrounds/1.png` | Decorative wash |
| `resource/author-1–2.jpg` | Testimonials | `TestimonialSection`, CMS fallback | `/images/caregiver-licensed/resource/author-*.jpg` | Portrait avatars |
| `resource/team-1–4.jpg` | Team grid | `TeamMemberCard`, `TeamSection` | `/images/caregiver-licensed/resource/team-*.jpg` | CMS photo fallback |
| `resource/post-1–2.jpg` | Location finder | `LocationFinder` | `/images/caregiver-licensed/resource/post-*.jpg` | Tilted prints |
| `backgrounds/2.png` | Location band texture | `LocationFinder` | `/images/caregiver-licensed/backgrounds/2.png` | Ocean band |
| `resource/news-1–3.jpg` | News cards | `BlogPreview` | `/images/caregiver-licensed/resource/news-*.jpg` | Blog fallbacks |

---

## Inner pages

| Original file | Care Giver page | Jarkabi route | Public path |
|---|---|---|---|
| `resource/started.jpg` | Inner banners | `PageHero` (multiple routes) | `/images/caregiver-licensed/resource/started.jpg` | Primary parallax photograph |
| `backgrounds/3.jpg` | Banner texture | `PageHero` overlay | `/images/caregiver-licensed/backgrounds/3.jpg` | Low-opacity wash |
| `resource/mission.jpg` | About mission portrait | `/about` | `/images/caregiver-licensed/resource/mission.jpg` | |
| `resource/contact-1.jpg` | Contact office panel | `/contact` | `/images/caregiver-licensed/resource/contact-1.jpg` | Plum panel layout |
| `backgrounds/3.jpg` | Banner texture | `PageHero` | `/images/caregiver-licensed/backgrounds/3.jpg` |
| `resource/care-1–3.jpg` | About collage | `/about` | `/images/caregiver-licensed/resource/care-*.jpg` |
| `resource/meeting.jpg` | How care works | `/how-care-works` | `/images/caregiver-licensed/resource/meeting.jpg` |
| `resource/contact-2.jpg` | Service sidebar widget | `ServiceSidebar` | `/images/caregiver-licensed/resource/contact-2.jpg` |
| `gallery/1–19.jpg` | Gallery | `/gallery` | `/images/caregiver-licensed/gallery/*.jpg` |
| `resource/service-8–21.jpg` | Service detail heroes/inline | `/services/[slug]` | per slug in `caregiverServiceDetailImages` |
| `resource/news-4–7.jpg` | Blog listing extras | `/resources` | `/images/caregiver-licensed/resource/news-*.jpg` |
| `resource/post-thumb-1–4.jpg` | Blog sidebar | `/resources/[slug]` | `/images/caregiver-licensed/resource/post-thumb-*.jpg` |
| `resource/team-1.jpg` | Careers intro | `/careers` | `/images/caregiver-licensed/resource/team-1.jpg` |
| `resource/team-2.jpg` | Team intro | `/team` | `/images/caregiver-licensed/resource/team-2.jpg` |
| `resource/meeting.jpg` | Referrals intro | `/referrals` | `/images/caregiver-licensed/resource/meeting.jpg` |
| `resource/post-1.jpg` | City location band | `/locations/[province]/[city]` | `/images/caregiver-licensed/resource/post-1.jpg` |
| `backgrounds/pattern-1.png` | Contact + stats bands | homepage `ContactSection`, `StatisticsSection` | `/images/caregiver-licensed/backgrounds/pattern-1.png` |

---

## Icons (Flaticon pack)

| Source | Jarkabi path | Used in |
|---|---|---|
| `/templates/caregiver-icons-flat/` | `/icons/caregiver/*.svg` | `CareTasksSection` — "What is Home Care" grid |

---

## Not shipped (legacy / unused)

| Path | Status |
|---|---|
| ~~`public/images/photography/`~~ | Removed — all production photography uses `caregiver-licensed/` |
| `resource/care-4.jpg`, `contact-1.jpg`, `mission.jpg`, `quality-2.jpg` | Copied but not yet assigned — available for About / Mission bands |

---

## Maintenance checklist

Before replacing any file:

1. Search this document and `src/lib/site-images.ts` for the filename.
2. Run `npm run verify:images`.
3. Update this registry with the new crop or path.
4. Re-run visual QA (`docs/jarkabi-caregiver-visual-qa.md`).
