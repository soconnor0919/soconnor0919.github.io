# Medscribe Web

Public product website for [Medscribe](../README.md) — a privacy-first,
on-device medical companion in internal beta on iOS and Android.

Built with [create-t3-app](https://create.t3.gg/) (Next.js + TypeScript +
Tailwind). There is no product database or beta-form backend.

Uses **bun** exclusively (`bun.lock`).

## Development

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

The first public product slice includes:

- `/` — consumer-first portable-context story
- `/how-it-works` — inputs, review loop, medication maintenance, and handoff
- `/privacy` — data map, sharing limitations, and evidence boundaries
- `/beta` — expectations and a health-data-free email request

Named partner print material remains isolated and excluded from search:

- `/briefs/northwell`
- `/cvs`
- `/walgreens`

`/executive-summary` and `/landscape` remain retired/internal and are also
excluded from search. `SITE_PASSWORD` still gates the entire site when set; a
future pass should make protection route-specific before the public site is
deployed alongside private briefs.

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

Screenshots live in `public/screenshots/`. The long-form homepage uses
precomposited, transparent iPhone product-bezel assets in
`public/screenshots/pitch/`; supporting pages use the lightweight CSS frame.
Public pages label product imagery as synthetic demo data and beta UI.

### Capturing raw screenshots for the site

Export **in-app content only** from the simulator or device — no simulator chrome or macOS capture toolbar. A normal in-app status bar/tab bar is fine.

1. Run the app on **iPhone 17 Pro** (or 16 Pro) simulator or device, or on an **Android** emulator/device.
2. Capture each screen (⌘S in Simulator saves to Desktop; `adb exec-out screencap -p` on Android).
3. Drop PNGs into `public/screenshots/` and update paths in the relevant route
   or `src/components/feature-showcase.tsx`.

The CSS frame dimensions assume tall iPhone screenshots and are controlled in
`src/components/phone-mockup.tsx`. Use `captureMode="simulator"` only for old
captures that already include device chrome. Homepage product images are
composited separately at 810 × 1656 with transparent backgrounds and rendered
through `src/components/product-device.tsx`.
