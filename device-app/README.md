# Medscribe SD app

`app.c` is an actual ABI 1 SD/Wasm application built with the paperOS public SDK.
It is not an HTML recreation. `build.py` compiles it with wasi-sdk, writes a
hash-checked `org.medscribe.companion` manifest, retains the existing Medscribe
package artwork, and creates an installable SD ZIP. No board is modified.

The app provides appointment recording through the OS consent/session API,
a reviewed Know Me resting card read through the companion service, physical navigation,
and phone connection/private pairing through the existing SDK. Recording,
encryption, storage, pairing secrets, and consent remain OS-owned. No cloud AI
or direct microphone/network access is introduced.

This is a separate app source/package for the Medscribe product preview; it
does not overwrite the existing paperOS Medscribe source or install over any
existing package on a real card. It uses the same stable package ID, so a later
physical installation must be treated as an intentional app update.

## Run on the laptop

From `web/`, with the sibling paperOS checkout's dependencies and CMake debug
build available:

```sh
../../paperOS/.build/case-venv/bin/python device-app/run.py --interactive
```

This builds the SD package, links a native simulator window against the actual
paperOS C/LVGL backend and WAMR interpreter, discovers the package from its SD
directory, and runs its Wasm exports through the SDK. Use **Up / Down / Enter /
Escape**. The window is `device-cad/build/Medscribe SD Simulator.app`; its SD
directory is an isolated copy under `device-cad/build/live-sd-apps`. It opens
on Know Me; use physical Back (Escape) to return to appointment controls.

Host service fixtures provide fictional reviewed-card content and simulated
device availability. The native window runs the actual guest app and SDK
renderer; it does not emulate ESP32 instructions or establish physical audio,
radio, encryption-at-rest, or panel behavior. No Mac microphone is accessed.

## Capture and validate

```sh
../../paperOS/.build/case-venv/bin/python device-app/run.py
../../paperOS/.build/case-venv/bin/python device-app/run.py --sanitize
```

The capture runner asserts that the SD catalog contains the package, WAMR has
loaded its module, its home/card/pagination/connection screens render, and the
OS consent dialog appears before a recording START can reach the fixture. It
also checks the recording screen, waveform animation, STOP, and saved result.
Raw 480 × 800 framebuffer PGM captures are converted losslessly to PNG; no UI is
drawn or substituted by the capture script. ASan/UBSan use paperOS's existing
`.build/sanitize` backend. Actual capture and radio behavior require separate
physical acceptance.

Outputs under `device-cad/build/` include `medscribe-sd-app.zip`,
`sd-apps/org.medscribe.companion/`, `sd-app-build.json`, the native runner, and
`screen-{home,card,card2,connect,consent,recording,recording-wave,saved}.{pgm,png}`. Build metadata records the
Wasm byte count, SHA-256, and manifest FNV-1a hash. Inputs come from `app.c` and
the checked-in `.paper` artwork copied from the existing Medscribe SD package.

See [the CAD workflow](../device-cad/README.md) to map these exact SD-app captures
onto the separately rebranded CAD assembly and rebuild website assets.

## Recording preview and larger controls

Native title/action text uses 32 px SDK fonts; body text uses 24 px. Action
recording controls are at least 88 px high; card navigation uses compact
56 px outlined controls with centered 24 px labels. The recording screen keeps Stop & save as its
only app action. The laptop runner explicitly builds with `--waveform-demo`:
48 bars animate at 1 Hz from fixed demonstration data and the screen shows
only the waveform, without a demo label in the product UI. The fixture timer is 1:14; no microphone is sampled.
A direct `build.py` invocation omits this demo waveform by default. Do not treat
the demo as measured audio amplitude or a physical recording verification.

## Know Me resting card

Know Me is the default SD app screen and returns after a recording is saved.
Use the sibling runtime source that implements the optional ABI 1
`PAPER_FULLSCREEN` flag; no physical firmware was updated for this preview.
The app uses that public mode to fill the real 480 × 800
panel without a clock, system footer, page buttons, or stale status information.
Pressing the physical center button opens the appointment actions; Back from
those actions returns to the card. The rocker can change pages if a phone sends
more than one page, but the preview contains a single complete card.

The Medscribe logo and Know Me title sit above Alex Morgan, allergies,
medications, conditions, care contact and number, support preferences, and the
care team and number. The patient name is centered at 32 px. The logo and 24 px Know Me title form a centered header above the name.
Six outlined rounded groups use public SDK section icons, 24 px uppercase
labels, and 24 px body text. All care information fits on the full-screen
480 × 800 panel.
The scheduled inhaler shows an absolute date and time for its next dose; the
as-needed inhaler has no scheduled dose. These are reviewed-card fixture values,
not inferred dosing advice or a live countdown. All content fits above the panel edge. No field is hidden
behind navigation controls. The name matches the iPhone appointment preview.

Laptop fixtures are fictional and use reserved 555 contact numbers. They are
not an actual patient's reviewed record or treatment guidance. The running
SD app verifies default card/wake/save transitions; physical power-off retention
and automatic board sleep are not claimed by these laptop captures.

The recording screen also uses fullscreen mode, removing the status strip and
footer while retaining the Stop & save control. It carries the bundled Medscribe logo. Its elapsed timer
uses regular Instrument Sans outlines rasterized directly at 96 px with 4×
supersampling, then sampled to the actual monochrome display. Numerals remain
about 72 px tall without magnifying the steps of a small bitmap font. Values
come from the OS recording-session position.

`generate-timer-font.py --font <InstrumentSans-Variable.ttf>` reproduces the
checked-in `timer-font.h`. It defaults to the installed product font in
`~/Library/Fonts`. The glyph source hash is retained in the header; its SIL Open
Font License is retained in `assets/InstrumentSans-OFL.txt`.
