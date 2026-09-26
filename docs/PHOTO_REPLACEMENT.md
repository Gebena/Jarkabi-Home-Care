# Photo replacement workflow

Jarkabi Home Care ships with **22 AI-generated WebP placeholders** in `public/images/photography/`. They match Care Giver's warm senior-care direction but **must not** be presented as real clients or staff.

## Before launch

1. **Obtain consented photography** — written consent from every identifiable person; model releases where required.
2. **Export WebP** — quality ~82, same filenames as the current set (see `docs/licensed-assets.md` table).
3. **Drop files** into `public/images/photography/` (overwrite in place).
4. **Verify**:

```bash
npm run verify:images
```

5. **Update alt text** in `src/lib/site-images.ts` from the actual frames.
6. **Hide the staging banner** — set on Vercel:

```
NEXT_PUBLIC_PHOTOS_STAGING=false
```

7. Redeploy and confirm the banner is gone on `/en` and `/fr`.

## Team portraits

Team cards use monograms until Payload `team-members` has per-person photos. Do not reuse placeholder faces with real names.

## Testimonials

Homepage testimonials render only from CMS. No fabricated quotes ship — empty state is intentional until real, consented reviews exist.
