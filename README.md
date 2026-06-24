# Medscribe Web

Marketing homepage for [Medscribe](../README.md) — a privacy-first, on-device medical companion for iOS.

Built with [create-t3-app](https://create.t3.gg/) (Next.js + TypeScript + Tailwind). Single-page site; no database or API routes.

Uses **bun** exclusively (`bun.lock`).

## Development

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
bun run build
bun run start
```

Screenshots live in `public/screenshots/`. They are wrapped in an iPhone-style frame via [`react-device-mockup`](https://github.com/jung-youngmin/react-device-mockup).

### Capturing raw screenshots for the site

Export **in-app content only** from the simulator or device — no simulator chrome or macOS capture toolbar. A normal in-app iOS status bar/tab bar is fine.

1. Run the app on **iPhone 17 Pro** (or 16 Pro) simulator or device.
2. Capture each screen (⌘S in Simulator saves to Desktop).
3. Drop PNGs into `public/screenshots/` and update paths in `src/app/page.tsx` / `src/components/feature-showcase.tsx`.

The frame dimensions assume tall iPhone screenshots and are controlled in `src/components/phone-mockup.tsx`. Use `captureMode="simulator"` only for old captures that already include device chrome.
