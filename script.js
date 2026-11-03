/* ==========================================================================
   Khan Trig Companion · Unit 3 Non-Right Triangles Studio
   Vanilla ES6. No dependencies, no network, no build step.

   Colour contract:
     cyan    #00e5ff -> side c / Law of Sines
     coral   #ff5722 -> side a / second SSA triangle
     emerald #00e676 -> side b / fixed base
     yellow  #ffd600 -> angles
   ========================================================================== */
(() => {
  'use strict';

  const STORAGE_KEY = 'khanTrigUnit3.v1';
  const STATE_VERSION = 1;
  const COLORS = { a: '#ff5722', b: '#00e676', c: '#00e5ff', theta: '#ffd600', violet: '#b388ff' };
  const FONT = '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Thonburi", "Noto Sans Thai", sans-serif';
  const MATH = '"Iowan Old Style", Palatino, Georgia, "Times New Roman", serif';
  const $ = (id) => document.getElementById(id);
  const rad = (d) => (d * Math.PI) / 180;
  const deg = (r) => (r * 180) / Math.PI;
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const L = (en, th) => (state.lang === 'th' ? th : en);
  const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ------------------------------- i18n ---------------------------------- */
  const I18N = {
    en: {
      appTitle: 'Khan Trig Companion',
      unitLabel: 'Unit 3',
      appSubtitle: 'Non-Right Triangles Studio',
      streak: 'Streak',
      best: 'Best',
      mastery: 'Mastery',
      export: 'Export Progress JSON',
      exportTitle: 'Download your saved progress',
      exportDone: 'Progress exported as khan_trig_unit3_progress.json',
      navSines: 'Law of Sines & SSA',
      navCosines: 'Law of Cosines',
      navPractice: 'Surveying Practice',
      footerBuilt: 'Built for active learning',
      noTriangle: 'No triangle',
      oneTriangle: 'One triangle',
      twoTriangles: 'Two triangles',

      's.title': 'Law of Sines & the Ambiguous Case',
      's.desc': 'Given two sides and a non-included angle (SSA), the third side can swing into zero, one or two triangles. Build the case and watch it happen.',
      's.goal': 'Goal: see why SSA can be ambiguous',
      's.sideA': 'Side a (opposite A)',
      's.sideB': 'Side b (fixed base)',
      's.angleA': 'Angle A',
      's.legendC': 'Triangle 1 (solid)',
      's.legendA': 'Triangle 2 (dotted)',
      's.legendB': 'Fixed side b',
      's.legendTheta': 'Angle A / ray',
      's.hint': 'Drag the sliders to swing side a around C',
      's.case': 'The case',
      's.formulaLabel': 'Law of Sines',
      's.solutions': 'Valid solutions',
      's.case0': 'No triangle',
      's.case1': 'One triangle',
      's.case2': 'Two distinct triangles',
      's.float0': 'No triangle',
      's.float1': '1 triangle',
      's.float2': '2 triangles',
      's.reason0': 'The ray and the circle never close a triangle with a positive angle C.',
      's.reason1': 'Only one candidate angle B leaves a positive angle C.',
      's.reason2': 'sin B < 1, and both B and 180° − B leave a positive angle C.',
      's.none': 'No valid triangle for these values. Try a larger side a or a smaller angle A.',
      's.ray': 'ray from A',
      's.fixedBase': 'fixed base',

      'c.title': 'Law of Cosines · SAS & SSS Solver',
      'c.desc': 'When the Law of Sines cannot get started, the Law of Cosines handles two sides with an included angle, or three sides.',
      'c.goal': 'Goal: c² = a² + b² − 2ab cos C',
      'c.modeSas': 'SAS · two sides + angle',
      'c.modeSss': 'SSS · three sides',
      'c.sideA': 'Side a',
      'c.sideB': 'Side b',
      'c.includedC': 'Included angle C',
      'c.sideC': 'Side c',
      'c.results': 'Solved triangle',
      'c.area': 'Area',
      'c.stepsTitle': 'Live algebraic substitution',
      'c.live': 'updates as you drag',
      'c.invalid': 'These three sides cannot form a triangle (triangle inequality).',

      'q.title': 'Khan Practice Sandbox & Navigation Problems',
      'q.desc': 'Apply the Laws of Sines and Cosines to distances across lakes, landmark ranges and ship tracks.',
      'q.goal': 'Goal: triangulation in the real world',
      'q.modeSines': 'Law of Sines',
      'q.modeCosines': 'Law of Cosines',
      'q.modeSurvey': 'Surveying',
      'q.new': 'New problem',
      'q.answerLabel': 'Your answer',
      'q.placeholder': 'e.g. 42.7',
      'q.check': 'Check Answer',
      'q.answerHint': 'Round lengths and angles sensibly; a small tolerance is allowed.',
      'q.showSteps': 'Show Step-by-Step Visual Solution',
      'q.hideSteps': 'Hide the visual solution',
      'q.progress': 'Your progress',
      'q.correct': 'Correct',
      'q.masteryHint': '15 correct answers unlock Unit 3 mastery.',
      'q.badges': 'Mastery badges',
      'q.map': 'Triangulation map',
      'q.correctMsg': 'Correct!',
      'q.wrongMsg': 'Not quite — reveal the steps or try a new problem.',
      'q.invalid': 'Enter a number.',
      'q.badgeUnlocked': 'Badge unlocked',
      'q.tagSines': 'LAW OF SINES',
      'q.tagCosines': 'LAW OF COSINES',
      'q.tagSurvey': 'REAL-WORLD SURVEYING',
      'q.roundLength': 'Round to 1 decimal place.',
      'q.roundAngle': 'Round to 1 decimal place (degrees).',
      'q.step': 'Step',
      'q.of': 'of',

      'badge.first': 'First Triangle',
      'badge.streak3': 'On a Roll · 3',
      'badge.streak5': 'Unstoppable · 5',
      'badge.sines3': 'Sine Solver',
      'badge.cosines3': 'Cosine Cartographer',
      'badge.survey3': 'Field Surveyor',
      'badge.master': 'Unit 3 Master'
    },
    th: {
      appTitle: 'คู่มือตรีโกณมิติ Khan',
      unitLabel: 'ยูนิต 3',
      appSubtitle: 'ห้องปฏิบัติการสามเหลี่ยมไม่ใช่มุมฉาก',
      streak: 'สตรีค',
      best: 'สูงสุด',
      mastery: 'ความเชี่ยวชาญ',
      export: 'ส่งออกความคืบหน้า JSON',
      exportTitle: 'ดาวน์โหลดความคืบหน้าที่บันทึกไว้',
      exportDone: 'ส่งออกความคืบหน้าเป็น khan_trig_unit3_progress.json แล้ว',
      navSines: 'กฎของไซน์และ SSA',
      navCosines: 'กฎของโคไซน์',
      navPractice: 'ฝึกสำรวจ',
      footerBuilt: 'สร้างเพื่อการเรียนรู้เชิงรุก',
      noTriangle: 'ไม่มีสามเหลี่ยม',
      oneTriangle: 'หนึ่งรูป',
      twoTriangles: 'สองรูป',

      's.title': 'กฎของไซน์และกรณีสับสน',
      's.desc': 'เมื่อรู้สองด้านกับมุมที่ไม่ใช่มุมระหว่างด้าน (SSA) ด้านที่สามสามารถแกว่งเกิดได้ศูนย์ หนึ่ง หรือสองรูป ลองสร้างแล้วดูว่าจะเกิดอะไรขึ้น',
      's.goal': 'เป้าหมาย: เข้าใจว่าทำไม SSA จึงสับสน',
      's.sideA': 'ด้าน a (ตรงข้ามมุม A)',
      's.sideB': 'ด้าน b (ฐานคงที่)',
      's.angleA': 'มุม A',
      's.legendC': 'สามเหลี่ยมที่ 1 (เส้นทึบ)',
      's.legendA': 'สามเหลี่ยมที่ 2 (เส้นประ)',
      's.legendB': 'ด้าน b คงที่',
      's.legendTheta': 'มุม A / รังสี',
      's.hint': 'ลากสไลเดอร์เพื่อแกว่งด้าน a รอบจุด C',
      's.case': 'กรณีที่เป็นไปได้',
      's.formulaLabel': 'กฎของไซน์',
      's.solutions': 'คำตอบที่ใช้ได้',
      's.case0': 'ไม่มีสามเหลี่ยม',
      's.case1': 'หนึ่งรูป',
      's.case2': 'สองรูปที่แตกต่างกัน',
      's.float0': 'ไม่มีสามเหลี่ยม',
      's.float1': '1 รูป',
      's.float2': '2 รูป',
      's.reason0': 'รังสีกับวงกลมไม่บรรจบเป็นสามเหลี่ยมที่มุม C เป็นบวกได้',
      's.reason1': 'มีมุม B ที่เป็นไปได้เพียงค่าเดียวที่ทำให้มุม C เป็นบวก',
      's.reason2': 'sin B < 1 และทั้ง B กับ 180° − B ทำให้มุม C เป็นบวก',
      's.none': 'ไม่มีสามเหลี่ยมที่ใช้ได้กับค่านี้ ลองเพิ่มด้าน a หรือลดมุม A',
      's.ray': 'รังสีจาก A',
      's.fixedBase': 'ฐานคงที่',

      'c.title': 'กฎของโคไซน์ · ตัวแก้ SAS และ SSS',
      'c.desc': 'เมื่อกฎของไซน์เริ่มไม่ได้ กฎของโคไซน์จัดการสองด้านกับมุมระหว่างด้าน หรือด้านทั้งสามด้าน',
      'c.goal': 'เป้าหมาย: c² = a² + b² − 2ab cos C',
      'c.modeSas': 'ด้าน-มุม-ด้าน (SAS)',
      'c.modeSss': 'ด้าน-ด้าน-ด้าน (SSS)',
      'c.sideA': 'ด้าน a',
      'c.sideB': 'ด้าน b',
      'c.includedC': 'มุมระหว่างด้าน C',
      'c.sideC': 'ด้าน c',
      'c.results': 'สามเหลี่ยมที่แก้แล้ว',
      'c.area': 'พื้นที่',
      'c.stepsTitle': 'การแทนค่าเชิงพีชคณิตตามจริง',
      'c.live': 'อัปเดตขณะลาก',
      'c.invalid': 'ด้านทั้งสามนี้สร้างสามเหลี่ยมไม่ได้ (อสมการสามเหลี่ยม)',

      'q.title': 'ห้องฝึกซ้อม Khan และโจทย์นำทาง',
      'q.desc': 'ใช้กฎของไซน์และโคไซน์กับระยะข้ามทะเลสาบ ระยะระหว่างจุดสำรวจ และเส้นทางเดินเรือ',
      'q.goal': 'เป้าหมาย: การสามเหลี่ยมในโลกจริง',
      'q.modeSines': 'กฎของไซน์',
      'q.modeCosines': 'กฎของโคไซน์',
      'q.modeSurvey': 'การสำรวจ',
      'q.new': 'โจทย์ใหม่',
      'q.answerLabel': 'คำตอบของคุณ',
      'q.placeholder': 'เช่น 42.7',
      'q.check': 'ตรวจคำตอบ',
      'q.answerHint': 'ปัดความยาวและมุมอย่างเหมาะสม มีช่วงคลาดเคลื่อนเล็กน้อย',
      'q.showSteps': 'แสดงวิธีทำทีละขั้นแบบภาพ',
      'q.hideSteps': 'ซ่อนวิธีทำ',
      'q.progress': 'ความคืบหน้าของคุณ',
      'q.correct': 'ตอบถูก',
      'q.masteryHint': 'ตอบถูก 15 ข้อเพื่อปลดล็อกความชำนาญยูนิต 3',
      'q.badges': 'เหรียญความชำนาญ',
      'q.map': 'แผนที่สามเหลี่ยม',
      'q.correctMsg': 'ถูกต้อง!',
      'q.wrongMsg': 'ยังไม่ถูก — ดูวิธีทำหรือลองโจทย์ใหม่',
      'q.invalid': 'กรอกตัวเลข',
      'q.badgeUnlocked': 'ปลดล็อกเหรียญ',
      'q.tagSines': 'กฎของไซน์',
      'q.tagCosines': 'กฎของโคไซน์',
      'q.tagSurvey': 'โจทย์สำรวจจริง',
      'q.roundLength': 'ตอบเป็นทศนิยม 1 ตำแหน่ง',
      'q.roundAngle': 'ตอบเป็นทศนิยม 1 ตำแหน่ง (องศา)',
      'q.step': 'ขั้นที่',
      'q.of': 'จาก',

      'badge.first': 'สามเหลี่ยมแรก',
      'badge.streak3': 'ต่อเนื่อง 3',
      'badge.streak5': 'หยุดไม่อยู่ 5',
      'badge.sines3': 'นักแก้กฎไซน์',
      'badge.cosines3': 'นักทำแผนที่โคไซน์',
      'badge.survey3': 'นักสำรวจภาคสนาม',
      'badge.master': 'ปรมาจารย์ยูนิต 3'
    }
  };
  const t = (key) => (I18N[state.lang] && I18N[state.lang][key]) || I18N.en[key] || key;

  /* ------------------------------- state --------------------------------- */
  const DEFAULT_STATE = {
    version: STATE_VERSION,
    lang: 'en',
    lastModule: 'sines',
    ssa: { a: 7, b: 10, A: 30 },
    cosines: { mode: 'sas', a: 8, b: 6, C: 50, c: 9 },
    practice: {
      mode: 'sines',
      correct: 0,
      attempts: 0,
      streak: 0,
      best: 0,
      byMode: { sines: 0, cosines: 0, survey: 0 },
      badges: []
    },
    completed: { sines: false, cosines: false, practice: false },
    updatedAt: null
  };

  const clone = (value) => JSON.parse(JSON.stringify(value));

  function mergeState(base, saved) {
    if (!saved || typeof saved !== 'object') return base;
    Object.keys(base).forEach((key) => {
      const b = base[key];
      const s = saved[key];
      if (b && typeof b === 'object' && !Array.isArray(b)) base[key] = mergeState(b, s);
      else if (s !== undefined) base[key] = s;
    });
    return base;
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return clone(DEFAULT_STATE);
      const merged = mergeState(clone(DEFAULT_STATE), JSON.parse(raw));
      if (merged.lang !== 'en' && merged.lang !== 'th') merged.lang = 'en';
      if (!['sines', 'cosines', 'practice'].includes(merged.lastModule)) merged.lastModule = 'sines';
      return merged;
    } catch (_) {
      return clone(DEFAULT_STATE);
    }
  }

  let state = loadState();
  let saveTimer = null;
  function saveState() {
    try {
      state.updatedAt = new Date().toISOString();
      state.version = STATE_VERSION;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (_) { /* private mode: keep working in memory */ }
  }
  function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveState, 250);
  }

  /* ------------------------------ helpers -------------------------------- */
  const fmt = (n, d = 2) => {
    if (!Number.isFinite(n)) return '—';
    const v = Math.abs(n) < 1e-10 ? 0 : n;
    return v.toFixed(d);
  };
  const trimNum = (n, d = 2) => fmt(n, d).replace(/\.?0+$/, '');
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const randInt = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));

  function rgba(hex, alpha) {
    const n = parseInt(hex.replace('#', ''), 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
  }

  /* ------------------------------ toast ---------------------------------- */
  let toastTimer = null;
  function toast(message) {
    const el = $('toast');
    el.textContent = message;
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.hidden = true; }, 3200);
  }

  /* --------------------------- canvas helpers ---------------------------- */
  function roundRect(ctx, x, y, w, h, r) {
    if (typeof ctx.roundRect === 'function') { ctx.roundRect(x, y, w, h, r); return; }
    const rr = Math.min(r, w / 2, h / 2);
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
  }

  function drawGrid(ctx, w, h, step = 34) {
    ctx.save();
    ctx.strokeStyle = 'rgba(148,175,220,0.055)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = step; x < w; x += step) { ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, h); }
    for (let y = step; y < h; y += step) { ctx.moveTo(0, y + 0.5); ctx.lineTo(w, y + 0.5); }
    ctx.stroke();
    ctx.restore();
  }

  function neonLine(ctx, x1, y1, x2, y2, color, width = 2.5, dash = null, glow = true) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    if (dash) ctx.setLineDash(dash);
    if (glow && !dash) { ctx.shadowColor = color; ctx.shadowBlur = 12; }
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
  }

  function chip(ctx, text, x, y, color, opts = {}) {
    ctx.save();
    ctx.font = opts.font || `600 12px ${FONT}`;
    const tw = ctx.measureText(text).width;
    const padX = 7;
    const hgt = 21;
    const wdt = tw + padX * 2;
    const bx = opts.align === 'left' ? x : opts.align === 'right' ? x - wdt : x - wdt / 2;
    const by = y - hgt / 2;
    ctx.beginPath();
    roundRect(ctx, bx, by, wdt, hgt, 7);
    ctx.fillStyle = 'rgba(5,10,20,0.86)';
    ctx.fill();
    ctx.strokeStyle = rgba(color, 0.42);
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, bx + wdt / 2, y + 0.5);
    ctx.restore();
  }

  function angleArc(ctx, vertex, p1, p2, radius, label, color, active = false, showLabel = true) {
    let a1 = Math.atan2(p1.y - vertex.y, p1.x - vertex.x);
    let a2 = Math.atan2(p2.y - vertex.y, p2.x - vertex.x);
    let delta = a2 - a1;
    while (delta > Math.PI) delta -= Math.PI * 2;
    while (delta < -Math.PI) delta += Math.PI * 2;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(vertex.x, vertex.y);
    ctx.arc(vertex.x, vertex.y, radius, a1, a1 + delta, delta < 0);
    ctx.closePath();
    ctx.fillStyle = rgba(color, active ? 0.18 : 0.07);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(vertex.x, vertex.y, radius, a1, a1 + delta, delta < 0);
    ctx.strokeStyle = color;
    ctx.lineWidth = active ? 3 : 1.8;
    ctx.stroke();

    if (showLabel && label) {
      const mid = a1 + delta / 2;
      const lx = vertex.x + Math.cos(mid) * (radius + 20);
      const ly = vertex.y + Math.sin(mid) * (radius + 20);
      chip(ctx, label, lx, ly, color);
    }
    ctx.restore();
  }

  function makeStage(canvas, draw) {
    const ctx = canvas.getContext('2d');
    const stage = { canvas, ctx, w: 0, h: 0, draw };
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(r.width * dpr));
      canvas.height = Math.max(1, Math.round(r.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stage.w = r.width;
      stage.h = r.height;
      draw();
    };
    stage.resize = resize;
    if (typeof ResizeObserver === 'function') new ResizeObserver(resize).observe(canvas);
    else window.addEventListener('resize', resize);
    requestAnimationFrame(resize);
    return stage;
  }

  /* ----------------------------- triangle math --------------------------- */
  function triangleSAS(a, b, Cdeg) {
    const Cr = rad(Cdeg);
    const c = Math.sqrt(Math.max(0, a * a + b * b - 2 * a * b * Math.cos(Cr)));
    const A = deg(Math.acos(clamp((b * b + c * c - a * a) / (2 * b * c), -1, 1)));
    const B = 180 - A - Cdeg;
    return {
      A: { x: b, y: 0 },
      B: { x: a * Math.cos(Cr), y: a * Math.sin(Cr) },
      C: { x: 0, y: 0 },
      a, b, c, Aang: A, Bang: B, Cang: Cdeg
    };
  }

  function triangleSSS(a, b, c) {
    const C = deg(Math.acos(clamp((a * a + b * b - c * c) / (2 * a * b), -1, 1)));
    const A = deg(Math.acos(clamp((b * b + c * c - a * a) / (2 * b * c), -1, 1)));
    const B = 180 - A - C;
    const Cr = rad(C);
    return {
      A: { x: b, y: 0 },
      B: { x: a * Math.cos(Cr), y: a * Math.sin(Cr) },
      C: { x: 0, y: 0 },
      a, b, c, Aang: A, Bang: B, Cang: C
    };
  }

  function triangleAnglesSide(Adeg, Bdeg, c) {
    const Cdeg = 180 - Adeg - Bdeg;
    const b = (c * Math.sin(rad(Bdeg))) / Math.sin(rad(Cdeg));
    const a = (c * Math.sin(rad(Adeg))) / Math.sin(rad(Cdeg));
    return {
      A: { x: 0, y: 0 },
      B: { x: c, y: 0 },
      C: { x: b * Math.cos(rad(Adeg)), y: b * Math.sin(rad(Adeg)) },
      a, b, c, Aang: Adeg, Bang: Bdeg, Cang: Cdeg
    };
  }

  function validSSS(a, b, c) {
    return a + b > c + 1e-9 && a + c > b + 1e-9 && b + c > a + 1e-9;
  }

  function fitTriangle(tri, w, h, pad = 62) {
    const pts = [tri.A, tri.B, tri.C];
    const xs = pts.map((p) => p.x);
    const ys = pts.map((p) => p.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const rangeX = Math.max(maxX - minX, 1e-6);
    const rangeY = Math.max(maxY - minY, 1e-6);
    const s = Math.min((w - pad * 2) / rangeX, (h - pad * 2) / rangeY);
    const mx = (w - rangeX * s) / 2;
    const my = (h - rangeY * s) / 2;
    return {
      s,
      map: (p) => ({ x: mx + (p.x - minX) * s, y: my + (maxY - p.y) * s })
    };
  }

  function drawCompass(ctx, w, h) {
    ctx.save();
    const x = w - 34;
    const y = 34;
    ctx.strokeStyle = 'rgba(157,176,207,0.55)';
    ctx.fillStyle = 'rgba(157,176,207,0.8)';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(x, y + 14);
    ctx.lineTo(x, y - 14);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y - 18);
    ctx.lineTo(x - 4, y - 10);
    ctx.lineTo(x + 4, y - 10);
    ctx.closePath();
    ctx.fill();
    ctx.font = `600 10px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.fillText('N', x, y - 24);
    ctx.restore();
  }

  function drawTriangleScene(ctx, w, h, tri, opts = {}) {
    const { map } = fitTriangle(tri, w, h, opts.pad || 62);
    const A = map(tri.A);
    const B = map(tri.B);
    const C = map(tri.C);
    const hl = opts.highlight || {};
    const showSides = Boolean(opts.showSideValues);
    const showAngles = Boolean(opts.showAngleValues);

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(A.x, A.y);
    ctx.lineTo(B.x, B.y);
    ctx.lineTo(C.x, C.y);
    ctx.closePath();
    ctx.fillStyle = 'rgba(0,229,255,0.05)';
    ctx.fill();
    ctx.restore();

    const sides = [
      { id: 'a', p: B, q: C, color: COLORS.a, value: tri.a },
      { id: 'b', p: C, q: A, color: COLORS.b, value: tri.b },
      { id: 'c', p: A, q: B, color: COLORS.c, value: tri.c }
    ];
    const centroid = { x: (A.x + B.x + C.x) / 3, y: (A.y + B.y + C.y) / 3 };

    sides.forEach((side) => {
      const active = hl.side === side.id;
      neonLine(ctx, side.p.x, side.p.y, side.q.x, side.q.y, side.color, active ? 4.5 : 2.8, null, true);
      const mid = { x: (side.p.x + side.q.x) / 2, y: (side.p.y + side.q.y) / 2 };
      let dx = mid.x - centroid.x;
      let dy = mid.y - centroid.y;
      const len = Math.hypot(dx, dy) || 1;
      dx /= len;
      dy /= len;
      const text = showSides ? `${side.id} = ${fmt(side.value, 2)}` : side.id;
      chip(ctx, text, mid.x + dx * 22, mid.y + dy * 22, side.color);
    });

    const vertices = [
      { name: 'A', p: A, opposite: C, other: B, value: tri.Aang },
      { name: 'B', p: B, opposite: A, other: C, value: tri.Bang },
      { name: 'C', p: C, opposite: B, other: A, value: tri.Cang }
    ];
    vertices.forEach((v) => {
      const active = hl.angle === v.name;
      if (v.value > 0.5) {
        angleArc(ctx, v.p, v.opposite, v.other, 30, showAngles ? `${v.name} ${fmt(v.value, 1)}°` : '', COLORS.theta, active, showAngles);
      }
      if (!showAngles) {
        let dx = v.p.x - centroid.x;
        let dy = v.p.y - centroid.y;
        const len = Math.hypot(dx, dy) || 1;
        chip(ctx, v.name, v.p.x + (dx / len) * 22, v.p.y + (dy / len) * 22, active ? COLORS.theta : '#9db0cf');
      }
    });

    if (opts.compass) drawCompass(ctx, w, h);
    if (opts.stepLabel) {
      ctx.save();
      ctx.font = `600 11px ${FONT}`;
      const tw = ctx.measureText(opts.stepLabel).width + 18;
      ctx.fillStyle = 'rgba(5,10,20,0.86)';
      ctx.strokeStyle = 'rgba(0,229,255,0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      roundRect(ctx, 12, 12, tw, 24, 8);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#00e5ff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(opts.stepLabel, 12 + tw / 2, 24.5);
      ctx.restore();
    }
  }

  /* --------------------------- module 1 · SSA ---------------------------- */
  function ssaAnalysis(a, b, A) {
    const s = (b * Math.sin(rad(A))) / a;
    if (s > 1 + 1e-9) return { count: 0, sinB: s, sols: [] };
    const B1 = deg(Math.asin(clamp(s, -1, 1)));
    const candidates = [B1];
    if (s < 1 - 1e-9) candidates.push(180 - B1);
    const sols = [];
    candidates.forEach((B) => {
      const C = 180 - A - B;
      if (C > 0.05) {
        const c = (a * Math.sin(rad(C))) / Math.sin(rad(A));
        sols.push({ B, C, c });
      }
    });
    return { count: sols.length, sinB: s, sols };
  }

  function drawSines() {
    const { ctx, w, h } = sinesStage;
    if (!w || !h) return;
    ctx.clearRect(0, 0, w, h);
    drawGrid(ctx, w, h);

    const { a, b, A } = state.ssa;
    const analysis = ssaAnalysis(a, b, A);
    const Ar = rad(A);
    const A0 = { x: 0, y: 0 };
    const C0 = { x: b, y: 0 };
    const bPoints = analysis.sols.map((sol) => ({
      x: sol.c * Math.cos(Ar),
      y: sol.c * Math.sin(Ar)
    }));

    const pts = [A0, C0, ...bPoints];
    if (!bPoints.length) pts.push({ x: b + a * 0.4, y: a });
    const xs = pts.map((p) => p.x);
    const ys = pts.map((p) => p.y);
    const minX = Math.min(...xs) - 1;
    const maxX = Math.max(...xs) + 1;
    const minY = Math.min(...ys) - 1;
    const maxY = Math.max(...ys, 1) + 1;
    const rangeX = Math.max(maxX - minX, 1);
    const rangeY = Math.max(maxY - minY, 1);
    const pad = 60;
    const s = Math.min((w - pad * 2) / rangeX, (h - pad * 2) / rangeY);
    const mx = (w - rangeX * s) / 2;
    const my = (h - rangeY * s) / 2;
    const map = (p) => ({ x: mx + (p.x - minX) * s, y: my + (maxY - p.y) * s });

    const A2 = map(A0);
    const C2 = map(C0);
    const Bpts = bPoints.map(map);

    // Circle of radius a around C
    ctx.save();
    ctx.beginPath();
    ctx.arc(C2.x, C2.y, a * s, 0, Math.PI * 2);
    ctx.strokeStyle = rgba(COLORS.violet, 0.3);
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 6]);
    ctx.stroke();
    ctx.restore();

    // Ray from A at angle A
    const rayLen = Math.max(b, ...analysis.sols.map((sol) => sol.c), a * 0.7) * 1.16;
    const rayEnd = map({ x: rayLen * Math.cos(Ar), y: rayLen * Math.sin(Ar) });
    neonLine(ctx, A2.x, A2.y, rayEnd.x, rayEnd.y, rgba(COLORS.theta, 0.55), 1.5, [7, 6], false);

    // Fixed base b
    neonLine(ctx, C2.x, C2.y, A2.x, A2.y, COLORS.b, 3.2);

    angleArc(ctx, A2, C2, rayEnd, Math.max(28, Math.min(46, b * s * 0.22)), `A ${A}°`, COLORS.theta, false, true);

    // Triangles
    analysis.sols.forEach((sol, i) => {
      const Bp = Bpts[i];
      const isSecond = i === 1;
      const color = isSecond ? COLORS.a : COLORS.c;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(A2.x, A2.y);
      ctx.lineTo(Bp.x, Bp.y);
      ctx.lineTo(C2.x, C2.y);
      ctx.closePath();
      ctx.fillStyle = rgba(color, isSecond ? 0.05 : 0.07);
      ctx.fill();
      ctx.restore();

      const dash = isSecond ? [7, 6] : null;
      neonLine(ctx, A2.x, A2.y, Bp.x, Bp.y, color, 2.6, dash);
      neonLine(ctx, C2.x, C2.y, Bp.x, Bp.y, color, 2.6, dash);

      ctx.save();
      ctx.beginPath();
      ctx.arc(Bp.x, Bp.y, isSecond ? 6 : 7.5, 0, Math.PI * 2);
      ctx.fillStyle = '#f8fbff';
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = color;
      ctx.stroke();
      ctx.restore();

      const midAB = { x: (A2.x + Bp.x) / 2, y: (A2.y + Bp.y) / 2 };
      chip(ctx, isSecond ? 'c₂' : 'c₁', midAB.x + 18, midAB.y - 8, color);
      const labelX = Bp.x > w - 92 ? Bp.x - 52 : Bp.x + 34;
      chip(ctx, `${isSecond ? 'B₂' : 'B₁'} ${fmt(sol.B, 1)}°`, labelX, Bp.y - 16, color);
    });

    chip(ctx, 'A', A2.x - 20, A2.y + 20, '#9db0cf');
    chip(ctx, 'C', C2.x + 20, C2.y + 20, '#9db0cf');
    chip(ctx, 'b', (A2.x + C2.x) / 2, A2.y + 22, COLORS.b);

    if (analysis.count === 0) {
      ctx.save();
      ctx.fillStyle = rgba(COLORS.a, 0.9);
      ctx.font = `600 13px ${FONT}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(t('s.float0'), w / 2, 26);
      ctx.restore();
    }
  }

  const sinesStage = makeStage($('sinesCanvas'), drawSines);

  function renderSines() {
    const { a, b, A } = state.ssa;
    const analysis = ssaAnalysis(a, b, A);

    $('aS').value = String(a);
    $('bS').value = String(b);
    $('AS').value = String(A);
    $('aSOut').textContent = fmt(a, 1);
    $('bSOut').textContent = fmt(b, 1);
    $('ASOut').textContent = `${A}°`;

    $('caseBadge').textContent = String(analysis.count);
    $('caseBadge').className = `case-badge${analysis.count === 2 ? ' is-two' : analysis.count === 0 ? ' is-zero' : ''}`;
    $('caseTitle').textContent = t(analysis.count === 0 ? 's.case0' : analysis.count === 1 ? 's.case1' : 's.case2');
    $('caseReason').textContent = t(analysis.count === 0 ? 's.reason0' : analysis.count === 1 ? 's.reason1' : 's.reason2');
    $('sinBValue').textContent = fmt(analysis.sinB, 4);

    const float = $('caseFloat');
    float.textContent = t(analysis.count === 0 ? 's.float0' : analysis.count === 1 ? 's.float1' : 's.float2');
    float.className = `case-float${analysis.count === 2 ? ' is-two' : analysis.count === 0 ? ' is-zero' : ''}`;

    const list = $('solutionsList');
    if (!analysis.sols.length) {
      list.innerHTML = `<p class="empty-note">${escapeHtml(t('s.none'))}</p>`;
    } else {
      list.innerHTML = analysis.sols.map((sol, i) => `
        <div class="solution-row${i === 1 ? ' is-second' : ''}">
          <span class="solution-num">${i + 1}</span>
          <div class="solution-detail">
            B = <b>${fmt(sol.B, 1)}°</b> · C = <b>${fmt(sol.C, 1)}°</b> · c = <b>${fmt(sol.c, 2)}</b>
          </div>
        </div>`).join('');
    }
  }

  function onSSAChange() {
    renderSines();
    drawSines();
    completeModule('sines');
    scheduleSave();
  }

  $('aS').addEventListener('input', () => { state.ssa.a = Number($('aS').value); onSSAChange(); });
  $('bS').addEventListener('input', () => { state.ssa.b = Number($('bS').value); onSSAChange(); });
  $('AS').addEventListener('input', () => { state.ssa.A = Number($('AS').value); onSSAChange(); });

  /* ------------------------- module 2 · cosines -------------------------- */
  function cosineData() {
    const { mode, a, b, C, c } = state.cosines;
    if (mode === 'sss') {
      if (!validSSS(a, b, c)) return { valid: false, a, b, c, mode };
      return { valid: true, mode, a, b, c, tri: triangleSSS(a, b, c) };
    }
    const tri = triangleSAS(a, b, C);
    return { valid: true, mode, a, b, C, c: tri.c, tri };
  }

  function stepHTML(text) {
    return text;
  }

  function renderCosines() {
    const data = cosineData();
    const mode = state.cosines.mode;

    document.querySelectorAll('.mode-btn[data-cmode]').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.cmode === mode);
    });

    $('cosA').value = String(state.cosines.a);
    $('cosB').value = String(state.cosines.b);
    $('cosAOut').textContent = fmt(state.cosines.a, 1);
    $('cosBOut').textContent = fmt(state.cosines.b, 1);

    const third = $('cosThird');
    if (mode === 'sas') {
      $('thirdSymbol').textContent = 'C';
      $('thirdLabel').textContent = t('c.includedC');
      third.min = '5';
      third.max = '175';
      third.step = '1';
      third.value = String(state.cosines.C);
      $('cosThirdOut').textContent = `${state.cosines.C}°`;
    } else {
      $('thirdSymbol').textContent = 'c';
      $('thirdLabel').textContent = t('c.sideC');
      third.min = '0.5';
      third.max = '29';
      third.step = '0.1';
      third.value = String(state.cosines.c);
      $('cosThirdOut').textContent = fmt(state.cosines.c, 1);
    }

    const warn = $('cosWarning');
    const steps = $('cosSteps');
    steps.innerHTML = '';

    if (!data.valid) {
      warn.hidden = false;
      warn.textContent = t('c.invalid');
      $('resC').textContent = '—';
      $('resA').textContent = '—';
      $('resB').textContent = '—';
      $('resCangle').textContent = '—';
      $('resArea').textContent = '—';
      steps.innerHTML = `<li><span class="step-num">!</span><span>${escapeHtml(t('c.invalid'))}</span></li>`;
      drawCosines();
      return;
    }

    warn.hidden = true;
    const tri = data.tri;
    const area = 0.5 * tri.a * tri.b * Math.sin(rad(tri.Cang));
    $('resC').textContent = fmt(tri.c, 2);
    $('resA').textContent = `${fmt(tri.Aang, 1)}°`;
    $('resB').textContent = `${fmt(tri.Bang, 1)}°`;
    $('resCangle').textContent = `${fmt(tri.Cang, 1)}°`;
    $('resArea').textContent = fmt(area, 2);

    const items = [];
    if (mode === 'sas') {
      items.push('c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup> − 2ab cos C');
      items.push(`c<sup>2</sup> = ${fmt(tri.a, 1)}<sup>2</sup> + ${fmt(tri.b, 1)}<sup>2</sup> − 2(${fmt(tri.a, 1)})(${fmt(tri.b, 1)}) cos ${fmt(tri.Cang, 1)}°`);
      items.push(`c<sup>2</sup> = ${fmt(tri.a * tri.a, 2)} + ${fmt(tri.b * tri.b, 2)} − ${fmt(2 * tri.a * tri.b, 2)} × ${fmt(Math.cos(rad(tri.Cang)), 4)}`);
      items.push(`c<sup>2</sup> = ${fmt(tri.a * tri.a + tri.b * tri.b, 2)} − ${fmt(2 * tri.a * tri.b * Math.cos(rad(tri.Cang)), 2)} = ${fmt(tri.c * tri.c, 2)}`);
      items.push(`c = √${fmt(tri.c * tri.c, 2)} ≈ <strong>${fmt(tri.c, 2)}</strong>`);
      items.push(`A = cos<sup>−1</sup>((b<sup>2</sup> + c<sup>2</sup> − a<sup>2</sup>) / (2bc)) ≈ <strong>${fmt(tri.Aang, 1)}°</strong>, B ≈ <strong>${fmt(tri.Bang, 1)}°</strong>`);
    } else {
      items.push('cos C = (a<sup>2</sup> + b<sup>2</sup> − c<sup>2</sup>) / (2ab)');
      items.push(`cos C = (${fmt(tri.a, 1)}<sup>2</sup> + ${fmt(tri.b, 1)}<sup>2</sup> − ${fmt(tri.c, 1)}<sup>2</sup>) / (2 × ${fmt(tri.a, 1)} × ${fmt(tri.b, 1)})`);
      items.push(`cos C = (${fmt(tri.a * tri.a, 2)} + ${fmt(tri.b * tri.b, 2)} − ${fmt(tri.c * tri.c, 2)}) / ${fmt(2 * tri.a * tri.b, 2)} = ${fmt(Math.cos(rad(tri.Cang)), 4)}`);
      items.push(`C = cos<sup>−1</sup>(${fmt(Math.cos(rad(tri.Cang)), 4)}) ≈ <strong>${fmt(tri.Cang, 1)}°</strong>`);
      items.push(`A ≈ <strong>${fmt(tri.Aang, 1)}°</strong>, B ≈ <strong>${fmt(tri.Bang, 1)}°</strong>`);
      items.push(`Area = ½ab sin C ≈ <strong>${fmt(area, 2)}</strong>`);
    }
    steps.innerHTML = items.map((html, i) => `<li><span class="step-num">${i + 1}</span><span>${stepHTML(html)}</span></li>`).join('');
    drawCosines();
  }

  function drawCosines() {
    const { ctx, w, h } = cosStage;
    if (!w || !h) return;
    ctx.clearRect(0, 0, w, h);
    drawGrid(ctx, w, h);
    const data = cosineData();
    if (!data.valid) {
      ctx.save();
      ctx.fillStyle = 'rgba(255,92,138,0.9)';
      ctx.font = `600 13px ${FONT}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(t('c.invalid'), w / 2, h / 2);
      ctx.restore();
      return;
    }
    drawTriangleScene(ctx, w, h, data.tri, {
      showSideValues: true,
      showAngleValues: true,
      pad: 70
    });
  }

  const cosStage = makeStage($('cosCanvas'), drawCosines);

  document.querySelectorAll('.mode-btn[data-cmode]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.cosines.mode = btn.dataset.cmode;
      renderCosines();
      completeModule('cosines');
      saveState();
    });
  });

  function onCosinesChange() {
    renderCosines();
    completeModule('cosines');
    scheduleSave();
  }

  $('cosA').addEventListener('input', () => { state.cosines.a = Number($('cosA').value); onCosinesChange(); });
  $('cosB').addEventListener('input', () => { state.cosines.b = Number($('cosB').value); onCosinesChange(); });
  $('cosThird').addEventListener('input', () => {
    if (state.cosines.mode === 'sas') state.cosines.C = Number($('cosThird').value);
    else state.cosines.c = Number($('cosThird').value);
    onCosinesChange();
  });

  /* --------------------------- module 3 · quiz --------------------------- */
  const BADGES = [
    { id: 'first', icon: '🌟', key: 'badge.first', test: (p) => p.correct >= 1 },
    { id: 'streak3', icon: '🔥', key: 'badge.streak3', test: (p) => p.best >= 3 },
    { id: 'streak5', icon: '⚡', key: 'badge.streak5', test: (p) => p.best >= 5 },
    { id: 'sines3', icon: '📐', key: 'badge.sines3', test: (p) => p.byMode.sines >= 3 },
    { id: 'cosines3', icon: '🧭', key: 'badge.cosines3', test: (p) => p.byMode.cosines >= 3 },
    { id: 'survey3', icon: '🗺️', key: 'badge.survey3', test: (p) => p.byMode.survey >= 3 },
    { id: 'master', icon: '🏆', key: 'badge.master', test: (p) => p.correct >= 15 }
  ];

  const SURVEYS = [
    {
      id: 'lake',
      make() {
        const A = 65;
        const B = 40;
        const c = 120;
        const tri = triangleAnglesSide(A, B, c);
        const answer = tri.b;
        return {
          mode: 'survey',
          answer,
          answerType: 'length',
          unit: 'm',
          triangle: tri,
          compass: true,
          promptEn: `A surveyor measures a <strong>${c} m</strong> baseline AB along the shore. From A, the lake point C is at <strong>${A}°</strong> to the baseline; from B it is at <strong>${B}°</strong>.`,
          promptTh: `นักสำรวจวัดฐาน AB ตามตลิ่งยาว <strong>${c} เมตร</strong> จากจุด A จุด C ฝั่งทะเลสาบทำมุม <strong>${A}°</strong> กับฐาน และจากจุด B ทำมุม <strong>${B}°</strong>`,
          questionEn: `How far is C from A (side b)?`,
          questionTh: `จุด C ห่างจาก A เท่าไร (ด้าน b)`,
          steps: [
            { en: `C = 180° − ${A}° − ${B}° = <strong>75°</strong>`, th: `C = 180° − ${A}° − ${B}° = <strong>75°</strong>`, highlight: { angle: 'C' } },
            { en: `Law of Sines: <strong>b / sin B = c / sin C</strong>`, th: `กฎของไซน์: <strong>b / sin B = c / sin C</strong>`, highlight: { side: 'b' } },
            { en: `b = ${c} × sin ${B}° / sin 75° ≈ ${fmt(answer, 1)} m`, th: `b = ${c} × sin ${B}° / sin 75° ≈ ${fmt(answer, 1)} เมตร`, highlight: { side: 'b' } }
          ]
        };
      }
    },
    {
      id: 'landmarks',
      make() {
        const a = 90;
        const b = 120;
        const C = 55;
        const tri = triangleSAS(a, b, C);
        return {
          mode: 'survey',
          answer: tri.c,
          answerType: 'length',
          unit: 'm',
          triangle: tri,
          compass: true,
          promptEn: `Two landmarks are <strong>${a} m</strong> and <strong>${b} m</strong> from a survey point, with a <strong>${C}°</strong> angle between the lines of sight.`,
          promptTh: `จุดสำคัญสองจุดอยู่ห่างจากจุดสำรวจ <strong>${a} เมตร</strong> และ <strong>${b} เมตร</strong> โดยมีมุมระหว่างแนวสายตา <strong>${C}°</strong>`,
          questionEn: `Find the distance between the landmarks.`,
          questionTh: `จงหาระยะห่างระหว่างจุดสำคัญทั้งสอง`,
          steps: [
            { en: `Law of Cosines: <strong>c² = a² + b² − 2ab cos C</strong>`, th: `กฎของโคไซน์: <strong>c² = a² + b² − 2ab cos C</strong>`, highlight: { side: 'c' } },
            { en: `c² = ${a}² + ${b}² − 2(${a})(${b}) cos ${C}°`, th: `c² = ${a}² + ${b}² − 2(${a})(${b}) cos ${C}°`, highlight: { angle: 'C' } },
            { en: `c ≈ <strong>${fmt(tri.c, 1)} m</strong>`, th: `c ≈ <strong>${fmt(tri.c, 1)} เมตร</strong>`, highlight: { side: 'c' } }
          ]
        };
      }
    },
    {
      id: 'ship',
      make() {
        const a = 30;
        const b = 40;
        const C = 70;
        const tri = triangleSAS(a, b, C);
        return {
          mode: 'survey',
          answer: tri.c,
          answerType: 'length',
          unit: 'km',
          triangle: tri,
          compass: true,
          promptEn: `A ship sails <strong>${b} km</strong> from port on bearing 070°, then <strong>${a} km</strong> on bearing 140°.`,
          promptTh: `เรือแล่นออกจากท่า <strong>${b} กม.</strong> ตามแนวราบ 070° จากนั้นแล่น <strong>${a} กม.</strong> ตามแนวราบ 140°`,
          questionEn: `How far is the ship from port?`,
          questionTh: `เรืออยู่ห่างจากท่าเท่าไร`,
          steps: [
            { en: `The angle between the two legs is <strong>140° − 70° = 70°</strong>.`, th: `มุมระหว่างสองช่วงทางคือ <strong>140° − 70° = 70°</strong>`, highlight: { angle: 'C' } },
            { en: `<strong>c² = 40² + 30² − 2(40)(30) cos 70°</strong>`, th: `<strong>c² = 40² + 30² − 2(40)(30) cos 70°</strong>`, highlight: { side: 'c' } },
            { en: `c ≈ <strong>${fmt(tri.c, 1)} km</strong>`, th: `c ≈ <strong>${fmt(tri.c, 1)} กม.</strong>`, highlight: { side: 'c' } }
          ]
        };
      }
    },
    {
      id: 'drone',
      make() {
        const A = 55;
        const B = 65;
        const c = 500;
        const tri = triangleAnglesSide(A, B, c);
        return {
          mode: 'survey',
          answer: tri.b,
          answerType: 'length',
          unit: 'm',
          triangle: tri,
          compass: true,
          promptEn: `Two tracking stations are <strong>${c} m</strong> apart. A drone is sighted at <strong>${A}°</strong> from station A and <strong>${B}°</strong> from station B.`,
          promptTh: `สถานีติดตามสองแห่งห่างกัน <strong>${c} เมตร</strong> ตรวจพบโดรนที่มุม <strong>${A}°</strong> จากสถานี A และ <strong>${B}°</strong> จากสถานี B`,
          questionEn: `How far is the drone from station A (side b)?`,
          questionTh: `โดรนอยู่ห่างจากสถานี A เท่าไร (ด้าน b)`,
          steps: [
            { en: `C = 180° − ${A}° − ${B}° = <strong>60°</strong>`, th: `C = 180° − ${A}° − ${B}° = <strong>60°</strong>`, highlight: { angle: 'C' } },
            { en: `Law of Sines: <strong>b / sin B = c / sin C</strong>`, th: `กฎของไซน์: <strong>b / sin B = c / sin C</strong>`, highlight: { side: 'b' } },
            { en: `b = ${c} × sin ${B}° / sin 60° ≈ <strong>${fmt(tri.b, 1)} m</strong>`, th: `b = ${c} × sin ${B}° / sin 60° ≈ <strong>${fmt(tri.b, 1)} เมตร</strong>`, highlight: { side: 'b' } }
          ]
        };
      }
    }
  ];

  let currentProblem = null;
  let answered = false;
  let lastCorrect = false;
  let stepsShown = false;
  let stepHighlight = null;
  let activeStepIndex = -1;
  let stepTimers = [];
  let lastSurvey = null;

  function genSinesProblem() {
    let A;
    let B;
    let guard = 0;
    do {
      A = randInt(35, 80);
      B = randInt(30, 85);
      guard += 1;
    } while ((180 - A - B < 25 || 180 - A - B > 95) && guard < 40);
    if (180 - A - B < 25 || 180 - A - B > 95) { A = 50; B = 60; }
    const C = 180 - A - B;
    const c = randInt(40, 120);
    const tri = triangleAnglesSide(A, B, c);
    const find = Math.random() < 0.5 ? 'b' : 'a';
    const answer = find === 'b' ? tri.b : tri.a;
    const angle = find === 'b' ? B : A;
    return {
      mode: 'sines',
      answer,
      answerType: 'length',
      unit: 'm',
      triangle: tri,
      promptEn: `In triangle ABC, angle A = <strong>${A}°</strong>, angle B = <strong>${B}°</strong>, and side c = <strong>${c} m</strong>.`,
      promptTh: `ในสามเหลี่ยม ABC มุม A = <strong>${A}°</strong> มุม B = <strong>${B}°</strong> และด้าน c = <strong>${c} เมตร</strong>`,
      questionEn: `Find side ${find}.`,
      questionTh: `จงหาความยาวด้าน ${find}`,
      steps: [
        { en: `C = 180° − ${A}° − ${B}° = <strong>${C}°</strong>`, th: `C = 180° − ${A}° − ${B}° = <strong>${C}°</strong>`, highlight: { angle: 'C' } },
        { en: `Law of Sines: <strong>${find} / sin ${find === 'b' ? 'B' : 'A'} = c / sin C</strong>`, th: `กฎของไซน์: <strong>${find} / sin ${find === 'b' ? 'B' : 'A'} = c / sin C</strong>`, highlight: { side: 'c' } },
        { en: `${find} = ${c} × sin ${angle}° / sin ${C}° ≈ <strong>${fmt(answer, 1)} m</strong>`, th: `${find} = ${c} × sin ${angle}° / sin ${C}° ≈ <strong>${fmt(answer, 1)} เมตร</strong>`, highlight: { side: find } }
      ]
    };
  }

  function genCosinesProblem() {
    const a = randInt(30, 100);
    const b = randInt(30, 100);
    const C = randInt(40, 140);
    const tri = triangleSAS(a, b, C);
    return {
      mode: 'cosines',
      answer: tri.c,
      answerType: 'length',
      unit: 'm',
      triangle: tri,
      promptEn: `In triangle ABC, side a = <strong>${a} m</strong>, side b = <strong>${b} m</strong>, and the included angle C = <strong>${C}°</strong>.`,
      promptTh: `ในสามเหลี่ยม ABC ด้าน a = <strong>${a} เมตร</strong> ด้าน b = <strong>${b} เมตร</strong> และมุมระหว่างด้าน C = <strong>${C}°</strong>`,
      questionEn: `Find side c.`,
      questionTh: `จงหาความยาวด้าน c`,
      steps: [
        { en: `Law of Cosines: <strong>c² = a² + b² − 2ab cos C</strong>`, th: `กฎของโคไซน์: <strong>c² = a² + b² − 2ab cos C</strong>`, highlight: { side: 'c' } },
        { en: `c² = ${a}² + ${b}² − 2(${a})(${b}) cos ${C}°`, th: `c² = ${a}² + ${b}² − 2(${a})(${b}) cos ${C}°`, highlight: { angle: 'C' } },
        { en: `c = √${fmt(tri.c * tri.c, 2)} ≈ <strong>${fmt(tri.c, 1)} m</strong>`, th: `c = √${fmt(tri.c * tri.c, 2)} ≈ <strong>${fmt(tri.c, 1)} เมตร</strong>`, highlight: { side: 'c' } }
      ]
    };
  }

  function genSurveyProblem() {
    let survey = pick(SURVEYS);
    let guard = 0;
    while (survey.id === lastSurvey && guard < 8) {
      survey = pick(SURVEYS);
      guard += 1;
    }
    lastSurvey = survey.id;
    return survey.make();
  }

  const TAG_KEYS = { sines: 'q.tagSines', cosines: 'q.tagCosines', survey: 'q.tagSurvey' };

  function renderQuizCanvas() {
    const { ctx, w, h } = quizStage;
    if (!w || !h) return;
    ctx.clearRect(0, 0, w, h);
    drawGrid(ctx, w, h, 30);

    if (!currentProblem) {
      ctx.save();
      ctx.fillStyle = 'rgba(157,176,207,0.7)';
      ctx.font = `600 12px ${FONT}`;
      ctx.textAlign = 'center';
      ctx.fillText('—', w / 2, h / 2);
      ctx.restore();
      return;
    }

    drawTriangleScene(ctx, w, h, currentProblem.triangle, {
      showSideValues: false,
      showAngleValues: false,
      highlight: stepHighlight,
      compass: Boolean(currentProblem.compass),
      stepLabel: activeStepIndex >= 0 ? `${t('q.step')} ${activeStepIndex + 1} ${t('q.of')} ${currentProblem.steps.length}` : null,
      pad: 58
    });
  }

  const quizStage = makeStage($('quizCanvas'), renderQuizCanvas);

  function renderProblemText() {
    if (!currentProblem) return;
    $('problemText').innerHTML = state.lang === 'th' ? currentProblem.promptTh : currentProblem.promptEn;
    const noteKey = currentProblem.answerType === 'angle' ? 'q.roundAngle' : 'q.roundLength';
    $('problemQuestion').innerHTML =
      (state.lang === 'th' ? currentProblem.questionTh : currentProblem.questionEn) +
      ` <span class="round-note">${t(noteKey)}</span>`;
    $('problemTag').textContent = t(TAG_KEYS[currentProblem.mode]);
  }

  function resetStepAnimation() {
    stepTimers.forEach((timer) => clearTimeout(timer));
    stepTimers = [];
    stepsShown = false;
    stepHighlight = null;
    activeStepIndex = -1;
    $('stepsList').innerHTML = '';
    $('stepsBtn').querySelector('span').textContent = t('q.showSteps');
  }

  function addStepItem(step, index) {
    const li = document.createElement('li');
    li.style.setProperty('--i', 0);
    li.innerHTML = `<span class="step-num">${index + 1}</span><span>${state.lang === 'th' ? step.th : step.en}</span>`;
    $('stepsList').appendChild(li);
  }

  function revealSteps() {
    if (!currentProblem) return;
    if (stepsShown) {
      resetStepAnimation();
      renderQuizCanvas();
      return;
    }
    stepsShown = true;
    $('stepsBtn').querySelector('span').textContent = t('q.hideSteps');
    $('stepsList').innerHTML = '';
    currentProblem.steps.forEach((step, i) => {
      const timer = setTimeout(() => {
        addStepItem(step, i);
        stepHighlight = step.highlight || null;
        activeStepIndex = i;
        renderQuizCanvas();
      }, i * 680);
      stepTimers.push(timer);
    });
  }

  function renderStepsInstant() {
    if (!stepsShown || !currentProblem) return;
    $('stepsList').innerHTML = '';
    currentProblem.steps.forEach((step, i) => addStepItem(step, i));
    $('stepsBtn').querySelector('span').textContent = t('q.hideSteps');
  }

  function newProblem() {
    resetStepAnimation();
    answered = false;
    lastCorrect = false;
    activeStepIndex = -1;
    stepHighlight = null;
    $('answerInput').disabled = false;
    $('checkBtn').disabled = false;
    $('answerInput').value = '';
    $('feedback').hidden = true;
    $('feedback').textContent = '';

    const mode = state.practice.mode;
    currentProblem = mode === 'sines' ? genSinesProblem() : mode === 'cosines' ? genCosinesProblem() : genSurveyProblem();
    renderProblemText();
    renderQuizCanvas();
    scheduleSave();
  }

  function renderPracticeLocale() {
    if (!currentProblem) return;
    renderProblemText();
    if (answered) {
      const el = $('feedback');
      el.hidden = false;
      el.className = `feedback ${lastCorrect ? 'is-good' : 'is-bad'}`;
      el.textContent = lastCorrect
        ? `✅ ${t('q.correctMsg')} ${fmt(currentProblem.answer, 1)}${currentProblem.answerType === 'angle' ? '°' : ` ${currentProblem.unit}`}`
        : `❌ ${t('q.wrongMsg')}`;
    }
    if (stepsShown) renderStepsInstant();
  }

  function parseAnswer(raw) {
    const s = String(raw).trim().replace(/,/g, '').replace(/[a-zA-Z°\s]/g, '');
    if (!s) return NaN;
    const v = Number(s);
    return Number.isFinite(v) ? v : NaN;
  }

  function handleCheck() {
    if (!currentProblem || answered) return;
    const value = parseAnswer($('answerInput').value);
    if (!Number.isFinite(value)) {
      const el = $('feedback');
      el.hidden = false;
      el.className = 'feedback is-bad';
      el.textContent = t('q.invalid');
      return;
    }

    state.practice.attempts += 1;
    const tolerance = currentProblem.answerType === 'angle'
      ? 0.15
      : Math.max(0.1, Math.abs(currentProblem.answer) * 0.002);
    const correct = Math.abs(value - currentProblem.answer) <= tolerance;
    const el = $('feedback');
    el.hidden = false;
    answered = true;
    lastCorrect = correct;

    if (correct) {
      state.practice.correct += 1;
      state.practice.streak += 1;
      state.practice.best = Math.max(state.practice.best, state.practice.streak);
      state.practice.byMode[currentProblem.mode] += 1;
      state.completed.practice = true;
      const fresh = syncBadges();
      el.className = 'feedback is-good';
      el.textContent = `✅ ${t('q.correctMsg')} ${fmt(currentProblem.answer, 1)}${currentProblem.answerType === 'angle' ? '°' : ` ${currentProblem.unit}`}`;
      $('answerInput').disabled = true;
      $('checkBtn').disabled = true;
      if (fresh.length) {
        const badge = BADGES.find((b) => b.id === fresh[0]);
        setTimeout(() => toast(`🏅 ${t('q.badgeUnlocked')}: ${t(badge.key)}`), 350);
      }
    } else {
      state.practice.streak = 0;
      el.className = 'feedback is-bad';
      el.textContent = `❌ ${t('q.wrongMsg')}`;
    }

    renderPracticeProgress();
    saveState();
  }

  document.querySelectorAll('.mode-btn[data-pmode]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.practice.mode = btn.dataset.pmode;
      document.querySelectorAll('.mode-btn[data-pmode]').forEach((b) => b.classList.toggle('is-active', b === btn));
      newProblem();
      saveState();
    });
  });

  $('newProblemBtn').addEventListener('click', newProblem);
  $('stepsBtn').addEventListener('click', revealSteps);
  $('answerForm').addEventListener('submit', (event) => {
    event.preventDefault();
    handleCheck();
  });

  function masteryPercent() {
    return Math.min(100, Math.round((state.practice.correct / 15) * 100));
  }

  function renderBadges() {
    const grid = $('badgeGrid');
    if (!grid) return;
    grid.innerHTML = BADGES.map((b) => {
      const earned = state.practice.badges.includes(b.id);
      return `<div class="badge ${earned ? 'is-earned' : ''}" title="${escapeHtml(t(b.key))}">
        <span class="badge-icon" aria-hidden="true">${b.icon}</span>
        <span class="badge-name">${escapeHtml(t(b.key))}</span>
      </div>`;
    }).join('');
  }

  function syncBadges() {
    const before = new Set(state.practice.badges);
    const earned = BADGES.filter((b) => b.test(state.practice)).map((b) => b.id);
    state.practice.badges = Array.from(new Set([...state.practice.badges, ...earned]));
    return earned.filter((id) => !before.has(id));
  }

  function renderPracticeProgress() {
    const p = state.practice;
    const pct = masteryPercent();
    $('streakValue').textContent = String(p.streak);
    $('bestValue').textContent = String(p.best);
    $('masteryValue').textContent = `${pct}%`;
    $('quizStreak').textContent = String(p.streak);
    $('quizBest').textContent = String(p.best);
    $('quizCorrect').textContent = String(p.correct);
    $('quizMastery').textContent = `${pct}%`;
    $('masteryFill').style.width = `${pct}%`;
    document.querySelectorAll('.tab').forEach((tab) => {
      tab.classList.toggle('is-done', Boolean(state.completed[tab.dataset.module]));
    });
    renderBadges();
  }

  /* ------------------------------ modules -------------------------------- */
  function completeModule(id) {
    if (!state.completed[id]) {
      state.completed[id] = true;
      renderPracticeProgress();
      scheduleSave();
    }
  }

  function showModule(id) {
    state.lastModule = id;
    document.querySelectorAll('.tab').forEach((tab) => {
      const active = tab.dataset.module === id;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    document.querySelectorAll('.panel').forEach((panel) => {
      const active = panel.id === `panel-${id}`;
      panel.classList.toggle('is-active', active);
      panel.hidden = !active;
    });

    if (id === 'sines') requestAnimationFrame(() => sinesStage.resize());
    else if (id === 'cosines') requestAnimationFrame(() => cosStage.resize());
    else if (id === 'practice') requestAnimationFrame(() => quizStage.resize());
    scheduleSave();
  }

  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => showModule(tab.dataset.module));
    tab.addEventListener('keydown', (event) => {
      const tabs = Array.from(document.querySelectorAll('.tab'));
      const index = tabs.indexOf(tab);
      let next = null;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      if (next !== null) {
        event.preventDefault();
        tabs[next].focus();
        showModule(tabs[next].dataset.module);
      }
    });
  });

  /* ------------------------------- i18n ---------------------------------- */
  function applyI18n() {
    document.documentElement.lang = state.lang;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const value = t(el.dataset.i18n);
      if (value) el.textContent = value;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const value = t(el.dataset.i18nPlaceholder);
      if (value) el.placeholder = value;
    });
    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
      const value = t(el.dataset.i18nTitle);
      if (value) el.title = value;
    });
    $('langLabel').textContent = state.lang === 'en' ? 'EN ⇄ TH' : 'TH ⇄ EN';
    $('langToggle').setAttribute('aria-label', state.lang === 'en' ? 'Switch language to Thai' : 'เปลี่ยนภาษาเป็นอังกฤษ');

    renderSines();
    renderCosines();
    renderPracticeLocale();
    renderPracticeProgress();
    drawSines();
    drawCosines();
    renderQuizCanvas();
  }

  $('langToggle').addEventListener('click', () => {
    state.lang = state.lang === 'en' ? 'th' : 'en';
    applyI18n();
    saveState();
    toast(state.lang === 'th' ? 'เปลี่ยนภาษาเป็นภาษาไทยแล้ว' : 'Language switched to English');
  });

  /* ------------------------------ export --------------------------------- */
  function buildExport() {
    return {
      app: 'Khan Trig Companion — Unit 3 Non-Right Triangles Studio',
      stateVersion: STATE_VERSION,
      exportedAt: new Date().toISOString(),
      language: state.lang,
      lastModule: state.lastModule,
      masteryPercent: masteryPercent(),
      progress: {
        streak: state.practice.streak,
        bestStreak: state.practice.best,
        totalCorrect: state.practice.correct,
        totalAttempts: state.practice.attempts,
        correctByMode: state.practice.byMode,
        badges: state.practice.badges.map((id) => {
          const badge = BADGES.find((b) => b.id === id);
          return { id, name: badge ? t(badge.key) : id };
        }),
        modulesCompleted: state.completed
      },
      settings: {
        ssa: state.ssa,
        cosines: state.cosines
      },
      credits: {
        builtWith: 'OpenCode',
        model: 'DeepSeek V4.1 Flash (opencode-go/deepseek-v4.1-flash)'
      }
    };
  }

  $('exportBtn').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(buildExport(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'khan_trig_unit3_progress.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
    toast(t('exportDone'));
  });

  /* ------------------------------- boot ---------------------------------- */
  function init() {
    const ssa = state.ssa;
    ssa.a = clamp(Number(ssa.a) || 7, 1, 15);
    ssa.b = clamp(Number(ssa.b) || 10, 1, 15);
    ssa.A = clamp(Math.round(Number(ssa.A) || 30), 5, 175);

    state.cosines.a = clamp(Number(state.cosines.a) || 8, 1, 15);
    state.cosines.b = clamp(Number(state.cosines.b) || 6, 1, 15);
    state.cosines.C = clamp(Math.round(Number(state.cosines.C) || 50), 5, 175);
    state.cosines.c = clamp(Number(state.cosines.c) || 9, 0.5, 29);
    if (!['sas', 'sss'].includes(state.cosines.mode)) state.cosines.mode = 'sas';

    if (!['sines', 'cosines', 'survey'].includes(state.practice.mode)) state.practice.mode = 'sines';
    if (!['sines', 'cosines', 'practice'].includes(state.lastModule)) state.lastModule = 'sines';

    $('aS').value = String(ssa.a);
    $('bS').value = String(ssa.b);
    $('AS').value = String(ssa.A);
    $('cosA').value = String(state.cosines.a);
    $('cosB').value = String(state.cosines.b);
    document.querySelectorAll('.mode-btn[data-pmode]').forEach((b) => b.classList.toggle('is-active', b.dataset.pmode === state.practice.mode));

    syncBadges();
    applyI18n();
    showModule(state.lastModule);
    newProblem();
    renderPracticeProgress();
    saveState();

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        drawSines();
        drawCosines();
        renderQuizCanvas();
      }).catch(() => {});
    }
  }

  window.addEventListener('beforeunload', saveState);
  document.addEventListener('visibilitychange', () => { if (document.hidden) saveState(); });

  init();
})();
