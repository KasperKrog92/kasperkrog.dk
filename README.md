# kasper-krog.dk

The personal site of Kasper Krog: trafikleder, digital skaber og
kulturmenneske i Aarhus.

The front page (Danish at `/`, English at `/en/`) is an editorial portfolio:
who Kasper is, what he can do, real projects with real screenshots, a short
timeline, and the Kind Project Rule (small cultural and volunteer-driven
projects get help for free when time allows).

Behind it, the site's original identity lives on as a personal layer: a small
harbor house with rooms, in English, linked from "Mere personligt".

## Selected projects on the site

| | | |
|---|---|---|
| 01 | [Turkis Crew](https://turkis.gamestormers.dk/) | volunteer platform for the Aarhus venue turkis |
| 02 | [Aarhus Gamestormers](https://www.gamestormers.dk/) | a game club run like a book club, founded 2025 |
| 03 | [Aarhus Folk Festival](https://www.aarhusfolkfestival.dk/) | the online home of a community folk festival |
| 04 | [Amanda Barup](https://amanda.kasper-krog.dk/) | portfolio with a built-in studio for a real illustrator |
| 05 | [Matchabladet](https://matchabladet.dk/) | a Danish matcha magazine |

## How it's built

Deliberately simple: hand-written HTML, CSS and vanilla JavaScript. No
framework, no build step, no trackers, no cookies, no analytics.

- `index.html` — the front page, Danish
- `en/index.html` — the front page, English
- `css/site.css` + `js/site.js` — the front page's design system and runtime
- `journal/ shelf/ gatherings/ worlds/ rituals/ keeper/` — the old house,
  with its own `css/style.css` + `js/main.js`
- `404.html` — for pages the rain washed away

Both layers share the dawn/dusk theme: it follows the visitor's local time,
and the lantern button overrides it for three hours. All images on the front
page are real screenshots or real photographs; nothing is generated.

Start with [AGENTS.md](AGENTS.md), the project-wide index and hard
constraints. It routes work to the focused guides in [`docs/`](docs/).
Personal context lives in [KASPER.md](KASPER.md).

On Windows, double-click `start-local-site.bat`. Or from a terminal:

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

Kept in Aarhus. It is raining, if you ask it to.
