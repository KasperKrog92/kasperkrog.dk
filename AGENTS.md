# AGENTS.md

Working guide for anyone — human or agent — changing kasper-krog.dk.
This is the single source of truth; `CLAUDE.md` only points here.
Read [KASPER.md](KASPER.md) for the living personal and editorial context
behind the site.

## What this is

The personal site of Kasper Krog: a quiet cultural archive, not a portfolio
and not a brand. The governing metaphor is **a small harbor / a house with
rooms** — warmth kept lit against darkness. Every change should make the site
feel more like *a real place someone inhabits*, never like a product.

## How the site grows

This site is also Kasper's personal playground. He may bring unfinished
thoughts, memories, stories, interests, projects, habits, convictions, passing
observations or odd scraps that matter to him. They do not need to arrive as
finished website copy or with a page already chosen.

Add durable personal context to [KASPER.md](KASPER.md). Keep implementation
rules and visitor-facing voice guidance in this file.

The agent's job is to listen for what the material is really about, decide
where it belongs in the house, and give it a form that feels native to the
site. That may mean a journal fragment, a shelf item, a new archive entry, a
small detail on the keeper page, a ritual, a fictional seed, or something the
current structure does not yet have.

Do not incorporate every fact literally or immediately. Find the detail that
has life in it. Preserve Kasper's specificity, uncertainty and contradictions;
do not flatten them into a tidy personal profile. Some material should become
one plain sentence. Some should wait until it has company. When several scraps
point toward a new room, the structure may grow.

The aim is accumulation with judgment: over time, the site should know more
about the person who keeps it, while still feeling like a house rather than a
database, résumé or biography.

## Hard rules

- **No frameworks, no build step.** Hand-written HTML, CSS and vanilla JS only.
- **No trackers, no cookies, no analytics, no embeds that phone home.**
  The Google Fonts stylesheet is the single tolerated external request.
- **No engagement patterns.** No newsletter prompts, popups, share buttons,
  view counters, infinite feeds or calls to action. "There is no feed."
- **Both themes must keep working.** Dusk (rainy night) and dawn (warm paper)
  follow the visitor's local time: dawn from 07:00 to 18:59, dusk otherwise.
  The lantern button overrides this for three hours, stored as `kk-theme` in
  localStorage with an expiry timestamp. The inline script in each page's
  head applies the theme pre-paint.
- **Respect `prefers-reduced-motion`** — rain, smooth scroll and reveal
  animations are all disabled under it. Keep it that way for anything new.
- Plain accessible HTML: landmarks, logical heading levels, `aria-current`
  on nav, a skip link to `<main>`, visible focus and WCAG AA text contrast in
  both themes.
- External links use HTTPS wherever the destination supports it.

## Voice & tone

Quiet, literary, warm inside melancholy. Late-night café, not LinkedIn.

- Rooms have Danish names with English glosses: *Kartoteket* (archive),
  *Notesbogen* (journal), *Hylden* (shelf), *Forsamlingshuset* (gatherings),
  *Baglokalet* (worlds), *Ritualer* (rituals), *Værten* (the keeper).
- Mono labels are short and lowercase-feeling (CSS uppercases them).
- The keeper page speaks in first person; elsewhere the site speaks about
  the place, not the person.
- Never use: brand, content, engagement, audience, leverage, productivity.
- Never announce human authorship ("built by a human", "a human reads it",
  "built by hand"). Kasper dislikes that kind of talk; let the care show in
  the thing itself.
- Sentences may be fragments. Exclamation marks are not welcome.
- Contrast is the recurring image: lanterns, harbors, rain, tea, small
  lights against large darkness.

## Copy guidelines — don't sound like a machine

The site's voice is literary, which sits dangerously close to the house
style of language models. Every line of copy must pass this filter before
it ships.

**Words that never appear** (the classic LLM vocabulary): delve, tapestry,
vibrant, intricate, pivotal, testament, meticulous, robust, seamless,
leverage, foster, showcase, elevate, boasts, nestled, evolving, journey,
landscape (figurative), realm, unlock, transformative, "serves as",
"stands as". If a plain word exists, use it: *has*, *is*, *use*, *make*.

**Patterns to ration** — these are statistical fingerprints of generated
text, and they multiply when nobody is watching:

