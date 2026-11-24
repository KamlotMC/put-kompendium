import React, { useMemo, useState } from 'react';

const NAVY = '#1d3557';
const CRIMSON = '#9b2226';
const FOREST = '#2d6a4f';
const AMBER = '#b45309';

function fmt(v, d = 3) {
  if (!Number.isFinite(v)) return '—';
  const r = Math.abs(v) < 1e-10 ? 0 : v;
  return Number.isInteger(r) ? String(r) : r.toFixed(d).replace(/\.?0+$/, '');
}

// ============================================================================
// 1. Flowchart Blocks & Control Flow (aisd-flowchart-control)
// ============================================================================
function AisdFlowchartControlDiagram() {
  const [mode, setMode] = useState('blocks'); // 'blocks' | 'swap' | 'loops'

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {[
          { id: 'blocks', label: '5 bloków schematu (W1)' },
          { id: 'swap', label: 'IF/ELSE i zamiana z temp (W2)' },
          { id: 'loops', label: 'WHILE, BREAK + flaga i CONTINUE (W2)' },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setMode(t.id)}
            className={`px-2.5 py-1 rounded text-xs font-medium border cursor-pointer ${
              mode === t.id
                ? 'bg-[var(--accent)] text-white dark:text-[#0f141c] border-[var(--accent)]'
                : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border)]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {mode === 'blocks' && (
        <svg viewBox="0 0 600 220" className="w-full max-w-[640px] mx-auto block rounded border border-[var(--border)] bg-[var(--bg)]">
          {/* 1. Oval */}
          <rect x="24" y="34" width="96" height="44" rx="22" fill="var(--bg-elevated)" stroke={NAVY} strokeWidth="2" />
          <text x="72" y="60" textAnchor="middle" fontSize="11.5" fontFamily="monospace" fontWeight="700" fill="var(--text)">START / END</text>
          <text x="72" y="100" textAnchor="middle" fontSize="10.5" fill="var(--text-muted)">Owal</text>
          <text x="72" y="114" textAnchor="middle" fontSize="9.5" fill="var(--text-muted)">początek / koniec</text>

          {/* 2. Rectangle */}
          <rect x="138" y="34" width="98" height="44" rx="2" fill="var(--bg-elevated)" stroke={NAVY} strokeWidth="2" />
          <text x="187" y="60" textAnchor="middle" fontSize="11" fontFamily="monospace" fontWeight="600" fill="var(--text)">SET x = a+b</text>
          <text x="187" y="100" textAnchor="middle" fontSize="10.5" fill="var(--text-muted)">Prostokąt</text>
          <text x="187" y="114" textAnchor="middle" fontSize="9.5" fill="var(--text-muted)">operacja / proces</text>

          {/* 3. Double-bordered rectangle (function) */}
          <rect x="254" y="34" width="98" height="44" rx="2" fill="var(--bg-elevated)" stroke={FOREST} strokeWidth="2" />
          <line x1="264" y1="34" x2="264" y2="78" stroke={FOREST} strokeWidth="1.6" />
          <line x1="342" y1="34" x2="342" y2="78" stroke={FOREST} strokeWidth="1.6" />
          <text x="303" y="60" textAnchor="middle" fontSize="11" fontFamily="monospace" fontWeight="600" fill="var(--text)">sqrt(n)</text>
          <text x="303" y="100" textAnchor="middle" fontSize="10.5" fill="var(--text-muted)">Podwójne boki</text>
          <text x="303" y="114" textAnchor="middle" fontSize="9.5" fill="var(--text-muted)">funkcja / procedura</text>

          {/* 4. Parallelogram (I/O) */}
          <polygon points="382,34 474,34 460,78 368,78" fill="var(--bg-elevated)" stroke={AMBER} strokeWidth="2" />
          <text x="421" y="60" textAnchor="middle" fontSize="10.5" fontFamily="monospace" fontWeight="600" fill="var(--text)">READ / PRINT</text>
          <text x="421" y="100" textAnchor="middle" fontSize="10.5" fill="var(--text-muted)">Równoległobok</text>
          <text x="421" y="114" textAnchor="middle" fontSize="9.5" fill="var(--text-muted)">wejście / wyjście</text>

          {/* 5. Diamond */}
          <polygon points="535,24 584,56 535,88 486,56" fill="var(--bg-elevated)" stroke={CRIMSON} strokeWidth="2" />
          <text x="535" y="60" textAnchor="middle" fontSize="10.5" fontFamily="monospace" fontWeight="600" fill="var(--text)">a &gt; b ?</text>
          <text x="535" y="105" textAnchor="middle" fontSize="10.5" fill="var(--text-muted)">Romb (Y / N)</text>
          <text x="535" y="119" textAnchor="middle" fontSize="9.5" fill="var(--text-muted)">warunek decyzyjny</text>

          {/* Bottom rule banner */}
          <rect x="24" y="142" width="552" height="58" rx="4" fill="var(--bg-subtle)" stroke="var(--border)" />
          <text x="38" y="164" fontSize="11" fontWeight="700" fill="var(--text)">5 obowiązkowych cech algorytmu (Wykład 1, sl. 18–19):</text>
          <text x="38" y="184" fontSize="10.5" fontFamily="monospace" fill="var(--text-secondary)">
            1. Uporządkowanie  ·  2. Skończona liczba operacji  ·  3. Określoność  ·  4. Skończony czas  ·  5. Ogólność
          </text>
        </svg>
      )}

      {mode === 'swap' && (
        <svg viewBox="0 0 600 230" className="w-full max-w-[640px] mx-auto block rounded border border-[var(--border)] bg-[var(--bg)]">
          {/* Left: Correct swap */}
          <text x="150" y="24" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={FOREST}>Poprawna zamiana (ze zmienną temp)</text>
          <rect x="30" y="38" width="240" height="36" rx="4" fill="var(--bg-elevated)" stroke={NAVY} strokeWidth="1.5" />
          <text x="150" y="60" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text)">Stan początkowy: a = 5, b = 9</text>

          <line x1="150" y1="74" x2="150" y2="92" stroke={FOREST} strokeWidth="1.5" />
          <rect x="30" y="92" width="240" height="32" rx="4" fill="var(--bg-elevated)" stroke={FOREST} strokeWidth="1.5" />
          <text x="150" y="112" textAnchor="middle" fontSize="10.5" fontFamily="monospace" fill="var(--text)">1. temp = b   →  temp=9, a=5, b=9</text>

          <line x1="150" y1="124" x2="150" y2="140" stroke={FOREST} strokeWidth="1.5" />
          <rect x="30" y="140" width="240" height="32" rx="4" fill="var(--bg-elevated)" stroke={FOREST} strokeWidth="1.5" />
          <text x="150" y="160" textAnchor="middle" fontSize="10.5" fontFamily="monospace" fill="var(--text)">2. b = a      →  temp=9, a=5, b=5</text>

          <line x1="150" y1="172" x2="150" y2="188" stroke={FOREST} strokeWidth="1.5" />
          <rect x="30" y="188" width="240" height="32" rx="4" fill="var(--success-soft)" stroke={FOREST} strokeWidth="1.8" />
          <text x="150" y="208" textAnchor="middle" fontSize="10.5" fontFamily="monospace" fontWeight="700" fill={FOREST}>3. a = temp   →  a = 9, b = 5 ✓</text>

          {/* Divider */}
          <line x1="300" y1="18" x2="300" y2="220" stroke="var(--border)" strokeDasharray="4 4" />

          {/* Right: Wrong swap */}
          <text x="450" y="24" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={CRIMSON}>Błędna zamiana (bez temp!)</text>
          <rect x="330" y="38" width="240" height="36" rx="4" fill="var(--bg-elevated)" stroke={NAVY} strokeWidth="1.5" />
          <text x="450" y="60" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text)">Stan początkowy: a = 5, b = 9</text>

          <line x1="450" y1="74" x2="450" y2="98" stroke={CRIMSON} strokeWidth="1.5" />
          <rect x="330" y="98" width="240" height="36" rx="4" fill="var(--danger-soft)" stroke={CRIMSON} strokeWidth="1.5" />
          <text x="450" y="120" textAnchor="middle" fontSize="10.5" fontFamily="monospace" fill={CRIMSON}>1. a = b  →  a=9, b=9 (utracono 5!)</text>

          <line x1="450" y1="134" x2="450" y2="158" stroke={CRIMSON} strokeWidth="1.5" />
          <rect x="330" y="158" width="240" height="36" rx="4" fill="var(--danger-soft)" stroke={CRIMSON} strokeWidth="1.8" />
          <text x="450" y="180" textAnchor="middle" fontSize="10.5" fontFamily="monospace" fontWeight="700" fill={CRIMSON}>2. b = a  →  a = 9, b = 9 ✗</text>
        </svg>
      )}

      {mode === 'loops' && (
        <svg viewBox="0 0 600 230" className="w-full max-w-[640px] mx-auto block rounded border border-[var(--border)] bg-[var(--bg)]">
          {/* Left: BREAK vs CONTINUE */}
          <text x="152" y="22" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={NAVY}>Pętla WHILE (warunek wstępny)</text>
          <polygon points="152,36 226,64 152,92 78,64" fill="var(--bg-elevated)" stroke={NAVY} strokeWidth="1.8" />
          <text x="152" y="68" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text)">warunek ?</text>
          <text x="160" y="106" fontSize="9.5" fontWeight="700" fill={FOREST}>TAK (Y)</text>
          <text x="234" y="60" fontSize="9.5" fontWeight="700" fill={CRIMSON}>NIE (N)</text>

          {/* Y branch down */}
          <line x1="152" y1="92" x2="152" y2="116" stroke={FOREST} strokeWidth="1.6" />
          <rect x="82" y="116" width="140" height="34" rx="4" fill="var(--bg-elevated)" stroke={NAVY} strokeWidth="1.5" />
          <text x="152" y="137" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text)">Ciało iteracji</text>

          {/* CONTINUE arrow back up */}
          <path d="M 82 133 L 40 133 L 40 64 L 78 64" fill="none" stroke={AMBER} strokeWidth="1.6" strokeDasharray="4 2" />
          <text x="44" y="102" fontSize="9.5" fontFamily="monospace" fontWeight="700" fill={AMBER}>CONTINUE</text>

          {/* Normal loop back */}
          <line x1="152" y1="150" x2="152" y2="178" stroke={NAVY} strokeWidth="1.5" />
          <rect x="82" y="178" width="140" height="30" rx="4" fill="var(--bg-subtle)" stroke="var(--border-strong)" />
          <text x="152" y="197" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-secondary)">Reszta iteracji</text>
          <path d="M 82 193 L 22 193 L 22 50 L 122 50" fill="none" stroke="var(--text-muted)" strokeWidth="1.2" />

          {/* BREAK arrow out */}
          <path d="M 222 133 L 268 133 L 268 206" fill="none" stroke={CRIMSON} strokeWidth="1.8" />
          <path d="M 226 64 L 268 64 L 268 206" fill="none" stroke={CRIMSON} strokeWidth="1.3" strokeDasharray="3 3" />
          <text x="245" y="126" textAnchor="middle" fontSize="9.5" fontFamily="monospace" fontWeight="700" fill={CRIMSON}>BREAK</text>
          <text x="268" y="220" textAnchor="middle" fontSize="9.5" fill="var(--text-muted)">za pętlą</text>

          {/* Right: Nested loop + flag pattern */}
          <line x1="305" y1="16" x2="305" y2="216" stroke="var(--border)" strokeDasharray="4 4" />
          <text x="452" y="24" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={NAVY}>Wyjście z 2 pętli zagnieżdżonych (flaga)</text>
          <rect x="325" y="38" width="254" height="174" rx="5" fill="var(--bg-subtle)" stroke="var(--border)" />
          <text x="338" y="60" fontSize="10.5" fontFamily="monospace" fill="var(--text)">SET flag = 0</text>
          <text x="338" y="80" fontSize="10.5" fontFamily="monospace" fontWeight="700" fill={NAVY}>FOR i = 0 .. n-2 DO</text>
          <text x="354" y="100" fontSize="10.5" fontFamily="monospace" fontWeight="700" fill={FOREST}>FOR j = i+1 .. n-1 DO</text>
          <text x="370" y="120" fontSize="10.5" fontFamily="monospace" fill="var(--text)">IF A[i,j] != A[j,i] THEN</text>
          <text x="386" y="138" fontSize="10.5" fontFamily="monospace" fontWeight="700" fill={CRIMSON}>SET flag = 1; BREAK</text>
          <text x="354" y="160" fontSize="10.5" fontFamily="monospace" fontWeight="700" fill={AMBER}>IF flag == 1 THEN BREAK</text>
          <text x="338" y="182" fontSize="10.5" fontFamily="monospace" fill="var(--text-secondary)">END FOR</text>
          <text x="338" y="202" fontSize="9.5" fill="var(--text-muted)">BREAK przerywa TYLKO wewnętrzną pętlę j!</text>
        </svg>
      )}
    </div>
  );
}

// ============================================================================
// 2. Complexity Growth & Theta(n) Proof (aisd-complexity-growth)
// ============================================================================
function AisdComplexityGrowthDiagram() {
  const [mode, setMode] = useState('classes'); // 'classes' | 'theta'
  const [nVal, setNVal] = useState(12);
  const [c1, setC1] = useState(2);
  const [c2, setC2] = useState(3);

  const W = 560;
  const H = 260;
  const padL = 46;
  const padR = 18;
  const padT = 18;
  const padB = 34;

  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const curves = [
    { name: 'O(1)', color: '#64748b', fn: () => 1 },
    { name: 'O(log₂ n)', color: FOREST, fn: (n) => Math.log2(Math.max(1, n)) },
    { name: 'O(n)', color: NAVY, fn: (n) => n },
    { name: 'O(n log₂ n)', color: '#0284c7', fn: (n) => n * Math.log2(Math.max(1, n)) },
    { name: 'O(n²)', color: AMBER, fn: (n) => n * n },
    { name: 'O(2ⁿ)', color: CRIMSON, fn: (n) => Math.pow(2, n) },
  ];

  const maxN = 16;
  const maxY = 160;
  const toX = (n) => padL + ((n - 1) / (maxN - 1)) * plotW;
  const toY = (y) => padT + plotH - (Math.min(y, maxY) / maxY) * plotH;

  // Theta proof coordinates: f(n) = 2n + 6 vs c1*n and c2*n on n in [0..14]
  const tMaxN = 14;
  const tMaxY = 60;
  const tX = (n) => padL + (n / tMaxN) * plotW;
  const tY = (y) => padT + plotH - (Math.min(Math.max(y, 0), tMaxY) / tMaxY) * plotH;
  const n0 = c2 > 2 ? 6 / (c2 - 2) : Infinity;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setMode('classes')}
            className={`px-2.5 py-1 rounded text-xs font-medium border cursor-pointer ${
              mode === 'classes'
                ? 'bg-[var(--accent)] text-white dark:text-[#0f141c] border-[var(--accent)]'
                : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border)]'
            }`}
          >
            Hierarchia klas złożoności
          </button>
          <button
            type="button"
            onClick={() => setMode('theta')}
            className={`px-2.5 py-1 rounded text-xs font-medium border cursor-pointer ${
              mode === 'theta'
                ? 'bg-[var(--accent)] text-white dark:text-[#0f141c] border-[var(--accent)]'
                : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border)]'
            }`}
          >
            Dowód f(n) = 2n + 6 = Θ(n) (W3 sl. 24–26)
          </button>
        </div>

        {mode === 'classes' ? (
          <label className="flex items-center gap-2 text-xs font-mono">
            n = {nVal}
            <input type="range" min="2" max="16" step="1" value={nVal} onChange={(e) => setNVal(Number(e.target.value))} className="w-24 accent-[var(--accent)]" />
          </label>
        ) : (
          <div className="flex flex-wrap gap-3 text-xs font-mono">
            <label className="flex items-center gap-1.5">
              c₁ = {fmt(c1, 1)}
              <input type="range" min="0.5" max="2.5" step="0.5" value={c1} onChange={(e) => setC1(Number(e.target.value))} className="w-20 accent-[var(--accent)]" />
            </label>
            <label className="flex items-center gap-1.5">
              c₂ = {fmt(c2, 1)}
              <input type="range" min="2.5" max="5" step="0.5" value={c2} onChange={(e) => setC2(Number(e.target.value))} className="w-20 accent-[var(--crimson)]" />
            </label>
          </div>
        )}
      </div>

      {mode === 'classes' ? (
        <>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[600px] mx-auto block rounded border border-[var(--border)] bg-[var(--bg)]">
            {[40, 80, 120, 160].map((yv) => (
              <g key={yv}>
                <line x1={padL} y1={toY(yv)} x2={W - padR} y2={toY(yv)} stroke="var(--border)" strokeWidth="0.8" />
                <text x={padL - 6} y={toY(yv) + 3} textAnchor="end" fontSize="9.5" fontFamily="monospace" fill="var(--text-muted)">{yv}</text>
              </g>
            ))}
            <line x1={padL} y1={padT + plotH} x2={W - padR} y2={padT + plotH} stroke="var(--text-muted)" strokeWidth="1.2" />
            <line x1={padL} y1={padT} x2={padL} y2={padT + plotH} stroke="var(--text-muted)" strokeWidth="1.2" />

            {[2, 4, 6, 8, 10, 12, 14, 16].map((nv) => (
              <text key={nv} x={toX(nv)} y={H - 12} textAnchor="middle" fontSize="9.5" fontFamily="monospace" fill="var(--text-muted)">{nv}</text>
            ))}
            <text x={W - 18} y={H - 12} fontSize="10" fontFamily="monospace" fill="var(--text-muted)">n</text>

            {/* Vertical guide for selected nVal */}
            <line x1={toX(nVal)} y1={padT} x2={toX(nVal)} y2={padT + plotH} stroke="var(--accent)" strokeDasharray="3 3" strokeWidth="1.2" />

            {curves.map((c) => {
              const pts = [];
              for (let x = 1; x <= maxN; x += 0.25) {
                const y = c.fn(x);
                if (y <= maxY * 1.05) pts.push(`${toX(x).toFixed(1)},${toY(y).toFixed(1)}`);
              }
              return (
                <g key={c.name}>
                  <polyline fill="none" stroke={c.color} strokeWidth="2.2" points={pts.join(' ')} />
                  {c.fn(nVal) <= maxY && (
                    <circle cx={toX(nVal)} cy={toY(c.fn(nVal))} r="3.5" fill={c.color} />
                  )}
                </g>
              );
            })}
          </svg>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs font-mono">
            {curves.map((c) => (
              <div key={c.name} className="px-2.5 py-1.5 rounded border border-[var(--border)] bg-[var(--bg-subtle)]">
                <div className="font-bold" style={{ color: c.color }}>{c.name}</div>
                <div className="text-[var(--text)] mt-0.5 tabular-nums">{fmt(c.fn(nVal), 1)} op.</div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[600px] mx-auto block rounded border border-[var(--border)] bg-[var(--bg)]">
            {[15, 30, 45, 60].map((yv) => (
              <g key={yv}>
                <line x1={padL} y1={tY(yv)} x2={W - padR} y2={tY(yv)} stroke="var(--border)" strokeWidth="0.8" />
                <text x={padL - 6} y={tY(yv) + 3} textAnchor="end" fontSize="9.5" fontFamily="monospace" fill="var(--text-muted)">{yv}</text>
              </g>
            ))}
            <line x1={padL} y1={padT + plotH} x2={W - padR} y2={padT + plotH} stroke="var(--text-muted)" strokeWidth="1.2" />
            <line x1={padL} y1={padT} x2={padL} y2={padT + plotH} stroke="var(--text-muted)" strokeWidth="1.2" />

            {[0, 2, 4, 6, 8, 10, 12, 14].map((nv) => (
              <text key={nv} x={tX(nv)} y={H - 12} textAnchor="middle" fontSize="9.5" fontFamily="monospace" fill="var(--text-muted)">{nv}</text>
            ))}

            {/* Shaded valid region n >= n0 */}
            {Number.isFinite(n0) && n0 <= tMaxN && (
              <>
                <rect x={tX(n0)} y={padT} width={tX(tMaxN) - tX(n0)} height={plotH} fill={FOREST} opacity="0.08" />
                <line x1={tX(n0)} y1={padT} x2={tX(n0)} y2={padT + plotH} stroke={FOREST} strokeDasharray="4 3" strokeWidth="1.4" />
                <text x={tX(n0) + 5} y={padT + 14} fontSize="10" fontFamily="monospace" fontWeight="700" fill={FOREST}>
                  n₀ = {fmt(n0, 1)}
                </text>
              </>
            )}

            {/* c1*n (lower bound) */}
            <line x1={tX(0)} y1={tY(0)} x2={tX(tMaxN)} y2={tY(c1 * tMaxN)} stroke={FOREST} strokeWidth="2" strokeDasharray="5 3" />
            {/* c2*n (upper bound) */}
            <line x1={tX(0)} y1={tY(0)} x2={tX(tMaxN)} y2={tY(c2 * tMaxN)} stroke={CRIMSON} strokeWidth="2" strokeDasharray="5 3" />
            {/* f(n) = 2n + 6 */}
            <line x1={tX(0)} y1={tY(6)} x2={tX(tMaxN)} y2={tY(2 * tMaxN + 6)} stroke={NAVY} strokeWidth="2.6" />

            <text x={tX(10.5)} y={tY(c2 * 10.5) - 6} fontSize="10" fontFamily="monospace" fill={CRIMSON}>c₂·n = {fmt(c2, 1)}n</text>
            <text x={tX(10.5)} y={tY(2 * 10.5 + 6) - 6} fontSize="10" fontFamily="monospace" fontWeight="700" fill={NAVY}>f(n) = 2n + 6</text>
            <text x={tX(10.5)} y={tY(c1 * 10.5) + 12} fontSize="10" fontFamily="monospace" fill={FOREST}>c₁·n = {fmt(c1, 1)}n</text>
          </svg>
          <div className="text-xs font-mono text-[var(--text-secondary)] px-3 py-2 rounded bg-[var(--bg-subtle)] border border-[var(--border)]">
            {c1 <= 2 && c2 > 2
              ? `Dla c₁ = ${fmt(c1, 1)}, c₂ = ${fmt(c2, 1)} oraz wszystkich n ≥ n₀ = ${fmt(n0, 2)} zachodzi c₁·n ≤ 2n + 6 ≤ c₂·n  ⇒  2n + 6 = Θ(n) ✓`
              : 'Uwaga: aby nierówność c₁·n ≤ 2n + 6 ≤ c₂·n była prawdziwa dla dużych n, musi zachodzić c₁ ≤ 2 oraz c₂ > 2!'}
          </div>
        </>
      )}
    </div>
  );
}

// ============================================================================
// 3. Linear Data Structures (aisd-linear-structures)
// ============================================================================
function AisdLinearStructuresDiagram() {
  const [kind, setKind] = useState('array'); // 'array' | 'list' | 'stack' | 'queue'

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {[
          { id: 'array', label: 'Tablica O(1) dostęp' },
          { id: 'list', label: 'Lista powiązana (SLL)' },
          { id: 'stack', label: 'Stos (LIFO)' },
          { id: 'queue', label: 'Kolejka cykliczna (FIFO)' },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setKind(t.id)}
            className={`px-2.5 py-1 rounded text-xs font-medium border cursor-pointer ${
              kind === t.id
                ? 'bg-[var(--accent)] text-white dark:text-[#0f141c] border-[var(--accent)]'
                : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border)]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {kind === 'array' && (
        <svg viewBox="0 0 600 180" className="w-full max-w-[640px] mx-auto block rounded border border-[var(--border)] bg-[var(--bg)]">
          <text x="28" y="26" fontSize="11.5" fontWeight="700" fill={NAVY}>Tablica jednowymiarowa — ciągły blok pamięci (adres = base + i · sizeof(T))</text>
          {[14, 27, 33, 42, 58, 71].map((val, i) => (
            <g key={i} transform={`translate(${36 + i * 88}, 50)`}>
              <rect width="84" height="54" fill={i === 3 ? 'var(--accent-soft)' : 'var(--bg-elevated)'} stroke={i === 3 ? NAVY : 'var(--border-strong)'} strokeWidth={i === 3 ? '2.2' : '1.3'} />
              <text x="42" y="32" textAnchor="middle" fontSize="15" fontFamily="monospace" fontWeight="700" fill="var(--text)">{val}</text>
              <text x="42" y="-8" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-muted)">A[{i}]</text>
              <text x="42" y="70" textAnchor="middle" fontSize="9.5" fontFamily="monospace" fill="var(--text-muted)">0x{(1000 + i * 4).toString(16)}</text>
            </g>
          ))}
          <text x="342" y="148" textAnchor="middle" fontSize="11" fontFamily="monospace" fontWeight="700" fill={FOREST}>
            Dostęp A[3] = 42 w O(1)  |  Wstawienie/usunięcie w środku wymaga przesunięcia O(n)
          </text>
        </svg>
      )}

      {kind === 'list' && (
        <svg viewBox="0 0 600 190" className="w-full max-w-[640px] mx-auto block rounded border border-[var(--border)] bg-[var(--bg)]">
          <text x="24" y="24" fontSize="11.5" fontWeight="700" fill={NAVY}>Lista jednokierunkowa (SLL) — wstawianie węzła „25” po „20” w O(1)</text>
          {/* head label */}
          <text x="24" y="84" fontSize="10.5" fontFamily="monospace" fontWeight="700" fill={NAVY}>head →</text>
          {[
            { v: 10, x: 76 },
            { v: 20, x: 206 },
            { v: 30, x: 406 },
          ].map((node, idx) => (
            <g key={node.v} transform={`translate(${node.x}, 58)`}>
              <rect width="60" height="40" rx="3" fill="var(--bg-elevated)" stroke={NAVY} strokeWidth="1.6" />
              <rect x="60" width="28" height="40" rx="3" fill="var(--bg-subtle)" stroke={NAVY} strokeWidth="1.6" />
              <text x="30" y="25" textAnchor="middle" fontSize="13" fontFamily="monospace" fontWeight="700" fill="var(--text)">{node.v}</text>
              <text x="74" y="25" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-muted)">{idx === 2 ? '∅' : '•'}</text>
            </g>
          ))}
          {/* Arrow 10 -> 20 */}
          <line x1="164" y1="78" x2="204" y2="78" stroke={NAVY} strokeWidth="1.8" />
          {/* Old broken arrow 20 -> 30 */}
          <line x1="294" y1="78" x2="404" y2="78" stroke={CRIMSON} strokeDasharray="4 4" strokeWidth="1.3" />
          <text x="349" y="70" textAnchor="middle" fontSize="9.5" fontFamily="monospace" fill={CRIMSON}>stare łącze ✗</text>

          {/* Inserted node 25 */}
          <g transform="translate(300, 122)">
            <rect width="58" height="36" rx="3" fill="var(--success-soft)" stroke={FOREST} strokeWidth="2" />
            <rect x="58" width="26" height="36" rx="3" fill="var(--bg-elevated)" stroke={FOREST} strokeWidth="2" />
            <text x="29" y="23" textAnchor="middle" fontSize="13" fontFamily="monospace" fontWeight="700" fill={FOREST}>25</text>
            <text x="71" y="23" textAnchor="middle" fontSize="11" fontFamily="monospace" fill={FOREST}>•</text>
          </g>
          {/* Step 1: nowy.next = p.next */}
          <path d="M 384 140 L 420 140 L 420 98" fill="none" stroke={FOREST} strokeWidth="2" />
          <text x="488" y="138" fontSize="10" fontFamily="monospace" fontWeight="700" fill={FOREST}>1. nowy.next = p.next</text>
          {/* Step 2: p.next = nowy */}
          <path d="M 280 98 L 280 140 L 300 140" fill="none" stroke={AMBER} strokeWidth="2" />
          <text x="196" y="144" fontSize="10" fontFamily="monospace" fontWeight="700" fill={AMBER}>2. p.next = nowy</text>
        </svg>
      )}

      {kind === 'stack' && (
        <svg viewBox="0 0 600 190" className="w-full max-w-[640px] mx-auto block rounded border border-[var(--border)] bg-[var(--bg)]">
          <text x="28" y="24" fontSize="11.5" fontWeight="700" fill={NAVY}>Stos (LIFO — Last In, First Out): push(x), pop(), top() w czasie O(1)</text>
          {/* Stack bucket */}
          <path d="M 230 46 L 230 166 L 370 166 L 370 46" fill="none" stroke="var(--text-muted)" strokeWidth="2.2" />
          {[
            { v: 12, y: 132, top: false },
            { v: 45, y: 98, top: false },
            { v: 89, y: 64, top: true },
          ].map((item) => (
            <g key={item.v}>
              <rect x="238" y={item.y} width="124" height="28" rx="3" fill={item.top ? 'var(--accent-soft)' : 'var(--bg-elevated)'} stroke={item.top ? NAVY : 'var(--border-strong)'} strokeWidth={item.top ? '2' : '1.2'} />
              <text x="300" y={item.y + 19} textAnchor="middle" fontSize="13" fontFamily="monospace" fontWeight="700" fill="var(--text)">{item.v}</text>
            </g>
          ))}
          <text x="148" y="78" fontSize="10.5" fontFamily="monospace" fontWeight="700" fill={FOREST}>push(89) →</text>
          <text x="384" y="78" fontSize="10.5" fontFamily="monospace" fontWeight="700" fill={CRIMSON}>← top / pop()</text>
          <text x="300" y="182" textAnchor="middle" fontSize="10" fill="var(--text-muted)">Zastosowania: stos wywołań rekurencyjnych, nawiasy, ONP, DFS</text>
        </svg>
      )}

      {kind === 'queue' && (
        <svg viewBox="0 0 600 195" className="w-full max-w-[640px] mx-auto block rounded border border-[var(--border)] bg-[var(--bg)]">
          <text x="24" y="24" fontSize="11.5" fontWeight="700" fill={NAVY}>Kolejka cykliczna (FIFO, N = 6): zawijanie indeksów (idx + 1) % 6</text>
          {/* 6 slots */}
          {[
            { i: 0, v: 'E', act: true },
            { i: 1, v: '', act: false },
            { i: 2, v: '', act: false },
            { i: 3, v: 'B', act: true },
            { i: 4, v: 'C', act: true },
            { i: 5, v: 'D', act: true },
          ].map((slot) => (
            <g key={slot.i} transform={`translate(${42 + slot.i * 86}, 64)`}>
              <rect width="78" height="48" rx="3" fill={slot.act ? 'var(--accent-soft)' : 'var(--bg-elevated)'} stroke={slot.act ? NAVY : 'var(--border-strong)'} strokeWidth={slot.act ? '1.8' : '1.2'} />
              <text x="39" y="30" textAnchor="middle" fontSize="14" fontFamily="monospace" fontWeight="700" fill="var(--text)">{slot.v || '—'}</text>
              <text x="39" y="-8" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-muted)">[{slot.i}]</text>
            </g>
          ))}
          <text x="339" y="132" textAnchor="middle" fontSize="10.5" fontFamily="monospace" fontWeight="700" fill={CRIMSON}>↑ head = 3 (dequeue)</text>
          <text x="167" y="132" textAnchor="middle" fontSize="10.5" fontFamily="monospace" fontWeight="700" fill={FOREST}>↑ tail = 1 (następne enqueue)</text>
          <path d="M 550 88 C 584 88, 584 164, 300 164 C 18 164, 18 88, 42 88" fill="none" stroke={AMBER} strokeWidth="1.6" strokeDasharray="4 3" />
          <text x="300" y="180" textAnchor="middle" fontSize="10" fontFamily="monospace" fill={AMBER}>Zawinięcie z [5] na [0] dzięki modulo N — zero zmarnowanej pamięci!</text>
        </svg>
      )}
    </div>
  );
}

