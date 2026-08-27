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
- `/medscribe-corporate-partner-overview.pdf` — public eight-slide partner deck

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

### Optional preview password

The public site is open by default. To enable the private-preview gate, set
both values in the deployment environment:

```bash
SITE_PASSWORD_ENABLED="true"
SITE_PASSWORD="choose-a-strong-password"
```

Unset `SITE_PASSWORD_ENABLED` or set it to `false` to keep the site public. A
stored password alone does not enable the gate.

## Build

```bash
bun run build
bun run start
```

## GitHub Pages

Pushes to `master` also publish a static build to GitHub Pages through
`.github/workflows/deploy-pages.yml`. The Pages build keeps the public product
site and partner materials, while omitting the optional server-only password
gate and legacy redirect routes that cannot run on static hosting.

Screenshots live in `public/screenshots/`. Every route uses the same fresh,
precomposited iPhone 17 Pro assets in
`public/screenshots/product-bezel-2026-08-24-unified-type/`; there are no raw or
CSS-framed product captures in the rendered site. The neutral Silver bezel and
the versioned path keep the imagery consistent and prevent stale optimizer
caches from hiding a new capture set.
Public pages label product imagery as an illustrative profile and Medscribe
interface.

### Capturing raw screenshots for the site

Export **in-app content only** from the simulator or device — no simulator chrome or macOS capture toolbar. A normal in-app status bar/tab bar is fine.

1. Run the app on an **iPhone 17 Pro** simulator or device.
2. Capture each screen (⌘S in Simulator saves to Desktop).
3. Place each 1206 × 2622 capture at native size in the 1350 × 2760 Silver
   bezel at offset `+72+69`, clip it to the calibrated display-opening mask,
   and export a transparent, lossless WebP into the shared versioned asset
   directory referenced by the routes.

Product images are composited at the bezel source size of 1350 × 2760 with
transparent backgrounds and rendered responsively through
`src/components/product-device.tsx`; the smaller `PhoneMockup` wrapper reuses
that same component. The homepage uses CSS view timelines for
scroll-scrubbed device and chapter motion on desktop and mobile, with a static
fallback and a reduced-motion override.
