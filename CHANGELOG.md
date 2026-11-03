# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

Nothing yet.

## [1.0.1] — 2026-11-03

### Added

- Professional release documentation: `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`,
  `SECURITY.md`, `SUPPORT.md`, `ROADMAP.md`, `CITATION.cff`, `.editorconfig`.
- `docs/ARCHITECTURE.md`, `docs/DESIGN.md`, `docs/TESTING.md`,
  `docs/DEPLOYMENT.md`, `docs/ACCESSIBILITY.md`, `docs/RELEASE.md`.
- Issue forms, pull request template, `CODEOWNERS`, and a GitHub Actions
  verification workflow.
- `scripts/check.mjs`: dependency-free checks for files, DOM ids, tab/panel
  consistency, local assets, EN/TH parity, i18n coverage, semantic colours,
  runtime network calls, Markdown links and `state.json`.

### Changed

- README now includes a documentation index, quality gates and the release
  version.

## [1.0.0] — 2026-11-03

### Added

- **Module 1 — Law of Sines & the Ambiguous Case.** Interactive SSA builder with
  sides a, b and angle A; automatic zero/one/two-triangle detection; solid cyan
  and dotted coral overlays; `sin B`, solution table and case explanation.
- **Module 2 — Law of Cosines SAS & SSS Solver.** Two sides with an included
  angle or three sides, live solved triangle and area, and a six-step algebraic
  substitution drawer that updates while dragging.
- **Module 3 — Surveying Practice.** Law of Sines, Law of Cosines and
  real-world lake, landmark, ship and drone problems; numeric answer checking,
  an animated map solution with per-step side/angle highlights, streaks, mastery
  and seven badges.
- **Bilingual HUD.** Full English ⇄ Thai switching, including กฎของไซน์,
  กฎของโคไซน์ and กรณีสับสน (SSA).
- **Progress and export.** `localStorage` persistence plus
  `khan_trig_unit3_progress.json` download.
- **Accessibility baseline.** Labelled controls, keyboard tab navigation, ARIA
  live feedback, visible focus and reduced-motion support.
- **Release record.** `state.json` captures build time, token usage and credits.

### Security

- No runtime network requests, third-party scripts, cookies or analytics.
- Progress never leaves the browser unless the learner exports it.

[Unreleased]: https://github.com/somphol/khan-trig-unit3-non-right-triangles-studio/compare/v1.0.1...HEAD
[1.0.1]: https://github.com/somphol/khan-trig-unit3-non-right-triangles-studio/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/somphol/khan-trig-unit3-non-right-triangles-studio/releases/tag/v1.0.0