// ============================================================================
// 4. Sorting Step-by-Step Mini Visualizer (aisd-sorting-steps)
// ============================================================================
function buildMiniSortSteps(algo, inputArr) {
  const arr = [...inputArr];
  const n = arr.length;
  const steps = [{ arr: [...arr], hi: [], sorted: [], note: `Stan początkowy: [${arr.join(', ')}]` }];

  if (algo === 'selection') {
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIdx]) minIdx = j;
      }
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        steps.push({
          arr: [...arr],
          hi: [i, minIdx],
          sorted: Array.from({ length: i + 1 }, (_, k) => k),
          note: `Krok i=${i}: minimum (${arr[i]}) zamienione z indeksem ${minIdx} → [${arr.join(', ')}]`,
        });
      } else {
        steps.push({
          arr: [...arr],
          hi: [i],
          sorted: Array.from({ length: i + 1 }, (_, k) => k),
          note: `Krok i=${i}: element ${arr[i]} już jest minimum — bez zamiany.`,
        });
      }
    }
    steps.push({ arr: [...arr], hi: [], sorted: Array.from({ length: n }, (_, k) => k), note: 'Gotowe! Selection Sort: zawsze Θ(n²) porównań, ≤ n−1 zamian.' });
  } else if (algo === 'insertion') {
    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
      steps.push({
        arr: [...arr],
        hi: [j + 1],
        sorted: Array.from({ length: i + 1 }, (_, k) => k),
        note: `Wstawiono klucz ${key} na pozycję ${j + 1} → [${arr.join(', ')}]`,
      });
    }
    steps.push({ arr: [...arr], hi: [], sorted: Array.from({ length: n }, (_, k) => k), note: 'Gotowe! Insertion Sort: stabilny, O(n) optymistycznie, O(n²) pesymistycznie.' });
  } else {
    // Modified Bubble Sort with swapped flag
    for (let pass = 0; pass < n - 1; pass++) {
      let swapped = false;
      for (let j = 0; j < n - 1 - pass; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swapped = true;
        }
      }
      const sortedTail = Array.from({ length: pass + 1 }, (_, k) => n - 1 - k);
      steps.push({
        arr: [...arr],
        hi: swapped ? [n - 1 - pass] : [],
        sorted: sortedTail,
        note: swapped
          ? `Przebieg ${pass + 1}: „bąbelek” ${arr[n - 1 - pass]} wypłynął na koniec → [${arr.join(', ')}]`
          : `Przebieg ${pass + 1}: brak zamian (flaga swapped = false) → wcześniejsze zatrzymanie!`,
      });
      if (!swapped) break;
    }
    steps.push({ arr: [...arr], hi: [], sorted: Array.from({ length: n }, (_, k) => k), note: 'Gotowe! Zmodyfikowany Bubble Sort z flagą: O(n) na posortowanej tablicy.' });
  }
  return steps;
}

