# Multilingual Architecture — Jarkabi Home Care

**Launch languages:** English, French (full content)  
**Community languages:** Tigrinya, Blin, Tigre, Arabic (RTL), Amharic  
**Long-term goal:** Database-driven translations §46

---

## Current implementation

### Routing (`src/i18n/routing.ts`)

| Code | Language | Display name | RTL |
|------|----------|--------------|-----|
| `en` | English | English | — |
| `fr` | French | Français | — |
| `ti` | Tigrinya | ትግርኛ | — |
| `byn` | Blin | ብሊን | — |
| `tig` | Tigre | ትግረ | — |
| `ar` | Arabic | العربية | ✅ |
| `am` | Amharic | አማርኛ | — |

- `localePrefix: "always"` → all URLs prefixed (`/en/about`)
- Default locale: `en`

### Content layers

| Layer | Storage | Status |
|-------|---------|--------|
| UI chrome (nav, buttons, labels) | `messages/{locale}.json` | EN/FR complete; others partial |
| CMS content (services, blog, legal) | Payload localized fields | Working for all 7 codes |
| SEO metadata | Per-page `generateMetadata` | hreflang incomplete |

### RTL (Arabic) §47

- `dir="rtl"` applied in `src/app/[locale]/layout.tsx`
- `.rtl-layout` overrides in `globals.css`
- **Gaps:** form layouts, chevron icons, partial Arabic translations

---

## Target architecture (Phase 12)

```
languages (DB)
    ↓
translations (key, locale, value, namespace)
    ↓
next-intl loader reads from DB with JSON fallback
```

### Namespaces

| Namespace | Examples |
|-----------|----------|
| `nav` | Home, Services, Request Care |
| `home` | Hero, trust bar, section headings |
| `forms` | Labels, validation messages |
| `footer` | Column titles, legal links |
| `seo` | Default meta descriptions |

---

## Translation workflow

1. **Content editor** updates EN in Payload or translation admin
2. **Translator role** fills localized fields / translation keys
3. **Review** — mark `[REVIEW REQUIRED]` until human approval
4. **Publish** — no machine translation presented as final for clinical/legal content

---

## hreflang & SEO

Target for all 7 locales on every public page:

```html
<link rel="alternate" hreflang="en" href="https://jarkabi.ca/en/..." />
<link rel="alternate" hreflang="fr" href="https://jarkabi.ca/fr/..." />
<!-- ti, byn, tig, ar, am -->
<link rel="alternate" hreflang="x-default" href="https://jarkabi.ca/en/..." />
```

**Current:** Only `en` and `fr` in metadata alternates.

---

## Ge'ez script considerations

Languages `ti`, `byn`, `tig`, `am` use Ge'ez script:

- Ensure font stack includes Ge'ez-capable fallbacks
- Test line-height and font size (may need +1px vs Latin)
- URL slugs remain Latin characters

---

## Language selector §48

Display native names in selector:

```
English | Français | ትግርኛ | ብሊን | ትግረ | العربية | አማርኛ
```

Persist via next-intl cookie / URL prefix.

---

## Migration plan

| Step | Action |
|------|--------|
| 1 | Complete `messages/*.json` for all keys (or hide incomplete locales) |
| 2 | Add `languages` + `translations` Payload collections |
| 3 | Build admin translation UI |
| 4 | Migrate JSON → DB namespace by namespace |
| 5 | Extend hreflang to 7 locales |
| 6 | Fix `<html lang>` in root layout |

---

*See also: [`migration-strategy.md`](./migration-strategy.md) Phase 12*
