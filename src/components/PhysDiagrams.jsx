import React, { useState } from 'react';

const NAVY = '#1d3557';
const CRIMSON = '#9b2226';
const FOREST = '#2d6a4f';
const AMBER = '#b45309';

function fmt(v, d = 2) {
  if (!Number.isFinite(v)) return '—';
  const r = Math.abs(v) < 1e-10 ? 0 : v;
  return Number.isInteger(r) ? String(r) : r.toFixed(d).replace(/\.?0+$/, '');
}

// 1. Vectors 2D/3D: sum, dot product, cross product area (phys-vectors-3d)
function PhysVectorsDiagram() {
  const [ax, setAx] = useState(3);
  const [ay, setAy] = useState(1);
  const [bx, setBx] = useState(1);
  const [by, setBy] = useState(3);

  const W = 540;
  const H = 250;
  const ox = 110;
  const oy = 195;
  const sc = 32;

  const toX = (u) => ox + u * sc;
  const toY = (v) => oy - v * sc;

  const magA = Math.hypot(ax, ay);
  const magB = Math.hypot(bx, by);
  const dot = ax * bx + ay * by;
  const crossZ = ax * by - ay * bx;
  const cosAng = magA > 0 && magB > 0 ? Math.max(-1, Math.min(1, dot / (magA * magB))) : 1;
  const deg = (Math.acos(cosAng) * 180) / Math.PI;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3 text-xs font-mono">
        <label className="flex items-center gap-1.5">
          a = [{ax}, {ay}]
          <input type="range" min="-2" max="5" step="1" value={ax} onChange={(e) => setAx(Number(e.target.value))} className="w-16 accent-[var(--accent)]" />
          <input type="range" min="-1" max="4" step="1" value={ay} onChange={(e) => setAy(Number(e.target.value))} className="w-16 accent-[var(--accent)]" />
        </label>
        <label className="flex items-center gap-1.5">
          b = [{bx}, {by}]
          <input type="range" min="-2" max="5" step="1" value={bx} onChange={(e) => setBx(Number(e.target.value))} className="w-16 accent-[var(--crimson)]" />
          <input type="range" min="-1" max="4" step="1" value={by} onChange={(e) => setBy(Number(e.target.value))} className="w-16 accent-[var(--crimson)]" />
        </label>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[580px] mx-auto block rounded border border-[var(--border)] bg-[var(--bg)]">
        {/* Grid */}
        {[-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((gx) => (
          <line key={`gx-${gx}`} x1={toX(gx)} y1={12} x2={toX(gx)} y2={H - 12} stroke="var(--border)" strokeWidth="0.7" />
        ))}
        {[-1, 0, 1, 2, 3, 4, 5].map((gy) => (
          <line key={`gy-${gy}`} x1={12} y1={toY(gy)} x2={W - 12} y2={toY(gy)} stroke="var(--border)" strokeWidth="0.7" />
        ))}

        {/* Axes */}
        <line x1={14} y1={oy} x2={W - 14} y2={oy} stroke="var(--text-muted)" strokeWidth="1.2" />
        <line x1={ox} y1={H - 12} x2={ox} y2={14} stroke="var(--text-muted)" strokeWidth="1.2" />
        <text x={W - 24} y={oy - 6} fontSize="10.5" fontFamily="monospace" fill="var(--text-muted)">x</text>
        <text x={ox + 6} y={24} fontSize="10.5" fontFamily="monospace" fill="var(--text-muted)">y</text>

        {/* Parallelogram area = |a x b| */}
        <polygon
          points={`${toX(0)},${toY(0)} ${toX(ax)},${toY(ay)} ${toX(ax + bx)},${toY(ay + by)} ${toX(bx)},${toY(by)}`}
          fill={AMBER}
          opacity="0.14"
          stroke={AMBER}
          strokeDasharray="4 3"
          strokeWidth="1.2"
        />

        {/* Sum vector a+b */}
        <line x1={toX(0)} y1={toY(0)} x2={toX(ax + bx)} y2={toY(ay + by)} stroke={FOREST} strokeWidth="2.2" strokeDasharray="5 3" />
        <circle cx={toX(ax + bx)} cy={toY(ay + by)} r="3.5" fill={FOREST} />

        {/* Vector a */}
        <line x1={toX(0)} y1={toY(0)} x2={toX(ax)} y2={toY(ay)} stroke={NAVY} strokeWidth="2.8" />
        <circle cx={toX(ax)} cy={toY(ay)} r="4" fill={NAVY} />
        <text x={toX(ax) + 6} y={toY(ay) - 5} fontSize="11" fontFamily="monospace" fontWeight="700" fill={NAVY}>a</text>

        {/* Vector b */}
        <line x1={toX(0)} y1={toY(0)} x2={toX(bx)} y2={toY(by)} stroke={CRIMSON} strokeWidth="2.8" />
        <circle cx={toX(bx)} cy={toY(by)} r="4" fill={CRIMSON} />
        <text x={toX(bx) + 6} y={toY(by) - 5} fontSize="11" fontFamily="monospace" fontWeight="700" fill={CRIMSON}>b</text>
        <text x={toX(ax + bx) + 6} y={toY(ay + by) - 4} fontSize="10.5" fontFamily="monospace" fontWeight="700" fill={FOREST}>a + b</text>
      </svg>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
        <div className="px-3 py-2 rounded bg-[var(--bg-subtle)] border border-[var(--border)]">
          a · b = <strong className="text-[var(--text)]">{dot}</strong> ({dot === 0 ? 'a ⊥ b ✓' : `∡ = ${fmt(deg, 1)}°`})
        </div>
        <div className="px-3 py-2 rounded bg-[var(--bg-subtle)] border border-[var(--border)]">
          a × b = <strong className="text-[var(--text)]">[0, 0, {crossZ}]</strong> (pole = {Math.abs(crossZ)})
        </div>
        <div className="px-3 py-2 rounded bg-[var(--bg-subtle)] border border-[var(--border)]">
          a + b = <strong className="text-[var(--text)]">[{ax + bx}, {ay + by}]</strong> (|a|={fmt(magA, 2)})
        </div>
      </div>
    </div>
  );
}