- *Negative parallelism* ("not X, but Y" / "it isn't X, it's Y"): at most
  one per page, and only when the contrast is the actual point. Two
  headlines already own this device ("Fragments, not essays", "Not what I
  made. What we gather around") — don't add more.
- *Rule of three*: only for literal lists of three real things, never for
  rhythm ("warm, alive and intergenerational" was cut for this reason).
- *Em dashes*: never use them in visitor-facing copy, including page titles,
  metadata, captions, labels, annotations and footers. Prefer the period,
  the colon, the semicolon, the comma, or a middle dot for short labels.
- *Trailing participles* ("…, highlighting the importance of…"): never.
- *Symmetrical clause stacks* (three parallel phrases in a row): break the
  rhythm — turn one into its own short sentence.

**What to do instead:**

- Concrete beats abstract. "Rooms where shared experience can happen" is
  machine fog; "rooms with other people in them, and something good on the
  table" is a sentence a person wrote. Name objects, places, times.
- Let some sentences be plain. A paragraph where every line lands a poetic
  image is a tell in itself. One image per paragraph is plenty.
- Use contractions sometimes. Repeat a word rather than reach for a fancy
  synonym.
- First person on the keeper page may admit things ("I help where help is
  needed", "I finished the last page and wanted the first one back").
  Small confessions read human; grand claims read generated.
- Each metaphor lives in exactly one place on the site. Before reusing
  "walking speed", "furniture", "doors ajar" or similar, grep for it —
  duplicated imagery across pages is how generated copy gives itself away.
- Read it aloud. If a sentence sounds like it ends with an implied
  "— and that's beautiful", cut the ending.

## Design system

Tokens live in [css/style.css](css/style.css) under `[data-theme="dusk"]` and
`[data-theme="dawn"]`. Never hard-code colors; use the variables.

| Token | Dusk | Dawn |
|---|---|---|
| `--bg` | `#0e1216` ink night | `#ece5d6` warm paper |
| `--ink` / `--ink-strong` | warm grey / parchment | dark umber |
| `--accent` | `#d8a45a` lantern amber | `#8a5a28` deep amber |
| `--line` | `#232b33` | `#d2c7b2` |

Fonts: **Cormorant Garamond** (display), **EB Garamond** (body),
**IBM Plex Mono** (labels, tags, dates), **Caveat** (`.annotation` —
handwritten marginalia, use sparingly: at most one or two per page).

Reusable components: `.entry` (catalogue rows), `.journal-entry` (dated
fragments), `.shelf`/`.shelf-item` (grid of curated items), `.rooms`/`.room-card`
(the house map), `.pull` (pull quotes / poems), `.signal` (contact rows),
`.plate` (archival images: `<figure>` with thin border and a mono
roman-numeral caption, one per page at most — see `assets/img/README.md`),
`.section-head` + `.mono` labels, `.reveal` (scroll arrival). Atmosphere
layers: `#rain` canvas (both themes: pale drops at dusk, ink drops slightly
softened at dawn), `.grain` film-grain overlay, and a fixed `.sea` whose small
boat crosses the viewport twice a day by the visitor's local clock.

Images: optimized JPGs only (~150–230 KB, raw PNGs are gitignored), always
with `width`/`height` attributes and `loading="lazy"`. Every plate has a
dusk version (base name) and a dawn twin (`-dawn.jpg` suffix, same scene in
muted morning light); both live in the figure as stacked `<img>` elements
(`.plate-dusk` / `.plate-dawn`) and CSS cross-fades the dawn one in with
the theme, no JS. Details in `assets/img/README.md`.

## Structure

```
index.html              the harbor — hero, feltnotater, Kartoteket (projects), the rooms map
journal/index.html      Notesbogen — dated fragments, not essays
shelf/index.html        Hylden — current inspirations
gatherings/index.html   Forsamlingshuset — community & events
worlds/index.html       Baglokalet — worldbuilding, cozy horror, unfinished experiments
rituals/index.html      Ritualer — uses & rituals of ordinary days
keeper/index.html       Værten — about, philosophy, send a signal (contact)
404.html          lost in the rain (absolute asset paths — it serves anywhere)
css/style.css     everything visual, both themes
js/main.js        lantern, Aarhus clock, reveal, rain — no dependencies
assets/           lantern.svg favicon
```

The header nav is duplicated on every page (no build step). When adding a
page: copy an existing header, move `aria-current="page"` to the new link,
add the page to the rooms map on index.html and to this file. Room pages live
in named directories so their public URLs end with a slash, for example
`journal/index.html` is served at `/journal/`.

## Adding things

**A journal entry** (newest first, month-level dates only — it is an archive,
not a feed):

```html
<article class="journal-entry reveal">
  <span class="mono date">06 · 2026</span>
  <div>
    <h3>Title, lowercase mood</h3>
    <p>Two to five sentences. Observation first, meaning second, no moral.</p>
  </div>
</article>
```

**A shelf item:**

```html
<div class="shelf-item reveal">
  <span class="mono">sound</span>
  <h3>Name of the thing</h3>
  <p>One italic line about why it is on the shelf. Never "recommended".</p>
</div>
```

## Deployment

GitHub Pages from `main` branch root at
[github.com/KasperKrog92/kasperkrog.dk](https://github.com/KasperKrog92/kasperkrog.dk),
custom domain `kasper-krog.dk` via the `CNAME` file; `.nojekyll` disables
Jekyll. As of June 10, 2026, the domain uses GitHub's four Pages A records,
`www` points to `kasperkrog92.github.io`, and HTTPS is live.

## Before committing and pushing

When Kasper says "commit and push", first review the completed work for durable
changes that should be reflected in `AGENTS.md`, `KASPER.md`, `README.md`,
`assets/img/README.md` or another relevant documentation file. Update those
files when it helps future agents understand the site, Kasper or the current
structure. Do not manufacture documentation changes when the existing guidance
is still accurate.

## Checking your work

```sh
python -m http.server 8741
```

Then verify: both themes (click the lantern), mobile width (~380px), keyboard
focus order, skip-link behavior, logical heading order, and that nothing moves
when the OS asks for reduced motion. Muted text must retain at least 4.5:1
contrast against the page background in both themes.
