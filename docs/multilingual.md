# Multilingual Architecture — Jarkabi Home Care

**Launch languages:** English, French (full content)  
**Community languages:** Tigrinya, Arabic (RTL), Amharic, Mandarin, Spanish, Hindi  
**Long-term goal:** Database-driven translations §46

---

## Current implementation

### Routing (`src/i18n/routing.ts`)

| Code | Language | Display name | RTL |
|------|----------|--------------|-----|
| `en` | English | English | — |
| `fr` | French | Français | — |
| `ti` | Tigrinya | ትግርኛ | — |
| `ar` | Arabic | العربية | ✅ |
| `am` | Amharic | አማርኛ | — |
| `zh` | Mandarin | 中文 | — |
| `es` | Spanish | Español | — |
| `hi` | Hindi | हिन्दी | — |

- `localePrefix: "always"` → all URLs prefixed (`/en/about`)
- Default locale: `en`

### Content layers

| Layer | Storage | Status |
|-------|---------|--------|
| UI chrome (nav, buttons, labels) | `messages/{locale}.json` | EN/FR complete; others partial |
| CMS content (services, blog, legal) | Payload localized fields | Working for all 8 codes |
| SEO metadata | Per-page `generateMetadata` | hreflang for all 8 locales |

### RTL (Arabic) §47

- `dir="rtl"` applied in `src/app/(site)/[locale]/layout.tsx`
- `.rtl-layout` overrides in `globals.css`
- **Gaps:** form layouts, chevron icons, partial Arabic translations

---

## Partial locale sync

Community locales merge English base + existing translations + patches:

```bash
npm run sync:locales
```

Patch files live in `messages/patches/{locale}.patch.json`. Keys not yet translated fall back to English at runtime (`src/i18n/request.ts`).

---

## Target architecture (Phase 12)

```
languages (DB)
    ↓
translations (key, locale, value, namespace)
    ↓
next-intl loader reads from DB with JSON fallback
```

---

## Translation workflow

1. **Content editor** updates EN in Payload or translation admin
2. **Translator role** fills localized fields / translation keys
3. **Review** — mark `[REVIEW REQUIRED]` until human approval
4. **Publish** — no machine translation presented as final for clinical/legal content

---

## hreflang & SEO

All 8 locales emit alternates on public pages via `buildLanguageAlternates` in `src/lib/seo.ts`.

---

## Ge'ez script considerations

Languages `ti` and `am` use Ge'ez script:

- Ensure font stack includes Ge'ez-capable fallbacks
- Test line-height and font size (may need +1px vs Latin)
- URL slugs remain Latin characters

---

## Language selector §48

Display native names in selector:

```
English | Français | ትግርኛ | العربية | አማርኛ | 中文 | Español | हिन्दी
```

Persist via next-intl cookie / URL prefix.

---

*See also: [`google-search-console.md`](./google-search-console.md), [`migration-strategy.md`](./migration-strategy.md) Phase 12*
