# Google Search Console — jarkabi.ca

Verify **jarkabi.ca** in [Google Search Console](https://search.google.com/search-console) so indexing, sitemap status, and search performance are visible.

## 1. Add the property

1. Open Search Console → **Add property**
2. Choose **URL prefix**: `https://jarkabi.ca`
3. Select **HTML tag** verification

Google shows a meta tag like:

```html
<meta name="google-site-verification" content="YOUR_TOKEN_HERE" />
```

Copy only the **content** value (`YOUR_TOKEN_HERE`).

## 2. Set the Vercel environment variable

| Variable | Value |
|----------|--------|
| `GOOGLE_SITE_VERIFICATION` | Token from the meta tag (content attribute only) |

Add for **Production**, **Preview**, and **Development** if you want verification on preview URLs too.

Redeploy after saving. The site injects verification via `src/lib/google-search-console.ts` in the locale layout metadata.

## 3. Confirm verification

1. Redeploy production
2. View page source on `https://jarkabi.ca/en` — confirm the verification meta tag is present
3. Click **Verify** in Search Console

## 4. Submit the sitemap

After verification:

1. Search Console → **Sitemaps**
2. Submit: `https://jarkabi.ca/sitemap.xml`

The sitemap includes all eight public locales (`en`, `fr`, `ti`, `ar`, `am`, `zh`, `es`, `hi`).

## 5. Ongoing checks

- **Coverage / Pages** — confirm key URLs are indexed without errors
- **Core Web Vitals** — monitor LCP, INP, CLS on mobile
- **International targeting** — hreflang alternates are emitted for all locales via `buildLanguageAlternates`

---

*Legal pages remain draft until counsel approval; do not request indexing of placeholder legal copy before review.*