function AisdSortingStepsDiagram() {
  const [algo, setAlgo] = useState('selection');
  const [stepIdx, setStepIdx] = useState(0);

  const base = [4, 2, 5, 6, 1];
  const steps = useMemo(() => buildMiniSortSteps(algo, base), [algo]);
  const safeIdx = Math.min(stepIdx, steps.length - 1);
  const st = steps[safeIdx];

  const switchAlgo = (next) => {
    setAlgo(next);
    setStepIdx(0);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'selection', label: 'Selection Sort' },
            { id: 'insertion', label: 'Insertion Sort' },
            { id: 'bubble', label: 'Bubble Sort (z flagą)' },
          ].map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => switchAlgo(a.id)}
              className={`px-2.5 py-1 rounded text-xs font-medium border cursor-pointer ${
                algo === a.id
                  ? 'bg-[var(--accent)] text-white dark:text-[#0f141c] border-[var(--accent)]'
                  : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border)]'
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono">
          <button
            type="button"
            disabled={safeIdx === 0}
            onClick={() => setStepIdx((s) => Math.max(0, s - 1))}
            className="btn-secondary !py-1 !px-2.5 text-xs disabled:opacity-40"
          >
            ← Poprzedni
          </button>
          <span className="px-2 tabular-nums text-[var(--text-muted)]">
            {safeIdx + 1} / {steps.length}
          </span>
          <button
            type="button"
            disabled={safeIdx === steps.length - 1}
            onClick={() => setStepIdx((s) => Math.min(steps.length - 1, s + 1))}
            className="btn-secondary !py-1 !px-2.5 text-xs disabled:opacity-40"
          >
            Następny →
          </button>
        </div>
      </div>

      <svg viewBox="0 0 540 190" className="w-full max-w-[580px] mx-auto block rounded border border-[var(--border)] bg-[var(--bg)]">
        <text x="20" y="22" fontSize="11" fontFamily="monospace" fill="var(--text-muted)">
          Ciąg wykładowy z W4 (sl. 40–45): [4, 2, 5, 6, 1]
        </text>
        {st.arr.map((v, i) => {
          const isHi = st.hi.includes(i);
          const isSorted = st.sorted.includes(i);
          const barH = v * 20;
          const x = 68 + i * 86;
          const y = 158 - barH;
          const fill = isHi ? CRIMSON : isSorted ? FOREST : NAVY;
          return (
            <g key={i}>
              <rect x={x} y={y} width="54" height={barH} rx="3" fill={fill} opacity={isHi ? 0.92 : isSorted ? 0.85 : 0.72} />
              <text x={x + 27} y={y - 6} textAnchor="middle" fontSize="13" fontFamily="monospace" fontWeight="700" fill="var(--text)">{v}</text>
              <text x={x + 27} y="176" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-muted)">[{i}]</text>
            </g>
          );
        })}
      </svg>

      <div className="text-xs font-mono text-[var(--text-secondary)] px-3 py-2 rounded bg-[var(--bg-subtle)] border border-[var(--border)]">
        {st.note}
      </div>
    </div>
  );
}

// ============================================================================
// 5. Hash Table Collisions & Load Factor Curve (aisd-hash-table)
// ============================================================================
function AisdHashTableDiagram() {
  const [mode, setMode] = useState('collisions'); // 'collisions' | 'alpha'
  const [strategy, setStrategy] = useState('linear'); // 'chaining' | 'linear' | 'quadratic'
  const [alpha, setAlpha] = useState(0.75);

  // Keys inserted into N=7 with h(k)=k % 7: 10 (3), 17 (3), 24 (3), 15 (1), 22 (1)
  const N = 7;
  const keys = [10, 17, 24, 15, 22];

  const placement = useMemo(() => {
    if (strategy === 'chaining') {
      const buckets = Array.from({ length: N }, () => []);
      keys.forEach((k) => buckets[k % N].push(k));
      return { buckets };
    }
    const slots = Array(N).fill(null);
    const probes = [];
    for (const k of keys) {
      const h0 = k % N;
      for (let i = 0; i < N; i++) {
        const idx = strategy === 'linear' ? (h0 + i) % N : (h0 + i * i) % N;
        if (slots[idx] === null) {
          slots[idx] = { k, h0, step: i };
          probes.push({ k, h0, idx, step: i });
          break;
        }
      }
    }
    return { slots, probes };
  }, [strategy]);

  const W = 560;
  const H = 235;
  const padL = 46;
  const padR = 18;
  const padT = 18;
  const padB = 34;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const maxY = 12;
  const toX = (a) => padL + (a / 0.95) * plotW;
  const toY = (y) => padT + plotH - (Math.min(y, maxY) / maxY) * plotH;

  const unsucc = 1 / (1 - alpha);
  const succ = (1 / alpha) * Math.log(1 / (1 - alpha)) + 1 / alpha;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setMode('collisions')}
            className={`px-2.5 py-1 rounded text-xs font-medium border cursor-pointer ${
              mode === 'collisions'
                ? 'bg-[var(--accent)] text-white dark:text-[#0f141c] border-[var(--accent)]'
                : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border)]'
            }`}
          >
            Rozwiązywanie kolizji (N = 7)
          </button>
          <button
            type="button"
            onClick={() => setMode('alpha')}
            className={`px-2.5 py-1 rounded text-xs font-medium border cursor-pointer ${
              mode === 'alpha'
                ? 'bg-[var(--accent)] text-white dark:text-[#0f141c] border-[var(--accent)]'
                : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border)]'
            }`}
          >
            Koszt porównań f(α) (W5 sl. 15)
          </button>
        </div>

        {mode === 'collisions' ? (
          <div className="flex flex-wrap gap-1">
            {[
              { id: 'chaining', label: 'Łańcuchowanie' },
              { id: 'linear', label: 'Liniowe (+i)' },
              { id: 'quadratic', label: 'Kwadratowe (+i²)' },
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setStrategy(s.id)}
                className={`px-2 py-1 rounded text-[11px] font-mono border cursor-pointer ${
                  strategy === s.id
                    ? 'bg-[var(--accent-soft)] text-[var(--accent-text)] border-[var(--accent)] font-semibold'
                    : 'bg-[var(--bg-elevated)] text-[var(--text-muted)] border-[var(--border)]'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        ) : (
          <label className="flex items-center gap-2 text-xs font-mono">
            α = {alpha.toFixed(2)}
            <input type="range" min="0.1" max="0.92" step="0.02" value={alpha} onChange={(e) => setAlpha(Number(e.target.value))} className="w-28 accent-[var(--crimson)]" />
          </label>
        )}
      </div>

      {mode === 'collisions' ? (
        <svg viewBox="0 0 580 215" className="w-full max-w-[620px] mx-auto block rounded border border-[var(--border)] bg-[var(--bg)]">
          <text x="18" y="22" fontSize="10.5" fontFamily="monospace" fill="var(--text-muted)">
            Klucze: [10, 17, 24, 15, 22] · h(k) = k mod 7  (10,17,24 → 3; 15,22 → 1) · α = 5/7 ≈ 0,71
          </text>

          {strategy === 'chaining'
            ? placement.buckets.map((list, idx) => (
                <g key={idx} transform={`translate(22, ${36 + idx * 24})`}>
                  <rect width="38" height="20" rx="2" fill="var(--bg-subtle)" stroke={NAVY} strokeWidth="1.2" />
                  <text x="19" y="14" textAnchor="middle" fontSize="10" fontFamily="monospace" fontWeight="700" fill="var(--text)">[{idx}]</text>
                  {list.length === 0 ? (
                    <text x="54" y="14" fontSize="10" fontFamily="monospace" fill="var(--text-muted)">→ ∅</text>
                  ) : (
                    list.map((k, j) => (
                      <g key={k} transform={`translate(${54 + j * 76}, 0)`}>
                        <line x1="-16" y1="10" x2="0" y2="10" stroke={NAVY} strokeWidth="1.3" />
                        <rect width="58" height="20" rx="2" fill={j > 0 ? 'var(--warning-soft)' : 'var(--accent-soft)'} stroke={j > 0 ? AMBER : NAVY} strokeWidth="1.3" />
                        <text x="29" y="14" textAnchor="middle" fontSize="10.5" fontFamily="monospace" fontWeight="700" fill="var(--text)">{k}</text>
                      </g>
                    ))
                  )}
                </g>
              ))
            : placement.slots.map((slot, idx) => (
                <g key={idx} transform={`translate(${24 + idx * 78}, 64)`}>
                  <text x="34" y="-8" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-muted)">[{idx}]</text>
                  <rect
                    width="68"
                    height="56"
                    rx="4"
                    fill={slot ? (slot.step > 0 ? 'var(--warning-soft)' : 'var(--accent-soft)') : 'var(--bg-elevated)'}
                    stroke={slot ? (slot.step > 0 ? AMBER : NAVY) : 'var(--border-strong)'}
                    strokeWidth={slot ? '1.8' : '1.2'}
                  />
                  <text x="34" y="28" textAnchor="middle" fontSize="14" fontFamily="monospace" fontWeight="700" fill="var(--text)">
                    {slot ? slot.k : '—'}
                  </text>
                  {slot && (
                    <text x="34" y="46" textAnchor="middle" fontSize="9.5" fontFamily="monospace" fill={slot.step > 0 ? AMBER : FOREST}>
                      {slot.step === 0 ? 'i=0 (OK)' : `kol. i=${slot.step}`}
                    </text>
                  )}
                </g>
              ))}

          {strategy !== 'chaining' && (
            <text x="24" y="162" fontSize="10.5" fontFamily="monospace" fill="var(--text-secondary)">
              {strategy === 'linear'
                ? 'Próbkowanie liniowe tworzy spójny klaster [1..5] (grupowanie pierwotne!).'
                : 'Próbkowanie kwadratowe (+i²): 24 trafia na (3+4) mod 7 = [0], rozbijając klaster!'}
            </text>
          )}
          {strategy !== 'chaining' && (
            <text x="24" y="184" fontSize="10" fontFamily="monospace" fill={CRIMSON}>
              Usuwanie w adresowaniu otwartym wymaga znacznika DELETED (tombstone) zamiast EMPTY!
            </text>
          )}
        </svg>
      ) : (
        <>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[600px] mx-auto block rounded border border-[var(--border)] bg-[var(--bg)]">
            {[2, 4, 6, 8, 10, 12].map((yv) => (
              <g key={yv}>
                <line x1={padL} y1={toY(yv)} x2={W - padR} y2={toY(yv)} stroke="var(--border)" strokeWidth="0.8" />
                <text x={padL - 6} y={toY(yv) + 3} textAnchor="end" fontSize="9.5" fontFamily="monospace" fill="var(--text-muted)">{yv}</text>
              </g>
            ))}
            <line x1={padL} y1={padT + plotH} x2={W - padR} y2={padT + plotH} stroke="var(--text-muted)" strokeWidth="1.2" />
            <line x1={padL} y1={padT} x2={padL} y2={padT + plotH} stroke="var(--text-muted)" strokeWidth="1.2" />

            {[0.2, 0.4, 0.6, 0.8, 0.9].map((av) => (
              <text key={av} x={toX(av)} y={H - 12} textAnchor="middle" fontSize="9.5" fontFamily="monospace" fill="var(--text-muted)">{av}</text>
            ))}

            {/* 1/(1-alpha) unsuccessful open addressing */}
            <polyline
              fill="none"
              stroke={CRIMSON}
              strokeWidth="2.4"
              points={Array.from({ length: 85 }, (_, i) => {
                const a = 0.05 + i * 0.01;
                return `${toX(a).toFixed(1)},${toY(1 / (1 - a)).toFixed(1)}`;
              }).join(' ')}
            />
            {/* successful open addressing */}
            <polyline
              fill="none"
              stroke={NAVY}
              strokeWidth="2.2"
              points={Array.from({ length: 85 }, (_, i) => {
                const a = 0.05 + i * 0.01;
                const y = (1 / a) * Math.log(1 / (1 - a)) + 1 / a;
                return `${toX(a).toFixed(1)},${toY(y).toFixed(1)}`;
              }).join(' ')}
            />
            {/* chaining 1 + alpha */}
            <polyline
              fill="none"
              stroke={FOREST}
              strokeWidth="2"
              strokeDasharray="5 3"
              points={Array.from({ length: 85 }, (_, i) => {
                const a = 0.05 + i * 0.01;
                return `${toX(a).toFixed(1)},${toY(1 + a).toFixed(1)}`;
              }).join(' ')}
            />

            <line x1={toX(alpha)} y1={padT} x2={toX(alpha)} y2={padT + plotH} stroke={AMBER} strokeDasharray="3 3" strokeWidth="1.4" />
            <circle cx={toX(alpha)} cy={toY(unsucc)} r="4" fill={CRIMSON} />
            <circle cx={toX(alpha)} cy={toY(succ)} r="4" fill={NAVY} />
            <circle cx={toX(alpha)} cy={toY(1 + alpha)} r="4" fill={FOREST} />

            <text x="64" y="34" fontSize="10" fontFamily="monospace" fontWeight="700" fill={CRIMSON}>— Nieudane (otwarte): 1/(1−α)</text>
            <text x="64" y="49" fontSize="10" fontFamily="monospace" fontWeight="700" fill={NAVY}>— Udane (otwarte): (1/α)ln(1/(1−α)) + 1/α</text>
            <text x="64" y="64" fontSize="10" fontFamily="monospace" fontWeight="700" fill={FOREST}>-- Łańcuchowanie: 1 + α</text>
          </svg>
          <div className="text-xs font-mono text-[var(--text-secondary)] px-3 py-2 rounded bg-[var(--bg-subtle)] border border-[var(--border)]">
            Dla α = {alpha.toFixed(2)}: otwarte nieudane ≤ {fmt(unsucc, 2)} prób · otwarte udane ≤ {fmt(succ, 2)} · łańcuchowanie ≈ {fmt(1 + alpha, 2)}
          </div>
        </>
      )}
    </div>
  );
}

