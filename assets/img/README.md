# assets/img — the picture drawer

The plates of the house. All images are committed as optimized JPGs
(~150–230 KB); raw generator PNGs are gitignored. To regenerate from a PNG:

```sh
ffmpeg -i name.png -q:v 4 name.jpg
```

(Daylight images compress worse; drop to `-q:v 6` if a dawn plate lands
over budget.)

Every plate exists twice: the base name is the dusk version, and a
`-dawn.jpg` twin (same scene, same composition, morning after rain) follows
the theme. Each `.plate` figure holds both as stacked `<img>` elements
(`.plate-dusk` first, `.plate-dawn` on top, each with its own alt text);
CSS grid stacks them and the dawn twin cross-fades in with `[data-theme]`.
No JavaScript is involved.

| File (+ `-dawn` twin) | Wired into | As |
|---|---|---|
| `harbor.jpg` | index.html | pl. i — full-bleed homepage hero, above the field notes |
| `journal.jpg` | journal/index.html | pl. ii — room hero (integrated with the copy) |
| `shelf.jpg` | shelf/index.html | pl. iii — room hero (integrated with the copy) |
| `gatherings.jpg` | gatherings/index.html | pl. iv — room hero (integrated with the copy) |
| `worlds.jpg` | worlds/index.html | pl. v — directly under the Night Ferry fragment |
| `rituals.jpg` | rituals/index.html | pl. vi — room hero (integrated with the copy) |
| `keeper.jpg` | keeper/index.html | pl. vii — room hero (integrated with the copy) |
| `og.jpg` | index.html `og:image` | social share card, exactly 1200×630, no dawn twin |

Every room plate (Shelf, Gatherings, Rituals, Journal and Keeper) is also the
integrated room hero (see
[room heroes](../../docs/design-system.md#room-heroes)). On wide screens CSS
crops them to the right/lower part of the hero with a per-room
`object-position`, and the frame's left edge sits under the copy veil, so keep
the subject toward the right and survivable at both a full plate and a hero
crop. Because they are above the fold there, those `<img>`s omit
`loading="lazy"`. The mobile layout shows the same file at its natural ratio,
so one source pair per room should serve both; only regenerate with more
breathing room if a plate cannot survive both treatments.

Project-card backgrounds live in `assets/img/projects/`. They use the same
base-name / `-dawn` pairing, but are decorative wide crops rather than
numbered plates. Keep the subject toward the right, leave quiet space on the
left for copy, and let the card CSS provide the final fade.

| File (+ `-dawn` twin) | Project card |
|---|---|
| `projects/gamestormers.jpg` | Aarhus Gamestormers |
| `projects/turkis.jpg` | Turkis Crew |
| `projects/matchabladet.jpg` | Matchabladet |
| `projects/solis.jpg` | Solis Lantern Chronicles |
| `projects/folk-festival.jpg` | Aarhus Folk Festival |

## The sailing ship

`ship.svg` is the ship crossing the fixed waterline. It contains aligned dusk
and dawn frames so the hull, brick-red sails, rigging, portholes and ripple can
carry their own theme-specific colors. CSS selects the matching frame, while
JavaScript positions and turns the ship according to the visitor's local time.
The artwork sits inside an accessible button that reveals a short harbor
sentence. Keep both frames aligned when editing its artwork or palette.

## The nameplate (the one committed PNG)

`kasper-krog-plate.png` is the brass placard that hangs by its chains from the
top-left of every page's header, in place of a text wordmark. It is the single
exception to the JPG rule: it needs transparency to sit over the page and show
its chains, so it ships as a quantized RGBA PNG (~30 KB) and earns an explicit
allow in `.gitignore` (`!assets/img/kasper-krog-plate.png`). It has no dawn
twin; the brass reads in both themes, and CSS gives it a `drop-shadow`.

It is wired in as `<a class="head-label"><img ...></a>` (no `loading="lazy"` —
it is above the fold), and the `.head-label` rule lifts it by the header's top
padding so the chains meet the very top edge of the page. If you regenerate it,
keep the chains cut flat at the top, trim the transparent margins tight, keep
it center-symmetric, and update the `aspect-ratio` baked into `width`/`height`
and the `.head-label` CSS to match.

House style for any new image: analog 35mm film photography (worlds.jpg is
the painterly exception), heavy grain, muted deep ink-blue-black with warm
amber, melancholic but warm, no text in the image. Dawn twins stay muted
and Nordic-overcast: grey-gold morning light, wet surfaces, never sunny.
Use the `.plate` figure component (thin border + mono roman-numeral
caption), continue the numbering, and give every new plate both versions.
