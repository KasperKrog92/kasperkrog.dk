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

## Adding a journal entry

Journal entries are newest first and use month-level dates only.

```html
<article class="journal-entry reveal">
  <span class="mono date">06 &middot; 2026</span>
  <div>
    <h3>Title, lowercase mood</h3>
    <p>Two to five sentences. Observation first, meaning second, no moral.</p>
  </div>
</article>
```

Keep the entry concise. Update `KASPER.md` only if the material adds or
corrects durable personal context.

## Adding a shelf item

```html
<div class="shelf-item reveal">
  <span class="mono">sound</span>
  <h3>Name of the thing</h3>
  <p>One italic line about why it is on the shelf.</p>
</div>
```

Never frame a shelf item as a recommendation. The shelf records current
attention and may rotate.

## Adding a project or gathering

Use the existing `.entry` structure and keep labels short. For external links,
use HTTPS and preserve the local `target="_blank" rel="noopener"` pattern.

If a homepage project receives a background image:

- Add dusk and dawn JPGs under `assets/img/projects/`.
- Add paired theme CSS variables or selectors.
- Leave copy readable without the image.
- Update [the image inventory](../assets/img/README.md).

## Adding a page or room

Copy an existing room page as the starting point, then:

1. Set a unique title, description and canonical URL.
2. Fix relative paths for the favicon, CSS, images, room links and JavaScript.
3. Keep the inline pre-paint theme script unchanged.
4. Move `aria-current="page"` to the new navigation link.
5. Add the room link to every existing page header.
6. Add the room to the homepage map.
7. Update the nav's `:nth-child()` layout for desktop and mobile.
8. Add the room to [site architecture](site-architecture.md) and the house map
   in [KASPER.md](../KASPER.md).
9. Add a plate only when the room needs one; update the image inventory and
   roman-numeral sequence if so.
10. Check the 404 navigation separately because it uses root-absolute paths.

Adding a page is not complete while the repeated page shells disagree.

## Changing shared behavior

For header, navigation, footer, font or head changes, search every HTML page and
update all affected copies.

For theme changes:

- Keep both theme token blocks complete.
- Keep the inline head scripts and `js/main.js` in sync.
- Check `theme-color`.
- Test an expired or malformed `kk-theme` value.

For JavaScript changes:

- Preserve useful no-JavaScript copy and links.
- Avoid dependencies and remote requests.
- Keep decorative DOM `aria-hidden`.
- Add reduced-motion handling for new movement.

## Verification

There is no automated test suite, linter or build command. Verification is a
manual browser pass proportional to the change.

Always check the affected page and one unaffected room. For shared shell,
theme, CSS or JavaScript work, check all page types including the 404.

Minimum pass:

- Dusk and dawn through the lantern.
- Automatic theme logic around 07:00 and 19:00 when relevant.
- Mobile width around `380px`; use `320px` for navigation or narrow layouts.
- A desktop width around `1280px`.
- Keyboard order: skip link, home nameplate, seven room books, lantern, main
  page controls and links.
- Skip link visibly appears and moves focus to main.
- Exactly one correct `aria-current`, except on the 404.
- Logical heading order and useful landmarks.
- Visible focus without clipping.
- Reduced motion: no rain, smooth scroll, reveal movement, book pull, water
  drift, boat bob or lantern flicker.
- Muted and ordinary text retain WCAG AA contrast in both themes.
- Images have dimensions, correct paths, appropriate lazy loading and useful
  alt text.
- No unexpected horizontal scrolling.
- Footer clears the sea at the bottom of ordinary pages.
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

As documented on June 10, 2026, HTTPS is live. DNS and platform state can
change, so verify the live service before diagnosing or documenting a new
deployment problem.

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
