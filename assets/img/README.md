# assets/img — the picture drawer

The plates of the house. All images are committed as optimized JPGs
(~150–230 KB); raw generator PNGs are gitignored. To regenerate from a PNG:

```sh
ffmpeg -i name.png -q:v 4 name.jpg
```

| File | Wired into | As |
|---|---|---|
| `harbor.jpg` | index.html | pl. i — between the field notes and the archive |
| `journal.jpg` | journal/index.html | pl. ii — after the hero |
| `shelf.jpg` | shelf/index.html | pl. iii — after the hero |
| `gatherings.jpg` | gatherings/index.html | pl. iv — after the hero |
| `worlds.jpg` | worlds/index.html | pl. v — directly under the Night Ferry fragment |
| `rituals.jpg` | rituals/index.html | pl. vi — after the hero |
| `keeper.jpg` | keeper/index.html | pl. vii — after the hero |
| `og.jpg` | index.html `og:image` | social share card, exactly 1200×630 |

House style for any new image: analog 35mm film photography (worlds.jpg is
the painterly exception), heavy grain, muted deep ink-blue-black with warm
amber, melancholic but warm, no text in the image. Use the `.plate` figure
component (thin border + mono roman-numeral caption) and continue the
numbering.
