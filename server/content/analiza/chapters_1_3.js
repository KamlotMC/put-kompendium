export const ANALIZA_CHAPTERS_1_3 = [
  {
    id: 'analiza-ch1',
    subject_id: 'analiza',
    order_index: 1,
    slug: 'wiadomosci-wstepne-zbiory-ograniczonosc',
    title: 'Rozdział 1: Wiadomości wstępne — logika, zbiory, iloczyn kartezjański i ograniczoność',
    subtitle: 'Oznaczenia liczbowe i logiczne (kwantyfikatory), iloczyn kartezjański A × B i jego geometria, zbiory ograniczone z dołu i z góry',
    lecture_ref: 'Wykład cz. 1, rozdz. 1 (str. 1–2)',
    estimated_minutes: 20,
    summary:
      'Fundament języka analizy matematycznej: zbiory liczbowe (N, Z, Q, R, C), spójniki logiczne i kwantyfikatory, ścisła definicja iloczynu kartezjańskiego A × B z interpretacją geometryczną na płaszczyźnie (Przykład 1) oraz badanie ograniczoności zbiorów z dołu i z góry (Przykład 2).',
    exam_questions: [1, 2],
    key_takeaways: [
      'W niniejszym wykładzie przyjmujemy $\\mathbb{N} = \\{1, 2, 3, \\dots\\}$ (bez zera!), co ma kluczowe znaczenie przy ciągach $a_n$ i dzieleniu przez $n$.',
      'Iloczyn kartezjański $A \\times B$ to zbiór wszystkich par uporządkowanych $(a, b)$ — kolejność ma znaczenie ($A \\times B \\neq B \\times A$, gdy $A \\neq B$).',
      'Zbiór $A \\subset \\mathbb{R}$ jest ograniczony wtedy i tylko wtedy, gdy jest ograniczony JEDNOCZEŚNIE z dołu ($\\exists m \\,\\forall x\\in A: x \\ge m$) oraz z góry ($\\exists M \\,\\forall x\\in A: x \\le M$).',
      'Każdy zbiór ograniczony można zamknąć w pewnym skończonym przedziale $[m, M]$; równoważnie $\\exists K > 0 \\,\\forall x \\in A: |x| \\le K$.',
    ],
    figures: [],
    sections: [
      {
        id: 'oznaczenia-logika',
        heading: '1.1. Zbiory liczbowe, spójniki logiczne i kwantyfikatory',
        blocks: [
          {
            type: 'p',
            text: 'Analiza matematyczna posługuje się skrótowym, jednoznacznym zapisem kwantyfikatorowym. Zrozumienie kolejności kwantyfikatorów ($\\forall$ vs $\\exists$) jest kluczowe — w dalszych rozdziałach odróżnia ono np. zbieżność ciągu od rozbieżności oraz definicję granicy Cauchy’ego.',
          },
          {
            type: 'table',
            caption: 'Podstawowe zbiory liczbowe i symbole logiczne z wykładu',
            headers: ['Symbol', 'Nazwa i definicja', 'Komentarz / przykład'],
            rows: [
              ['$\\mathbb{N}$', 'Liczby naturalne: $\\{1, 2, 3, \\dots\\}$', 'Na wykładzie MiKC $\\mathbb{N}$ zaczyna się od $1$.'],
              ['$\\mathbb{Z}$', 'Liczby całkowite: $\\{\\dots, -2, -1, 0, 1, 2, \\dots\\}$', 'Zawiera ujemne, zero i dodatnie całkowite.'],
              ['$\\mathbb{Q}$', 'Liczby wymierne: $\\{\\frac{p}{q} : p \\in \\mathbb{Z},\\, q \\in \\mathbb{N}\\}$', 'Rozwinięcia dziesiętne skończone lub okresowe.'],
              ['$\\mathbb{R},\\; \\mathbb{C}$', 'Liczby rzeczywiste / liczby zespolone', 'W analizie I pracujemy głównie na podzbiorach $\\mathbb{R}$.'],
              ['$\\neg,\\; \\vee,\\; \\wedge$', 'Negacja (*nieprawda, że*), alternatywa (*lub*), koniunkcja (*i*)', 'Prawa De Morgana: $\\neg(p\\wedge q) \\Leftrightarrow (\\neg p \\vee \\neg q)$.'],
              ['$\\Rightarrow,\\; \\Leftrightarrow$', 'Implikacja (*jeśli…, to…*) i równoważność (*wtedy i tylko wtedy*)', 'Zaprzeczenie implikacji: $\\neg(p \\Rightarrow q) \\Leftrightarrow (p \\wedge \\neg q)$.'],
              ['$\\forall,\\; \\exists$', 'Kwantyfikator ogólny (*dla każdego*) i szczegółowy (*istnieje*)', 'Negacja zamienia kwantyfikatory: $\\neg(\\forall_x P(x)) \\Leftrightarrow \\exists_x \\neg P(x)$.'],
            ],
          },
        ],
      },
      {
        id: 'iloczyn-kartezjanski',
        heading: '1.2. Iloczyn kartezjański $A \\times B$ i jego interpretacja geometryczna (Przykład 1)',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Definicja 1 — Iloczyn kartezjański zbiorów',
            text: 'Niech $A$ i $B$ będą dowolnymi zbiorami. Zbiór wszystkich par uporządkowanych $$A \\times B = \\{(a, b) : a \\in A \\wedge b \\in B\\}$$ nazywamy **iloczynem kartezjańskim** zbiorów $A$ i $B$. Gdy $A, B \\subset \\mathbb{R}$, pary $(a,b)$ utożsamiamy z punktami płaszczyzny $\\mathbb{R}^2$, gdzie pierwsza współrzędna $a$ leży na osi $OX$, a druga $b$ na osi $OY$.',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykład 1 (rozwiązany krok po kroku) — Interpretacja geometryczna $A \\times B$',
            text: '**a) $A = \\{1, 2, 3\\}$, $B = \\{4, 5\\}$:**\nBierzemy każdy element z $A$ jako współrzędną $x$ i łączymy go z każdym elementem z $B$ jako współrzędną $y$. Otrzymujemy dokładnie $3 \\cdot 2 = 6$ izolowanych punktów na płaszczyźnie:\n$$A \\times B = \\{(1,4),\\, (1,5),\\, (2,4),\\, (2,5),\\, (3,4),\\, (3,5)\\}.$$\n\n**b) $A = [1, 2]$, $B = (0, \\infty)$:**\nWspółrzędna $x$ przebiega cały przedział domknięty $1 \\le x \\le 2$, a współrzędna $y$ wszystkie liczby dodatnie $y > 0$. Geometrycznie jest to **pionowy półpas** zawarty między prostymi $x = 1$ oraz $x = 2$ (obie krawędzie pionowe **należą** do zbioru — rysujemy je linią ciągłą), leżący ściśle powyżej osi $OX$ (dolny brzeg $y = 0$ **nie należy** do zbioru — rysujemy go linią przerywaną!).',
          },
          {
            type: 'svg',
            diagramId: 'cartesian-product',
            title: 'Rysunek do Przykładu 1 — Geometria iloczynu kartezjańskiego $A \\times B$ w $\\mathbb{R}^2$',
            caption: 'Przełączaj między podpunktem (a) — 6 punktów dyskretnych — a podpunktem (b) — pionowym półpasem $[1,2] \\times (0,\\infty)$ z przerywaną krawędzią dolną.',
          },
        ],
      },
      {
        id: 'zbiory-ograniczone',
        heading: '1.3. Zbiory ograniczone z dołu, z góry i ograniczone (Definicja 2 i Przykład 2)',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Definicja 2 — Ograniczoność zbioru $A \\subset \\mathbb{R}$',
            text: '• Zbiór $A \\subset \\mathbb{R}$ jest **ograniczony z dołu**, jeśli $$\\exists_{m \\in \\mathbb{R}}\\; \\forall_{x \\in A}\\; x \\ge m.$$ Liczbę $m$ nazywamy *ograniczeniem dolnym* (istnieje ich nieskończenie wiele — jeśli $m$ jest ograniczeniem dolnym, to każda liczba mniejsza od $m$ również nim jest).\n• Zbiór $A \\subset \\mathbb{R}$ jest **ograniczony z góry**, jeśli $$\\exists_{M \\in \\mathbb{R}}\\; \\forall_{x \\in A}\\; x \\le M.$$\n• Zbiór $A$ nazywamy **ograniczonym**, gdy jest ograniczony **jednocześnie z dołu i z góry** (równoważnie: istnieje stała $K > 0$ taka, że $|x| \\le K$ dla wszystkich $x \\in A$).',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykład 2 (rozwiązany krok po kroku) — Badanie ograniczoności zbiorów',
            text: '**1) $A = \\{2, 4, 6, \\dots\\}$:**\n• Każdy element spełnia $x \\ge 2$ (np. $m = 2$, ale też $m = 0$ czy $m = -100$) $\\Rightarrow$ zbiór $A$ jest **ograniczony z dołu**.\n• Dla dowolnego kandydata $M \\in \\mathbb{R}$ znajdziemy parzystą liczbę naturalną większą od $M$ $\\Rightarrow$ **NIE jest ograniczony z góry**, a więc **nie jest ograniczony**.\n\n**2) $B = \\{x \\in \\mathbb{R} : x^2 + 3x + 2 < 0\\}$:**\nRozwiązujemy nierówność kwadratową: rozkładamy trójmian na czynniki:\n$$x^2 + 3x + 2 = (x + 1)(x + 2) < 0 \\iff x \\in (-2, -1).$$\nSkoro dla każdego $x \\in B$ mamy $-2 < x < -1$, to $m = -2$ jest ograniczeniem dolnym, a $M = -1$ górnym (uwaga: ograniczenia $m, M$ **nie muszą należeć do zbioru**!). Zatem $B$ jest **ograniczony** (z dołu i z góry).\n\n**3) $C = \\{\\sin t : t \\in \\mathbb{R}\\}$:**\nZbiór wartości funkcji sinus to przedział $[-1, 1]$. Dla każdego $x \\in C$ zachodzi $-1 \\le x \\le 1$ ($m = -1$, $M = 1$). Zatem zbiór $C$ jest **ograniczony**.',
          },
        ],
      },
    ],
  },
  {
    id: 'analiza-ch2',
    subject_id: 'analiza',
    order_index: 2,
    slug: 'funkcje-wlasnosci-odwrotna-cyklometryczne',
    title: 'Rozdział 2: Funkcje, ich własności, funkcja odwrotna i funkcje cyklometryczne',
    subtitle: 'Dziedzina, zbiór wartości, injekcja/surjekcja/bijekcja, monotoniczność, parzystość, składanie, funkcja odwrotna oraz arcsin, arccos, arctg, arcctg',
    lecture_ref: 'Wykład cz. 1, rozdz. 2 (str. 2–4)',
    estimated_minutes: 30,
    summary:
      'Kompletne opracowanie teorii funkcji jednej zmiennej: dziedzina naturalna, wykresy funkcji sgn(x) i podłogi [x] (Przykład 4), injekcja, surjekcja, bijekcja, monotoniczność, parzystość i okresowość, składanie funkcji (Przykład 5), istnienie i wykres funkcji odwrotnej (Przykład 6), ścisłe definicje i wykresy czterech funkcji cyklometrycznych oraz rozwiązane ćwiczenia z dziedziny i złożeń (sekcja 2.4).',
    exam_questions: [3, 4],
    key_takeaways: [
      'Funkcja ściśle monotoniczna (rosnąca lub malejąca) na zbiorze $A$ jest na tym zbiorze automatycznie różnowartościowa (injekcją — Fakt 1).',
      'Składanie funkcji NIE jest przemienne: $(g \\circ f)(x) = g(f(x))$ na ogół różni się od $(f \\circ g)(x) = f(g(x))$.',
      'Funkcja odwrotna $f^{-1}$ istnieje dla bijekcji $f: X \\to Y$; jej wykres jest symetryczny do wykresu $f$ względem prostej $y = x$ i zachowuje kierunek monotoniczności.',
      'Funkcje trygonometryczne nie są różnowartościowe na całym $\\mathbb{R}$, więc aby je odwrócić, zawężamy ich dziedziny: $\\sin$ na $[-\\frac{\\pi}{2}, \\frac{\\pi}{2}]$, $\\cos$ na $[0, \\pi]$, $\\operatorname{tg}$ na $(-\\frac{\\pi}{2}, \\frac{\\pi}{2})$, $\\operatorname{ctg}$ na $(0, \\pi)$.',
    ],
    figures: [],
    sections: [
      {
        id: 'definicja-funkcji-wykresy',
        heading: '2.1. Funkcja, dziedzina naturalna, wykres oraz $\\operatorname{sgn} x$ i $[x]$ (Przykłady 3–4)',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Definicje 3–5 — Funkcja, dziedzina, przeciwdziedzina, zbiór wartości i wykres',
            text: '**Funkcją** $f: X \\to Y$ nazywamy przyporządkowanie **każdemu** elementowi $x \\in X$ **dokładnie jednego** elementu $y \\in Y$.\n• $X = D_f$ to **dziedzina**, $Y$ to **przeciwdziedzina**, a $ZW_f = \\{f(x) : x \\in D_f\\} \\subset Y$ to **zbiór wartości**.\n• **Dziedzina naturalna** to największy podzbiór $\\mathbb{R}$, dla którego podany wzór ma sens (nie dzielimy przez $0$, pod pierwiastkiem parzystego stopnia $\\ge 0$, argument logarytmu $> 0$, argument $\\arcsin/\\arccos$ w $[-1,1]$).\n• **Wykres funkcji** to podzbiór iloczynu kartezjańskiego: $\\{(x, f(x)) : x \\in X\\}$.',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykład 4 (rozwiązany z rysunkami) — Funkcja znak $\\operatorname{sgn} x$ oraz część całkowita (podłoga) $[x]$',
            text: '**1) Funkcja signum (znak liczby):**\n$$f(x) = \\operatorname{sgn} x = \\begin{cases} -1 & \\text{dla } x < 0, \\\\ 0 & \\text{dla } x = 0, \\\\ 1 & \\text{dla } x > 0. \\end{cases}$$\nJej dziedziną jest $\\mathbb{R}$, zbiorem wartości zbiór 3-elementowy $\\{-1, 0, 1\\}$. W punkcie $x = 0$ ma skok (nie jest tam ciągła!).\n\n**2) Część całkowita / podłoga (cecha) liczby $x$:**\n$g(x) = [x] = \\lfloor x \\rfloor$ to **największa liczba całkowita nie większa od $x$**, czyli jedyna liczba $k \\in \\mathbb{Z}$ taka, że $k \\le x < k + 1$.\n*Uwaga na liczby ujemne!* $[2{,}7] = 2$, $[3] = 3$, ale **$[-0{,}1] = -1$** oraz **$[-2{,}3] = -3$** (bo $-3 \\le -2{,}3 < -2$, a nie $-2$!). Wykres tworzą „schodki” domknięte z lewej strony i otwarte z prawej.',
          },
          {
            type: 'svg',
            diagramId: 'sgn-and-floor',
            title: 'Wykresy do Przykładu 4: funkcja $\\operatorname{sgn} x$ oraz część całkowita $[x] = \\lfloor x \\rfloor$',
            caption: 'Zwróć uwagę na zamalowane kółka (wartość należy do wykresu) i puste kółka (wartość nie należy — przeskok w punkcie całkowitym).',
          },
        ],
      },
      {
        id: 'wlasnosci-skladanie-odwrotna',
        heading: '2.2. Własności funkcji, składanie (Przykład 5) i funkcja odwrotna (Przykład 6)',
        blocks: [
          {
            type: 'table',
            caption: 'Zestawienie podstawowych własności funkcji (Definicje 6–11 i Fakt 1)',
            headers: ['Własność', 'Ścisły warunek matematyczny', 'Intuicja geometryczna / uwagi'],
            rows: [
              ['**Różnowartościowa (injekcja)**', '$\\forall_{x_1, x_2 \\in A}\\; [x_1 \\neq x_2 \\Rightarrow f(x_1) \\neq f(x_2)]$ (równoważnie $f(x_1)=f(x_2) \\Rightarrow x_1=x_2$)', 'Każda prosta pozioma $y = c$ przecina wykres w **co najwyżej jednym** punkcie.'],
              ['**„Na” (surjekcja)**', '$f(X) = Y$, czyli $ZW_f = Y$', 'Każdy element przeciwdziedziny $Y$ jest osiągany jako wartość funkcji.'],
              ['**Bijekcja (wzajemnie jednoznaczna)**', 'Jednocześnie **injekcja** oraz **surjekcja**', 'Warunek konieczny i wystarczający istnienia funkcji odwrotnej $f^{-1}: Y \\to X$.'],
              ['**Rosnąca / Malejąca** *(ściśle monotoniczna)*', '$x_1 < x_2 \\Rightarrow f(x_1) < f(x_2)$ (lub $>$ dla malejącej)', '**Fakt 1:** Każda funkcja ściśle monotoniczna na $A$ jest tam różnowartościowa!'],
              ['**Niemalejąca / Nierosnąca** *(monotoniczna)*', '$x_1 < x_2 \\Rightarrow f(x_1) \\le f(x_2)$ (lub $\\ge$)', 'Dopuszcza płaskie odcinki (np. $[x]$ jest niemalejąca, ale nie jest injekcją).'],
              ['**Parzysta / Nieparzysta**', 'Dziedzina symetryczna ($-x \\in D_f$) oraz $f(-x) = f(x)$ (parzysta) lub $f(-x) = -f(x)$ (nieparzysta)', 'Parzysta: symetria względem osi $OY$ (np. $x^2, \\cos x$). Nieparzysta: symetria względem $(0,0)$ (np. $x^3, \\sin x$).'],
              ['**Okresowa (o okresie $T>0$)**', '$\\exists_{T>0}\\,\\forall_{x\\in D_f}\\; [x \\pm T \\in D_f \\wedge f(x \\pm T) = f(x)]$', 'Wykres powtarza się cyklicznie co $T$ (np. $\\sin x, \\cos x$ z $T = 2\\pi$; $\\operatorname{tg} x$ z $T = \\pi$).'],
            ],
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykład 5 (rozwiązany) — Składanie funkcji nie jest przemienne!',
            text: 'Dane: $f(x) = x^2$ oraz $g(x) = \\cos x$ (obie określone na $\\mathbb{R}$). Obliczamy cztery złożenia zgodnie z $(g \\circ f)(x) = g(f(x))$:\n• $(f \\circ f)(x) = f(f(x)) = (x^2)^2 = x^4$\n• $(f \\circ g)(x) = f(g(x)) = (\\cos x)^2 = \\cos^2 x$\n• $(g \\circ f)(x) = g(f(x)) = \\cos(x^2)$  $\\longleftarrow$ wyraźnie widać, że $\\cos^2 x \\neq \\cos(x^2)$!\n• $(g \\circ g)(x) = g(g(x)) = \\cos(\\cos x)$.',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykład 6 (rozwiązany z wykresem) — Funkcje odwrotne do $f(x)=2^x$ i $g(x)=(\\frac{1}{2})^x$',
            text: 'Aby znaleźć wzór funkcji odwrotnej $f^{-1}$, rozwiązujemy równanie $y = f(x)$ ze względu na $x$, a następnie (dla narysowania w tym samym układzie) zamieniamy nazwy zmiennych $x \\leftrightarrow y$:\n• Dla $f(x) = 2^x$ ($D_f = \\mathbb{R}$, $ZW_f = (0,\\infty)$, ściśle rosnąca $\\Rightarrow$ bijekcja):\n  $$y = 2^x \\iff x = \\log_2 y \\implies f^{-1}(x) = \\log_2 x \\quad (D = (0,\\infty),\\; ZW = \\mathbb{R}).$$\n  Ponieważ $f$ jest rosnąca, $f^{-1}$ też jest rosnąca (Fakt 3).\n• Dla $g(x) = \\left(\\frac{1}{2}\\right)^x$ (ściśle malejąca):\n  $$y = \\left(\\frac{1}{2}\\right)^x \\iff x = \\log_{1/2} y \\implies g^{-1}(x) = \\log_{1/2} x = -\\log_2 x.$$\n  Wykresy $f$ i $f^{-1}$ są zawsze **symetryczne względem prostej $y = x$** (Fakt 2), a ponadto $f^{-1}(f(x)) = x$ oraz $f(f^{-1}(y)) = y$ (Fakt 4).',
          },
        ],
      },
      {
        id: 'funkcje-cyklometryczne',
        heading: '2.3. Funkcje cyklometryczne ($\\arcsin, \\arccos, \\operatorname{arctg}, \\operatorname{arcctg}$) i ćwiczenia',
        blocks: [
          {
            type: 'p',
            text: '**Skąd się biorą zawężenia dziedzin?** Funkcje trygonometryczne są okresowe, więc na całym $\\mathbb{R}$ nie są różnowartościowe (prosta $y = \\frac{1}{2}$ przecina wykres $\\sin x$ nieskończenie wiele razy!). Aby móc je odwrócić, wybieramy **największy naturalny przedział wokół zera, na którym każda z nich jest ściśle monotoniczna** (i osiąga cały swój zbiór wartości). Dopiero tę zawężoną funkcję odwracamy:',
          },
          {
            type: 'table',
            caption: 'Wszystkie 4 funkcje cyklometryczne — dziedziny, zbiory wartości, monotoniczność i asymptoty (Definicja 14)',
            headers: ['Funkcja', 'Odwracany fragment', 'Dziedzina $D$', 'Zbiór wartości $ZW$', 'Monotoniczność / kluczowe własności'],
            rows: [
              ['$y = \\arcsin x$', '$\\sin: [-\\frac{\\pi}{2}, \\frac{\\pi}{2}] \\to [-1, 1]$', '$[-1, 1]$', '$[-\\frac{\\pi}{2}, \\frac{\\pi}{2}]$', 'Ściśle **rosnąca**, nieparzysta: $\\arcsin(-x) = -\\arcsin x$.'],
              ['$y = \\arccos x$', '$\\cos: [0, \\pi] \\to [-1, 1]$', '$[-1, 1]$', '$[0, \\pi]$', 'Ściśle **malejąca**; tożsamość: $\\arcsin x + \\arccos x = \\frac{\\pi}{2}$.'],
              ['$y = \\operatorname{arctg} x$', '$\\operatorname{tg}: (-\\frac{\\pi}{2}, \\frac{\\pi}{2}) \\to \\mathbb{R}$', '$\\mathbb{R}$', '$(-\\frac{\\pi}{2}, \\frac{\\pi}{2})$', 'Ściśle **rosnąca**, nieparzysta; asymptoty poziome $y = \\pm\\frac{\\pi}{2}$.'],
              ['$y = \\operatorname{arcctg} x$', '$\\operatorname{ctg}: (0, \\pi) \\to \\mathbb{R}$', '$\\mathbb{R}$', '$(0, \\pi)$', 'Ściśle **malejąca**; asymptoty $y = 0$ (w $+\\infty$) i $y = \\pi$ (w $-\\infty$); $\\operatorname{arctg} x + \\operatorname{arcctg} x = \\frac{\\pi}{2}$.'],
            ],
          },
          {
            type: 'svg',
            diagramId: 'inverse-and-cyclometric',
            title: 'Interaktywne wykresy: funkcje odwrotne ($2^x / \\log_2 x$, $(1/2)^x / \\log_{1/2} x$) oraz wszystkie 4 funkcje cyklometryczne',
            caption: 'Przełączaj zakładki, aby zobaczyć symetrię względem $y=x$ oraz dokładne dziedziny, zbiory wartości i asymptoty funkcji odwrotnych do trygonometrycznych.',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Rozwiązane ćwiczenia z wykładu (sekcja 2.4, zad. 2 i 3)',
            text: '**Zad. 2: Wyznacz dziedziny $f(x) = \\log_4(\\arcsin x)$ oraz $g(x) = \\arccos(e^x)$.**\n• Dla $f(x) = \\log_4(\\arcsin x)$ potrzebujemy dwóch warunków jednocześnie: (1) argument $\\arcsin$ musi leżeć w $[-1,1]$, oraz (2) argument logarytmu musi być dodatni: $\\arcsin x > 0 \\iff x > 0$. Część wspólna: **$D_f = (0, 1]$**.\n• Dla $g(x) = \\arccos(e^x)$ potrzebujemy $-1 \\le e^x \\le 1$. Ponieważ zawsze $e^x > 0$, lewa nierówność zachodzi dla każdego $x\\in\\mathbb{R}$, a prawa daje $e^x \\le e^0 \\iff x \\le 0$. Zatem **$D_g = (-\\infty, 0]$**.\n\n**Zad. 3: Oblicz $f \\circ g$ i $g \\circ f$ dla $f(x) = \\operatorname{arctg} x$ i $g(x) = \\frac{1}{x}$.**\n• $(f \\circ g)(x) = \\operatorname{arctg}\\left(\\frac{1}{x}\\right)$, dziedzina: $D = \\mathbb{R} \\setminus \\{0\\}$ (bo dzielimy przez $x$).\n• $(g \\circ f)(x) = \\frac{1}{\\operatorname{arctg} x}$, dziedzina: $\\operatorname{arctg} x \\neq 0 \\iff x \\neq 0$, czyli również $D = \\mathbb{R} \\setminus \\{0\\}$.',
          },
        ],
      },
    ],
  },
  {
    id: 'analiza-ch3',
    subject_id: 'analiza',
    order_index: 3,
    slug: 'ciagi-liczbowe-granica-liczba-e',
    title: 'Rozdział 3: Ciągi liczbowe, granica ciągu, liczba $e$ i twierdzenia o zbieżności',
    subtitle: 'Monotoniczność i ograniczoność ciągów, definicja granicy (ε-N), arytmetyka granic, 7 wyrażeń nieoznaczonych, twierdzenie o trzech ciągach oraz liczba Eulera e',
    lecture_ref: 'Wykład cz. 1, rozdz. 3 (str. 4–6)',
    estimated_minutes: 35,
    summary:
      'Wszystko o ciągach liczbowych: badanie monotoniczności (Przykład 7) i ograniczoności (Przykład 8), intuicja i ścisła definicja granicy ciągu $\\forall_{\\varepsilon>0}\\exists_N\\forall_{n>N}|a_n-g|<\\varepsilon$ (Przykład 10), dowód rozbieżności $(-1)^n$ przez podciągi (Przykład 11), arytmetyka granic i obsługa wyrażeń nieoznaczonych (Przykłady 12–15), twierdzenie o trzech ciągach (Przykład 16) oraz konstrukcja i granice z liczbą $e$ (Przykład 17 + wybrane ćwiczenia 3.4).',
    exam_questions: [5, 6, 7, 8],
    key_takeaways: [
      'Każdy ciąg zbieżny jest ograniczony (Tw. 2), ale uwaga: ciąg ograniczony NIE musi być zbieżny (kontrprzykład: $a_n = (-1)^n$).',
      'Twierdzenie 9 (Weierstrassa): Każdy ciąg **monotoniczny i ograniczony** jest zbieżny — dokładnie stąd wiadomo, że ciąg $a_n = (1 + \\frac{1}{n})^n$ ma granicę, którą nazywamy liczbą $e \\approx 2{,}71828\\dots$',
      'Siedem wyrażeń nieoznaczonych: $\\infty - \\infty$, $0 \\cdot \\infty$, $\\frac{0}{0}$, $\\frac{\\infty}{\\infty}$, $1^\\infty$, $\\infty^0$, $0^0$ — nigdy nie zgadujemy ich wartości, zawsze przekształcamy (wyciąganie najwyższej potęgi, sprzężenie, sprowadzenie do $e$).',
      'Kluczowe granice bazowe: $\\lim \\sqrt[n]{a} = 1$ ($a>0$), $\\lim \\sqrt[n]{n} = 1$ oraz jeśli $a_n \\to 0$, to $\\lim (1 + a_n)^{1/a_n} = e$.',
    ],
    figures: [],
    sections: [
      {
        id: 'ciagi-monotonicznosc-ograniczonosc',
        heading: '3.1. Definicja ciągu, monotoniczność i ograniczoność (Przykłady 7–9)',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Definicje 15–17 — Ciąg liczbowy, monotoniczność i ograniczoność',
            text: '**Ciąg liczbowy** $(a_n)$ to funkcja $a: \\mathbb{N} \\to \\mathbb{R}$ określona na liczbach naturalnych (zadawana wzorem jawnym, rekurencyjnie — np. ciąg Fibonacciego $d_1=d_2=1, d_{n+2}=d_{n+1}+d_n$ — albo opisowo).\n• Aby zbadać monotoniczność, liczymy różnicę **$a_{n+1} - a_n$** (gdy stale $> 0$ $\\Rightarrow$ rosnący; stale $< 0$ $\\Rightarrow$ malejący) lub dla ciągów o wyrazach dodatnich iloraz **$\\frac{a_{n+1}}{a_n}$** (porównujemy z $1$).\n• Ciąg $(a_n)$ jest **ograniczony**, gdy zbiór jego wyrazów $\\{a_n : n \\in \\mathbb{N}\\}$ jest ograniczony z dołu i z góry.',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykłady 7 i 8 (rozwiązane krok po kroku)',
            text: '**Przykład 7 — Monotoniczność ciągu $a_n = \\frac{n}{n+1}$:**\nBadamy znak różnicy $a_{n+1} - a_n$:\n$$a_{n+1} - a_n = \\frac{n+1}{n+2} - \\frac{n}{n+1} = \\frac{(n+1)^2 - n(n+2)}{(n+2)(n+1)} = \\frac{n^2+2n+1 - (n^2+2n)}{(n+2)(n+1)} = \\frac{1}{(n+2)(n+1)} > 0.$$\nPonieważ różnica jest dodatnia dla każdego $n \\in \\mathbb{N}$, ciąg $(a_n)$ jest **ściśle rosnący**.\n\n**Przykład 8 — Ograniczoność ciągów:**\n• $a_n = \\frac{1}{n}$: dla każdego $n \\ge 1$ mamy $0 < \\frac{1}{n} \\le 1$ $\\Rightarrow$ **ograniczony** (z dołu przez $0$, z góry przez $1$).\n• $b_n = (-1)^n$: wyrazy to na przemian $-1$ i $1$, więc $-1 \\le b_n \\le 1$ $\\Rightarrow$ **ograniczony**.\n• $c_n = n$: mamy $c_n \\ge 1$ (ograniczony z dołu), ale rośnie bez ograniczeń $\\Rightarrow$ **nieograniczony z góry** (więc nie jest ograniczony).',
          },
        ],
      },
      {
        id: 'granica-ciagu-epsilon-podciagi',
        heading: '3.2. Definicja granicy ciągu ($\\varepsilon$-$N$), podciągi i arytmetyka granic (Przykłady 10–15)',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Definicja 18 — Granica właściwa ciągu (zrozumienie kwantyfikatorów!)',
            text: 'Liczba $g \\in \\mathbb{R}$ jest **granicą ciągu $(a_n)$** ($\\lim_{n\\to\\infty} a_n = g$), wtedy i tylko wtedy, gdy $$\\forall_{\\varepsilon > 0}\\; \\exists_{N \\in \\mathbb{N}}\\; \\forall_{n > N}\\; |a_n - g| < \\varepsilon.$$\n**Jak to czytać po ludzku?** Jakkolwiek wąski pas $(g - \\varepsilon,\\, g + \\varepsilon)$ wokół granicy $g$ wybierze przeciwnik, zawsze istnieje próg $N$, od którego **wszystkie** dalsze wyrazy ciągu wpadają do tego pasa i już z niego nie wychodzą (poza pasem może zostać co najwyżej skończenie wiele wyrazów!).',
          },
          {
            type: 'svg',
            diagramId: 'sequence-epsilon-n',
            title: 'Interaktywna wizualizacja definicji granicy ciągu ($\\varepsilon$-$N$) — Przykłady 9, 10 i 11',
            caption: 'Przesuwaj suwak szerokości pasa $\\varepsilon$ i obserwuj, jak zmienia się próg $N$ dla ciągów $1/n \\to 0$, $(1+1/n)^n \\to e$ oraz rozbieżnego $(-1)^n$.',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykłady 10 i 11 (rozwiązane) — Dowód z definicji dla $\\frac{1}{n}$ oraz rozbieżność $(-1)^n$',
            text: '**Przykład 10 — Wykaż z definicji, że $\\lim_{n\\to\\infty} \\frac{1}{n} = 0$:**\nUstalmy dowolne $\\varepsilon > 0$. Szukamy takiego $N \\in \\mathbb{N}$, aby dla każdego $n > N$ zachodziło:\n$$\\left|\\frac{1}{n} - 0\\right| < \\varepsilon \\iff \\frac{1}{n} < \\varepsilon \\iff n > \\frac{1}{\\varepsilon}.$$\nWystarczy zatem przyjąć $N = \\left[\\frac{1}{\\varepsilon}\\right] + 1$. Wtedy dla każdego $n > N$ mamy $n > \\frac{1}{\\varepsilon}$, czyli $|a_n - 0| < \\varepsilon$. Ciąg jest zbieżny do $0$. $\\square$\n\n**Przykład 11 — Czy ciąg $a_n = (-1)^n$ jest zbieżny?**\nKorzystamy z **Twierdzenia 5** (*każdy podciąg ciągu zbieżnego ma tę samą granicę*):\n• Podciąg wyrazów parzystych: $a_{2k} = (-1)^{2k} = 1 \\longrightarrow 1$.\n• Podciąg wyrazów nieparzystych: $a_{2k-1} = (-1)^{2k-1} = -1 \\longrightarrow -1$.\nPonieważ dwa podciągi zbiegają do **różnych granic** ($1 \\neq -1$), ciąg $a_n = (-1)^n$ jest **rozbieżny**! *(Jest to klasyczny przykład ciągu ograniczonego, lecz rozbieżnego.)*',
          },
          {
            type: 'callout',
            variant: 'theorem',
            title: 'Twierdzenia 3, 6 i 7 — Granice podstawowe, arytmetyka granic i 7 wyrażeń nieoznaczonych',
            text: '• **Tw. 3:** Dla $a > 0$: $\\lim_{n\\to\\infty}\\sqrt[n]{a} = 1$ oraz $\\lim_{n\\to\\infty}\\sqrt[n]{n} = 1$.\n• **Tw. 6 (Arytmetyka granic skończonych):** Granica sumy/różnicy/iloczynu/ilorazu (gdy mianownik $\\to b \\neq 0$)/potęgi/pierwiastka ciągów zbieżnych jest równa odpowiednio sumie/różnicy/iloczynowi/ilorazowi/potędze/pierwiastkowi ich granic.\n• **Tw. 7 (Granice niewłaściwe):** Jeśli $a_n \\to a \\in \\mathbb{R}$ i $b_n \\to +\\infty$, to $a_n + b_n \\to +\\infty$, $a_n b_n \\to +\\infty$ (dla $a > 0$) oraz $\\frac{a_n}{b_n} \\to 0$.\n• **7 wyrażeń nieoznaczonych** (wymagają przekształceń algebraicznych): $$\\infty - \\infty,\\quad 0 \\cdot \\infty,\\quad \\frac{0}{0},\\quad \\frac{\\infty}{\\infty},\\quad 1^\\infty,\\quad \\infty^0,\\quad 0^0.$$',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykłady 12–15 (rozwiązane krok po kroku — techniki usuwania nieoznaczoności)',
            text: '**Przykład 12:** $\\lim_{n\\to\\infty}\\left(\\frac{1}{n} + \\frac{2}{n^2} - \\sqrt[n]{n}\\right) = 0 + 0 - 1 = \\mathbf{-1}$ (z Tw. 3 i Tw. 6).\n\n**Przykład 13:**\n• $\\lim_{n\\to\\infty}(n^3 + 2n^2 + 4n - 3) = \\lim_{n\\to\\infty} n^3\\!\\left(1 + \\frac{2}{n} + \\frac{4}{n^2} - \\frac{3}{n^3}\\right) = [\\infty \\cdot 1] = \\mathbf{+\\infty}$.\n• $\\lim_{n\\to\\infty} \\frac{\\sqrt[n]{n}}{n+4} = \\left[\\frac{1}{\\infty}\\right] = \\mathbf{0}$ (z Tw. 3 i Tw. 7).\n\n**Przykład 14 (dlaczego $\\frac{\\infty}{\\infty}$ jest nieoznaczone!):**\n1) $\\frac{n^2}{n} = n \\to \\mathbf{+\\infty}$, $\\quad$ 2) $\\frac{n}{n^2} = \\frac{1}{n} \\to \\mathbf{0}$, $\\quad$ 3) $\\frac{n}{5n} = \\frac{1}{5} \\to \\mathbf{\\frac{1}{5}}$.\nTen sam symbol $\\frac{\\infty}{\\infty}$ może dać dowolny wynik!\n\n**Przykład 15 — Trzy kluczowe schematy obliczeniowe:**\n1) $\\lim_{n\\to\\infty}(9 + 3n^2 - n^3) = \\lim_{n\\to\\infty} n^3\\!\\left(\\frac{9}{n^3} + \\frac{3}{n} - 1\\right) = [+\\infty \\cdot (-1)] = \\mathbf{-\\infty}$.\n2) $\\lim_{n\\to\\infty}\\frac{9 + 3n^2 - n^3}{n + n^2}$ — dzielimy licznik i mianownik przez najwyższą potęgę mianownika ($n^2$):\n$$= \\lim_{n\\to\\infty}\\frac{\\frac{9}{n^2} + 3 - n}{\\frac{1}{n} + 1} = \\left[\\frac{-\\infty}{1}\\right] = \\mathbf{-\\infty}.$$\n3) $\\lim_{n\\to\\infty}\\left(n\\sqrt{2} - \\sqrt{2n^2 - 3n + 1}\\right)$ — symbol $[\\infty - \\infty]$ z pierwiastkami! Mnożymy i dzielimy przez **sprzężenie** ($a - b = \\frac{a^2 - b^2}{a + b}$):\n$$= \\lim_{n\\to\\infty}\\frac{2n^2 - (2n^2 - 3n + 1)}{n\\sqrt{2} + \\sqrt{2n^2 - 3n + 1}} = \\lim_{n\\to\\infty}\\frac{3n - 1}{n\\!\\left(\\sqrt{2} + \\sqrt{2 - \\frac{3}{n} + \\frac{1}{n^2}}\\right)} = \\frac{3}{\\sqrt{2} + \\sqrt{2}} = \\frac{3}{2\\sqrt{2}} = \\mathbf{\\frac{3\\sqrt{2}}{4}}.$$',
          },
        ],
      },
      {
        id: 'trzy-ciagi-i-liczba-e',
        heading: '3.3. Twierdzenie o trzech ciągach i liczba $e$ (Przykłady 16–17 + ćwiczenia 3.4)',
        blocks: [
          {
            type: 'callout',
            variant: 'theorem',
            title: 'Twierdzenie 8 (o trzech ciągach), Twierdzenie 9, Definicja 21 (liczba $e$) i Twierdzenie 10',
            text: '• **Twierdzenie 8 (o trzech ciągach):** Jeśli dla $n > n_0$ zachodzi $a_n \\le b_n \\le c_n$ oraz $\\lim a_n = \\lim c_n = g$, to $\\lim b_n = g$.\n• **Twierdzenie 9:** Każdy ciąg **monotoniczny i ograniczony** jest zbieżny.\n• **Definicja 21 (Liczba Eulera $e$):** Ciąg $a_n = \\left(1 + \\frac{1}{n}\\right)^n$ jest rosnący i ograniczony (z dołu przez $2$, z góry przez $3$), więc ma granicę oznaczaną przez $e$:\n$$\\lim_{n\\to\\infty}\\left(1 + \\frac{1}{n}\\right)^n = e \\approx 2{,}71828\\dots$$\n• **Twierdzenie 10 (Uogólnienie dla wyrażeń $1^\\infty$):** Jeśli $\\lim_{n\\to\\infty} a_n = 0$ (i $a_n \\neq 0$), to\n$$\\lim_{n\\to\\infty}(1 + a_n)^{\\frac{1}{a_n}} = e.$$',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykłady 16 i 17 + wybrane zadania egzaminacyjne z sekcji 3.4 (krok po kroku)',
            text: '**Przykład 16 (Tw. o trzech ciągach):** Oblicz $\\lim_{n\\to\\infty}\\frac{\\sin(n! + 2023)}{n}$.\nDla każdego $n$ mamy $-1 \\le \\sin(n! + 2023) \\le 1$. Dzieląc przez $n > 0$:\n$$-\\frac{1}{n} \\le \\frac{\\sin(n! + 2023)}{n} \\le \\frac{1}{n}.$$\nPonieważ $-\\frac{1}{n} \\to 0$ oraz $\\frac{1}{n} \\to 0$, z Tw. o trzech ciągach szukana granica wynosi **$0$**.\n\n**Przykład 17 (Wyrażenie typu $1^\\infty$ → liczba $e$):** Oblicz $\\lim_{n\\to\\infty}\\left(\\frac{n+3}{n}\\right)^n$.\nRozbijamy ułamek na $1 + a_n$, a w wykładniku sztucznie tworzymy $\\frac{1}{a_n}$ i rekompensujemy to mnożeniem:\n$$\\lim_{n\\to\\infty}\\left(1 + \\frac{3}{n}\\right)^n = \\lim_{n\\to\\infty}\\left[\\left(1 + \\frac{3}{n}\\right)^{\\frac{n}{3}}\\right]^3 = \\mathbf{e^3}.$$\n\n**Ćwiczenie 3.4 zad. 6 (klasyk z Tw. o trzech ciągach!):** Oblicz $\\lim_{n\\to\\infty}\\sqrt[n]{2^n + 3^n}$.\nSzacujemy przez **największą podstawę** ($3^n$):\n$$3 = \\sqrt[n]{3^n} \\le \\sqrt[n]{2^n + 3^n} \\le \\sqrt[n]{3^n + 3^n} = \\sqrt[n]{2 \\cdot 3^n} = 3\\sqrt[n]{2} \\xrightarrow{n\\to\\infty} 3 \\cdot 1 = 3.$$\nZ Tw. o trzech ciągach granica wynosi **$3$**!\n\n**Ćwiczenie 3.4 zad. 18 (klasyk na $e$):** Oblicz $\\lim_{n\\to\\infty}\\left(\\frac{7n+2}{7n-1}\\right)^{n/3}$.\n$$\\frac{7n+2}{7n-1} = \\frac{(7n-1) + 3}{7n-1} = 1 + \\frac{3}{7n-1} \\implies \\left[\\left(1 + \\frac{3}{7n-1}\\right)^{\\frac{7n-1}{3}}\\right]^{\\frac{3}{7n-1} \\cdot \\frac{n}{3}} \\longrightarrow e^{\\lim \\frac{n}{7n-1}} = \\mathbf{e^{1/7}}.$$',
          },
        ],
      },
    ],
  },
];
