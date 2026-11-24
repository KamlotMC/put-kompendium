import React, { useState, useMemo } from 'react';

// Academic editorial ink palette (works cleanly in light paper & dark slate modes)
const INK = {
  primary: '#2563eb',     // main curve (crisp cobalt / royal blue readable in both modes)
  navy: '#1d4ed8',        // deep blue
  crimson: '#be123c',     // secondary / tangent / error / pole
  forest: '#15803d',      // green / positive / integral
  ochre: '#b45309',       // amber / secant / highlight
  violet: '#6d28d9',      // auxiliary curve
  muted: '#64748b',       // dashed guide / asymptote
};

// Coordinate transform helper
function makeCoords(width, height, xMin, xMax, yMin, yMax, pad = { l: 42, r: 22, t: 20, b: 34 }) {
  const plotW = width - pad.l - pad.r;
  const plotH = height - pad.t - pad.b;
  const sx = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * plotW;
  const sy = (y) => pad.t + ((yMax - y) / (yMax - yMin)) * plotH;
  return { sx, sy, plotW, plotH, pad, xMin, xMax, yMin, yMax };
}

// Sample a function into SVG path segments, breaking cleanly on discontinuities / out-of-range jumps
function samplePath(fn, xMin, xMax, sx, sy, yMin, yMax, steps = 320, jumpThreshold = 3.5) {
  const segments = [];
  let current = [];
  let prevY = null;
  const ySpan = yMax - yMin;

  for (let i = 0; i <= steps; i++) {
    const x = xMin + (i / steps) * (xMax - xMin);
    const y = fn(x);
    const ok = Number.isFinite(y) && y >= yMin - ySpan * 0.45 && y <= yMax + ySpan * 0.45;
    if (!ok) {
      if (current.length > 1) segments.push(current);
      current = [];
      prevY = null;
      continue;
    }
    if (prevY !== null && Math.abs(y - prevY) > ySpan * 0.55 && Math.abs(y - prevY) > jumpThreshold) {
      if (current.length > 1) segments.push(current);
      current = [];
    }
    current.push(`${current.length === 0 ? 'M' : 'L'}${sx(x).toFixed(2)},${sy(y).toFixed(2)}`);
    prevY = y;
  }
  if (current.length > 1) segments.push(current);
  return segments.map((seg) => seg.join(' ')).join(' ');
}

function areaBetweenPath(fTop, fBot, a, b, sx, sy, steps = 120) {
  const topPts = [];
  const botPts = [];
  for (let i = 0; i <= steps; i++) {
    const x = a + (i / steps) * (b - a);
    const yt = fTop(x);
    const yb = fBot(x);
    if (Number.isFinite(yt) && Number.isFinite(yb)) {
      topPts.push([sx(x), sy(yt)]);
      botPts.push([sx(x), sy(yb)]);
    }
  }
  if (topPts.length < 2) return '';
  const fwd = topPts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(' ');
  const rev = botPts
    .reverse()
    .map((p) => `L${p[0].toFixed(2)},${p[1].toFixed(2)}`)
    .join(' ');
  return `${fwd} ${rev} Z`;
}

function Axes({ coords, xTicks = [], yTicks = [], xLabel = 'x', yLabel = 'y', xTickFormat, yTickFormat, clipId }) {
  const { sx, sy, xMin, xMax, yMin, yMax, pad, plotW, plotH } = coords;
  const xAxisY = yMin <= 0 && yMax >= 0 ? sy(0) : sy(yMin);
  const yAxisX = xMin <= 0 && xMax >= 0 ? sx(0) : sx(xMin);

  return (
    <g>
      {/* Subtle grid */}
      <g stroke="var(--border)" strokeWidth="0.75" opacity="0.6">
        {xTicks.map((t) => (
          <line key={`gx-${t}`} x1={sx(t)} y1={pad.t} x2={sx(t)} y2={pad.t + plotH} />
        ))}
        {yTicks.map((t) => (
          <line key={`gy-${t}`} x1={pad.l} y1={sy(t)} x2={pad.l + plotW} y2={sy(t)} />
        ))}
      </g>

      {/* Plot border frame */}
      <rect
        x={pad.l}
        y={pad.t}
        width={plotW}
        height={plotH}
        fill="none"
        stroke="var(--border)"
        strokeWidth="1"
      />

      {/* Main axes */}
      <line x1={pad.l} y1={xAxisY} x2={pad.l + plotW + 6} y2={xAxisY} stroke="var(--text-muted)" strokeWidth="1.25" />
      <polygon
        points={`${pad.l + plotW + 9},${xAxisY} ${pad.l + plotW + 2},${xAxisY - 3.5} ${pad.l + plotW + 2},${xAxisY + 3.5}`}
        fill="var(--text-muted)"
      />
      <text x={pad.l + plotW + 10} y={xAxisY + 13} fontSize="11" fontStyle="italic" fill="var(--text-muted)">
        {xLabel}
      </text>

      <line x1={yAxisX} y1={pad.t + plotH} x2={yAxisX} y2={pad.t - 6} stroke="var(--text-muted)" strokeWidth="1.25" />
      <polygon
        points={`${yAxisX},${pad.t - 9} ${yAxisX - 3.5},${pad.t - 2} ${yAxisX + 3.5},${pad.t - 2}`}
        fill="var(--text-muted)"
      />
      <text x={yAxisX + 8} y={pad.t - 4} fontSize="11" fontStyle="italic" fill="var(--text-muted)">
        {yLabel}
      </text>

      {/* Tick labels */}
      <g fontSize="10" fontFamily="var(--font-mono)" fill="var(--text-muted)">
        {xTicks.map((t) => {
          if (Math.abs(t) < 1e-9 && xMin < 0 && xMax > 0 && yMin < 0 && yMax > 0) return null;
          const lbl = xTickFormat ? xTickFormat(t) : String(Number(t.toFixed(2)));
          return (
            <g key={`tx-${t}`}>
              <line x1={sx(t)} y1={xAxisY - 3} x2={sx(t)} y2={xAxisY + 3} stroke="var(--text-muted)" strokeWidth="1" />
              <text x={sx(t)} y={pad.t + plotH + 15} textAnchor="middle">
                {lbl}
              </text>
            </g>
          );
        })}
        {yTicks.map((t) => {
          if (Math.abs(t) < 1e-9 && xMin < 0 && xMax > 0 && yMin < 0 && yMax > 0) return null;
          const lbl = yTickFormat ? yTickFormat(t) : String(Number(t.toFixed(2)));
          return (
            <g key={`ty-${t}`}>
              <line x1={yAxisX - 3} y1={sy(t)} x2={yAxisX + 3} y2={sy(t)} stroke="var(--text-muted)" strokeWidth="1" />
              <text x={pad.l - 7} y={sy(t) + 3.5} textAnchor="end">
                {lbl}
              </text>
            </g>
          );
        })}
        {xMin < 0 && xMax > 0 && yMin < 0 && yMax > 0 && (
          <text x={yAxisX - 6} y={xAxisY + 12} textAnchor="end" fontSize="9.5">
            0
          </text>
        )}
      </g>

      {clipId && (
        <defs>
          <clipPath id={clipId}>
            <rect x={pad.l} y={pad.t} width={plotW} height={plotH} />
          </clipPath>
        </defs>
      )}
    </g>
  );
}

