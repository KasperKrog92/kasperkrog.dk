# assets/img — the picture drawer

All images are committed as optimized JPGs (raw PNGs are gitignored). To
regenerate from a PNG:

```sh
ffmpeg -i name.png -q:v 4 name.jpg
```

## Site images

**No AI-generated images.** Only real screenshots of real projects, real
photographs, or an honest designed placeholder.

| File | Wired into | What it is |
|---|---|---|
| `cases/folk-festival.jpg` | Aarhus Folk Festival stop | Real screenshot of aarhusfolkfestival.dk (captured 2026-08) |
| `cases/turkis-crew.jpg` | turkis Crew stop | Real screenshot of the redesigned events page at crew.turkis.nu/events, in Danish, captured 2026-10-02 using the read-only test volunteer. Shows events and aggregate shift staffing, with no private volunteer information. Never publish shots of /home or /crew (they show real volunteers) |
| `cases/gamestormers.jpg` | Gamestormers stop | Real screenshot of gamestormers.dk |
| `cases/cafe-hygge.jpg` | Café Hygge stop | Real screenshot of the live hygge.kasper-krog.dk in "Enjoy an idle café" mode: the fully furnished café after about 90 seconds of ordinary service, no interface showing (captured 2026-10-31 with headless Chrome) |
| `portraet.jpg` | first stop, both languages | Real photograph of Kasper (Aarhus, 2026), cropped 4:5 and rendered greyscale by CSS |
| `og.jpg` | `og:image`, both languages | Real screenshot of the Linjen front page (first stop, footer hidden) in dawn, exactly 1200×630 (recaptured 2026-10-31) |

Screenshots are captured at 1600×1000 (headless browser), saved with
`-q:v 4`, and land around 100–250 KB. When a project's live site changes
meaningfully, recapture rather than letting the case image drift out of date.

## Identity assets (outside this folder)

The site has no logo. The header is the wordmark *Kasper Krog* set in
Archivo. The icon is the brass station ring from the route on a near-black
rounded square, drawn as plain vector geometry (chosen by Kasper on
2026-10-31, replacing the gold KK monogram).

| File | What it is |
|---|---|
| `assets/favicon.svg` | Source of the icon on a 32-unit grid: corner radius 7, ring radius 8.5, ring width 4.5, `#16181a` and `#c9a960` |
| `assets/favicon.png` | 64×64 rendering, all pages |
| `assets/favicon.ico` (+ root copy `favicon.ico`) | 16/32/48 pixel renderings |
| `assets/apple-touch-icon.png` | 180×180, square and opaque (iOS applies its own mask) |
| `icon.png`, `assets/kk-mark.png`, `assets/kk-mark-dusk.png` | Retired legacy monogram assets; not used by any page |

Regenerate the PNG and ICO files on Windows with
`tools/make-identity-assets.ps1` (PowerShell only). It draws the same
geometry as `favicon.svg`; change both together, and bump the `?v=` on the
icon links in all three pages.
