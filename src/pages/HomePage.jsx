import React from 'react';
import {
  Network,
  Sigma,
  GitBranch,
  Atom,
  Dices,
  FunctionSquare,
  ArrowRight,
  BookOpen,
  Clock,
} from 'lucide-react';

const ICON_MAP = {
  network: Network,
  sigma: Sigma,
  'git-branch': GitBranch,
  'function-square': FunctionSquare,
  atom: Atom,
  'dice-5': Dices,
};

export function HomePage({ overview, onSelectSubject }) {
  if (!overview) {
    return <div className="p-10 text-center text-sm text-[var(--text-muted)]">Wczytywanie katalogu...</div>;
  }

  const { subjects, recentActivity } = overview;
  const ready = subjects.filter((s) => s.status === 'ready');
  const planned = subjects.filter((s) => s.status !== 'ready');

  const totals = ready.reduce(
    (acc, s) => ({
      chaptersDone: acc.chaptersDone + s.stats.chaptersDone,
      chaptersTotal: acc.chaptersTotal + s.stats.chaptersTotal,
      topicsMastered: acc.topicsMastered + s.stats.topicsMastered,
      topicsTotal: acc.topicsTotal + s.stats.topicsTotal,
      flashcardsDue: acc.flashcardsDue + s.stats.flashcardsDue,
      flashcardsTotal: acc.flashcardsTotal + s.stats.flashcardsTotal,
      quizzesTotal: acc.quizzesTotal + s.stats.quizzesTotal,
    }),
    { chaptersDone: 0, chaptersTotal: 0, topicsMastered: 0, topicsTotal: 0, flashcardsDue: 0, flashcardsTotal: 0, quizzesTotal: 0 }
  );

  return (
    <div className="space-y-8">
      {/* Editorial Masthead */}
      <section className="pb-6 border-b border-[var(--border)]">
        <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2">
          Politechnika Poznańska · Kompendium akademickie (MiKC)
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
          <div className="max-w-2xl">
            <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold tracking-tight m-0 text-[var(--text)]">
              Skrypty wykładowe, wzory i przygotowanie do zaliczeń
            </h1>
            <p className="text-sm sm:text-[0.95rem] text-[var(--text-secondary)] mt-2.5 mb-0 leading-relaxed">
              Opracowane rozdział po rozdziale materiały z wykładów wraz z rozwiązanymi przykładami, wyprowadzeniami, wykresami, bazą zagadnień egzaminacyjnych, fiszkami SM-2 oraz testami — z lokalnym zapisem postępów w SQLite.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <button onClick={() => onSelectSubject('fizyka', 'dashboard')} className="btn-primary">
              Fizyka <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => onSelectSubject('aisd', 'dashboard')} className="btn-secondary">
              AiSD <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => onSelectSubject('algebra', 'dashboard')} className="btn-secondary">
              Algebra <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => onSelectSubject('probabilistyka', 'dashboard')} className="btn-secondary">
              Probabilistyka <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => onSelectSubject('analiza', 'dashboard')} className="btn-secondary">
              Analiza <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => onSelectSubject('sieci', 'dashboard')} className="btn-secondary">
              Sieci <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Clean Tabular Ledger */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[var(--border)] border border-[var(--border)] rounded-md overflow-hidden mt-6">
          <div className="bg-[var(--bg-elevated)] px-4 py-3">
            <div className="text-[11px] font-mono uppercase text-[var(--text-muted)]">Opracowane kursy</div>
            <div className="text-xl font-serif-heading font-bold tabular-nums mt-0.5">
              {ready.length} <span className="text-sm font-normal text-[var(--text-muted)]">/ {subjects.length}</span>
            </div>
          </div>
          <div className="bg-[var(--bg-elevated)] px-4 py-3">
            <div className="text-[11px] font-mono uppercase text-[var(--text-muted)]">Rozdziały teorii</div>
            <div className="text-xl font-serif-heading font-bold tabular-nums mt-0.5">
              {totals.chaptersDone} <span className="text-sm font-normal text-[var(--text-muted)]">/ {totals.chaptersTotal}</span>
            </div>
          </div>
          <div className="bg-[var(--bg-elevated)] px-4 py-3">
            <div className="text-[11px] font-mono uppercase text-[var(--text-muted)]">Zagadnienia na egzamin</div>
            <div className="text-xl font-serif-heading font-bold tabular-nums mt-0.5">
              {totals.topicsMastered} <span className="text-sm font-normal text-[var(--text-muted)]">/ {totals.topicsTotal}</span>
            </div>
          </div>
          <div className="bg-[var(--bg-elevated)] px-4 py-3">
            <div className="text-[11px] font-mono uppercase text-[var(--text-muted)]">Fiszki do powtórki</div>
            <div className="text-xl font-serif-heading font-bold tabular-nums mt-0.5">
              {totals.flashcardsDue} <span className="text-sm font-normal text-[var(--text-muted)]">z {totals.flashcardsTotal}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Active Ready Courses */}
      <section className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif-heading text-xl font-bold m-0">Dostępne przedmioty</h2>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            {totals.chaptersTotal} rozdziałów · {totals.topicsTotal} zagadnień · {totals.quizzesTotal} pytań testowych
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ready.map((subj, idx) => {
            const Icon = ICON_MAP[subj.icon] || BookOpen;
            const isMath = subj.slug === 'analiza';
            const isProb = subj.slug === 'probabilistyka';
            const isAlg = subj.slug === 'algebra';
            const isAisd = subj.slug === 'aisd';
            const isPhys = subj.slug === 'fizyka';
            const labView = isMath
              ? 'mathlab'
              : isProb
                ? 'problab'
                : isAlg
                  ? 'alglab'
                  : isAisd
                    ? 'aisdlab'
                    : isPhys
                      ? 'physlab'
                      : 'subnet';
            const labLabel = isMath
              ? 'Wykresy'
              : isProb
                ? 'Rozkłady / Bayes'
                : isAlg
                  ? 'Macierze / ℂ'
                  : isAisd
                    ? 'Symulator AiSD'
                    : isPhys
                      ? 'Lab fizyki'
                      : 'Trener IP';
            return (
              <article
                key={subj.id}
                className="card p-5 sm:p-6 flex flex-col justify-between hover:border-[var(--border-strong)] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-[var(--border)]">
                    <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
                      <Icon className="w-4 h-4 text-[var(--accent)]" />
                      <span>0{idx + 1} · {subj.code}</span>
                    </div>
                    <span className="text-xs font-mono tabular-nums text-[var(--accent-text)] font-medium">
                      Gotowość: {subj.stats.readiness}%
                    </span>
                  </div>

                  <h3 className="font-serif-heading text-xl font-bold m-0 leading-snug">
                    <button
                      onClick={() => onSelectSubject(subj.slug, 'dashboard')}
                      className="text-left bg-transparent border-0 p-0 cursor-pointer text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                    >
                      {subj.title}
                    </button>
                  </h3>
                  <div className="text-xs text-[var(--text-muted)] mt-1">{subj.lecturer}</div>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-3 mb-0">
                    {subj.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[var(--border)] space-y-3">
                  {/* Thin progress rule */}
                  <div className="h-1 bg-[var(--bg-subtle)] rounded overflow-hidden">
                    <div
                      className="h-full bg-[var(--accent)] transition-all"
                      style={{ width: `${Math.max(3, subj.stats.readiness)}%` }}
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-[var(--text-muted)] tabular-nums">
                    <span>{subj.stats.chaptersTotal} rozdziałów</span>
                    <span>{subj.stats.topicsTotal} zagadnień</span>
                    <span>{subj.stats.flashcardsTotal} fiszek</span>
                    <span>{subj.stats.quizzesTotal} pytań</span>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      onClick={() => onSelectSubject(subj.slug, 'dashboard')}
                      className="btn-primary text-xs !py-1.5 !px-3"
                    >
                      Otwórz kurs <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onSelectSubject(subj.slug, 'theory')}
                      className="btn-secondary text-xs !py-1.5 !px-3"
                    >
                      Skrypt
                    </button>
                    <button
                      onClick={() => onSelectSubject(subj.slug, 'flashcards')}
                      className="btn-secondary text-xs !py-1.5 !px-3"
                    >
                      {isMath || isProb || isAlg || isPhys ? 'Fiszki ze wzorów' : isAisd ? 'Fiszki AiSD' : 'Fiszki'}
                    </button>
                    <button
                      onClick={() => onSelectSubject(subj.slug, labView)}
                      className="btn-secondary text-xs !py-1.5 !px-3"
                    >
                      {labLabel}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Upcoming Subjects — Quiet Archival List */}
      {planned.length > 0 && (
        <section className="space-y-3">
          <h2 className="font-serif-heading text-lg font-bold m-0 text-[var(--text-secondary)]">
            Kolejne przedmioty w folderze PUT (w przygotowaniu)
          </h2>
          <div className="card divide-y divide-[var(--border)]">
            {planned.map((subj) => {
              const Icon = ICON_MAP[subj.icon] || BookOpen;
              return (
                <div key={subj.id} className="px-4 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-start gap-3 min-w-0">
                    <Icon className="w-4 h-4 text-[var(--text-muted)] shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-[var(--text)]">{subj.title}</div>
                      <div className="text-xs text-[var(--text-muted)] truncate">{subj.description}</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[var(--text-muted)] shrink-0">
                    {subj.meta?.plannedFiles ? `${subj.meta.plannedFiles} plików źródłowych` : 'W kolejce'}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Recent Study Log */}
      {recentActivity && recentActivity.length > 0 && (
        <section className="space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
            <Clock className="w-3.5 h-3.5" /> Dziennik nauki
          </div>
          <div className="card divide-y divide-[var(--border)]">
            {recentActivity.slice(0, 5).map((act) => (
              <div key={act.id} className="px-4 py-2.5 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] text-[var(--text-muted)]">
                    {act.subject_id}
                  </span>
                  <span className="text-[var(--text-secondary)] truncate">{act.detail}</span>
                </div>
                <span className="font-mono text-[11px] text-[var(--text-muted)] shrink-0">
                  {String(act.created_at || '').slice(0, 16)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
