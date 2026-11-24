import React, { useEffect, useMemo, useState } from 'react';
import {
  Search,
  GraduationCap,
  CheckCircle2,
  Clock,
  Circle,
  ChevronDown,
  ChevronUp,
  Shuffle,
  Printer,
  AlertTriangle,
  Terminal,
  BookOpen,
  Calculator,
  LineChart,
  BarChart3,
  Sigma,
  GitBranch,
  Atom,
  Save,
  Eye,
  ZoomIn,
} from 'lucide-react';
import { api } from '../api/client.js';
import { FormattedText } from '../components/RichContent.jsx';
import { InteractiveDiagram } from '../components/InteractiveDiagrams.jsx';

const STATUS_META = {
  not_started: { label: 'Do nauki', color: 'var(--text-muted)', bg: 'var(--bg-subtle)', icon: Circle },
  learning: { label: 'Powtarzam', color: 'var(--warning)', bg: 'var(--warning-soft)', icon: Clock },
  mastered: { label: 'Opanowane', color: 'var(--success)', bg: 'var(--success-soft)', icon: CheckCircle2 },
};

export function ExamTopicsPage({
  subjectSlug = 'sieci',
  initialTopicNum = null,
  onOpenChapter,
  onOpenImage,
  onOpenSubnetTrainer,
  onProgressChanged,
}) {
  const isMath = subjectSlug === 'analiza';
  const isProb = subjectSlug === 'probabilistyka';
  const isAlg = subjectSlug === 'algebra';
  const isAisd = subjectSlug === 'aisd';
  const isPhys = subjectSlug === 'fizyka';
  const [data, setData] = useState({
    total: isMath ? 30 : isProb ? 25 : isAlg ? 24 : isAisd ? 28 : isPhys ? 20 : 60,
    mastered: 0,
    learning: 0,
    items: [],
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedIds, setExpandedIds] = useState(() => new Set());
  const [notesDraft, setNotesDraft] = useState({});
  const [savingId, setSavingId] = useState(null);

  // Oral / written exam random draw mode
  const [oralMode, setOralMode] = useState(false);
  const [oralTopic, setOralTopic] = useState(null);
  const [oralReveal, setOralReveal] = useState(false);
  const [oralChecks, setOralChecks] = useState({});

  const loadTopics = async () => {
    setLoading(true);
    const res = await api.getExamTopics(subjectSlug);
    setData(res);
    const drafts = {};
    for (const item of res.items) {
      drafts[item.id] = item.progress?.student_note || '';
    }
    setNotesDraft(drafts);
    setCategory('all');
    setStatusFilter('all');
    setSearch('');
    setExpandedIds(new Set());
    setOralMode(false);
    setLoading(false);
  };

  useEffect(() => {
    loadTopics();
  }, [subjectSlug]);

  useEffect(() => {
    if (initialTopicNum && data.items.length > 0) {
      const target = data.items.find((t) => t.number === Number(initialTopicNum));
      if (target) {
        setExpandedIds((prev) => new Set(prev).add(target.id));
        setTimeout(() => {
          document.getElementById(`exam-topic-${target.number}`)?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }, 120);
      }
    }
  }, [initialTopicNum, data.items]);

  const categories = useMemo(() => {
    const s = new Set(data.items.map((i) => i.category));
    return ['all', ...Array.from(s)];
  }, [data.items]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data.items.filter((t) => {
      if (category !== 'all' && t.category !== category) return false;
      if (statusFilter !== 'all' && t.progress.status !== statusFilter) return false;
      if (!q) return true;
      return (
        String(t.number) === q ||
        `#${t.number}` === q ||
        t.question.toLowerCase().includes(q) ||
        t.short_answer.toLowerCase().includes(q) ||
        t.full_answer.toLowerCase().includes(q)
      );
    });
  }, [data.items, search, category, statusFilter]);

  const toggleExpand = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => setExpandedIds(new Set(filtered.map((t) => t.id)));
  const collapseAll = () => setExpandedIds(new Set());

  const setStatus = async (topic, nextStatus) => {
    await api.updateExamTopicProgress(topic.id, { status: nextStatus });
    setData((prev) => {
      const items = prev.items.map((it) =>
        it.id === topic.id ? { ...it, progress: { ...it.progress, status: nextStatus } } : it
      );
      return {
        ...prev,
        items,
        mastered: items.filter((i) => i.progress.status === 'mastered').length,
        learning: items.filter((i) => i.progress.status === 'learning').length,
      };
    });
    if (oralTopic?.id === topic.id) {
      setOralTopic((t) => ({ ...t, progress: { ...t.progress, status: nextStatus } }));
    }
    onProgressChanged?.();
  };

  const saveNote = async (topicId) => {
    setSavingId(topicId);
    try {
      await api.updateExamTopicProgress(topicId, { student_note: notesDraft[topicId] || '' });
    } finally {
      setTimeout(() => setSavingId(null), 500);
    }
  };

  const drawRandomTopic = (preferUnmastered = true) => {
    let pool = data.items;
    if (preferUnmastered) {
      const unmastered = pool.filter((t) => t.progress.status !== 'mastered');
      if (unmastered.length > 0) pool = unmastered;
    }
    if (pool.length === 0) return;
    const picked = pool[Math.floor(Math.random() * pool.length)];
    setOralTopic(picked);
    setOralReveal(false);
    setOralChecks({});
    setOralMode(true);
  };

  const handlePrintCheatSheet = () => {
    setExpandedIds(new Set(data.items.map((t) => t.id)));
    setTimeout(() => window.print(), 250);
  };

  if (loading) {
    return <div className="p-10 text-center text-sm text-[var(--text-muted)]">Wczytywanie zagadnień...</div>;
  }

  const masteredPct = Math.round((data.mastered / Math.max(1, data.total)) * 100);

  return (
    <div className="space-y-5">
      {/* Header & Rubric Banner */}
      <header className="pb-5 border-b border-[var(--border)]">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">
              {isMath
                ? 'Analiza matematyczna · Kompendium definicji, twierdzeń i metod'
                : isProb
                  ? 'Probabilistyka · Wykłady 00–05'
                  : isAlg
                    ? 'Algebra liniowa dla ICT · Wykłady 01–04'
                    : isAisd
                      ? 'Algorytmy i struktury danych · Wykłady W1–W6'
                      : isPhys
                        ? 'Fizyka · Wykłady W1–W3 + Laboratorium'
                        : 'Wprowadzenie do sieci · Oficjalne wymagania zaliczeniowe MiKC'}
            </div>
            <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold m-0">
              {isMath
                ? '30 Twierdzeń i zagadnień na egzamin'
                : isProb
                  ? '25 Twierdzeń i zagadnień na egzamin'
                  : isAlg
                    ? '24 Zagadnienia i twierdzenia na zaliczenie'
                    : isAisd
                      ? '28 Zagadnień na zaliczenie z AiSD'
                      : isPhys
                        ? '20 Zagadnień z fizyki (Wykład + Laboratorium)'
                        : '60 Zagadnień na zaliczenie wykładu'}
            </h1>
            <p className="text-sm text-[var(--text-secondary)] mt-1.5 mb-0 max-w-2xl">
              {isMath
                ? 'Kompletny zestaw definicji, twierdzeń z dowodami/wyprowadzeniami, wzorów oraz klasycznych pułapek ze wszystkich 3 części wykładu wraz z wykresami.'
                : isProb
                  ? 'Wszystkie twierdzenia, dowody (m.in. zbieżność dwumianowego do Poissona, brak pamięci, Czebyszew), modele kombinatoryczne, pułapki z wykładów 00–05 oraz skorygowane literówki ze slajdów.'
                  : isAlg
                    ? 'Zestaw pytań teoretycznych i obliczeniowych ze wszystkich 4 wykładów: liczby zespolone (j² = −1), macierze, wyznaczniki, układy równań liniowych oraz wartości i wektory własne.'
                    : isAisd
                      ? 'Wszystkie 28 zagadnień obejmujących W1–W6: 5 cech algorytmu, pseudokod i schematy blokowe, rekurencję, model RAM, Big-O/Ω/Θ, struktury liniowe, sortowanie, haszowanie, drzewa/kopce/AVL oraz metody numeryczne.'
                      : isPhys
                        ? 'Komplet 20 zagadnień z mechaniki klasycznej i laboratorium fizycznego: rachunek wektorowy 3D, kinematyka (1D/2D/okrąg, transformacja Galileusza), dynamika Newtona, tarcie, zderzenia oraz rachunek niepewności pomiarowych (Student–Fisher, Stokes, Andrade).'
                        : 'Każde z 60 pytań posiada wzorcową odpowiedź z pełnym komentarzem, listę kontrolną punktów, najczęstsze błędy oraz odniesienie do laboratoriów i slajdów.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0 no-print">
            <button onClick={() => drawRandomTopic(true)} className="btn-primary text-xs">
              <Shuffle className="w-3.5 h-3.5" /> Losuj zagadnienie
            </button>
            <button onClick={handlePrintCheatSheet} className="btn-secondary text-xs">
              <Printer className="w-3.5 h-3.5" /> Drukuj / PDF ({data.total})
            </button>
          </div>
        </div>

        {/* Professor Rubric Reminder */}
        <div className="mt-4 px-4 py-3 rounded bg-[var(--warning-soft)] border border-[var(--border)] border-l-[3px] border-l-[var(--warning)] text-xs sm:text-sm text-[var(--text-secondary)] flex gap-2.5">
          <AlertTriangle className="w-4 h-4 text-[var(--warning)] shrink-0 mt-0.5" />
          <div>
            {isMath ? (
              <>
                <strong className="text-[var(--text)]">Na co uważać na egzaminie z Analizy: </strong>
                <FormattedText text="Zawsze podawaj **pełne założenia twierdzeń** (np. ciągłość na $[a,b]$ i różniczkowalność na $(a,b)$ dla Rolle’a/Lagrange’a), sprawdzaj dziedzinę przed wskazaniem punktu przegięcia oraz bieguny wewnątrz przedziału przed wzorem Newtona–Leibniza." />
              </>
            ) : isProb ? (
              <>
                <strong className="text-[var(--text)]">Na co uważać na egzaminie z Probabilistyki: </strong>
                <FormattedText text="Nie myl **niezależności** ($P(AB)=P(A)P(B)$) z **wykluczaniem** ($AB=\emptyset$). Pamiętaj o polskiej konwencji dystrybuanty $F(x)=P(X<x)$, różnicy między $D(aX+b)=a^2D(X)$ a $E(aX+b)=aE(X)+b$, oraz o skorygowanych literówkach ze slajdów (m.in. $\bar{C}_n^k$ i $D(X)=\frac{n(1-p)}{p^2}$ w rozkładzie Pascala)." />
              </>
            ) : isAlg ? (
              <>
                <strong className="text-[var(--text)]">Na co uważać na zaliczeniu z Algebry: </strong>
                <FormattedText text="Pamiętaj o **nieprzemienności** ($AB\neq BA$, $(AB)^{-1}=B^{-1}A^{-1}$), o wykładniku w $\det(\alpha A)=\alpha^n\det A$, o **transpozycji** macierzy dopełnień $A^D=[A_{ij}]^T$, zakazie stosowania Sarrusa dla $n\ge 4$ oraz o tym, że wektor własny musi być **niezerowy** ($X\neq 0$), choć $\lambda=0$ jest dozwolone!" />
              </>
            ) : isAisd ? (
              <>
                <strong className="text-[var(--text)]">Format egzaminu prowadzącego (W1 sl. 5, próg 50%): </strong>
                <FormattedText text="Oprócz definicji i wykresów pojawia się **pisanie, uzupełnianie i poprawianie błędów w pseudokodzie** oraz ręczne rysowanie schematów blokowych, kroków sortowania, kopców i rotacji AVL. Nie myl notacji $O/\Omega/\Theta$ z przypadkiem pesymistycznym/optymistycznym, pamiętaj o znaczniku `DELETED` przy adresowaniu otwartym, o $bf_i=h_L-h_R$ w AVL oraz o wszystkich 10 skorygowanych błędach ze slajdów W3–W6!" />
              </>
            ) : isPhys ? (
              <>
                <strong className="text-[var(--text)]">Na co uważać na wykładzie i w laboratorium: </strong>
                <FormattedText text="Nie myl iloczynu **skalarnego** (przemienny!) z **wektorowym** (antyprzemienny — uwaga na literówkę na W1 sl. 27 i znaki minus na W2A sl. 24!). Dla równych dróg prędkość średnia to **średnia harmoniczna** $\frac{2v_1v_2}{v_1+v_2}$. Siły akcji i reakcji działają na **różne ciała** i się nie równoważą. W laboratorium: w różniczce logarytmicznej bierz zawsze **wartość bezwzględną** (dodajemy błędy!), a przy małej próbie stosuj współczynnik **Studenta–Fishera** $t_{n-1}$." />
              </>
            ) : (
              <>
                <strong className="text-[var(--text)]">Wymóg prowadzącego (z pliku PDF): </strong>
                Wszystkie odpowiedzi muszą zawierać <strong>komentarz zgodny z wiedzą studenta</strong> — samo wymienienie pojedynczych słów lub jednego ogólnego zdania nie wystarczy! Obowiązuje też wiedza z zajęć laboratoryjnych.
              </>
            )}
          </div>
        </div>

        {/* Mastery Progress Bar */}
        <div className="mt-4 pt-4 border-t border-[var(--border)]">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono mb-1.5 tabular-nums">
            <div className="flex flex-wrap gap-4">
              <span className="text-[var(--success)] font-semibold">
                Opanowane: {data.mastered}/{data.total} ({masteredPct}%)
              </span>
              <span className="text-[var(--warning)]">Powtarzam: {data.learning}</span>
              <span className="text-[var(--text-muted)]">Do nauki: {data.total - data.mastered - data.learning}</span>
            </div>
            <div className="flex gap-2 font-sans no-print">
              <button onClick={expandAll} className="text-xs font-medium text-[var(--accent-text)] cursor-pointer bg-transparent border-0">
                Rozwiń wszystkie
              </button>
              <span className="text-[var(--border-strong)]">|</span>
              <button onClick={collapseAll} className="text-xs font-medium text-[var(--text-muted)] cursor-pointer bg-transparent border-0">
                Zwiń wszystkie
              </button>
            </div>
          </div>
          <div className="h-1.5 rounded bg-[var(--bg-subtle)] overflow-hidden flex">
            <div
              className="h-full bg-[var(--success)] transition-all"
              style={{ width: `${(data.mastered / Math.max(1, data.total)) * 100}%` }}
            />
            <div
              className="h-full bg-[var(--warning)] transition-all"
              style={{ width: `${(data.learning / Math.max(1, data.total)) * 100}%` }}
            />
          </div>
        </div>
      </header>

      {/* Exam Simulator Panel */}
      {oralMode && oralTopic && (
        <div className="card p-6 border-2 border-[var(--accent)] no-print">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-text)]">
              Tryb losowania · Zagadnienie #{oralTopic.number} / {data.total}
            </span>
            <div className="flex gap-2">
              <button onClick={() => drawRandomTopic(true)} className="btn-secondary !py-1 !px-3 text-xs">
                <Shuffle className="w-3.5 h-3.5" /> Losuj inne
              </button>
              <button onClick={() => setOralMode(false)} className="btn-secondary !py-1 !px-3 text-xs">
                Zamknij
              </button>
            </div>
          </div>

          <h2 className="font-serif-heading text-xl font-bold mb-2">
            {oralTopic.number}. <FormattedText text={oralTopic.question} />
          </h2>
          <p className="text-xs text-[var(--text-muted)] mb-4">
            Spróbuj najpierw samodzielnie zapisać lub wypowiedzieć odpowiedź (założenia, wzory, wyprowadzenie), a potem odsłoń opracowanie i odhacz punkty kontrolne.
          </p>

          {!oralReveal ? (
            <button onClick={() => setOralReveal(true)} className="btn-primary">
              <Eye className="w-4 h-4" /> Odsłoń odpowiedź i listę kontrolną
            </button>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded bg-[var(--bg-subtle)] border border-[var(--border)] text-sm leading-relaxed text-[var(--text-secondary)]">
                <FormattedText text={oralTopic.full_answer} />
              </div>

              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2">
                  Samoocena — odhacz omówione punkty:
                </div>
                <div className="space-y-1">
                  {oralTopic.key_points.map((kp, i) => (
                    <label
                      key={i}
                      className="flex items-start gap-2.5 p-2 rounded hover:bg-[var(--bg-subtle)] cursor-pointer text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={Boolean(oralChecks[i])}
                        onChange={(e) => setOralChecks((p) => ({ ...p, [i]: e.target.checked }))}
                        className="mt-1 accent-[var(--success)]"
                      />
                      <span>
                        <FormattedText text={kp} />
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--border)]">
                <div className="flex gap-2">
                  {Object.entries(STATUS_META).map(([stKey, meta]) => (
                    <button
                      key={stKey}
                      onClick={() => setStatus(oralTopic, stKey)}
                      className="px-3 py-1.5 rounded text-xs font-medium border cursor-pointer"
                      style={{
                        background: oralTopic.progress.status === stKey ? meta.bg : 'var(--bg-elevated)',
                        borderColor: oralTopic.progress.status === stKey ? meta.color : 'var(--border)',
                        color: oralTopic.progress.status === stKey ? meta.color : 'var(--text-secondary)',
                      }}
                    >
                      {meta.label}
                    </button>
                  ))}
                </div>
                <button onClick={() => drawRandomTopic(true)} className="btn-primary text-xs">
                  Następne losowe →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Filter Bar */}
      <div className="card p-3.5 flex flex-col md:flex-row gap-2.5 no-print">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              isMath
                ? 'Szukaj po numerze (np. 17) lub haśle (Taylor, Darboux, Lagrange, Euler, Riemann)...'
                : isProb
                  ? 'Szukaj po numerze (np. 10) lub haśle (Bayes, Kołmogorow, Poisson, Czebyszew, Pascal)...'
                  : isAlg
                    ? 'Szukaj po numerze (np. 8) lub haśle (Moivre, Euler, Sarrus, Laplace, Cramer, własne)...'
                    : isAisd
                      ? 'Szukaj po numerze (np. 20) lub haśle (Heapsort, Quicksort, AVL, haszowanie, bisekcja, MRS)...'
                      : isPhys
                        ? 'Szukaj po numerze (np. 17) lub haśle (wektor, rzut, Galileusz, Newton, zderzenie, Stokes)...'
                        : 'Szukaj po numerze (np. 42) lub haśle (VLAN, TTL, OSPF, NAT, 90 m)...'
            }
            className="input-field !pl-9 text-sm"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input-field md:w-52 text-sm"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === 'all' ? 'Wszystkie działy' : c}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="input-field md:w-44 text-sm"
        >
          <option value="all">Wszystkie statusy</option>
          <option value="not_started">Do nauki</option>
          <option value="learning">Powtarzam</option>
          <option value="mastered">Opanowane</option>
        </select>
      </div>

      {/* Accordion List */}
      <div className="space-y-2.5">
        {filtered.map((t) => {
          const isOpen = expandedIds.has(t.id);
          const stMeta = STATUS_META[t.progress.status] || STATUS_META.not_started;
          const StIcon = stMeta.icon;

          return (
            <div
              key={t.id}
              id={`exam-topic-${t.number}`}
              className="card overflow-hidden print-break-avoid transition-colors"
              style={{ borderColor: isOpen ? 'var(--accent)' : 'var(--border)' }}
            >
              {/* Header Row */}
              <div
                onClick={() => toggleExpand(t.id)}
                className="px-4 py-3.5 sm:px-5 sm:py-4 cursor-pointer flex items-start justify-between gap-3 hover:bg-[var(--bg-subtle)]/40 transition-colors"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <span className="font-mono text-xs font-semibold text-[var(--accent-text)] bg-[var(--accent-soft)] px-2 py-0.5 rounded shrink-0 mt-0.5 tabular-nums">
                    {String(t.number).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-[0.96rem] font-semibold m-0 leading-snug text-[var(--text)]">
                      <FormattedText text={t.question} />
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] font-mono text-[var(--text-muted)]">
                      <span>{t.category}</span>
                      {t.chapter_title && <span>· {t.chapter_title.split(':')[0]}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium"
                    style={{ background: stMeta.bg, color: stMeta.color }}
                  >
                    <StIcon className="w-3 h-3" />
                    <span className="hidden sm:inline">{stMeta.label}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[var(--text-muted)] no-print" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[var(--text-muted)] no-print" />
                  )}
                </div>
              </div>

              {/* Expanded Answer */}
              {isOpen && (
                <div className="px-4 sm:px-6 pb-5 pt-3 border-t border-[var(--border)] space-y-4">
                  {/* Short anchor */}
                  <div className="p-3.5 rounded bg-[var(--accent-soft)] border border-[var(--border)] border-l-[3px] border-l-[var(--accent)] text-sm">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent-text)] mb-1">
                      Synteza (w pigułce)
                    </div>
                    <div className="text-[var(--text)] leading-relaxed">
                      <FormattedText text={t.short_answer} />
                    </div>
                  </div>

                  {/* Full answer */}
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2">
                      Pełne opracowanie i wyprowadzenie
                    </div>
                    <div className="text-sm leading-[1.78] text-[var(--text-secondary)]">
                      <FormattedText text={t.full_answer} />
                    </div>
                  </div>

                  {/* Interactive diagram */}
                  {t.svg_diagram_id && (
                    <div className="no-print">
                      <InteractiveDiagram
                        diagramId={t.svg_diagram_id}
                        title={
                          isMath || isProb || isAlg || isAisd || isPhys
                            ? `Wykres / schemat do zagadnienia #${t.number}`
                            : `Schemat do pytania #${t.number}`
                        }
                      />
                    </div>
                  )}

                  {/* Special tool shortcut */}
                  {!isMath && !isProb && !isAlg && !isAisd && !isPhys && t.number === 60 && (
                    <div className="no-print">
                      <button onClick={onOpenSubnetTrainer} className="btn-primary text-xs">
                        <Calculator className="w-4 h-4" /> Otwórz Generator Zadań z Podsieci IP (Pyt. 60)
                      </button>
                    </div>
                  )}
                  {isMath && [13, 19, 21, 28, 29].includes(t.number) && (
                    <div className="no-print">
                      <button onClick={onOpenSubnetTrainer} className="btn-secondary text-xs">
                        <LineChart className="w-3.5 h-3.5" /> Przetestuj tę funkcję w Laboratorium wykresów
                      </button>
                    </div>
                  )}
                  {isProb && [2, 10, 21, 22, 23, 24, 25].includes(t.number) && (
                    <div className="no-print">
                      <button onClick={onOpenSubnetTrainer} className="btn-secondary text-xs">
                        <BarChart3 className="w-3.5 h-3.5" /> Przetestuj w Laboratorium rozkładów i Bayesa
                      </button>
                    </div>
                  )}
                  {isAlg && [8, 13, 16, 18, 22, 24].includes(t.number) && (
                    <div className="no-print">
                      <button onClick={onOpenSubnetTrainer} className="btn-secondary text-xs">
                        <Sigma className="w-3.5 h-3.5" /> Przetestuj w Laboratorium algebry
                      </button>
                    </div>
                  )}
                  {isAisd && [6, 9, 13, 14, 15, 18, 20, 21, 22, 24, 25, 26].includes(t.number) && (
                    <div className="no-print">
                      <button onClick={onOpenSubnetTrainer} className="btn-secondary text-xs">
                        <GitBranch className="w-3.5 h-3.5" /> Przetestuj w Laboratorium AiSD
                      </button>
                    </div>
                  )}
                  {isPhys && [1, 2, 3, 4, 8, 11, 14, 16, 17, 18, 19, 20].includes(t.number) && (
                    <div className="no-print">
                      <button onClick={onOpenSubnetTrainer} className="btn-secondary text-xs">
                        <Atom className="w-3.5 h-3.5" /> Przetestuj w Laboratorium fizyki
                      </button>
                    </div>
                  )}

                  {/* Checklist + Common Mistakes + Context */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="card-subtle p-3.5">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--success)] mb-2">
                        Lista kontrolna (kluczowe punkty)
                      </div>
                      <ul className="space-y-1.5 pl-4 m-0 text-xs sm:text-sm text-[var(--text-secondary)]">
                        {t.key_points.map((kp, i) => (
                          <li key={i}>
                            <FormattedText text={kp} />
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      {t.common_mistakes && (
                        <div className="p-3.5 rounded bg-[var(--danger-soft)] border border-[var(--border)] border-l-[3px] border-l-[var(--danger)] text-xs sm:text-sm">
                          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--danger)] flex items-center gap-1.5 mb-1">
                            <AlertTriangle className="w-3.5 h-3.5" /> Typowe pułapki i błędy
                          </div>
                          <div className="text-[var(--text-secondary)]">
                            <FormattedText text={t.common_mistakes} />
                          </div>
                        </div>
                      )}
                      {t.lab_connection && (
                        <div className="p-3.5 rounded bg-[var(--bg-subtle)] border border-[var(--border)] text-xs sm:text-sm">
                          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5 mb-1">
                            <Terminal className="w-3.5 h-3.5" />{' '}
                            {isMath || isProb || isAlg || isAisd || isPhys
                              ? 'Zastosowanie i kontekst'
                              : 'Powiązanie z laboratoriami'}
                          </div>
                          <div className="text-[var(--text-secondary)]">
                            <FormattedText text={t.lab_connection} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Linked slides (Sieci) */}
                  {t.figure_refs?.length > 0 && (
                    <div className="no-print">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2">
                        Powiązane slajdy z wykładu
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {t.figure_refs.map((src, fi) => (
                          <button
                            key={fi}
                            type="button"
                            onClick={() => onOpenImage?.({ src, caption: `Slajd do zagadnienia #${t.number}: ${t.question}` })}
                            className="slide-frame relative group cursor-zoom-in"
                          >
                            <img src={src} alt={`Slajd do pytania ${t.number}`} loading="lazy" className="w-full h-36 object-contain bg-white" />
                            <span className="absolute bottom-1.5 right-1.5 bg-zinc-900/80 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 flex items-center gap-1">
                              <ZoomIn className="w-3 h-3" /> Powiększ
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Footer controls */}
                  <div className="pt-3 border-t border-[var(--border)] space-y-3 no-print">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-xs text-[var(--text-muted)] mr-1">Status:</span>
                        {Object.entries(STATUS_META).map(([stKey, meta]) => (
                          <button
                            key={stKey}
                            onClick={() => setStatus(t, stKey)}
                            className="px-2.5 py-1 rounded text-xs font-medium border cursor-pointer transition-colors"
                            style={{
                              background: t.progress.status === stKey ? meta.bg : 'var(--bg-elevated)',
                              borderColor: t.progress.status === stKey ? meta.color : 'var(--border)',
                              color: t.progress.status === stKey ? meta.color : 'var(--text-secondary)',
                            }}
                          >
                            {meta.label}
                          </button>
                        ))}
                      </div>
                      {t.chapter_id && (
                        <button
                          onClick={() => onOpenChapter(t.chapter_id)}
                          className="btn-secondary !py-1 !px-3 text-xs"
                        >
                          <BookOpen className="w-3.5 h-3.5" /> Pełna teoria w rozdziale
                        </button>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={notesDraft[t.id] ?? ''}
                        onChange={(e) => setNotesDraft((p) => ({ ...p, [t.id]: e.target.value }))}
                        placeholder="Własna krótka notatka do tego zagadnienia..."
                        className="input-field text-xs flex-1"
                      />
                      <button
                        onClick={() => saveNote(t.id)}
                        className="btn-secondary !py-1.5 !px-3 text-xs shrink-0"
                      >
                        <Save className="w-3.5 h-3.5" /> {savingId === t.id ? 'Zapisano' : 'Zapisz'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="card p-10 text-center text-sm text-[var(--text-muted)]">
            Brak zagadnień spełniających wybrane filtry.
          </div>
        )}
      </div>
    </div>
  );
}
