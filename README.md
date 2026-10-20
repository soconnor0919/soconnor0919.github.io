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

Current phone screenshots live in `public/screenshots/native-marketing-2026-10-20-v2/`.
All marketing routes and partner print pages use this shared light/dark set,
captured from the native SwiftUI app on iPhone 18 Pro / iOS 27.0 with the
authored Alex Morgan diabetes/blood-pressure library. The nine screens cover Home, Visits, timestamped
visit dialogue, summary, Today medication logging, Metformin scheduling, Ask,
questions, and Know Me. No patient data or generated UI is included.

The existing calibrated Silver photographic bezel and display masks are retained
at 1350 × 2760 (1206 × 2622 screen, offset +72+69). This preserves consistent
framing; it is not a new iPhone 18 Pro hardware photograph. The versioned paths
prevent old optimizer caches from hiding the refresh. Older asset folders are
retained only as historical sources.

### Medscribe e-paper companion (October 15, 2026)

The `/device` page presents the companion and pendant in an overlapping hero
composition, with two concise product links below. `PendantSection` is a static
product story; it has no demo controls or clickable render. Updated renders
live under `public/device/pendant-v4/` and use captures from the actual 200 × 200
SD/Wasm app. The Know Me screen has a compact brand header, centered name,
allergy group, caregiver contact, and a quiet help/navigation footer.

The pendant retains the vendor's 39.8 × 53 × 16.9 mm envelope with softer R8
corners and 1.6 mm edge radii. A continuous approximately 393 mm cord threads
through the rear attachment aperture, without the earlier overlapping metal
connector and knot. Solid intersection checks assert that the cord clears the
shell, back, attachment, and both buttons. These are local geometry checks,
not physical-fit or wearable-safety validation.

The local CAD studio still replays captured screens, and the native WAMR host
runs the real app. Upper hold opens a pending help request, upper tap cancels,
and lower Next cycles five pages. No website interactivity is required for the
marketing imagery. There is no implemented board GPIO mapping, notification
transport, cellular service, or emergency dispatch. See `pendant-app/README.md`
and `pendant-cad/README.md` for reproduction and engineering limits.

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

Use Device Hub’s Camera button to export **in-app content only**, without macOS
or simulator chrome. Capture the nine names in both appearances at default text
size: `home`, `visits`, `visit-text`, `summary`, `medications`,
`medication-detail`, `ask`, `questions`, and `know-me`; append `-dark` for dark.
The current iPhone 18 Pro simulator exports 1206 × 2622 pixels.

With Pillow installed, compose the raw directory deterministically:

```bash
python3 scripts/phone-preview/compose-native.py /absolute/path/to/raw
```

The script retains the existing photographic frame and simulator-derived screen
alpha/Dynamic Island masks, exports transparent lossless WebP, and writes source
and output hashes to `public/screenshots/native-marketing-2026-10-20-v2/provenance.json`.
No hand-drawn corner approximation or image generation is used. The raw captures
for this refresh are in the local workspace’s `outputs/marketing-2026-10-20/raw`.

`ProductDevice` and `PhoneMockup` render the shared assets responsively. The
homepage retains its CSS view-timeline motion with reduced-motion fallbacks.
The device page now shows the current native Visits and timestamped transcript screens;
its copy no longer describes the older React Native knee-appointment fixture or
implies that these authored captures verify hardware import, ASR accuracy, or model generation quality.

The Know Me phone/companion composition uses the complete transparent companion
silhouette (`pearl-v5/medscribe-sd-card-cutout.webp`), trimmed from the existing
CAD render with transparent padding, rather than an overflow-clipped CSS crop.
The pendant story also includes planned appointment recording: Waveshare lists
an onboard microphone, ES8311 audio codec, and TF storage, but the current
pendant SD app implements the card/help UI only, without audio capture.

Device-page marketing copy presents the intended finished product in the present
tense, at the product owner’s direction. Both devices include recording in that
product story, and the pendant includes caregiver notification. This copy does
not establish implementation or physical validation: current pendant firmware
checks still cover the card/help UI only; transport and audio capture remain
unimplemented. CAD provenance and reproduction limits stay in technical docs.

### Authored marketing patient library

`native/scripts/marketing-fixture.py` creates a new isolated `DemoWorkspace` with
a fictional Alex Morgan, diabetes/hypertension/high cholesterol, an authored
77-second clinician/patient dialogue voiced locally, matching written transcript,
source-linked summary and chat, pharmacy questions, confirmed medication routines,
and Know Me fields. Metformin, lisinopril and atorvastatin match the visit; the
Metformin detail includes a bundled NIH/NLM example pill photograph. All contacts
and records are fictional. Review states and answers are presentation fixtures,
not claims of model generation or clinical validation. The source script and
generated `marketing-fixture.json` retain provenance; audio stays out of public assets.

Generate into a new directory, then inject into a Debug simulator as described in
`native/README.md`. Navigate and capture through Device Hub, checking both
appearances. No real patient library is modified.

The Know Me companion rendering is refreshed under
`public/device/pearl-marketing-2026-10-20/`, with the same three medications,
conditions, allergy and Taylor Morgan contact. `device-app/run-capture.c`
provides the fictional host card; `device-app/run.py` renders the actual WAMR
C/LVGL framebuffer. The local CAD studio now has a **Download transparent PNG**
control for computer-use exports. Artwork provenance records hashes and the
transparent trim, without implying physical hardware verification.

The pendant card is also recaptured from its actual 200 × 200 WAMR application
and existing CAD, under `public/device/pendant-marketing-2026-10-20/`, so Alex’s
allergy and Taylor’s contact agree across phone, handheld and pendant. These
marketing fixtures do not establish caregiver delivery or physical device behavior.
