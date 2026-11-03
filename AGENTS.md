# AGENTS.md

## 1. What this is

A static, offline teaching app for Khan Academy Trigonometry Unit 3. One page, three interactive studios: the Law of Sines with the ambiguous SSA case, a Law of Cosines SAS/SSS solver with live algebra, and a surveying/navigation practice sandbox. It produces no build output and talks to no server; it is not a Khan Academy clone, a course platform, or a graded assessment tool.

Current release: **v1.0.0** (2026-11-03).

Live copy: <https://somphol.github.io/khan-trig-unit3-non-right-triangles-studio/>
Local master: `~/Projects/khan-trig-unit3-non-right-triangles-studio`

## 2. Commands

```bash
# run (no install, no build)
python3 -m http.server 8080
# then open http://localhost:8080

# syntax gate
node --check script.js

# deploy = push to main; GitHub Pages serves the repo root
git push origin main
```

Opening `index.html` via `file://` also works. There is no test runner in the repo; verification for 1.0.0 used headless Chrome over the DevTools protocol (SSA cases, SAS/SSS, quizzes, language switch, reload, export, mobile) and produced zero console errors.

## 3. Architecture

Load order is `index.html` → `style.css` → `script.js`. `script.js` is one IIFE:

1. `I18N` dictionaries (`en`, `th`), `t()` and `L(en, th)`.
2. `DEFAULT_STATE`, `loadState`/`saveState` (localStorage key `khanTrigUnit3.v1`).
3. Triangle math: `triangleSAS`, `triangleSSS`, `triangleAnglesSide`, `validSSS`, `ssaAnalysis`.
4. Canvas helpers (`makeStage`, `neonLine`, `angleArc`, `chip`, `drawTriangleScene`, `fitTriangle`).
5. Module engines: `drawSines`, `drawCosines`, `renderQuizCanvas`.
6. Practice generators (`genSinesProblem`, `genCosinesProblem`, `genSurveyProblem`) and the survey templates.
7. Tabs (`showModule`), i18n (`applyI18n`), export, boot.

`style.css` follows the semantic palette (`--a-side`, `--b-side`, `--c-side`, `--theta`) and then HUD → tabs → cards → canvas → controls → module-specific → responsive. `state.json` is a historical build record, **not** runtime state.

## 4. Decisions and constraints

- **Keep the four colours semantic.** Coral is side a and the second SSA triangle, emerald is side b / fixed base, cyan is side c / the first SSA triangle, yellow is angles. The circle guide is violet so it never reads as the second triangle.
- **SSA is computed, not curated.** `ssaAnalysis(a,b,A)` uses `sin B = b sin A / a`, keeps every candidate `B` whose `C = 180 − A − B` is positive, and computes `c` with the Law of Sines. Zero, one and two solutions all come from the same code path.
- **Triangle coordinates are derived from sides and angles**, never stored pixels. `triangleSAS` places C at the origin, A along the x-axis and B at angle C; `triangleAnglesSide` places AB horizontally and constructs C from angle A.
- **The Law of Cosines drawer is live.** Editing any slider re-renders the formula, substitution, intermediate squares, root and solved angles. Do not cache the step text.
- **The practice map is data-driven.** `drawTriangleScene` fits any triangle to the canvas and highlights `{ side }` or `{ angle }` per step. Step reveal uses timers; `resetStepAnimation` must clear them when a new problem starts.
- **Language-independent prompts.** Survey prompts are generated in both languages at creation time; the rounding note is appended at render time so it follows the current language.
- **Canvas scaling:** every canvas uses a `ResizeObserver` and a DPR clamp of 2. Hidden panels resize when shown. If you add a canvas, follow `makeStage`.
- **i18n must stay symmetric:** every key exists in both `en` and `th`. Static text uses `data-i18n*`, dynamic text uses `t()`/`L()`/bilingual strings.
- **Persistence is best-effort:** storage failures are swallowed so private mode still works in memory. The export filename is fixed at `khan_trig_unit3_progress.json`.
- **No dependencies and no network calls.** Do not add a framework, CDN, web font, analytics or remote image. The app must work from `file://`.
- **`state.json` is a snapshot.** It records the build session and is not written by the app.

## 5. Known issues

- SSA sliders can produce extreme triangles at angles near 5° or 175°; fitting keeps them visible but labels may become tight.
- Survey problems use curated fixed values (not randomised) so the numbers stay classroom-friendly; only the template choice is random.
- The animated solution reveals three steps over ~2 seconds; on very slow devices the timer may outrun rendering. It is purely presentational.
- Vertex dragging is not implemented; sliders are the interactive builder and the keyboard path.
- Thai copy is longer than English; very narrow screens wrap rather than truncate.
- `localStorage` on `file://` is per-browser-profile and can behave differently from an HTTP origin.
- Safari and Firefox are expected to work but were not formally verified for 1.0.0.

## 6. Continuity

Deployed at <https://somphol.github.io/khan-trig-unit3-non-right-triangles-studio/>, served by GitHub Pages from `main` / repository root. The local working copy is `~/Projects/khan-trig-unit3-non-right-triangles-studio`. If `state.json` is stale, it describes the original build, not the current commit; add a new record instead of rewriting history.