function TabRow({ items, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-1.5 mb-3">
      {items.map((it) => (
        <button
          key={it.id}
          type="button"
          onClick={() => onChange(it.id)}
          className={`px-2.5 py-1 text-xs font-medium rounded border transition-colors cursor-pointer ${
            active === it.id
              ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
              : 'bg-[var(--bg)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--text-muted)]'
          }`}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

// ============================================================================
// 1. Cartesian Product (Ch 1, Przykład 1)
// ============================================================================
function CartesianProductDiagram() {
  const [mode, setMode] = useState('rect');
  const W = 540, H = 260;
  const c = makeCoords(W, H, -0.5, 5.2, -0.5, 4.2);

  return (
    <div>
      <TabRow
        active={mode}
        onChange={setMode}
        items={[
          { id: 'rect', label: '[1, 4] × [1, 3] (prostokąt domknięty)' },
          { id: 'mixed', label: '(1, 4] × [1, 3) (brzegi otwarte/domknięte)' },
          { id: 'segments', label: '{1, 2, 3} × [1, 3] (odcinki pionowe)' },
        ]}
      />
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[280px] select-none">
        <Axes coords={c} xTicks={[1, 2, 3, 4, 5]} yTicks={[1, 2, 3, 4]} clipId="cp-clip" />
        <g clipPath="url(#cp-clip)">
          {/* Projections on axes */}
          {mode !== 'segments' ? (
            <>
              <line x1={c.sx(1)} y1={c.sy(0)} x2={c.sx(4)} y2={c.sy(0)} stroke={INK.primary} strokeWidth="3.5" />
              <line x1={c.sx(0)} y1={c.sy(1)} x2={c.sx(0)} y2={c.sy(3)} stroke={INK.crimson} strokeWidth="3.5" />
              <rect
                x={c.sx(1)}
                y={c.sy(3)}
                width={c.sx(4) - c.sx(1)}
                height={c.sy(1) - c.sy(3)}
                fill={INK.primary}
                fillOpacity="0.16"
                stroke="none"
              />
              {/* Bottom edge y=1 */}
              <line x1={c.sx(1)} y1={c.sy(1)} x2={c.sx(4)} y2={c.sy(1)} stroke={INK.primary} strokeWidth="2" />
              {/* Right edge x=4 */}
              <line x1={c.sx(4)} y1={c.sy(1)} x2={c.sx(4)} y2={c.sy(3)} stroke={INK.primary} strokeWidth="2" />
              {/* Left edge x=1 */}
              <line
                x1={c.sx(1)}
                y1={c.sy(1)}
                x2={c.sx(1)}
                y2={c.sy(3)}
                stroke={INK.primary}
                strokeWidth="2"
                strokeDasharray={mode === 'mixed' ? '5 4' : undefined}
              />
              {/* Top edge y=3 */}
              <line
                x1={c.sx(1)}
                y1={c.sy(3)}
                x2={c.sx(4)}
                y2={c.sy(3)}
                stroke={INK.primary}
                strokeWidth="2"
                strokeDasharray={mode === 'mixed' ? '5 4' : undefined}
              />
              {/* Corners */}
              {[
                { x: 1, y: 1, open: mode === 'mixed' },
                { x: 4, y: 1, open: false },
                { x: 4, y: 3, open: mode === 'mixed' },
                { x: 1, y: 3, open: mode === 'mixed' },
              ].map((pt, idx) => (
                <circle
                  key={idx}
                  cx={c.sx(pt.x)}
                  cy={c.sy(pt.y)}
                  r="4.2"
                  fill={pt.open ? 'var(--bg-elevated)' : INK.primary}
                  stroke={INK.primary}
                  strokeWidth="2"
                />
              ))}
              <text x={c.sx(2.5)} y={c.sy(2)} textAnchor="middle" fontSize="13" fontWeight="600" fill={INK.primary}>
                A × B
              </text>
              <text x={c.sx(2.5)} y={c.sy(0) - 7} textAnchor="middle" fontSize="11" fill={INK.primary}>
                A
              </text>
              <text x={c.sx(0) + 12} y={c.sy(2) + 4} fontSize="11" fill={INK.crimson}>
                B
              </text>
            </>
          ) : (
            <>
              <line x1={c.sx(0)} y1={c.sy(1)} x2={c.sx(0)} y2={c.sy(3)} stroke={INK.crimson} strokeWidth="3.5" />
              {[1, 2, 3].map((x) => (
                <g key={x}>
                  <circle cx={c.sx(x)} cy={c.sy(0)} r="3.5" fill={INK.primary} />
                  <line x1={c.sx(x)} y1={c.sy(1)} x2={c.sx(x)} y2={c.sy(3)} stroke={INK.primary} strokeWidth="3" />
                  <circle cx={c.sx(x)} cy={c.sy(1)} r="4" fill={INK.primary} />
                  <circle cx={c.sx(x)} cy={c.sy(3)} r="4" fill={INK.primary} />
                </g>
              ))}
              <text x={c.sx(4.1)} y={c.sy(2)} fontSize="12" fill="var(--text-secondary)">
                3 odcinki pionowe
              </text>
            </>
          )}
        </g>
      </svg>
      <p className="text-xs text-[var(--text-muted)] mt-2">
        Linia ciągła i pełna kropka oznaczają przynależność brzegu (przedział domknięty); linia przerywana i puste kółko — brzeg wykluczony (przedział otwarty).
      </p>
    </div>
  );
}

// ============================================================================
// 2. sgn(x) and Floor ⌊x⌋ (Ch 2, Przykład 4)
// ============================================================================
function SgnAndFloorDiagram() {
  const [which, setWhich] = useState('floor');
  const W = 540, H = 260;
  const c = makeCoords(W, H, -3.5, 3.8, -3.5, 3.5);

  return (
    <div>
      <TabRow
        active={which}
        onChange={setWhich}
        items={[
          { id: 'floor', label: 'Podłoga (cecha) y = ⌊x⌋' },
          { id: 'sgn', label: 'Funkcja znaku y = sgn(x)' },
        ]}
      />
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[280px] select-none">
        <Axes coords={c} xTicks={[-3, -2, -1, 0, 1, 2, 3]} yTicks={[-3, -2, -1, 0, 1, 2, 3]} clipId="sf-clip" />
        <g clipPath="url(#sf-clip)">
          {which === 'floor' ? (
            <>
              <line x1={c.sx(-3.5)} y1={c.sy(-3.5)} x2={c.sx(3.5)} y2={c.sy(3.5)} stroke={INK.muted} strokeDasharray="4 4" strokeWidth="1" opacity="0.6" />
              {[-3, -2, -1, 0, 1, 2, 3].map((k) => (
                <g key={k}>
                  <line x1={c.sx(k)} y1={c.sy(k)} x2={c.sx(k + 1)} y2={c.sy(k)} stroke={INK.primary} strokeWidth="2.5" />
                  <circle cx={c.sx(k)} cy={c.sy(k)} r="3.8" fill={INK.primary} />
                  <circle cx={c.sx(k + 1)} cy={c.sy(k)} r="3.8" fill="var(--bg-elevated)" stroke={INK.primary} strokeWidth="1.8" />
                </g>
              ))}
              {/* Highlight trap ⌊-1.5⌋ = -2 */}
              <line x1={c.sx(-1.5)} y1={c.sy(0)} x2={c.sx(-1.5)} y2={c.sy(-2)} stroke={INK.crimson} strokeDasharray="3 3" strokeWidth="1.4" />
              <circle cx={c.sx(-1.5)} cy={c.sy(-2)} r="4.5" fill={INK.crimson} />
              <text x={c.sx(-1.5) - 6} y={c.sy(-2) - 8} textAnchor="end" fontSize="11" fontWeight="600" fill={INK.crimson}>
                ⌊−1,5⌋ = −2
              </text>
            </>
          ) : (
            <>
              <line x1={c.sx(-3.5)} y1={c.sy(-1)} x2={c.sx(0)} y2={c.sy(-1)} stroke={INK.primary} strokeWidth="2.6" />
              <line x1={c.sx(0)} y1={c.sy(1)} x2={c.sx(3.8)} y2={c.sy(1)} stroke={INK.primary} strokeWidth="2.6" />
              <circle cx={c.sx(0)} cy={c.sy(-1)} r="4" fill="var(--bg-elevated)" stroke={INK.primary} strokeWidth="2" />
              <circle cx={c.sx(0)} cy={c.sy(1)} r="4" fill="var(--bg-elevated)" stroke={INK.primary} strokeWidth="2" />
              <circle cx={c.sx(0)} cy={c.sy(0)} r="4.5" fill={INK.crimson} />
              <text x={c.sx(0.2)} y={c.sy(0) - 6} fontSize="11" fontWeight="600" fill={INK.crimson}>
                sgn(0) = 0
              </text>
            </>
          )}
        </g>
      </svg>
      <p className="text-xs text-[var(--text-muted)] mt-2">
        {which === 'floor'
          ? 'Funkcja podłoga ⌊x⌋ jest ciągła prawostronnie, a w każdej liczbie całkowitej ma skok o 1. Dla ujemnych liczb pamiętaj: ⌊−1,5⌋ = −2 (idziemy w lewo!).'
          : 'Funkcja signum ma nieciągłość skokową I rodzaju w x = 0: granica lewostronna wynosi −1, prawostronna +1, a sama wartość w zerze to 0.'}
      </p>
    </div>
  );
}

// ============================================================================
// 3. Inverse & Cyclometric Functions (Ch 2, Def. 14 + Przykład 6)
// ============================================================================
function InverseCyclometricDiagram() {
  const [tab, setTab] = useState('arcsin');
  const W = 540, H = 280;

  const cfg = {
    arcsin: {
      xMin: -2.2, xMax: 2.2, yMin: -2.0, yMax: 2.0,
      f: (x) => (x >= -Math.PI / 2 && x <= Math.PI / 2 ? Math.sin(x) : NaN),
      inv: (x) => (x >= -1 && x <= 1 ? Math.asin(x) : NaN),
      fLabel: 'sin x na [-π/2, π/2]',
      invLabel: 'arcsin x : [-1, 1] → [-π/2, π/2]',
      asym: [],
    },
    arccos: {
      xMin: -1.4, xMax: 3.5, yMin: -1.4, yMax: 3.5,
      f: (x) => (x >= 0 && x <= Math.PI ? Math.cos(x) : NaN),
      inv: (x) => (x >= -1 && x <= 1 ? Math.acos(x) : NaN),
      fLabel: 'cos x na [0, π]',
      invLabel: 'arccos x : [-1, 1] → [0, π]',
      asym: [],
    },
    arctg: {
      xMin: -5.5, xMax: 5.5, yMin: -2.4, yMax: 2.4,
      f: (x) => (x > -Math.PI / 2 + 0.08 && x < Math.PI / 2 - 0.08 ? Math.tan(x) : NaN),
      inv: (x) => Math.atan(x),
      fLabel: 'tg x na (-π/2, π/2)',
      invLabel: 'arctg x : R → (-π/2, π/2)',
      asym: [
        { y: Math.PI / 2, label: 'y = π/2' },
        { y: -Math.PI / 2, label: 'y = −π/2' },
      ],
    },
    arcctg: {
      xMin: -5.5, xMax: 5.5, yMin: -0.6, yMax: 3.6,
      f: null,
      inv: (x) => Math.PI / 2 - Math.atan(x),
      fLabel: '',
      invLabel: 'arcctg x : R → (0, π)',
      asym: [
        { y: Math.PI, label: 'y = π' },
        { y: 0, label: 'y = 0' },
      ],
    },
  }[tab];

  const c = makeCoords(W, H, cfg.xMin, cfg.xMax, cfg.yMin, cfg.yMax);
  const xTicks = tab === 'arcsin' ? [-1.57, -1, 1, 1.57] : tab === 'arccos' ? [-1, 1, 1.57, 3.14] : [-4, -2, 2, 4];
  const yTicks = tab === 'arcctg' ? [1.57, 3.14] : tab === 'arccos' ? [-1, 1, 1.57, 3.14] : [-1.57, -1, 1, 1.57];
  const piFmt = (v) => {
    if (Math.abs(v - Math.PI / 2) < 0.05) return 'π/2';
    if (Math.abs(v + Math.PI / 2) < 0.05) return '−π/2';
    if (Math.abs(v - Math.PI) < 0.05) return 'π';
    return String(v);
  };

  return (
    <div>
      <TabRow
        active={tab}
        onChange={setTab}
        items={[
          { id: 'arcsin', label: 'arcsin x (odbicie sin x)' },
          { id: 'arccos', label: 'arccos x (odbicie cos x)' },
          { id: 'arctg', label: 'arctg x (asymptoty ±π/2)' },
          { id: 'arcctg', label: 'arcctg x (asymptoty 0 i π)' },
        ]}
      />
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[290px] select-none">
        <Axes coords={c} xTicks={xTicks} yTicks={yTicks} xTickFormat={piFmt} yTickFormat={piFmt} clipId="cyc-clip" />
        <g clipPath="url(#cyc-clip)">
          {cfg.f && (
            <line
              x1={c.sx(Math.max(cfg.xMin, cfg.yMin))}
              y1={c.sy(Math.max(cfg.xMin, cfg.yMin))}
              x2={c.sx(Math.min(cfg.xMax, cfg.yMax))}
              y2={c.sy(Math.min(cfg.xMax, cfg.yMax))}
              stroke={INK.muted}
              strokeDasharray="4 4"
              strokeWidth="1.2"
            />
          )}
          {cfg.asym.map((a, idx) => (
            <g key={idx}>
              <line x1={c.sx(cfg.xMin)} y1={c.sy(a.y)} x2={c.sx(cfg.xMax)} y2={c.sy(a.y)} stroke={INK.crimson} strokeDasharray="5 4" strokeWidth="1.3" />
              <text x={c.sx(cfg.xMax) - 6} y={c.sy(a.y) - 5} textAnchor="end" fontSize="10" fill={INK.crimson} fontFamily="var(--font-mono)">
                {a.label}
              </text>
            </g>
          ))}
          {cfg.f && (
            <path
              d={samplePath(cfg.f, cfg.xMin, cfg.xMax, c.sx, c.sy, cfg.yMin, cfg.yMax)}
              fill="none"
              stroke={INK.ochre}
              strokeWidth="2"
              strokeDasharray="6 3"
            />
          )}
          <path
            d={samplePath(cfg.inv, cfg.xMin, cfg.xMax, c.sx, c.sy, cfg.yMin, cfg.yMax)}
            fill="none"
            stroke={INK.primary}
            strokeWidth="2.8"
          />
        </g>
      </svg>
      <div className="flex flex-wrap gap-4 text-xs text-[var(--text-muted)] mt-2">
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-0.5 inline-block" style={{ background: INK.primary }} />
          {cfg.invLabel}
        </span>
        {cfg.f && (
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 inline-block border-t-2 border-dashed" style={{ borderColor: INK.ochre }} />
            {cfg.fLabel} (odbicie względem y = x)
          </span>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 4. Sequence ε-N(ε) Definition (Ch 3, Def. 18)
// ============================================================================
function SequenceEpsilonDiagram() {
  const [eps, setEps] = useState(0.22);
  const [seqType, setSeqType] = useState('osc');
  const W = 560, H = 260;
  const maxN = 28;
  const g = seqType === 'osc' ? 1 : 2;
  const fn = seqType === 'osc' ? (n) => 1 + ((-1) ** n) / n : (n) => (2 * n - 1) / n;
  const n0 = Math.floor(1 / eps) + 1;
  const c = makeCoords(W, H, 0, maxN + 1, seqType === 'osc' ? -0.2 : 0.7, seqType === 'osc' ? 2.2 : 2.4);

  const pts = useMemo(() => Array.from({ length: maxN }, (_, i) => ({ n: i + 1, y: fn(i + 1) })), [seqType]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <TabRow
          active={seqType}
          onChange={setSeqType}
          items={[
            { id: 'osc', label: 'aₙ = 1 + (−1)ⁿ/n → 1' },
            { id: 'mono', label: 'aₙ = (2n − 1)/n → 2' },
          ]}
        />
        <label className="flex items-center gap-2 text-xs font-mono">
          <span>ε = {eps.toFixed(2)}</span>
          <input
            type="range"
            min="0.06"
            max="0.5"
            step="0.02"
            value={eps}
            onChange={(e) => setEps(Number(e.target.value))}
            className="w-32 accent-[var(--accent)]"
          />
          <span className="px-2 py-0.5 rounded bg-[var(--accent-soft)] text-[var(--accent)] font-semibold">
            n₀(ε) = {n0}
          </span>
        </label>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[270px] select-none">
        <Axes coords={c} xTicks={[5, 10, 15, 20, 25]} yTicks={seqType === 'osc' ? [0, 0.5, 1, 1.5, 2] : [1, 1.5, 2]} xLabel="n" yLabel="aₙ" clipId="seq-clip" />
        <g clipPath="url(#seq-clip)">
          {/* Epsilon band */}
          <rect
            x={c.pad.l}
            y={c.sy(g + eps)}
            width={c.plotW}
            height={c.sy(g - eps) - c.sy(g + eps)}
            fill={INK.forest}
            fillOpacity="0.14"
          />
          <line x1={c.pad.l} y1={c.sy(g + eps)} x2={c.pad.l + c.plotW} y2={c.sy(g + eps)} stroke={INK.forest} strokeDasharray="4 3" strokeWidth="1" />
          <line x1={c.pad.l} y1={c.sy(g - eps)} x2={c.pad.l + c.plotW} y2={c.sy(g - eps)} stroke={INK.forest} strokeDasharray="4 3" strokeWidth="1" />
          <line x1={c.pad.l} y1={c.sy(g)} x2={c.pad.l + c.plotW} y2={c.sy(g)} stroke={INK.primary} strokeWidth="1.6" />

          {/* Vertical n0 threshold */}
          {n0 <= maxN && (
            <>
              <line x1={c.sx(n0)} y1={c.pad.t} x2={c.sx(n0)} y2={c.pad.t + c.plotH} stroke={INK.crimson} strokeDasharray="5 3" strokeWidth="1.5" />
              <text x={c.sx(n0) + 5} y={c.pad.t + 14} fontSize="11" fontFamily="var(--font-mono)" fill={INK.crimson} fontWeight="600">
                n₀ = {n0}
              </text>
            </>
          )}

          {/* Sequence terms */}
          {pts.map((p) => {
            const inside = p.n >= n0;
            return (
              <circle
                key={p.n}
                cx={c.sx(p.n)}
                cy={c.sy(p.y)}
                r="3.8"
                fill={inside ? INK.forest : INK.crimson}
                opacity={inside ? 0.95 : 0.85}
              />
            );
          })}

          <text x={c.pad.l + c.plotW - 6} y={c.sy(g) - 5} textAnchor="end" fontSize="11" fontFamily="var(--font-mono)" fill={INK.primary}>
            g = {g} (pas g ± {eps.toFixed(2)})
          </text>
        </g>
      </svg>
      <p className="text-xs text-[var(--text-muted)] mt-2">
        Zmniejszaj suwak <strong>ε</strong>: pas wokół granicy zwęża się, a próg <strong>n₀(ε)</strong> przesuwa w prawo — jednak dla każdego ε &gt; 0 wszystkie wyrazy od n₀ w prawo (zielone) wpadają na stałe do pasa!
      </p>
    </div>
  );
}

// ============================================================================
// 5. Limits & Continuity Gallery (Ch 4)
// ============================================================================
function LimitContinuityDiagram() {
  const [tab, setTab] = useState('hole');
  const W = 540, H = 260;

  return (
    <div>
      <TabRow
        active={tab}
        onChange={setTab}
        items={[
          { id: 'hole', label: 'Dziura usuwalna (x²−1)/(x−1)' },
          { id: 'jump', label: 'Skok I rodzaju |x|/x' },
          { id: 'exp', label: 'Jednostronne e^(1/x)' },
          { id: 'osc', label: 'sin(1/x) vs x·sin(1/x)' },
        ]}
      />
      {tab === 'hole' && (() => {
        const c = makeCoords(W, H, -1.5, 3.2, -0.5, 4.2);
        return (
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[270px] select-none">
            <Axes coords={c} xTicks={[-1, 1, 2, 3]} yTicks={[1, 2, 3, 4]} clipId="lim-h" />
            <g clipPath="url(#lim-h)">
              <rect x={c.sx(0.65)} y={c.sy(2.35)} width={c.sx(1.35) - c.sx(0.65)} height={c.sy(1.65) - c.sy(2.35)} fill={INK.forest} fillOpacity="0.16" stroke={INK.forest} strokeDasharray="3 3" />
              <line x1={c.sx(-1.5)} y1={c.sy(-0.5)} x2={c.sx(3.2)} y2={c.sy(4.2)} stroke={INK.primary} strokeWidth="2.6" />
              <circle cx={c.sx(1)} cy={c.sy(2)} r="5" fill="var(--bg-elevated)" stroke={INK.crimson} strokeWidth="2.2" />
              <text x={c.sx(1.18)} y={c.sy(2) + 16} fontSize="11" fill={INK.crimson} fontWeight="600">
                1 ∉ D_f, ale lim = 2!
              </text>
            </g>
          </svg>
        );
      })()}
      {tab === 'jump' && (() => {
        const c = makeCoords(W, H, -3, 3, -2, 2);
        return (
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[270px] select-none">
            <Axes coords={c} xTicks={[-2, -1, 1, 2]} yTicks={[-1, 1]} clipId="lim-j" />
            <g clipPath="url(#lim-j)">
              <line x1={c.sx(-3)} y1={c.sy(-1)} x2={c.sx(0)} y2={c.sy(-1)} stroke={INK.primary} strokeWidth="2.6" />
              <line x1={c.sx(0)} y1={c.sy(1)} x2={c.sx(3)} y2={c.sy(1)} stroke={INK.primary} strokeWidth="2.6" />
              <circle cx={c.sx(0)} cy={c.sy(-1)} r="4.5" fill="var(--bg-elevated)" stroke={INK.crimson} strokeWidth="2" />
              <circle cx={c.sx(0)} cy={c.sy(1)} r="4.5" fill="var(--bg-elevated)" stroke={INK.crimson} strokeWidth="2" />
              <text x={c.sx(-1.5)} y={c.sy(-1) - 8} textAnchor="middle" fontSize="11" fill={INK.crimson}>lim (0⁻) = −1</text>
              <text x={c.sx(1.5)} y={c.sy(1) - 8} textAnchor="middle" fontSize="11" fill={INK.forest}>lim (0⁺) = +1</text>
            </g>
          </svg>
        );
      })()}
      {tab === 'exp' && (() => {
        const c = makeCoords(W, H, -3.5, 3.5, -0.6, 6.5);
        return (
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[270px] select-none">
            <Axes coords={c} xTicks={[-3, -2, -1, 1, 2, 3]} yTicks={[1, 2, 4, 6]} clipId="lim-e" />
            <g clipPath="url(#lim-e)">
              <line x1={c.sx(-3.5)} y1={c.sy(1)} x2={c.sx(3.5)} y2={c.sy(1)} stroke={INK.muted} strokeDasharray="4 4" strokeWidth="1.2" />
              <path d={samplePath((x) => (x < -0.02 ? Math.exp(1 / x) : NaN), -3.5, -0.02, c.sx, c.sy, -0.6, 6.5, 160)} fill="none" stroke={INK.forest} strokeWidth="2.6" />
              <path d={samplePath((x) => (x > 0.12 ? Math.exp(1 / x) : NaN), 0.12, 3.5, c.sx, c.sy, -0.6, 6.5, 180)} fill="none" stroke={INK.crimson} strokeWidth="2.6" />
              <circle cx={c.sx(0)} cy={c.sy(0)} r="4.2" fill="var(--bg-elevated)" stroke={INK.forest} strokeWidth="2" />
              <text x={c.sx(-1.7)} y={c.sy(2.4)} fontSize="11" fill={INK.forest} fontWeight="600">x → 0⁻ ⇒ e^(1/x) → 0</text>
              <text x={c.sx(0.45)} y={c.sy(5.4)} fontSize="11" fill={INK.crimson} fontWeight="600">x → 0⁺ ⇒ +∞</text>
            </g>
          </svg>
        );
      })()}
      {tab === 'osc' && (() => {
        const c = makeCoords(W, H, -1.2, 1.2, -1.3, 1.3);
        return (
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[270px] select-none">
            <Axes coords={c} xTicks={[-1, -0.5, 0.5, 1]} yTicks={[-1, -0.5, 0.5, 1]} clipId="lim-o" />
            <g clipPath="url(#lim-o)">
              <line x1={c.sx(-1.2)} y1={c.sy(1.2)} x2={c.sx(0)} y2={c.sy(0)} stroke={INK.muted} strokeDasharray="4 3" />
              <line x1={c.sx(0)} y1={c.sy(0)} x2={c.sx(1.2)} y2={c.sy(1.2)} stroke={INK.muted} strokeDasharray="4 3" />
              <line x1={c.sx(-1.2)} y1={c.sy(-1.2)} x2={c.sx(0)} y2={c.sy(0)} stroke={INK.muted} strokeDasharray="4 3" />
              <line x1={c.sx(0)} y1={c.sy(0)} x2={c.sx(1.2)} y2={c.sy(-1.2)} stroke={INK.muted} strokeDasharray="4 3" />
              <path d={samplePath((x) => (Math.abs(x) > 0.03 ? Math.sin(1 / x) : NaN), -1.2, 1.2, c.sx, c.sy, -1.3, 1.3, 700, 10)} fill="none" stroke={INK.crimson} strokeWidth="1.2" opacity="0.45" />
              <path d={samplePath((x) => (Math.abs(x) > 0.015 ? x * Math.sin(1 / x) : 0), -1.2, 1.2, c.sx, c.sy, -1.3, 1.3, 700, 10)} fill="none" stroke={INK.primary} strokeWidth="2.4" />
              <text x={c.sx(0.28)} y={c.sy(1.05)} fontSize="11" fill={INK.crimson}>sin(1/x) — brak granicy</text>
              <text x={c.sx(0.25)} y={c.sy(-0.98)} fontSize="11" fill={INK.primary} fontWeight="600">x·sin(1/x) → 0 (ściskane w ±|x|)</text>
            </g>
          </svg>
        );
      })()}
    </div>
  );
}

// ============================================================================
// 6. Asymptotes Plot (Ch 4, Przykłady 27, 28, 29)
// ============================================================================
function AsymptotesDiagram() {
  const [tab, setTab] = useState('oblique');
  const W = 540, H = 270;

  return (
    <div>
      <TabRow
        active={tab}
        onChange={setTab}
        items={[
          { id: 'oblique', label: '(x²+1)/(x−1): pionowa + ukośna' },
          { id: 'sqrt', label: '√(x²+1): dwie różne ukośne y = ±x' },
          { id: 'cross', label: 'sin(x)/x: przecina asymptotę y = 0' },
        ]}
      />
      {tab === 'oblique' && (() => {
        const c = makeCoords(W, H, -5, 7, -6, 9);
        return (
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[280px] select-none">
            <Axes coords={c} xTicks={[-4, -2, 1, 3, 5]} yTicks={[-4, -2, 2, 4, 6, 8]} clipId="as-1" />
            <g clipPath="url(#as-1)">
              <line x1={c.sx(1)} y1={c.sy(-6)} x2={c.sx(1)} y2={c.sy(9)} stroke={INK.crimson} strokeDasharray="5 4" strokeWidth="1.6" />
              <line x1={c.sx(-5)} y1={c.sy(-4)} x2={c.sx(7)} y2={c.sy(8)} stroke={INK.forest} strokeDasharray="6 4" strokeWidth="1.6" />
              <path d={samplePath((x) => (Math.abs(x - 1) > 0.08 ? (x * x + 1) / (x - 1) : NaN), -5, 7, c.sx, c.sy, -6, 9, 360)} fill="none" stroke={INK.primary} strokeWidth="2.6" />
              <text x={c.sx(1.2)} y={c.sy(-4.8)} fontSize="11" fill={INK.crimson} fontFamily="var(--font-mono)">x = 1</text>
              <text x={c.sx(4.1)} y={c.sy(4.3)} fontSize="11" fill={INK.forest} fontFamily="var(--font-mono)">y = x + 1</text>
            </g>
          </svg>
        );
      })()}
      {tab === 'sqrt' && (() => {
        const c = makeCoords(W, H, -5.5, 5.5, -0.6, 6);
        return (
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[280px] select-none">
            <Axes coords={c} xTicks={[-4, -2, 2, 4]} yTicks={[1, 2, 3, 4, 5]} clipId="as-2" />
            <g clipPath="url(#as-2)">
              <line x1={c.sx(0)} y1={c.sy(0)} x2={c.sx(5.5)} y2={c.sy(5.5)} stroke={INK.forest} strokeDasharray="5 4" strokeWidth="1.6" />
              <line x1={c.sx(0)} y1={c.sy(0)} x2={c.sx(-5.5)} y2={c.sy(5.5)} stroke={INK.crimson} strokeDasharray="5 4" strokeWidth="1.6" />
              <path d={samplePath((x) => Math.sqrt(x * x + 1), -5.5, 5.5, c.sx, c.sy, -0.6, 6, 260)} fill="none" stroke={INK.primary} strokeWidth="2.8" />
              <text x={c.sx(-3.6)} y={c.sy(2.4)} fontSize="11" fill={INK.crimson} fontFamily="var(--font-mono)">y = −x (w −∞)</text>
              <text x={c.sx(2.4)} y={c.sy(2.4)} fontSize="11" fill={INK.forest} fontFamily="var(--font-mono)">y = x (w +∞)</text>
            </g>
          </svg>
        );
      })()}
      {tab === 'cross' && (() => {
        const c = makeCoords(W, H, -16, 16, -0.45, 1.25);
        return (
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[280px] select-none">
            <Axes coords={c} xTicks={[-12, -6, 6, 12]} yTicks={[-0.25, 0.5, 1]} clipId="as-3" />
            <g clipPath="url(#as-3)">
              <line x1={c.sx(-16)} y1={c.sy(0)} x2={c.sx(16)} y2={c.sy(0)} stroke={INK.crimson} strokeDasharray="5 4" strokeWidth="1.4" />
              <path d={samplePath((x) => (Math.abs(x) < 1e-4 ? 1 : Math.sin(x) / x), -16, 16, c.sx, c.sy, -0.45, 1.25, 420)} fill="none" stroke={INK.primary} strokeWidth="2.4" />
              <circle cx={c.sx(0)} cy={c.sy(1)} r="4" fill="var(--bg-elevated)" stroke={INK.primary} strokeWidth="2" />
              <text x={c.sx(5)} y={c.sy(0.85)} fontSize="11" fill="var(--text-secondary)">
                Przecina asymptotę y = 0 w każdym x = kπ!
              </text>
            </g>
          </svg>
        );
      })()}
    </div>
  );
}

// ============================================================================
// 7. Derivative: Secant → Tangent + Differential df vs Δf + |x| (Ch 5, RYSUNEK str. 10)
// ============================================================================
function DerivativeSecantDiagram() {
  const [tab, setTab] = useState('secant');
  const [h, setH] = useState(1.1);
  const W = 560, H = 280;

  const f = (x) => 0.35 * x * x + 0.4;
  const dfExact = (x) => 0.7 * x;
  const x0 = 1.0;
  const y0 = f(x0);
  const x1 = x0 + h;
  const y1 = f(x1);
  const secSlope = (y1 - y0) / h;
  const tanSlope = dfExact(x0);
  const deltaF = y1 - y0;
  const diffF = tanSlope * h;

  const c = makeCoords(W, H, -0.5, 3.6, -0.2, 4.2);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <TabRow
          active={tab}
          onChange={setTab}
          items={[
            { id: 'secant', label: 'Sieczna → Styczna i różniczka df vs Δf (str. 10)' },
            { id: 'abs', label: 'Przykład 30: |x| (brak pochodnej w 0)' },
          ]}
        />
        {tab === 'secant' && (
          <label className="flex items-center gap-2 text-xs font-mono">
            <span>Δx = {h.toFixed(2)}</span>
            <input
              type="range"
              min="0.05"
              max="1.8"
              step="0.05"
              value={h}
              onChange={(e) => setH(Number(e.target.value))}
              className="w-32 accent-[var(--accent)]"
            />
          </label>
        )}
      </div>
      {tab === 'secant' ? (
        <>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[285px] select-none">
            <Axes coords={c} xTicks={[1, 2, 3]} yTicks={[1, 2, 3, 4]} clipId="der-clip" />
            <g clipPath="url(#der-clip)">
              {/* Curve */}
              <path d={samplePath(f, -0.5, 3.6, c.sx, c.sy, -0.2, 4.2)} fill="none" stroke={INK.primary} strokeWidth="2.8" />
              {/* Tangent at x0 */}
              <line
                x1={c.sx(-0.5)}
                y1={c.sy(y0 + tanSlope * (-0.5 - x0))}
                x2={c.sx(3.6)}
                y2={c.sy(y0 + tanSlope * (3.6 - x0))}
                stroke={INK.crimson}
                strokeWidth="2"
              />
              {/* Secant through (x0,y0) and (x1,y1) */}
              <line
                x1={c.sx(-0.5)}
                y1={c.sy(y0 + secSlope * (-0.5 - x0))}
                x2={c.sx(3.6)}
                y2={c.sy(y0 + secSlope * (3.6 - x0))}
                stroke={INK.ochre}
                strokeWidth="2"
                strokeDasharray="6 3"
              />
              {/* Right triangle showing Δx, df, Δf */}
              <line x1={c.sx(x0)} y1={c.sy(y0)} x2={c.sx(x1)} y2={c.sy(y0)} stroke={INK.muted} strokeDasharray="3 3" strokeWidth="1.4" />
              <line x1={c.sx(x1)} y1={c.sy(y0)} x2={c.sx(x1)} y2={c.sy(y0 + diffF)} stroke={INK.crimson} strokeWidth="3.2" />
              <line x1={c.sx(x1)} y1={c.sy(y0 + diffF)} x2={c.sx(x1)} y2={c.sy(y1)} stroke={INK.forest} strokeWidth="3.2" />

              <circle cx={c.sx(x0)} cy={c.sy(y0)} r="4.5" fill={INK.crimson} />
              <circle cx={c.sx(x1)} cy={c.sy(y1)} r="4.5" fill={INK.ochre} />

              <text x={c.sx((x0 + x1) / 2)} y={c.sy(y0) + 15} textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" fill="var(--text-secondary)">
                Δx = {h.toFixed(2)}
              </text>
              <text x={c.sx(x1) + 7} y={c.sy(y0 + diffF / 2) + 4} fontSize="10.5" fontFamily="var(--font-mono)" fill={INK.crimson} fontWeight="600">
                df = {diffF.toFixed(2)}
              </text>
              {h > 0.35 && (
                <text x={c.sx(x1) + 7} y={c.sy((y0 + diffF + y1) / 2) + 4} fontSize="10.5" fontFamily="var(--font-mono)" fill={INK.forest}>
                  Δf−df = {(deltaF - diffF).toFixed(2)}
                </text>
              )}
            </g>
          </svg>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 text-xs font-mono">
            <div className="px-2.5 py-1.5 rounded border border-[var(--border)] bg-[var(--bg)]">
              <span className="text-[var(--text-muted)]">Iloraz (sieczna): </span>
              <strong style={{ color: INK.ochre }}>{secSlope.toFixed(3)}</strong>
            </div>
            <div className="px-2.5 py-1.5 rounded border border-[var(--border)] bg-[var(--bg)]">
              <span className="text-[var(--text-muted)]">Pochodna f′(1): </span>
              <strong style={{ color: INK.crimson }}>{tanSlope.toFixed(3)}</strong>
            </div>
            <div className="px-2.5 py-1.5 rounded border border-[var(--border)] bg-[var(--bg)]">
              <span className="text-[var(--text-muted)]">Δf = {deltaF.toFixed(3)} vs </span>
              <strong style={{ color: INK.crimson }}>df = {diffF.toFixed(3)}</strong>
            </div>
          </div>
        </>
      ) : (() => {
        const c2 = makeCoords(W, H, -3, 3, -0.5, 3.2);
        return (
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[270px] select-none">
            <Axes coords={c2} xTicks={[-2, -1, 1, 2]} yTicks={[1, 2, 3]} clipId="abs-clip" />
            <g clipPath="url(#abs-clip)">
              <polyline points={`${c2.sx(-3)},${c2.sy(3)} ${c2.sx(0)},${c2.sy(0)} ${c2.sx(3)},${c2.sy(3)}`} fill="none" stroke={INK.primary} strokeWidth="2.8" />
              <circle cx={c2.sx(0)} cy={c2.sy(0)} r="5" fill={INK.crimson} />
              <text x={c2.sx(-1.7)} y={c2.sy(2.1)} fontSize="11" fill={INK.crimson} fontWeight="600">f′₋(0) = −1</text>
              <text x={c2.sx(1.0)} y={c2.sy(2.1)} fontSize="11" fill={INK.forest} fontWeight="600">f′₊(0) = +1</text>
              <text x={c2.sx(0)} y={c2.sy(0.65)} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
                Ciągła w 0, ale ostry „dziób” ⇒ brak f′(0)!
              </text>
            </g>
          </svg>
        );
      })()}
    </div>
  );
}

// ============================================================================
// 8. Taylor / Maclaurin Polynomial Approximation (Ch 5, Tw. 24 + Przykład 41)
// ============================================================================
function TaylorMaclaurinDiagram() {
  const [fnId, setFnId] = useState('sin');
  const [deg, setDeg] = useState(3);
  const W = 560, H = 270;

  const fact = (n) => {
    let r = 1;
    for (let i = 2; i <= n; i++) r *= i;
    return r;
  };

  const specs = {
    sin: {
      exact: (x) => Math.sin(x),
      poly: (x, n) => {
        let s = 0;
        for (let k = 0; 2 * k + 1 <= n; k++) {
          const p = 2 * k + 1;
          s += ((-1) ** k * x ** p) / fact(p);
        }
        return s;
      },
      xMin: -5.5, xMax: 5.5, yMin: -2.2, yMax: 2.2,
      testX: 1.5,
      formula: 'sin x ≈ x − x³/3! + x⁵/5! − …',
    },
    exp: {
      exact: (x) => Math.exp(x),
      poly: (x, n) => {
        let s = 0;
        for (let k = 0; k <= n; k++) s += x ** k / fact(k);
        return s;
      },
      xMin: -3.2, xMax: 3.0, yMin: -0.5, yMax: 8,
      testX: 1.0,
      formula: 'eˣ ≈ 1 + x + x²/2! + x³/3! + …',
    },
    cos: {
      exact: (x) => Math.cos(x),
      poly: (x, n) => {
        let s = 0;
        for (let k = 0; 2 * k <= n; k++) {
          const p = 2 * k;
          s += ((-1) ** k * x ** p) / fact(p);
        }
        return s;
      },
      xMin: -5.5, xMax: 5.5, yMin: -2.2, yMax: 2.2,
      testX: 1.5,
      formula: 'cos x ≈ 1 − x²/2! + x⁴/4! − …',
    },
  };

  const sp = specs[fnId];
  const c = makeCoords(W, H, sp.xMin, sp.xMax, sp.yMin, sp.yMax);
  const err = Math.abs(sp.exact(sp.testX) - sp.poly(sp.testX, deg));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <TabRow
          active={fnId}
          onChange={setFnId}
          items={[
            { id: 'sin', label: 'sin x' },
            { id: 'cos', label: 'cos x' },
            { id: 'exp', label: 'eˣ' },
          ]}
        />
        <label className="flex items-center gap-2 text-xs font-mono">
          <span>Stopień n = {deg}</span>
          <input
            type="range"
            min="1"
            max="9"
            step="1"
            value={deg}
            onChange={(e) => setDeg(Number(e.target.value))}
            className="w-28 accent-[var(--accent)]"
          />
        </label>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[275px] select-none">
        <Axes
          coords={c}
          xTicks={fnId === 'exp' ? [-3, -2, -1, 1, 2] : [-4, -2, 2, 4]}
          yTicks={fnId === 'exp' ? [1, 2, 4, 6] : [-2, -1, 1, 2]}
          clipId="tay-clip"
        />
        <g clipPath="url(#tay-clip)">
          <path d={samplePath(sp.exact, sp.xMin, sp.xMax, c.sx, c.sy, sp.yMin, sp.yMax)} fill="none" stroke={INK.primary} strokeWidth="2.8" />
          <path d={samplePath((x) => sp.poly(x, deg), sp.xMin, sp.xMax, c.sx, c.sy, sp.yMin, sp.yMax)} fill="none" stroke={INK.crimson} strokeWidth="2.2" strokeDasharray="6 3" />
          <circle cx={c.sx(0)} cy={c.sy(sp.exact(0))} r="4" fill={INK.crimson} />
        </g>
      </svg>
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs mt-2">
        <span className="font-mono text-[var(--text-secondary)]">{sp.formula}</span>
        <span className="font-mono px-2 py-0.5 rounded bg-[var(--bg)] border border-[var(--border)]">
          Błąd |R(x={sp.testX})| = <strong style={{ color: INK.crimson }}>{err < 1e-4 ? err.toExponential(2) : err.toFixed(5)}</strong>
        </span>
      </div>
    </div>
  );
}

// ============================================================================
// 9. Rolle, Lagrange, Convexity & Gaussian Curve (Ch 6)
// ============================================================================
function RolleLagrangeConvexityDiagram() {
  const [tab, setTab] = useState('lagrange');
  const W = 550, H = 270;

  return (
    <div>
      <TabRow
        active={tab}
        onChange={setTab}
        items={[
          { id: 'lagrange', label: 'Tw. Lagrange’a (sieczna ∥ styczna)' },
          { id: 'rolle', label: 'Tw. Rolle’a (f(a)=f(b) ⇒ f′(c)=0)' },
          { id: 'convex', label: 'Wypukłość (RYSUNEK str. 13)' },
          { id: 'gauss', label: 'Przykład 51: e^(−x²/2) + przegięcia ±1' },
        ]}
      />
      {tab === 'lagrange' && (() => {
        const f = (x) => 0.28 * x * x - 0.15 * x + 0.6;
        const a = 0.5, b = 3.5;
        const slope = (f(b) - f(a)) / (b - a);
        const cx = (a + b) / 2; // exact for quadratic
        const c = makeCoords(W, H, -0.2, 4.2, 0, 4.2);
        return (
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[280px] select-none">
            <Axes coords={c} xTicks={[1, 2, 3, 4]} yTicks={[1, 2, 3, 4]} clipId="rl-1" />
            <g clipPath="url(#rl-1)">
              <path d={samplePath(f, 0, 4.1, c.sx, c.sy, 0, 4.2)} fill="none" stroke={INK.primary} strokeWidth="2.8" />
              {/* Secant */}
              <line x1={c.sx(a)} y1={c.sy(f(a))} x2={c.sx(b)} y2={c.sy(f(b))} stroke={INK.ochre} strokeWidth="2" strokeDasharray="6 3" />
              {/* Parallel tangent at c */}
              <line x1={c.sx(cx - 1.2)} y1={c.sy(f(cx) - slope * 1.2)} x2={c.sx(cx + 1.2)} y2={c.sy(f(cx) + slope * 1.2)} stroke={INK.crimson} strokeWidth="2.2" />
              <line x1={c.sx(cx)} y1={c.sy(0)} x2={c.sx(cx)} y2={c.sy(f(cx))} stroke={INK.crimson} strokeDasharray="3 3" />
              <circle cx={c.sx(a)} cy={c.sy(f(a))} r="4" fill={INK.ochre} />
              <circle cx={c.sx(b)} cy={c.sy(f(b))} r="4" fill={INK.ochre} />
              <circle cx={c.sx(cx)} cy={c.sy(f(cx))} r="4.8" fill={INK.crimson} />
              <text x={c.sx(cx) + 6} y={c.sy(0.3)} fontSize="11" fontFamily="var(--font-mono)" fill={INK.crimson} fontWeight="600">c ∈ (a, b)</text>
              <text x={c.sx(1.5)} y={c.sy(2.6)} fontSize="11" fill={INK.ochre}>sieczna</text>
              <text x={c.sx(2.4)} y={c.sy(1.4)} fontSize="11" fill={INK.crimson} fontWeight="600">styczna ∥ siecznej</text>
            </g>
          </svg>
        );
      })()}
      {tab === 'rolle' && (() => {
        const f = (x) => 3 - 0.55 * (x - 2) * (x - 2);
        const c = makeCoords(W, H, -0.2, 4.4, 0, 3.8);
        return (
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[280px] select-none">
            <Axes coords={c} xTicks={[0.5, 2, 3.5]} yTicks={[1, 2, 3]} clipId="rl-2" />
            <g clipPath="url(#rl-2)">
              <path d={samplePath(f, 0.2, 3.8, c.sx, c.sy, 0, 3.8)} fill="none" stroke={INK.primary} strokeWidth="2.8" />
              <line x1={c.sx(0.5)} y1={c.sy(f(0.5))} x2={c.sx(3.5)} y2={c.sy(f(3.5))} stroke={INK.ochre} strokeDasharray="5 3" strokeWidth="1.8" />
              <line x1={c.sx(0.7)} y1={c.sy(3)} x2={c.sx(3.3)} y2={c.sy(3)} stroke={INK.crimson} strokeWidth="2.2" />
              <circle cx={c.sx(0.5)} cy={c.sy(f(0.5))} r="4" fill={INK.ochre} />
              <circle cx={c.sx(3.5)} cy={c.sy(f(3.5))} r="4" fill={INK.ochre} />
              <circle cx={c.sx(2)} cy={c.sy(3)} r="4.8" fill={INK.crimson} />
              <text x={c.sx(2)} y={c.sy(3) - 10} textAnchor="middle" fontSize="11" fontWeight="600" fill={INK.crimson}>f′(c) = 0 (styczna pozioma)</text>
              <text x={c.sx(2)} y={c.sy(f(0.5)) + 16} textAnchor="middle" fontSize="11" fill={INK.ochre}>f(a) = f(b)</text>
            </g>
          </svg>
        );
      })()}
      {tab === 'convex' && (() => {
        const f = (x) => 0.32 * x * x + 0.5;
        const c = makeCoords(W, H, -3.2, 3.2, -0.2, 4.0);
        return (
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[280px] select-none">
            <Axes coords={c} xTicks={[-2, -1, 1, 2]} yTicks={[1, 2, 3]} clipId="rl-3" />
            <g clipPath="url(#rl-3)">
              <path d={samplePath(f, -3.1, 3.1, c.sx, c.sy, -0.2, 4.0)} fill="none" stroke={INK.primary} strokeWidth="2.8" />
              {/* Chord above curve */}
              <line x1={c.sx(-2)} y1={c.sy(f(-2))} x2={c.sx(2.5)} y2={c.sy(f(2.5))} stroke={INK.forest} strokeWidth="2" />
              {/* Tangent below curve */}
              <line x1={c.sx(-1.2)} y1={c.sy(f(0.8) + 0.64 * 0.8 * (-2.0))} x2={c.sx(2.8)} y2={c.sy(f(0.8) + 0.64 * 0.8 * 2.0)} stroke={INK.crimson} strokeWidth="2" strokeDasharray="5 3" />
              <circle cx={c.sx(-2)} cy={c.sy(f(-2))} r="4" fill={INK.forest} />
              <circle cx={c.sx(2.5)} cy={c.sy(f(2.5))} r="4" fill={INK.forest} />
              <text x={c.sx(0.2)} y={c.sy(2.4)} textAnchor="middle" fontSize="11" fontWeight="600" fill={INK.forest}>Cięciwa NAD wykresem (f″ &gt; 0, wypukła ∪)</text>
              <text x={c.sx(1.5)} y={c.sy(0.55)} fontSize="11" fill={INK.crimson}>Styczna POD wykresem</text>
            </g>
          </svg>
        );
      })()}
      {tab === 'gauss' && (() => {
        const f = (x) => Math.exp(-0.5 * x * x);
        const c = makeCoords(W, H, -3.5, 3.5, -0.15, 1.25);
        const yp = Math.exp(-0.5);
        return (
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[280px] select-none">
            <Axes coords={c} xTicks={[-3, -2, -1, 1, 2, 3]} yTicks={[0.5, 1]} clipId="rl-4" />
            <g clipPath="url(#rl-4)">
              {/* Concave zone (-1, 1) */}
              <rect x={c.sx(-1)} y={c.pad.t} width={c.sx(1) - c.sx(-1)} height={c.plotH} fill={INK.ochre} fillOpacity="0.1" />
              <path d={samplePath(f, -3.5, 3.5, c.sx, c.sy, -0.15, 1.25)} fill="none" stroke={INK.primary} strokeWidth="2.8" />
              <circle cx={c.sx(0)} cy={c.sy(1)} r="4.5" fill={INK.forest} />
              <circle cx={c.sx(-1)} cy={c.sy(yp)} r="4.5" fill={INK.crimson} />
              <circle cx={c.sx(1)} cy={c.sy(yp)} r="4.5" fill={INK.crimson} />
              <text x={c.sx(0)} y={c.sy(1.1)} textAnchor="middle" fontSize="11" fontWeight="600" fill={INK.forest}>max (0, 1)</text>
              <text x={c.sx(-1.15)} y={c.sy(yp) - 8} textAnchor="end" fontSize="10.5" fill={INK.crimson}>przegięcie (−1, e^(−½))</text>
              <text x={c.sx(1.15)} y={c.sy(yp) - 8} fontSize="10.5" fill={INK.crimson}>przegięcie (1, e^(−½))</text>
              <text x={c.sx(0)} y={c.sy(0.2)} textAnchor="middle" fontSize="10.5" fill={INK.ochre}>f″ &lt; 0 (∩)</text>
              <text x={c.sx(2.2)} y={c.sy(0.3)} textAnchor="middle" fontSize="10.5" fill={INK.primary}>f″ &gt; 0 (∪)</text>
              <text x={c.sx(-2.2)} y={c.sy(0.3)} textAnchor="middle" fontSize="10.5" fill={INK.primary}>f″ &gt; 0 (∪)</text>
            </g>
          </svg>
        );
      })()}
    </div>
  );
}

// ============================================================================
// 10. Antiderivative Family F(x) + C (Ch 7)
// ============================================================================
function AntiderivativeFamilyDiagram() {
  const [cVal, setCVal] = useState(0.5);
  const W = 540, H = 265;
  const f = (x, C) => (x * x * x) / 3 - x + C;
  const df = (x) => x * x - 1;
  const c = makeCoords(W, H, -2.6, 2.6, -3.5, 3.5);
  const xCheck = 1.4;
  const slope = df(xCheck);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <span className="text-xs font-mono text-[var(--text-secondary)]">
          ∫ (x² − 1) dx = ⅓x³ − x + <strong>C</strong>
        </span>
        <label className="flex items-center gap-2 text-xs font-mono">
          <span>Wyróżnione C = {cVal.toFixed(1)}</span>
          <input
            type="range"
            min="-2"
            max="2"
            step="0.2"
            value={cVal}
            onChange={(e) => setCVal(Number(e.target.value))}
            className="w-32 accent-[var(--accent)]"
          />
        </label>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[275px] select-none">
        <Axes coords={c} xTicks={[-2, -1, 1, 2]} yTicks={[-3, -2, -1, 1, 2, 3]} clipId="anti-clip" />
        <g clipPath="url(#anti-clip)">
          {[-2, -1, 0, 1, 2].map((k) => (
            <path
              key={k}
              d={samplePath((x) => f(x, k), -2.6, 2.6, c.sx, c.sy, -3.5, 3.5)}
              fill="none"
              stroke={INK.muted}
              strokeWidth="1.4"
              opacity="0.55"
            />
          ))}
          {/* Highlighted F(x) + C */}
          <path d={samplePath((x) => f(x, cVal), -2.6, 2.6, c.sx, c.sy, -3.5, 3.5)} fill="none" stroke={INK.primary} strokeWidth="2.8" />
          {/* Parallel tangent segments at x = xCheck across curves */}
          <line x1={c.sx(xCheck)} y1={c.sy(-3.5)} x2={c.sx(xCheck)} y2={c.sy(3.5)} stroke={INK.crimson} strokeDasharray="4 4" strokeWidth="1.1" opacity="0.6" />
          {[-1, cVal, 1].map((k, idx) => {
            const y = f(xCheck, k);
            return (
              <g key={idx}>
                <line
                  x1={c.sx(xCheck - 0.45)}
                  y1={c.sy(y - slope * 0.45)}
                  x2={c.sx(xCheck + 0.45)}
                  y2={c.sy(y + slope * 0.45)}
                  stroke={INK.crimson}
                  strokeWidth="2.1"
                />
                <circle cx={c.sx(xCheck)} cy={c.sy(y)} r="3.5" fill={INK.crimson} />
              </g>
            );
          })}
          <text x={c.sx(xCheck) + 8} y={c.sy(f(xCheck, cVal)) + 15} fontSize="10.5" fill={INK.crimson} fontWeight="600">
            Równoległe styczne: F′({xCheck}) = {slope.toFixed(2)} dla każdego C!
          </text>
        </g>
      </svg>
    </div>
  );
}

// ============================================================================
// 11. Universal Trig Substitution t = tg(x/2) on Unit Circle (Ch 8)
// ============================================================================
function TrigWeierstrassDiagram() {
  const [deg, setDeg] = useState(65);
  const rad = (deg * Math.PI) / 180;
  const t = Math.tan(rad / 2);
  const px = Math.cos(rad);
  const py = Math.sin(rad);
  const W = 520, H = 265;
  const c = makeCoords(W, H, -1.8, 2.2, -1.35, 1.35);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <span className="text-xs font-mono text-[var(--text-secondary)]">
          Rzut stereograficzny z S(−1, 0): kąt środkowy x ⇒ kąt wpisany x/2 ⇒ t = tg(x/2)
        </span>
        <label className="flex items-center gap-2 text-xs font-mono">
          <span>x = {deg}°</span>
          <input
            type="range"
            min="-130"
            max="130"
            step="5"
            value={deg}
            onChange={(e) => setDeg(Number(e.target.value))}
            className="w-32 accent-[var(--accent)]"
          />
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        <div className="md:col-span-8">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[260px] select-none">
            <Axes coords={c} xTicks={[-1, 1]} yTicks={[-1, 1]} clipId="wei-clip" />
            <g clipPath="url(#wei-clip)">
              {/* Unit circle (note aspect ratio via ellipse) */}
              <ellipse
                cx={c.sx(0)}
                cy={c.sy(0)}
                rx={c.sx(1) - c.sx(0)}
                ry={c.sy(0) - c.sy(1)}
                fill="none"
                stroke={INK.primary}
                strokeWidth="2.2"
              />
              {/* Radius O to P */}
              <line x1={c.sx(0)} y1={c.sy(0)} x2={c.sx(px)} y2={c.sy(py)} stroke={INK.ochre} strokeWidth="2" />
              {/* Secant S(-1,0) through (0,t) to P(cos x, sin x) */}
              <line x1={c.sx(-1)} y1={c.sy(0)} x2={c.sx(px)} y2={c.sy(py)} stroke={INK.crimson} strokeWidth="2.2" />
              {/* Vertical t segment on y-axis */}
              <line x1={c.sx(0)} y1={c.sy(0)} x2={c.sx(0)} y2={c.sy(t)} stroke={INK.forest} strokeWidth="3.5" />
              <circle cx={c.sx(-1)} cy={c.sy(0)} r="4.5" fill={INK.crimson} />
              <circle cx={c.sx(0)} cy={c.sy(t)} r="4.5" fill={INK.forest} />
              <circle cx={c.sx(px)} cy={c.sy(py)} r="5" fill={INK.primary} />
              <text x={c.sx(-1) - 8} y={c.sy(0) - 8} textAnchor="end" fontSize="11" fill={INK.crimson}>S(−1, 0)</text>
              <text x={c.sx(0) + 8} y={c.sy(t) + 4} fontSize="11" fontWeight="600" fill={INK.forest}>(0, t)</text>
              <text x={c.sx(px) + 8} y={c.sy(py) - 6} fontSize="11" fontWeight="600" fill={INK.primary}>P(cos x, sin x)</text>
            </g>
          </svg>
        </div>
        <div className="md:col-span-4 space-y-2 text-xs font-mono">
          <div className="p-2.5 rounded border border-[var(--border)] bg-[var(--bg)]">
            <div className="text-[var(--text-muted)]">t = tg(x/2)</div>
            <div className="text-sm font-bold" style={{ color: INK.forest }}>{t.toFixed(3)}</div>
          </div>
          <div className="p-2.5 rounded border border-[var(--border)] bg-[var(--bg)]">
            <div className="text-[var(--text-muted)]">sin x = 2t / (1 + t²)</div>
            <div className="text-sm font-bold" style={{ color: INK.primary }}>{((2 * t) / (1 + t * t)).toFixed(3)}</div>
          </div>
          <div className="p-2.5 rounded border border-[var(--border)] bg-[var(--bg)]">
            <div className="text-[var(--text-muted)]">cos x = (1 − t²) / (1 + t²)</div>
            <div className="text-sm font-bold" style={{ color: INK.ochre }}>{((1 - t * t) / (1 + t * t)).toFixed(3)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 12. Riemann Sum, Bounds, Mean Value & Upper Limit Function (Ch 9, 4 RYSUNKI str. 20–21)
// ============================================================================
function RiemannSumDiagram() {
  const [tab, setTab] = useState('sum');
  const [n, setN] = useState(8);
  const [rule, setRule] = useState('mid');
  const W = 560, H = 275;

  const f = (x) => 0.45 * x * x + 0.35;
  const exact = (0.45 * 8) / 3 + 0.35 * 2; // ∫_0^2 (0.45x^2 + 0.35)dx = 1.2 + 0.7 = 1.9

  const rects = useMemo(() => {
    const dx = 2 / n;
    let sum = 0;
    const list = [];
    for (let i = 0; i < n; i++) {
      const xl = i * dx;
      const xr = (i + 1) * dx;
      const xi = rule === 'left' ? xl : rule === 'right' ? xr : (xl + xr) / 2;
      const h = f(xi);
      sum += h * dx;
      list.push({ xl, xr, h });
    }
    return { list, sum };
  }, [n, rule]);

  const c = makeCoords(W, H, -0.3, 2.5, -0.2, 2.7);

  return (
    <div>
      <TabRow
        active={tab}
        onChange={setTab}
        items={[
          { id: 'sum', label: '1. Suma Riemanna Σ f(ξᵢ)Δxᵢ' },
          { id: 'bounds', label: '2. m(b−a) ≤ ∫f ≤ M(b−a)' },
          { id: 'mean', label: '3. Tw. o wartości średniej f(c)' },
          { id: 'phi', label: '4. Funkcja górnej granicy Φ(x)' },
        ]}
      />
      {tab === 'sum' && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs font-mono">
            <div className="flex gap-1.5">
              {[
                { id: 'left', l: 'Lewy' },
                { id: 'mid', l: 'Środek' },
                { id: 'right', l: 'Prawy' },
              ].map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRule(r.id)}
                  className={`px-2 py-0.5 rounded border cursor-pointer ${
                    rule === r.id ? 'bg-[var(--accent-soft)] border-[var(--accent)] text-[var(--accent)] font-semibold' : 'border-[var(--border)]'
                  }`}
                >
                  {r.l}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2">
              <span>n = {n} prostokątów</span>
              <input type="range" min="3" max="36" value={n} onChange={(e) => setN(Number(e.target.value))} className="w-28 accent-[var(--accent)]" />
            </label>
            <span>
              Sₙ = <strong style={{ color: INK.ochre }}>{rects.sum.toFixed(4)}</strong> vs ∫ = <strong style={{ color: INK.forest }}>{exact.toFixed(4)}</strong>
            </span>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[275px] select-none">
            <Axes coords={c} xTicks={[0.5, 1, 1.5, 2]} yTicks={[0.5, 1, 1.5, 2, 2.5]} clipId="rie-1" />
            <g clipPath="url(#rie-1)">
              {rects.list.map((r, i) => (
                <rect
                  key={i}
                  x={c.sx(r.xl)}
                  y={c.sy(r.h)}
                  width={Math.max(1, c.sx(r.xr) - c.sx(r.xl))}
                  height={c.sy(0) - c.sy(r.h)}
                  fill={INK.ochre}
                  fillOpacity="0.22"
                  stroke={INK.ochre}
                  strokeWidth="1"
                />
              ))}
              <path d={samplePath(f, -0.2, 2.4, c.sx, c.sy, -0.2, 2.7)} fill="none" stroke={INK.primary} strokeWidth="2.8" />
            </g>
          </svg>
        </>
      )}
      {tab === 'bounds' && (() => {
        const m = f(0), M = f(2);
        return (
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[275px] select-none">
            <Axes coords={c} xTicks={[0, 1, 2]} yTicks={[0.5, 1, 1.5, 2, 2.5]} clipId="rie-2" />
            <g clipPath="url(#rie-2)">
              <rect x={c.sx(0)} y={c.sy(M)} width={c.sx(2) - c.sx(0)} height={c.sy(0) - c.sy(M)} fill={INK.crimson} fillOpacity="0.09" stroke={INK.crimson} strokeDasharray="5 3" strokeWidth="1.5" />
              <path d={areaBetweenPath(f, () => 0, 0, 2, c.sx, c.sy)} fill={INK.primary} fillOpacity="0.22" />
              <rect x={c.sx(0)} y={c.sy(m)} width={c.sx(2) - c.sx(0)} height={c.sy(0) - c.sy(m)} fill={INK.forest} fillOpacity="0.22" stroke={INK.forest} strokeWidth="1.5" />
              <path d={samplePath(f, -0.2, 2.4, c.sx, c.sy, -0.2, 2.7)} fill="none" stroke={INK.primary} strokeWidth="2.8" />
              <text x={c.sx(1)} y={c.sy(M) - 6} textAnchor="middle" fontSize="11" fill={INK.crimson}>M(b − a) = {(M * 2).toFixed(2)}</text>
              <text x={c.sx(1)} y={c.sy(m / 2) + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill={INK.forest}>m(b − a) = {(m * 2).toFixed(2)}</text>
            </g>
          </svg>
        );
      })()}
      {tab === 'mean' && (() => {
        const fMean = exact / 2;
        const xMean = Math.sqrt((fMean - 0.35) / 0.45);
        return (
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[275px] select-none">
            <Axes coords={c} xTicks={[0, 1, 2]} yTicks={[0.5, 1, 1.5, 2]} clipId="rie-3" />
            <g clipPath="url(#rie-3)">
              <path d={areaBetweenPath(f, () => 0, 0, 2, c.sx, c.sy)} fill={INK.primary} fillOpacity="0.2" />
              <rect x={c.sx(0)} y={c.sy(fMean)} width={c.sx(2) - c.sx(0)} height={c.sy(0) - c.sy(fMean)} fill={INK.forest} fillOpacity="0.18" stroke={INK.forest} strokeDasharray="5 3" strokeWidth="2" />
              <path d={samplePath(f, -0.2, 2.4, c.sx, c.sy, -0.2, 2.7)} fill="none" stroke={INK.primary} strokeWidth="2.8" />
              <line x1={c.sx(xMean)} y1={c.sy(0)} x2={c.sx(xMean)} y2={c.sy(fMean)} stroke={INK.crimson} strokeDasharray="3 3" />
              <circle cx={c.sx(xMean)} cy={c.sy(fMean)} r="4.5" fill={INK.crimson} />
              <text x={c.sx(xMean) + 6} y={c.sy(fMean) - 8} fontSize="11" fontWeight="600" fill={INK.crimson}>c ≈ {xMean.toFixed(2)}, f(c) = {fMean.toFixed(2)}</text>
              <text x={c.sx(0.95)} y={c.sy(0.45)} textAnchor="middle" fontSize="11" fill={INK.forest}>Pole prostokąta = Pole pod krzywą!</text>
            </g>
          </svg>
        );
      })()}
      {tab === 'phi' && (() => {
        const xEnd = 1.35;
        const dh = 0.25;
        return (
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[275px] select-none">
            <Axes coords={c} xTicks={[0, 1, 2]} yTicks={[0.5, 1, 1.5, 2]} clipId="rie-4" />
            <g clipPath="url(#rie-4)">
              <path d={areaBetweenPath(f, () => 0, 0, xEnd, c.sx, c.sy)} fill={INK.primary} fillOpacity="0.2" />
              <path d={areaBetweenPath(f, () => 0, xEnd, xEnd + dh, c.sx, c.sy)} fill={INK.crimson} fillOpacity="0.32" stroke={INK.crimson} strokeWidth="1.4" />
              <path d={samplePath(f, -0.2, 2.4, c.sx, c.sy, -0.2, 2.7)} fill="none" stroke={INK.primary} strokeWidth="2.8" />
              <text x={c.sx(0.65)} y={c.sy(0.35)} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={INK.primary}>Φ(x) = ∫ₐˣ f(t)dt</text>
              <text x={c.sx(xEnd + dh + 0.08)} y={c.sy(1.45)} fontSize="11" fontWeight="600" fill={INK.crimson}>ΔΦ ≈ f(x)·h ⇒ Φ′(x) = f(x)!</text>
            </g>
          </svg>
        );
      })()}
    </div>
  );
}

// ============================================================================
// 13. Areas Between Curves (Ch 9, Przykład 86)
// ============================================================================
function AreasBetweenCurvesDiagram() {
  const [tab, setTab] = useState('parabola');
  const W = 540, H = 265;

  return (
    <div>
      <TabRow
        active={tab}
        onChange={setTab}
        items={[
          { id: 'parabola', label: 'y = x oraz y = x² (P = 1/6)' },
          { id: 'signed', label: 'y = sin x na [0, 2π]: ∫ = 0 vs P = 4' },
          { id: 'parab2', label: 'y = 4 − x² oraz y = x + 2 (P = 9/2)' },
        ]}
      />
      {tab === 'parabola' && (() => {
        const c = makeCoords(W, H, -0.3, 1.5, -0.2, 1.5);
        return (
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[270px] select-none">
            <Axes coords={c} xTicks={[0.5, 1]} yTicks={[0.5, 1]} clipId="ar-1" />
            <g clipPath="url(#ar-1)">
              <path d={areaBetweenPath((x) => x, (x) => x * x, 0, 1, c.sx, c.sy)} fill={INK.forest} fillOpacity="0.28" />
              <path d={samplePath((x) => x, -0.3, 1.5, c.sx, c.sy, -0.2, 1.5)} fill="none" stroke={INK.crimson} strokeWidth="2.4" />
              <path d={samplePath((x) => x * x, -0.3, 1.5, c.sx, c.sy, -0.2, 1.5)} fill="none" stroke={INK.primary} strokeWidth="2.6" />
              <circle cx={c.sx(0)} cy={c.sy(0)} r="4" fill={INK.forest} />
              <circle cx={c.sx(1)} cy={c.sy(1)} r="4" fill={INK.forest} />
              <text x={c.sx(0.55)} y={c.sy(0.45)} fontSize="11.5" fontWeight="700" fill={INK.forest}>P = 1/6</text>
              <text x={c.sx(1.12)} y={c.sy(1.32)} fontSize="11" fill={INK.primary}>y = x²</text>
              <text x={c.sx(1.16)} y={c.sy(1.05)} fontSize="11" fill={INK.crimson}>y = x</text>
            </g>
          </svg>
        );
      })()}
      {tab === 'signed' && (() => {
        const c = makeCoords(W, H, -0.4, 6.8, -1.35, 1.35);
        return (
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[270px] select-none">
            <Axes coords={c} xTicks={[Math.PI, 2 * Math.PI]} yTicks={[-1, 1]} xTickFormat={(v) => (v > 4 ? '2π' : 'π')} clipId="ar-2" />
            <g clipPath="url(#ar-2)">
              <path d={areaBetweenPath(Math.sin, () => 0, 0, Math.PI, c.sx, c.sy)} fill={INK.forest} fillOpacity="0.28" />
              <path d={areaBetweenPath(() => 0, Math.sin, Math.PI, 2 * Math.PI, c.sx, c.sy)} fill={INK.crimson} fillOpacity="0.25" />
              <path d={samplePath(Math.sin, -0.4, 6.8, c.sx, c.sy, -1.35, 1.35)} fill="none" stroke={INK.primary} strokeWidth="2.6" />
              <text x={c.sx(Math.PI / 2)} y={c.sy(0.45)} textAnchor="middle" fontSize="12" fontWeight="700" fill={INK.forest}>+2</text>
              <text x={c.sx(1.5 * Math.PI)} y={c.sy(-0.48)} textAnchor="middle" fontSize="12" fontWeight="700" fill={INK.crimson}>−2 (pole = +2)</text>
            </g>
          </svg>
        );
      })()}
      {tab === 'parab2' && (() => {
        const c = makeCoords(W, H, -3, 2.5, -1, 4.8);
        return (
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[270px] select-none">
            <Axes coords={c} xTicks={[-2, -1, 1, 2]} yTicks={[1, 2, 3, 4]} clipId="ar-3" />
            <g clipPath="url(#ar-3)">
              <path d={areaBetweenPath((x) => 4 - x * x, (x) => x + 2, -2, 1, c.sx, c.sy)} fill={INK.forest} fillOpacity="0.26" />
              <path d={samplePath((x) => 4 - x * x, -3, 2.5, c.sx, c.sy, -1, 4.8)} fill="none" stroke={INK.primary} strokeWidth="2.6" />
              <path d={samplePath((x) => x + 2, -3, 2.5, c.sx, c.sy, -1, 4.8)} fill="none" stroke={INK.crimson} strokeWidth="2.2" />
              <circle cx={c.sx(-2)} cy={c.sy(0)} r="4" fill={INK.forest} />
              <circle cx={c.sx(1)} cy={c.sy(3)} r="4" fill={INK.forest} />
              <text x={c.sx(-0.5)} y={c.sy(2.6)} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={INK.forest}>
                P = ∫₋₂¹ (2 − x − x²)dx = 9/2
              </text>
            </g>
          </svg>
        );
      })()}
    </div>
  );
}

// ============================================================================
// 14. Solid of Revolution & Improper Integrals (Ch 9, Przykłady 89–92)
// ============================================================================
function SolidAndImproperDiagram() {
  const [tab, setTab] = useState('solid');
  const W = 550, H = 270;

  return (
    <div>
      <TabRow
        active={tab}
        onChange={setTab}
        items={[
          { id: 'solid', label: 'Bryła obrotowa: kula V = 4/3 πR³ (plasterki)' },
          { id: 'imp1', label: 'Niewłaściwa I: 1/x² (zbieżna) vs 1/x (rozbieżna)' },
          { id: 'imp2', label: 'Pułapka Przykład 92: ∫₋₁¹ dx/x² = +∞ (NIE −2!)' },
        ]}
      />
      {tab === 'solid' && (() => {
        const R = 2;
        const f = (x) => (Math.abs(x) <= R ? Math.sqrt(Math.max(0, R * R - x * x)) : NaN);
        const c = makeCoords(W, H, -2.8, 2.8, -2.5, 2.5);
        const sliceX = 0.7;
        const sliceR = f(sliceX);
        return (
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[275px] select-none">
            <Axes coords={c} xTicks={[-2, -1, 1, 2]} yTicks={[-2, -1, 1, 2]} clipId="sol-1" />
            <g clipPath="url(#sol-1)">
              {/* Upper & lower semicircle */}
              <path d={samplePath(f, -2, 2, c.sx, c.sy, -2.5, 2.5)} fill="none" stroke={INK.primary} strokeWidth="2.8" />
              <path d={samplePath((x) => -f(x), -2, 2, c.sx, c.sy, -2.5, 2.5)} fill="none" stroke={INK.primary} strokeWidth="1.5" strokeDasharray="5 3" opacity="0.7" />
              {/* Vertical cross-section ellipses */}
              {[-1.3, 0, sliceX, 1.5].map((x) => {
                const ry = c.sy(0) - c.sy(f(x));
                const isMain = x === sliceX;
                return (
                  <ellipse
                    key={x}
                    cx={c.sx(x)}
                    cy={c.sy(0)}
                    rx={Math.max(6, ry * 0.24)}
                    ry={ry}
                    fill={isMain ? INK.ochre : INK.primary}
                    fillOpacity={isMain ? 0.28 : 0.08}
                    stroke={isMain ? INK.ochre : INK.primary}
                    strokeWidth={isMain ? 2.2 : 1}
                  />
                );
              })}
              <line x1={c.sx(sliceX)} y1={c.sy(0)} x2={c.sx(sliceX)} y2={c.sy(sliceR)} stroke={INK.crimson} strokeWidth="2.2" />
              <text x={c.sx(sliceX) + 18} y={c.sy(sliceR * 0.5)} fontSize="11" fontWeight="600" fill={INK.crimson}>r = f(x)</text>
              <text x={c.sx(-1.3)} y={c.sy(2.05)} fontSize="11" fill={INK.ochre} fontWeight="600">dV = π[f(x)]² dx</text>
            </g>
          </svg>
        );
      })()}
      {tab === 'imp1' && (() => {
        const c = makeCoords(W, H, 0, 7.5, -0.15, 1.5);
        return (
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[275px] select-none">
            <Axes coords={c} xTicks={[1, 2, 3, 4, 5, 6, 7]} yTicks={[0.5, 1]} clipId="sol-2" />
            <g clipPath="url(#sol-2)">
              <path d={areaBetweenPath((x) => 1 / (x * x), () => 0, 1, 7.5, c.sx, c.sy)} fill={INK.forest} fillOpacity="0.25" />
              <path d={samplePath((x) => (x > 0.3 ? 1 / x : NaN), 0.3, 7.5, c.sx, c.sy, -0.15, 1.5)} fill="none" stroke={INK.crimson} strokeWidth="2.2" strokeDasharray="6 3" />
              <path d={samplePath((x) => (x > 0.5 ? 1 / (x * x) : NaN), 0.5, 7.5, c.sx, c.sy, -0.15, 1.5)} fill="none" stroke={INK.forest} strokeWidth="2.8" />
              <line x1={c.sx(1)} y1={c.sy(0)} x2={c.sx(1)} y2={c.sy(1)} stroke={INK.forest} strokeWidth="1.5" />
              <text x={c.sx(3.2)} y={c.sy(0.55)} fontSize="11" fill={INK.crimson} fontWeight="600">1/x: ∫₁^∞ = +∞ (rozbieżna)</text>
              <text x={c.sx(2.4)} y={c.sy(0.14)} fontSize="11" fill={INK.forest} fontWeight="600">1/x²: ∫₁^∞ = 1 (zbieżna!)</text>
            </g>
          </svg>
        );
      })()}
      {tab === 'imp2' && (() => {
        const c = makeCoords(W, H, -1.6, 1.6, -0.5, 10);
        return (
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[275px] select-none">
            <Axes coords={c} xTicks={[-1, 1]} yTicks={[2, 4, 6, 8]} clipId="sol-3" />
            <g clipPath="url(#sol-3)">
              <path d={areaBetweenPath((x) => Math.min(10, 1 / (x * x)), () => 0, -1, -0.32, c.sx, c.sy)} fill={INK.crimson} fillOpacity="0.22" />
              <path d={areaBetweenPath((x) => Math.min(10, 1 / (x * x)), () => 0, 0.32, 1, c.sx, c.sy)} fill={INK.crimson} fillOpacity="0.22" />
              <path d={samplePath((x) => (Math.abs(x) > 0.28 ? 1 / (x * x) : NaN), -1.6, 1.6, c.sx, c.sy, -0.5, 10, 360)} fill="none" stroke={INK.crimson} strokeWidth="2.6" />
              <line x1={c.sx(0)} y1={c.pad.t} x2={c.sx(0)} y2={c.pad.t + c.plotH} stroke={INK.crimson} strokeDasharray="4 4" strokeWidth="1.8" />
              <text x={c.sx(0.12)} y={c.sy(8.4)} fontSize="11" fontWeight="700" fill={INK.crimson}>Biegun x = 0 ∈ (−1, 1)!</text>
              <text x={c.sx(0.12)} y={c.sy(7.1)} fontSize="10.5" fill="var(--text-secondary)">1/x² &gt; 0 wszędzie ⇒ całka = +∞</text>
            </g>
          </svg>
        );
      })()}
    </div>
  );
}

export const MATH_DIAGRAM_REGISTRY = {
  'cartesian-product': { Component: CartesianProductDiagram },
  'sgn-and-floor': { Component: SgnAndFloorDiagram },
  'inverse-and-cyclometric': { Component: InverseCyclometricDiagram },
  'sequence-epsilon-n': { Component: SequenceEpsilonDiagram },
  'limit-heine-cauchy-onesided': { Component: LimitContinuityDiagram },
  'asymptotes-plot': { Component: AsymptotesDiagram },
  'derivative-secant-tangent': { Component: DerivativeSecantDiagram },
  'taylor-maclaurin': { Component: TaylorMaclaurinDiagram },
  'rolle-lagrange-convexity': { Component: RolleLagrangeConvexityDiagram },
  'antiderivative-family': { Component: AntiderivativeFamilyDiagram },
  'trig-weierstrass-circle': { Component: TrigWeierstrassDiagram },
  'riemann-sum-integral': { Component: RiemannSumDiagram },
  'areas-between-curves': { Component: AreasBetweenCurvesDiagram },
  'solid-of-revolution-and-improper': { Component: SolidAndImproperDiagram },
};
