# Medscribe Web

Marketing homepage for [Medscribe](../README.md) — a privacy-first, on-device medical companion for iOS and Android.

Built with [create-t3-app](https://create.t3.gg/) (Next.js + TypeScript + Tailwind). Single-page site; no database or API routes.

Uses **bun** exclusively (`bun.lock`).

## Development

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Analytics (optional)

Set in `.env` (see `.env.example`):

- `NEXT_PUBLIC_UMAMI_WEBSITE_ID` — website UUID from your Umami dashboard
- `NEXT_PUBLIC_UMAMI_SCRIPT_URL` — optional; defaults to `https://cloud.umami.is/script.js` (use your self-hosted URL if needed)

Leave the website ID unset to disable tracking (default for local dev).

## Build

```bash
bun run build
bun run start
```

Screenshots live in `public/screenshots/`. They are wrapped in an iPhone-style frame via [`react-device-mockup`](https://github.com/jung-youngmin/react-device-mockup).

### Capturing raw screenshots for the site

Export **in-app content only** from the simulator or device — no simulator chrome or macOS capture toolbar. A normal in-app status bar/tab bar is fine.

1. Run the app on **iPhone 17 Pro** (or 16 Pro) simulator or device, or on an **Android** emulator/device.
2. Capture each screen (⌘S in Simulator saves to Desktop; `adb exec-out screencap -p` on Android).
3. Drop PNGs into `public/screenshots/` and update paths in `src/app/page.tsx` / `src/components/feature-showcase.tsx`.

The frame dimensions assume tall iPhone screenshots and are controlled in `src/components/phone-mockup.tsx`. Use `captureMode="simulator"` only for old captures that already include device chrome.
