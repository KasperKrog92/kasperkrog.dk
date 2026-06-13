# kasper-krog.dk

> A small harbor, kept lit against the rain.

The personal site of Kasper Krog — a quiet cultural archive at the intersection
of culture, stories, atmosphere, technology and human connection. Not a
portfolio, not a personal brand. More like a late-night café conversation:
a shelf of projects, rituals and worlds.

The identity revolves around contrast — light and darkness intensifying each
other. Warmth inside melancholy. Drawing on Disco Elysium, Malazan, Nordic
minimalism, cozy horror, indie culture magazines, rainy city evenings,
libraries and backstage rooms, Japanese tea aesthetics.

## The rooms

| | | |
|---|---|---|
| N°01 | [Aarhus Gamestormers](https://www.gamestormers.dk/) | a game club run like a book club |
| N°02 | [Turkis Crew](https://turkis.gamestormers.dk/) | humane software for cultural volunteers |
| N°03 | [Matchabladet](https://matchabladet.dk/) | a Danish matcha journal on ritual and slowness |
| N°04 | [Solis Lantern Chronicles](https://solis.gamestormers.dk/) | an ongoing tabletop RPG campaign, chronicled session by session |
| N°05 | [Aarhus Folk Festival](https://folk.gamestormers.dk/) | a redesign for a community folk festival |

## How it's built

Deliberately analog: hand-written HTML, CSS and vanilla JavaScript. No
framework, no build step, no trackers, no cookies, no analytics.

The site is a house with rooms:

- `index.html` — the harbor, served at `/`
- `journal/index.html` — *Notesbogen*, served at `/journal/`
- `shelf/index.html` — *Hylden*, served at `/shelf/`
- `gatherings/index.html` — *Forsamlingshuset*, served at `/gatherings/`
- `worlds/index.html` — *Baglokalet*, served at `/worlds/`
- `rituals/index.html` — *Ritualer*, served at `/rituals/`
- `keeper/index.html` — *Værten*, served at `/keeper/`
- `404.html` — for pages the rain washed away
- `css/style.css` — two themes: **dusk** (rainy night) and **dawn** (warm paper), chosen by local time with a three-hour lantern override; each archival image cross-fades between a dusk and a dawn version with the theme
- `js/main.js` — the lantern, an Aarhus clock, reveal-on-scroll, and canvas rain (all respecting `prefers-reduced-motion`)

Conventions for working on the site (voice, design tokens, components) live
in [AGENTS.md](AGENTS.md). Personal and editorial context lives in
[KASPER.md](KASPER.md).

On Windows, double-click `start-local-site.bat`. It starts the server and
opens the site in the default browser. Close the server window when done.

Or run it from a terminal:

```sh
python -m http.server 8741
```

## Deployment

Hosted on GitHub Pages from the `main` branch with the custom domain
`kasper-krog.dk` (see `CNAME`).

DNS for kasper-krog.dk points at GitHub Pages:

```
A     @    185.199.108.153
A     @    185.199.109.153
A     @    185.199.110.153
A     @    185.199.111.153
CNAME www  kasperkrog92.github.io
```

---

Kept in Aarhus. It is raining.
