# AGENTS.md

Project-wide index for anyone changing kasper-krog.dk.

Read this file before making changes. Then follow the documentation route that
matches the work. `CLAUDE.md` points here and contains no separate rules.

## The place

This is Kasper Krog's personal site: a quiet cultural archive, not a portfolio
or a product. Its governing image is a small harbor and a house with rooms,
with warmth kept lit against darkness.

Every change should make the site feel more like a real place someone
inhabits. Preserve its restraint, specificity and accumulated history.

## Non-negotiable rules

- Use hand-written HTML, CSS and vanilla JavaScript. No framework or build
  step.
- Add no trackers, cookies, analytics or remote embeds. The Google Fonts
  stylesheet is the only tolerated external request.
- Add no engagement machinery: no newsletter prompts, popups, share buttons,
  counters, infinite feeds or calls to action. There is no feed.
- Keep dusk and dawn working. The theme follows the visitor's local time and
  the lantern override lasts three hours in `localStorage` under `kk-theme`.
- Respect `prefers-reduced-motion`. Rain, smooth scrolling, reveals and other
  decorative movement must stop.
- Keep the HTML accessible: landmarks, logical headings, a skip link, visible
  focus, `aria-current` in the room navigation and WCAG AA text contrast in
  both themes.
- Use HTTPS for external links when the destination supports it.
- Treat the repository as public. Do not store secrets, private contact
  details, other people's personal information or workplace-sensitive
  material.
- Do not erase or rewrite existing work outside the requested change.

## Read by task

| Work | Read |
|---|---|
| Any visitor-facing copy, new personal material or room decision | [Editorial guide](docs/editorial.md) and [KASPER.md](KASPER.md) |
| Pages, navigation, URLs, metadata, themes or JavaScript | [Site architecture](docs/site-architecture.md) |
| CSS, layout, components, typography, atmosphere or images | [Design system](docs/design-system.md) and, for images, [the picture drawer](assets/img/README.md) |
| Adding content, adding a page, local testing, deployment or documentation upkeep | [Working on the site](docs/working-on-the-site.md) |

`KASPER.md` is the living personal sourcebook. It informs editorial choices but
is not a backlog of facts that must be published.

Plans and todo files record unfinished or historical work. They are not
project-wide rules unless a durable guide says so.

## Source-of-truth boundaries

- `AGENTS.md`: project identity, hard constraints and the documentation map.
- `KASPER.md`: durable personal and editorial context about Kasper.
- `docs/editorial.md`: visitor-facing voice and how new material finds a room.
- `docs/site-architecture.md`: file structure, shared page shell and runtime
  contracts.
- `docs/design-system.md`: visual tokens, components, motion and image use.
- `docs/working-on-the-site.md`: repeatable editing, verification and
  deployment practice.
- `docs/image-todos.md`: active image work that has not yet shipped.
- `assets/img/README.md`: image inventory and production details.
- `README.md`: a public introduction for people arriving at the repository.

Put new guidance in the narrowest durable source. Link to it instead of
copying it into several files.

## Before finishing

Review the relevant guides again, inspect the diff and verify the change in
both themes, at mobile width and with reduced motion where the change can
affect presentation or interaction.

When asked to commit and push, first check whether the completed work changed a
durable fact about the site, Kasper, its structure or its working conventions.
Update the appropriate source of truth when it did. Do not manufacture a
documentation change when the current guidance is still accurate.
