# Design system

The visual language of kasper-krog.dk. Both front pages (`/` and `/en/`) and
the 404 use `css/site.css`. The stylesheet documents itself; the rules below
record intent.

## Front page: visual direction

**Linjen** (October 2026): the page is one light-rail line with eight stops.
Hej, Aarhus Folk Festival, Gamestormers, turkis Crew, Café Hygge, Kind
projects (the interchange), Om mig and Skriv til mig (the terminus). A line
diagram is one of the most legible pictures there is, and it belongs to
Kasper without showing anything from his workplace.

On wide screens the route diagram sits under the header and one stop is shown
at a time, with no page scroll. On phones, and whenever the script has not
run, the page itself is the line: every stop stacked on one vertical brass
track, read by scrolling.

Mineral grey architecture, plain language and real work stay. Brass marks the
track already travelled, the current stop, the kicker rule above each heading,
the Kind projects card edge and focus rings. Corners stay square except for
stop dots and the rounded favicon square.

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
| `--muted` | `#5f645e` | `#a9ada7` |
| `--brass` (lines only) | `#a88b4e` | `#c9a960` |
| `--brass-text` | `#7c652f` | `#e0c47f` |
| `--line` | track and hairlines | track and hairlines |
| `--board`, `--board-ink`, `--board-muted` | departure board, dark in both themes | |

`--track` (6px) is the width of the line, stop rings and the Kind card edge.
`--stops` is the number of stops in the route grid; change it with the markup.

After changing a color, check body text, muted text, route labels, the board,
links and focus rings in both themes. Small secondary text still needs 4.5:1
contrast.

## Front page: typography

- **Archivo** at weights 400 and 500 owns headlines, body, interface and the
  board. The board uses tabular figures, not a monospace face.
- **Newsreader** italic 300 is used once per page, for *Kasper* in the
  greeting ("Hej, jeg hedder *Kasper*." / "Hi, my name is *Kasper*."), which
  sits in the wider `.stop-first` column so it stays on one line. Do not spread it to other headings.
- No monospace, handwriting or tracked uppercase labels. Stop counts
  ("Station 3 af 8") are the only numbering, and only on wide screens.

## Front page: components

- `.brand`: the wordmark *Kasper Krog* in Archivo 500. There is no logo;
  the favicon repeats the brass station ring.
- `.board`: the small departure board in the header: clock, Aarhus and the
  next stop. Decorative (`aria-hidden`); below 900px only the clock remains.
- `.head-tools`: DA/EN, the theme control and, on phones only, a "Skriv" link
  to the terminus.
- `.route`: the line diagram, an ordered list of in-page links. `.terminus`
  marks the two ends, `.interchange` marks Kind projects, `.passed` and
  `aria-current="step"` are set by the script. `.train` is the small carriage
  that rides to the current stop.
- `.stop`: one platform. `.stop-copy` holds `.stop-kicker` (a short role
  word: Bygger, Samler, Leger, Skift her, Endestation), the heading, copy and
  `.stop-actions`. The other column holds a `.plate` screenshot, the
  `.portrait`, the `.kind-card` or the `.timeline`.
- `.stop-foot`: the "Næste: …" row the script adds to every stop but the last.
- `.button` (+ `.button-secondary`), `.text-link`, `.email`.
- `.page-not-found`: the 404 reuses the header (with a static board) and a
  single `.stop` without the route.

Reuse an existing component when its meaning fits. A new project is a new
stop: add it to the route, the platforms and `--stops` in both languages.

## Front page: images

Read [assets/img/README.md](../assets/img/README.md) before adding or
replacing an image.

Hard rule: **no AI-generated images on the front pages.** Only real
screenshots of real projects (`assets/img/cases/`), real photographs
(`assets/img/portraet.jpg`), or an honest designed placeholder. Optimized
JPGs, explicit `width`/`height`, `loading="lazy"` below the fold. The social
card `og.jpg` is a real screenshot of the page itself, 1200 by 630.

## Front page: motion

Motion is limited to the platform arrival (a 28px slide in the direction of
travel), the brass progress line and train moving along the route, a slight
dot scale on hover and a two-percent screenshot scale on hover. Three quick
theme-control presses still summon the rain easter egg. Every move has a
useful still state and stops inside `prefers-reduced-motion: reduce`.

## Responsive behavior

At `900px` and wider, with the script running, one stop is shown at a time
and the body fills the viewport; test at 1280x720. Below `900px` the route and
"Næste" rows hide, the page becomes the vertical line, and the screenshot
moves under the copy. Below `560px` "Aarhus" and the theme word hide, and below
`400px` the board hides so the wordmark keeps its room. Test to 320px. Do not clip focus outlines; no hover-only disclosure.
