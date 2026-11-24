import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Clock,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Layers,
  CheckSquare,
  StickyNote,
  Save,
  BookOpen,
  BookmarkCheck,
} from 'lucide-react';
import { api } from '../api/client.js';
import { RichBlocks, FormattedText } from '../components/RichContent.jsx';

export function TheoryPage({
  chapterId,
  onSelectChapter,
  onOpenImage,
  onJumpToExamTopic,
  onLaunchQuiz,
  onLaunchFlashcards,
  onProgressChanged,
}) {
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    api
      .getChapter(chapterId)
      .then((data) => {
        if (!active) return;
        setChapter(data);
        setNotes(data.progress?.notes || '');
        setLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch(() => setLoading(false));
    return () => {
      active = false;
    };
  }, [chapterId]);

  const toggleCompleted = async () => {
    if (!chapter) return;
    const nextVal = !chapter.progress.completed;
    await api.updateChapterProgress(chapter.id, {
      completed: nextVal,
      read_percent: nextVal ? 100 : 50,
    });
    setChapter((prev) => ({
      ...prev,
      progress: { ...prev.progress, completed: nextVal, read_percent: nextVal ? 100 : 50 },
    }));
    onProgressChanged?.();
  };

  const saveNotes = async () => {
    if (!chapter) return;
    setSavingNotes(true);
    try {
      await api.updateChapterProgress(chapter.id, { notes });
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 2000);
    } finally {
      setSavingNotes(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center text-sm text-[var(--text-muted)]">Wczytywanie rozdziału...</div>;
  }
  if (!chapter) {
    return <div className="p-10 text-center text-sm text-[var(--danger)]">Nie znaleziono rozdziału.</div>;
  }

  const siblings = chapter.siblings || [];
  const curIdx = siblings.findIndex((s) => s.id === chapter.id);
  const prevCh = curIdx > 0 ? siblings[curIdx - 1] : null;
  const nextCh = curIdx >= 0 && curIdx < siblings.length - 1 ? siblings[curIdx + 1] : null;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
      {/* Main Monograph Column */}
      <article className="xl:col-span-9 space-y-5">
        {/* Compact Chapter Selector Strip */}
        <div className="flex flex-wrap gap-1">
          {siblings.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelectChapter(s.id)}
              className={`px-2.5 py-1 rounded text-xs font-mono border cursor-pointer transition-colors ${
                s.id === chapter.id
                  ? 'bg-[var(--accent)] text-white dark:text-[#0f141c] border-[var(--accent)] font-semibold'
                  : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--border-strong)]'
              }`}
            >
              R{String(s.order_index).padStart(2, '0')}
            </button>
          ))}
        </div>

        {/* Chapter Title Plate */}
        <header className="card p-6 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--text-muted)]">
              <span>{chapter.lecture_ref}</span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> ~{chapter.estimated_minutes} min
              </span>
            </div>
            <button
              onClick={toggleCompleted}
              className={`px-3 py-1.5 rounded text-xs font-medium border inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
                chapter.progress.completed
                  ? 'bg-[var(--success-soft)] text-[var(--success)] border-[var(--success)]'
                  : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-strong)] hover:bg-[var(--bg-subtle)]'
              }`}
            >
              {chapter.progress.completed ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" /> Rozdział przerobiony
                </>
              ) : (
                <>
                  <Circle className="w-3.5 h-3.5" /> Oznacz jako przerobiony
                </>
              )}
            </button>
          </div>

          <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold tracking-tight m-0 leading-tight">
            {chapter.title}
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1.5 mb-4">
            <FormattedText text={chapter.subtitle} />
          </p>
          <div className="text-sm text-[var(--text-secondary)] leading-relaxed p-4 rounded bg-[var(--bg-subtle)] border border-[var(--border)]">
            <FormattedText text={chapter.summary} />
          </div>

          {/* Linked Exam Topics */}
          {chapter.exam_questions?.length > 0 && (
            <div className="mt-4 pt-3.5 border-t border-[var(--border)] flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-medium text-[var(--text-muted)] inline-flex items-center gap-1.5 mr-1">
                <GraduationCap className="w-3.5 h-3.5 text-[var(--accent)]" /> Powiązane zagadnienia egzaminacyjne:
              </span>
              {chapter.exam_questions.map((num) => (
                <button
                  key={num}
                  onClick={() => onJumpToExamTopic(num)}
                  className="px-2 py-0.5 rounded text-xs font-mono font-medium bg-[var(--bg-subtle)] text-[var(--accent-text)] border border-[var(--border)] hover:border-[var(--accent)] cursor-pointer"
                  title={`Przejdź do zagadnienia nr ${num}`}
                >
                  #{num}
                </button>
              ))}
            </div>
          )}
        </header>

        {/* Key Takeaways Box */}
        {chapter.key_takeaways?.length > 0 && (
          <div className="card p-5 border-l-[3px] border-l-[var(--success)]">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--success)] mb-2.5">
              <BookmarkCheck className="w-4 h-4" /> Najważniejsze wnioski do zapamiętania
            </div>
            <ul className="space-y-2 pl-5 m-0 text-sm text-[var(--text-secondary)] leading-relaxed">
              {chapter.key_takeaways.map((t, i) => (
                <li key={i}>
                  <FormattedText text={t} />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Sections */}
        {chapter.sections.map((sec) => (
          <section key={sec.id} id={sec.id} className="card p-6 sm:p-7 scroll-mt-20">
            <h2 className="font-serif-heading text-xl font-bold tracking-tight mt-0 mb-4 pb-2.5 border-b border-[var(--border)]">
              <FormattedText text={sec.heading} />
            </h2>
            <RichBlocks blocks={sec.blocks} onOpenImage={onOpenImage} />
          </section>
        ))}

        {/* Practice Bar */}
        <div className="card p-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="font-serif-heading font-bold text-base">Utrwal materiał z Rozdziału {chapter.order_index}</div>
            <div className="text-xs text-[var(--text-muted)] mt-0.5">
              Przejdź bezpośrednio do fiszek SM-2 lub krótkiego quizu kontrolnego z tego działu.
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => onLaunchFlashcards(chapter.id)} className="btn-secondary text-xs">
              <Layers className="w-3.5 h-3.5" /> Fiszki z rozdziału
            </button>
            <button onClick={() => onLaunchQuiz(chapter.id)} className="btn-primary text-xs">
              <CheckSquare className="w-3.5 h-3.5" /> Quiz z rozdziału
            </button>
          </div>
        </div>

        {/* Personal Notes */}
        <section className="card p-5">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2 font-semibold text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
              <StickyNote className="w-3.5 h-3.5" /> Notatki własne (zapis w SQLite)
            </div>
            <button
              onClick={saveNotes}
              disabled={savingNotes}
              className="btn-secondary !py-1 !px-3 text-xs"
            >
              <Save className="w-3.5 h-3.5" />
              {savedNotice ? 'Zapisano' : savingNotes ? 'Zapisuję...' : 'Zapisz'}
            </button>
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Własne uwagi, pytania na konsultacje, skróty pamięciowe..."
            className="input-field resize-y text-sm"
          />
        </section>

        {/* Prev / Next Chapter Nav */}
        <div className="flex items-center justify-between gap-3 pt-1">
          {prevCh ? (
            <button
              onClick={() => onSelectChapter(prevCh.id)}
              className="btn-secondary max-w-[48%] text-left"
            >
              <ChevronLeft className="w-4 h-4 shrink-0" />
              <span className="truncate">{prevCh.title}</span>
            </button>
          ) : (
            <div />
          )}
          {nextCh && (
            <button
              onClick={() => onSelectChapter(nextCh.id)}
              className="btn-primary max-w-[48%] text-right"
            >
              <span className="truncate">{nextCh.title}</span>
              <ChevronRight className="w-4 h-4 shrink-0" />
            </button>
          )}
        </div>
      </article>

      {/* Sticky Right Margin: Outline + Linked Exam Topics */}
      <aside className="xl:col-span-3 space-y-4 xl:sticky xl:top-20">
        <div className="card p-4">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2.5 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" /> Na tej stronie
          </div>
          <nav className="space-y-1">
            {chapter.sections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="block text-xs py-1.5 px-2 rounded text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--accent-text)] no-underline leading-snug"
              >
                <FormattedText text={sec.heading} />
              </a>
            ))}
          </nav>
        </div>

        {chapter.linkedTopics?.length > 0 && (
          <div className="card p-4">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2.5 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-[var(--accent)]" /> Zagadnienia ({chapter.linkedTopics.length})
            </div>
            <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
              {chapter.linkedTopics.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onJumpToExamTopic(t.number)}
                  className="w-full text-left p-2 rounded text-xs border border-[var(--border)] hover:border-[var(--accent)] bg-[var(--bg)] cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="font-mono font-semibold text-[var(--accent-text)]">#{t.number}</span>
                    {t.status === 'mastered' && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--success)]" />
                    )}
                  </div>
                  <div className="text-[var(--text-secondary)] line-clamp-2 leading-snug">
                    <FormattedText text={t.question} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