// ============================================================================
// 6. Trees: Traversals, AVL Rotations & 1-Indexed Binary Heap (aisd-tree-traversals)
// ============================================================================
function AisdTreeTraversalsDiagram() {
  const [mode, setMode] = useState('traverse'); // 'traverse' | 'avl' | 'heap'
  const [order, setOrder] = useState('inorder'); // 'preorder' | 'inorder' | 'postorder' | 'bfs'
  const [avlRotated, setAvlRotated] = useState(false);

  const nodes = [
    { id: 10, x: 280, y: 40, parent: null },
    { id: 5, x: 160, y: 105, parent: 10 },
    { id: 15, x: 400, y: 105, parent: 10 },
    { id: 2, x: 100, y: 170, parent: 5 },
    { id: 7, x: 220, y: 170, parent: 5 },
    { id: 12, x: 340, y: 170, parent: 15 },
    { id: 18, x: 460, y: 170, parent: 15 },
  ];

  const seqMap = {
    preorder: [10, 5, 2, 7, 15, 12, 18],
    inorder: [2, 5, 7, 10, 12, 15, 18],
    postorder: [2, 7, 5, 12, 18, 15, 10],
    bfs: [10, 5, 15, 2, 7, 12, 18],
  };

  const seq = seqMap[order];

  // 1-indexed Max-Heap from Lecture 5 sl. 36: [8, 5, 6, 4, 4, 1, 3, 2]
  const heapArr = [null, 8, 5, 6, 4, 4, 1, 3, 2];
  const heapPos = {
    1: { x: 280, y: 34 },
    2: { x: 160, y: 84 },
    3: { x: 400, y: 84 },
    4: { x: 100, y: 132 },
    5: { x: 220, y: 132 },
    6: { x: 340, y: 132 },
    7: { x: 460, y: 132 },
    8: { x: 70, y: 176 },
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'traverse', label: 'Trawersowanie BST (DFS / BFS)' },
            { id: 'avl', label: 'Rotacja AVL (bf = hL − hR)' },
            { id: 'heap', label: 'Kopiec 1-indeksowany ↔ A[1..8]' },
          ].map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              className={`px-2.5 py-1 rounded text-xs font-medium border cursor-pointer ${
                mode === m.id
                  ? 'bg-[var(--accent)] text-white dark:text-[#0f141c] border-[var(--accent)]'
                  : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border)]'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {mode === 'traverse' && (
          <div className="flex flex-wrap gap-1">
            {[
              { id: 'preorder', label: 'Pre (VLR)' },
              { id: 'inorder', label: 'In (LVR)' },
              { id: 'postorder', label: 'Post (LRV)' },
              { id: 'bfs', label: 'BFS' },
            ].map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => setOrder(o.id)}
                className={`px-2 py-1 rounded text-[11px] font-mono border cursor-pointer ${
                  order === o.id
                    ? 'bg-[var(--accent-soft)] text-[var(--accent-text)] border-[var(--accent)] font-semibold'
                    : 'bg-[var(--bg-elevated)] text-[var(--text-muted)] border-[var(--border)]'
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        )}

        {mode === 'avl' && (
          <button
            type="button"
            onClick={() => setAvlRotated((v) => !v)}
            className="btn-secondary !py-1 !px-3 text-xs"
          >
            {avlRotated ? 'Pokaż stan przed rotacją (bf = −2)' : 'Wykonaj rotację w lewo (RR) →'}
          </button>
        )}
      </div>

      {mode === 'traverse' && (
        <>
          <svg viewBox="0 0 560 205" className="w-full max-w-[600px] mx-auto block rounded border border-[var(--border)] bg-[var(--bg)]">
            {nodes.filter((n) => n.parent !== null).map((n) => {
              const p = nodes.find((x) => x.id === n.parent);
              return <line key={n.id} x1={p.x} y1={p.y} x2={n.x} y2={n.y} stroke="var(--border-strong)" strokeWidth="1.8" />;
            })}
            {nodes.map((n) => {
              const visitOrder = seq.indexOf(n.id) + 1;
              return (
                <g key={n.id}>
                  <circle cx={n.x} cy={n.y} r="20" fill="var(--bg-elevated)" stroke={NAVY} strokeWidth="2" />
                  <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize="13" fontFamily="monospace" fontWeight="700" fill="var(--text)">{n.id}</text>
                  <circle cx={n.x + 17} cy={n.y - 16} r="9" fill={CRIMSON} />
                  <text x={n.x + 17} y={n.y - 12.5} textAnchor="middle" fontSize="9.5" fontFamily="monospace" fontWeight="700" fill="#fff">{visitOrder}</text>
                </g>
              );
            })}
          </svg>
          <div className="text-xs font-mono text-[var(--text-secondary)] px-3 py-2 rounded bg-[var(--bg-subtle)] border border-[var(--border)]">
            Kolejność odwiedzin ({order.toUpperCase()}): <strong className="text-[var(--text)]">{seq.join(' → ')}</strong>
            {order === 'inorder' ? '  (posortowane rosnąco!)' : ''}
          </div>
        </>
      )}

      {mode === 'avl' && (
        <svg viewBox="0 0 560 215" className="w-full max-w-[600px] mx-auto block rounded border border-[var(--border)] bg-[var(--bg)]">
          {!avlRotated ? (
            <>
              <text x="20" y="22" fontSize="11" fontWeight="700" fill={CRIMSON}>Przed rotacją (przypadek RR: bf(10) = 0 − 2 = −2)</text>
              <line x1="210" y1="54" x2="290" y2="112" stroke="var(--border-strong)" strokeWidth="2" />
              <line x1="290" y1="112" x2="370" y2="170" stroke="var(--border-strong)" strokeWidth="2" />
              <line x1="290" y1="112" x2="236" y2="170" stroke={AMBER} strokeDasharray="4 3" strokeWidth="1.6" />
              {[
                { k: 10, x: 210, y: 54, bf: '−2', bad: true },
                { k: 20, x: 290, y: 112, bf: '−1', bad: false },
                { k: 30, x: 370, y: 170, bf: '0', bad: false },
              ].map((nd) => (
                <g key={nd.k}>
                  <circle cx={nd.x} cy={nd.y} r="20" fill={nd.bad ? 'var(--danger-soft)' : 'var(--bg-elevated)'} stroke={nd.bad ? CRIMSON : NAVY} strokeWidth="2" />
                  <text x={nd.x} y={nd.y + 5} textAnchor="middle" fontSize="13" fontFamily="monospace" fontWeight="700" fill="var(--text)">{nd.k}</text>
                  <text x={nd.x + 28} y={nd.y + 4} fontSize="10" fontFamily="monospace" fontWeight="700" fill={nd.bad ? CRIMSON : 'var(--text-muted)'}>bf={nd.bf}</text>
                </g>
              ))}
              <rect x="216" y="156" width="38" height="24" rx="3" fill="var(--warning-soft)" stroke={AMBER} strokeWidth="1.2" />
              <text x="235" y="172" textAnchor="middle" fontSize="10" fontFamily="monospace" fill={AMBER}>T₂</text>
              <text x="20" y="198" fontSize="10" fontFamily="monospace" fill="var(--text-muted)">In-order: 10, T₂, 20, 30 (po rotacji w lewo poddrzewo T₂ przejdzie jako prawe dziecko 10)</text>
            </>
          ) : (
            <>
              <text x="20" y="22" fontSize="11" fontWeight="700" fill={FOREST}>Po pojedynczej rotacji w lewo (wszystkie |bf| ≤ 1 ✓)</text>
              <line x1="280" y1="54" x2="180" y2="118" stroke="var(--border-strong)" strokeWidth="2" />
              <line x1="280" y1="54" x2="380" y2="118" stroke="var(--border-strong)" strokeWidth="2" />
              <line x1="180" y1="118" x2="232" y2="170" stroke={AMBER} strokeDasharray="4 3" strokeWidth="1.6" />
              {[
                { k: 20, x: 280, y: 54, bf: '0' },
                { k: 10, x: 180, y: 118, bf: '0' },
                { k: 30, x: 380, y: 118, bf: '0' },
              ].map((nd) => (
                <g key={nd.k}>
                  <circle cx={nd.x} cy={nd.y} r="20" fill="var(--success-soft)" stroke={FOREST} strokeWidth="2" />
                  <text x={nd.x} y={nd.y + 5} textAnchor="middle" fontSize="13" fontFamily="monospace" fontWeight="700" fill="var(--text)">{nd.k}</text>
                  <text x={nd.x + 28} y={nd.y + 4} fontSize="10" fontFamily="monospace" fontWeight="700" fill={FOREST}>bf={nd.bf}</text>
                </g>
              ))}
              <rect x="214" y="156" width="38" height="24" rx="3" fill="var(--warning-soft)" stroke={AMBER} strokeWidth="1.2" />
              <text x="233" y="172" textAnchor="middle" fontSize="10" fontFamily="monospace" fill={AMBER}>T₂</text>
              <text x="20" y="200" fontSize="10" fontFamily="monospace" fill={FOREST}>In-order niezmienione: 10, T₂, 20, 30 — koszt O(1) (przepisanie 2 wskaźników)!</text>
            </>
          )}
        </svg>
      )}

      {mode === 'heap' && (
        <div className="space-y-2.5">
          <svg viewBox="0 0 560 205" className="w-full max-w-[600px] mx-auto block rounded border border-[var(--border)] bg-[var(--bg)]">
            {[2, 3, 4, 5, 6, 7, 8].map((i) => {
              const p = Math.floor(i / 2);
              return (
                <line
                  key={i}
                  x1={heapPos[p].x}
                  y1={heapPos[p].y}
                  x2={heapPos[i].x}
                  y2={heapPos[i].y}
                  stroke="var(--border-strong)"
                  strokeWidth="1.6"
                />
              );
            })}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <g key={i}>
                <circle cx={heapPos[i].x} cy={heapPos[i].y} r="17" fill={i === 1 ? 'var(--accent-soft)' : 'var(--bg-elevated)'} stroke={i === 1 ? NAVY : 'var(--border-strong)'} strokeWidth={i === 1 ? '2.2' : '1.5'} />
                <text x={heapPos[i].x} y={heapPos[i].y + 5} textAnchor="middle" fontSize="12.5" fontFamily="monospace" fontWeight="700" fill="var(--text)">{heapArr[i]}</text>
                <text x={heapPos[i].x + 22} y={heapPos[i].y - 10} fontSize="9.5" fontFamily="monospace" fill={CRIMSON}>i={i}</text>
              </g>
            ))}
          </svg>
          <div className="grid grid-cols-9 gap-1 text-center text-xs font-mono">
            {heapArr.map((v, idx) => (
              <div key={idx} className={`py-1.5 rounded border ${idx === 0 ? 'bg-[var(--bg-subtle)] text-[var(--text-muted)] border-dashed border-[var(--border)]' : 'bg-[var(--bg-elevated)] border-[var(--border-strong)]'}`}>
                <div className="text-[9.5px] text-[var(--text-muted)]">A[{idx}]</div>
                <div className="font-bold text-[var(--text)]">{idx === 0 ? '—' : v}</div>
              </div>
            ))}
          </div>
          <div className="text-[11px] font-mono text-[var(--text-muted)]">
            Indeksowanie 1..n (W5): rodzic = ⌊i/2⌋, lewe = 2i, prawe = 2i+1. Np. A[2] = 5 ma dzieci A[4] = 4 i A[5] = 4.
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 7. Nonlinear Equation Root-Finding Plot (aisd-root-finding)
// ============================================================================
function AisdRootFindingDiagram() {
  const [method, setMethod] = useState('newton'); // 'bisection' | 'falsi' | 'newton'
  const [iter, setIter] = useState(2);

  // Lecture 6 cubic: f(x) = x^3 - 2x^2 + x - 5, f'(x) = 3x^2 - 4x + 1, exact root ~ 2.43353
  const f = (x) => x * x * x - 2 * x * x + x - 5;
  const df = (x) => 3 * x * x - 4 * x + 1;

  const trace = useMemo(() => {
    const out = [];
    if (method === 'bisection') {
      let a = 1;
      let b = 4;
      for (let k = 1; k <= 6; k++) {
        const c = (a + b) / 2;
        out.push({ k, a, b, x: c, fx: f(c) });
        if (f(a) * f(c) < 0) b = c;
        else a = c;
      }
    } else if (method === 'falsi') {
      let a = 1;
      let b = 4;
      for (let k = 1; k <= 6; k++) {
        const c = (a * f(b) - b * f(a)) / (f(b) - f(a));
        out.push({ k, a, b, x: c, fx: f(c) });
        if (f(a) * f(c) < 0) b = c;
        else a = c;
      }
    } else {
      let x = 3.5;
      for (let k = 1; k <= 5; k++) {
        const next = x - f(x) / df(x);
        out.push({ k, prev: x, x: next, fx: f(next) });
        x = next;
      }
    }
    return out;
  }, [method]);

  const st = trace[Math.min(iter - 1, trace.length - 1)];

  const W = 560;
  const H = 250;
  const padL = 44;
  const padR = 16;
  const padT = 16;
  const padB = 30;
  const xMin = 0.5;
  const xMax = 4.2;
  const yMin = -10;
  const yMax = 35;

  const toX = (x) => padL + ((x - xMin) / (xMax - xMin)) * (W - padL - padR);
  const toY = (y) => padT + (1 - (Math.max(yMin, Math.min(yMax, y)) - yMin) / (yMax - yMin)) * (H - padT - padB);

  const curvePts = Array.from({ length: 120 }, (_, i) => {
    const x = xMin + (i / 119) * (xMax - xMin);
    return `${toX(x).toFixed(1)},${toY(f(x)).toFixed(1)}`;
  }).join(' ');

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'bisection', label: 'Bisekcja (p = 1)' },
            { id: 'falsi', label: 'Regula falsi' },
            { id: 'newton', label: 'Newton–Raphson (p = 2)' },
          ].map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                setMethod(m.id);
                setIter(1);
              }}
              className={`px-2.5 py-1 rounded text-xs font-medium border cursor-pointer ${
                method === m.id
                  ? 'bg-[var(--accent)] text-white dark:text-[#0f141c] border-[var(--accent)]'
                  : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border)]'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-xs font-mono">
          Iteracja k = {st.k}
          <input type="range" min="1" max={trace.length} step="1" value={Math.min(iter, trace.length)} onChange={(e) => setIter(Number(e.target.value))} className="w-24 accent-[var(--accent)]" />
        </label>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[600px] mx-auto block rounded border border-[var(--border)] bg-[var(--bg)]">
        {/* X-axis (y = 0) */}
        <line x1={padL} y1={toY(0)} x2={W - padR} y2={toY(0)} stroke="var(--text-muted)" strokeWidth="1.2" />
        <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="var(--text-muted)" strokeWidth="1.2" />

        {[1, 2, 3, 4].map((xv) => (
          <text key={xv} x={toX(xv)} y={H - 10} textAnchor="middle" fontSize="9.5" fontFamily="monospace" fill="var(--text-muted)">{xv}</text>
        ))}
        {[-5, 0, 10, 20, 30].map((yv) => (
          <text key={yv} x={padL - 6} y={toY(yv) + 3} textAnchor="end" fontSize="9.5" fontFamily="monospace" fill="var(--text-muted)">{yv}</text>
        ))}

        {/* f(x) curve */}
        <polyline fill="none" stroke={NAVY} strokeWidth="2.3" points={curvePts} />

        {/* Exact root marker */}
        <circle cx={toX(2.43353)} cy={toY(0)} r="3.5" fill={FOREST} />

        {/* Method geometry */}
        {(method === 'bisection' || method === 'falsi') && (
          <>
            <rect x={toX(st.a)} y={padT} width={Math.max(2, toX(st.b) - toX(st.a))} height={H - padT - padB} fill={NAVY} opacity="0.08" />
            {method === 'falsi' && (
              <line x1={toX(st.a)} y1={toY(f(st.a))} x2={toX(st.b)} y2={toY(f(st.b))} stroke={AMBER} strokeWidth="1.8" strokeDasharray="4 3" />
            )}
            <circle cx={toX(st.a)} cy={toY(f(st.a))} r="3.5" fill={NAVY} />
            <circle cx={toX(st.b)} cy={toY(f(st.b))} r="3.5" fill={NAVY} />
            <line x1={toX(st.x)} y1={toY(0)} x2={toX(st.x)} y2={toY(st.fx)} stroke={CRIMSON} strokeDasharray="3 2" strokeWidth="1.4" />
            <circle cx={toX(st.x)} cy={toY(0)} r="4.5" fill={CRIMSON} />
          </>
        )}

        {method === 'newton' && (
          <>
            <line x1={toX(st.prev)} y1={toY(f(st.prev))} x2={toX(st.x)} y2={toY(0)} stroke={CRIMSON} strokeWidth="1.9" />
            <line x1={toX(st.prev)} y1={toY(0)} x2={toX(st.prev)} y2={toY(f(st.prev))} stroke="var(--text-muted)" strokeDasharray="3 3" strokeWidth="1.2" />
            <circle cx={toX(st.prev)} cy={toY(f(st.prev))} r="4" fill={AMBER} />
            <circle cx={toX(st.x)} cy={toY(0)} r="4.5" fill={CRIMSON} />
          </>
        )}

        <text x="56" y="30" fontSize="10.5" fontFamily="monospace" fontWeight="700" fill={NAVY}>
          f(x) = x³ − 2x² + x − 5   (f(4) = 31, pierwiastek x* ≈ 2,4335)
        </text>
      </svg>

      <div className="text-xs font-mono text-[var(--text-secondary)] px-3 py-2 rounded bg-[var(--bg-subtle)] border border-[var(--border)]">
        Iteracja {st.k}: przybliżenie x = <strong className="text-[var(--text)]">{st.x.toFixed(5)}</strong> · f(x) = {st.fx.toExponential(2)} · |x − x*| = {Math.abs(st.x - 2.433531).toExponential(2)}
      </div>
    </div>
  );
}

// ============================================================================
// 8. Numerical Differentiation (MRS) & Golden Section Search (aisd-numeric-diff)
// ============================================================================
function AisdNumericDiffDiagram() {
  const [mode, setMode] = useState('mrs'); // 'mrs' | 'golden'
  const [hExp, setHExp] = useState(-3); // 10^hExp

  const x0 = 1.0;
  const exact = Math.cos(x0); // d/dx sin(x) at x=1
  const h = Math.pow(10, hExp);
  const fwd = (Math.sin(x0 + h) - Math.sin(x0)) / h;
  const cen = (Math.sin(x0 + h) - Math.sin(x0 - h)) / (2 * h);
  const errFwd = Math.abs(fwd - exact);
  const errCen = Math.abs(cen - exact);

  // Precompute U-curve points for log10(h) from -1 to -15
  const uExps = Array.from({ length: 29 }, (_, i) => -1 - i * 0.5);
  const W = 560;
  const H = 235;
  const padL = 52;
  const padR = 18;
  const padT = 18;
  const padB = 34;

  const toX = (e) => padL + ((-e - 1) / 14) * (W - padL - padR); // left = 10^-1, right = 10^-15
  const toY = (logErr) => {
    const clamped = Math.max(-13, Math.min(0, logErr));
    return padT + ((0 - clamped) / 13) * (H - padT - padB);
  };

  const fwdPts = uExps.map((e) => {
    const hh = Math.pow(10, e);
    const err = Math.max(1e-13, Math.abs((Math.sin(x0 + hh) - Math.sin(x0)) / hh - exact));
    return `${toX(e).toFixed(1)},${toY(Math.log10(err)).toFixed(1)}`;
  }).join(' ');

  const cenPts = uExps.map((e) => {
    const hh = Math.pow(10, e);
    const err = Math.max(1e-13, Math.abs((Math.sin(x0 + hh) - Math.sin(x0 - hh)) / (2 * hh) - exact));
    return `${toX(e).toFixed(1)},${toY(Math.log10(err)).toFixed(1)}`;
  }).join(' ');

  const alpha = (Math.sqrt(5) - 1) / 2;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setMode('mrs')}
            className={`px-2.5 py-1 rounded text-xs font-medium border cursor-pointer ${
              mode === 'mrs'
                ? 'bg-[var(--accent)] text-white dark:text-[#0f141c] border-[var(--accent)]'
                : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border)]'
            }`}
          >
            Krzywa U: błąd obcięcia vs zaokrągleń (MRS)
          </button>
          <button
            type="button"
            onClick={() => setMode('golden')}
            className={`px-2.5 py-1 rounded text-xs font-medium border cursor-pointer ${
              mode === 'golden'
                ? 'bg-[var(--accent)] text-white dark:text-[#0f141c] border-[var(--accent)]'
                : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border)]'
            }`}
          >
            Złoty podział (α ≈ 0,618034)
          </button>
        </div>

        {mode === 'mrs' && (
          <label className="flex items-center gap-2 text-xs font-mono">
            h = 10^{hExp}
            <input type="range" min="-15" max="-1" step="1" value={hExp} onChange={(e) => setHExp(Number(e.target.value))} className="w-28 accent-[var(--accent)]" />
          </label>
        )}
      </div>

      {mode === 'mrs' ? (
        <>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[600px] mx-auto block rounded border border-[var(--border)] bg-[var(--bg)]">
            {[-2, -5, -8, -11].map((le) => (
              <g key={le}>
                <line x1={padL} y1={toY(le)} x2={W - padR} y2={toY(le)} stroke="var(--border)" strokeWidth="0.8" />
                <text x={padL - 6} y={toY(le) + 3} textAnchor="end" fontSize="9.5" fontFamily="monospace" fill="var(--text-muted)">10^{le}</text>
              </g>
            ))}
            <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke="var(--text-muted)" strokeWidth="1.2" />
            <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="var(--text-muted)" strokeWidth="1.2" />
            {[-1, -4, -7, -10, -13, -15].map((e) => (
              <text key={e} x={toX(e)} y={H - 12} textAnchor="middle" fontSize="9.5" fontFamily="monospace" fill="var(--text-muted)">10^{e}</text>
            ))}

            <polyline fill="none" stroke={AMBER} strokeWidth="2.2" points={fwdPts} />
            <polyline fill="none" stroke={FOREST} strokeWidth="2.4" points={cenPts} />
            <line x1={toX(hExp)} y1={padT} x2={toX(hExp)} y2={H - padB} stroke={CRIMSON} strokeDasharray="3 3" strokeWidth="1.4" />

            <text x="64" y="32" fontSize="10" fontFamily="monospace" fontWeight="700" fill={AMBER}>— Różnica przednia O(h)</text>
            <text x="64" y="47" fontSize="10" fontFamily="monospace" fontWeight="700" fill={FOREST}>— Różnica centralna O(h²) — minimum przy h ≈ 10⁻⁵..10⁻⁶!</text>
            <text x="360" y="192" fontSize="9.5" fontFamily="monospace" fill={CRIMSON}>← rośnie błąd zaokrągleń!</text>
          </svg>
          <div className="text-xs font-mono text-[var(--text-secondary)] px-3 py-2 rounded bg-[var(--bg-subtle)] border border-[var(--border)]">
            Dla f(x)=sin(x) w x₀=1 (h=10^{hExp}): błąd przedni = {errFwd.toExponential(2)} · błąd centralny = <strong className="text-[var(--text)]">{errCen.toExponential(2)}</strong>
          </div>
        </>
      ) : (
        <svg viewBox="0 0 580 190" className="w-full max-w-[620px] mx-auto block rounded border border-[var(--border)] bg-[var(--bg)]">
          <text x="20" y="24" fontSize="11.5" fontWeight="700" fill={NAVY}>
            Metoda złotego podziału (α = (√5 − 1)/2 ≈ {alpha.toFixed(6)}, α² = 1 − α)
          </text>
          {/* Step 1 bar */}
          <text x="20" y="54" fontSize="10" fontFamily="monospace" fill="var(--text-muted)">Krok k:</text>
          <line x1="84" y1="50" x2="544" y2="50" stroke={NAVY} strokeWidth="3" />
          {[
            { lbl: 'a', x: 84, c: NAVY },
            { lbl: 'x₁', x: 84 + (1 - alpha) * 460, c: FOREST },
            { lbl: 'x₂', x: 84 + alpha * 460, c: CRIMSON },
            { lbl: 'b', x: 544, c: NAVY },
          ].map((pt) => (
            <g key={pt.lbl}>
              <circle cx={pt.x} cy="50" r="5" fill={pt.c} />
              <text x={pt.x} y="70" textAnchor="middle" fontSize="10.5" fontFamily="monospace" fontWeight="700" fill={pt.c}>{pt.lbl}</text>
            </g>
          ))}

          {/* Drop [x2, b] and show reuse */}
          <rect x={84 + alpha * 460} y="40" width={460 * (1 - alpha)} height="20" fill={CRIMSON} opacity="0.14" />
          <text x={84 + alpha * 460 + 88} y="36" textAnchor="middle" fontSize="9.5" fontFamily="monospace" fill={CRIMSON}>odrzucone (f(x₁) &lt; f(x₂))</text>

          {/* Reuse dashed vertical line */}
          <line x1={84 + (1 - alpha) * 460} y1="76" x2={84 + (1 - alpha) * 460} y2="122" stroke={FOREST} strokeDasharray="4 3" strokeWidth="1.8" />
          <text x={84 + (1 - alpha) * 460 + 8} y="102" fontSize="10" fontFamily="monospace" fontWeight="700" fill={FOREST}>stare x₁ staje się nowym x₂!</text>

          {/* Step 2 bar */}
          <text x="20" y="132" fontSize="10" fontFamily="monospace" fill="var(--text-muted)">Krok k+1:</text>
          <line x1="84" y1="128" x2={84 + alpha * 460} y2="128" stroke={NAVY} strokeWidth="3" />
          {[
            { lbl: 'a', x: 84, c: NAVY },
            { lbl: 'nowe x₁', x: 84 + (1 - alpha) * alpha * 460, c: AMBER },
            { lbl: 'x₂ (=stare x₁)', x: 84 + (1 - alpha) * 460, c: FOREST },
            { lbl: 'nowe b', x: 84 + alpha * 460, c: NAVY },
          ].map((pt) => (
            <g key={pt.lbl}>
              <circle cx={pt.x} cy="128" r="5" fill={pt.c} />
              <text x={pt.x} y="150" textAnchor="middle" fontSize="9.5" fontFamily="monospace" fontWeight="700" fill={pt.c}>{pt.lbl}</text>
            </g>
          ))}
          <text x="20" y="176" fontSize="10" fontFamily="monospace" fill="var(--text-secondary)">
            Oszczędność 50%: w każdej kolejnej iteracji obliczamy tylko 1 nową wartość f(x) zamiast 2!
          </text>
        </svg>
      )}
    </div>
  );
}

export const AISD_DIAGRAM_REGISTRY = {
  'aisd-flowchart-control': { Component: AisdFlowchartControlDiagram },
  'aisd-complexity-growth': { Component: AisdComplexityGrowthDiagram },
  'aisd-linear-structures': { Component: AisdLinearStructuresDiagram },
  'aisd-sorting-steps': { Component: AisdSortingStepsDiagram },
  'aisd-hash-table': { Component: AisdHashTableDiagram },
  'aisd-tree-traversals': { Component: AisdTreeTraversalsDiagram },
  'aisd-root-finding': { Component: AisdRootFindingDiagram },
  'aisd-numeric-diff': { Component: AisdNumericDiffDiagram },
};
