"""포트폴리오 마우스 포인터 생성 (다크=터미널풍, 라이트=Windows풍). 실행: python scripts/make_cursors.py"""
import os
from PIL import Image, ImageDraw

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "cursors")
os.makedirs(OUT, exist_ok=True)
K, SIZE = 8, 32
ARROW = [(2, 1.5), (2, 23), (7.5, 18), (11.5, 26.5), (15.5, 24.8), (11.6, 16.6), (18.5, 16.6)]

def canvas():
    im = Image.new("RGBA", (SIZE * K, SIZE * K), (0, 0, 0, 0))
    return im, ImageDraw.Draw(im)

def sc(pts): return [(x * K, y * K) for x, y in pts]

def arrow(fill, edge, badge=None, name=""):
    im, d = canvas()
    d.polygon(sc(ARROW), fill=fill, outline=edge, width=int(1.6 * K))
    if badge:  # 꼬리 옆 작은 표시 (터미널 커서 블록 / Windows 강조 사각형)
        color, kind = badge
        if kind == "caret":
            d.rectangle(sc([(21, 20), (26, 28.5)]), fill=color, outline=edge, width=int(1.1 * K))
        else:
            d.rounded_rectangle(sc([(20.5, 20.5), (28, 28)]), radius=1.5 * K, fill=color, outline=edge, width=int(1.1 * K))
    im.resize((SIZE, SIZE), Image.LANCZOS).save(os.path.join(OUT, name))

def ibeam(color, edge, name):
    im, d = canvas()
    for w, c in ((3.4, edge), (1.6, color)):
        d.line(sc([(16, 6), (16, 26)]), fill=c, width=int(w * K))
        d.line(sc([(11.5, 5), (20.5, 5)]), fill=c, width=int(w * K))
        d.line(sc([(11.5, 27), (20.5, 27)]), fill=c, width=int(w * K))
    im.resize((SIZE, SIZE), Image.LANCZOS).save(os.path.join(OUT, name))

DARK_BG, GREEN, CYAN, INK = (11, 14, 20, 255), (126, 231, 135, 255), (86, 212, 221, 255), (230, 237, 243, 255)
BLUE, WHITE, BLACK = (0, 103, 192, 255), (255, 255, 255, 255), (27, 27, 27, 255)

# 다크(터미널): 밝은 화살표 + 초록 터미널 커서 블록 / 누를 수 있는 곳은 초록 화살표
arrow(INK, DARK_BG, (GREEN, "caret"), "dark-arrow.png")
arrow(GREEN, DARK_BG, (CYAN, "caret"), "dark-pointer.png")
ibeam(GREEN, DARK_BG, "dark-text.png")
# 라이트(Windows): 흰 화살표 + 검은 테두리 / 누를 수 있는 곳은 Windows 파란 화살표
arrow(WHITE, BLACK, (BLUE, "square"), "light-arrow.png")
arrow(BLUE, (0, 45, 90, 255), (WHITE, "square"), "light-pointer.png")
ibeam(BLACK, WHITE, "light-text.png")
print("cursors ok")
