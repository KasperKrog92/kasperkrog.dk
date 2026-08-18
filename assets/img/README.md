# assets/img — the picture drawer

All images are committed as optimized JPGs (raw PNGs are gitignored). To
regenerate from a PNG:

```sh
ffmpeg -i name.png -q:v 4 name.jpg
```

## The professional front (`/` and `/en/`)

Hard rule: **no AI-generated images here.** Only real screenshots of real
projects, real photographs, or an honest designed placeholder.

| File | Wired into | What it is |
|---|---|---|
| `cases/folk-festival.jpg` | hero + case 03 | Real screenshot of aarhusfolkfestival.dk (captured 2026-08) |
| `cases/matchabladet.jpg` | hero + case 05 | Real screenshot of matchabladet.dk |
| `cases/turkis-crew.jpg` | case 01 | Real screenshot of the Turkis Crew events page, logged in as the disposable test volunteer. Contains no personal data; never publish shots of /home or /crew (they show real volunteers) |
| `cases/gamestormers.jpg` | case 02 | Real screenshot of gamestormers.dk |
| `cases/amanda-barup.jpg` | case 04 | Real screenshot of Amanda Barup's portfolio (staging) |
| `cases/tp.jpg` | unused spare | Real screenshot of tp.kasper-krog.dk (public page, no personal data) |
| `portraet.jpg` | hero, both languages | Real photograph of Kasper (Aarhus, 2026), cropped 4:5 and gently graded toward the site's warm palette |
| `og.jpg` | `og:image`, both languages | Real screenshot of the front page itself in the dawn theme, exactly 1200×630 (recaptured 2026-08 after the logo/hero round) |

Screenshots are captured at 1600×1000 (headless browser), saved with
`-q:v 4`, and land around 100–250 KB. When a project's live site changes
meaningfully, recapture rather than letting the case image drift out of date.

## Identity assets (outside this folder)

The KK monogram's source sheet is `icon.png` in the repository root. The web
assets are derived from it (background removed, recolored to the theme
tokens, plated for favicons) by a small Pillow script; they live in `assets/`
because everything under `assets/img/**/*.png` is gitignored:

| File | What it is |
|---|---|
| `assets/kk-mark.png` | transparent monogram, dawn colors (ink + brass) |
| `assets/kk-mark-dusk.png` | transparent monogram, dusk colors (parchment + brass) |
| `assets/favicon.ico` (+ root copy `favicon.ico`) | monogram on an ivory plate, 16/32/48 |
| `assets/favicon.png` | 64×64 plate (also referenced by the rooms) |
| `assets/apple-touch-icon.png` | 180×180 plate, square (iOS rounds it) |

## The old house (rooms + 404)

The rooms keep their original plates and chrome, untouched by the redesign:

| File (+ `-dawn.jpg` twin) | Wired into | As |
|---|---|---|
| `journal.jpg` | journal/index.html | pl. ii — room hero |
| `shelf.jpg` | shelf/index.html | pl. iii — room hero |
| `gatherings.jpg` | gatherings/index.html | pl. iv — room hero |
| `worlds.jpg` | worlds/index.html | pl. v — under the Night Ferry fragment |
| `rituals.jpg` | rituals/index.html | pl. vi — room hero |
| `keeper.jpg` | keeper/index.html | pl. vii — room hero |
| `kasper-krog-plate.png` | every room header | the brass nameplate (the committed-PNG exception) |
| `ship.svg` | rooms via js/main.js | the ship on the waterline, dusk and dawn frames |

Each `.plate` figure stacks a dusk base image and a `-dawn.jpg` twin; CSS
cross-fades them with the theme. Room-plate conventions (object-position,
no `loading="lazy"` above the fold, roman-numeral captions) are documented in
the git history of `docs/design-system.md` and visible in the room markup.

Removed in the August 2026 redesign: `harbor.jpg` (+ dawn), the old
`projects/` card backgrounds, and the generated `og.jpg`. The front page now
uses only real material.
