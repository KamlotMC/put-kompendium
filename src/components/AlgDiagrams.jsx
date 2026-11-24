import React, { useState } from 'react';

const NAVY = '#1d3557';
const CRIMSON = '#9b2226';
const FOREST = '#2d6a4f';
const AMBER = '#b45309';

function fmt(v, d = 2) {
  if (!Number.isFinite(v)) return '—';
  const r = Math.abs(v) < 1e-9 ? 0 : v;
  return Number.isInteger(r) ? String(r) : r.toFixed(d);
}

// 1. Complex plane: z = x + jy, conjugate, modulus, and geometric sets
function AlgComplexPlaneDiagram() {
  const [mode, setMode] = useState('vector'); // 'vector' | 'sets'
  const [x, setX] = useState(2);
  const [y, setY] = useState(-1);

  const W = 520;
  const H = 290;
  const cx = W / 2;
  const cy = H / 2;
  const scale = 34; // px per unit

  const toX = (u) => cx + u * scale;
  const toY = (v) => cy - v * scale;

  const r = Math.hypot(x, y);
  const phi = Math.atan2(y, x);
  const phiDeg = (phi * 180) / Math.PI;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setMode('vector')}
            className={`px-2.5 py-1 rounded text-xs font-medium border cursor-pointer ${
              mode === 'vector'
                ? 'bg-[var(--accent)] text-white dark:text-[#0f141c] border-[var(--accent)]'
                : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border)]'
            }`}
          >
            Wektor z, sprzężenie z̄ i moduł |z|
          </button>
          <button
            type="button"
            onClick={() => setMode('sets')}
            className={`px-2.5 py-1 rounded text-xs font-medium border cursor-pointer ${
              mode === 'sets'
                ? 'bg-[var(--accent)] text-white dark:text-[#0f141c] border-[var(--accent)]'
                : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border)]'
            }`}
          >
            Zbiory z Wykładu 01: |z| ≤ 2 i |z + 2j| = 2
          </button>
        </div>
        {mode === 'vector' && (
          <div className="flex flex-wrap gap-3 text-xs font-mono">
            <label className="flex items-center gap-1.5">
              Re z = {fmt(x, 1)}
              <input
                type="range"
                min="-4"
                max="4"
                step="0.5"
                value={x}
                onChange={(e) => setX(Number(e.target.value))}
                className="w-20 accent-[var(--accent)]"
              />
            </label>
            <label className="flex items-center gap-1.5">
              Im z = {fmt(y, 1)}
              <input
                type="range"
                min="-3.5"
                max="3.5"
                step="0.5"
                value={y}
                onChange={(e) => setY(Number(e.target.value))}
                className="w-20 accent-[var(--crimson)]"
              />
            </label>
          </div>
        )}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[560px] mx-auto block rounded border border-[var(--border)] bg-[var(--bg)]">
        {/* Grid */}
        {[-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6].map((gx) => (
          <line key={`gx-${gx}`} x1={toX(gx)} y1={10} x2={toX(gx)} y2={H - 10} stroke="var(--border)" strokeWidth="0.7" />
        ))}
        {[-3, -2, -1, 1, 2, 3].map((gy) => (
          <line key={`gy-${gy}`} x1={10} y1={toY(gy)} x2={W - 10} y2={toY(gy)} stroke="var(--border)" strokeWidth="0.7" />
        ))}

        {/* Axes */}
        <line x1={16} y1={cy} x2={W - 14} y2={cy} stroke="var(--text-muted)" strokeWidth="1.2" />
        <line x1={cx} y1={H - 14} x2={cx} y2={14} stroke="var(--text-muted)" strokeWidth="1.2" />
        <text x={W - 36} y={cy - 6} fontSize="11" fontFamily="monospace" fill="var(--text-muted)">Re z</text>
        <text x={cx + 8} y={24} fontSize="11" fontFamily="monospace" fill="var(--text-muted)">Im z</text>

        {[-4, -2, 2, 4].map((t) => (
          <text key={`tx-${t}`} x={toX(t) - 6} y={cy + 14} fontSize="10" fontFamily="monospace" fill="var(--text-muted)">{t}</text>
        ))}
        {[-3, -2, -1, 1, 2, 3].map((t) => (
          <text key={`ty-${t}`} x={cx + 6} y={toY(t) + 3} fontSize="10" fontFamily="monospace" fill="var(--text-muted)">{t}j</text>
        ))}

        {mode === 'vector' ? (
          <>
            {/* Circle of radius |z| */}
            {r > 0.05 && (
              <circle cx={cx} cy={cy} r={r * scale} fill="none" stroke="var(--border-strong)" strokeDasharray="4 4" strokeWidth="1" />
            )}
            {/* Reflection link z <-> zbar */}
            <line x1={toX(x)} y1={toY(y)} x2={toX(x)} y2={toY(-y)} stroke={AMBER} strokeDasharray="3 3" strokeWidth="1.3" />
            {/* Projections */}
            <line x1={toX(x)} y1={toY(y)} x2={cx} y2={toY(y)} stroke="var(--text-muted)" strokeDasharray="2 3" strokeWidth="0.9" />
            {/* Vector z */}
            <line x1={cx} y1={cy} x2={toX(x)} y2={toY(y)} stroke={NAVY} strokeWidth="2.4" />
            <circle cx={toX(x)} cy={toY(y)} r="5" fill={NAVY} />
            <text x={toX(x) + 8} y={toY(y) - 6} fontSize="11.5" fontWeight="700" fontFamily="monospace" fill={NAVY}>
              z = {fmt(x, 1)} {y >= 0 ? '+' : '−'} {fmt(Math.abs(y), 1)}j
            </text>
            {/* Vector conjugate z_bar */}
            <line x1={cx} y1={cy} x2={toX(x)} y2={toY(-y)} stroke={CRIMSON} strokeWidth="2" strokeDasharray="5 3" />
            <circle cx={toX(x)} cy={toY(-y)} r="4.5" fill={CRIMSON} />
            <text x={toX(x) + 8} y={toY(-y) + 14} fontSize="11" fontWeight="600" fontFamily="monospace" fill={CRIMSON}>
              z̄ = {fmt(x, 1)} {-y >= 0 ? '+' : '−'} {fmt(Math.abs(y), 1)}j
            </text>
          </>
        ) : (
          <>
            {/* |z| <= 2 disk */}
            <circle cx={cx} cy={cy} r={2 * scale} fill={NAVY} fillOpacity="0.14" stroke={NAVY} strokeWidth="2" />
            <text x={toX(1.3)} y={toY(2.25)} fontSize="11" fontWeight="700" fontFamily="monospace" fill={NAVY}>
              |z| ≤ 2 (koło, środek 0, R=2)
            </text>
            {/* |z + 2j| = 2 circle centered at (0, -2) */}
            <circle cx={toX(0)} cy={toY(-2)} r={2 * scale} fill="none" stroke={CRIMSON} strokeWidth="2.2" />
            <circle cx={toX(0)} cy={toY(-2)} r="4" fill={CRIMSON} />
            <text x={toX(2.15)} y={toY(-2.05)} fontSize="11" fontWeight="700" fontFamily="monospace" fill={CRIMSON}>
              |z + 2j| = 2
            </text>
            <text x={toX(2.15)} y={toY(-2.55)} fontSize="10" fontFamily="monospace" fill={CRIMSON}>
              środek z₀ = −2j, R = 2
            </text>
          </>
        )}
      </svg>

      {mode === 'vector' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
          <div className="card-subtle px-3 py-2">
            <div className="text-[10px] text-[var(--text-muted)]">Moduł |z| = |z̄|</div>
            <div className="font-bold text-[var(--text)]">{fmt(r, 3)}</div>
          </div>
          <div className="card-subtle px-3 py-2">
            <div className="text-[10px] text-[var(--text-muted)]">|z|² = z · z̄</div>
            <div className="font-bold text-[var(--text)]">{fmt(x * x + y * y, 2)}</div>
          </div>
          <div className="card-subtle px-3 py-2">
            <div className="text-[10px] text-[var(--text-muted)]">arg z ∈ (−π, π]</div>
            <div className="font-bold text-[var(--text)]">{fmt(phi, 3)} rad ({fmt(phiDeg, 1)}°)</div>
          </div>
          <div className="card-subtle px-3 py-2">
            <div className="text-[10px] text-[var(--text-muted)]">Odbicie Re z</div>
            <div className="font-bold text-[var(--crimson)]">Im(z̄) = −Im(z)</div>
          </div>
        </div>
      )}
    </div>
  );
}

