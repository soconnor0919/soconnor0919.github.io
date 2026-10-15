"""Rebrand a copied CAD assembly; no image synthesis or original-file writes.

Run from web with a Python environment containing numpy, trimesh, manifold3d.
All modelling uses millimetres; GLB output uses metres.
"""
from pathlib import Path
import hashlib
import json
import re
import xml.etree.ElementTree as ET

import manifold3d as md
import numpy as np
import trimesh
from PIL import Image
from trimesh.visual.material import PBRMaterial
from trimesh.visual.texture import TextureVisuals

WEB = Path(__file__).resolve().parents[2]
SOURCE = WEB / "device-cad/source"
OUT = WEB / "device-cad/build"
OUT.mkdir(parents=True, exist_ok=True)


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


def solid(filename):
    mesh = trimesh.load_mesh(SOURCE / filename)
    mesh.vertices = mesh.vertices.round(4)
    mesh.merge_vertices()
    result = md.Manifold(md.Mesh64(mesh.vertices, mesh.faces.astype(np.uint64)))
    assert result.status() == md.Error.NoError
    return result


def mesh(s):
    assert s.status() == md.Error.NoError
    # As in the source CAD exporter, clean triangles below STL precision.
    for tolerance in (.001, .002, .005, .0001):
        data = s.simplify(tolerance).to_mesh64()
        for digits in (5, 4, 3):
            result = trimesh.Trimesh(data.vert_properties[:, :3].round(digits), data.tri_verts, process=True)
            result.update_faces(result.nondegenerate_faces(height=1e-12))
            result.update_faces(result.unique_faces())
            result.remove_unreferenced_vertices()
            for _ in range(3):
                if result.is_watertight:
                    break
                counts = np.bincount(result.edges_unique_inverse)
                edges = result.edges_unique[counts != 2]
                short = [e for e in edges if np.linalg.norm(result.vertices[e[0]] - result.vertices[e[1]]) < .005]
                if not short:
                    break
                for a, b in short:
                    result.vertices[b] = result.vertices[a]
                result.merge_vertices()
                result.update_faces(result.nondegenerate_faces(height=1e-12))
                result.update_faces(result.unique_faces())
                result.remove_unreferenced_vertices()
            if result.is_watertight and result.volume > 0:
                return result
    raise ValueError("CAD export did not retain a watertight solid")


def material(m, color):
    # Seeded polymer grain is embedded in the editable GLB, independent of the
    # preview shader. Planar UVs repeat every 8 mm across the actual shell.
    grain = np.random.default_rng(22).normal(0, 1.8, (256, 256, 1))
    pixels = np.clip(np.array(color)[None, None, :] + grain, 0, 255).astype(np.uint8)
    uv = m.vertices[:, :2] / 8
    m.visual = TextureVisuals(uv=uv, material=PBRMaterial(baseColorFactor=[255]*4,
        baseColorTexture=Image.fromarray(pixels), roughnessFactor=.88, metallicFactor=0))
    return m


shell = solid("shell.stl")
old_text = solid("shell-text.stl")
# Restore the flat lower-bezel surface across the entire old lettering area.
# This stays inside the existing envelope and avoids coincident inlay seams.
filled_shell = shell + md.Manifold.cube((24, 9, .65)).translate((-12, -50.3, 11.25))
mark = profile("medscribe-logo.svg", 14).extrude(.7).translate((0, -45.8, 11.3))
branded_shell = filled_shell - mark
new_text = mark ^ filled_shell
cover = solid("back.stl")
old_back_mark = profile("original-wordmark.svg", 30, flip=True).extrude(.45).rotate((0, 180, 0)).translate((0, 14, -2.05))
filled_cover = cover + md.Manifold.cube((34, 14, .4)).translate((-17, 7, -2.4))
back_mark = profile("medscribe-logo.svg", 18).extrude(.45).rotate((0, 180, 0)).translate((0, 14, -2.05))
branded_cover = filled_cover - back_mark
back_text = back_mark ^ filled_cover

original = trimesh.load(SOURCE / "assembly.glb", force="scene")
replacements = {
    "shell": material(mesh(branded_shell), [234, 245, 238]),
    "shell-text": material(mesh(new_text), [43, 104, 97]),
    "cover": material(mesh(branded_cover), [234, 245, 238]),
    "back-text": material(mesh(back_text), [43, 104, 97]),
}
scene = trimesh.Scene()
preview = {}
for name in [*original.geometry, "back-text"]:
    if name in replacements:
        part = replacements[name]
    else:
        part = original.geometry[name].copy()
        part.apply_scale(1000)
    factor = part.visual.material.baseColorFactor
    color = np.asarray(factor if factor is not None else [255, 255, 255, 255])[:3].tolist()
    if name == "home-screen":
        # Embed the captured UI in the editable GLB as well as the WebGL render.
        # Never carry the original OS screenshot into the Medscribe assembly.
        screen_path = OUT / "screen-recording.png"
        if not screen_path.exists():
            raise FileNotFoundError("Capture the local UI first: run capture.mjs")
        part.visual = TextureVisuals(uv=part.visual.uv.copy(), image=Image.open(screen_path).convert("RGB"))
        color = [250, 250, 244]
    preview[name] = {
        "positions": part.triangles.round(5).reshape(-1).tolist(),
        "normals": np.repeat(part.face_normals[:, None, :], 3, axis=1).round(5).reshape(-1).tolist(),
        "color": [c / 255 for c in ({"shell": [234,245,238], "cover": [234,245,238], "shell-text": [43,104,97], "back-text": [43,104,97]}.get(name, color))],
        "finish": 1 if name in ("shell", "cover") else 2 if name in ("shell-text", "back-text") else 0,
    }
    exported = part.copy()
    exported.apply_scale(.001)
    scene.add_geometry(exported, node_name=name, geom_name=name)
    if name in replacements:
        part.export(OUT / f"medscribe-{name}.stl")
scene.export(OUT / "medscribe-assembled.glb")
(OUT / "meshes.json").write_text(json.dumps(preview, separators=(",", ":")))
report = {
    "source": "Copied paperOne V22.5 CAD assembly; original paperOS assets untouched",
    "units_stl": "millimetres", "units_glb": "metres",
    "finish": "Near-white mint matte polymer with seeded grain; smaller deep teal logo inlays",
    "front_logo_width_mm": 14, "back_logo_width_mm": 18,
    "source_sha256": {p.name: hashlib.sha256(p.read_bytes()).hexdigest() for p in SOURCE.iterdir() if p.is_file()},
    "source_shell_bounds_mm": mesh(shell).bounds.tolist(),
    "new_shell_bounds_mm": replacements["shell"].bounds.tolist(),
    "envelope_preserved": bool(np.allclose(mesh(shell).bounds, replacements["shell"].bounds, atol=.0001)),
    "new_shell_watertight": replacements["shell"].is_watertight,
    "new_cover_watertight": replacements["cover"].is_watertight,
    "front_shell_inlay_intersection_mm3": (branded_shell ^ new_text).volume(),
    "old_front_recess_fill_volume_mm3": filled_shell.volume() - shell.volume(),
    "physical_fit_verified": False,
    "screen": "480x800 capture of the actual SD/Wasm app executed by WAMR in the C/LVGL simulator; not optical-panel evidence",
}
assert report["envelope_preserved"]
assert abs(report["front_shell_inlay_intersection_mm3"]) < .001
(OUT / "cad-validation.json").write_text(json.dumps(report, indent=2) + "\n")
print(json.dumps({"output": str(OUT), "parts": len(preview), "watertight_shell": True, "envelope_preserved": True}))
