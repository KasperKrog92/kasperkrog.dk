# Design system

The visual language of kasper-krog.dk. Both front pages (`/` and `/en/`) and
the 404 use `css/site.css`. The stylesheet documents itself; the rules below
record intent.

## Front page: visual direction

Mineral grey architecture, plain language and real work. The page uses large
sans-serif headlines, generous air, thin rules and full-width project
screenshots. Brass is punctuation: the gold KK monogram, a short portrait arc, focus
rings and one seam in Kind Projects. Corners stay square except for the round
identity mark.

Clarity first. If a decorative idea makes the page harder to understand, the
idea loses.

## Front page: themes and tokens

Theme tokens live under `[data-theme="dawn"]` and `[data-theme="dusk"]` in
`css/site.css`. Use variables rather than one-off colors.

| Token | Dawn (day) | Dusk (night) |
|---|---|---|
| `--mineral` | `#f4f5f3` cool grey-white | `#16181a` near-black |
| `--plaster` | `#ffffff` | `#1c1f21` |
| `--ink` | `#16181a` | `#f1f2ef` |
| `--ink-2` | `#4a4e49` | `#c6cac4` |
| `--muted` / `--faint` | cool greys with AA contrast | pale cool greys with AA contrast |
| `--brass` (lines only) | `#a88b4e` | `#c9a960` |
| `--brass-text` | `#7c652f` | `#e0c47f` |
| `--line` / `--line-2` | mineral hairlines | charcoal hairlines |

The dawn `--plaster` panel may use white; pure black is avoided. After changing
a color, check body text, muted and faint text, links, focus rings and the Kind
Projects section in both themes. Small secondary text still needs 4.5:1
contrast.

## Front page: typography

- **Archivo** at weights 400 and 500 owns headlines, body and interface text.
- **Newsreader** italic 300 is used once per page, for *Kasper* in the hero
  greeting. Do not spread it to other headings.
- The site has no monospace, handwriting, tracked uppercase labels or
  catalogue numbering.

## Front page: components

- `.brand` + `.brand-mark`: the approved gold KK monogram with arc and star,
  rendered from `assets/kk-logo.png` at 44px beside the Archivo wordmark.
  The same text-free monogram supplies the PNG, ICO and Apple touch icons.
- `.site-nav` + `.menu-toggle`: four in-page links on desktop and a full-screen
  plain-text menu below 700px. DA/EN and the theme control stay outside it.
- `.hero`: the large greeting and CTAs beside the real greyscale portrait.
  `.portrait-ring` draws the pale circle and slowly moving brass arc.
- `.three-things`: linked Build / Gather / Help columns, stacked as ruled
  bands on narrower screens.
- `.project`: one full-width linked screenshot, project name and one sentence.
  Project images are decorative because the text names the work.
- `.also`: the hairline-topped row for small projects without full cases.
- `.kind`: the raised Kind Projects panel. `.kind-seam` is its one kintsugi
  line and draws once when the section enters the viewport.
- `.about` + `.timeline`: concise work narrative beside dated experience and
  education rows.
- `.contact` + `.site-foot`: the permanent near-black closing field. The
  footer holds only name, place and year.
- `.page-not-found`: the 404 reuses the header, the `.hero` copy and the
  footer without a portrait, and keeps the footer at the bottom of short
  screens.

Reuse an existing component when its meaning fits.

## Front page: images

Read [assets/img/README.md](../assets/img/README.md) before adding or
replacing an image.

The user-approved gold identity mark is the sole exception to the rule below.

Hard rule: **no AI-generated images on the front pages.** Only real
screenshots of real projects (`assets/img/cases/`), real photographs
(`assets/img/portraet.jpg`), or an honest designed placeholder. Optimized
JPGs, explicit `width`/`height`, `loading="lazy"` below the fold. The social
card `og.jpg` is a real screenshot of the page itself, 1200 by 630.

## Front page: motion

Motion is limited to the hero arrival, the 260-second portrait arc, one
five-second Kind Projects seam and a two-percent project-image scale on hover.
Three quick theme-control presses still summon the rain easter egg. Every move
has a useful still state and stops inside `prefers-reduced-motion: reduce`.

## Responsive behavior

At `1080px`, the hero, three-part strip and About grid stack. At `820px`, the
header uses a second row. At `700px`, page padding drops to 20px, the full-screen
menu appears, project plates shorten and the footer stacks. Test to 320px. Do
not clip focus outlines; no hover-only disclosure.
