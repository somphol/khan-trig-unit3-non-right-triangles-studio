# Architecture

## Runtime topology

```
index.html
  ├── style.css               presentation only
  └── script.js               one IIFE, no modules, no imports
        ├── I18N { en, th }   all UI copy
        ├── state             localStorage-backed model
        ├── triangle math     SAS / SSS / angles+side constructors
        ├── SSA analysis      zero, one or two candidate triangles
        ├── canvas stages     sines / cosines / practice map
        ├── practice engine   generators + survey templates + step animation
        └── HUD, tabs, export
```

No server, build step, package manager or network call. GitHub Pages serves the
repository root as static files.

## Files

| File | Responsibility |
| ---- | -------------- |
| `index.html` | HUD, three panels, sliders, practice form, bilingual hooks |
| `style.css` | Semantic palette, layout, canvas cards, steps, responsive rules |
| `script.js` | State, i18n, triangle geometry, SSA cases, solver, practice, export |
| `scripts/check.mjs` | Dependency-free static release checks used by CI |
| `state.json` | Historical build record; never read at runtime |

## Boot sequence

`script.js` runs at the end of `<body>`.

1. `loadState()` reads `localStorage["khanTrigUnit3.v1"]`, merges it over
   `DEFAULT_STATE` and sanitises language, module, sliders and cosines mode.
2. `makeStage(canvas, draw)` attaches a `ResizeObserver`, clamps DPR to 2 and
   requests the first draw for the SSA, cosines and practice canvases.
3. `init()` applies saved sliders, syncs badges, applies i18n, shows the last
   module and generates the first practice problem.
4. Hidden panels are zero-sized; `showModule()` resizes the visible stage inside
   `requestAnimationFrame`.

## State model

```json
{
  "version": 1,
  "lang": "en",
  "lastModule": "sines",
  "ssa": { "a": 7, "b": 10, "A": 30 },
  "cosines": { "mode": "sas", "a": 8, "b": 6, "C": 50, "c": 9 },
  "practice": {
    "mode": "sines",
    "correct": 0,
    "attempts": 0,
    "streak": 0,
    "best": 0,
    "byMode": { "sines": 0, "cosines": 0, "survey": 0 },
    "badges": []
  },
  "completed": { "sines": false, "cosines": false, "practice": false },
  "updatedAt": null
}
```

Writes are debounced by 250 ms during slider drags and flushed on
`beforeunload`, `visibilitychange`, tab switches, grading and new problems.

## Triangle constructors

All geometry is derived; no pixel coordinates are stored.

```js
triangleSAS(a, b, C)      // C at origin, A=(b,0), B=a(cos C, sin C)
triangleSSS(a, b, c)      // angles from the Law of Cosines, same layout
triangleAnglesSide(A,B,c) // A=(0,0), B=(c,0), C=b(cos A, sin A)
```

`triangleAnglesSide` computes `b = c sin B / sin C` and
`a = c sin A / sin C`. `validSSS()` enforces the triangle inequality before any
angle is computed.

## SSA analysis

Given sides `a`, `b` and angle `A` (opposite `a`):

```
sin B = b sin A / a
```

- `sin B > 1` → no triangle.
- Otherwise candidate `B₁ = asin(sin B)` and, when `sin B < 1`,
  `B₂ = 180° − B₁`.
- Each candidate is valid only if `C = 180° − A − B > 0`.
- `c = a sin C / sin A`.

The returned solution list drives the case badge, the solution rows and both
canvas overlays. Valid solutions are drawn with `B = c(cos A, sin A)` because
side `c = AB`.

The construction circle has radius `a` around `C`; its intersections with the
ray from `A` are exactly the candidates. The circle is violet and dashed so it is
never confused with the dotted coral second triangle.

## Law of Cosines solver

- **SAS:** `c = √(a² + b² − 2ab cos C)`, then
  `A = cos⁻¹((b² + c² − a²)/(2bc))`, `B = 180 − A − C`.
- **SSS:** validate the inequality, then
  `C = cos⁻¹((a² + b² − c²)/(2ab))`, `A = cos⁻¹((b² + c² − a²)/(2bc))`,
  `B = 180 − A − C`.
- Area is `½ab sin C`.

`renderCosines()` rewrites the six substitution steps on every input; it is the
single source of truth for both the result grid and the drawer.

## Canvas contract

Stages work in CSS pixels. `makeStage` sets the backing store to
`rect × min(devicePixelRatio, 2)` and resets the transform. Draw functions must
return early when `w` or `h` is zero.

`fitTriangle()` maps a triangle's world coordinates into a padded canvas box and
centres it. `drawTriangleScene()` then draws:

- sides coloured a/coral, b/emerald, c/cyan;
- optional side values and angle values;
- a highlighted side or angle from the current solution step;
- vertex letters, a compass rose and a step badge when requested.

The SSA canvas has its own fit because it must include both intersections.

## Practice engine

Problem objects are plain data:

```js
{
  mode, answer, answerType, unit, triangle,
  promptEn, promptTh, questionEn, questionTh,
  steps: [{ en, th, highlight: { side | angle } }]
}
```

`genSinesProblem()` and `genCosinesProblem()` randomise classroom-friendly
numbers. `genSurveyProblem()` picks one of four curated templates (lake,
landmarks, ship, drone) and avoids an immediate repeat.

`renderProblemText()` appends the rounding note at render time, so switching
language updates it. Step reveal uses one timeout per step; `stepHighlight`
drives the map highlight and `activeStepIndex` drives the `Step n of m` badge.
`resetStepAnimation()` must clear every timer.

## Internationalisation

- Static markup uses `data-i18n*`.
- Dynamic copy uses `t('key')`; bilingual problem text is stored as
  `promptEn`/`promptTh` and `questionEn`/`questionTh`.
- Every dictionary has an identical key set; CI enforces parity.
- Canvas captions containing words use `t()` or `L()`.

## Extension recipes

**New module**

1. Add a tab, a panel and state fields.
2. Sanitise the new fields in `init()`.
3. Create a draw function and `makeStage(canvas, draw)`.
4. Add both dictionaries, register the panel in `showModule()` and mark
   completion with `completeModule()`.
5. Extend `docs/TESTING.md` and `scripts/check.mjs` when new invariants matter.

**New practice type**

1. Add a generator returning the plain-data problem shape.
2. Add a mode button and the tag key.
3. Provide bilingual prompts, questions and steps with highlights.
4. Add a manual test row.

## Invariants

- No dependencies, CDNs, remote fonts, analytics or runtime `fetch`.
- Semantic colours: `#ff5722` a, `#00e676` b, `#00e5ff` c, `#ffd600` angles.
- SSA cases generated from the math, never hardcoded.
- One clearing path for step timers.
- `state.json` is documentation, not application state.
