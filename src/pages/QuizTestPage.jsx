import React, { useEffect, useState } from 'react';
import {
  CheckSquare,
  Timer,
  Trophy,
  RotateCcw,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Sparkles,
  GraduationCap,
  ArrowRight,
  ZoomIn,
} from 'lucide-react';
import { api } from '../api/client.js';
import { FormattedText } from '../components/RichContent.jsx';

export function QuizTestPage({
  subjectSlug = 'sieci',
  subjectTitle,
  chapters = [],
  initialChapter = null,
  onOpenImage,
  onJumpToExamTopic,
  onProgressChanged,
}) {
  const isMath = subjectSlug === 'analiza';
  const isProb = subjectSlug === 'probabilistyka';
  const isAlg = subjectSlug === 'algebra';
  const isAisd = subjectSlug === 'aisd';
  const isPhys = subjectSlug === 'fizyka';
  const totalPool =
    chapters.reduce((sum, c) => sum + (c.quizzes_count || 0), 0) ||
    (isMath ? 52 : isProb || isAlg ? 44 : isAisd ? 48 : isPhys ? 36 : 70);
  const [stage, setStage] = useState('setup'); // 'setup' | 'running' | 'result'
  const [mode, setMode] = useState('exam_sim');
  const [selectedChapter, setSelectedChapter] = useState(initialChapter || chapters[0]?.id || `${subjectSlug}-ch1`);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [curIdx, setCurIdx] = useState(0);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [instantFeedback, setInstantFeedback] = useState(false);
  const [checkedInstant, setCheckedInstant] = useState({});
  const [result, setResult] = useState(null);
  const [attempts, setAttempts] = useState([]);

  const loadAttempts = () => {
    api.getAttempts(subjectSlug).then(setAttempts).catch(() => {});
  };

  useEffect(() => {
    setStage('setup');
    setResult(null);
    loadAttempts();
  }, [subjectSlug]);

  useEffect(() => {
    if (chapters.length > 0 && !chapters.some((c) => c.id === selectedChapter)) {
      setSelectedChapter(chapters[0].id);
    }
  }, [chapters]);

  useEffect(() => {
    if (initialChapter) {
      setSelectedChapter(initialChapter);
      startSession('chapter_quiz', initialChapter, 15, true);
    }
  }, [initialChapter]);

  // Live timer during quiz
  useEffect(() => {
    if (stage !== 'running') return;
    const id = setInterval(() => setElapsedSec((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [stage]);

  const startSession = async (chosenMode, chapterId = 'all', limit = 25, instant = false) => {
    setMode(chosenMode);
    setInstantFeedback(instant);
    const res = await api.getQuizzes(subjectSlug, {
      mode: chosenMode,
      chapter: chosenMode === 'chapter_quiz' ? chapterId : 'all',
      limit,
      shuffle: 'true',
    });
    if (!res.questions || res.questions.length === 0) return;
    setQuestions(res.questions);
    setAnswers({});
    setCheckedInstant({});
    setCurIdx(0);
    setElapsedSec(0);
    setResult(null);
    setStage('running');
  };

  const toggleOption = (q, optIdx) => {
    if (instantFeedback && checkedInstant[q.id]) return;
    setAnswers((prev) => {
      const cur = prev[q.id] || [];
      if (q.question_type === 'multi') {
        const next = cur.includes(optIdx) ? cur.filter((x) => x !== optIdx) : [...cur, optIdx];
        return { ...prev, [q.id]: next };
      }
      return { ...prev, [q.id]: [optIdx] };
    });
  };

  const finishAndGrade = async () => {
    const responses = questions.map((q) => ({
      question_id: q.id,
      selected: answers[q.id] || [],
    }));
    const graded = await api.submitAttempt(subjectSlug, {
      mode,
      chapter_id: mode === 'chapter_quiz' ? selectedChapter : null,
      duration_sec: elapsedSec,
      responses,
    });
    setResult(graded);
    setStage('result');
    loadAttempts();
    onProgressChanged?.();
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  if (stage === 'setup') {
    return (
      <div className="space-y-6">
        <header className="pb-4 border-b border-[var(--border)]">
          <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">
            {subjectTitle ||
              (isMath
                ? 'Analiza matematyczna'
                : isProb
                  ? 'Probabilistyka'
                  : isAlg
                    ? 'Algebra liniowa'
                    : isAisd
                      ? 'Algorytmy i struktury danych'
                      : isPhys
                        ? 'Fizyka'
                        : 'Sieci komputerowe')}{' '}
            · Baza {totalPool} pytań
          </div>
          <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold m-0">
            Quizy i symulator kolokwium
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1.5 mb-0 max-w-2xl">
            {isMath
              ? 'Zadania obliczeniowe (granice, pochodne, Taylor, ekstrema, całki, pola, całki niewłaściwe) i pułapki teoretyczne z pełnym rozwiązaniem krok po kroku po każdej odpowiedzi.'
              : isProb
                ? 'Zadania obliczeniowe i teoretyczne (statystyka opisowa, kombinatoryka, Bayes, niezależność, dystrybuanta, momenty, Czebyszew oraz wszystkie 6 rozkładów dyskretnych) z pełnym uzasadnieniem.'
                : isAlg
                  ? 'Zadania obliczeniowe i pułapki teoretyczne (liczby zespolone, de Moivre, pierwiastki, macierze, wyznaczniki, układy Cramera, wektory własne) z pełnym uzasadnieniem.'
                  : isAisd
                    ? 'Zadania ze śladowania pseudokodu, wyłapywania błędów ze slajdów W3–W6, analizy złożoności Big-O/Ω/Θ, sortowania, haszowania, drzew/kopców/AVL oraz metod numerycznych (bisekcja, falsi, Newton, MRS).'
                    : isPhys
                      ? 'Zadania obliczeniowe i pojęciowe z wektorów 3D, kinematyki (1D/2D/okrąg, Galileusz), dynamiki Newtona, tarcia, zderzeń oraz rachunku niepewności pomiarowych (Student–Fisher, Stokes, Andrade).'
                      : 'Wybierz tryb ćwiczeniowy po rozdziale z natychmiastowym wyjaśnieniem albo test na czas ze wszystkich 9 rozdziałów. Historia podejść zapisuje się w SQLite.'}
          </p>
        </header>

        {/* 4 Modes Grid — calm editorial cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Mode 1: Exam Sim */}
          <div className="card p-5 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--accent-text)]">
                01 · Egzamin próbny
              </div>
              <h2 className="font-serif-heading text-lg font-bold mt-1.5 mb-1">
                Symulator testu (20 pytań)
              </h2>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Losowy przekrój ze wszystkich {chapters.length || (isPhys ? 5 : isProb || isAlg ? 6 : isAisd ? 8 : 9)} rozdziałów. Wynik procentowy oraz szczegółowe omówienie z obliczeniami zobaczysz po zakończeniu podejścia.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-[var(--border)]">
              <button onClick={() => startSession('exam_sim', 'all', 20, false)} className="btn-primary text-xs">
                Start: 20 pytań <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => startSession('full_test', 'all', totalPool, false)} className="btn-secondary text-xs">
                Pełna baza ({totalPool})
              </button>
            </div>
          </div>

          {/* Mode 2: Chapter Quiz */}
          <div className="card p-5 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--success)]">
                02 · Tryb nauki po rozdziale
              </div>
              <h2 className="font-serif-heading text-lg font-bold mt-1.5 mb-1">Quiz z wybranego rozdziału</h2>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">
                Po każdym pytaniu możesz od razu sprawdzić poprawność i prześledzić pełne uzasadnienie.
              </p>
              <select
                value={selectedChapter}
                onChange={(e) => setSelectedChapter(e.target.value)}
                className="input-field text-xs"
              >
                {chapters.map((c) => (
                  <option key={c.id} value={c.id}>
                    R{c.order_index}: {c.title.replace(/^Rozdział \d+:\s*/, '')} ({c.quizzes_count} pytań)
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4 pt-3 border-t border-[var(--border)]">
              <button
                onClick={() => startSession('chapter_quiz', selectedChapter, 20, true)}
                className="btn-primary text-xs"
              >
                Rozpocznij quiz z rozdziału <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Mode 3: Weak spots */}
          <div className="card p-5 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--warning)]">
                03 · Powtórka błędów
              </div>
              <h2 className="font-serif-heading text-lg font-bold mt-1.5 mb-1">Trening błędnych odpowiedzi</h2>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Automatycznie pobiera z bazy SQLite pytania, na które wcześniej udzieliłeś błędnej odpowiedzi (jeśli jeszcze nie masz błędów, wylosuje 15 pytań).
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[var(--border)]">
              <button onClick={() => startSession('weak', 'all', 15, true)} className="btn-secondary text-xs">
                Ćwicz słabe punkty <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Mode 4: Quick Sprint */}
          <div className="card p-5 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
                04 · Szybka powtórka
              </div>
              <h2 className="font-serif-heading text-lg font-bold mt-1.5 mb-1">Krótki sprawdzian — 10 pytań</h2>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                5-minutowy przegląd całego przedmiotu z natychmiastowym wyjaśnieniem po każdym pytaniu.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[var(--border)]">
              <button onClick={() => startSession('exam_sim', 'all', 10, true)} className="btn-secondary text-xs">
                Start: 10 pytań <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* History table */}
        {attempts.length > 0 && (
          <div className="card p-5">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-2 mt-0 mb-3">
              <Trophy className="w-4 h-4 text-amber-500" /> Historia podejść (SQLite)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border)] text-left text-[var(--text-muted)]">
                    <th className="py-2 px-3">Tryb</th>
                    <th className="py-2 px-3">Wynik</th>
                    <th className="py-2 px-3">Poprawne</th>
                    <th className="py-2 px-3">Czas</th>
                    <th className="py-2 px-3">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {attempts.slice(0, 10).map((a) => (
                    <tr key={a.id} className="border-b last:border-b-0 border-[var(--border)]">
                      <td className="py-2.5 px-3 font-semibold">{a.mode}</td>
                      <td className="py-2.5 px-3 font-extrabold">
                        <span
                          className={
                            a.score_percent >= 80
                              ? 'text-[var(--success)]'
                              : a.score_percent >= 50
                              ? 'text-[var(--warning)]'
                              : 'text-[var(--danger)]'
                          }
                        >
                          {a.score_percent}%
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-mono">{a.correct_count}/{a.total_questions}</td>
                      <td className="py-2.5 px-3 font-mono">{formatTime(a.duration_sec)}</td>
                      <td className="py-2.5 px-3 text-[var(--text-muted)]">{a.created_at}</td>
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

  if (stage === 'running') {
    const q = questions[curIdx];
    const selected = answers[q.id] || [];
    const isChecked = Boolean(checkedInstant[q.id]);
    const answeredCount = Object.values(answers).filter((a) => a.length > 0).length;

    return (
      <div className="max-w-3xl mx-auto space-y-4">
        {/* Top bar */}
        <div className="card p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-sm font-bold">
            <span>
              Pytanie {curIdx + 1} / {questions.length}
            </span>
            <span className="text-xs font-normal text-[var(--text-muted)]">
              (udzielono: {answeredCount}/{questions.length})
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-mono text-sm font-bold px-2.5 py-1 rounded-lg bg-[var(--bg-subtle)]">
              <Timer className="w-4 h-4 text-[var(--accent)]" /> {formatTime(elapsedSec)}
            </span>
            <button onClick={() => setStage('setup')} className="btn-secondary !py-1 !px-3 text-xs">
              Przerwij
            </button>
          </div>
        </div>

        {/* Question number dots */}
        <div className="flex flex-wrap gap-1.5">
          {questions.map((item, i) => {
            const hasAns = (answers[item.id] || []).length > 0;
            return (
              <button
                key={item.id}
                onClick={() => setCurIdx(i)}
                className={`w-8 h-8 rounded-lg text-xs font-mono font-bold border cursor-pointer transition-all ${
                  i === curIdx
                    ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                    : hasAns
                    ? 'bg-[var(--success-soft)] text-[var(--success)] border-[var(--success)]/40'
                    : 'bg-[var(--bg-elevated)] text-[var(--text-muted)] border-[var(--border)]'
                }`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>

        {/* Question Card */}
        <div className="card p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="px-2.5 py-0.5 rounded-full font-bold bg-[var(--bg-subtle)] text-[var(--text-muted)]">
              {q.question_type === 'multi'
                ? 'Wielokrotnego wyboru (zaznacz wszystkie poprawne)'
                : q.question_type === 'true_false'
                ? 'Prawda / Fałsz'
                : 'Jednokrotnego wyboru'}
            </span>
            {q.exam_question_num && (
              <span className="font-mono font-bold text-[var(--purple)]">Zagadnienie #{q.exam_question_num}</span>
            )}
          </div>

          <h2 className="text-base sm:text-lg font-extrabold leading-relaxed m-0">
            <FormattedText text={q.question} />
          </h2>

          {q.figure_url && (
            <div className="max-w-md mx-auto">
              <button
                type="button"
                onClick={() => onOpenImage?.({ src: q.figure_url, caption: 'Ilustracja do pytania quizowego' })}
                className="slide-frame relative group cursor-zoom-in w-full"
              >
                <img src={q.figure_url} alt="Schemat do pytania" className="w-full h-52 object-contain bg-white" />
                <span className="absolute bottom-2 right-2 bg-slate-900/75 text-white text-[11px] px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 flex items-center gap-1">
                  <ZoomIn className="w-3 h-3" /> Powiększ
                </span>
              </button>
            </div>
          )}

          <div className="space-y-2.5">
            {q.options.map((opt, oi) => {
              const isSel = selected.includes(oi);
              const isCorrectOpt = q.correct.includes(oi);
              let border = isSel ? 'var(--accent)' : 'var(--border)';
              let bg = isSel ? 'var(--accent-soft)' : 'var(--bg-elevated)';

              if (isChecked) {
                if (isCorrectOpt) {
                  border = 'var(--success)';
                  bg = 'var(--success-soft)';
                } else if (isSel && !isCorrectOpt) {
                  border = 'var(--danger)';
                  bg = 'var(--danger-soft)';
                }
              }

              return (
                <button
                  key={oi}
                  type="button"
                  onClick={() => toggleOption(q, oi)}
                  style={{ borderColor: border, background: bg }}
                  className="w-full text-left p-3.5 rounded-xl border text-sm flex items-start gap-3 cursor-pointer transition-all"
                >
                  <span className="w-6 h-6 rounded-md border border-[var(--border-strong)] flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 bg-[var(--bg-elevated)]">
                    {String.fromCharCode(65 + oi)}
                  </span>
                  <span className="leading-relaxed">
                    <FormattedText text={opt} />
                  </span>
                </button>
              );
            })}
          </div>

          {/* Instant Feedback Panel */}
          {instantFeedback && !isChecked && (
            <button
              onClick={() => setCheckedInstant((p) => ({ ...p, [q.id]: true }))}
              disabled={selected.length === 0}
              className="btn-secondary text-xs"
            >
              Sprawdź to pytanie
            </button>
          )}

          {isChecked && (
            <div className="p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)] text-sm">
              <div className="font-bold mb-1 text-[var(--accent-text)]">Wyjaśnienie:</div>
              <div className="text-[var(--text-secondary)] leading-relaxed">
                <FormattedText text={q.explanation} />
              </div>
            </div>
          )}

          {/* Bottom Nav */}
          <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
            <button
              onClick={() => setCurIdx((i) => Math.max(0, i - 1))}
              disabled={curIdx === 0}
              className="btn-secondary text-xs"
            >
              ← Poprzednie
            </button>
            <div className="flex gap-2">
              {curIdx < questions.length - 1 ? (
                <button onClick={() => setCurIdx((i) => i + 1)} className="btn-primary text-xs">
                  Następne →
                </button>
              ) : null}
              <button
                onClick={finishAndGrade}
                className="btn-primary !bg-[var(--success)] text-xs"
              >
                Zakończ i oceń test
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // RESULT STAGE
  const passed = result.score_percent >= 50;
  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <div className="card p-6 text-center space-y-3">
        <div
          className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center text-white"
          style={{ background: passed ? 'var(--success)' : 'var(--danger)' }}
        >
          {passed ? <Trophy className="w-7 h-7" /> : <AlertCircle className="w-7 h-7" />}
        </div>
        <h1 className="text-3xl font-extrabold m-0">{result.score_percent}%</h1>
        <p className="text-sm text-[var(--text-secondary)] m-0">
          Poprawne odpowiedzi: <strong>{result.correct_count} / {result.total_questions}</strong> • Czas:{' '}
          <strong>{formatTime(result.duration_sec)}</strong> • Zdobyto:{' '}
          <strong className="text-[var(--success)]">+{result.xp_earned} XP</strong>
        </p>
        <div className="flex justify-center gap-2 pt-2">
          <button onClick={() => setStage('setup')} className="btn-primary">
            <RotateCcw className="w-4 h-4" /> Wróć do wyboru testów
          </button>
          <button onClick={() => startSession('weak', 'all', 15, true)} className="btn-secondary">
            <Sparkles className="w-4 h-4" /> Powtórz błędne pytania
          </button>
        </div>
      </div>

      {/* Detailed Post-Test Review */}
      <div className="space-y-3">
        {result.results.map((r, i) => (
          <div
            key={r.question_id}
            className="card p-5 space-y-2.5 border-l-4"
            style={{ borderLeftColor: r.is_correct ? 'var(--success)' : 'var(--danger)' }}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="font-bold text-sm flex items-start gap-2">
                {r.is_correct ? (
                  <CheckCircle2 className="w-4 h-4 text-[var(--success)] shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-[var(--danger)] shrink-0 mt-0.5" />
                )}
                <span>
                  {i + 1}. <FormattedText text={r.question} />
                </span>
              </div>
              {r.exam_question_num && (
                <button
                  onClick={() => onJumpToExamTopic(r.exam_question_num)}
                  className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[var(--purple-soft)] text-[var(--purple)] border-0 cursor-pointer shrink-0 inline-flex items-center gap-1"
                >
                  <GraduationCap className="w-3 h-3" /> #{r.exam_question_num}
                </button>
              )}
            </div>

            <div className="text-xs space-y-1 pl-6">
              <div>
                <span className="text-[var(--text-muted)]">Twoja odpowiedź: </span>
                <strong className={r.is_correct ? 'text-[var(--success)]' : 'text-[var(--danger)]'}>
                  {r.selected.length > 0 ? r.selected.map((idx) => r.options[idx]).join(' | ') : 'Brak odpowiedzi'}
                </strong>
              </div>
              {!r.is_correct && (
                <div>
                  <span className="text-[var(--text-muted)]">Poprawna odpowiedź: </span>
                  <strong className="text-[var(--success)]">
                    {r.correct.map((idx) => r.options[idx]).join(' | ')}
                  </strong>
                </div>
              )}
              <div className="pt-1.5 text-[var(--text-secondary)] leading-relaxed">
                <strong>Wyjaśnienie: </strong>
                <FormattedText text={r.explanation} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
