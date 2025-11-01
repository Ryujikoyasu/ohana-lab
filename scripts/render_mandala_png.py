#!/usr/bin/env python3
"""
Render the mandala crest to transparent PNGs and pack a favicon.ico using Pillow only.

Outputs:
- icons/logo-512.png
- icons/logo-192.png
- icons/favicon-48.png
- icons/favicon-32.png
- icons/favicon-16.png
- favicon.ico (root)
"""
from math import cos, sin, pi
from pathlib import Path
from typing import List, Tuple

from PIL import Image, ImageDraw

SIZE = 512
CENTER = SIZE / 2

# Autumn palette
PALETTE = {
    "kuchiba": (0x91, 0x73, 0x47, 255),  # 朽葉色
    "akane": (0xB7, 0x28, 0x2E, 255),    # 茜色
    "suou": (0x8E, 0x35, 0x4A, 255),     # 蘇芳
    "yamabuki": (0xF8, 0xB5, 0x00, 255), # 山吹色
    "kaki": (0xF0, 0x83, 0x00, 255),     # 柿色
    "budou": (0x52, 0x2F, 0x60, 255),    # 葡萄色
    "kuriume": (0x60, 0x28, 0x1E, 255),  # 栗梅
    "kigara": (0xC7, 0x9A, 0x4B, 255),   # 黄唐茶系
}


def rotate_point(x: float, y: float, angle: float) -> Tuple[float, float]:
    ca, sa = cos(angle), sin(angle)
    return x * ca - y * sa, x * sa + y * ca


def cubic_point(p0, p1, p2, p3, t: float):
    u = 1 - t
    return (
        (u ** 3) * p0[0] + 3 * (u ** 2) * t * p1[0] + 3 * u * (t ** 2) * p2[0] + (t ** 3) * p3[0],
        (u ** 3) * p0[1] + 3 * (u ** 2) * t * p1[1] + 3 * u * (t ** 2) * p2[1] + (t ** 3) * p3[1],
    )


def petal_points(r_inner: float, r_outer: float, width: float, samples: int = 24) -> List[Tuple[float, float]]:
    # Define control points for a single vertical petal (up direction)
    x0, y0 = 0.0, -r_inner
    xt, yt = 0.0, -r_outer
    cx1L, cy1L = -width, -((r_inner + r_outer) / 2)
    cx2L, cy2L = -width * 0.5, -(r_outer * 0.9)
    cx1R, cy1R = width * 0.5, -(r_outer * 0.9)
    cx2R, cy2R = width, -((r_inner + r_outer) / 2)

    # Sample left curve base->tip
    left = [
        cubic_point((x0, y0), (cx1L, cy1L), (cx2L, cy2L), (xt, yt), t)
        for t in [i / samples for i in range(samples + 1)]
    ]
    # Sample right curve tip->base
    right = [
        cubic_point((xt, yt), (cx1R, cy1R), (cx2R, cy2R), (x0, y0), t)
        for t in [i / samples for i in range(samples + 1)]
    ]
    return left + right[1:]


def draw_ring(draw: ImageDraw.ImageDraw, cx: float, cy: float, r: float, color, alpha: int):
    c = (*color[:3], alpha)
    bbox = [cx - r, cy - r, cx + r, cy + r]
    draw.ellipse(bbox, fill=c)


