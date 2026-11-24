import React, { useEffect, useState } from 'react';
import {
  LayoutGrid,
  BookOpen,
  GraduationCap,
  Layers,
  CheckSquare,
  Calculator,
  BookMarked,
  Search,
  Sun,
  Moon,
  Download,
  Menu,
  X,
  Home,
  LineChart,
  BarChart3,
  Sigma,
  GitBranch,
  Atom,
  Library,
} from 'lucide-react';
import { api } from './api/client.js';
import { ImageLightbox } from './components/ImageLightbox.jsx';
import { FormattedText } from './components/RichContent.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { SubjectDashboard } from './pages/SubjectDashboard.jsx';
import { TheoryPage } from './pages/TheoryPage.jsx';
import { ExamTopicsPage } from './pages/ExamTopicsPage.jsx';
import { FlashcardsPage } from './pages/FlashcardsPage.jsx';
import { QuizTestPage } from './pages/QuizTestPage.jsx';
import { SubnetTrainerPage } from './pages/SubnetTrainerPage.jsx';
import { MathLabPage } from './pages/MathLabPage.jsx';
import { ProbLabPage } from './pages/ProbLabPage.jsx';
import { AlgLabPage } from './pages/AlgLabPage.jsx';
import { AisdLabPage } from './pages/AisdLabPage.jsx';
import { PhysLabPage } from './pages/PhysLabPage.jsx';
import { GlossarySearchPage } from './pages/GlossarySearchPage.jsx';

