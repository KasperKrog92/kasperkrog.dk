# Design system

The visual language and reusable pieces of kasper-krog.dk.

The source of truth for exact implementation is [css/style.css](../css/style.css).
This guide records the intent and maintenance rules.

## Visual direction

The site is a small harbor and a house with rooms. It should feel inhabited,
quiet and tactile. Warmth is more visible because the surrounding world is
dark, wet and large.

Restraint matters. Prefer one well-kept object or detail over a busier scene.
The interface should never drift toward a dashboard, campaign page or product
site.

## Themes and tokens

Theme tokens live under `[data-theme="dusk"]` and `[data-theme="dawn"]`.
Use variables rather than adding one-off colors to components. If a new visual
value differs by theme, define its token in both blocks.

| Token | Dusk | Dawn |
|---|---|---|
| `--bg` | `#0e1216` ink night | `#ece5d6` warm paper |
| `--ink` / `--ink-strong` | warm grey / parchment | dark umber |
| `--muted` | subdued warm grey | subdued brown |
| `--accent` | `#d8a45a` lantern amber | `#8a5a28` deep amber |
| `--line` | `#232b33` | `#d2c7b2` |
| `--bg-raised` | raised dark surface | raised paper surface |

The table, books and sea have their own paired tokens. Keep those values with
the theme blocks so dawn and dusk evolve together.

After changing a color, check ordinary text, muted text, links, focus rings,
book spines and image borders in both themes. Muted text still needs at least
4.5:1 contrast against its background.

## Typography

- **Cormorant Garamond**: display headings and pull quotes.
- **EB Garamond**: body copy.
- **IBM Plex Mono**: labels, tags, dates and coordinates.
- **Caveat**: handwritten marginalia through `.annotation`.

Use `.annotation` sparingly, usually no more than one or two per page. The 404
does not load Caveat because it has no annotation.

The Google Fonts stylesheet is the only tolerated external request. Keep
Georgia and Consolas fallbacks in CSS.

## Header and room books

`.site-head` is the entrance table.

- `.head-label` is the brass nameplate hanging from the top edge.
- `.site-nav` arranges the seven room links as book spines.
- The active room is pulled out with its board visible.
- The lantern rests in a rig on the same surface and becomes carried after
  scrolling.
- At dusk, light pools over the table.

The book layout depends on the fixed link order documented in
[site architecture](site-architecture.md). Desktop and the `640px` mobile
breakpoint both tune individual links with `:nth-child()`.

Hover and focus may move a book slightly. Reduced motion removes those
transforms and transitions while keeping the current room visually clear.

## Reusable components

- `.entry`: catalogue rows and project links.
- `.entry-with-image`: an entry with a decorative project-card background.
- `.journal-entry`: month-dated fragments.
- `.shelf` and `.shelf-item`: a grid of current influences or rituals.
- `.rooms` and `.room-card`: the homepage map of the house.
- `.pull`: pull quotes and short poems.
- `.signal`: contact rows.
- `.section-head` with `.mono`: section introductions.
- `.plate`: one archival image figure with a mono roman-numeral caption.
- `.room-hero`: a room opening that integrates the copy and its `.plate`.
- `.reveal`: quiet scroll arrival, disabled for reduced motion.
- `.visually-hidden`: accessible section labels without visible headings.

Reuse an existing component when its meaning fits. Do not force unrelated
material into a component merely to avoid a small, clear addition.

## Room heroes

`.room-hero` joins a room's opening copy and its numbered plate into one
composed hero, so a visitor sees farther into the room rather than meeting a
hard break between heading and image. It is not a full-bleed background: the
copy keeps a stable, opaque page-coloured field and the photograph only shows
through past the outer edge of the text.

The markup keeps copy and figure as separate semantic objects inside one
section:

- `<section class="hero page-hero room-hero room-hero-<room>">`
- `.room-hero-copy` wraps the eyebrow, `h1` and lead.
- `.room-hero-plate` is the same `.plate` figure (two stacked `<img>`s and the
  roman-numeral `figcaption`), so the dusk/dawn cross-fade and archival caption
  are unchanged.

