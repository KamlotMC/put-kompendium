import React, { useMemo, useState } from 'react';
import { Sigma, Grid3X3, Compass } from 'lucide-react';

function fmt(v, d = 3) {
  if (!Number.isFinite(v)) return '—';
  const r = Math.abs(v) < 1e-9 ? 0 : v;
  return Number.isInteger(r) ? String(r) : r.toFixed(d).replace(/\.?0+$/, '');
}

function det2(m) {
  return m[0][0] * m[1][1] - m[0][1] * m[1][0];
}

function det3(m) {
  return (
    m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
    m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
    m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])
  );
}

function adj3(m) {
  // Cofactor matrix transposed
  const cof = [
    [
      m[1][1] * m[2][2] - m[1][2] * m[2][1],
      -(m[1][0] * m[2][2] - m[1][2] * m[2][0]),
      m[1][0] * m[2][1] - m[1][1] * m[2][0],
    ],
    [
      -(m[0][1] * m[2][2] - m[0][2] * m[2][1]),
      m[0][0] * m[2][2] - m[0][2] * m[2][0],
      -(m[0][0] * m[2][1] - m[0][1] * m[2][0]),
    ],
    [
      m[0][1] * m[1][2] - m[0][2] * m[1][1],
      -(m[0][0] * m[1][2] - m[0][2] * m[1][0]),
      m[0][0] * m[1][1] - m[0][1] * m[1][0],
    ],
  ];
  return [
    [cof[0][0], cof[1][0], cof[2][0]],
    [cof[0][1], cof[1][1], cof[2][1]],
    [cof[0][2], cof[1][2], cof[2][2]],
  ];
}

function replaceCol3(m, colIdx, b) {
  return m.map((row, i) => row.map((v, j) => (j === colIdx ? b[i] : v)));
}

