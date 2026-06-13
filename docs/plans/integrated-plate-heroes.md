# Integrated plate heroes

Status: proposed

## Decision

Integrate the room plate into the hero, but do not turn it into a conventional
full-bleed background with all copy laid over the photograph.

The preferred direction is a composed, image-backed hero:

- The hero copy keeps a stable dusk or dawn field behind it.
- The plate occupies the right and lower part of the hero on wide screens.
- The image may pass a short distance behind the edge of the copy field, using
  a theme-specific gradient to join the two.
- On small screens, the copy remains above the plate. The two belong to one
  hero component, but text is not placed over a narrow portrait crop.
- The existing border, caption, paired theme images and archival meaning stay.
- There is no parallax, zoom, animated crop or other new motion.

This should feel like entering a room and seeing farther into it, not like a
campaign landing page.

## Why this direction

The current desktop layout already lets the top edge of the plate enter the
first viewport. That quiet threshold works. The opportunity is to remove the
large structural break between hero and image, not simply to make the image
larger.

A literal background treatment has several problems:

- The plates do not share a reliable area of negative space. Shelf, Gatherings,
  Rituals and Keeper all place important objects in different parts of the
  frame.
- Dawn plates can be bright and visually busy, so one shared text shadow or
  translucent scrim would not guarantee WCAG AA contrast.
- A desktop landscape image cropped into a tall mobile hero loses much of its
  subject and makes the opening of each room slower to read.
- CSS background images would weaken the current figure semantics, alt text and
  numbered caption unless the content image were duplicated.
- Full-bleed cinematic heroes would make every room feel more promotional and
  less like an accumulated archive.

The composed approach keeps the image prominent while preserving the site's
restraint and the plate as an object someone placed in the room.

## Findings from the visual pass

Checks were made at the normal 1280 by 720 browser size and at 380 by 812, in
both dusk and dawn on the Journal page. The plate pairs for the other rooms
were also inspected directly.

- At 1280 pixels wide, the Journal hero ends at about 588 pixels and its plate
  begins immediately there. Only the top of the image enters the first
  viewport.
- At 380 pixels wide, the header and hero use about 630 pixels before the plate
  begins. The current image is still legible, but a tall background crop would
  compete with the heading and lead.
- Dusk images generally tolerate a left-side fade. Dawn images vary more and
  need a real page-colored copy field rather than text directly over the image.
- Shelf is the strongest first prototype because its subject reads clearly at
  several crops and its darker shelf can sit behind a restrained edge fade.
- Gatherings is the useful stress test because the people, window frames,
  lamps and game boxes make it the busiest composition.
- Rituals has a central subject and should not be forced into the same
  right-weighted crop as Shelf.
- The Journal plate is already marked for replacement because it shows paper.
  The Keeper plate also shows an open paper notebook, which conflicts with the
  personal sourcebook and becomes more noticeable if enlarged.
- The Worlds plate illustrates the Night Ferry fragment. Moving it into the
  page hero would change its editorial meaning.

## Scope

### First rollout

Build and validate the shared treatment on:

1. Shelf, as the initial prototype.
2. Gatherings, as the difficult composition and contrast test.
3. Rituals, using a centered focal treatment.

Once the component works across those three, apply it to Keeper after its image
has been reviewed, and to Journal after the planned paper-free replacement is
ready.

### Deliberate exceptions

**Worlds**

Keep the Night Ferry plate beside its fragment. If Worlds needs the same kind
of opening as the other rooms, make a separate room-level image rather than
using an illustration that belongs to one entry.

**Homepage**

Treat the harbor separately after the room heroes settle. Its opening includes
the invitation and field notes, and its 16:9 plate currently acts as a
threshold into the archive. A possible homepage variant may let the harbor
rise behind the lower edge of the hero, but it should not be folded into the
first shared-room implementation.

**404**

Do not add an image-backed hero. The short lost-page treatment is already an
intentional exception.

## Proposed HTML contract

Keep the copy and figure as separate semantic objects inside one hero section:

```html
<section class="hero page-hero room-hero room-hero-shelf">
  <div class="room-hero-copy">
    <p class="mono eyebrow reveal">...</p>
    <h1 class="reveal">...</h1>
    <p class="lead reveal">...</p>
  </div>

  <figure class="plate room-hero-plate reveal">
    <img class="plate-dusk" ...>
    <img class="plate-dawn" ...>
    <figcaption class="mono">...</figcaption>
  </figure>
</section>
```

Do not duplicate an image as both an `<img>` and a CSS background. Keep the
existing two-image dusk/dawn cross-fade and figure semantics.

