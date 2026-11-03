# Design notes

## Curriculum alignment

The studio follows Khan Academy Trigonometry **Unit 3: Non-Right Triangles &
Geometry**. It is a companion for visual proof, algebraic substitution and
applied retrieval — not a replacement for instruction or a graded course.

| Module | Concept | Learning objective |
| ------ | ------- | ------------------ |
| 01 | Law of Sines, SSA | Use `a/sin A = b/sin B = c/sin C` and recognise 0/1/2 triangles |
| 02 | Law of Cosines | Solve SAS and SSS when the Law of Sines cannot start |
| 03 | Triangulation | Apply both laws to surveying and navigation |

## Dual-coding system

Every side keeps one colour across canvas, labels, results and map highlights.
Students should be able to say "the coral side" and mean side a.

| Element | Colour | Hex |
| ------- | ------ | --- |
| Side a / second SSA triangle | Vivid coral | `#FF5722` |
| Side b / fixed base | Electric emerald | `#00E676` |
| Side c / first SSA triangle | Neon cyan | `#00E5FF` |
| Angles | Golden yellow | `#FFD600` |
| Construction circle | Electric violet | `#B388FF` |

Colour is never the only cue: sides carry `a`, `b`, `c`; vertices carry `A`,
`B`, `C`; angles carry their degree value; the case badge carries a number.

## The ambiguous-case design

The module is built around a physical construction:

1. Fix base `AC = b` and angle `A`.
2. Draw the ray from `A`.
3. Draw a circle of radius `a` centred at `C`.
4. Intersections are candidate positions for `B`.

This makes the "swinging side" literal. The two solutions are drawn as a solid
cyan triangle and a dotted coral triangle, sharing the emerald base. The circle
is violet so it does not read as a third solution.

The right panel names the case in words, shows `sin B`, and lists each valid
`B / C / c`. When no triangle exists, the empty state explains what to change.

## Law of Cosines design

- **Two modes, one layout.** SAS and SSS reuse the same sliders and triangle so
  learners see the shared structure.
- **The algebra is visible.** Six steps show formula → substitution → squares →
  square root → solved angles. They rewrite live; nothing is pre-baked.
- **Area is a bonus check.** It gives a second quantity that depends on the same
  solved angle.
- **Invalid SSS is deliberate.** The warning names the triangle inequality
  instead of silently clamping.

## Practice design

- **Three modes mirror the unit.** Law of Sines, Law of Cosines and real-world
  surveying.
- **Numbers stay classroom-friendly.** Sines and cosines problems use integer
  sides/angles; survey templates use curated values so answers are clean.
- **Retrieval first.** The step solution is opt-in, not automatic.
- **The map is the explanation.** Each step highlights the side or angle it uses
  and advances a `Step n of m` badge.
- **Mastery is bounded.** Fifteen correct answers completes the bar.

## Thai terminology

| English | Thai | Note |
| ------- | ---- | ---- |
| Law of Sines | กฎของไซน์ | |
| Law of Cosines | กฎของโคไซน์ | |
| Ambiguous case | กรณีสับสน | Keep `(SSA)` in the label |
| Side | ด้าน | |
| Angle | มุม | |
| Included angle | มุมระหว่างด้าน | |
| Triangle inequality | อสมการสามเหลี่ยม | |
| Area | พื้นที่ | |
| Surveying | การสำรวจ | |
| Bearing | แนวราบ | |
| Baseline | ฐาน | |
| Distance | ระยะทาง | |

Keep this glossary stable. Consistency matters more than literary elegance in a
classroom.

## Accessibility and universal design

- Multiple representations: visual, symbolic, numeric and verbal.
- Keyboard path for every control; tabs follow the WAI-ARIA tab pattern.
- Feedback announced through `role="status"` / `aria-live="polite"`.
- Motion reduced when the operating system asks for it.
- Touch targets sized for phones; the layout reflows to one or two columns.
- See [ACCESSIBILITY.md](ACCESSIBILITY.md) for the statement and gaps.

## Non-goals

- Accounts, cloud sync, leaderboards or teacher dashboards.
- Adaptive difficulty or machine-learned problem selection.
- Replacing a textbook, teacher or formal assessment.
- Visual spectacle at the cost of mathematical clarity.
