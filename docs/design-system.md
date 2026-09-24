# Jarkabi Home Care — Design System

**Version:** 0.1 (Phase 2 draft)  
**Brand:** Jarkabi Home Care  
**Status:** Pending stakeholder approval before Phase 4 implementation

---

## 1. Design principles

1. **Premium, not template** — technology disappears behind the brand §80
2. **Modern classic** — timeless layouts, not trend-chasing §13
3. **Warm authority** — professional enough for clinicians; human enough for families §9–11
4. **Senior-first readability** — 18px+ body on mobile, generous line-height, clear contrast §16
5. **Canadian context** — dignified, diverse, culturally respectful §10
6. **Honest trust** — no fake stats, awards, or testimonials §14

### Emotional target (5 seconds)

> "This looks professional. This feels safe. They seem compassionate. I know what to do next."

---

## 2. Brand identity

### Name hierarchy

```
JARKABI          ← dominant wordmark
HOME CARE        ← descriptor (lighter weight, tracked caps)
```

Future service lines (Jarkabi Nursing, Jarkabi Dementia Care, etc.) remain **inactive** until explicitly launched §7.

### Logo direction §17

| Element | Guidance |
|---------|----------|
| Monogram | **JK** — may subtly suggest care, protection, or support |
| Avoid | Generic medical cross alone; house+heart clip art §14 |
| Formats required | Full colour, one colour, black, white, favicon, social avatar, embroidery, vehicle, letterhead |

**Phase 5 interim:** Text logotype using display serif until final artwork delivered.

### Brand story (subtle use)

Jarkabi derives from *Jar* (God) + *Kabi* (Help) → "God Help" — expressed as service, compassion, and dignity. **Do not** make the public site overtly religious unless requested §8.

---

## 3. Colour system

WCAG 2.2 AA minimum for all text/background pairs §15.

### Core palette

| Token | Name | Hex | Usage |
|-------|------|-----|-------|
| `--color-primary` | Deep Navy | `#1A2B4A` | Headings, nav, footer, authority text |
| `--color-primary-dark` | Navy Dark | `#121E33` | Hover states, footer depth |
| `--color-primary-light` | Navy Soft | `#2A3F66` | Secondary headings |
| `--color-secondary` | Muted Teal | `#5E8A7D` | Care highlights, icons, secondary CTAs |
| `--color-secondary-dark` | Teal Dark | `#4A7064` | Hover on secondary buttons |
| `--color-secondary-light` | Eucalyptus | `#7D9B8A` | Backgrounds, subtle accents |
| `--color-accent` | Champagne Gold | `#C9A96E` | Sparingly: dividers, premium highlights, logo detail |
| `--color-accent-muted` | Soft Gold | `#E8D5B5` | Very subtle backgrounds |
| `--color-bg` | Warm Ivory | `#F8F5F0` | Primary page background |
| `--color-bg-alt` | Soft Stone | `#EDE9E3` | Alternating sections |
| `--color-surface` | White | `#FFFFFF` | Cards, form fields |
| `--color-text` | Charcoal | `#1C1C1C` | Body text |
| `--color-text-muted` | Slate Grey | `#5C6670` | Supporting copy, captions |
| `--color-border` | Warm Line | `#E2DDD4` | Dividers, card borders |
| `--color-success` | Natural Green | `#4A7C59` | Success states |
| `--color-error` | Accessible Red | `#B42318` | Errors, validation |
| `--color-warning` | Warm Amber | `#B8860B` | Warnings |

### Semantic mappings

```css
/* Public website */
--btn-primary-bg: var(--color-primary);
--btn-primary-text: #FFFFFF;
--btn-secondary-bg: transparent;
--btn-secondary-border: var(--color-secondary);
--btn-secondary-text: var(--color-primary);
--btn-accent-bg: var(--color-secondary);
--btn-accent-text: #FFFFFF;

/* Links */
--link-color: var(--color-secondary-dark);
--link-hover: var(--color-primary);
```

### What we are replacing

| Old (Seniar clone) | New (Jarkabi) |
|--------------------|---------------|
| `#59375f` purple | `#1A2B4A` navy |
| `#e5a89a` coral | `#5E8A7D` teal |
| Coral accents everywhere | Champagne gold **sparingly** |

### Admin dashboard palette §22

Admin uses the same tokens but **higher contrast, less photography, more neutral surfaces**:

| Token | Admin usage |
|-------|-------------|
| `--color-bg` | `#F4F6F8` cool grey |
| `--color-surface` | `#FFFFFF` |
| `--color-primary` | Navy sidebar |
| shadcn defaults | Mapped to tokens below |

---

## 4. Typography

### Font families §16

