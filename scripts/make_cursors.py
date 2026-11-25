"""포트폴리오 마우스 포인터 (다크 = macOS 기본 커서풍, 라이트 = Windows 11 기본 커서풍).
OS 기본 크기(화살표 높이 약 20px)로 그림. 실행: python scripts/make_cursors.py"""
import math, os
from PIL import Image, ImageDraw, ImageFilter

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "cursors")
os.makedirs(OUT, exist_ok=True)
K, SIZE = 8, 32
BLACK, WHITE, RED = (0, 0, 0, 255), (255, 255, 255, 255), (232, 17, 35, 255)

def new():
    im = Image.new("RGBA", (SIZE * K, SIZE * K), (0, 0, 0, 0))
    return im, ImageDraw.Draw(im)

def P(pts): return [(x * K, y * K) for x, y in pts]

def save(im, name, shadow=True):
    if shadow:  # macOS·Windows 처럼 은은한 그림자
        a = im.split()[3].point(lambda v: v * 0.35)
        sh = Image.new("RGBA", im.size, (0, 0, 0, 0)); sh.putalpha(a)
        sh = sh.filter(ImageFilter.GaussianBlur(1.2 * K))
        base = Image.new("RGBA", im.size, (0, 0, 0, 0)); base.paste(sh, (int(0.6 * K), int(1.2 * K)), sh)
        base.alpha_composite(im); im = base
    im.resize((SIZE, SIZE), Image.LANCZOS).save(os.path.join(OUT, name))

def arrow(d, pts, fill, edge, w):
    d.polygon(P(pts), fill=fill, outline=edge, width=int(w * K))

# 화살표 모양: macOS 는 조금 통통하게, Windows 는 날렵하게
MAC_ARROW = [(1.5, 1.5), (1.5, 18.6), (5.7, 14.6), (8.5, 20.6), (11, 19.5), (8.3, 13.6), (13.8, 13.6)]
WIN_ARROW = [(1, 1), (1, 17.4), (4.8, 13.8), (7.6, 19.8), (9.9, 18.8), (7.2, 12.9), (12.2, 12.9)]

def hand(d, fill, edge, mac):
    """손가락 포인터: 검지를 편 손. 테두리 층을 먼저 크게 그리고 그 위에 안쪽 색."""
    r = 2.2 if mac else 1.6
    parts = [
        ("rr", (9, 1.2, 12.6, 14), r),       # 검지
        ("rr", (12, 7.6, 15.4, 15.5), r),    # 중지
        ("rr", (14.8, 8.6, 18.2, 15.5), r),  # 약지
        ("rr", (17.6, 10, 20.6, 15.8), r),   # 새끼
        ("rr", (8.6, 12, 20.6, 22), 3.2 if mac else 2.4),  # 손바닥
    ]
    thumb = [(4.4, 11.6), (9.4, 17.4)]
    for layer, grow, col in (("edge", 1.15, edge), ("fill", 0, fill)):
        for _, (x0, y0, x1, y1), rad in parts:
            d.rounded_rectangle(P([(x0 - grow, y0 - grow), (x1 + grow, y1 + grow)]), radius=(rad + grow) * K, fill=col)
        d.line(P(thumb), fill=col, width=int((3.4 + grow * 2) * K))
        for (x, y) in thumb:
            rr = (1.7 + grow) * K
            d.ellipse([x * K - rr, y * K - rr, x * K + rr, y * K + rr], fill=col)
    # 손가락 사이 선
    for x, y0, y1 in ((12.3, 9.5, 14.6), (15.1, 10.4, 14.8), (17.9, 11.6, 15)):
        d.line(P([(x, y0), (x, y1)]), fill=edge, width=int(0.9 * K))

def ibeam(d, color, edge, mac):
    if mac:  # macOS: 끝이 양옆으로 휘어진 I (갈매기 모양 끝)
        segs = [[(4.5, 2.6), (6.6, 3.4), (8, 4.6), (9.4, 3.4), (11.5, 2.6)], [(8, 4.6), (8, 19.4)],
                [(4.5, 21.4), (6.6, 20.6), (8, 19.4), (9.4, 20.6), (11.5, 21.4)]]
        for wid, col in ((3.6, edge), (1.6, color)):
            for sgm in segs:
                d.line(P(sgm), fill=col, width=int(wid * K), joint="curve")
        return
    for wid, col in ((3.6, edge), (1.5, color)):  # Windows: 곧은 I
        d.line(P([(8, 4), (8, 20)]), fill=col, width=int(wid * K))
        d.line(P([(5, 3.6), (11, 3.6)]), fill=col, width=int(wid * K))
        d.line(P([(5, 20.4), (11, 20.4)]), fill=col, width=int(wid * K))

def no_sign(d, cx, cy, r, edge):
    d.ellipse(P([(cx - r - 1, cy - r - 1), (cx + r + 1, cy + r + 1)]), fill=edge)
    d.ellipse(P([(cx - r, cy - r), (cx + r, cy + r)]), fill=WHITE, outline=RED, width=int(1.9 * K))
    a = math.radians(45)
    d.line(P([(cx - r * math.cos(a) * .85, cy - r * math.sin(a) * .85), (cx + r * math.cos(a) * .85, cy + r * math.sin(a) * .85)]), fill=RED, width=int(1.9 * K))

# ── 다크 = macOS (검은 화살표·흰 테두리 / 흰 손·검은 테두리) ──
im, d = new(); arrow(d, MAC_ARROW, BLACK, WHITE, 1.5); save(im, "mac-arrow.png")
im, d = new(); hand(d, WHITE, BLACK, True); save(im, "mac-hand.png")
im, d = new(); ibeam(d, BLACK, WHITE, True); save(im, "mac-text.png", shadow=False)
im, d = new(); arrow(d, MAC_ARROW, BLACK, WHITE, 1.5); no_sign(d, 17, 17, 5.2, BLACK); save(im, "mac-no.png")
# ── 라이트 = Windows 11 (흰 화살표·검은 테두리 / 흰 손·검은 테두리) ──
im, d = new(); arrow(d, WIN_ARROW, WHITE, BLACK, 1.2); save(im, "win-arrow.png")
im, d = new(); hand(d, WHITE, BLACK, False); save(im, "win-hand.png")
im, d = new(); ibeam(d, BLACK, WHITE, False); save(im, "win-text.png", shadow=False)
im, d = new(); arrow(d, WIN_ARROW, WHITE, BLACK, 1.2); no_sign(d, 17, 17, 5.2, BLACK); save(im, "win-no.png")
print("cursors ok")
