# Plan: a waterline and a small boat

Status: implemented · June 2026

## The idea

A fixed strip of water at the bottom of the viewport, on every page,
independent of the content scrolling above it. A small boat crosses it once
per half-day, steered by the visitor's clock:

| Local time | Where the boat is |
|---|---|
| 07:00 | far left, setting out |
| 13:00 | mid-water, heading right |
| 18:59 | arriving at the right edge |
| 19:00 | turning; lamp lit |
| 01:00 | mid-water, heading left |
| 06:59 | arriving home at the left edge |

During dusk a small lantern on the boat is lit.

## Verdict: feasible, and cheap

This fits the hard rules without strain. No framework, no build step, no
external request. The cost is one new section in `js/main.js` (~40 lines, no
animation loop), one new block in `css/style.css`, and a small inline SVG.
The site is a harbor; this gives the harbor water. Plate i on the front page
already shows boats at their moorings, so the image is native, not imported.

The crucial framing: **this is a clock, not an animation.** The boat moves
about 0.14% of the crossing per minute, which is one or two pixels. Nobody
watches it sail. They notice it is somewhere else than yesterday evening,
the way you notice the harbor from a window.

## Behavior

- **Position** is a pure function of the visitor's local time, using the
  same boundaries as `timeTheme()` in [main.js](../js/main.js) (07:00 and
  19:00), so the boat and the theme always agree about what part of the day
  it is. Local time, not the Aarhus footer clock: the water belongs to
  whoever is looking at it.
- **Heading.** Left to right from 07:00 to 19:00, then mirrored
  (`scaleX(-1)`) right to left overnight. Twelve hours each way, edge to
  edge.
- **The lamp** follows the *displayed* theme, not the clock:
  `[data-theme="dusk"] .boat-lamp { opacity: 1 }`. This means the header
  lantern button also lights and douses the boat's lamp. The two lanterns
  agree, which is the kind of detail this site is for. (So a visitor who
  forces dusk at noon sees a lit boat mid-water heading right. That is
  charming, not a bug.)
- **Continuity.** JS sets the position once a minute, piggybacking on the
  existing 60-second theme interval (one clock in the codebase, not two).
  A `transition: left 60s linear` on the boat tweens between the minute
  marks, so the motion is genuinely continuous at sub-pixel speed.

## Where it sits: the layer stack

Current stack: `#rain` z-0 · `main`/`.site-foot` z-1 · `.site-head` z-2 ·
`.grain` z-3 · `.skip-link` z-10.

The sea goes at **z-index 2**, fixed to the viewport bottom,
`pointer-events: none`, `aria-hidden="true"`:

- Content scrolls *behind* it: text sinks below the waterline at the bottom
  edge of the viewport instead of being clipped by it. (Alternative
  considered: z-0 like the rain, with text scrolling over the water. Rejected
  for legibility; text on waves is noise, text slipping under a waterline is
  an image.)
- Rain at z-0 falls behind the sea and vanishes at the horizon, which is
  what rain does.
- Grain at z-3 stays on top of the water like everything else.
- Height token `--sea-h: clamp(52px, 8vh, 84px)` (tune by eye).
- **Footer clearance:** `body { padding-bottom: var(--sea-h) }` so the
  footer, scrolled all the way down, rests just above the waterline on
  every page including the 404.

## Markup: injected by main.js, not duplicated

The header nav is duplicated by hand because it differs per page
(`aria-current`). The sea is identical on all eight pages and is meaningless
without JS (the boat needs the clock), so `main.js` builds it and appends it
to `<body>`. One source, no drift, and no-JS visitors get a calm page with
no water, exactly as they currently get no rain. The 404 page loads
`/js/main.js` already, so it gets the sea for free.

DOM sketch:

```html
<div class="sea" aria-hidden="true">
  <div class="boat">
    <span class="boat-bob">
      <svg viewBox="0 0 44 36" width="44" height="36">
        <!-- hull, mast and sail in currentColor -->
        <!-- lamp: a 2px circle near the stern, fill var(--accent),
             class="boat-lamp" -->
      </svg>
    </span>
  </div>
</div>
```

## CSS work (css/style.css)

