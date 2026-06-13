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
- `.reveal`: quiet scroll arrival, disabled for reduced motion.
- `.visually-hidden`: accessible section labels without visible headings.

Reuse an existing component when its meaning fits. Do not force unrelated
material into a component merely to avoid a small, clear addition.

## Atmosphere layers

The atmosphere is decorative and pointer-transparent:

- `#rain`: full-viewport canvas, pale at dusk and darker on paper at dawn.
- `.grain`: fixed film-grain overlay.
- `.sea`: fixed waterline injected by JavaScript.
- `.boat`: a local-time clock crossing left to right by day and returning at
  night; its lamp follows the displayed theme.

Rain and reveals stop under reduced motion. Sea drift, boat movement, bobbing
and lantern flicker stop too; the static scene may remain.

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
