"""Parametric Medscribe pendant study around Waveshare's linked 1.54G CAD.
The source STEP is preserved; case exterior follows the vendor drawing.
"""
from pathlib import Path
import hashlib,json,math,re,xml.etree.ElementTree as ET
import cadquery as cq
import manifold3d as md
import numpy as np
import trimesh
from PIL import Image
from trimesh.visual.texture import TextureVisuals
WEB=Path(__file__).resolve().parents[2]
OUT=WEB/'pendant-cad/build';OUT.mkdir(parents=True,exist_ok=True)
SOURCE=WEB/'device-cad/source'

def profile(filename, width, flip=False):
    contours = []
    for element in ET.parse(SOURCE / filename).getroot().findall(".//{http://www.w3.org/2000/svg}path"):
        tokens = re.findall(r"[A-Za-z]|[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?", element.attrib["d"])
        i, command, points = 0, None, []
        position, start = np.zeros(2), np.zeros(2)
        while i < len(tokens):
            if tokens[i].isalpha():
                command = tokens[i]
                i += 1
            kind, relative = command.upper(), command.islower()
            if kind == "Z":
                if len(points) > 2:
                    contours.append(np.array(points))
                points, position, command = [], start.copy(), None
                continue
            count = {"M": 2, "L": 2, "H": 1, "V": 1, "Q": 4, "C": 6}[kind]
            values = np.array([float(x) for x in tokens[i:i + count]])
            i += count
            if kind in ("H", "V"):
                position = position.copy()
                axis = 0 if kind == "H" else 1
                position[axis] = values[0] + (position[axis] if relative else 0)
                points.append(position.copy())
                continue
            values = values.reshape(-1, 2)
            if relative:
                values += position
            if kind == "M":
                if points:
                    contours.append(np.array(points))
                position = values[0]
                start, points = position.copy(), [position.copy()]
                command = "l" if relative else "L"
            elif kind == "L":
                position = values[0]
                points.append(position.copy())
            else:
                origin = position.copy()
                for t in np.linspace(0, 1, 25)[1:]:
                    if kind == "Q":
                        point = (1-t)**2*origin + 2*(1-t)*t*values[0] + t*t*values[1]
                    else:
                        point = (1-t)**3*origin + 3*(1-t)**2*t*values[0] + 3*(1-t)*t*t*values[1] + t**3*values[2]
                    points.append(point)
                position = values[-1]
    if flip:
        contours = [c * [1, -1] for c in contours]
    all_points = np.concatenate(contours)
    low, high = all_points.min(0), all_points.max(0)
    return md.CrossSection([(c-(low+high)/2)*width/(high[0]-low[0]) for c in contours], md.FillRule.EvenOdd)


def mesh(shape):
    v,f=shape.val().tessellate(.10,.15)
    return trimesh.Trimesh([[p.x,p.y,p.z] for p in v],f,process=True)
def rounded(w,h,d,r,z=0):
    return cq.Workplane('XY').box(w,h,d).edges('|Z').fillet(r).translate((0,0,z))
# Original vendor case exterior: 39.8 x 53 x 16.9 mm, R4.5 corners.
# Reconstructed from the linked dimensioned PDF, not the board-only STEP.
outer=rounded(39.8,53,16.9,8).edges('#Z').fillet(1.6)
inside=rounded(35.8,49,14.9,6.2,z=-1.35)
window=rounded(27.8,27.8,6,.4,z=8).translate((0,1.3,0))
usb=cq.Workplane('XY').box(9.4,5,3.4).edges('|Y').fillet(1.4).translate((0,-26,0))
sd_slot=cq.Workplane('XY').box(5,11.5,1.8).translate((19.8,8,0))
# Pendant attachment is a separate rear clip; case face remains untouched.
lug=cq.Workplane('XY').center(0,28.2).circle(4.8).circle(2.7).extrude(3).translate((0,0,-5))
front=outer.cut(inside).cut(window).cut(usb).cut(sd_slot)
for x,length in [(-5,2),(-2.5,4),(0,6),(2.5,4),(5,2)]:
    front=front.cut(cq.Workplane('XY').box(.85,5,length).translate((x,26,0)))
back=rounded(35.8,49,1.8,6.2,z=-7.6)
parts={}
def add(name,m,color,finish=0):
    assert m.is_watertight or name in ('home-screen','logo'),name
    parts[name]=(m,color,finish)
