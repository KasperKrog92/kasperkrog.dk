# Site architecture

The structural and runtime contracts of kasper-krog.dk.

## Technical shape

The site is static, dependency-free HTML, CSS and JavaScript. There is no
framework, package manager, templating system or build step.

GitHub Pages serves the repository root. Room pages live in named directories
so their public URLs end with a slash.

| File | Public URL | Role |
|---|---|---|
| `index.html` | `/` | Professional front page, Danish (primary language) |
| `en/index.html` | `/en/` | Professional front page, English mirror |
| `journal/index.html` | `/journal/` | *Notesbogen* (old house) |
| `shelf/index.html` | `/shelf/` | *Hylden* (old house) |
| `gatherings/index.html` | `/gatherings/` | *Forsamlingshuset* (old house) |
| `worlds/index.html` | `/worlds/` | *Baglokalet* (old house) |
| `rituals/index.html` | `/rituals/` | *Ritualer* (old house) |
| `keeper/index.html` | `/keeper/` | *Værten* (old house) |
| `404.html` | any missing path | Lost in the rain (old house shell) |
| `css/site.css` | `/css/site.css` | Front-page design system, both themes |
| `js/site.js` | `/js/site.js` | Front-page runtime: lantern, language memory, reveals, rain easter egg |
| `css/style.css` | `/css/style.css` | Old-house design system (rooms + 404 only) |
| `js/main.js` | `/js/main.js` | Old-house runtime (rooms + 404 only) |

`CNAME` holds the custom domain and `.nojekyll` disables Jekyll processing.

## The two front pages

`index.html` (Danish) and `en/index.html` (English) are hand-kept mirrors.
Every content change on one must land on the other, idiomatically translated
rather than word for word. Shared structure:

1. `<html lang="da">` / `<html lang="en">` with `data-theme="dusk"` default.
2. Unique title/description per language, Open Graph metadata, canonical URL
   and a full `hreflang` pair (`da`, `en`, `x-default` → Danish).
3. The inline pre-paint theme script (see theme contract).
4. One Google Fonts request: Cormorant Garamond, Schibsted Grotesk, IBM Plex
   Mono, Caveat.
5. Skip link → `<main id="main-content" tabindex="-1">`.
6. Sticky header: serif wordmark, mono anchor navigation, DA/EN switch,
   lantern button.
7. Sections in order: hero, det jeg kan / what I do, projekter / projects,
   om mig / about (with timeline), kind projects (dark), mere personligt /
   more personal (room links), kontakt / contact, footer.
8. `js/site.js` at the end of `<body>`.

The old rooms keep their own shell (brass nameplate, seven book-spine room
links, rain canvas). Their "Harbor" link now leads to the new front page. Do
not add the front page's navigation to the rooms or vice versa.

## Navigation contracts

Front pages: the header links are in-page anchors in this order: Om mig /
About, Det jeg kan / What I do, Projekter / Projects, Erfaring / Experience,
Jeg kan hjælpe / I can help, Kontakt / Contact. The wordmark links to the
page's own root (`./`).

Rooms: the original seven-link book-spine order (Harbor, Journal, Shelf,
Gatherings, Worlds, Rituals, Keeper) is unchanged and still styled by
`:nth-child()` in `css/style.css`. Each room marks itself with
`aria-current="page"`.

## Theme contract

The default theme in markup is dusk. An inline script in every page head runs
before first paint:

- Dawn is 07:00 through 18:59 in the visitor's local time.
- Dusk is 19:00 through 06:59.
- A valid saved override in `localStorage` under `kk-theme` wins.
- The saved object contains `theme` and `expiresAt`.
- The override expires after three hours.
- Invalid or expired data is removed.
- The script updates both `data-theme` and the browser `theme-color`
  (front: `#f2ecdf` dawn / `#12161c` dusk; rooms keep their own colors).

The logic is repeated after load and re-checked every minute and on tab
visibility, by `js/site.js` on the front pages and `js/main.js` in the rooms.
If the boundaries, key, stored shape or colors change, update every inline
script and both runtime files together.

## Language contract

- Danish is the default and lives at `/`. English lives at `/en/`.
- The DA/EN switch is a plain link pair; JavaScript stores the last explicit
  choice in `localStorage` under `kk-lang` but never redirects automatically.
- `hreflang` pairs and `og:locale` are set on both pages; `x-default` points
  to the Danish page.

## Front-page runtime (`js/site.js`)

One dependency-free IIFE:

- The lantern toggles dawn and dusk, stores the three-hour override and keeps
  `aria-pressed` in sync.
- Language links write `kk-lang` on click.
- `IntersectionObserver` reveals `.reveal` elements once; without JavaScript
  or with reduced motion everything is visible from the start (the observer
  adds the `js-reveal` class before hiding anything).
- Easter egg: three lantern presses within 1.6 seconds summon a light canvas
  rain for about half a minute. It never runs under reduced motion.

Core copy, links and navigation must remain useful if the script fails.

## Paths and links

- The Danish front page uses root-level relative paths (`css/site.css`).
- The English front page uses `../` paths (`../css/site.css`).
- Room pages use relative local paths such as `../css/style.css`.
- The 404 uses root-absolute paths.
- Canonical URLs use `https://kasper-krog.dk/` with trailing slashes.
- External links use HTTPS; `target="_blank"` always pairs with
  `rel="noopener"`.

Do not add remote scripts, tracking pixels or embeds. Google Fonts is the sole
allowed external page request.

## Accessibility contract

- Keep one `<main>` landmark with the skip-link target.
- Preserve logical heading order; each front-page section is labelled by its
  own heading via `aria-labelledby`.
- Keep visible keyboard focus and sensible source-order navigation.
- Decorative canvas, grain and inline SVG details stay out of the
  accessibility tree.
- Images need useful alt text in the page's own language unless genuinely
  decorative.
- Text, including muted text, must meet WCAG AA contrast in both themes.
- New motion must stop under `prefers-reduced-motion`.

## Public repository boundary

Assume tracked files can be read publicly. That includes `docs/`, planning
notes and personal context in `KASPER.md`. Store only material that is
appropriate for the public repository. Employer-internal tooling and data
(vagtplan/OCC, driver names, workplace screenshots) never enter this repo.
