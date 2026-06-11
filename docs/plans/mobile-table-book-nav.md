# Table Book Nav

Plan for replacing the current text navigation with a small table scene: books
in uneven piles, each book a room link, with the lantern resting on the same
surface.

## Intent

The header should stay visible and tactile. It should feel like an object in the
house, not a strip of links.

The image is simple: a narrow wooden table near the entrance. A few books lie in
small horizontal piles. Each spine is a link. The active room is slightly pulled
out. The lantern button stands on the same table instead of floating apart from
the room list.

This keeps all rooms present while giving the header a local metaphor: a shelf
of rooms becomes a table where the rooms have been set down for the visitor.

## Current State

- The header is duplicated in every page.
- `.site-head` contains the home label, `.site-nav`, and `#lantern`.
- On small screens, `.site-head` becomes a two-column grid.
- `.site-nav` wraps normal text links across rows.
- `#lantern` is fixed in the top right and gets a generated `.lantern-dock`
  placeholder from `js/main.js`.

The current structure is accessible and simple. The plan should preserve that:
normal anchors, `aria-current="page"`, visible focus, no hidden menu state.

## Chosen Direction

Create a table scene across desktop and mobile.

The desktop header becomes the fuller version of the scene:

- `.site-head` becomes a broad table container.
- The home label sits like a small maker's mark near the back edge.
- `.site-nav` becomes a composed arrangement of book piles.
- Each `.site-nav a` becomes a book spine.
- `#lantern` rests at the right side of the table, visually related to the
  books.
- The active link is pulled out by a small transform and amber edge.
- Hover and focus pull a book slightly farther out.

At the mobile breakpoint, the same object compresses:

- `.site-head` becomes the table container.
- The home label sits above or on the back edge of the table.
- `.site-nav` becomes a compact book-pile area.
- `#lantern` sits visually on the table at the top right.
- Reduced motion removes animated pull movement and keeps static states.

No dropdown, no hamburger, no modal. The links remain links.

## Visual Shape

The desktop header should read as a still life with air around it:

```text
KASPER KROG

┌──────────────────────────────────────────────────────────────┐ lantern
│ [ HARBOR        ]   [ JOURNAL     ][ SHELF ]                 │
│   [ GATHERINGS        ]      [ WORLDS ][ RITUALS ][ KEEPER ] │
└──────────────────────────────────────────────────────────────┘
```

The mobile header should keep the same idea in a tighter shape:

```text
KASPER KROG                         lantern

┌──────────────────────────────────────────┐
│ [ HARBOR        ]                        │
│   [ JOURNAL     ][ SHELF ]               │
│ [ GATHERINGS        ]                    │
│      [ WORLDS ][ RITUALS ][ KEEPER ]     │
└──────────────────────────────────────────┘
```

That sketch is only structural. The real version should be quieter:

- thin table line and a soft top shadow using existing tokens
- muted ink for closed books
- amber for the active book edge
- small offsets between books so the piles feel placed by hand
- no heavy wood texture, no literal illustration
- no new image asset required unless later tests show CSS alone feels too thin

## Markup Approach

Keep the existing HTML if possible.

The anchors can be styled using structural selectors:

- `.site-nav a:nth-child(1)` through `.site-nav a:nth-child(7)` for width,
  offset and pile placement
- `.site-nav a[aria-current="page"]` for the pulled book
- `.site-nav a:focus-visible` and `.site-nav a:hover` for interaction

If the CSS becomes too brittle, add one neutral class to the nav:

```html
<nav class="site-nav table-books mono" aria-label="Rooms of the site">
```

Avoid per-link wrapper markup unless the design needs real vertical stacks.
Every repeated header would need the same edit, so the first pass should keep
the surface small.

## CSS Plan

Build the table treatment as the default header style, then adjust spacing and
pile geometry inside the existing `@media (max-width: 640px)` block.

Suggested pieces:

- `.site-head`
  - become the table stage at all widths
  - use grid or flex layout depending on what keeps the lantern aligned
  - add `padding-bottom`
  - add a table surface with `::after`
  - use `border-bottom` or a pseudo-element for the tabletop edge

