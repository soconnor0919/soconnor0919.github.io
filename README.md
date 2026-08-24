# Medscribe Web

Public product website for [Medscribe](../README.md) — a private,
patient-controlled care companion for iOS and Android.

Built with [create-t3-app](https://create.t3.gg/) (Next.js + TypeScript +
Tailwind).

Uses **bun** exclusively (`bun.lock`).

## Development

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

Public routes include:

- `/` — consumer-first portable-context story, including Questions
- `/how-it-works` — review loop, medication maintenance, Questions, and handoff
- `/privacy` — plain-language privacy and patient-control commitments
- `/access` — health-data-free access request

Named partner print material remains isolated and excluded from search:

- `/briefs/northwell`
- `/cvs`
- `/walgreens`

Legacy routes redirect to the current public experience and are excluded from
search.

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

Screenshots live in `public/screenshots/`. Every route uses the same fresh,
precomposited iPhone product-bezel assets in
`public/screenshots/product-bezel-2026-08-23-complete/`; there are no raw or CSS-framed
product captures in the rendered site. The versioned path keeps newly captured
UI from being hidden by stale browser or image-optimizer caches.
Public pages label product imagery as an illustrative profile and Medscribe
interface.

### Capturing raw screenshots for the site

Export **in-app content only** from the simulator or device — no simulator chrome or macOS capture toolbar. A normal in-app status bar/tab bar is fine.

1. Run the app on **iPhone 17 Pro** (or 16 Pro) simulator or device, or on an **Android** emulator/device.
2. Capture each screen (⌘S in Simulator saves to Desktop; `adb exec-out screencap -p` on Android).
3. Composite each 1206 × 2622 PNG into a 1350 × 2760 product bezel at offset
   `+72+69`, export the transparent WebP, and update the shared versioned asset
   directory referenced by the routes.

Product images are composited at the bezel source size of 1350 × 2760 with
transparent backgrounds and rendered responsively through
`src/components/product-device.tsx`; the smaller `PhoneMockup` wrapper reuses
that same component. The homepage uses CSS view timelines for
scroll-scrubbed device and chapter motion on desktop and mobile, with a static
fallback and a reduced-motion override.
