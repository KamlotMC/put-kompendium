import React, { useMemo, useState } from 'react';
import { BarChart3, GitFork, Calculator } from 'lucide-react';

function logFact(n) {
  let s = 0;
  for (let i = 2; i <= n; i++) s += Math.log(i);
  return s;
}
function logNCk(n, k) {
  if (k < 0 || k > n) return -Infinity;
  return logFact(n) - logFact(k) - logFact(n - k);
}
function binomPmf(n, p, k) {
  if (k < 0 || k > n) return 0;
  if (p <= 0) return k === 0 ? 1 : 0;
  if (p >= 1) return k === n ? 1 : 0;
  return Math.exp(logNCk(n, k) + k * Math.log(p) + (n - k) * Math.log(1 - p));
}
function poissonPmf(lam, k) {
  return k < 0 ? 0 : Math.exp(k * Math.log(lam) - lam - logFact(k));
}
function pascalPmf(nSucc, p, x) {
  if (x < nSucc) return 0;
  return Math.exp(logNCk(x - 1, nSucc - 1) + nSucc * Math.log(p) + (x - nSucc) * Math.log(1 - p));
}
function hyperPmf(N, m, n, x) {
  if (x < Math.max(0, n - (N - m)) || x > Math.min(n, m)) return 0;
  return Math.exp(logNCk(m, x) + logNCk(N - m, n - x) - logNCk(N, n));
}

const BAYES_PRESETS = [
  {
    name: '3 pudełka (Wykład 02, Przykład 2)',
    eventLabel: 'Y = wylosowano białą kulę',
    hyps: [
      { label: 'H₁: Pudełko 1 (4B, 2C)', prior: 0.3333, like: 4 / 6 },
      { label: 'H₂: Pudełko 2 (2B, 4C)', prior: 0.3333, like: 2 / 6 },
      { label: 'H₃: Pudełko 3 (3B, 3C)', prior: 0.3334, like: 3 / 6 },
    ],
  },
  {
    name: 'Filtr antyspamowy ICT',
    eventLabel: 'Y = wiadomość zawiera słowo „PROMOCJA”',
    hyps: [
      { label: 'H₁: Spam', prior: 0.25, like: 0.72 },
      { label: 'H₂: Poprawna poczta (Ham)', prior: 0.75, like: 0.04 },
    ],
  },
  {
    name: 'Test medyczny (pułapka bazowa)',
    eventLabel: 'Y = dodatni wynik testu',
    hyps: [
      { label: 'H₁: Chory (1% populacji)', prior: 0.01, like: 0.99 },
      { label: 'H₂: Zdrowy (99% populacji)', prior: 0.99, like: 0.05 },
    ],
  },
];

