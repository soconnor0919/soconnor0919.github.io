# Medscribe pendant concept

Local necklace-form study around the Waveshare ESP32-S3-ePaper-1.54G. The
case exterior is reconstructed from the vendor PDF at 39.8 × 53 × 16.9 mm,
with softened R8 corners and 1.6 mm edge radii and a 27 × 27 mm display centered 1.3 mm above the case
center. Actual 200 × 200 SD-app framebuffer captures fill the display.
The clean front has a lower-bezel Medscribe logo and no HELP button. Two
right-side BOOT/PWR controls, bottom USB, top speaker openings, SD slot, and
side microphone follow the vendor case reference. A separate rear pendant
clip and cord adapt the case for the necklace concept.
The continuous curved neck cord is approximately 393 mm long, threads through
the rear attachment, and includes a separate breakaway-clasp study. The earlier
metal connector and knot are removed. Solid intersection checks verify zero
cord overlap with the shell, back, rear clip, and both side buttons. These are
visual engineering studies, not validated wearable safety components.

## Mechanical source and limits

The unchanged vendor drawing ZIP and PDF are retained in `source/`. The original
STEP is preserved inside the ZIP; the build reads and hashes it there, avoiding
a redundant uncompressed copy in Git.
They come from the vendor's [linked dimensions archive](https://github.com/waveshareteam/ESP32-S3-ePaper-1.54G/tree/main/Hardware/dimensions).
That archive includes a touch-labelled, board-only STEP, not original case
CAD. The enclosure is reconstructed from the dimensioned PDF; it is not the
vendor's original case solid or proof of physical fit. The generated provenance records the
source STEP hash and reference envelope. The original vendor files are not
overwritten.

The enclosure is an editable concept, not a physically validated wearable.
Board fit, button electronics, battery packaging, antenna clearance, sealing,
lanyard strength, and a suitable breakaway clasp require engineering and
physical validation. No board is flashed by this workflow.

## Reproduce locally

From `web/`, create an isolated CAD environment:

```sh
uv venv pendant-cad/build/venv
uv pip install --python pendant-cad/build/venv/bin/python cadquery trimesh manifold3d pillow
```

First run the real SD app using the sibling paperOS checkout's existing
dependencies and configured CMake debug backend. Then build the CAD using its
captured screen textures:

```sh
../../paperOS/.build/case-venv/bin/python pendant-app/run.py
pendant-cad/build/venv/bin/python scripts/pendant-preview/build.py
python3 -m http.server 3110 --bind 127.0.0.1
```

In another shell, still from `web/`, with this project's Bun dependencies and
Google Chrome installed at its standard macOS location:

```sh
bun scripts/pendant-preview/capture.mjs
```

The local [CAD studio](http://127.0.0.1:3110/scripts/pendant-preview/render.html)
renders geometry through WebGL. `?screen=request` selects the pending-request
texture; `?screen=card&angle=front` selects the frontal card view. No image
generation service or remote renderer is used.
Mouse hit areas projected from the CAD controls and a keyboard toolbar replay
the captured page/request states; the studio does not run Wasm in the browser.

## Outputs

Ignored `build/` contains `medscribe-pendant.step`, `medscribe-pendant.glb`,
`front.stl`, `back.stl`, `pendant-clip.stl`, mesh buffers, raw screen captures,
rendered PNGs, and provenance. STEP/STL dimensions are in millimetres; GLB
geometry is exported in metres. The GLB embeds the captured card screen.
The capture script writes eight WebPs (five card pages, pending request,
front, and full necklace), six screen PNGs, projected `controls.json`, and
provenance under `public/device/pendant-v4/`. These files are prepared locally; creating them
does not deploy a website.

The display runs the [actual pendant SD app](../pendant-app/README.md).
Holding Return for 800 ms in the native host opens the local “Waiting for
phone” demonstration; a brief idle Select does nothing, and Select cancels a
pending request and restores the last page. Lower Next cycles and wraps the
five card pages, and is blocked while pending. Host assertions check these
transitions in the actual C app. The website uses static capture images in an overlapping product composition
and a pendant section, without demo controls, a browser Wasm runtime, or
implemented GPIO mapping. There is no
notification transport, cellular connection, caregiver delivery, or emergency
dispatch. Future phone relay, acknowledgement, cancellation delivery, and
failure handling require implementation and verification. No cloud AI is
introduced.
