// Algorytmy i struktury danych — Rozdziały 1–4
// Źródło: Wykłady prowadzącego (Instytut Radiokomunikacji / Teleinformatyki, PUT):
// Wyklad 1.pdf, Wyklad 2.pdf, Wyklad 3.pdf, Wyklad 4.pdf

export const AISD_CHAPTERS_1_4 = [
  {
    id: 'aisd-ch1',
    subject_id: 'aisd',
    order_index: 1,
    slug: 'wprowadzenie-pseudokod-petle',
    title: 'Rozdział 1: Podstawy algorytmów, pseudokod, schematy blokowe, decyzje i pętle',
    subtitle: 'Wykłady 1–2: 5 cech algorytmu, paradygmaty, instrukcje warunkowe, pętle FOR/WHILE, BREAK, flagi i CONTINUE',
    lecture_ref: 'Wykład 1–2 · slajdy 1–33 i 1–26',
    estimated_minutes: 40,
    summary:
      'Definicja i pięć formalnych cech algorytmu, cztery sposoby zapisu (opis słowny, pseudokod, schemat blokowy z 5 rodzajami bloków, Python), paradygmaty projektowania, logika warunków i zagnieżdżanie decyzji (przykład klasyfikacji trójkątów i zamiana dwóch zmiennych przez zmienną pomocniczą) oraz pełna kontrola przepływu pętli (`FOR`, `WHILE`, `BREAK`, flagi, `CONTINUE`).',
    exam_questions: [1, 2, 3],
    key_takeaways: [
      'Algorytm musi spełniać **5 cech**: uporządkowanie operacji, skończoną liczbę operacji, określoność (jednoznaczność) każdej operacji, skończoność czasu wykonania oraz **ogólność** (rozwiązuje klasę problemów, nie pojedyncze `2+2=4`).',
      'Każdy algorytm buduje się z **3 podstawowych elementów**: sekwencji (uporządkowania), wyboru (decyzji `IF/ELSE`) oraz iteracji (pętli `FOR`/`WHILE`).',
      'Zamiana wartości dwóch zmiennych $a$ i $b$ **wymaga trzeciej zmiennej pomocniczej** `temp` (`temp=b; b=a; a=temp`); bez niej pierwsza nadpisana wartość zostaje utracona.',
      '`BREAK` natychmiast przerywa tylko **najbliższą** pętlę (w pętlach zagnieżdżonych potrzebna bywa dodatkowa zmienna-flaga), a `CONTINUE` pomija resztę bieżącej iteracji i przechodzi do kolejnego przebiegu.',
    ],
    sections: [
      {
        id: 'aisd-1-1',
        heading: '1.1. Pojęcie algorytmu, 5 cech, sposoby zapisu i paradygmaty projektowania',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Definicja i 5 cech algorytmu (Wykład 1, sl. 17–19)',
            text: '**Algorytm** to jednoznaczny przepis obliczenia w skończonym czasie pewnych danych wynikowych na podstawie danych wejściowych, określający ciąg czynności elementarnych. Klasyczny algorytm jest deterministyczny (dla tych samych danych wejściowych zawsze daje ten sam wynik) i powinien weryfikować poprawność wejścia.\n\n**Pięć obowiązkowych cech algorytmu:**\n1. **Uporządkowanie operacji** — ściśle określona kolejność (wskazana pierwsza i ostatnia operacja).\n2. **Skończona liczba operacji** — opis algorytmu ma skończoną długość.\n3. **Określoność (jednoznaczność) operacji** — dokładnie wiadomo, jak wykonać każdy krok.\n4. **Skończoność czasu wykonania** — algorytm zawsze kończy się w skończonej liczbie kroków.\n5. **Ogólność** — rozwiązuje całą klasę podobnych problemów (np. dodawanie dowolnych $a+b$, a nie tylko $2+2$).',
          },
          {
            type: 'paragraph',
            text: 'Algorytmy zapisujemy na **4 sposoby**: (1) **opis słowny**, (2) **pseudokod** (`INPUT`, `OUTPUT`, `READ`, `SET`, `PRINT`, `IF..THEN..ELSE`, `FOR`, `WHILE`, `RETURN`, `END ALGORITHM`), (3) **schemat blokowy** (5 standardowych figur: owal = `start`/`end`, prostokąt = proces/operacja, prostokąt z podwójnymi bokami = funkcja/procedura np. `sqrt(n)`, równoległobok = wejście/wyjście `read`/`print`, romb = warunek logiczny z gałęziami `Y`/`N`), oraz (4) **kod w języku programowania** (na laboratorium: Python z modułami `NumPy`, `SciPy`, `Matplotlib`).',
          },
          {
            type: 'table',
            headers: ['Podejście / Paradygmat (Wykład 1, sl. 32)', 'Idea działania', 'Typowy przykład / uwaga'],
            rows: [
              ['Metoda zstępująca (top-down)', 'Podział problemu na coraz mniejsze moduły (od ogółu do szczegółu)', 'Projektowanie architektury i procedur pomocniczych'],
              ['Metoda wstępująca (bottom-up)', 'Budowa najistotniejszych fragmentów, potem ich łączenie (od szczegółu do ogółu)', 'Iteracyjny Merge Sort, budowa biblioteki narzędzi'],
              ['Przeszukiwanie pełne (brute-force)', 'Sprawdzenie całego zbioru rozwiązań i wybór najlepszego', 'Gwarantuje optimum, ale często wykładnicze czasowo'],
              ['Dziel i zwyciężaj (divide & conquer)', 'Rekurencyjny podział na mniejsze podproblemy aż do przypadku bazowego', 'Merge Sort, Quicksort, Binary Search'],
              ['Programowanie dynamiczne (DP)', 'Podział na nakładające się podproblemy i wykorzystanie obliczonych wyników', 'Optymalne wyznaczanie Fibonacciego bez powtórzeń'],
              ['Metoda zachłanna (greedy)', 'Wybór lokalnie najbardziej obiecującego kroku bez pełnej analizy przyszłości', 'Szybka, ale nie zawsze daje optimum globalne'],
              ['Algorytmy heurystyczne', 'Rozwiązanie przybliżone oparte na doświadczeniu / założeniach', 'Znacznie szybsze niż metody dokładne dla trudnych zadań'],
            ],
          },
        ],
      },
      {
        id: 'aisd-1-2',
        heading: '1.2. Decyzje (IF/ELSE), zamiana zmiennych i klasyfikacja trójkątów',
        blocks: [
          {
            type: 'paragraph',
            text: 'Instrukcje warunkowe opierają się na operatorach porównania (`==`, `!=`, `>`, `<`, `>=`, `<=`) i logicznych (`AND` — prawda tylko gdy oba prawdziwe; `OR` — fałsz tylko gdy oba fałszywe; `NOT` — negacja). Gałęzie `IF` można zagnieżdżać zarówno w części `THEN`, jak i `ELSE`. Klasyczny przykład z Wykładu 2 (sl. 5–14) pokazuje, że ten sam problem może mieć wiele poprawnych rozwiązań o różnej efektywności:',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykład 1.1 (Wykład 2, sl. 9–14): Zamiana dwóch zmiennych i rodzaj trójkąta (2 sposoby)',
            text: '**Problem:** Mając dowolne dodatnie boki $a, b, c$, ustal najpierw najdłuższy bok w zmiennej $c$, sprawdź warunek istnienia trójkąta ($a + b > c$) i określ jego typ (ostrokątny / prostokątny / rozwartokątny).\n\n1. **Ustawienie maksimum w $c$ (z użyciem zmiennej pomocniczej `t`):** jeśli $a>b$ i $a>c$, zamień $a \\leftrightarrow c$ (`t=a; a=c; c=t`); w przeciwnym razie jeśli $b>c$, zamień $b \\leftrightarrow c$ (`t=b; b=c; c=t`). Uwaga: naiwne `a=b; b=a` **gubi wartość `a`**!\n2. **Sposób I (efektywniejszy — bez dzielenia):** porównuj bezpośrednio $a^2+b^2$ z $c^2$: jeśli $> c^2$ to ostrokątny, jeśli $== c^2$ to prostokątny, jeśli $< c^2$ to rozwartokątny.\n3. **Sposób II (z tw. cosinusów):** oblicz $p = \\cos\\gamma = \\frac{a^2+b^2-c^2}{2ab}$ i sprawdź znak $p$ ($>0$, $==0$, $<0$). Sposób II jest poprawny, ale wykonuje dodatkowo kosztowne operacje mnożenia i dzielenia zmiennoprzecinkowego!',
          },
        ],
      },
      {
        id: 'aisd-1-3',
        heading: '1.3. Pętle (FOR, WHILE), zagnieżdżanie, BREAK, flagi i CONTINUE',
        blocks: [
          {
            type: 'paragraph',
            text: 'Pojedyncze wykonanie ciała pętli nazywamy **iteracją**, a liczba iteracji musi być skończona. Wyróżniamy:\n- **Pętlę licznikową (`FOR`)** — znana z góry liczba iteracji sterowana zmienną licznikową (np. `FOR i = 0, 1, ..., N-1 DO`).\n- **Pętlę warunkową (`WHILE`, pre-test)** — warunek sprawdzany *przed* wejściem do iteracji (może wykonać się 0 razy; np. wczytywanie i sumowanie liczb aż do `x == 0`, gdzie pierwszą liczbę trzeba wczytać *przed* pętlą!). Konstrukcja `REPEAT..UNTIL` (post-test) sprawdza warunek po iteracji (zawsze min. 1 przebieg), lecz w kursie używamy `WHILE`.\n- **Zagnieżdżanie pętli** — dla każdego obrotu pętli zewnętrznej wykonują się *wszystkie* obroty pętli wewnętrznej (np. rysowanie trójkąta z `*`: `FOR i=0..N-1` i `FOR j=0..i` wypisuje $1+2+\\dots+N = \\frac{N(N+1)}{2}$ gwiazdek).',
          },
          {
            type: 'list',
            items: [
              '**`BREAK`** — natychmiast przerywa działanie **tylko najbliższej** pętli (przykład W2 sl. 23: wczytuj do 20 liczb, przerwij wcześniej, gdy `x == 0`). Aby wyjść z dwóch zagnieżdżonych pętli naraz (jak w sprawdzaniu symetrii macierzy w R03), ustawiamy flagę i dodajemy drugi `IF` z `BREAK` w pętli zewnętrznej!',
              '**Zmienna-flaga** — zmienna logiczna lub całkowita (`0`/`1`), która przekazuje informację o zajściu zdarzenia wewnątrz pętli do dalszej części algorytmu (np. czy wśród $N$ liczb pojawiło się `0`).',
              '**`CONTINUE`** — pomija wszystkie pozostałe instrukcje bieżącej iteracji i przechodzi do następnego kroku pętli (przykład W2 sl. 25: `IF i % x != 0 THEN CONTINUE; PRINT i` wypisuje podzielne przez `x`).',
            ],
          },
          {
            type: 'svg',
            diagramId: 'aisd-flowchart-control',
            title: 'Interaktywna mapa bloków schematów blokowych i przepływu sterowania (FOR, WHILE, BREAK, CONTINUE)',
            caption: 'Przełączaj konstrukcje sterujące z Wykładów 1–2, aby zobaczyć dokładny kształt każdego bloku oraz tor przepływu sterowania.',
          },
        ],
      },
    ],
  },
  {
    id: 'aisd-ch2',
    subject_id: 'aisd',
    order_index: 2,
    slug: 'rekurencja-ram-zlozonosc',
    title: 'Rozdział 2: Rekurencja, model maszyny RAM i analiza złożoności algorytmów',
    subtitle: 'Wykład 3: rekurencja matematyczna vs informatyczna, RAM, T_B/T_W/T_A oraz notacje O, Ω, Θ',
    lecture_ref: 'Wykład 3 · slajdy 1–29',
    estimated_minutes: 45,
    summary:
      'Rozróżnienie rekurencji matematycznej (iteracyjnej) i informatycznej (wywołań własnych z przypadkiem bazowym), ocena algorytmów w modelu maszyny RAM, analiza złożoności czasowej ($T_B, T_W, T_A = E(X_k)$) i przestrzennej na przykładzie wyszukiwania w wektorze oraz ścisłe definicje i dowody notacji asymptotycznych $O, \\Omega, \\Theta$ wraz z hierarchią 9 klas złożoności.',
    exam_questions: [4, 5, 6, 7],
    key_takeaways: [
      'Algorytm rekurencyjny **musi** mieć **przypadek bazowy** (warunek stopu dający wynik bez wywołania rekurencyjnego) oraz **przypadek rekurencyjny** zmierzający do bazy; nie powinien wykonywać bezpośredniego I/O (`READ`/`PRINT`), lecz komunikować się przez argumenty i `RETURN`.',
      'Model **maszyny RAM** (Random-Access Machine): każda operacja elementarna trwa 1 krok (stały koszt $c_i$), pamięć ma nieskończenie wiele rejestrów z dostępem swobodnym $O(1)$, a taśmy wejścia/wyjścia są odczytywane/zapisywane sekwencyjnie.',
      'Notacje **$O, \\Omega, \\Theta$** opisują **rząd wzrostu funkcji**, a NIE przypadek optymistyczny/pesymistyczny! Dla każdego z przypadków ($T_B, T_W, T_A$) możemy osobno wyznaczyć $O$, $\\Omega$ lub $\\Theta$.',
      'Hierarchia klas złożoności: $\\Theta(1) \\prec \\Theta(\\log n) \\prec \\Theta(\\sqrt{n}) \\prec \\Theta(n) \\prec \\Theta(n\\log n) \\prec \\Theta(n^k) \\prec \\Theta(k^{\\log n}) \\prec \\Theta(k^n) \\prec \\Theta(n!)$. Podstawa logarytmu nie zmienia rzędu $\\Theta(\\log n)$, ale podstawa wykładnicza $k^n$ **zmienia** rząd!',
    ],
    sections: [
      {
        id: 'aisd-2-1',
        heading: '2.1. Rekurencja matematyczna vs rekurencja informatyczna',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Dwa oblicza rekurencji (Wykład 3, sl. 4–11)',
            text: '**Rekurencja** to wyznaczanie kolejnych wartości na podstawie wartości obliczonych wcześniej w taki sam sposób ($a_n = f(a_{n-1})$).\n1. **Rekurencja matematyczna (w operacjach)** — stosujemy wzór rekurencyjny wewnątrz zwykłej pętli iteracyjnej (np. $p = p \\cdot a$, $f = f \\cdot i$, Fibonacci z dwiema zmiennymi `an1, an2` działający w czasie $O(n)$ i pamięci $O(1)$!).\n2. **Rekurencja informatyczna (budowa algorytmu)** — funkcja wywołuje **samą siebie** dla mniejszego podproblemu, posiadając wyraźny **przypadek bazowy** (stop) i **przypadek rekurencyjny**.',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykład 2.1 (Wykład 3, sl. 7–11): Silnia, potęgowanie $3^4$ i ciąg Fibonacciego',
            text: '- **Potęgowanie rekurencyjne `potega(a, b)`:** przypadek bazowy `b == 0 -> RETURN 1`, krok rekurencyjny `RETURN a * potega(a, b-1)`. Dla `potega(3, 4)` stos wywołań schodzi do bazy $3^0=1$, a wracając wylicza kolejno $3\\cdot 1=3 \\to 3\\cdot 3=9 \\to 3\\cdot 9=27 \\to 3\\cdot 27=81$.\n- **Fibonacci iteracyjny vs rekurencyjny ($a_1=0,\\; a_2=1,\\; a_n=a_{n-1}+a_{n-2}$):** wersja iteracyjna (sl. 8) wykonuje pętlę `FOR i=3..n` w czasie $\\Theta(n)$ i pamięci $\\Theta(1)$. Wersja naiwnie rekurencyjna (`fib(n-1) + fib(n-2)`, sl. 11) wielokrotnie przelicza te same podproblemy — jej czas rośnie wykładniczo $\\Theta(\\varphi^n)$!\n- **Uwaga na literówkę ze slajdu 7 W3:** w iteracyjnym algorytmie `silnia(n)` wydrukowano `SET f = f*a` — poprawnie ma być oczywiście **`SET f = f*i`**!',
          },
        ],
      },
      {
        id: 'aisd-2-2',
        heading: '2.2. Model maszyny RAM i złożoność $T_B$, $T_W$, $T_A$ oraz przestrzenna',
        blocks: [
          {
            type: 'paragraph',
            text: 'Aby oceniać algorytmy niezależnie od języka i sprzętu, używamy modelu **maszyny RAM (Random-Access Machine)**: składa się ona z niemodyfikowalnego **Programu**, **Licznika rozkazów**, nieskończonej **Pamięci** rejestrów $r_0, r_1, \\dots$ o bezpośrednim dostępie oraz sekwencyjnej **Taśmy wejściowej** i **Taśmy wyjściowej**. W analizie skupiamy się na **operacjach dominujących** (wykonywanych najczęściej) i wyznaczamy trzy miary czasu oraz złożoność pamięciową (liczbę pomocniczych zmiennych, *bez* rozmiaru samego wejścia):',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykład 2.2 (Wykład 3, sl. 16–22): Pełna analiza wyszukiwania liniowego `wartosc_w_wektorze(A, x)`',
            text: 'Przeszukujemy wektor $A$ długości $n$ pętlą `FOR i=0..n-1` (`IF A[i] == x THEN p=i; BREAK`). Operacjami dominującymi są krok pętli ($c_3$) i porównanie ($c_4$):\n- **Złożoność optymistyczna $T_B$** ($x$ na indeksie $0$, 1 iteracja): $T_B = c_1+c_2+c_3+c_4+c_5+c_6+c_7+c_8 = c = \\Theta(1)$.\n- **Złożoność pesymistyczna $T_W$** ($x$ na końcu lub brak $x$, $n$ iteracji): $T_W = (c_3+c_4)n + (c_1+c_2+c_5+c_6+c_7+c_8)$. Przy $c_i = 1$: $T_W(n) = 2n + 6 = \\Theta(n)$.\n- **Złożoność średnia $T_A = E(X_k)$** (przy założeniu równomiernego rozkładu pozycji $p_{nk} = \\frac{1}{n}$ dla $k=1,\\dots,n$):\n$$T_A = (c_3+c_4)\\sum_{k=1}^{n} \\frac{1}{n}\\cdot k = \\frac{c_3+c_4}{n}\\cdot \\frac{n(n+1)}{2} = (c_3+c_4)\\frac{n+1}{2} = \\Theta(n)$$\n- **Złożoność przestrzenna:** pomijamy wejściową tablicę $A$ i $x$; algorytm alokuje tylko 2 zmienne pomocnicze (`p` i `i`) $\\implies$ **stała złożoność pamięciowa $\\Theta(1)$**.',
          },
        ],
      },
      {
        id: 'aisd-2-3',
        heading: '2.3. Notacje asymptotyczne $O$, $\\Omega$, $\\Theta$ i klasy złożoności',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Formalne definicje $O(g(n))$, $\\Omega(g(n))$ i $\\Theta(g(n))$ (Wykład 3, sl. 24–27)',
            text: '1. **Górne ograniczenie (notacja dużego $O$):**\n$$f(n) = O(g(n)) \\iff \\exists\\, c > 0 \\; \\exists\\, n_0 \\; \\forall\\, n > n_0:\\; f(n) \\le c \\cdot g(n)$$\n2. **Dolne ograniczenie (notacja $\\Omega$):**\n$$f(n) = \\Omega(g(n)) \\iff \\exists\\, c > 0 \\; \\exists\\, n_0 \\; \\forall\\, n > n_0:\\; f(n) \\ge c \\cdot g(n)$$\n3. **Dokładny rząd wielkości (notacja $\\Theta$):**\n$$f(n) = \\Theta(g(n)) \\iff \\exists\\, c_1, c_2 > 0 \\; \\exists\\, n_0 \\; \\forall\\, n > n_0:\\; c_1\\cdot g(n) \\le f(n) \\le c_2\\cdot g(n)$$\nRównoważnie: $f(n) = \\Theta(g(n)) \\iff f(n) = O(g(n)) \\;\\land\\; f(n) = \\Omega(g(n))$ (a także $g(n) = O(f(n))$). Odpowiednikami z nierównością ostrą ($<, >$ dla każdego $c>0$) są małe $o()$ i $\\omega()$.',
          },
          {
            type: 'callout',
            variant: 'proof',
            title: 'Dowód egzaminacyjny: $T_W(n) = 2n + 6 = \\Theta(n)$ (Wykład 3, sl. 24–26)',
            text: '- **Górne ograniczenie $O(n)$:** przyjmujemy $c_2 = 3$. Sprawdzamy $2n + 6 \\le 3n \\iff n \\ge 6$, więc wystarczy $n_0 = 6$.\n- **Dolne ograniczenie $\\Omega(n)$:** przyjmujemy $c_1 = 2$. Mamy $2n + 6 \\ge 2n$ dla każdego $n > 0$.\n- **Wniosek:** dla $c_1 = 2,\\; c_2 = 3,\\; n_0 = 6$ zachodzi $2n \\le 2n+6 \\le 3n$ dla wszystkich $n \\ge 6$, zatem $T_W(n) = \\Theta(n)$ (złożoność liniowa).',
          },
          {
            type: 'svg',
            diagramId: 'aisd-complexity-growth',
            title: 'Interaktywne porównanie klas złożoności i dowód definicji $\\Theta(n)$ dla $f(n)=2n+6$',
            caption: 'Zmieniaj rozmiar danych $n$ oraz stałe $c_1, c_2$, aby porównać tempo wzrostu od $\\Theta(1)$ do $\\Theta(2^n)$ i zobaczyć granicę $n_0$.',
          },
        ],
      },
    ],
  },
  {
    id: 'aisd-ch3',
    subject_id: 'aisd',
    order_index: 3,
    slug: 'struktury-liniowe-tablice-listy-kolejki',
    title: 'Rozdział 3: Struktury danych S = (D, R, e) oraz struktury liniowe (tablice, listy, kolejki)',
    subtitle: 'Wykład 4 (cz. 1–2): model grafowy, tablice i macierze, listy jednokierunkowe/dwukierunkowe/cykliczne oraz kolejki FIFO/LIFO/RR',
    lecture_ref: 'Wykład 4 · slajdy 1–34',
    estimated_minutes: 40,
    summary:
      'Formalna trójka $S=(D, R, e)$ i model grafowy struktur danych, podział na zbiory statyczne (sekwencyjne), dynamiczne (łącznikowe) i hybrydowe, implementacje tablic i macierzy, listy jedno-/dwukierunkowe (ze strażnikami i bez) oraz cykliczne, a także cztery typy kolejek (FIFO, LIFO/stos, Round-Robin, priorytetowe).',
    exam_questions: [8, 9, 10, 11],
    key_takeaways: [
      'Formalnie strukturę danych opisuje trójka **$S = (D, R, e)$**, gdzie $D$ to zbiór danych elementarnych $d_i=(n_i, w_i)$, $e$ to element wejściowy (nie należy do $D$!), a $R = \\{r_{\\text{we}}, N\\}$ to relacja wejścia (wskazuje korzeń/korzenie) i relacja następstwa (poprzednik $\\to$ następnik).',
      'Zbiór dynamiczny wspierający trzy operacje — **wstawianie, usuwanie i wyszukiwanie** — nazywamy **słownikiem**.',
      '**Tablica sekwencyjna** przechowuje dane w sposób ciągły w pamięci: ma stały rozmiar (statyczna), dostęp $O(1)$ po indeksie i nie potrzebuje wskaźników. **Lista łącznikowa** ma rozmiar dynamiczny i wstawianie/usuwanie w $O(1)$ (przez przepisanie wskaźników `next`/`prev`), lecz wyszukiwanie wymaga liniowego przejścia $O(n)$.',
      '**FIFO** (First In First Out): wstawianie w ogonie, usuwanie z głowy. **LIFO / stos** (Last In First Out): wstawianie i usuwanie zawsze w głowie (na wierzchołku).',
    ],
    sections: [
      {
        id: 'aisd-3-1',
        heading: '3.1. Formalna definicja struktury danych $S=(D,R,e)$ i model grafowy',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Trójka $S = (D, R, e)$ i typy struktur (Wykład 4, sl. 4–7)',
            text: 'Strukturę danych definiujemy jako trójkę uporządkowaną **$S = (D, R, e)$**, gdzie:\n- $D = \\{d_0, d_1, \\dots, d_{|D|-1}\\}$ — skończony zbiór danych elementarnych (każda dana to para $d_i = (n_i, w_i)$: nazwa i wartość),\n- $e$ — element wejściowy do struktury ($e \\notin D$),\n- $R = \\{r_{\\text{we}}, N\\}$ — para relacji: **relacja wejścia** $r_{\\text{we}} \\subset \\{e\\} \\times D$ (wskazuje co najmniej jeden **korzeń**) oraz **relacja następstwa** $N \\subset D \\times D$ (pary *(poprzednik, następnik)*).\n\nRealizacje dzielimy na **statyczne (sekwencyjne)** (stały rozmiar znany z góry), **dynamiczne (łącznikowe / wskaźnikowe)** (zmienny rozmiar) oraz **hybrydowe**. W **modelu grafowym** dane to węzły (elipsy), relacje to skierowane łuki, węzeł wskazany przez $e$ to korzeń, a węzeł bez następnika to **liść**.',
          },
          {
            type: 'paragraph',
            text: '**Struktura liniowa** to struktura jednowymiarowa (jej graf to pojedynczy łańcuch), w której każdy element ma jednego poprzednika i jednego następnika — z wyjątkiem pierwszego (korzenia, ma tylko następnika) i ostatniego (ma tylko poprzednika). Należą tu: **tablice**, **listy** i **kolejki (w tym stos)**.',
          },
        ],
      },
      {
        id: 'aisd-3-2',
        heading: '3.2. Tablice sekwencyjne i operacje na macierzach',
        blocks: [
          {
            type: 'paragraph',
            text: 'Tablica przechowuje elementy tego samego typu w **ciągłym bloku pamięci**, więc pozycję elementu wyznacza indeks (wielowymiarowe: $A_{n\\times m\\times o\\times p}$, zapis `A[0,2,1,4]`), a następnik i poprzednik leżą po prostu w sąsiednich komórkach pamięci. Wektor to tablica 1D, macierz to tablica 2D ($r \\times c$ elementów). Na Wykładzie 4 omówiono też mnożenie element-po-elemencie (Hadamarda $A \\odot B$), macierze specjalne (jednostkowa, skalarna, diagonalna, górno-/dolnotrójkątna, permutacji, symetryczna) oraz dwa ważne algorytmy macierzowe:',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Algorytmy macierzowe z Wykładu 4 (sl. 23–24) + uwaga na błąd w pseudokodzie mnożenia!',
            text: '1. **Sprawdzanie symetrii macierzy $A_{m\\times n}$:** najpierw sprawdź `m == n`; następnie wystarczy porównać tylko górny trójkąt nad przekątną (`FOR i=0..m-2`, `FOR j=i+1..m-1`): jeśli `A[i,j] != A[j,i]`, ustaw flagę `sym = 0` i użyj `BREAK` (oraz drugiego `BREAK` w pętli zewnętrznej!). Złożoność: $O(m^2)$ z połową porównań.\n2. **Mnożenie macierzy $A_{m\\times n} \\cdot B_{o\\times p}$:** warunek `n == o`, trzy zagnieżdżone pętle `i=0..m-1`, `j=0..p-1`, `k=0..n-1` (złożoność $\\Theta(mnp)$, dla kwadratowych $\\Theta(n^3)$):\n`SET C[i, j] = C[i, j] + A[i, k] * B[k, j]`\n**Uwaga egzaminacyjna (błąd na slajdzie 24 W4!):** W prezentacji wydrukowano zamienione indeksy `C[j, i] = C[j, i] + A[i,k]*B[k,j]` — dla macierzy niekwadratowej ($m \\neq p$) prowadzi to nawet do wyjścia poza zakres tablicy `C` wymiaru $m\\times p$, a dla kwadratowej daje macierz transponowaną $(AB)^T$! Poprawnie musi być **`C[i, j]`**.',
          },
        ],
      },
      {
        id: 'aisd-3-3',
        heading: '3.3. Listy liniowe (jednokierunkowe, dwukierunkowe, cykliczne) i kolejki',
        blocks: [
          {
            type: 'table',
            headers: ['Struktura liniowa', 'Relacja / Wskaźniki', 'Operacje i złożoność'],
            rows: [
              ['Lista jednokierunkowa', '$N = N_L = \\{(d_i, d_{i+1})\\}$; `head`, `next`, koniec `NIL`', 'Wstawianie na początku $O(1)$; wyszukiwanie `List-Search` $O(n)$'],
              ['Lista dwukierunkowa', '$N = N_L \\cup N_W$ ($N_W = N_L^{-1}$); `head`, `tail`, `prev`, `next`', 'Ruch w obu kierunkach; usuwanie danego węzła `x` w $O(1)$'],
              ['Lista ze strażnikami', 'Puste, nieusuwalne węzły na głowie i ogonie', 'Eliminuje `IF x.prev != NIL` — `List-Remove` ma tylko 2 linie!'],
              ['Lista cykliczna (pierścień)', 'Następnikiem ogona jest głowa (w 2-kier.: `head.prev = tail`)', 'Błyskawiczne przejście między końcem a początkiem; podstawa Round-Robin'],
              ['Kolejka FIFO', 'First In First Out (wstawianie w ogonie, usuwanie w głowie)', 'Enqueue $O(1)$, Dequeue $O(1)$; buforowanie, BFS'],
              ['Kolejka LIFO (Stos)', 'Last In First Out (wstawianie i usuwanie w głowie)', 'Push $O(1)$, Pop $O(1)$; stos wywołań rekurencji'],
              ['Round-Robin / Priorytetowa', 'Cykliczna z kwantem czasu / porządek wg priorytetu', 'Szeregowanie zadań w OS / implementacja kopcem ($O(\\log n)$)'],
            ],
          },
          {
            type: 'callout',
            variant: 'tip',
            title: 'Złoty wzór wstawiania/usuwania w liście dwukierunkowej ze strażnikami (Wykład 4, sl. 30)',
            text: '**Usuwanie węzła `x` (2 operacje wskaźnikowe!):**\n`x.prev.next = x.next`\n`x.next.prev = x.prev`\n\n**Wstawianie węzła `v` za strażnikiem `L.head` (kolejność 4 przypisań jest krytyczna!):**\n`v.next = L.head.next` → `v.prev = L.head` → `L.head.next.prev = v` → `L.head.next = v`\n*(Gdybyśmy najpierw zmienili `L.head.next = v`, stracilibyśmy adres starego pierwszego elementu!)*',
          },
          {
            type: 'svg',
            diagramId: 'aisd-linear-structures',
            title: 'Interaktywna wizualizacja: graf $S=(D,R,e)$, wskaźniki listy dwukierunkowej oraz FIFO vs LIFO',
            caption: 'Przełączaj między modelem grafowym z Wykładu 4 (sl. 7), operacjami na wskaźnikach listy dwukierunkowej oraz kolejką FIFO / stosem LIFO.',
          },
        ],
      },
    ],
  },
  {
    id: 'aisd-ch4',
    subject_id: 'aisd',
    order_index: 4,
    slug: 'sortowanie-struktur-liniowych',
    title: 'Rozdział 4: Algorytmy sortowania struktur liniowych',
    subtitle: 'Wykład 4 (cz. 3): Selection, Insertion, Bubble (+ modyfikacje i Cocktail), Merge Sort oraz Quicksort',
    lecture_ref: 'Wykład 4 · slajdy 35–54',
    estimated_minutes: 45,
    summary:
      'Formalna definicja problemu sortowania, własności **in-place** (w miejscu) oraz **stabilności**, pełna analiza i pseudokod algorytmów kwadratowych (przez wybór, przez wstawianie, bąbelkowy, zmodyfikowany bąbelkowy, koktajlowy) oraz szybkich algorytmów „dziel i zwyciężaj” $O(n\\log n)$: sortowania przez scalanie (rekurencyjnego i iteracyjnego) oraz sortowania szybkiego (Quicksort z partycjonowaniem).',
    exam_questions: [12, 13, 14, 15],
    key_takeaways: [
      '**Sortowanie w miejscu (in-place)** zużywa co najwyżej stałą pamięć pomocniczą $O(1)$ (bez dodatkowej tablicy rozmiaru $n$). **Sortowanie stabilne** zachowuje pierwotną kolejność elementów o równych kluczach.',
      'Spośród prostych algorytmów $O(n^2)$: **Insertion Sort** i **zmodyfikowany Bubble Sort** (z flagą `posortowany`) schodzą dla już posortowanej tablicy do **$O(n)$**! Natomiast **Selection Sort** zawsze wykonuje $\\Theta(n^2)$ porównań i dla tablic jest **niestabilny**.',
      '**Merge Sort** daje gwarantowane **$O(n\\log n)$** nawet pesymistycznie i jest **stabilny**, ale **NIE działa w miejscu** (wymaga $O(n)$ dodatkowej pamięci na tablice pomocnicze `L` i `R`).',
      '**Quicksort** działa **w miejscu** (poza stosem rekurencji) i ma średnią złożoność **$O(n\\log n)$**, jednak przy złym wyborze piwota (np. już posortowana tablica z piwotem na końcu!) degraduje się do **$O(n^2)$** i jest **niestabilny**.',
    ],
    sections: [
      {
        id: 'aisd-4-1',
        heading: '4.1. Algorytmy kwadratowe $O(n^2)$: Selection, Insertion, Bubble i Cocktail Sort',
        blocks: [
          {
            type: 'paragraph',
            text: 'Sortowanie przekształca ciąg wejściowy $[a_0, a_1, \\dots, a_{n-1}]$ w jego permutację uporządkowaną $\\hat{a}_0 \\le \\hat{a}_1 \\le \\dots \\le \\hat{a}_{n-1}$. W kursie analizujemy cztery klasyczne metody elementarne (na przykładach `[4, 2, 5, 6, 1]` oraz `[4, 2, 1, 5, 6]`):',
          },
          {
            type: 'list',
            items: [
              '**Sortowanie przez wybór (Selection Sort):** w $i$-tym kroku (`i=0..n-2`) znajdujemy indeks minimum `idx` w nieposortowanym sufiksie `i+1..n-1` i zamieniamy `A[i]` z `A[idx]`. Zawsze wykonuje $\\frac{n(n-1)}{2} = \\Theta(n^2)$ porównań (nawet na posortowanej tablicy!), mało zamian ($\\le n-1$), **w miejscu**, **niestabilne** dla tablic (zamiana na odległość może przeskoczyć równy element!).',
              '**Sortowanie przez wstawianie (Insertion Sort):** bierzemy element `t = A[i]` (`i=1..n-1`) i przesuwamy w prawo większe elementy posortowanego prefiksu (`WHILE j>=0 AND A[j] > t`), aż znajdziemy miejsce `A[j+1] = t`. **W miejscu, stabilne** (ostra nierówność `A[j] > t`!), pesymistycznie i średnio $O(n^2)$, ale **optymistycznie $O(n)$** dla tablicy posortowanej (i bardzo szybkie dla prawie posortowanych!).',
              '**Sortowanie bąbelkowe (Bubble Sort):** w kolejnych przebiegach `i=n-1..1` porównujemy sąsiednie pary `A[j] > A[j+1]` i zamieniamy je — największy element „wypływa” na koniec. W miejscu, stabilne, wersja podstawowa zawsze $O(n^2)$.',
              '**Zmodyfikowane bąbelkowe i Cocktail Sort:** dodanie flagi `posortowany = TRUE` (przerywamy przez `BREAK`, gdy w całym obiegu nie było żadnej zamiany) obniża złożoność optymistyczną do **$O(n)$**. **Sortowanie koktajlowe** (dwustronne bąbelkowe) przebiega naprzemiennie w przód (maksimum na `end`) i w tył (minimum na `start`), szybciej eliminując tzw. „żółwie” (małe elementy na końcu tablicy), lecz pesymistycznie pozostaje $O(n^2)$.',
            ],
          },
        ],
      },
      {
        id: 'aisd-4-2',
        heading: '4.2. Dziel i zwyciężaj: Merge Sort i Quicksort ($O(n\\log n)$)',
        blocks: [
          {
            type: 'callout',
            variant: 'theorem',
            title: 'Sortowanie przez scalanie (Merge Sort — Wykład 4, sl. 47–50)',
            text: 'Trzy etapy: **(1) Podział** tablicy $A[p..k]$ w punkcie środkowym $s = \\lfloor(p+k)/2\\rfloor$, **(2) Rekurencyjne posortowanie** połówek $A[p..s]$ i $A[s+1..k]$ (przypadek bazowy: tablica 1-elementowa `p == k`), **(3) Scalanie (`Merge`)** dwóch posortowanych podtablic w czasie liniowym $\\Theta(n)$ za pomocą tablic pomocniczych `L[0..n1-1]` i `R[0..n2-1]`.\n\n**Dlaczego $\\Theta(n\\log n)$?** Podział na pół daje dokładnie $\\lceil\\log_2 n\\rceil$ poziomów drzewa rekurencji, a na każdym poziomie scalanie odwiedza i przepisuje wszystkie $n$ elementów $\\implies \\Theta(n\\log n)$ w **każdym** przypadku (optymistycznym, średnim i pesymistycznym). Warunek `L[i] <= R[j]` zapewnia **stabilność**, ale tablice `L, R` powodują złożoność pamięciową **$O(n)$** (nie działa w miejscu!).\n*(Wskazówka do wersji iteracyjnej ze sl. 50: dla ostatniego skróconego bloku granicą między posortowanymi podblokami jest `pocz + rozmiar - 1`, a nie `(pocz + koniec)/2`.)*',
          },
          {
            type: 'callout',
            variant: 'theorem',
            title: 'Sortowanie szybkie (Quicksort — Wykład 4, sl. 51–54)',
            text: 'Wybieramy element rozdzielający (**piwot** `x = A[k]`). Procedura `Partition(A, p, k)` utrzymuje wskaźnik `j` (granicę elementów $\\le x$): przeglądając `i=p..k-1`, każdy element `A[i] <= x` zamieniamy z `A[j]` i zwiększamy `j`. Na końcu wstawiamy piwot dokładnie na pozycję `j` (`A[k]=A[j]; A[j]=x`) — piwot trafia na swoje **ostateczne miejsce**! Następnie wywołujemy rekurencyjnie `Quicksort(A, p, q-1)` i `Quicksort(A, q+1, k)`.\n\n- **Średnio:** $O(n\\log n)$ (wyważone podziały), w praktyce bardzo szybkie dzięki działaniu **w miejscu** (dobra lokalność cache).\n- **Pesymistycznie:** **$O(n^2)$** — gdy piwot za każdym razem jest najmniejszy lub największy (np. tablica już posortowana przy wyborze `A[k]` jako piwota daje podział $n-1$ i $0$!).\n- **Stabilność:** **niestabilne** (zamiany na duże odległości w `Partition`).',
          },
          {
            type: 'table',
            headers: ['Algorytm', 'Optymistyczna', 'Średnia', 'Pesymistyczna', 'Pamięć (w miejscu?)', 'Stabilny?'],
            rows: [
              ['Selection Sort', '$\\Theta(n^2)$', '$\\Theta(n^2)$', '$\\Theta(n^2)$', '$O(1)$ (Tak)', 'Nie (tablice)'],
              ['Insertion Sort', '$\\Theta(n)$', '$\\Theta(n^2)$', '$\\Theta(n^2)$', '$O(1)$ (Tak)', 'Tak'],
              ['Bubble Sort (podst.)', '$\\Theta(n^2)$', '$\\Theta(n^2)$', '$\\Theta(n^2)$', '$O(1)$ (Tak)', 'Tak'],
              ['Bubble zmodyf. / Cocktail', '$\\Theta(n)$', '$\\Theta(n^2)$', '$\\Theta(n^2)$', '$O(1)$ (Tak)', 'Tak'],
              ['Merge Sort', '$\\Theta(n\\log n)$', '$\\Theta(n\\log n)$', '$\\Theta(n\\log n)$', '$O(n)$ (**Nie**)', 'Tak'],
              ['Quicksort', '$\\Theta(n\\log n)$', '$\\Theta(n\\log n)$', '$\\Theta(n^2)$', '$O(\\log n)$ stos (Tak)', 'Nie'],
              ['Heapsort (Rozdział 6)', '$\\Theta(n\\log n)$', '$\\Theta(n\\log n)$', '$\\Theta(n\\log n)$', '$O(1)$ (Tak)', 'Nie'],
            ],
          },
          {
            type: 'svg',
            diagramId: 'aisd-sorting-steps',
            title: 'Interaktywny odtwarzacz krok po kroku: Selection, Insertion, Bubble i Quicksort',
            caption: 'Śledź kolejne kroki sortowania na wykładowej tablicy `[4, 2, 5, 6, 1]` wraz z podświetleniem porównywanych par, piwota i posortowanego fragmentu.',
          },
        ],
      },
    ],
  },
];
