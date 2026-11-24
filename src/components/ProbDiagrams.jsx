import React, { useMemo, useState } from 'react';

const INK = {
  primary: '#2563eb',
  crimson: '#be123c',
  forest: '#15803d',
  ochre: '#b45309',
  violet: '#6d28d9',
  muted: '#64748b',
};

function fact(n) {
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

function logFact(n) {
  let s = 0;
  for (let i = 2; i <= n; i++) s += Math.log(i);
  return s;
}

function nCk(n, k) {
  if (k < 0 || k > n) return 0;
  return Math.round(Math.exp(logFact(n) - logFact(k) - logFact(n - k)));
}

function logNCk(n, k) {
  if (k < 0 || k > n) return -Infinity;
  return logFact(n) - logFact(k) - logFact(n - k);
}

function binomPmf(n, p, k) {
  if (k < 0 || k > n) return 0;
  if (p === 0) return k === 0 ? 1 : 0;
  if (p === 1) return k === n ? 1 : 0;
  return Math.exp(logNCk(n, k) + k * Math.log(p) + (n - k) * Math.log(1 - p));
}

function poissonPmf(lam, k) {
  if (k < 0) return 0;
  return Math.exp(k * Math.log(lam) - lam - logFact(k));
}

function hypergeomPmf(N, m, n, x) {
  if (x < Math.max(0, n - (N - m)) || x > Math.min(n, m)) return 0;
  return Math.exp(logNCk(m, x) + logNCk(N - m, n - x) - logNCk(N, n));
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
              ? 'bg-[var(--accent)] text-white dark:text-[#0f141c] border-[var(--accent)] font-semibold'
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
// 1. Descriptive Stats & Correlation (Wykład 00 — połączenia 7:00–16:00)
// ============================================================================
function DescriptiveStatsDiagram() {
  const [mode, setMode] = useState('office');
  const hours = ['7–8', '8–9', '9–10', '10–11', '11–12', '12–13', '13–14', '14–15', '15–16'];
  const xData = [15, 19, 31, 43, 41, 24, 24, 21, 7];
  const yPos = [5, 34, 43, 44, 41, 34, 10, 7, 5]; // cor = +0.788
  const yNeg = [35, 31, 19, 7, 9, 26, 26, 29, 43]; // 50 - x, cor = -1.000

  const W = 560, H = 265;
  const pad = { l: 42, r: 20, t: 20, b: 36 };
  const plotW = W - pad.l - pad.r;
  const plotH = H - pad.t - pad.b;
  const maxVal = 50;
  const sy = (v) => pad.t + ((maxVal - v) / maxVal) * plotH;
  const mean = 25;
  const sigma = 11.025;

  const ySeries = mode === 'pos' ? yPos : mode === 'neg' ? yNeg : null;

  return (
    <div>
      <TabRow
        active={mode}
        onChange={setMode}
        items={[
          { id: 'office', label: 'Biuro X: x̄ = 25, pas x̄ ± σ (sl. 35–38)' },
          { id: 'pos', label: 'Korelacja +0,788: Biuro X vs Biuro Y (sl. 52)' },
          { id: 'neg', label: 'Korelacja −1,000: y = 50 − x (sl. 55)' },
        ]}
      />
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[275px] select-none">
        {[0, 10, 20, 30, 40, 50].map((v) => (
          <g key={v}>
            <line x1={pad.l} y1={sy(v)} x2={pad.l + plotW} y2={sy(v)} stroke="var(--border)" strokeWidth="0.75" />
            <text x={pad.l - 7} y={sy(v) + 3.5} textAnchor="end" fontSize="10" fontFamily="var(--font-mono)" fill="var(--text-muted)">
              {v}
            </text>
          </g>
        ))}

        {/* Mean ± sigma band */}
        {mode === 'office' && (
          <>
            <rect
              x={pad.l}
              y={sy(mean + sigma)}
              width={plotW}
              height={sy(mean - sigma) - sy(mean + sigma)}
              fill={INK.forest}
              fillOpacity="0.12"
            />
            <line x1={pad.l} y1={sy(mean)} x2={pad.l + plotW} y2={sy(mean)} stroke={INK.crimson} strokeDasharray="5 3" strokeWidth="1.6" />
            <text x={pad.l + plotW - 4} y={sy(mean) - 5} textAnchor="end" fontSize="10" fontFamily="var(--font-mono)" fill={INK.crimson} fontWeight="600">
              x̄ = 25 (pas x̄ ± σ: 14,0 – 36,0)
            </text>
          </>
        )}

        {/* Bars */}
        {xData.map((val, i) => {
          const slotW = plotW / hours.length;
          const cx = pad.l + i * slotW + slotW / 2;
          const bw = ySeries ? slotW * 0.34 : slotW * 0.56;
          return (
            <g key={i}>
              <rect
                x={ySeries ? cx - bw - 1 : cx - bw / 2}
                y={sy(val)}
                width={bw}
                height={sy(0) - sy(val)}
                fill={INK.primary}
                fillOpacity="0.82"
                rx="2"
              />
              {!ySeries && (
                <text x={cx} y={sy(val) - 5} textAnchor="middle" fontSize="9.5" fontFamily="var(--font-mono)" fill="var(--text-secondary)">
                  {val}
                </text>
              )}
              {ySeries && (
                <rect
                  x={cx + 1}
                  y={sy(ySeries[i])}
                  width={bw}
                  height={sy(0) - sy(ySeries[i])}
                  fill={mode === 'pos' ? INK.forest : INK.crimson}
                  fillOpacity="0.78"
                  rx="2"
                />
              )}
              <text x={cx} y={pad.t + plotH + 16} textAnchor="middle" fontSize="9.5" fontFamily="var(--font-mono)" fill="var(--text-muted)">
                {hours[i]}
              </text>
            </g>
          );
        })}
        <rect x={pad.l} y={pad.t} width={plotW} height={plotH} fill="none" stroke="var(--border)" />
      </svg>
      <div className="flex flex-wrap gap-4 text-xs font-mono text-[var(--text-muted)] mt-2">
        {mode === 'office' && (
          <span>x̄ = 25 · σ² = 121,56 · σ = 11,025 · V = 0,441 · asymetria g = +0,251</span>
        )}
        {mode === 'pos' && (
          <span style={{ color: INK.forest }}>cor(x, y) = +0,788 — ruch w obu biurach rośnie i opada w tych samych godzinach</span>
        )}
        {mode === 'neg' && (
          <span style={{ color: INK.crimson }}>cor(x, y) = −1,000 — lustrzane odbicie yᵢ = 50 − xᵢ (asymetria gᵧ = −0,251)</span>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 2. Venn Algebra & 6 Combinatorics Calculator (Wykład 01)
// ============================================================================
function VennCombinatoricsDiagram() {
  const [tab, setTab] = useState('venn');
  const [op, setOp] = useState('union');
  const [n, setN] = useState(4);
  const [k, setK] = useState(2);

  const combRows = useMemo(() => {
    const safeK = Math.min(k, n);
    return [
      { name: 'Permutacje bez powtórzeń Pₙ', order: 'Tak (wszystkie)', rep: 'Nie', formula: 'n!', val: fact(n) },
      { name: 'Wariacje bez powtórzeń Vₙᵏ', order: 'Tak', rep: 'Nie', formula: 'n! / (n−k)!', val: Math.round(fact(n) / fact(n - safeK)) },
      { name: 'Wariacje z powtórzeniami V̄ₙᵏ', order: 'Tak', rep: 'Tak', formula: 'nᵏ', val: n ** safeK },
      { name: 'Kombinacje bez powtórzeń Cₙᵏ', order: 'Nie', rep: 'Nie', formula: 'n! / (k!(n−k)!)', val: nCk(n, safeK) },
      { name: 'Kombinacje z powtórzeniami C̄ₙᵏ', order: 'Nie', rep: 'Tak', formula: '(n+k−1)! / (k!(n−1)!)', val: nCk(n + safeK - 1, safeK) },
    ];
  }, [n, k]);

  return (
    <div>
      <TabRow
        active={tab}
        onChange={setTab}
        items={[
          { id: 'venn', label: 'Diagram Venna (algebra zdarzeń)' },
          { id: 'comb', label: 'Kalkulator 6 modeli kombinatoryki' },
        ]}
      />
      {tab === 'venn' ? (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'union', l: 'Suma X ∪ Y' },
              { id: 'inter', l: 'Iloczyn X ∩ Y' },
              { id: 'diff', l: 'Różnica X \\ Y' },
              { id: 'comp', l: 'Dopełnienie X̄' },
              { id: 'partition', l: 'Układ zupełny H₁…H₄' },
            ].map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setOp(b.id)}
                className={`px-2 py-1 text-xs rounded border cursor-pointer ${
                  op === b.id ? 'bg-[var(--accent-soft)] border-[var(--accent)] text-[var(--accent-text)] font-semibold' : 'border-[var(--border)] bg-[var(--bg)]'
                }`}
              >
                {b.l}
              </button>
            ))}
          </div>
          <svg viewBox="0 0 460 200" className="w-full h-auto max-h-[210px] select-none">
            <defs>
              <clipPath id="venn-x">
                <circle cx="185" cy="105" r="64" />
              </clipPath>
              <clipPath id="venn-y">
                <circle cx="275" cy="105" r="64" />
              </clipPath>
            </defs>
            <rect
              x="25"
              y="16"
              width="410"
              height="170"
              rx="6"
              fill={op === 'comp' ? INK.primary : 'var(--bg)'}
              fillOpacity={op === 'comp' ? 0.16 : 1}
              stroke="var(--border-strong)"
              strokeWidth="1.5"
            />
            <text x="418" y="34" textAnchor="end" fontSize="13" fontFamily="var(--font-serif)" fontWeight="700" fill="var(--text-muted)">
              Ω
            </text>

            {op === 'partition' ? (
              <>
                {[0, 1, 2, 3].map((i) => {
                  const x0 = 25 + i * 102.5;
                  const cols = [INK.primary, INK.forest, INK.ochre, INK.crimson];
                  return (
                    <g key={i}>
                      <rect x={x0} y="16" width="102.5" height="170" fill={cols[i]} fillOpacity="0.14" stroke={cols[i]} strokeWidth="1.4" />
                      <text x={x0 + 51} y="106" textAnchor="middle" fontSize="14" fontWeight="700" fill={cols[i]}>
                        H{i + 1}
                      </text>
                    </g>
                  );
                })}
              </>
            ) : (
              <>
                {op === 'union' && (
                  <>
                    <circle cx="185" cy="105" r="64" fill={INK.primary} fillOpacity="0.22" />
                    <circle cx="275" cy="105" r="64" fill={INK.primary} fillOpacity="0.22" />
                  </>
                )}
                {op === 'inter' && (
                  <circle cx="275" cy="105" r="64" clipPath="url(#venn-x)" fill={INK.crimson} fillOpacity="0.34" />
                )}
                {op === 'diff' && (
                  <>
                    <circle cx="185" cy="105" r="64" fill={INK.forest} fillOpacity="0.26" />
                    <circle cx="275" cy="105" r="64" clipPath="url(#venn-x)" fill="var(--bg)" />
                  </>
                )}
                {op === 'comp' && <circle cx="185" cy="105" r="64" fill="var(--bg)" />}

                <circle cx="185" cy="105" r="64" fill="none" stroke={INK.primary} strokeWidth="2.2" />
                <circle cx="275" cy="105" r="64" fill="none" stroke={INK.crimson} strokeWidth="2.2" />
                <text x="155" y="109" textAnchor="middle" fontSize="14" fontWeight="700" fill={INK.primary}>X</text>
                <text x="305" y="109" textAnchor="middle" fontSize="14" fontWeight="700" fill={INK.crimson}>Y</text>
              </>
            )}
          </svg>
          <p className="text-xs font-mono text-[var(--text-secondary)] m-0">
            {op === 'union' && 'P(X ∪ Y) = P(X) + P(Y) − P(X ∩ Y)  (część wspólna odejmowana raz!)'}
            {op === 'inter' && 'X ∩ Y: oba zdarzenia zachodzą jednocześnie (dla rozłącznych = ∅)'}
            {op === 'diff' && 'P(X \\ Y) = P(X) − P(X ∩ Y)  (zaszło X, ale nie zaszło Y)'}
            {op === 'comp' && 'P(X̄) = 1 − P(X)  (wszystkie elementy Ω spoza zbioru X)'}
            {op === 'partition' && 'Układ zupełny: Hᵢ ∩ Hⱼ = ∅ oraz H₁ ∪ H₂ ∪ H₃ ∪ H₄ = Ω (∑ P(Hᵢ) = 1)'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-5 text-xs font-mono">
            <label className="flex items-center gap-2">
              <span>n = {n}</span>
              <input type="range" min="2" max="8" value={n} onChange={(e) => { const v = Number(e.target.value); setN(v); if (k > v) setK(v); }} className="w-28 accent-[var(--accent)]" />
            </label>
            <label className="flex items-center gap-2">
              <span>k = {Math.min(k, n)}</span>
              <input type="range" min="1" max={n} value={Math.min(k, n)} onChange={(e) => setK(Number(e.target.value))} className="w-28 accent-[var(--accent)]" />
            </label>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse font-mono">
              <thead>
                <tr className="border-b border-[var(--border-strong)] text-left text-[var(--text-muted)]">
                  <th className="py-1.5 pr-3">Model</th>
                  <th className="py-1.5 pr-3">Kolejność</th>
                  <th className="py-1.5 pr-3">Powt.</th>
                  <th className="py-1.5 pr-3">Wzór</th>
                  <th className="py-1.5 text-right">Wynik</th>
                </tr>
              </thead>
              <tbody>
                {combRows.map((r) => (
                  <tr key={r.name} className="border-b last:border-b-0 border-[var(--border)]">
                    <td className="py-1.5 pr-3 font-sans font-medium text-[var(--text)]">{r.name}</td>
                    <td className="py-1.5 pr-3 text-[var(--text-muted)]">{r.order}</td>
                    <td className="py-1.5 pr-3 text-[var(--text-muted)]">{r.rep}</td>
                    <td className="py-1.5 pr-3 text-[var(--text-secondary)]">{r.formula}</td>
                    <td className="py-1.5 text-right font-bold text-[var(--accent-text)]">{r.val.toLocaleString('pl-PL')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 3. Bayes Tree — 3 Urns Interactive (Wykład 02, Przykład 2)
// ============================================================================
function BayesTreeDiagram() {
  const [w1, setW1] = useState(4);
  const [w2, setW2] = useState(2);
  const [w3, setW3] = useState(3);
  const totalPerBox = 6;

  const pH = [1 / 3, 1 / 3, 1 / 3];
  const pYGivenH = [w1 / totalPerBox, w2 / totalPerBox, w3 / totalPerBox];
  const joints = pH.map((ph, i) => ph * pYGivenH[i]);
  const pY = joints.reduce((a, b) => a + b, 0);
  const post = joints.map((j) => (pY > 0 ? j / pY : 0));

  const ys = [46, 120, 194];
  const cols = [INK.primary, INK.ochre, INK.forest];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono">
        {[
          { label: 'Pudełko 1 (białe/6)', val: w1, set: setW1, col: cols[0] },
          { label: 'Pudełko 2 (białe/6)', val: w2, set: setW2, col: cols[1] },
          { label: 'Pudełko 3 (białe/6)', val: w3, set: setW3, col: cols[2] },
        ].map((b, idx) => (
          <label key={idx} className="p-2 rounded bg-[var(--bg)] border border-[var(--border)] flex flex-col gap-1">
            <span style={{ color: b.col }} className="font-semibold">{b.label}: {b.val}/6</span>
            <input type="range" min="0" max="6" value={b.val} onChange={(e) => b.set(Number(e.target.value))} className="accent-[var(--accent)]" />
          </label>
        ))}
      </div>

      <svg viewBox="0 0 560 238" className="w-full h-auto max-h-[250px] select-none">
        {/* Root */}
        <circle cx="44" cy="120" r="18" fill="var(--bg-subtle)" stroke="var(--border-strong)" strokeWidth="1.5" />
        <text x="44" y="124" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text)">Start</text>

        {ys.map((y, i) => (
          <g key={i}>
            {/* Root -> H_i */}
            <line x1="62" y1="120" x2="178" y2={y} stroke={cols[i]} strokeWidth="1.8" />
            <text x="116" y={(120 + y) / 2 - 5} textAnchor="middle" fontSize="10" fontFamily="var(--font-mono)" fill="var(--text-muted)">
              P(H{i + 1})=1/3
            </text>
            <rect x="178" y={y - 16} width="78" height="32" rx="4" fill="var(--bg-elevated)" stroke={cols[i]} strokeWidth="1.6" />
            <text x="217" y={y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={cols[i]}>
              Pudełko {i + 1}
            </text>

            {/* H_i -> Y (biała) */}
            <line x1="256" y1={y} x2="380" y2={y} stroke={cols[i]} strokeWidth="2.2" />
            <text x="318" y={y - 6} textAnchor="middle" fontSize="10" fontFamily="var(--font-mono)" fill={cols[i]}>
              P(Y|H{i + 1}) = {[w1, w2, w3][i]}/6
            </text>

            {/* Posterior bar */}
            <rect x="385" y={y - 15} width="160" height="30" rx="4" fill="var(--bg)" stroke="var(--border)" />
            <rect x="385" y={y - 15} width={Math.max(2, post[i] * 160)} height="30" rx="4" fill={cols[i]} fillOpacity="0.22" />
            <text x="465" y={y + 4} textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" fontWeight="700" fill={cols[i]}>
              P(H{i + 1}|Y) = {(post[i] * 100).toFixed(1)}%
            </text>
          </g>
        ))}
      </svg>

      <div className="text-xs font-mono p-2.5 rounded bg-[var(--bg)] border border-[var(--border)] flex flex-wrap justify-between gap-2">
        <span>Prawdopodobieństwo zupełne P(Y = biała): <strong>{pY.toFixed(4)}</strong> ({(pY * 100).toFixed(1)}%)</span>
        <span className="text-[var(--text-muted)]">Domyślny przykład z Wykładu 02 (4, 2, 3): P(Y) = 0,500, P(H₁|Y) = 44,4%</span>
      </div>
    </div>
  );
}

// ============================================================================
// 4. CDF, PDF, Truncated Quality Control & Mixed RV (Wykład 03)
// ============================================================================
function CdfPdfMixedDiagram() {
  const [tab, setTab] = useState('ex1');
  const W = 550, H = 250;
  const pad = { l: 42, r: 20, t: 20, b: 32 };
  const plotW = W - pad.l - pad.r;
  const plotH = H - pad.t - pad.b;

  const make = (xMin, xMax, yMin, yMax) => ({
    sx: (x) => pad.l + ((x - xMin) / (xMax - xMin)) * plotW,
    sy: (y) => pad.t + ((yMax - y) / (yMax - yMin)) * plotH,
  });

  return (
    <div>
      <TabRow
        active={tab}
        onChange={setTab}
        items={[
          { id: 'ex1', label: 'Przykład 1: f(x)=2x i P(0,25<X<0,5)' },
          { id: 'ex2', label: 'Przykład 2: Wykładniczy e⁻ˣ i 1−e⁻ˣ' },
          { id: 'ex4', label: 'Przykład 4: Kontrola jakości f(x|Y)' },
          { id: 'ex5', label: 'Przykład 5: Zmienna mieszana (pociąg)' },
        ]}
      />
      {tab === 'ex1' && (() => {
        const { sx, sy } = make(-0.15, 1.25, -0.1, 2.25);
        return (
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[255px] select-none">
            <rect x={pad.l} y={pad.t} width={plotW} height={plotH} fill="none" stroke="var(--border)" />
            <line x1={pad.l} y1={sy(0)} x2={pad.l + plotW} y2={sy(0)} stroke="var(--text-muted)" />
            <line x1={sx(0)} y1={pad.t} x2={sx(0)} y2={pad.t + plotH} stroke="var(--text-muted)" />
            {/* Shaded area 0.25..0.5 under f(x)=2x */}
            <polygon
              points={`${sx(0.25)},${sy(0)} ${sx(0.25)},${sy(0.5)} ${sx(0.5)},${sy(1.0)} ${sx(0.5)},${sy(0)}`}
              fill={INK.forest}
              fillOpacity="0.28"
              stroke={INK.forest}
              strokeWidth="1.2"
            />
            {/* f(x) = 2x */}
            <polyline points={`${sx(-0.15)},${sy(0)} ${sx(0)},${sy(0)} ${sx(1)},${sy(2)}`} fill="none" stroke={INK.primary} strokeWidth="2.6" />
            <line x1={sx(1)} y1={sy(0)} x2={sx(1.25)} y2={sy(0)} stroke={INK.primary} strokeWidth="2.6" />
            {/* F(x) = x^2 dashed */}
            <path
              d={Array.from({ length: 60 }, (_, i) => {
                const x = i / 59;
                return `${i === 0 ? 'M' : 'L'}${sx(x).toFixed(1)},${sy(x * x).toFixed(1)}`;
              }).join(' ')}
              fill="none"
              stroke={INK.crimson}
              strokeWidth="2"
              strokeDasharray="6 3"
            />
            <line x1={sx(1)} y1={sy(1)} x2={sx(1.25)} y2={sy(1)} stroke={INK.crimson} strokeWidth="2" strokeDasharray="6 3" />
            <text x={sx(0.38)} y={sy(0.25)} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={INK.forest}>P = 0,1875</text>
            <text x={sx(0.84)} y={sy(1.9)} fontSize="11" fontWeight="600" fill={INK.primary}>f(x) = 2x (osiąga 2 &gt; 1!)</text>
            <text x={sx(0.82)} y={sy(0.6)} fontSize="11" fill={INK.crimson}>F(x) = x²</text>
            {[0, 0.25, 0.5, 1].map((t) => (
              <text key={t} x={sx(t)} y={pad.t + plotH + 15} textAnchor="middle" fontSize="10" fontFamily="var(--font-mono)" fill="var(--text-muted)">{t}</text>
            ))}
            {[1, 2].map((t) => (
              <text key={t} x={pad.l - 7} y={sy(t) + 3} textAnchor="end" fontSize="10" fontFamily="var(--font-mono)" fill="var(--text-muted)">{t}</text>
            ))}
          </svg>
        );
      })()}
      {tab === 'ex2' && (() => {
        const { sx, sy } = make(-0.3, 4.2, -0.08, 1.15);
        const ptsPdf = Array.from({ length: 90 }, (_, i) => { const x = (i / 89) * 4.2; return `${i === 0 ? 'M' : 'L'}${sx(x).toFixed(1)},${sy(Math.exp(-x)).toFixed(1)}`; }).join(' ');
        const ptsCdf = Array.from({ length: 90 }, (_, i) => { const x = (i / 89) * 4.2; return `${i === 0 ? 'M' : 'L'}${sx(x).toFixed(1)},${sy(1 - Math.exp(-x)).toFixed(1)}`; }).join(' ');
        const areaPts = Array.from({ length: 40 }, (_, i) => { const x = 1 + (i / 39); return `L${sx(x).toFixed(1)},${sy(Math.exp(-x)).toFixed(1)}`; }).join(' ');
        return (
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[255px] select-none">
            <rect x={pad.l} y={pad.t} width={plotW} height={plotH} fill="none" stroke="var(--border)" />
            <line x1={pad.l} y1={sy(0)} x2={pad.l + plotW} y2={sy(0)} stroke="var(--text-muted)" />
            <line x1={sx(0)} y1={pad.t} x2={sx(0)} y2={pad.t + plotH} stroke="var(--text-muted)" />
            <path d={`M${sx(1)},${sy(0)} ${areaPts} L${sx(2)},${sy(0)} Z`} fill={INK.forest} fillOpacity="0.28" />
            <path d={ptsPdf} fill="none" stroke={INK.primary} strokeWidth="2.6" />
            <path d={ptsCdf} fill="none" stroke={INK.crimson} strokeWidth="2.2" strokeDasharray="6 3" />
            <text x={sx(1.5)} y={sy(0.1)} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={INK.forest}>P(1&lt;X&lt;2) ≈ 0,233</text>
            <text x={sx(2.5)} y={sy(0.95)} fontSize="11" fill={INK.crimson}>F(x) = 1 − e⁻ˣ</text>
            <text x={sx(2.5)} y={sy(0.22)} fontSize="11" fill={INK.primary}>f(x) = e⁻ˣ</text>
            {[0, 1, 2, 3, 4].map((t) => (
              <text key={t} x={sx(t)} y={pad.t + plotH + 15} textAnchor="middle" fontSize="10" fontFamily="var(--font-mono)" fill="var(--text-muted)">{t}</text>
            ))}
          </svg>
        );
      })()}
      {tab === 'ex4' && (() => {
        const { sx, sy } = make(-3.2, 3.2, -0.05, 0.72);
        const norm = (x) => (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);
        const l1 = -1.0, l2 = 1.0, pY = 0.6827;
        const full = Array.from({ length: 120 }, (_, i) => { const x = -3.2 + (i / 119) * 6.4; return `${i === 0 ? 'M' : 'L'}${sx(x).toFixed(1)},${sy(norm(x)).toFixed(1)}`; }).join(' ');
        const cond = Array.from({ length: 70 }, (_, i) => { const x = l1 + (i / 69) * (l2 - l1); return `${i === 0 ? 'M' : 'L'}${sx(x).toFixed(1)},${sy(norm(x) / pY).toFixed(1)}`; }).join(' ');
        return (
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[255px] select-none">
            <rect x={pad.l} y={pad.t} width={plotW} height={plotH} fill="none" stroke="var(--border)" />
            <line x1={pad.l} y1={sy(0)} x2={pad.l + plotW} y2={sy(0)} stroke="var(--text-muted)" />
            <line x1={sx(l1)} y1={pad.t} x2={sx(l1)} y2={sy(0)} stroke={INK.crimson} strokeDasharray="4 3" />
            <line x1={sx(l2)} y1={pad.t} x2={sx(l2)} y2={sy(0)} stroke={INK.crimson} strokeDasharray="4 3" />
            <path d={full} fill="none" stroke={INK.muted} strokeWidth="2" strokeDasharray="5 3" />
            <path d={cond} fill="none" stroke={INK.crimson} strokeWidth="2.8" />
            <text x={sx(0)} y={sy(0.64)} textAnchor="middle" fontSize="11" fontWeight="700" fill={INK.crimson}>f(x | Y) = f(x) / P(Y) — podniesiona, by pole = 1!</text>
            <text x={sx(2.1)} y={sy(0.18)} fontSize="10.5" fill={INK.muted}>oryginalna f(x)</text>
            <text x={sx(l1)} y={pad.t + plotH + 15} textAnchor="middle" fontSize="10.5" fontFamily="var(--font-mono)" fill={INK.crimson}>l₁</text>
            <text x={sx(l2)} y={pad.t + plotH + 15} textAnchor="middle" fontSize="10.5" fontFamily="var(--font-mono)" fill={INK.crimson}>l₂</text>
          </svg>
        );
      })()}
      {tab === 'ex5' && (() => {
        const { sx, sy } = make(-0.8, 4.5, -0.08, 1.15);
        const p0 = 0.4;
        const curve = Array.from({ length: 80 }, (_, i) => {
          const t = (i / 79) * 4.5;
          const y = p0 + (1 - p0) * (1 - Math.exp(-0.9 * t));
          return `${i === 0 ? 'M' : 'L'}${sx(t).toFixed(1)},${sy(y).toFixed(1)}`;
        }).join(' ');
        return (
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[255px] select-none">
            <rect x={pad.l} y={pad.t} width={plotW} height={plotH} fill="none" stroke="var(--border)" />
            <line x1={pad.l} y1={sy(0)} x2={pad.l + plotW} y2={sy(0)} stroke="var(--text-muted)" />
            <line x1={sx(0)} y1={pad.t} x2={sx(0)} y2={pad.t + plotH} stroke="var(--text-muted)" />
            <line x1={sx(-0.8)} y1={sy(0)} x2={sx(0)} y2={sy(0)} stroke={INK.primary} strokeWidth="2.8" />
            <line x1={sx(0)} y1={sy(0)} x2={sx(0)} y2={sy(p0)} stroke={INK.crimson} strokeDasharray="3 3" strokeWidth="1.8" />
            <path d={curve} fill="none" stroke={INK.primary} strokeWidth="2.8" />
            <circle cx={sx(0)} cy={sy(0)} r="4" fill={INK.primary} />
            <circle cx={sx(0)} cy={sy(p0)} r="4.2" fill="var(--bg-elevated)" stroke={INK.crimson} strokeWidth="2" />
            <text x={sx(0.2)} y={sy(0.22)} fontSize="11" fontWeight="700" fill={INK.crimson}>Skok P(T = 0) = p₀ (punktualny!)</text>
            <text x={sx(2.2)} y={sy(0.75)} fontSize="11" fill={INK.primary}>Część ciągła dla T &gt; 0 (opóźnienie)</text>
          </svg>
        );
      })()}
    </div>
  );
}

// ============================================================================
// 5. Chebyshev Bound, Skewness & Kurtosis (Wykład 04)
// ============================================================================
function MomentsChebyshevDiagram() {
  const [tab, setTab] = useState('cheb');
  const [kSig, setKSig] = useState(2.0);
  const W = 550, H = 250;
  const pad = { l: 38, r: 20, t: 20, b: 32 };
  const plotW = W - pad.l - pad.r;
  const plotH = H - pad.t - pad.b;

  const sx = (x) => pad.l + ((x + 4.2) / 8.4) * plotW;
  const sy = (y) => pad.t + ((0.55 - y) / 0.6) * plotH;
  const norm = (x, s = 1) => (1 / (s * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * (x / s) ** 2);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <TabRow
          active={tab}
          onChange={setTab}
          items={[
            { id: 'cheb', label: 'Nierówność Czebyszewa (pas ±kσ)' },
            { id: 'skew', label: 'Asymetria γ < 0, = 0, > 0' },
            { id: 'kurt', label: 'Eksces / kurtoza ε < 0, = 0, > 0' },
          ]}
        />
        {tab === 'cheb' && (
          <label className="flex items-center gap-2 text-xs font-mono">
            <span>a = {kSig.toFixed(1)}σ</span>
            <input type="range" min="1.1" max="3.8" step="0.1" value={kSig} onChange={(e) => setKSig(Number(e.target.value))} className="w-28 accent-[var(--accent)]" />
          </label>
        )}
      </div>

      {tab === 'cheb' && (() => {
        const chebMax = Math.min(1, 1 / (kSig * kSig));
        const full = Array.from({ length: 140 }, (_, i) => { const x = -4.2 + (i / 139) * 8.4; return `${i === 0 ? 'M' : 'L'}${sx(x).toFixed(1)},${sy(norm(x)).toFixed(1)}`; }).join(' ');
        const tailR = Array.from({ length: 40 }, (_, i) => { const x = kSig + (i / 39) * (4.2 - kSig); return `L${sx(x).toFixed(1)},${sy(norm(x)).toFixed(1)}`; }).join(' ');
        const tailL = Array.from({ length: 40 }, (_, i) => { const x = -4.2 + (i / 39) * (4.2 - kSig); return `L${sx(x).toFixed(1)},${sy(norm(x)).toFixed(1)}`; }).join(' ');
        return (
          <>
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[250px] select-none">
              <rect x={pad.l} y={pad.t} width={plotW} height={plotH} fill="none" stroke="var(--border)" />
              <line x1={pad.l} y1={sy(0)} x2={pad.l + plotW} y2={sy(0)} stroke="var(--text-muted)" />
              <rect x={sx(-kSig)} y={pad.t} width={sx(kSig) - sx(-kSig)} height={sy(0) - pad.t} fill={INK.forest} fillOpacity="0.1" />
              <path d={`M${sx(kSig)},${sy(0)} ${tailR} L${sx(4.2)},${sy(0)} Z`} fill={INK.crimson} fillOpacity="0.35" />
              <path d={`M${sx(-4.2)},${sy(0)} ${tailL} L${sx(-kSig)},${sy(0)} Z`} fill={INK.crimson} fillOpacity="0.35" />
              <path d={full} fill="none" stroke={INK.primary} strokeWidth="2.6" />
              <line x1={sx(0)} y1={pad.t} x2={sx(0)} y2={sy(0)} stroke="var(--text-muted)" strokeDasharray="3 3" />
              {[-3, -2, -1, 0, 1, 2, 3].map((t) => (
                <text key={t} x={sx(t)} y={pad.t + plotH + 15} textAnchor="middle" fontSize="10" fontFamily="var(--font-mono)" fill="var(--text-muted)">
                  {t === 0 ? 'E(X)' : `${t > 0 ? '+' : ''}${t}σ`}
                </text>
              ))}
            </svg>
            <div className="text-xs font-mono p-2.5 rounded bg-[var(--bg)] border border-[var(--border)] flex flex-wrap justify-between gap-2 mt-2">
              <span>Czebyszew (dla KAŻDEGO rozkładu): <strong style={{ color: INK.crimson }}>P(|X−E| ≥ {kSig.toFixed(1)}σ) ≤ {(chebMax * 100).toFixed(1)}%</strong></span>
              <span style={{ color: INK.forest }}>W pasie ±{kSig.toFixed(1)}σ leży min. {((1 - chebMax) * 100).toFixed(1)}% masy!</span>
            </div>
          </>
        );
      })()}

      {tab === 'skew' && (() => {
        const rightSkew = (x) => (x <= -2.5 ? 0 : Math.pow(x + 2.5, 1.8) * Math.exp(-(x + 2.5) * 0.95) * 0.65);
        const leftSkew = (x) => rightSkew(-x);
        const pSym = Array.from({ length: 120 }, (_, i) => { const x = -4 + (i / 119) * 8; return `${i === 0 ? 'M' : 'L'}${sx(x).toFixed(1)},${sy(norm(x)).toFixed(1)}`; }).join(' ');
        const pPos = Array.from({ length: 120 }, (_, i) => { const x = -2.5 + (i / 119) * 6.5; return `${i === 0 ? 'M' : 'L'}${sx(x).toFixed(1)},${sy(rightSkew(x)).toFixed(1)}`; }).join(' ');
        const pNeg = Array.from({ length: 120 }, (_, i) => { const x = -4 + (i / 119) * 6.5; return `${i === 0 ? 'M' : 'L'}${sx(x).toFixed(1)},${sy(leftSkew(x)).toFixed(1)}`; }).join(' ');
        return (
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[250px] select-none">
            <rect x={pad.l} y={pad.t} width={plotW} height={plotH} fill="none" stroke="var(--border)" />
            <line x1={pad.l} y1={sy(0)} x2={pad.l + plotW} y2={sy(0)} stroke="var(--text-muted)" />
            <path d={pSym} fill="none" stroke={INK.muted} strokeWidth="2" strokeDasharray="5 3" />
            <path d={pPos} fill="none" stroke={INK.primary} strokeWidth="2.6" />
            <path d={pNeg} fill="none" stroke={INK.crimson} strokeWidth="2.6" />
            <text x={sx(-2.6)} y={sy(0.45)} fontSize="11" fontWeight="600" fill={INK.crimson}>γ &lt; 0 (lewy ogon)</text>
            <text x={sx(0)} y={sy(0.47)} textAnchor="middle" fontSize="11" fill={INK.muted}>γ = 0 (symetryczny)</text>
            <text x={sx(2.5)} y={sy(0.45)} textAnchor="middle" fontSize="11" fontWeight="600" fill={INK.primary}>γ &gt; 0 (prawy ogon)</text>
          </svg>
        );
      })()}

      {tab === 'kurt' && (() => {
        const p0 = Array.from({ length: 120 }, (_, i) => { const x = -4 + (i / 119) * 8; return `${i === 0 ? 'M' : 'L'}${sx(x).toFixed(1)},${sy(norm(x, 1)).toFixed(1)}`; }).join(' ');
        const pPos = Array.from({ length: 120 }, (_, i) => { const x = -4 + (i / 119) * 8; return `${i === 0 ? 'M' : 'L'}${sx(x).toFixed(1)},${sy(0.52 * Math.exp(-Math.abs(x) * 1.25)).toFixed(1)}`; }).join(' ');
        const pNeg = Array.from({ length: 120 }, (_, i) => { const x = -4 + (i / 119) * 8; return `${i === 0 ? 'M' : 'L'}${sx(x).toFixed(1)},${sy(0.24 * Math.exp(-0.08 * x ** 4)).toFixed(1)}`; }).join(' ');
        return (
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[250px] select-none">
            <rect x={pad.l} y={pad.t} width={plotW} height={plotH} fill="none" stroke="var(--border)" />
            <line x1={pad.l} y1={sy(0)} x2={pad.l + plotW} y2={sy(0)} stroke="var(--text-muted)" />
            <path d={p0} fill="none" stroke={INK.muted} strokeWidth="2" strokeDasharray="5 3" />
            <path d={pPos} fill="none" stroke={INK.crimson} strokeWidth="2.6" />
            <path d={pNeg} fill="none" stroke={INK.forest} strokeWidth="2.6" />
            <text x={sx(0.25)} y={sy(0.5)} fontSize="11" fontWeight="600" fill={INK.crimson}>ε &gt; 0 (smukły / leptokurtyczny)</text>
            <text x={sx(1.3)} y={sy(0.36)} fontSize="11" fill={INK.muted}>ε = 0 (normalny)</text>
            <text x={sx(2.2)} y={sy(0.21)} fontSize="11" fontWeight="600" fill={INK.forest}>ε &lt; 0 (spłaszczony)</text>
          </svg>
        );
      })()}
    </div>
  );
}

// ============================================================================
// 6. Binomial B(n, λ/n) → Poisson(λ) Convergence (Wykład 05, Przykład 2)
// ============================================================================
function BinomialPoissonDiagram() {
  const [n, setN] = useState(10);
  const [lam, setLam] = useState(2);
  const p = Math.min(0.95, lam / n);
  const maxX = Math.min(16, Math.max(8, Math.ceil(lam + 4 * Math.sqrt(lam) + 2)));
  const xs = Array.from({ length: maxX + 1 }, (_, i) => i);

  const bVals = xs.map((k) => binomPmf(n, p, k));
  const pVals = xs.map((k) => poissonPmf(lam, k));
  const yMax = Math.max(0.25, ...bVals, ...pVals) * 1.15;

  const W = 560, H = 260;
  const pad = { l: 44, r: 18, t: 18, b: 34 };
  const plotW = W - pad.l - pad.r;
  const plotH = H - pad.t - pad.b;
  const sy = (v) => pad.t + ((yMax - v) / yMax) * plotH;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-5 text-xs font-mono">
        <label className="flex items-center gap-2">
          <span>n = {n} (p = {(lam / n).toFixed(3)})</span>
          <input type="range" min={Math.max(4, Math.ceil(lam) + 1)} max="100" value={n} onChange={(e) => setN(Number(e.target.value))} className="w-32 accent-[var(--accent)]" />
        </label>
        <label className="flex items-center gap-2">
          <span>λ = np = {lam}</span>
          <input type="range" min="1" max="6" step="0.5" value={lam} onChange={(e) => { const v = Number(e.target.value); setLam(v); if (n <= v) setN(Math.ceil(v) + 2); }} className="w-28 accent-[var(--accent)]" />
        </label>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[265px] select-none">
        <rect x={pad.l} y={pad.t} width={plotW} height={plotH} fill="none" stroke="var(--border)" />
        {xs.map((k, i) => {
          const slot = plotW / xs.length;
          const cx = pad.l + i * slot + slot / 2;
          const bw = slot * 0.36;
          return (
            <g key={k}>
              <rect x={cx - bw} y={sy(bVals[i])} width={bw} height={sy(0) - sy(bVals[i])} fill={INK.primary} fillOpacity="0.82" />
              <rect x={cx} y={sy(pVals[i])} width={bw} height={sy(0) - sy(pVals[i])} fill={INK.crimson} fillOpacity="0.72" />
              <text x={cx} y={pad.t + plotH + 15} textAnchor="middle" fontSize="9.5" fontFamily="var(--font-mono)" fill="var(--text-muted)">{k}</text>
            </g>
          );
        })}
        {[0, yMax / 2, yMax].map((v, idx) => (
          <text key={idx} x={pad.l - 6} y={sy(v) + 3.5} textAnchor="end" fontSize="9.5" fontFamily="var(--font-mono)" fill="var(--text-muted)">
            {v.toFixed(2)}
          </text>
        ))}
      </svg>
      <div className="flex flex-wrap justify-between gap-2 text-xs font-mono">
        <span style={{ color: INK.primary }}>■ Dwumianowy B({n}, {p.toFixed(3)}): E = {lam.toFixed(1)}, D = {(n * p * (1 - p)).toFixed(2)}</span>
        <span style={{ color: INK.crimson }}>■ Poisson({lam}): E = {lam.toFixed(1)}, D = {lam.toFixed(1)}</span>
      </div>
    </div>
  );
}

// ============================================================================
// 7. Geometric (Memoryless) & Pascal Distribution (Wykład 05)
// ============================================================================
function GeometricPascalDiagram() {
  const [nSucc, setNSucc] = useState(1);
  const [p, setP] = useState(0.5);
  const maxX = 16;
  const xs = Array.from({ length: maxX }, (_, i) => i + 1);
  const vals = xs.map((x) => (x < nSucc ? 0 : nCk(x - 1, nSucc - 1) * (p ** nSucc) * ((1 - p) ** (x - nSucc))));
  const yMax = Math.max(0.2, ...vals) * 1.15;

  const W = 560, H = 250;
  const pad = { l: 44, r: 18, t: 18, b: 34 };
  const plotW = W - pad.l - pad.r;
  const plotH = H - pad.t - pad.b;
  const sy = (v) => pad.t + ((yMax - v) / yMax) * plotH;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-5 text-xs font-mono">
        <label className="flex items-center gap-2">
          <span>Liczba sukcesów n = {nSucc} {nSucc === 1 ? '(Geometryczny)' : '(Pascal)'}</span>
          <input type="range" min="1" max="5" value={nSucc} onChange={(e) => setNSucc(Number(e.target.value))} className="w-24 accent-[var(--accent)]" />
        </label>
        <label className="flex items-center gap-2">
          <span>p = {p.toFixed(2)}</span>
          <input type="range" min="0.15" max="0.85" step="0.05" value={p} onChange={(e) => setP(Number(e.target.value))} className="w-28 accent-[var(--accent)]" />
        </label>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[255px] select-none">
        <rect x={pad.l} y={pad.t} width={plotW} height={plotH} fill="none" stroke="var(--border)" />
        {xs.map((x, i) => {
          const slot = plotW / xs.length;
          const cx = pad.l + i * slot + slot / 2;
          const bw = slot * 0.6;
          return (
            <g key={x}>
              <rect x={cx - bw / 2} y={sy(vals[i])} width={bw} height={sy(0) - sy(vals[i])} fill={nSucc === 1 ? INK.forest : INK.violet} fillOpacity="0.8" rx="1.5" />
              <text x={cx} y={pad.t + plotH + 15} textAnchor="middle" fontSize="9.5" fontFamily="var(--font-mono)" fill="var(--text-muted)">{x}</text>
            </g>
          );
        })}
      </svg>
      <div className="flex flex-wrap justify-between gap-2 text-xs font-mono text-[var(--text-secondary)]">
        <span>E(X) = n/p = <strong>{(nSucc / p).toFixed(2)}</strong></span>
        <span>D(X) = n(1−p)/p² = <strong>{((nSucc * (1 - p)) / (p * p)).toFixed(2)}</strong></span>
        <span>{nSucc === 1 ? 'Brak pamięci: P(X=k+m | X>k) = P(X=m)!' : 'Rozkład Pascala = suma n niezależnych geometrycznych'}</span>
      </div>
    </div>
  );
}

// ============================================================================
// 8. Hypergeometric H(N, m, n) vs Binomial B(n, m/N) (Wykład 05, Przykład 5)
// ============================================================================
function HypergeomVsBinomDiagram() {
  const [N, setN] = useState(10);
  const p = 0.4;
  const m = Math.round(N * p);
  const n = 5;
  const xs = Array.from({ length: n + 1 }, (_, i) => i);
  const hVals = xs.map((x) => hypergeomPmf(N, m, n, x));
  const bVals = xs.map((x) => binomPmf(n, m / N, x));
  const yMax = Math.max(0.3, ...hVals, ...bVals) * 1.15;

  const W = 540, H = 245;
  const pad = { l: 44, r: 18, t: 18, b: 34 };
  const plotW = W - pad.l - pad.r;
  const plotH = H - pad.t - pad.b;
  const sy = (v) => pad.t + ((yMax - v) / yMax) * plotH;
  const corrFactor = (N - n) / (N - 1);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <label className="flex items-center gap-2">
          <span>Populacja N = {N} (m = {m} sukcesów, próbka n = {n})</span>
          <input type="range" min="10" max="200" step="5" value={N} onChange={(e) => setN(Number(e.target.value))} className="w-36 accent-[var(--accent)]" />
        </label>
        <span>Czynnik (N−n)/(N−1) = <strong>{corrFactor.toFixed(3)}</strong></span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[250px] select-none">
        <rect x={pad.l} y={pad.t} width={plotW} height={plotH} fill="none" stroke="var(--border)" />
        {xs.map((x, i) => {
          const slot = plotW / xs.length;
          const cx = pad.l + i * slot + slot / 2;
          const bw = slot * 0.28;
          return (
            <g key={x}>
              <rect x={cx - bw - 1} y={sy(hVals[i])} width={bw} height={sy(0) - sy(hVals[i])} fill={INK.ochre} fillOpacity="0.85" />
              <rect x={cx + 1} y={sy(bVals[i])} width={bw} height={sy(0) - sy(bVals[i])} fill={INK.primary} fillOpacity="0.72" />
              <text x={cx} y={pad.t + plotH + 15} textAnchor="middle" fontSize="10" fontFamily="var(--font-mono)" fill="var(--text-muted)">x={x}</text>
            </g>
          );
        })}
      </svg>
      <div className="flex flex-wrap justify-between gap-2 text-xs font-mono">
        <span style={{ color: INK.ochre }}>■ Hipergeometryczny (bez zwracania): D = {(n * (m / N) * (1 - m / N) * corrFactor).toFixed(3)}</span>
        <span style={{ color: INK.primary }}>■ Dwumianowy (ze zwracaniem): D = {(n * (m / N) * (1 - m / N)).toFixed(3)}</span>
      </div>
    </div>
  );
}

export const PROB_DIAGRAM_REGISTRY = {
  'prob-descriptive-stats': { Component: DescriptiveStatsDiagram },
  'prob-venn-combinatorics': { Component: VennCombinatoricsDiagram },
  'prob-bayes-tree': { Component: BayesTreeDiagram },
  'prob-cdf-pdf-mixed': { Component: CdfPdfMixedDiagram },
  'prob-moments-chebyshev': { Component: MomentsChebyshevDiagram },
  'prob-binomial-poisson': { Component: BinomialPoissonDiagram },
  'prob-geometric-pascal': { Component: GeometricPascalDiagram },
  'prob-hypergeometric-vs-binom': { Component: HypergeomVsBinomDiagram },
};
