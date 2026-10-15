"""Frame real simulator captures with the simulator's native display mask."""
from pathlib import Path
import hashlib, json
from PIL import Image
WEB=Path(__file__).resolve().parents[2]
BUILD=WEB/'device-cad/build/phone-demo'
ASSETS=Path(__file__).parent/'assets'
OUT=WEB/'public/device/phone-know-me-v1';OUT.mkdir(parents=True,exist_ok=True)
frame_path=WEB/'public/screenshots/product-bezel-2026-08-24-unified-type/visits-natural.webp'
frame=Image.open(frame_path).convert('RGBA')
alpha=Image.open(ASSETS/'iphone17-pro-screen-alpha.png').convert('L')
island=Image.open(ASSETS/'iphone17-pro-island-mask.png').convert('L')
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
report={'method':'Actual iOS Simulator screenshots placed at native resolution in the existing photographic bezel, using the simulator-captured display alpha and Dynamic Island mask. No image generation.','frame_source':str(frame_path.relative_to(WEB)),'frame_sha256':sha(frame_path),'screen_offset':[72,69],'screen_size':[1206,2622],'screen_mask_source':'xcrun simctl io <preview> screenshot --mask=alpha; captured iPhone 17 Pro aperture and island pixels, no hand-drawn corner approximation','screen_alpha_sha256':sha(ASSETS/'iphone17-pro-screen-alpha.png'),'island_mask_sha256':sha(ASSETS/'iphone17-pro-island-mask.png'),'fixture':json.loads((BUILD/'fixture.json').read_text()),'appointment_count':6,'simulator_runtime':'iOS 27.0 (24A434)','device':'iPhone 17 Pro','consent_before_recording_seconds':25,'physical_import_verified':False,'captures':{}}
report.pop('appointment_count',None)
report.pop('consent_before_recording_seconds',None)
report['fixture']='Fictional Alex Morgan Know Me card seeded with seed-know-me.py; matches handheld name, allergies, conditions, medications, and care contact.'
for name in ['know-me','know-me-dark']:
    source=BUILD/(name+'.png')
    screen=Image.open(source).convert('RGBA')
    if screen.size!=alpha.size or screen.size!=(1206,2622):raise SystemExit(f'Wrong simulator screen size: {screen.size}')
    screen.paste((0,0,0,255),(0,0,*screen.size),island)
    screen.putalpha(alpha)
    result=frame.copy();result.alpha_composite(screen,(72,69))
    # Clear hidden RGB outside the physical frame before encoding/resampling.
    transparent=result.getchannel('A').point(lambda a:255 if a==0 else 0)
    result.paste((0,0,0,0),(0,0,*result.size),transparent)
    output=OUT/(name+'.webp');result.save(output,'WEBP',lossless=True,exact=True)
    report['captures'][name]={'source_sha256':sha(source),'output_sha256':sha(output)}
(OUT/'provenance.json').write_text(json.dumps(report,indent=2)+'\n')
print('Framed 2 matching Know Me captures.')
