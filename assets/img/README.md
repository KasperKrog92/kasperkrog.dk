# assets/img — the picture drawer

All images are committed as optimized JPGs (raw PNGs are gitignored). To
regenerate from a PNG:

```sh
ffmpeg -i name.png -q:v 4 name.jpg
```

## Site images

Apart from the approved identity mark documented below, **no AI-generated
images.** Only real screenshots of real
projects, real photographs, or an honest designed placeholder.

| File | Wired into | What it is |
|---|---|---|
| `cases/folk-festival.jpg` | project 01 | Real screenshot of aarhusfolkfestival.dk (captured 2026-08) |
| `cases/turkis-crew.jpg` | project 03 | Real screenshot of the redesigned events page at crew.turkis.nu/events, in Danish, captured 2026-10-02 using the read-only test volunteer. Shows events and aggregate shift staffing, with no private volunteer information. Never publish shots of /home or /crew (they show real volunteers) |
| `cases/gamestormers.jpg` | project 02 | Real screenshot of gamestormers.dk |
| `cases/amanda-barup.jpg` | project 04 | Real screenshot of Amanda Barup Pihlkjær's live portfolio at abp-tegning.dk (captured 2026-08-27) |
| `portraet.jpg` | hero, both languages | Real photograph of Kasper (Aarhus, 2026), cropped 4:5 and rendered greyscale by CSS |
| `og.jpg` | `og:image`, both languages | Real screenshot of the mineral front page in dawn, exactly 1200×630 (recaptured 2026-08-27) |

Screenshots are captured at 1600×1000 (headless browser), saved with
`-q:v 4`, and land around 100–250 KB. When a project's live site changes
meaningfully, recapture rather than letting the case image drift out of date.

## Identity assets (outside this folder)

The gold KK monogram with its arc and star was supplied and explicitly approved
by Kasper on 2026-09-11 for the logo and favicon. This identity mark is the sole
exception to the site's no-generated-imagery rule. The original was cropped
to omit the name below, with stray red/yellow edge pixels removed and its real
alpha transparency preserved. All three pages use it beside the HTML wordmark
and as their favicon.

| File | What it is |
|---|---|
| `assets/kk-logo.png` | Approved 490×490 transparent gold monogram, without the name; source for web icons |
| `assets/favicon.png` | 64×64 transparent monogram, all pages |
| `assets/favicon.ico` (+ root copy `favicon.ico`) | Transparent monogram at 16/32/48 pixels |
| `assets/apple-touch-icon.png` | 180×180 monogram on an opaque mineral background |
| `icon.png`, `assets/kk-mark.png`, `assets/kk-mark-dusk.png` | Retained legacy identity assets; not used by current page markup |

Regenerate icon sizes on Windows with `tools/make-identity-assets.ps1`
(PowerShell and FFmpeg).
