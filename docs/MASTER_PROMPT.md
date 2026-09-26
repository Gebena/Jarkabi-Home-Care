---
title: "MASTER PROMPT: Jarkabi Home Care (jarkabi.ca)"
---

This is the single source of truth for building Jarkabi Home Care. Save it in the project as `docs/MASTER_PROMPT.md` and read it in full before starting any phase.

# PART A: HOW TO WORK

## 1. Your Role

Act as a senior team made up of: a senior full-stack software architect, senior Next.js/React engineer, healthcare-platform developer, award-winning web designer, UX/UI architect, healthcare brand strategist, conversion copywriter, Canadian home-care industry specialist, Supabase/PostgreSQL architect, security and privacy engineer, accessibility specialist, SEO engineer, content migration specialist and Vercel deployment specialist.

## 2. How to Work on This Project

**Do not attempt to build everything in a single response.** Work in phases and follow this order:

1. Confirm your understanding of the project in a short summary.
2. List every assumption you are making.
3. Ask up to 10 clarifying questions that would materially change the build. Then wait for my answers.
4. Propose the technical stack, sitemap, content model (data schema), user roles and phase plan.
5. After I approve, complete one phase at a time (see "Implementation Phases"). Finish, test and document each phase before starting the next.

For this project, the very first task is the audit and migration-planning stage described in "First Task to Execute" at the end of this file.

**When requirements conflict, use this priority order:**
Honesty and legal accuracy → Safety and privacy → Accessibility → Usability → Scalability → Visual polish.

**Working in Cursor:** this project lives in its own folder and Git repository, separate from any other project. Do not reuse code, settings, environment variables or content from other projects.

Mark anything that needs legal, regulatory, clinical or translation review with **[REVIEW REQUIRED]** so it can be found and checked before launch.

## 3. Markers Used in This Project

Use these markers consistently so they can be searched before launch:

- **[REVIEW REQUIRED]:** needs legal, regulatory, clinical or translation review.
- **[JARKABI FACT REQUIRED]:** a company-specific fact (years in business, founders, statistics, addresses, etc.) that Jarkabi must supply or verify.
- **[DEMO CONTENT]:** template demo content kept only as a development placeholder (e.g., demo testimonials). Must never reach production.
- **[REPLACE BEFORE LAUNCH]:** any asset, photo or text that must be replaced with real Jarkabi material before going live.

Before production launch, a search for each marker must return zero unresolved items, or each remaining item must be approved by me.

# PART B: PROJECT AND BRAND

## 4. Project Summary

Design and build an exceptionally beautiful, premium, trustworthy, warm, sophisticated and highly professional website and secure care platform for **Jarkabi Home Care**, a Canadian home-care agency. The website lives at **jarkabi.ca**.

The company will:

- Launch first in Ottawa, Ontario
- Expand throughout Ontario
- Eventually expand into every Canadian province, and potentially the territories
- Provide both non-regulated home-support services and regulated nursing services where legally and operationally appropriate
- Serve private-pay clients, families, seniors, adults requiring support, healthcare referral partners and community organizations

It is built from my licensed **Lovegiver** Next.js template (technical foundation) and my licensed **Care Giver** template (content and design reference), with Supabase as the backend and Vercel for hosting.

Build it from DAY ONE as a scalable national Canadian home-care platform. Do NOT create an Ottawa-only architecture that will need to be rebuilt later.

All website content, branding, services, locations, languages, staff, forms, SEO, navigation and compliance information must be editable from an administration system without modifying source code.

## 5. Core Brand Vision

The website must feel MODERN but also TIMELESS AND CLASSIC. It should combine:

- The credibility of a respected healthcare organization
- The warmth of a family-focused care provider
- The sophistication of a premium hospitality brand
- The clarity of a world-class technology platform
- The human connection of a trusted local caregiver

It must NOT look like an ordinary home-care template. A visitor should immediately feel:

*"This is a serious, professional, compassionate and well-managed care organization. I would trust these people to care for someone I love."*

**Brand personality:** trust, compassion, professionalism, safety, dignity, clinical credibility, reliability, warmth, family, independence, respect, human connection, cultural sensitivity, peace of mind, premium quality, national capability and local connection.

## 6. Brand Identity: Jarkabi Home Care

### Confirmed brand details

- **Brand name shown to the public:** Jarkabi Home Care
- **Core brand word (and future trademark):** JARKABI
- **Primary website:** https://jarkabi.ca (canonical domain for all pages)
- **Secondary domain:** jarkabi.com, which must permanently redirect (301) to jarkabi.ca
- **Main contact email:** care@jarkabi.ca, used in the header/footer contact details, Contact page, confirmation emails and structured data
- **Page titles:** every page title uses the format "Page Name | Jarkabi Home Care" (e.g., "Dementia Care in Ottawa | Jarkabi Home Care"). The homepage title is "Jarkabi Home Care | Home Care & Nursing in Ottawa".
- **Future brand lines (do NOT show publicly until activated in the CMS):** Jarkabi Nursing, Jarkabi Residences

### Brand story (for the "Our Story" page)

The name Jarkabi is inspired by the Blin words "Jar Kabi," meaning "God help." It reflects a belief in compassion, service, dignity and helping people when they need support most, in the comfort of their own home. Write this story warmly and respectfully, keep it editable in the CMS, and present it in a way that welcomes families of every faith and background. [REVIEW REQUIRED: final wording to be approved by the owner]

### Logo

