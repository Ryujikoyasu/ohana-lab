#!/usr/bin/env python3
"""
Generate a mandala-style crest (家紋風) as an SVG for OHANA LAB.

No external dependencies. Produces a 512x512 SVG in icons/.

Design goals:
- Radial symmetry (12-fold) with petal layers and dot rings
- Autumn palette inspired by kasane no irome (重ね色目)
- Crisp vector suitable for favicon / logo export
"""
from math import cos, sin, pi
from pathlib import Path
from typing import Optional

SIZE = 512
CENTER = SIZE / 2

# Autumn palette (approximate hex codes), warm + deep accents
PALETTE = {
    "background": "#fcfaf7",      # warm paper-like
    "kuchiba": "#917347",         # 朽葉色 (kuchiba-iro)
    "akane": "#B7282E",           # 茜色 (akane-iro)
    "suou": "#8E354A",            # 蘇芳 (suou)
    "yamabuki": "#F8B500",        # 山吹色 (yamabuki)
    "kaki": "#F08300",            # 柿色 (kaki)
    "budou": "#522F60",           # 葡萄色 (budou)
    "kuriume": "#60281E",         # 栗梅 (kuriume)
    "kigara": "#C79A4B",          # 黄唐茶系ニュアンス
}


def rotate(x: float, y: float, angle: float):
    ca, sa = cos(angle), sin(angle)
    return x * ca - y * sa, x * sa + y * ca


def petal_path(r_inner: float, r_outer: float, width: float):
    """Create a single petal pointing up (0 radians) as a path d string.
    Petal is built from two cubic beziers for left and right lobes.
    """
    # Key points (relative to center)
    # Start bottom at inner radius, go left lobe to tip, then right lobe back.
    x0, y0 = 0, -r_inner
    xt, yt = 0, -r_outer  # tip

    # Control points for bezier curvature
    cx1L, cy1L = -width, -((r_inner + r_outer) / 2)
    cx2L, cy2L = -width * 0.5, -(r_outer * 0.9)

    cx1R, cy1R = width * 0.5, -(r_outer * 0.9)
    cx2R, cy2R = width, -((r_inner + r_outer) / 2)

    # Construct path d (starting at base, left curve to tip, right curve back)
    d = []
    d.append(f"M {x0:.3f} {y0:.3f}")
    d.append(
        "C "
        f"{cx1L:.3f} {cy1L:.3f} {cx2L:.3f} {cy2L:.3f} {xt:.3f} {yt:.3f}"
    )
    d.append(
        "C "
        f"{cx1R:.3f} {cy1R:.3f} {cx2R:.3f} {cy2R:.3f} {x0:.3f} {y0:.3f}"
    )
    d.append("Z")
    return " ".join(d)