On wide screens it is a two-column grid within `--wide`: copy on the left
within `--measure`, the plate filling the right and lower part with
`object-fit: cover`. A per-room class sets the focal point, e.g.
`.room-hero-shelf { --hero-image-position: 60% 50%; }`; the frame's left edge
sits under the veil, so keep the subject toward the right of the position. The
copy field dissolves into the image through the paired `--hero-veil` token (the
page colour at zero alpha) rather than a scrim over the text. At the `640px`
breakpoint it returns to normal flow: copy first, then the plate at its natural
aspect ratio, with no overlap or gradient.

Because the plate is now above the fold, room-hero images omit `loading="lazy"`.
No new motion is introduced — the cross-fade and reveals reuse `.plate` and
`.reveal`, which already stop under reduced motion. In use on every room page:
Shelf, Gatherings, Rituals, Journal and Keeper. Worlds keeps its inline Night
Ferry plate (an entry illustration, not a room image), and the 404 stays
image-free.

### The homepage harbor

The landing page is allowed to feel like a world of its own while the rooms
stay muted, so the harbor uses a separate `.harbor-hero` treatment rather than
the side-by-side grid. The welcome copy keeps its readable field on the page,
then the harbor opens **full-bleed** (the figure spans the full width of `main`,
not `--wide`, so no `100vw` scrollbar overflow) and rises out of the page
through a top gradient built from `--bg` and `--hero-veil`. It drops the plate
border, uses `object-fit: cover` with a shared `object-position`, and keeps the
roman-numeral caption below the water within `--measure`. The harbor moved up
into the hero, so the field notes now follow it. Same restraint rules apply:
copy never sits on the raw image, dusk and dawn both read, and no new motion is
added.

## Atmosphere layers

Most atmosphere layers are decorative and pointer-transparent. The ship is the
small exception:

- `#rain`: full-viewport canvas, pale at dusk and darker on paper at dawn.
- `.grain`: fixed film-grain overlay.
- `.sea`: fixed waterline injected by JavaScript.
- `.boat`: an accessible local-time clock crossing left to right by day and
  returning at night; its lamp follows the displayed theme. Activating it
  writes out the next line of a short verse near the water, which fades on its
  own; after the last line it falls quiet for a few presses before beginning
  again.

Rain and reveals stop under reduced motion. Sea drift, boat movement, bobbing
and lantern flicker stop too; the static scene and boat interaction remain.

Keep the layer stack deliberate. New fixed decoration can easily cover focus,
copy or the waterline.

## Images

Read [assets/img/README.md](../assets/img/README.md) before adding or replacing
an image.

Core rules:

- Use optimized JPGs, generally around 150-230 KB.
- Raw generator PNGs stay untracked.
- Give content images explicit `width` and `height`.
- Use `loading="lazy"` below the fold.
- A `.plate` has a dusk base image and a matching `-dawn.jpg` twin.
- Stack `.plate-dusk` and `.plate-dawn` in one figure; CSS cross-fades them.
- Give each version accurate alt text for the light and scene it shows.
- Use at most one numbered plate per page and continue the roman numerals.
- Project-card images live in `assets/img/projects/`, keep their subject to the
  right and leave quiet space for text on the left.

The transparent brass nameplate is the deliberate PNG exception. The social
card `og.jpg` is exactly 1200 by 630 and has no dawn twin.

## Motion

Motion should be slow enough to feel environmental rather than attention
seeking. It must never block reading or interaction.

For every new transition or animation:

1. Decide whether it communicates state or is decorative.
2. Add a useful still state.
3. Disable it inside `@media (prefers-reduced-motion: reduce)`.
4. Check that focus and hover remain understandable without movement.

## Responsive and focus behavior

The main small-screen breakpoint is `640px`, but test narrower widths down to
about `320px`. The target routine check is around `380px`.

Do not clip focus outlines inside the table, cards or image frames. Touch
interactions must work on the first tap; do not add hover-only disclosure.
