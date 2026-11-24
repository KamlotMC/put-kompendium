export const PROB_CHAPTERS_4_6 = [
  {
    id: 'probabilistyka-ch4',
    subject_id: 'probabilistyka',
    order_index: 4,
    slug: 'zmienne-losowe-dystrybuanta-gestosc',
    title: 'Rozdział 4: Zmienne losowe, dystrybuanta, gęstość i całkowy wzór Bayesa',
    subtitle: 'Dystrybuanta F(x) i jej własności, zmienna dyskretna (schodkowa), zmienna ciągła i gęstość f(x) = F\'(x), Przykłady 1–4 (kontrola jakości), całkowa postać Bayesa oraz zmienna mieszana (opóźnienie pociągu)',
    lecture_ref: 'Wykład 03 (sl. 1–36)',
    estimated_minutes: 40,
    summary:
      'Przejście od zdarzeń losowych do funkcji liczbowych — zmiennych losowych dyskretnych, ciągłych i mieszanych. Własności dystrybuanty $F(x)$, mechaniczna interpretacja gęstości prawdopodobieństwa $f(x) = F\'(x)$ jako „rozmazanej masy jednostkowej”, obliczenia prawdopodobieństw przedziałowych (Przykłady 1–2), całkowa postać prawdopodobieństwa zupełnego i wzoru Bayesa (Przykłady 3–4) oraz zmienna mieszana z punktem skoku (Przykład 5).',
    exam_questions: [13, 14, 15, 16],
    key_takeaways: [
      'Dystrybuanta $F(x) = P(X < x)$ (w konwencji wykładu prowadzącego: lewostronnie ciągła) jest niemalejąca, przyjmuje wartości w $[0, 1]$ z granicami $F(-\\infty) = 0$ oraz $F(+\\infty) = 1$, a $P(x_1 \\le X < x_2) = F(x_2) - F(x_1)$.',
      'Dla zmiennej **ciągłej** prawdopodobieństwo każdego pojedynczego punktu wynosi **zero** ($P(X = x_0) = 0$), co NIE znaczy, że zdarzenie jest niemożliwe! Prawdopodobieństwo liczymy całką z gęstości: $P(x_1 < X < x_2) = \\int_{x_1}^{x_2} f(x)\\,dx$.',
      'Warunki bycia gęstością prawdopodobieństwa: (1) $f(x) \\ge 0$ wszędzie oraz (2) warunek normalizacji $\\int_{-\\infty}^{+\\infty} f(x)\\,dx = 1$. Uwaga: sama gęstość $f(x)$ **MOŻE być większa od 1** (bo to gęstość, nie prawdopodobieństwo — tylko całka musi równać się 1!).',
      'Całkowa postać wzoru zupełnego i Bayesa powstaje przez zamianę $\\sum$ na $\\int$ i $P(H_i)$ na element prawdopodobieństwa $f(x)\\,dx$: $P(Y) = \\int_{-\\infty}^{\\infty} P(Y|x)f(x)\\,dx$ oraz $f(x|Y) = \\frac{f(x)P(Y|x)}{P(Y)}$.',
    ],
    figures: [],
    sections: [
      {
        id: 'dystrybuanta-i-zmienna-dyskretna',
        heading: '4.1. Zmienna losowa, dystrybuanta $F(x)$ i rozkład dyskretny (sl. 1–13)',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Dystrybuanta zmiennej losowej $F(x)$ i jej 5 podstawowych własności (sl. 3–7)',
            text: '**Zmienna losowa $X$** przypisuje każdemu zdarzeniu elementarnemu $\\omega \\in \\Omega$ liczbę rzeczywistą. Jej prawo probabilistyczne jednoznacznie opisuje **dystrybuanta** (na wykładzie prowadzącego w konwencji polskiej: $F(x) = P(X < x)$):\n1. $0 \\le F(x) \\le 1$ dla każdego $x \\in \\mathbb{R}$.\n2. $F(x)$ jest funkcją **niemalejącą**: $x_1 < x_2 \\implies F(x_1) \\le F(x_2)$.\n3. Granice w nieskończonościach: $\\lim_{x\\to -\\infty} F(x) = 0$ oraz $\\lim_{x\\to +\\infty} F(x) = 1$.\n4. Prawdopodobieństwo przedziałowe: $P(x_1 \\le X < x_2) = F(x_2) - F(x_1)$.\n5. W konwencji $P(X < x)$ dystrybuanta jest **ciągła lewostronnie** (a przy definicji $P(X \\le x)$ — prawostronnie; dla zmiennych ciągłych obie definicje są identyczne!).\n\nDla **zmiennej dyskretnej** o wartościach $x_1 < x_2 < \\dots$ i prawdopodobieństwach $p_i = P(X = x_i)$ ($\\sum p_i = 1$) dystrybuanta jest funkcją **schodkową**: $F(x) = \\sum_{x_i < x} p_i$, gdzie wysokość skoku w punkcie $x_i$ wynosi dokładnie $p_i$.',
          },
        ],
      },
      {
        id: 'gestosc-i-przyklady-1-2',
        heading: '4.2. Zmienna ciągła, funkcja gęstości $f(x) = F\'(x)$ i Przykłady 1–2 (sl. 14–25)',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Gęstość prawdopodobieństwa $f(x)$ i element prawdopodobieństwa $f(x)\\,dx$ (sl. 14–21)',
            text: 'W interpretacji mechanicznej dla zmiennej ciągłej jednostkowa masa $1$ jest „rozmazana” w sposób ciągły wzdłuż osi $OX$. Średnia gęstość masy na przedziale $[x, x+\\Delta x)$ wynosi $\\frac{F(x+\\Delta x)-F(x)}{\\Delta x}$, a w granicy przy $\\Delta x \\to 0$ dostajemy **funkcję gęstości prawdopodobieństwa**:\n$$f(x) = F\'(x) = \\frac{dF(x)}{dx}, \\qquad F(x) = \\int_{-\\infty}^x f(t)\\,dt.$$\n**Własności gęstości:**\n1. $f(x) \\ge 0$ dla każdego $x \\in \\mathbb{R}$ (bo $F$ jest niemalejąca).\n2. **Element prawdopodobieństwa:** $P(x \\le X < x + dx) \\approx f(x)\\,dx$ (pole nieskończenie wąskiego paska).\n3. **Prawdopodobieństwo przedziałowe:** $P(x_1 < X < x_2) = \\int_{x_1}^{x_2} f(x)\\,dx = F(x_2) - F(x_1)$ (dla zmiennej ciągłej znaki $<$ i $\\le$ nie zmieniają wyniku, bo $P(X=x_0) = 0$!).\n4. **Warunek normalizacyjny:** $\\int_{-\\infty}^{+\\infty} f(x)\\,dx = 1$.',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykłady 1 i 2 z Wykładu 03 (rozwiązane krok po kroku)',
            text: '**Przykład 1 (od dystrybuanty do gęstości, sl. 22–23):** Dana jest $F(x) = 0$ dla $x \\le 0$, $F(x) = x^2$ dla $0 < x < 1$ oraz $F(x) = 1$ dla $x \\ge 1$ *(uwaga: na sl. 22 w 3. wierszu jest drobna literówka `dla x > 0` zamiast `dla x >= 1`)*. Oblicz $P(0{,}25 < X < 0{,}5)$ za pomocą $f(x)$:\n• Różniczkujemy: $f(x) = F\'(x) = 2x$ dla $0 < x < 1$ (oraz $0$ poza $(0, 1)$). *(Zauważ: w $x = 0{,}9$ mamy $f(0{,}9) = 1{,}8 > 1$, co jest w pełni poprawne dla gęstości!)*\n• Całkujemy: $P(0{,}25 < X < 0{,}5) = \\int_{0{,}25}^{0{,}5} 2x\\,dx = \\big[x^2\\big]_{0{,}25}^{0{,}5} = 0{,}25 - 0{,}0625 = \\mathbf{0{,}1875}$.\n\n**Przykład 2 (od gęstości wykładniczej do dystrybuanty, sl. 24–25):** $f(x) = e^{-x}$ dla $x > 0$ (i $0$ dla $x \\le 0$). Oblicz $P(1 < X < 2)$:\n• Całkujemy: dla $x > 0$ mamy $F(x) = \\int_0^x e^{-t}\\,dt = \\big[-e^{-t}\\big]_0^x = \\mathbf{1 - e^{-x}}$.\n• Stąd $P(1 < X < 2) = F(2) - F(1) = (1 - e^{-2}) - (1 - e^{-1}) = e^{-1} - e^{-2} \\approx 0{,}368 - 0{,}135 = \\mathbf{0{,}233}$.',
          },
        ],
      },
      {
        id: 'calkowy-bayes-i-mieszana',
        heading: '4.3. Całkowa postać wzoru zupełnego i Bayesa (Przykłady 3–4) oraz zmienna mieszana (Przykład 5)',
        blocks: [
          {
            type: 'callout',
            variant: 'theorem',
            title: 'Całkowa postać wzoru zupełnego i wzoru Bayesa (sl. 26–29)',
            text: 'Gdy hipotezą nie jest dyskretny indeks $H_i$, lecz wartość $x$ ciągłej zmiennej losowej $X$ o gęstości $f(x)$, zamieniamy sumę $\\sum$ na całkę $\\int$, a $P(H_i)$ na element prawdopodobieństwa $f(x)\\,dx$:\n$$P(Y) = \\int_{-\\infty}^{+\\infty} P(Y \\mid x)\\,f(x)\\,dx, \\qquad f(x \\mid Y) = \\frac{f(x)\\,P(Y \\mid x)}{P(Y)} = \\frac{f(x)\\,P(Y \\mid x)}{\\int_{-\\infty}^{+\\infty} P(Y \\mid t)\\,f(t)\\,dt}.$$',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykłady 3, 4 i 5 z Wykładu 03 (sl. 27–36)',
            text: '**Przykład 3 (całkowe prawdopodobieństwo zupełne):** $X$ ma jednostajną gęstość $f(x) = 1$ na $(0, 1)$, a $P(Y \\mid x) = x^2$. Bezwarunkowe prawdopodobieństwo zdarzenia $Y$:\n$$P(Y) = \\int_0^1 x^2 \\cdot 1\\,dx = \\left[\\frac{x^3}{3}\\right]_0^1 = \\mathbf{\\frac{1}{3}}.$$\n\n**Przykład 4 (kontrola jakości — rozkład ucięty z Bayesa!):** Długość elementu $X$ ma gęstość $f(x)$. Kontrola przepuszcza tylko elementy z przedziału $(l_1, l_2)$, czyli $P(Y|x) = 1$ dla $x \\in (l_1, l_2)$ oraz $0$ poza tym przedziałem. Prawdopodobieństwo przejścia kontroli to $P(Y) = \\int_{l_1}^{l_2} f(x)\\,dx$. Stąd gęstość warunkowa elementów zaakceptowanych (przeskalowana w górę tak, by pole na $(l_1, l_2)$ nadal wynosiło $1$!):\n$$f(x \\mid Y) = \\begin{cases} \\dfrac{f(x)}{\\int_{l_1}^{l_2} f(t)\\,dt} & \\text{dla } x \\in (l_1, l_2), \\\\ 0 & \\text{poza } (l_1, l_2). \\end{cases}$$\n\n**Przykład 5 (zmienna losowa mieszana):** Czas opóźnienia pociągu $T \\ge 0$ (zakładamy, że nigdy nie przyjeżdża za wcześnie). Z niezerowym prawdopodobieństwem $p_0 = P(T = 0) > 0$ pociąg jest **punktualny** (skok dystrybuanty w $t = 0$!), a jeśli się spóźnia ($T > 0$), opóźnienie zmienia się ciągle (gładka krzywa $F(t)$ rosnąca od $p_0$ do $1$). To idealny przykład **zmiennej mieszanej**!',
          },
          {
            type: 'svg',
            diagramId: 'prob-cdf-pdf-mixed',
            title: 'Wykresy interaktywne (Wykład 03): Dystrybuanta, gęstość (Przykłady 1–2), ucięta gęstość z kontroli jakości (Przykład 4) i zmienna mieszana (Przykład 5)',
          },
        ],
      },
    ],
  },
  {
    id: 'probabilistyka-ch5',
    subject_id: 'probabilistyka',
    order_index: 5,
    slug: 'charakterystyki-momenty-markow-czebyszew',
    title: 'Rozdział 5: Charakterystyki zmiennych losowych, momenty i nierówności Markowa–Czebyszewa',
    subtitle: 'Wartość oczekiwana E(X) (środek masy + paradoks 2^i), moda, kwantyle i mediana, momenty zwykłe i centralne, własności E i D, reguła 3 sigm, dowody nierówności Markowa i Czebyszewa, asymetria i kurtoza',
    lecture_ref: 'Wykład 04 (sl. 1–32)',
    estimated_minutes: 45,
    summary:
      'Pełna teoria charakterystyk liczbowych zmiennych losowych dyskretnych i ciągłych: wartość oczekiwana $E(X)$ z interpretacją mechaniczną i statystyczną, parametry pozycyjne (moda, mediana, kwantyle, kwartyle), momenty zwykłe i centralne, dowody wszystkich własności $E$ i wariancji $D(X)$, reguła trzech sigm, ścisłe dowody nierówności Markowa i Czebyszewa oraz współczynniki asymetrii $\\gamma_X$ i ekscesu $\\varepsilon_X$.',
    exam_questions: [17, 18, 19, 20],
    key_takeaways: [
      'Liniowość $E(a + bX) = a + bE(X)$ oraz $E(X + Y) = E(X) + E(Y)$ zachodzi **ZAWSZE** (nawet dla zmiennych ZALEŻNYCH!); natomiast $E(XY) = E(X)E(Y)$ oraz $D(X + Y) = D(X) + D(Y)$ wymagają **niezależności** (lub nieskorelowania)!',
      'Wariancja funkcji liniowej: $D(a + bX) = b^2 D(X)$ — stała addytywna $a$ znika (przesunięcie nie zmienia rozproszenia!), a mnożnik $b$ podnosi się do **kwadratu** (nawet gdy $b < 0$, np. $D(10 - 5X) = (-5)^2 D(X) = 25 D(X)$!).',
      'Nierówność Markowa ($X \\ge 0$): $P(X \\ge a) \\le \\frac{E(X)}{a}$. Nierówność Czebyszewa (dowolne $X$ ze skończoną wariancją): $P(|X - E(X)| \\ge a) \\le \\frac{D(X)}{a^2}$ — wynika w 2 linijkach z Markowa dla $Y = (X - E(X))^2$!',
      'Współczynnik ekscesu (kurtoza): $\\varepsilon_X = \\frac{\\mu_X^{(4)}}{\\sigma_X^4} - 3$ (odjęcie $3$ zeruje eksces dla rozkładu normalnego: $\\varepsilon > 0$ smukły/szpiczasty, $\\varepsilon < 0$ spłaszczony).',
    ],
    figures: [],
    sections: [
      {
        id: 'wartosc-oczekiwana-i-pozycyjne',
        heading: '5.1. Wartość oczekiwana $E(X)$, moda, kwantyle i mediana (sl. 1–14)',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Wartość oczekiwana (1. moment zwykły $m_X^{(1)}$) oraz parametry pozycyjne',
            text: '• **Zmienna dyskretna:** $E(X) = \\sum_i x_i p_i$ (dla nieskończonej przeliczalnej — o ile szereg jest bezwzględnie zbieżny!).\n• **Zmienna ciągła:** $E(X) = \\int_{-\\infty}^{+\\infty} x\\,f(x)\\,dx$.\n*Interpretacja mechaniczna (sl. 3–4):* środek masy układu punktów materialnych o masach $p_i$ (np. dla $(x_i, p_i) = (1; 0{,}1), (2{,}4; 0{,}3), (4{,}6; 0{,}5), (6{,}4; 0{,}1)$ dostajemy $E(X) = 0{,}1 + 0{,}72 + 2{,}3 + 0{,}64 = \\mathbf{3{,}76}$ — uwaga: na sl. 4 wydrukowano omyłkowo $4{,}4$!).\n*Interpretacja statystyczna (sl. 6–7):* przy $n \\to \\infty$ średnia arytmetyczna z próby $\\bar{x} = \\sum \\frac{n_k}{n} x_k$ zbiega do $E(X)$.\n\n**Inne parametry pozycyjne (sl. 9–10):**\n• **Moda:** wartość, w której $P(x)$ lub gęstość $f(x)$ osiąga maksimum (najbardziej prawdopodobna wartość).\n• **Kwantyl rzędu $p \\in (0, 1)$:** punkt $x_p$ taki, że $P(X \\le x_p) \\ge p$ i $P(X \\ge x_p) \\ge 1-p$ (dla ciągłej: $F(x_p) = p$).\n• **Mediana ($x_m = x_{0{,}5}$):** dzieli pole pod gęstością dokładnie na pół ($\\frac{1}{2}$ na lewo, $\\frac{1}{2}$ na prawo).\n• **Kwartyle:** dolny $Q_1 = x_{0{,}25}$ i górny $Q_3 = x_{0{,}75}$.',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Kiedy zmienna dyskretna NIE ma wartości oczekiwanej? (sl. 5)',
            text: '1) $x_i = 2^i$, $p_i = \\frac{1}{2^i}$ ($i = 1, 2, \\dots$, uwaga: $\\sum p_i = \\frac{1/2}{1-1/2} = 1$, więc to poprawny rozkład!). Liczymy $E(X) = \\sum_{i=1}^\\infty 2^i \\cdot \\frac{1}{2^i} = \\sum_{i=1}^\\infty 1 = \\mathbf{+\\infty}$ — ta zmienna **NIE ma skończonej wartości oczekiwanej** (słynny paradoks petersburski!).\n2) Dla $x_i = 1^i = 1$ i $p_i = \\frac{1}{2^i}$: $E(X) = \\sum_{i=1}^\\infty \\left(\\frac{1}{2}\\right)^i = \\frac{1/2}{1 - 1/2} = \\mathbf{1}$ (skończona!).',
          },
        ],
      },
      {
        id: 'momenty-wariancja-wlasnosci',
        heading: '5.2. Momenty zwykłe i centralne oraz własności $E(X)$ i wariancji $D(X)$ (sl. 11–24)',
        blocks: [
          {
            type: 'callout',
            variant: 'theorem',
            title: 'Kluczowe własności $E(X)$ i $D(X)$ z dowodami (sl. 11–22)',
            text: '**Wartość oczekiwana:**\n• $E(a + bX) = a + bE(X)$ (w tym $E(a) = a$, $E(bX) = bE(X)$).\n• $E(X + Y) = E(X) + E(Y)$ *(zawsze — przez scałkowanie gęstości brzegowych $h(x) = \\int f(x,y)\\,dy$)*.\n• $E(XY) = E(X)\\cdot E(Y)$ *(dla zmiennych **niezależnych**, bo $f(x,y) = h(x)h(y)$)*.\n\n**Momenty i wariancja ($D(X) = \\sigma_X^2 = \\mu_X^{(2)}$):**\n• Moment zwykły $n$-tego rzędu: $m_X^{(n)} = E(X^n)$. Centralny: $\\mu_X^{(n)} = E[(X - E(X))^n]$ ($\\mu_X^{(1)} = 0$!).\n• **Fundamentalny związek:** $D(X) = E[(X - E(X))^2] = E(X^2) - [E(X)]^2 = m_X^{(2)} - (m_X^{(1)})^2$. *(Trzeci moment: $\\mu_X^{(3)} = m_X^{(3)} - 3 m_X^{(2)} m_X^{(1)} + 2(m_X^{(1)})^3$.)*\n• **Własności wariancji:**\n  1. $D(C) = 0$ (stała nie ma żadnego rozrzutu!).\n  2. $D(a + bX) = b^2 D(X)$.\n  3. Dla **niezależnych** $X, Y$: $D(X + Y) = D(X) + D(Y)$ *(dowód: w $E[(X+Y)^2] - [E(X)+E(Y)]^2$ wyrazy mieszane $2E(XY)$ i $-2E(X)E(Y)$ znoszą się dokładnie dzięki niezależności!)*.\n  *Uwaga!* Dla różnicy niezależnych też dodajemy wariancje: $D(X - Y) = D(X + (-1)Y) = D(X) + (-1)^2 D(Y) = \\mathbf{D(X) + D(Y)}$!',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykłady 1 i 2 z Wykładu 04 (sl. 23–24)',
            text: '**Przykład 1:** $Y = 4 + 4X$, gdzie $X \\sim B(n=5, p=\\frac{1}{2})$ (więc $E(X) = np = 2{,}5$, $D(X) = np(1-p) = 1{,}25$).\n• $E(Y) = 4 + 4E(X) = 4 + 10 = \\mathbf{14}$.\n• $D(Y) = 4^2 D(X) = 16 \\cdot 1{,}25 = \\mathbf{20}$.\n\n**Przykład 2:** $Y = 10 - 5X$, gdzie $X \\sim B(n=5, p=\\frac{1}{5})$ ($E(X) = 1$, $D(X) = 5\\cdot\\frac{1}{5}\\cdot\\frac{4}{5} = 0{,}8$).\n• $E(Y) = 10 - 5\\cdot 1 = \\mathbf{5}$.\n• $D(Y) = (-5)^2 D(X) = 25 \\cdot 0{,}8 = \\mathbf{20}$ *(minus przy $5$ ZNIKA pod kwadratem — wariancja nigdy nie jest ujemna!)*.',
          },
        ],
      },
      {
        id: 'markow-czebyszew-ksztalt',
        heading: '5.3. Reguła trzech sigm, dowody nierówności Markowa i Czebyszewa, asymetria i eksces (sl. 25–32)',
        blocks: [
          {
            type: 'callout',
            variant: 'proof',
            title: 'Twierdzenia i pełne dowody: Nierówność Markowa i Nierówność Czebyszewa (sl. 27–30)',
            text: '**1) Nierówność Markowa:** Jeżeli $X \\ge 0$ i $E(X) < \\infty$, to dla każdej stałej $a > 0$:\n$$P(X \\ge a) \\le \\frac{E(X)}{a}.$$\n*Dowód (sl. 28):* Rozbijamy całkę na $[0, a)$ i $[a, +\\infty)$ i odrzucamy pierwszą (nieujemną) część:\n$$E(X) = \\int_0^a x f(x)\\,dx + \\int_a^{+\\infty} x f(x)\\,dx \\ge \\int_a^{+\\infty} x f(x)\\,dx \\ge \\int_a^{+\\infty} a f(x)\\,dx = a \\cdot P(X \\ge a).$$\nDzieląc przez $a > 0$, dostajemy tezę. $\\square$\n\n**2) Nierówność Czebyszewa:** Jeśli $E(X) < \\infty$ i $D(X) < \\infty$, to dla każdego $a > 0$:\n$$P\\big(|X - E(X)| \\ge a\\big) \\le \\frac{D(X)}{a^2}.$$\n*Dowód (sl. 30):* Zauważamy, że $|X - E(X)| \\ge a \\iff (X - E(X))^2 \\ge a^2$. Kładziemy nieujemną zmienną $Y = (X - E(X))^2 \\ge 0$ (której wartość oczekiwana to dokładnie $E(Y) = D(X)$!) oraz próg $b = a^2$, po czym stosujemy nierówność Markowa:\n$$P\\big(|X - E(X)| \\ge a\\big) = P(Y \\ge a^2) \\le \\frac{E(Y)}{a^2} = \\frac{D(X)}{a^2}. \\quad \\square$$\n*Wniosek dla reguły trzech sigm ($a = 3\\sigma$):* Dla **DOWOLNEGO** rozkładu o skończonej wariancji $P(|X - E(X)| \\ge 3\\sigma) \\le \\frac{\\sigma^2}{9\\sigma^2} = \\frac{1}{9} \\approx 11{,}1\\%$ (a dla rozkładu normalnego to zaledwie $0{,}27\\%$!).',
          },
          {
            type: 'callout',
            variant: 'definition',
            title: 'Współczynnik asymetrii $\\gamma_X$ oraz współczynnik ekscesu / kurtozy $\\varepsilon_X$ (sl. 31–32)',
            text: '• **Asymetria (skośność):** $\\gamma_X = \\frac{\\mu_X^{(3)}}{\\sigma_X^3}$ ($\\gamma_X = 0$ symetryczny; $\\gamma_X > 0$ wydłużony prawy ogon; $\\gamma_X < 0$ wydłużony lewy ogon).\n• **Eksces (kurtoza):** $\\varepsilon_X = \\frac{\\mu_X^{(4)}}{\\sigma_X^4} - 3$. Stała $-3$ pochodzi stąd, że dla rozkładu normalnego $\\frac{\\mu^{(4)}}{\\sigma^4} = 3$, więc $\\varepsilon_{\\text{norm}} = 0$. $\\varepsilon_X > 0$ oznacza rozkład bardziej smukły (cięższe ogony), a $\\varepsilon_X < 0$ bardziej spłaszczony niż krzywa Gaussa.',
          },
          {
            type: 'svg',
            diagramId: 'prob-moments-chebyshev',
            title: 'Wykres interaktywny (Wykład 04): Nierówność Czebyszewa i reguła $k\\sigma$, asymetria $\\gamma_X$ oraz kurtoza $\\varepsilon_X$',
          },
        ],
      },
    ],
  },
  {
    id: 'probabilistyka-ch6',
    subject_id: 'probabilistyka',
    order_index: 6,
    slug: 'rozklady-dyskretne-zmiennych-losowych',
    title: 'Rozdział 6: Rozkłady dyskretne zmiennych losowych (Bernoulli, Dwumianowy, Poisson, Geometryczny, Pascal, Hipergeometryczny)',
    subtitle: 'Wszystkie 6 klasycznych rozkładów dyskretnych z wyprowadzeniami E(X) i D(X), dowodem aproksymacji Poissona, własnością braku pamięci, zbieżnością hipergeometrycznego do dwumianowego oraz Przykładami 1–5',
    lecture_ref: 'Wykład 05 (sl. 1–65)',
    estimated_minutes: 55,
    summary:
      'Kompletny przewodnik po wszystkich 6 rozkładach dyskretnych z Wykładu 05 prowadzącego: kiedy który model stosować, pełne wyprowadzenia $E(X)$ i $D(X)$, słynny dowód przejścia granicznego od rozkładu dwumianowego do Poissona ($n\\to\\infty, p=\\lambda/n$), dowód własności braku pamięci w rozkładzie geometrycznym (Furry’ego), ujemny dwumianowy (Pascala) oraz hipergeometryczny (losowanie bez zwracania) z kompletem 5 przykładów z wykładu.',
    exam_questions: [21, 22, 23, 24, 25],
    key_takeaways: [
      '**Dwupunktowy Bernoulliego:** 1 próba (sukces $p$, porażka $1-p$); $E(X)=p$, $D(X)=p(1-p)$. **Dwumianowy:** suma $n$ niezależnych prób Bernoulliego ($x$ sukcesów w $n$ próbach); $E(X)=np$, $D(X)=np(1-p)$.',
      '**Poissona:** granica dwumianowego przy $n\\to\\infty, p\\to 0, np=\\lambda=\\text{const}$: $P(x)=\\frac{\\lambda^x}{x!}e^{-\\lambda}$ oraz unikalna cecha **$E(X) = D(X) = \\lambda$**!',
      '**Geometryczny (Furry’ego):** liczba prób do **pierwszego** sukcesu ($x = 1, 2, \\dots$): $P(x)=p(1-p)^{x-1}$, $E(X)=\\frac{1}{p}$, $D(X)=\\frac{1-p}{p^2}$; posiada **własność braku pamięci**!',
      '**Pascala (dwumianowy ujemny):** liczba prób do $n$-tego sukcesu: $E(X)=\\frac{n}{p}$, $D(X)=\\frac{n(1-p)}{p^2}$. **Hipergeometryczny:** losowanie **bez zwracania** z populacji $N$ ($m$ pożądanych), $E(X)=\\frac{nm}{N}$, $D(X)=np(1-p)\\frac{N-n}{N-1}$ (zbiega do dwumianowego przy $N \\gg n$).',
    ],
    figures: [],
    sections: [
      {
        id: 'bernoulli-i-dwumianowy',
        heading: '6.1. Rozkład dwupunktowy (Bernoulliego) i dwumianowy (binominalny) — Przykład 1',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Rozkład dwupunktowy, Bernoulliego i dwumianowy (sl. 7–15)',
            text: '**1) Rozkład dwupunktowy ogólny** ($X \\in \\{a, b\\}$ z prawd. $p$ i $1-p$): $E(X) = pa + (1-p)b$, $D(X) = p(1-p)(a-b)^2$.\n**2) Rozkład Bernoulliego** ($a=1, b=0$, pojedyncza próba binarna): $P(x) = p^x(1-p)^{1-x}$ ($x \\in \\{0, 1\\}$), $E(X) = p$, $D(X) = p(1-p)$.\n**3) Rozkład dwumianowy (binominalny) $B(n, p)$:** liczba $x$ sukcesów w $n$ niezależnych próbach o stałym prawdopodobieństwie sukcesu $p$:\n$$P(X = x) = \\binom{n}{x} p^x (1-p)^{n-x}, \\qquad x = 0, 1, \\dots, n.$$\n*Skąd $E(X)$ i $D(X)$ w 1 linijce?* Zapisujemy $X = X_1 + X_2 + \\dots + X_n$ jako sumę $n$ niezależnych zmiennych Bernoulliego! Z addytywności:\n$$E(X) = \\sum_{i=1}^n E(X_i) = \\mathbf{np}, \\qquad D(X) = \\sum_{i=1}^n D(X_i) = \\mathbf{np(1-p)}.$$',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykład 1 z Wykładu 05 (sl. 16–18): Pięciokrotny rzut dwiema kostkami',
            text: 'Rzucamy 5 razy parą kostek. Jakie jest prawdopodobieństwo, że dokładnie 3 razy otrzymamy sumę oczek $\\le 4$?\n• W pojedynczym rzucie parą kostek sumę $\\le 4$ daje 6 z 36 par: $(1,1), (1,2), (2,1), (1,3), (2,2), (3,1) \\implies p_S = \\frac{6}{36} = \\frac{1}{6}$.\n• Dla $n = 5$ niezależnych prób i $k = 3$ sukcesów stosujemy rozkład dwumianowy:\n$$P(X = 3) = \\binom{5}{3}\\left(\\frac{1}{6}\\right)^3\\left(\\frac{5}{6}\\right)^2 = 10 \\cdot \\frac{1}{216} \\cdot \\frac{25}{36} = \\frac{250}{7776} \\approx \\mathbf{0{,}03215}.$$',
          },
        ],
      },
      {
        id: 'poisson-i-aproksymacja',
        heading: '6.2. Rozkład Poissona — wyprowadzenie granicy z dwumianowego, $E(X)=D(X)=\\lambda$ i Przykład 2',
        blocks: [
          {
            type: 'callout',
            variant: 'proof',
            title: 'Twierdzenie Poissona — skąd bierze się wzór $\\frac{\\lambda^x}{x!}e^{-\\lambda}$ i dlaczego $E(X) = D(X) = \\lambda$? (sl. 19–27)',
            text: '**1) Przejście graniczne z dwumianowego** ($n \\to \\infty$, $p = \\frac{\\lambda}{n} \\to 0$, średnia $np = \\lambda = \\text{const}$):\n$$\\lim_{n\\to\\infty} \\binom{n}{x}\\left(\\frac{\\lambda}{n}\\right)^x\\left(1 - \\frac{\\lambda}{n}\\right)^{n-x} = \\frac{\\lambda^x}{x!}\\lim_{n\\to\\infty} \\underbrace{\\frac{n(n-1)\\cdots(n-x+1)}{n^x}}_{\\to\\, 1}\\cdot \\underbrace{\\left(1 - \\frac{\\lambda}{n}\\right)^n}_{\\to\\, e^{-\\lambda}} \\cdot \\underbrace{\\left(1 - \\frac{\\lambda}{n}\\right)^{-x}}_{\\to\\, 1} = \\frac{\\lambda^x}{x!}e^{-\\lambda}. \\quad \\square$$\n*(Wykład używa podstawienia $z = -n/\\lambda$: $(1-\\lambda/n)^n = [(1+1/z)^z]^{-\\lambda} \\to e^{-\\lambda}$!)*\n\n**2) Wyprowadzenie $E(X) = \\lambda$ i $D(X) = \\lambda$ (z szeregu Maclaurina $e^\\lambda = \\sum_{k=0}^\\infty \\frac{\\lambda^k}{k!}$!):**\n• $E(X) = \\sum_{x=1}^\\infty x\\frac{\\lambda^x}{x!}e^{-\\lambda} = \\lambda e^{-\\lambda}\\sum_{x=1}^\\infty \\frac{\\lambda^{x-1}}{(x-1)!} = \\lambda e^{-\\lambda} e^\\lambda = \\mathbf{\\lambda}$.\n• $E(X^2) = \\lambda e^{-\\lambda}\\sum_{y=0}^\\infty (y+1)\\frac{\\lambda^y}{y!} = \\lambda^2 + \\lambda \\implies D(X) = (\\lambda^2 + \\lambda) - \\lambda^2 = \\mathbf{\\lambda}$. $\\square$',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykład 2 (sl. 29–34): Zbieżność $B(n, 1/n)$ do $\\operatorname{Pois}(\\lambda = 1)$',
            text: 'Gdy zwiększamy liczbę prób $n$ przy stałym $np = 1$, prawdopodobieństwa i wariancja dwumianowa zbliżają się błyskawicznie do Poissona ($E=1, D=1$):\n• $n=4, p=0{,}25$: $P(0)=0{,}316, P(1)=0{,}422, P(2)=0{,}211$, $D(X) = 0{,}75$.\n• $n=10, p=0{,}1$: $P(0)=0{,}348, P(1)=0{,}387, P(2)=0{,}194$, $D(X) = 0{,}90$.\n• $n=100, p=0{,}01$: $P(0)=0{,}366, P(1)=0{,}370, P(2)=0{,}185$, $D(X) = 0{,}99$.\n• **Poisson ($\\lambda = 1$):** $P(0)=e^{-1}\\approx 0{,}368, P(1)=0{,}368, P(2)=0{,}184$, $D(X) = 1{,}00$!',
          },
          {
            type: 'svg',
            diagramId: 'prob-binomial-poisson',
            title: 'Wykres interaktywny (Wykład 05): Zbieżność rozkładu dwumianowego $B(n, \\lambda/n)$ do rozkładu Poissona $\\operatorname{Pois}(\\lambda)$',
          },
        ],
      },
      {
        id: 'geometryczny-i-pascal',
        heading: '6.3. Rozkład geometryczny (brak pamięci!) i rozkład Pascala (ujemny dwumianowy) — Przykłady 3–4',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Rozkład geometryczny (Furry’ego) i Pascala (sl. 35–52)',
            text: '**1) Rozkład geometryczny (liczba prób $x = 1, 2, \\dots$ do PIERWSZEGO sukcesu):**\n$$P(X = x) = p(1 - p)^{x-1}, \\qquad E(X) = \\frac{1}{p}, \\qquad D(X) = \\frac{1 - p}{p^2}.$$\n**Własność braku pamięci (sl. 41):** Jeśli przez pierwsze $k$ prób same były porażki ($X > k$), to szansa, że na sukces poczekamy jeszcze dokładnie $m$ dodatkowych prób, jest **identyczna** jak na samym początku:\n$$P(X = k + m \\mid X > k) = \\frac{p(1-p)^{k+m-1}}{(1-p)^k} = p(1-p)^{m-1} = P(X = m)!$$\n*(Moneta i pakiety w sieci nie „pamiętają” serii wcześniejszych niepowodzeń!)*\n\n**2) Rozkład Pascala / dwumianowy ujemny (liczba prób $x = n, n+1, \\dots$ do uzyskania $n$-tego sukcesu):**\nOstatnia, $x$-ta próba MUSI być sukcesem, a wśród poprzednich $x-1$ prób musi być dokładnie $n-1$ sukcesów:\n$$P(X = x) = \\binom{x-1}{n-1} p^n (1-p)^{x-n}, \\qquad E(X) = \\frac{n}{p}, \\qquad D(X) = \\frac{n(1-p)}{p^2}.$$\n*(Uwaga na drobną literówkę ze sl. 46: u dołu slajdu zniknął kwadrat w $p^2$, ale już w Przykładzie 4 na sl. 52 prowadzący poprawnie używa $\\sigma^2 = \\frac{n(1-p)}{p^2}$!)*',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykłady 3 i 4 z Wykładu 05 (rzuty monetą $p = \\frac{1}{2}$)',
            text: '**Przykład 3 (Geometryczny — do 1. orła, sl. 42–43):**\n• $P(X \\le 5) = \\frac{1}{2}(1 + \\frac{1}{2} + \\frac{1}{4} + \\frac{1}{8} + \\frac{1}{16}) = 1 - \\left(\\frac{1}{2}\\right)^5 = \\mathbf{\\frac{31}{32}}$.\n• $E(X) = \\frac{1}{1/2} = \\mathbf{2}$ rzuty, $D(X) = \\frac{1/2}{(1/2)^2} = \\mathbf{2}$.\n\n**Przykład 4 (Pascal — do 2. orła, $n = 2$, sl. 50–52):**\n• $P(X = x) = (x - 1)\\left(\\frac{1}{2}\\right)^x$ dla $x = 2, 3, \\dots$.\n• $P(X \\le 5) = P(2)+P(3)+P(4)+P(5) = \\frac{1}{4} + \\frac{2}{8} + \\frac{3}{16} + \\frac{4}{32} = \\frac{8+8+6+4}{32} = \\mathbf{\\frac{13}{16}}$.\n• $E(X) = \\frac{2}{1/2} = \\mathbf{4}$ rzuty, $D(X) = \\frac{2\\cdot 1/2}{1/4} = \\mathbf{4}$.',
          },
          {
            type: 'svg',
            diagramId: 'prob-geometric-pascal',
            title: 'Wykres interaktywny (Wykład 05): Rozkład geometryczny (brak pamięci) i rozkład Pascala',
          },
        ],
      },
      {
        id: 'hipergeometryczny',
        heading: '6.4. Rozkład hipergeometryczny (losowanie bez zwracania) i zbieżność do dwumianowego — Przykład 5',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Rozkład hipergeometryczny $H(N, m, n)$ i związek z dwumianowym (sl. 53–60)',
            text: 'W populacji $N$ obiektów znajduje się $m$ obiektów wyróżnionych („sukcesów”) i $N - m$ pozostałych. Losujemy **bez zwracania** próbkę $n$ obiektów. Prawdopodobieństwo wylosowania dokładnie $x$ sukcesów wynosi:\n$$P(X = x) = \\frac{\\binom{m}{x}\\binom{N - m}{n - x}}{\\binom{N}{n}}.$$\nOznaczając udział sukcesów w populacji $p = \\frac{m}{N}$:\n$$E(X) = \\frac{nm}{N} = np, \\qquad D(X) = np(1 - p)\\cdot \\underbrace{\\frac{N - n}{N - 1}}_{\\text{czynnik skończonej populacji}}.$$\n**Aproksymacja dwumianowa (sl. 58–60):** Gdy populacja $N$ jest bardzo duża wobec próbki ($N \\gg n$), wyjęcie jednej kuli niemal nie zmienia składu urny — czynnik $\\frac{N-n}{N-1} \\to 1$, a rozkład hipergeometryczny zbiega do dwumianowego $B(n, p = m/N)$!',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykład 5 z Wykładu 05 (sl. 63–65): 4 kule białe, 6 czarnych, losujemy 3 bez zwracania',
            text: 'Mamy $N = 10$, $m = 4$ (białe), $N - m = 6$ (czarne), $n = 3$.\n1) **2 białe i 1 czarna ($x = 2$):** $P(X = 2) = \\frac{\\binom{4}{2}\\binom{6}{1}}{\\binom{10}{3}} = \\frac{6 \\cdot 6}{120} = \\frac{36}{120} = \\mathbf{0{,}30}$.\n2) **2 czarne i 1 biała ($x = 1$):** $P(X = 1) = \\frac{\\binom{4}{1}\\binom{6}{2}}{\\binom{10}{3}} = \\frac{4 \\cdot 15}{120} = \\frac{60}{120} = \\mathbf{0{,}50}$.\nZatem wylosowanie 2 czarnych ($0{,}50$) jest wyraźnie bardziej prawdopodobne niż 2 białych ($0{,}30$).',
          },
          {
            type: 'svg',
            diagramId: 'prob-hypergeometric-vs-binom',
            title: 'Wykres interaktywny (Wykład 05): Rozkład hipergeometryczny $H(N, m, n)$ a dwumianowy $B(n, m/N)$ przy rosnącym $N$',
          },
        ],
      },
    ],
  },
];
