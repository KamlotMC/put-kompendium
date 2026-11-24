import React, { useEffect, useMemo, useState } from 'react';
import { Search, Star, BookOpen } from 'lucide-react';
import { api } from '../api/client.js';
import { FormattedText } from '../components/RichContent.jsx';

export function GlossarySearchPage({ subjectSlug = 'sieci', onOpenChapter }) {
  const isMath = subjectSlug === 'analiza';
  const isProb = subjectSlug === 'probabilistyka';
  const isAlg = subjectSlug === 'algebra';
  const isAisd = subjectSlug === 'aisd';
  const isPhys = subjectSlug === 'fizyka';
  const [terms, setTerms] = useState([]);
  const [query, setQuery] = useState('');
  const [onlyRequired, setOnlyRequired] = useState(false);

  useEffect(() => {
    setQuery('');
    setOnlyRequired(false);
    api.getGlossary(subjectSlug).then(setTerms).catch(() => {});
  }, [subjectSlug]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return terms.filter((t) => {
      if (onlyRequired && !t.is_required_exam) return false;
      if (!q) return true;
      return (
        t.term.toLowerCase().includes(q) ||
        t.full_name.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    });
  }, [terms, query, onlyRequired]);

  const requiredCount = terms.filter((t) => t.is_required_exam).length;

  return (
    <div className="space-y-6">
      <header className="pb-4 border-b border-[var(--border)]">
        <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">
          {isMath
            ? 'Analiza matematyczna · Tablice wzorów i pojęć'
            : isProb
              ? 'Probabilistyka · Tablice rozkładów, momentów i definicji'
              : isAlg
                ? 'Algebra liniowa dla ICT · Tablice ℂ, macierzy, wyznaczników i widma'
                : isAisd
                  ? 'Algorytmy i struktury danych · Tablice złożoności i definicji (W1–W6)'
                  : isPhys
                    ? 'Fizyka · Tablice mechaniki i niepewności (W1–W3 + Lab)'
                    : 'wymagane_pojecia_M.pdf + pełny słownik kursu'}
        </div>
        <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold m-0">
          {isMath
            ? 'Tablice wzorów, twierdzeń i słownik analizy'
            : isProb
              ? 'Tablice rozkładów, wzorów i słownik probabilistyki'
              : isAlg
                ? 'Tablice wzorów i słownik algebry liniowej'
                : isAisd
                  ? 'Tablice złożoności i słownik AiSD'
                  : isPhys
                    ? 'Tablice fizyczne i słownik mechaniki'
                    : 'Wymagane pojęcia na test i słownik skrótów'}
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1.5 mb-0 max-w-2xl">
          {isMath
            ? `Szybka ściągawka pochodnych i całek elementarnych oraz ${terms.length} zdefiniowanych pojęć i twierdzeń z przykładami (w tym ${requiredCount} najważniejszych wzorów egzaminacyjnych).`
            : isProb
              ? `Kompaktowa tabela 6 rozkładów dyskretnych z wykładu 05 oraz ${terms.length} zdefiniowanych wzorów i pojęć (w tym ${requiredCount} kluczowych wzorów na egzamin).`
              : isAlg
                ? `Zbiorcza tablica wzorów (liczby zespolone, macierze, wyznaczniki, układy Cramera, wektory własne) oraz ${terms.length} haseł ze wszystkich 4 wykładów (w tym ${requiredCount} kluczowych na zaliczenie).`
                : isAisd
                  ? `Kompaktowa tablica złożoności wszystkich algorytmów sortowania i struktur danych oraz ${terms.length} pojęć ze wszystkich 6 wykładów (w tym ${requiredCount} kluczowych egzaminacyjnie).`
                  : isPhys
                    ? `Zbiorcza tablica wzorów wektorowych, kinematyki, dynamiki, zderzeń i niepewności pomiarowych (Student–Fisher, Stokes, Andrade) oraz ${terms.length} pojęć (w tym ${requiredCount} kluczowych egzaminacyjnie).`
                    : `Obejmuje komplet ${requiredCount} pojęć wyraźnie wskazanych jako obowiązkowe na teście zaliczeniowym (Intranet, Ekstranet, URL, Proxy, NAT, PAT, DNS, WWW, DHCP, ICMP, ARP, ping, ipconfig) oraz kluczowe skróty ze wszystkich 9 wykładów.`}
        </p>
      </header>

      {/* Filters */}
      <div className="card p-3.5 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              isMath
                ? 'Szukaj wzoru lub twierdzenia (np. Taylor, Darboux, Euler, Riemann, arctg)...'
                : isProb
                  ? 'Szukaj wzoru lub rozkładu (np. Bayes, Poisson, Czebyszew, Pascal, hipergeometryczny)...'
                  : isAlg
                    ? 'Szukaj hasła lub wzoru (np. Moivre, Euler, Sarrus, Laplace, Cramer, własne)...'
                    : isAisd
                      ? 'Szukaj algorytmu lub pojęcia (np. Heapsort, AVL, Knuth, RAM, bisekcja, MRS)...'
                      : isPhys
                        ? 'Szukaj prawa lub wielkości (np. Stokes, Hooke, Newton, Coriolis, Student-Fisher, Andrade)...'
                        : 'Szukaj pojęcia lub skrótu (np. PAT, DHCP, LACP, WDM, TTL, DMZ)...'
            }
            className="input-field !pl-9 text-sm"
          />
        </div>
        <button
          onClick={() => setOnlyRequired((v) => !v)}
          className={`px-3.5 py-2 rounded text-xs font-medium border inline-flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors ${
            onlyRequired
              ? 'bg-[var(--warning-soft)] text-[var(--warning)] border-[var(--warning)]'
              : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-strong)] hover:bg-[var(--bg-subtle)]'
          }`}
        >
          <Star className="w-3.5 h-3.5" />
          {isMath || isProb || isAlg || isAisd || isPhys
            ? `Tylko kluczowe pojęcia (${requiredCount})`
            : `Tylko ${requiredCount} obowiązkowych na test`}
        </button>
      </div>

      {/* Subject-Specific Quick Reference Tables */}
      {isMath ? (
        <section className="card p-5 space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] m-0">
            Kompaktowa tablica pochodnych i całek elementarnych
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs sm:text-[0.84rem]">
            <div className="card-subtle p-4 space-y-1.5">
              <div className="font-serif-heading font-bold text-sm text-[var(--text)] mb-2 pb-1.5 border-b border-[var(--border)]">
                Pochodne elementarne
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-3 text-[var(--text-secondary)]">
                <FormattedText text="$(x^\alpha)' = \alpha x^{\alpha-1}$" />
                <FormattedText text="$(e^x)' = e^x, \; (a^x)' = a^x\ln a$" />
                <FormattedText text="$(\ln x)' = \frac{1}{x}$" />
                <FormattedText text="$(\log_a x)' = \frac{1}{x\ln a}$" />
                <FormattedText text="$(\sin x)' = \cos x$" />
                <FormattedText text="$(\cos x)' = -\sin x$" />
                <FormattedText text="$(\operatorname{tg} x)' = \frac{1}{\cos^2 x}$" />
                <FormattedText text="$(\operatorname{ctg} x)' = -\frac{1}{\sin^2 x}$" />
                <FormattedText text="$(\arcsin x)' = \frac{1}{\sqrt{1-x^2}}$" />
                <FormattedText text="$(\arccos x)' = -\frac{1}{\sqrt{1-x^2}}$" />
                <FormattedText text="$(\operatorname{arctg} x)' = \frac{1}{1+x^2}$" />
                <FormattedText text="$(\operatorname{arcctg} x)' = -\frac{1}{1+x^2}$" />
              </div>
            </div>
            <div className="card-subtle p-4 space-y-1.5">
              <div className="font-serif-heading font-bold text-sm text-[var(--text)] mb-2 pb-1.5 border-b border-[var(--border)]">
                Całki podstawowe (+ C)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-3 text-[var(--text-secondary)]">
                <FormattedText text="$\int x^\alpha dx = \frac{x^{\alpha+1}}{\alpha+1}$" />
                <FormattedText text="$\int \frac{dx}{x} = \ln|x|$" />
                <FormattedText text="$\int a^x dx = \frac{a^x}{\ln a}$" />
                <FormattedText text="$\int \frac{g'(x)}{g(x)}dx = \ln|g(x)|$" />
                <FormattedText text="$\int \sin x\,dx = -\cos x$" />
                <FormattedText text="$\int \cos x\,dx = \sin x$" />
                <FormattedText text="$\int \operatorname{tg} x\,dx = -\ln|\cos x|$" />
                <FormattedText text="$\int \frac{dx}{\cos^2 x} = \operatorname{tg} x$" />
                <FormattedText text="$\int \frac{dx}{x^2+a^2} = \frac{1}{a}\operatorname{arctg}\frac{x}{a}$" />
                <FormattedText text="$\int \frac{dx}{x^2-a^2} = \frac{1}{2a}\ln\left|\frac{x-a}{x+a}\right|$" />
                <FormattedText text="$\int \frac{dx}{\sqrt{a^2-x^2}} = \arcsin\frac{x}{a}$" />
                <FormattedText text="$\int \frac{dx}{\sqrt{x^2+k}} = \ln|x+\sqrt{x^2+k}|$" />
              </div>
            </div>
          </div>
        </section>
      ) : isProb ? (
        <section className="card p-5 space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] m-0">
            Kompaktowa tablica 6 rozkładów dyskretnych (Wykład 05)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-[0.82rem] border-collapse">
              <thead>
                <tr className="border-b border-[var(--border-strong)] text-left font-mono text-[11px] uppercase text-[var(--text-muted)]">
                  <th className="py-2 pr-3">Rozkład</th>
                  <th className="py-2 px-3">
                    Funkcja prawdopodobieństwa <FormattedText text="$P(X=x)$" />
                  </th>
                  <th className="py-2 px-3"><FormattedText text="$E(X)$" /></th>
                  <th className="py-2 px-3"><FormattedText text="$D(X)$" /></th>
                  <th className="py-2 pl-3">Model / zastosowanie</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)] text-[var(--text-secondary)]">
                <tr>
                  <td className="py-2.5 pr-3 font-semibold text-[var(--text)]">Zero-jedynkowy</td>
                  <td className="py-2.5 px-3">
                    <FormattedText text="$p^x(1-p)^{1-x},\; x\in\{0,1\}$" />
                  </td>
                  <td className="py-2.5 px-3"><FormattedText text="$p$" /></td>
                  <td className="py-2.5 px-3"><FormattedText text="$p(1-p)$" /></td>
                  <td className="py-2.5 pl-3">Pojedyncza próba Bernoulliego (sukces / porażka)</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-3 font-semibold text-[var(--text)]">Dwumianowy</td>
                  <td className="py-2.5 px-3">
                    <FormattedText text="$\binom{n}{x}p^x(1-p)^{n-x},\; x=0,\dots,n$" />
                  </td>
                  <td className="py-2.5 px-3"><FormattedText text="$np$" /></td>
                  <td className="py-2.5 px-3"><FormattedText text="$np(1-p)$" /></td>
                  <td className="py-2.5 pl-3">
                    <FormattedText text="Liczba sukcesów w $n$ niezależnych próbach (ze zwracaniem)" />
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-3 font-semibold text-[var(--text)]">Poissona</td>
                  <td className="py-2.5 px-3">
                    <FormattedText text="$\frac{\lambda^x}{x!}e^{-\lambda},\; x=0,1,2,\dots$" />
                  </td>
                  <td className="py-2.5 px-3"><FormattedText text="$\lambda$" /></td>
                  <td className="py-2.5 px-3"><FormattedText text="$\lambda$" /></td>
                  <td className="py-2.5 pl-3">
                    <FormattedText text="Zdarzenia rzadkie ($n\to\infty,\, p\to 0,\, np=\lambda$); zgłoszenia w sieci" />
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-3 font-semibold text-[var(--text)]">Geometryczny</td>
                  <td className="py-2.5 px-3">
                    <FormattedText text="$(1-p)^{x-1}p,\; x=1,2,\dots$" />
                  </td>
                  <td className="py-2.5 px-3"><FormattedText text="$\frac{1}{p}$" /></td>
                  <td className="py-2.5 px-3"><FormattedText text="$\frac{1-p}{p^2}$" /></td>
                  <td className="py-2.5 pl-3">Numer próby z 1. sukcesem; własność braku pamięci</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-3 font-semibold text-[var(--text)]">Pascala</td>
                  <td className="py-2.5 px-3">
                    <FormattedText text="$\binom{x-1}{n-1}p^n(1-p)^{x-n},\; x=n,n+1,\dots$" />
                  </td>
                  <td className="py-2.5 px-3"><FormattedText text="$\frac{n}{p}$" /></td>
                  <td className="py-2.5 px-3"><FormattedText text="$\frac{n(1-p)}{p^2}$" /></td>
                  <td className="py-2.5 pl-3">
                    <FormattedText text="Numer próby z $n$-tym sukcesem (uwaga na kwadrat $p^2$ w $D(X)$!)" />
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-3 font-semibold text-[var(--text)]">Hipergeometryczny</td>
                  <td className="py-2.5 px-3">
                    <FormattedText text="$\frac{\binom{M}{x}\binom{N-M}{n-x}}{\binom{N}{n}}$" />
                  </td>
                  <td className="py-2.5 px-3"><FormattedText text="$n\frac{M}{N}$" /></td>
                  <td className="py-2.5 px-3">
                    <FormattedText text="$n\frac{M}{N}\left(1-\frac{M}{N}\right)\frac{N-n}{N-1}$" />
                  </td>
                  <td className="py-2.5 pl-3">
                    <FormattedText text="Losowanie bez zwracania (kontrola jakości partii $N$ sztuk)" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      ) : isAlg ? (
        <section className="card p-5 space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] m-0">
            Ściągawka algebry liniowej (Wykłady 01–04)
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs sm:text-[0.83rem]">
            <div className="card-subtle p-4 space-y-1.5">
              <div className="font-serif-heading font-bold text-sm text-[var(--text)] mb-2 pb-1.5 border-b border-[var(--border)]">
                Liczby zespolone (konwencja ICT: j² = −1)
              </div>
              <div className="space-y-1.5 text-[var(--text-secondary)]">
                <div><FormattedText text="$z = x + jy = r(\cos\varphi + j\sin\varphi) = re^{j\varphi},\quad |z|^2 = z\bar{z}$" /></div>
                <div><FormattedText text="$z^{-1} = \frac{x-jy}{x^2+y^2},\qquad z^n = r^n e^{jn\varphi}\text{ (de Moivre)}$" /></div>
                <div><FormattedText text="$t_k = \sqrt[n]{r}\,e^{j\frac{\varphi+2k\pi}{n}},\quad k=0,1,\dots,n-1$" /></div>
              </div>
            </div>
            <div className="card-subtle p-4 space-y-1.5">
              <div className="font-serif-heading font-bold text-sm text-[var(--text)] mb-2 pb-1.5 border-b border-[var(--border)]">
                Macierze, wyznaczniki, układy i wektory własne
              </div>
              <div className="space-y-1.5 text-[var(--text-secondary)]">
                <div><FormattedText text="$(AB)^T = B^T A^T,\qquad (AB)^{-1} = B^{-1}A^{-1}$" /></div>
                <div><FormattedText text="$\det(AB)=\det A\det B,\quad \det(\alpha A)=\alpha^n\det A,\quad A^{-1}=\frac{1}{\det A}[A_{ij}]^T$" /></div>
                <div><FormattedText text="$\chi_A(\lambda)=\det(A-\lambda I)=0,\quad \sum\lambda_i = \operatorname{tr} A,\quad \prod\lambda_i = \det A$" /></div>
              </div>
            </div>
          </div>
        </section>
      ) : isAisd ? (
        <section className="card p-5 space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] m-0">
            Kompaktowa tablica złożoności sortowania i struktur danych (Wykłady W3–W6)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-[0.82rem] border-collapse font-mono">
              <thead>
                <tr className="border-b border-[var(--border-strong)] text-left text-[11px] uppercase text-[var(--text-muted)]">
                  <th className="py-2 pr-3 font-sans">Algorytm sortowania</th>
                  <th className="py-2 px-3">Optymist.</th>
                  <th className="py-2 px-3">Średnia</th>
                  <th className="py-2 px-3">Pesymist.</th>
                  <th className="py-2 px-3">Pamięć</th>
                  <th className="py-2 pl-3 font-sans">Stabilny?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)] text-[var(--text-secondary)]">
                {[
                  ['Selection Sort', 'Θ(n²)', 'Θ(n²)', 'Θ(n²)', 'O(1)', 'Nie (≤ n−1 zamian)'],
                  ['Insertion Sort', 'Θ(n)', 'Θ(n²)', 'Θ(n²)', 'O(1)', 'Tak (adaptacyjny)'],
                  ['Bubble Sort (z flagą)', 'Θ(n)', 'Θ(n²)', 'Θ(n²)', 'O(1)', 'Tak (bez flagi Θ(n²))'],
                  ['Shell Sort', 'O(n log n)', '~O(n¹·²⁵–n¹·⁵)', 'O(n²)*', 'O(1)', 'Nie (*zależne od h_k)'],
                  ['Merge Sort', 'Θ(n log n)', 'Θ(n log n)', 'Θ(n log n)', 'O(n)', 'Tak (warunek <=)'],
                  ['Quicksort', 'Θ(n log n)', 'Θ(n log n)', 'Θ(n²)', 'O(log n)', 'Nie (losowy pivot!)'],
                  ['Heapsort', 'Θ(n log n)', 'Θ(n log n)', 'Θ(n log n)', 'O(1)', 'Nie (kopiec 1..n)'],
                ].map((row) => (
                  <tr key={row[0]}>
                    <td className="py-2 pr-3 font-sans font-semibold text-[var(--text)]">{row[0]}</td>
                    <td className="py-2 px-3">{row[1]}</td>
                    <td className="py-2 px-3">{row[2]}</td>
                    <td className="py-2 px-3">{row[3]}</td>
                    <td className="py-2 px-3">{row[4]}</td>
                    <td className="py-2 pl-3 font-sans">{row[5]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono text-[var(--text-secondary)]">
            <div className="card-subtle p-3 space-y-1">
              <div className="font-sans font-bold text-[var(--text)] mb-1">Struktury danych — dostęp / szukanie / wstawianie</div>
              <div>Tablica: dostęp <strong>O(1)</strong> · szukanie O(n) / binarne <strong>O(log n)</strong> · środek O(n)</div>
              <div>Lista SLL/DLL: dostęp O(n) · wstaw./usuń przy wskaźniku <strong>O(1)</strong></div>
              <div>Tablica haszująca: śr. <strong>O(1)</strong> · pesym. O(n) · otwarte ≤ 1/(1−α)</div>
              <div>BST vs AVL: BST śr. O(log n) / pesym. O(n) · AVL zawsze <strong>O(log n)</strong></div>
            </div>
            <div className="card-subtle p-3 space-y-1">
              <div className="font-sans font-bold text-[var(--text)] mb-1">Metody numeryczne (Wykład 6) — rzędy zbieżności</div>
              <div>Bisekcja &amp; Złoty podział (α ≈ 0,618034): liniowa <strong>p = 1</strong></div>
              <div>Metoda siecznych: nadliniowa <strong>p ≈ 1,618</strong> (bez f′)</div>
              <div>Heron √S &amp; Newton–Raphson: kwadratowa <strong>p = 2</strong></div>
              <div>MRS: przedni/wsteczny <strong>O(h)</strong> · centralny f′ i f″ <strong>O(h²)</strong></div>
            </div>
          </div>
        </section>
      ) : isPhys ? (
        <section className="card p-5 space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] m-0">
            Tablica wzorów mechaniki i niepewności pomiarowych (W1–W3 + Laboratorium)
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs sm:text-[0.83rem]">
            <div className="card-subtle p-4 space-y-1.5">
              <div className="font-serif-heading font-bold text-sm text-[var(--text)] mb-2 pb-1.5 border-b border-[var(--border)]">
                Wektory, kinematyka i dynamika (W1–W3)
              </div>
              <div className="space-y-1.5 text-[var(--text-secondary)]">
                <div><FormattedText text="$\vec{A}\cdot\vec{B}=AB\cos\theta,\qquad |\vec{A}\times\vec{B}|=AB\sin\theta$" /></div>
                <div><FormattedText text="$a_d=\frac{v^2}{R}=\omega^2 R,\quad a_s=\frac{dv}{dt}=\varepsilon R,\quad a=\sqrt{a_d^2+a_s^2}$" /></div>
                <div><FormattedText text="$Z=\frac{v_0^2\sin(2\alpha)}{g},\quad H_{\max}=\frac{v_0^2\sin^2\alpha}{2g},\quad \vec{F}=\frac{d\vec{p}}{dt}$" /></div>
                <div><FormattedText text="$T_{\max}=\mu_s N,\quad F_s=-kx,\quad v_1'=\frac{(m_1-m_2)v_1+2m_2 v_2}{m_1+m_2}$" /></div>
              </div>
            </div>
            <div className="card-subtle p-4 space-y-1.5">
              <div className="font-serif-heading font-bold text-sm text-[var(--text)] mb-2 pb-1.5 border-b border-[var(--border)]">
                Niepewności pomiarowe, Stokes i Andrade (Lab)
              </div>
              <div className="space-y-1.5 text-[var(--text-secondary)]">
                <div><FormattedText text="$u_A(\bar{x})=\sqrt{\frac{\sum(x_i-\bar{x})^2}{n(n-1)}},\qquad U_A = t_{n-1;\alpha}\,u_A(\bar{x})$" /></div>
                <div><FormattedText text="$u_B = \frac{\Delta_d}{\sqrt{3}},\qquad u_c=\sqrt{u_A^2+u_B^2},\qquad \frac{\Delta y}{y}=\sum\left|\frac{\partial\ln y}{\partial x_i}\right|\Delta x_i$" /></div>
                <div><FormattedText text="$\eta = \frac{2(\rho_k-\rho_c)g r^2}{9v},\qquad \eta(T)=A\,e^{E_a/(RT)}\;\Rightarrow\;\ln\eta=\ln A+\frac{E_a}{R}\frac{1}{T}$" /></div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="card p-5 space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] m-0">
            Ściągawka portów TCP/UDP i standardów IEEE / PN-EN
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="card-subtle p-3.5 space-y-1.5">
              <div className="font-semibold text-[var(--text)] mb-1">Dobrze znane porty TCP / UDP</div>
              <div className="grid grid-cols-2 gap-1 font-mono text-[var(--text-secondary)]">
                <span><strong>21</strong> TCP — FTP</span>
                <span><strong>53</strong> UDP/TCP — DNS</span>
                <span><strong>22</strong> TCP — SSH</span>
                <span><strong>67/68</strong> UDP — DHCP</span>
                <span><strong>23</strong> TCP — Telnet</span>
                <span><strong>69</strong> UDP — TFTP</span>
                <span><strong>25</strong> TCP — SMTP</span>
                <span><strong>111</strong> UDP — RPC</span>
                <span><strong>80</strong> TCP — HTTP</span>
                <span><strong>161</strong> UDP — SNMP</span>
                <span><strong>443</strong> TCP — HTTPS</span>
                <span><strong>1/6/17/89</strong> — ICMP/TCP/UDP/OSPF</span>
              </div>
            </div>
            <div className="card-subtle p-3.5 space-y-1.5">
              <div className="font-semibold text-[var(--text)] mb-1">Kluczowe standardy IEEE / ISO / EN</div>
              <div className="grid grid-cols-1 gap-1 font-mono text-[var(--text-secondary)]">
                <span><strong>ISO 7498 / X.200</strong> — Model OSI (7 warstw)</span>
                <span><strong>IEEE 802.2</strong> LLC · <strong>802.3</strong> Ethernet · <strong>802.5</strong> Token Ring · <strong>802.11</strong> Wi-Fi</span>
                <span><strong>IEEE 802.1D</strong> STP · <strong>802.1Q</strong> VLAN · <strong>802.1p</strong> Priorytet · <strong>802.1AX</strong> LACP</span>
                <span><strong>PN-EN 50173 / ISO 11801</strong> — Okablowanie strukturalne (90+5+5 m)</span>
                <span><strong>PN-EN 50310</strong> — Uziemienia · <strong>PN-EN 50346</strong> — Testowanie</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filtered.map((t) => (
          <article
            key={t.id}
            className="card p-4 flex flex-col justify-between"
            style={t.is_required_exam ? { borderLeft: '3px solid var(--warning)' } : {}}
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="min-w-0">
                  <h3 className="font-serif-heading text-base font-bold m-0 text-[var(--text)]">
                    <FormattedText text={t.term} />
                  </h3>
                  {t.full_name && (
                    <div className="text-xs text-[var(--text-muted)] mt-0.5">
                      <FormattedText text={t.full_name} />
                    </div>
                  )}
                </div>
                {t.is_required_exam ? (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--warning-soft)] text-[var(--warning)] shrink-0 inline-flex items-center gap-1">
                    <Star className="w-3 h-3" /> Kluczowe
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--bg-subtle)] text-[var(--text-muted)] shrink-0">
                    {t.category}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mt-2 mb-0">
                <FormattedText text={t.definition} />
              </p>
              {t.example && (
                <div className="mt-2.5 text-xs text-[var(--text-secondary)] bg-[var(--bg-subtle)] px-3 py-2 rounded border border-[var(--border)]">
                  <strong className="text-[var(--text)]">Przykład:</strong> <FormattedText text={t.example} />
                </div>
              )}
            </div>
            {t.chapter_id && (
              <div className="mt-3 pt-2.5 border-t border-[var(--border)] flex justify-end">
                <button
                  onClick={() => onOpenChapter(t.chapter_id)}
                  className="text-xs font-medium text-[var(--accent-text)] inline-flex items-center gap-1 bg-transparent border-0 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" /> Zobacz w rozdziale
                </button>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