def draw_mandala(size: int = SIZE) -> Image.Image:
    W = H = size
    img = Image.new("RGBA", (W, H), (255, 255, 255, 0))
    draw = ImageDraw.Draw(img, "RGBA")

    kuchiba = PALETTE["kuchiba"]
    akane = PALETTE["akane"]
    suou = PALETTE["suou"]
    yamabuki = PALETTE["yamabuki"]
    kaki = PALETTE["kaki"]
    budou = PALETTE["budou"]
    kuriume = PALETTE["kuriume"]
    kigara = PALETTE["kigara"]

    # Outer thin rings (semi-transparent)
    draw_ring(draw, CENTER, CENTER, 240 * (size / SIZE), kigara, alpha=64)
    draw_ring(draw, CENTER, CENTER, 238 * (size / SIZE), kigara, alpha=90)

    # Layer 1 petals (broad), 12-fold
    base = petal_points(150 * (size / SIZE), 230 * (size / SIZE), 42 * (size / SIZE))
    for k in range(12):
        a = (2 * pi * k) / 12
        pts = []
        for x, y in base:
            xr, yr = rotate_point(x, y, a)
            pts.append((CENTER + xr, CENTER + yr))
        draw.polygon(pts, fill=kuchiba, outline=kuriume)

    # Dots ring between layers
    R = 200 * (size / SIZE)
    dot_r = 3.2 * (size / SIZE)
    for k in range(36):
        a = (2 * pi * k) / 36
        x = CENTER + R * sin(a)
        y = CENTER - R * cos(a)
        draw.ellipse([x - dot_r, y - dot_r, x + dot_r, y + dot_r], fill=yamabuki)

    # Layer 2 petals (slender), 24-fold
    base2 = petal_points(110 * (size / SIZE), 180 * (size / SIZE), 20 * (size / SIZE))
    for k in range(24):
        a = (2 * pi * k) / 24
        pts = []
        for x, y in base2:
            xr, yr = rotate_point(x, y, a)
            pts.append((CENTER + xr, CENTER + yr))
        draw.polygon(pts, fill=akane, outline=budou)

    # Inner ring accent and dots
    draw_ring(draw, CENTER, CENTER, 112 * (size / SIZE), kaki, alpha=31)
    R2 = 120 * (size / SIZE)
    dot2 = 2.8 * (size / SIZE)
    for k in range(24):
        a = (2 * pi * k) / 24
        x = CENTER + R2 * sin(a)
        y = CENTER - R2 * cos(a)
        draw.ellipse([x - dot2, y - dot2, x + dot2, y + dot2], fill=suou)

    # Central emblem: layered stars
    def star_points(n: int, r1: float, r2: float):
        pts = []
        for i in range(2 * n):
            r = r1 if i % 2 == 0 else r2
            a = pi / 2 + (i * pi) / n
            x = CENTER + r * cos(a)
            y = CENTER - r * sin(a)
            pts.append((x, y))
        return pts

    draw.polygon(star_points(6, 80 * (size / SIZE), 36 * (size / SIZE)), fill=budou)
    draw.polygon(star_points(6, 64 * (size / SIZE), 24 * (size / SIZE)), fill=suou)
    draw.ellipse(
        [CENTER - 18 * (size / SIZE), CENTER - 18 * (size / SIZE), CENTER + 18 * (size / SIZE), CENTER + 18 * (size / SIZE)],
        fill=yamabuki,
    )
    draw.ellipse(
        [CENTER - 6 * (size / SIZE), CENTER - 6 * (size / SIZE), CENTER + 6 * (size / SIZE), CENTER + 6 * (size / SIZE)],
        fill=kuriume,
    )

    # Subtle border
    draw.ellipse(
        [CENTER - 250 * (size / SIZE), CENTER - 250 * (size / SIZE), CENTER + 250 * (size / SIZE), CENTER + 250 * (size / SIZE)],
        outline=(*kigara[:3], 90), width=max(1, int(2 * (size / SIZE))),
    )

    return img


def save_outputs():
    out_dir = Path("icons")
    out_dir.mkdir(parents=True, exist_ok=True)
    sizes = [512, 192, 48, 32, 16]
    paths = {}
    for s in sizes:
        img = draw_mandala(s)
        name = {
            512: "logo-512.png",
            192: "logo-192.png",
            48: "favicon-48.png",
            32: "favicon-32.png",
            16: "favicon-16.png",
        }[s]
        path = out_dir / name
        img.save(path, format="PNG")
        paths[s] = path
        print(f"[+] Wrote {path}")

    # Pack ICO
    ico_path = Path("favicon.ico")
    base = Image.open(paths[16])
    base.save(
        ico_path,
        sizes=[(16, 16), (32, 32), (48, 48)],
        format="ICO",
    )
    print(f"[+] Wrote {ico_path}")


if __name__ == "__main__":
    save_outputs()