export default function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('put-theme') === 'dark');
  const [mobileMenu, setMobileMenu] = useState(false);

  const [view, setView] = useState('home'); // 'home' | 'dashboard' | 'theory' | 'exam60' | 'flashcards' | 'quiz' | 'subnet' | 'mathlab' | 'problab' | 'alglab' | 'aisdlab' | 'physlab' | 'glossary'
  const [activeSubject, setActiveSubject] = useState('aisd');
  const [activeChapterId, setActiveChapterId] = useState('aisd-ch1');
  const [jumpExamNum, setJumpExamNum] = useState(null);
  const [quizChapter, setQuizChapter] = useState(null);
  const [fcChapter, setFcChapter] = useState('all');

  const [overview, setOverview] = useState(null);
  const [subjectData, setSubjectData] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  // Global search modal
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('put-theme', dark ? 'dark' : 'light');
  }, [dark]);

  const refreshData = async (subjOverride) => {
    const targetSubj = subjOverride || activeSubject;
    const [ov, subj] = await Promise.all([
      api.getOverview(),
      api.getSubject(targetSubj),
    ]);
    setOverview(ov);
    setSubjectData(subj);
  };

  useEffect(() => {
    refreshData(activeSubject).catch(() => {});
  }, [activeSubject]);

  // Ctrl+K search shortcut
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((v) => !v);
      } else if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!searchOpen || searchQuery.trim().length < 2) {
      setSearchResults(null);
      return;
    }
    const timer = setTimeout(() => {
      api.search(searchQuery.trim()).then(setSearchResults).catch(() => {});
    }, 180);
    return () => clearTimeout(timer);
  }, [searchOpen, searchQuery]);

  const switchSubject = (slug, nextView = 'dashboard', opts = {}) => {
    setActiveSubject(slug);
    setActiveChapterId(opts.chapterId || `${slug}-ch1`);
    setFcChapter('all');
    setQuizChapter(null);
    setJumpExamNum(opts.examNum ?? null);
    // Keep subject-specific tool views valid when switching courses
    const toolViews = ['subnet', 'mathlab', 'problab', 'alglab', 'aisdlab', 'physlab'];
    let resolvedView = nextView;
    if (toolViews.includes(resolvedView)) {
      if (slug === 'analiza') resolvedView = 'mathlab';
      else if (slug === 'probabilistyka') resolvedView = 'problab';
      else if (slug === 'algebra') resolvedView = 'alglab';
      else if (slug === 'aisd') resolvedView = 'aisdlab';
      else if (slug === 'fizyka') resolvedView = 'physlab';
      else resolvedView = 'subnet';
    }
    setView(resolvedView);
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigate = (nextView) => {
    if (nextView === 'theory' && !activeChapterId.startsWith(`${activeSubject}-`)) {
      setActiveChapterId(`${activeSubject}-ch1`);
    }
    setView(nextView);
    setMobileMenu(false);
    if (nextView !== 'quiz') setQuizChapter(null);
    if (nextView !== 'exam60') setJumpExamNum(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openChapter = (chId, subjectOverride) => {
    if (subjectOverride && subjectOverride !== activeSubject) {
      setActiveSubject(subjectOverride);
    } else if (chId.startsWith('analiza-') && activeSubject !== 'analiza') {
      setActiveSubject('analiza');
    } else if (chId.startsWith('probabilistyka-') && activeSubject !== 'probabilistyka') {
      setActiveSubject('probabilistyka');
    } else if (chId.startsWith('algebra-') && activeSubject !== 'algebra') {
      setActiveSubject('algebra');
    } else if (chId.startsWith('aisd-') && activeSubject !== 'aisd') {
      setActiveSubject('aisd');
    } else if (chId.startsWith('fizyka-') && activeSubject !== 'fizyka') {
      setActiveSubject('fizyka');
    } else if (chId.startsWith('sieci-') && activeSubject !== 'sieci') {
      setActiveSubject('sieci');
    }
    setActiveChapterId(chId);
    setView('theory');
    setMobileMenu(false);
  };

  const jumpToExamTopic = (num, subjectOverride) => {
    if (subjectOverride && subjectOverride !== activeSubject) {
      setActiveSubject(subjectOverride);
    }
    setJumpExamNum(num);
    setView('exam60');
    setMobileMenu(false);
  };

  const launchChapterQuiz = (chId) => {
    setQuizChapter(chId);
    setView('quiz');
    setMobileMenu(false);
  };

  const launchChapterFlashcards = (chId) => {
    setFcChapter(chId);
    setView('flashcards');
    setMobileMenu(false);
  };

  const handleExportBackup = async () => {
    const data = await api.getBackup();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `put-kompendium-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const isMath = activeSubject === 'analiza';
  const isProb = activeSubject === 'probabilistyka';
  const isAlg = activeSubject === 'algebra';
  const isAisd = activeSubject === 'aisd';
  const isPhys = activeSubject === 'fizyka';
  const readySubjects = (overview?.subjects || []).filter((s) => s.status === 'ready');

  const navItems = [
    { id: 'dashboard', label: 'Przegląd kursu', icon: LayoutGrid },
    {
      id: 'theory',
      label: 'Skrypt i rozdziały',
      icon: BookOpen,
      badge: subjectData
        ? `${subjectData.stats.chaptersDone}/${subjectData.stats.chaptersTotal}`
        : isPhys
          ? '5'
          : isProb || isAlg
            ? '6'
            : isAisd
              ? '8'
              : '9',
    },
    {
      id: 'exam60',
      label: isMath
        ? '30 Twierdzeń i zagadnień'
        : isProb
          ? '25 Twierdzeń i zagadnień'
          : isAlg
            ? '24 Zagadnienia i twierdzenia'
            : isAisd
              ? '28 Zagadnień na egzamin'
              : isPhys
                ? '20 Zagadnień (Wykład + Lab)'
                : '60 Zagadnień (Zaliczenie)',
      icon: GraduationCap,
      badge: subjectData
        ? `${subjectData.stats.topicsMastered}/${subjectData.stats.topicsTotal}`
        : isMath
          ? '30'
          : isProb
            ? '25'
            : isAlg
              ? '24'
              : isAisd
                ? '28'
                : isPhys
                  ? '20'
                  : '60',
    },
    {
      id: 'flashcards',
      label: isMath || isProb || isAlg || isPhys
        ? 'Fiszki ze wzorów (SM-2)'
        : isAisd
          ? 'Fiszki z algorytmów (SM-2)'
          : 'Fiszki (SM-2)',
      icon: Layers,
      badge: subjectData?.stats.flashcardsDue ?? '',
    },
    {
      id: 'quiz',
      label: 'Quizy i testy',
      icon: CheckSquare,
      badge: subjectData?.stats.quizzesTotal ?? '',
    },
    isMath
      ? { id: 'mathlab', label: 'Laboratorium wykresów', icon: LineChart }
      : isProb
        ? { id: 'problab', label: 'Laboratorium rozkładów', icon: BarChart3 }
        : isAlg
          ? { id: 'alglab', label: 'Laboratorium algebry', icon: Sigma }
          : isAisd
            ? { id: 'aisdlab', label: 'Laboratorium AiSD', icon: GitBranch }
            : isPhys
              ? { id: 'physlab', label: 'Laboratorium fizyki', icon: Atom }
              : { id: 'subnet', label: 'Trener podsieci IP', icon: Calculator },
    {
      id: 'glossary',
      label: isMath
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
      icon: BookMarked,
    },
  ];

  const SidebarContent = (
    <div className="flex flex-col h-full">
      {/* Masthead */}
      <div className="px-4 py-3.5 border-b border-[var(--border)]">
        <button
          onClick={() => navigate('home')}
          className="flex items-center gap-2.5 w-full text-left bg-transparent border-0 cursor-pointer p-0"
        >
          <div className="w-8 h-8 rounded bg-[var(--accent)] text-white dark:text-[#0f141c] flex items-center justify-center shrink-0">
            <Library className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="font-serif-heading font-bold text-[0.98rem] leading-tight tracking-tight truncate text-[var(--text)]">
              PUT Kompendium
            </div>
            <div className="text-[11px] font-mono text-[var(--text-muted)] truncate">MiKC · Semestr I</div>
          </div>
        </button>
      </div>

      {/* Home index */}
      <div className="px-3 pt-3">
        <button
          onClick={() => navigate('home')}
          className={`w-full flex items-center gap-2 px-2.5 py-2 rounded text-xs font-medium border-0 cursor-pointer transition-colors ${
            view === 'home'
              ? 'bg-[var(--accent-soft)] text-[var(--accent-text)] font-semibold'
              : 'bg-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)]'
          }`}
        >
          <Home className="w-3.5 h-3.5" /> Katalog przedmiotów
        </button>
      </div>

      {/* Subject Switcher + Navigation */}
      <div className="px-3 pt-4 pb-2 flex-1 overflow-y-auto space-y-5">
        {/* Compact Subject Selector */}
        <div>
          <div className="px-2.5 mb-1.5 text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
            Przedmiot
          </div>
          <div className="grid grid-cols-1 gap-1">
            {(readySubjects.length > 0
              ? readySubjects
              : [
                  { slug: 'aisd', short_title: 'AiSD' },
                  { slug: 'algebra', short_title: 'Algebra liniowa' },
                  { slug: 'analiza', short_title: 'Analiza matematyczna' },
                  { slug: 'fizyka', short_title: 'Fizyka' },
                  { slug: 'probabilistyka', short_title: 'Probabilistyka' },
                  { slug: 'sieci', short_title: 'Sieci komputerowe' },
                ]
            ).map((s) => {
              const selected = activeSubject === s.slug;
              return (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => switchSubject(s.slug, view === 'home' ? 'dashboard' : view)}
                  className={`w-full text-left px-2.5 py-2 rounded text-xs border transition-colors cursor-pointer flex items-center justify-between gap-2 ${
                    selected
                      ? 'bg-[var(--bg-subtle)] border-[var(--border-strong)] font-semibold text-[var(--text)]'
                      : 'bg-transparent border-transparent text-[var(--text-muted)] hover:bg-[var(--bg-subtle)]/60 hover:text-[var(--text)]'
                  }`}
                >
                  <span className="truncate">{s.short_title}</span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      selected ? 'bg-[var(--accent)]' : 'bg-transparent'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Nav */}
        <div>
          <div className="px-2.5 mb-1.5 text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
            Moduły nauki
          </div>
          <nav className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isAct = view === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded text-xs border-0 cursor-pointer transition-colors ${
                    isAct
                      ? 'bg-[var(--accent)] text-white dark:text-[#0f141c] font-semibold'
                      : 'bg-transparent text-[var(--text-secondary)] font-medium hover:bg-[var(--bg-subtle)]'
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </span>
                  {item.badge !== undefined && item.badge !== '' && (
                    <span
                      className={`text-[10px] font-mono tabular-nums shrink-0 ${
                        isAct ? 'opacity-85' : 'text-[var(--text-muted)]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Chapters Table of Contents */}
        {subjectData?.chapters?.length > 0 && (
          <div>
            <div className="px-2.5 mb-1.5 text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
              Spis rozdziałów
            </div>
            <div className="space-y-0.5">
              {subjectData.chapters.map((c) => {
                const isAct = view === 'theory' && activeChapterId === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => openChapter(c.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded text-[11.5px] flex items-center justify-between gap-1.5 border-0 cursor-pointer transition-colors ${
                      isAct
                        ? 'bg-[var(--accent-soft)] text-[var(--accent-text)] font-semibold'
                        : 'bg-transparent text-[var(--text-muted)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text)]'
                    }`}
                  >
                    <span className="truncate">
                      <span className="font-mono text-[10px] mr-1.5 opacity-70">
                        {String(c.order_index).padStart(2, '0')}
                      </span>
                      {c.title.replace(/^Rozdział \d+:\s*/, '')}
                    </span>
                    {c.completed && <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Minimal Footer */}
      <div className="px-3 py-2.5 border-t border-[var(--border)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
        <span>SQLite · 6/6 przedmiotów</span>
        <div className="flex items-center gap-1">
          <button
            onClick={handleExportBackup}
            className="p-1.5 rounded hover:bg-[var(--bg-subtle)] text-[var(--text-muted)] bg-transparent border-0 cursor-pointer"
            title="Eksportuj kopię zapasową postępów (JSON)"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDark((d) => !d)}
            className="p-1.5 rounded hover:bg-[var(--bg-subtle)] text-[var(--text-muted)] bg-transparent border-0 cursor-pointer"
            title="Przełącz tryb jasny / ciemny"
          >
            {dark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-[var(--bg)] text-[var(--text)]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-[264px] shrink-0 bg-[var(--bg-elevated)] border-r border-[var(--border)] sticky top-0 h-screen">
        {SidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileMenu && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="w-[264px] bg-[var(--bg-elevated)] h-full shadow-2xl border-r border-[var(--border)]">
            {SidebarContent}
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setMobileMenu(false)} />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-13 bg-[var(--bg-elevated)]/95 backdrop-blur border-b border-[var(--border)] px-4 sm:px-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setMobileMenu(true)}
              className="lg:hidden p-1.5 rounded hover:bg-[var(--bg-subtle)] bg-transparent border-0 cursor-pointer text-[var(--text)]"
              aria-label="Otwórz menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--border-strong)] text-xs text-[var(--text-muted)] cursor-pointer w-56 sm:w-80 transition-colors"
            >
              <Search className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate flex-1 text-left">Szukaj we wszystkich 6 przedmiotach (AiSD, fizyka, analiza...)</span>
              <kbd className="hidden sm:inline px-1.5 py-0.5 rounded bg-[var(--bg-elevated)] border border-[var(--border)] text-[10px] font-mono">
                Ctrl+K
              </kbd>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('exam60')}
              className="hidden sm:inline-flex btn-secondary !py-1.5 !px-3 text-xs"
            >
              <GraduationCap className="w-3.5 h-3.5 text-[var(--accent)]" />
              {isMath
                ? '30 Twierdzeń'
                : isProb
                  ? '25 Zagadnień'
                  : isAlg
                    ? '24 Zagadnienia'
                    : isAisd
                      ? '28 Zagadnień'
                      : isPhys
                        ? '20 Zagadnień'
                        : '60 Zagadnień'}
            </button>
            {isMath ? (
              <button
                onClick={() => navigate('mathlab')}
                className="hidden md:inline-flex btn-secondary !py-1.5 !px-3 text-xs"
              >
                <LineChart className="w-3.5 h-3.5 text-[var(--crimson)]" /> Wykresy
              </button>
            ) : isProb ? (
              <button
                onClick={() => navigate('problab')}
                className="hidden md:inline-flex btn-secondary !py-1.5 !px-3 text-xs"
              >
                <BarChart3 className="w-3.5 h-3.5 text-[var(--accent)]" /> Rozkłady / Bayes
              </button>
            ) : isAlg ? (
              <button
                onClick={() => navigate('alglab')}
                className="hidden md:inline-flex btn-secondary !py-1.5 !px-3 text-xs"
              >
                <Sigma className="w-3.5 h-3.5 text-[var(--accent)]" /> Macierze / ℂ
              </button>
            ) : isAisd ? (
              <button
                onClick={() => navigate('aisdlab')}
                className="hidden md:inline-flex btn-secondary !py-1.5 !px-3 text-xs"
              >
                <GitBranch className="w-3.5 h-3.5 text-[var(--accent)]" /> Laboratorium AiSD
              </button>
            ) : isPhys ? (
              <button
                onClick={() => navigate('physlab')}
                className="hidden md:inline-flex btn-secondary !py-1.5 !px-3 text-xs"
              >
                <Atom className="w-3.5 h-3.5 text-[var(--accent)]" /> Lab fizyki
              </button>
            ) : (
              <button
                onClick={() => navigate('subnet')}
                className="hidden md:inline-flex btn-secondary !py-1.5 !px-3 text-xs"
              >
                <Calculator className="w-3.5 h-3.5 text-[var(--warning)]" /> Trener IP
              </button>
            )}
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto">
          {view === 'home' && (
            <HomePage
              overview={overview}
              onSelectSubject={(slug, nextView) => switchSubject(slug, nextView || 'dashboard')}
            />
          )}

          {view === 'dashboard' && (
            <SubjectDashboard
              subjectData={subjectData}
              onOpenChapter={openChapter}
              onNavigate={navigate}
            />
          )}

          {view === 'theory' && (
            <TheoryPage
              chapterId={activeChapterId}
              onSelectChapter={openChapter}
              onOpenImage={setLightboxImage}
              onJumpToExamTopic={jumpToExamTopic}
              onLaunchQuiz={launchChapterQuiz}
              onLaunchFlashcards={launchChapterFlashcards}
              onProgressChanged={() => refreshData(activeSubject)}
            />
          )}

          {view === 'exam60' && (
            <ExamTopicsPage
              subjectSlug={activeSubject}
              initialTopicNum={jumpExamNum}
              onOpenChapter={openChapter}
              onOpenImage={setLightboxImage}
              onOpenSubnetTrainer={() =>
                navigate(
                  isMath
                    ? 'mathlab'
                    : isProb
                      ? 'problab'
                      : isAlg
                        ? 'alglab'
                        : isAisd
                          ? 'aisdlab'
                          : isPhys
                            ? 'physlab'
                            : 'subnet'
                )
              }
              onProgressChanged={() => refreshData(activeSubject)}
            />
          )}

          {view === 'flashcards' && (
            <FlashcardsPage
              subjectSlug={activeSubject}
              subjectTitle={subjectData?.short_title}
              chapters={subjectData?.chapters || []}
              initialChapter={fcChapter}
              onJumpToExamTopic={jumpToExamTopic}
              onProgressChanged={() => refreshData(activeSubject)}
            />
          )}

          {view === 'quiz' && (
            <QuizTestPage
              subjectSlug={activeSubject}
              subjectTitle={subjectData?.short_title}
              chapters={subjectData?.chapters || []}
              initialChapter={quizChapter}
              onOpenImage={setLightboxImage}
              onJumpToExamTopic={jumpToExamTopic}
              onProgressChanged={() => refreshData(activeSubject)}
            />
          )}

          {view === 'subnet' && <SubnetTrainerPage onProgressChanged={() => refreshData('sieci')} />}

          {view === 'mathlab' && <MathLabPage />}

          {view === 'problab' && <ProbLabPage />}

          {view === 'alglab' && <AlgLabPage />}

          {view === 'aisdlab' && <AisdLabPage />}

          {view === 'physlab' && <PhysLabPage />}

          {view === 'glossary' && (
            <GlossarySearchPage subjectSlug={activeSubject} onOpenChapter={openChapter} />
          )}
        </main>
      </div>

      {/* Global Search Modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/55 flex items-start justify-center pt-16 p-4"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="card max-w-2xl w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2.5 px-4 py-3 border-b border-[var(--border)]">
              <Search className="w-4 h-4 text-[var(--accent)]" />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="np. Stokes, Hooke, Heapsort, AVL, Cramer, Bayes, Taylor, OSPF..."
                className="flex-1 bg-transparent border-0 outline-none text-sm text-[var(--text)]"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded hover:bg-[var(--bg-subtle)] bg-transparent border-0 cursor-pointer text-[var(--text-muted)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-[65vh] overflow-y-auto p-4 space-y-4">
              {!searchResults ? (
                <div className="text-xs text-[var(--text-muted)] text-center py-6">
                  Wpisz min. 2 znaki, aby przeszukać wszystkie przedmioty: teorię, zagadnienia, tablice wzorów i fiszki.
                </div>
              ) : (
                <>
                  {searchResults.topics?.length > 0 && (
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                        Zagadnienia egzaminacyjne ({searchResults.topics.length})
                      </div>
                      <div className="space-y-1">
                        {searchResults.topics.map((t) => (
                          <button
                            key={t.id}
                            onClick={() => {
                              setSearchOpen(false);
                              jumpToExamTopic(t.number, t.subject_id);
                            }}
                            className="w-full text-left p-2.5 rounded hover:bg-[var(--bg-subtle)] border-0 bg-transparent cursor-pointer text-xs"
                          >
                            <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] text-[var(--text-muted)] mr-2">
                              {t.subject_id}
                            </span>
                            <span className="font-mono font-semibold text-[var(--accent-text)] mr-1.5">
                              #{t.number}
                            </span>
                            <span className="font-medium text-[var(--text)]">
                              <FormattedText text={t.question} />
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {searchResults.chapters?.length > 0 && (
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                        Rozdziały teorii ({searchResults.chapters.length})
                      </div>
                      <div className="space-y-1">
                        {searchResults.chapters.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => {
                              setSearchOpen(false);
                              openChapter(c.id, c.subject_id);
                            }}
                            className="w-full text-left p-2.5 rounded hover:bg-[var(--bg-subtle)] border-0 bg-transparent cursor-pointer text-xs"
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] text-[var(--text-muted)]">
                                {c.subject_id}
                              </span>
                              <span className="font-semibold text-[var(--text)]">{c.title}</span>
                            </div>
                            <div className="text-[var(--text-muted)] truncate mt-0.5">{c.subtitle}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {searchResults.glossary?.length > 0 && (
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                        Słownik i tablice wzorów ({searchResults.glossary.length})
                      </div>
                      <div className="space-y-1">
                        {searchResults.glossary.map((g) => (
                          <button
                            key={g.id}
                            onClick={() => {
                              setSearchOpen(false);
                              switchSubject(g.subject_id, 'glossary');
                            }}
                            className="w-full text-left p-2.5 rounded hover:bg-[var(--bg-subtle)] border-0 bg-transparent cursor-pointer text-xs"
                          >
                            <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] text-[var(--text-muted)] mr-2">
                              {g.subject_id}
                            </span>
                            <span className="font-semibold text-[var(--accent-text)] mr-2">
                              <FormattedText text={g.term} />
                            </span>
                            <span className="text-[var(--text-secondary)]">
                              <FormattedText text={g.definition.slice(0, 110) + '...'} />
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {searchResults.topics?.length === 0 &&
                    searchResults.chapters?.length === 0 &&
                    searchResults.glossary?.length === 0 && (
                      <div className="text-xs text-[var(--text-muted)] text-center py-6">
                        Brak wyników dla „{searchResults.query}”.
                      </div>
                    )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Slide Image Lightbox */}
      <ImageLightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </div>
  );
}
