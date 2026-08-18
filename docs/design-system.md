# Design system

The visual language of kasper-krog.dk. Since August 2026 the site has two
design layers with separate stylesheets:

- **The professional front** (`/` and `/en/`): `css/site.css`. This file's
  first half documents itself; the rules below record intent.
- **The old house** (rooms + 404): `css/style.css`, unchanged. Its original
  rules are preserved at the bottom of this guide.

## Front page: visual direction

Nordic culture magazine × professional portfolio × well-made tool. Editorial
grid, generous air, thin dividers, mono labels like `01 / PROJEKT`, real
screenshots in thin frames, a single handwritten margin note per section at
most. Never SaaS, never agency, never a wall of identical cards.

Clarity first. If a decorative idea makes the page harder to understand, the
idea loses.

## Front page: themes and tokens

Theme tokens live under `[data-theme="dawn"]` and `[data-theme="dusk"]` in
`css/site.css`. Use variables rather than one-off colors.

| Token | Dawn (day) | Dusk (night) |
|---|---|---|
| `--bg` | `#f2ecdf` warm ivory | `#12161c` charcoal blue-black |
| `--bg-raised` | `#f8f4ea` | `#181e26` |
| `--bg-deep` | `#e9e1cd` | `#0d1117` |
| `--ink` / `--ink-strong` | charcoal / near-black | warm grey / parchment |
| `--muted` | `#676153` | `#99917e` |
| `--brass` (decorative) | `#a07a30` | `#c09055` |
| `--accent-ink` (links, accent text) | `#74551c` | `#d8a45a` |
| `--line` / `--line-soft` | warm paper lines | dark steel lines |
| `--kind-*` | the dark Kind Projects panel keeps its own night palette in both themes |

Pure `#fff` and `#000` are avoided everywhere. After changing a color, check
body text, muted text, links, focus rings and the kind section in both themes;
muted text still needs 4.5:1 contrast.

## Front page: typography

- **Cormorant Garamond** (serif): wordmark, h1–h3, pull quotes. Italic `em`
  inside headings for emphasis.
- **Schibsted Grotesk** (sans): body copy and UI text.
- **IBM Plex Mono**: labels, tags, metadata, coordinates, buttons and the
  navigation. Always with `.mono` (uppercase, letterspaced).
- **Caveat** via `.hand`: handwritten margin notes. At most one or two per
  page.

## Front page: components

- `.section-grid` + `.rail`: every section is a two-column grid with a sticky
  mono label rail on the left (stacks on mobile).
- `.hero-grid` + `.hero-shots` + `.shot`: the hero copy beside two stacked,
  slightly rotated screenshot frames. `.shot` is the standard frame for any
  real screenshot: raised background, thin border, mono caption.
- `.skills-list`: the four numbered competence areas.
- `.case`: one project case; image and text columns alternate via
  `:nth-of-type(even)`. Contains `.case-label`, `.case-meta`, `.case-role`,
  `.tag-row`.
- `.more-list`: the small "andre ting" index.
- `.about-grid` + `.portrait` + `.timeline`: narrative beside the real
  portrait photograph and a compact experience timeline.
- `.kind`: the dark Kind Projects band with `.kind-list` checklist.
- `.rooms-row`: the mono links into the old house.
- `.contact-rows`: label/value contact rows.
- `.reveal`: quiet scroll arrival; requires JavaScript, harmless without.

Reuse an existing component when its meaning fits.

## Front page: images

Read [assets/img/README.md](../assets/img/README.md) before adding or
replacing an image.

Hard rule: **no AI-generated images on the front pages.** Only real
screenshots of real projects (`assets/img/cases/`), real photographs
(`assets/img/portraet.jpg`), or an honest designed placeholder. Optimized
JPGs, explicit `width`/`height`, `loading="lazy"` below the fold. The social
card `og.jpg` is a real screenshot of the page itself, 1200 by 630.

## Front page: motion

Motion is environmental and optional: reveals, small hover lifts, the lantern
transition, and the summoned rain (easter egg, three quick lantern presses).
Every new transition needs a useful still state and must stop inside
`@media (prefers-reduced-motion: reduce)`.

## Responsive behavior

Breakpoints at `1000px` (rails and grids stack, case columns collapse) and
`680px` (navigation wraps, secondary hero shot hides, timeline and contact
rows stack). Test down to about `320px`. Do not clip focus outlines; no
hover-only disclosure.

## The old house (rooms + 404)

`css/style.css` still owns the rooms and is deliberately untouched by the
redesign: dusk/dawn tokens (`#0e1216` ink night / `#ece5d6` warm paper,
lantern amber accents), Cormorant Garamond / EB Garamond / IBM Plex Mono /
Caveat, the entrance-table header with book-spine navigation and brass
nameplate, `.plate` figures with dusk/dawn twins, canvas rain, grain, sea and
boat. Its component inventory and image rules are preserved in
[assets/img/README.md](../assets/img/README.md) and in the git history of
this file. When working inside a room, match the room's existing idiom, not
the front page's.
