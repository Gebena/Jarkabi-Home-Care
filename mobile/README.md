# Jarkabi Home Care — Mobile App

The website is a **Progressive Web App (PWA)** installable on iOS and Android from the browser, and can be wrapped with **Capacitor** for App Store / Google Play distribution.

## Option 1: Install as PWA (recommended for launch)

1. Deploy the website to `https://jarkabi.ca`
2. On mobile, open the site in Chrome (Android) or Safari (iOS)
3. Use **Add to Home Screen** / **Install App**
4. The app opens full-screen with offline shell caching

## Option 2: Capacitor native wrapper

Requires the production site to be live (Capacitor loads `https://jarkabi.ca`).

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios
npx cap init "Jarkabi Home Care" ca.jarkabi.homecare --web-dir=out
npx cap add android
npx cap add ios
npx cap sync
npx cap open android   # or ios (macOS + Xcode required)
```

Set `CAPACITOR_SERVER_URL` in `.env` for staging previews.

## Mobile UX features

- Sticky bottom bar: **Call** + **Request Care**
- Touch-friendly forms and large tap targets
- RTL layout for Arabic (`/ar/...`)
- 7-language selector
- Safe-area padding for notched devices
