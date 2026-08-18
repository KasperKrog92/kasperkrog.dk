# AGENTS.md

Project-wide index for anyone changing kasper-krog.dk.

Read this file before making changes. Then follow the documentation route that
matches the work. `CLAUDE.md` points here and contains no separate rules.

## The place

kasper-krog.dk is Kasper Krog's personal site. Since August 2026 it has two
layers:

1. **The professional front** (`index.html` in Danish, `en/index.html` in
   English): an editorial portfolio landing page. It answers, within seconds,
   who Kasper is (trafikleder, digital skaber, kulturmenneske i Aarhus), what
   he can do, what he has built, and how to reach him. Clarity first,
   personality as a strong layer on top. Professional but never corporate.
2. **The old house** (`journal/`, `shelf/`, `gatherings/`, `worlds/`,
   `rituals/`, `keeper/`): the original quiet cultural archive, in English,
   preserved as a secondary personal layer. The front page links to it under
   "Mere personligt". Change the rooms only with the same care as before.

The two layers share the dawn/dusk theme contract and nothing else: the front
uses `css/site.css` + `js/site.js`, the rooms keep `css/style.css` +
`js/main.js`. Do not mix the stylesheets.

## Non-negotiable rules

- Use hand-written HTML, CSS and vanilla JavaScript. No framework or build
  step.
- Add no trackers, cookies, analytics or remote embeds. The Google Fonts
  stylesheet is the only tolerated external request.
- **No AI-generated images on the professional front.** Only real screenshots
  of real projects, real photographs, or honest designed placeholders. The old
  rooms keep their existing plates as the house's art.
- Danish is the primary language of the front page; `en/index.html` is the
  full English mirror. A content change on one front page is a change on both.
  Keep `lang`, canonical and hreflang metadata correct.
- Keep dusk and dawn working on every page. The theme follows the visitor's
  local time (dawn 07:00–18:59) and the lantern override lasts three hours in
  `localStorage` under `kk-theme`. The contract lives in three places: the
  inline head scripts, `js/site.js` and `js/main.js`. Change all together.
- Respect `prefers-reduced-motion`. Reveals, smooth scrolling and the rain
  easter egg must stop.
- Keep the HTML accessible: landmarks, logical headings, a skip link, visible
  focus and WCAG AA text contrast in both themes.
- Use HTTPS for external links when the destination supports it.
- Treat the repository as public. Do not store secrets, private contact
  details, other people's personal information or workplace-sensitive
  material. Kasper's employer-related tooling (vagtplan/OCC) is deliberately
  **not** presented on the site; do not add it.
- Verify every fact in visitor-facing copy against
  `C:\Webprojekter\jobsoegning\profile\facts.md` conventions: no invented
  numbers, titles or responsibilities. Never claim personnel management,
  budget ownership or formal project-management certification.
- Do not erase or rewrite existing work outside the requested change.

## Read by task

| Work | Read |
|---|---|
| Any visitor-facing copy or new personal material | [Editorial guide](docs/editorial.md) and [KASPER.md](KASPER.md) |
| Pages, navigation, URLs, metadata, themes, languages or JavaScript | [Site architecture](docs/site-architecture.md) |
| CSS, layout, components, typography or images | [Design system](docs/design-system.md) and, for images, [the picture drawer](assets/img/README.md) |
| Adding content, local testing, deployment or documentation upkeep | [Working on the site](docs/working-on-the-site.md) |

`KASPER.md` is the living personal sourcebook. It informs editorial choices but
is not a backlog of facts that must be published.

## Source-of-truth boundaries

- `AGENTS.md`: project identity, hard constraints and the documentation map.
- `KASPER.md`: durable personal and editorial context about Kasper.
- `docs/editorial.md`: visitor-facing voice for both layers.
- `docs/site-architecture.md`: file structure, page shells and runtime
  contracts.
- `docs/design-system.md`: visual tokens and components for both layers.
- `docs/working-on-the-site.md`: repeatable editing, verification and
  deployment practice.
- `assets/img/README.md`: image inventory and production details.
- `README.md`: a public introduction for people arriving at the repository.

Put new guidance in the narrowest durable source. Link to it instead of
copying it into several files.

## Before finishing

Review the relevant guides again, inspect the diff and verify the change in
both themes, in both languages where the front page is involved, at mobile
width and with reduced motion where the change can affect presentation or
interaction.

When asked to commit and push, first check whether the completed work changed a
durable fact about the site, Kasper, its structure or its working conventions.
Update the appropriate source of truth when it did. Do not manufacture a
documentation change when the current guidance is still accurate.
