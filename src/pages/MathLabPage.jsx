import React, { useMemo, useState } from 'react';
import { LineChart, RotateCcw } from 'lucide-react';

// ============================================================================
// Safe Recursive-Descent Math Expression Parser (no eval / Function)
// ============================================================================
const FUNCS = {
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  tg: Math.tan,
  ctg: (x) => 1 / Math.tan(x),
  asin: Math.asin,
  arcsin: Math.asin,
  acos: Math.acos,
  arccos: Math.acos,
  atan: Math.atan,
  arctg: Math.atan,
  arcctg: (x) => Math.PI / 2 - Math.atan(x),
  exp: Math.exp,
  ln: Math.log,
  log: Math.log,
  log10: Math.log10,
  sqrt: Math.sqrt,
  abs: Math.abs,
  floor: Math.floor,
  sgn: (x) => (x > 0 ? 1 : x < 0 ? -1 : 0),
};

function tokenize(expr) {
  const s = expr.replace(/,/g, '.').replace(/\s+/g, '');
  const tokens = [];
  let i = 0;
  while (i < s.length) {
    const ch = s[i];
    if (/[0-9.]/.test(ch)) {
      let num = '';
      while (i < s.length && /[0-9.]/.test(s[i])) num += s[i++];
      const v = Number(num);
      if (!Number.isFinite(v)) throw new Error(`Niepoprawna liczba: ${num}`);
      tokens.push({ type: 'num', value: v });
    } else if (/[a-zA-Z]/.test(ch)) {
      let id = '';
      while (i < s.length && /[a-zA-Z0-9]/.test(s[i])) id += s[i++];
      tokens.push({ type: 'id', value: id.toLowerCase() });
    } else if ('+-*/^()'.includes(ch)) {
      tokens.push({ type: 'op', value: ch });
      i++;
    } else {
      throw new Error(`Nieznany znak: "${ch}"`);
    }
  }
  // Insert implicit multiplication: e.g. 2x, 2(x+1), xsin(x), )(
  const out = [];
  for (let k = 0; k < tokens.length; k++) {
    const cur = tokens[k];
    const prev = out[out.length - 1];
    if (prev) {
      const prevVal = prev.type === 'num' || (prev.type === 'id' && !FUNCS[prev.value]) || (prev.type === 'op' && prev.value === ')');
      const curStart = cur.type === 'num' || cur.type === 'id' || (cur.type === 'op' && cur.value === '(');
      if (prevVal && curStart) {
        out.push({ type: 'op', value: '*' });
      }
    }
    out.push(cur);
  }
  return out;
}

function compileMathExpr(expr) {
  const tokens = tokenize(expr);
  let pos = 0;
  const peek = () => tokens[pos];
  const consume = () => tokens[pos++];

  function parseAddSub() {
    let left = parseMulDiv();
    while (peek() && peek().type === 'op' && (peek().value === '+' || peek().value === '-')) {
      const op = consume().value;
      const right = parseMulDiv();
      const l = left;
      const r = right;
      left = op === '+' ? (x) => l(x) + r(x) : (x) => l(x) - r(x);
    }
    return left;
  }

  function parseMulDiv() {
    let left = parseUnary();
    while (peek() && peek().type === 'op' && (peek().value === '*' || peek().value === '/')) {
      const op = consume().value;
      const right = parseUnary();
      const l = left;
      const r = right;
      left = op === '*' ? (x) => l(x) * r(x) : (x) => l(x) / r(x);
    }
    return left;
  }

  function parseUnary() {
    if (peek() && peek().type === 'op' && (peek().value === '+' || peek().value === '-')) {
      const op = consume().value;
      const sub = parseUnary();
      return op === '-' ? (x) => -sub(x) : sub;
    }
    return parsePow();
  }

  function parsePow() {
    const base = parseAtom();
    if (peek() && peek().type === 'op' && peek().value === '^') {
      consume();
      const exp = parseUnary();
      return (x) => Math.pow(base(x), exp(x));
    }
    return base;
  }

  function parseAtom() {
    const t = peek();
    if (!t) throw new Error('Niekompletne wyrażenie');
    if (t.type === 'num') {
      consume();
      const v = t.value;
      return () => v;
    }
    if (t.type === 'id') {
      consume();
      if (t.value === 'x') return (x) => x;
      if (t.value === 'pi') return () => Math.PI;
      if (t.value === 'e') return () => Math.E;
      if (FUNCS[t.value]) {
        const fn = FUNCS[t.value];
        if (!peek() || peek().value !== '(') {
          throw new Error(`Funkcja ${t.value} wymaga nawiasów, np. ${t.value}(x)`);
        }
        consume(); // '('
        const arg = parseAddSub();
        if (!peek() || peek().value !== ')') throw new Error('Brak zamykającego nawiasu ")"');
        consume();
        return (x) => fn(arg(x));
      }
      throw new Error(`Nieznany symbol: "${t.value}"`);
    }
    if (t.type === 'op' && t.value === '(') {
      consume();
      const inner = parseAddSub();
      if (!peek() || peek().value !== ')') throw new Error('Brak zamykającego nawiasu ")"');
      consume();
      return inner;
    }
    throw new Error(`Nieoczekiwany token: ${t.value}`);
  }

  const fn = parseAddSub();
  if (pos < tokens.length) throw new Error('Nieoczekiwane znaki na końcu wzoru');
  return fn;
}

