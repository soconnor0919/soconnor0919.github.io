# Medscribe pendant SD-app preview

`app.c` is an actual ABI 1 SD/Wasm application using the paperOS public SDK.
The native host loads its package through the SD loader and WAMR, then renders
its UI with C/LVGL at 200 × 200 pixels. The CAD renderer uses these framebuffer
captures as textures; no browser-drawn UI substitutes for the running app.

The default screen is a compact fictional Alex Morgan Know Me card with
allergies and a reserved 555 caregiver contact. A brief Select on the idle card
does nothing. `PAPER_INPUT_SELECT_HOLD` opens a local caregiver-request state
showing “Waiting for phone”; Select cancels and restores the last page.
The lower Next control (`PAPER_INPUT_DOWN` or `PAPER_INPUT_DOWN_HOLD`) cycles
and wraps five pages: allergies/card, medications, contacts, preferences, and
conditions. Next does nothing while a request is pending.

Nothing sends a notification, makes an emergency call, or contacts a caregiver.
There is no notification transport or cellular service. A phone relay,
delivery acknowledgement, remote cancellation, and failure handling are future
engineering work. The UI labels the upper key for help and lower key for the next page; the CAD concept
uses the vendor case's two side controls and has no front HELP button. The
logical SDK hold/select preview has no implemented mapping to actual board
GPIOs. No cloud AI is introduced.

## Build, capture, and inspect

From `web/`, use the sibling paperOS checkout's existing wasi-sdk, dependencies,
and configured `.build/debug` CMake backend:

```sh
../../paperOS/.build/case-venv/bin/python pendant-app/run.py
```

The runner compiles the `org.medscribe.pendant` SD package, builds the native
host, loads the Wasm module, and asserts that a brief idle Select does not
request help, the SDK hold event opens the pending request, and Select cancels.
It also verifies five-page navigation, wraparound, the pending-state Next
guard, and restoration of the last page after cancellation.
It captures raw 200 × 200 framebuffer PGM files and converts
them to PNG without redrawing the UI. Outputs stay in ignored
`pendant-cad/build/`, including the SD ZIP, package directory, build metadata,
native runner, and `screen-{card,medications,contacts,preferences,conditions,request}.png`.

For a native interactive window, or an existing configured sanitizer backend:

```sh
../../paperOS/.build/case-venv/bin/python pendant-app/run.py --interactive
../../paperOS/.build/case-venv/bin/python pendant-app/run.py --sanitize
```

The interactive launcher uses an isolated SD-directory copy. Holding Return
for 800 ms emits the SDK hold event; tapping Return cancels a pending request.
Down advances to the next page when no request is pending.
The host demonstrates the actual app and SDK
renderer, not ESP32 instruction emulation, radio delivery, microphone capture,
physical button timing, or real e-paper behavior. No board installation occurs.

See [the pendant CAD workflow](../pendant-cad/README.md) for the separate
`uv` environment, CAD build, local HTTP server, and Bun render-capture command.
The reconstructed vendor-PDF case has a separate rear necklace clip; local
render assets are written under `public/device/pendant-v4/`. The public website presents static render assets without a demo interface.
The local CAD studio separately replays captured screens with projected button
hit areas and toolbar controls. It does not run Wasm in the browser. The native
simulator continues to run the real SD app, including help, cancellation, and
page navigation. Neither preview implements caregiver delivery.
