# Site architecture

The structural and runtime contracts of kasper-krog.dk.

## Technical shape

The site is static, dependency-free HTML, CSS and JavaScript. There is no
framework, package manager, templating system or build step.

GitHub Pages serves the repository root. Room pages live in named directories
so their public URLs end with a slash.

| File | Public URL | Role |
|---|---|---|
| `index.html` | `/` | The harbor: hero, field notes, archive and room map |
| `journal/index.html` | `/journal/` | *Notesbogen* |
| `shelf/index.html` | `/shelf/` | *Hylden* |
| `gatherings/index.html` | `/gatherings/` | *Forsamlingshuset* |
| `worlds/index.html` | `/worlds/` | *Baglokalet* |
| `rituals/index.html` | `/rituals/` | *Ritualer* |
| `keeper/index.html` | `/keeper/` | *Værten* |
| `404.html` | any missing path | Lost in the rain |
| `css/style.css` | `/css/style.css` | All visual rules and both themes |
| `js/main.js` | `/js/main.js` | Theme controls, clock, reveals, rain and sea |

`CNAME` holds the custom domain and `.nojekyll` disables Jekyll processing.

## Shared page shell

There is no include system. The head, atmosphere markup, header navigation and
footer are duplicated by hand across pages. A shell change is therefore a
multi-file change.

Every ordinary page includes:

1. `<!DOCTYPE html>` and `<html lang="en" data-theme="dusk">`.
2. UTF-8 and responsive viewport metadata.
3. A unique title, description and canonical URL.
4. The lantern favicon and `theme-color`.
5. The inline pre-paint theme script before CSS.
6. Google Fonts preconnects and the shared font stylesheet.
7. The correctly relative link to `css/style.css`.
8. The skip link targeting `<main id="main-content" tabindex="-1">`.
9. `#rain`, `.grain`, `.site-head`, the room navigation and `#lantern`.
10. A single main landmark with logical heading order.
11. The shared footer with `#aarhus-time`.
12. The correctly relative script link to `js/main.js`.

The homepage also carries Open Graph and Twitter card metadata. Add equivalent
social metadata to another page only when there is a real sharing need and a
suitable image.

The 404 is a deliberate exception:

- It uses root-absolute asset and room URLs because it may be served from any
  path.
- It has `noindex`.
- It omits the canonical URL and shared footer.
- Its Google Fonts request is smaller because it does not use Caveat or every
  display weight.

## Navigation contract

The seven room links must remain in this order everywhere:

1. Harbor
2. Journal
3. Shelf
4. Gatherings
5. Worlds
6. Rituals
7. Keeper

`css/style.css` assigns book size, position and color with `:nth-child()`.
Changing the order, adding a room or removing one requires coordinated CSS and
mobile layout changes, not only an HTML edit.

Each ordinary page marks exactly one room link with `aria-current="page"`.
The 404 marks none. The brass `.head-label` always links home.

When adding a room, update every page header, the homepage room map, this file,
[KASPER.md](../KASPER.md) and any navigation CSS tied to link count or order.

## Theme contract

The default theme in markup is dusk. An inline script in every page head runs
before first paint:

- Dawn is 07:00 through 18:59 in the visitor's local time.
- Dusk is 19:00 through 06:59.
- A valid saved override in `localStorage` under `kk-theme` wins.
- The saved object contains `theme` and `expiresAt`.
- The override expires after three hours.
- Invalid or expired data is removed.
- The script updates both `data-theme` and the browser `theme-color`.

`js/main.js` repeats this logic after load, checks once a minute and checks
again when a hidden tab becomes visible. If the boundaries, key, stored shape
or colors change, update every inline script and `main.js` together.

The visitor's clock controls theme and boat position. The footer clock is
different: it always formats the current time in `Europe/Copenhagen`.

## Runtime behavior

`js/main.js` is one dependency-free IIFE using browser APIs directly.

- The lantern toggles dawn and dusk, stores the three-hour override and keeps
  `aria-pressed` in sync.
- JavaScript inserts the lantern dock used by the carried-on-scroll behavior.
- `IntersectionObserver` reveals `.reveal` elements once.
- The rain canvas animates only when reduced motion is not requested.
- JavaScript injects the decorative `.sea` and an accessible boat button into
  the body.
- Boat position is derived from local time and updated by the minute.
- Activating the boat writes out the next line of a fixed verse, pausing for a
  few presses after the last line before repeating, and announces each whole
  line through a polite live region.
- The water remains decorative. The boat and lantern are buttons.

Keep new JavaScript optional where possible. Core copy, links and navigation
must remain useful if the script fails.

## Paths and links

- Ordinary room pages use relative local paths such as `../css/style.css`.
- The homepage uses root-level relative paths such as `css/style.css`.
- The 404 uses root-absolute paths such as `/css/style.css`.
- Canonical URLs use `https://kasper-krog.dk/` and trailing slashes for rooms.
- External links use HTTPS where supported.
- External links that use `target="_blank"` also use `rel="noopener"`.

Do not add remote scripts, tracking pixels or embeds. Google Fonts is the sole
allowed external page request.

## Accessibility contract

- Keep one `<main>` landmark with the skip-link target.
- Preserve logical heading order; visually hidden headings may label sections.
- Keep visible keyboard focus and sensible source-order navigation.
- Keep `aria-current` accurate.
- Decorative canvas, grain, water and inline SVG details stay out of the
  accessibility tree.
- Images need useful alt text unless they are genuinely decorative.
- Text, including muted text, must meet WCAG AA contrast in both themes.
- New motion must stop under `prefers-reduced-motion`.

## Public repository boundary

Assume tracked files can be read publicly. That includes `docs/`, planning
notes and personal context in `KASPER.md`, whether or not a browser renders the
Markdown as a site page. Store only material that is appropriate for the
public repository.
