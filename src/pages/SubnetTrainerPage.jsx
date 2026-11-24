import React, { useEffect, useState } from 'react';
import {
  Calculator,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Flame,
  Lightbulb,
  Binary,
  Sliders,
  Trophy,
} from 'lucide-react';
import { api } from '../api/client.js';

function BinaryRow({ label, binStr, prefix, colorClass = '' }) {
  const flat = binStr.replace(/\./g, '');
  let bitIdx = 0;

  return (
    <div className="grid grid-cols-12 items-center gap-2 py-1.5 border-b last:border-b-0 border-[var(--border)] text-xs">
      <div className={`col-span-3 font-bold ${colorClass}`}>{label}</div>
      <div className="col-span-9 font-mono flex flex-wrap items-center gap-1">
        {binStr.split('.').map((octet, oi) => (
          <React.Fragment key={oi}>
            <span className="inline-flex bg-[var(--bg-elevated)] rounded px-1 py-0.5 border border-[var(--border)]">
              {octet.split('').map((ch, bi) => {
                const isNet = bitIdx < prefix;
                bitIdx += 1;
                return (
                  <span
                    key={bi}
                    className={
                      isNet
                        ? 'text-blue-600 dark:text-blue-400 font-bold'
                        : 'text-amber-600 dark:text-amber-400 font-semibold'
                    }
                  >
                    {ch}
                  </span>
                );
              })}
            </span>
            {oi < 3 && <span className="text-[var(--text-muted)]">.</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function SolutionCard({ sol }) {
  if (!sol) return null;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="card-subtle p-3">
          <div className="text-[11px] text-[var(--text-muted)]">Adres sieci</div>
          <div className="font-mono font-extrabold text-sm text-blue-600 dark:text-blue-400 mt-0.5">{sol.network}</div>
        </div>
        <div className="card-subtle p-3">
          <div className="text-[11px] text-[var(--text-muted)]">Adres rozgłoszeniowy</div>
          <div className="font-mono font-extrabold text-sm text-amber-600 dark:text-amber-400 mt-0.5">{sol.broadcast}</div>
        </div>
        <div className="card-subtle p-3">
          <div className="text-[11px] text-[var(--text-muted)]">Zakres hostów</div>
          <div className="font-mono font-bold text-xs mt-1">{sol.firstHost} – {sol.lastHost}</div>
        </div>
        <div className="card-subtle p-3">
          <div className="text-[11px] text-[var(--text-muted)]">Użyteczne hosty</div>
          <div className="font-mono font-extrabold text-sm text-[var(--success)] mt-0.5">
            {sol.usableHosts.toLocaleString('pl-PL')} <span className="text-[11px] font-normal text-[var(--text-muted)]">(h={sol.hostBits})</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-[var(--text-secondary)]">
        <div className="card-subtle px-3 py-2">Maska: <strong className="font-mono">{sol.mask} (/{sol.prefix})</strong></div>
        <div className="card-subtle px-3 py-2">Wildcard: <strong className="font-mono">{sol.wildcard}</strong></div>
        <div className="card-subtle px-3 py-2">Klasa / Zakres: <strong>{sol.ipClass} • {sol.scope}</strong></div>
      </div>

      {/* 32-bit colored binary visualization */}
      <div className="card-subtle p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="text-xs font-extrabold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
            <Binary className="w-4 h-4 text-[var(--accent)]" /> Rozpisanie binarne 32 bitów
          </div>
          <div className="flex gap-3 text-[11px] font-semibold">
            <span className="text-blue-600 dark:text-blue-400">■ Bity sieci ({sol.prefix})</span>
            <span className="text-amber-600 dark:text-amber-400">■ Bity hosta ({sol.hostBits})</span>
          </div>
        </div>
        <BinaryRow label="Adres IP" binStr={sol.binary.ip} prefix={sol.prefix} />
        <BinaryRow label="Maska podsieci" binStr={sol.binary.mask} prefix={sol.prefix} />
        <BinaryRow label="Sieć (IP AND Maska)" binStr={sol.binary.network} prefix={sol.prefix} colorClass="text-blue-600 dark:text-blue-400" />
        <BinaryRow label="Broadcast (host=1)" binStr={sol.binary.broadcast} prefix={sol.prefix} colorClass="text-amber-600 dark:text-amber-400" />
      </div>

      {/* Step by step */}
      <div className="card-subtle p-4">
        <div className="text-xs font-extrabold uppercase tracking-wider text-[var(--text-muted)] mb-2">
          Rozwiązanie krok po kroku (metoda kroku bloku)
        </div>
        <ol className="space-y-1.5 pl-5 m-0 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          {sol.steps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function SubnetTrainerPage({ onProgressChanged }) {
  const [tab, setTab] = useState('trainer'); // 'trainer' | 'calc'
  const [difficulty, setDifficulty] = useState('exam');
  const [exercise, setExercise] = useState(null);
  const [startedAt, setStartedAt] = useState(Date.now());
  const [inputs, setInputs] = useState({ network: '', broadcast: '', usableHosts: '', firstHost: '', lastHost: '' });
  const [checkRes, setCheckRes] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [stats, setStats] = useState({ total: 0, correct: 0, accuracy: 0, streak: 0, recent: [] });

  // Calculator tab
  const [calcIp, setCalcIp] = useState('172.16.45.200');
  const [calcMask, setCalcMask] = useState('/21');
  const [calcResult, setCalcResult] = useState(null);
  const [calcError, setCalcError] = useState('');

  const loadStats = () => {
    api.getSubnetStats().then(setStats).catch(() => {});
  };

  const nextExercise = async (diff = difficulty) => {
    const ex = await api.generateSubnet(diff);
    setExercise(ex);
    setInputs({ network: '', broadcast: '', usableHosts: '', firstHost: '', lastHost: '' });
    setCheckRes(null);
    setShowHint(false);
    setStartedAt(Date.now());
  };

  useEffect(() => {
    loadStats();
    nextExercise(difficulty);
    runCalc('172.16.45.200', '/21');
  }, []);

  const handleCheck = async (e) => {
    e.preventDefault();
    if (!exercise) return;
    const elapsed = Math.max(1, Math.round((Date.now() - startedAt) / 1000));
    const res = await api.checkSubnet({
      ip: exercise.ip,
      mask: exercise.prefix,
      difficulty,
      time_sec: elapsed,
      answers: inputs,
    });
    setCheckRes(res);
    loadStats();
    onProgressChanged?.();
  };

  const runCalc = async (ipVal = calcIp, maskVal = calcMask) => {
    setCalcError('');
    try {
      const res = await api.analyzeSubnet(ipVal, maskVal);
      setCalcResult(res);
    } catch (err) {
      setCalcError(err.message);
      setCalcResult(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      {/* Header */}
      <div className="card p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
              <Calculator className="w-4 h-4" /> Obowiązkowe zadanie praktyczne — Zagadnienie nr 60
            </div>
            <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold m-0">Trener i generator podsieci IPv4</h1>
            <p className="text-sm text-[var(--text-secondary)] mt-1.5 mb-0 max-w-2xl">
              Ćwicz wyznaczanie adresu sieci, adresu rozgłoszeniowego i liczby użytecznych hostów z dowolnego IP i maski — z weryfikacją w SQLite oraz 32-bitowym rozpisaniem binarnym.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => setTab('trainer')}
              className={tab === 'trainer' ? 'btn-primary text-xs' : 'btn-secondary text-xs'}
            >
              <Trophy className="w-3.5 h-3.5" /> Trener zadań
            </button>
            <button
              onClick={() => setTab('calc')}
              className={tab === 'calc' ? 'btn-primary text-xs' : 'btn-secondary text-xs'}
            >
              <Sliders className="w-3.5 h-3.5" /> Kalkulator binarny
            </button>
          </div>
        </div>

        {/* Stats Ledger */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[var(--border)] border border-[var(--border)] rounded overflow-hidden mt-5">
          <div className="bg-[var(--bg-elevated)] px-3.5 py-2.5">
            <div className="text-[11px] font-mono uppercase text-[var(--text-muted)]">Rozwiązane</div>
            <div className="font-serif-heading text-xl font-bold tabular-nums">{stats.total}</div>
          </div>
          <div className="bg-[var(--bg-elevated)] px-3.5 py-2.5">
            <div className="text-[11px] font-mono uppercase text-[var(--text-muted)]">Skuteczność</div>
            <div className="font-serif-heading text-xl font-bold tabular-nums text-[var(--success)]">{stats.accuracy}%</div>
          </div>
          <div className="bg-[var(--bg-elevated)] px-3.5 py-2.5">
            <div className="text-[11px] font-mono uppercase text-[var(--text-muted)]">Seria poprawnych</div>
            <div className="font-serif-heading text-xl font-bold tabular-nums text-[var(--accent-text)]">{stats.streak}</div>
          </div>
          <div className="bg-[var(--bg-elevated)] px-3.5 py-2.5">
            <div className="text-[11px] font-mono uppercase text-[var(--text-muted)]">Średni czas</div>
            <div className="font-mono text-lg font-semibold tabular-nums">{stats.avgTimeSec || 0}s</div>
          </div>
        </div>
      </div>

      {tab === 'trainer' ? (
        <div className="space-y-5">
          {/* Difficulty Selector */}
          <div className="card p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'easy', label: 'Łatwy (/24–/30)' },
                { id: 'medium', label: 'Średni (/17–/23)' },
                { id: 'exam', label: 'Egzamin MiKC (/20–/30)' },
                { id: 'hard', label: 'Trudny (/10–/30)' },
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => {
                    setDifficulty(d.id);
                    nextExercise(d.id);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border cursor-pointer ${
                    difficulty === d.id
                      ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                      : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border)]'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
            <button onClick={() => nextExercise(difficulty)} className="btn-secondary !py-1.5 text-xs">
              <RefreshCw className="w-3.5 h-3.5" /> Wylosuj nowe IP
            </button>
          </div>

          {exercise && (
            <form onSubmit={handleCheck} className="card p-6 space-y-5">
              <div className="text-center p-5 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border)]">
                <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                  Wyznacz parametry podsieci dla podanego adresu IP i maski
                </div>
                <div className="text-2xl sm:text-3xl font-mono font-extrabold text-[var(--accent)] tracking-tight">
                  {exercise.promptDisplay}
                </div>
                <div className="text-xs text-[var(--text-muted)] mt-1.5 font-mono">
                  {exercise.maskFormat === 'decimal'
                    ? `(czyli prefiks /${exercise.prefix})`
                    : `(czyli maska dziesiętna ${exercise.mask})`}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1.5">
                    Adres sieci (wymagane) *
                  </label>
                  <input
                    required
                    type="text"
                    value={inputs.network}
                    onChange={(e) => setInputs((p) => ({ ...p, network: e.target.value }))}
                    placeholder="np. 192.168.10.128"
                    className="input-field font-mono"
                    style={
                      checkRes
                        ? { borderColor: checkRes.checks.network ? 'var(--success)' : 'var(--danger)' }
                        : {}
                    }
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5">
                    Adres rozgłoszeniowy / Broadcast *
                  </label>
                  <input
                    required
                    type="text"
                    value={inputs.broadcast}
                    onChange={(e) => setInputs((p) => ({ ...p, broadcast: e.target.value }))}
                    placeholder="np. 192.168.10.191"
                    className="input-field font-mono"
                    style={
                      checkRes
                        ? { borderColor: checkRes.checks.broadcast ? 'var(--success)' : 'var(--danger)' }
                        : {}
                    }
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5">
                    Liczba użytecznych hostów ($2^h - 2$) *
                  </label>
                  <input
                    required
                    type="text"
                    value={inputs.usableHosts}
                    onChange={(e) => setInputs((p) => ({ ...p, usableHosts: e.target.value }))}
                    placeholder="np. 62"
                    className="input-field font-mono"
                    style={
                      checkRes
                        ? { borderColor: checkRes.checks.usableHosts ? 'var(--success)' : 'var(--danger)' }
                        : {}
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">
                    Pierwszy użyteczny host (opcjonalnie)
                  </label>
                  <input
                    type="text"
                    value={inputs.firstHost}
                    onChange={(e) => setInputs((p) => ({ ...p, firstHost: e.target.value }))}
                    placeholder="Sieć + 1"
                    className="input-field font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1">
                    Ostatni użyteczny host (opcjonalnie)
                  </label>
                  <input
                    type="text"
                    value={inputs.lastHost}
                    onChange={(e) => setInputs((p) => ({ ...p, lastHost: e.target.value }))}
                    placeholder="Broadcast − 1"
                    className="input-field font-mono text-xs"
                  />
                </div>
              </div>

              {showHint && !checkRes && (
                <div className="p-3.5 rounded-xl bg-[var(--warning-soft)] border border-amber-500/30 text-xs text-[var(--text-secondary)]">
                  <strong>Podpowiedź:</strong> Prefiks <code className="prose-code">/{exercise.prefix}</code> to maska{' '}
                  <code className="prose-code">{exercise.mask}</code>. Liczba bitów hosta to{' '}
                  <strong>{32 - exercise.prefix}</strong>, więc użytecznych hostów jest{' '}
                  <code className="prose-code">2^{32 - exercise.prefix} − 2</code>. Znajdź pierwszy oktet maski różny od 255 i policz krok bloku <code className="prose-code">256 − ten_oktet</code>!
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setShowHint((h) => !h)}
                  className="btn-secondary text-xs"
                >
                  <Lightbulb className="w-4 h-4 text-amber-500" /> {showHint ? 'Ukryj podpowiedź' : 'Podpowiedź'}
                </button>
                <div className="flex gap-2">
                  {checkRes && (
                    <button
                      type="button"
                      onClick={() => nextExercise(difficulty)}
                      className="btn-primary !bg-[var(--success)]"
                    >
                      Następne zadanie →
                    </button>
                  )}
                  <button type="submit" className="btn-primary">
                    Sprawdź odpowiedź
                  </button>
                </div>
              </div>
            </form>
          )}

          {checkRes && (
            <div
              className="card p-6 space-y-4 border-l-4"
              style={{ borderLeftColor: checkRes.is_correct ? 'var(--success)' : 'var(--danger)' }}
            >
              <div className="flex items-center gap-2.5">
                {checkRes.is_correct ? (
                  <>
                    <CheckCircle2 className="w-6 h-6 text-[var(--success)]" />
                    <span className="text-lg font-extrabold text-[var(--success)]">
                      Perfekcyjnie! Wszystkie odpowiedzi poprawne (+20 XP)
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-6 h-6 text-[var(--danger)]" />
                    <span className="text-lg font-extrabold text-[var(--danger)]">
                      Coś się nie zgadza — sprawdź rozpisanie binarne poniżej!
                    </span>
                  </>
                )}
              </div>
              <SolutionCard sol={checkRes.solution} />
            </div>
          )}
        </div>
      ) : (
        /* Free Calculator Tab */
        <div className="card p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
            <div className="sm:col-span-5">
              <label className="block text-xs font-bold mb-1">Adres IPv4</label>
              <input
                type="text"
                value={calcIp}
                onChange={(e) => setCalcIp(e.target.value)}
                placeholder="np. 192.168.10.137"
                className="input-field font-mono"
              />
            </div>
            <div className="sm:col-span-4">
              <label className="block text-xs font-bold mb-1">Maska (CIDR np. /26 lub dziesiętna)</label>
              <input
                type="text"
                value={calcMask}
                onChange={(e) => setCalcMask(e.target.value)}
                placeholder="/26 lub 255.255.255.192"
                className="input-field font-mono"
              />
            </div>
            <div className="sm:col-span-3">
              <button onClick={() => runCalc()} className="btn-primary w-full">
                Oblicz podsieć
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 text-xs">
            <span className="text-[var(--text-muted)] self-center mr-1">Szybkie przykłady:</span>
            {[
              ['192.168.10.137', '/26'],
              ['172.16.45.200', '/21'],
              ['10.12.99.5', '255.255.240.0'],
              ['150.254.30.77', '/28'],
            ].map(([ip, m]) => (
              <button
                key={`${ip}${m}`}
                onClick={() => {
                  setCalcIp(ip);
                  setCalcMask(m);
                  runCalc(ip, m);
                }}
                className="px-2.5 py-1 rounded-lg bg-[var(--bg-subtle)] hover:bg-[var(--accent-soft)] font-mono border border-[var(--border)] cursor-pointer"
              >
                {ip} {m}
              </button>
            ))}
          </div>

          {calcError && (
            <div className="p-3 rounded-xl bg-[var(--danger-soft)] text-[var(--danger)] text-sm font-semibold">
              {calcError}
            </div>
          )}

          {calcResult && <SolutionCard sol={calcResult} />}
        </div>
      )}
    </div>
  );
}
