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

- `/` — original Medscribe phone-app homepage and care-context story
- `/device` — dedicated e-paper companion, recording preview, Know Me card, and illustrated iPhone companion/transcription workflow
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

Existing phone screenshots live in
`public/screenshots/product-bezel-2026-08-24-unified-type/`. The device-page
appointment captures live in `public/device/phone-appointment-v5/`. Both use
the calibrated, precomposited iPhone 17 Pro bezel; there are no raw or
CSS-framed phone captures in the rendered site. The neutral Silver bezel and
the versioned path keep the imagery consistent and prevent stale optimizer
caches from hiding a new capture set.
The existing phone imagery retains its illustrative-profile labels. The new
appointment captures and device UI use fictional fixtures, with their origin
recorded in technical provenance.

### Medscribe e-paper companion (October 15, 2026)

The public website presents a Medscribe-branded, care-only hardware concept.
Visitors do not need the underlying paperOS/paperOne story. The original
app-focused homepage is restored. The dedicated `/device` page covers recording,
a reviewed Know Me card, and connection inside the Medscribe iPhone app.

`KnowMeSection`, after `HardwareSection`, explains keeping the companion with
you and handing it to a new clinician or care team, when words are difficult,
or during an unexpected visit. The hardware feature row highlights allergies,
medications, care contacts, and communication support. People choose and review
the card in Medscribe and update it as their needs change.
The section uses a heading, short introduction, and review/update note, without
a three-use-case list. One handheld Know Me card and one actual iPhone Emergency
record capture share one responsive stage: the phone sits behind on the right
at a 6-degree rotation, and the handheld overlaps in front on the left at
minus 6 degrees, with soft offset shadows. The shared caption reads “Carry it
on your companion. Review it in Medscribe.” The phone captures are
referenced under `public/device/phone-know-me-v1/`; the guarded
`scripts/phone-preview/seed-know-me.py` seeds matching fictional Alex Morgan
allergies, conditions, inhalers, and care contact in the dedicated iOS 27 preview
simulator. These fixtures do not verify a physical card transfer.

The current device import/card workflow is in the **native iPhone app**; do not
imply Android hardware support from the broader app's iOS/Android beta label.
Recording originals stay encrypted on the board; import and transcription are
explicit phone actions. The app works without the companion. Hardware is in
development, not available to order, and no ship date or battery-life claim is made.
The access route requests app-beta access, not a hardware order or reservation.

The hardware assets are **local renders of an edited CAD copy**, with real
480 × 800 framebuffer captures of an actual Medscribe SD/Wasm app as display
textures. No synthesized image is used. The device hero shows a recording
screen with a waveform generated from demonstration data; the second render shows Know Me.
The separately rebranded CAD has a near-white mint textured-polymer case
(RGB 234, 245, 238), with the smaller deep teal front/back logo inlays unchanged.
The original source CAD is preserved. The SD app runs locally in a native paperOS C/LVGL + WAMR
simulator window, using fictional service fixtures. The CAD studio is also local;
neither is a public website route. See [the actual SD app](device-app/README.md)
for its package, native launch command, and capture checks.

The real SD app opens on a full-screen Know Me resting card, without a clock,
footer, or on-screen buttons. The dense fictional page contains Alex Morgan's
allergies, medications, conditions, care contact, support preferences, and care
team phone numbers. The physical center button opens appointment actions;
Back from those actions and saving a recording return to the card. If multiple
received pages are present, the physical rocker changes pages.

The card has a centered ms logo and 24 px Know Me title group above the
centered 32 px patient name. Category headings are 24 px uppercase, with
24 px body text. Six outlined rounded groups with public SDK section icons
fit all care information on the full-screen 480 × 800 panel.
Its phone-reviewed fixture lists a scheduled Budesonide inhaler with
“Next dose: Oct 15 at 8 PM” and an Albuterol inhaler “as needed” with
“No scheduled dose.” These are supplied card values, not new medical advice,
a live countdown, or a scheduling engine.

Below the 1024 px desktop breakpoint, recording and card hardware photos appear
as a side-by-side pair in `HardwareSection`, with slight overlap,
rotations, and soft drop shadows. The separate hero image is hidden in this
stacked layout. Desktop keeps the separate hero and hardware-section renders.

See [the CAD/capture workflow](device-cad/README.md) for the editable source copy,
modelling script, local application, screenshot capture, model export, and
reproduction commands. `public/device/pearl-v5/provenance.json` records the source and
asset hashes. The separate rebranded GLB embeds the captured Medscribe screen;
STLs preserve the original assembly coordinates. The published renders are
transparent 2400 × 2400 WebPs served through Next's image pipeline. The original
image-generation asset has been removed from the website.

The sibling paperOS public SD API has a minimal `PAPER_FULLSCREEN` extension,
with SDK documentation updated, to support this resting card. The running WAMR
app verifies default-card, wake/action, consent, and save transitions. No board
was flashed; these checks do not establish physical power/sleep behavior or
e-paper panel retention. Deployed firmware, pairing, and native app data remain
unchanged.

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

### Device-page iPhone workflow

`CompanionAppSection` uses fresh captures of the actual Expo Medscribe app on
an iPhone 17 Pro simulator running iOS 27.0 (24A434), in light and dark mode.
The two screens show Alex Morgan's Visits list with six fictional appointments
(knee pain follow-up, asthma review, physiotherapy, annual checkup, eye exam,
and medication review), and playback of real local audio alongside its
timestamped transcript. The knee visit is marked as imported from the companion.
Assets and provenance live in
`public/device/phone-appointment-v5/`; reproduction scripts live in
`scripts/phone-preview/`.

The captures retain the visible Dynamic Island using display alpha and island
pixels captured with `simctl screenshot --mask=alpha`, stored under
`scripts/phone-preview/assets/`. Each 1206 × 2622 screen is placed at native
resolution at offset `+72+69` inside the existing 1350 × 2760 photographic
bezel. No hand-drawn corner mask is used.

The fictional knee osteoarthritis follow-up covers symptoms, the X-ray,
physiotherapy goals, and a six-week follow-up. The website presents screenshots
only, with no audio player or expandable conversation. Local speech-synthesized
audio remains inside the app for the playback capture; the public asset
directory contains no downloadable sample audio. The fixture records consent
25 seconds before recording begins; consent dialogue is excluded from the audio.

The fixture was seeded into a dedicated empty simulator. These captures show
the running app and local audio playback; they do not verify a physical
companion import or ASR accuracy. Transcript text was seeded from the same
fictional script, without model inference. The generated iOS lifecycle files
were patched locally for the iOS 27 preview; this does not change production app
behavior. Native hardware import remains in
`native/Medscribe/PaperCompanionView.swift`, which this website change does not
modify.
