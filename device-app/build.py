"""Compile the actual SD app with the paperOS SDK; no board installation."""
from pathlib import Path
import argparse, hashlib, json, shutil, subprocess, sys, zipfile

HERE = Path(__file__).resolve().parent
p = argparse.ArgumentParser(description=__doc__)
p.add_argument("--paperos", type=Path, default=HERE.parents[2] / "paperOS")
p.add_argument("--waveform-demo", action="store_true", help="Include explicitly simulated waveform for laptop promotional captures")
a = p.parse_args()
root = a.paperos.resolve()
out = HERE.parent / "device-cad/build/sd-apps/org.medscribe.companion"
out.mkdir(parents=True, exist_ok=True)
clang = root / ".build/tools/wasi-sdk-25.0-arm64-macos/bin/clang"
subprocess.run([str(clang), "--target=wasm32-wasip1", "-O2", "-mno-reference-types", "-mno-bulk-memory", "-nostdlib", "-ffreestanding", "-fno-builtin", "-DPAPER_SD_BUILD=1",
    *(["-DMEDSCRIBE_WAVEFORM_DEMO=1"] if a.waveform_demo else []), "-I" + str(root / "apps"), "-I" + str(root / "apps/compat"), "-I" + str(root / "firmware/runtime/include"),
    str(HERE / "app.c"), str(root / "apps/paper_libc.c"), "-Wl,--no-entry", "-Wl,--strip-all", "-Wl,--initial-memory=131072", "-Wl,--max-memory=131072", "-Wl,-z,stack-size=16384", "-o", str(out / "app.wasm")], check=True)
data = (out / "app.wasm").read_bytes()
h = 2166136261
for byte in data:
    h = ((h ^ byte) * 16777619) & 0xffffffff
(out / "manifest.paper").write_text(f"id=org.medscribe.companion\ntitle=Medscribe\nabi=1\nversion=3\nicon=4\nmodule_bytes={len(data)}\nmodule_hash={h}\npermissions=storage,device,companion,audio\n")
for name in ("icon.paper", "logo.paper"):
    shutil.copyfile(HERE / "assets" / name, out / name)
sys.path.insert(0, str(root / "apps/tools"))
from bundle import write_package
write_package(out)
archive = out.parents[1] / "medscribe-sd-app.zip"
with zipfile.ZipFile(archive, "w", zipfile.ZIP_DEFLATED) as z:
    for name in ("manifest.paper", "app.wasm", "icon.paper", "logo.paper"):
        z.write(out / name, "apps/org.medscribe.companion/" + name)
(out.parents[1] / "sd-app-build.json").write_text(json.dumps({"package": "device-cad/build/medscribe-sd-app.zip", "source": "device-app/app.c", "simulated_waveform": a.waveform_demo, "module_bytes": len(data), "module_sha256": hashlib.sha256(data).hexdigest(), "module_fnv1a": h}, indent=2) + "\n")
print(f"Built real SD/Wasm app: {len(data)} bytes; {archive}")