1. **Tokens.** Add to both theme blocks, mirroring how the rain colors its
   drops (pale strokes on night, ink strokes on paper):
   - dusk: `--sea-line: rgba(213, 205, 186, 0.16)`, `--sea-body: #0b0f13`
   - dawn: `--sea-line: rgba(50, 44, 36, 0.22)`, `--sea-body: #e0d7c3`
   Values are first guesses; tune against both themes.
2. **`.sea`**: `position: fixed; inset: auto 0 0 0; height: var(--sea-h);
   z-index: 2; pointer-events: none;` background is a vertical gradient from
   transparent through `--sea-body`, with a 1px `--sea-line` top edge as the
   horizon. Color transitions at the same 0.7s ease the body uses.
3. **Waves**: `::before` and `::after` carry a small repeating SVG wave path
   (data URI, like the grain texture) drifting horizontally via
   `transform: translateX` keyframes at two different slow speeds, roughly
   90s and 140s loops, opposite directions. Slow enough to read as water,
   not weather.
4. **`.boat`**: `position: absolute; bottom: ~30%;
   left: calc(var(--sail, 0) * (100% - 44px)); color: var(--ink);
   transition: left 60s linear;`. `.boat.westward svg { transform: scaleX(-1) }`.
5. **`.boat-bob`**: gentle keyframes, ±2px translateY and ±1.2deg rotate
   over ~7s, ease-in-out alternate. Kept on the inner span so it composes
   with the flip.
6. **`.boat-lamp`**: `opacity: 0; transition: opacity 1.2s ease;` (the
   rain-opacity timing). At dusk: `opacity: 1` plus a soft glow,
   `filter: drop-shadow(0 0 4px var(--accent-soft))`.
7. **Reduced motion**: waves stop, bob stops, the 60s left-transition goes.
   The boat still sits at its hour and the lamp still lights, because a
   still painting of a moored boat is not motion. (Conservative alternative
   if it reads wrong in testing: `display: none` on `.sea`, matching the
   rain.)

## JS work (js/main.js)

New section after the rain, plus one line in the existing minute interval:

```js
/* --- the water ---------------------------------------------------- */
function sailProgress(d) {
  var m = d.getHours() * 60 + d.getMinutes();
  var DAWN = 420, DUSK = 1140;            // 07:00, 19:00 — match timeTheme()
  if (m >= DAWN && m < DUSK) {
    return { sail: (m - DAWN) / 720, west: false };
  }
  var night = (m - DUSK + 1440) % 1440;
  return { sail: 1 - night / 720, west: true };
}
```

Build the `.sea` DOM (inline SVG string), append to body, then:

```js
function moor() {
  var p = sailProgress(new Date());
  sea.style.setProperty("--sail", p.sail);
  boat.classList.toggle("westward", p.west);
}
moor();
// and call moor() inside the existing 60 000 ms theme interval
```

No requestAnimationFrame, no resize handler (the position is percentage
based), no listeners. The rain loop stays untouched.

## What stays out

No sound. No gulls, fish, clouds or second boat. No interaction with the
boat; it does not care about the cursor. No speeding up time so people can
"see it work". One boat, twelve hours each way. The water does not need to
be deep.

## Verifying (per AGENTS.md checklist)

- Both themes via the lantern: horizon line and wave strokes keep ~AA-ish
  visibility without shouting; lamp lights at dusk, goes out at dawn.
- Boundary minutes by faking the clock in DevTools (override `Date` or
  temporarily hardcode): 06:59, 07:00, 12:59, 18:59, 19:00, 00:00,
  midnight wrap.
- ~380px width: boat still reads at 44px or shrink slightly; sea height
  clamp behaves.
- Reduced motion: nothing moves; static scene (or hidden, if that route).
- Keyboard pass: no new tab stops, skip link unaffected, focus ring never
  hides behind the sea.
- Scroll every page (and 404) to the very bottom: footer text rests above
  the waterline, nothing important permanently occluded.
- Footer mono text contrast unchanged (the sea never overlaps it at full
  scroll because of the body padding).

## Two notes for later

- `AGENTS.md` atmosphere-layers paragraph should grow one sentence when this
  ships (`#rain` canvas, `.grain` overlay, and the sea with its boat).
- This `plans/` folder is in the repo root, so GitHub Pages will serve it
  publicly at `/plans/`. Plain markdown, harmless, but add it to
  `.gitignore` if plans should stay off the public site.