**[LOGO DECISION PENDING]:** two logo directions exist: the stacked serif JARKABI logo described below, and a simplified "umbrella-J" version (umbrella whose handle forms the J, sheltering a small heart or dot, in deep teal #0B5E5A with coral #E8765C). Build the logo as components that read from `/public/brand/` and the colour tokens, so switching directions only requires replacing the files and tokens. Until I confirm, use the stacked serif version.

Build the logo from the approved primary design:

- **Wordmark:** "JARKABI" in capital letters, set in an elegant serif (Cormorant Garamond, weight 600), with wide letter-spacing (about 0.16em), in deep navy.
- **Divider:** a short, thin soft-gold line centred below the wordmark.
- **Descriptor:** "HOME CARE" underneath, in a clean sans-serif (Jost, weight 500), small, with very wide letter-spacing (about 0.46em), in dark sage.
- **Symbol:** a stylized letter J whose curved hook gently holds a small gold dot, representing a person being cared for (the "Embrace" symbol). Starting SVG:

```
<svg viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Jarkabi Home Care">
  <path d="M66 14 V80 C66 112 26 118 18 88" fill="none" stroke="#1C2B45" stroke-width="13" stroke-linecap="round"/>
  <circle cx="40" cy="70" r="9" fill="#B08D57"/>
</svg>
```

**Logo versions to build as reusable components:**

- **Stacked (primary):** symbol above JARKABI, gold line, then HOME CARE. Used on the homepage, About page and print-style layouts.
- **Horizontal:** symbol on the left, a thin gold vertical divider, then JARKABI with HOME CARE underneath. Used in the sticky header and footer.
- **Reversed:** ivory wordmark and symbol with a lighter gold dot, for navy backgrounds.
- **Symbol only:** for the favicon, app icon and social media profile images (navy background, ivory J, gold dot). At 16px, the gold dot may be dropped so the J stays legible.

**Rules:**

- Store the logo as SVG in `/public/brand/`, and make it replaceable from the admin Brand Settings (the final professional vector files will replace these).
- Never stretch, recolour outside the palette, add effects or shadows, or separate "JARKABI" from "HOME CARE" in the stacked version.
- Keep clear space around the logo equal to at least the height of the letter "J."
- The logo image must have the accessible name "Jarkabi Home Care" and link to the homepage.

### Remaining placeholders

Until confirmed, use editable placeholders for: [LEGAL COMPANY NAME], [TAGLINE], [PRIMARY PHONE], [TOLL-FREE PHONE], [AFTER-HOURS PHONE], [OTTAWA OFFICE ADDRESS], [ONTARIO OFFICE LOCATIONS], [BUSINESS HOURS], [FOUNDER NAME], [CLINICAL DIRECTOR], [CARE DIRECTOR], [PRIVACY OFFICER], [YEARS OF EXPERIENCE], [REGISTRATIONS], [MEMBERSHIPS], [ACCREDITATIONS], [INSURANCE INFORMATION], [PARTNER ORGANIZATIONS], [SOCIAL MEDIA LINKS], [RESPONSE TIME COMMITMENT].

Never invent credentials, awards, registrations, partnerships, ratings, statistics or affiliations. Every brand detail above, including the name, domain, email and logo, must also be changeable from the admin dashboard.

## 7. Primary Audiences

**Care seekers:** seniors and older adults, adults requiring support, people recovering at home, people living with chronic conditions or disabilities, family caregivers, adult children caring for parents, spouses, private-pay clients.

**Referral partners:** hospital discharge planners, nurses, physicians, social workers, case managers, rehabilitation professionals, community organizations, retirement communities, senior residences, healthcare organizations, insurers where applicable.

**Job seekers:** Personal Support Workers, Health Care Aides, Registered Nurses, Registered Practical Nurses / Licensed Practical Nurses (by province), care coordinators, administrative staff.

Design distinct, clearly signposted paths for each group so no one has to hunt for their entry point.

## 8. Visual Design Direction

Create a premium editorial design.

**Modern:** spacious layouts, generous whitespace, sophisticated typography, large professional photography, elegant cards, smooth animations, modern navigation, clean hierarchy, responsive layouts, refined microinteractions.

**Classic:** timeless typography, restrained effects, refined proportions, elegant spacing, strong alignment, editorial composition.

**Avoid:** cheap templates, excessive gradients, neon colours, generic healthcare graphics, cartoon caregivers, excessive rounded cards, over-animation, clutter, pushy sales tactics, fear-based marketing, cold hospital-style design and generic AI-generated wording.

## 9. Colour System

Use the Jarkabi brand palette (matching the logo):

- **Primary (Jarkabi Navy):** #1C2B45
- **Accent (Soft Gold):** #B08D57 on light backgrounds; #C4A574 on navy (use sparingly, never for body text)
- **Secondary text (Dark Sage):** #4E6A58
- **Light sage (on navy only):** #B9CDBF
- **Background (Warm Ivory):** #F6F1E8
- **Supporting (Stone Grey):** #5F5A52 for secondary text
- **Text (Charcoal):** #2A2A2A

Every text and interface colour pairing must meet WCAG 2.2 AA contrast. Build these as design tokens and provide the full set of states (hover, focus, error, success, disabled). The site should feel warm and residential, not institutional.

Recreate any Care Giver or Lovegiver visual treatments you keep (colour blocks, overlays, bands) using these Jarkabi tokens, not the templates' original colours, unless I approve otherwise.

## 10. Typography

Use **Cormorant Garamond** (the logo serif) selectively for editorial headings and **Jost** (the logo sans-serif) for navigation, labels and buttons. For long body text, use Jost or another highly readable sans-serif if testing shows it reads better for seniors. Load fonts efficiently (self-hosted or Google Fonts with `display=swap`).

Define a full scale: H1, H2, H3, H4, Body Large, Body, Small, Labels, Navigation, Buttons, Statistics, Quotes and Captions.

- Minimum body text of 18px on desktop and comfortable line height (about 1.6)
- Include a visible **text-size control** for older and low-vision visitors
- Choose font families with matching script support: Ge'ez (e.g., Noto Sans / Serif Ethiopic) for Tigrinya and Amharic, a quality Arabic typeface (e.g., Noto Naskh or Noto Sans Arabic), Simplified Chinese (e.g., Noto Sans SC) for Mandarin, and Gurmukhi (e.g., Noto Sans Gurmukhi) for Punjabi. Chinese fonts are very large, so load them only when that language is selected, using subsetting. Test that line heights and spacing work in every script.
- Public marketing pages: elegant serif/display typography for major headings plus clean sans-serif body text.
- Important body text approximately **18–20px on desktop** with generous line height (about 1.6–1.7).
- Do not compress the substantial Care Giver content into tiny typography. Long content should use comfortable reading widths (about 65–75 characters per line), clear subheadings and spacing.

## 11. Photography and Image Replacement

All grey boxes, empty image placeholders, broken images, "image coming soon" blocks and unlicensed demo images must be **replaced with real, relevant photographs**. No grey placeholder should remain on any page.

### Where photos come from (in this order)

1. **Jarkabi's own photos** in `/public/images/jarkabi/`, when I provide them. These always take priority.
2. **Images included in my licensed Lovegiver and Care Giver packages.** Use only files physically present in the local packages, never images seen only on public demo sites.
3. **Free stock photos with a commercial licence** from Unsplash (unsplash.com) or Pexels (pexels.com). Download each image into `/public/images/stock/`. Never hotlink to external image URLs.

Record every image in `docs/licensed-assets.md` with: file name, where it is used, source (package name or stock URL), photographer, licence and date added.

### Choosing relevant photos

Every photo must match the meaning of its section:

| Section | Photo subject |
|---|---|
| Homepage hero | Caregiver and older adult sharing a warm moment in a comfortable home |
| Personal Care | Respectful help with daily routines (grooming, dressing), dignified and not clinical |
| Companion Care | Conversation, cards, tea, walking together |
| Homemaking / Meal Preparation | Cooking together, tidy kitchen, shared meal |
| Nursing Care | Nurse checking blood pressure or reviewing medication at home |
| Dementia Care | Calm companionship, photo albums, music, familiar routines |
| Respite Care | Relieved family caregiver, caregiver arriving at the door |
| Post-Hospital Care | Recovery at home, walking assistance, mobility support |
| Palliative / Comfort Support | Gentle hands, soft light, family presence (never distressing) |
| Overnight / 24-Hour Care | Calm evening scene at home |
| Careers | Caregivers and nurses in a supportive team setting |
| Referrals | Professional conversation between healthcare workers |
| Resources and blog | Images matching each article's topic |

**Photo standards:**

- Show dignity, independence and warmth. Never portray older adults as helpless, frail or distressed.
- Reflect Canada: Canadian-style homes and all four seasons, including winter.
- Reflect the diverse families Jarkabi serves, including East African, Arabic-speaking, Chinese, Punjabi, Latin American, francophone and anglophone families.
- Avoid exaggerated stock smiles, hospital settings for home-care topics and clichéd imagery.
- Keep a consistent warm, natural colour tone across the site.

### Honesty rules for photos

- Stock photos must never be presented as real Jarkabi staff, clients or testimonial authors.
- For "Meet Our Caregivers," team, leadership and testimonial sections, do not attach names or roles to stock faces. Until I supply real photos with signed consent, use general caregiving photos without names, or the section's text-only version, and mark it `[REPLACE BEFORE LAUNCH]` in `docs/licensed-assets.md`.
- Never use AI-generated images of people presented as real staff or clients.

### Technical requirements

- Serve all images through `next/image` with WebP/AVIF, correct `sizes`, and sensible focal-point cropping for mobile.
- Target under about 300 KB per large image after optimization.
- Write meaningful alt text for every informative image (in every site language), and empty alt text for decorative images.

### If you cannot download images

If network access or licensing prevents downloading an image, do not leave a grey box and do not use an unlicensed image. Instead, list the slot in `docs/photo-shotlist.md` with its size, section, subject and suggested search terms, and tell me, so I can supply the photo.

### Original photography guidance (still applies)

Show caregiver–senior interaction, nurses providing care, adult children with parents, senior couples at home, meal preparation, walking assistance, companionship, rehabilitation support, family consultations, and diverse Canadian families and cultural communities in comfortable Canadian homes. Prefer commissioned, authentic photography of real staff (with signed model releases) as soon as it is available.

## 12. Unique Brand Signature

Use the curve of the Jarkabi "Embrace" J symbol as the brand signature: a subtle curved care-line and small gold dot that can appear as section dividers, list markers, loading indicators and background details. Use it sparingly and elegantly. Avoid cliché clip-art hearts and hands.

# PART C: LICENSED TEMPLATES AND CONTENT MIGRATION

## 13. The Two Licensed Templates and Their Roles

I own legitimate licences for two templates supplied locally in this project:

- **Lovegiver: Senior Care React Next.js Template** (located at `reference/lovegiver/`, or the project root if the project was started from it)
- **Care Giver: Senior Care / Medical Template** (located at `reference/caregiver-theme/`)

**Lovegiver provides the technical foundation.** Use it as the primary Next.js foundation, React architecture, routing structure, component structure, responsive frontend foundation and application codebase.

**Care Giver provides content and design reference.** Use my licensed local Care Giver package as an important source for: written content, articles, messages, headings, service descriptions, informational paragraphs, calls to action, page structure, section concepts, care-related explanations, marketing messages, mission-style language, About content, FAQs, informational content, senior/home-care messaging, permitted licensed imagery and visual inspiration.

**The formula:** Lovegiver technology + Care Giver content and selected design elements + Jarkabi branding + Supabase + Vercel = Jarkabi Home Care.

## 14. Inspect Both Templates First

Before making major changes, inspect BOTH templates. Do not immediately rewrite either project.

**For Lovegiver, identify:** Next.js version, React version, App Router or Pages Router, TypeScript usage, Bootstrap dependencies, CSS architecture, components, layouts, pages, animations, sliders, forms, navigation, responsive breakpoints, third-party libraries, and any outdated or vulnerable dependencies (run `npm audit` or equivalent).

**For Care Giver, identify:** every page, every section, headings, paragraphs, service descriptions, informational content, blog/article content, FAQ content, CTA messages, mission/about content, images included in my licensed package, icons, page titles, navigation structure, footer content and reusable marketing messages.

Create `docs/lovegiver-architecture-audit.md` and `docs/caregiver-content-audit.md`.

## 15. Lovegiver Remains the Codebase

Do NOT attempt to combine two complete technical architectures. The production application remains based on Lovegiver / Next.js / React.

- Do not convert the final website back into static Care Giver HTML.
- Do not use iframes.
- Do not paste complete static HTML documents into React.

Instead: Care Giver content → extract → organize → adapt where necessary → place into the appropriate Lovegiver React/Next.js components.

If Lovegiver uses an outdated Next.js version or the Pages Router, first get it running and building as-is. Propose any upgrade (e.g., to a current Next.js version with the App Router and TypeScript) as a separate, documented step for my approval, not as a silent rewrite.

## 16. Use Only My Licensed Local Care Giver Material

The Care Giver template files I provide locally are licensed material. Use those local files as the content source.

- Do NOT scrape the public ThemeForest preview (or any other website) to obtain text, images, scripts or assets that are not contained in my licensed package.
- If something visible in a public demo is absent from the licensed package, do not assume it is licensed for redistribution.

## 17. Care Giver Content Migration (Critical Requirement)

This is one of the most important requirements. I want the useful written content from my licensed Care Giver template migrated into the Lovegiver-based Jarkabi website. Do NOT throw away the Care Giver written information and replace everything with generic AI marketing copy.

Carefully inspect all Care Giver pages and identify useful content, including:

- **Headings:** copy/adapt relevant headings into the corresponding Jarkabi sections.
- **Subheadings:** preserve useful supporting headings and editorial structure.
- **Paragraphs:** move relevant informational paragraphs into appropriate Jarkabi pages.
- **Service descriptions:** use relevant home-care and senior-care service explanations as source content.
- **Articles:** where the licensed package contains full articles, educational content, blog material or resources appropriate for Jarkabi, migrate them into the Resources/Blog structure.
- **Messages:** preserve useful compassionate, family-focused, senior-care, home-care and healthcare messaging.
- **Calls to action:** use appropriate CTA concepts and wording, such as Request Care, Learn More, Contact Us, Talk With Our Care Team, Find the Right Care, Helping Families, Supporting Independence and Compassionate Care at Home.
- **About content:** senior care, home care, quality of care, independence, dignity, family support, professional caregivers and care coordination.
- **Mission / values content:** use appropriate wording and ideas for Jarkabi's mission, philosophy, values and care approach, without falsely attributing Care Giver's corporate history to Jarkabi.
- **FAQ content:** migrate appropriate general home-care FAQs, adapted for Ontario, Canada and Jarkabi Home Care.
- **Blog / resource content:** where legitimate full content exists locally, migrate it into `/resources` and `/blog`, preserving sensible titles, headings and structure.

**Canadian adaptation:** convert US terms and spelling to Canadian usage (e.g., "Medicare/Medicaid" → the appropriate Canadian funding context, "zip code" → "postal code", "caregiver aide" → PSW where accurate, "colour", "centre"). Flag any legal or regulatory statements with [REVIEW REQUIRED].

## 18. Generic Content vs Company-Specific Claims

There is an important difference between **generic home-care content** and **company-specific factual claims**. Generic educational/marketing content may be reused or adapted according to the licence. But do NOT publish Care Giver demo facts as though they are facts about Jarkabi.

**Examples requiring replacement or verification:** founder names, company founding dates, years in business, franchise claims, number of clients, number of employees, branch counts, awards, certifications, accreditation, testimonials, staff biographies, addresses, phone numbers, email addresses, statistics, ratings, partnerships and regulatory claims.

For example, if Care Giver says "Serving families for 25 years," do NOT make Jarkabi claim 25 years unless that is true. Mark it `[JARKABI FACT REQUIRED]` or replace it with verified Jarkabi information.

**Testimonials:** demo testimonials must not be presented as real Jarkabi clients. They may be kept only as development placeholders marked `[DEMO CONTENT]`, and must be replaced by real, consented Jarkabi testimonials before production.

**Corporate history:** if Care Giver describes founders, company history, franchise operations, decades of operation or specific business achievements, do not simply replace the company name with Jarkabi. Create appropriate Jarkabi content or leave a clearly marked placeholder.

**Other companies' wording:** some template demo text appears to include wording from real home-care companies' marketing (for example, a hero line mentioning "Visiting Angels"). Mark any sentence that names, quotes or closely matches a real company's marketing as **DO NOT USE**, even if it appears in the licensed package. A template licence cannot grant rights to another company's words or trademarks.

## 19. Complete Content Migration Map

Create `docs/caregiver-to-jarkabi-content-map.md`. For every meaningful Care Giver content block, document:

| Care Giver page | Care Giver section | Original content type | Jarkabi destination page | Jarkabi destination section | Action |
|---|---|---|---|---|---|
| About | Mission section | Mission paragraph | About | Our Mission | ADAPT |
| Company History | Founders | Company-specific history | About | N/A | DO NOT USE |
| Service | Personal Care explanation | Service description | Personal Care | Overview | ADAPT |

**Action** must be one of: **COPY, ADAPT, REWRITE, FACT-CHECK, DO NOT USE.**

Add a short "reason" note for every REWRITE, FACT-CHECK and DO NOT USE decision, so I can review the decisions quickly.

## 20. Preserve Strong Writing and Content Depth

**Preserve strong Care Giver writing.** Do not automatically rewrite good copy simply because AI can generate something different. If the writing is clear, warm, professional, relevant, accurate and legally usable under my licence, preserve it closely. Modify only when necessary for: Jarkabi branding, Canadian terminology, Ontario context, factual accuracy, grammatical improvement, accessibility, regulatory accuracy or removal of unsupported claims.

**Content priority** when filling Jarkabi pages:

1. Verified Jarkabi-specific content I provide
2. Relevant licensed Care Giver content
3. Relevant Lovegiver content
4. Newly written content only where necessary

Do not generate generic replacement copy when better licensed content already exists locally.

**Preserve content depth.** Do not reduce substantial Care Giver sections to two or three sentences to create a minimalist website. Important sections should educate visitors about: what the service is, who it helps, what caregivers do, how care works, what families can expect, safety, independence, dignity, continuity and professional support.

**Relationship to the Content Style section:** the tone and style rules in "Content Style" still apply. When migrated Care Giver copy already meets them, keep it; edit only what conflicts with them.

## 21. Jarkabi Brand Replacement

Replace appropriate Care Giver and Lovegiver brand references with **Jarkabi Home Care**.

Remove: Lovegiver branding, Care Giver branding, ThemeArc/template-author references, template demo business information, placeholder logos, lorem ipsum and irrelevant contact information.

However, do NOT perform blind global find-and-replace if it would create false statements. Review the context of each replacement first.

## 22. Preserve the Best Visual Elements

Lovegiver remains the primary frontend foundation. Where Care Giver contains visual treatments I prefer, selectively recreate them inside the Lovegiver codebase, for example: premium image backgrounds, full-width senior-care photography, elegant text overlays, parallax/gliding image sections, section hierarchy, CTA concepts, image/text layouts, coloured value blocks, overlapping photo collages and the "Find Your Local Home Care" search section.

Do not destroy Lovegiver's responsive React architecture to achieve this. All parallax and motion effects must respect the reduced-motion setting and work well on mobile.

# PART D: PUBLIC WEBSITE

## 23. Public Website Pages

The public-facing site includes: HOME, ABOUT, SERVICES, HOW CARE WORKS, WHY JARKABI, LOCATIONS, CAREGIVERS, RESOURCES, BLOG, CAREERS, CONTACT and REQUEST CARE, plus Funding & Payment Options, Professional Referrals, FAQ, Feedback & Concerns, Growing Across Canada and the legal pages described below.

Use relevant Care Giver content to populate these pages whenever appropriate. All pages must exist in the sitemap even if some sit under a parent menu item (see "Main Navigation").

## 24. Homepage

**Hero.** Suggested headline: "Exceptional Care. Right at Home." Supporting line: "Professional Care. Personal Connection. Peace of Mind." Supporting copy: "Compassionate home-care and nursing services designed to help people live safely, independently and confidently in the comfort of home."

CTAs: **REQUEST CARE** (primary), **EXPLORE OUR SERVICES** (secondary), **CALL OUR CARE TEAM** (tap-to-call on mobile).

Location statement: "Proudly serving Ottawa and surrounding communities." This must update automatically from the CMS as locations become active. Do not mention future provinces in the hero.

**Trust bar** directly below the hero (only claims the company can substantiate): professional care, personalized care plans, carefully selected caregivers, clinical oversight, flexible scheduling, family-centred approach, culturally responsive care, responsive support.

**Homepage sections in order:**

1. Hero
2. Trust bar
3. Introduction: "Care Built Around the Person, Not the Schedule." Every person has different needs, routines, preferences, culture, language, health circumstances, family situations and goals. Position the agency as a long-term care partner, not a staffing agency.
4. Featured services (active in the visitor's area only)
5. Why Families Choose Us (short summary linking to the full page)
6. How Care Begins: a **five-step** process: Talk With Us → Care Assessment → Personalized Care Plan → Begin Care → Ongoing Review & Support
7. Care Philosophy: "Home Is More Than a Place." Familiar surroundings, memories, independence, comfort, routines, family, culture, language, community and dignity.
8. Family Peace of Mind: "Care for Them. Reassurance for You." Dependable scheduling, care updates, responsive coordination, changing needs, family involvement and continuity.
9. Testimonials (genuine only)
10. Funding & payment options teaser
11. Referral partner and careers entry points
12. Final CTA with phone number

**Additional homepage requirements:** create ONE main Jarkabi homepage using the strongest relevant content from Care Giver and Lovegiver. It must communicate trust, compassion, professional care, independence, family confidence and care at home, and feel premium, warm, professional, trustworthy, compassionate and family-centred. Where Care Giver's homepage sections are stronger than the sections listed above (for example, its coloured value blocks, conditions checklist, caregiver team and local search collage), integrate them into this order and document the final order in `docs/jarkabi-architecture.md`.

## 25. Main Navigation

Keep the main menu short to reduce overwhelm:

**SERVICES · LOCATIONS · HOW CARE WORKS · ABOUT · RESOURCES · CAREERS · CONTACT**, plus a prominent **REQUEST CARE** button and a click-to-call phone number.

"Why Choose Us," "Our Caregivers," "Leadership" and "Growing Across Canada" sit under ABOUT. "Refer a Client" sits in the header utility bar and footer.

**Sticky header:** horizontal Jarkabi Home Care logo, navigation, language selector, location selector, phone and REQUEST CARE. It may be transparent over the hero and should transition smoothly to solid on scroll.

WHY JARKABI and CAREGIVERS are reachable from the ABOUT menu; BLOG from RESOURCES; REQUEST CARE is the primary button.

## 26. About Section

Pages or sections for: Our Story (including the meaning of the name Jarkabi, see "Brand story" in the Brand Identity section), Mission, Vision, Values, Philosophy of Care, Leadership, Clinical Leadership, Our People, Why We Exist, Our Commitment to Families, Communities We Serve and Our Canadian Growth Vision.

**Why Choose Us (full page):** caregiver recruitment, background screening, reference checks, orientation, training, supervision, clinical governance, quality management, care continuity, caregiver matching, family communication, privacy, cultural sensitivity, client dignity and safety culture.

**Our Caregivers:** who they are, recruitment philosophy, qualifications, screening, orientation, education, supervision, professional conduct, and caregiver–client matching (including cultural and language matching where feasible).

**About page content sources:** use strong Care Giver messaging where appropriate for dignity, aging at home, family support, quality care, independence and compassionate caregivers. Jarkabi's company history, ownership, founders, years of operation and actual mission must reflect Jarkabi itself; use [JARKABI FACT REQUIRED] where information is missing.

## 27. Services

Build modular services that administrators can create, edit, activate and deactivate **by province and by city**.

Starting list: personal care, senior home care, companion care, homemaking, meal preparation, mobility assistance, transfer assistance, medication support/reminders, registered nursing, nursing assessments, post-hospital recovery, respite care, dementia support, Alzheimer's support, chronic disease support, palliative and comfort support, overnight care, 24-hour care, live-in care, appointment assistance, community access, family caregiver relief, wellness visits, health monitoring, wound-related nursing and medication-related nursing.

Clearly separate **non-regulated support services** (PSW/companion) from **regulated nursing services**, so visitors understand who provides what.

**Each service page includes:** hero, overview, who it is for, common support provided, benefits, care approach, how care begins, FAQs, related services, available locations and a CTA.

**Specific page guidance:**

- **Nursing:** More clinically sophisticated. Distinguish RN, RPN (Ontario), LPN (other provinces) and other provincial designations. Nursing titles and scope differ by province; make this content province-specific and editable. [REVIEW REQUIRED]
- **Dementia care:** routine, familiarity, safety, communication, meaningful activities, caregiver consistency, family support, personal history, culture, language and dignity. Never promise medical outcomes.
- **Post-hospital care:** discharge, surgery, illness, recovery, mobility, meals, medication routines, personal care, transportation and follow-up appointments. Do not imply hospital partnerships unless verified.
- **Respite care:** speak directly to family caregivers: temporary support, flexible scheduling, rest, relief and continuity.
- **Palliative and comfort support:** sensitive, respectful language about dignity, comfort, family support, personal wishes and collaboration with the person's healthcare team.

**Standard service page structure** (use appropriate Care Giver content as the initial source):

1. Service title
2. Premium introduction
3. Who this service helps
4. What is included
5. Benefits
6. How Jarkabi delivers the service
7. Frequently asked questions
8. Related services
9. Request Care CTA

**Service list to build:** Personal Care, Companion Care, Homemaking, Senior Home Care, Nursing Care, Dementia Care, Respite Care, Post-Hospital Care, Palliative / Comfort Support, Overnight Care and 24-Hour Care (plus the additional services listed above, activated through the CMS as appropriate).

## 28. Service Availability by Location

The CMS must record availability as **Service → Province → City → Status** (Active, Coming Soon, Paused, Not Currently Served).

Example: Registered Nursing → Ontario → Ottawa → ACTIVE. Registered Nursing → Alberta → Calgary → COMING SOON.

The website must never show a service as available where it is not.

## 29. Funding & Payment Options

Many families' first question is "How do we pay for this?" Create a clear page covering, where applicable:

- Private pay
- Private health / extended benefits insurance
- Auto insurance claims after a motor vehicle accident
- Workplace injury insurance (WSIB in Ontario; WCB in other provinces)
- Veterans Affairs Canada programs
- Long-term care insurance and employer benefits
- Possible tax credits (advise families to consult a tax professional)

Also explain plainly the difference between **publicly funded home care** (in Ontario, arranged through Ontario Health atHome) and **private home care**, and how the two can work together.

Never state the agency is an approved or preferred provider for any insurer or program unless verified. [REVIEW REQUIRED]

## 30. Pricing

Optional pricing module with rates controlled separately by province, city, service, caregiver classification, weekday, weekend, holiday, overnight and minimum visit length.

Do not publish rates unless an administrator activates them. Default CTA: "Contact us for a personalized care estimate."

## 31. Locations

**Hierarchy:** Canada → Province → Region → City → Service. Example URLs:

- /ontario/ottawa/kanata/senior-home-care/
- /alberta/calgary/dementia-care/
- /saskatchewan/regina/nursing-care/

Administrators create locations without developer help.

**Province/territory statuses:** ACTIVE, COMING SOON, PAUSED, NOT CURRENTLY SERVED. Prepare all ten provinces and three territories. Never imply service in a province before launch.

**Locations hub:** Select province → Select city → See available services → Request care.

**Canada map:** an elegant, accessible interactive map (with a text list alternative for screen readers). Publicly show only ACTIVE ("Available") and COMING SOON; PAUSED and NOT CURRENTLY SERVED appear neutral. Clicking a province opens its hub.

**Ontario launch pages (ready for activation):** Ottawa, Kanata, Nepean, Barrhaven, Orléans, Gloucester, Stittsville, Rockland and Manotick. Gatineau is in Quebec and must never be grouped with Ontario.

**Future cities (inactive):** Toronto, Mississauga, Brampton, Hamilton, London, Kingston, Windsor, Kitchener-Waterloo, Calgary, Edmonton, Regina, Saskatoon, Winnipeg, Vancouver, Victoria, Surrey, Halifax, Fredericton, Moncton, Saint John, Charlottetown, St. John's, Montreal and Quebec City.

**Local personality:** each location can display local office, leadership, caregiver team, phone number, community information, services, testimonials, resources, photography, careers and referral contact. The result: **one national brand + local community trust.**

**Local SEO quality:** never auto-generate thin location pages. A location page publishes only when it has meaningful unique content.

**Growing Across Canada page:** explain that the agency began caring for families locally and intends to expand thoughtfully. Emphasize local leadership, consistent quality, Canadian values, culturally responsive care and community partnerships. Expansion must never sound like growth at the expense of quality.

**Local SEO routes (future):** Canada → Province → Region → City → Service, for example `/ontario/ottawa/home-care`, `/ontario/ottawa/senior-care`, `/ontario/ottawa/dementia-care`, `/ontario/ottawa/respite-care` and `/ontario/ottawa/nursing-care`. Choose one consistent URL pattern for city and service pages and document it.

## 32. Multilingual Platform

Build a genuinely multilingual platform from the start.

**Languages:** English, French, Tigrinya, Amharic, Arabic, Mandarin Chinese, Punjabi and Spanish. Administrators can add more later without code changes (e.g., Tigre, Blin, Cantonese, Hindi, Urdu, Tagalog, Italian, Portuguese).

**English and French:** maintain fully independent, professionally written versions. Do not rely on browser or machine translation. For any future Quebec operations, French must meet Quebec's Charter of the French Language requirements. [REVIEW REQUIRED]

**Ge'ez-script languages (Tigrinya, Amharic):** UTF-8 throughout; correct Ge'ez rendering; translated navigation, forms, buttons, FAQs, service descriptions, blog content and SEO metadata; language-specific URLs; tested mobile display. Never romanize into Latin characters unless requested.

**Mandarin Chinese:** written in Simplified Chinese characters (language code zh-Hans), which most Mandarin-speaking families in Canada read. Architect so a Traditional Chinese version (zh-Hant) can be added later. Check that line breaks, line heights, font sizes and form inputs work correctly with Chinese characters, and never romanize into pinyin unless requested.

**Punjabi:** written in Gurmukhi script (language code pa-Guru), the script used by most Punjabi speakers from India. Architect so a Shahmukhi version (right-to-left, pa-Arab) can be added later for families from Pakistan. Hindi is a separate language and must never be used as a substitute for Punjabi.

**Spanish:** use neutral Latin American Spanish (language code es-419), which suits most Spanish-speaking families in Canada. Use the respectful "usted" form throughout, since it is more appropriate when speaking with older adults and families about care. Allow extra space in buttons, menus and headings, because Spanish text is often longer than English.

**Arabic:** full right-to-left layout, navigation, forms, typography and mobile layouts. Direction switches automatically. Icons with direction (arrows, progress) must mirror.

**Language selector:** visible but elegant, showing each language in its own script: English, Français, ትግርኛ, አማርኛ, العربية, 中文, ਪੰਜਾਬੀ, Español. Never use flags to represent languages. Remember the visitor's choice across pages.

**Translation workflow:**

- Every page shows a translation status (not started, in progress, in review, approved)
- Clinical, legal and culturally sensitive content must be human-translated and reviewed before publishing; machine translation may only be used as a draft
- If a page is not yet translated, show the English or French version with a polite notice, rather than mixing languages or showing an empty page
- Set correct `lang` and `dir` attributes and hreflang tags for every page

**Migrated content and translation:** Care Giver content is in English. Migrate and finalize English first, then French. Other languages follow the translation workflow above; never publish machine-translated migrated content without human review.

## 33. Culturally Responsive Care

Optional content explaining respect for language, food preferences, faith practices, family structure, traditions, routines, customs, caregiver gender preferences where appropriate and individual values. Never stereotype any group.

For future territorial and Indigenous-community work, provide editable space for cultural safety commitments and a land acknowledgement written with appropriate community guidance.

## 34. Testimonials & Reviews

Support text and video testimonials, Google reviews, family stories and caregiver stories.

- Publish only genuine testimonials, with written consent from the person quoted
- Use clearly labelled placeholders during development
- Never fabricate, edit the meaning of, or selectively filter reviews in a misleading way
- Disclose any incentive given for a review, in line with Canadian Competition Act guidance [REVIEW REQUIRED]

## 35. Careers

A sophisticated recruitment section. Roles may include: Personal Support Worker, Health Care Aide, Care Assistant, Companion, RN, RPN, LPN, Care Coordinator, Scheduler, Clinical Lead, Operations Manager, Recruitment Specialist and administrative staff. Use province-specific job titles.

- Search by province, city, profession, employment type, shift and keyword
- Online application with secure resume upload (scanned for malware)
- Job posting templates with fields for pay range and other disclosures required by provincial pay-transparency and employment laws (e.g., Ontario, British Columbia) [REVIEW REQUIRED]
- A "Life at Jarkabi" section: culture, support, training and growth

## 36. Professional Referrals

A dedicated page for hospitals, physicians, nurses, social workers, case managers, rehabilitation teams, retirement residences, community organizations and insurers.

- Short referral form with province-specific routing
- Clear statement of what information to send and how to send it securely (never ask for health records through an ordinary web form)
- Downloadable referral information sheet
- Expected response time (only if the company can meet it)

## 37. Resources & Knowledge Centre

Categories: aging at home, choosing home care, hospital discharge, dementia, caregiver support, home safety, nutrition, mobility, senior wellness, care planning, family caregiving, funding and paying for care, and Canadian home-care information.

Support articles, guides, videos, downloads, checklists, news, regional content and province-specific content, all with multilingual versions. Clinical articles show a "Reviewed by [name, credential]" line and review date. Pages should print cleanly, since many families print information to share.

**Resource categories:** Home Care, Senior Care, Family Caregiving, Dementia, Healthy Aging, Safety at Home, Hospital-to-Home, Respite Care and Nursing at Home (plus the categories above).

Migrate licensed Care Giver educational content into these categories where relevant. Preserve the article title, useful body content, section headings and educational value, while updating branding and factual context (Canadian, Ontario) where necessary. Routes: `/resources` for guides and `/blog` for articles and news.

## 38. FAQ System

Categorized FAQs: getting started, costs, funding, caregivers, nursing, scheduling, privacy, family communication, service areas, care plans, home visits, employment, languages, insurance and province-specific questions. Use FAQ structured data.

## 39. Request Care Form and Public Forms

An elegant, simple, high-conversion intake form, split into short steps with a progress indicator.

**Fields:** your name, phone, email, relationship to the person needing care, person's first name (optional), postal code (auto-fills province and city), type of care, preferred start date, approximate hours, preferred language, best time to contact, additional notes.

- A clear message at the top: **"If this is a medical emergency, call 911."**
- An "I need care urgently" option that flags the request and shows the after-hours number
- Collect no detailed medical information through this form
- Separate, unticked checkboxes for (a) consent to be contacted about this request and (b) optional marketing emails, compliant with Canada's Anti-Spam Legislation (CASL)
- Short privacy notice with a link to the full policy
- Accessible, spam-protected (no inaccessible CAPTCHA), and a confirmation page and email explaining what happens next and when

**Form technology (all public forms: Request Care, Contact, Referral, Job Application):** React Hook Form + Zod on the client, with the same Zod schemas re-validated on the server. Avoid collecting unnecessary health information through anonymous public forms. Store submissions in Supabase with Row Level Security so only authorized staff can read them.

## 40. Smart Location Routing

When a visitor enters a postal code: identify the province, find the nearest supported service area, show available services and route the inquiry to the correct office.

If the area is not active, show: "We are not currently serving this location." Offer an expansion notification list (with CASL-compliant consent). Never imply coverage that does not exist.

## 41. National Contact System

The main contact email is **care@jarkabi.ca**. Display it as a clickable mailto link on the Contact page and in the footer. Form notifications should be sent to an admin-configurable address (default: care@jarkabi.ca), with the option to add province- or office-specific addresses later (e.g., referrals@jarkabi.ca, careers@jarkabi.ca).

Support a national toll-free number, provincial, regional and local office numbers, central intake, call routing and after-hours contact information. Administrators choose which number appears based on the visitor's location.

## 42. Feedback & Concerns

A clear page explaining how clients and families can share compliments, raise concerns or make a complaint, who reviews them, and the expected response time. A visible, fair complaints process is a strong trust signal.

## 43. Footer

Horizontal Jarkabi Home Care logo (reversed version on navy), brand statement, care@jarkabi.ca, services, locations, province links, resources, careers, referrals, contact, language options, privacy, accessibility, terms, feedback & concerns, social links, current service coverage and copyright.

## 44. Microinteractions

Subtle fade-ups, image reveals, button and card hover states, accordion animation, navigation and page transitions and gentle scroll effects. All motion must respect the reduced-motion setting. Avoid anything distracting.

## 45. Content Style

Write in clear Canadian English (and Canadian French for French pages).

**Tone:** professional, warm, human, compassionate, knowledgeable, confident, reassuring and respectful. Aim for Grade 7–9 readability on consumer pages; clinical pages may use appropriate terminology.

**Avoid:** AI clichés, corporate jargon, fear, overpromising, exaggerated medical claims and repetitive slogans.

**Headline bank** (choose a coherent system; do not use them all):

- "Exceptional Care. Right at Home."
- "Professional Care. Personal Connection."
- "Helping Life at Home Continue With Confidence."
- "Care Built Around You."
- "Supporting Independence. Strengthening Families."
- "Because Home Is More Than a Place."
- "Care for Them. Reassurance for You."
- "Compassionate Care, Wherever Home May Be."

## 46. Conversion Strategy

Primary actions: Request Care, Call Our Care Team, Schedule a Consultation, Find Care Near You, Explore Services, Refer a Client and Join Our Team.

Each page should have one clear primary action. Do not overwhelm visitors with competing CTAs.

## 47. Trust Signals

Provide tasteful spaces for **verified** professional registrations, insurance, background screening, caregiver training, clinical leadership, memberships, community partnerships, accreditations, awards, reviews and years of experience.

**Never state** any of the following unless verified: government approved, licensed nationally, accredited, award-winning, best in Canada, number one, hospital partner, Ontario Health partner, Veterans Affairs provider, insurance approved, registered provider or certified.

# PART E: TECHNOLOGY, INFRASTRUCTURE AND SECURITY

## 48. Final Technology Architecture

| Layer | Choice |
|---|---|
| Frontend / application | Next.js, React, TypeScript |
| Design foundation | Licensed Lovegiver template, plus Care Giver design references where appropriate |
| Styling | Existing Lovegiver styles, Tailwind CSS where appropriate, shadcn/ui selectively for application interfaces |
| Backend | Supabase |
| Region | Canada Central |
| Database | PostgreSQL |
| Authentication | Supabase Auth |
| File storage | Supabase Storage |
| Source control | GitHub |
| Development | Cursor |
| Deployment | Vercel |
| Domain | jarkabi.ca (jarkabi.com and www redirect to it) |
| DNS management | Cloudflare |
| Email / SMS | A transactional provider behind an abstraction layer so it can be swapped |

Avoid locking the platform to a single vendor where a simple abstraction avoids it. If you believe a different choice is better for any layer, explain the trade-offs and wait for my approval.

**DNS note:** when connecting Cloudflare to Vercel, follow Vercel's current guidance for Cloudflare DNS (typically DNS-only records rather than Cloudflare proxying for the Vercel domain) to avoid SSL and caching conflicts. Document the final setup in `docs/deployment.md`.

## 49. Development Flow

Licensed Lovegiver source code → Cursor → GitHub → Vercel → jarkabi.ca, with Supabase as the backend.

- **Cursor:** development environment and AI coding assistant
- **GitHub:** source control and repository
- **Vercel:** build, preview and production hosting
- **Supabase:** database, authentication, authorization and storage

Initialize Git and make the first commit of the untouched Lovegiver template **before** any changes, so there is always a clean point to return to.

## 50. Content Architecture and Editing

Do not permanently hard-code every article and paragraph in arbitrary JSX files. Create an architecture that supports editable content through Supabase, MDX, structured content files or another appropriate CMS approach (Payload CMS remains an acceptable option). Choose a sensible initial method, explain why, and document it in `docs/content-architecture.md`.

Recommended path: start with structured content files or MDX for migrated Care Giver content (fast, reviewable in Git), designed so it can later move into the full admin dashboard described below without rewriting page components.

## 51. Admin Dashboard (Content and Operations)

**Modules:** dashboard, pages, services, locations, provinces, cities, languages, translations, team, testimonials, FAQs, resources, blog, care requests, referrals, job applications, careers, media library, navigation, redirects, SEO, forms, brand settings, global settings, users and permissions.

**Dashboard widgets:** new care requests, urgent requests, unanswered inquiries (with age), referral requests, job applicants, active provinces and cities, website traffic, top services, recently edited pages, unpublished content, content awaiting review and translation status.

**Editability:** logo, business name, taglines, colours, typography, navigation, pages, sections, text, images, videos, icons, buttons, testimonials, services, cities, provinces, pricing, careers, team, phone numbers, emails, forms, footer, language content, metadata, social links and legal content.

Administrators can add, edit, delete, hide, publish, unpublish, reorder, duplicate and schedule content.

**Content governance:**

- Workflow: Draft → In Review → Approved → Published
- Clinical content requires approval by a Clinical Administrator; legal content by a designated reviewer
- Full revision history with one-click rollback
- Audit log of who changed what and when

**Page builder blocks:** hero, text + image, service grid, cards, statistics, testimonials, FAQ accordion, team grid, video, process timeline, comparison table, CTA banner, image gallery, blog grid, trust bar, location selector, contact block, forms, quote, logo strip and province map. Blocks must stay on-brand and accessible no matter how editors arrange them.

**User roles (granular permissions):** Super Administrator, National Administrator, Provincial Administrator, Regional Administrator, Office Administrator, Clinical Administrator, Care Coordinator, Recruitment/HR, Content Editor, Translator and SEO Editor. Provincial and regional roles can only see and edit their own area's content and inquiries.

**Role model note:** the content-management roles above and the care-platform roles (Client, Caregiver, RN, etc., see "Authentication & Roles") must live in one unified role and permission model, documented in `docs/role-permissions.md`.

## 52. Styling Strategy

**Bootstrap:** if Lovegiver uses Bootstrap, do not recklessly rewrite the whole application. First stabilize the project, then document the styling strategy in `docs/styling-strategy.md`, including how Bootstrap and Tailwind will coexist (e.g., CSS layer order and prefixing) without conflicts.

**Tailwind + shadcn/ui:** for new secure-application components, prefer Tailwind CSS + shadcn/ui, used selectively for forms, tables, dialogs, sheets, dropdowns, tabs, accordions, navigation and dashboard controls. Do not make the public website look like a generic shadcn dashboard.

## 53. Supabase

Create/connect a dedicated Jarkabi Supabase project in **Canada Central**. Do not reuse an unrelated production database.

Environments: **Jarkabi Development**, **Jarkabi Staging** and **Jarkabi Production**, each with its own keys. Manage schema changes with Supabase migrations committed to Git; never make untracked changes directly in production.

## 54. Authentication & Roles

Implement Supabase Auth for eventual roles including: Client, Authorized Family Member, Caregiver / PSW, RN, RPN, Care Coordinator, Scheduler, HR / Recruitment, Billing / Finance, Operations Manager, Clinical Director, Administrator and Super Administrator (plus the content-management roles in the Admin Dashboard section, unified in `docs/role-permissions.md`).

Do not implement authorization only in the frontend. Every permission must also be enforced in the database and on the server.

## 55. Multi-Factor Authentication

Prepare mandatory MFA for staff who access sensitive information. At minimum: administrators, clinical personnel, care coordinators, schedulers with client-data access and finance users where appropriate.

## 56. Row Level Security

Use Supabase Row Level Security for all sensitive tables. A caregiver must not automatically have access to every Jarkabi client. Authorization considers: **role + client assignment + relationship + required access.** Document every policy in `docs/rls-policies.md` and write automated tests proving that users cannot read or change data they are not authorized to access.

## 57. Database Model

Potential tables: profiles, roles, user_roles, clients, client_contacts, family_members, caregivers, nurses, staff, client_assignments, care_plans, care_plan_items, visits, visit_tasks, visit_notes, schedules, availability, timesheets, incidents, messages, message_threads, documents, invoices, invoice_items, payments, service_types, locations, job_openings, job_applications, notifications, audit_logs and site_settings. Also include the public-website tables implied elsewhere in this prompt: care_requests, referrals, contact_messages, provinces, cities, service_availability, languages and translations.

Document relationships in `docs/database-design.md` before implementing.

## 58. Storage

Sensitive files must use **private** storage buckets with signed, short-lived URLs. Potential categories: client documents, care plans, assessments, incident attachments, staff documents, job applications and training documents. Never expose sensitive documents with permanent public URLs. Scan uploads for malware.

## 59. Audit Logging

Design audit logging for actions such as VIEW_CLIENT, UPDATE_CARE_PLAN, CREATE_VISIT_NOTE, DOWNLOAD_DOCUMENT, UPDATE_ASSIGNMENT and VIEW_INVOICE. Audit records must be protected (append-only, restricted access) and retained per the privacy retention schedule.

## 60. Privacy

Privacy-by-design architecture:

- Minimal data collection and clear consent
- Personal information stored in Canada
- Encryption in transit and at rest
- Role-based access to inquiries (staff see only their area)
- Data retention schedules and automatic deletion
- Access logging
- Data access and deletion request workflows
- Breach response workflow
- Named privacy officer contact published on the site
- Cookie consent banner with categories (non-essential cookies off by default)

## 61. Security

HTTPS everywhere, secure sessions and authentication, multi-factor authentication for all admin users, role-based access control, server-side validation, input sanitization, rate limiting, accessible spam protection, secure and malware-scanned uploads, environment variables for secrets (never in frontend code), database security rules, audit logs, automated dependency scanning, protection against the OWASP Top 10, and daily backups with regularly tested restores.

Also implement or prepare: least privilege, secure headers (including a Content Security Policy), bot protection on public forms, session revocation, dependency monitoring, and secure secrets management. Never expose Supabase service-role keys, database passwords, private API keys or administrator secrets to client-side code.

## 62. Environment Variables

Use environment variables correctly. Provide `.env.example` with placeholders only, and document each variable in `docs/environment-variables.md`. Never commit secrets to GitHub.

## 63. GitHub

Prepare a clean repository with sensible branching: `main`, `develop` if necessary, and feature branches. Do not commit `.env.local`, secrets, build output or unnecessary temporary files. Keep the licensed template source files out of any public repository; the repository must be **private**.

## 64. Vercel

Connect GitHub to Vercel. Process: feature branch → pull request → preview deployment → review → merge → production deployment. Production domain: **jarkabi.ca**, with **www.jarkabi.ca** and **jarkabi.com** redirecting to it. Protect preview deployments so unreleased content and test data are not public.

## 65. Canadian Infrastructure

Database: Supabase Canada Central. Configure application infrastructure with Canadian requirements in mind where supported and appropriate (for example, choosing Vercel function regions close to Canada where available). Document regional and data-location assumptions. Do not claim compliance merely because Canadian infrastructure is selected.

## 66. Accessibility

Target **WCAG 2.2 AA** (AODA currently requires WCAG 2.0 AA, so this exceeds it).

Keyboard navigation, visible focus states, accessible contrast, accessible forms and error messages, screen-reader support, meaningful alt text, semantic HTML, correct heading hierarchy, large touch targets (at least 44×44px), readable fonts, text-size control, reduced-motion support, plain-language summaries and senior-friendly interfaces.

Test with automated tools (e.g., axe) **and** manually with screen readers (NVDA, VoiceOver) and keyboard-only use, including in RTL, Ge'ez, Chinese and Gurmukhi-script languages.

Check specifically: keyboard navigation, focus states, contrast, semantic HTML, form labels, error messages, alt text, heading hierarchy, reduced motion and screen-reader usability, on both the public site and the secure portals.

## 67. Responsive & Mobile Design

Design intentionally for large desktop, desktop, laptop, tablet, iPad, iPhone and Android. Do not simply shrink desktop layouts.

Many families search urgently from a phone. On mobile it must be extremely easy to: call (sticky tap-to-call), request care, find services, find locations, read reviews, get directions and apply for work.

## 68. Performance

Target "Good" Core Web Vitals: LCP under 2.5s, INP under 200ms, CLS under 0.1 on mid-range mobile devices.

Use responsive images in modern formats, lazy loading, optimized and subsetted fonts (important for Ge'ez, Arabic, Chinese and Gurmukhi), code splitting, minimal JavaScript, caching, a CDN and GPU-friendly animations.

Use Next/Image, responsive images, modern image formats (WebP/AVIF), font optimization, code splitting, dynamic imports where useful, efficient animations and lazy loading. Remove unnecessary template scripts (unused sliders, jQuery plugins, analytics snippets, demo scripts) inherited from the templates.

## 69. SEO

All canonical URLs use https://jarkabi.ca. Page titles follow "Page Name | Jarkabi Home Care" (see the Brand Identity section).

National, provincial and local SEO architecture with: editable meta titles and descriptions, canonical URLs, Open Graph, structured headings, alt text, breadcrumbs, XML sitemaps per language, `lang` tags, hreflang and a redirect manager.

**Structured data where appropriate:** Organization (name "Jarkabi Home Care", url "https://jarkabi.ca", email "care@jarkabi.ca", logo), LocalBusiness, Service, FAQPage, Article, BreadcrumbList and JobPosting. Never use misleading medical schema.

Support a Google Business Profile for each active office, with matching name, address and phone details.

Implement with the Next.js Metadata API: titles, descriptions, canonical URLs, Open Graph, sitemap.xml, robots.txt, breadcrumbs, Organization schema, LocalBusiness/service schema where appropriate and Article schema. **Do not retain any demo metadata** from Lovegiver or Care Giver.

## 70. Analytics

Privacy-conscious analytics, respecting cookie consent. Track care inquiries, phone clicks, service interest, location searches, form conversions and drop-off points, career applications, referral submissions, traffic by province and language, and popular resources. Never send personal health information to analytics tools.

## 71. Mobile App Readiness

A future mobile application (React Native + Expo, iOS and Android) will use the same secured Supabase backend. Keep business logic and permissions on the server and in the database, not only in web components, so the mobile app can reuse them.

# PART F: SECURE CARE PLATFORM

## 72. Public Website vs Secure Application

**Public website:** warm, photographic, Lovegiver/Care Giver influenced, editorial and marketing-focused.

**Secure application:** structured, accessible, highly usable and information-oriented.

Both share Jarkabi branding, logo, colours, typography and design language.

## 73. Client Portal

Dashboard, upcoming visits, care schedule, care team, care plan, visit summaries, messages, documents, invoices, payments, profile and authorized family access.

## 74. Family Portal

Care calendar, assigned caregivers, visit updates, approved care information, secure messages, invoices, documents and notifications. Access must depend on authorization and the client's consent.

## 75. Caregiver Portal

Today's schedule, upcoming visits, client assignments, care instructions, visit tasks, check-in, check-out, visit notes, incident reporting, mileage, timesheets, availability, training, documents and secure messages. Design it mobile-first, since caregivers will mostly use phones.

## 76. Nursing Portal

Assessments, nursing care plans, clinical notes, reassessments, clinical tasks, incident follow-up, vital signs, wound documentation, medication-related documentation where appropriate, orders/documents and caregiver supervision. [REVIEW REQUIRED: clinical documentation requirements with the Clinical Director]

## 77. Admin / Operations

Dashboard, clients, caregivers, nurses, families, scheduling, visits, care plans, clinical, incidents, timesheets, billing, invoices, payments, documents, communications, referrals, recruitment, staff, locations, reports, audit logs and system settings.

## 78. Scheduling

Client visits, recurring visits, caregiver assignments, availability, shift conflicts, cancelled visits, replacement caregivers, open shifts, overnight visits and 24-hour arrangements. Handle time zones correctly for future provinces.

## 79. Visit Workflow

Scheduled → Assigned → Check-In → Tasks Performed → Visit Notes → Incident/Exception if needed → Check-Out → Supervisor Review → Billing/Timesheet Process.

## 80. Care Plans

Use structured care-plan information, not one giant free-text box: goals, tasks, frequency, instructions, risks, preferences, mobility, nutrition, personal care, communication, safety and visibility permissions. Support history/versioning for major changes.

## 81. Secure Communication

Secure, authorized conversation threads between client, authorized family, caregiver, nurse, care coordinator and administrative staff. No health information in email or SMS notifications; notifications should only say a new message is waiting.

## 82. Billing

Services, rates, visits, billable hours, invoices, invoice items, payment status, adjustments, and payment integration later.

## 83. Future Integrations

**Client/family portal (future):** accounts, care schedules, care plans, care notes, visit updates, invoices, payments, documents, secure messaging, caregiver information and calendar.

**Caregiver portal (future):** schedules, shift acceptance, availability, timesheets, care plans, visit documentation, secure communication, training, credentials, payroll information and announcements.

**Integrations (future):** CRM, scheduling software, electronic care records, accounting, payroll, HR, recruitment, background checks, payments, email, SMS, telephony, video consultation, document signing, analytics and marketing automation. Connect through an integration layer; do not tightly couple the site to one vendor.

Portals will hold personal health information, so they require stronger security, Canadian hosting and a privacy impact assessment before launch.

# PART G: COMPLIANCE, LEGAL AND SCALABILITY

## 84. Provincial Compliance Layer

**CRITICAL:** home-care, health, employment, privacy and professional rules differ by province. Do NOT assume Ontario rules apply nationally.

Each province has configurable: legal notices, privacy wording, regulatory information, professional titles, professional college information, nursing scope references, employment information, insurance wording, consent language, referral requirements, required disclosures and service restrictions.

**Laws and bodies the architecture should be able to accommodate (all [REVIEW REQUIRED]):**

- Federal: PIPEDA, Canada's Anti-Spam Legislation (CASL), Competition Act (advertising and reviews)
- Ontario: PHIPA where applicable, AODA, Ontario Human Rights Code, Employment Standards Act, Occupational Health and Safety Act, College of Nurses of Ontario standards, pay-transparency rules, and any applicable PSW oversight body
- Quebec: Law 25 (privacy, including consent for cookies and tracking) and the Charter of the French Language
- Alberta and British Columbia: provincial private-sector privacy acts (PIPA) and health information laws
- Each other province's health information, privacy, employment and nursing college requirements

Templates alone do not equal compliance. Final content must be reviewed by qualified legal and clinical professionals.

## 85. Legal Pages

Editable templates for: Privacy Policy, Terms of Use, Accessibility Statement, Cookie Policy, Consent Information, Care Service Disclaimer, Employment Privacy Notice, Referral Privacy Notice and Feedback & Complaints Policy. Every template must state clearly that professional legal review is required before publication. [REVIEW REQUIRED]

## 86. National Scalability

Adding a province must never require rebuilding the site, duplicating code or creating a separate website. The process should be:

Activate Province → Add Regional Content → Add Locations → Configure Services → Configure Compliance Content → Add Local Team → Add Contact Information → Review → Publish.

# PART H: IMPLEMENTATION PHASES

## 87. Implementation Phases

Complete one phase at a time. At the end of each phase: run the build, test the changes, update `docs/PROGRESS.md`, commit to Git, and wait for my approval before continuing.

**Phase 1: Audit both templates.** Inspect Lovegiver and Care Giver. Initialize Git and commit the untouched template. Run Lovegiver locally and confirm it builds. Inventory Care Giver content. Create the architecture and content-migration documentation.

**Phase 2: Content migration plan.** Create `docs/caregiver-to-jarkabi-content-map.md`, marking COPY, ADAPT, REWRITE, FACT-CHECK or DO NOT USE for all important Care Giver content.

**Phase 3: Jarkabi rebranding.** Replace template branding with Jarkabi Home Care: logo, name, colours, typography, contact details (care@jarkabi.ca), metadata and favicon.

**Phase 4: Public website.** Build the Jarkabi public pages using Lovegiver components + relevant licensed Care Giver content, in English and French, for the Ottawa launch: homepage, About, Services hub and service pages, How Care Works, Locations (Ottawa area), Funding & Payment Options, Careers, Referrals, Resources/Blog, FAQ, Contact, Request Care, Feedback & Concerns and legal pages.

**Phase 5: Photos and images.** Replace every grey placeholder and unlicensed image with real, relevant photos as described in "Photography and Image Replacement," and complete `docs/licensed-assets.md`.

**Phase 6: GitHub + Vercel.** Set up the private repository, branching, preview deployments and the production domain.

**Phase 7: Supabase.** Connect the Canada Central project (development, staging, production). Implement the authentication foundation and connect the public forms.

**Phase 8: Authorization.** Roles, RLS and assignment-based permissions, with automated tests.

**PUBLIC WEBSITE LAUNCH MILESTONE.** After Phase 8 plus the public-site items of Phase 14 (accessibility, performance, SEO) and the Launch Readiness checklist, the public website can go live at jarkabi.ca while portal work continues behind login.

**Phase 9: Client / family portals.** Secure portal foundations.

**Phase 10: Caregiver portal.** Scheduling, assignments, visits, notes and timesheets.

**Phase 11: Clinical / nursing.** Assessments, care plans and clinical documentation.

**Phase 12: Admin / operations.** Scheduling, staffing, billing, recruitment, reports and the content-management dashboard.

**Phase 13: Security review.** RLS, MFA, storage, secrets, authorization, audit logs and dependencies. A privacy impact assessment is required before any portal holds real client data.

**Phase 14: Accessibility / performance / SEO.** Production QA for the public site and portals.

**Phase 15: Additional languages and features.** Tigrinya, Amharic, Arabic (RTL), Mandarin Chinese, Punjabi and Spanish; interactive Canada map; pricing module; testimonial system.

**Phase 16: Expansion.** Additional Ontario cities, then other provinces, activated through the CMS only.

## 88. Original Public Website Release Plan (for reference)

These are public website **releases**, which map onto the implementation phases above: Release A = Phases 3–8 and 14; Release B = Phase 15; Release C = Phase 16; Release D = Phases 9–12. Design the data model for all releases during Phases 1–2, even though features are delivered gradually.

- **Release A (Launch MVP):** Ottawa launch; English and French; homepage, About, Services hub and service pages, How Care Works, Locations (Ottawa area), Funding & Payment Options, Careers (basic application), Referrals, Contact, Request Care form with smart postal-code routing, legal pages, CMS core, service-by-location availability, compliance content layer, accessibility, SEO foundation, analytics.
- **Release B:** Tigrinya, Amharic, Arabic (RTL), Mandarin Chinese, Punjabi and Spanish; Resource Centre and blog; career search; pricing module; interactive Canada map; testimonial system.
- **Release C:** Additional Ontario cities, then other provinces, activated through the CMS only.
- **Release D:** Client/family portal, caregiver portal and third-party integrations.

## 89. Launch Readiness

- Custom, helpful 404 and error pages
- Maintenance mode
- Uptime monitoring and error logging
- Redirect manager for URL changes
- Staging environment for testing before changes go live
- Launch checklist covering accessibility, SEO, forms, legal review and translations

# PART I: QUALITY, DOCUMENTATION AND FINAL OBJECTIVE

## 90. Deliverables

Produce:

- Sitemap and key user flows (family requesting care, referral partner, job applicant)
- Wireframes for key pages (homepage, service page, location page, request-care form)
- Design system: colour tokens, typography scale, spacing, components and states
- Content model / database schema
- Working, documented code repository
- Seeded demo content, clearly labelled as placeholder
- Admin user guide written for non-technical staff
- Deployment and environment setup guide
- Testing report (accessibility, performance, security, cross-browser, RTL)
- A list of every item marked [REVIEW REQUIRED]

## 91. Documentation

Create and maintain:

- `docs/MASTER_PROMPT.md` (this file)
- `docs/PROGRESS.md`
- `docs/lovegiver-architecture-audit.md`
- `docs/caregiver-content-audit.md`
- `docs/caregiver-to-jarkabi-content-map.md`
- `docs/jarkabi-architecture.md`
- `docs/content-architecture.md`
- `docs/database-design.md`
- `docs/security-model.md`
- `docs/role-permissions.md`
- `docs/rls-policies.md`
- `docs/styling-strategy.md`
- `docs/licensed-assets.md`
- `docs/photo-shotlist.md` (only if some photos could not be sourced)
- `docs/deployment.md`
- `docs/environment-variables.md`
- `docs/roadmap.md`

## 92. Quality Review

Before completing each phase, evaluate the site as:

- A daughter searching urgently for care for her mother, on her phone
- A senior researching care for themselves
- A hospital discharge planner
- A physician referring a patient
- A social worker
- A nurse or PSW considering employment
- A family comparing several agencies
- A French-speaking visitor
- A Tigrinya-, Arabic-, Mandarin-, Punjabi- or Spanish-speaking family member
- A screen-reader user
- A potential national expansion partner

Ask: Does the organization look trustworthy? Does it feel compassionate? Does it appear professionally run? Is clinical care presented responsibly? Are the services clear? Can I find my city? Can I use the site in my language? Can I understand how to pay? Can I contact them immediately? Would I trust them inside my family member's home? Could this become a major Canadian home-care organization?

If any answer is no, improve it and report what you changed.

## 93. Development Standard

Production-quality work only. No: Lorem Ipsum, dead links, fake testimonials, fake credentials, broken buttons, placeholder functions pretending to work, poor mobile layouts, unfinished pages or hard-coded content that should be editable.

Every visible action must work correctly or be clearly labelled as a future capability.

## 94. Final Architecture

```
                         JARKABI.CA
                              │
                              ▼
                           VERCEL
                              │
                       Next.js + React
                              │
         ┌────────────────────┼────────────────────┐
         │                    │                    │
         ▼                    ▼                    ▼
  PUBLIC WEBSITE        SECURE PORTALS           ADMIN
         │                    │                    │
 Home                    Client                 Operations
 About                   Family                 Scheduling
 Services                Caregiver              Staffing
 Locations               Nurse                  Billing
 Careers                 Staff                  Reports
 Resources               Care Plans             Recruitment
 Blog                    Visit Notes            Settings
 Contact                 Messages               Content (CMS)
 Request Care            Documents
                         Schedules
                         Invoices
         │                    │                    │
         └────────────────────┼────────────────────┘
                              │
                              ▼
                     SUPABASE CANADA
                              │
                ┌─────────────┼─────────────┐
                ▼             ▼             ▼
              AUTH        POSTGRESQL      STORAGE


DEVELOPMENT PIPELINE:

LICENSED LOVEGIVER
        +
LICENSED CARE GIVER CONTENT
        │
        ▼
      CURSOR
        │
        ▼
      GITHUB
        │
        ▼
      VERCEL
        │
        ▼
     JARKABI.CA
```

## 95. Final Content Rule

The final Jarkabi site should NOT look like Lovegiver with generic placeholder writing, and it should have no grey image placeholders.

The goal is Lovegiver's Next.js/React foundation combined with the strongest relevant licensed Care Giver articles, messages, writing, service descriptions and information, transformed into Jarkabi Home Care.

Where Care Giver contains useful home-care material, preserve and migrate it. Where it contains Care Giver-specific facts, company history, testimonials, statistics or claims, or wording from other real companies, do not attribute them to Jarkabi. The result should retain the depth and warmth of the Care Giver content while becoming factually and visually appropriate for Jarkabi Home Care.

## 96. Final Objective

Do not build an ordinary home-care website. Build **Jarkabi Home Care** as a premium Canadian home-care **brand and digital platform** that begins locally in Ottawa and grows into a trusted national organization.

The experience should communicate: **Local Heart + Clinical Professionalism + Canadian Scale + Cultural Inclusivity + Premium Design + Technological Sophistication.**

**Most important requirement: build once, expand continuously.** Moving from Ottawa → Ontario → multiple provinces → Canada-wide must never require rebuilding the platform. Content, services, teams, pricing, contact information, languages, regulatory wording, careers and locations must all be independently manageable by province and city, while keeping the warmth and trust of a local care provider.

Transform my licensed Lovegiver template into Jarkabi Home Care using Cursor for development, GitHub for source control, Vercel for deployment, Next.js + React for the website and application, Supabase Canada Central for authentication, PostgreSQL and storage, and my licensed Care Giver template as an important source for the articles, written information, messages, service descriptions, educational content, marketing copy and selected visual ideas I want preserved. The final website should have the technical strength of Lovegiver/Next.js while retaining the richer home-care content and messaging I like from Care Giver.

## 97. First Task to Execute

Start ONLY with the audit and migration-planning stage (Phases 1 and 2). Do not begin building the secure portal yet.

1. Initialize Git and commit the untouched Lovegiver template.
2. Inspect the entire Lovegiver project.
3. Confirm Lovegiver runs and builds successfully (`npm install`, `npm run dev`, `npm run build`), and report any errors.
4. Inspect every Care Giver page and local licensed content file.
5. Extract an inventory of all meaningful headings, paragraphs, articles, messages, FAQs, service descriptions and CTA copy.
6. Identify all Care Giver company-specific statements, and any wording from other real companies, that cannot be transferred directly.
7. Create `docs/lovegiver-architecture-audit.md` and `docs/caregiver-content-audit.md`.
8. Create `docs/caregiver-to-jarkabi-content-map.md` and map each useful content block to its destination in Jarkabi.
9. Identify images/assets legally included in the local licensed packages, list every grey placeholder or image slot that will need a photo, and start `docs/licensed-assets.md`.
10. Present the migration plan, then stop and wait for my approval before performing large-scale content replacement.