add('shell',mesh(front),[234,245,238],1)
add('back',mesh(back),[224,237,228],1)
add('pendant-clip',mesh(lug),[43,104,97],1)
# Two original side controls, including their small hexagonal collars.
side_shapes=[]
for name,y in [('boot',-4.5),('power',-15.1)]:
    collar=cq.Workplane('YZ').polygon(6,5).extrude(.85).translate((19.55,y,0))
    cap=cq.Workplane('YZ').circle(1.65).extrude(.35).translate((20.3,y,0))
    add(name+'-collar',mesh(collar),[139,158,149],2)
    add(name+'-button',mesh(cap),[43,104,97],2)
    side_shapes.extend([(name+'-collar',collar),(name+'-button',cap)])
slot=trimesh.creation.box([.1,10.5,1.1]);slot.apply_translation([18.05,8,0]);add('sd-interior',slot,[35,44,40])
# Actual logo geometry, not a painted wordmark or generated image.
mark=profile('medscribe-logo.svg',11).extrude(.22).translate((0,-20.5,8.5)).to_mesh64()
logo=trimesh.Trimesh(mark.vert_properties[:,:3],mark.tri_verts,process=True)
add('logo',logo,[43,104,97],2)
# Flush window uses the actual 200x200 SD app framebuffer.
plane=trimesh.creation.box([27,27,.22]);plane.apply_translation([0,1.3,8.35])
add('home-screen',plane,[247,246,233])
# Original side microphone aperture.
mic=trimesh.creation.cylinder(radius=.55,height=.15,sections=24)
mic.apply_transform(trimesh.transformations.rotation_matrix(math.pi/2,[0,1,0]));mic.apply_translation([19.95,19.0,0]);add('side-mic',mic,[32,45,42])
# Continuous flexible round neck cord, curved in three dimensions.
# Smooth tube topology avoids the old visible joints between cylinders.
# The cord passes through the clip's 5.4 mm aperture along Z, with one
# leg in front and one behind. No overlapping jump ring or fake knot.
controls=np.array([[-1,35,-7],[-12,53,-7],[-32,87,-6],[-40,135,-3],[-30,178,1],[-8,192,3],[20,181,3],[39,145,2],[33,96,1],[12,53,0],[1,35,0],[0,28.6,0],[0,28.2,-3.5],[0,28.6,-7],[-1,35,-7]],dtype=float)
padded=np.vstack([controls[0]*2-controls[1],controls,controls[-1]*2-controls[-2]])
points=[]
for i in range(1,len(padded)-2):
    p0,p1,p2,p3=padded[i-1:i+3]
    for t in np.linspace(0,1,28,endpoint=False):
        points.append(.5*((2*p1)+(-p0+p2)*t+(2*p0-5*p1+4*p2-p3)*t*t+(-p0+3*p1-3*p2+p3)*t*t*t))
points=np.vstack([points,controls[-1]])
# Exclude neighboring samples on the same continuous strand, then reject
# any nonlocal approach closer than the 1.44 mm cord diameter.
arc=np.r_[0,np.cumsum(np.linalg.norm(np.diff(points,axis=0),axis=1))]
arc_gap=np.abs(arc[:,None]-arc[None,:]);arc_gap=np.minimum(arc_gap,arc[-1]-arc_gap)
distance=np.linalg.norm(points[:,None,:]-points[None,:,:],axis=2)
self_clearance=float(distance[arc_gap>3].min())
assert self_clearance>1.44, f'Cord crosses itself: {self_clearance} mm'
tangents=np.gradient(points,axis=0);tangents/=np.linalg.norm(tangents,axis=1)[:,None]
side=np.cross(tangents,[0,0,1]);side/=np.linalg.norm(side,axis=1)[:,None]
up=np.cross(tangents,side);rings=20;vertices=[];faces=[]
for point,n,b in zip(points,side,up):
    for angle in np.linspace(0,math.tau,rings,endpoint=False):vertices.append(point+.72*(math.cos(angle)*n+math.sin(angle)*b))
for i in range(len(points)-1):
    for j in range(rings):
        a=i*rings+j;b=i*rings+(j+1)%rings;c=(i+1)*rings+j;d=(i+1)*rings+(j+1)%rings
        faces.extend([[a,b,c],[b,d,c]])
vertices.extend([points[0],points[-1]]);start=len(vertices)-2;end=len(vertices)-1
for j in range(rings):
    faces.extend([[start,(j+1)%rings,j],[end,(len(points)-1)*rings+j,(len(points)-1)*rings+(j+1)%rings]])
cord=trimesh.Trimesh(vertices,faces,process=True);cord.fix_normals();add('neck-cord',cord,[62,87,78],3)
# Check that the actual solid cord clears the case and attachment.
# Clasp intentionally surrounds the cord; the clip is intentionally mounted
# into the shell. Those joins are distinct from cord/case collisions.
collisions={}
for name in ('shell','back','pendant-clip','boot-button','power-button'):
    overlap=trimesh.boolean.intersection([cord,parts[name][0]],engine='manifold')
    volume=abs(float(overlap.volume)) if overlap is not None else 0
    collisions[name]=round(volume,6)
    assert volume<.001, f'Cord intersects {name}: {volume} mm^3'
