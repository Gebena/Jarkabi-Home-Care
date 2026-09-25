# Translation patches

Partial locales (`ti`, `ar`, `am`, `zh`, `es`, `hi`) start with community-language strings for key pages and forms. Keys added in later passes are merged from `en.json` via:

```bash
npm run sync:locales
```

## Workflow

1. Add or update strings in `{locale}.patch.json`
2. Run `npm run sync:locales`
3. Human review before launch — patches include `[REVIEW REQUIRED]` / translation notes where applicable

## Locales

| Code | Patch file | Notes |
|------|------------|-------|
| `ti` | *(optional)* | Tigrinya — edit `ti.json` or add `ti.patch.json` |
| `ar` | `ar.patch.json` | Arabic — RTL layout |
| `am` | *(optional)* | Amharic |
| `zh` | `zh.patch.json` | Mandarin (Simplified) |
| `es` | `es.patch.json` | Spanish |
| `hi` | `hi.patch.json` | Hindi |

English (`en`) and French (`fr`) are maintained directly in `messages/en.json` and `messages/fr.json`.

**Removed locales:** Blin (`byn`) and Tigre (`tig`) were retired in favour of Mandarin, Spanish, and Hindi.