- `.site-nav`
  - become a compact grid or flex-wrap area
  - set stable dimensions so book offsets do not move the hero below
  - use `align-content` and `gap` to make two or three short piles
  - use wider spacing on desktop and tighter spacing on mobile

- `.site-nav a`
  - display as block
  - fixed-ish width via `inline-size`
  - small height around `1.55rem`
  - border using `--line`
  - background from `--bg-raised`
  - text remains mono and readable
  - `box-shadow` creates the page edge
  - `transform` handles the pulled-book state

- `#lantern`
  - decide whether it should remain fixed after scroll or live in the header
  - visually align to the table surface on first paint
  - test with the existing `.lantern-dock` logic before changing JS

Use only existing color tokens. If new tokens are needed for the table surface,
define them under both themes instead of hard-coding color values.

## Interaction

Default:

- all books visible
- current page is pulled out slightly
- lantern sits at the table's upper-right corner

Pointer hover:

- book moves a few pixels horizontally or down, depending on pile direction
- color warms to `--accent`

Keyboard focus:

- same visual intent as hover, plus the existing focus outline
- focus outline must not be clipped by the table container

Touch:

- first tap follows the link
- no separate open state required

Reduced motion:

- remove transitions and transform animation
- keep active/current visual state

## Desktop Behavior

Desktop can carry a calmer, more spacious version:

- The nav may remain in a single composed band rather than a tight stack.
- The lantern can sit at the right edge of the table and still keep its current
  carried behavior while scrolling, if that feels useful.
- The active book should be clear but not loud.
- The table line should be light enough that the hero still owns the first
  viewport.

## Mobile Behavior

Mobile should feel like the same table seen closer:

- Fewer gaps.
- More vertical stacking.
- Book widths tuned to fit `320px` without clipping.
- Lantern remains tappable and separate from text.

## JS Plan

Start with no nav-specific JavaScript.

Revisit `js/main.js` only if the fixed lantern and `.lantern-dock` make the
table composition impossible. If JS is needed, keep it limited to aligning the
existing carried/docked behavior with the table scene.

## Implementation Steps

1. Build the desktop CSS prototype first, because it defines the full object.
2. Compress that object for mobile inside the existing breakpoint.
3. Tune the seven book widths and offsets across all current room names.
4. Decide whether the lantern remains fixed after scroll or belongs fully to the
   table.
5. Check both themes manually by using the lantern.
6. Check desktop widths around `1024px`, `1280px`, and wide screens.
7. Check mobile widths around `320px`, `375px`, `390px`, and `430px`.
8. Verify keyboard tab order: skip link, home label, books, lantern, main.
9. Verify `prefers-reduced-motion` keeps the header calm.
10. Apply the same header class or markup change to every page only if needed.
11. Update `AGENTS.md` if the table nav becomes a durable site convention.

## Risks

- Long room names can make book spines too wide at `320px`.
- A full desktop treatment could compete with the hero if the table is too
  heavy.
- Too much decoration could make the header feel busy before the first sentence.
- Fixed lantern positioning may fight the table composition when scrolling.
- `nth-child` layout is easy to tune but can become fragile if rooms are added.

The first pass should favor restraint: recognizable table, readable books,
ordinary links.

## Verification Checklist

- The active page is clear in both themes.
- All links remain visible without opening a menu.
- Text has WCAG AA contrast against the book/background surface.
- No book label wraps awkwardly or clips.
- Focus rings are visible.
- The hero still begins comfortably below the header.
- The lantern remains tappable and does not cover a book.
- Reduced motion disables pull transitions.

## Parked Alternatives

These are the other directions discussed. They are not part of this
implementation plan, but they remain available if the table scene does not feel
right.

### Shelf Nav

A horizontal shelf of book spines. Every room is visible in one scrollable row,
with the active book pulled forward.

### Archive Tabs

The nav becomes paper index tabs, closer to a card catalogue or drawer. Quieter
and probably the most conservative option.

### Room Keys

The links become small hanging key tags for the house rooms. This leans into the
keeper and house metaphor more than the shelf metaphor.

### Open Book

The current room appears as a larger open book, with the other rooms arranged as
smaller spines nearby. More theatrical, and likely more demanding to make
accessible without hiding links.
