# Medscribe companion CAD and local UI captures

This is a separate, editable copy of the paperOne V22.5 assembly from
`paperOS/firmware/hardware/case/paperone-v22-fit-feedback`. The sibling paperOS
CAD and its firmware are not modified. Source checksums are recorded in the
build validation report. The existing enclosure work preserves the original
FolloUp/Waveshare control geometry and its source attribution; electronics and
internal component models remain visualization proxies.

The display textures are captures of an **actual SD/Wasm app** executed by the
paperOS SD loader, WAMR interpreter, and native C/LVGL renderer. App source,
package builder, native window, fixture boundaries, and validation are documented
in [device-app/README.md](../device-app/README.md). The former HTML UI preview
has been removed. No screenshot is drawn by a browser mockup.

## Reproduce

From `web/`, use a Python environment with `numpy`, `trimesh`, `manifold3d`,
and Pillow. The existing paperOS case environment already has these packages.
The capture script uses this project's Puppeteer/Sharp dependencies and local
Chrome; set `CHROME_PATH` if Chrome is installed elsewhere.

Start the local studio server:

```sh
python3 -m http.server 3110 --bind 127.0.0.1
```

In another shell, still from `web/`:

```sh
CAD_PYTHON=../../paperOS/.build/case-venv/bin/python bun scripts/device-preview/capture.mjs
```

Alternatively point `CAD_PYTHON` at any Python environment with those packages.
The script compiles the real SD app, loads and runs it in paperOS C/LVGL +
WAMR, validates navigation and OS consent, and captures eight actual framebuffer
screens, including recording, an animated simulated waveform, and saved state. It then builds the CAD copy, renders the textured model through local
WebGL, and publishes four transparent WebPs and the underlying selected screen
PNGs into `public/device/pearl-v5/`. No image-generation tool or remote renderer is used.
Use the native app's interactive command in `device-app/README.md` to operate it.

The CAD studio is at `http://127.0.0.1:3110/scripts/device-preview/render.html`.
Drag to inspect the actual geometry. Add `?screen=recording`, `?screen=card`, or `?screen=connect`
to change the captured display texture.

## Editable outputs

Generated outputs stay in ignored `build/`:

- `medscribe-assembled.glb`: full assembly, modelled Medscribe front/back
  inlays, and the captured Medscribe recording screen embedded in the display material.
- `medscribe-shell.stl`, `medscribe-shell-text.stl`, `medscribe-cover.stl`,
  `medscribe-back-text.stl`: independently editable/printable rebranded parts
  in the original assembly coordinates, in millimetres.
- `screen-*.png`: unretouched 480 × 800 framebuffer captures of the actual SD app in the native simulator.
- `render-*.png`: transparent 2400 × 2400 renders of the CAD geometry.
- `meshes.json`: local studio mesh buffers; not part of the public website.
- `cad-validation.json`: source hashes, mesh checks, bounds, and inlay intersection.

The front mark is 14 mm wide; the rear mark is 18 mm wide. The old lettering
recesses are filled within the original flat bezel/back surfaces before the
new marks are cut and separate flush inlays are exported. The exterior shell
bounds remain unchanged. This is digital CAD validation, not a physical-fit,
material, or manufacturing validation.

The public site uses static renders only. It does not download the CAD assembly
or run the local simulator. `public/device/pearl-v5/provenance.json` identifies the
actual sources, build command, and output hashes.

The case is near-white mint with smaller deep teal logo inlays. The GLB embeds a seeded
polymer-grain base-color texture and a roughness of 0.88; the local WebGL render
uses deterministic fine grain on the case and a satin finish on the logos.
These are material previews, not changes to printable solid geometry.