// 2. Kinematics Graphs & Projectile Trajectory (phys-kinematics-graphs)
function PhysKinematicsGraphsDiagram() {
  const [mode, setMode] = useState('projectile'); // 'projectile' | 'linear'
  const [angle, setAngle] = useState(45);
  const [accel, setAccel] = useState(2);

  const g = 9.81;
  const v0 = 20;
  const rad = (angle * Math.PI) / 180;
  const tc = (2 * v0 * Math.sin(rad)) / g;
  const hMax = (v0 * v0 * Math.sin(rad) * Math.sin(rad)) / (2 * g);
  const range = (v0 * v0 * Math.sin(2 * rad)) / g;

  const W = 560;
  const H = 225;
  const padL = 42;
  const padB = 30;
  const padT = 18;
  const padR = 20;

  const maxX = 45;
  const maxY = 23;
  const toX = (x) => padL + (x / maxX) * (W - padL - padR);
  const toY = (y) => padT + (1 - y / maxY) * (H - padT - padB);

  const makeCurve = (angDeg) => {
    const r = (angDeg * Math.PI) / 180;
    const tEnd = (2 * v0 * Math.sin(r)) / g;
    return Array.from({ length: 60 }, (_, i) => {
      const t = (i / 59) * tEnd;
      const x = v0 * Math.cos(r) * t;
      const y = Math.max(0, v0 * Math.sin(r) * t - 0.5 * g * t * t);
      return `${toX(x).toFixed(1)},${toY(y).toFixed(1)}`;
    }).join(' ');
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setMode('projectile')}
            className={`px-2.5 py-1 rounded text-xs font-medium border cursor-pointer ${
              mode === 'projectile'
                ? 'bg-[var(--accent)] text-white dark:text-[#0f141c] border-[var(--accent)]'
                : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border)]'
            }`}
          >
            Rzut ukośny (v₀ = 20 m/s)
          </button>
          <button
            type="button"
            onClick={() => setMode('linear')}
            className={`px-2.5 py-1 rounded text-xs font-medium border cursor-pointer ${
              mode === 'linear'
                ? 'bg-[var(--accent)] text-white dark:text-[#0f141c] border-[var(--accent)]'
                : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border)]'
            }`}
          >
            Pole pod v(t) = droga Δx
          </button>
        </div>

        {mode === 'projectile' ? (
          <label className="flex items-center gap-2 text-xs font-mono">
            α = {angle}°
            <input type="range" min="15" max="80" step="5" value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-28 accent-[var(--accent)]" />
          </label>
        ) : (
          <label className="flex items-center gap-2 text-xs font-mono">
            a = {accel} m/s²
            <input type="range" min="0" max="4" step="0.5" value={accel} onChange={(e) => setAccel(Number(e.target.value))} className="w-28 accent-[var(--accent)]" />
          </label>
        )}
      </div>

      {mode === 'projectile' ? (
        <>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[600px] mx-auto block rounded border border-[var(--border)] bg-[var(--bg)]">
            <line x1={padL} y1={toY(0)} x2={W - padR} y2={toY(0)} stroke="var(--text-muted)" strokeWidth="1.2" />
            <line x1={padL} y1={padT} x2={padL} y2={toY(0)} stroke="var(--text-muted)" strokeWidth="1.2" />
            {[10, 20, 30, 40].map((xv) => (
              <text key={xv} x={toX(xv)} y={H - 10} textAnchor="middle" fontSize="9.5" fontFamily="monospace" fill="var(--text-muted)">{xv} m</text>
            ))}
            {[5, 10, 15, 20].map((yv) => (
              <text key={yv} x={padL - 6} y={toY(yv) + 3} textAnchor="end" fontSize="9.5" fontFamily="monospace" fill="var(--text-muted)">{yv}</text>
            ))}

            {/* Reference 45 deg max range curve */}
            <polyline fill="none" stroke="var(--border-strong)" strokeDasharray="4 3" strokeWidth="1.5" points={makeCurve(45)} />
            {/* Active curve */}
            <polyline fill="none" stroke={NAVY} strokeWidth="2.6" points={makeCurve(angle)} />
            {/* Apex & landing */}
            <circle cx={toX(range / 2)} cy={toY(hMax)} r="4" fill={AMBER} />
            <circle cx={toX(range)} cy={toY(0)} r="4.5" fill={CRIMSON} />
            <text x={toX(range / 2) + 6} y={toY(hMax) - 5} fontSize="10" fontFamily="monospace" fill={AMBER}>H_max = {fmt(hMax, 1)} m</text>
            <text x={toX(range) - 6} y={toY(0) - 8} textAnchor="end" fontSize="10" fontFamily="monospace" fontWeight="700" fill={CRIMSON}>Z = {fmt(range, 1)} m</text>
          </svg>
          <div className="text-xs font-mono text-[var(--text-secondary)] px-3 py-2 rounded bg-[var(--bg-subtle)] border border-[var(--border)]">
            α = {angle}°: czas lotu t_c = {fmt(tc, 2)} s · H_max = {fmt(hMax, 2)} m · zasięg Z = <strong>{fmt(range, 2)} m</strong> (przerywana: maksimum przy 45°).
          </div>
        </>
      ) : (
        <>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[600px] mx-auto block rounded border border-[var(--border)] bg-[var(--bg)]">
            {/* v(t) = v0 + a*t on t in [0..5], v0 = 4 m/s */}
            <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke="var(--text-muted)" strokeWidth="1.2" />
            <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="var(--text-muted)" strokeWidth="1.2" />
            {(() => {
              const vStart = 4;
              const vEnd = vStart + accel * 5;
              const maxV = 26;
              const tx = (t) => padL + (t / 5) * (W - padL - padR);
              const vy = (v) => padT + (1 - v / maxV) * (H - padT - padB);
              const dist = vStart * 5 + 0.5 * accel * 25;
              return (
                <>
                  {/* Rectangle v0*t */}
                  <rect x={tx(0)} y={vy(vStart)} width={tx(5) - tx(0)} height={vy(0) - vy(vStart)} fill={NAVY} opacity="0.14" />
                  {/* Triangle 1/2 a t^2 */}
                  <polygon points={`${tx(0)},${vy(vStart)} ${tx(5)},${vy(vStart)} ${tx(5)},${vy(vEnd)}`} fill={FOREST} opacity="0.18" />
                  <line x1={tx(0)} y1={vy(vStart)} x2={tx(5)} y2={vy(vEnd)} stroke={NAVY} strokeWidth="2.6" />
                  <text x={tx(2.5)} y={vy(vStart / 2) + 4} textAnchor="middle" fontSize="10.5" fontFamily="monospace" fontWeight="700" fill={NAVY}>v₀·t = 20 m</text>
                  {accel > 0 && (
                    <text x={tx(3.6)} y={vy(vStart + accel * 2)} textAnchor="middle" fontSize="10.5" fontFamily="monospace" fontWeight="700" fill={FOREST}>
                      ½ a t² = {fmt(0.5 * accel * 25, 1)} m
                    </text>
                  )}
                  <text x={tx(5) - 6} y={vy(vEnd) - 8} textAnchor="end" fontSize="10.5" fontFamily="monospace" fontWeight="700" fill={CRIMSON}>
                    v(5 s) = {fmt(vEnd, 1)} m/s · Δx = {fmt(dist, 1)} m
                  </text>
                </>
              );
            })()}
          </svg>
          <div className="text-xs font-mono text-[var(--text-secondary)] px-3 py-2 rounded bg-[var(--bg-subtle)] border border-[var(--border)]">
            Całka oznaczona z v(t) = 4 + {accel}·t na [0, 5 s]: pole prostokąta v₀t (20 m) + pole trójkąta ½at² ({fmt(0.5 * accel * 25, 1)} m) = <strong>{fmt(20 + 0.5 * accel * 25, 1)} m</strong>.
          </div>
        </>
      )}
    </div>
  );
}

