"""Build/load/run the real SD module in paperOS C/LVGL + WAMR and capture it."""
from pathlib import Path
import argparse, json, os, plistlib, shutil, subprocess, sys
from PIL import Image

HERE=Path(__file__).resolve().parent
p=argparse.ArgumentParser(description=__doc__)
p.add_argument("--paperos",type=Path,default=Path(os.environ.get("PAPEROS_ROOT",HERE.parents[2]/"paperOS")))
p.add_argument("--interactive",action="store_true",help="Open the running SD app in a native SDL window")
p.add_argument("--sanitize",action="store_true",help="Run the host capture with ASan and UBSan")
a=p.parse_args()
root=a.paperos.resolve();build=root/(".build/sanitize" if a.sanitize else ".build/debug")
out=HERE.parent/"pendant-cad/build";out.mkdir(parents=True,exist_ok=True)
subprocess.run([sys.executable,str(HERE/"build.py"),"--paperos",str(root)],check=True)
subprocess.run(["cmake","--build",str(build),"--target","paper-backend","--parallel","6"],check=True)
command=["cc","-std=c11","-DLV_CONF_INCLUDE_SIMPLE","-DLV_LVGL_H_INCLUDE_SIMPLE","-DLV_CONF_PATH="+str(root/"firmware/runtime/lv_conf.h")]
if a.sanitize:command += ["-fsanitize=address,undefined","-fno-sanitize-recover=undefined","-fno-omit-frame-pointer"]
for directory in [root/"firmware/runtime/include",root/"firmware/runtime/src/simulator",root/"firmware/runtime",root/".build/vendor/lvgl-9.2.2"]:
    command.append("-I"+str(directory))
command.append(str(HERE/"run-capture.c"))
for library in ["libpaper-backend.a","libpaperos.a","libpaper-runtime.a","libboardkit.a","lib/liblvgl.a","wamr-build/libpaper-wamr.a"]:
    command.append(str(build/library))
binary=out/("medscribe-sd-live" if a.interactive else "medscribe-sd-capture-sanitize" if a.sanitize else "medscribe-sd-capture")
sd_directory=out/"sd-apps"
if a.interactive:
    sd_directory=out/"live-sd-apps"
    shutil.copytree(out/"sd-apps",sd_directory,dirs_exist_ok=True)
    app=out/"Medscribe Pendant Simulator.app"
    binary=app/"Contents/MacOS/MedscribeSD"
    binary.parent.mkdir(parents=True,exist_ok=True)
    (app/"Contents/Info.plist").write_bytes(plistlib.dumps({"CFBundleExecutable":"MedscribeSD","CFBundleIdentifier":"dev.medscribe.pendant-simulator","CFBundleName":"Medscribe Pendant Simulator","CFBundlePackageType":"APPL","CFBundleVersion":"1","NSHighResolutionCapable":True}))
    command += ["-DMEDSCRIBE_INTERACTIVE","-DMEDSCRIBE_DEFAULT_SD_DIR="+json.dumps(str(sd_directory)),"-DMEDSCRIBE_DEFAULT_OUT_DIR="+json.dumps(str(out)),"-I/opt/homebrew/include/SDL2","-L/opt/homebrew/lib","-lSDL2"]
command += ["-lm","-o",str(binary)]
subprocess.run(command,check=True)
subprocess.run([str(binary),str(sd_directory),str(out)]+(["--interactive"] if a.interactive else []),check=True)
for source in out.glob("screen-*.pgm"):
    Image.open(source).convert("RGB").save(source.with_suffix(".png"))
