# Care Giver Home Page 01 — fidelity delivery summary

**Status:** Passes 1–7 merged to `Gebena/Ketet` `main` via [PR #229](https://github.com/Gebena/Ketet/pull/229) (2026-09-25).  
**Production:** https://jarkabi.ca/en  
**Standalone sync:** `Gebena/Jarkabi-Home-Care` @ `sync: update from Gebena/Ketet@e0dd300`

---

## What shipped

| Pass | Scope |
|---|---|
| 1 | Dual-layer gliding hero, AboutPreview restored, asset registry + QA doc |
| 2 | Inner page banners (`started.jpg`), testimonial carousel, specialty photo layouts |
| 3 | Why Jarkabi photo bands, services category bands, FAQ/resources sidebars, hero/pillar tuning |
| 4 | BlogPostCard, careers intro, testimonials carousel page, legal sidebar nav |
| 5 | Referrals intro, how-care-works bands, gallery lightbox, locations/growing intros |
| 6 | Team intro, service detail contact panel, career/province sidebars |
| 7 | City pages, local SEO service layout, homepage trust/contact/stats polish |

---

## Key routes to spot-check after deploy

- `/en` — hero glide, pillars, services grid, testimonials carousel, location finder, blog preview
- `/en/why-jarkabi`, `/en/services`, `/en/faq`, `/en/resources`
- `/en/team`, `/en/careers`, `/en/referrals`, `/en/gallery`
- `/en/how-care-works`, `/en/locations`, `/en/locations/ontario/ottawa`
- `/en/ontario/ottawa/personal-care` — local SEO service detail
- `/en/legal/privacy` — legal sidebar

Hard-refresh (Ctrl+Shift+R) if cached assets appear stale.

---

## Verification commands

```bash
cd jarkabi-home-care
npm run build
npm run verify:images
```

---

## Remaining (not blocking visual fidelity)

- CMS copy for all services, published careers, legal counsel review
- Supabase production `DATABASE_URI` on Vercel
- Complete ti/byn/tig/ar/am translations (English fallback active)
- Remove legacy `public/images/photography/` files when convenient (22 unreferenced)
- OG images, GSC, formal WCAG audit

See `docs/PROGRESS.md` for the full launch checklist.