// 2. Interactive nth roots of a complex number
function AlgComplexRootsDiagram() {
  const presets = [
    { label: '∛(8j) [W01 sl. 29]', r: 8, deg: 90, n: 3 },
    { label: '∛1 [W01 sl. 30]', r: 1, deg: 0, n: 3 },
    { label: '⁴√1 [W01 sl. 30]', r: 1, deg: 0, n: 4 },
    { label: '⁴√(−16)', r: 16, deg: 180, n: 4 },
    { label: '⁵√(32)', r: 32, deg: 0, n: 5 },
  ];
  const [n, setN] = useState(3);
  const [r, setR] = useState(8);
  const [deg, setDeg] = useState(90);

  const rho = Math.pow(r, 1 / n);
  const phiRad = (deg * Math.PI) / 180;
  const roots = Array.from({ length: n }, (_, k) => {
    const ang = (phiRad + 2 * Math.PI * k) / n;
    return {
      k,
      ang,
      angDeg: ((ang * 180) / Math.PI) % 360,
      re: rho * Math.cos(ang),
      im: rho * Math.sin(ang),
    };
  });

  const W = 500;
  const H = 280;
  const cx = 155;
  const cy = 140;
  const radPx = 98;

  const polyPoints = roots.map((pt) => `${cx + (pt.re / Math.max(rho, 1e-6)) * radPx},${cy - (pt.im / Math.max(rho, 1e-6)) * radPx}`).join(' ');

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {presets.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => {
              setR(p.r);
              setDeg(p.deg);
              setN(p.n);
            }}
            className="px-2.5 py-1 rounded text-xs font-mono border border-[var(--border)] bg-[var(--bg-elevated)] hover:border-[var(--accent)] cursor-pointer text-[var(--text-secondary)]"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 text-xs font-mono items-center">
        <label className="flex items-center gap-1.5">
          Stopień n = {n}
          <input type="range" min="2" max="8" step="1" value={n} onChange={(e) => setN(Number(e.target.value))} className="w-20 accent-[var(--accent)]" />
        </label>
        <label className="flex items-center gap-1.5">
          |z| = r = {r}
          <input type="range" min="1" max="32" step="1" value={r} onChange={(e) => setR(Number(e.target.value))} className="w-20 accent-[var(--accent)]" />
        </label>
        <label className="flex items-center gap-1.5">
          φ = {deg}°
          <input type="range" min="-180" max="180" step="15" value={deg} onChange={(e) => setDeg(Number(e.target.value))} className="w-24 accent-[var(--crimson)]" />
        </label>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[540px] mx-auto block rounded border border-[var(--border)] bg-[var(--bg)]">
        {/* Axes */}
        <line x1={30} y1={cy} x2={280} y2={cy} stroke="var(--text-muted)" strokeWidth="1" />
        <line x1={cx} y1={H - 18} x2={cx} y2={18} stroke="var(--text-muted)" strokeWidth="1" />
        <text x={262} y={cy - 6} fontSize="10" fontFamily="monospace" fill="var(--text-muted)">Re</text>
        <text x={cx + 6} y={28} fontSize="10" fontFamily="monospace" fill="var(--text-muted)">Im</text>

        {/* Root circle of radius n-th root of r */}
        <circle cx={cx} cy={cy} r={radPx} fill="none" stroke="var(--border-strong)" strokeDasharray="4 4" strokeWidth="1.2" />
        {n >= 3 && (
          <polygon points={polyPoints} fill={NAVY} fillOpacity="0.1" stroke={AMBER} strokeWidth="1.6" strokeDasharray="5 3" />
        )}
        {n === 2 && (
          <line
            x1={cx + (roots[0].re / rho) * radPx}
            y1={cy - (roots[0].im / rho) * radPx}
            x2={cx + (roots[1].re / rho) * radPx}
            y2={cy - (roots[1].im / rho) * radPx}
            stroke={AMBER}
            strokeWidth="1.6"
            strokeDasharray="5 3"
          />
        )}

        {roots.map((pt) => {
          const px = cx + (pt.re / Math.max(rho, 1e-6)) * radPx;
          const py = cy - (pt.im / Math.max(rho, 1e-6)) * radPx;
          return (
            <g key={pt.k}>
              <line x1={cx} y1={cy} x2={px} y2={py} stroke={pt.k === 0 ? CRIMSON : NAVY} strokeWidth={pt.k === 0 ? 2 : 1.3} opacity="0.8" />
              <circle cx={px} cy={py} r={pt.k === 0 ? 5.5 : 4.5} fill={pt.k === 0 ? CRIMSON : NAVY} />
              <text x={px + (pt.re >= 0 ? 8 : -24)} y={py + (pt.im >= 0 ? -7 : 14)} fontSize="10.5" fontWeight="700" fontFamily="monospace" fill={pt.k === 0 ? CRIMSON : NAVY}>
                t{pt.k}
              </text>
            </g>
          );
        })}

        {/* Right info list */}
        <text x={300} y={32} fontSize="11" fontWeight="700" fontFamily="monospace" fill="var(--text)">
          Promień: ⁿ√r = {fmt(rho, 3)}
        </text>
        <text x={300} y={48} fontSize="10" fontFamily="monospace" fill="var(--text-muted)">
          Krok kątowy: 360°/{n} = {fmt(360 / n, 1)}°
        </text>
        {roots.map((pt, idx) => (
          <text key={`lbl-${pt.k}`} x={300} y={72 + idx * 23} fontSize="10.5" fontFamily="monospace" fill={idx === 0 ? CRIMSON : 'var(--text-secondary)'}>
            t{pt.k} = {fmt(pt.re, 2)} {pt.im >= 0 ? '+' : '−'} {fmt(Math.abs(pt.im), 2)}j ({fmt(pt.angDeg, 0)}°)
          </text>
        ))}
      </svg>
    </div>
  );
}

