# Testing

## Automated checks

```bash
node --check script.js      # syntax gate
node scripts/check.mjs      # files, ids, tabs, i18n, colours, links, state
```

`scripts/check.mjs` is dependency-free and runs in CI on every push and pull
request (`.github/workflows/ci.yml`). It verifies:

- required documentation and release files exist;
- JavaScript parses;
- HTML ids are unique and every `$('id')` reference resolves;
- three tabs, three panels and valid `aria-controls` targets exist;
- local `src`/`href` targets exist and no runtime resource is remote;
- the English and Thai dictionaries have identical key sets;
- every `data-i18n*` and `t('…')` key exists in both languages;
- the semantic colour contract is intact;
- runtime code contains no network APIs;
- `state.json` keeps its timing, usage, credit and deployment fields;
- relative Markdown links resolve;
- the licence remains MIT.

## Browser verification performed for 1.0.0

Headless Chrome 156 on macOS, driven over the DevTools Protocol. No console
errors or uncaught exceptions were recorded.

| Area | Check | Result |
| ---- | ----- | ------ |
| SSA | Default a=7, b=10, A=30°: two triangles, sin B = 0.7143 | Pass |
| SSA | Solutions B=45.6°/134.4°, C=104.4°/15.6°, c=13.56/3.76 | Pass |
| SSA | a=3, b=10, A=30°: no triangle with guidance | Pass |
| SSA | a=10, b=10, A=30°: exactly one triangle | Pass |
| SSA | Case badge, floating badge and rows update | Pass |
| SAS | a=8, b=6, C=50°: c=6.19, A=82.0°, B=48.0°, area=18.39 | Pass |
| SSS | a=8, b=6, c=9: C=78.6° | Pass |
| SSS | Invalid sides: warning and empty result | Pass |
| Cosines | Six live substitution steps render | Pass |
| Practice | Sines answer 102.0 m accepted; streak/badge update | Pass |
| Practice | Animated solution reveals three steps with map highlight | Pass |
| Practice | Cosines and four survey templates generate valid prompts | Pass |
| i18n | EN ⇄ TH updates tabs, prompt, steps and case explanation | Pass |
| Persistence | Reload restores language, streak and all three completed tabs | Pass |
| Export | Button creates an `application/json` Blob | Pass |
| Layout | 390 px viewport: no horizontal overflow on all modules | Pass |

## Manual regression matrix

Run the rows that match your change; run all of them before a release.

### Every release

- [ ] All three tabs switch, with the active tab marked and the panel visible.
- [ ] Keyboard: Tab reaches controls, arrow keys move between tabs, focus ring visible.
- [ ] 1440 px and 390 px widths have no horizontal scrollbar.
- [ ] EN and TH both render without clipped labels.
- [ ] Reload preserves streak, language and completed tabs.
- [ ] Export downloads `khan_trig_unit3_progress.json` with valid JSON.
- [ ] Browser console is clean.

### SSA module

- [ ] Two-triangle case draws solid cyan and dotted coral overlays.
- [ ] Circle and ray remain visible and the circle is violet.
- [ ] Solution rows match the canvas candidates.
- [ ] Zero-triangle case shows the empty-state guidance.
- [ ] One-triangle case draws exactly one overlay.
- [ ] Extreme A (5°, 175°) still keeps labels inside the canvas.

### Cosines module

- [ ] SAS and SSS modes swap the third slider and label.
- [ ] All six steps update on every slider move.
- [ ] Area matches `½ab sin C`.
- [ ] Invalid SSS shows the inequality warning and dashes.
- [ ] Angle labels stay legible at flat and narrow triangles.

### Practice module

- [ ] Each mode generates a valid prompt and question.
- [ ] Correct decimal answers pass; wrong answers reset the streak.
- [ ] New problem clears steps, highlight and disables nothing unexpectedly.
- [ ] Step reveal advances the map highlight and `Step n of m` badge.
- [ ] Hiding the steps clears timers.
- [ ] Survey prompts read naturally in both languages.

## Manual browser coverage

| Browser | Status |
| ------- | ------ |
| Chrome 156 / macOS | Verified for 1.0.0 |
| Safari / iOS | Expected to work; not formally verified |
| Firefox | Expected to work; not formally verified |
| Edge | Chromium-based; expected to work |

If you verify a new browser, add it to this table and to the release notes.

## Headless method

The 1.0.0 verification used Chrome `--headless=new` with a dedicated profile and
the DevTools Protocol to:

1. navigate to the local `file://` page;
2. drive sliders, modes and the practice form;
3. parse each generated prompt, compute the expected answer and submit it;
4. wait for the animated steps and inspect the list and map badge;
5. switch language, reload, and inspect `localStorage`-backed UI;
6. capture desktop and 390 px screenshots;
7. assert zero exceptions and zero console errors.

The harness is intentionally not committed: it depends on a local Chrome path.
The static checks above are the reproducible gate.

## Known gaps

- No cross-browser automation in CI.
- Canvas pixels are not compared visually.
- Thai line-breaking is checked by eye, not by a font-metrics test.
- Screen-reader behaviour is tested manually, not in CI.
- Step timing is tested by waiting, not by visual frame comparison.
