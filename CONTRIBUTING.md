# Contributing

Thanks for taking an interest in the studio. This is a small, dependency-free teaching project: the best contributions are focused, tested, and easy to review.

## Ground rules

1. **Stay static and offline.** No frameworks, CDNs, web fonts, analytics, remote images or runtime network calls. The app must keep working from `file://`.
2. **Keep the colour contract.** Coral = side a / second SSA triangle, emerald = side b / fixed base, cyan = side c / first SSA triangle, yellow = angles. The construction circle is violet so it never reads as a solution.
3. **Translate both languages.** Every user-facing string needs an English and a Thai entry. `scripts/check.mjs` fails when the dictionaries diverge.
4. **SSA is computed, not curated.** `ssaAnalysis()` must keep every candidate `B` with a positive `C`; do not hardcode "two triangles" behaviour.
5. **Coordinates come from sides and angles.** Never store pixel positions. `triangleSAS`, `triangleSSS` and `triangleAnglesSide` are the only constructors.
6. **Clean up step timers.** `resetStepAnimation()` must clear every timeout before a new problem or a hide action.
7. **Accessibility is part of the feature.** Labelled inputs, keyboard access, visible focus and reduced-motion support are required, not optional.
8. **Small, legible diffs.** Touch the files the change needs and keep unrelated formatting out.

## Local setup

There is nothing to install.

```bash
git clone https://github.com/somphol/khan-trig-unit3-non-right-triangles-studio.git
cd khan-trig-unit3-non-right-triangles-studio
python3 -m http.server 8080
```

Open <http://localhost:8080>. Node 20+ is only needed for the static checks.

## Before opening a pull request

```bash
node --check script.js
node scripts/check.mjs
```

Then run the manual checks in [docs/TESTING.md](docs/TESTING.md) that match your change — at minimum desktop, 390 px mobile, and both languages.

## Commit messages

Use an imperative subject under ~72 characters, optionally scoped:

```
fix(ssa): keep both candidates when C is positive
feat(cosines): show the area in the result grid
docs(architecture): document the map step highlights
```

Explain the learner-facing reason in the body when it is not obvious.

## Pull requests

Use the template. A good PR states the learner problem, the change, the modules touched, and the verification performed. Screenshots are expected for visual changes.

## Adding a module or problem type

- Read [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for state, triangle constructors, canvas and i18n patterns.
- Add the tab, panel, translator keys, geometry and completion hook in the existing style.
- Extend the manual test matrix in [docs/TESTING.md](docs/TESTING.md).
- Keep the four-colour semantics and the bilingual survey prompts.

## Translation notes

The Thai glossary lives in [docs/DESIGN.md](docs/DESIGN.md). Keep กฎของไซน์, กฎของโคไซน์ and กรณีสับสน (SSA) consistent and prefer clear classroom language over literal translation.

## Reporting bugs and security issues

- Bugs and ideas: use the issue templates.
- Security: follow [SECURITY.md](SECURITY.md); never open a public issue with exploit details.
- Conduct concerns: follow [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
