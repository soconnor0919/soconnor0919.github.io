"""Rasterize smooth, large regular numerals from the product's outline font."""
from pathlib import Path
import argparse, hashlib
from PIL import Image, ImageDraw, ImageFont

HERE=Path(__file__).resolve().parent
p=argparse.ArgumentParser(description=__doc__)
p.add_argument('--font',type=Path,default=Path.home()/'Library/Fonts/InstrumentSans-Variable.ttf')
a=p.parse_args()
# Render the outlines at 4x target size, then sample to the real 1-bit display.
# This avoids enlarging low-resolution bitmap steps while retaining 72px digits.
scale=4
font=ImageFont.truetype(str(a.font),96*scale)
if hasattr(font,'get_variation_axes'):
    axes=font.get_variation_axes()
    font.set_variation_by_axes([400 if axis['name']==b'Weight' else axis['default'] for axis in axes])
images=[];advances=[]
for c in '0123456789:':
    image=Image.new('L',(120*scale,180*scale),255)
    ImageDraw.Draw(image).text((0,72*scale),c,font=font,fill=0,anchor='ls')
    image=image.resize((120,180),Image.Resampling.LANCZOS)
    data=bytearray(2708);data[:4]=bytes([255]*4);data[7]=255
    for y in range(180):
        for x in range(120):
            if image.getpixel((x,y))<128:data[8+y*15+x//8]|=128>>(x%8)
    images.append(data);advances.append(round(font.getlength(c)/scale))
notice='''/* Instrument Sans regular numeral artwork, rasterized directly at 96px.
Copyright 2022 The Instrument Sans Project Authors
https://github.com/Instrument/instrument-sans
SIL Open Font License 1.1; see assets/InstrumentSans-OFL.txt.
Source font SHA-256: %s
No enlarged small bitmap glyphs are used. */
'''%hashlib.sha256(a.font.read_bytes()).hexdigest()
(HERE/'timer-font.h').write_text(notice+'static const unsigned char timer_advances[]={'+','.join(map(str,advances))+'};\nstatic const unsigned char timer_images[11][2708]={\n'+',\n'.join('{'+','.join(map(str,d))+'}' for d in images)+'\n};\n')