function numericDeriv(fn, x) {
  const h = 1e-4;
  return (fn(x + h) - fn(x - h)) / (2 * h);
}

function numericSecondDeriv(fn, x) {
  const h = 1e-3;
  return (fn(x + h) - 2 * fn(x) + fn(x - h)) / (h * h);
}

function simpsonIntegral(fn, a, b, n = 200) {
  if (a === b) return { signed: 0, area: 0, valid: true };
  const sign = a < b ? 1 : -1;
  const lo = Math.min(a, b);
  const hi = Math.max(a, b);
  const steps = n % 2 === 0 ? n : n + 1;
  const h = (hi - lo) / steps;
  let sum = 0;
  let absSum = 0;
  let bad = 0;
  for (let i = 0; i <= steps; i++) {
    const x = lo + i * h;
    const y = fn(x);
    if (!Number.isFinite(y) || Math.abs(y) > 1e5) {
      bad++;
      continue;
    }
    const w = i === 0 || i === steps ? 1 : i % 2 === 1 ? 4 : 2;
    sum += w * y;
    absSum += w * Math.abs(y);
  }
  if (bad > 4) return { signed: NaN, area: NaN, valid: false };
  return {
    signed: sign * (h / 3) * sum,
    area: (h / 3) * absSum,
    valid: true,
  };
}

const PRESETS = [
  { label: 'Krzywa Gaussa (Przykł. 51)', expr: 'exp(-x^2/2)', xMin: -4, xMax: 4, yMin: -0.5, yMax: 1.5, x0: 1, a: -1, b: 1 },
  { label: 'Wielomian z ekstremami', expr: 'x^3 - 3*x + 1', xMin: -3, xMax: 3, yMin: -4, yMax: 6, x0: 1, a: -1, b: 2 },
  { label: 'Asymptota ukośna (Przykł. 27)', expr: '(x^2 + 1)/(x - 1)', xMin: -5, xMax: 7, yMin: -6, yMax: 9, x0: 2.5, a: 2, b: 5 },
  { label: 'sin(x)/x (Fakt 5)', expr: 'sin(x)/x', xMin: -10, xMax: 10, yMin: -0.5, yMax: 1.4, x0: 1.2, a: 0.01, b: 3.14 },
  { label: 'x·e^(−x) (Badanie zmienności)', expr: 'x*exp(-x)', xMin: -1.5, xMax: 6, yMin: -1.5, yMax: 1.2, x0: 1, a: 0, b: 3 },
  { label: 'arctg(x) (Cyklometryczna)', expr: 'arctg(x)', xMin: -6, xMax: 6, yMin: -2.2, yMax: 2.2, x0: 0, a: 0, b: 3 },
  { label: '1/(1+x²) (Całka = π)', expr: '1/(1 + x^2)', xMin: -5, xMax: 5, yMin: -0.3, yMax: 1.4, x0: 0.6, a: -2, b: 2 },
  { label: 'Półkole √(4 − x²)', expr: 'sqrt(4 - x^2)', xMin: -3, xMax: 3, yMin: -0.5, yMax: 2.6, x0: 1, a: -2, b: 2 },
];

