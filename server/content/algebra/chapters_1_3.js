// Algebra liniowa dla ICT — Rozdziały 1–3
// Źródło: Wykłady prowadzącego (Instytut Telekomunikacji Multimedialnej, PUT):
// 01_Algebra_zespolone_enc.pdf (sl. 1–31), 02_Algebra_macierze_enc.pdf (cz. 1, sl. 1–19)

export const ALGEBRA_CHAPTERS_1_3 = [
  {
    id: 'algebra-ch1',
    subject_id: 'algebra',
    order_index: 1,
    slug: 'liczby-zespolone-algebraiczna',
    title: 'Rozdział 1: Liczby zespolone — postać algebraiczna, sprzężenie i moduł',
    subtitle: 'Wykład 01 (cz. 1): ciało $\\mathbb{C}$, jednostka urojona $j$, płaszczyzna Gaussa, $\\bar{z}$ oraz $|z|$',
    lecture_ref: 'Wykład 01 · slajdy 6–20',
    estimated_minutes: 35,
    summary:
      'Konstrukcja liczb zespolonych jako par uporządkowanych $(x,y)$, konwencja inżynierska $j^2=-1$, arytmetyka w postaci algebraicznej (kanonicznej) $z=x+jy$, własności sprzężenia zespolonego $\\bar{z}$ oraz geometryczna interpretacja modułu $|z|$ i zbiorów na płaszczyźnie zespolonej.',
    exam_questions: [1, 2, 3, 4],
    key_takeaways: [
      'W telekomunikacji i elektronice (ICT) jednostkę urojoną oznaczamy literą **$j$** (zamiast matematycznego $i$), aby uniknąć kolizji z symbolem natężenia prądu; zawsze $j^2 = -1$, a potęgi $j^n$ powtarzają się cyklicznie co 4: $1, j, -1, -j$.',
      'Równość liczb zespolonych oznacza jednoczesną równość części rzeczywistych i urojonych: $z_1 = z_2 \\iff \\operatorname{Re} z_1 = \\operatorname{Re} z_2 \\;\\land\\; \\operatorname{Im} z_1 = \\operatorname{Im} z_2$. Uwaga: $\\operatorname{Im}(x+jy) = y \\in \\mathbb{R}$ (bez litery $j$!).',
      'Dzielenie w postaci algebraicznej wykonujemy przez rozszerzenie ułamka o **sprzężenie mianownika** $\\bar{z}_2$: $\\frac{z_1}{z_2} = \\frac{z_1 \\bar{z}_2}{|z_2|^2}$, ponieważ $z\\bar{z} = x^2 + y^2 = |z|^2 \\in \\mathbb{R}_{\\ge 0}$.',
      'Geometrycznie: $|z_1 - z_2|$ to odległość między punktami $z_1$ i $z_2$ na płaszczyźnie zespolonej, więc $|z - z_0| = R$ to okrąg o środku $z_0$ i promieniu $R$, a $\\bar{z}$ to odbicie symetryczne względem osi rzeczywistej $\\operatorname{Re} z$.',
    ],
    sections: [
      {
        id: 'alg-1-1',
        heading: '1.1. Definicja liczb zespolonych, ciało $\\mathbb{C}$ i jednostka urojona $j$',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Definicja: Zbiór liczb zespolonych $\\mathbb{C}$ (Wykład 01, sl. 7–8)',
            text: '**Liczbą zespoloną** nazywamy uporządkowaną parę liczb rzeczywistych $z = (x, y)$, gdzie $x, y \\in \\mathbb{R}$. Dwie liczby są równe wtedy i tylko wtedy, gdy równe są ich współrzędne: $(x_1, y_1) = (x_2, y_2) \\iff x_1 = x_2 \\;\\land\\; y_1 = y_2$.\n\nW zbiorze $\\mathbb{C}$ definiujemy dwa działania:\n$$z_1 + z_2 = (x_1, y_1) + (x_2, y_2) = (x_1 + x_2,\\; y_1 + y_2)$$\n$$z_1 \\cdot z_2 = (x_1, y_1) \\cdot (x_2, y_2) = (x_1 x_2 - y_1 y_2,\\; x_1 y_2 + x_2 y_1)$$',
          },
          {
            type: 'paragraph',
            text: 'Skąd bierze się na pierwszy rzut oka „dziwny” wzór na mnożenie par? Zauważmy, jak zachowują się dwa szczególne podzbiory par. Po pierwsze, pary postaci $(x, 0)$ dodają się i mnożą identycznie jak zwykłe liczby rzeczywiste: $(x,0)+(y,0)=(x+y,0)$ oraz $(x,0)\\cdot(y,0)=(xy,0)$. Dlatego utożsamiamy $(x,0)$ z liczbą rzeczywistą $x \\in \\mathbb{R}$ i umieszczamy ją na poziomej osi $OX$ płaszczyzny zespolonej. Po drugie, zbadajmy parę $(0, 1)$, którą oznaczamy jako **jednostkę urojoną $j$**:',
          },
          {
            type: 'math',
            tex: 'j = (0, 1), \\qquad j^2 = (0, 1) \\cdot (0, 1) = (0\\cdot 0 - 1\\cdot 1,\\; 0\\cdot 1 + 0\\cdot 1) = (-1, 0) = -1',
            caption: 'Jednostka urojona $j \\notin \\mathbb{R}$ jest pierwiastkiem kwadratowym z $-1$. Matematycy piszą $i$, inżynierowie ICT piszą $j$.',
          },
          {
            type: 'paragraph',
            text: 'Dzięki temu każdą parę $(x,y)$ można rozłożyć na **postać algebraiczną (kanoniczną)**: $(x,y) = (x,0) + (0,1)\\cdot(y,0) = x + jy$. Teraz mnożenie par staje się zwykłym wymnażaniem nawiasów z podstawieniem $j^2 = -1$! Zbiór $\\mathbb{C}$ z tymi działaniami tworzy **ciało**: oba działania są łączne i przemienne, mnożenie jest rozdzielne względem dodawania, elementem neutralnym dodawania jest $(0,0)=0$, elementem neutralnym mnożenia jest $(1,0)=1$, każda liczba ma element przeciwny $-z = (-x,-y)$, a każda $z \\neq 0$ ma odwrotność $z^{-1}$ taką, że $z \\cdot z^{-1} = 1$.',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykład 1.1 (Wykład 01, sl. 7, 10, 13): Mnożenie par i cykliczność potęg $j$',
            text: '1. Dla $z_1 = (1, 2)$ i $z_2 = (5, 6)$:\n$$z_1 + z_2 = (1+5,\\; 2+6) = (6, 8), \\qquad z_1 \\cdot z_2 = (1\\cdot 5 - 2\\cdot 6,\\; 1\\cdot 6 + 2\\cdot 5) = (-7, 16)$$\n2. Iloczyn dwóch liczb czysto urojonych daje liczbę rzeczywistą: $(aj)(bj) = abj^2 = -ab \\in \\mathbb{R}$.\n3. **Potęgi $j^n$** tworzą cykl o okresie 4 (wystarczy wziąć resztę z dzielenia wykładnika $n$ przez 4):\n$$j^0 = 1, \\quad j^1 = j, \\quad j^2 = -1, \\quad j^3 = j^2\\cdot j = -j, \\quad j^4 = (j^2)^2 = 1, \\quad j^5 = j, \\dots$$\nPrzykładowo $j^{2027} = j^{4\\cdot 506 + 3} = (j^4)^{506} \\cdot j^3 = 1 \\cdot (-j) = -j$.',
          },
        ],
      },
      {
        id: 'alg-1-2',
        heading: '1.2. Działania w postaci kanonicznej, $\\operatorname{Re} z$ i $\\operatorname{Im} z$',
        blocks: [
          {
            type: 'paragraph',
            text: 'Dla liczby $z = x + jy$ liczbę rzeczywistą $x$ nazywamy **częścią rzeczywistą** ($\\operatorname{Re} z = x$), a liczbę rzeczywistą $y$ — **częścią urojoną** ($\\operatorname{Im} z = y$). Zachodzi $z = \\operatorname{Re} z + j \\cdot \\operatorname{Im} z$, przy czym obie części są liniowe względem dodawania: $\\operatorname{Re}(z_1 + z_2) = \\operatorname{Re} z_1 + \\operatorname{Re} z_2$ oraz $\\operatorname{Im}(z_1 + z_2) = \\operatorname{Im} z_1 + \\operatorname{Im} z_2$.',
          },
          {
            type: 'math',
            tex: '\\frac{z_1}{z_2} = \\frac{(x_1 + jy_1)(x_2 - jy_2)}{(x_2 + jy_2)(x_2 - jy_2)} = \\frac{x_1 x_2 + y_1 y_2}{x_2^2 + y_2^2} + j\\frac{x_2 y_1 - x_1 y_2}{x_2^2 + y_2^2} \\quad (z_2 \\neq 0)',
            caption: 'Wzór na iloraz oraz szczególny przypadek odwrotności: $z^{-1} = \\frac{1}{x+jy} = \\frac{x}{x^2+y^2} + j\\frac{-y}{x^2+y^2}$.',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykład 1.2 (Wykład 01, sl. 12): Pełny komplet działań dla $z_1 = 1 + 2j$ i $z_2 = 5 - 6j$',
            text: '- **Dodawanie:** $z_1 + z_2 = (1 + 5) + (2 - 6)j = 6 - 4j$.\n- **Odejmowanie:** $z_1 - z_2 = (1 + 2j) - (5 - 6j) = (1 - 5) + (2 + 6)j = \\mathbf{-4 + 8j}$.\n- **Mnożenie:** $z_1 \\cdot z_2 = (1+2j)(5-6j) = 5 - 6j + 10j - 12j^2 = 5 + 4j + 12 = 17 + 4j$.\n- **Dzielenie:**\n$$\\frac{z_1}{z_2} = \\frac{1+2j}{5-6j} = \\frac{(1+2j)(5+6j)}{(5-6j)(5+6j)} = \\frac{5 + 6j + 10j + 12j^2}{25 - 36j^2} = \\frac{-7 + 16j}{61} = -\\frac{7}{61} + \\frac{16}{61}j$$\n- **Odwrotność:** $z_1^{-1} = \\frac{1}{1+2j} = \\frac{1-2j}{(1+2j)(1-2j)} = \\frac{1-2j}{1 - 4j^2} = \\frac{1-2j}{5} = \\frac{1}{5} - \\frac{2}{5}j$.',
          },
          {
            type: 'callout',
            variant: 'warning',
            title: 'Uwaga na literówkę na slajdzie 12 (Wykład 01)!',
            text: 'W oryginalnej prezentacji (slajd 12) w linii z odejmowaniem wydrukowano $z_1 - z_2 = 1 + 2j - (5 - 6j) = -6 + 8j$. Jest to drobny błąd rachunkowy autora slajdu — poprawna część rzeczywista to $1 - 5 = -4$, czyli wynik wynosi **$-4 + 8j$** (pozostałe działania na slajdzie są w 100% poprawne).',
          },
        ],
      },
      {
        id: 'alg-1-3',
        heading: '1.3. Sprzężenie zespolone $\\bar{z}$ i rozwiązywanie równań',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Definicja i własności sprzężenia (Wykład 01, sl. 15–17)',
            text: '**Liczbą sprzężoną** do $z = x + jy$ nazywamy liczbę $\\bar{z} = x - jy$. Geometrycznie jest to odbicie punktu $z$ względem osi rzeczywistej $\\operatorname{Re} z$ (np. $\\overline{2-j} = 2+j$, $\\overline{-1} = -1$, $\\overline{2j} = -2j$).\n\nSprzężenie „przechodzi” przez wszystkie cztery działania arytmetyczne:\n$$\\overline{\\bar{z}} = z, \\qquad \\overline{z_1 \\pm z_2} = \\bar{z}_1 \\pm \\bar{z}_2, \\qquad \\overline{z_1 \\cdot z_2} = \\bar{z}_1 \\cdot \\bar{z}_2, \\qquad \\overline{\\left(\\frac{z_1}{z_2}\\right)} = \\frac{\\bar{z}_1}{\\bar{z}_2} \\; (z_2 \\neq 0)$$',
          },
          {
            type: 'paragraph',
            text: 'Dodatkowo łatwo wywnioskować dwa przydatne wzory na wyodrębnianie składowych: $z + \\bar{z} = 2\\operatorname{Re} z$ (zawsze liczba rzeczywista) oraz $z - \\bar{z} = 2j\\operatorname{Im} z$ (liczba czysto urojona). Liczba $z$ jest rzeczywista wtedy i tylko wtedy, gdy $z = \\bar{z}$.',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykład 1.3 (Wykład 01, sl. 16): Równanie zespolone ze sprzężeniem',
            text: 'Rozwiązać równanie $z + 2\\bar{z} = 6 + 5j$.\n\n**Rozwiązanie:** Podstawiamy $z = x + jy$, skąd $\\bar{z} = x - jy$ ($x, y \\in \\mathbb{R}$):\n$$(x + jy) + 2(x - jy) = 6 + 5j \\implies 3x - jy = 6 + 5j$$\nPorównujemy części rzeczywiste i urojone po obu stronach równania:\n$$\\begin{cases} \\operatorname{Re}: & 3x = 6 \\implies x = 2 \\\\ \\operatorname{Im}: & -y = 5 \\implies y = -5 \\end{cases} \\implies z = 2 - 5j$$\n**Sprawdzenie:** $(2 - 5j) + 2(2 + 5j) = 2 - 5j + 4 + 10j = 6 + 5j$. Zgadza się!',
          },
        ],
      },
      {
        id: 'alg-1-4',
        heading: '1.4. Moduł liczby zespolonej $|z|$ i geometria na płaszczyźnie Gaussa',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Definicja i własności modułu (Wykład 01, sl. 18–20)',
            text: '**Modułem** liczby zespolonej $z = x + jy$ nazywamy nieujemną liczbę rzeczywistą równą długości jej wektora wodzącego:\n$$|z| = \\sqrt{x^2 + y^2} \\ge 0$$\nPodstawowe własności modułu:\n1. $|z| = 0 \\iff z = 0$,\n2. $|\\bar{z}| = |z|$ oraz kluczowa tożsamość **$|z|^2 = z \\cdot \\bar{z}$**,\n3. Multiplikatywność: $|z_1 \\cdot z_2| = |z_1| \\cdot |z_2|$ oraz $\\left|\\frac{z_1}{z_2}\\right| = \\frac{|z_1|}{|z_2|}$ ($z_2 \\neq 0$),\n4. Nierówność trójkąta: $|z_1 + z_2| \\le |z_1| + |z_2|$.',
          },
          {
            type: 'paragraph',
            text: 'Własność multiplikatywności oszczędza mnóstwo czasu na kolokwium: zamiast najpierw dzielić i potęgować duże liczby zespolone, a dopiero potem liczyć pierwiastek z sumy kwadratów, liczymy moduły czynników osobno! Przykładowo $|4 - j| = \\sqrt{16+1} = \\sqrt{17}$, $|-\\pi| = \\pi$, $|-5j| = 5$. Geometrycznie $|z_1 - z_2|$ to odległość euklidesowa punktów $z_1$ i $z_2$ na płaszczyźnie zespolonej, co pozwala błyskawicznie szkicować zbiory:',
          },
          {
            type: 'list',
            items: [
              '$|z| \\le 2$ — **koło domknięte** o środku w $(0,0)$ i promieniu $R = 2$ (Wykład 01, sl. 20).',
              '$|z + 2j| = 2 \\iff |z - (-2j)| = 2$ — **okrąg** o środku w $z_0 = -2j = (0,-2)$ i promieniu $R = 2$. Uwaga na znak: zawsze sprowadzamy do postaci $|z - z_0|$!',
              '$|z - z_1| = |z - z_2|$ — **symetralna** odcinka łączącego punkty $z_1$ i $z_2$.',
            ],
          },
          {
            type: 'svg',
            diagramId: 'alg-complex-plane',
            title: 'Interaktywna płaszczyzna zespolona: wektor $z = x+jy$, sprzężenie $\\bar{z}$, moduł $|z|$ i zbiory kołowe',
            caption: 'Zmieniaj współrzędne $x, y$ lub przełącz widok na zbiory $|z|\\le 2$ oraz $|z+2j|=2$ z Wykładu 01 (sl. 15 i 20).',
          },
        ],
      },
    ],
  },
  {
    id: 'algebra-ch2',
    subject_id: 'algebra',
    order_index: 2,
    slug: 'trygonometryczna-moivre-pierwiastki',
    title: 'Rozdział 2: Postać trygonometryczna, wykładnicza, wzór de Moivre’a i pierwiastki',
    subtitle: 'Wykład 01 (cz. 2): argument główny $\\arg z$, wzór Eulera $e^{j\\varphi}$, potęgowanie i pierwiastki $\\sqrt[n]{z}$',
    lecture_ref: 'Wykład 01 · slajdy 21–30',
    estimated_minutes: 40,
    summary:
      'Opis liczb zespolonych we współrzędnych biegunowych $(r, \\varphi)$: argument główny $\\arg z \\in (-\\pi, \\pi]$, zbiory kątowe, mnożenie i dzielenie w postaci trygonometrycznej, wzór de Moivre’a na $z^n$, postać wykładnicza Eulera $re^{j\\varphi}$ oraz wyznaczanie wszystkich $n$ pierwiastków stopnia $n$ jako wierzchołków wielokąta foremnego.',
    exam_questions: [5, 6, 7, 8],
    key_takeaways: [
      'Argument główny na wykładzie przyjmuje wartości w przedziale **$\\arg z \\in (-\\pi, \\pi]$**; zbiór wszystkich argumentów to $\\operatorname{Arg} z = \\{\\varphi + 2k\\pi : k \\in \\mathbb{Z}\\}$. Zero ($z=0$) nie ma określonego argumentu.',
      'Nie wyliczaj $\\varphi$ ślepo z $\\operatorname{arctg}(y/x)$! Zawsze wyznaczaj kąt z układu $\\cos\\varphi = \\frac{x}{|z|},\\; \\sin\\varphi = \\frac{y}{|z|}$ i sprawdzaj **ćwiartkę** płaszczyzny zespolonej.',
      'Przy mnożeniu **moduły mnożymy, a argumenty dodajemy** ($z_1 z_2 = r_1 r_2 e^{j(\\varphi_1+\\varphi_2)}$); przy dzieleniu moduły dzielimy, a argumenty odejmujemy. Wzór de Moivre’a: $z^n = r^n(\\cos n\\varphi + j\\sin n\\varphi) = r^n e^{jn\\varphi}$.',
      'Każda liczba $z \\neq 0$ ma **dokładnie $n$ pierwiastków stopnia $n$** w $\\mathbb{C}$: $t_k = \\sqrt[n]{r}\\left(\\cos\\frac{\\varphi+2k\\pi}{n} + j\\sin\\frac{\\varphi+2k\\pi}{n}\\right)$ dla $k=0,1,\\dots,n-1$. Tworzą one $n$-kąt foremny wpisany w okrąg o promieniu $\\sqrt[n]{r}$.',
    ],
    sections: [
      {
        id: 'alg-2-1',
        heading: '2.1. Argument liczby zespolonej i obszary kątowe',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Definicja: Argument $\\operatorname{Arg} z$ i argument główny $\\arg z$ (Wykład 01, sl. 21)',
            text: 'Dla $z = x + jy \\neq 0$ **argumentem** nazywamy kąt skierowany $\\varphi$ między dodatnią półosią rzeczywistą $\\operatorname{Re} z$ a wektorem wodzącym punktu $z$.\n- $\\operatorname{Arg} z$ oznacza zbiór wszystkich argumentów (różnią się o wielokrotności $2\\pi$).\n- **Argument główny** to jedyny kąt z przedziału $\\arg z \\in (-\\pi, \\pi]$.\n\nKąt $\\varphi$ wyznaczamy jednoznacznie (z dokładnością do $2k\\pi$) z pary równań:\n$$\\cos\\varphi = \\frac{\\operatorname{Re} z}{|z|} = \\frac{x}{r}, \\qquad \\sin\\varphi = \\frac{\\operatorname{Im} z}{|z|} = \\frac{y}{r}, \\qquad \\operatorname{tg}\\varphi = \\frac{y}{x} \\; (x \\neq 0)$$',
          },
          {
            type: 'callout',
            variant: 'warning',
            title: 'Pułapka z funkcją $\\operatorname{arctg}(y/x)$',
            text: 'Funkcja $\\operatorname{arctg}$ zwraca wyłącznie kąty z I i IV ćwiartki $(-\\pi/2, \\pi/2)$. Dla liczby z II lub III ćwiartki (czyli gdy $x < 0$) sam $\\operatorname{arctg}(y/x)$ daje kąt po przeciwnej stronie początku układu (błąd o $\\pi$)! Przykładowo dla $z = -1 - j$ mamy $y/x = 1$, $\\operatorname{arctg}(1) = \\pi/4$, ale liczba leży w III ćwiartce, więc $\\arg(-1-j) = -\\frac{3\\pi}{4}$ (w konwencji $(-\\pi, \\pi]$).',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykłady 2.1 (Wykład 01, sl. 22–23): Argumenty główne i kliny kątowe',
            text: '1. $z_1 = 5$ leży na dodatniej półosi $\\operatorname{Re} z \\implies \\arg(5) = 0$.\n2. $z_2 = j\\pi$ leży na dodatniej półosi $\\operatorname{Im} z \\implies \\arg(j\\pi) = \\frac{\\pi}{2}$.\n3. $z_3 = 1 + j$ leży na półprostej $y=x, x>0 \\implies \\arg(1+j) = \\frac{\\pi}{4}$.\n4. **Zbiór $\\arg z \\in [-\\pi/4, \\pi/3)$** to domknięto-otwarty wycinek kątowy (klin) o wierzchołku w $(0,0)$ (bez samego punktu $0$, bo $\\arg 0$ nie istnieje!).\n5. **Zbiór $\\arg(z - 1 + j) \\in [-\\pi/4, \\pi/3)$**: podstawiamy $w = z - z_0$, gdzie $z_0 = 1 - j$. Jest to dokładnie ten sam klin kątowy przesunięty równolegle tak, by jego wierzchołek leżał w punkcie $z_0 = 1 - j$.',
          },
        ],
      },
      {
        id: 'alg-2-2',
        heading: '2.2. Postać trygonometryczna, wzór de Moivre’a i postać wykładnicza Eulera',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Postać trygonometryczna i wykładnicza (Wykład 01, sl. 24–27)',
            text: 'Podstawiając $x = r\\cos\\varphi$ oraz $y = r\\sin\\varphi$ (gdzie $r = |z| > 0$, $\\varphi \\in \\operatorname{Arg} z$) otrzymujemy **postać trygonometryczną**:\n$$z = r(\\cos\\varphi + j\\sin\\varphi)$$\nKorzystając ze słynnego **wzoru Eulera** $e^{j\\varphi} = \\cos\\varphi + j\\sin\\varphi$ (który w Analizie wynika z rozwinięcia $e^x, \\sin x, \\cos x$ w szeregi Taylora), otrzymujemy zwartą **postać wykładniczą**:\n$$z = r e^{j\\varphi}$$\nRówność: $r_1 e^{j\\varphi_1} = r_2 e^{j\\varphi_2} \\iff r_1 = r_2 \\;\\land\\; \\exists k\\in\\mathbb{Z}:\\; \\varphi_1 = \\varphi_2 + 2k\\pi$.',
          },
          {
            type: 'callout',
            variant: 'theorem',
            title: 'Twierdzenie: Mnożenie, dzielenie i wzór de Moivre’a (Wykład 01, sl. 26)',
            text: 'Dla $z_1 = r_1(\\cos\\varphi_1 + j\\sin\\varphi_1)$ i $z_2 = r_2(\\cos\\varphi_2 + j\\sin\\varphi_2)$:\n$$z_1 \\cdot z_2 = r_1 r_2\\bigl(\\cos(\\varphi_1 + \\varphi_2) + j\\sin(\\varphi_1 + \\varphi_2)\\bigr) = r_1 r_2 e^{j(\\varphi_1+\\varphi_2)}$$\n$$\\frac{z_1}{z_2} = \\frac{r_1}{r_2}\\bigl(\\cos(\\varphi_1 - \\varphi_2) + j\\sin(\\varphi_1 - \\varphi_2)\\bigr) = \\frac{r_1}{r_2}e^{j(\\varphi_1-\\varphi_2)} \\quad (z_2 \\neq 0)$$\n$$z^n = |z|^n\\bigl(\\cos(n\\varphi) + j\\sin(n\\varphi)\\bigr) = r^n e^{jn\\varphi} \\quad (\\text{wzór de Moivre’a},\\; n \\in \\mathbb{Z})$$\n$$\\bar{z} = |z|\\bigl(\\cos(-\\varphi) + j\\sin(-\\varphi)\\bigr) = r e^{-j\\varphi}$$',
          },
          {
            type: 'callout',
            variant: 'proof',
            title: 'Dowód reguły mnożenia (Wykład 01, sl. 26)',
            text: 'Wymnażamy nawiasy algebraicznie i korzystamy ze wzorów trygonometrycznych na cosinus i sinus sumy kątów:\n$$z_1 z_2 = r_1 r_2\\bigl[(\\cos\\varphi_1\\cos\\varphi_2 - \\sin\\varphi_1\\sin\\varphi_2) + j(\\sin\\varphi_1\\cos\\varphi_2 + \\cos\\varphi_1\\sin\\varphi_2)\\bigr]$$\n$$= r_1 r_2\\bigl(\\cos(\\varphi_1+\\varphi_2) + j\\sin(\\varphi_1+\\varphi_2)\\bigr)$$\nStąd przez indukcję po $n$ wynika natychmiast wzór de Moivre’a — potęgowanie to wielokrotne mnożenie modułu przez siebie i dodawanie kąta (obrót). Geometrycznie: mnożenie przez $z_2$ to **skalowanie o $|z_2|$ i obrót o kąt $\\varphi_2$**! Stąd w przetwarzaniu sygnałów (ICT) $e^{j\\omega t}$ reprezentuje wirujący wektor fazy.',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykłady 2.2 (Wykład 01, sl. 25, 27): Zamiana postaci i szybkie potęgowanie',
            text: '- $5 = 5(\\cos 0 + j\\sin 0) = 5e^{0j}$, $\\quad -3 = 3e^{j\\pi}$, $\\quad 2j = 2e^{j\\frac{\\pi}{2}}$, $\\quad -j = 1\\cdot e^{-j\\frac{\\pi}{2}}$.\n- $1 - j$: moduł $r = \\sqrt{1^2+(-1)^2} = \\sqrt{2}$, punkt w IV ćwiartce $\\implies \\varphi = -\\frac{\\pi}{4}$, czyli $1 - j = \\sqrt{2}e^{-j\\frac{\\pi}{4}}$.\n- **Oblicz $(1 - j)^{12}$ wzorem de Moivre’a:**\n$$(1 - j)^{12} = (\\sqrt{2})^{12} e^{j\\cdot 12\\cdot(-\\frac{\\pi}{4})} = 2^6 e^{-j\\cdot 3\\pi} = 64(\\cos(-3\\pi) + j\\sin(-3\\pi)) = 64(-1 + 0) = -64$$\nBez postaci wykładniczej musielibyśmy rozwijać dwumian Newtona 12. stopnia!',
          },
        ],
      },
      {
        id: 'alg-2-3',
        heading: '2.3. Pierwiastki stopnia $n$ z liczby zespolonej',
        blocks: [
          {
            type: 'callout',
            variant: 'theorem',
            title: 'Twierdzenie o $n$ pierwiastkach z liczby zespolonej (Wykład 01, sl. 28)',
            text: 'Liczbę $t \\in \\mathbb{C}$ nazywamy **pierwiastkiem stopnia $n$** z liczby $z$, jeśli $t^n = z$.\nDla każdej liczby $z = r(\\cos\\varphi + j\\sin\\varphi) \\neq 0$ istnieje **dokładnie $n$ różnych pierwiastków** stopnia $n$ danych wzorem:\n$$t_k = \\sqrt[n]{r}\\left(\\cos\\frac{\\varphi + 2k\\pi}{n} + j\\sin\\frac{\\varphi + 2k\\pi}{n}\\right) = \\sqrt[n]{r}\\,e^{j\\frac{\\varphi + 2k\\pi}{n}}, \\qquad k = 0, 1, \\dots, n-1$$\nPierwiastek o najmniejszym nieujemnym argumencie nazywamy **pierwiastkiem głównym**.',
          },
          {
            type: 'paragraph',
            text: '**Skąd bierze się dokładnie $n$ pierwiastków?** Zapiszmy szukany pierwiastek jako $t = \\rho e^{j\\psi}$. Wtedy z wzoru de Moivre’a równanie $t^n = z$ ma postać $\\rho^n e^{jn\\psi} = r e^{j\\varphi}$. Porównując moduły dostajemy $\\rho = \\sqrt[n]{r}$ (jedyna liczba dodatnia), a porównując argumenty z dokładnością do pełnych obrotów: $n\\psi = \\varphi + 2k\\pi \\implies \\psi_k = \\frac{\\varphi + 2k\\pi}{n}$. Dla $k = 0, 1, \\dots, n-1$ dostajemy $n$ kątów różniących się co $\\frac{2\\pi}{n}$. Dla $k = n$ wracamy do $\\psi_0 + 2\\pi$, czyli do punktu wyjścia! Wszystkie pierwiastki leżą więc w wierzchołkach **wielokąta foremnego o $n$ bokach** wpisanego w okrąg o środku $0$ i promieniu $\\sqrt[n]{r}$.',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykłady 2.3 (Wykład 01, sl. 29–30): $\\sqrt[3]{8j}$ oraz pierwiastki z jedynki $\\sqrt[3]{1}$ i $\\sqrt[4]{1}$',
            text: '**A) Wyznaczyć wszystkie pierwiastki $\\sqrt[3]{8j}$:**\nZapisujemy $8j = 8\\left(\\cos\\frac{\\pi}{2} + j\\sin\\frac{\\pi}{2}\\right)$, czyli $r = 8, \\varphi = \\frac{\\pi}{2}, n = 3$. Moduł każdego pierwiastka to $\\sqrt[3]{8} = 2$, pierwszy kąt to $\\psi_0 = \\frac{\\pi/2}{3} = \\frac{\\pi}{6}$, a kolejne przyrastają o $\\frac{2\\pi}{3}$:\n- $k=0$: $\\psi_0 = \\frac{\\pi}{6} \\implies t_0 = 2\\left(\\frac{\\sqrt{3}}{2} + j\\frac{1}{2}\\right) = \\sqrt{3} + j$\n- $k=1$: $\\psi_1 = \\frac{\\pi}{6} + \\frac{2\\pi}{3} = \\frac{5\\pi}{6} \\implies t_1 = 2\\left(-\\frac{\\sqrt{3}}{2} + j\\frac{1}{2}\\right) = -\\sqrt{3} + j$\n- $k=2$: $\\psi_2 = \\frac{\\pi}{6} + \\frac{4\\pi}{3} = \\frac{3\\pi}{2} \\implies t_2 = 2(0 - j) = -2j$\nPunkty $t_0, t_1, t_2$ tworzą trójkąt równoboczny wpisany w okrąg $|z|=2$.\n\n**B) Pierwiastki z jedynki ($1 = 1\\cdot e^{j\\cdot 0}$):**\n- $\\sqrt[3]{1} = \\left\\{1,\\; -\\frac{1}{2} + j\\frac{\\sqrt{3}}{2},\\; -\\frac{1}{2} - j\\frac{\\sqrt{3}}{2}\\right\\}$ (kąty $0, \\frac{2\\pi}{3}, \\frac{4\\pi}{3}$),\n- $\\sqrt[4]{1} = \\{1,\\; j,\\; -1,\\; -j\\}$ (kąty $0, \\frac{\\pi}{2}, \\pi, \\frac{3\\pi}{2}$ — kwadrat na okręgu jednostkowym).',
          },
          {
            type: 'svg',
            diagramId: 'alg-complex-roots',
            title: 'Interaktywna wizualizacja pierwiastków $\\sqrt[n]{z}$ na płaszczyźnie zespolonej',
            caption: 'Wybierz preset z wykładu ($\\sqrt[3]{8j}$, $\\sqrt[3]{1}$, $\\sqrt[4]{1}$) lub zmień stopień $n$, moduł $r$ i kąt $\\varphi$, aby obserwować wielokąt foremny pierwiastków.',
          },
        ],
      },
    ],
  },
  {
    id: 'algebra-ch3',
    subject_id: 'algebra',
    order_index: 3,
    slug: 'macierze-dzialania-odwrotna',
    title: 'Rozdział 3: Macierze — działania, transpozycja i odwracanie metodą Gaussa–Jordana',
    subtitle: 'Wykład 02 (cz. 1): typy macierzy, iloczyn $AB\\neq BA$, dzielniki zera, $A^T$ oraz eliminacja $[A|I] \\to [I|A^{-1}]$',
    lecture_ref: 'Wykład 02 · slajdy 2–19',
    estimated_minutes: 40,
    summary:
      'Struktura macierzy nad $\\mathbb{R}$ i $\\mathbb{C}$, rodzaje macierzy specjalnych (trójkątne, diagonalne, jednostkowa), algebra macierzy z kluczowym odstępstwem od arytmetyki liczb (nieprzemienność mnożenia i istnienie niezerowych dzielników zera), własności transpozycji oraz wyznaczanie macierzy odwrotnej $A^{-1}$ metodą operacji elementarnych na wierszach.',
    exam_questions: [9, 10, 11, 12],
    key_takeaways: [
      'Iloczyn $A_{m\\times p} \\cdot B_{p\\times n} = C_{m\\times n}$ istnieje **tylko wtedy**, gdy liczba kolumn pierwszej macierzy równa się liczbie wierszy drugiej; element $c_{ij} = \\sum_{k=1}^p a_{ik} b_{kj}$ to iloczyn skalarny $i$-tego wiersza $A$ i $j$-tej kolumny $B$.',
      'Mnożenie macierzy **NIE jest przemienne** ($AB \\neq BA$ w ogólności — ba, wymiary $AB$ i $BA$ mogą być zupełnie różne!), a iloczyn dwóch **niezerowych** macierzy może dać macierz zerową ($AB = 0$ nie implikuje $A=0$ lub $B=0$).',
      'Zasada odwracania kolejności („skarpetki i buty”): zarówno transpozycja, jak i odwracanie iloczynu **zamieniają czynniki miejscami**: $(AB)^T = B^T A^T$ oraz $(AB)^{-1} = B^{-1} A^{-1}$.',
      'Metoda eliminacji Gaussa–Jordana: budujemy blok $[A\\,|\\,I]$ i wykonujemy wyłącznie dozwolone operacje wierszowe ($\\alpha w_i$ dla $\\alpha\\neq 0$, $w_i + \\alpha w_j$, $w_i \\leftrightarrow w_j$). Jeśli lewa strona dojdzie do $I$, prawa staje się $A^{-1}$; pojawienie się **wiersza samych zer** po lewej dowodzi, że $A$ jest nieodwracalna.',
    ],
    sections: [
      {
        id: 'alg-3-1',
        heading: '3.1. Definicja macierzy i macierze specjalne',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Definicja macierzy $A \\in M_{m\\times n}(K)$ (Wykład 02, sl. 3–7)',
            text: '**Macierzą** wymiaru $m \\times n$ nazywamy prostokątną tablicę $m$ wierszy i $n$ kolumn złożoną ze skalarów z ciała $K$ ($\\mathbb{R}$ lub $\\mathbb{C}$): $A = [a_{ij}]_{m\\times n}$, gdzie pierwszy indeks $i \\in \\{1,\\dots,m\\}$ oznacza numer **wiersza**, a drugi $j \\in \\{1,\\dots,n\\}$ numer **kolumny**.\n\nNajważniejsze macierze specjalne (dla macierzy kwadratowej $n \\times n$, której główną przekątną tworzą elementy $a_{11}, a_{22}, \\dots, a_{nn}$):\n- **Macierz zerowa** $0_{m\\times n}$ — wszystkie elementy równe $0$.\n- **Trójkątna górna** — same zera *poniżej* głównej przekątnej ($a_{ij}=0$ dla $i>j$), np. $\\begin{bmatrix}1 & -5 \\\\ 0 & 4\\end{bmatrix}$.\n- **Trójkątna dolna** — same zera *powyżej* głównej przekątnej ($a_{ij}=0$ dla $i<j$), np. $\\begin{bmatrix}j & 0 & 0 \\\\ -3 & -2 & 0 \\\\ 5 & -j & 0\\end{bmatrix}$.\n- **Diagonalna** $\\operatorname{diag}(a_{11}, \\dots, a_{nn})$ — zera wszędzie poza przekątną, np. $\\operatorname{diag}(2,-5,4)$.\n- **Jednostkowa** $I_n$ (lub $I$) — $1$ na głównej przekątnej i $0$ poza nią; element neutralny mnożenia ($A I_n = I_m A = A$).',
          },
          {
            type: 'paragraph',
            text: 'Wektor kolumnowy to po prostu macierz wymiaru $m \\times 1$ (np. $\\begin{bmatrix}3\\\\2\\\\-3\\end{bmatrix} \\in M_{3\\times 1}(\\mathbb{R})$), a wektor wierszowy to macierz $1 \\times n$ (np. $[5j\\;\\;3] \\in M_{1\\times 2}(\\mathbb{C})$). Dodawanie macierzy $[a_{ij}] + [b_{ij}] = [a_{ij}+b_{ij}]$ wykonujemy **po współrzędnych wyłącznie dla macierzy tego samego wymiaru**, a mnożenie przez skalar $\\alpha \\cdot [a_{ij}] = [\\alpha a_{ij}]$ mnoży **każdy** element macierzy przez $\\alpha$ (pamiętaj o tej różnicy przy wyznacznikach, gdzie skalar wyciąga się z jednego wiersza!).',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykład 3.1 (Wykład 02, sl. 8): Mnożenie macierzy zespolonej przez skalar $-3j$',
            text: '$$(-3j) \\cdot \\begin{bmatrix} 3 & 4 & -3 \\\\ -1 & 3j & 0 \\end{bmatrix} = \\begin{bmatrix} -9j & -12j & 9j \\\\ 3j & -9j^2 & 0 \\end{bmatrix} = \\begin{bmatrix} -9j & -12j & 9j \\\\ 3j & 9 & 0 \\end{bmatrix}$$\nZwróć uwagę na element $(2,2)$: $(-3j)\\cdot(3j) = -9j^2 = -9(-1) = +9$.',
          },
        ],
      },
      {
        id: 'alg-3-2',
        heading: '3.2. Mnożenie macierzy, nieprzemienność i dzielniki zera',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Definicja iloczynu macierzy (Wykład 02, sl. 10–13)',
            text: 'Dla macierzy $A = [a_{ik}]_{m\\times p}$ i $B = [b_{kj}]_{p\\times n}$ iloczyn $C = A \\cdot B = [c_{ij}]_{m\\times n}$ ma elementy:\n$$c_{ij} = \\sum_{k=1}^{p} a_{ik} \\cdot b_{kj} = a_{i1}b_{1j} + a_{i2}b_{2j} + \\dots + a_{ip}b_{pj}$$\nMnożenie jest **łączne** $A(BC)=(AB)C$ i **rozdzielne** względem dodawania $A(B+C)=AB+AC$, $(A+B)C=AC+BC$, ale **nie jest przemienne**! Mnożenie przez skalar $\\lambda$ można zapisać jako mnożenie przez macierz skalarną $\\lambda I_n$.',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykład 3.2 (Wykład 02, sl. 11 i 13): Dowód nieprzemienności oraz zerowy iloczyn niezerowych macierzy',
            text: '1. Niech $A = \\begin{bmatrix}1 & 2 & 3 \\\\ 2 & 1 & -1\\end{bmatrix}_{2\\times 3}$ oraz $B = \\begin{bmatrix}1 & 2 \\\\ -2 & 4 \\\\ 1 & 2\\end{bmatrix}_{3\\times 2}$.\n- $A \\cdot B$ ma wymiar **$2 \\times 2$**:\n$$A \\cdot B = \\begin{bmatrix} 1\\cdot 1 + 2(-2) + 3\\cdot 1 & 1\\cdot 2 + 2\\cdot 4 + 3\\cdot 2 \\\\ 2\\cdot 1 + 1(-2) + (-1)\\cdot 1 & 2\\cdot 2 + 1\\cdot 4 + (-1)\\cdot 2 \\end{bmatrix} = \\begin{bmatrix} 0 & 16 \\\\ -1 & 6 \\end{bmatrix}$$\n- $B \\cdot A$ ma wymiar **$3 \\times 3$**:\n$$B \\cdot A = \\begin{bmatrix} 1\\cdot 1+2\\cdot 2 & 1\\cdot 2+2\\cdot 1 & 1\\cdot 3+2(-1) \\\\ (-2)\\cdot 1+4\\cdot 2 & (-2)\\cdot 2+4\\cdot 1 & (-2)\\cdot 3+4(-1) \\\\ 1\\cdot 1+2\\cdot 2 & 1\\cdot 2+2\\cdot 1 & 1\\cdot 3+2(-1) \\end{bmatrix} = \\begin{bmatrix} 5 & 4 & 1 \\\\ 6 & 0 & -10 \\\\ 5 & 4 & 1 \\end{bmatrix}$$\nOczywiście $A\\cdot B \\neq B\\cdot A$!\n\n2. **Niezerowe macierze o zerowym iloczynie (dzielniki zera):**\n$$\\begin{bmatrix} 0 & 1 \\\\ 0 & 0 \\end{bmatrix} \\cdot \\begin{bmatrix} 0 & 1 \\\\ 0 & 0 \\end{bmatrix} = \\begin{bmatrix} 0 & 0 \\\\ 0 & 0 \\end{bmatrix}$$\nDlatego w równaniach macierzowych **nie wolno skracać** przez dowolną niezerową macierz $A$ (np. $AB = AC \\not\\Rightarrow B = C$, chyba że $A$ jest odwracalna i mnożymy obustronnie z lewej przez $A^{-1}$!).',
          },
          {
            type: 'svg',
            diagramId: 'alg-matrix-mult',
            title: 'Interaktywny schemat mnożenia macierzy $A\\cdot B$ i kontrast wymiarów $AB$ vs $BA$',
            caption: 'Kliknij dowolną komórkę $(i,j)$ macierzy wynikowej (przykład z Wykładu 02, sl. 11), aby zobaczyć podświetlony wiersz $i$ macierzy $A$, kolumnę $j$ macierzy $B$ oraz rozpisany iloczyn skalarny.',
          },
        ],
      },
      {
        id: 'alg-3-3',
        heading: '3.3. Transpozycja $A^T$ i macierz odwrotna $A^{-1}$ metodą eliminacji',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Transpozycja i macierz odwrotna (Wykład 02, sl. 14–16)',
            text: '**Macierz transponowana** $A^T = [b_{ij}]_{n\\times m}$ powstaje z $A = [a_{ij}]_{m\\times n}$ przez zamianę wierszy na kolumny ($b_{ij} = a_{ji}$). Własności:\n$$(A+B)^T = A^T + B^T, \\quad (A^T)^T = A, \\quad (\\alpha A)^T = \\alpha A^T, \\quad \\mathbf{(AB)^T = B^T A^T}, \\quad (A^n)^T = (A^T)^n$$\n\n**Macierz odwrotna** do kwadratowej $A \\in M_{n\\times n}$ to jedyna macierz $A^{-1}$ spełniająca $A\\cdot A^{-1} = A^{-1}\\cdot A = I_n$. Nie każda macierz kwadratowa jest odwracalna! Jeśli $A, B$ są odwracalne, to:\n$$(A^{-1})^{-1} = A, \\qquad (A^T)^{-1} = (A^{-1})^T, \\qquad \\mathbf{(A\\cdot B)^{-1} = B^{-1} \\cdot A^{-1}}$$',
          },
          {
            type: 'callout',
            variant: 'proof',
            title: 'Dlaczego $(AB)^{-1} = B^{-1}A^{-1}$ (odwrócenie kolejności)?',
            text: 'Sprawdźmy przez bezpośrednie pomnożenie z lewej i prawej strony, korzystając z łączności mnożenia:\n$$(AB)(B^{-1}A^{-1}) = A(B B^{-1})A^{-1} = A \\cdot I_n \\cdot A^{-1} = A A^{-1} = I_n$$\nAnalogicznie $(B^{-1}A^{-1})(AB) = B^{-1}(A^{-1}A)B = B^{-1}B = I_n$. Gdybyśmy nie zamienili kolejności, $A$ i $A^{-1}$ byłyby rozdzielone przez $B$ i nie mogłyby się znieść (bo mnożenie nie jest przemienne!).',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykłady 3.3 (Wykład 02, sl. 17–19): Odwracanie metodą Gaussa–Jordana $[A\\,|\\,I] \\to [I\\,|\\,A^{-1}]$',
            text: '**Dozwolone operacje elementarne na wierszach:** (1) $\\alpha \\cdot w_i$ ($\\alpha\\neq 0$), (2) $w_i + \\alpha \\cdot w_j$, (3) $w_i \\leftrightarrow w_j$.\n\n**A) Macierz odwracalna $A = \\begin{bmatrix}3 & 4 \\\\ 2 & 3\\end{bmatrix}$:**\n$$\\left[\\begin{array}{cc|cc} 3 & 4 & 1 & 0 \\\\ 2 & 3 & 0 & 1 \\end{array}\\right] \\xrightarrow{w_1 : 3} \\left[\\begin{array}{cc|cc} 1 & \\frac{4}{3} & \\frac{1}{3} & 0 \\\\ 2 & 3 & 0 & 1 \\end{array}\\right] \\xrightarrow{w_2 - 2w_1} \\left[\\begin{array}{cc|cc} 1 & \\frac{4}{3} & \\frac{1}{3} & 0 \\\\ 0 & \\frac{1}{3} & -\\frac{2}{3} & 1 \\end{array}\\right]$$\n$$\\xrightarrow{3w_2} \\left[\\begin{array}{cc|cc} 1 & \\frac{4}{3} & \\frac{1}{3} & 0 \\\\ 0 & 1 & -2 & 3 \\end{array}\\right] \\xrightarrow{w_1 - \\frac{4}{3}w_2} \\left[\\begin{array}{cc|cc} 1 & 0 & 3 & -4 \\\\ 0 & 1 & -2 & 3 \\end{array}\\right] = [I_2 \\,|\\, A^{-1}]$$\nZatem $A^{-1} = \\begin{bmatrix}3 & -4 \\\\ -2 & 3\\end{bmatrix}$. Sprawdzenie: $\\begin{bmatrix}3&4\\\\2&3\\end{bmatrix}\\begin{bmatrix}3&-4\\\\-2&3\\end{bmatrix} = \\begin{bmatrix}9-8 & -12+12 \\\\ 6-6 & -8+9\\end{bmatrix} = I_2$.\n\n**B) Macierz nieodwracalna $A = \\begin{bmatrix}1 & 2 \\\\ -2 & -4\\end{bmatrix}$:**\n$$\\left[\\begin{array}{cc|cc} 1 & 2 & 1 & 0 \\\\ -2 & -4 & 0 & 1 \\end{array}\\right] \\xrightarrow{w_2 + 2w_1} \\left[\\begin{array}{cc|cc} 1 & 2 & 1 & 0 \\\\ 0 & 0 & 2 & 1 \\end{array}\\right]$$\nPo lewej pojawił się **wiersz samych zer** — nie da się już uzyskać macierzy $I_2$. Wniosek: $A$ jest nieodwracalna (i rzeczywiście $\\det A = -4 - (-4) = 0$).',
          },
        ],
      },
    ],
  },
];