// 3. Circular Motion Vectors: v, a_n, a_s, total a (phys-circular-motion)
function PhysCircularMotionDiagram() {
  const [omega, setOmega] = useState(2.5);
  const [eps, setEps] = useState(2.0);
  const r = 1.0;

  const v = omega * r;
  const an = omega * omega * r;
  const as = eps * r;
  const aTot = Math.hypot(an, as);

  const cx = 195;
  const cy = 128;
  const R = 82;
  // Point at top-right (angle 35 deg)
  const phi = (35 * Math.PI) / 180;
  const px = cx + R * Math.cos(phi);
  const py = cy - R * Math.sin(phi);

  // Unit radial inward and unit tangent (CCW)
  const rxIn = -Math.cos(phi);
  const ryIn = Math.sin(phi);
  const tx = -Math.sin(phi);
  const ty = -Math.cos(phi);

  const scaleA = Math.min(72 / Math.max(aTot, 1), 12);
  const anLen = an * scaleA;
  const asLen = as * scaleA;

  const anX = px + rxIn * anLen;
  const anY = py + ryIn * anLen;
  const asX = px + tx * asLen;
  const asY = py + ty * asLen;
  const atX = px + rxIn * anLen + tx * asLen;
  const atY = py + ryIn * anLen + ty * asLen;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-4 text-xs font-mono">
        <label className="flex items-center gap-2">
          ω = {fmt(omega, 1)} rad/s
          <input type="range" min="0.5" max="4" step="0.5" value={omega} onChange={(e) => setOmega(Number(e.target.value))} className="w-24 accent-[var(--accent)]" />
        </label>
        <label className="flex items-center gap-2">
          ε = {fmt(eps, 1)} rad/s²
          <input type="range" min="-4" max="4" step="0.5" value={eps} onChange={(e) => setEps(Number(e.target.value))} className="w-24 accent-[var(--crimson)]" />
        </label>
      </div>

      <svg viewBox="0 0 540 250" className="w-full max-w-[580px] mx-auto block rounded border border-[var(--border)] bg-[var(--bg)]">
        {/* Circle */}
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="var(--border-strong)" strokeWidth="1.6" strokeDasharray="4 3" />
        <circle cx={cx} cy={cy} r="3.5" fill="var(--text-muted)" />
        <line x1={cx} y1={cy} x2={px} y2={py} stroke="var(--text-muted)" strokeWidth="1.1" />

        {/* Velocity v (tangent) */}
        <line x1={px} y1={py} x2={px + tx * 52} y2={py + ty * 52} stroke={FOREST} strokeWidth="2.4" />
        <text x={px + tx * 58} y={py + ty * 58} fontSize="11" fontFamily="monospace" fontWeight="700" fill={FOREST}>v</text>

        {/* a_n (inward) */}
        <line x1={px} y1={py} x2={anX} y2={anY} stroke={NAVY} strokeWidth="2.5" />
        <text x={anX - 18} y={anY + 12} fontSize="10.5" fontFamily="monospace" fontWeight="700" fill={NAVY}>a_n</text>

        {/* a_s (tangential) */}
        {Math.abs(eps) > 0.05 && (
          <>
            <line x1={px} y1={py} x2={asX} y2={asY} stroke={AMBER} strokeWidth="2.4" />
            <text x={asX + 6} y={asY - 4} fontSize="10.5" fontFamily="monospace" fontWeight="700" fill={AMBER}>a_s</text>
          </>
        )}

        {/* Total acceleration a = a_n + a_s */}
        <line x1={px} y1={py} x2={atX} y2={atY} stroke={CRIMSON} strokeWidth="2.8" />
        <line x1={anX} y1={anY} x2={atX} y2={atY} stroke={CRIMSON} strokeDasharray="3 3" strokeWidth="1" />
        <line x1={asX} y1={asY} x2={atX} y2={atY} stroke={CRIMSON} strokeDasharray="3 3" strokeWidth="1" />
        <circle cx={px} cy={py} r="5" fill={NAVY} />

        {/* Right info box */}
        <rect x="330" y="34" width="192" height="178" rx="4" fill="var(--bg-subtle)" stroke="var(--border)" />
        <text x="344" y="58" fontSize="11" fontWeight="700" fill="var(--text)">Promień r = 1,0 m</text>
        <text x="344" y="82" fontSize="10.5" fontFamily="monospace" fill={FOREST}>v = ω·r = {fmt(v, 2)} m/s</text>
        <text x="344" y="106" fontSize="10.5" fontFamily="monospace" fill={NAVY}>a_n = ω²r = {fmt(an, 2)} m/s²</text>
        <text x="344" y="130" fontSize="10.5" fontFamily="monospace" fill={AMBER}>a_s = ε·r = {fmt(as, 2)} m/s²</text>
        <line x1="344" y1="144" x2="508" y2="144" stroke="var(--border)" />
        <text x="344" y="166" fontSize="11" fontFamily="monospace" fontWeight="700" fill={CRIMSON}>a = √(a_n² + a_s²)</text>
        <text x="344" y="186" fontSize="12" fontFamily="monospace" fontWeight="700" fill={CRIMSON}>= {fmt(aTot, 2)} m/s²</text>
      </svg>
    </div>
  );
}