def transform_path(d: str, angle: float, tx: float, ty: float):
    """Rotate all coordinates in path d by angle and translate by (tx, ty).
    Only supports commands M/C/Z with absolute coordinates as generated above.
    """
    parts = d.split()
    out = []
    i = 0
    while i < len(parts):
        token = parts[i]
        if token in ("M", "C"):
            out.append(token)
            i += 1
            # M has 2 coords, C has 6 coords
            count = 2 if token == "M" else 6
            for _ in range(count // 2):
                x = float(parts[i]); y = float(parts[i + 1])
                xr, yr = rotate(x, y, angle)
                out.append(f"{xr + tx:.3f}"); out.append(f"{yr + ty:.3f}")
                i += 2
        elif token == "Z":
            out.append("Z")
            i += 1
        else:
            # Unexpected token; safeguard (should not happen with our generator)
            out.append(token)
            i += 1
    return " ".join(out)


def circle(cx: float, cy: float, r: float, fill: str, opacity: float = 1.0):
    return f'<circle cx="{cx:.3f}" cy="{cy:.3f}" r="{r:.3f}" fill="{fill}" fill-opacity="{opacity:.3f}" />'


def group(children: list[str], opacity: float = 1.0):
    return f'<g opacity="{opacity:.3f}">\n' + "\n".join(children) + "\n</g>"


def ring_of_petals(n: int, r_inner: float, r_outer: float, width: float, fill: str, stroke: Optional[str] = None, stroke_width: float = 0.0, jitter_scale: float = 0.0):
    base = petal_path(r_inner, r_outer, width)
    parts = []
    for k in range(n):
        a = (2 * pi * k) / n
        d = transform_path(base, a, CENTER, CENTER)
        style = f"fill:{fill};"
        if stroke and stroke_width > 0:
            style += f"stroke:{stroke};stroke-width:{stroke_width};"
        parts.append(f'<path d="{d}" style="{style}" />')
    return parts


def ring_of_dots(n: int, radius: float, dot_r: float, fill: str):
    dots = []
    for k in range(n):
        a = (2 * pi * k) / n
        x = CENTER + radius * sin(a)
        y = CENTER - radius * cos(a)
        dots.append(circle(x, y, dot_r, fill))
    return dots


def star_polygon(n: int, r1: float, r2: float, fill: str):
    pts = []
    for i in range(2 * n):
        r = r1 if i % 2 == 0 else r2
        a = pi / 2 + (i * pi) / n
        x = CENTER + r * cos(a)
        y = CENTER - r * sin(a)
        pts.append(f"{x:.3f},{y:.3f}")
    return f'<polygon points="{" ".join(pts)}" fill="{fill}" />'


def build_svg(size: int = SIZE) -> str:
    bg = PALETTE["background"]
    kuchiba = PALETTE["kuchiba"]
    akane = PALETTE["akane"]
    suou = PALETTE["suou"]
    yamabuki = PALETTE["yamabuki"]
    kaki = PALETTE["kaki"]
    budou = PALETTE["budou"]
    kuriume = PALETTE["kuriume"]
    kigara = PALETTE["kigara"]

    layers: list[str] = []

    # Background
    layers.append(f'<rect width="{size}" height="{size}" fill="{bg}" />')

    # Outer thin ring
    layers.append(circle(CENTER, CENTER, 240, kigara, 0.25))
    layers.append(circle(CENTER, CENTER, 238, kigara, 0.35))

    # Layer 1 petals (broad)
    layers += ring_of_petals(
        n=12, r_inner=150, r_outer=230, width=42, fill=kuchiba, stroke=kuriume, stroke_width=1.2
    )

    # Dots ring between layers
    layers += ring_of_dots(n=36, radius=200, dot_r=3.2, fill=yamabuki)

    # Layer 2 petals (slender, rotated implicitly by index)
    layers += ring_of_petals(
        n=24, r_inner=110, r_outer=180, width=20, fill=akane, stroke=budou, stroke_width=0.8
    )

    # Inner ring accent
    layers.append(circle(CENTER, CENTER, 112, kaki, 0.12))
    layers += ring_of_dots(n=24, radius=120, dot_r=2.8, fill=suou)

    # Central emblem: layered star polygons
    layers.append(star_polygon(n=6, r1=80, r2=36, fill=budou))
    layers.append(star_polygon(n=6, r1=64, r2=24, fill=suou))
    layers.append(circle(CENTER, CENTER, 18, yamabuki, 1.0))
    layers.append(circle(CENTER, CENTER, 6, kuriume, 1.0))

    # Subtle grain/paper border
    layers.append(
        f'<circle cx="{CENTER}" cy="{CENTER}" r="250" fill="none" stroke="{kigara}" stroke-opacity="0.35" stroke-width="2" />'
    )

    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{size}" height="{size}" viewBox="0 0 {size} {size}">\n'
        + "\n".join(layers)
        + "\n</svg>\n"
    )
    return svg


def main():
    out_dir = Path("icons")
    out_dir.mkdir(parents=True, exist_ok=True)
    svg = build_svg(SIZE)
    out_path = out_dir / "ohana-mandala.svg"
    out_path.write_text(svg, encoding="utf-8")
    # Alias for structured-data logo reference
    (out_dir / "logo-512.svg").write_text(svg, encoding="utf-8")
    print(f"Wrote {out_path}")


if __name__ == "__main__":
    main()