| Role | Font (recommended) | Fallback | Notes |
|------|-------------------|----------|-------|
| **Display / editorial** | Fraunces | Georgia, serif | Hero headlines, major quotes |
| **Body / UI** | Source Sans 3 | system-ui, sans-serif | Nav, body, forms, buttons |
| **Optional accent** | None initially | — | Retire Allison script from Seniar |

**Load strategy:** `next/font/google` with `display: swap`, subset latin + latin-ext; add Ge'ez subset when am/ti content finalized.

### Type scale

| Token | Size (desktop) | Size (mobile) | Weight | Line height | Use |
|-------|----------------|---------------|--------|-------------|-----|
| `display` | 3.5rem (56px) | 2.25rem (36px) | 500 | 1.1 | Hero headline |
| `h1` | 2.75rem (44px) | 2rem (32px) | 600 | 1.15 | Page titles |
| `h2` | 2rem (32px) | 1.625rem (26px) | 600 | 1.2 | Section headings |
| `h3` | 1.5rem (24px) | 1.25rem (20px) | 600 | 1.3 | Card titles |
| `h4` | 1.25rem (20px) | 1.125rem (18px) | 600 | 1.35 | Subsections |
| `body-lg` | 1.125rem (18px) | 1.125rem (18px) | 400 | 1.7 | Intro paragraphs |
| `body` | 1rem (16px) | 1.0625rem (17px) | 400 | 1.7 | Default body — **17px mobile for seniors** |
| `body-sm` | 0.875rem (14px) | 0.875rem (14px) | 400 | 1.6 | Meta, captions |
| `caption` | 0.75rem (12px) | 0.75rem (12px) | 500 | 1.5 | Labels, overlines |
| `label` | 0.875rem (14px) | 0.875rem (14px) | 600 | 1.4 | Form labels |
| `nav` | 0.9375rem (15px) | 1rem (16px) | 500 | 1.4 | Navigation links |
| `button` | 0.9375rem (15px) | 1rem (16px) | 600 | 1 | Buttons — tracked slightly |
| `quote` | 1.375rem (22px) | 1.25rem (20px) | 400 italic | 1.6 | Testimonials — serif |
| `stat` | 2.5rem (40px) | 2rem (32px) | 600 | 1 | Statistics — **only if verified** |

### Typography rules

- Max line length: **65ch** for body copy
- Paragraph spacing: `1.5em` between blocks
- Headings: navy (`--color-primary`), never coral/purple
- ALL CAPS only for: button labels, small eyebrow labels, "HOME CARE" descriptor
- Eyebrow pattern: `caption` size, `letter-spacing: 0.12em`, teal or gold — **not** script font

---

## 5. Spacing & layout

### Spacing scale (4px base)