// 4. Dynamics: Inclined Plane & 1D Collisions (phys-dynamics-collisions)
function PhysDynamicsCollisionsDiagram() {
  const [angle, setAngle] = useState(30);
  const [mu, setMu] = useState(0.2);

  const g = 9.81;
  const m = 5;
  const rad = (angle * Math.PI) / 180;
  const fs = m * g * Math.sin(rad);
  const nForce = m * g * Math.cos(rad);
  const fric = mu * nForce;
  const slides = Math.tan(rad) > mu;
  const acc = slides ? g * (Math.sin(rad) - mu * Math.cos(rad)) : 0;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-4 text-xs font-mono">
        <label className="flex items-center gap-2">
          Kąt równi α = {angle}°
          <input type="range" min="10" max="55" step="5" value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-24 accent-[var(--accent)]" />
        </label>
        <label className="flex items-center gap-2">
          Wsp. tarcia f = {mu.toFixed(2)}
          <input type="range" min="0" max="0.8" step="0.05" value={mu} onChange={(e) => setMu(Number(e.target.value))} className="w-24 accent-[var(--crimson)]" />
        </label>
      </div>

      <svg viewBox="0 0 560 220" className="w-full max-w-[600px] mx-auto block rounded border border-[var(--border)] bg-[var(--bg)]">
        {/* Wedge */}
        <polygon points="48,186 286,186 48,66" fill="var(--bg-subtle)" stroke="var(--border-strong)" strokeWidth="1.6" />
        <text x="230" y="178" fontSize="10.5" fontFamily="monospace" fill="var(--text-muted)">α = {angle}°</text>

        {/* Block on incline */}
        <g transform="translate(155, 118) rotate(26.5)">
          <rect x="-22" y="-22" width="44" height="24" rx="2" fill="var(--accent-soft)" stroke={NAVY} strokeWidth="2" />
          <text x="0" y="-6" textAnchor="middle" fontSize="10" fontFamily="monospace" fontWeight="700" fill={NAVY}>m=5kg</text>
          {/* F_s along slope down-right */}
          <line x1="0" y1="-10" x2="64" y2="-10" stroke={CRIMSON} strokeWidth="2.5" />
          <text x="68" y="-7" fontSize="10" fontFamily="monospace" fontWeight="700" fill={CRIMSON}>F_s</text>
          {/* T friction up-left */}
          <line x1="0" y1="-10" x2="-48" y2="-10" stroke={AMBER} strokeWidth="2.3" />
          <text x="-60" y="-7" fontSize="10" fontFamily="monospace" fontWeight="700" fill={AMBER}>T</text>
          {/* N normal up */}
          <line x1="0" y1="-10" x2="0" y2="-62" stroke={FOREST} strokeWidth="2.4" />
          <text x="6" y="-56" fontSize="10" fontFamily="monospace" fontWeight="700" fill={FOREST}>N</text>
        </g>
        {/* Gravity straight down */}
        <line x1="155" y1="108" x2="155" y2="178" stroke={NAVY} strokeWidth="2.2" strokeDasharray="4 2" />
        <text x="162" y="174" fontSize="10" fontFamily="monospace" fontWeight="700" fill={NAVY}>mg</text>

        {/* Readout panel */}
        <rect x="318" y="24" width="222" height="172" rx="4" fill="var(--bg-subtle)" stroke="var(--border)" />
        <text x="332" y="48" fontSize="11" fontWeight="700" fill="var(--text)">Rozkład sił (m = 5 kg, g = 9,81)</text>
        <text x="332" y="72" fontSize="10.5" fontFamily="monospace" fill={CRIMSON}>F_s = mg sin α = {fmt(fs, 1)} N</text>
        <text x="332" y="94" fontSize="10.5" fontFamily="monospace" fill={FOREST}>N = mg cos α = {fmt(nForce, 1)} N</text>
        <text x="332" y="116" fontSize="10.5" fontFamily="monospace" fill={AMBER}>T_max = f·N = {fmt(fric, 1)} N</text>
        <line x1="332" y1="130" x2="526" y2="130" stroke="var(--border)" />
        <text x="332" y="152" fontSize="10.5" fontFamily="monospace" fontWeight="700" fill={slides ? CRIMSON : FOREST}>
          {slides ? `Zsuwa się (tg α = ${fmt(Math.tan(rad), 2)} > ${mu})` : `Spoczywa (tg α = ${fmt(Math.tan(rad), 2)} ≤ ${mu})`}
        </text>
        <text x="332" y="176" fontSize="11.5" fontFamily="monospace" fontWeight="700" fill={NAVY}>
          a = {fmt(acc, 2)} m/s² (nie zależy od m!)
        </text>
      </svg>
    </div>
  );
}

