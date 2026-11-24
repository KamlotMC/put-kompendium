import React from 'react';
import {
  Layers,
  CheckSquare,
  GraduationCap,
  Calculator,
  BookMarked,
  CheckCircle2,
  Clock,
  Image as ImageIcon,
  ArrowRight,
  LineChart,
  BarChart3,
  Sigma,
  GitBranch,
  Atom,
} from 'lucide-react';
import { FormattedText } from '../components/RichContent.jsx';

export function SubjectDashboard({ subjectData, onOpenChapter, onNavigate }) {
  if (!subjectData) {
    return <div className="p-10 text-center text-sm text-[var(--text-muted)]">Wczytywanie przedmiotu...</div>;
  }

  const { stats, chapters = [], recentAttempts = [] } = subjectData;
  const isMath = subjectData.slug === 'analiza';
  const isProb = subjectData.slug === 'probabilistyka';
  const isAlg = subjectData.slug === 'algebra';
  const isAisd = subjectData.slug === 'aisd';
  const isPhys = subjectData.slug === 'fizyka';

  const quickTools = [
    {
      id: 'exam60',
      title: isMath
        ? '30 Twierdzeń i zagadnień'
        : isProb
          ? '25 Twierdzeń i zagadnień'
          : isAlg
            ? '24 Zagadnienia i twierdzenia'
            : isAisd
              ? '28 Zagadnień na egzamin'
              : isPhys
                ? '20 Zagadnień (Wykład + Lab)'
                : '60 Zagadnień na zaliczenie',
      subtitle: `${stats.topicsMastered}/${stats.topicsTotal} opanowanych · pełne opracowania`,
      icon: GraduationCap,
    },
    {
      id: 'flashcards',
      title: isMath || isProb || isAlg || isPhys
        ? 'Fiszki ze wzorów (SM-2)'
        : isAisd
          ? 'Fiszki z algorytmów (SM-2)'
          : 'Fiszki (SM-2)',
      subtitle: `${stats.flashcardsDue} do powtórki · ${stats.flashcardsMastered}/${stats.flashcardsTotal} utrwalonych`,
      icon: Layers,
    },
    {
      id: 'quiz',
      title: 'Quizy i testy',
      subtitle: `${stats.quizzesTotal} pytań · średnia: ${stats.attemptsCount ? `${stats.avgScore}%` : 'brak prób'}`,
      icon: CheckSquare,
    },
    isMath
      ? {
          id: 'mathlab',
          title: 'Laboratorium wykresów',
          subtitle: 'Wykresy f(x), f′(x), f″(x), styczna i całka oznaczona',
          icon: LineChart,
        }
      : isProb
        ? {
            id: 'problab',
            title: 'Laboratorium rozkładów',
            subtitle: 'Wykresy 6 rozkładów dyskretnych, kalkulator Bayesa i statystyki opisowej',
            icon: BarChart3,
          }
        : isAlg
          ? {
              id: 'alglab',
              title: 'Laboratorium algebry',
              subtitle: 'Pierwiastki ⁿ√z, kalkulator macierzy 3×3 / Cramera oraz wektory własne 2×2',
              icon: Sigma,
            }
          : isAisd
            ? {
                id: 'aisdlab',
                title: 'Laboratorium AiSD',
                subtitle: 'Wizualizator 7 sortowań, tablic haszujących, BST/AVL oraz solver metod numerycznych (W6)',
                icon: GitBranch,
              }
            : isPhys
              ? {
                  id: 'physlab',
                  title: 'Laboratorium fizyki',
                  subtitle: 'Wektory 3D, rzut ukośny, równia pochyła, zderzenia 1D i niepewności pomiarowe',
                  icon: Atom,
                }
              : {
                  id: 'subnet',
                  title: 'Trener podsieci IP (Pyt. 60)',
                  subtitle: 'Generator zadań CIDR + rozpisanie binarne krok po kroku',
                  icon: Calculator,
                },
    {
      id: 'glossary',
      title: isMath
        ? 'Tablice wzorów i słownik'
        : isProb
          ? 'Tablice rozkładów i wzorów'
          : isAlg
            ? 'Tablice algebry i słownik'
            : isAisd
              ? 'Tablice złożoności i słownik'
              : isPhys
                ? 'Tablice fizyczne i słownik'
                : 'Wymagane pojęcia',
      subtitle: isMath
        ? `${stats.glossaryTotal} wzorów i definicji + ściągawka pochodnych i całek`
        : isProb
          ? `${stats.glossaryTotal} wzorów i pojęć + zbiorcza tabela 6 rozkładów dyskretnych`
          : isAlg
            ? `${stats.glossaryTotal} pojęć i wzorów + ściągawka ℂ, wyznaczników i widma`
            : isAisd
              ? `${stats.glossaryTotal} pojęć i algorytmów + tablica złożoności sortowania i struktur danych`
              : isPhys
                ? `${stats.glossaryTotal} definicji i wzorów + ściągawka mechaniki i niepewności`
                : `${stats.glossaryTotal} definicji (w tym 13 obowiązkowych na test)`,
      icon: BookMarked,
    },
  ];

  return (
    <div className="space-y-7">
      {/* Editorial Course Header */}
      <header className="pb-5 border-b border-[var(--border)] flex flex-col md:flex-row md:items-end justify-between gap-5">
        <div className="max-w-2xl">
          <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
            {subjectData.code} · {subjectData.lecturer}
          </div>
          <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold tracking-tight m-0">
            {subjectData.title}
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-2 mb-0 leading-relaxed">
            {subjectData.description}
          </p>
        </div>

        <div className="card px-4 py-3.5 min-w-[220px] shrink-0">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[11px] font-mono uppercase text-[var(--text-muted)]">Gotowość</span>
            <span className="font-serif-heading text-2xl font-bold tabular-nums text-[var(--accent-text)]">
              {stats.readiness}%
            </span>
          </div>
          <div className="h-1.5 rounded bg-[var(--bg-subtle)] overflow-hidden my-2">
            <div
              className="h-full bg-[var(--accent)] transition-all"
              style={{ width: `${Math.max(3, stats.readiness)}%` }}
            />
          </div>
          <div className="text-[11px] font-mono text-[var(--text-muted)] tabular-nums flex justify-between">
            <span>Rozdz.: {stats.chaptersDone}/{stats.chaptersTotal}</span>
            <span>Zagad.: {stats.topicsMastered}/{stats.topicsTotal}</span>
          </div>
        </div>
      </header>

      {/* Study Modules Strip (monochrome scholarly cards, zero rainbow tiles) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {quickTools.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => onNavigate(t.id)}
              className="card p-4 text-left hover:border-[var(--accent)] transition-colors cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <Icon className="w-4 h-4 text-[var(--accent)] mb-2.5" />
                <div className="text-sm font-semibold leading-snug text-[var(--text)] group-hover:text-[var(--accent-text)] transition-colors">
                  {t.title}
                </div>
                <div className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">{t.subtitle}</div>
              </div>
              <div className="mt-3 text-xs font-medium text-[var(--accent-text)] flex items-center gap-1">
                Otwórz <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          );
        })}
      </section>

      {/* Chapters Syllabus */}
      <section className="space-y-3.5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <h2 className="font-serif-heading text-xl font-bold m-0">
              Spis treści — {chapters.length} rozdziałów wykładu
            </h2>
            <p className="text-xs text-[var(--text-muted)] m-0 mt-0.5">
              {isMath
                ? 'Wszystkie 3 części wykładu z rozwiązaniami przykładów, wyprowadzeniami twierdzeń i interaktywnymi wykresami.'
                : isProb
                  ? 'Komplet wykładów 00–05 (PUT) — od statystyki opisowej i Kołmogorowa po wszystkie 6 rozkładów dyskretnych z interaktywnymi wykresami.'
                  : isAlg
                    ? 'Komplet wykładów 01–04 (ITM PUT) — liczby zespolone, macierze, wyznaczniki, układy równań oraz wartości i wektory własne z wykresami SVG.'
                    : isAisd
                      ? 'Komplet wykładów W1–W6 (IR/IT PUT) — od pseudokodu, rekurencji i złożoności po sortowanie, haszowanie, drzewa AVL i metody numeryczne.'
                      : isPhys
                        ? 'Komplet wykładów W1–W3 (WIMiFT PP) + metodyka laboratorium fizyki: wektory, kinematyka, ruch po okręgu, dynamika, zderzenia i niepewności pomiarowe.'
                        : 'Ułożone chronologicznie wg wykładów MiKC (W1–W8 + Wymagane pojęcia) wraz ze schematami ze slajdów.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {chapters.map((ch) => (
            <article
              key={ch.id}
              onClick={() => onOpenChapter(ch.id)}
              className="card p-5 cursor-pointer hover:border-[var(--accent)] transition-colors flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2 text-[11px] font-mono text-[var(--text-muted)]">
                  <span>
                    {String(ch.order_index).padStart(2, '0')} · {ch.lecture_ref}
                  </span>
                  {ch.completed ? (
                    <span className="inline-flex items-center gap-1 text-[var(--success)] font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Przerobiony
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" /> ~{ch.estimated_minutes} min
                    </span>
                  )}
                </div>

                <h3 className="font-serif-heading text-base sm:text-[1.06rem] font-bold group-hover:text-[var(--accent-text)] transition-colors m-0 leading-snug">
                  {ch.title.replace(/^Rozdział \d+:\s*/, '')}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-2 mb-0 leading-relaxed line-clamp-3">
                  <FormattedText text={ch.summary} />
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[var(--text-muted)] tabular-nums">
                <div className="flex flex-wrap gap-2.5">
                  {!isMath && !isProb && !isAlg && !isAisd && !isPhys && (
                    <span className="inline-flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" /> {ch.figures_count} slajdów
                    </span>
                  )}
                  {(isMath || isProb || isAlg || isAisd || isPhys) && <span>wykresy SVG</span>}
                  <span>{ch.flashcards_count} fiszek</span>
                  <span>{ch.quizzes_count} pytań</span>
                  {ch.exam_questions?.length > 0 && (
                    <span className="text-[var(--accent-text)]">
                      zagadnienia: {ch.exam_questions.length}
                    </span>
                  )}
                </div>
                <span className="font-sans font-medium text-[var(--accent-text)] inline-flex items-center gap-1">
                  Czytaj <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Recent Test Attempts */}
      {recentAttempts.length > 0 && (
        <section className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] m-0">
              Ostatnie podejścia do testów
            </h2>
            <button
              onClick={() => onNavigate('quiz')}
              className="text-xs font-medium text-[var(--accent-text)] cursor-pointer bg-transparent border-0"
            >
              Nowy test →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {recentAttempts.slice(0, 4).map((a) => (
              <div key={a.id} className="card px-4 py-3">
                <div className="text-[11px] font-mono uppercase text-[var(--text-muted)]">{a.mode}</div>
                <div className="font-serif-heading text-2xl font-bold tabular-nums mt-0.5 text-[var(--text)]">
                  {a.score_percent}%
                </div>
                <div className="text-xs font-mono text-[var(--text-muted)] tabular-nums">
                  {a.correct_count}/{a.total_questions} · {a.duration_sec}s
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
