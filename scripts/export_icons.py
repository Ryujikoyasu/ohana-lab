#!/usr/bin/env python3
"""
Export PNG and ICO icons from icons/ohana-mandala.svg.

Requires: cairosvg (PNG export), pillow (ICO packing)

Outputs:
- icons/logo-512.png
- icons/logo-192.png
- icons/favicon-32.png
- favicon.ico (in repo root, 16/32/48 px)
"""
from pathlib import Path
import sys

SRC = Path("icons/ohana-mandala.svg")
OUT_DIR = Path("icons")

def ensure_deps():
    try:
        import cairosvg  # noqa: F401
    except Exception as e:
        print("[!] Missing dependency: cairosvg (pip install cairosvg)")
        raise
    try:
        import PIL  # noqa: F401
    except Exception:
        print("[i] Pillow not found; favicon.ico creation may be skipped.")

def export_pngs():
    import cairosvg
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    targets = [
        (512, OUT_DIR / "logo-512.png"),
        (192, OUT_DIR / "logo-192.png"),
        (32, OUT_DIR / "favicon-32.png"),
        (16, OUT_DIR / "favicon-16.png"),
        (48, OUT_DIR / "favicon-48.png"),
    ]
    for size, path in targets:
        cairosvg.svg2png(url=str(SRC), write_to=str(path), output_width=size, output_height=size, background_color='white')
        print(f"[+] Wrote {path}")

def export_ico():
    try:
        from PIL import Image
    except Exception:
        print("[i] Pillow not available; skipping favicon.ico")
        return
    sizes = [
        (Path("icons/favicon-16.png"), (16, 16)),
        (Path("icons/favicon-32.png"), (32, 32)),
        (Path("icons/favicon-48.png"), (48, 48)),
    ]
    images = []
    for p, sz in sizes:
        if not p.exists():
            continue
        im = Image.open(p).convert("RGBA")
        if im.size != sz:
            im = im.resize(sz, Image.LANCZOS)
        images.append(im)
    if not images:
        print("[i] No PNGs to pack; skipping favicon.ico")
        return
    out_ico = Path("favicon.ico")
    images[0].save(out_ico, format='ICO', sizes=[im.size for im in images])
    print(f"[+] Wrote {out_ico}")

def main():
    if not SRC.exists():
        print(f"[!] Source SVG not found: {SRC}")
        sys.exit(1)
    ensure_deps()
    export_pngs()
    export_ico()

if __name__ == "__main__":
    main()