// 5. Lab Viscosity Curve & Andrade Linearization (phys-lab-uncertainty)
function PhysLabUncertaintyDiagram() {
  const [mode, setMode] = useState('andrade'); // 'curve' | 'andrade'

  // Standard glycerin viscosity vs T dataset (25..37 deg C)
  const pts = [
    { tc: 25, tk: 298.15, eta: 0.934, deta: 0.033 },
    { tc: 28, tk: 301.15, eta: 0.750, deta: 0.018 },
    { tc: 31, tk: 304.15, eta: 0.607, deta: 0.020 },
    { tc: 34, tk: 307.15, eta: 0.494, deta: 0.018 },
    { tc: 37, tk: 310.15, eta: 0.404, deta: 0.012 },
  ];

  // OLS fit for ln(eta) = a + B*(1/T)
  const xs = pts.map((p) => 1 / p.tk);
  const ys = pts.map((p) => Math.log(p.eta));
  const meanX = xs.reduce((s, v) => s + v, 0) / xs.length;
  const meanY = ys.reduce((s, v) => s + v, 0) / ys.length;
  const slopeB =
    xs.reduce((s, x, i) => s + (x - meanX) * (ys[i] - meanY), 0) /
    xs.reduce((s, x) => s + (x - meanX) * (x - meanX), 0);
  const interceptA = meanY - slopeB * meanX;
  const eaKj = (slopeB * 8.314) / 1000;

  const W = 560;
  const H = 225;
  const padL = 52;
  const padR = 20;
  const padT = 20;
  const padB = 34;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => setMode('curve')}
          className={`px-2.5 py-1 rounded text-xs font-medium border cursor-pointer ${
            mode === 'curve'
              ? 'bg-[var(--accent)] text-white dark:text-[#0f141c] border-[var(--accent)]'
              : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border)]'
          }`}
        >
          Krzywa η(T) ze słupkami ±Δη
        </button>
        <button
          type="button"
          onClick={() => setMode('andrade')}
          className={`px-2.5 py-1 rounded text-xs font-medium border cursor-pointer ${
            mode === 'andrade'
              ? 'bg-[var(--accent)] text-white dark:text-[#0f141c] border-[var(--accent)]'
              : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border)]'
          }`}
        >
          Linearyzacja Andrade: ln(η) od 1000/T
        </button>
      </div>

      {mode === 'curve' ? (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[600px] mx-auto block rounded border border-[var(--border)] bg-[var(--bg)]">
          <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke="var(--text-muted)" strokeWidth="1.2" />
          <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="var(--text-muted)" strokeWidth="1.2" />
          {(() => {
            const toX = (tc) => padL + ((tc - 24) / 14) * (W - padL - padR);
            const toY = (e) => padT + (1 - (e - 0.3) / 0.72) * (H - padT - padB);
            const fitPts = Array.from({ length: 50 }, (_, i) => {
              const tc = 24.5 + (i / 49) * 13;
              const val = Math.exp(interceptA + slopeB / (tc + 273.15));
              return `${toX(tc).toFixed(1)},${toY(val).toFixed(1)}`;
            }).join(' ');
            return (
              <>
                {[0.4, 0.6, 0.8, 1.0].map((v) => (
                  <g key={v}>
                    <line x1={padL} y1={toY(v)} x2={W - padR} y2={toY(v)} stroke="var(--border)" strokeWidth="0.7" />
                    <text x={padL - 6} y={toY(v) + 3} textAnchor="end" fontSize="9.5" fontFamily="monospace" fill="var(--text-muted)">{v.toFixed(1)}</text>
                  </g>
                ))}
                {pts.map((p) => (
                  <text key={p.tc} x={toX(p.tc)} y={H - 12} textAnchor="middle" fontSize="9.5" fontFamily="monospace" fill="var(--text-muted)">{p.tc}°C</text>
                ))}
                <polyline fill="none" stroke={NAVY} strokeWidth="2.2" points={fitPts} />
                {pts.map((p) => (
                  <g key={p.tc}>
                    <line x1={toX(p.tc)} y1={toY(p.eta - p.deta)} x2={toX(p.tc)} y2={toY(p.eta + p.deta)} stroke={CRIMSON} strokeWidth="1.8" />
                    <line x1={toX(p.tc) - 4} y1={toY(p.eta - p.deta)} x2={toX(p.tc) + 4} y2={toY(p.eta - p.deta)} stroke={CRIMSON} strokeWidth="1.5" />
                    <line x1={toX(p.tc) - 4} y1={toY(p.eta + p.deta)} x2={toX(p.tc) + 4} y2={toY(p.eta + p.deta)} stroke={CRIMSON} strokeWidth="1.5" />
                    <circle cx={toX(p.tc)} cy={toY(p.eta)} r="4" fill={CRIMSON} />
                  </g>
                ))}
                <text x="64" y="34" fontSize="10.5" fontFamily="monospace" fontWeight="700" fill={NAVY}>
                  Wykładniczy spadek lepkości gliceryny η(T) = A·exp(B/T)
                </text>
              </>
            );
          })()}
        </svg>
      ) : (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[600px] mx-auto block rounded border border-[var(--border)] bg-[var(--bg)]">
          <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke="var(--text-muted)" strokeWidth="1.2" />
          <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="var(--text-muted)" strokeWidth="1.2" />
          {(() => {
            const xMin = 3.20;
            const xMax = 3.37;
            const yMin = -1.0;
            const yMax = 0.05;
            const toX = (invK) => padL + ((invK - xMin) / (xMax - xMin)) * (W - padL - padR);
            const toY = (lne) => padT + (1 - (lne - yMin) / (yMax - yMin)) * (H - padT - padB);
            const yL = interceptA + slopeB * (xMin / 1000);
            const yR = interceptA + slopeB * (xMax / 1000);
            return (
              <>
                {[-0.9, -0.6, -0.3, 0.0].map((v) => (
                  <g key={v}>
                    <line x1={padL} y1={toY(v)} x2={W - padR} y2={toY(v)} stroke="var(--border)" strokeWidth="0.7" />
                    <text x={padL - 6} y={toY(v) + 3} textAnchor="end" fontSize="9.5" fontFamily="monospace" fill="var(--text-muted)">{v.toFixed(1)}</text>
                  </g>
                ))}
                {[3.22, 3.26, 3.30, 3.34].map((xv) => (
                  <text key={xv} x={toX(xv)} y={H - 12} textAnchor="middle" fontSize="9.5" fontFamily="monospace" fill="var(--text-muted)">{xv.toFixed(2)}</text>
                ))}
                <text x={W - 60} y={H - 12} fontSize="9.5" fontFamily="monospace" fill="var(--text-muted)">1000/T [K⁻¹]</text>
                <line x1={toX(xMin)} y1={toY(yL)} x2={toX(xMax)} y2={toY(yR)} stroke={FOREST} strokeWidth="2.4" />
                {pts.map((p) => {
                  const xv = 1000 / p.tk;
                  const yv = Math.log(p.eta);
                  return <circle key={p.tc} cx={toX(xv)} cy={toY(yv)} r="4.5" fill={NAVY} />;
                })}
                <text x="64" y="34" fontSize="10.5" fontFamily="monospace" fontWeight="700" fill={FOREST}>
                  Prosta Andrade: nachylenie B ≈ {fmt(slopeB, 0)} K  ⇒  E_a = B·R ≈ {fmt(eaKj, 1)} kJ/mol
                </text>
              </>
            );
          })()}
        </svg>
      )}
    </div>
  );
}

export const PHYS_DIAGRAM_REGISTRY = {
  'phys-vectors-3d': { Component: PhysVectorsDiagram },
  'phys-kinematics-graphs': { Component: PhysKinematicsGraphsDiagram },
  'phys-circular-motion': { Component: PhysCircularMotionDiagram },
  'phys-dynamics-collisions': { Component: PhysDynamicsCollisionsDiagram },
  'phys-lab-uncertainty': { Component: PhysLabUncertaintyDiagram },
};
