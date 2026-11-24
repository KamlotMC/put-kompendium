export const PROB_CHAPTERS_1_3 = [
  {
    id: 'probabilistyka-ch1',
    subject_id: 'probabilistyka',
    order_index: 1,
    slug: 'historia-i-statystyka-opisowa',
    title: 'Rozdział 1: Rys historyczny i statystyka opisowa danych w ICT',
    subtitle: 'Problem podziału stawek, ruina gracza, histogramy, wartość średnia, wariancja (z wyprowadzeniem wzoru skróconego), odchylenie standardowe, zmienność (burstiness), asymetria, kowariancja i korelacja',
    lecture_ref: 'Wykład 00 + Notatka Wykład 1 (sl. 1–55)',
    estimated_minutes: 35,
    summary:
      'Wprowadzenie do probabilistyki i statystyki w ICT: skąd wywodzi się rachunek prawdopodobieństwa (Pascal, Fermat, Huygens, Bernoulli, Laplace) oraz kompletna parametryzacja danych pomiarowych na przykładzie liczby połączeń z Internetem w biurze (7:00–16:00) — od średniej i wariancji przez współczynnik zmienności (burstiness) i asymetrii aż po kowariancję i współczynnik korelacji liniowej.',
    exam_questions: [1, 2, 3, 4],
    key_takeaways: [
      'Suma odchyleń od średniej ZAWSZE wynosi zero: $\\sum_{i=1}^n (x_i - \\bar{x}) = 0$ — dlatego jako miarę rozproszenia podnosimy odchylenia do kwadratu (wariancja $\\sigma^2$).',
      'Wzór skrócony na wariancję z próby (najwygodniejszy w rachunkach): $\\sigma^2 = \\frac{1}{n}\\sum_{i=1}^n x_i^2 - \\bar{x}^2$ (drugi moment zwykły minus kwadrat pierwszego!).',
      'Odchylenie standardowe $\\sigma = \\sqrt{\\sigma^2}$ ma **te same jednostki co dane** (w przeciwieństwie do wariancji); współczynnik zmienności $V = \\frac{\\sigma}{\\bar{x}}$ (w sieciach: *burstiness*) oraz współczynnik asymetrii $g = \\frac{\\mu_3}{\\sigma^3}$ są **bezwymiarowe**.',
      'Współczynnik korelacji spełnia zawsze $-1 \\le \\operatorname{cor}_{x,y} \\le 1$ i mierzy siłę **liniowej** zależności dwóch serii obserwacji.',
    ],
    figures: [],
    sections: [
      {
        id: 'rys-historyczny',
        heading: '1.1. Skąd wzięła się probabilistyka? (Pascal, Fermat, Huygens, Bernoulli, Laplace)',
        blocks: [
          {
            type: 'p',
            text: 'Rachunek prawdopodobieństwa narodził się w XVII wieku z korespondencji **Blaise’a Pascala** i **Pierre’a de Fermata** (1654), zainspirowanej pytaniami hazardzisty kawalera de Méré. Fundamentalne problemy historyczne z wykładu wciąż stanowią klasyczne modele stochastyczne w inżynierii i teleinformatyce:',
          },
          {
            type: 'list',
            items: [
              {
                title: 'Problem podziału stawek (Pascal & Fermat, 1654)',
                text: 'Dwóch graczy A i B wkłada po 32 pistole do puli; wygrywa ten, kto pierwszy zdobędzie 3 punkty. Gra zostaje przerwana przy stanie $2:1$ dla gracza A. Jak sprawiedliwie podzielić 64 monety? Jeśli zagraliby następną rundę: z prawd. $\\frac{1}{2}$ wygrywa A (bierze 64), z prawd. $\\frac{1}{2}$ jest remis $2:2$ (wtedy sprawiedliwy podział to po 32). Zatem wartość oczekiwana dla A wynosi $\\frac{1}{2}\\cdot 64 + \\frac{1}{2}\\cdot 32 = \\mathbf{48}$ monet (a dla B: **16 monet**, czyli stosunek $3:1$, a nie naiwne $2:1$!).',
              },
              {
                title: 'Problem ruiny gracza — błądzenie przypadkowe (Ch. Huygens, 1657)',
                text: 'Gracz A ma 1 monetę, gracz B ma 2 monety, w każdej rundzie $p = q = \\frac{1}{2}$. Stan kapitału gracza A wędruje po stanach $\\{0, 1, 2, 3\\}$ (0 i 3 to stany pochłaniające). Prawdopodobieństwo wygranej gracza A wynosi dokładnie $\\frac{1}{1+2} = \\frac{1}{3}$, a gracza B: $\\frac{2}{3}$ — to jeden z pierwszych modeli łańcuchów Markowa!',
              },
              {
                title: 'Jakob Bernoulli (Ars Conjectandi, 1713) i Pierre-Simon de Laplace (1812)',
                text: 'Bernoulli udowodnił pierwsze prawo wielkich liczb i wprowadził schemat prób niezależnych, a Laplace sformułował klasyczną definicję prawdopodobieństwa i zastosował analizę matematyczną w statystyce.',
              },
            ],
          },
        ],
      },
      {
        id: 'srednia-wariancja-wyprowadzenie',
        heading: '1.2. Miary położenia i rozproszenia: $\\bar{x}$, $\\sigma^2$, $\\sigma$ i $V$ (przykład 7:00–16:00)',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Wartość średnia, wariancja, odchylenie standardowe i współczynnik zmienności (sl. 32–39)',
            text: 'Dla ciągu $n$ obserwowanych wartości $x_1, x_2, \\dots, x_n$:\n• **Wartość średnia z próby** (1. moment zwykły): $\\bar{x} = \\frac{1}{n}\\sum_{i=1}^n x_i$.\n• **Wariancja z próby** (2. moment centralny): $\\sigma^2 = \\frac{1}{n}\\sum_{i=1}^n (x_i - \\bar{x})^2$.\n• **Odchylenie standardowe:** $\\sigma = \\sqrt{\\sigma^2}$ *(ma te same jednostki co dane $x_i$ — większość obserwacji mieści się w pasie $\\bar{x} \\pm \\sigma$)*.\n• **Współczynnik zmienności (w sieciach ICT: *burstiness* / „pikowość” ruchu):** $V = \\frac{\\sigma}{\\bar{x}}$ *(wielkość bezwymiarowa — pozwala wykrywać anomalie i porównywać różne strumienie ruchu)*.\n\n*Uwaga terminologiczna:* Na wykładzie prowadzącego dla opisu konkretnej próby używa się dzielnika $\\frac{1}{n}$ (tzw. wariancja obciążona / empiryczny 2. moment centralny). W estymacji nieobciążonej statystyki matematycznej spotyka się też $s^2 = \\frac{1}{n-1}\\sum (x_i - \\bar{x})^2$.',
          },
          {
            type: 'callout',
            variant: 'proof',
            title: 'Dlaczego suma odchyleń to $0$ i skąd bierze się wzór obliczeniowy $\\sigma^2 = \\frac{1}{n}\\sum x_i^2 - \\bar{x}^2$?',
            text: '**1) Dlaczego średnia odchyleń $\\bar{r} = \\frac{1}{n}\\sum (x_i - \\bar{x})$ jest bezużyteczna jako miara rozproszenia?**\nKorzystając z liniowości znaku sumy ($\\sum(a_i - b_i) = \\sum a_i - \\sum b_i$ oraz $\\sum_{i=1}^n c = n\\cdot c$):\n$$\\sum_{i=1}^n (x_i - \\bar{x}) = \\sum_{i=1}^n x_i - \\sum_{i=1}^n \\bar{x} = n\\bar{x} - n\\bar{x} = 0.$$\nOdchylenia dodatnie i ujemne ZAWSZE znoszą się idealnie do zera — dlatego podnosimy je do kwadratu!\n\n**2) Wyprowadzenie wzoru skróconego na wariancję (sl. 36):**\n$$\\sigma^2 = \\frac{1}{n}\\sum_{i=1}^n (x_i - \\bar{x})^2 = \\frac{1}{n}\\sum_{i=1}^n \\left(x_i^2 - 2x_i\\bar{x} + \\bar{x}^2\\right)$$\nWyciągamy stałą $\\bar{x}$ przed sumę i wstawiamy $\\sum x_i = n\\bar{x}$ oraz $\\sum \\bar{x}^2 = n\\bar{x}^2$:\n$$= \\frac{1}{n}\\left(\\sum_{i=1}^n x_i^2 - 2\\bar{x}\\underbrace{\\sum_{i=1}^n x_i}_{n\\bar{x}} + \\underbrace{\\sum_{i=1}^n \\bar{x}^2}_{n\\bar{x}^2}\\right) = \\frac{1}{n}\\left(\\sum_{i=1}^n x_i^2 - n\\bar{x}^2\\right) = \\frac{1}{n}\\sum_{i=1}^n x_i^2 - \\bar{x}^2. \\quad \\square$$',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykład z wykładu (sl. 35–38): Liczba połączeń z Internetem w biurze 7:00–16:00 ($n = 9$)',
            text: 'Obserwacje z tabeli: $x = (15, 19, 31, 43, 41, 24, 24, 21, 7)$.\n1. **Średnia:** $\\sum x_i = 225 \\implies \\bar{x} = \\frac{225}{9} = \\mathbf{25}$.\n2. **Odchylenia $x_i - 25$:** $(-10, -6, +6, +18, +16, -1, -1, -4, -18)$ — suma wynosi dokładnie $0$!\n3. **Wariancja z definicji:** $\\sum (x_i - 25)^2 = 100 + 36 + 36 + 324 + 256 + 1 + 1 + 16 + 324 = 1094 \\implies \\sigma^2 = \\frac{1094}{9} \\approx \\mathbf{121{,}56}$.\n4. **Wariancja ze wzoru skróconego:** $\\sum x_i^2 = 225 + 361 + 961 + 1849 + 1681 + 576 + 576 + 441 + 49 = 6719$. Stąd $\\sigma^2 = \\frac{1}{9}(6719 - 9\\cdot 25^2) = \\frac{6719 - 5625}{9} = \\frac{1094}{9} \\approx \\mathbf{121{,}56}$!\n5. **Odchylenie standardowe i zmienność:** $\\sigma = \\sqrt{121{,}56} \\approx \\mathbf{11{,}025}$ połączeń/h, zaś $V = \\frac{11{,}025}{25} = \\mathbf{0{,}441}$ ($44{,}1\\%$).',
          },
          {
            type: 'callout',
            variant: 'warning',
            title: 'Uwaga na drobne literówki ze slajdu 35!',
            text: 'W oryginalnym slajdzie 35 we wzorze u góry wpisano omyłkowo „32, 42, 25” zamiast wartości z tabeli (`31, 41, 24`), a pod ostatnią godziną 15:00–16:00 wpisano odchylenie `−19` zamiast poprawnego `7 − 25 = −18` (kwadrat $324 = (-18)^2$ jest już na slajdzie policzony poprawnie!).',
          },
        ],
      },
      {
        id: 'asymetria-kowariancja-korelacja',
        heading: '1.3. Momenty, współczynnik asymetrii $g$, kowariancja i korelacja $\\operatorname{cor}_{x,y}$',
        blocks: [
          {
            type: 'table',
            caption: 'Porównanie momentów zwykłych i centralnych z próby (Wykład 00 + Notatka Wykład 1)',
            headers: ['Rząd $k$', 'Moment zwykły $\\frac{1}{n}\\sum x_i^k$', 'Moment centralny $\\mu_k = \\frac{1}{n}\\sum (x_i - \\bar{x})^k$'],
            rows: [
              ['$k = 1$', 'Wartość średnia $\\bar{x}$', 'Zawsze równy **$0$**'],
              ['$k = 2$', 'Średnia kwadratów $\\frac{1}{n}\\sum x_i^2$', '**Wariancja** $\\sigma^2 = \\frac{1}{n}\\sum x_i^2 - \\bar{x}^2$'],
              ['$k = 3$', 'Średnia sześcianów', 'Trzeci moment centralny $\\mu_3$ (podstawa **asymetrii** $g = \\frac{\\mu_3}{\\sigma^3}$)'],
            ],
          },
          {
            type: 'callout',
            variant: 'definition',
            title: 'Współczynnik asymetrii $g$, kowariancja $\\operatorname{cov}_{x,y}$ i korelacja $\\operatorname{cor}_{x,y}$ (sl. 41–55)',
            text: '• **Współczynnik asymetrii:** $g = \\frac{\\mu_3}{\\sigma^3} = \\frac{\\frac{1}{n}\\sum (x_i - \\bar{x})^3}{\\sigma^3}$. Dzielenie przez $\\sigma^3$ czyni go bezwymiarowym: $g > 0$ oznacza dłuższy prawy ogon (asymetria prawostronna), $g < 0$ dłuższy lewy ogon, $g = 0$ rozkład symetryczny. Dla danych połączeń z biura $g_x = +0{,}251$.\n• **Kowariancja z próby** (dla par obserwacji $(x_i, y_i)$): $\\operatorname{cov}_{x,y} = \\frac{1}{n}\\sum_{i=1}^n (x_i - \\bar{x})(y_i - \\bar{y})$.\n• **Współczynnik korelacji (znormalizowana kowariancja):**\n$$\\operatorname{cor}_{x,y} = \\frac{\\operatorname{cov}_{x,y}}{\\sigma_x \\sigma_y} = \\frac{1}{n}\\sum_{i=1}^n \\left(\\frac{x_i - \\bar{x}}{\\sigma_x}\\right)\\left(\\frac{y_i - \\bar{y}}{\\sigma_y}\\right), \\qquad -1 \\le \\operatorname{cor}_{x,y} \\le 1.$$',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Dwa przykłady korelacji z wykładu (sl. 52–55)',
            text: '1) **Dwa biura o podobnym rytmie dnia ($y = (5, 34, 43, 44, 41, 34, 10, 7, 5)$):** $\\sigma_x = 11{,}025$, $\\sigma_y = 16{,}506$, suma iloczynów odchyleń $= 1290$, skąd $\\operatorname{cor}_{x,y} = \\frac{1290}{9 \\cdot 11{,}025 \\cdot 16{,}506} = \\mathbf{+0{,}788}$ (silna dodatnia korelacja — gdy w jednym biurze ruch rośnie, w drugim zazwyczaj też).\n2) **Idealna zależność liniowa ujemna ($y_i = 50 - x_i$):** Odchylenia spełniają $y_i - \\bar{y} = -(x_i - \\bar{x})$, więc $\\sigma_y = \\sigma_x = 11{,}025$, $g_y = -g_x = -0{,}251$, a $\\operatorname{cor}_{x,y} = \\frac{-1094}{9 \\cdot (11{,}025)^2} = \\mathbf{-1}$!',
          },
          {
            type: 'svg',
            diagramId: 'prob-descriptive-stats',
            title: 'Wykres interaktywny (Wykład 00): Liczba połączeń z Internetem 7:00–16:00 — średnia, pas $\\bar{x} \\pm \\sigma$ i korelacja',
          },
        ],
      },
    ],
  },
  {
    id: 'probabilistyka-ch2',
    subject_id: 'probabilistyka',
    order_index: 2,
    slug: 'algebra-zdarzen-aksjomaty-kombinatoryka',
    title: 'Rozdział 2: Algebra zdarzeń, aksjomaty Kołmogorowa i kombinatoryka',
    subtitle: 'Operacje na zbiorach, prawa de Morgana, układ zupełny, definicja Laplace’a, geometryczna i aksjomatyczna, prawdopodobieństwo sumy i różnicy oraz wszystkie 6 modeli kombinatoryki',
    lecture_ref: 'Wykład 01 (sl. 1–47)',
    estimated_minutes: 40,
    summary:
      'Formalny fundament rachunku prawdopodobieństwa: przejście od algebry zbiorów do algebry zdarzeń losowych, 3 definicje prawdopodobieństwa (klasyczna Laplace’a, geometryczna i aksjomatyczna Kołmogorowa), dowody wzorów na sumę i różnicę zdarzeń oraz pełny przegląd 6 modeli kombinatorycznych (permutacje, wariacje i kombinacje bez/z powtórzeniami) wraz z porównaniem na pudełku z kulami A, B, C, D.',
    exam_questions: [5, 6, 7, 8],
    key_takeaways: [
      'Zdarzenie losowe to podzbiór przestrzeni zdarzeń elementarnych $\\Omega$; zdarzenia wykluczające się (rozłączne) spełniają $X \\cap Y = \\emptyset$.',
      'Trzy aksjomaty Kołmogorowa: (1) $0 \\le P(X) \\le 1$, (2) $P(\\Omega) = 1$, (3) dla zdarzeń rozłącznych parami $P(\\bigcup X_i) = \\sum P(X_i)$. Wszystkie pozostałe wzory wynikają logicznie z tych trzech aksjomatów!',
      'Wzór włączeń i wyłączeń dla 2 zdarzeń: $P(X \\cup Y) = P(X) + P(Y) - P(X \\cap Y)$ (nie zapominaj odjąć części wspólnej!).',
      'W kombinatoryce zawsze zadaj DWA pytania: (1) czy kolejność ma znaczenie? (TAK → permutacje/wariacje; NIE → kombinacje) oraz (2) czy element wraca do zbioru (powtórzenia)?',
    ],
    figures: [],
    sections: [
      {
        id: 'algebra-zbiorow-zdarzen',
        heading: '2.1. Algebra zbiorów a algebra zdarzeń, prawa de Morgana i układ zupełny',
        blocks: [
          {
            type: 'table',
            caption: 'Słownik przejścia między algebrą zbiorów, algebrą zdarzeń i prawdopodobieństwem (sl. 10–30)',
            headers: ['Zapis', 'Algebra zbiorów', 'Algebra zdarzeń', 'Własność prawdopodobieństwa'],
            rows: [
              ['$\\Omega$', 'Przestrzeń (zbiór wszystkich elementów)', 'Zdarzenie pewne', '$P(\\Omega) = 1$'],
              ['$\\emptyset$', 'Zbiór pusty', 'Zdarzenie niemożliwe', '$P(\\emptyset) = 0$'],
              ['$\\bar{X}$ (lub $X\'$)', 'Dopełnienie zbioru $X$ w $\\Omega$', 'Zdarzenie przeciwne (nie zaszło $X$)', '$P(\\bar{X}) = 1 - P(X)$'],
              ['$X \\cup Y$', 'Suma zbiorów', 'Zaszło co najmniej jedno z $X, Y$', '$P(X\\cup Y) = P(X)+P(Y)-P(X\\cap Y)$'],
              ['$X \\cap Y$', 'Iloczyn (część wspólna)', 'Zaszły oba zdarzenia jednocześnie', '$P(X \\cap Y) = 0$ dla rozłącznych'],
              ['$X \\setminus Y$', 'Różnica zbiorów ($X \\cap \\bar{Y}$)', 'Zaszło $X$, ale nie zaszło $Y$', '$P(X \\setminus Y) = P(X) - P(X \\cap Y)$'],
              ['$X \\subset Y$', 'Zawieranie zbiorów', '$X$ pociąga (implikuje) $Y$', '$P(X) \\le P(Y)$'],
            ],
          },
          {
            type: 'callout',
            variant: 'definition',
            title: 'Prawa de Morgana i Układ zupełny (całkowity) zdarzeń (sl. 6–7)',
            text: '**Prawa de Morgana:** $\\overline{X \\cup Y} = \\bar{X} \\cap \\bar{Y}$ *(nie zaszło żadne $\\iff$ nie zaszło $X$ i nie zaszło $Y$)* oraz $\\overline{X \\cap Y} = \\bar{X} \\cup \\bar{Y}$.\n\n**Układ zupełny (całkowity) zdarzeń $H_1, H_2, \\dots, H_M$:** podzbiory przestrzeni $\\Omega$, które jednocześnie:\n1. są **parami rozłączne**: $H_i \\cap H_j = \\emptyset$ dla każdego $i \\neq j$,\n2. **wypełniają całą przestrzeń**: $H_1 \\cup H_2 \\cup \\dots \\cup H_M = \\Omega$ (wówczas $\\sum_{i=1}^M P(H_i) = 1$).\nUkład zupełny stanowi kluczowe założenie twierdzenia o prawdopodobieństwie całkowitym i wzoru Bayesa!',
          },
        ],
      },
      {
        id: 'definicje-aksjomaty-dowody',
        heading: '2.2. Trzy definicje prawdopodobieństwa (Laplace, geometryczna, Kołmogorow) i dowody wzorów',
        blocks: [
          {
            type: 'callout',
            variant: 'theorem',
            title: 'Trzy definicje prawdopodobieństwa (sl. 12–14)',
            text: '1) **Definicja klasyczna Laplace’a** *(skończona liczba **równoprawdopodobnych** zdarzeń elementarnych)*: $P(X) = \\frac{n_X}{n_\\Omega} = \\frac{|X|}{|\\Omega|}$.\n2) **Definicja geometryczna** *(ciągły obszar $\\Omega$, równomierny rozkład)*: $P(X) = \\frac{\\mu(X)}{\\mu(\\Omega)}$ (stosunek długości, pola lub objętości).\n3) **Definicja aksjomatyczna Kołmogorowa (1933)** *(ogólna — działa zawsze!)*:\n   • **Aksjomat 1:** $0 \\le P(X) \\le 1$.\n   • **Aksjomat 2:** $P(\\Omega) = 1$.\n   • **Aksjomat 3 (addytywność):** Jeśli $X_1, X_2, \\dots$ są parami rozłączne ($X_i \\cap X_j = \\emptyset$), to $P(\\bigcup_i X_i) = \\sum_i P(X_i)$.',
          },
          {
            type: 'callout',
            variant: 'proof',
            title: 'Dowód wzoru na sumę $P(X \\cup Y)$ i różnicę $P(X \\setminus Y)$ wprost z Aksjomatu 3 (sl. 31–32)',
            text: '**1) Różnica zdarzeń:** Rozbijamy $X$ na dwa **rozłączne** kawałki: $X = (X \\setminus Y) \\cup (X \\cap Y)$. Z Aksjomatu 3:\n$$P(X) = P(X \\setminus Y) + P(X \\cap Y) \\implies P(X \\setminus Y) = P(X) - P(X \\cap Y). \\quad \\square$$\n\n**2) Suma dowolnych (niekoniecznie rozłącznych!) zdarzeń:** Zapisujemy $X \\cup Y = X \\cup (Y \\setminus (X \\cap Y))$. Oba składniki są rozłączne, więc z Aksjomatu 3:\n$$P(X \\cup Y) = P(X) + P(Y \\setminus (X \\cap Y)) = P(X) + \\big[P(Y) - P(X \\cap Y)\\big] = P(X) + P(Y) - P(X \\cap Y). \\quad \\square$$\n*Intuicja:* Dodając $P(X) + P(Y)$, policzyliśmy część wspólną $X \\cap Y$ dwukrotnie — dlatego musimy ją raz odjąć!',
          },
        ],
      },
      {
        id: 'kombinatoryka-6-modeli',
        heading: '2.3. Elementy kombinatoryki: zasada iloczynu i 6 modeli losowania (sl. 34–47)',
        blocks: [
          {
            type: 'p',
            text: '**Zasada iloczynu:** Jeśli czynność składa się z $m$ kolejnych kroków, które można wykonać odpowiednio na $n_1, n_2, \\dots, n_m$ sposobów, to łączna liczba sposobów wynosi $N = n_1 \\cdot n_2 \\cdots n_m$ (np. 3 rzuty monetą: $2 \\times 2 \\times 2 = 8$ wyników). Wszystkie wzory kombinatoryki wynikają bezpośrednio z tej zasady:',
          },
          {
            type: 'table',
            caption: 'Kompletna tabela 6 modeli kombinatoryki (na przykładzie pudełka z $n=4$ kulami A, B, C, D i losowania $k=2$)',
            headers: ['Model', 'Kolejność?', 'Powtórzenia?', 'Wzór', 'Wynik dla A, B, C, D ($k=2$ lub $n=4$)'],
            rows: [
              ['**Permutacje bez powtórzeń** $P_n$', 'TAK (wszystkie $n$)', 'NIE', '$P_n = n!$', '$P_4 = 4! = \\mathbf{24}$ (ABCD, ABDC, …)'],
              ['**Permutacje z powtórzeniami** $P_n^{n_1,\\dots,n_k}$', 'TAK (wszystkie $n$)', 'TAK (krotności $n_i$)', '$\\frac{n!}{n_1!\\,n_2!\\cdots n_k!}$', 'Dla A,B,C,C: $\\frac{4!}{1!1!2!} = \\mathbf{12}$; dla A,A,C,C: $\\frac{4!}{2!2!} = \\mathbf{6}$'],
              ['**Wariacje bez powtórzeń** $V_n^k$', 'TAK ($k$ z $n$)', 'NIE', '$V_n^k = \\frac{n!}{(n-k)!}$', '$V_4^2 = \\frac{4!}{2!} = \\mathbf{12}$ (AB $\\neq$ BA, brak AA)'],
              ['**Wariacje z powtórzeniami** $\\bar{V}_n^k$', 'TAK ($k$ z $n$)', 'TAK', '$\\bar{V}_n^k = n^k$', '$\\bar{V}_4^2 = 4^2 = \\mathbf{16}$ (AB $\\neq$ BA oraz AA, BB, CC, DD)'],
              ['**Kombinacje bez powtórzeń** $C_n^k$', 'NIE ($k$ z $n$)', 'NIE', '$C_n^k = \\binom{n}{k} = \\frac{n!}{k!(n-k)!}$', '$C_4^2 = \\frac{V_4^2}{2!} = \\mathbf{6}$ (AB = BA, brak AA)'],
              ['**Kombinacje z powtórzeniami** $\\bar{C}_n^k$', 'NIE ($k$ z $n$)', 'TAK', '$\\bar{C}_n^k = \\binom{n+k-1}{k} = \\frac{(n+k-1)!}{k!(n-1)!}$', '$\\bar{C}_4^2 = \\binom{5}{2} = \\frac{5!}{2!3!} = \\mathbf{10}$ (6 par + AA, BB, CC, DD)'],
            ],
          },
          {
            type: 'callout',
            variant: 'warning',
            title: 'Ważne sprostowanie literówki ze slajdów 37 i 46!',
            text: 'Na slajdach 37 i 46 przy wzorze na kombinacje z powtórzeniami wydrukowano w mianowniku $k!(n-k)!$ zamiast poprawnego **$k!(n-1)!$** — zauważ, że $\\binom{n+k-1}{k} = \\frac{(n+k-1)!}{k!\\cdot((n+k-1)-k)!} = \\frac{(n+k-1)!}{k!(n-1)!}$. Już na slajdzie 47 w przykładzie liczbowym ($n=4, k=2$) prowadzący liczy w 100% poprawnie: $\\binom{5}{2} = \\frac{5!}{2!3!} = 10$ (gdzie $3! = (4-1)!$)!',
          },
          {
            type: 'svg',
            diagramId: 'prob-venn-combinatorics',
            title: 'Schemat interaktywny (Wykład 01): Diagram Venna algebry zdarzeń oraz kalkulator 6 modeli kombinatoryki',
          },
        ],
      },
    ],
  },
  {
    id: 'probabilistyka-ch3',
    subject_id: 'probabilistyka',
    order_index: 3,
    slug: 'warunkowe-bayes-niezaleznosc',
    title: 'Rozdział 3: Prawdopodobieństwo warunkowe, Twierdzenie Bayesa i niezależność zdarzeń',
    subtitle: 'Definicja i aksjomaty P(X|Y), wzór mnożenia, prawdopodobieństwo zupełne, Twierdzenie Bayesa (hipotezy a posteriori), niezależność parzysta vs zespołowa (20 vs 21 kul, 4 vs 5 urządzeń)',
    lecture_ref: 'Wykład 02 (sl. 1–50)',
    estimated_minutes: 45,
    summary:
      'Jeden z najważniejszych działów probabilistyki: jak dodatkowa informacja (warunek $Y$) zawęża przestrzeń zdarzeń $\\Omega$ do $Y$, dlaczego prawdopodobieństwo warunkowe samo spełnia aksjomaty Kołmogorowa, jak obliczać prawdopodobieństwo zupełne i odwracać przyczyny ze skutków wzorem Bayesa oraz kluczowa różnica między rozłącznością a niezależnością (i między niezależnością parami a niezależnością zespołową!).',
    exam_questions: [9, 10, 11, 12],
    key_takeaways: [
      'Prawdopodobieństwo warunkowe $P(X|Y) = \\frac{P(X \\cap Y)}{P(Y)}$ ($P(Y) > 0$) to po prostu zawężenie całej przestrzeni zdarzeń z $\\Omega$ do zbioru $Y$.',
      'Prawdopodobieństwo zupełne dla układu zupełnego hipotez $H_1, \\dots, H_N$: $P(Y) = \\sum_{i=1}^N P(Y|H_i)P(H_i)$.',
      'Twierdzenie Bayesa odwraca warunkowanie — wyznacza prawdopodobieństwo przyczyny (hipotezy) po zajściu skutku $Y$: $P(H_i|Y) = \\frac{P(Y|H_i)P(H_i)}{\\sum_{j=1}^N P(Y|H_j)P(H_j)}$.',
      '**NIE MYL rozłączności z niezależnością!** Dwa zdarzenia o niezerowych prawdopodobieństwach, które są rozłączne ($X \\cap Y = \\emptyset$), są skrajnie **ZALEŻNE** (zajście jednego wyklucza drugie: $P(X|Y) = 0 \\neq P(X)$)! Ponadto niezależność parami NIE gwarantuje niezależności zespołowej (przykład 4 urządzeń)!',
    ],
    figures: [],
    sections: [
      {
        id: 'prawdopodobienstwo-warunkowe',
        heading: '3.1. Prawdopodobieństwo warunkowe $P(X|Y)$ — definicja, dowód aksjomatów i przykłady',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Prawdopodobieństwo warunkowe i wzór mnożenia (Wykład 02, sl. 2–12)',
            text: 'Prawdopodobieństwem warunkowym zdarzenia $X$ pod warunkiem zajścia zdarzenia $Y$ (przy $P(Y) > 0$) nazywamy liczbę:\n$$P(X \\mid Y) = \\frac{P(X \\cap Y)}{P(Y)} \\iff P(X \\cap Y) = P(X \\mid Y)\\cdot P(Y) = P(Y \\mid X)\\cdot P(X).$$\n**Interpretacja:** Skoro wiemy, że zaszło $Y$, zbiór $Y$ staje się naszą nową przestrzenią zdarzeń elementarnych, a sprzyjają nam tylko elementy z części wspólnej $X \\cap Y$.\n**Własność (sl. 8–12):** Funkcja $X \\mapsto P(X \\mid Y)$ spełnia wszystkie 3 aksjomaty Kołmogorowa: $0 \\le P(X|Y) \\le 1$ (bo $X \\cap Y \\subset Y$), $P(\\Omega|Y) = \\frac{P(Y)}{P(Y)} = 1$, oraz dla rozłącznych $X_1, X_2$: $P(X_1 \\cup X_2 | Y) = \\frac{P((X_1\\cap Y)\\cup(X_2\\cap Y))}{P(Y)} = P(X_1|Y) + P(X_2|Y)$.',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykłady z Wykładu 02: Dwie kostki (sl. 3–6) oraz 4 kule białe i 3 czarne (sl. 13–18)',
            text: '**Przykład A (dwie kostki):** $X$ — suma oczek $\\le 4$ (6 par: $(1,1),(1,2),(2,1),(1,3),(2,2),(3,1)$); $Y$ — na I kostce wypadła co najmniej dwójka ($30$ par, $P(Y) = \\frac{30}{36}$). Część wspólna $X \\cap Y = \\{(2,1),(2,2),(3,1)\\}$ ma 3 pary, skąd:\n$$P(X \\mid Y) = \\frac{3/36}{30/36} = \\frac{3}{30} = \\mathbf{\\frac{1}{10}} \\quad \\left(\\text{a bezwarunkowe } P(X) = \\frac{6}{36} = \\frac{1}{6}\\right).$$\n\n**Przykład B (4 białe, 3 czarne — losujemy 2 kule bez zwracania; obie białe):**\n• *Metoda 1 (kombinatoryczna, sl. 14):* $P(BB) = \\frac{\\binom{4}{2}}{\\binom{7}{2}} = \\frac{6}{21} = \\mathbf{\\frac{2}{7}}$.\n• *Metoda 2 (kolejnościowa ze wzoru mnożenia, sl. 15–18):* $P(B_1 \\cap B_2) = P(B_1)\\cdot P(B_2 \\mid B_1) = \\frac{4}{7} \\cdot \\frac{3}{6} = \\frac{12}{42} = \\mathbf{\\frac{2}{7}}$. Oba podejścia dają ten sam wynik!',
          },
        ],
      },
      {
        id: 'zupelne-i-bayes',
        heading: '3.2. Prawdopodobieństwo zupełne i Twierdzenie Bayesa (dowody + przykłady z pudełkami i kostkami)',
        blocks: [
          {
            type: 'callout',
            variant: 'theorem',
            title: 'Twierdzenie o prawdopodobieństwie zupełnym i Twierdzenie Bayesa (sl. 20–27)',
            text: 'Niech $H_1, H_2, \\dots, H_N$ tworzą **układ zupełny zdarzeń** ($H_i \\cap H_j = \\emptyset$, $\\bigcup H_i = \\Omega$) oraz $P(H_i) > 0$. Wtedy dla dowolnego zdarzenia $Y$:\n1) **Wzór na prawdopodobieństwo zupełne (całkowite):**\n$$P(Y) = \\sum_{i=1}^N P(Y \\mid H_i)\\,P(H_i).$$\n2) **Twierdzenie Bayesa** (dla $P(Y) > 0$):\n$$P(H_i \\mid Y) = \\frac{P(H_i \\cap Y)}{P(Y)} = \\frac{P(Y \\mid H_i)\\,P(H_i)}{\\sum_{j=1}^N P(Y \\mid H_j)\\,P(H_j)}.$$\n*Dowód w 2 linijkach:* Skoro $\\bigcup H_i = \\Omega$, to $Y = Y \\cap \\Omega = \\bigcup_{i=1}^N (H_i \\cap Y)$ jest sumą zdarzeń parami rozłącznych. Z Aksjomatu 3 i definicji $P(H_i \\cap Y) = P(Y|H_i)P(H_i)$ dostajemy wzór zupełny, a podstawiając go do mianownika $P(H_i|Y) = \\frac{P(H_i \\cap Y)}{P(Y)}$, otrzymujemy od razu wzór Bayesa. $\\square$',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykład 2 (sl. 23–25: 3 pudełka) oraz Przykład z kostkami dla Bayesa (sl. 29–34)',
            text: '**1) Trzy pudełka (prawdopodobieństwo zupełne + Bayes):**\n• Pudełko 1: 4 białe, 2 czarne $\\implies P(Y|H_1) = \\frac{4}{6} = \\frac{2}{3}$.\n• Pudełko 2: 2 białe, 4 czarne $\\implies P(Y|H_2) = \\frac{2}{6} = \\frac{1}{3}$.\n• Pudełko 3: 3 białe, 3 czarne $\\implies P(Y|H_3) = \\frac{3}{6} = \\frac{1}{2}$.\nWybór każdego pudełka jest jednakowo prawdopodobny: $P(H_1)=P(H_2)=P(H_3)=\\frac{1}{3}$.\nPrawdopodobieństwo wylosowania białej kuli:\n$$P(Y) = \\frac{1}{3}\\cdot\\frac{2}{3} + \\frac{1}{3}\\cdot\\frac{1}{3} + \\frac{1}{3}\\cdot\\frac{1}{2} = \\frac{2}{9} + \\frac{1}{9} + \\frac{1}{6} = \\mathbf{\\frac{1}{2}}.$$\nA jeśli wiemy, że wylosowano białą kulę, jakie jest prawd., że pochodziła z pudełka nr 1? Z Bayesa: $P(H_1|Y) = \\frac{\\frac{1}{3}\\cdot\\frac{2}{3}}{1/2} = \\mathbf{\\frac{4}{9}} \\approx 44{,}4\\%$!\n\n**2) Interpretacja Bayesa na dwóch kostkach (sl. 29–34):** Znamy skutek $Y$: suma oczek $\\le 4$ ($P(Y) = \\frac{6}{36} = \\frac{1}{6}$). Hipotezy $H_i$ ($i=1\\dots 6$): na pierwszej kostce wypadło $i$ oczek ($P(H_i)=\\frac{1}{6}$).\n• $P(Y|H_1) = \\frac{3}{6}$ *(pary $(1,1),(1,2),(1,3)$)* $\\implies P(H_1|Y) = \\frac{(1/6)(3/6)}{6/36} = \\mathbf{\\frac{3}{6} = \\frac{1}{2}}$.\n• $P(Y|H_2) = \\frac{2}{6}$ *(pary $(2,1),(2,2)$)* $\\implies P(H_2|Y) = \\mathbf{\\frac{2}{6} = \\frac{1}{3}}$.\n• $P(Y|H_3) = \\frac{1}{6}$ *(para $(3,1)$)* $\\implies P(H_3|Y) = \\mathbf{\\frac{1}{6}}$ (a dla $i=4,5,6$: $0$!).',
          },
          {
            type: 'svg',
            diagramId: 'prob-bayes-tree',
            title: 'Diagram interaktywny (Wykład 02): Drzewo prawdopodobieństwa zupełnego i aktualizacja a posteriori Bayesa',
          },
        ],
      },
      {
        id: 'niezaleznosc-zdarzen',
        heading: '3.3. Niezależność zdarzeń: 20 vs 21 kul, niezależność a rozłączność oraz przykład 4 urządzeń!',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Niezależność dwóch zdarzeń i niezależność zespołowa (sl. 35–46)',
            text: '• **Dwa zdarzenia $X, Y$ są niezależne** $\\iff P(X \\cap Y) = P(X)\\cdot P(Y)$ (równoważnie dla $P(Y)>0$: $P(X|Y) = P(X)$ — wiedza o $Y$ nie zmienia szansy na $X$!).\n• **Konsekwencja (sl. 41):** Jeśli $X, Y$ są niezależne, to niezależne są również pary $(X, \\bar{Y})$, $(\\bar{X}, Y)$ oraz $(\\bar{X}, \\bar{Y})$! *(Dowód dla $(X, \\bar{Y})$: $P(X \\cap \\bar{Y}) = P(X) - P(X \\cap Y) = P(X) - P(X)P(Y) = P(X)(1 - P(Y)) = P(X)P(\\bar{Y})$. $\\square$)*\n• **Niezależność zespołowa** $X_1, \\dots, X_N$ wymaga, aby dla **KAŻDEGO podzbioru** indeksów $i_1 < \\dots < i_k$ ($k \\ge 2$) zachodziło $P(X_{i_1} \\cap \\dots \\cap X_{i_k}) = P(X_{i_1})\\cdots P(X_{i_k})$ (dla 3 zdarzeń $A,B,C$: 3 równości parami ORAZ 1 równość dla całej trójki!).',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Dwa genialne przykłady z Wykładu 02 (ulubione pytania egzaminacyjne!)',
            text: '**1) Wpływ przestrzeni $\\Omega$ na niezależność — 20 kul vs 21 kul (sl. 36–37):**\n$X$: numer kuli podzielny przez 3; $Y$: numer podzielny przez 7.\n• **Urna 1–20:** $X=\\{3,6,9,12,15,18\\}$ ($P(X)=\\frac{6}{20}$), $Y=\\{7,14\\}$ ($P(Y)=\\frac{2}{20}$), ale $X \\cap Y = \\emptyset \\implies P(X\\cap Y) = 0 \\neq \\frac{12}{400}$! Zdarzenia są rozłączne, a więc **ZALEŻNE**!\n• **Urna 1–21 (dodajemy jedną kulę nr 21!):** $P(X)=\\frac{7}{21}=\\frac{1}{3}$, $P(Y)=\\frac{3}{21}=\\frac{1}{7}$, a $X \\cap Y = \\{21\\} \\implies P(X \\cap Y) = \\frac{1}{21} = \\frac{1}{3}\\cdot\\frac{1}{7} = P(X)P(Y)$! Zdarzenia stały się **NIEZALEŻNE**!\n*Wniosek prowadzącego:* Rozłączność NIE zależy od przestrzeni, natomiast niezależność JEST własnością wrażliwą na zmianę przestrzeni $\\Omega$!\n\n**2) Niezależność parami NIE implikuje niezależności zespołowej — 4 urządzenia (sl. 47–48):**\nTestujemy 4 urządzenia: nr 1 psuje tylko wyjście $A$, nr 2 tylko $B$, nr 3 tylko $C$, a nr 4 psuje wszystkie trzy ($A,B,C$). Wybieramy losowo 1 urządzenie:\n• $P(A) = P(B) = P(C) = \\frac{2}{4} = \\frac{1}{2}$.\n• Dla każdej pary: $P(A\\cap B) = P(A\\cap C) = P(B\\cap C) = \\frac{1}{4} = \\frac{1}{2}\\cdot\\frac{1}{2} \\implies$ są **parami niezależne**!\n• Dla całej trójki: $P(A \\cap B \\cap C) = \\frac{1}{4} \\neq \\frac{1}{2}\\cdot\\frac{1}{2}\\cdot\\frac{1}{2} = \\frac{1}{8} \\implies$ **NIE są niezależne zespołowo**! (Jeśli wiemy, że zaszło $A$ i $B$, to MUSI to być urządzenie nr 4, więc $C$ zachodzi z pewnością $1 \\neq \\frac{1}{2}$!)\n• Gdy dołożymy 5. urządzenie psujące $A,B,C$ (sl. 49–50): $P(A)=\\frac{3}{5}$, $P(A\\cap B) = \\frac{2}{5} \\neq \\frac{9}{25}$ — tracimy nawet niezależność parami!',
          },
        ],
      },
    ],
  },
];
