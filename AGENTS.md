# AGENTS.md

Working guide for anyone — human or agent — changing kasperkrog.dk.
This is the single source of truth; `CLAUDE.md` only points here.

## What this is

The personal site of Kasper Krog: a quiet cultural archive, not a portfolio
and not a brand. The governing metaphor is **a small harbor / a house with
rooms** — warmth kept lit against darkness. Every change should make the site
feel more like *a real place someone inhabits*, never like a product.

## Hard rules

- **No frameworks, no build step.** Hand-written HTML, CSS and vanilla JS only.
- **No trackers, no cookies, no analytics, no embeds that phone home.**
  The Google Fonts stylesheet is the single tolerated external request.
- **No engagement patterns.** No newsletter prompts, popups, share buttons,
  view counters, infinite feeds or calls to action. "There is no feed."
- **Both themes must keep working.** Dusk (default, rainy night) and dawn
  (warm paper), toggled by the lantern button, stored as `kk-theme` in
  localStorage, applied pre-paint by the inline script in each page's head.
- **Respect `prefers-reduced-motion`** — rain, smooth scroll and reveal
  animations are all disabled under it. Keep it that way for anything new.
- Plain accessible HTML: landmarks, `aria-current` on nav, visible focus.

## Voice & tone

Quiet, literary, warm inside melancholy. Late-night café, not LinkedIn.

- Rooms have Danish names with English glosses: *Kartoteket* (archive),
  *Notesbogen* (journal), *Hylden* (shelf), *Forsamlingshuset* (gatherings),
  *Baglokalet* (worlds), *Ritualer* (rituals), *Værten* (the keeper).
- Mono labels are short and lowercase-feeling (CSS uppercases them).
- The keeper page speaks in first person; elsewhere the site speaks about
  the place, not the person.
- Never use: brand, content, engagement, audience, leverage, productivity.
- Sentences may be fragments. Em dashes welcome. Exclamation marks are not.
- Contrast is the recurring image: lanterns, harbors, rain, tea, small
  lights against large darkness.

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
`.section-head` + `.mono` labels, `.reveal` (scroll arrival). Atmosphere
layers: `#rain` canvas (dusk only) and `.grain` film-grain overlay.

## Structure

```
index.html        the harbor — hero, feltnotater, Kartoteket (projects), the rooms map
journal.html      Notesbogen — dated fragments, not essays
shelf.html        Hylden — current inspirations
gatherings.html   Forsamlingshuset — community & events
worlds.html       Baglokalet — worldbuilding, cozy horror, unfinished experiments
rituals.html      Ritualer — uses & rituals of ordinary days
keeper.html       Værten — about, philosophy, send a signal (contact)
404.html          lost in the rain (absolute asset paths — it serves anywhere)
css/style.css     everything visual, both themes
js/main.js        lantern, Aarhus clock, reveal, rain — no dependencies
assets/           lantern.svg favicon
```

The header nav is duplicated on every page (no build step). When adding a
page: copy an existing header, move `aria-current="page"` to the new link,
add the page to the rooms map on index.html and to this file.

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
custom domain `kasperkrog.dk` via the `CNAME` file; `.nojekyll` disables
Jekyll. **DNS note (June 2026):** kasperkrog.dk still points at Simply.com
hosting (94.231.103.132). Going live on Pages requires A records to GitHub's
`185.199.108–111.153`, then "Enforce HTTPS" — or uploading these files to the
Simply.com webspace instead.

## Checking your work

```sh
python -m http.server 8741
```

Then verify: both themes (click the lantern), mobile width (~380px), keyboard
focus order, and that nothing moves when the OS asks for reduced motion.
