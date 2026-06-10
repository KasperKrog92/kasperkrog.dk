# kasper-krog.dk

> A small harbor, kept lit against the rain.

The personal site of Kasper Krog — a quiet cultural archive at the intersection
of culture, stories, atmosphere, technology and human connection. Not a
portfolio, not a personal brand. More like a late-night café conversation:
a shelf of projects, rituals and worlds, built by a human being rather than
a company.

The identity revolves around contrast — light and darkness intensifying each
other. Warmth inside melancholy. Drawing on Disco Elysium, Malazan, Nordic
minimalism, cozy horror, indie culture magazines, rainy city evenings,
libraries and backstage rooms, Japanese tea aesthetics.

## The rooms

| | | |
|---|---|---|
| N°01 | [Aarhus Gamestormers](https://www.gamestormers.dk/) | a game club run like a book club |
| N°02 | [Turkis Crew](http://turkis.gamestormers.dk/) | humane software for cultural volunteers |
| N°03 | [Matchabladet](https://matchabladet.dk/) | a Danish matcha journal on ritual and slowness |
| N°04 | [Solis Lantern Chronicles](https://solis.gamestormers.dk/) | an evolving, slightly mythological space |
| N°05 | [Aarhus Folk Festival](https://folk.gamestormers.dk/) | a redesign for a community folk festival |

## How it's built

Deliberately analog: hand-written HTML, CSS and vanilla JavaScript. No
framework, no build step, no trackers, no cookies, no analytics.

The site is a house with rooms:

- `index.html` — the harbor: hero, feltnotater, the project archive, and a map of the rooms
- `journal.html` — *Notesbogen*: fragments and margin notes, not essays
- `shelf.html` — *Hylden*: current inspirations, presented as a living shelf
- `gatherings.html` — *Forsamlingshuset*: community, clubs, tables and festivals
- `worlds.html` — *Baglokalet*: worldbuilding, cozy horror and unfinished experiments
- `rituals.html` — *Ritualer*: the small machinery of ordinary days
- `keeper.html` — *Værten*: about, philosophy, and how to send a signal
- `404.html` — for pages the rain washed away
- `css/style.css` — two themes: **dusk** (rainy night) and **dawn** (warm paper), chosen by local time with a three-hour lantern override
- `js/main.js` — the lantern, an Aarhus clock, reveal-on-scroll, and canvas rain (all respecting `prefers-reduced-motion`)

Conventions for working on the site (voice, design tokens, components) live
in [AGENTS.md](AGENTS.md).

Run it locally by opening `index.html`, or:

```sh
python -m http.server 8000
```

## Deployment

Hosted on GitHub Pages from the `main` branch with the custom domain
`kasper-krog.dk` (see `CNAME`).

DNS for kasper-krog.dk should point at GitHub Pages:

```
A     @    185.199.108.153
A     @    185.199.109.153
A     @    185.199.110.153
A     @    185.199.111.153
CNAME www  kasperkrog92.github.io
```

---

Built by hand in Aarhus. It is probably raining.
