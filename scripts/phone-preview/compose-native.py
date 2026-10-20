"""Frame current native captures. Usage: python3 compose-native.py RAW_DIRECTORY"""
from pathlib import Path
import hashlib
import json
import sys
from PIL import Image

WEB = Path(__file__).resolve().parents[2]
ASSETS = Path(__file__).parent / 'assets'
RAW = Path(sys.argv[1]).resolve()
OUT = WEB / 'public/screenshots/native-marketing-2026-10-20-v2'
OUT.mkdir(parents=True, exist_ok=True)
FRAME = WEB / 'public/screenshots/product-bezel-2026-08-24-unified-type/visits-natural.webp'
alpha = Image.open(ASSETS / 'iphone17-pro-screen-alpha.png').convert('L')
island = Image.open(ASSETS / 'iphone17-pro-island-mask.png').convert('L')
frame = Image.open(FRAME).convert('RGBA')

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

report = {
    'method': 'Real native SwiftUI screenshots captured with Device Hub Camera, composited at native resolution into the existing photographic Silver bezel. No generated UI or image generation.',
    'capture_date': '2026-10-20',
    'capture_device': 'iPhone 18 Pro simulator',
    'capture_runtime': 'iOS 27.0',
    'appearance': 'Light and Dark; default Dynamic Type size 3',
    'fixture': 'Isolated authored Alex Morgan diabetes/blood pressure library from native/scripts/marketing-fixture.py; synthetic speech, matching written transcript, source-linked summary and chat, medication routines and reviewed Know Me card. No real patient data. Authored presentation states, not model benchmark results.',
    'pill_photos': 'Bundled NIH/NLM RxImage photographs, ingredient-matched metformin and atorvastatin; example appearance, not identification of a dispensed pill. See native/VisitCore/Sources/VisitCore/Resources/pill-photo-provenance.json.',
    'frame_source': str(FRAME.relative_to(WEB)),
    'frame_sha256': sha(FRAME),
    'frame_note': 'Existing iPhone 17 Pro photographic framing and display masks retained; current simulator shares the 1206 x 2622 capture size. Not a new hardware photograph.',
    'screen_offset': [72, 69],
    'screen_size': [1206, 2622],
    'screen_alpha_sha256': sha(ASSETS / 'iphone17-pro-screen-alpha.png'),
    'island_mask_sha256': sha(ASSETS / 'iphone17-pro-island-mask.png'),
    'captures': {},
}
for name in ('home', 'visits', 'visit-text', 'summary', 'medications', 'medication-detail', 'ask', 'questions', 'know-me'):
    for suffix in ('', '-dark'):
        key = name + suffix
        source = RAW / (key + '.png')
        screen = Image.open(source).convert('RGBA')
        if screen.size != alpha.size or screen.size != (1206, 2622):
            raise ValueError(f'{key}: incorrect screen size {screen.size}')
        screen.paste((0, 0, 0, 255), (0, 0, *screen.size), island)
        screen.putalpha(alpha)
        result = frame.copy()
        result.alpha_composite(screen, (72, 69))
        transparent = result.getchannel('A').point(lambda a: 255 if a == 0 else 0)
        result.paste((0, 0, 0, 0), (0, 0, *result.size), transparent)
        output = OUT / (key + '.webp')
        result.save(output, 'WEBP', lossless=True, exact=True)
        report['captures'][key] = {'source_sha256': sha(source), 'output_sha256': sha(output)}
(OUT / 'provenance.json').write_text(json.dumps(report, indent=2) + '\n')
print(f'Framed {len(report["captures"])} native captures in {OUT}')
