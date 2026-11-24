// Algorytmy i struktury danych — 28 zagadnień egzaminacyjnych (Wykłady 1–6, PUT)

export const AISD_EXAM_TOPICS = [
  // Rozdział 1 (Zagadnienia 1–3)
  {
    id: 'aisd-q01',
    subject_id: 'aisd',
    number: 1,
    chapter_id: 'aisd-ch1',
    category: 'Podstawy algorytmów',
    question: 'Definicja algorytmu, 5 obowiązkowych cech, 4 sposoby zapisu oraz główne paradygmaty projektowania algorytmów',
    short_answer:
      'Algorytm to jednoznaczny, skończony przepis przekształcenia danych wejściowych w wyjściowe. Musi spełniać 5 cech: uporządkowanie, skończoną liczbę operacji, określoność, skończony czas wykonania oraz ogólność.',
    full_answer:
      '**Algorytm** to jednoznaczny przepis określający ciąg elementarnych czynności pozwalający w skończonym czasie wyznaczyć dane wynikowe na podstawie danych wejściowych. Klasyczny algorytm jest deterministyczny i waliduje dane wejściowe.\n\n**Pięć obowiązkowych cech algorytmu (W1 sl. 18–19):**\n1. **Uporządkowanie operacji** — ścisła kolejność (wyróżniona pierwsza i ostatnia operacja).\n2. **Skończona liczba operacji** — opis algorytmu ma skończoną długość.\n3. **Określoność (jednoznaczność)** — każdy krok jest precyzyjnie zdefiniowany i nie budzi wątpliwości.\n4. **Skończoność czasu wykonania** — algorytm zawsze zatrzymuje się po skończonej liczbie kroków.\n5. **Ogólność** — rozwiązuje całą klasę problemów (np. dodawanie dowolnych $a+b$, a nie pojedyncze $2+2$).\n\n**Cztery sposoby zapisu:** opis słowny, pseudokod (`INPUT`, `SET`, `IF..THEN..ELSE`, `FOR`, `WHILE`, `RETURN`), schemat blokowy (5 figur: owal — start/stop, prostokąt — proces, prostokąt z podwójnymi bokami — funkcja/procedura, równoległobok — I/O, romb — warunek `Y`/`N`) oraz kod w języku programowania (Python).\n\n**Paradygmaty projektowania (W1 sl. 32):** metoda zstępująca (*top-down*), wstępująca (*bottom-up*), przeszukiwanie pełne (*brute-force*), dziel i zwyciężaj (*divide & conquer*), programowanie dynamiczne (DP), metoda zachłanna (*greedy*) oraz algorytmy heurystyczne.',
    key_points: [
      'Wymienić wszystkie **5 cech algorytmu** (zwłaszcza ogólność i rozróżnienie skończonej liczby operacji od skończonego czasu wykonania).',
      'Rozpoznawać i rysować **5 bloków schematu blokowego** (owal, prostokąt, podwójny prostokąt = funkcja, równoległobok = I/O, romb = warunek).',
      'Każdy algorytm składa się z 3 bloków elementarnych: **sekwencji**, **wyboru** i **iteracji**.',
      'Odróżniać *divide & conquer* (niezależne podproblemy) od programowania dynamicznego (nakładające się podproblemy) i metody zachłannej.',
    ],
    common_mistakes:
      'Mylenie skończonej liczby operacji (długość zapisu) ze skończonością czasu wykonania (pętla nieskończona ma 2 operacje w zapisie, ale nieskończony czas!). Mylenie równoległoboku (I/O) z prostokątem (obliczenia).',
    lab_connection:
      'Na egzaminie prowadzącego bardzo często pojawia się rysowanie schematu blokowego oraz zamiana opisu słownego na pseudokod.',
    svg_diagram_id: 'aisd-flowchart-control',
  },
  {
    id: 'aisd-q02',
    subject_id: 'aisd',
    number: 2,
    chapter_id: 'aisd-ch1',
    category: 'Podstawy algorytmów',
    question: 'Instrukcje warunkowe (IF/ELSE), operatory logiczne, zamiana wartości dwóch zmiennych oraz klasyfikacja trójkątów',
    short_answer:
      'Warunki buduje się z operatorów relacji i logicznych (`AND`, `OR`, `NOT`). Zamiana $a \\leftrightarrow b$ wymaga zmiennej pomocniczej `temp` (`temp=b; b=a; a=temp`), a badanie typu trójkąta bez dzielenia polega na porównaniu $a^2+b^2$ z $c^2$ (dla $c=\\max(a,b,c)$).',
    full_answer:
      'Instrukcja wyboru `IF warunek THEN ... ELSE ...` steruje rozgałęzieniem przepływu. Złożone warunki budujemy z operatorów relacyjnych (`==`, `!=`, `<`, `<=`, `>`, `>=`) i logicznych: `AND` (prawda tylko dla T,T), `OR` (fałsz tylko dla F,F), `NOT` (negacja).\n\n**Zamiana dwóch zmiennych (W2 sl. 8–9):**\nNaiwny zapis `SET a = b; SET b = a` jest **błędny** — pierwsze przypisanie nadpisuje `a`, więc obie zmienne przyjmują pierwotną wartość `b`. Poprawna zamiana wymaga zmiennej pomocniczej:\n```text\nSET temp = b\nSET b = a\nSET a = temp\n```\n**Klasyfikacja trójkąta o bokach $a,b,c>0$ (W2 sl. 9–14):**\n1. Wyznacz najdłuższy bok i przenieś go do $c$ (porównania z zamianą przez `temp`).\n2. Sprawdź warunek istnienia trójkąta: `IF a + b <= c THEN` nie istnieje.\n3. **Sposób I (zalecany):** porównaj $a^2 + b^2$ z $c^2$: jeśli $> c^2$ — ostrokątny, jeśli $== c^2$ — prostokątny, jeśli $< c^2$ — rozwartokątny.\n4. **Sposób II (z tw. cosinusów):** oblicz $p = \\frac{a^2+b^2-c^2}{2ab}$ i zbadaj znak $p$. Daje ten sam wynik, ale wprowadza zbędne, kosztowne dzielenie zmiennoprzecinkowe.',
    key_points: [
      'Algorytm zamiany dwóch zmiennych z `temp` (kolejność 3 przypisań).',
      'Warunek istnienia trójkąta $a + b > c$ po upewnieniu się, że $c$ jest bokiem najdłuższym.',
      'Dlaczego porównanie $a^2+b^2$ z $c^2$ jest efektywniejsze od obliczania $\\cos\\gamma = \\frac{a^2+b^2-c^2}{2ab}$.',
      'Zagnieżdżanie instrukcji `IF` zarówno w gałęzi `THEN`, jak i `ELSE`.',
    ],
    common_mistakes:
      'Pomijanie `temp` przy zamianie zmiennych; sprawdzanie tylko $a+b>c$ bez wcześniejszego upewnienia się, że $c=\\max(a,b,c)$; użycie operatora przypisania `=` zamiast porównania `==` w warunku.',
    lab_connection:
      'Typowe zadanie egzaminacyjne typu „znajdź błąd w pseudokodzie” (brak `temp` lub błędny warunek brzegowy `>=` zamiast `>`).',
    svg_diagram_id: 'aisd-flowchart-control',
  },
  {
    id: 'aisd-q03',
    subject_id: 'aisd',
    number: 3,
    chapter_id: 'aisd-ch1',
    category: 'Podstawy algorytmów',
    question: 'Pętle (FOR, WHILE), pętle zagnieżdżone oraz sterowanie przepływem za pomocą BREAK, flagi i CONTINUE',
    short_answer:
      '`FOR` służy do iteracji o znanej liczbie kroków, `WHILE` to pętla z warunkiem wstępnym (może wykonać się 0 razy). `BREAK` przerywa wyłącznie najbliższą pętlę, flaga przenosi informację poza pętlę, a `CONTINUE` przechodzi do następnej iteracji.',
    full_answer:
      '**Iteracja** to pojedyncze wykonanie ciała pętli; warunek pętli musi zapewniać zakończenie w skończonym czasie.\n\n- **Pętla `FOR`** — sterowana licznikiem (np. `FOR i = 0, 1, ..., N-1 DO`), stosowana gdy z góry znana jest liczba powtórzeń.\n- **Pętla `WHILE` (pre-test)** — warunek jest sprawdzany *przed* każdą iteracją; jeśli od razu jest fałszywy, ciało nie wykona się ani razu. Przy wczytywaniu danych do wartownika (np. `x == 0`, W2 sl. 19) pierwszą wartość należy wczytać przed wejściem do pętli.\n- **Pętle zagnieżdżone** — dla każdego kroku pętli zewnętrznej wykonują się wszystkie kroki pętli wewnętrznej (np. rysowanie trójkąta z `*` dla `i=0..N-1`, `j=0..i` wypisuje $\\frac{N(N+1)}{2}$ gwiazdek).\n- **`BREAK`** — natychmiast przerywa tylko **najbliższą** otaczającą pętlę. Aby przerwać dwie zagnieżdżone pętle naraz (np. test symetrii macierzy), ustawiamy **zmienną-flagę** (np. `flag = 1`) i sprawdzamy ją w pętli zewnętrznej, wywołując drugi `BREAK`.\n- **`CONTINUE`** — pomija resztę instrukcji w bieżącej iteracji i natychmiast przechodzi do sprawdzenia warunku / kolejnego kroku pętli (np. pomijanie liczb niepodzielnych przez `x`).',
    key_points: [
      'Różnica między `FOR` (znana liczba kroków) a `WHILE` (warunek wstępny, możliwa 0-krotna realizacja).',
      'Zasięg `BREAK` ograniczony wyłącznie do wewnętrznej pętli + wzorzec flagi do wyjścia z pętli zagnieżdżonych.',
      'Różnica między `BREAK` (koniec całej pętli) a `CONTINUE` (pomiń tylko resztę bieżącej iteracji).',
      'Konieczność modyfikacji zmiennej warunkowej wewnątrz `WHILE`, aby uniknąć pętli nieskończonej (por. błąd z brakiem `SET n = n+1` w metodzie złotego podziału na W6 sl. 34!).',
    ],
    common_mistakes:
      'Zakładanie, że pojedynczy `BREAK` przerywa obie zagnieżdżone pętle; zapominanie o wczytaniu pierwszej zmiennej przed `WHILE x != 0` lub brak inkrementacji licznika w `WHILE` (pętla nieskończona).',
    lab_connection:
      'Używane w praktycznie każdym algorytmie kursu: od sprawdzania symetrii macierzy i zmodyfikowanego sortowania bąbelkowego (flaga zamiany) po pętle zbieżności w metodach numerycznych.',
    svg_diagram_id: 'aisd-flowchart-control',
  },

  // Rozdział 2 (Zagadnienia 4–7)
  {
    id: 'aisd-q04',
    subject_id: 'aisd',
    number: 4,
    chapter_id: 'aisd-ch2',
    category: 'Rekurencja i złożoność',
    question: 'Rekurencja vs iteracja — przypadek bazowy, stos wywołań oraz przykłady (silnia, NWD, Fibonacci, wieże Hanoi)',
    short_answer:
      'Rekurencja polega na wywoływaniu funkcji przez samą siebie dla mniejszego podproblemu aż do warunku stopu (przypadku bazowego). Wymaga pamięci na stosie wywołań i bywa kosztowna przy powtarzających się podproblemach (Fibonacci $O(2^n)$ vs $O(n)$ iteracyjnie).',
    full_answer:
      '**Algorytm rekurencyjny** definiuje rozwiązanie problemu rozmiaru $n$ przez odwołanie do tego samego algorytmu dla mniejszych danych. Niezbędne są dwa składniki: **przypadek bazowy (warunek stopu)** oraz **krok rekurencyjny** zmniejszający problem w kierunku bazy.\n\n**Klasyczne przykłady z Wykładu 3:**\n1. **Silnia $n!$:** $0! = 1$, $n! = n \\cdot (n-1)!$. Zarówno rekurencja, jak i iteracja wykonują $n$ mnożeń ($O(n)$), ale rekurencja zużywa $O(n)$ pamięci na stos wywołań (uwaga na błąd na slajdzie W3 sl. 7 w wersji iteracyjnej: `SET f = f*a` zamiast `SET f = f*i`!).\n2. **NWD (algorytm Euklidesa):** $\\operatorname{NWD}(a,0)=a$, $\\operatorname{NWD}(a,b)=\\operatorname{NWD}(b,\\,a \\bmod b)$ — zbieżność $O(\\log \\min(a,b))$.\n3. **Ciąg Fibonacciego:** $F_0=0, F_1=1, F_n=F_{n-1}+F_{n-2}$. Naiwna rekurencja wielokrotnie liczy te same podproblemy i ma złożoność **wykładniczą** $O(\\varphi^n) \\approx O(1{,}618^n)$ (często szacowaną z góry jako $O(2^n)$), podczas gdy iteracja lub programowanie dynamiczne daje $O(n)$ czasowo i $O(1)$ pamięciowo!\n4. **Wieże Hanoi:** przeniesienie $n$ krążków wymaga rekurencyjnego przeniesienia $n-1$ krążków na słupek pomocniczy, przełożenia największego krążka i przeniesienia $n-1$ na docelowy: $T(n) = 2T(n-1)+1 \\implies T(n) = 2^n - 1 = \\Theta(2^n)$.',
    key_points: [
      'Dwa konieczne elementy poprawnej rekurencji: przypadek bazowy (stop) i krok redukujący rozmiar.',
      'Każde wywołanie rekurencyjne odkłada ramkę na **stosie wywołań** — grozi przepełnieniem stosu (*stack overflow*).',
      'Zasadnicza różnica dla Fibonacciego: drzewo wywołań rekurencyjnych ($\\Theta(\\varphi^n)$) vs wersja iteracyjna ($\\Theta(n)$).',
      'Wyprowadzenie wzoru na wieże Hanoi: $T(n)=2T(n-1)+1=2^n-1$.',
    ],
    common_mistakes:
      'Brak przypadku bazowego lub zły warunek stopu (np. dla $n < 0$); przekonanie, że rekurencja jest zawsze szybsza (jest często czytelniejsza, ale zwykle wolniejsza i bardziej pamięciożerna).',
    lab_connection:
      'Rekurencja stanowi fundament algorytmów *dziel i zwyciężaj* (Merge Sort, Quicksort, Binary Search) oraz wszystkich operacji na drzewach (DFS, BST, AVL).',
  },
  {
    id: 'aisd-q05',
    subject_id: 'aisd',
    number: 5,
    chapter_id: 'aisd-ch2',
    category: 'Rekurencja i złożoność',
    question: 'Model maszyny RAM, operacje dominujące oraz złożoność czasowa i pamięciowa (pesymistyczna, optymistyczna, oczekiwana)',
    short_answer:
      'Model RAM zakłada sekwencyjne wykonywanie instrukcji i jednostkowy koszt ($O(1)$) operacji elementarnych oraz dostępu do pamięci. Złożoność mierzymy liczbą operacji dominujących $T(n)$ i pamięcią $S(n)$ w przypadkach: pesymistycznym, optymistycznym i średnim (oczekiwanym).',
    full_answer:
      'Aby oceniać algorytmy niezależnie od sprzętu, języka i kompilatora, stosujemy abstrakcyjny **model maszyny RAM** (*Random Access Machine*, W3 sl. 12–16):\n- instrukcje wykonują się sekwencyjnie (jedna po drugiej, bez równoległości),\n- operacje elementarne (arytmetyczne, logiczne, porównania, przypisania, skoki) mają stały koszt jednostkowy,\n- dostęp do dowolnej komórki pamięci zajmuje czas stały $O(1)$.\n\n**Miary efektywności w funkcji rozmiaru danych wejściowych $n$:**\n- **Złożoność czasowa $T(n)$** — liczba operacji elementarnych (w praktyce zliczamy **operacje dominujące**, np. porównania kluczy w sortowaniu lub mnożenia w algorytmach macierzowych).\n- **Złożoność pamięciowa $S(n)$** — ilość pamięci roboczej (dodatkowej poza danymi wejściowymi, w tym stos wywołań rekurencyjnych).\n\n**Trzy reżimy analizy (W3 sl. 17–20):**\n1. **Pesymistyczna (worst-case)** $T_{\\max}(n) = \\max_{|x|=n} t(x)$ — gwarantowany górny limit czasu (najważniejsza w systemach krytycznych).\n2. **Optymistyczna (best-case)** $T_{\\min}(n) = \\min_{|x|=n} t(x)$ — najlepszy możliwy przypadek (np. $O(1)$ dla wyszukiwania liniowego na 1. pozycji, $O(n)$ dla zmodyfikowanego sortowania bąbelkowego na posortowanej tablicy).\n3. **Oczekiwana / średnia (average-case)** $T_{\\text{avg}}(n) = \\sum_{|x|=n} p(x)\\,t(x)$ — wartość oczekiwana przy założonym rozkładzie danych wejściowych.',
    key_points: [
      'Założenia modelu RAM: sekwencyjność, stały koszt operacji prostych i stały czas dostępu do pamięci.',
      'Dlaczego analiza teoretyczna $T(n)$ jest lepsza od pomiaru czasu stoperem (niezależność od CPU/OS/danych).',
      'Definicje i wzory dla przypadku pesymistycznego, optymistycznego i średniego (oczekiwanego).',
      'Rozróżnienie pamięci całkowitej i pamięci dodatkowej (*in-place* oznacza $O(1)$ lub $O(\\log n)$ stosu).',
    ],
    common_mistakes:
      'Utóżsamianie przypadku średniego ze średnią arytmetyczną przypadku optymistycznego i pesymistycznego (to jest błąd — liczymy wartość oczekiwaną ważoną prawdopodobieństwem $p(x)$!).',
    lab_connection:
      'Przy porównywaniu algorytmów sortowania i wyszukiwania zawsze podajemy wszystkie trzy przypadki ($T_{\\min}, T_{\\text{avg}}, T_{\\max}$) oraz złożoność pamięciową.',
    svg_diagram_id: 'aisd-complexity-growth',
  },
  {
    id: 'aisd-q06',
    subject_id: 'aisd',
    number: 6,
    chapter_id: 'aisd-ch2',
    category: 'Rekurencja i złożoność',
    question: 'Notacja asymptotyczna Big-O, Omega ($\\Omega$) i Theta ($\\Theta$) — definicje formalne, hierarchia klas i reguły upraszczania',
    short_answer:
      '$f(n)=O(g(n))$ to asymptotyczne ograniczenie górne ($\\le c\\cdot g(n)$), $f(n)=\\Omega(g(n))$ — dolne ($\\ge c\\cdot g(n)$), a $f(n)=\\Theta(g(n))$ — ciasne (jednocześnie $O$ i $\\Omega$). Pomijamy stałe multiplikatywne i wyrazy niższego rzędu.',
    full_answer:
      'Notacja asymptotyczna opisuje tempo wzrostu funkcji kosztu $f(n)$ dla dostatecznie dużych $n \\ge n_0$ (W3 sl. 21–27):\n- **Ograniczenie górne (Big-$O$):**\n$$f(n) = O(g(n)) \\iff \\exists\\, c > 0,\\; n_0 > 0 \\;\\forall\\, n \\ge n_0:\\; 0 \\le f(n) \\le c \\cdot g(n)$$\n- **Ograniczenie dolne ($\\Omega$):**\n$$f(n) = \\Omega(g(n)) \\iff \\exists\\, c > 0,\\; n_0 > 0 \\;\\forall\\, n \\ge n_0:\\; 0 \\le c \\cdot g(n) \\le f(n)$$\n- **Ograniczenie dokładne / ciasne ($\\Theta$):**\n$$f(n) = \\Theta(g(n)) \\iff \\exists\\, c_1, c_2 > 0,\\; n_0 > 0 \\;\\forall\\, n \\ge n_0:\\; 0 \\le c_1 g(n) \\le f(n) \\le c_2 g(n)$$\nRównoważnie $f(n) = \\Theta(g(n)) \\iff f(n) = O(g(n)) \\land f(n) = \\Omega(g(n))$.\n\n**Hierarchia klas złożoności (rosnąco):**\n$$O(1) \\prec O(\\log n) \\prec O(n) \\prec O(n\\log n) \\prec O(n^2) \\prec O(n^3) \\prec O(2^n) \\prec O(n!)$$\n\n**Reguły rachunkowe:**\n- Stałe multiplikatywne pomijamy: $O(k\\cdot g(n)) = O(g(n))$, a zmiana podstawy logarytmu to tylko stała ($\\log_a n = \\frac{\\log_b n}{\\log_b a}$).\n- Suma (sekwencja bloków): $O(f) + O(g) = O(\\max(f, g))$ — np. $3n^2 + 100n + 500 = \\Theta(n^2)$.\n- Iloczyn (pętle zagnieżdżone): $O(f) \\cdot O(g) = O(f\\cdot g)$.',
    key_points: [
      'Dokładne kwantyfikatory $\\exists c>0, n_0>0 \\;\\forall n \\ge n_0$ w definicjach $O, \\Omega, \\Theta$.',
      'Umiejętność dowodzenia np. $3n^2 + 5n + 2 = O(n^2)$ przez wskazanie konkretnych stałych ($c=10, n_0=1$).',
      'Kolejność 8 podstawowych klas złożoności od $O(1)$ do $O(n!)$ i przepaść między wielomianowymi a wykładniczymi.',
      'Notacja $O$ NIE oznacza „przypadku pesymistycznego” — można podać $O$ dla przypadku optymistycznego i $\\Omega$ dla pesymistycznego!',
    ],
    common_mistakes:
      'Mylenie $O$ z przypadkiem pesymistycznym i $\\Omega$ z optymistycznym! To są dwa niezależne wymiary: $O/\\Omega/\\Theta$ opisują charakter ograniczenia funkcji, a best/avg/worst określają, którą funkcję $T(n)$ badamy.',
    lab_connection:
      'Interaktywny wykres wzrostu krzywych w rozdziale 2 oraz porównanie faktycznej liczby operacji w Laboratorium AiSD.',
    svg_diagram_id: 'aisd-complexity-growth',
  },
  {
    id: 'aisd-q07',
    subject_id: 'aisd',
    number: 7,
    chapter_id: 'aisd-ch2',
    category: 'Rekurencja i złożoność',
    question: 'Wyznaczanie złożoności algorytmów iteracyjnych i rekurencyjnych (sumy arytmetyczne, drzewo rekurencji, twierdzenie o rekurencji uniwersalnej)',
    short_answer:
      'Pętle iteracyjne zliczamy sumami (np. $\\sum_{i=1}^{n-1} i = \\frac{n(n-1)}{2} = \\Theta(n^2)$). Równania rekurencyjne $T(n)=aT(n/b)+f(n)$ rozwiązujemy przez rozwijanie, drzewo rekurencji lub Master Theorem (porównując $f(n)$ z $n^{\\log_b a}$).',
    full_answer:
      '**Algorytmy iteracyjne:**\n- Pojedyncza pętla `1..n` z krokiem $+1$: $\\Theta(n)$.\n- Pętla z podwajaniem/połowieniem zmiennej (`i = i*2` lub `n = n/2`): $\\Theta(\\log n)$.\n- Dwie pętle zagnieżdżone `FOR i=1..n` i `FOR j=1..i`: liczba wykonań to $\\sum_{i=1}^n i = \\frac{n(n+1)}{2} = \\Theta(n^2)$.\n- Trzy pętle (mnożenie macierzy $n\\times n$): $\\Theta(n^3)$.\n\n**Algorytmy rekurencyjne — Twierdzenie o rekurencji uniwersalnej (*Master Theorem*):**\nDla równania $T(n) = a\\,T(n/b) + f(n)$ ($a \\ge 1, b > 1$) obliczamy wykładnik krytyczny $c_{\\text{kryt}} = \\log_b a$ i porównujemy $f(n)$ z $n^{\\log_b a}$:\n1. **Przypadek 1** (dominują liście): $f(n) = O(n^{\\log_b a - \\varepsilon}) \\implies T(n) = \\Theta(n^{\\log_b a})$.\n2. **Przypadek 2** (równowaga poziomów): $f(n) = \\Theta(n^{\\log_b a}) \\implies T(n) = \\Theta(n^{\\log_b a} \\log n)$.\n   - *Binary Search:* $T(n) = T(n/2) + O(1) \\implies a=1, b=2, n^0=1 \\implies \\Theta(\\log n)$.\n   - *Merge Sort:* $T(n) = 2T(n/2) + \\Theta(n) \\implies a=2, b=2, n^1=n \\implies \\Theta(n\\log n)$.\n3. **Przypadek 3** (dominuje korzeń): $f(n) = \\Omega(n^{\\log_b a + \\varepsilon})$ i warunek regularności $\\implies T(n) = \\Theta(f(n))$.\n\nGdy rozmiar zmniejsza się addytywnie (np. $T(n)=T(n-1)+n$ w pesymistycznym Quicksort lub $T(n)=2T(n-1)+1$ w Hanoi), stosujemy rozwijanie sumy lub indukcję: otrzymujemy odpowiednio $\\Theta(n^2)$ i $\\Theta(2^n)$.',
    key_points: [
      'Wzór Gaussa $\\sum_{i=1}^{n-1} i = \\frac{n(n-1)}{2} = \\Theta(n^2)$ dla trójkątnych pętli zagnieżdżonych.',
      'Umiejętność zapisania i rozwiązania równania dla Binary Search ($T(n)=T(n/2)+c$) i Merge Sort ($T(n)=2T(n/2)+cn$).',
      'Trzy przypadki Master Theorem i rola wykładnika krytycznego $n^{\\log_b a}$.',
      'Rozróżnienie redukcji dzielącej ($n/2 \\to \\log n$ poziomów) od odejmującej ($n-1 \\to n$ poziomów).',
    ],
    common_mistakes:
      'Stosowanie Master Theorem do równań typu $T(n)=2T(n-1)+1$ (Master Theorem wymaga dzielenia $n/b$, nie odejmowania $n-1$!).',
    lab_connection:
      'Bezpośrednie narzędzie do uzasadniania złożoności wyszukiwania binarnego, Merge Sorta, Quicksorta oraz wysokości drzew binarnych.',
    svg_diagram_id: 'aisd-complexity-growth',
  },

  // Rozdział 3 (Zagadnienia 8–11)
  {
    id: 'aisd-q08',
    subject_id: 'aisd',
    number: 8,
    chapter_id: 'aisd-ch3',
    category: 'Struktury liniowe',
    question: 'Formalna definicja struktury danych $S = (D, R, e)$ oraz klasyfikacja struktur danych',
    short_answer:
      'Struktura danych to trójka $S = (D, R, e)$, gdzie $D$ to zbiór węzłów $d_i=(n_i, w_i)$ (nazwa i wartość), $R=\\{r_{\\text{we}}, N\\}$ to relacje dostępu i następstwa, a $e$ to element wejściowy. Struktury dzielimy m.in. na statyczne/dynamiczne oraz liniowe/nieliniowe.',
    full_answer:
      'Według Wykładu 4 (sl. 3–7) **strukturę danych** definiujemy formalnie jako uporządkowaną trójkę:\n$$S = (D, R, e)$$\ngdzie:\n- $D = \\{d_1, d_2, \\dots, d_k\\}$ — skończony zbiór **węzłów (elementów)**, przy czym każdy węzeł jest parą $d_i = (n_i, w_i)$ składającą się z identyfikatora (nazwy/adresu) $n_i$ i wartości $w_i$,\n- $R = \\{r_{\\text{we}}, N\\}$ — rodzina relacji określająca sposób dotarcia do danych: $r_{\\text{we}}$ wskazuje dostęp do elementu wejściowego, a relacja następstwa $N \\subset D \\times D$ definiuje powiązania między węzłami,\n- $e \\in D$ — wyróżniony **węzeł wejściowy** (np. początek tablicy, głowa listy `head`, korzeń drzewa `root`).\n\n**Główne kryteria podziału struktur danych:**\n1. **Rozmiar w czasie działania:** *statyczne* (stały rozmiar i ciągły blok pamięci, np. tablica klasyczna) vs *dynamiczne* (rozmiar zmienia się podczas działania programu, np. listy powiązane, drzewa).\n2. **Topologia relacji następstwa $N$:** *liniowe* (każdy element ma co najwyżej jednego poprzednika i jednego następnika: tablice, listy, stosy, kolejki) vs *nieliniowe* (hierarchiczne drzewa, kopce oraz grafy o dowolnych połączeniach).\n3. **Dostęp:** *swobodny (bezpośredni)* $O(1)$ po indeksie vs *sekwencyjny* $O(n)$ przez przechodzenie wskaźników.',
    key_points: [
      'Dokładny zapis trójki $S = (D, R, e)$, węzła $d_i=(n_i, w_i)$ i relacji $R = \\{r_{\\text{we}}, N\\}$.',
      'Różnica między strukturą statyczną (ciągła pamięć, brak narzutu wskaźników, trudna zmiana rozmiaru) a dynamiczną.',
      'Cechy struktury liniowej (unikalny poprzednik/następnik) w opozycji do drzew (1 rodzic, wielu potomków) i grafów.',
    ],
    common_mistakes:
      'Pomijanie elementu wejściowego $e$ lub mylenie pojęcia abstrakcyjnego typu danych (ADT, np. stos/kolejka) z jego fizyczną implementacją (tablicową lub listową).',
    lab_connection:
      'Wybór właściwej struktury danych determinuje złożoność operacji: ten sam problem może wymagać $O(n)$ na liście i $O(1)$ w tablicy mieszającej lub $O(\\log n)$ w drzewie AVL.',
    svg_diagram_id: 'aisd-linear-structures',
  },
  {
    id: 'aisd-q09',
    subject_id: 'aisd',
    number: 9,
    chapter_id: 'aisd-ch3',
    category: 'Struktury liniowe',
    question: 'Tablice (1D i 2D), wyszukiwanie liniowe vs binarne oraz algorytmy macierzowe (symetria, mnożenie macierzy)',
    short_answer:
      'Tablica daje dostęp swobodny w $O(1)$ przez adresowanie bazowe, ale wstawianie/usuwanie w środku kosztuje $O(n)$. Wyszukiwanie liniowe trwa $O(n)$, a binarne na tablicy posortowanej $O(\\log n)$. Mnożenie macierzy $n\\times n$ ma złożoność $\\Theta(n^3)$.',
    full_answer:
      '**Tablica** przechowuje elementy jednego typu w ciągłym obszarze pamięci, co umożliwia dostęp w czasie stałym $O(1)$ pod adresem $\\text{base} + i \\cdot \\text{sizeof}(T)$. Wstawienie lub usunięcie elementu w środku wymaga jednak przesunięcia pozostałych elementów — koszt $O(n)$.\n\n**Wyszukiwanie w tablicy (W4 sl. 12–16):**\n- **Liniowe (sekwencyjne):** działa na dowolnej tablicy; $T_{\\min}=O(1)$, $T_{\\text{avg}}=\\frac{n+1}{2}=O(n)$, $T_{\\max}=O(n)$.\n- **Binarne (*Binary Search*):** wymaga **posortowanej** tablicy! W każdym kroku bada element środkowy $m = \\lfloor (l+r)/2 \\rfloor$ i odrzuca połowę przedziału: $T(n) = T(n/2)+O(1) \\implies O(\\log_2 n)$.\n\n**Algorytmy na tablicach 2D (macierzach, W4 sl. 20–24):**\n- **Test symetrii macierzy $A$ ($n\\times n$):** wystarczy sprawdzić górny trójkąt `FOR i=0..n-2`, `FOR j=i+1..n-1`: jeśli `A[i,j] != A[j,i]`, ustaw flagę i przerwij **obie** pętle ($\\frac{n(n-1)}{2}$ porównań $\\implies O(n^2)$).\n- **Mnożenie macierzy $C = A \\cdot B$ ($m\\times k$ i $k\\times p$):** 3 zagnieżdżone pętle `i, j, s`: $C[i,j] = \\sum_{s=0}^{k-1} A[i,s]\\cdot B[s,j]$, złożoność $\\Theta(m\\cdot p\\cdot k)$ (dla kwadratowych $\\Theta(n^3)$). **Uwaga na błąd ze slajdu W4 sl. 24:** wydrukowano `C[j, i]` zamiast poprawnego `C[i, j]`!',
    key_points: [
      'Tablica: dostęp $O(1)$, wstawianie/usuwanie w środku $O(n)$.',
      'Warunek wstępny wyszukiwania binarnego: tablica **musi być posortowana**!',
      'Optymalizacja testu symetrii macierzy: sprawdzanie tylko dla $j > i$ (połowa operacji) + flaga do wyjścia z dwóch pętli.',
      'Poprawny indeks wyniku mnożenia macierzy to `C[i, j]`, a nie `C[j, i]` (błąd ze slajdu W4 sl. 24).',
    ],
    common_mistakes:
      'Stosowanie wyszukiwania binarnego na nieposortowanej tablicy; pętla nieskończona w Binary Search przy błędnej aktualizacji granic (`l = m` zamiast `l = m + 1` i `r = m - 1`).',
    lab_connection:
      'Możesz przetestować krok po kroku działanie wyszukiwania binarnego w Laboratorium AiSD (Zakładka 1).',
    svg_diagram_id: 'aisd-linear-structures',
  },
  {
    id: 'aisd-q10',
    subject_id: 'aisd',
    number: 10,
    chapter_id: 'aisd-ch3',
    category: 'Struktury liniowe',
    question: 'Listy jednokierunkowe, dwukierunkowe i cykliczne — budowa węzła, wstawianie, usuwanie i porównanie z tablicami',
    short_answer:
      'Lista przechowuje węzły dynamicznie połączone wskaźnikami (`next`, w dwukierunkowej także `prev`). Wstawianie i usuwanie w znanym miejscu trwa $O(1)$ (przepięcie wskaźników), ale dostęp do $k$-tego elementu wymaga przejścia od głowy w $O(n)$.',
    full_answer:
      '**Lista powiązana** to dynamiczna struktura liniowa, w której każdy węzeł przechowuje wartość oraz referencje do sąsiadów (W4 sl. 25–30):\n- **Jednokierunkowa (SLL):** węzeł `(value, next)`, wskaźnik wejściowy `head` (koniec oznacza `NULL`). Wstawienie na początku to $O(1)$, wstawienie/usunięcie po znanym węźle `p` to $O(1)$ (ale usunięcie samego `p` wymaga znajomości poprzednika!).\n- **Dwukierunkowa (DLL):** węzeł `(prev, value, next)` + często `head` i `tail`. Umożliwia przeglądanie w obu kierunkach i usuwanie węzła `p` w $O(1)$ bez szukania poprzednika, kosztem dodatkowego wskaźnika i aktualizacji 4 łączy przy modyfikacji.\n- **Cykliczna:** `next` ostatniego węzła wskazuje z powrotem na `head` (brak `NULL` — warunek zakończenia pętli to powrót do `head`).\n\n**Kolejność przepinania wskaźników przy wstawianiu `nowy` po `p`:**\n1. Najpierw `nowy.next = p.next`,\n2. Dopiero potem `p.next = nowy`.\nOdwrotna kolejność zrywa łańcuch i powoduje wyciek pozostałej części listy!\n\n**Porównanie z tablicą:** tablica wygrywa dostępem swobodnym $O(1)$ i lokalnością pamięci cache; lista wygrywa dynamicznym rozmiarem i modyfikacjami w $O(1)$ przy znanym wskaźniku.',
    key_points: [
      'Prawidłowa kolejność przepinania wskaźników przy wstawianiu (najpierw podpięcie ogona do nowego węzła, potem przepięcie poprzednika).',
      'Złożoność dostępu do $k$-tego elementu: $O(n)$ (brak wyszukiwania binarnego w $O(\\log n)$!).',
      'Różnice SLL vs DLL vs lista cykliczna (dodatkowy koszt pamięci vs dwukierunkowość i usuwanie w $O(1)$).',
    ],
    common_mistakes:
      'Nadpisanie `p.next = nowy` przed zachowaniem starego `p.next` (utrata reszty listy); twierdzenie, że na posortowanej liście jednokierunkowej można wykonać Binary Search w $O(\\log n)$ (nie można — dojście do środka trwa $O(n)$!).',
    lab_connection:
      'Listy jednokierunkowe są bezpośrednio używane w tablicach rozproszonych do rozwiązywania kolizji metodą łańcuchowania (Rozdział 5).',
    svg_diagram_id: 'aisd-linear-structures',
  },
  {
    id: 'aisd-q11',
    subject_id: 'aisd',
    number: 11,
    chapter_id: 'aisd-ch3',
    category: 'Struktury liniowe',
    question: 'Stos (LIFO), kolejka (FIFO), kolejka cykliczna i kolejka priorytetowa — definicje, realizacja i zastosowania',
    short_answer:
      'Stos (LIFO) udostępnia `push`/`pop`/`top` w $O(1)$ na jednym końcu; kolejka (FIFO) udostępnia `enqueue`/`dequeue` w $O(1)$ na przeciwległych końcach. Kolejka cykliczna zapobiega marnowaniu pamięci tablicy przez arytmetykę modulo, a kolejkę priorytetową realizuje się kopcem ($O(\\log n)$).',
    full_answer:
      '**1. Stos (LIFO — *Last In, First Out*, W4 sl. 31–33):**\nDostęp tylko przez wierzchołek (`top`). Operacje: `push(x)` (odłożenie), `pop()` (zdjęcie), `peek/top()` (podgląd), `isEmpty()`. Wszystkie w czasie **$O(1)$** (w implementacji tablicowej ze wskaźnikiem `top` lub na początku listy jednokierunkowej). Zastosowania: stos wywołań rekurencyjnych, sprawdzanie nawiasów, obliczanie ONP, cofanie (Undo), DFS.\n\n**2. Kolejka (FIFO — *First In, First Out*, W4 sl. 34–36):**\nDodawanie na końcu (`enqueue` przy `tail/rear`), pobieranie z początku (`dequeue` przy `head/front`) — obie w **$O(1)$**. W naiwnej implementacji tablicowej przesuwanie `head` pozostawia puste miejsca z przodu; rozwiązaniem jest **kolejka cykliczna (bufor pierścieniowy)** z indeksami modulo $N$: `tail = (tail + 1) % N`, `head = (head + 1) % N`. Zastosowania: bufory sieciowe/drukarki, planowanie procesów, przeszukiwanie wszerz (BFS).\n\n**3. Kolejka priorytetowa:**\nKażdy element ma priorytet; `extractMax`/`extractMin` zwraca element o najwyższym priorytecie (niezależnie od kolejności przybycia). Efektywna realizacja to **kopiec binarny** (Rozdział 6): `insert` i `extractMax` w **$O(\\log n)$**, podgląd maksimum w $O(1)$.',
    key_points: [
      'Zasada LIFO (stos) vs FIFO (kolejka) oraz złożoność $O(1)$ operacji podstawowych.',
      'Problem przepełnienia pozornego w tablicowej kolejce FIFO i jego rozwiązanie przez bufor cykliczny `(idx + 1) % N`.',
      'Realizacja kolejki na liście wymaga utrzymywania obu wskaźników: `head` i `tail` (aby `enqueue` było w $O(1)$).',
      'Kolejka priorytetowa: tablica nieposortowana ($O(1)$ wstaw / $O(n)$ wyjmij) vs kopiec ($O(\\log n)$ / $O(\\log n)$).',
    ],
    common_mistakes:
      'Mylenie kolejności wyjścia LIFO z FIFO; brak kontroli stanów brzegowych *stack overflow / underflow* oraz mylenie kolejki cyklicznej z listą cykliczną.',
    lab_connection:
      'Stos odpowiada za rekurencję i DFS, kolejka za BFS, a kolejka priorytetowa bezpośrednio prowadzi do kopca binarnego i Heapsorta.',
    svg_diagram_id: 'aisd-linear-structures',
  },

  // Rozdział 4 (Zagadnienia 12–15)
  {
    id: 'aisd-q12',
    subject_id: 'aisd',
    number: 12,
    chapter_id: 'aisd-ch4',
    category: 'Sortowanie',
    question: 'Klasyfikacja algorytmów sortowania (stabilność, w miejscu, adaptacyjność) i dolne ograniczenie $\\Omega(n\\log n)$ dla sortowania przez porównania',
    short_answer:
      'Algorytmy sortowania oceniamy wg złożoności, stabilności (zachowania kolejności równych kluczy), działania w miejscu ($O(1)$ dodatkowej pamięci) i adaptacyjności. Każdy algorytm oparty wyłącznie na porównaniach wymaga pesymistycznie $\\Omega(n\\log n)$ porównań.',
    full_answer:
      '**Kluczowe własności algorytmów sortowania (W4 sl. 37–39):**\n- **Stabilność:** elementy o równych kluczach zachowują po sortowaniu swoją względną kolejność z wejścia (stabilne: Insertion, Bubble, Merge, Counting; niestabilne w standardowej wersji: Selection, Shell, Quicksort, Heapsort). Ważne przy wielokryterialnym sortowaniu (np. najpierw po imieniu, potem po nazwisku).\n- **Sortowanie w miejscu (*in-place*):** wykorzystuje jedynie stałą $O(1)$ (lub $O(\\log n)$ stosu dla Quicksort) pamięć dodatkową — nie kopiuje całej tablicy (w przeciwieństwie do Merge Sort wymagającego $O(n)$).\n- **Adaptacyjność (naturalność):** przyspiesza dla danych częściowo posortowanych (np. Insertion Sort i zmodyfikowany Bubble Sort osiągają $O(n)$ dla tablicy już posortowanej).\n- **Wewnętrzne vs zewnętrzne:** mieszczące się w pamięci RAM vs wymagające pamięci masowej (tam dominuje wielofazowe scalanie).\n\n**Dolne ograniczenie $\\Omega(n\\log n)$ (drzewo decyzyjne):**\nDla $n$ różnych elementów istnieje $n!$ możliwych permutacji wejściowych. Każde porównanie ma 2 wyniki (drzewo binarne), więc drzewo decyzyjne musi mieć co najmniej $n!$ liści. Jego wysokość $h$ spełnia $2^h \\ge n!$, skąd ze wzoru Stirlinga ($\\log_2(n!) = \\Theta(n\\log n)$) wynika $h = \\Omega(n\\log n)$. Barierę tę można złamać tylko bez porównań (np. Counting/Radix Sort dla ograniczonych kluczy całkowitych).',
    key_points: [
      'Precyzyjna definicja stabilności wraz z kontrprzykładem dla Selection Sorta (np. `[2a, 2b, 1]` zamienia `2a` z `1` $\\to$ `[1, 2b, 2a]`).',
      'Które algorytmy są stabilne (Bubble, Insertion, Merge), a które w miejscu (Selection, Insertion, Bubble, Heapsort, Quicksort).',
      'Dowód dolnego ograniczenia $\\Omega(n\\log n)$ z liczby permutacji $n!$ i wysokości drzewa binarnego $h \\ge \\log_2(n!)$.',
    ],
    common_mistakes:
      'Uznawanie Selection Sorta lub Heapsorta za stabilne (długodystansowe zamiany naruszają kolejność równych elementów!); twierdzenie, że Merge Sort działa w miejscu.',
    lab_connection:
      'Kompletna tablica porównawcza wszystkich algorytmów sortowania znajduje się w Słowniku i tablicach złożoności AiSD.',
    svg_diagram_id: 'aisd-sorting-steps',
  },
  {
    id: 'aisd-q13',
    subject_id: 'aisd',
    number: 13,
    chapter_id: 'aisd-ch4',
    category: 'Sortowanie',
    question: 'Proste algorytmy sortowania $O(n^2)$: Selection Sort, Insertion Sort, Bubble Sort (klasyczny i zmodyfikowany) oraz Shell Sort',
    short_answer:
      'Selection Sort zawsze wykonuje $\\frac{n(n-1)}{2}$ porównań ($\\Theta(n^2)$), ale tylko $O(n)$ zamian. Insertion Sort i zmodyfikowany Bubble Sort (z flagą) osiągają $O(n)$ dla danych posortowanych. Shell Sort przyspiesza Insertion Sort przez malejące przyrosty $h_k$.',
    full_answer:
      'Cztery klasyczne metody z Wykładu 4 (sl. 40–47), ilustrowane na ciągu `[4, 2, 5, 6, 1]`:\n1. **Sortowanie przez wybieranie (*Selection Sort*):** w $i$-tym kroku szuka minimum w podtablicy `A[i..n-1]` i zamienia je z `A[i]`. Zawsze wykonuje $\\frac{n(n-1)}{2} = \\Theta(n^2)$ porównań (nieadaptacyjny!), ale maksymalnie $n-1 = O(n)$ zamian. W miejscu, niestabilny.\n2. **Sortowanie przez wstawianie (*Insertion Sort*):** utrzymuje posortowany prefiks `A[0..i-1]` i wstawia `key = A[i]` na właściwe miejsce przez przesuwanie większych elementów w prawo. Optymistycznie **$O(n)$** (tablica posortowana), średnio i pesymistycznie $O(n^2)$. Stabilny, w miejscu, doskonały dla małych lub prawie posortowanych zbiorów.\n3. **Sortowanie bąbelkowe (*Bubble Sort*):** w kolejnych przebiegach porównuje sąsiadów `A[j]` i `A[j+1]` i zamienia przy inwersji; po $k$-tym przebiegu $k$ największych elementów jest na końcu. Wersja klasyczna to zawsze $\\Theta(n^2)$; **wersja zmodyfikowana z flagą `swapped`** przerywa natychmiast po przebiegu bez żadnej zamiany, osiągając $T_{\\min} = O(n)$. Stabilny, w miejscu.\n4. **Sortowanie Shella (*Shell Sort*):** uogólnienie Insertion Sort wykonujące wstawianie co krok (przyrost) $h_k$ malejący do $1$ (np. $n/2, n/4, \\dots, 1$ lub ciąg Knutha $3h+1$). Redukuje dalekie inwersje, osiągając w praktyce ok. $O(n^{1{,}25})$–$O(n^{1{,}5})$ (zależnie od ciągu kroków). W miejscu, niestabilny.',
    key_points: [
      'Umiejętność ręcznego rozpisania stanu tablicy `[4, 2, 5, 6, 1]` po każdej iteracji zewnętrznej dla wszystkich trzech metod $O(n^2)$.',
      'Liczba porównań $\\frac{n(n-1)}{2}$ i liczba zamian: Selection ($\\le n-1$) vs Bubble/Insertion ($O(n^2)$ pesymistycznie).',
      'Rola flagi w zmodyfikowanym Bubble Sort — obniża przypadek optymistyczny z $\\Theta(n^2)$ do $\\Theta(n)$.',
      'Zależność złożoności Shell Sorta od wybranego ciągu przyrostów $h_k$ (końcowy krok musi wynosić $h=1$).',
    ],
    common_mistakes:
      'Mylenie przebiegu Selection Sorta z Bubble Sortem na egzaminie; przypisywanie klasycznemu Bubble Sortowi $O(n)$ optymistycznie bez flagi wczesnego zakończenia.',
    lab_connection:
      'Wszystkie cztery algorytmy można uruchomić krok po kroku na ciągu wykładowym `[4, 2, 5, 6, 1]` w Laboratorium AiSD.',
    svg_diagram_id: 'aisd-sorting-steps',
  },
  {
    id: 'aisd-q14',
    subject_id: 'aisd',
    number: 14,
    chapter_id: 'aisd-ch4',
    category: 'Sortowanie',
    question: 'Sortowanie przez scalanie (Merge Sort) — wariant rekurencyjny i iteracyjny, analiza złożoności oraz pułapka ze środkiem podtablicy',
    short_answer:
      'Merge Sort dzieli tablicę na połowy, sortuje je rekurencyjnie i scala dwie posortowane podtablice w czasie $O(n)$. Gwarantuje $\\Theta(n\\log n)$ w każdym przypadku i jest stabilny, lecz wymaga $O(n)$ pamięci dodatkowej.',
    full_answer:
      '**Merge Sort** (W4 sl. 48–51) realizuje paradygmat *dziel i zwyciężaj*:\n1. **Dziel:** podziel tablicę $n$-elementową na dwie połowy o rozmiarach $\\lfloor n/2 \\rfloor$ i $\\lceil n/2 \\rceil$.\n2. **Zwyciężaj:** posortuj obie połówki rekurencyjnie (przypadek bazowy: podtablica 1-elementowa jest już posortowana).\n3. **Scalaj (`Merge`):** połącz dwie posortowane podtablice do tablicy pomocniczej `B`, przesuwając dwa indeksy `i` oraz `j` i pobierając mniejszy element (przy równości bierzemy z lewej części `<=`, co zapewnia **stabilność**).\n\n**Złożoność:** $T(n) = 2T(n/2) + \\Theta(n) \\implies \\mathbf{\\Theta(n\\log n)}$ zawsze (optymistycznie, średnio i pesymistycznie!). Złożoność pamięciowa: **$O(n)$** (tablica pomocnicza do scalania + $O(\\log n)$ stosu w wersji rekurencyjnej).\n\n**Wariant iteracyjny (bottom-up) i błąd ze slajdu W4 sl. 50:**\nW wersji iteracyjnej scalamy kolejno bloki rozmiaru `rozmiar = 1, 2, 4, 8, ...` bez rekurencji. Na slajdzie W4 sl. 50 wyznaczono środek jako `s = (pocz + koniec) / 2` — jest to **błąd dla $n$ niebędącego potęgą dwójki**, gdy ostatni prawy blok jest krótszy niż `rozmiar`! Poprawny punkt podziału to `s = pocz + rozmiar - 1` (przy warunku `s < koniec`).',
    key_points: [
      'Równanie rekurencyjne $T(n)=2T(n/2)+\\Theta(n) \\implies \\Theta(n\\log n)$ niezależnie od ułożenia danych.',
      'Warunek stabilności: `IF L[i] <= R[j]` (nierówność słaba `<=` zachowuje lewy element przed prawym).',
      'Koszt pamięci dodatkowej $O(n)$ — główna wada względem Heapsorta i Quicksorta.',
      'Błąd na slajdzie W4 sl. 50 w iteracyjnym Merge Sort: `s = pocz + rozmiar - 1`, nie `(pocz+koniec)/2`.',
    ],
    common_mistakes:
      'Zastosowanie ostrego znaku `<` zamiast `<=` w procedurze `Merge` (psuje stabilność); zapominanie o przepisaniu pozostałego ogona lewej lub prawej podtablicy po wyczerpaniu drugiej.',
    lab_connection:
      'Wizualizacja podziału i scalania tablicy `[4, 2, 1, 5, 6, 3, 8, 4]` dostępna w Laboratorium AiSD.',
    svg_diagram_id: 'aisd-sorting-steps',
  },
  {
    id: 'aisd-q15',
    subject_id: 'aisd',
    number: 15,
    chapter_id: 'aisd-ch4',
    category: 'Sortowanie',
    question: 'Sortowanie szybkie (Quicksort) — podział względem pivota, przypadek średni vs pesymistyczny oraz sortowanie w czasie liniowym',
    short_answer:
      'Quicksort wybiera element osiowy (pivot), dzieli tablicę w $O(n)$ na elementy $\\le$ i $>$ od pivota, po czym rekurencyjnie sortuje obie części. Działa w miejscu w $O(n\\log n)$ średnio, lecz dla skrajnego pivota degraduje się do $O(n^2)$.',
    full_answer:
      '**Quicksort (C.A.R. Hoare, W4 sl. 52–55):**\n1. Wybierz element osiowy (**pivot**, np. pierwszy, ostatni, środkowy, losowy lub medianę z trzech).\n2. **Partycjonowanie (`Partition`)** w czasie $\\Theta(n)$: przestaw elementy w miejscu tak, by wszystkie mniejsze/równe od pivota znalazły się po lewej, a większe po prawej (schemat Lomuto z jednym skanem lub dwuwskaźnikowy schemat Hoare’a).\n3. Rekurencyjnie wywołaj Quicksort dla lewej i prawej podtablicy.\n\n**Złożoność:**\n- **Optymistyczna i średnia:** podziały w przybliżeniu równe ($T(n)=2T(n/2)+\\Theta(n)$) $\\implies \\mathbf{\\Theta(n\\log n)}$; w praktyce najszybszy ogólny algorytm dzięki świetnej lokalności pamięci podręcznej (cache) i małym stałym.\n- **Pesymistyczna:** gdy pivot jest zawsze minimum lub maksimum (np. tablica już posortowana przy wyborze pierwszego/ostatniego pivota!) — podział $0$ i $n-1$: $T(n)=T(n-1)+\\Theta(n) \\implies \\mathbf{\\Theta(n^2)}$ i stos $O(n)$.\n- **Ochrona przed $O(n^2)$:** losowy wybór pivota lub *mediana z trzech* (`first, mid, last`). W miejscu (stos $O(\\log n)$ średnio), niestabilny.\n\n**Sortowanie w czasie liniowym (bez porównań):** przy dodatkowych założeniach o kluczach — **Counting Sort** $O(n+k)$ dla całkowitych z zakresu $0..k$, **Bucket Sort** $O(n)$ średnio dla rozkładu jednostajnego oraz **Radix Sort** $O(d(n+b))$ dla kluczy $d$-cyfrowych.',
    key_points: [
      'Przebieg partycjonowania względem pivota (umiejętność rozpisania kroku podziału na egzaminie).',
      'Dlaczego dla już posortowanej tablicy naiwny Quicksort ma złożoność $\\Theta(n^2)$ (i jak temu zapobiec: losowy pivot / mediana z 3).',
      'Porównanie Quicksort vs Merge Sort vs Heapsort (pamięć, przypadek pesymistyczny, stabilność, wydajność praktyczna).',
      'Dlaczego Counting/Radix Sort nie łamią twierdzenia $\\Omega(n\\log n)$ (nie używają porównań par elementów!).',
    ],
    common_mistakes:
      'Twierdzenie, że Quicksort ma zawsze $O(n\\log n)$ lub że jest stabilny; pomijanie pamięci na stos wywołań ($O(\\log n)$ średnio, $O(n)$ pesymistycznie).',
    lab_connection:
      'Krokowa wizualizacja wyboru pivota i podziałów Quicksort w Laboratorium AiSD (Zakładka 1).',
    svg_diagram_id: 'aisd-sorting-steps',
  },

  // Rozdział 5 (Zagadnienia 16–18)
  {
    id: 'aisd-q16',
    subject_id: 'aisd',
    number: 16,
    chapter_id: 'aisd-ch5',
    category: 'Tablice rozproszone',
    question: 'Tablica rozproszona (mieszająca) $T = (K, D, h)$, współczynnik zapełnienia $\\alpha$ i istota zjawiska kolizji',
    short_answer:
      'Tablica rozproszona $T=(K,D,h)$ odwzorowuje klucze ze zbioru $K$ na indeksy tablicy $D$ rozmiaru $N$ funkcją haszującą $h: K \\to \\{0,\\dots,N-1\\}$, zapewniając średni czas $O(1)$. Współczynnik zapełnienia $\\alpha = W/N$ steruje częstością kolizji ($h(k_1)=h(k_2)$ dla $k_1 \\neq k_2$).',
    full_answer:
      '**Formalna definicja (W5 sl. 4–6):**\nTablicę rozproszoną (haszującą) definiujemy jako trójkę:\n$$T = (K, D, h)$$\ngdzie $K$ to uniwersum kluczy (zwykle znacznie większe niż rozmiar tablicy, $|K| \\gg N$), $D$ to tablica kubełków (komórek) o rozmiarze $N$, a $h: K \\to \\{0, 1, \\dots, N-1\\}$ to **funkcja haszująca (mieszająca)**.\n\n**Współczynnik zapełnienia (load factor):**\n$$\\alpha = \\frac{W}{N}$$\ngdzie $W$ to liczba aktualnie zapisanych wpisów, a $N$ to liczba komórek tablicy.\n- Przy **łańcuchowaniu** $\\alpha$ może przekraczać $1$ (oznacza średnią długość łańcucha).\n- Przy **adresowaniu otwartym** zawsze musi zachodzić $\\alpha \\le 1$ (w praktyce rehaszujemy tablicę do większego $N$, gdy $\\alpha > 0{,}7$–$0{,}75$).\n\n**Kolizja** zachodzi, gdy dla dwóch różnych kluczy $k_1 \\neq k_2$ otrzymamy ten sam indeks: $h(k_1) = h(k_2)$. Z zasady szufladkowej Dirichleta (oraz paradoksu urodzin!) kolizje są nieuniknione przy $|K| > N$, dlatego każda tablica rozproszona wymaga zarówno dobrej funkcji $h$, jak i strategii rozwiązywania kolizji. Średni czas wyszukiwania/wstawiania/usuwania wynosi $O(1)$, lecz pesymistycznie (wszystkie klucze w 1 kubełku) degraduje się do $O(W)$.',
    key_points: [
      'Definicja $T=(K,D,h)$ i wzór na współczynnik zapełnienia $\\alpha = W/N$.',
      'Złożoność średnia $O(1)$ vs pesymistyczna $O(n)$ (wszystkie klucze w kolizji).',
      'Różnica dopuszczalnych wartości $\\alpha$ dla łańcuchowania ($\\alpha$ dowolne) i adresowania otwartego ($\\alpha < 1$).',
      'Dlaczego rozmiar tablicy dobieramy z zapasem i wykonujemy **rehaszowanie** przy wzroście $\\alpha$.',
    ],
    common_mistakes:
      'Mylenie $W$ i $N$ we wzorze $\\alpha = W/N$; przekonanie, że dobra funkcja haszująca całkowicie eliminuje kolizje (może je jedynie równomiernie rozłożyć).',
    lab_connection:
      'Symulator tablicy rozproszonej w Laboratorium AiSD (Zakładka 2) na żywo wylicza $\\alpha$ i zlicza kolizje.',
    svg_diagram_id: 'aisd-hash-table',
  },
  {
    id: 'aisd-q17',
    subject_id: 'aisd',
    number: 17,
    chapter_id: 'aisd-ch5',
    category: 'Tablice rozproszone',
    question: 'Konstrukcja funkcji haszujących: metoda dzielenia, metoda mnożenia Knutha, konwersja napisów (radix-128) i cechy dobrej funkcji',
    short_answer:
      'Dobra funkcja $h(k)$ jest szybka, deterministyczna i równomiernie rozkłada klucze. Najczęstsze to metoda dzielenia $h(k)=k \\bmod N$ ($N$ pierwsze, dalekie od $2^p$) oraz mnożenia Knutha $h(k)=\\lfloor N\\,(kA \\bmod 1)\\rfloor$ z $A=\\frac{\\sqrt{5}-1}{2}$.',
    full_answer:
      '**Wymagania wobec dobrej funkcji haszującej (W5 sl. 7–10):**\n1. Szybka do obliczenia ($O(1)$),\n2. Deterministyczna (ten sam klucz zawsze daje ten sam indeks),\n3. Równomierne rozproszenie (minimalizacja skupisk / kolizji, założenie haszowania prostego jednostajnego),\n4. Wykorzystanie wszystkich bitów / znaków klucza.\n\n**1. Konwersja klucza tekstowego na liczbę (system pozycyjny radix-128, W5 sl. 8):**\nKażdy znak ASCII kodujemy jako cyfrę w systemie o podstawie $128$:\n$$k(\\text{\"abc\"}) = 97 \\cdot 128^2 + 98 \\cdot 128^1 + 99 \\cdot 128^0 = 1\\,589\\,248 + 12\\,544 + 99 = 1\\,601\\,891$$\n(Zwykle liczone schematem Hornera z bieżącym `mod N`, aby uniknąć przepełnienia całkowitego.)\n\n**2. Metoda dzielenia (reszty):**\n$$h(k) = k \\bmod N$$\nWybór $N$: należy **unikać** potęg dwójki $N=2^p$ (wtedy $h(k)$ zależy wyłącznie od $p$ najmłodszych bitów!) oraz małych dzielników wspólnych ze strukturą kluczy. Najlepiej wybrać **$N$ jako liczbę pierwszą** oddaloną od potęg $2^p$.\n\n**3. Metoda mnożenia (Knuth):**\n$$h(k) = \\lfloor N \\cdot (kA - \\lfloor kA \\rfloor) \\rfloor = \\lfloor N \\cdot (kA \\bmod 1) \\rfloor$$\ngdzie stała $A \\in (0,1)$, wg Knutha optymalnie $A = \\frac{\\sqrt{5}-1}{2} \\approx 0{,}6180339887$ (złoty podział). Zaleta: wartość $N$ nie jest krytyczna (może być nawet potęgą dwójki $N=2^p$).',
    key_points: [
      'Wzór i dobór $N$ w metodzie dzielenia ($N$ pierwsze, nie $2^p$ ani $10^p$).',
      'Wzór metody mnożenia oraz dokładna wartość stałej Knutha $A = \\frac{\\sqrt{5}-1}{2} \\approx 0{,}618034$.',
      'Przeliczanie napisów na klucze całkowite w systemie o podstawie 128 (przykład `"abc"` $\\to 1\\,601\\,891$).',
      'Proste sumowanie kodów ASCII jest słabe (anagramy `"abc"` i `"cba"` dają ten sam hasz!).',
    ],
    common_mistakes:
      'Wybór $N=2^p$ w metodzie dzielenia bez uzasadnienia ryzyka; pomylenie części ułamkowej $(kA \\bmod 1)$ z resztą całkowitą.',
    lab_connection:
      'W Laboratorium AiSD możesz porównać rozkład kluczy dla metody dzielenia i metody mnożenia Knutha.',
    svg_diagram_id: 'aisd-hash-table',
  },
  {
    id: 'aisd-q18',
    subject_id: 'aisd',
    number: 18,
    chapter_id: 'aisd-ch5',
    category: 'Tablice rozproszone',
    question: 'Rozwiązywanie kolizji: łańcuchowanie vs adresowanie otwarte (liniowe, kwadratowe, podwójne), usuwanie (tombstone) i średnia liczba porównań',
    short_answer:
      'Łańcuchowanie buduje listy w kubełkach (średnio $1+\\alpha$ porównań). Adresowanie otwarte szuka wolnej komórki wewnątrz tablicy (próbkowanie liniowe, kwadratowe lub podwójne haszowanie), wymaga znacznika `DELETED` przy usuwaniu i daje $\\le \\frac{1}{1-\\alpha}$ prób przy szukaniu nieudanym.',
    full_answer:
      '**1. Metoda łańcuchowa (oddzielne listy, W5 sl. 11):**\nKażdy kubełek `D[i]` jest głową listy jednokierunkowej przechowującej wszystkie klucze o tym samym haszu. Proste wstawianie ($O(1)$ na początek) i usuwanie, brak sztywnego limitu $\\alpha \\le 1$. Oczekiwana długość łańcucha to $\\alpha$, więc czas wyszukiwania wynosi $\\Theta(1 + \\alpha)$.\n\n**2. Adresowanie otwarte (*open addressing*, W5 sl. 12–16):**\nWszystkie elementy mieszkają bezpośrednio w tablicy `D[0..N-1]`, a ciąg próbkowania $h(k, i)$ dla $i=0,1,\\dots,N-1$ sprawdza kolejne sloty:\n- **Próbkowanie liniowe:** $h(k, i) = (h_1(k) + i) \\bmod N$ — proste, ale powoduje **grupowanie pierwotne** (*primary clustering*, długie bloki zajętych komórek).\n- **Próbkowanie kwadratowe:** $h(k, i) = (h_1(k) + c_1 i + c_2 i^2) \\bmod N$ — eliminuje grupowanie pierwotne, lecz powoduje *grupowanie wtórne* (dla kluczy o tym samym $h_1(k)$) i może nie odwiedzić całej tablicy.\n- **Podwójne haszowanie:** $h(k, i) = (h_1(k) + i \\cdot h_2(k)) \\bmod N$, gdzie $h_2(k) \\neq 0$ jest względnie pierwsze z $N$ (np. $N$ pierwsze i $h_2(k) = 1 + (k \\bmod (N-1))$). Najlepsze rozproszenie! *(Uwaga na literówkę na slajdzie W5 sl. 13: zbędny znak `+` przed `% N`.)*\n\n**Usuwanie w adresowaniu otwartym (kluczowa pułapka!):** nie wolno po prostu wyzerować komórki do `EMPTY`, bo zerwie to łańcuch próbkowania dla późniejszych kluczy! Wstawiamy specjalny znacznik **`DELETED` (tombstone)** — wyszukiwanie idzie dalej przez `DELETED`, a wstawianie może to miejsce ponownie zająć.\n\n**Oszacowanie średniej liczby porównań (adresowanie otwarte przy równomiernym haszowaniu, W5 sl. 15):**\n- Wyszukiwanie **nieudane** (i wstawianie): $\\le \\frac{1}{1 - \\alpha}$,\n- Wyszukiwanie **udane**: $\\le \\frac{1}{\\alpha} \\ln\\!\\left(\\frac{1}{1-\\alpha}\\right) + \\frac{1}{\\alpha}$.\nDla $\\alpha = 0{,}5$ to zaledwie $\\le 2$ próby, a dla $\\alpha = 0{,}9$ już $\\le 10$ prób!',
    key_points: [
      'Wzory trzech metod adresowania otwartego + zjawisko grupowania pierwotnego vs wtórnego.',
      'Dlaczego `h_2(k)` w podwójnym haszowaniu musi być $\\neq 0$ i względnie pierwsze z $N$.',
      'Dlaczego w adresowaniu otwartym przy usuwaniu niezbędny jest znacznik `DELETED` (*tombstone*).',
      'Wzory wydajnościowe $\\frac{1}{1-\\alpha}$ oraz $\\frac{1}{\\alpha}\\ln\\frac{1}{1-\\alpha} + \\frac{1}{\\alpha}$ i degradacja dla $\\alpha \\to 1$.',
    ],
    common_mistakes:
      'Usuwanie elementu przez ustawienie `NULL`/`EMPTY` w adresowaniu otwartym (powoduje fałszywe „nie znaleziono” dla kolejnych elementów w klastrze!); wybieranie $h_2(k)$ mogącego zwrócić $0$ (pętla w tym samym slocie).',
    lab_connection:
      'Przetestuj różnice między łańcuchowaniem, próbkowaniem liniowym i kwadratowym na własnych kluczach w Laboratorium AiSD.',
    svg_diagram_id: 'aisd-hash-table',
  },

  // Rozdział 6 (Zagadnienia 19–22)
  {
    id: 'aisd-q19',
    subject_id: 'aisd',
    number: 19,
    chapter_id: 'aisd-ch6',
    category: 'Drzewa i kopce',
    question: 'Drzewa binarne — terminologia, reprezentacja i algorytmy trawersowania (Pre-order, In-order, Post-order oraz BFS)',
    short_answer:
      'Drzewo binarne to acykliczna struktura hierarchiczna, w której każdy węzeł ma co najwyżej 2 dzieci (lewe i prawe). Przeglądamy je w głąb (DFS: Pre-order `V-L-R`, In-order `L-V-R`, Post-order `L-R-V`) lub wszerz (BFS poziomami z kolejką FIFO) w czasie $\\Theta(n)$.',
    full_answer:
      '**Podstawowe pojęcia (W5 sl. 18–26):**\n- **Korzeń (root)** — jedyny węzeł bez rodzica (poziom 0); **liść (leaf)** — węzeł bez dzieci (stopień 0).\n- **Wysokość drzewa $h$** — długość najdłuższej ścieżki od korzenia do liścia. Drzewo binarne o wysokości $h$ ma co najwyżej $2^{h+1}-1$ węzłów, a dla $n$ węzłów minimalna wysokość to $\\lfloor \\log_2 n \\rfloor$.\n- **Drzewo pełne / kompletne / doskonałe:** w drzewie *kompletnym* (używanym w kopcu) wszystkie poziomy poza ewentualnie ostatnim są pełne, a ostatni jest wypełniony od lewej.\n\n**Cztery porządki przechodzenia drzewa binarnego (czas $\\Theta(n)$):**\n1. **Pre-order (KLP / `V-L-R`, wzdłużny):** Korzeń $\\to$ Lewe poddrzewo $\\to$ Prawe poddrzewo (kopiowanie struktury drzewa, zapis prefiksowy wyrażeń).\n2. **In-order (LKP / `L-V-R`, poprzeczny):** Lewe $\\to$ Korzeń $\\to$ Prawe (**w drzewie BST wypisuje klucze w kolejności rosnącej!**).\n3. **Post-order (LPK / `L-R-V`, wsteczny):** Lewe $\\to$ Prawe $\\to$ Korzeń (zwalnianie pamięci drzewa, zapis postfiksowy ONP).\n4. **Level-order (BFS — wszerz):** poziom po poziomie od korzenia z użyciem **kolejki FIFO** (w odróżnieniu od DFS używającego stosu/rekurencji).',
    key_points: [
      'Bezbłędne wypisywanie sekwencji Pre-order, In-order, Post-order i BFS dla zadanego rysunku drzewa (pewniak egzaminacyjny!).',
      'Zależność między liczbą węzłów a wysokością: min. $h = \\lfloor \\log_2 n \\rfloor$ (zrównoważone), maks. $h = n-1$ (zdegenerowane do listy).',
      'In-order na BST daje ciąg posortowany niemalejąco.',
      'DFS korzysta ze stosu (rekurencji), a BFS z kolejki FIFO.',
    ],
    common_mistakes:
      'Mylenie kolejności odwiedzin Pre-order z Post-order lub zapominanie, że w In-order najpierw schodzimy do samego końca w lewo zanim wypiszemy jakikolwiek węzeł.',
    lab_connection:
      'Interaktywny diagram drzewa oraz budowniczy BST w Laboratorium AiSD automatycznie generują wszystkie 4 kolejności przejść.',
    svg_diagram_id: 'aisd-tree-traversals',
  },
  {
    id: 'aisd-q20',
    subject_id: 'aisd',
    number: 20,
    chapter_id: 'aisd-ch6',
    category: 'Drzewa i kopce',
    question: 'Kopiec binarny (max-heap), reprezentacja tablicowa 1-indeksowana, przywracanie własności kopca i sortowanie kopcowe (Heapsort)',
    short_answer:
      'Kopiec binarny to kompletne drzewo binarne zapisane w tablicy (w wykładzie 1-indeksowanej: rodzic $\\lfloor i/2 \\rfloor$, dzieci $2i$ i $2i+1$), gdzie klucz rodzica $\\ge$ kluczy dzieci (max-heap). Heapsort buduje kopiec i $n-1$ razy zdejmuje maksimum na koniec, działając w miejscu w $\\Theta(n\\log n)$.',
    full_answer:
      '**Kopiec binarny (max-heap, W5 sl. 28–39):**\nTo kompletne drzewo binarne spełniające **warunek kopca**: dla każdego węzła $i > 1$ zachodzi $A[\\lfloor i/2 \\rfloor] \\ge A[i]$ (korzeń $A[1]$ przechowuje maksimum!).\n\n**Reprezentacja tablicowa 1-indeksowana (konwencja Wykładu 5, `A[0]` nieużywane):**\n- Rodzic węzła $i$: $\\text{parent}(i) = \\lfloor i/2 \\rfloor$,\n- Lewe dziecko: $\\text{left}(i) = 2i$,\n- Prawe dziecko: $\\text{right}(i) = 2i + 1$.\n(Dla indeksowania od 0: rodzic $\\lfloor (i-1)/2 \\rfloor$, dzieci $2i+1, 2i+2$.)\n\n**Operacje na kopcu:**\n- **Wstawianie (przesiewanie w górę / *sift-up*):** dopisz na końcu `A[n+1]` i zamieniaj z rodzicem dopóki jest od niego większy — **$O(\\log n)$**.\n- **Usuwanie maksimum / `Heapify` (przesiewanie w dół / *sift-down*):** przenieś ostatni element do korzenia `A[1]` i zamieniaj z większym z dzieci aż do przywrócenia warunku kopca — **$O(\\log n)$**.\n- **Budowa kopca:** albo metodą Floyda (bottom-up `Heapify` od $\\lfloor n/2 \\rfloor$ do $1$ w czasie **$O(n)$**), albo kolejnymi wstawianiami od $i=2$ do $n$ ($O(n\\log n)$ — wariant z W5 sl. 38).\n\n**Heapsort:**\n1. Zbuduj max-heap z całej tablicy `A[1..n]`.\n2. Dla $k = n$ w dół do $2$: zamień korzeń `A[1]` (maksimum) z ostatnim elementem `A[k]`, zmniejsz rozmiar kopca do $k-1$ i wywołaj `sift-down(1)`.\nZłożoność: **$\\Theta(n\\log n)$ w każdym przypadku** (optymistycznym, średnim i pesymistycznym!), pamięć **$O(1)$ (w miejscu)**, algorytm **niestabilny**.\n\n**Uwaga na błąd ze slajdu W5 sl. 38:** w pętli budowy kopca wydrukowano `FOR i = 2..n-1` — w tablicy 1-indeksowanej `A[1..n]` pomija to ostatni element `A[n]`! Powinno być `FOR i = 2..n`.',
    key_points: [
      'Wzory na rodzica i dzieci w indeksowaniu od 1 (`⌊i/2⌋`, `2i`, `2i+1`) i brak potrzeby wskaźników.',
      'Różnica między warunkiem kopca (rodzic $\\ge$ dzieci) a warunkiem BST (lewe $<$ rodzic $<$ prawe)!',
      'Dwie fazy Heapsorta: budowa kopca + wielokrotna zamiana `A[1] ↔ A[k]` i przesiewanie w dół.',
      'Gwarantowane $\\Theta(n\\log n)$ w miejscu ($O(1)$) bez pesymistycznego $O(n^2)$ Quicksorta i bez pamięci $O(n)$ Merge Sorta.',
      'Błąd na slajdzie W5 sl. 38: `FOR i = 2..n-1` ucina `A[n]`.',
    ],
    common_mistakes:
      'Mylenie warunku kopca z BST (w kopcu lewe dziecko może być większe od prawego!); użycie 0-indeksowanych wzorów `2i` zamiast `2i+1` (dla $i=0$ daje `2*0=0` — zapętlenie!).',
    lab_connection:
      'Prześledź budowę kopca i wyciąganie maksimów krok po kroku w Laboratorium AiSD (Zakładka 1).',
    svg_diagram_id: 'aisd-tree-traversals',
  },
  {
    id: 'aisd-q21',
    subject_id: 'aisd',
    number: 21,
    chapter_id: 'aisd-ch6',
    category: 'Drzewa i kopce',
    question: 'Binarne drzewo poszukiwań (BST) — własność porządku, wyszukiwanie, wstawianie, 3 przypadki usuwania i problem degradacji',
    short_answer:
      'W BST dla każdego węzła wszystkie klucze w lewym poddrzewie są mniejsze, a w prawym większe (lub równe). Operacje trwają $O(h)$, gdzie $h=O(\\log n)$ dla drzewa losowego, lecz dla posortowanego ciągu wejściowego drzewo degraduje się do listy ($h=n-1$, $O(n)$).',
    full_answer:
      '**Własność BST (W5 sl. 40–47):**\nDla każdego węzła $v$ wszystkie klucze w jego **lewym poddrzewie** są mniejsze od $v.\\text{key}$, a wszystkie klucze w jego **prawym poddrzewie** są większe od $v.\\text{key}$. Przejście **In-order** wypisuje wszystkie klucze w kolejności ściśle rosnącej.\n\n**Operacje (koszt $O(h)$, gdzie $h$ to wysokość drzewa):**\n- **Wyszukiwanie:** schodź w lewo gdy `x < v.key`, w prawo gdy `x > v.key`, aż znajdziesz lub trafisz na `NULL`.\n- **Wstawianie:** zejdź jak w wyszukiwaniu i podepnij nowy węzeł jako liść w pierwszym napotkanym wolnym miejscu (`NULL`).\n- **Usuwanie węzła `v` — 3 przypadki (kluczowe na egzaminie!):**\n  1. **`v` jest liściem (0 dzieci):** po prostu usuń i wyzeruj wskaźnik u rodzica.\n  2. **`v` ma 1 dziecko:** podepnij to jedyne dziecko bezpośrednio do rodzica `v`.\n  3. **`v` ma 2 dzieci:** zastąp klucz `v` jego **następnikiem In-order** (najmniejszy element w prawym poddrzewie — „raz w prawo, potem maksymalnie w lewo”) lub **poprzednikiem In-order** (największy w lewym poddrzewie), po czym usuń tamten zastępczy węzeł (ma on co najwyżej 1 dziecko — redukcja do przypadku 1 lub 2!).\n\n**Degradacja BST:** wstawienie posortowanych kluczy (np. `1, 2, 3, 4, 5`) tworzy niezrównoważony łańcuch o wysokości $h = n - 1$, przez co wszystkie operacje zwalniają z $O(\\log n)$ do **$O(n)$**. To motywuje drzewa samowyważające (AVL).',
    key_points: [
      'Własność BST dotyczy **całych poddrzew**, nie tylko bezpośrednich dzieci!',
      'Wszystkie **3 przypadki usuwania** (zwłaszcza przypadek 3 z następnikiem/poprzednikiem In-order).',
      'Złożoność $O(h)$: średnio $O(\\log n)$, pesymistycznie $O(n)$ przy posortowanych danych wejściowych.',
      'Kolejność wstawiania determinuje kształt BST (te same klucze w innej kolejności dają inne drzewo!).',
    ],
    common_mistakes:
      'Sprawdzanie warunku BST tylko lokalnie względem bezpośrednich dzieci (np. w prawym poddrzewie korzenia 10 nie może leżeć 8 nawet jako lewe dziecko 15!); mylenie następnika In-order z bezpośrednim prawym dzieckiem.',
    lab_connection:
      'Zbuduj własne BST w Laboratorium AiSD (Zakładka 2) — sprawdź, jak posortowane wejście degraduje wysokość i współczynniki wyważenia $bf_i$.',
    svg_diagram_id: 'aisd-tree-traversals',
  },
  {
    id: 'aisd-q22',
    subject_id: 'aisd',
    number: 22,
    chapter_id: 'aisd-ch6',
    category: 'Drzewa i kopce',
    question: 'Drzewa wyważone: porównanie DDW i drzew AVL, współczynnik wyważenia $bf_i$ oraz 4 przypadki rotacji (LL, RR, LR, RL)',
    short_answer:
      'Drzewo DDW wymaga równej liczby węzłów ($|n_L - n_R| \\le 1$), co jest zbyt kosztowne w utrzymaniu. Drzewo AVL wymaga jedynie równowagi wysokości: $bf_i = h_L - h_R \\in \\{-1, 0, 1\\}$, przywracanej po wstawieniu/usunięciu w $O(\\log n)$ za pomocą rotacji pojedynczych (LL, RR) lub podwójnych (LR, RL).',
    full_answer:
      '**DDW (Drzewo Doskonale Wyważone, W5 sl. 48–50):**\nDla każdego węzła liczba węzłów w lewym i prawym poddrzewie różni się co najwyżej o 1: $|n_L - n_R| \\le 1$. Zapewnia minimalną wysokość, ale pojedyncze wstawienie potrafi wymusić kosztowną przebudowę całego drzewa ($O(n)$).\n\n**Drzewo AVL (Adelson-Velsky i Landis, 1962, W5 sl. 51–59):**\nTo BST, w którym dla każdego węzła $w_i$ **współczynnik wyważenia (balance factor)** spełnia:\n$$bf_i = h_L(w_i) - h_R(w_i) \\in \\{-1,\\; 0,\\; +1\\}$$\ngdzie $h_L, h_R$ to wysokości lewego i prawego poddrzewa. Gwarantuje to wysokość $h < 1{,}44 \\log_2(n+2) = O(\\log n)$, a więc **gwarantowane $O(\\log n)$** pesymistycznie dla wyszukiwania, wstawiania i usuwania!\n\n**Cztery przypadki naruszenia równowagi ($|bf| = 2$) i rotacje (zachowujące porządek In-order!):**\n1. **LL** ($bf(z) = +2$ oraz $bf(z.\\text{left}) \\ge 0$): **pojedyncza rotacja w prawo** na $z$.\n2. **RR** ($bf(z) = -2$ oraz $bf(z.\\text{right}) \\le 0$): **pojedyncza rotacja w lewo** na $z$.\n3. **LR** ($bf(z) = +2$ oraz $bf(z.\\text{left}) = -1$): **podwójna rotacja lewo-prawo** (najpierw w lewo na lewym dziecku, potem w prawo na $z$).\n4. **RL** ($bf(z) = -2$ oraz $bf(z.\\text{right}) = +1$): **podwójna rotacja prawo-lewo** (najpierw w prawo na prawym dziecku, potem w lewo na $z$).',
    key_points: [
      'Różnica kryteriów: DDW liczy **węzły** ($|n_L - n_R| \\le 1$), a AVL liczy **wysokości** ($bf_i = h_L - h_R \\in \\{-1,0,1\\}$).',
      'Konwencja znaku $bf_i = h_L - h_R$ z Wykładu 5: $+2$ oznacza przeciążenie lewej strony (rotacja w prawo), $-2$ prawej (rotacja w lewo).',
      'Kluczowa własność każdej rotacji: jest operacją $O(1)$ przepinającą 3 wskaźniki i **zachowuje porządek BST (In-order)**.',
      'Kiedy wystarczy pojedyncza rotacja (LL/RR), a kiedy potrzebna jest podwójna (LR/RL — kształt „zygzaka”).',
    ],
    common_mistakes:
      'Mylenie definicji $bf_i = h_L - h_R$ z $h_R - h_L$ (odwraca znak przypadków LL/RR!); wykonanie pojedynczej rotacji na przypadku LR/RL (nie naprawia wyważenia!).',
    lab_connection:
      'W Laboratorium AiSD (Zakładka 2) dla każdego węzła wstawionego BST wyświetlana jest na żywo wysokość $h$ oraz współczynnik $bf_i = h_L - h_R$.',
    svg_diagram_id: 'aisd-tree-traversals',
  },

  // Rozdział 7 (Zagadnienia 23–25)
  {
    id: 'aisd-q23',
    subject_id: 'aisd',
    number: 23,
    chapter_id: 'aisd-ch7',
    category: 'Metody numeryczne',
    question: 'Błędy numeryczne, rząd zbieżności $p$, algorytm Herona (babiloński) dla $\\sqrt{S}$ oraz aproksymacja szeregami Taylora / Maclaurina',
    short_answer:
      'W obliczeniach numerycznych ścierają się błędy obcięcia (przybliżenia modelu) i błędy zaokrągleń (skończona precyzja IEEE 754). Rząd zbieżności $p$ określa $|e_{n+1}| \\approx C|e_n|^p$. Algorytm Herona $x_{n+1}=\\frac{1}{2}(x_n+S/x_n)$ zbiega kwadratowo ($p=2$), a szereg Taylora pozwala liczyć funkcje elementarne (np. $e^x, \\sin x$) wielomianami.',
    full_answer:
      '**Źródła błędów numerycznych (W6 sl. 3–8):**\n1. **Błąd obcięcia (metody):** wynika z zastąpienia nieskończonego procesu (granicy, szeregu, pochodnej) skończonym przybliżeniem (np. $N$ wyrazów Taylora lub krok $h > 0$).\n2. **Błąd zaokrągleń:** skończona reprezentacja zmiennoprzecinkowa (np. IEEE 754 `float64` ma ok. 15–17 cyfr znaczących, $\\varepsilon_{\\text{mach}} \\approx 2{,}22 \\cdot 10^{-16}$); szczególnie groźna jest **redukcja cyfr znaczących** przy odejmowaniu dwóch niemal równych liczb!\n\n**Rząd zbieżności $p$:** ciąg przybliżeń z błędami $e_n = |x_n - x^*|$ ma rząd zbieżności $p$, gdy:\n$$\\lim_{n\\to\\infty} \\frac{|e_{n+1}|}{|e_n|^p} = C \\in (0, \\infty)$$\n- $p=1$: zbieżność **liniowa** (np. bisekcja — ok. 1 bit dokładności na krok),\n- $p \\approx 1{,}618$: **nadliniowa** (metoda siecznych),\n- $p=2$: **kwadratowa** (Heron, Newton–Raphson — w każdym kroku liczba poprawnych cyfr podwaja się!).\n\n**Algorytm Herona (babiloński) wyznaczania $\\sqrt{S}$ (W6 sl. 9–11):**\n$$x_{n+1} = \\frac{1}{2}\\left(x_n + \\frac{S}{x_n}\\right), \\qquad x_0 > 0$$\nJest to szczególny przypadek metody Newtona dla $f(x) = x^2 - S$ (zbieżność kwadratowa $p=2$; np. dla $\\sqrt{2}$ z $x_0=1$ już $x_4$ ma 12 poprawnych cyfr!).\n\n**Rozwinięcie Taylora / Maclaurina (W6 sl. 12–15):**\n$$f(x) = \\sum_{k=0}^{N} \\frac{f^{(k)}(x_0)}{k!}(x - x_0)^k + R_N(x), \\qquad R_N(x) = \\frac{f^{(N+1)}(\\xi)}{(N+1)!}(x - x_0)^{N+1}$$\nPozwala obliczać np. $e^x = \\sum x^k/k!$, $\\sin x = \\sum (-1)^k x^{2k+1}/(2k+1)!$ i szacować błąd obcięcia za pomocą reszty Lagrange’a $R_N(x)$.',
    key_points: [
      'Rozróżnienie błędu obcięcia (z modelu) od błędu zaokrągleń (ze skończonej precyzji maszynowej).',
      'Definicja rzędu zbieżności $p$ i różnica tempa między $p=1$ (liniowa) a $p=2$ (podwajanie poprawnych cyfr).',
      'Wyprowadzenie wzoru Herona $x_{n+1} = \\frac{1}{2}(x_n + S/x_n)$ z metody Newtona dla $f(x)=x^2-S$.',
      'Wzór Taylora z resztą Lagrange’a $R_N(x)$ jako narzędzie do wyprowadzania wzorów różnicowych i szacowania błędu.',
    ],
    common_mistakes:
      'Mylenie błędu bezwzględnego $|x_n - x^*|$ z błędem względnym $\\frac{|x_n - x^*|}{|x^*|}$; stosowanie rozwinięcia Maclaurina ($x_0=0$) dla dużego $x$ bez redukcji zakresu (np. kąt w $\\sin x$ należy zredukować do $[-\\pi, \\pi]$).',
    lab_connection:
      'W Laboratorium AiSD (Zakładka 3) możesz obserwować kwadratowy spadek błędu w algorytmie Herona dla dowolnego $S$.',
    svg_diagram_id: 'aisd-root-finding',
  },
  {
    id: 'aisd-q24',
    subject_id: 'aisd',
    number: 24,
    chapter_id: 'aisd-ch7',
    category: 'Metody numeryczne',
    question: 'Przedziałowe metody rozwiązywania równań nieliniowych $f(x)=0$: metoda bisekcji i metoda fałszywej prostej (regula falsi)',
    short_answer:
      'Obie metody wymagają ciągłości $f$ i zmiany znaku $f(a)f(b) < 0$ (tw. Darboux). Bisekcja bierze środek $c=(a+b)/2$ i gwarantuje spadek błędu o połowę co krok ($p=1$). Regula falsi bierze przecięcie cięciwy z osią $OX$, ale przy stałej wypukłości jeden z krańców potrafi ugrzęznąć.',
    full_answer:
      '**Warunek startowy (tw. Bolzano–Cauchy’ego / Darboux, W6 sl. 17–23):** funkcja $f$ ciągła na $[a,b]$ oraz $f(a)\\cdot f(b) < 0$ gwarantują istnienie co najmniej jednego pierwiastka $x^* \\in (a,b)$.\n\n**1. Metoda bisekcji (połowienia przedziału):**\nW każdej iteracji obliczamy środek $c = \\frac{a+b}{2}$:\n- jeśli $f(c) == 0$ lub $|b-a|/2 < \\varepsilon$ — koniec,\n- jeśli $f(a)\\cdot f(c) < 0$ ustaw $b = c$, w przeciwnym razie $a = c$.\n**Własności:** **zawsze zbieżna** (gwarancja bez pochodnej!), błąd po $n$ krokach wynosi $\\le \\frac{b_0 - a_0}{2^n}$, skąd liczba kroków dla dokładności $\\varepsilon$ to $n \\ge \\lceil \\log_2((b_0-a_0)/\\varepsilon) \\rceil$. Zbieżność powolna, liniowa ($p=1$).\n\n**2. Metoda fałszywej prostej (*regula falsi*):**\nZamiast połowy odcinka wyznaczamy punkt przecięcia cięciwy łączącej $(a, f(a))$ i $(b, f(b))$ z osią $OX$:\n$$c = \\frac{a\\,f(b) - b\\,f(a)}{f(b) - f(a)} = b - f(b)\\frac{b-a}{f(b)-f(a)}$$\nNastępnie zachowujemy podprzedział ze zmianą znaku (`IF f(a)*f(c) < 0 THEN b = c ELSE a = c`).\n\n**Uwaga na błędy w Wykładzie 6 (sl. 19, 21–23):**\n- Dla przykładu $f(x) = x^3 - 2x^2 + x - 5$ na $[1, 4]$ zachodzi $f(4) = 64 - 32 + 4 - 5 = \\mathbf{31}$ (na slajdach wydrukowano błędnie `34`!).\n- W pseudokodzie `falsi` na slajdzie 23 wydrukowano błędny warunek `IF f(a)*f(b) < 0` zamiast poprawnego `IF f(a)*f(c) < 0`!\n- Dla funkcji ściśle wypukłych (jak $x^3-2x^2+x-5$ na $[1,4]$) jeden kraniec przedziału zatrzymuje się i zbieżność regula falsi bywa bardzo wolna (liniowa, często wolniejsza od bisekcji!).',
    key_points: [
      'Warunek istnienia pierwiastka $f(a)f(b) < 0$ i niemożność wykrycia pierwiastków parzystej krotności (np. $f(x)=x^2$).',
      'Wzór na liczbę iteracji bisekcji $n \\ge \\lceil \\log_2((b_0-a_0)/\\varepsilon) \\rceil$ oraz dokładny wzór na $c$ w regula falsi.',
      'Błąd w pseudokodzie ze slajdu W6 sl. 23: musi być `f(a)*f(c) < 0`, nigdy `f(a)*f(b) < 0`!',
      'Zjawisko „grzęźnięcia” jednego krańca w regula falsi dla funkcji o stałym znaku $f\'\'$.',
    ],
    common_mistakes:
      'Sprawdzanie kryterium stopu wyłącznie przez $|b-a| < \\varepsilon$ w regula falsi (gdy jeden kraniec stoi w miejscu, długość przedziału $|b-a|$ nie dąży do zera — należy kontrolować $|f(c)|$ lub $|c_n - c_{n-1}|$!).',
    lab_connection:
      'Porównaj na żywo liczbę iteracji bisekcji i regula falsi dla $f(x)=x^3-2x^2+x-5$ na $[1,4]$ w Laboratorium AiSD (Zakładka 3).',
    svg_diagram_id: 'aisd-root-finding',
  },
  {
    id: 'aisd-q25',
    subject_id: 'aisd',
    number: 25,
    chapter_id: 'aisd-ch7',
    category: 'Metody numeryczne',
    question: 'Otwarte metody znajdowania pierwiastków: metoda siecznych i metoda stycznych Newtona–Raphsona — wzory, zbieżność i warunki stosowalności',
    short_answer:
      'Metoda Newtona–Raphsona $x_{n+1}=x_n - f(x_n)/f\'(x_n)$ wykorzystuje styczną i zbiega kwadratowo ($p=2$), ale wymaga pochodnej i dobrego $x_0$. Metoda siecznych zastępuje $f\'(x_n)$ ilorazem różnicowym z dwóch ostatnich punktów, osiągając rząd $p=\\varphi \\approx 1{,}618$ bez liczenia pochodnej.',
    full_answer:
      'Metody otwarte rezygnują z utrzymywania nawiasu zmiany znaku $f(a)f(b)<0$ na rzecz szybszej zbieżności (W6 sl. 24–29):\n\n**1. Metoda siecznych (*secant method*):**\nStartuje od dwóch punktów $x_0, x_1$ i w każdym kroku wyznacza miejsce zerowe siecznej przez $(x_{n-1}, f(x_{n-1}))$ i $(x_n, f(x_n))$:\n$$x_{n+1} = x_n - f(x_n)\\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}$$\nZastępuje stare punkty bez sprawdzania znaku ($x_{n-1} \\leftarrow x_n$, $x_n \\leftarrow x_{n+1}$). **Rząd zbieżności:** nadliniowy $p = \\frac{1+\\sqrt{5}}{2} \\approx 1{,}618$. Nie wymaga analitycznej pochodnej $f\'(x)$!\n*(Uwaga na błąd ze slajdu W6 sl. 25: autor wkleił fragment z `falsi` z warunkiem `f(a)*f(b)<0` — w metodzie siecznych przesuwamy bezwarunkowo okno dwóch ostatnich przybliżeń!)*\n\n**2. Metoda stycznych (Newtona–Raphsona):**\nWyprowadzana z równania stycznej $y - f(x_n) = f\'(x_n)(x - x_n)$ dla $y=0$ (lub z 1. rzędu Taylora):\n$$x_{n+1} = x_n - \\frac{f(x_n)}{f\'(x_n)}$$\n**Rząd zbieżności:** **kwadratowy ($p = 2$)** dla pojedynczego pierwiastka ($f\'(x^*) \\neq 0$). Wymaga znajomości $f\'(x)$ oraz zabezpieczenia przed dzieleniem przez $f\'(x_n) \\approx 0$.\n\n**Kiedy Newton–Raphson zawodzi?**\n- $f\'(x_n) = 0$ (styczna pozioma — ekstremum lokalne),\n- zły punkt startowy $x_0$ daleko od pierwiastka (ucieczka do nieskończoności lub cykl oscylacji),\n- pierwiastek wielokrotny $f\'(x^*)=0$ (spadek zbieżności z kwadratowej do liniowej).\nW praktyce często łączy się kilka kroków bisekcji (bezpieczeństwo) z Newtonem (szybkość).',
    key_points: [
      'Dokładne wzory iteracyjne metody Newtona–Raphsona ($p=2$) i metody siecznych ($p \\approx 1{,}618$).',
      'Zasadnicza różnica między metodą siecznych a regula falsi (siecznych NIE sprawdza zmiany znaku — przesuwa parę ostatnich punktów).',
      'Kluczowe ryzyka metod otwartych: brak gwarancji zbieżności, dzielenie przez $f\'(x_n)=0$ lub $f(x_n)-f(x_{n-1})=0$, cykle i ucieczka.',
      'Wyprowadzenie wzoru Newtona z geometrii stycznej i z rozwinięcia Taylora.',
    ],
    common_mistakes:
      'Mylenie wzoru metody siecznych z regula falsi (wzór na nowy punkt wygląda algebraicznie podobnie, ale reguła aktualizacji punktów jest zupełnie inna!); zapominanie o sprawdzeniu $|f\'(x_n)| > \\delta$ przed dzieleniem.',
    lab_connection:
      'Solver w Laboratorium AiSD (Zakładka 3) zestawia w jednej tabeli bisekcję, regula falsi, metodę siecznych i Newtona–Raphsona.',
    svg_diagram_id: 'aisd-root-finding',
  },

  // Rozdział 8 (Zagadnienia 26–28)
  {
    id: 'aisd-q26',
    subject_id: 'aisd',
    number: 26,
    chapter_id: 'aisd-ch8',
    category: 'Optymalizacja i różniczkowanie',
    question: 'Optymalizacja jednowymiarowa bez pochodnych: unimodalność i metoda złotego podziału (Golden Section Search)',
    short_answer:
      'Dla funkcji unimodalnej na $[a,b]$ metoda złotego podziału wybiera punkty wewnętrzne za pomocą $\\alpha = \\frac{\\sqrt{5}-1}{2} \\approx 0{,}618034$. Dzięki własności $\\alpha^2 = 1-\\alpha$ jeden z punktów z poprzedniej iteracji przechodzi bezpośrednio do kolejnej — potrzeba tylko **1 nowego wywołania $f(x)$ na krok**!',
    full_answer:
      '**Założenie unimodalności (W6 sl. 30–34):** funkcja $f$ na $[a,b]$ ma dokładnie jedno minimum $x^*$ (ściśle maleje na $[a,x^*]$ i ściśle rośnie na $[x^*, b]$). Pozwala to wnioskować o odrzucanym skrajnym podprzedziale z porównania wartości w dwóch punktach wewnętrznych $a < x_1 < x_2 < b$: dla minimum, jeśli $f(x_1) < f(x_2)$, to $x^* \\in [a, x_2]$ (odrzucamy $[x_2, b]$); w przeciwnym razie $x^* \\in [x_1, b]$ (odrzucamy $[a, x_1]$).\n\n**Metoda złotego podziału (*Golden Section Search*):**\nStała złotego podziału wynosi:\n$$\\alpha = \\frac{\\sqrt{5}-1}{2} \\approx 0{,}618034 \\qquad (\\text{spełnia } \\alpha^2 + \\alpha - 1 = 0 \\iff 1 - \\alpha = \\alpha^2)$$\nPunkty wewnętrzne wyznaczamy symetrycznie:\n$$x_1 = \\alpha a + (1-\\alpha)b = b - \\alpha(b-a), \\qquad x_2 = (1-\\alpha)a + \\alpha b = a + \\alpha(b-a)$$\n**Dlaczego właśnie złoty podział?** Po zawężeniu przedziału długość maleje w stosunku $\\alpha \\approx 0{,}618$, a pozostały punkt wewnętrzny trafia **dokładnie** w nową pozycję symetryczną (ponieważ $\\alpha^2 = 1 - \\alpha$)! Dzięki temu w każdej kolejnej iteracji wykonujemy tylko **1 obliczenie funkcji $f$** zamiast 2 (jak w naiwnym dzieleniu na 3 części). Zbieżność liniowa ($p=1$), po $n$ krokach długość przedziału to $\\alpha^n (b_0 - a_0)$.\n\n**Uwaga na błąd ze slajdu W6 sl. 34:** w pseudokodzie `Golden_section_search` brakuje instrukcji `SET n = n + 1` w pętli `WHILE (b-a > eps) AND (n < Nmax)` — licznik `n` nigdy się nie zwiększa!',
    key_points: [
      'Rola warunku unimodalności (dla funkcji wielomodalnej metoda może zgubić minimum globalne).',
      'Wartość $\\alpha = \\frac{\\sqrt{5}-1}{2} \\approx 0{,}618034$ oraz kluczowa tożsamość $\\alpha^2 = 1 - \\alpha$ dająca 1 ewaluację $f$ na iterację.',
      'Reguła zawężania przedziału dla minimum ($f(x_1) < f(x_2) \\Rightarrow b=x_2$) vs dla maksimum (znak odwrotny!).',
      'Błąd na slajdzie W6 sl. 34: brak inkrementacji `SET n = n + 1` wewnątrz `WHILE`.',
    ],
    common_mistakes:
      'Stosowanie wzorów punktów dla minimum do szukania maksimum bez odwrócenia nierówności; ponowne obliczanie obu $f(x_1)$ i $f(x_2)$ w każdej iteracji (marnuje główną zaletę złotego podziału!).',
    lab_connection:
      'Przetestuj metodę złotego podziału krok po kroku w Laboratorium AiSD (Zakładka 3).',
    svg_diagram_id: 'aisd-numeric-diff',
  },
  {
    id: 'aisd-q27',
    subject_id: 'aisd',
    number: 27,
    chapter_id: 'aisd-ch8',
    category: 'Optymalizacja i różniczkowanie',
    question: 'Optymalizacja z użyciem pochodnych: bisekcja na $f\'(x)=0$ oraz metoda Newtona dla ekstremów ($x_{n+1}=x_n - f\'(x_n)/f\'\'(x_n)$)',
    short_answer:
      'Ekstremum lokalne funkcji różniczkowalnej spełnia warunek konieczny $f\'(x^*)=0$, co sprowadza optymalizację do szukania zera pochodnej. Bisekcja na $f\'$ gwarantuje zbieżność ($f\'(a)<0<f\'(b)$ dla minimum), a metoda Newtona $x_{n+1}=x_n - \\frac{f\'(x_n)}{f\'\'(x_n)}$ zbiega kwadratowo, lecz może trafić w maksimum lub punkt przegięcia.',
    full_answer:
      'Jeżeli funkcja $f$ jest różniczkowalna, szukanie ekstremum lokalnego sprowadza się do znalezienia punktu stacjonarnego spełniającego warunek konieczny $f\'(x^*) = 0$ (W6 sl. 35–38):\n\n**1. Bisekcja zastosowana do pochodnej $f\'(x)$:**\nDla minimum na $[a,b]$ szukamy przedziału, na którym pochodna zmienia znak z ujemnego na dodatni ($f\'(a) < 0$ i $f\'(b) > 0$). W każdym kroku obliczamy $c = (a+b)/2$ i znak $f\'(c)$:\n- jeśli $f\'(c) > 0$, to minimum leży na lewo ($b = c$),\n- jeśli $f\'(c) < 0$, to minimum leży na prawo ($a = c$).\n*(Uwaga na literówkę rachunkową ze slajdu W6 sl. 35: dla $f(x)=x^3-2x^2+x-5$ mamy $f\'(x)=3x^2-4x+1$, więc $f\'(1{,}15) = 3(1{,}3225) - 4{,}6 + 1 = \\mathbf{+0{,}3675}$, podczas gdy na slajdzie wydrukowano błędny znak `-0.3675`!)*\n\n**2. Metoda Newtona dla optymalizacji:**\nAproksymujemy $f(x)$ lokalnie parabolą Taylora 2. rzędu i wyznaczamy jej wierzchołek (równoważnie: stosujemy Newtona–Raphsona do równania $f\'(x)=0$):\n$$x_{n+1} = x_n - \\frac{f\'(x_n)}{f\'\'(x_n)}$$\n**Własności:** szybka zbieżność kwadratowa ($p=2$), ale wymaga zarówno $f\'$, jak i $f\'\'$! Ponadto sama iteracja szuka *dowolnego* punktu stacjonarnego — do odróżnienia minimum od maksimum trzeba zweryfikować warunek wystarczający: **$f\'\'(x^*) > 0$ dla minimum**, **$f\'\'(x^*) < 0$ dla maksimum** (gdy $f\'\'(x_n)=0$ następuje dzielenie przez zero).',
    key_points: [
      'Sprowadzenie optymalizacji do równania $f\'(x)=0$ i warunek wystarczający z 2. pochodnej ($f\'\'(x^*)>0$ minimum, $f\'\'(x^*)<0$ maksimum).',
      'Wzór iteracyjny Newtona dla ekstremów: $x_{n+1} = x_n - \\frac{f\'(x_n)}{f\'\'(x_n)}$.',
      'Porównanie z metodą złotego podziału: szybsza zbieżność ($p=2$ vs $p=1$), ale wyższe wymagania co do gładkości ($C^2$) i brak globalnej gwarancji.',
      'Błąd rachunkowy na slajdzie W6 sl. 35: $f\'(1{,}15) = +0{,}3675 > 0$, więc $b = 1{,}15$, nie $a = 1{,}15$!',
    ],
    common_mistakes:
      'Pisanie we wzorze Newtona dla optymalizacji $f(x_n)/f\'(x_n)$ zamiast $f\'(x_n)/f\'\'(x_n)$ (pierwszy szuka pierwiastka $f(x)=0$, drugi ekstremum $f\'(x)=0$!); brak sprawdzenia znaku $f\'\'(x^*)$ (ryzyko znalezienia maksimum zamiast minimum).',
    lab_connection:
      'Metoda Newtona dla optymalizacji to podstawa algorytmów uczenia maszynowego i dopasowania krzywych (w $n$ wymiarach z gradientem i hesjanem).',
    svg_diagram_id: 'aisd-numeric-diff',
  },
  {
    id: 'aisd-q28',
    subject_id: 'aisd',
    number: 28,
    chapter_id: 'aisd-ch8',
    category: 'Optymalizacja i różniczkowanie',
    question: 'Różniczkowanie numeryczne: metoda różnic skończonych (przedni, wsteczny, centralny dla $f\'$ i $f\'\'$), wielomian Lagrange’a i kompromis doboru kroku $h$',
    short_answer:
      'Iloraz przedni $\\frac{f(x_0+h)-f(x_0)}{h}$ i wsteczny mają błąd obcięcia $O(h)$, natomiast iloraz centralny $\\frac{f(x_0+h)-f(x_0-h)}{2h}$ oraz 3-punktowa druga pochodna $\\frac{f(x_0+h)-2f(x_0)+f(x_0-h)}{h^2}$ osiągają $O(h^2)$. Zbyt małe $h$ powoduje gwałtowny wzrost błędu zaokrągleń ($O(\\varepsilon_{\\text{mach}}/h)$).',
    full_answer:
      '**1. Metoda różnic skończonych (MRS, z rozwinięcia Taylora, W6 sl. 39–46):**\n- **Różnica przednia (2-punktowa):** $f\'(x_0) \\approx \\frac{f(x_0+h) - f(x_0)}{h}$, błąd obcięcia $O(h)$.\n- **Różnica wsteczna (2-punktowa):** $f\'(x_0) \\approx \\frac{f(x_0) - f(x_0-h)}{h}$, błąd obcięcia $O(h)$.\n- **Różnica centralna (3-punktowa dla $f\'$):** z odejmowania $f(x_0+h)$ i $f(x_0-h)$ wyrazy z $h^2$ znoszą się:\n$$f\'(x_0) \\approx \\frac{f(x_0+h) - f(x_0-h)}{2h}, \\qquad \\text{błąd obcięcia } O(h^2)$$\n- **Centralny wzór 3-punktowy dla drugiej pochodnej $f\'\'$:** z dodawania $f(x_0+h) + f(x_0-h)$:\n$$f\'\'(x_0) \\approx \\frac{f(x_0+h) - 2f(x_0) + f(x_0-h)}{h^2}, \\qquad \\text{błąd obcięcia } O(h^2)$$\n*(Uwaga na literówkę na slajdzie W6 sl. 45: wydrukowano błędnie `f(x_0 + 2h)` zamiast `f(x_0 + h)`!)*\n\n**2. Różniczkowanie przez interpolację Lagrange’a (W6 sl. 47–48):**\nGdy dane są dyskretne węzły $(x_i, y_i)$ (nawet nierównomierne!), konstruujemy wielomian interpolacyjny $L_n(x) = \\sum_{i=0}^n y_i \\ell_i(x)$, gdzie $\\ell_i(x) = \\prod_{j\\neq i} \\frac{x-x_j}{x_i-x_j}$, a następnie różniczkujemy go analitycznie: $f\'(x) \\approx L_n\'(x)$.\n\n**3. Kompromis doboru kroku $h$ (krzywa w kształcie litery U):**\nCałkowity błąd to suma błędu obcięcia (maleje z $h$: $\\sim h$ lub $\\sim h^2$) oraz błędu zaokrągleń (rośnie przy $h \\to 0$ wskutek odejmowania prawie równych liczb i dzielenia przez $h$: $\\sim \\varepsilon_{\\text{mach}}/h$). Optymalny krok dla `float64` wynosi $h_{\\text{opt}} \\approx \\sqrt{\\varepsilon_{\\text{mach}}} \\approx 10^{-8}$ dla różnic jednostronnych oraz $h_{\\text{opt}} \\approx \\varepsilon_{\\text{mach}}^{1/3} \\approx 6\\cdot 10^{-6}$ dla różnicy centralnej.',
    key_points: [
      'Wzory i rzędy błędów: przedni/wsteczny $O(h)$ vs centralny $O(h^2)$ (dlaczego znosi się wyraz z $h^2$!).',
      'Poprawny wzór na $f\'\'(x_0) \\approx \\frac{f(x_0+h) - 2f(x_0) + f(x_0-h)}{h^2}$ (wykrycie literówki `x_0+2h` na slajdzie W6 sl. 45!).',
      'Idea różniczkowania wielomianu Lagrange’a dla węzłów nierównomiernych.',
      'Dlaczego $h = 10^{-16}$ daje katastrofalny wynik (błąd zaokrągleń dominuje nad błędem obcięcia — krzywa U).',
    ],
    common_mistakes:
      'Zakładanie, że „im mniejsze $h$, tym zawsze dokładniejszy wynik” (przy zbyt małym $h$ występuje katastrofalna redukcja cyfr znaczących!); pomijanie czynnika $2$ w mianowniku ilorazu centralnego $2h$.',
    lab_connection:
      'Interaktywny wykres kompromisu kroku $h$ i stycznych różnicowych znajduje się w Rozdziale 8 (`aisd-numeric-diff`).',
    svg_diagram_id: 'aisd-numeric-diff',
  },
];