| Token | Value |
|-------|-------|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--space-10` | 40px |
| `--space-12` | 48px |
| `--space-16` | 64px |
| `--space-20` | 80px |
| `--space-24` | 96px |
| `--space-32` | 128px |

### Section padding

| Breakpoint | Vertical padding |
|------------|------------------|
| Mobile (≤767px) | `--space-16` (64px) |
| Tablet (768–1023px) | `--space-20` (80px) |
| Desktop (≥1024px) | `--space-24` to `--space-32` |

### Containers

| Name | Max width | Use |
|------|-----------|-----|
| `container` | 1200px | Default sections |
| `container-narrow` | 800px | Long-form text, forms |
| `container-wide` | 1400px | Services grid, gallery |

### Breakpoints §65

| Name | Min width |
|------|-----------|
| `sm` | 390px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1440px |
| `2xl` | 1920px |

---

## 6. Elevation & borders

| Token | Value | Use |
|-------|-------|-----|
| `--shadow-sm` | `0 1px 3px rgba(26,43,74,0.06)` | Subtle cards |
| `--shadow-md` | `0 4px 20px rgba(26,43,74,0.08)` | Hover cards |
| `--shadow-lg` | `0 12px 40px rgba(26,43,74,0.10)` | Modals, dropdowns |
| `--radius-sm` | 6px | Buttons, inputs |
| `--radius-md` | 12px | Cards |
| `--radius-lg` | 16px | Large cards, images |
| `--radius-xl` | 24px | Hero image corners |

**Avoid:** heavy shadows, excessive rounding §14.

---

## 7. Components

### 7.1 Buttons

| Variant | Style |
|---------|-------|
| **Primary** | Navy fill, white text, `radius-sm` |
| **Secondary** | Outline teal, navy text |
| **Ghost** | Transparent, navy text, underline on hover |
| **Accent** | Teal fill — use for "Request Care" in header |

**Sizes:** `sm` (36px), `md` (44px — default, senior tap target), `lg` (52px hero CTA)

**Min tap target:** 44×44px §67

### 7.2 SectionHeading

```
[Eyebrow — optional, caption style, teal]
Display or H2 headline — navy serif
Body-lg subtitle — muted, max 65ch
```

### 7.3 ServiceCard §29

- Image top (16:10 ratio, `radius-md`)
- Category badge (teal outline)
- H3 title
- Short description (2–3 lines)
- "Learn more" link with arrow
- Hover: subtle `shadow-md` lift — respect `prefers-reduced-motion`

### 7.4 TrustBar §26

Horizontal strip (wraps on mobile):

- Icon (Lucide, teal) + short label
- No unverified statistics
- Background: `--color-bg-alt` or white

### 7.5 ProcessSteps §32

6 steps with:

- Large numeral (`01`–`06`) in champagne gold
- H4 title
- Short description
- Connecting line on desktop only (subtle, not Seniar timeline clone)

### 7.6 TestimonialCard

- Serif quote text
- Photo (real) or initials avatar
- Name, relationship, location (if approved)
- No placeholder "MR" avatars

### 7.7 Header §23

**Desktop:**
```
[Logo]  Home  About  Services  How Care Works  Why Jarkabi  Locations  Resources  Careers  Contact  |  [Lang] [Phone] [REQUEST CARE]
```

**Scroll behaviour:**
- Top of hero: transparent or soft-blend
- Scrolled: white/navy bar with `shadow-sm`

**Mobile:** shadcn Sheet menu + bottom bar (Call + Request Care) — keep existing pattern.

### 7.8 Footer

4 columns: Services, Company, Locations, Contact  
Bottom bar: legal links, copyright, "Jarkabi Home Care — Ottawa, Ontario"

---

## 8. Photography direction §75

| Use | Direction |
|-----|-----------|
| Hero | Single strong editorial image — older adult at home, dignified |
| Services | Contextual care moments — not clinical |
| Team | Real staff photos only — no stock faces with fake names |
| Diversity | Reflect Ottawa's multicultural community |

**Avoid:** cartoon elderly, helpless stereotypes, fake hospital scenes, excessive heart icons §14.

---

## 9. Motion §76–77

| Allowed | Duration | Easing |
|---------|----------|--------|
| Fade in on scroll | 400–600ms | ease-out |
| Button hover | 150ms | ease |
| Sheet/menu slide | 250ms | ease-out |
| Accordion expand | 200ms | ease |

**Forbidden:** parallax, bouncing, infinite animations, auto-playing video with sound.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Framer Motion: install only if CSS transitions insufficient.

---

## 10. shadcn/ui theming §21

When initialized, map shadcn CSS variables:

```css
:root {
  --background: 40 33% 97%;        /* Warm Ivory */
  --foreground: 210 10% 11%;       /* Charcoal */
  --primary: 215 48% 20%;          /* Navy */
  --primary-foreground: 0 0% 100%;
  --secondary: 158 18% 45%;        /* Teal */
  --secondary-foreground: 0 0% 100%;
  --accent: 38 45% 61%;            /* Champagne */
  --accent-foreground: 215 48% 20%;
  --muted: 40 20% 93%;
  --muted-foreground: 210 8% 40%;
  --border: 35 15% 86%;
  --ring: 158 18% 45%;
  --radius: 0.375rem;
}
```

**Public site:** wrap shadcn primitives in branded components (`JarkabiButton`, `JarkabiSheet`).  
**Admin:** use shadcn defaults more directly §22.

---

## 11. RTL (Arabic) §47

| Element | Rule |
|---------|------|
| `dir="rtl"` | On `<html>` when locale is `ar` |
| Navigation | Mirror order; logo stays start (right in RTL) |
| Icons with direction | Flip chevrons/arrows |
| Forms | Labels right-aligned |
| Numbers/phone | Keep LTR within `dir="ltr"` spans |

---

## 12. CMS integration

`BrandSettings.colors` defaults **must match** this document. Phase 4 will inject CMS colors as CSS variables on the public site:

```ts
// Future: src/lib/brand-theme.ts
// Maps brand-settings.colors → --color-primary, etc.
```

Until wired, static tokens in `src/styles/tokens.css` are source of truth.

---

## 13. Final design test §99

Before any major page ships, review:

| Question | Must be "yes" |
|----------|---------------|
| Does it look trustworthy? | |
| Does it feel warm, not clinical? | |
| Is the next step obvious? | |
| Does it look **original**? | |
| Does it still look like Seniar? | **Must be NO** |
| Does it still look like Care Giver? | **Must be NO** |

---

*Previous: [`template-audit.md`](./template-audit.md) · Next: Phase 3 Tailwind token implementation*