export function MathLabPage() {
  const [expr, setExpr] = useState(PRESETS[0].expr);
  const [xMin, setXMin] = useState(PRESETS[0].xMin);
  const [xMax, setXMax] = useState(PRESETS[0].xMax);
  const [yMin, setYMin] = useState(PRESETS[0].yMin);
  const [yMax, setYMax] = useState(PRESETS[0].yMax);

  const [showDeriv1, setShowDeriv1] = useState(true);
  const [showDeriv2, setShowDeriv2] = useState(false);
  const [showTangent, setShowTangent] = useState(true);
  const [showIntegral, setShowIntegral] = useState(true);

  const [x0, setX0] = useState(PRESETS[0].x0);
  const [intA, setIntA] = useState(PRESETS[0].a);
  const [intB, setIntB] = useState(PRESETS[0].b);

  const applyPreset = (p) => {
    setExpr(p.expr);
    setXMin(p.xMin);
    setXMax(p.xMax);
    setYMin(p.yMin);
    setYMax(p.yMax);
    setX0(p.x0);
    setIntA(p.a);
    setIntB(p.b);
  };

  const parsed = useMemo(() => {
    try {
      const fn = compileMathExpr(expr);
      // test evaluation
      fn(0.5);
      return { fn, error: null };
    } catch (e) {
      return { fn: null, error: e.message };
    }
  }, [expr]);

  const W = 740, H = 390;
  const pad = { l: 48, r: 24, t: 22, b: 36 };
  const plotW = W - pad.l - pad.r;
  const plotH = H - pad.t - pad.b;
  const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * plotW;
  const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * plotH;

  const sampleCurve = (fn, steps = 420) => {
    const segs = [];
    let cur = [];
    let prevY = null;
    const span = yMax - yMin;
    for (let i = 0; i <= steps; i++) {
      const x = xMin + (i / steps) * (xMax - xMin);
      const y = fn(x);
      if (!Number.isFinite(y) || y < yMin - span * 0.6 || y > yMax + span * 0.6) {
        if (cur.length > 1) segs.push(cur);
        cur = [];
        prevY = null;
        continue;
      }
      if (prevY !== null && Math.abs(y - prevY) > span * 0.6) {
        if (cur.length > 1) segs.push(cur);
        cur = [];
      }
      cur.push(`${cur.length === 0 ? 'M' : 'L'}${sx(x).toFixed(2)},${sy(y).toFixed(2)}`);
      prevY = y;
    }
    if (cur.length > 1) segs.push(cur);
    return segs.map((s) => s.join(' ')).join(' ');
  };

  const computed = useMemo(() => {
    if (!parsed.fn) return null;
    const fn = parsed.fn;
    const fPath = sampleCurve(fn);
    const d1Path = showDeriv1 ? sampleCurve((x) => numericDeriv(fn, x), 320) : '';
    const d2Path = showDeriv2 ? sampleCurve((x) => numericSecondDeriv(fn, x), 280) : '';

    const y0 = fn(x0);
    const dy0 = numericDeriv(fn, x0);
    const d2y0 = numericSecondDeriv(fn, x0);

    let intPath = '';
    const integral = showIntegral ? simpsonIntegral(fn, intA, intB) : null;
    if (showIntegral && intA !== intB) {
      const lo = Math.min(intA, intB);
      const hi = Math.max(intA, intB);
      const pts = [];
      const steps = 140;
      for (let i = 0; i <= steps; i++) {
        const x = lo + (i / steps) * (hi - lo);
        const y = fn(x);
        if (Number.isFinite(y) && Math.abs(y) < (yMax - yMin) * 2) {
          pts.push([sx(x), sy(Math.max(yMin, Math.min(yMax, y)))]);
        }
      }
      if (pts.length >= 2) {
        const y0Px = sy(0);
        intPath =
          `M${pts[0][0].toFixed(2)},${y0Px.toFixed(2)} ` +
          pts.map((p) => `L${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(' ') +
          ` L${pts[pts.length - 1][0].toFixed(2)},${y0Px.toFixed(2)} Z`;
      }
    }

    return { fPath, d1Path, d2Path, y0, dy0, d2y0, intPath, integral };
  }, [parsed, xMin, xMax, yMin, yMax, showDeriv1, showDeriv2, showIntegral, x0, intA, intB]);

  const makeTicks = (lo, hi) => {
    const span = hi - lo;
    const rawStep = span / 8;
    const mag = Math.pow(10, Math.floor(Math.log10(rawStep)));
    const norm = rawStep / mag;
    const step = (norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10) * mag;
    const ticks = [];
    const start = Math.ceil(lo / step) * step;
    for (let v = start; v <= hi + 1e-9; v += step) {
      ticks.push(Number(v.toFixed(4)));
    }
    return ticks;
  };

  const xTicks = makeTicks(xMin, xMax);
  const yTicks = makeTicks(yMin, yMax);
  const xAxisY = yMin <= 0 && yMax >= 0 ? sy(0) : sy(yMin);
  const yAxisX = xMin <= 0 && xMax >= 0 ? sx(0) : sx(xMin);

  const fmtNum = (v) => (Number.isFinite(v) ? (Math.abs(v) < 1e-6 ? '0' : v.toFixed(4)) : 'brak');

  return (
    <div className="space-y-6">
      {/* Editorial header */}
      <header className="pb-4 border-b border-[var(--border)] flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">
            Analiza matematyczna · Narzędzie interaktywne
          </div>
          <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold tracking-tight">
            Laboratorium wykresów, pochodnych i całek
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1 max-w-2xl">
            Wpisz dowolny wzór funkcji <code className="font-mono">f(x)</code> lub wybierz przykład z wykładu. Obserwuj na żywo pochodną, drugą pochodną, styczną w punkcie <code className="font-mono">x₀</code> oraz całkę oznaczoną na przedziale <code className="font-mono">[a, b]</code>.
          </p>
        </div>
        <button
          type="button"
          onClick={() => applyPreset(PRESETS[0])}
          className="btn-secondary text-xs flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Resetuj widok
        </button>
      </header>

      {/* Preset strip */}
      <div>
        <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2">
          Przykłady z wykładu (kliknij, aby załadować)
        </div>
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((p) => (
            <button
              key={p.expr}
              type="button"
              onClick={() => applyPreset(p)}
              className={`px-2.5 py-1.5 rounded text-xs font-medium border transition-colors cursor-pointer ${
                expr === p.expr
                  ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                  : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--text-muted)]'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main layout: plot left, controls right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className="lg:col-span-8 card p-4 sm:p-5 space-y-4">
          {/* Function input */}
          <div className="flex flex-wrap items-center gap-3">
            <label className="text-sm font-mono font-semibold text-[var(--text-secondary)]">f(x) =</label>
            <input
              type="text"
              value={expr}
              onChange={(e) => setExpr(e.target.value)}
              placeholder="np. exp(-x^2/2), sin(x)/x, x^3 - 3*x"
              className="flex-1 min-w-[200px] px-3 py-2 rounded border border-[var(--border)] bg-[var(--bg)] font-mono text-sm focus:outline-none focus:border-[var(--accent)]"
            />
          </div>
          {parsed.error && (
            <div className="text-xs font-mono text-red-700 dark:text-red-400 bg-red-500/10 border border-red-500/30 rounded px-3 py-2">
              Błąd składni: {parsed.error} (obsługiwane: sin, cos, tg, arctg, arcsin, exp, ln, sqrt, abs, floor, sgn, pi, e, ^)
            </div>
          )}

          {/* SVG Canvas */}
          <div className="rounded border border-[var(--border)] bg-[var(--bg)] p-2">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto select-none">
              <defs>
                <clipPath id="mathlab-clip">
                  <rect x={pad.l} y={pad.t} width={plotW} height={plotH} />
                </clipPath>
              </defs>

              {/* Grid */}
              <g stroke="var(--border)" strokeWidth="0.7" opacity="0.65">
                {xTicks.map((t) => (
                  <line key={`gx-${t}`} x1={sx(t)} y1={pad.t} x2={sx(t)} y2={pad.t + plotH} />
                ))}
                {yTicks.map((t) => (
                  <line key={`gy-${t}`} x1={pad.l} y1={sy(t)} x2={pad.l + plotW} y2={sy(t)} />
                ))}
              </g>
              <rect x={pad.l} y={pad.t} width={plotW} height={plotH} fill="none" stroke="var(--border)" />

              {/* Axes */}
              <line x1={pad.l} y1={xAxisY} x2={pad.l + plotW + 6} y2={xAxisY} stroke="var(--text-muted)" strokeWidth="1.25" />
              <line x1={yAxisX} y1={pad.t + plotH} x2={yAxisX} y2={pad.t - 6} stroke="var(--text-muted)" strokeWidth="1.25" />

              {/* Ticks */}
              <g fontSize="10" fontFamily="var(--font-mono)" fill="var(--text-muted)">
                {xTicks.map((t) => (
                  <text key={`tx-${t}`} x={sx(t)} y={pad.t + plotH + 16} textAnchor="middle">
                    {t}
                  </text>
                ))}
                {yTicks.map((t) => (
                  <text key={`ty-${t}`} x={pad.l - 8} y={sy(t) + 3.5} textAnchor="end">
                    {t}
                  </text>
                ))}
              </g>

              {computed && (
                <g clipPath="url(#mathlab-clip)">
                  {/* Shaded definite integral */}
                  {showIntegral && computed.intPath && (
                    <path d={computed.intPath} fill="#15803d" fillOpacity="0.18" stroke="#15803d" strokeWidth="1" strokeDasharray="3 3" />
                  )}

                  {/* Second derivative */}
                  {showDeriv2 && computed.d2Path && (
                    <path d={computed.d2Path} fill="none" stroke="#6d28d9" strokeWidth="1.6" strokeDasharray="3 3" opacity="0.85" />
                  )}

                  {/* First derivative */}
                  {showDeriv1 && computed.d1Path && (
                    <path d={computed.d1Path} fill="none" stroke="#b45309" strokeWidth="1.8" strokeDasharray="6 3" />
                  )}

                  {/* Main function f(x) */}
                  <path d={computed.fPath} fill="none" stroke="#2563eb" strokeWidth="2.8" />

                  {/* Tangent line at x0 */}
                  {showTangent && Number.isFinite(computed.y0) && Number.isFinite(computed.dy0) && (
                    <>
                      <line
                        x1={sx(xMin)}
                        y1={sy(computed.y0 + computed.dy0 * (xMin - x0))}
                        x2={sx(xMax)}
                        y2={sy(computed.y0 + computed.dy0 * (xMax - x0))}
                        stroke="#be123c"
                        strokeWidth="2"
                      />
                      <line x1={sx(x0)} y1={xAxisY} x2={sx(x0)} y2={sy(computed.y0)} stroke="#be123c" strokeDasharray="3 3" strokeWidth="1.1" />
                      <circle cx={sx(x0)} cy={sy(computed.y0)} r="5" fill="#be123c" stroke="var(--bg-elevated)" strokeWidth="1.5" />
                    </>
                  )}
                </g>
              )}
            </svg>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 text-xs font-mono text-[var(--text-secondary)]">
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-0.5 bg-[#2563eb] inline-block" /> f(x)
            </span>
            {showDeriv1 && (
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 border-t-2 border-dashed border-[#b45309] inline-block" /> f′(x)
              </span>
            )}
            {showDeriv2 && (
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 border-t-2 border-dotted border-[#6d28d9] inline-block" /> f″(x)
              </span>
            )}
            {showTangent && (
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 bg-[#be123c] inline-block" /> Styczna w x₀
              </span>
            )}
            {showIntegral && (
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-[#15803d]/25 border border-[#15803d] inline-block" /> ∫ₐᵇ f(x)dx
              </span>
            )}
          </div>
        </div>

        {/* Right panel: layers, tangent slider, integral bounds, live numerical table */}
        <div className="lg:col-span-4 space-y-4">
          {/* Layer toggles */}
          <div className="card p-4 space-y-2.5">
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">Warstwy wykresu</div>
            {[
              { label: 'Pierwsza pochodna f′(x)', val: showDeriv1, set: setShowDeriv1, color: '#b45309' },
              { label: 'Druga pochodna f″(x)', val: showDeriv2, set: setShowDeriv2, color: '#6d28d9' },
              { label: 'Styczna w punkcie x₀', val: showTangent, set: setShowTangent, color: '#be123c' },
              { label: 'Całka oznaczona na [a, b]', val: showIntegral, set: setShowIntegral, color: '#15803d' },
            ].map((it) => (
              <label key={it.label} className="flex items-center justify-between text-sm cursor-pointer">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: it.color }} />
                  {it.label}
                </span>
                <input
                  type="checkbox"
                  checked={it.val}
                  onChange={(e) => it.set(e.target.checked)}
                  className="accent-[var(--accent)] w-4 h-4"
                />
              </label>
            ))}
          </div>

          {/* Tangent point readout */}
          <div className="card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">Punkt stycznej x₀</span>
              <span className="font-mono text-sm font-bold text-[#be123c]">x₀ = {x0.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={xMin}
              max={xMax}
              step="0.05"
              value={x0}
              onChange={(e) => setX0(Number(e.target.value))}
              className="w-full accent-[var(--accent)]"
            />
            {computed && (
              <div className="grid grid-cols-3 gap-2 text-xs font-mono pt-1">
                <div className="p-2 rounded bg-[var(--bg)] border border-[var(--border)]">
                  <div className="text-[var(--text-muted)]">f(x₀)</div>
                  <div className="font-semibold">{fmtNum(computed.y0)}</div>
                </div>
                <div className="p-2 rounded bg-[var(--bg)] border border-[var(--border)]">
                  <div className="text-[var(--text-muted)]">f′(x₀)</div>
                  <div className="font-semibold text-[#b45309]">{fmtNum(computed.dy0)}</div>
                </div>
                <div className="p-2 rounded bg-[var(--bg)] border border-[var(--border)]">
                  <div className="text-[var(--text-muted)]">f″(x₀)</div>
                  <div className="font-semibold text-[#6d28d9]">{fmtNum(computed.d2y0)}</div>
                </div>
              </div>
            )}
            {computed && Number.isFinite(computed.y0) && Number.isFinite(computed.dy0) && (
              <div className="text-xs font-mono p-2.5 rounded bg-[var(--bg-subtle)] border border-[var(--border)]">
                <span className="text-[var(--text-muted)]">Styczna: </span>
                <strong>
                  y = {computed.dy0.toFixed(2)}x {computed.y0 - computed.dy0 * x0 >= 0 ? '+' : '−'}{' '}
                  {Math.abs(computed.y0 - computed.dy0 * x0).toFixed(2)}
                </strong>
              </div>
            )}
          </div>

          {/* Integral controls & readout */}
          <div className="card p-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
              Całka oznaczona (metoda Simpsona)
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <label className="space-y-1">
                <span className="text-[var(--text-muted)]">Dolna granica a</span>
                <input
                  type="number"
                  step="0.25"
                  value={intA}
                  onChange={(e) => setIntA(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded border border-[var(--border)] bg-[var(--bg)]"
                />
              </label>
              <label className="space-y-1">
                <span className="text-[var(--text-muted)]">Górna granica b</span>
                <input
                  type="number"
                  step="0.25"
                  value={intB}
                  onChange={(e) => setIntB(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded border border-[var(--border)] bg-[var(--bg)]"
                />
              </label>
            </div>
            {computed?.integral && (
              <div className="space-y-1.5 text-xs font-mono pt-1">
                <div className="flex justify-between p-2 rounded bg-[var(--bg)] border border-[var(--border)]">
                  <span className="text-[var(--text-muted)]">∫ₐᵇ f(x) dx (ze znakiem):</span>
                  <strong className="text-[#15803d]">
                    {computed.integral.valid ? fmtNum(computed.integral.signed) : 'biegun / rozbieżna!'}
                  </strong>
                </div>
                <div className="flex justify-between p-2 rounded bg-[var(--bg)] border border-[var(--border)]">
                  <span className="text-[var(--text-muted)]">∫ₐᵇ |f(x)| dx (pole geom.):</span>
                  <strong>{computed.integral.valid ? fmtNum(computed.integral.area) : '—'}</strong>
                </div>
              </div>
            )}
          </div>

          {/* Axis window */}
          <div className="card p-4 space-y-2.5">
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">Zakres osi</div>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <label>
                x min
                <input type="number" value={xMin} onChange={(e) => setXMin(Number(e.target.value))} className="mt-0.5 w-full px-2 py-1 rounded border border-[var(--border)] bg-[var(--bg)]" />
              </label>
              <label>
                x max
                <input type="number" value={xMax} onChange={(e) => setXMax(Number(e.target.value))} className="mt-0.5 w-full px-2 py-1 rounded border border-[var(--border)] bg-[var(--bg)]" />
              </label>
              <label>
                y min
                <input type="number" value={yMin} onChange={(e) => setYMin(Number(e.target.value))} className="mt-0.5 w-full px-2 py-1 rounded border border-[var(--border)] bg-[var(--bg)]" />
              </label>
              <label>
                y max
                <input type="number" value={yMax} onChange={(e) => setYMax(Number(e.target.value))} className="mt-0.5 w-full px-2 py-1 rounded border border-[var(--border)] bg-[var(--bg)]" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
