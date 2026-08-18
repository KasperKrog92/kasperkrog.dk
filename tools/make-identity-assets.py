# Deriver web-assets fra icon.png (KK-monogrammet).
# Output: assets/kk-mark.png, assets/kk-mark-dusk.png, assets/favicon.png,
#         assets/favicon.ico, assets/apple-touch-icon.png
from PIL import Image, ImageDraw

SRC = 'icon.png'
BG = (246, 238, 224)          # arkets ivory-baggrund
NAVY_OUT = (25, 30, 38)       # --ink-strong (dawn)
GOLD_OUT = (160, 122, 48)     # --brass (dawn)
NAVY_DUSK = (236, 229, 212)   # --ink-strong (dusk)
GOLD_DUSK = (203, 156, 85)    # --kind-brass

im = Image.open(SRC).convert('RGB')
W, H = im.size
px = im.load()

def dist(p, q):
    return abs(p[0]-q[0]) + abs(p[1]-q[1]) + abs(p[2]-q[2])

# 1) Find det store symbols bounding box (øverste del af arket).
minx, miny, maxx, maxy = W, H, 0, 0
navy_samples, gold_samples = [], []
for y in range(0, 740):
    for x in range(W):
        p = px[x, y]
        if dist(p, BG) > 60:
            if x < minx: minx = x
            if x > maxx: maxx = x
            if y < miny: miny = y
            if y > maxy: maxy = y
            lum = (p[0]+p[1]+p[2])/3
            if lum < 70:
                navy_samples.append(p)
            elif p[0]-p[2] > 40 and 80 < lum < 210:
                gold_samples.append(p)

def avg(samples):
    n = len(samples)
    return tuple(sum(s[c] for s in samples)//n for c in range(3))

navy_ref = avg(navy_samples)
gold_ref = avg(gold_samples)
print('bbox', (minx, miny, maxx, maxy), 'navy', navy_ref, 'gold', gold_ref,
      'n_navy', len(navy_samples), 'n_gold', len(gold_samples))

def unblend(p, ref):
    alphas = []
    for c in range(3):
        denom = BG[c] - ref[c]
        if abs(denom) < 8:
            continue
        alphas.append((BG[c] - p[c]) / denom)
    a = sum(alphas) / len(alphas)
    spread = max(alphas) - min(alphas)
    # straf alfa uden for [0,1]
    pen = max(0.0, a - 1.0) + max(0.0, -a)
    return max(0.0, min(1.0, a)), spread + 3*pen

pad = 14
box = (max(0, minx-pad), max(0, miny-pad), min(W, maxx+pad+1), min(H, maxy+pad+1))
cw, ch = box[2]-box[0], box[3]-box[1]

# 2) Byg gennemsigtigt monogram: klassificér hver pixel som navy eller guld.
mark = Image.new('RGBA', (cw, ch), (0, 0, 0, 0))
mpx = mark.load()
classes = Image.new('L', (cw, ch), 0)   # 0=tom, 1=navy, 2=guld
cpx = classes.load()
for y in range(box[1], box[3]):
    for x in range(box[0], box[2]):
        p = px[x, y]
        if dist(p, BG) <= 12:
            continue
        aN, eN = unblend(p, navy_ref)
        aG, eG = unblend(p, gold_ref)
        if eN <= eG:
            a, ref, cls = aN, NAVY_OUT, 1
        else:
            a, ref, cls = aG, GOLD_OUT, 2
        if a < 0.04:
            continue
        mpx[x-box[0], y-box[1]] = (ref[0], ref[1], ref[2], round(a*255))
        cpx[x-box[0], y-box[1]] = cls

def recolor(src_mark, navy, gold):
    out = src_mark.copy()
    opx = out.load()
    for y in range(ch):
        for x in range(cw):
            cls = cpx[x, y]
            if cls == 0:
                continue
            a = opx[x, y][3]
            ref = navy if cls == 1 else gold
            opx[x, y] = (ref[0], ref[1], ref[2], a)
    return out

mark_dusk = recolor(mark, NAVY_DUSK, GOLD_DUSK)

def scaled(img, height):
    w = round(img.width * height / img.height)
    return img.resize((w, height), Image.LANCZOS)

scaled(mark, 320).save('assets/kk-mark.png')
scaled(mark_dusk, 320).save('assets/kk-mark-dusk.png')

# 3) Favicon-plade: ivory kvadrat med monogrammet, let afrundet.
def plate(size, pad_frac=0.18, radius_frac=0.0):
    canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(canvas)
    r = int(size * radius_frac)
    d.rounded_rectangle([0, 0, size-1, size-1], radius=r, fill=BG + (255,))
    inner = size - 2 * int(size * pad_frac)
    m = mark.copy()
    m.thumbnail((inner, inner), Image.LANCZOS)
    canvas.alpha_composite(m, ((size - m.width)//2, (size - m.height)//2))
    return canvas

plate(256, 0.16, 0.19).save('assets/favicon.ico',
    sizes=[(16, 16), (32, 32), (48, 48)])
plate(64, 0.14, 0.19).save('assets/favicon.png')
plate(180, 0.17, 0.0).save('assets/apple-touch-icon.png')
print('done')