Page-specific classes or custom properties may define focal position:

```css
.room-hero-shelf {
  --hero-image-position: 58% 50%;
}
```

Use named page classes rather than `:nth-child()` or selectors tied to document
order.

## CSS approach

### Wide screens

- Keep the component within `--wide`; do not make the photograph viewport-wide.
- Use a grid or layered grid with a minimum hero height around 30 to 34rem.
- Let the plate occupy roughly the right 58 to 64 percent of the component.
- Keep the copy within `--measure` and in the left 48 to 55 percent.
- Add a theme token for the copy-to-image veil in both dusk and dawn.
- Make the copy side effectively opaque. The image should only show through
  near the outer edge of the text field, not behind body text.
- Use `object-fit: cover` with a per-page `object-position`.
- Keep one quiet border around the visible image plane. Avoid a card shadow.
- Place the caption at the lower image edge, still outside the photograph if
  that gives better contrast.
- Keep the overall opening close to the current vertical footprint. The
  integration should not create a new full-screen intro.

### Small screens

- Switch to normal document flow at the existing `640px` breakpoint.
- Keep copy first and the plate second inside the same section.
- Remove the desktop overlap and gradient.
- Use the image's natural aspect ratio or a mild crop no shallower than about
  4:3. Do not crop it into a portrait panel.
- Reduce the gap between copy and image so they read as one opening.
- Keep the caption visible and the image border intact.
- Confirm the plate begins within or close to the first viewport at 380 pixels,
  without squeezing the heading or lead.

### Motion and themes

- Preserve the current 0.7 second dusk/dawn image cross-fade.
- Preserve the no-transition state under `prefers-reduced-motion`.
- Add no scroll-linked movement.
- Keep all new theme-dependent colors as paired tokens in the dusk and dawn
  blocks.

## Image work before rollout

1. Replace the Journal pair with the already planned paper-free scene. Compose
   it for both a full plate and a right/lower hero crop.
2. Review and likely replace the Keeper pair so the enlarged scene does not
   present a paper notebook as Kasper's own practice.
3. Test existing files before generating special crops. Prefer one source pair
   per room and CSS focal positions when the result is sound.
4. If a plate cannot survive both the wide and mobile treatment, regenerate the
   pair with more breathing room instead of adding a separate desktop and
   mobile asset set.
5. Keep the current optimized JPG budget and update
   `assets/img/README.md` when an image changes.

## Implementation sequence

1. Add the `room-hero`, `room-hero-copy` and `room-hero-plate` styles without
   changing the existing generic `.hero` and `.plate` behavior elsewhere.
2. Convert Shelf to the new markup and tune its focal position in dusk, dawn,
   desktop and mobile.
3. Convert Gatherings and adjust the shared component until its busy image does
   not reduce copy contrast or make the opening feel crowded.
4. Convert Rituals and confirm the shared rules allow a centered subject
   without a one-off layout.
5. Review the diff and component naming before applying it to more pages.
6. Replace and convert Journal.
7. Review or replace and convert Keeper.
8. Decide whether the homepage needs its own restrained harbor variant.
9. Leave Worlds unchanged unless a separate room-level hero image is made.
10. Update `docs/design-system.md`, `docs/site-architecture.md`,
    `docs/working-on-the-site.md` and `assets/img/README.md` with the final
    durable component and image rules.

## Verification

For each converted page:

- Check dusk and dawn after the image transition has settled.
- Check 1280 by 720, 380 by 812 and 320 pixels wide.
- Check reduced motion and confirm the image changes without a transition.
- Check 200 percent zoom and text reflow.
- Confirm heading, lead and caption contrast meet WCAG AA in both themes.
- Confirm focus outlines remain visible and are not clipped by the image layer.
- Confirm the skip link still moves focus to `main`.
- Confirm both image variants retain accurate alt text and dimensions.
- Confirm no horizontal scrolling and no content hidden behind the sea.
- Confirm the first content after the hero is not pushed substantially farther
  down than it is now.
- Check the browser console for errors.
- Compare one converted room with Worlds to ensure the inline plate still looks
  intentional rather than unfinished.

## Acceptance criteria

The treatment is ready to extend when:

- The image and copy read as one opening without text depending on the image
  for contrast.
- Shelf, Gatherings and Rituals all work from one shared component with only
  focal-position adjustments.
- Mobile presents copy first and preserves the plate's subject.
- Dusk and dawn feel equally designed.
- The numbered plate still reads as an archival object.
- The result feels more inhabited and spatial, but no more promotional.

