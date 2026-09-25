# Locale translation patches

Partial locales (`ti`, `tig`, `byn`, `ar`, `am`) start with community-language strings for the homepage and forms. Keys added in later fidelity passes are merged from `en.json` via:

```bash
npm run sync:locales
```

## How it works

1. `en.json` is the complete base.
2. Existing keys in `messages/{locale}.json` are preserved.
3. Optional `messages/patches/{locale}.patch.json` overrides or adds translations before English fallback fills gaps.

Runtime also merges via `src/i18n/request.ts` (`withEnglishFallback`), so untranslated keys never render as raw paths.

## Human review

Strings marked `[HUMAN TRANSLATION REQUIRED]` in `meta.translationNote` need review by native speakers before launch.