// 3. Interactive Matrix Multiplication A*B vs B*A (Lecture 02, sl. 11)
function AlgMatrixMultDiagram() {
  const A = [
    [1, 2, 3],
    [2, 1, -1],
  ];
  const B = [
    [1, 2],
    [-2, 4],
    [1, 2],
  ];
  const [order, setOrder] = useState('AB'); // 'AB' | 'BA'
  const [sel, setSel] = useState([0, 0]);

  const left = order === 'AB' ? A : B;
  const right = order === 'AB' ? B : A;
  const m = left.length;
  const p = right.length;
  const n = right[0].length;

  const C = Array.from({ length: m }, (_, i) =>
    Array.from({ length: n }, (_, j) => {
      let sum = 0;
      for (let k = 0; k < p; k++) sum += left[i][k] * right[k][j];
      return sum;
    })
  );

  const rIdx = Math.min(sel[0], m - 1);
  const cIdx = Math.min(sel[1], n - 1);
  const terms = Array.from({ length: p }, (_, k) => `(${left[rIdx][k]})·(${right[k][cIdx]})`);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => {
              setOrder('AB');
              setSel([0, 0]);
            }}
            className={`px-2.5 py-1 rounded text-xs font-mono border cursor-pointer ${
              order === 'AB'
                ? 'bg-[var(--accent)] text-white dark:text-[#0f141c] border-[var(--accent)]'
                : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border)]'
            }`}
          >
            A · B (2×3 · 3×2 → 2×2)
          </button>
          <button
            type="button"
            onClick={() => {
              setOrder('BA');
              setSel([0, 0]);
            }}
            className={`px-2.5 py-1 rounded text-xs font-mono border cursor-pointer ${
              order === 'BA'
                ? 'bg-[var(--accent)] text-white dark:text-[#0f141c] border-[var(--accent)]'
                : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border)]'
            }`}
          >
            B · A (3×2 · 2×3 → 3×3)
          </button>
        </div>
        <span className="text-[11px] font-mono text-[var(--text-muted)]">Kliknij komórkę wyniku, aby podświetlić składniki</span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 p-3 rounded border border-[var(--border)] bg-[var(--bg)] font-mono text-xs">
        {/* Left matrix */}
        <div className="text-center">
          <div className="text-[10px] text-[var(--text-muted)] mb-1">{order === 'AB' ? 'A (2×3)' : 'B (3×2)'}</div>
          <div className="inline-grid gap-1 p-2 rounded border-x-2 border-[var(--text-muted)]" style={{ gridTemplateColumns: `repeat(${p}, minmax(28px, 1fr))` }}>
            {left.map((row, i) =>
              row.map((val, k) => (
                <span
                  key={`L-${i}-${k}`}
                  className={`px-1.5 py-1 rounded text-center ${
                    i === rIdx ? 'bg-[var(--accent)] text-white dark:text-[#0f141c] font-bold' : 'text-[var(--text-secondary)]'
                  }`}
                >
                  {val}
                </span>
              ))
            )}
          </div>
        </div>

        <span className="text-base font-bold text-[var(--text-muted)]">·</span>

        {/* Right matrix */}
        <div className="text-center">
          <div className="text-[10px] text-[var(--text-muted)] mb-1">{order === 'AB' ? 'B (3×2)' : 'A (2×3)'}</div>
          <div className="inline-grid gap-1 p-2 rounded border-x-2 border-[var(--text-muted)]" style={{ gridTemplateColumns: `repeat(${n}, minmax(28px, 1fr))` }}>
            {right.map((row, k) =>
              row.map((val, j) => (
                <span
                  key={`R-${k}-${j}`}
                  className={`px-1.5 py-1 rounded text-center ${
                    j === cIdx ? 'bg-[#9b2226] text-white font-bold' : 'text-[var(--text-secondary)]'
                  }`}
                >
                  {val}
                </span>
              ))
            )}
          </div>
        </div>

        <span className="text-base font-bold text-[var(--text-muted)]">=</span>

        {/* Result matrix */}
        <div className="text-center">
          <div className="text-[10px] text-[var(--text-muted)] mb-1">
            {order === 'AB' ? 'A·B (2×2)' : 'B·A (3×3)'}
          </div>
          <div className="inline-grid gap-1 p-2 rounded border-x-2 border-[var(--accent)]" style={{ gridTemplateColumns: `repeat(${n}, minmax(34px, 1fr))` }}>
            {C.map((row, i) =>
              row.map((val, j) => {
                const isAct = i === rIdx && j === cIdx;
                return (
                  <button
                    key={`C-${i}-${j}`}
                    type="button"
                    onClick={() => setSel([i, j])}
                    className={`px-1.5 py-1 rounded text-center cursor-pointer border ${
                      isAct
                        ? 'bg-[#2d6a4f] text-white border-[#2d6a4f] font-bold'
                        : 'bg-[var(--bg-elevated)] text-[var(--text)] border-[var(--border)] hover:border-[var(--accent)]'
                    }`}
                  >
                    {val}
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>

      <div className="card-subtle px-3.5 py-2.5 text-xs font-mono text-[var(--text-secondary)]">
        <strong className="text-[#2d6a4f]">c[{rIdx + 1},{cIdx + 1}]</strong> = wiersz {rIdx + 1} · kolumna {cIdx + 1} = {terms.join(' + ')} ={' '}
        <strong className="text-[var(--text)]">{C[rIdx][cIdx]}</strong>
        <span className="ml-3 text-[var(--text-muted)]">| A·B ≠ B·A (inne wymiary!)</span>
      </div>
    </div>
  );
}

// 4. Determinant 2x2 geometric area & orientation
function AlgDetGeometryDiagram() {
  const [a, setA] = useState(3);
  const [b, setB] = useState(1);
  const [c, setC] = useState(1);
  const [d, setD] = useState(2.5);

  const det = a * d - b * c;
  const W = 500;
  const H = 260;
  const cx = 190;
  const cy = 195;
  const sc = 34;

  const px = (u) => cx + u * sc;
  const py = (v) => cy - v * sc;

  const isZero = Math.abs(det) < 1e-6;
  const fill = isZero ? '#71717a' : det > 0 ? FOREST : CRIMSON;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3 text-xs font-mono items-center">
        <label className="flex items-center gap-1">
          u = ({fmt(a, 1)}, {fmt(b, 1)}):
          <input type="range" min="-2" max="4" step="0.5" value={a} onChange={(e) => setA(Number(e.target.value))} className="w-16 accent-[var(--accent)]" />
          <input type="range" min="-1" max="3.5" step="0.5" value={b} onChange={(e) => setB(Number(e.target.value))} className="w-16 accent-[var(--accent)]" />
        </label>
        <label className="flex items-center gap-1">
          v = ({fmt(c, 1)}, {fmt(d, 1)}):
          <input type="range" min="-2" max="4" step="0.5" value={c} onChange={(e) => setC(Number(e.target.value))} className="w-16 accent-[var(--crimson)]" />
          <input type="range" min="-1" max="3.5" step="0.5" value={d} onChange={(e) => setD(Number(e.target.value))} className="w-16 accent-[var(--crimson)]" />
        </label>
        <button
          type="button"
          onClick={() => {
            setA(2);
            setB(1);
            setC(4);
            setD(2);
          }}
          className="px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--bg-elevated)] cursor-pointer text-[11px]"
        >
          Ustaw det = 0 (osobliwa)
        </button>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[540px] mx-auto block rounded border border-[var(--border)] bg-[var(--bg)]">
        {/* Axes */}
        <line x1={20} y1={cy} x2={W - 20} y2={cy} stroke="var(--text-muted)" strokeWidth="1" />
        <line x1={cx} y1={H - 12} x2={cx} y2={14} stroke="var(--text-muted)" strokeWidth="1" />
        <text x={W - 32} y={cy - 6} fontSize="10" fontFamily="monospace" fill="var(--text-muted)">x</text>
        <text x={cx + 6} y={24} fontSize="10" fontFamily="monospace" fill="var(--text-muted)">y</text>

        {/* Parallelogram */}
        <polygon
          points={`${px(0)},${py(0)} ${px(a)},${py(b)} ${px(a + c)},${py(b + d)} ${px(c)},${py(d)}`}
          fill={fill}
          fillOpacity="0.2"
          stroke={fill}
          strokeWidth="1.5"
        />

        {/* Vector u */}
        <line x1={px(0)} y1={py(0)} x2={px(a)} y2={py(b)} stroke={NAVY} strokeWidth="2.4" />
        <circle cx={px(a)} cy={py(b)} r="4" fill={NAVY} />
        <text x={px(a) + 6} y={py(b) - 5} fontSize="11" fontWeight="700" fontFamily="monospace" fill={NAVY}>
          u=({fmt(a, 1)},{fmt(b, 1)})
        </text>

        {/* Vector v */}
        <line x1={px(0)} y1={py(0)} x2={px(c)} y2={py(d)} stroke={CRIMSON} strokeWidth="2.4" />
        <circle cx={px(c)} cy={py(d)} r="4" fill={CRIMSON} />
        <text x={px(c) + 6} y={py(d) - 5} fontSize="11" fontWeight="700" fontFamily="monospace" fill={CRIMSON}>
          v=({fmt(c, 1)},{fmt(d, 1)})
        </text>

        {/* Status box */}
        <rect x={315} y={16} width={172} height={82} rx={4} fill="var(--bg-elevated)" stroke="var(--border)" />
        <text x={325} y={36} fontSize="11" fontWeight="700" fontFamily="monospace" fill={fill}>
          det A = {fmt(det, 2)}
        </text>
        <text x={325} y={55} fontSize="10.5" fontFamily="monospace" fill="var(--text-secondary)">
          Pole |D| = |det A| = {fmt(Math.abs(det), 2)}
        </text>
        <text x={325} y={74} fontSize="10" fontFamily="monospace" fill="var(--text-muted)">
          {isZero ? 'Wektory współliniowe (osobliwa!)' : det > 0 ? 'Orientacja dodatnia (u→v CCW)' : 'Orientacja ujemna (odbita)'}
        </text>
      </svg>
    </div>
  );
}

// 5. Linear systems 2D/3D classification + method comparison
function AlgLinearSystemsDiagram() {
  const [kind, setKind] = useState('cramer'); // 'cramer' | 'infinite' | 'inconsistent'

  const W = 500;
  const H = 220;
  const cx = 135;
  const cy = 115;
  const sc = 26;
  const tx = (u) => cx + u * sc;
  const ty = (v) => cy - v * sc;

  const cases = {
    cramer: {
      title: 'Układ Cramera (oznaczony): det A ≠ 0',
      eq1: 'x + y = 3',
      eq2: 'x − y = 1',
      desc: 'W 2D: dwie proste przecinają się w jednym punkcie (2, 1). W 3D: trzy płaszczyzny przecinają się w jednym punkcie (np. (3, 6, 11) z Wykładu 03). Działają wzory Cramera, Gauss i X = A⁻¹B.',
      l1: [[-3, 6], [4, -1]],
      l2: [[-2, -3], [4, 3]],
      pt: [2, 1],
    },
    infinite: {
      title: 'Układ nieoznaczony (∞ rozwiązań): det A = 0',
      eq1: 'x + y = 2',
      eq2: '2x + 2y = 4 (w₂ = 2w₁)',
      desc: 'Równania są liniowo zależne — obie proste (lub płaszczyzny w 3D) pokrywają się lub tworzą wspólną prostą. Eliminacja daje wiersz [0 0 | 0] i parametr wolny. Właśnie tak wyznaczamy wektory własne!',
      l1: [[-2, 4], [4, -2]],
      l2: [[-2, 4], [4, -2]],
      pt: null,
    },
    inconsistent: {
      title: 'Układ sprzeczny (0 rozwiązań): det A = 0',
      eq1: 'x + y = 2',
      eq2: 'x + y = −1 (równoległe)',
      desc: 'Proste (lub płaszczyzny w 3D) są równoległe i rozłączne — brak punktów wspólnych. Eliminacja Gaussa daje sprzeczny wiersz [0 0 | c] przy c ≠ 0 (0 = c). Układ jednorodny AX = 0 NIGDY nie jest sprzeczny.',
      l1: [[-2, 4], [4, -2]],
      l2: [[-3, 2], [3, -4]],
      pt: null,
    },
  };

  const cur = cases[kind];

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {[
          { id: 'cramer', label: '1 rozwiązanie (Cramer)' },
          { id: 'infinite', label: '∞ rozwiązań (nieoznaczony)' },
          { id: 'inconsistent', label: '0 rozwiązań (sprzeczny)' },
        ].map((btn) => (
          <button
            key={btn.id}
            type="button"
            onClick={() => setKind(btn.id)}
            className={`px-2.5 py-1 rounded text-xs font-medium border cursor-pointer ${
              kind === btn.id
                ? 'bg-[var(--accent)] text-white dark:text-[#0f141c] border-[var(--accent)]'
                : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border)]'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        <svg viewBox={`0 0 270 ${H}`} className="sm:col-span-6 w-full rounded border border-[var(--border)] bg-[var(--bg)]">
          <line x1={12} y1={cy} x2={258} y2={cy} stroke="var(--text-muted)" strokeWidth="1" />
          <line x1={cx} y1={H - 12} x2={cx} y2={12} stroke="var(--text-muted)" strokeWidth="1" />
          <line
            x1={tx(cur.l1[0][0])}
            y1={ty(cur.l1[0][1])}
            x2={tx(cur.l1[1][0])}
            y2={ty(cur.l1[1][1])}
            stroke={NAVY}
            strokeWidth={kind === 'infinite' ? 4.5 : 2.3}
          />
          <line
            x1={tx(cur.l2[0][0])}
            y1={ty(cur.l2[0][1])}
            x2={tx(cur.l2[1][0])}
            y2={ty(cur.l2[1][1])}
            stroke={CRIMSON}
            strokeWidth="2.2"
            strokeDasharray={kind === 'infinite' ? '6 4' : undefined}
          />
          {cur.pt && (
            <>
              <circle cx={tx(cur.pt[0])} cy={ty(cur.pt[1])} r="5.5" fill={FOREST} />
              <text x={tx(cur.pt[0]) + 8} y={ty(cur.pt[1]) - 6} fontSize="11" fontWeight="700" fontFamily="monospace" fill={FOREST}>
                ({cur.pt[0]}, {cur.pt[1]})
              </text>
            </>
          )}
          <text x={14} y={22} fontSize="10" fontFamily="monospace" fill={NAVY}>L₁: {cur.eq1}</text>
          <text x={14} y={36} fontSize="10" fontFamily="monospace" fill={CRIMSON}>L₂: {cur.eq2}</text>
        </svg>

        <div className="sm:col-span-6 card-subtle p-3.5 space-y-2 text-xs">
          <div className="font-semibold text-[var(--text)]">{cur.title}</div>
          <p className="text-[var(--text-secondary)] leading-relaxed m-0">{cur.desc}</p>
        </div>
      </div>
    </div>
  );
}

// 6. Eigenvalues & eigenvectors linear transformation visualizer
function AlgEigenTransformDiagram() {
  const presets = [
    {
      id: 'lec4',
      label: 'Wykład 04: [[0,1],[2,1]] (λ=2, −1)',
      mat: [
        [0, 1],
        [2, 1],
      ],
      eigenLines: [
        { vx: 1, vy: 2, lam: 2, label: 'λ₁=2, X₁=(1,2)' },
        { vx: 1, vy: -1, lam: -1, label: 'λ₂=−1, X₂=(1,−1)' },
      ],
    },
    {
      id: 'rot90',
      label: 'Obrót 90°: [[0,−1],[1,0]] (brak λ ∈ ℝ)',
      mat: [
        [0, -1],
        [1, 0],
      ],
      eigenLines: [],
    },
    {
      id: 'diag',
      label: 'Skalowanie: [[2,0],[0,0.5]] (λ=2, 0.5)',
      mat: [
        [2, 0],
        [0, 0.5],
      ],
      eigenLines: [
        { vx: 1, vy: 0, lam: 2, label: 'λ₁=2, X₁=(1,0)' },
        { vx: 0, vy: 1, lam: 0.5, label: 'λ₂=0.5, X₂=(0,1)' },
      ],
    },
  ];

  const [presetId, setPresetId] = useState('lec4');
  const [deg, setDeg] = useState(63.4); // close to atan2(2,1) = 63.43°

  const p = presets.find((x) => x.id === presetId) || presets[0];
  const [[a, b], [c, d]] = p.mat;

  const rad = (deg * Math.PI) / 180;
  const vx = Math.cos(rad);
  const vy = Math.sin(rad);
  const ax = a * vx + b * vy;
  const ay = c * vx + d * vy;

  // Collinearity measure: cross product |v x Av|
  const cross = Math.abs(vx * ay - vy * ax);
  const isEigen = cross < 0.06;
  const approxLam = isEigen ? (vx * ax + vy * ay) : null;

  const W = 520;
  const H = 280;
  const cx = 190;
  const cy = 140;
  const sc = 52;
  const tx = (u) => cx + u * sc;
  const ty = (v) => cy - v * sc;

  // Transformed unit circle ellipse path
  const ellipsePts = Array.from({ length: 73 }, (_, i) => {
    const t = (i / 72) * 2 * Math.PI;
    const ux = Math.cos(t);
    const uy = Math.sin(t);
    return `${tx(a * ux + b * uy)},${ty(c * ux + d * uy)}`;
  }).join(' ');

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {presets.map((pr) => (
          <button
            key={pr.id}
            type="button"
            onClick={() => {
              setPresetId(pr.id);
              if (pr.id === 'lec4') setDeg(63.4);
              else if (pr.id === 'diag') setDeg(0);
              else setDeg(35);
            }}
            className={`px-2.5 py-1 rounded text-xs font-mono border cursor-pointer ${
              presetId === pr.id
                ? 'bg-[var(--accent)] text-white dark:text-[#0f141c] border-[var(--accent)]'
                : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border)]'
            }`}
          >
            {pr.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
        <label className="flex items-center gap-2">
          Kąt wektora X: {fmt(deg, 1)}°
          <input
            type="range"
            min="-180"
            max="180"
            step="0.5"
            value={deg}
            onChange={(e) => setDeg(Number(e.target.value))}
            className="w-48 accent-[var(--accent)]"
          />
        </label>
        {p.eigenLines.map((el, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setDeg(Number(((Math.atan2(el.vy, el.vx) * 180) / Math.PI).toFixed(1)))}
            className="px-2 py-0.5 rounded text-[11px] border border-[var(--border)] bg-[var(--bg-elevated)] cursor-pointer text-[var(--success)]"
          >
            Ustaw na {el.label}
          </button>
        ))}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[560px] mx-auto block rounded border border-[var(--border)] bg-[var(--bg)]">
        {/* Axes */}
        <line x1={20} y1={cy} x2={360} y2={cy} stroke="var(--text-muted)" strokeWidth="0.9" />
        <line x1={cx} y1={H - 12} x2={cx} y2={12} stroke="var(--text-muted)" strokeWidth="0.9" />

        {/* Eigenlines */}
        {p.eigenLines.map((el, idx) => {
          const norm = Math.hypot(el.vx, el.vy);
          const dx = (el.vx / norm) * 2.5;
          const dy = (el.vy / norm) * 2.5;
          return (
            <line
              key={`el-${idx}`}
              x1={tx(-dx)}
              y1={ty(-dy)}
              x2={tx(dx)}
              y2={ty(dy)}
              stroke={FOREST}
              strokeWidth="1.2"
              strokeDasharray="4 4"
              opacity="0.7"
            />
          );
        })}

        {/* Unit circle and its image A(S^1) */}
        <circle cx={cx} cy={cy} r={sc} fill="none" stroke="var(--border-strong)" strokeWidth="1.1" strokeDasharray="3 3" />
        <polyline points={ellipsePts} fill="none" stroke={AMBER} strokeWidth="1.3" opacity="0.7" />

        {/* Input vector X */}
        <line x1={cx} y1={cy} x2={tx(vx)} y2={ty(vy)} stroke={NAVY} strokeWidth="2.6" />
        <circle cx={tx(vx)} cy={ty(vy)} r="4.5" fill={NAVY} />

        {/* Transformed vector A*X */}
        <line x1={cx} y1={cy} x2={tx(ax)} y2={ty(ay)} stroke={isEigen ? FOREST : CRIMSON} strokeWidth="2.6" />
        <circle cx={tx(ax)} cy={ty(ay)} r="5" fill={isEigen ? FOREST : CRIMSON} />

        {/* Side panel */}
        <rect x={368} y={16} width={140} height={248} rx={4} fill="var(--bg-elevated)" stroke="var(--border)" />
        <text x={378} y={36} fontSize="11" fontWeight="700" fontFamily="monospace" fill="var(--text)">
          A = [{a}, {b}; {c}, {d}]
        </text>
        <text x={378} y={58} fontSize="10.5" fontFamily="monospace" fill={NAVY}>
          X  = ({fmt(vx, 2)}, {fmt(vy, 2)})
        </text>
        <text x={378} y={76} fontSize="10.5" fontFamily="monospace" fill={isEigen ? FOREST : CRIMSON}>
          AX = ({fmt(ax, 2)}, {fmt(ay, 2)})
        </text>
        <text x={378} y={102} fontSize="10.5" fontWeight="700" fontFamily="monospace" fill={isEigen ? FOREST : CRIMSON}>
          {isEigen ? 'KIERUNEK WŁASNY!' : 'Kierunek zmieniony'}
        </text>
        {isEigen ? (
          <text x={378} y={120} fontSize="10.5" fontFamily="monospace" fill={FOREST}>
            AX ≈ {fmt(approxLam, 2)} · X
          </text>
        ) : (
          <text x={378} y={120} fontSize="10" fontFamily="monospace" fill="var(--text-muted)">
            AX ≠ λ·X
          </text>
        )}
        <text x={378} y={152} fontSize="9.5" fontFamily="monospace" fill="var(--text-muted)">
          Szary okrąg: |X|=1
        </text>
        <text x={378} y={168} fontSize="9.5" fontFamily="monospace" fill={AMBER}>
          Elipsa: obraz A(S¹)
        </text>
        <text x={378} y={184} fontSize="9.5" fontFamily="monospace" fill={FOREST}>
          Przerywane: proste
        </text>
        <text x={378} y={198} fontSize="9.5" fontFamily="monospace" fill={FOREST}>
          własne (jeśli λ∈ℝ)
        </text>
        {p.eigenLines.length === 0 && (
          <text x={378} y={228} fontSize="10" fontWeight="700" fontFamily="monospace" fill={CRIMSON}>
            λ = ±j ∈ ℂ (obrót!)
          </text>
        )}
      </svg>
    </div>
  );
}

export const ALG_DIAGRAM_REGISTRY = {
  'alg-complex-plane': { Component: AlgComplexPlaneDiagram },
  'alg-complex-roots': { Component: AlgComplexRootsDiagram },
  'alg-matrix-mult': { Component: AlgMatrixMultDiagram },
  'alg-det-geometry': { Component: AlgDetGeometryDiagram },
  'alg-linear-systems': { Component: AlgLinearSystemsDiagram },
  'alg-eigen-transform': { Component: AlgEigenTransformDiagram },
};
