import React, { useEffect, useMemo, useState } from 'react';
import {
  Layers,
  RotateCcw,
  Lightbulb,
  Plus,
  Trash2,
  CheckCircle2,
  List,
  Play,
  GraduationCap,
  X,
} from 'lucide-react';
import { api } from '../api/client.js';
import { FormattedText } from '../components/RichContent.jsx';

const RATINGS = [
  { rating: 1, label: 'Powtórz', sub: 'za chwilę', color: '#dc2626', key: '1' },
  { rating: 2, label: 'Trudne', sub: 'krótki odstęp', color: '#d97706', key: '2' },
  { rating: 3, label: 'Dobrze', sub: 'standardowo', color: '#2563eb', key: '3' },
  { rating: 4, label: 'Łatwe', sub: 'dłuższy odstęp', color: '#059669', key: '4' },
];

export function FlashcardsPage({
  subjectSlug = 'sieci',
  subjectTitle,
  chapters = [],
  initialChapter = 'all',
  onJumpToExamTopic,
  onProgressChanged,
}) {
  const isMath = subjectSlug === 'analiza';
  const isProb = subjectSlug === 'probabilistyka';
  const isAlg = subjectSlug === 'algebra';
  const isAisd = subjectSlug === 'aisd';
  const isPhys = subjectSlug === 'fizyka';
  const [chapterFilter, setChapterFilter] = useState(initialChapter || 'all');
  const [dueOnly, setDueOnly] = useState(false);
  const [viewMode, setViewMode] = useState('study'); // 'study' | 'browse'
  const [cards, setCards] = useState([]);
  const [dueTotal, setDueTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [sessionDone, setSessionDone] = useState(0);

  // Add custom card modal
  const [showAdd, setShowAdd] = useState(false);
  const [newFront, setNewFront] = useState('');
  const [newBack, setNewBack] = useState('');
  const [newHint, setNewHint] = useState('');
  const [newChapter, setNewChapter] = useState(chapters[0]?.id || `${subjectSlug}-ch1`);

  useEffect(() => {
    if (chapters.length > 0) setNewChapter(chapters[0].id);
  }, [chapters]);

  useEffect(() => {
    setChapterFilter(initialChapter && initialChapter.startsWith(`${subjectSlug}-`) ? initialChapter : 'all');
  }, [subjectSlug, initialChapter]);

  const loadCards = async () => {
    setLoading(true);
    try {
      const res = await api.getFlashcards(subjectSlug, {
        chapter: chapterFilter,
        dueOnly: dueOnly ? 'true' : '',
      });
      setCards(res.items || []);
      setDueTotal(res.dueCount || 0);
      setIndex(0);
      setFlipped(false);
      setShowHint(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setChapterFilter(initialChapter || 'all');
  }, [initialChapter]);

  useEffect(() => {
    loadCards();
  }, [subjectSlug, chapterFilter, dueOnly]);

  const current = cards[index] || null;

  const handleRate = async (rating) => {
    if (!current) return;
    await api.reviewFlashcard(current.id, rating);
    setSessionDone((n) => n + 1);
    onProgressChanged?.();

    if (rating === 1) {
      // Re-queue card later in current session
      setCards((prev) => {
        const rest = prev.filter((_, i) => i !== index);
        const insertAt = Math.min(rest.length, index + 3);
        const updated = [...rest.slice(0, insertAt), current, ...rest.slice(insertAt)];
        return updated;
      });
      setFlipped(false);
      setShowHint(false);
      return;
    }

    if (index + 1 < cards.length) {
      setIndex((i) => i + 1);
      setFlipped(false);
      setShowHint(false);
    } else {
      setIndex(cards.length);
      setFlipped(false);
      setShowHint(false);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    if (viewMode !== 'study' || showAdd) return;
    const onKey = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target?.tagName)) return;
      if (e.code === 'Space') {
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (e.key.toLowerCase() === 'h') {
        setShowHint((h) => !h);
      } else if (flipped && ['1', '2', '3', '4'].includes(e.key)) {
        handleRate(Number(e.key));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [viewMode, showAdd, flipped, current, index, cards.length]);

  const handleCreateCustom = async (e) => {
    e.preventDefault();
    if (!newFront.trim() || !newBack.trim()) return;
    await api.createFlashcard(subjectSlug, {
      front: newFront.trim(),
      back: newBack.trim(),
      hint: newHint.trim(),
      chapter_id: newChapter || null,
      tags: ['własne'],
    });
    setNewFront('');
    setNewBack('');
    setNewHint('');
    setShowAdd(false);
    await loadCards();
    onProgressChanged?.();
  };

  const handleDeleteCustom = async (id) => {
    await api.deleteFlashcard(id);
    await loadCards();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Header */}
      <header className="pb-4 border-b border-[var(--border)] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">
            Powtórki interwałowe SM-2 · zapis SQLite
          </div>
          <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold m-0">
            {isMath
              ? 'Fiszki ze wzorów i twierdzeń'
              : isProb
                ? 'Fiszki ze wzorów i rozkładów'
                : isAlg
                  ? 'Fiszki z algebry i wzorów'
                  : isAisd
                    ? 'Fiszki z algorytmów, struktur i metod numerycznych'
                    : isPhys
                      ? 'Fiszki z fizyki (wzory, prawa i laboratorium)'
                      : `Fiszki — ${subjectTitle || 'Sieci komputerowe'}`}
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-1.5 m-0">
            Skróty: <kbd className="prose-code">Spacja</kbd> odwróć · <kbd className="prose-code">H</kbd> podpowiedź · <kbd className="prose-code">1–4</kbd> oceń.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'study' ? 'browse' : 'study')}
            className="btn-secondary text-xs"
          >
            {viewMode === 'study' ? <List className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {viewMode === 'study' ? `Lista wszystkich (${cards.length})` : 'Tryb nauki'}
          </button>
          <button onClick={() => setShowAdd(true)} className="btn-primary text-xs">
            <Plus className="w-3.5 h-3.5" /> Dodaj fiszkę
          </button>
        </div>
      </header>

      {/* Filters */}
      <div className="card p-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={chapterFilter}
            onChange={(e) => setChapterFilter(e.target.value)}
            className="input-field !w-auto text-sm"
          >
            <option value="all">Wszystkie rozdziały</option>
            {chapters.map((c) => (
              <option key={c.id} value={c.id}>
                R{c.order_index}: {c.title.replace(/^Rozdział \d+:\s*/, '')}
              </option>
            ))}
          </select>

          <label className="inline-flex items-center gap-2 text-xs font-medium cursor-pointer select-none">
            <input
              type="checkbox"
              checked={dueOnly}
              onChange={(e) => setDueOnly(e.target.checked)}
              className="accent-[var(--accent)]"
            />
            Tylko do powtórki dziś ({dueTotal})
          </label>
        </div>
        <div className="text-xs font-mono text-[var(--text-muted)] tabular-nums">
          W talii: <strong>{cards.length}</strong> · Oceniono: <strong className="text-[var(--success)]">{sessionDone}</strong>
        </div>
      </div>

      {loading ? (
        <div className="card p-12 text-center text-sm text-[var(--text-muted)]">Wczytywanie fiszek...</div>
      ) : viewMode === 'browse' ? (
        <div className="space-y-2.5">
          {cards.map((fc) => (
            <div key={fc.id} className="card p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="font-semibold text-sm leading-relaxed">
                  <FormattedText text={fc.front} />
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {fc.exam_question_num && (
                    <button
                      onClick={() => onJumpToExamTopic(fc.exam_question_num)}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--bg-subtle)] text-[var(--accent-text)] border border-[var(--border)] cursor-pointer"
                    >
                      #{fc.exam_question_num}
                    </button>
                  )}
                  {fc.is_custom && (
                    <button
                      onClick={() => handleDeleteCustom(fc.id)}
                      className="p-1 text-[var(--danger)] hover:bg-[var(--danger-soft)] rounded cursor-pointer border-0 bg-transparent"
                      title="Usuń własną fiszkę"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
              <div className="text-xs sm:text-sm text-[var(--text-secondary)] pt-2 border-t border-[var(--border)] leading-relaxed">
                <FormattedText text={fc.back} />
              </div>
              <div className="flex flex-wrap items-center justify-between text-[11px] text-[var(--text-muted)] pt-1">
                <span>{fc.chapter_title}</span>
                <span>
                  Powtórki: {fc.review.total_reviews} • Interwał: {fc.review.interval_days ? `${fc.review.interval_days} dni` : 'nowa'}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : cards.length === 0 || !current ? (
        <div className="card p-10 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-[var(--success)] mx-auto" />
          <h2 className="text-xl font-extrabold m-0">Świetna robota! Talia przerobiona!</h2>
          <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto">
            Wszystkie fiszki w tym filtrze zostały ocenione i zaplanowane przez algorytm SM-2. Możesz zacząć od nowa lub przejść do wszystkich kart.
          </p>
          <div className="flex justify-center gap-2 pt-2">
            <button
              onClick={() => {
                setDueOnly(false);
                setIndex(0);
                setFlipped(false);
                loadCards();
              }}
              className="btn-primary"
            >
              <RotateCcw className="w-4 h-4" /> Powtórz całą talię
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="flex items-center gap-3 text-xs font-semibold text-[var(--text-muted)]">
            <span>
              Karta {index + 1} / {cards.length}
            </span>
            <div className="flex-1 h-2 rounded-full bg-[var(--bg-subtle)] overflow-hidden">
              <div
                className="h-full bg-[var(--accent)] transition-all"
                style={{ width: `${((index + 1) / cards.length) * 100}%` }}
              />
            </div>
            <span>{current.chapter_title?.split(':')[0]}</span>
          </div>

          {/* 3D Flip Card */}
          <div className="flip-scene">
            <div
              onClick={() => setFlipped((f) => !f)}
              className={`flip-card ${flipped ? 'is-flipped' : ''}`}
            >
              {/* FRONT */}
              <div className="flip-face">
                <div className="flex items-center justify-between gap-2 text-xs text-[var(--text-muted)]">
                  <span className="font-bold uppercase tracking-wider text-[var(--accent)]">Pytanie</span>
                  <div className="flex items-center gap-2">
                    {current.exam_question_num && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onJumpToExamTopic(current.exam_question_num);
                        }}
                        className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[var(--purple-soft)] text-[var(--purple)] border-0 cursor-pointer inline-flex items-center gap-1"
                      >
                        <GraduationCap className="w-3 h-3" /> Pyt. #{current.exam_question_num}
                      </button>
                    )}
                    <span className="px-2 py-0.5 rounded bg-[var(--bg-subtle)] font-mono">
                      EF {current.review.ease_factor}
                    </span>
                  </div>
                </div>

                <div className="my-6 text-center">
                  <div className="text-lg sm:text-xl font-extrabold leading-relaxed">
                    <FormattedText text={current.front} />
                  </div>
                  {showHint && current.hint && (
                    <div className="mt-4 inline-block px-4 py-2 rounded bg-[var(--warning-soft)] text-xs text-[var(--text-secondary)] border border-[var(--border)]">
                      <strong>Podpowiedź:</strong> <FormattedText text={current.hint} />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                  {current.hint ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowHint((h) => !h);
                      }}
                      className="inline-flex items-center gap-1 text-[var(--warning)] font-medium bg-transparent border-0 cursor-pointer"
                    >
                      <Lightbulb className="w-3.5 h-3.5" /> {showHint ? 'Ukryj podpowiedź' : 'Podpowiedź (H)'}
                    </button>
                  ) : (
                    <span />
                  )}
                  <span>Kliknij kartę lub Spacja → odpowiedź</span>
                </div>
              </div>

              {/* BACK */}
              <div className="flip-face flip-face-back">
                <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                  <span className="font-mono uppercase tracking-wider text-[var(--success)] font-semibold">Odpowiedź</span>
                  <span>Kliknij, aby obrócić</span>
                </div>

                <div className="my-4 text-sm sm:text-base leading-[1.75] text-[var(--text-secondary)]">
                  <FormattedText text={current.back} />
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--border)]">
                  {current.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--bg-subtle)] text-[var(--text-muted)]">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SM-2 Rating Controls */}
          <div className="card p-4">
            {!flipped ? (
              <div className="text-center">
                <button onClick={() => setFlipped(true)} className="btn-primary !px-8">
                  Pokaż odpowiedź (Spacja)
                </button>
              </div>
            ) : (
              <div>
                <div className="text-xs text-center text-[var(--text-muted)] mb-2.5">
                  Oceń znajomość karty (SM-2 zaplanuje kolejną powtórkę)
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {RATINGS.map((r) => (
                    <button
                      key={r.rating}
                      onClick={() => handleRate(r.rating)}
                      className="p-2.5 rounded border text-center cursor-pointer transition-colors hover:bg-[var(--bg-subtle)]"
                      style={{
                        borderColor: `${r.color}55`,
                        background: `${r.color}10`,
                      }}
                    >
                      <div className="font-semibold text-sm" style={{ color: r.color }}>
                        [{r.key}] {r.label}
                      </div>
                      <div className="text-[11px] text-[var(--text-muted)] mt-0.5">{r.sub}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Custom Flashcard Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 bg-black/55 flex items-center justify-center p-4">
          <form onSubmit={handleCreateCustom} className="card max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif-heading text-lg font-bold m-0">Dodaj własną fiszkę</h2>
              <button
                type="button"
                onClick={() => setShowAdd(false)}
                className="p-1.5 rounded hover:bg-[var(--bg-subtle)] bg-transparent border-0 cursor-pointer text-[var(--text-muted)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Rozdział</label>
              <select value={newChapter} onChange={(e) => setNewChapter(e.target.value)} className="input-field text-sm">
                {chapters.map((c) => (
                  <option key={c.id} value={c.id}>
                    R{c.order_index}: {c.title.replace(/^Rozdział \d+:\s*/, '')}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Przód (wspiera wzory LaTeX $...$)</label>
              <textarea
                required
                rows={2}
                value={newFront}
                onChange={(e) => setNewFront(e.target.value)}
                placeholder={
                  isMath
                    ? 'Np. Ile wynosi $\\int \\frac{dx}{x^2 + a^2}$?'
                    : isProb
                      ? 'Np. Ile wynosi $D(X)$ dla rozkładu Pascala?'
                      : isAlg
                        ? 'Np. Ile wynosi $\\det(\\alpha A)$ dla $A \\in M_{n\\times n}$?'
                        : isAisd
                          ? 'Np. Jaka jest złożoność i pamięć Merge Sorta oraz Heapsorta?'
                          : isPhys
                            ? 'Np. Podaj wzór Stokesa na współczynnik lepkości dynamicznej $\\eta$.'
                            : 'Np. Jakie porty TCP/UDP wykorzystuje DHCP?'
                }
                className="input-field text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Tył (wspiera $LaTeX$, **pogrubienie** i `kod`)</label>
              <textarea
                required
                rows={3}
                value={newBack}
                onChange={(e) => setNewBack(e.target.value)}
                placeholder={
                  isMath
                    ? 'Np. $\\frac{1}{a}\\operatorname{arctg}\\frac{x}{a} + C$'
                    : isProb
                      ? 'Np. $D(X) = \\frac{n(1-p)}{p^2}$ (uwaga na kwadrat w mianowniku!)'
                      : isAlg
                        ? 'Np. $\\det(\\alpha A) = \\alpha^n \\det A$ (wykładnik $n$ = stopień macierzy!)'
                        : isAisd
                          ? 'Np. Oba $\\Theta(n\\log n)$ zawsze; Merge Sort $O(n)$ stabilny, Heapsort $O(1)$ niestabilny.'
                          : isPhys
                            ? 'Np. $\\eta = \\frac{2(\\rho_k - \\rho_c) g r^2}{9v}$ (dla małych liczb Reynoldsa $Re \\ll 1$).'
                            : 'UDP port 67 (serwer) i port 68 (klient)...'
                }
                className="input-field text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Podpowiedź (opcjonalna)</label>
              <input
                type="text"
                value={newHint}
                onChange={(e) => setNewHint(e.target.value)}
                className="input-field text-sm"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowAdd(false)} className="btn-secondary">
                Anuluj
              </button>
              <button type="submit" className="btn-primary">
                Zapisz w bazie SQLite
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