print('Cord clearances PASS: '+json.dumps(collisions))
# Separate breakaway clasp study at the top of the complete necklace view.
index=int(np.argmax(points[:,1]));clasp_angle=math.degrees(math.atan2(tangents[index,1],tangents[index,0]))-90
clasp=cq.Workplane('XY').box(3.4,10,3.2).edges('|Y').fillet(1.3).rotate((0,0,0),(0,0,1),clasp_angle).translate(tuple(points[index]))
add('breakaway-clasp',mesh(clasp),[43,70,60],1)
assembly=cq.Assembly(name='Medscribe pendant concept')
for name,shape in [('front',front),('back',back),('pendant-clip',lug),*side_shapes]:
    assembly.add(shape,name=name)
assembly.save(str(OUT/'medscribe-pendant.step'))
for name,shape in [('front',front),('back',back),('pendant-clip',lug)]:cq.exporters.export(shape,str(OUT/f'{name}.stl'))
scene=trimesh.Scene();preview={}
for name,(m,color,finish) in parts.items():
    if name=='home-screen':
        uv=(m.vertices[:,:2]-[-13.5,-12.2])/27
        m.visual=TextureVisuals(uv=uv,image=Image.open(OUT/'screen-card.png').convert('RGB'))
    else:m.visual=TextureVisuals(material=trimesh.visual.material.PBRMaterial(baseColorFactor=[*color,255],roughnessFactor=.85 if finish==1 else .55))
    normals=m.vertex_normals[m.faces].copy()
    planar=np.max(np.abs(m.face_normals),axis=1)>.995
    if name not in ('neck-cord'):
        normals[planar]=np.repeat(m.face_normals[planar,None,:],3,axis=1)
    preview[name]={'positions':m.triangles.round(5).reshape(-1).tolist(),'normals':normals.round(5).reshape(-1).tolist(),'color':[c/255 for c in color],'finish':finish}
    export=m.copy();export.apply_scale(.001);scene.add_geometry(export,node_name=name,geom_name=name)
scene.export(OUT/'medscribe-pendant.glb')
(OUT/'meshes.json').write_text(json.dumps(preview,separators=(',',':')))
report={'concept_dimensions_mm':[39.8,53,16.9], 'display_active_mm':[27,27], 'display_pixels':[200,200], 'source_url':'https://github.com/waveshareteam/ESP32-S3-ePaper-1.54G/tree/main/Hardware/dimensions', 'source_step_sha256':hashlib.sha256((WEB/'pendant-cad/source/waveshare-original.step').read_bytes()).hexdigest(), 'source_note':'Vendor-linked drawing archive includes a touch-labelled STEP. Used as mechanical reference, not proof of 1.54G assembly fit.', 'reference_board_envelope_mm':[34.55,47.801,13.501], 'shell_watertight':parts['shell'][0].is_watertight, 'physical_fit_verified':False, 'notification_transport_implemented':False, 'ui':'Actual SD/Wasm app, WAMR and LVGL capture at 200x200. Upper hold opens pending request; upper tap cancels; lower key cycles five reviewed-card pages. No messages or emergency calls.', 'case_basis':'Vendor PDF envelope retained; case corners softened to R8 and edge radii to 1.6 mm for this concept. Board-only STEP preserved as reference.', 'cord_nonlocal_centerline_clearance_mm':round(self_clearance,3), 'cord_collision_volume_mm3':collisions, 'case_corner_radius_mm':8, 'case_edge_radius_mm':1.6, 'front_button':False, 'side_button_count':2, 'cord_length_mm':round(float(np.linalg.norm(np.diff(points,axis=0),axis=1).sum()),1), 'new_parts':'Rounded R8 shell derived from the vendor envelope. A continuous cord threads through the separate rear clip aperture. No front HELP button. Breakaway clasp, sealing, antenna clearance and wearable validation remain engineering work.'}
(OUT/'provenance.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report))

# Project actual side-button mesh centers into the fixed promotional camera.
controls={}
for label,name in [('upper','boot-button'),('lower','power-button')]:
    point=parts[name][0].bounds.mean(axis=0)-[0,15,0]
    x,y,z=point;rx=-.13;ry=-.30
    zz=math.sin(rx)*y+math.cos(rx)*z
    xx=math.cos(ry)*x+math.sin(ry)*zz
    yy=math.cos(rx)*y-math.sin(rx)*z
    controls[label]={'x':round((xx/(48*2000/2400)+1)*50,4),'y':round((1-yy/48)*50,4)}
(OUT/'controls.json').write_text(json.dumps(controls,indent=2)+'\n')
