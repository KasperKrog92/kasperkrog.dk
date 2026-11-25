# Design system

The visual language of kasper-krog.dk. Both front pages (`/` and `/en/`) and
the 404 use `css/site.css`. The stylesheet documents itself; the rules below
record intent.

## Visual direction

A plain page (November 2026), read top to bottom: greeting, work, Kind
projects, about, contact. Kasper asked for a simple site in the colors he
likes, with no concept or gimmick laid over it. The earlier light-rail layout
(*Linjen*) is retired; do not bring back route diagrams, boards, easter eggs
or decorative type.

Mineral grey surfaces, plain language and real work carry the page. Brass is
the one accent: link underlines, the small section label, the Kind projects
panel edge, the theme dot and focus rings. Corners are square.

Clarity first. If a decorative idea makes the page harder to understand, the
idea loses.

## Themes and tokens

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
| `--line` | hairlines | hairlines |

After changing a color, check body text, muted text, links, buttons and focus
rings in both themes. Small secondary text still needs 4.5:1 contrast.

## Typography

**Archivo** at weights 400 and 500 is the only typeface. Headings are modest
(the `h1` tops out at 3rem) and set like the rest of the text: no italics,
accent faces, monospace, tracked uppercase labels, oversized display type or
animated text.

## Components

- `.site-head`: the name *Kasper Krog* (`.brand`, no logo), `.site-nav` with
  four in-page links, the DA/EN switch and the theme control. Below 760px the
  nav wraps to its own row.
- `.section`: one block of the page at the shared content width (66rem), with
  a hairline between sections.
- `.intro`: greeting, lead, one sentence, two actions and the `.portrait`.
- `.projects`: a two-column grid of `.project` cards (one column below
  620px). A card is a linked `.shot` screenshot, an `h3`, one or two
  sentences and a `.text-link` to the live site.
- `.kind`: the Kind projects panel, on `--plaster` with a brass left edge. It
  holds the `.label`, the question, the invitation, a `.button` and
  `.kind-list`. It is the only boxed section; keep it that way so the
  invitation stands out.
- `.about`, `.contact`: a heading and a short paragraph; contact has the
  `.email` link.
- `.button` (+ `.button-secondary`), `.text-link`, `.label`, `.lead`,
  `.actions`.
- `.page-not-found`: the 404 reuses the header without the nav and one
  `.section`.

Reuse an existing component when its meaning fits. A new project is a new
`.project` card in both languages.

## Images

Read [assets/img/README.md](../assets/img/README.md) before adding or
replacing an image.

Hard rule: **no AI-generated images.** Only real screenshots of real projects
(`assets/img/cases/`), real photographs (`assets/img/portraet.jpg`), or an
honest designed placeholder. Optimized JPGs, explicit `width`/`height`,
`loading="lazy"` on the project screenshots. The social card `og.jpg` is a
real screenshot of the page itself, 1200 by 630.

## Motion

Almost none: a short color fade when the theme changes and on button hover.
Nothing slides, scales or scrolls by itself. The fades stop inside
`prefers-reduced-motion: reduce`.

## Responsive behavior

One breakpoint at `760px` (header nav wraps; intro and Kind projects become
one column) and one at `620px` (projects become one column). Test to 320px.
Do not clip focus outlines; no hover-only disclosure.
