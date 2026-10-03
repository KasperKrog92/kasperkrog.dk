# Working on the site

Repeatable procedures for editing, checking and publishing kasper-krog.dk.

## Before editing

1. Read [AGENTS.md](../AGENTS.md).
2. Read the guide for the kind of change being made.
3. Read [KASPER.md](../KASPER.md) for visitor-facing copy or personal
   material.
4. Inspect the current page and nearby examples before choosing markup.
5. Check `git status` and preserve unrelated work already in the tree.

Search the whole site before reusing a metaphor, changing shared shell markup
or assuming a component exists on only one page.

## Local server

On Windows, `start-local-site.bat` starts the server and opens the homepage.
Close its server window when finished.

From a terminal:

```sh
python -m http.server 8741
```

Then open `http://localhost:8741/`.

Serve the repository over HTTP rather than opening HTML files directly.
Root-absolute 404 paths, navigation and browser storage are more accurately
tested that way.

## Adding or changing a front-page project case

Front-page cases live in `#arbejde` / `#work` and use the linked `.project`
structure: full-width screenshot, title and one sentence. Rules:

- Every case ships in both languages; edit `index.html` and `en/index.html`
  together.
- The case image is a real screenshot under `assets/img/cases/`, captured
  from the live project (1600×1000, `ffmpeg -q:v 4`). No generated imagery.
- Facts, numbers and roles must be verified before publishing.
- Update [the image inventory](../assets/img/README.md).

For external links, use HTTPS and preserve the local
`target="_blank" rel="noopener"` pattern.

## Adding a page

The site is two front pages and a 404. If a new page is ever needed, copy a
front page as the starting point, then:

1. Set a unique title, description, canonical URL and hreflang pair.
2. Fix relative paths for the favicon, CSS, images and JavaScript.
3. Keep the inline pre-paint theme script unchanged.
4. Add the page to [site architecture](site-architecture.md).

Adding a page is not complete while the repeated page shells disagree.

## Changing shared behavior

For header, navigation, footer, font or head changes, update both front pages
and the 404.

For theme changes:

- Keep both theme token blocks in `css/site.css` complete.
- Keep the shared time boundary, storage key, saved shape and colors in every
  inline head script and `js/site.js`.
- Check `theme-color`.
- Test an expired or malformed `kk-theme` value.

For front-page copy changes: Danish and English mirrors must both be updated
before the work is complete.

For JavaScript changes:

- Preserve useful no-JavaScript copy and links.
- Avoid dependencies and remote requests.
- Keep decorative DOM `aria-hidden`.
- Add reduced-motion handling for new movement.

## Verification

There is no automated test suite, linter or build command. Verification is a
manual browser pass proportional to the change.

Always check the affected page. For shared shell, theme, CSS or JavaScript
work, check both front pages and the 404.

Minimum pass:

- Dusk and dawn through the theme control.
- Automatic theme logic around 07:00 and 19:00 when relevant.
- Mobile width around `380px`; use `320px` for navigation or narrow layouts.
- A desktop width around `1280px`.
- Keyboard order: skip link, brand, section links, language, theme control,
  mobile menu when shown, then main links.
- Skip link visibly appears and moves focus to main.
- Exactly one correct `aria-current` in the language switch.
- Logical heading order and useful landmarks.
- Visible focus without clipping.
- Reduced motion: no rain, smooth scroll, hero arrival, portrait arc or seam
  drawing.
- Muted and ordinary text retain WCAG AA contrast in both themes.
- Images have dimensions, correct paths, appropriate lazy loading and useful
  alt text.
- No unexpected horizontal scrolling.
- Browser console has no errors.

For copy, also read the changed passage aloud and search for repeated imagery
and forbidden wording from the editorial guide.

## Deployment

GitHub Pages publishes the `main` branch from the repository root.

- Repository: `github.com/KasperKrog92/kasperkrog.dk`
- Custom domain: `kasper-krog.dk`
- `CNAME` stores the domain.
- `.nojekyll` keeps the repository as plain static files.
- The apex domain uses GitHub Pages A records.
- `www` points to `kasperkrog92.github.io`.
- DNS is managed in Cloudflare (as of August 2026).

HTTPS is live. DNS and platform state can change, so verify the live service
before diagnosing or documenting a new deployment problem.

## Documentation upkeep

After completing durable work, update the narrowest source of truth:

- Personal facts or corrections: `KASPER.md`.
- Voice or routing judgment: `docs/editorial.md`.
- Files, page shell or runtime behavior: `docs/site-architecture.md`.
- Tokens, components, motion or image use: `docs/design-system.md` or
  `assets/img/README.md`.
- Repeatable editing, testing or deployment procedure:
  `docs/working-on-the-site.md`.
- Public repository introduction: `README.md`.

Keep plans and todos clearly marked as proposed, active, parked or implemented.
Do not let an old plan silently overrule current code and durable guides.
