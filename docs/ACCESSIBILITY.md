# Accessibility

## Target

The studio aims to meet **WCAG 2.2 Level AA** for the interface it controls. It
is a self-assessment, not a third-party certification. Canvas-only content is
the main area where judgement is required; equivalent values always exist in the
DOM.

## What is implemented

### Structure and semantics

- One `<h1>`, one `<h2>` per panel, landmark elements (`header`, `nav`, `main`,
  `footer`).
- Tabs use `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`,
  roving `tabindex`, and Left/Right/Home/End keys.
- Panels use `role="tabpanel"` and are hidden when inactive.
- Form controls have visible `<label>` elements or `aria-label`s.
- The practice answer is a labelled text input inside a real form.

### Keyboard and focus

- Every slider, mode button, chip, tab and form control is reachable by Tab.
- Arrow keys adjust sliders; Enter submits the answer form.
- Visible focus rings on buttons, inputs, sliders and tabs.
- SSA and Law of Cosines are fully operable without a pointer; sliders are the
  keyboard path.

### Screen readers and live feedback

- Canvases expose `role="img"` with descriptive `aria-label`s.
- Slider values, solved sides, angles, case counts and solution rows are real
  text in the DOM.
- Answer feedback uses `role="status"` and `aria-live="polite"`.
- The badge-unlock toast is polite.

### Visual

- Text and controls use high-contrast light-on-dark colours.
- Colour is never the sole cue: sides carry letters, vertices carry letters,
  angles carry degree values, and the case badge carries a number.
- Layout reflows at 1080 px, 760 px and 420 px without horizontal scrolling.
- Text remains usable at 200% zoom on a 1440 px viewport.

### Motion and touch

- `prefers-reduced-motion: reduce` collapses CSS animations and transitions.
- The step reveal is still available when animation is reduced; it simply
  appears without the slide effect.
- Canvas uses `touch-action: none` only where dragging is intentional.
- Buttons, sliders and options are sized for touch; the mobile layout stacks cards.

## Known limitations

1. **No canvas dragging.** The interactive builder is slider-based; there are no
   focusable canvas vertices. This is accessible but less tactile than Unit 1/2.
2. **The animated map is visual.** Side and angle highlights have textual
   counterparts in the step list, but the animation itself has no audio or
   textual equivalent.
3. **Canvas text is not exposed as a text tree.** All numerical content is
   mirrored in the DOM, but decorative geometry (arcs, grid, compass) is not
   described line by line.
4. **No high-contrast theme.** The dark palette targets AA contrast, but there is
   no light or forced-colours stylesheet yet.
5. **Thai screen-reader pronunciation** depends on the installed Thai voice and
   has not been formally tested across platforms.
6. **No formal audit.** Findings come from manual keyboard, zoom, contrast and
   VoiceOver spot checks.

## How to test

1. **Keyboard only:** unplug the mouse. Tab through the HUD, switch tabs with
   arrows, build both SSA cases, change cosines modes and sliders, answer a
   practice question and reveal the steps. Focus must never disappear.
2. **Zoom:** set the browser to 200% at 1440 px and 390 px. No content should be
   clipped or force horizontal scrolling.
3. **Reduced motion:** enable the OS setting and confirm CSS animations are
   suppressed and the steps still appear.
4. **Screen reader:** with VoiceOver (macOS) or TalkBack (Android), confirm the
   sliders announce their labels and values, and that practice feedback is read
   after checking an answer.
5. **Contrast:** spot-check muted text and the coral/emerald/violet values against
   the card background.

## Reporting an accessibility problem

Open a bug report with the accessibility label, or use the feature request
template for a design change. Include the assistive technology, browser, module
and the task that failed. Accessibility fixes are prioritised.