export function ProbLabPage() {
  const [tab, setTab] = useState('dist'); // 'dist' | 'bayes' | 'stats'

  // --- Tab 1: Discrete Distributions ---
  const [dist, setDist] = useState('binom');
  const [n, setN] = useState(12);
  const [p, setP] = useState(0.4);
  const [lam, setLam] = useState(3.5);
  const [rSucc, setRSucc] = useState(2);
  const [popN, setPopN] = useState(20);
  const [popM, setPopM] = useState(8);
  const [rangeA, setRangeA] = useState(2);
  const [rangeB, setRangeB] = useState(6);

  const distCalc = useMemo(() => {
    let items = [];
    let mean = 0;
    let variance = 0;
    if (dist === 'binom') {
      mean = n * p;
      variance = n * p * (1 - p);
      for (let k = 0; k <= n; k++) items.push({ x: k, p: binomPmf(n, p, k) });
    } else if (dist === 'poisson') {
      mean = lam;
      variance = lam;
      const hi = Math.min(30, Math.max(12, Math.ceil(lam + 4 * Math.sqrt(lam) + 2)));
      for (let k = 0; k <= hi; k++) items.push({ x: k, p: poissonPmf(lam, k) });
    } else if (dist === 'geom') {
      mean = 1 / p;
      variance = (1 - p) / (p * p);
      const hi = Math.min(25, Math.max(10, Math.ceil(4 / p)));
      for (let k = 1; k <= hi; k++) items.push({ x: k, p: p * (1 - p) ** (k - 1) });
    } else if (dist === 'pascal') {
      mean = rSucc / p;
      variance = (rSucc * (1 - p)) / (p * p);
      const hi = Math.min(30, Math.max(rSucc + 10, Math.ceil(mean + 3 * Math.sqrt(variance))));
      for (let k = rSucc; k <= hi; k++) items.push({ x: k, p: pascalPmf(rSucc, p, k) });
    } else if (dist === 'hyper') {
      const safeM = Math.min(popM, popN);
      const safeN = Math.min(n, popN);
      const pp = safeM / popN;
      mean = safeN * pp;
      variance = safeN * pp * (1 - pp) * ((popN - safeN) / Math.max(1, popN - 1));
      for (let k = 0; k <= safeN; k++) items.push({ x: k, p: hyperPmf(popN, safeM, safeN, k) });
    }

    let cum = 0;
    const withCdf = items.map((it) => {
      cum += it.p;
      return { ...it, cdf: Math.min(1, cum) };
    });
    const probInterval = withCdf
      .filter((it) => it.x >= rangeA && it.x <= rangeB)
      .reduce((acc, it) => acc + it.p, 0);

    return { items: withCdf, mean, variance, std: Math.sqrt(Math.max(0, variance)), probInterval };
  }, [dist, n, p, lam, rSucc, popN, popM, rangeA, rangeB]);

  // --- Tab 2: Bayes Calculator ---
  const [bayesEvent, setBayesEvent] = useState(BAYES_PRESETS[0].eventLabel);
  const [hyps, setHyps] = useState(BAYES_PRESETS[0].hyps);

  const bayesCalc = useMemo(() => {
    const priorSum = hyps.reduce((s, h) => s + Math.max(0, Number(h.prior) || 0), 0);
    const joints = hyps.map((h) => Math.max(0, Number(h.prior) || 0) * Math.max(0, Math.min(1, Number(h.like) || 0)));
    const pY = joints.reduce((s, v) => s + v, 0);
    const posteriors = joints.map((j) => (pY > 0 ? j / pY : 0));
    return { priorSum, joints, pY, posteriors };
  }, [hyps]);

  // --- Tab 3: Descriptive Stats Calculator ---
  const [rawNums, setRawNums] = useState('15, 19, 31, 43, 41, 24, 24, 21, 7');
  const statsCalc = useMemo(() => {
    const arr = rawNums
      .split(/[\s,;]+/)
      .map((s) => Number(s.replace(',', '.')))
      .filter((v) => Number.isFinite(v));
    if (arr.length === 0) return null;
    const cnt = arr.length;
    const sum = arr.reduce((a, b) => a + b, 0);
    const mean = sum / cnt;
    const sumSq = arr.reduce((a, b) => a + b * b, 0);
    const sumDev2 = arr.reduce((a, b) => a + (b - mean) ** 2, 0);
    const sumDev3 = arr.reduce((a, b) => a + (b - mean) ** 3, 0);
    const variance = sumDev2 / cnt;
    const std = Math.sqrt(variance);
    const cv = mean !== 0 ? std / Math.abs(mean) : NaN;
    const mu3 = sumDev3 / cnt;
    const skew = std > 0 ? mu3 / std ** 3 : 0;
    return { arr, cnt, sum, mean, sumSq, sumDev2, variance, std, cv, mu3, skew };
  }, [rawNums]);

  return (
    <div className="space-y-6">
      <header className="pb-4 border-b border-[var(--border)] flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">
            Probabilistyka i statystyka w ICT · Narzędzie interaktywne
          </div>
          <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold m-0">
            Laboratorium rozkładów, Bayesa i statystyki
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1 mb-0 max-w-2xl">
            Sprawdzaj na żywo wykresy rozkładów dyskretnych, obliczaj prawdopodobieństwa przedziałowe, testuj Twierdzenie Bayesa oraz przeliczaj statystyki z próby krok po kroku.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'dist', label: 'Rozkłady dyskretne', icon: BarChart3 },
            { id: 'bayes', label: 'Kalkulator Bayesa', icon: GitFork },
            { id: 'stats', label: 'Statystyka z próby', icon: Calculator },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={tab === t.id ? 'btn-primary text-xs' : 'btn-secondary text-xs'}
              >
                <Icon className="w-3.5 h-3.5" /> {t.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* TAB 1: DISCRETE DISTRIBUTIONS */}
      {tab === 'dist' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-4 card p-4 space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-[var(--text-muted)] mb-1.5">Model rozkładu</label>
              <select value={dist} onChange={(e) => setDist(e.target.value)} className="input-field text-sm">
                <option value="binom">Dwumianowy B(n, p)</option>
                <option value="poisson">Poissona Pois(λ)</option>
                <option value="geom">Geometryczny (Furry’ego)</option>
                <option value="pascal">Pascala (ujemny dwumianowy)</option>
                <option value="hyper">Hipergeometryczny H(N, m, n)</option>
              </select>
            </div>

            {dist === 'binom' && (
              <>
                <label className="block text-xs font-mono">
                  Próby n = <strong>{n}</strong>
                  <input type="range" min="1" max="30" value={n} onChange={(e) => setN(Number(e.target.value))} className="w-full mt-1 accent-[var(--accent)]" />
                </label>
                <label className="block text-xs font-mono">
                  Prawdopodobieństwo sukcesu p = <strong>{p.toFixed(2)}</strong>
                  <input type="range" min="0.05" max="0.95" step="0.05" value={p} onChange={(e) => setP(Number(e.target.value))} className="w-full mt-1 accent-[var(--accent)]" />
                </label>
              </>
            )}

            {dist === 'poisson' && (
              <label className="block text-xs font-mono">
                Intensywność λ = <strong>{lam.toFixed(1)}</strong>
                <input type="range" min="0.5" max="14" step="0.5" value={lam} onChange={(e) => setLam(Number(e.target.value))} className="w-full mt-1 accent-[var(--accent)]" />
              </label>
            )}

            {dist === 'geom' && (
              <label className="block text-xs font-mono">
                Prawdopodobieństwo sukcesu p = <strong>{p.toFixed(2)}</strong>
                <input type="range" min="0.1" max="0.9" step="0.05" value={p} onChange={(e) => setP(Number(e.target.value))} className="w-full mt-1 accent-[var(--accent)]" />
              </label>
            )}

            {dist === 'pascal' && (
              <>
                <label className="block text-xs font-mono">
                  Wymagane sukcesy n = <strong>{rSucc}</strong>
                  <input type="range" min="1" max="6" value={rSucc} onChange={(e) => setRSucc(Number(e.target.value))} className="w-full mt-1 accent-[var(--accent)]" />
                </label>
                <label className="block text-xs font-mono">
                  Prawdopodobieństwo sukcesu p = <strong>{p.toFixed(2)}</strong>
                  <input type="range" min="0.15" max="0.85" step="0.05" value={p} onChange={(e) => setP(Number(e.target.value))} className="w-full mt-1 accent-[var(--accent)]" />
                </label>
              </>
            )}

            {dist === 'hyper' && (
              <>
                <label className="block text-xs font-mono">
                  Populacja N = <strong>{popN}</strong>
                  <input type="range" min="6" max="80" value={popN} onChange={(e) => setPopN(Number(e.target.value))} className="w-full mt-1 accent-[var(--accent)]" />
                </label>
                <label className="block text-xs font-mono">
                  Wyróżnione m = <strong>{Math.min(popM, popN)}</strong>
                  <input type="range" min="1" max={popN} value={Math.min(popM, popN)} onChange={(e) => setPopM(Number(e.target.value))} className="w-full mt-1 accent-[var(--accent)]" />
                </label>
                <label className="block text-xs font-mono">
                  Próbka n = <strong>{Math.min(n, popN)}</strong>
                  <input type="range" min="1" max={Math.min(25, popN)} value={Math.min(n, popN)} onChange={(e) => setN(Number(e.target.value))} className="w-full mt-1 accent-[var(--accent)]" />
                </label>
              </>
            )}

            <div className="pt-3 border-t border-[var(--border)] space-y-2">
              <div className="text-xs font-mono uppercase text-[var(--text-muted)]">Zakres prawdopodobieństwa P(a ≤ X ≤ b)</div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <label>
                  a
                  <input type="number" value={rangeA} onChange={(e) => setRangeA(Number(e.target.value))} className="input-field mt-1 text-xs" />
                </label>
                <label>
                  b
                  <input type="number" value={rangeB} onChange={(e) => setRangeB(Number(e.target.value))} className="input-field mt-1 text-xs" />
                </label>
              </div>
              <div className="p-3 rounded bg-[var(--success-soft)] border border-[var(--border)] text-xs font-mono flex justify-between">
                <span>P({rangeA} ≤ X ≤ {rangeB}) =</span>
                <strong className="text-[var(--success)]">{distCalc.probInterval.toFixed(5)}</strong>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs font-mono pt-1">
              <div className="p-2 rounded bg-[var(--bg)] border border-[var(--border)]">
                <div className="text-[var(--text-muted)]">E(X)</div>
                <div className="font-bold">{distCalc.mean.toFixed(3)}</div>
              </div>
              <div className="p-2 rounded bg-[var(--bg)] border border-[var(--border)]">
                <div className="text-[var(--text-muted)]">D(X)</div>
                <div className="font-bold">{distCalc.variance.toFixed(3)}</div>
              </div>
              <div className="p-2 rounded bg-[var(--bg)] border border-[var(--border)]">
                <div className="text-[var(--text-muted)]">σ</div>
                <div className="font-bold">{distCalc.std.toFixed(3)}</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 card p-5 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
              Rozkład prawdopodobieństwa P(X = x) — zielone słupki należą do [{rangeA}, {rangeB}]
            </div>
            {(() => {
              const W = 680, H = 310;
              const pad = { l: 46, r: 18, t: 20, b: 36 };
              const plotW = W - pad.l - pad.r;
              const plotH = H - pad.t - pad.b;
              const yMax = Math.max(0.15, ...distCalc.items.map((i) => i.p)) * 1.15;
              const sy = (v) => pad.t + ((yMax - v) / yMax) * plotH;
              const slot = plotW / Math.max(1, distCalc.items.length);
              const bw = Math.max(6, Math.min(30, slot * 0.68));
              return (
                <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto select-none">
                  <rect x={pad.l} y={pad.t} width={plotW} height={plotH} fill="none" stroke="var(--border)" />
                  {[0, yMax * 0.25, yMax * 0.5, yMax * 0.75, yMax].map((v, idx) => (
                    <g key={idx}>
                      <line x1={pad.l} y1={sy(v)} x2={pad.l + plotW} y2={sy(v)} stroke="var(--border)" strokeWidth="0.6" />
                      <text x={pad.l - 7} y={sy(v) + 3.5} textAnchor="end" fontSize="9.5" fontFamily="var(--font-mono)" fill="var(--text-muted)">
                        {v.toFixed(2)}
                      </text>
                    </g>
                  ))}
                  {distCalc.items.map((it, i) => {
                    const cx = pad.l + i * slot + slot / 2;
                    const inRange = it.x >= rangeA && it.x <= rangeB;
                    return (
                      <g key={it.x}>
                        <rect
                          x={cx - bw / 2}
                          y={sy(it.p)}
                          width={bw}
                          height={sy(0) - sy(it.p)}
                          fill={inRange ? '#15803d' : '#2563eb'}
                          fillOpacity={inRange ? 0.85 : 0.45}
                          rx="1.5"
                        />
                        {(distCalc.items.length <= 20 || i % 2 === 0) && (
                          <text x={cx} y={pad.t + plotH + 16} textAnchor="middle" fontSize="9.5" fontFamily="var(--font-mono)" fill="var(--text-muted)">
                            {it.x}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
              );
            })()}
          </div>
        </div>
      )}

      {/* TAB 2: BAYES CALCULATOR */}
      {tab === 'bayes' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {BAYES_PRESETS.map((pr) => (
              <button
                key={pr.name}
                onClick={() => {
                  setBayesEvent(pr.eventLabel);
                  setHyps(pr.hyps.map((h) => ({ ...h })));
                }}
                className="btn-secondary text-xs"
              >
                {pr.name}
              </button>
            ))}
          </div>

          <div className="card p-5 space-y-4">
            <div className="text-sm font-semibold">Obserwacja (skutek): <span className="font-mono text-[var(--accent-text)]">{bayesEvent}</span></div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border-strong)] text-left font-mono text-[11px] uppercase text-[var(--text-muted)]">
                    <th className="py-2 pr-3">Hipoteza Hᵢ</th>
                    <th className="py-2 pr-3">A priori P(Hᵢ)</th>
                    <th className="py-2 pr-3">Wiarygodność P(Y | Hᵢ)</th>
                    <th className="py-2 pr-3">Iloczyn P(Hᵢ ∩ Y)</th>
                    <th className="py-2 text-right">A posteriori P(Hᵢ | Y)</th>
                  </tr>
                </thead>
                <tbody>
                  {hyps.map((h, i) => (
                    <tr key={i} className="border-b last:border-b-0 border-[var(--border)]">
                      <td className="py-2.5 pr-3 font-medium">{h.label}</td>
                      <td className="py-2.5 pr-3">
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          max="1"
                          value={Number(h.prior.toFixed(4))}
                          onChange={(e) => setHyps((prev) => prev.map((x, idx) => (idx === i ? { ...x, prior: Number(e.target.value) } : x)))}
                          className="input-field !w-24 font-mono text-xs"
                        />
                      </td>
                      <td className="py-2.5 pr-3">
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          max="1"
                          value={Number(h.like.toFixed(4))}
                          onChange={(e) => setHyps((prev) => prev.map((x, idx) => (idx === i ? { ...x, like: Number(e.target.value) } : x)))}
                          className="input-field !w-24 font-mono text-xs"
                        />
                      </td>
                      <td className="py-2.5 pr-3 font-mono text-[var(--text-secondary)]">
                        {bayesCalc.joints[i].toFixed(5)}
                      </td>
                      <td className="py-2.5 text-right font-mono font-bold text-[var(--accent-text)]">
                        {(bayesCalc.posteriors[i] * 100).toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3.5 rounded bg-[var(--bg-subtle)] border border-[var(--border)] text-xs font-mono flex flex-wrap justify-between gap-2">
              <span>Suma a priori ∑ P(Hᵢ) = <strong className={Math.abs(bayesCalc.priorSum - 1) > 0.01 ? 'text-[var(--danger)]' : 'text-[var(--success)]'}>{bayesCalc.priorSum.toFixed(4)}</strong></span>
              <span>Prawdopodobieństwo zupełne P(Y) = <strong>{bayesCalc.pY.toFixed(5)}</strong></span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DESCRIPTIVE STATS */}
      {tab === 'stats' && (
        <div className="card p-5 space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-[var(--text-muted)] mb-1.5">
              Dane z próby (oddzielone przecinkiem lub spacją — domyślnie Wykład 00: połączenia 7:00–16:00)
            </label>
            <input
              type="text"
              value={rawNums}
              onChange={(e) => setRawNums(e.target.value)}
              className="input-field font-mono text-sm"
            />
          </div>

          {statsCalc && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 font-mono text-xs">
                {[
                  { k: 'Liczność n', v: statsCalc.cnt },
                  { k: 'Średnia x̄', v: statsCalc.mean.toFixed(3) },
                  { k: 'Wariancja σ²', v: statsCalc.variance.toFixed(3) },
                  { k: 'Odchylenie σ', v: statsCalc.std.toFixed(3) },
                  { k: 'Zmienność V', v: Number.isFinite(statsCalc.cv) ? statsCalc.cv.toFixed(3) : '—' },
                  { k: 'Asymetria g', v: statsCalc.skew.toFixed(3) },
                ].map((m) => (
                  <div key={m.k} className="p-3 rounded bg-[var(--bg)] border border-[var(--border)]">
                    <div className="text-[var(--text-muted)] text-[10px] uppercase">{m.k}</div>
                    <div className="text-base font-bold mt-0.5">{m.v}</div>
                  </div>
                ))}
              </div>
              <div className="text-xs font-mono p-3 rounded bg-[var(--bg-subtle)] border border-[var(--border)] text-[var(--text-secondary)]">
                Sprawdzenie wzoru skróconego: σ² = (1/{statsCalc.cnt})·({statsCalc.sumSq.toFixed(1)} − {statsCalc.cnt}·{statsCalc.mean.toFixed(2)}²) = <strong>{statsCalc.variance.toFixed(4)}</strong>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
