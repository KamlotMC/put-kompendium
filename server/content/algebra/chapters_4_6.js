// Algebra liniowa dla ICT — Rozdziały 4–6
// Źródło: Wykłady prowadzącego (Instytut Telekomunikacji Multimedialnej, PUT):
// 02_Algebra_macierze_enc.pdf (cz. 2, sl. 20–43), 03_Układy_równań_enc.pdf (sl. 1–17), 04_Wektory_wart_wlasne_enc.pdf (sl. 1–14)

export const ALGEBRA_CHAPTERS_4_6 = [
  {
    id: 'algebra-ch4',
    subject_id: 'algebra',
    order_index: 4,
    slug: 'wyznaczniki-laplace-dolaczona',
    title: 'Rozdział 4: Wyznaczniki, rozwinięcie Laplace’a i macierz dołączona',
    subtitle: 'Wykład 02 (cz. 2): Sarrus, interpretacja geometryczna, Cauchy, macierze blokowe, Laplace i $A^{-1}=\\frac{1}{\\det A}A^D$',
    lecture_ref: 'Wykład 02 · slajdy 20–42',
    estimated_minutes: 45,
    summary:
      'Wyznacznik jako funkcja współczynników macierzy kwadratowej: wzory Sarrusa (tylko do stopnia 3!), pole równoległoboku i objętość równoległościanu, własności operacji wierszowych i wyłączanie skalara ($\\det(\\alpha A)=\\alpha^n\\det A$), twierdzenie Cauchy’ego, macierze blokowe, dopełnienia algebraiczne, rozwinięcie Laplace’a oraz konstrukcja macierzy odwrotnej przez macierz dołączoną $A^D$.',
    exam_questions: [13, 14, 15, 16],
    key_takeaways: [
      'Reguła Sarrusa działa **wyłącznie dla macierzy $3 \\times 3$**! Dla $n \\ge 4$ stosujemy **rozwinięcie Laplace’a** (wybierając wiersz/kolumnę z największą liczbą zer) albo zerujemy kolumnę operacjami $w_i + \\alpha w_j$, które nie zmieniają wyznacznika.',
      'Najczęstsza pułapka z własności: **$\\det(\\alpha A) = \\alpha^n \\det A$** (wykładnik $n$ = stopień macierzy, bo skalar wyciągamy osobno z każdego z $n$ wierszy!), a zamiana dwóch wierszy **zmienia znak** wyznacznika na przeciwny.',
      'Twierdzenie Cauchy’ego: $\\det(AB) = \\det A \\cdot \\det B$, skąd $\\det(A^m) = (\\det A)^m$ oraz $\\det(A^{-1}) = \\frac{1}{\\det A}$. Dla macierzy trójkątnej/diagonalnej $\\det A$ to iloczyn elementów na głównej przekątnej.',
      'Macierz kwadratowa jest **odwracalna $\\iff$ jest nieosobliwa ($\\det A \\neq 0$)**. Wzór przez macierz dołączoną (transponowaną macierz dopełnień!): $A^{-1} = \\frac{1}{\\det A} A^D = \\frac{1}{\\det A}[A_{ij}]^T$, a dla $2\\times 2$: $\\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}^{-1} = \\frac{1}{ad-bc}\\begin{bmatrix}d&-b\\\\-c&a\\end{bmatrix}$.',
    ],
    sections: [
      {
        id: 'alg-4-1',
        heading: '4.1. Reguła Sarrusa i geometryczny sens wyznacznika',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Wyznacznik stopnia 1, 2, 3 — reguła Sarrusa (Wykład 02, sl. 20–23)',
            text: '**Wyznacznik** $\\det A$ (ozn. również $|A|$) przyporządkowuje każdej macierzy kwadratowej $A \\in M_{n\\times n}(K)$ skalar z ciała $K$:\n- Stopień $1$: $\\det[a_{11}] = a_{11}$.\n- Stopień $2$: $\\det\\begin{bmatrix}a_{11} & a_{12} \\\\ a_{21} & a_{22}\\end{bmatrix} = a_{11}a_{22} - a_{12}a_{21}$.\n- Stopień $3$ (**reguła Sarrusa** — dopisujemy po prawej kolumny 1 i 2, sumujemy iloczyny 3 przekątnych $\\searrow$ ze znakiem $+$ i odejmujemy 3 przekątne $\\swarrow$ ze znakiem $-$):\n$$\\det A = a_{11}a_{22}a_{33} + a_{12}a_{23}a_{31} + a_{13}a_{21}a_{32} - a_{13}a_{22}a_{31} - a_{11}a_{23}a_{32} - a_{12}a_{21}a_{33}$$',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykłady 4.1 (Wykład 02, sl. 21 i 23): Wyznaczniki $2\\times 2$ i $3\\times 3$',
            text: '1. $\\det\\begin{bmatrix}1 & 2 \\\\ -3 & 1\\end{bmatrix} = 1\\cdot 1 - 2\\cdot(-3) = 1 + 6 = 7$.\n2. Dla $A = \\begin{bmatrix}0 & 1 & 1 \\\\ -2 & 1 & 0 \\\\ 2 & 1 & -1\\end{bmatrix}$ dopisujemy kolumny 1 i 2:\n$$\\det A = \\bigl[0\\cdot 1\\cdot(-1) + 1\\cdot 0\\cdot 2 + 1\\cdot(-2)\\cdot 1\\bigr] - \\bigl[1\\cdot 1\\cdot 2 + 0\\cdot 0\\cdot 1 + 1\\cdot(-2)\\cdot(-1)\\bigr]$$\n$$= (0 + 0 - 2) - (2 + 0 + 2) = -2 - 4 = -6$$',
          },
          {
            type: 'paragraph',
            text: '**Interpretacja geometryczna (Wykład 02, sl. 24–25):** Wyznacznik mierzy zorientowane skalowanie objętości!\n- W $\\mathbb{R}^2$ pole równoległoboku $D$ rozpiętego na wektorach $\\vec{u}=(a,b)$ i $\\vec{v}=(c,d)$ wynosi $|D| = \\left|\\det\\begin{bmatrix}a & b \\\\ c & d\\end{bmatrix}\\right|$ *(uwaga: na slajdzie 24 pojawiła się drobna literówka $\\vec{v}=(a,b)$ zamiast $(c,d)$, ale sam wzór wyznacznika jest poprawny)*.\n- W $\\mathbb{R}^3$ objętość równoległościanu $V$ rozpiętego na $\\vec{u}=(a,b,c)$, $\\vec{v}=(d,e,f)$, $\\vec{w}=(g,h,i)$ wynosi $|V| = \\left|\\det\\begin{bmatrix}a&b&c\\\\d&e&f\\\\g&h&i\\end{bmatrix}\\right|$.\nZauważ jak pięknie tłumaczy to osobliwość: gdy wektory są liniowo zależne (leżą na jednej prostej / płaszczyźnie), równoległobok spłaszcza się do pola $0$, więc $\\det A = 0$!',
          },
          {
            type: 'svg',
            diagramId: 'alg-det-geometry',
            title: 'Interaktywna geometria wyznacznika $2 \\times 2$: pole równoległoboku, orientacja i osobliwość',
            caption: 'Przesuwaj składowe wektorów $\\vec{u}=(a,b)$ i $\\vec{v}=(c,d)$, aby obserwować zmianę pola $|\\det A|$, zmianę znaku (orientacji) oraz przypadek osobliwy $\\det A = 0$ (wektory współliniowe).',
          },
        ],
      },
      {
        id: 'alg-4-2',
        heading: '4.2. Własności wyznaczników, twierdzenie Cauchy’ego i macierze blokowe',
        blocks: [
          {
            type: 'table',
            headers: ['Własność / Twierdzenie', 'Wzór', 'Komentarz i przykład z Wykładu 02'],
            rows: [
              ['Macierz trójkątna / diagonalna', '$\\det A = a_{11}a_{22}\\cdots a_{nn}$', 'Iloczyn przekątnej; sl. 26: $\\det = 3\\cdot j\\cdot(-1)\\cdot 1 = -3j$'],
              ['Transpozycja', '$\\det(A^T) = \\det A$', 'Każda własność wierszy działa identycznie dla kolumn'],
              ['Twierdzenie Cauchy’ego', '$\\det(AB) = \\det A \\cdot \\det B$', 'Stąd $\\det(A^m)=(\\det A)^m$; dla $\\det A=-2$: $\\det(A^2)=4$'],
              ['Skalowanie całej macierzy $n\\times n$', '$\\det(\\alpha A) = \\alpha^n \\det A$', 'Sl. 27 ($3\\times 3, \\det A=-2$): $\\det(3A) = 3^3(-2) = -54$'],
              ['Macierz blokowa trójkątna', '$\\det\\begin{bmatrix}A&C\\\\0&B\\end{bmatrix}=\\det\\begin{bmatrix}A&0\\\\D&B\\end{bmatrix}=\\det A\\cdot\\det B$', 'Podmacierze $A,B$ kwadratowe; sl. 29 ($5\\times 5$): $(-3)\\cdot 2\\cdot 10 = -60$'],
              ['Liniowa zależność wierszy/kolumn', '$\\det A = 0$', 'Wiersz zerowy, dwa równe wiersze lub kombinacja liniowa (np. $k_3 = -2k_1$)'],
              ['Jednorodność i addytywność wiersza', 'Stałą $\\alpha$ wyłączamy z *jednego* wiersza; sumę w wierszu rozbijamy na sumę dwóch wyznaczników', 'Sl. 32: rozbicie kolumny $[1+j, 2+j, 3+j]^T$ daje od razu $\\det = 0$'],
              ['Zamiana dwóch wierszy / kolumn', '$w_i \\leftrightarrow w_j \\implies \\det A\' = -\\det A$', 'Zmienia znak wyznacznika na przeciwny (sl. 33: $-6 \\to +6$)'],
              ['Dodanie wielokrotności wiersza', '$w_i + \\alpha w_j \\implies \\det A\' = \\det A$', '**Nie zmienia** wyznacznika! Podstawa zerowania kolumn przed Laplace’em'],
            ],
          },
          {
            type: 'callout',
            variant: 'warning',
            title: 'Drobna literówka na slajdzie 33 (Wykład 02)',
            text: 'W dolnym przykładzie na slajdzie 33 nad strzałką napisano $w_1 + 2w_3$, podczas gdy nowy 3. wiersz $(11, 2, 6)$ powstał z operacji **$w_3 + 2w_1$** ($1+10=11,\\; 0+2=2,\\; 0+6=6$). Sens twierdzenia pozostaje bez zmian — obie operacje zachowują wartość wyznacznika równą $-6$.',
          },
        ],
      },
      {
        id: 'alg-4-3',
        heading: '4.3. Dopełnienia algebraiczne, rozwinięcie Laplace’a i macierz dołączona $A^D$',
        blocks: [
          {
            type: 'callout',
            variant: 'theorem',
            title: 'Dopełnienie algebraiczne i twierdzenie Laplace’a (Wykład 02, sl. 35–38)',
            text: '**Dopełnieniem algebraicznym** elementu $a_{ij}$ macierzy $A \\in M_{n\\times n}$ nazywamy skalar:\n$$A_{ij} = (-1)^{i+j} \\cdot \\det B_{ij}$$\ngdzie $B_{ij}$ to podmacierz stopnia $(n-1)$ powstała po wykreśleniu $i$-tego wiersza i $j$-tej kolumny (znak $(-1)^{i+j}$ tworzy „szachownicę” zaczynającą się od $+$ w lewym górnym rogu).\n\n**Twierdzenie Laplace’a:** Wyznacznik można rozwinąć względem dowolnego $i$-tego wiersza lub dowolnej $j$-tej kolumny:\n$$\\det A = \\sum_{k=1}^{n} a_{ik} A_{ik} = \\sum_{k=1}^{n} a_{kj} A_{kj}$$',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykład 4.2 (Wykład 02, sl. 37–38): Wyznacznik $4\\times 4$ metodą Laplace’a (2 sposoby)',
            text: 'Oblicz $\\det A = \\begin{vmatrix} 1 & 0 & 2 & 0 \\\\ 0 & 2 & 0 & 1 \\\\ 3 & 4 & 0 & 0 \\\\ 5 & 0 & 4 & -2 \\end{vmatrix}$. Zauważmy, że zarówno 1. wiersz, jak i 3. kolumna mają po dwa zera:\n\n- **Wg 1. wiersza:**\n$$\\det A = 1\\cdot(-1)^{1+1}\\begin{vmatrix}2&0&1\\\\4&0&0\\\\0&4&-2\\end{vmatrix} + 2\\cdot(-1)^{1+3}\\begin{vmatrix}0&2&1\\\\3&4&0\\\\5&0&-2\\end{vmatrix} = 1\\cdot 16 + 2\\cdot(-8) = 16 - 16 = 0$$\n- **Wg 3. kolumny:**\n$$\\det A = 2\\cdot(-1)^{1+3}\\begin{vmatrix}0&2&1\\\\3&4&0\\\\5&0&-2\\end{vmatrix} + 4\\cdot(-1)^{4+3}\\begin{vmatrix}1&0&0\\\\0&2&1\\\\3&4&0\\end{vmatrix} = 2\\cdot(-8) + 4\\cdot(-1)\\cdot(-4) = -16 + 16 = 0$$\nOba rozwinięcia dają oczywiście identyczny wynik: macierz $A$ jest **osobliwa** ($\\det A = 0$).',
          },
          {
            type: 'callout',
            variant: 'theorem',
            title: 'Macierz dołączona $A^D$ i wzór na macierz odwrotną (Wykład 02, sl. 39–42)',
            text: '**Macierzą dołączoną** $A^D$ nazywamy **transponowaną** macierz dopełnień algebraicznych: $A^D = [A_{ij}]^T$. Dla każdej macierzy kwadratowej zachodzi $A \\cdot A^D = A^D \\cdot A = (\\det A)\\cdot I_n$.\n\nStąd wynika fundamentalne kryterium odwracalności:\n$$A \\text{ jest odwracalna} \\iff \\det A \\neq 0 \\text{ (macierz nieosobliwa)}$$\n$$A^{-1} = \\frac{1}{\\det A} \\cdot A^D, \\qquad \\det(A^{-1}) = \\frac{1}{\\det A}$$\nW szczególności dla macierzy $2 \\times 2$ (zamieniamy przekątną główną i zmieniamy znaki na przeciwnej):\n$$\\begin{bmatrix}a & b \\\\ c & d\\end{bmatrix}^{-1} = \\frac{1}{ad - bc} \\begin{bmatrix}d & -b \\\\ -c & a\\end{bmatrix} \\quad (ad - bc \\neq 0)$$',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykład 4.3 (Wykład 02, sl. 39 i 41): Odwracanie macierzy $3\\times 3$ przez $A^D$',
            text: 'Dla $A = \\begin{bmatrix}2 & 0 & 0 \\\\ 0 & 1 & 1 \\\\ -1 & 0 & 1\\end{bmatrix}$ mamy $\\det A = 2 \\cdot (1\\cdot 1 - 1\\cdot 0) = 2 \\neq 0$.\nLiczymy macierz dopełnień $[A_{ij}]$ i **transponujemy**:\n$$A^D = \\begin{bmatrix} 1 & -1 & 1 \\\\ 0 & 2 & 0 \\\\ 0 & -2 & 2 \\end{bmatrix}^T = \\begin{bmatrix} 1 & 0 & 0 \\\\ -1 & 2 & -2 \\\\ 1 & 0 & 2 \\end{bmatrix} \\implies A^{-1} = \\frac{1}{2}A^D = \\begin{bmatrix} \\frac{1}{2} & 0 & 0 \\\\ -\\frac{1}{2} & 1 & -1 \\\\ \\frac{1}{2} & 0 & 1 \\end{bmatrix}$$\n**Uwaga egzaminacyjna:** Najczęstszy błąd przy metodzie dopełnień to **zapomnienie o transpozycji** (wtedy zamiast $A^D$ dostajemy $[A_{ij}]$ i iloczyn $A\\cdot A^{-1}$ nie daje $I$!). Zawsze mnóż wynik na brudno z $A$ dla sprawdzenia.',
          },
        ],
      },
    ],
  },
  {
    id: 'algebra-ch5',
    subject_id: 'algebra',
    order_index: 5,
    slug: 'uklady-rownan-liniowych',
    title: 'Rozdział 5: Układy równań liniowych — metody Cramera, Gaussa i macierzowa',
    subtitle: 'Wykład 03: zapis $AX=B$, układy jednorodne, geometria płaszczyzn w $\\mathbb{R}^3$ oraz 3 metody rozwiązywania',
    lecture_ref: 'Wykład 03 · slajdy 2–16',
    estimated_minutes: 35,
    summary:
      'Macierzowa reprezentacja układów równań liniowych $A\\cdot X = B$, różnica między układem jednorodnym ($AX=0$) a niejednorodnym, geometryczny sens przecięć płaszczyzn w $\\mathbb{R}^3$, definicja układu Cramera ($\\det A \\neq 0$) oraz pełne porównanie trzech metod rozwiązania na jednym przykładzie wykładowym: wzorów Cramera, eliminacji Gaussa–Jordana $[A|B]\\to[I|X]$ oraz metody macierzy odwrotnej $X = A^{-1}B$.',
    exam_questions: [17, 18, 19, 20],
    key_takeaways: [
      'Każdy układ $m$ równań z $n$ niewiadomymi zapisujemy macierzowo jako **$A \\cdot X = B$**, a jego macierzą rozszerzoną jest blok $[A\\,|\\,B]$.',
      'Układ **jednorodny** ($AX = 0$) jest *zawsze niesprzeczny*, ponieważ posiada co najmniej rozwiązanie zerowe $X = 0$; zbiór jego rozwiązań tworzy podprzestrzeń liniową $\\mathbb{R}^n$. Niezerowe rozwiązania istnieją dla kwadratowej $A$ wtedy i tylko wtedy, gdy $\\det A = 0$ (kluczowe dla wektorów własnych!).',
      '**Układ Cramera** to układ kwadratowy ($m=n$) z nieosobliwą macierzą współczynników ($\\det A \\neq 0$). Ma on **dokładnie jedno rozwiązanie**, które można wyliczyć trzema równoważnymi metodami: $x_j = \\frac{\\det A_{x_j}}{\\det A}$, $[A|B]\\to[I|X]$ lub $X = A^{-1}B$.',
      'Dla układów dużych ($n \\ge 4$) metoda Cramera jest nieopłacalna (wymaga $n+1$ wyznaczników $n\\times n$); w praktyce inżynierskiej i obliczeniach numerycznych króluje **eliminacja Gaussa–Jordana** ($O(n^3)$).',
    ],
    sections: [
      {
        id: 'alg-5-1',
        heading: '5.1. Zapis macierzowy $AX=B$, układy jednorodne i interpretacja geometryczna',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Układ $m$ równań liniowych z $n$ niewiadomymi (Wykład 03, sl. 3–6)',
            text: 'Układ równań liniowych:\n$$\\begin{cases} a_{11}x_1 + a_{12}x_2 + \\dots + a_{1n}x_n = b_1 \\\\ \\vdots \\\\ a_{m1}x_1 + a_{m2}x_2 + \\dots + a_{mn}x_n = b_m \\end{cases}$$\nzapisujemy równoważnie jako równanie macierzowe **$A \\cdot X = B$**, gdzie $A = [a_{ij}]_{m\\times n}$ to **macierz współczynników**, $X = [x_1, \\dots, x_n]^T$ to **wektor niewiadomych**, a $B = [b_1, \\dots, b_m]^T$ to **kolumna wyrazów wolnych**.\n\n- Jeśli $B = 0$ ($AX = 0$), układ jest **jednorodny** — zawsze ma przynajmniej rozwiązanie trywialne (zerowe) $X = 0$, a zbiór wszystkich jego rozwiązań jest podprzestrzenią liniową $\\mathbb{R}^n$.\n- Jeśli $B \\neq 0$, układ jest **niejednorodny** (może mieć 0, 1 lub $\\infty$ rozwiązań).',
          },
          {
            type: 'paragraph',
            text: '**Interpretacja geometryczna dla trzech niewiadomych ($\\mathbb{R}^3$, Wykład 03, sl. 7):**\n- **1 równanie** ($ax+by+cz=d$) opisuje **płaszczyznę** w $\\mathbb{R}^3$ (zbiór rozwiązań 2-wymiarowy).\n- **2 równania** opisują część wspólną dwóch płaszczyzn: typowo **prostą** (1D), a w przypadkach szczególnych tę samą płaszczyznę (2D) lub zbiór pusty $\\emptyset$ (płaszczyzny równoległe rozłączne).\n- **3 równania** opisują część wspólną trzech płaszczyzn: typowo **jeden punkt** (układ oznaczony / Cramera), ale może też wyjść prosta, płaszczyzna (układ nieoznaczony — $\\infty$ rozwiązań) lub $\\emptyset$ (układ sprzeczny).',
          },
          {
            type: 'svg',
            diagramId: 'alg-linear-systems',
            title: 'Interaktywna geometria układów równań liniowych: oznaczony, nieoznaczony i sprzeczny',
            caption: 'Przełączaj przypadki geometryczne układów liniowych oraz porównaj liczbę operacji metod Cramera, Gaussa–Jordana i macierzowej.',
          },
        ],
      },
      {
        id: 'alg-5-2',
        heading: '5.2. Trzy metody rozwiązania układu Cramera na wspólnym przykładzie wykładowym',
        blocks: [
          {
            type: 'callout',
            variant: 'theorem',
            title: 'Układ Cramera i wzory Cramera (Wykład 03, sl. 8–9, 13, 15)',
            text: 'Układ kwadratowy $n$ równań z $n$ niewiadomymi nazywamy **układem Cramera**, gdy $\\det A \\neq 0$. Ma on wówczas **dokładnie jedno rozwiązanie**, które możemy wyznaczyć na trzy sposoby:\n1. **Metoda wyznacznikowa (wzory Cramera):** $x_j = \\frac{\\det A_{x_j}}{\\det A}$ dla $j=1,\\dots,n$, gdzie macierz $A_{x_j}$ powstaje z $A$ przez zastąpienie $j$-tej kolumny kolumną wyrazów wolnych $B$.\n2. **Metoda eliminacji (Gaussa–Jordana):** przekształcamy macierz rozszerzoną operacjami wierszowymi $[A\\,|\\,B] \\longrightarrow [I\\,|\\,X]$.\n3. **Metoda macierzowa:** mnożymy $AX = B$ z lewej strony przez $A^{-1}$, otrzymując $X = A^{-1} \\cdot B$.',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykład 5.1 (Wykład 03, sl. 10–11, 14, 16): Ten sam układ rozwiązany wszystkimi 3 metodami',
            text: 'Rozwiąż układ:\n$$\\begin{cases} 3x + 2y - 2z = -1 \\\\ 4x + 4y - 3z = 3 \\\\ -x - y + z = 2 \\end{cases} \\iff A = \\begin{bmatrix}3 & 2 & -2 \\\\ 4 & 4 & -3 \\\\ -1 & -1 & 1\\end{bmatrix},\\quad B = \\begin{bmatrix}-1 \\\\ 3 \\\\ 2\\end{bmatrix}$$\n\n**Metoda 1 — Wzory Cramera:**\n- $\\det A = (12 + 6 + 8) - (8 + 9 + 8) = 26 - 25 = 1 \\neq 0$ (jest to układ Cramera!),\n- $\\det A_x = \\begin{vmatrix}-1&2&-2\\\\3&4&-3\\\\2&-1&1\\end{vmatrix} = (-4-12+6) - (-16-3+6) = -10 + 13 = 3$,\n- $\\det A_y = \\begin{vmatrix}3&-1&-2\\\\4&3&-3\\\\-1&2&1\\end{vmatrix} = (9-3-16) - (6-18-4) = -10 + 16 = 6$,\n- $\\det A_z = \\begin{vmatrix}3&2&-1\\\\4&4&3\\\\-1&-1&2\\end{vmatrix} = (24-6+4) - (4-9+16) = 22 - 11 = 11$.\nWynik: $x = \\frac{3}{1} = 3,\\; y = \\frac{6}{1} = 6,\\; z = \\frac{11}{1} = 11$.\n\n**Metoda 2 — Eliminacja na macierzy rozszerzonej $[A\\,|\\,B]$:**\n$$\\left[\\begin{array}{ccc|c} 3&2&-2&-1 \\\\ 4&4&-3&3 \\\\ -1&-1&1&2 \\end{array}\\right] \\xrightarrow{\\substack{w_1+3w_3 \\\\ w_2+4w_3}} \\left[\\begin{array}{ccc|c} 0&-1&1&5 \\\\ 0&0&1&11 \\\\ -1&-1&1&2 \\end{array}\\right] \\xrightarrow{w_3 - w_1} \\left[\\begin{array}{ccc|c} 0&-1&1&5 \\\\ 0&0&1&11 \\\\ -1&0&0&-3 \\end{array}\\right]$$\n$$\\xrightarrow{-w_1,\\,-w_3} \\left[\\begin{array}{ccc|c} 0&1&-1&-5 \\\\ 0&0&1&11 \\\\ 1&0&0&3 \\end{array}\\right] \\xrightarrow{w_1+w_2,\\;\\text{sort}} \\left[\\begin{array}{ccc|c} 1&0&0&3 \\\\ 0&1&0&6 \\\\ 0&0&1&11 \\end{array}\\right] \\implies X = \\begin{bmatrix}3\\\\6\\\\11\\end{bmatrix}$$\n\n**Metoda 3 — Macierz odwrotna $X = A^{-1}B$:**\nWyznaczając $A^{-1} = \\begin{bmatrix}1 & 0 & 2 \\\\ -1 & 1 & 1 \\\\ 0 & 1 & 4\\end{bmatrix}$ otrzymujemy:\n$$X = \\begin{bmatrix}1 & 0 & 2 \\\\ -1 & 1 & 1 \\\\ 0 & 1 & 4\\end{bmatrix} \\begin{bmatrix}-1 \\\\ 3 \\\\ 2\\end{bmatrix} = \\begin{bmatrix}-1+0+4 \\\\ 1+3+2 \\\\ 0+3+8\\end{bmatrix} = \\begin{bmatrix}3 \\\\ 6 \\\\ 11\\end{bmatrix}$$',
          },
          {
            type: 'callout',
            variant: 'tip',
            title: 'Co gdy $\\det A = 0$? (Wskazówka praktyczna do kolokwium)',
            text: 'Gdy $\\det A = 0$, układ **nie jest** układem Cramera — wzory Cramera ani $A^{-1}$ nie działają (nie wolno dzielić przez $0$!). Wtedy stosujemy **eliminację Gaussa**:\n- Jeżeli pojawi się wiersz sprzeczny $[0\\;\\;0\\;\\cdots\\;0 \\mid c]$ z $c \\neq 0$, układ jest **sprzeczny** (brak rozwiązań).\n- Jeżeli zniknie cały wiersz zerowy $[0\\;\\;0\\;\\cdots\\;0 \\mid 0]$ bez sprzeczności, układ ma **nieskończenie wiele rozwiązań** zależnych od parametrów (właśnie tak wyznaczamy wektory własne z $(A-\\lambda I)X = 0$ w Rozdziale 6!).',
          },
        ],
      },
    ],
  },
  {
    id: 'algebra-ch6',
    subject_id: 'algebra',
    order_index: 6,
    slug: 'wartosci-i-wektory-wlasne',
    title: 'Rozdział 6: Wartości i wektory własne macierzy',
    subtitle: 'Wykład 04: $AX=\\lambda X$, wielomian charakterystyczny $\\chi_A(\\lambda)=\\det(A-\\lambda I)$, krotności i przypadek zespolony',
    lecture_ref: 'Wykład 04 · slajdy 2–13',
    estimated_minutes: 40,
    summary:
      'Kluczowe pojęcie analizy widmowej i metod optymalizacji ICT: wektory własne jako kierunki niezmiennicze przekształcenia liniowego $X \\mapsto AX$, wyprowadzenie równania charakterystycznego $\\det(A-\\lambda I)=0$, szczegółowe rozwiązania przykładów $2\\times 2$ i $3\\times 3$ (w tym z wartością podwójną generującą 2-wymiarową przestrzeń własną) oraz macierz obrotu bez rzeczywistych wartości własnych.',
    exam_questions: [21, 22, 23, 24],
    key_takeaways: [
      'Wektor własny $X$ z definicji **musi być niezerowy** ($X \\neq 0$)! Jeśli $X$ jest wektorem własnym dla $\\lambda$, to każda niezerowa wielokrotność $\\alpha X$ ($\\alpha \\neq 0$) także jest wektorem własnym dla tej samej wartości $\\lambda$.',
      'Równanie $AX = \\lambda X \\iff (A - \\lambda I_n)X = 0$ jest układem jednorodnym; ma ono niezerowe rozwiązania $X$ **wtedy i tylko wtedy**, gdy macierz $A - \\lambda I_n$ jest osobliwa, czyli $\\chi_A(\\lambda) = \\det(A - \\lambda I_n) = 0$.',
      'Procedura krok po kroku: (1) wyznacz wielomian charakterystyczny $\\chi_A(\\lambda)=\\det(A-\\lambda I)$, (2) znajdź jego pierwiastki $\\lambda_i$ (wartości własne), (3) dla każdego $\\lambda_i$ rozwiąż układ jednorodny $(A-\\lambda_i I)X=0$ (zawsze przynajmniej jedno równanie musi się wyzerować / powtórzyć — jeśli wyjdzie samo $X=0$, popełniłeś błąd w $\\lambda_i$!).',
      'Szybka kontrola poprawności wartości własnych: **suma wszystkich wartości własnych** (z krotnościami) równa się śladowi macierzy $\\operatorname{tr}(A) = \\sum a_{ii}$, a ich **iloczyn** równa się $\\det A$. Macierz rzeczywista może nie mieć rzeczywistych wartości własnych (np. obrót o $90^\\circ$ ma $\\lambda = \\pm j \\in \\mathbb{C}$).',
    ],
    sections: [
      {
        id: 'alg-6-1',
        heading: '6.1. Definicja, sens geometryczny i wielomian charakterystyczny $\\chi_A(\\lambda)$',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Definicja wartości i wektora własnego (Wykład 04, sl. 3–6)',
            text: 'Skalar $\\lambda \\in K$ nazywamy **wartością własną** macierzy kwadratowej $A \\in M_{n\\times n}(K)$, jeśli istnieje **niezerowy** wektor $X \\in M_{n\\times 1}(K)$ ($X \\neq 0$) taki, że:\n$$A \\cdot X = \\lambda \\cdot X$$\nWektor $X$ nazywamy wtedy **wektorem własnym** macierzy $A$ odpowiadającym wartości własnej $\\lambda$.\n\n**Wielomianem charakterystycznym** macierzy $A$ nazywamy wielomian stopnia $n$:\n$$\\chi_A(\\lambda) = \\det(A - \\lambda I_n)$$',
          },
          {
            type: 'callout',
            variant: 'proof',
            title: 'Skąd bierze się równanie $\\det(A - \\lambda I_n) = 0$? (Wykład 04, sl. 5)',
            text: 'Przekształcamy równanie definicyjne, wstawiając macierz jednostkową $I_n$ tak, aby móc wyciągnąć wektor $X$ przed nawias (nie wolno pisać $A - \\lambda$, bo od macierzy nie odejmujemy skalara!):\n$$AX = \\lambda X \\iff AX - \\lambda X = 0 \\iff AX - \\lambda I_n X = 0 \\iff (A - \\lambda I_n)\\cdot X = 0$$\nOtrzymaliśmy **kwadratowy układ jednorodny**. Gdyby $\\det(A - \\lambda I_n) \\neq 0$, układ byłby układem Cramera i miałby wyłącznie rozwiązanie zerowe $X = 0$ (które nie jest wektorem własnym). Zatem niezerowy wektor własny istnieje **wtedy i tylko wtedy**, gdy macierz $(A - \\lambda I_n)$ jest osobliwa:\n$$\\det(A - \\lambda I_n) = 0$$',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykład 6.1 (Wykład 04, sl. 4): Sprawdzanie wektora własnego',
            text: 'Dla $A = \\begin{bmatrix}0 & 1 \\\\ 2 & 1\\end{bmatrix}$ sprawdź wektory $X = \\begin{bmatrix}1\\\\2\\end{bmatrix}$ oraz $Y = \\begin{bmatrix}3\\\\1\\end{bmatrix}$:\n- $A\\cdot X = \\begin{bmatrix}0&1\\\\2&1\\end{bmatrix}\\begin{bmatrix}1\\\\2\\end{bmatrix} = \\begin{bmatrix}2\\\\4\\end{bmatrix} = 2\\begin{bmatrix}1\\\\2\\end{bmatrix} = 2X \\implies$ **$X$ jest wektorem własnym dla $\\lambda = 2$** (i każdy $\\alpha X$ dla $\\alpha\\neq 0$ również: $A(\\alpha X)=\\alpha(AX)=2(\\alpha X)$).\n- $A\\cdot Y = \\begin{bmatrix}0&1\\\\2&1\\end{bmatrix}\\begin{bmatrix}3\\\\1\\end{bmatrix} = \\begin{bmatrix}1\\\\7\\end{bmatrix} \\neq \\lambda\\begin{bmatrix}3\\\\1\\end{bmatrix}$ dla żadnego $\\lambda \\implies$ **$Y$ nie jest wektorem własnym** *(uwaga: na slajdzie 4 po prawej stronie nierówności przypadkiem przepisano $\\begin{bmatrix}1\\\\2\\end{bmatrix}$ zamiast $\\begin{bmatrix}3\\\\1\\end{bmatrix}$)* .',
          },
        ],
      },
      {
        id: 'alg-6-2',
        heading: '6.2. Wyznaczanie wartości i wektorów własnych — pełne przykłady $2\\times 2$ i $3\\times 3$',
        blocks: [
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykład 6.2 (Wykład 04, sl. 7–9): Pełne widmo macierzy $2\\times 2$',
            text: 'Wyznacz wartości i wektory własne macierzy $A = \\begin{bmatrix}0 & 1 \\\\ 2 & 1\\end{bmatrix}$.\n\n**Krok 1 — wielomian charakterystyczny:**\n$$\\chi_A(\\lambda) = \\det(A - \\lambda I) = \\begin{vmatrix}-\\lambda & 1 \\\\ 2 & 1-\\lambda\\end{vmatrix} = -\\lambda(1-\\lambda) - 2 = \\lambda^2 - \\lambda - 2 = (\\lambda - 2)(\\lambda + 1)$$\nWartości własne: **$\\lambda_1 = 2,\\; \\lambda_2 = -1$**.\n*(Szybka kontrola: $\\lambda_1 + \\lambda_2 = 2 - 1 = 1 = 0 + 1 = \\operatorname{tr} A$ ✓; $\\lambda_1 \\lambda_2 = -2 = 0\\cdot 1 - 1\\cdot 2 = \\det A$ ✓!)*\n\n**Krok 2 — wektory własne dla $\\lambda_1 = 2$:** rozwiązujemy $(A - 2I)X = 0$:\n$$\\begin{bmatrix}-2 & 1 \\\\ 2 & -1\\end{bmatrix}\\begin{bmatrix}x\\\\y\\end{bmatrix} = \\begin{bmatrix}0\\\\0\\end{bmatrix} \\implies \\begin{cases}-2x + y = 0 \\\\ 2x - y = 0\\end{cases} \\implies y = 2x$$\nStąd $X = \\begin{bmatrix}x\\\\2x\\end{bmatrix} = x\\begin{bmatrix}1\\\\2\\end{bmatrix}$ ($x\\neq 0$). Przykładowy bazowy wektor własny: **$X_1 = \\begin{bmatrix}1\\\\2\\end{bmatrix}$**.\n\n**Krok 3 — wektory własne dla $\\lambda_2 = -1$:** rozwiązujemy $(A - (-1)I)X = (A + I)X = 0$:\n$$\\begin{bmatrix}1 & 1 \\\\ 2 & 2\\end{bmatrix}\\begin{bmatrix}x\\\\y\\end{bmatrix} = \\begin{bmatrix}0\\\\0\\end{bmatrix} \\implies x + y = 0 \\implies y = -x$$\nStąd $X = x\\begin{bmatrix}1\\\\-1\\end{bmatrix}$ ($x\\neq 0$). Przykładowy wektor własny: **$X_2 = \\begin{bmatrix}1\\\\-1\\end{bmatrix}$**.',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykład 6.3 (Wykład 04, sl. 10–12): Macierz $3\\times 3$ z podwójną wartością własną',
            text: 'Wyznacz wartości i wektory własne macierzy $A = \\begin{bmatrix}-1 & -3 & 0 \\\\ 2 & 4 & 0 \\\\ -1 & -1 & 2\\end{bmatrix}$.\n\n**Krok 1 — wielomian charakterystyczny (Laplace wg 3. kolumny!):**\n$$\\chi_A(\\lambda) = \\begin{vmatrix}-1-\\lambda & -3 & 0 \\\\ 2 & 4-\\lambda & 0 \\\\ -1 & -1 & 2-\\lambda\\end{vmatrix} = (2-\\lambda)\\begin{vmatrix}-1-\\lambda & -3 \\\\ 2 & 4-\\lambda\\end{vmatrix}$$\n$$= (2-\\lambda)\\bigl[(-1-\\lambda)(4-\\lambda)+6\\bigr] = (2-\\lambda)(\\lambda^2 - 3\\lambda + 2) = (2-\\lambda)^2(1-\\lambda)$$\nWartości własne: **$\\lambda_1 = 1$** (pojedyncza) oraz **$\\lambda_{2,3} = 2$** (podwójna).\n*(Kontrola: $1+2+2 = 5 = -1+4+2 = \\operatorname{tr} A$ ✓; $1\\cdot 2\\cdot 2 = 4 = 2(-4+6) = \\det A$ ✓!)*\n\n**Krok 2 — wektor własny dla $\\lambda_1 = 1$** ($(A-I)X=0$):\n$$\\begin{bmatrix}-2&-3&0\\\\2&3&0\\\\-1&-1&1\\end{bmatrix}\\begin{bmatrix}x\\\\y\\\\z\\end{bmatrix}=0 \\implies \\begin{cases}-2x-3y=0 \\implies x=-\\frac{3}{2}y \\\\ -x-y+z=0 \\implies z = x+y = -\\frac{1}{2}y\\end{cases}$$\nDla $y = -2$ unikamy ułamków i dostajemy bazowy wektor **$X_1 = \\begin{bmatrix}3\\\\-2\\\\1\\end{bmatrix}$**.\n\n**Krok 3 — wektory własne dla podwójnej $\\lambda_{2,3} = 2$** ($(A-2I)X=0$):\n$$\\begin{bmatrix}-3&-3&0\\\\2&2&0\\\\-1&-1&0\\end{bmatrix}\\begin{bmatrix}x\\\\y\\\\z\\end{bmatrix}=0 \\implies x = -y,\\quad z \\in \\mathbb{R} \\text{ (zmienna wolna!)}$$\nMamy więc **dwa niezależne parametry** $y$ oraz $z$:\n$$X = \\begin{bmatrix}-y \\\\ y \\\\ z\\end{bmatrix} = y\\begin{bmatrix}-1\\\\1\\\\0\\end{bmatrix} + z\\begin{bmatrix}0\\\\0\\\\1\\end{bmatrix} \\implies X_2 = \\begin{bmatrix}-1\\\\1\\\\0\\end{bmatrix},\\quad X_3 = \\begin{bmatrix}0\\\\0\\\\1\\end{bmatrix}$$\nKrotność geometryczna (wymiar przestrzeni własnej = 2) jest tu równa krotności algebraicznej (2), więc macierz $A$ ma pełną bazę 3 liniowo niezależnych wektorów własnych!',
          },
          {
            type: 'callout',
            variant: 'warning',
            title: 'Macierz bez rzeczywistych wartości własnych — obrót o $90^\\circ$ (Wykład 04, sl. 13)',
            text: 'Rozważmy macierz obrotu o $+90^\\circ$ na płaszczyźnie: $A = \\begin{bmatrix}0 & -1 \\\\ 1 & 0\\end{bmatrix} \\in M_{2\\times 2}(\\mathbb{R})$.\n$$\\chi_A(\\lambda) = \\begin{vmatrix}-\\lambda & -1 \\\\ 1 & -\\lambda\\end{vmatrix} = \\lambda^2 + 1 = 0 \\implies \\lambda^2 = -1$$\nNad ciałem $\\mathbb{R}$ równanie nie ma pierwiastków, więc **$A$ nie ma rzeczywistych wartości własnych** — i geometrycznie to oczywiste, bo obrót o $90^\\circ$ zmienia kierunek *każdego* niezerowego wektora na płaszczyźnie! Dopiero nad ciałem liczb zespolonych $\\mathbb{C}$ (z Rozdziału 1!) pojawiają się sprzężone wartości własne **$\\lambda_1 = j,\\; \\lambda_2 = -j$** z zespolonymi wektorami własnymi $\\begin{bmatrix}1\\\\-j\\end{bmatrix}$ i $\\begin{bmatrix}1\\\\j\\end{bmatrix}$.',
          },
          {
            type: 'svg',
            diagramId: 'alg-eigen-transform',
            title: 'Interaktywna wizualizacja przekształcenia $X \\mapsto A\\cdot X$ i kierunków własnych',
            caption: 'Przesuwaj kąt wektora wejściowego $X$ na okręgu jednostkowym: zauważ, że tylko wzdłuż linii wektorów własnych obraz $AX$ leży na tej samej prostej co $X$! Przełącz na macierz obrotu $90^\\circ$, aby zobaczyć brak kierunków własnych w $\\mathbb{R}^2$.',
          },
        ],
      },
    ],
  },
];