export function AlgLabPage() {
  const [tab, setTab] = useState('complex'); // 'complex' | 'matrix' | 'eigen'

  // Tab 1: Complex number & nth roots
  const [re, setRe] = useState(0);
  const [im, setIm] = useState(8);
  const [rootN, setRootN] = useState(3);
  const [powK, setPowK] = useState(4);

  const complexStats = useMemo(() => {
    const r = Math.hypot(re, im);
    const phi = Math.atan2(im, re);
    const phiDeg = (phi * 180) / Math.PI;
    const invRe = r > 0 ? re / (r * r) : NaN;
    const invIm = r > 0 ? -im / (r * r) : NaN;
    const pkR = Math.pow(r, powK);
    const pkRe = pkR * Math.cos(powK * phi);
    const pkIm = pkR * Math.sin(powK * phi);
    const rho = Math.pow(r, 1 / rootN);
    const roots =
      r > 0
        ? Array.from({ length: rootN }, (_, k) => {
            const ang = (phi + 2 * Math.PI * k) / rootN;
            return {
              k,
              ang,
              deg: (((ang * 180) / Math.PI) % 360 + 360) % 360,
              x: rho * Math.cos(ang),
              y: rho * Math.sin(ang),
            };
          })
        : [];
    return { r, phi, phiDeg, invRe, invIm, pkRe, pkIm, rho, roots };
  }, [re, im, rootN, powK]);

  // Tab 2: 3x3 Matrix & Cramer System (preloaded with Lecture 03 sl. 10 example!)
  const [mat, setMat] = useState([
    [3, 2, -2],
    [4, 4, -3],
    [-1, -1, 1],
  ]);
  const [vecB, setVecB] = useState([-1, 3, 2]);

  const matrixStats = useMemo(() => {
    const d = det3(mat);
    const tr = mat[0][0] + mat[1][1] + mat[2][2];
    const adj = adj3(mat);
    const dx = det3(replaceCol3(mat, 0, vecB));
    const dy = det3(replaceCol3(mat, 1, vecB));
    const dz = det3(replaceCol3(mat, 2, vecB));
    const invertible = Math.abs(d) > 1e-9;
    const inv = invertible ? adj.map((row) => row.map((v) => v / d)) : null;
    const sol = invertible ? [dx / d, dy / d, dz / d] : null;
    return { d, tr, adj, dx, dy, dz, invertible, inv, sol };
  }, [mat, vecB]);

  const updateCell = (i, j, val) => {
    const num = Number(val);
    setMat((prev) => prev.map((row, ri) => row.map((c, ci) => (ri === i && ci === j ? (Number.isFinite(num) ? num : 0) : c))));
  };

  // Tab 3: 2x2 Eigenvalues & Eigenvectors (preloaded with Lecture 04 sl. 7 example!)
  const [eMat, setEMat] = useState([
    [0, 1],
    [2, 1],
  ]);

  const eigenStats = useMemo(() => {
    const [[a, b], [c, d]] = eMat;
    const tr = a + d;
    const det = det2(eMat);
    const disc = tr * tr - 4 * det;
    if (disc >= -1e-9) {
      const sd = Math.sqrt(Math.max(0, disc));
      const l1 = (tr + sd) / 2;
      const l2 = (tr - sd) / 2;
      const findVec = (lam) => {
        const m00 = a - lam;
        const m01 = b;
        const m10 = c;
        const m11 = d - lam;
        if (Math.hypot(m00, m01) >= Math.hypot(m10, m11)) {
          if (Math.hypot(m00, m01) < 1e-9) return [1, 0];
          return [-m01, m00];
        }
        if (Math.hypot(m10, m11) < 1e-9) return [1, 0];
        return [-m11, m10];
      };
      const normalizeNice = ([vx, vy]) => {
        if (Math.abs(vx) > 1e-6) return [1, vy / vx];
        if (Math.abs(vy) > 1e-6) return [0, 1];
        return [1, 0];
      };
      return {
        isComplex: false,
        tr,
        det,
        disc,
        l1,
        l2,
        v1: normalizeNice(findVec(l1)),
        v2: normalizeNice(findVec(l2)),
      };
    }
    const alpha = tr / 2;
    const beta = Math.sqrt(-disc) / 2;
    return { isComplex: true, tr, det, disc, alpha, beta };
  }, [eMat]);

  return (
    <div className="space-y-6">
      <header className="pb-4 border-b border-[var(--border)]">
        <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">
          Algebra liniowa dla ICT · Narzędzia obliczeniowe i wizualizacje
        </div>
        <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold m-0">
          Laboratorium algebry liniowej
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1.5 mb-0 max-w-2xl">
          Eksperymentuj na przykładach z wykładów prowadzącego: pierwiastki zespolone ⁿ√z, wyznaczniki, macierz dołączona Aᴰ i układ Cramera 3×3 oraz wartości i wektory własne macierzy 2×2.
        </p>
      </header>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'complex', label: 'Liczby zespolone i pierwiastki', icon: Compass },
          { id: 'matrix', label: 'Macierz 3×3, A⁻¹ i układ Cramera', icon: Grid3X3 },
          { id: 'eigen', label: 'Wartości i wektory własne 2×2', icon: Sigma },
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
                  : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--border-strong)]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" /> {t.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: Complex Numbers & Roots */}
      {tab === 'complex' && (
        <section className="card p-5 sm:p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--border)]">
            <h2 className="font-serif-heading text-lg font-bold m-0">Kalkulator liczb zespolonych, de Moivre’a i ⁿ√z</h2>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: '8j, n=3 (W01 sl.29)', x: 0, y: 8, n: 3 },
                { label: '1, n=4 (W01 sl.30)', x: 1, y: 0, n: 4 },
                { label: '1−j, n=4 (W01 sl.27)', x: 1, y: -1, n: 4 },
                { label: '−1−j, n=3', x: -1, y: -1, n: 3 },
              ].map((pr) => (
                <button
                  key={pr.label}
                  type="button"
                  onClick={() => {
                    setRe(pr.x);
                    setIm(pr.y);
                    setRootN(pr.n);
                  }}
                  className="px-2 py-1 rounded text-[11px] font-mono border border-[var(--border)] bg-[var(--bg-subtle)] hover:border-[var(--accent)] cursor-pointer"
                >
                  {pr.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <label className="space-y-1">
              <span className="text-[var(--text-muted)]">Część rzeczywista x = Re z</span>
              <input type="number" step="0.5" value={re} onChange={(e) => setRe(Number(e.target.value))} className="input-field text-sm" />
            </label>
            <label className="space-y-1">
              <span className="text-[var(--text-muted)]">Część urojona y = Im z</span>
              <input type="number" step="0.5" value={im} onChange={(e) => setIm(Number(e.target.value))} className="input-field text-sm" />
            </label>
            <label className="space-y-1">
              <span className="text-[var(--text-muted)]">Stopień pierwiastka n (2–8)</span>
              <input
                type="number"
                min="2"
                max="8"
                value={rootN}
                onChange={(e) => setRootN(Math.max(2, Math.min(8, Number(e.target.value) || 2)))}
                className="input-field text-sm"
              />
            </label>
            <label className="space-y-1">
              <span className="text-[var(--text-muted)]">Potęga k dla zᵏ</span>
              <input
                type="number"
                min="-6"
                max="12"
                value={powK}
                onChange={(e) => setPowK(Math.max(-6, Math.min(12, Number(e.target.value) || 1)))}
                className="input-field text-sm"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div className="lg:col-span-6 space-y-2.5 text-xs font-mono">
              <div className="card-subtle p-3.5 space-y-1.5">
                <div><span className="text-[var(--text-muted)]">Postać algebraiczna:</span> <strong>z = {fmt(re)} {im >= 0 ? '+' : '−'} {fmt(Math.abs(im))}j</strong></div>
                <div><span className="text-[var(--text-muted)]">Sprzężenie z̄:</span> {fmt(re)} {-im >= 0 ? '+' : '−'} {fmt(Math.abs(im))}j</div>
                <div><span className="text-[var(--text-muted)]">Moduł |z| = r:</span> <strong>{fmt(complexStats.r, 4)}</strong> (|z|² = {fmt(re * re + im * im, 3)})</div>
                <div><span className="text-[var(--text-muted)]">Argument główny arg z:</span> <strong>{fmt(complexStats.phi, 4)} rad</strong> ({fmt(complexStats.phiDeg, 1)}°)</div>
                <div><span className="text-[var(--text-muted)]">Postać wykładnicza:</span> {fmt(complexStats.r, 3)} · e^(j · {fmt(complexStats.phi, 3)})</div>
                <div>
                  <span className="text-[var(--text-muted)]">Odwrotność z⁻¹:</span>{' '}
                  {complexStats.r > 0
                    ? `${fmt(complexStats.invRe, 4)} ${complexStats.invIm >= 0 ? '+' : '−'} ${fmt(Math.abs(complexStats.invIm), 4)}j`
                    : 'nie istnieje (z = 0)'}
                </div>
                <div>
                  <span className="text-[var(--text-muted)]">Potęga z^({powK}) (de Moivre):</span>{' '}
                  <strong>
                    {fmt(complexStats.pkRe, 3)} {complexStats.pkIm >= 0 ? '+' : '−'} {fmt(Math.abs(complexStats.pkIm), 3)}j
                  </strong>
                </div>
              </div>

              <div className="card-subtle p-3.5">
                <div className="text-[11px] uppercase text-[var(--text-muted)] mb-2">
                  Wszystkie {rootN} pierwiastków stopnia {rootN} (promień ⁿ√r = {fmt(complexStats.rho, 4)}):
                </div>
                {complexStats.roots.length === 0 ? (
                  <div className="text-[var(--text-muted)]">Dla z = 0 jedynym pierwiastkiem jest t = 0.</div>
                ) : (
                  <div className="space-y-1">
                    {complexStats.roots.map((rt) => (
                      <div key={rt.k} className="flex justify-between gap-2">
                        <span>
                          <strong>t{rt.k}</strong> = {fmt(rt.x, 3)} {rt.y >= 0 ? '+' : '−'} {fmt(Math.abs(rt.y), 3)}j
                        </span>
                        <span className="text-[var(--text-muted)]">∠ {fmt(rt.deg, 1)}°</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-6">
              <svg viewBox="0 0 320 290" className="w-full max-w-[360px] mx-auto block rounded border border-[var(--border)] bg-[var(--bg)]">
                <line x1={20} y1={145} x2={300} y2={145} stroke="var(--text-muted)" strokeWidth="1" />
                <line x1={160} y1={275} x2={160} y2={15} stroke="var(--text-muted)" strokeWidth="1" />
                <text x={282} y={139} fontSize="10" fontFamily="monospace" fill="var(--text-muted)">Re</text>
                <text x={166} y={24} fontSize="10" fontFamily="monospace" fill="var(--text-muted)">Im</text>
                <circle cx={160} cy={145} r={104} fill="none" stroke="var(--border-strong)" strokeDasharray="4 4" />
                {complexStats.roots.length >= 3 && (
                  <polygon
                    points={complexStats.roots
                      .map((rt) => `${160 + (rt.x / complexStats.rho) * 104},${145 - (rt.y / complexStats.rho) * 104}`)
                      .join(' ')}
                    fill="#1d3557"
                    fillOpacity="0.12"
                    stroke="#b45309"
                    strokeWidth="1.6"
                  />
                )}
                {complexStats.roots.map((rt) => {
                  const px = 160 + (rt.x / complexStats.rho) * 104;
                  const py = 145 - (rt.y / complexStats.rho) * 104;
                  return (
                    <g key={rt.k}>
                      <line x1={160} y1={145} x2={px} y2={py} stroke={rt.k === 0 ? '#9b2226' : '#1d3557'} strokeWidth="1.6" />
                      <circle cx={px} cy={py} r="5" fill={rt.k === 0 ? '#9b2226' : '#1d3557'} />
                      <text x={px + (rt.x >= 0 ? 7 : -22)} y={py + (rt.y >= 0 ? -6 : 14)} fontSize="10.5" fontWeight="700" fontFamily="monospace" fill={rt.k === 0 ? '#9b2226' : '#1d3557'}>
                        t{rt.k}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </section>
      )}

      {/* TAB 2: 3x3 Matrix, Adjugate, Inverse & Cramer System */}
      {tab === 'matrix' && (
        <section className="card p-5 sm:p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--border)]">
            <h2 className="font-serif-heading text-lg font-bold m-0">Macierz 3×3, wyznacznik, Aᴰ, A⁻¹ i układ Cramera AX = B</h2>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setMat([
                    [3, 2, -2],
                    [4, 4, -3],
                    [-1, -1, 1],
                  ]);
                  setVecB([-1, 3, 2]);
                }}
                className="px-2 py-1 rounded text-[11px] font-mono border border-[var(--border)] bg-[var(--bg-subtle)] cursor-pointer"
              >
                Układ z Wykładu 03 (→ 3, 6, 11)
              </button>
              <button
                type="button"
                onClick={() => {
                  setMat([
                    [2, 0, 0],
                    [0, 1, 1],
                    [-1, 0, 1],
                  ]);
                  setVecB([4, 3, 1]);
                }}
                className="px-2 py-1 rounded text-[11px] font-mono border border-[var(--border)] bg-[var(--bg-subtle)] cursor-pointer"
              >
                Macierz z Wykładu 02 sl. 41 (det=2)
              </button>
              <button
                type="button"
                onClick={() => {
                  setMat([
                    [1, 2, 3],
                    [2, 4, 6],
                    [0, 1, 1],
                  ]);
                  setVecB([1, 2, 3]);
                }}
                className="px-2 py-1 rounded text-[11px] font-mono border border-[var(--border)] bg-[var(--bg-subtle)] cursor-pointer"
              >
                Macierz osobliwa (det = 0)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div className="lg:col-span-5 space-y-3">
              <div className="text-xs font-mono text-[var(--text-muted)]">Wpisz macierz współczynników A oraz wektor wyrazów wolnych B:</div>
              <div className="flex items-center gap-3">
                <div className="grid grid-cols-3 gap-1.5 flex-1">
                  {mat.map((row, i) =>
                    row.map((val, j) => (
                      <input
                        key={`${i}-${j}`}
                        type="number"
                        step="1"
                        value={val}
                        onChange={(e) => updateCell(i, j, e.target.value)}
                        className="input-field text-center font-mono text-sm !px-1.5"
                      />
                    ))
                  )}
                </div>
                <span className="font-mono text-sm text-[var(--text-muted)]">|</span>
                <div className="grid grid-cols-1 gap-1.5 w-16">
                  {vecB.map((val, i) => (
                    <input
                      key={`b-${i}`}
                      type="number"
                      step="1"
                      value={val}
                      onChange={(e) =>
                        setVecB((prev) => prev.map((v, idx) => (idx === i ? Number(e.target.value) || 0 : v)))
                      }
                      className="input-field text-center font-mono text-sm !px-1.5"
                    />
                  ))}
                </div>
              </div>

              <div className="card-subtle p-3.5 text-xs font-mono space-y-1">
                <div>det A = <strong className={matrixStats.invertible ? 'text-[var(--success)]' : 'text-[var(--danger)]'}>{fmt(matrixStats.d, 3)}</strong> ({matrixStats.invertible ? 'nieosobliwa — układ Cramera!' : 'osobliwa — brak A⁻¹'})</div>
                <div>Ślad tr(A) = {fmt(matrixStats.tr, 3)}</div>
                <div>det Aₓ = {fmt(matrixStats.dx, 3)} · det Aᵧ = {fmt(matrixStats.dy, 3)} · det A_z = {fmt(matrixStats.dz, 3)}</div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3 text-xs font-mono">
              {matrixStats.invertible ? (
                <>
                  <div className="card-subtle p-3.5 border-l-[3px] border-l-[var(--success)]">
                    <div className="text-[11px] uppercase text-[var(--success)] mb-1">Rozwiązanie układu AX = B (wzory Cramera / X = A⁻¹B):</div>
                    <div className="text-sm font-bold text-[var(--text)]">
                      x = {fmt(matrixStats.sol[0], 4)}, &nbsp; y = {fmt(matrixStats.sol[1], 4)}, &nbsp; z = {fmt(matrixStats.sol[2], 4)}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="card-subtle p-3.5">
                      <div className="text-[10px] uppercase text-[var(--text-muted)] mb-2">Macierz dołączona Aᴰ = [Aᵢⱼ]ᵀ:</div>
                      <div className="grid grid-cols-3 gap-1 text-center">
                        {matrixStats.adj.flat().map((v, idx) => (
                          <span key={idx} className="py-1 rounded bg-[var(--bg-elevated)] border border-[var(--border)]">{fmt(v, 2)}</span>
                        ))}
                      </div>
                    </div>
                    <div className="card-subtle p-3.5">
                      <div className="text-[10px] uppercase text-[var(--text-muted)] mb-2">Macierz odwrotna A⁻¹ = (1/det A)·Aᴰ:</div>
                      <div className="grid grid-cols-3 gap-1 text-center">
                        {matrixStats.inv.flat().map((v, idx) => (
                          <span key={idx} className="py-1 rounded bg-[var(--bg-elevated)] border border-[var(--border)]">{fmt(v, 3)}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="card-subtle p-4 border-l-[3px] border-l-[var(--danger)] text-[var(--text-secondary)]">
                  <strong className="text-[var(--danger)]">det A = 0:</strong> Macierz A jest osobliwa — nie istnieje macierz odwrotna A⁻¹ ani jednoznaczne rozwiązanie Cramera. Układ AX = B jest albo sprzeczny, albo ma nieskończenie wiele rozwiązań (zastosuj eliminację Gaussa).
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: 2x2 Eigenvalues & Eigenvectors */}
      {tab === 'eigen' && (
        <section className="card p-5 sm:p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--border)]">
            <h2 className="font-serif-heading text-lg font-bold m-0">Kalkulator wielomianu charakterystycznego i wektorów własnych (2×2)</h2>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: 'Wykład 04 sl.7: [[0,1],[2,1]]', m: [[0, 1], [2, 1]] },
                { label: 'Obrót 90° (sl.13): [[0,−1],[1,0]]', m: [[0, -1], [1, 0]] },
                { label: 'Symetryczna: [[3,1],[1,3]]', m: [[3, 1], [1, 3]] },
                { label: 'Osobliwa (λ=0): [[2,4],[1,2]]', m: [[2, 4], [1, 2]] },
              ].map((pr) => (
                <button
                  key={pr.label}
                  type="button"
                  onClick={() => setEMat(pr.m)}
                  className="px-2 py-1 rounded text-[11px] font-mono border border-[var(--border)] bg-[var(--bg-subtle)] cursor-pointer"
                >
                  {pr.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            <div className="md:col-span-4 space-y-3">
              <div className="text-xs font-mono text-[var(--text-muted)]">Macierz A ∈ M₂ₓ₂(ℝ):</div>
              <div className="grid grid-cols-2 gap-2 max-w-[200px]">
                {eMat.map((row, i) =>
                  row.map((val, j) => (
                    <input
                      key={`e-${i}-${j}`}
                      type="number"
                      step="0.5"
                      value={val}
                      onChange={(e) => {
                        const n = Number(e.target.value);
                        setEMat((prev) =>
                          prev.map((r, ri) => r.map((c, ci) => (ri === i && ci === j ? (Number.isFinite(n) ? n : 0) : c)))
                        );
                      }}
                      className="input-field text-center font-mono text-sm"
                    />
                  ))
                )}
              </div>
              <div className="card-subtle p-3 text-xs font-mono space-y-1">
                <div>tr(A) = a + d = <strong>{fmt(eigenStats.tr, 3)}</strong></div>
                <div>det(A) = ad − bc = <strong>{fmt(eigenStats.det, 3)}</strong></div>
                <div>Δ = tr(A)² − 4·det(A) = <strong>{fmt(eigenStats.disc, 3)}</strong></div>
              </div>
            </div>

            <div className="md:col-span-8 card-subtle p-4 space-y-3 text-xs sm:text-sm font-mono">
              <div>
                <span className="text-[var(--text-muted)]">Wielomian charakterystyczny:</span>{' '}
                <strong>
                  χ_A(λ) = λ² {eigenStats.tr >= 0 ? '−' : '+'} {fmt(Math.abs(eigenStats.tr), 3)}λ {eigenStats.det >= 0 ? '+' : '−'} {fmt(Math.abs(eigenStats.det), 3)} = 0
                </strong>
              </div>

              {!eigenStats.isComplex ? (
                <div className="space-y-2 pt-2 border-t border-[var(--border)]">
                  <div className="text-[var(--success)] font-bold">
                    Rzeczywiste wartości własne (Δ ≥ 0): λ₁ = {fmt(eigenStats.l1, 4)}, &nbsp; λ₂ = {fmt(eigenStats.l2, 4)}
                  </div>
                  <div>
                    Przykładowy wektor własny dla λ₁ = {fmt(eigenStats.l1, 3)}: <strong>X₁ = [{fmt(eigenStats.v1[0], 3)}, {fmt(eigenStats.v1[1], 3)}]ᵀ</strong>
                  </div>
                  <div>
                    Przykładowy wektor własny dla λ₂ = {fmt(eigenStats.l2, 3)}: <strong>X₂ = [{fmt(eigenStats.v2[0], 3)}, {fmt(eigenStats.v2[1], 3)}]ᵀ</strong>
                  </div>
                  <div className="text-[11px] text-[var(--text-muted)] pt-1">
                    Kontrola: λ₁ + λ₂ = {fmt(eigenStats.l1 + eigenStats.l2, 3)} = tr(A) ✓ &nbsp;|&nbsp; λ₁ · λ₂ = {fmt(eigenStats.l1 * eigenStats.l2, 3)} = det(A) ✓
                  </div>
                </div>
              ) : (
                <div className="space-y-2 pt-2 border-t border-[var(--border)]">
                  <div className="text-[var(--crimson)] font-bold">
                    Brak rzeczywistych wartości własnych (Δ &lt; 0)!
                  </div>
                  <div>
                    Nad ciałem liczb zespolonych ℂ mamy parę sprzężoną:{' '}
                    <strong>
                      λ₁,₂ = {fmt(eigenStats.alpha, 3)} ± {fmt(eigenStats.beta, 3)}j
                    </strong>
                  </div>
                  <div className="text-[11px] text-[var(--text-muted)]">
                    Geometrycznie macierz zawiera składową obrotu — żaden niezerowy wektor rzeczywisty nie zachowuje swojego kierunku.
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
