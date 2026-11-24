import React, { useMemo, useState } from 'react';
import { Atom, Compass, Ruler } from 'lucide-react';

const NAVY = '#1d3557';
const CRIMSON = '#9b2226';
const FOREST = '#2d6a4f';

function fmt(v, d = 3) {
  if (!Number.isFinite(v)) return '—';
  const r = Math.abs(v) < 1e-10 ? 0 : v;
  return Number.isInteger(r) ? String(r) : r.toFixed(d).replace(/\.?0+$/, '');
}

const STUDENT_T = { 2: 1.84, 3: 1.3, 4: 1.2, 5: 1.15, 6: 1.11, 7: 1.09, 8: 1.08, 9: 1.07, 10: 1.06 };

export function PhysLabPage() {
  const [tab, setTab] = useState('vectors'); // 'vectors' | 'dynamics' | 'uncertainty'

  // Tab 1: 3D Vectors & Projectile
  const [va, setVa] = useState([2, -1, 3]);
  const [vb, setVb] = useState([4, 2, -2]);
  const [projV0, setProjV0] = useState(25);
  const [projAng, setProjAng] = useState(45);
  const [projH0, setProjH0] = useState(0);

  const vecStats = useMemo(() => {
    const [ax, ay, az] = va;
    const [bx, by, bz] = vb;
    const magA = Math.hypot(ax, ay, az);
    const magB = Math.hypot(bx, by, bz);
    const sum = [ax + bx, ay + by, az + bz];
    const diff = [ax - bx, ay - by, az - bz];
    const dot = ax * bx + ay * by + az * bz;
    const cross = [ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx];
    const magCross = Math.hypot(cross[0], cross[1], cross[2]);
    const cosAng = magA > 0 && magB > 0 ? Math.max(-1, Math.min(1, dot / (magA * magB))) : 1;
    const deg = (Math.acos(cosAng) * 180) / Math.PI;
    return { magA, magB, sum, diff, dot, cross, magCross, deg };
  }, [va, vb]);

  const projStats = useMemo(() => {
    const g = 9.80665;
    const rad = (projAng * Math.PI) / 180;
    const vx = projV0 * Math.cos(rad);
    const vy = projV0 * Math.sin(rad);
    const tc = (vy + Math.sqrt(vy * vy + 2 * g * projH0)) / g;
    const tw = vy / g;
    const hMax = projH0 + (vy * vy) / (2 * g);
    const range = vx * tc;
    const vImpact = Math.hypot(vx, vy - g * tc);
    return { vx, vy, tc, tw, hMax, range, vImpact };
  }, [projV0, projAng, projH0]);

  // Tab 2: Inclined plane & 1D Collisions
  const [planeM, setPlaneM] = useState(5);
  const [planeAng, setPlaneAng] = useState(30);
  const [planeMu, setPlaneMu] = useState(0.2);

  const planeStats = useMemo(() => {
    const g = 9.81;
    const rad = (planeAng * Math.PI) / 180;
    const fg = planeM * g;
    const fs = fg * Math.sin(rad);
    const nF = fg * Math.cos(rad);
    const tMax = planeMu * nF;
    const slides = fs > tMax + 1e-9;
    const a = slides ? g * (Math.sin(rad) - planeMu * Math.cos(rad)) : 0;
    const critAng = (Math.atan(planeMu) * 180) / Math.PI;
    return { fg, fs, nF, tMax, slides, a, critAng };
  }, [planeM, planeAng, planeMu]);

  const [m1, setM1] = useState(2);
  const [v1p, setV1p] = useState(6);
  const [m2, setM2] = useState(4);
  const [v2p, setV2p] = useState(0);

  const collStats = useMemo(() => {
    const pInit = m1 * v1p + m2 * v2p;
    const ekInit = 0.5 * m1 * v1p * v1p + 0.5 * m2 * v2p * v2p;
    // Inelastic
    const vk = pInit / (m1 + m2);
    const ekInel = 0.5 * (m1 + m2) * vk * vk;
    const lossPct = ekInit > 0 ? ((ekInit - ekInel) / ekInit) * 100 : 0;
    // Elastic
    const v1k = ((m1 - m2) / (m1 + m2)) * v1p + ((2 * m2) / (m1 + m2)) * v2p;
    const v2k = ((m2 - m1) / (m1 + m2)) * v2p + ((2 * m1) / (m1 + m2)) * v1p;
    const ekEl = 0.5 * m1 * v1k * v1k + 0.5 * m2 * v2k * v2k;
    return { pInit, ekInit, vk, ekInel, lossPct, v1k, v2k, ekEl };
  }, [m1, v1p, m2, v2p]);

  // Tab 3: Lab Uncertainty Calculator (Student-Fisher + Logarithmic Differential)
  const [seriesText, setSeriesText] = useState('36.67, 34.53, 35.06');
  const seriesStats = useMemo(() => {
    const vals = seriesText
      .split(/[\s,;]+/)
      .map((s) => Number(s.trim().replace(',', '.')))
      .filter((n) => Number.isFinite(n));
    if (vals.length < 2) return null;
    const n = vals.length;
    const mean = vals.reduce((s, v) => s + v, 0) / n;
    const sumSq = vals.reduce((s, v) => s + (v - mean) * (v - mean), 0);
    const sSingle = Math.sqrt(sumSq / (n - 1));
    const sMean = Math.sqrt(sumSq / (n * (n - 1)));
    const tn = STUDENT_T[n] || 1.05;
    const delta = tn * sMean;
    const relPct = mean !== 0 ? (delta / Math.abs(mean)) * 100 : 0;
    return { vals, n, mean, sSingle, sMean, tn, delta, relPct };
  }, [seriesText]);

  const [logL, setLogL] = useState(1.0);
  const [logDL, setLogDL] = useState(0.005);
  const [logT, setLogT] = useState(2.006);
  const [logDT, setLogDT] = useState(0.01);

  const logDiff = useMemo(() => {
    // Example: g = 4*pi^2 * l / T^2
    const val = (4 * Math.PI * Math.PI * logL) / (logT * logT);
    const relL = logL > 0 ? logDL / logL : 0;
    const relT = logT > 0 ? (2 * logDT) / logT : 0;
    const relTot = relL + relT;
    const dg = val * relTot;
    return { val, relL, relT, relTot, dg };
  }, [logL, logDL, logT, logDT]);

  return (
    <div className="space-y-6">
      <header className="pb-4 border-b border-[var(--border)]">
        <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">
          Fizyka (W1–W3 + Laboratorium WIMiFT PP) · Narzędzia obliczeniowe
        </div>
        <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold m-0">
          Laboratorium fizyki
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1.5 mb-0 max-w-2xl">
          Kalkulator wektorów 3D i rzutów ukośnych, symulator równi pochyłej i zderzeń 1D (sprężystych i niesprężystych) oraz kalkulator niepewności pomiarowych (Student–Fisher i różniczka logarytmiczna).
        </p>
      </header>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'vectors', label: '1. Wektory 3D i rzut ukośny', icon: Compass },
          { id: 'dynamics', label: '2. Równia pochyła i zderzenia 1D', icon: Atom },
          { id: 'uncertainty', label: '3. Niepewności pomiarowe (Lab)', icon: Ruler },
        ].map((t) => {
          const Icon = t.icon;
          const act = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`px-3.5 py-2 rounded text-xs font-medium border inline-flex items-center gap-2 cursor-pointer transition-colors ${
                act
                  ? 'bg-[var(--accent)] text-white dark:text-[#0f141c] border-[var(--accent)] font-semibold'
                  : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-strong)] hover:bg-[var(--bg-subtle)]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: VECTORS 3D & PROJECTILE */}
      {tab === 'vectors' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="card p-5 space-y-4">
            <h2 className="font-serif-heading text-lg font-bold m-0">Kalkulator wektorów 3D (Wykład 1)</h2>
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div>
                <div className="text-[var(--text-muted)] mb-1">Wektor a = [a_x, a_y, a_z]</div>
                <div className="grid grid-cols-3 gap-1.5">
                  {va.map((v, i) => (
                    <input
                      key={i}
                      type="number"
                      value={v}
                      onChange={(e) => setVa((p) => p.map((x, idx) => (idx === i ? Number(e.target.value) || 0 : x)))}
                      className="input-field text-xs font-mono text-center"
                    />
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[var(--text-muted)] mb-1">Wektor b = [b_x, b_y, b_z]</div>
                <div className="grid grid-cols-3 gap-1.5">
                  {vb.map((v, i) => (
                    <input
                      key={i}
                      type="number"
                      value={v}
                      onChange={(e) => setVb((p) => p.map((x, idx) => (idx === i ? Number(e.target.value) || 0 : x)))}
                      className="input-field text-xs font-mono text-center"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-1.5 text-xs font-mono">
              <div className="card-subtle px-3 py-2 flex justify-between"><span>|a| oraz |b|:</span> <strong>{fmt(vecStats.magA, 3)} · {fmt(vecStats.magB, 3)}</strong></div>
              <div className="card-subtle px-3 py-2 flex justify-between"><span>a + b / a − b:</span> <strong>[{vecStats.sum.join(', ')}] / [{vecStats.diff.join(', ')}]</strong></div>
              <div className="card-subtle px-3 py-2 flex justify-between">
                <span>Iloczyn skalarny a · b:</span>
                <strong className={vecStats.dot === 0 ? 'text-[var(--success)]' : ''}>
                  {fmt(vecStats.dot, 2)} {vecStats.dot === 0 ? '(a ⊥ b ✓)' : `(∡ = ${fmt(vecStats.deg, 1)}°)`}
                </strong>
              </div>
              <div className="card-subtle px-3 py-2 flex justify-between">
                <span>Iloczyn wektorowy a × b:</span>
                <strong>[{vecStats.cross.map((x) => fmt(x, 2)).join(', ')}] (|a×b| = {fmt(vecStats.magCross, 2)})</strong>
              </div>
            </div>
          </div>

          <div className="card p-5 space-y-4">
            <h2 className="font-serif-heading text-lg font-bold m-0">Symulator rzutu ukośnego (Wykład 2A)</h2>
            <div className="space-y-2.5 text-xs font-mono">
              <label className="flex items-center justify-between gap-3">
                <span>v₀ = {projV0} m/s</span>
                <input type="range" min="5" max="50" step="1" value={projV0} onChange={(e) => setProjV0(Number(e.target.value))} className="w-44 accent-[var(--accent)]" />
              </label>
              <label className="flex items-center justify-between gap-3">
                <span>Kąt α = {projAng}°</span>
                <input type="range" min="0" max="85" step="5" value={projAng} onChange={(e) => setProjAng(Number(e.target.value))} className="w-44 accent-[var(--accent)]" />
              </label>
              <label className="flex items-center justify-between gap-3">
                <span>Wysokość h₀ = {projH0} m</span>
                <input type="range" min="0" max="40" step="2" value={projH0} onChange={(e) => setProjH0(Number(e.target.value))} className="w-44 accent-[var(--crimson)]" />
              </label>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="card-subtle px-3 py-2"><div className="text-[10px] text-[var(--text-muted)]">Składowe v₀x / v₀y</div><strong>{fmt(projStats.vx, 2)} / {fmt(projStats.vy, 2)} m/s</strong></div>
              <div className="card-subtle px-3 py-2"><div className="text-[10px] text-[var(--text-muted)]">Całkowity czas lotu t_c</div><strong>{fmt(projStats.tc, 2)} s</strong></div>
              <div className="card-subtle px-3 py-2"><div className="text-[10px] text-[var(--text-muted)]">Wysokość maks. H_max</div><strong>{fmt(projStats.hMax, 2)} m</strong></div>
              <div className="card-subtle px-3 py-2"><div className="text-[10px] text-[var(--text-muted)]">Zasięg poziomy Z</div><strong className="text-[var(--accent-text)]">{fmt(projStats.range, 2)} m</strong></div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INCLINED PLANE & COLLISIONS */}
      {tab === 'dynamics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="card p-5 space-y-4">
            <h2 className="font-serif-heading text-lg font-bold m-0">Równia pochyła z tarciem (Wykład 3)</h2>
            <div className="space-y-2.5 text-xs font-mono">
              <label className="flex items-center justify-between gap-3">
                <span>Masa m = {planeM} kg</span>
                <input type="range" min="1" max="20" step="1" value={planeM} onChange={(e) => setPlaneM(Number(e.target.value))} className="w-44 accent-[var(--accent)]" />
              </label>
              <label className="flex items-center justify-between gap-3">
                <span>Kąt α = {planeAng}° (graniczny: {fmt(planeStats.critAng, 1)}°)</span>
                <input type="range" min="5" max="60" step="1" value={planeAng} onChange={(e) => setPlaneAng(Number(e.target.value))} className="w-44 accent-[var(--accent)]" />
              </label>
              <label className="flex items-center justify-between gap-3">
                <span>Współczynnik tarcia f = {planeMu.toFixed(2)}</span>
                <input type="range" min="0" max="0.9" step="0.05" value={planeMu} onChange={(e) => setPlaneMu(Number(e.target.value))} className="w-44 accent-[var(--crimson)]" />
              </label>
            </div>
            <div className="space-y-1.5 text-xs font-mono">
              <div className="card-subtle px-3 py-2 flex justify-between"><span>Ciężar F_g = mg:</span> <strong>{fmt(planeStats.fg, 2)} N</strong></div>
              <div className="card-subtle px-3 py-2 flex justify-between"><span>Składowa zsuwająca F_s / Nacisk N:</span> <strong>{fmt(planeStats.fs, 2)} N / {fmt(planeStats.nF, 2)} N</strong></div>
              <div className="card-subtle px-3 py-2 flex justify-between"><span>Maks. siła tarcia T = f·N:</span> <strong>{fmt(planeStats.tMax, 2)} N</strong></div>
              <div className={`px-3 py-2 rounded border font-bold ${planeStats.slides ? 'bg-[var(--danger-soft)] border-[var(--danger)] text-[var(--danger)]' : 'bg-[var(--success-soft)] border-[var(--success)] text-[var(--success)]'}`}>
                {planeStats.slides
                  ? `Klocek zsuwa się z a = ${fmt(planeStats.a, 2)} m/s²`
                  : 'Klocek spoczywa (F_s ≤ T_max) → a = 0 m/s²'}
              </div>
            </div>
          </div>

          <div className="card p-5 space-y-4">
            <h2 className="font-serif-heading text-lg font-bold m-0">Zderzenia 1D: sprężyste vs niesprężyste</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
              <label>m₁ [kg]<input type="number" min="0.1" step="0.5" value={m1} onChange={(e) => setM1(Math.max(0.1, Number(e.target.value) || 1))} className="input-field mt-1 text-xs" /></label>
              <label>v₁p [m/s]<input type="number" step="1" value={v1p} onChange={(e) => setV1p(Number(e.target.value) || 0)} className="input-field mt-1 text-xs" /></label>
              <label>m₂ [kg]<input type="number" min="0.1" step="0.5" value={m2} onChange={(e) => setM2(Math.max(0.1, Number(e.target.value) || 1))} className="input-field mt-1 text-xs" /></label>
              <label>v₂p [m/s]<input type="number" step="1" value={v2p} onChange={(e) => setV2p(Number(e.target.value) || 0)} className="input-field mt-1 text-xs" /></label>
            </div>
            <div className="space-y-2 text-xs font-mono">
              <div className="card-subtle px-3 py-2">
                Stan początkowy: p = <strong>{fmt(collStats.pInit, 2)} kg·m/s</strong> · E_k = <strong>{fmt(collStats.ekInit, 2)} J</strong>
              </div>
              <div className="p-3 rounded border border-[var(--border)] bg-[var(--bg-elevated)] space-y-1">
                <div className="font-sans font-bold text-[var(--text)]">Zderzenie idealnie niesprężyste (zlepienie)</div>
                <div>Wspólna v_k = <strong className="text-[var(--accent-text)]">{fmt(collStats.vk, 3)} m/s</strong></div>
                <div>E_k po zderzeniu = {fmt(collStats.ekInel, 2)} J (strata: <strong className="text-[var(--danger)]">{fmt(collStats.lossPct, 1)}%</strong>)</div>
              </div>
              <div className="p-3 rounded border border-[var(--border)] bg-[var(--bg-elevated)] space-y-1">
                <div className="font-sans font-bold text-[var(--text)]">Zderzenie idealnie sprężyste (p i E_k zachowane)</div>
                <div>v₁k = <strong className="text-[var(--success)]">{fmt(collStats.v1k, 3)} m/s</strong> · v₂k = <strong className="text-[var(--success)]">{fmt(collStats.v2k, 3)} m/s</strong></div>
                <div>E_k po zderzeniu = {fmt(collStats.ekEl, 2)} J (strata: 0%) ✓</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: LAB UNCERTAINTY CALCULATOR */}
      {tab === 'uncertainty' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="card p-5 space-y-4">
            <h2 className="font-serif-heading text-lg font-bold m-0">Niepewność małej serii (Student–Fisher)</h2>
            <p className="text-xs text-[var(--text-muted)] m-0">
              Wpisz wyniki powtórzeń pomiaru (rozdzielone przecinkami lub spacjami).
            </p>
            <input
              type="text"
              value={seriesText}
              onChange={(e) => setSeriesText(e.target.value)}
              className="input-field text-sm font-mono"
            />
            {seriesStats ? (
              <div className="space-y-1.5 text-xs font-mono">
                <div className="card-subtle px-3 py-2 flex justify-between"><span>Liczba pomiarów n / wsp. t_n (p=68,3%):</span> <strong>n = {seriesStats.n} · t_n = {seriesStats.tn}</strong></div>
                <div className="card-subtle px-3 py-2 flex justify-between"><span>Średnia arytmetyczna x̄:</span> <strong>{fmt(seriesStats.mean, 4)}</strong></div>
                <div className="card-subtle px-3 py-2 flex justify-between"><span>Odchylenie std. średniej s(x̄):</span> <strong>{fmt(seriesStats.sMean, 4)}</strong></div>
                <div className="px-3 py-2.5 rounded bg-[var(--accent-soft)] border border-[var(--accent)] text-[var(--accent-text)] font-bold">
                  Δx̄ = t_n · s(x̄) = {fmt(seriesStats.delta, 4)} (błąd wzgl.: {fmt(seriesStats.relPct, 2)}%)
                </div>
              </div>
            ) : (
              <div className="text-xs text-[var(--danger)]">Wpisz co najmniej 2 liczby pomiarowe.</div>
            )}
          </div>

          <div className="card p-5 space-y-4">
            <h2 className="font-serif-heading text-lg font-bold m-0">Różniczka logarytmiczna (g = 4π² l / T²)</h2>
            <p className="text-xs text-[var(--text-muted)] m-0">
              Przykład wahadła matematycznego: Δg/g = Δl/l + 2·(ΔT/T). Zauważ wagę potęgi 2 przy okresie T!
            </p>
            <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
              <label>Długość l [m]<input type="number" step="0.01" value={logL} onChange={(e) => setLogL(Math.max(0.01, Number(e.target.value) || 1))} className="input-field mt-1 text-xs" /></label>
              <label>Niepewność Δl [m]<input type="number" step="0.001" value={logDL} onChange={(e) => setLogDL(Math.max(0, Number(e.target.value) || 0))} className="input-field mt-1 text-xs" /></label>
              <label>Okres T [s]<input type="number" step="0.01" value={logT} onChange={(e) => setLogT(Math.max(0.01, Number(e.target.value) || 1))} className="input-field mt-1 text-xs" /></label>
              <label>Niepewność ΔT [s]<input type="number" step="0.001" value={logDT} onChange={(e) => setLogDT(Math.max(0, Number(e.target.value) || 0))} className="input-field mt-1 text-xs" /></label>
            </div>
            <div className="space-y-1.5 text-xs font-mono">
              <div className="card-subtle px-3 py-2 flex justify-between"><span>Udział Δl/l oraz 2·ΔT/T:</span> <strong>{fmt(logDiff.relL * 100, 2)}% + {fmt(logDiff.relT * 100, 2)}%</strong></div>
              <div className="card-subtle px-3 py-2 flex justify-between"><span>Łączny błąd względny Δg/g:</span> <strong>{fmt(logDiff.relTot * 100, 2)}%</strong></div>
              <div className="px-3 py-2.5 rounded bg-[var(--success-soft)] border border-[var(--success)] text-[var(--success)] font-bold">
                g = ({fmt(logDiff.val, 3)} ± {fmt(logDiff.dg, 3)}) m/s²
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
