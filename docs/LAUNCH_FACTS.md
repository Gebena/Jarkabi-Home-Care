# Launch facts — Jarkabi Home Care

Facts Jarkabi must supply before public launch. The site hides bracketed CMS placeholders until real values are set.

## NAP (Name, Address, Phone)

Set these in **Vercel → jarkabi-home-care → Environment Variables** (Production). They override CMS Brand Settings at runtime via `src/lib/launch-brand.ts`.

| Variable | Example | Used in |
|----------|---------|---------|
| `JARKABI_PRIMARY_PHONE` | `(613) 555-0100` | Header, footer, contact, JSON-LD, mobile bar |
| `JARKABI_TOLL_FREE_PHONE` | `1-888-555-0100` | Footer, contact (optional) |
| `JARKABI_OTTAWA_OFFICE_ADDRESS` | `123 Example St, Ottawa, ON K1A 0A1` | Footer, contact, JSON-LD |
| `JARKABI_BUSINESS_HOURS` | `Mon–Fri: 8:00 AM – 6:00 PM` | Footer, contact (optional; default in CMS) |

After setting values, redeploy production and verify:

```bash
npm run verify:production
```

Phone and address appear in the UI only when values are real (not bracketed placeholders).

## Supabase production database

| Check | Status |
|-------|--------|
| `DATABASE_URI` on Vercel production | Must be a `postgresql://` pooler URI (Canada Central) |
| Health endpoint | `https://jarkabi.ca/api/health` → `"database": "postgresql"`, `"databaseConnected": true` |

### Provision (one-time)

1. Create a token at [Supabase account tokens](https://supabase.com/dashboard/account/tokens).
2. Run:

```bash
SUPABASE_ACCESS_TOKEN=sbp_... npm run supabase:launch
```

Or set `DATABASE_URI` manually in Vercel from **Supabase → Project Settings → Database → Transaction pooler (port 6543)**.

3. Redeploy production.
4. Open `https://jarkabi.ca/admin` and run seed if the database is empty.

## Consented photography

- Current images in `public/images/photography/` are **AI placeholders** (see `docs/licensed-assets.md`).
- A public disclosure banner shows while `NEXT_PUBLIC_PHOTOS_STAGING` is not `false`.
- Replace files in place (paths in `src/lib/site-images.ts`), run `npm run verify:images`, then set `NEXT_PUBLIC_PHOTOS_STAGING=false` and redeploy.

See `docs/PHOTO_REPLACEMENT.md` for the full workflow.

## Legal copy

- FAQ, funding and feedback pages no longer contain `[REVIEW REQUIRED]` markers in EN/FR message files.
- CMS legal pages may still show a draft notice until counsel approves and `reviewRequired` is cleared in Payload.
- This is conservative operational copy — **not** a substitute for qualified legal review before go-live.
