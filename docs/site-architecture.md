# Site architecture

The structural and runtime contracts of kasper-krog.dk.

## Technical shape

The site is static, dependency-free HTML, CSS and JavaScript. There is no
framework, package manager, templating system or build step.

GitHub Pages serves the repository root. The English page lives in `en/` so
its public URL ends with a slash.

| File | Public URL | Role |
|---|---|---|
| `index.html` | `/` | Professional front page, Danish (primary language) |
| `en/index.html` | `/en/` | Professional front page, English mirror |
| `404.html` | any missing path | Not found page in Danish, with a button to the English front page |
| `css/site.css` | `/css/site.css` | Design system for all three pages, both themes |
| `js/site.js` | `/js/site.js` | Runtime for all three pages: theme, language memory, mobile menu, seam, rain easter egg |

`CNAME` holds the custom domain and `.nojekyll` disables Jekyll processing.

## The two front pages

`index.html` (Danish) and `en/index.html` (English) are hand-kept mirrors.
Every content change on one must land on the other, idiomatically translated
rather than word for word. Shared structure:

1. `<html lang="da">` / `<html lang="en">` with `data-theme="dusk"` default.
2. Unique title/description per language, Open Graph metadata, canonical URL
   and a full `hreflang` pair (`da`, `en`, `x-default` → Danish).
3. The inline pre-paint theme script (see theme contract).
4. One Google Fonts request: Archivo 400/500 and Newsreader italic 300.
5. Skip link → `<main id="main-content" tabindex="-1">`.
6. Non-sticky header: gold KK monogram, Archivo wordmark, four anchor links,
   DA/EN switch, theme control and a full-screen mobile menu.
7. Sections in order: hero, Build/Gather/Help strip, work, Kind Projects,
   about (with timeline), contact, footer.
8. `js/site.js` at the end of `<body>`.

## The 404

`404.html` reuses the Danish front-page shell with root-absolute paths,
`noindex` and no canonical, hreflang or Open Graph metadata. Its header links
point to the Danish front page's sections (`/#arbejde` and so on), and its
second button leads to `/en/`. It has no contact section.

## Navigation contracts

Front pages: the header links are in-page anchors in this order: Arbejde /
Work, Kind projects, Om mig / About, Skriv til mig / Write to me. The brand
(monogram + wordmark) links to the page's own root (`./`).

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
  (`#f4f5f3` dawn / `#16181a` dusk).

The logic is repeated after load and re-checked every minute and on tab
visibility by `js/site.js`. If the boundaries, key, stored shape or theme
colors change, update the three inline scripts and `js/site.js` together.

## Language contract

- Danish is the default and lives at `/`. English lives at `/en/`.
- The DA/EN switch is a plain link pair; JavaScript stores the last explicit
  choice in `localStorage` under `kk-lang` but never redirects automatically.
- `hreflang` pairs and `og:locale` are set on both pages; `x-default` points
  to the Danish page.

## Front-page runtime (`js/site.js`)

One dependency-free IIFE:

- The theme control (historical id `lantern`) toggles dawn and dusk, stores the
  three-hour override and keeps `aria-pressed` in sync.
- Language links write `kk-lang` on click.
- The mobile menu updates `aria-expanded`, closes on Escape or link selection,
  and makes the page behind it inert where supported.
- `IntersectionObserver` draws the Kind Projects seam once. The still seam is
  present without the observer and under reduced motion.
- Easter egg: three theme-control presses within 1.6 seconds summon a light canvas
  rain for about half a minute. It never runs under reduced motion.

Core copy, links and navigation must remain useful if the script fails.

## Paths and links

- The Danish front page uses root-level relative paths (`css/site.css`).
- The English front page uses `../` paths (`../css/site.css`).
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
- Decorative canvas, rings and seams stay out of the accessibility tree.
- Images need useful alt text in the page's own language unless genuinely
  decorative.
- Text, including muted text, must meet WCAG AA contrast in both themes.
- New motion must stop under `prefers-reduced-motion`.

## Public repository boundary

Assume tracked files can be read publicly. That includes `docs/`, planning
notes and personal context in `KASPER.md`. Store only material that is
appropriate for the public repository. Employer-internal tooling and data
(vagtplan/OCC, driver names, workplace screenshots) never enter this repo.
