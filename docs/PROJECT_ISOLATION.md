# Jarkabi Home Care — Project Isolation

**Jarkabi Home Care is a separate product from Ketet.org.** This document defines boundaries for code, infrastructure, and branding.

## Product boundary

| | Jarkabi Home Care | Ketet |
|---|-------------------|-------|
| **Brand** | Jarkabi Home Care | Ketet |
| **Domain** | jarkabi.ca | ketet.org |
| **App path** | `jarkabi-home-care/` | Repository root |
| **Vercel project** | `jarkabi-home-care` | Ketet (root) |
| **Database** | Dedicated Supabase (Canada Central) | Ketet Supabase — **never share** |
| **Email** | care@jarkabi.ca | Ketet addresses |
| **GitHub (target)** | `Gebena/Jarkabi-Home-Care` | `Gebena/Ketet` |

## Repository strategy

**Production application code lives only in:**

```
jarkabi-home-care/
```

**Licensed template references (gitignored, never in public GitHub):**

```
/templates/seniar/      ← read-only Seniar source
/templates/caregiver/   ← read-only Care Giver source
/templates/licenses/    ← Envato certificates
```

**Current hosting:** The app is developed inside the `Gebena/Ketet` monorepo for convenience. The **canonical standalone repository** is `Gebena/Jarkabi-Home-Care`, synced via `.github/workflows/sync-jarkabi-github.yml` when `JARKABI_SYNC_TOKEN` is configured.

## Rules for developers and agents

1. **Never modify** Ketet root app, `vercel.json` at repo root, or Ketet Supabase/env.
2. **Never import** Ketet components, styles, or shared business logic into `jarkabi-home-care/`.
3. **Never deploy** Jarkabi changes to the Ketet Vercel project.
4. All Jarkabi env vars belong on the **jarkabi-home-care** Vercel project only.
5. Commits for Jarkabi should touch only `jarkabi-home-care/`, `scripts/sync-jarkabi-github.mjs`, and Jarkabi-specific workflows under `.github/workflows/`.

## Deployment workflow (target)

```
jarkabi-home-care/  →  GitHub (Jarkabi-Home-Care)  →  Vercel (jarkabi-home-care)  →  jarkabi.ca
                              ↓
                         Supabase (dedicated)
```

## Licenses

Both Envato templates are licensed for **one End Product: Jarkabi Home Care**. See `docs/licensed-assets.md`.
