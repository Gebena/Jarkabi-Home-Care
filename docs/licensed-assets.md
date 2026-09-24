# Licensed Assets Register

Track every asset copied from purchased Envato templates or other licensed sources.

**Rule:** Copy only what is needed. Never commit full template packages to GitHub §81.

---

## License certificates (stored locally — not in Git)

| Template | License type | License code | Licensee | Date | Certificate path |
|----------|--------------|--------------|----------|------|------------------|
| **Seniar** — Senior Care React Template | Envato Elements | `AVKJY8MX67` | Art Karapetov | 2026-09-24 | `/templates/licenses/seniar-envato-elements.pdf` |
| **Care Giver** — Senior Care & Medical HTML | Envato Elements | `KVZ473J956` | Art Karapetov | 2026-09-24 | `/templates/licenses/caregiver-envato-elements.pdf` |

### Seniar license details

| Field | Value |
|-------|-------|
| Item title | Seniar - Senior Care React Template |
| Author | KodeSolution |
| Item ID | `e8a8de99-9f1d-4ea8-bce9-96d2279745da` |
| End product | Jarkabi Home Care (jarkabi.ca) |
| Terms | [Envato Elements License](https://elements.envato.com/license-terms) — valid for life of End Product after completion while subscription active |

### Care Giver license details

| Field | Value |
|-------|-------|
| Item title | Care Giver - Senior Care & Medical HTML Template |
| Author | ThemeArc |
| Item ID | `0a2536bc-e569-4d11-94b0-28fdd33f3598` |
| End product | Jarkabi Home Care (jarkabi.ca) |
| Terms | [Envato Elements License](https://elements.envato.com/license-terms) — valid for life of End Product after completion while subscription active |

> **Note:** Envato Elements licenses are per End Product. Jarkabi Home Care is the registered end product for both templates.

---

## Template packages (local only — not in repo)

| Template | Expected path | Package on VM? | Status |
|----------|---------------|----------------|--------|
| Seniar | `/templates/seniar/` | ❌ | License ✅ `AVKJY8MX67` — unpack `seniar-vite-client-files` locally |
| Care Giver | `/templates/caregiver/` | ❌ | License ✅ `KVZ473J956` — unpack `care-giver-package 5/care-giver` locally |

---

## Assets currently in production

| Source | Asset / URL | Used in | Action |
|--------|-------------|---------|--------|
| Unsplash (free) | Various URLs in `src/lib/service-images.ts` | Service cards, heroes | **Replace** with licensed photography |
| Lucide Icons | npm package `lucide-react` | UI icons | ✅ MIT license — keep |
| Google Fonts | Bricolage Grotesque, Allison | `app/layout.tsx` | **Replace** per design-system.md |
| — | — | — | — |

---

## Assets to extract (when templates available)

### From Seniar

| Asset type | Copy to | Document here before commit |
|------------|---------|---------------------------|
| Hero images | `public/media/` | Filename + page usage |
| Service icons | Only if not replaceable by Lucide | |
| Demo logos | **Do not copy** — Jarkabi logo is custom | |

### From Care Giver

| Asset type | Copy to | Notes |
|------------|---------|-------|
| Senior care photography | `public/media/` | Prefer images that match Jarkabi brand direction |
| Background patterns | Evaluate — likely **skip** | May feel template-like |
| Icon font | **Skip** — use Lucide | |

---

## New asset entry template

```markdown
| [Date] | [Seniar / Care Giver / Custom / Stock] | `original-filename.jpg` | `public/media/hero/home-hero.jpg` | Homepage hero | License ref |
```

---

## Fonts (planned)

| Font | License | Usage |
|------|---------|-------|
| Fraunces | SIL OFL (Google Fonts) | Display headings |
| Source Sans 3 | SIL OFL (Google Fonts) | Body, UI |

---

*Update this file whenever copying from `/templates/` into `jarkabi-home-care/public/`.*
