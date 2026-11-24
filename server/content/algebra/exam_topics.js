// Algebra liniowa dla ICT — 24 zagadnienia egzaminacyjne (Wykłady 01–04, PUT)

export const ALGEBRA_EXAM_TOPICS = [
  {
    id: 'alg-q01',
    subject_id: 'algebra',
    number: 1,
    chapter_id: 'algebra-ch1',
    category: 'Liczby zespolone',
    question: 'Definicja liczb zespolonych jako par uporządkowanych, jednostka urojona $j$ i własności ciała $\\mathbb{C}$',
    short_answer:
      'Liczba zespolona to uporządkowana para $(x,y)\\in\\mathbb{R}^2$ z dodawaniem po współrzędnych i mnożeniem $(x_1,y_1)(x_2,y_2)=(x_1x_2-y_1y_2,\\,x_1y_2+x_2y_1)$. Jednostka urojona $j=(0,1)$ spełnia $j^2=-1$, skąd postać kanoniczna $z=x+jy$.',
    full_answer:
      'Zbiór liczb zespolonych $\\mathbb{C}$ konstruujemy formalnie jako zbiór par uporządkowanych $(x,y)$ liczb rzeczywistych z równością po współrzędnych oraz dwoma działaniami:\n$$(x_1,y_1)+(x_2,y_2)=(x_1+x_2,\\;y_1+y_2), \\qquad (x_1,y_1)\\cdot(x_2,y_2)=(x_1x_2-y_1y_2,\\;x_1y_2+x_2y_1)$$\nPary postaci $(x,0)$ zachowują się izomorficznie z liczbami rzeczywistymi $\\mathbb{R}$, a para $j=(0,1)$ (w konwencji inżynierskiej ICT zamiast $i$) spełnia $j^2 = (0,1)(0,1) = (-1,0) = -1$. Każdą parę zapisujemy jednoznacznie w **postaci algebraicznej (kanonicznej)** $z = x + jy$, gdzie $\\operatorname{Re} z = x \\in \\mathbb{R}$ i $\\operatorname{Im} z = y \\in \\mathbb{R}$. Zbiór $\\mathbb{C}$ tworzy ciało: dodawanie i mnożenie są łączne i przemienne, mnożenie jest rozdzielne względem dodawania, zero to $(0,0)$, jedynka to $(1,0)$, element przeciwny to $-z=(-x,-y)$, a dla każdego $z\\neq 0$ istnieje odwrotność $z^{-1}$. Potęgi jednostki urojonej powtarzają się co 4: $j^0=1,\\; j^1=j,\\; j^2=-1,\\; j^3=-j,\\; j^4=1$.',
    key_points: [
      'Wzór na mnożenie par $(x_1x_2-y_1y_2,\\;x_1y_2+x_2y_1)$ oraz $j=(0,1) \\implies j^2=-1$.',
      'Elementy neutralne $(0,0)$ i $(1,0)$ oraz istnienie $-z$ i $z^{-1}$ ($z\\neq 0$).',
      'Cykliczność potęg $j^n = j^{n \\bmod 4}$ ($1, j, -1, -j$).',
      '$\\operatorname{Im}(x+jy) = y$ jest liczbą **rzeczywistą** (bez litery $j$).',
    ],
    common_mistakes:
      'Pisanie $\\operatorname{Im}(5-8j) = -8j$ zamiast $-8$; zapominanie o zmianie znaku przy $j^2=-1$ podczas mnożenia.',
    lab_connection:
      'W telekomunikacji i elektronice $j$ zastępuje $i$ (zarezerwowane dla natężenia prądu) i stanowi bazę zapisu impedancji $Z = R + jX$ oraz sygnałów analitycznych.',
    svg_diagram_id: 'alg-complex-plane',
  },
  {
    id: 'alg-q02',
    subject_id: 'algebra',
    number: 2,
    chapter_id: 'algebra-ch1',
    category: 'Liczby zespolone',
    question: 'Dzielenie i odwrotność liczby zespolonej w postaci algebraicznej (kanonicznej)',
    short_answer:
      'Aby podzielić $z_1$ przez $z_2\\neq 0$, mnożymy licznik i mianownik przez sprzężenie mianownika $\\bar{z}_2$: $\\frac{z_1}{z_2}=\\frac{z_1\\bar{z}_2}{|z_2|^2}$, a $z^{-1}=\\frac{x-jy}{x^2+y^2}$.',
    full_answer:
      'W postaci kanonicznej $z_1 = x_1+jy_1$, $z_2 = x_2+jy_2 \\neq 0$ usuwamy jednostkę urojoną z mianownika, mnożąc licznik i mianownik przez liczbę sprzężoną $\\bar{z}_2 = x_2 - jy_2$. Ponieważ $(x_2+jy_2)(x_2-jy_2) = x_2^2 - j^2 y_2^2 = x_2^2 + y_2^2 > 0$, dostajemy:\n$$\\frac{z_1}{z_2} = \\frac{(x_1+jy_1)(x_2-jy_2)}{x_2^2+y_2^2} = \\frac{x_1x_2 + y_1y_2}{x_2^2+y_2^2} + j\\frac{x_2y_1 - x_1y_2}{x_2^2+y_2^2}$$\nW szczególności odwrotność $z^{-1} = \\frac{1}{x+jy} = \\frac{x}{x^2+y^2} - j\\frac{y}{x^2+y^2}$. Przykład z wykładu: $\\frac{1+2j}{5-6j} = \\frac{(1+2j)(5+6j)}{25+36} = \\frac{5+16j-12}{61} = -\\frac{7}{61} + \\frac{16}{61}j$ oraz $(1+2j)^{-1} = \\frac{1-2j}{5}$.',
    key_points: [
      'Rozszerzenie ułamka przez $\\bar{z}_2 = x_2 - jy_2$.',
      'Mianownik upraszcza się do sumy kwadratów $x_2^2 + y_2^2 = |z_2|^2$ (znak PLUS, nie minus!).',
      'Rozbicie końcowego wyniku na jawną część rzeczywistą i urojoną $a + bj$.',
    ],
    common_mistakes:
      'Wpisywanie w mianowniku $x_2^2 - y_2^2$ zamiast $x_2^2 + y_2^2$ (zapomnienie, że $-j^2 = +1$). Uwaga też na literówkę na slajdzie 12 W01 przy odejmowaniu: $(1+2j)-(5-6j) = -4+8j$, nie $-6+8j$.',
    lab_connection:
      'Podstawowa operacja przy wyznaczaniu admitancji $Y = Z^{-1}$ i transmitancji widmowej $H(j\\omega)$ filtrów.',
  },
  {
    id: 'alg-q03',
    subject_id: 'algebra',
    number: 3,
    chapter_id: 'algebra-ch1',
    category: 'Liczby zespolone',
    question: 'Sprzężenie zespolone $\\bar{z}$ — definicja, sens geometryczny, własności i równania z $\\bar{z}$',
    short_answer:
      '$\\bar{z}=x-jy$ to odbicie punktu $z$ względem osi rzeczywistej. Sprzężenie zachowuje sumę, różnicę, iloczyn i iloraz, a równania typu $z+2\\bar{z}=6+5j$ rozwiązujemy podstawiając $z=x+jy$ i przyrównując $\\operatorname{Re}$ oraz $\\operatorname{Im}$.',
    full_answer:
      'Dla $z=x+jy$ liczbą sprzężoną nazywamy $\\bar{z}=x-jy$. Geometrycznie na płaszczyźnie Gaussa jest to symetria osiowa względem osi rzeczywistej $\\operatorname{Re} z$ (liczby rzeczywiste spełniają $\\bar{z}=z$, a czysto urojone $\\bar{z}=-z$). Najważniejsze własności:\n$$\\overline{\\bar{z}}=z, \\quad \\overline{z_1 \\pm z_2}=\\bar{z}_1\\pm\\bar{z}_2, \\quad \\overline{z_1 z_2}=\\bar{z}_1\\bar{z}_2, \\quad \\overline{\\left(\\frac{z_1}{z_2}\\right)}=\\frac{\\bar{z}_1}{\\bar{z}_2}, \\quad z\\bar{z}=|z|^2$$\nPonadto $z+\\bar{z}=2\\operatorname{Re}z$ oraz $z-\\bar{z}=2j\\operatorname{Im}z$. Gdy w równaniu występują jednocześnie $z$ i $\\bar{z}$ (np. $z+2\\bar{z}=6+5j$ z Wykładu 01), nie da się wyłączyć $z$ algebraicznie — należy podstawić $z=x+jy$, uporządkować do $3x-jy=6+5j$ i rozwiązać układ dla $\\operatorname{Re}$ ($3x=6\\Rightarrow x=2$) i $\\operatorname{Im}$ ($-y=5\\Rightarrow y=-5$), otrzymując $z=2-5j$.',
    key_points: [
      'Definicja $\\bar{z}=x-jy$ i interpretacja jako odbicie względem osi $\\operatorname{Re} z$.',
      'Komplet własności: inwolucja ($\\overline{\\bar{z}}=z$) oraz zgodność z $+, -, \\cdot, /$.',
      'Tożsamość $z\\bar{z}=|z|^2 = x^2+y^2$.',
      'Metoda rozwiązywania równań mieszanych ($z$ i $\\bar{z}$) przez podstawienie $z=x+jy$.',
    ],
    common_mistakes:
      'Zmienianie znaku przy części rzeczywistej (to daje $-\\bar{z}$, a nie $\\bar{z}$!) albo zapominanie, że $x,y$ w podstawieniu muszą być rzeczywiste.',
    lab_connection:
      'W analizie Fouriera sygnałów rzeczywistych widmo spełnia symetrię sprzężoną $X(-f) = \\overline{X(f)}$.',
    svg_diagram_id: 'alg-complex-plane',
  },
  {
    id: 'alg-q04',
    subject_id: 'algebra',
    number: 4,
    chapter_id: 'algebra-ch1',
    category: 'Liczby zespolone',
    question: 'Moduł liczby zespolonej $|z|$ — definicja, własności i zbiory na płaszczyźnie zespolonej',
    short_answer:
      '$|z|=\\sqrt{x^2+y^2}\\ge 0$ oznacza odległość $z$ od $0$, a $|z_1-z_2|$ odległość między $z_1$ i $z_2$. Zachodzi $|z|^2=z\\bar{z}$, $|z_1z_2|=|z_1||z_2|$ oraz $|z-z_0|=R$ opisuje okrąg o środku $z_0$ i promieniu $R$.',
    full_answer:
      'Moduł liczby $z=x+jy$ definiujemy jako długość jej wektora wodzącego: $|z|=\\sqrt{x^2+y^2}\\in [0,\\infty)$. Kluczowe własności:\n1. $|z|=0 \\iff z=0$,\n2. $|\\bar{z}|=|z|$ oraz $|z|^2=z\\bar{z}$,\n3. $|z_1\\cdot z_2|=|z_1|\\cdot|z_2|$ oraz $|z_1/z_2|=|z_1|/|z_2|$ ($z_2\\neq 0$), skąd $|z^n|=|z|^n$.\nGeometrycznie $|z_1-z_2|=\\sqrt{(x_1-x_2)^2+(y_1-y_2)^2}$ jest odległością euklidesową między punktami $z_1$ i $z_2$. Przykłady zbiorów z Wykładu 01 (sl. 20):\n- $|z|\\le 2$: koło domknięte o środku $(0,0)$ i promieniu $2$,\n- $|z+2j|=2 \\iff |z-(-2j)|=2$: okrąg o środku $z_0=-2j$ i promieniu $2$,\n- $r < |z-z_0| < R$: pierścień otwarty o środku $z_0$.',
    key_points: [
      'Wzór $|z|=\\sqrt{x^2+y^2}$ (pod pierwiastkiem **bez $j$**!).',
      'Własności $|z|^2=z\\bar{z}$, $|z_1z_2|=|z_1||z_2|$ i $|z_1/z_2|=|z_1|/|z_2|$.',
      'Zawsze sprowadzaj wyrażenie do postaci $|z - z_0|$, aby bezbłędnie odczytać środek okręgu $z_0$.',
    ],
    common_mistakes:
      'Odczytywanie środka okręgu $|z+2j|=2$ jako $+2j$ zamiast $-2j$; wstawianie $j^2=-1$ pod pierwiastek modułu (błąd: $\\sqrt{x^2+(jy)^2}=\\sqrt{x^2-y^2}$).',
    lab_connection:
      'Moduł widma $|H(j\\omega)|$ to charakterystyka amplitudowa układu transmisji.',
    svg_diagram_id: 'alg-complex-plane',
  },
  {
    id: 'alg-q05',
    subject_id: 'algebra',
    number: 5,
    chapter_id: 'algebra-ch2',
    category: 'Liczby zespolone',
    question: 'Argument liczby zespolonej ($\\operatorname{Arg} z$, $\\arg z$) i wyznaczanie obszarów kątowych',
    short_answer:
      'Argument $\\varphi$ to kąt skierowany wektora $z\\neq 0$ z dodatnią półosią $\\operatorname{Re}z$, wyznaczany z $\\cos\\varphi=x/|z|,\\,\\sin\\varphi=y/|z|$. Argument główny leży w $(-\\pi,\\pi]$, a $\\arg(z-z_0)\\in[\\alpha,\\beta)$ to klin kątowy o wierzchołku $z_0$.',
    full_answer:
      'Dla $z=x+jy\\neq 0$ zbiór wszystkich argumentów oznaczamy $\\operatorname{Arg} z = \\{\\varphi + 2k\\pi : k\\in\\mathbb{Z}\\}$, a **argument główny** (wg konwencji Wykładu 01, sl. 21) należy do przedziału $\\arg z \\in (-\\pi, \\pi]$. Kąt ten wyznaczamy z układu:\n$$\\cos\\varphi = \\frac{\\operatorname{Re} z}{|z|}, \\qquad \\sin\\varphi = \\frac{\\operatorname{Im} z}{|z|}$$\nPrzykłady: $\\arg(5)=0$, $\\arg(j\\pi)=\\frac{\\pi}{2}$, $\\arg(1+j)=\\frac{\\pi}{4}$, $\\arg(-1)=\\pi$, $\\arg(-j)=-\\frac{\\pi}{2}$. Dla $z=0$ argument jest nieokreślony. Warunek $\\arg z \\in [-\\pi/4, \\pi/3)$ wyznacza obszar kątowy (klin) o wierzchołku w $(0,0)$ bez samego początku układu; przesunięcie $\\arg(z - z_0) \\in [-\\pi/4, \\pi/3)$ (np. $\\arg(z-1+j)$ ma $z_0 = 1-j$) przenosi ten sam klin tak, by jego wierzchołek leżał w punkcie $z_0$.',
    key_points: [
      'Rozróżnienie $\\operatorname{Arg} z$ (zbiór co $2\\pi$) i $\\arg z \\in (-\\pi, \\pi]$.',
      'Wyznaczanie kąta z pary $(\\cos\\varphi, \\sin\\varphi)$ z kontrolą ćwiartki, a nie ślepo z $\\operatorname{arctg}(y/x)$.',
      'Przesunięcie wierzchołka klina: $\\arg(z - 1 + j) = \\arg(z - (1-j)) \\implies z_0 = 1 - j$.',
      'Punkt wierzchołkowy $z = z_0$ nigdy nie należy do zbioru, bo $\\arg 0$ nie istnieje.',
    ],
    common_mistakes:
      'Zastosowanie $\\operatorname{arctg}(y/x)$ w II lub III ćwiartce bez korekty o $\\pm\\pi$; pomyłka znaku przy odczycie $z_0$ z $z-1+j$.',
    lab_connection:
      'Argument widma $\\arg H(j\\omega)$ to charakterystyka fazowa kanału lub filtru.',
  },
  {
    id: 'alg-q06',
    subject_id: 'algebra',
    number: 6,
    chapter_id: 'algebra-ch2',
    category: 'Liczby zespolone',
    question: 'Postać trygonometryczna i postać wykładnicza (wzór Eulera) liczby zespolonej',
    short_answer:
      'Każdą liczbę $z\\neq 0$ zapisujemy trygonometrycznie jako $z=r(\\cos\\varphi+j\\sin\\varphi)$ oraz wykładniczo (ze wzoru Eulera $e^{j\\varphi}=\\cos\\varphi+j\\sin\\varphi$) jako $z=re^{j\\varphi}$, gdzie $r=|z|$ i $\\varphi\\in\\operatorname{Arg} z$.',
    full_answer:
      'Ponieważ $x = |z|\\cos\\varphi$ i $y = |z|\\sin\\varphi$, dla $z\\neq 0$ mamy **postać trygonometryczną** $z = r(\\cos\\varphi + j\\sin\\varphi)$. Nie jest ona jednoznaczna — dwie liczby w tej postaci są równe wtedy i tylko wtedy, gdy $r_1=r_2$ oraz $\\varphi_1 = \\varphi_2 + 2k\\pi$ ($k\\in\\mathbb{Z}$). Korzystając ze **wzoru Eulera** $e^{j\\varphi} = \\cos\\varphi + j\\sin\\varphi$, zapisujemy liczbę jeszcze zwięźlej w **postaci wykładniczej**: $z = r e^{j\\varphi}$. Przykłady z Wykładu 01 (sl. 25, 27): $7 = 7e^{0j}$, $-3 = 3e^{j\\pi}$, $2j = 2e^{j\\frac{\\pi}{2}}$, $1-j = \\sqrt{2}e^{-j\\frac{\\pi}{4}}$. Postać wykładnicza sprowadza mnożenie, dzielenie i potęgowanie liczb zespolonych do szkolnych praw działań na potęgach.',
    key_points: [
      'Związek $r = |z| > 0$, $x = r\\cos\\varphi$, $y = r\\sin\\varphi$.',
      'Wzór Eulera $e^{j\\varphi} = \\cos\\varphi + j\\sin\\varphi$ oraz warunek równości (moduły równe, kąty mod $2\\pi$).',
      'Szybka zamiana osi głównych: $1=e^{j0}$, $j=e^{j\\pi/2}$, $-1=e^{j\\pi}$, $-j=e^{-j\\pi/2}$.',
    ],
    common_mistakes:
      'Zapisywanie ujemnego modułu $r < 0$ (np. $-3 = -3(\\cos 0 + j\\sin 0)$ zamiast $3(\\cos\\pi + j\\sin\\pi)$) lub pomylenie znaku w $e^{j\\varphi}$ (musi być $+$ przed $j\\sin\\varphi$!).',
    lab_connection:
      'Podstawa analizy fazorów, DFT/FFT oraz modulacji cyfrowych (QAM, PSK) w sieciach bezprzewodowych.',
  },
  {
    id: 'alg-q07',
    subject_id: 'algebra',
    number: 7,
    chapter_id: 'algebra-ch2',
    category: 'Liczby zespolone',
    question: 'Mnożenie, dzielenie i potęgowanie w postaci trygonometrycznej/wykładniczej — wzór de Moivre’a',
    short_answer:
      'Przy mnożeniu moduły mnożymy, a argumenty dodajemy; przy dzieleniu moduły dzielimy, a argumenty odejmujemy. Wzór de Moivre’a: $z^n = |z|^n(\\cos n\\varphi + j\\sin n\\varphi) = r^n e^{jn\\varphi}$.',
    full_answer:
      'Wymnażając $z_1z_2 = r_1(\\cos\\varphi_1+j\\sin\\varphi_1)\\cdot r_2(\\cos\\varphi_2+j\\sin\\varphi_2)$ i stosując wzory na $\\cos(\\varphi_1+\\varphi_2)$ oraz $\\sin(\\varphi_1+\\varphi_2)$, otrzymujemy:\n$$z_1 z_2 = r_1 r_2\\bigl(\\cos(\\varphi_1+\\varphi_2) + j\\sin(\\varphi_1+\\varphi_2)\\bigr), \\qquad \\frac{z_1}{z_2} = \\frac{r_1}{r_2}\\bigl(\\cos(\\varphi_1-\\varphi_2) + j\\sin(\\varphi_1-\\varphi_2)\\bigr)$$\nStąd przez indukcję (i dla $n<0$ przez odwrotność) wynika **wzór de Moivre’a**:\n$$z^n = |z|^n\\bigl(\\cos(n\\varphi) + j\\sin(n\\varphi)\\bigr) = r^n e^{jn\\varphi}, \\qquad \\bar{z} = r\\bigl(\\cos(-\\varphi) + j\\sin(-\\varphi)\\bigr) = re^{-j\\varphi}$$\nGeometrycznie mnożenie przez $re^{j\\varphi}$ oznacza jednokładność (skalowanie) o skali $r$ złożoną z obrotem o kąt $\\varphi$ przeciwnie do ruchu wskazówek zegara. Wzór de Moivre’a pozwala obliczać wysokie potęgi (np. $(1-j)^{12} = (\\sqrt{2})^{12}e^{-j3\\pi} = -64$) w dwóch linijkach.',
    key_points: [
      'Wyprowadzenie reguły mnożenia ze wzorów na $\\cos(\\alpha+\\beta)$ i $\\sin(\\alpha+\\beta)$.',
      'Mnożenie: moduły $\\times$, kąty $+$; dzielenie: moduły $/$, kąty $-$; sprzężenie: zmiana znaku kąta.',
      'Wzór de Moivre’a $z^n = r^n(\\cos n\\varphi + j\\sin n\\varphi)$ i sens geometryczny jako obrót + skalowanie.',
    ],
    common_mistakes:
      'Mnożenie kątów zamiast dodawania ($\\varphi_1\\cdot\\varphi_2$ zamiast $\\varphi_1+\\varphi_2$) lub zapominanie o podniesieniu modułu $r$ do potęgi $n$.',
    lab_connection:
      'Używane do wyprowadzania tożsamości trygonometrycznych (np. $\\cos 3\\varphi, \\sin 3\\varphi$) oraz obliczania potęg macierzy w postaci diagonalnej zespolonej.',
  },
  {
    id: 'alg-q08',
    subject_id: 'algebra',
    number: 8,
    chapter_id: 'algebra-ch2',
    category: 'Liczby zespolone',
    question: 'Pierwiastki stopnia $n$ z liczby zespolonej — twierdzenie, wzór i interpretacja geometryczna',
    short_answer:
      'Dla $z=re^{j\\varphi}\\neq 0$ istnieje dokładnie $n$ pierwiastków $t_k = \\sqrt[n]{r}\\left(\\cos\\frac{\\varphi+2k\\pi}{n}+j\\sin\\frac{\\varphi+2k\\pi}{n}\\right)$ ($k=0,\\dots,n-1$), tworzących $n$-kąt foremny wpisany w okrąg $|z|=\\sqrt[n]{r}$.',
    full_answer:
      'Równanie $t^n = z$ (dla $z = re^{j\\varphi} \\neq 0$, $n\\in\\mathbb{N}_+$) ma w $\\mathbb{C}$ **dokładnie $n$ różnych rozwiązań**:\n$$t_k = \\sqrt[n]{r}\\left(\\cos\\frac{\\varphi + 2k\\pi}{n} + j\\sin\\frac{\\varphi + 2k\\pi}{n}\\right) = \\sqrt[n]{r}\\,e^{j\\frac{\\varphi+2k\\pi}{n}}, \\qquad k = 0, 1, \\dots, n-1$$\nKąt początkowy to $\\psi_0 = \\frac{\\varphi}{n}$, a kolejne pierwiastki powstają przez obrót o stały kąt $\\Delta\\psi = \\frac{2\\pi}{n}$. Pierwiastek o najmniejszym nieujemnym argumencie to **pierwiastek główny**. Geometrycznie pierwiastki leżą w wierzchołkach **wielokąta foremnego o $n$ bokach** wpisanego w okrąg o środku $(0,0)$ i promieniu $\\sqrt[n]{r}$. Przykłady z Wykładu 01 (sl. 29–30): $\\sqrt[3]{8j}$ ma moduł $2$ i kąty $\\frac{\\pi}{6}, \\frac{5\\pi}{6}, \\frac{3\\pi}{2}$, czyli $\\{\\sqrt{3}+j,\\; -\\sqrt{3}+j,\\; -2j\\}$; $\\sqrt[4]{1} = \\{1, j, -1, -j\\}$.',
    key_points: [
      'Dokładnie $n$ pierwiastków dla $k = 0, 1, \\dots, n-1$ (dla $k=n$ kąty się powtarzają).',
      'Moduł wszystkich pierwiastków jest jednakowy i równy $\\sqrt[n]{|z|}$, a różnica sąsiednich kątów to $\\frac{2\\pi}{n}$.',
      'Geometria: wierzchołki $n$-kąta foremnego (np. trójkąt równoboczny dla $\\sqrt[3]{8j}$).',
      'Uwaga: $\\sqrt[n]{z}$ w $\\mathbb{C}$ jest **zbiorem $n$ liczb**, a nie jedną liczbą!',
    ],
    common_mistakes:
      'Podanie tylko jednego pierwiastka ($k=0$), zapomnienie o podzieleniu $2k\\pi$ przez $n$, lub obliczenie $\\sqrt[n]{r}$ źle przy $r \\neq 1$.',
    lab_connection:
      'Pierwiastki $n$-tego stopnia z jedynki $W_N^k = e^{-j\\frac{2\\pi k}{N}}$ to jądra (twiddle factors) dyskretnej i szybkiej transformaty Fouriera (DFT / FFT).',
    svg_diagram_id: 'alg-complex-roots',
  },
  {
    id: 'alg-q09',
    subject_id: 'algebra',
    number: 9,
    chapter_id: 'algebra-ch3',
    category: 'Macierze',
    question: 'Definicja macierzy, macierze specjalne (trójkątne, diagonalna, jednostkowa) oraz działania liniowe',
    short_answer:
      'Macierz $A=[a_{ij}]_{m\\times n}$ ma $m$ wierszy i $n$ kolumn. Macierze kwadratowe dzielimy m.in. na górno-/dolnotrójkątne, diagonalne $\\operatorname{diag}(d_1,\\dots,d_n)$ i jednostkową $I_n$. Dodajemy tylko macierze tego samego wymiaru; skalar $\\alpha$ mnoży każdy element.',
    full_answer:
      'Macierz $A = [a_{ij}]_{m\\times n} \\in M_{m\\times n}(K)$ to prostokątna tablica $m$ wierszy i $n$ kolumn elementów z ciała $K$ ($\\mathbb{R}$ lub $\\mathbb{C}$). Dla macierzy kwadratowej ($m=n$) ciąg $a_{11}, \\dots, a_{nn}$ tworzy **główną przekątną (diagonalę)**.\nMacierze specjalne (Wykład 02, sl. 4–7):\n- **zerowa** $0_{m\\times n}$: wszystkie elementy $=0$,\n- **trójkątna górna**: $a_{ij}=0$ dla $i>j$ (zera *poniżej* diagonali),\n- **trójkątna dolna**: $a_{ij}=0$ dla $i<j$ (zera *powyżej* diagonali),\n- **diagonalna** $\\operatorname{diag}(a_{11},\\dots,a_{nn})$: zera poza główną przekątną,\n- **jednostkowa** $I_n$: jedynki na przekątnej, zera poza nią.\nDodawanie $[a_{ij}]+[b_{ij}]=[a_{ij}+b_{ij}]$ jest określone wyłącznie dla macierzy identycznego wymiaru $m\\times n$ (jest przemienne i łączne), a mnożenie przez skalar $\\alpha\\cdot[a_{ij}]=[\\alpha a_{ij}]$ mnoży **każdy** wyraz macierzy przez $\\alpha$.',
    key_points: [
      'Pierwszy indeks $i$ = wiersz, drugi $j$ = kolumna; wymiar $m\\times n$ = wiersze $\\times$ kolumny.',
      'Rozróżnienie trójkątnej górnej (niezerowa nad przekątną) i dolnej (niezerowa pod przekątną).',
      'Mnożenie macierzy przez skalar mnoży wszystkie $m\\cdot n$ wyrazów (odwrotnie niż przy wyłączaniu z wyznacznika!).',
    ],
    common_mistakes:
      'Mylenie kolejności wiersze/kolumny przy zapisie wymiaru lub mylenie macierzy trójkątnej górnej z dolną.',
    lab_connection:
      'Macierze diagonalne i trójkątne to kluczowe struktury przy rozkładach LU, diagonalizacji i szybkim rozwiązywaniu układów liniowych.',
  },
  {
    id: 'alg-q10',
    subject_id: 'algebra',
    number: 10,
    chapter_id: 'algebra-ch3',
    category: 'Macierze',
    question: 'Mnożenie macierzy — warunek wykonalności, wzór, nieprzemienność i dzielniki zera',
    short_answer:
      'Iloczyn $A_{m\\times p}\\cdot B_{p\\times n}=C_{m\\times n}$ ma elementy $c_{ij}=\\sum_{k=1}^p a_{ik}b_{kj}$ i wymaga zgodności wymiarów wewnętrznych ($p$). Mnożenie jest łączne i rozdzielne, ale **nieprzemienne** ($AB\\neq BA$) i posiada niezerowe dzielniki zera ($AB=0$ przy $A,B\\neq 0$).',
    full_answer:
      'Aby wykonać mnożenie $A \\cdot B$, liczba kolumn macierzy $A$ musi równać się liczbie wierszy macierzy $B$: $A_{m\\times p} \\cdot B_{p\\times n} = C_{m\\times n}$, przy czym element w $i$-tym wierszu i $j$-tej kolumnie wynosi $c_{ij} = \\sum_{k=1}^p a_{ik} b_{kj}$ (iloczyn skalarny $i$-tego wiersza $A$ i $j$-tej kolumny $B$). Mnożenie spełnia łączność $A(BC)=(AB)C$, rozdzielność $A(B+C)=AB+AC$, $(A+B)C=AC+BC$ oraz $AI_n = I_mA = A$.\n\nDwie zasadnicze różnice względem liczb rzeczywistych (Wykład 02, sl. 11, 13):\n1. **Brak przemienności:** $AB \\neq BA$ (często iloczyn $BA$ w ogóle nie istnieje albo ma inny wymiar, np. $A_{2\\times 3}B_{3\\times 2}$ to $2\\times 2$, a $BA$ to $3\\times 3$!).\n2. **Istnienie dzielników zera:** $\\begin{bmatrix}0&1\\\\0&0\\end{bmatrix}\\begin{bmatrix}0&1\\\\0&0\\end{bmatrix} = \\begin{bmatrix}0&0\\\\0&0\\end{bmatrix}$, więc z $AB=0$ NIE wynika $A=0$ ani $B=0$.',
    key_points: [
      'Zgodność wymiarów: $(m\\times p)\\cdot(p\\times n) \\to (m\\times n)$.',
      'Wzór $c_{ij} = \\sum_{k=1}^p a_{ik}b_{kj}$ („wiersz razy kolumna”).',
      'Kontrprzykład na nieprzemienność ($AB\\neq BA$) oraz na dzielniki zera ($AB=0$ dla $A,B\\neq 0$).',
      'Brak prawa skracania dla osobliwych macierzy oraz konsekwencja dla wzorów skróconego mnożenia: $(A+B)^2 = A^2 + AB + BA + B^2 \\neq A^2 + 2AB + B^2$.',
    ],
    common_mistakes:
      'Mnożenie macierzy „element po elemencie” jak przy dodawaniu; stosowanie wzoru $(A+B)^2 = A^2+2AB+B^2$ bez sprawdzenia czy $AB=BA$.',
    lab_connection:
      'Złożenie przekształceń liniowych w grafice, robotyce i filtracji MIMO odpowiada mnożeniu macierzy (kolejność ma znaczenie!).',
    svg_diagram_id: 'alg-matrix-mult',
  },
  {
    id: 'alg-q11',
    subject_id: 'algebra',
    number: 11,
    chapter_id: 'algebra-ch3',
    category: 'Macierze',
    question: 'Transpozycja macierzy $A^T$ i macierz odwrotna $A^{-1}$ — definicje i reguły odwracania kolejności',
    short_answer:
      'Transpozycja zamienia wiersze z kolumnami ($b_{ij}=a_{ji}$); macierz odwrotna do kwadratowej $A$ spełnia $AA^{-1}=A^{-1}A=I_n$ i jest jedyna. Obie operacje odwracają kolejność iloczynu: $(AB)^T = B^T A^T$ oraz $(AB)^{-1} = B^{-1}A^{-1}$.',
    full_answer:
      '**Macierz transponowana** $A^T \\in M_{n\\times m}$ ma elementy $(A^T)_{ij} = a_{ji}$. Spełnia: $(A+B)^T = A^T+B^T$, $(A^T)^T = A$, $(\\alpha A)^T = \\alpha A^T$, $(A^n)^T = (A^T)^n$ oraz **$(AB)^T = B^T A^T$**.\n\n**Macierz odwrotna** $A^{-1}$ istnieje tylko dla wybranych (nieosobliwych) macierzy kwadratowych $A\\in M_{n\\times n}$ i spełnia $A\\cdot A^{-1} = A^{-1}\\cdot A = I_n$. Jeśli istnieje, to jest jedyna. Dla odwracalnych $A, B$ zachodzą własności (Wykład 02, sl. 16):\n$$(A^{-1})^{-1} = A, \\qquad (A^T)^{-1} = (A^{-1})^T, \\qquad (A\\cdot B)^{-1} = B^{-1} \\cdot A^{-1}$$\nDowód ostatniej tożsamości: $(AB)(B^{-1}A^{-1}) = A(BB^{-1})A^{-1} = AI_nA^{-1} = AA^{-1} = I_n$.',
    key_points: [
      'Definicje $A^T$ (wymiar $m\\times n \\to n\\times m$) i $A^{-1}$ (wyłącznie macierz kwadratowa $n\\times n$).',
      'Reguła odwracania kolejności: $(AB)^T = B^T A^T$ oraz $(AB)^{-1} = B^{-1} A^{-1}$.',
      'Przemienność transpozycji i odwracania: $(A^T)^{-1} = (A^{-1})^T$.',
      'Uwaga: suma macierzy odwracalnych NIE musi być odwracalna i w ogólności $(A+B)^{-1} \\neq A^{-1} + B^{-1}$!',
    ],
    common_mistakes:
      'Pisanie $(AB)^T = A^T B^T$ lub $(AB)^{-1} = A^{-1}B^{-1}$ albo próba wyznaczania $A^{-1}$ dla macierzy prostokątnej.',
    lab_connection:
      'Niezbędne przy rozwiązywaniu równań macierzowych (np. $AXB = C \\implies X = A^{-1}CB^{-1}$) oraz regresji metodą najmniejszych kwadratów $(A^T A)^{-1}A^T b$.',
  },
  {
    id: 'alg-q12',
    subject_id: 'algebra',
    number: 12,
    chapter_id: 'algebra-ch3',
    category: 'Macierze',
    question: 'Wyznaczanie macierzy odwrotnej $A^{-1}$ metodą eliminacji wierszowej Gaussa–Jordana',
    short_answer:
      'Dopisujemy obok $A$ macierz jednostkową $[A\\,|\\,I]$ i dozwolonymi operacjami wierszowymi ($\\alpha w_i$, $w_i+\\alpha w_j$, $w_i\\leftrightarrow w_j$) doprowadzamy lewy blok do $I$; prawy staje się wtedy $A^{-1}$. Wiersz zer po lewej oznacza nieodwracalność.',
    full_answer:
      'Metoda eliminacji Gaussa–Jordana (Wykład 02, sl. 17–19) polega na utworzeniu macierzy blokowej $[A\\,|\\,I_n]$ i przekształcaniu jej wyłącznie **dozwolonymi operacjami elementarnymi na wierszach**:\n1. pomnożenie wiersza przez niezerowy skalar $\\alpha \\cdot w_i$ ($\\alpha\\neq 0$),\n2. dodanie do wiersza wielokrotności innego wiersza $w_i + \\alpha \\cdot w_j$,\n3. zamiana dwóch wierszy miejscami $w_i \\leftrightarrow w_j$.\n\nKażda operacja wierszowa odpowiada lewostronnemu pomnożeniu całego bloku przez pewną odwracalną macierz elementarną $E_k$. Zatem jeśli ciąg operacji przekształca lewy blok $A$ w $I_n$ ($E_s\\cdots E_1 A = I_n$), to $E_s\\cdots E_1 = A^{-1}$, czyli prawy blok $I_n$ przekształca się dokładnie w $A^{-1}$: $[A\\,|\\,I_n] \\to [I_n\\,|\\,A^{-1}]$. Jeżeli w trakcie redukcji po lewej stronie pojawi się wiersz samych zer (jak dla $\\begin{bmatrix}1&2\\\\-2&-4\\end{bmatrix}$ na sl. 19), macierz $A$ jest osobliwa (nieodwracalna).',
    key_points: [
      'Zapis $[A\\,|\\,I_n] \\longrightarrow [I_n\\,|\\,A^{-1}]$ oraz lista dokładnie 3 dozwolonych operacji wierszowych.',
      'Dlaczego metoda działa: każda operacja wierszowa to lewostronne mnożenie przez macierz elementarną.',
      'Warunek wykrycia nieodwracalności: wiersz zer w lewym bloku.',
      'Zawsze sprawdź wynik mnożeniem $A\\cdot A^{-1} = I_n$ i nigdy nie mieszaj operacji wierszowych z kolumnowymi!',
    ],
    common_mistakes:
      'Wykonywanie operacji na kolumnach w trakcie eliminacji $[A\\,|\\,I]$ (niszczy wynik!) lub pomnożenie wiersza przez $0$.',
    lab_connection:
      'Standardowy algorytm numeryczny ($O(n^3)$) — dla $n \\ge 4$ dramatycznie szybszy niż metoda dopełnień algebraicznych ($O(n!)$).',
  },
  {
    id: 'alg-q13',
    subject_id: 'algebra',
    number: 13,
    chapter_id: 'algebra-ch4',
    category: 'Wyznaczniki',
    question: 'Wyznacznik macierzy — reguła Sarrusa ($1\\times 1, 2\\times 2, 3\\times 3$) i interpretacja geometryczna',
    short_answer:
      'Wyznacznik $\\det A$ to skalar przypisany macierzy kwadratowej. Reguła Sarrusa działa tylko do stopnia 3 ($2\\times 2$: $ad-bc$; $3\\times 3$: 3 przekątne $+$ minus 3 przekątne $-$). Geometrycznie $|\\det A|$ to pole równoległoboku (2D) lub objętość równoległościanu (3D).',
    full_answer:
      'Wyznacznik $\\det A$ (lub $|A|$) określony jest wyłącznie dla macierzy kwadratowych:\n- $1\\times 1$: $\\det[a_{11}] = a_{11}$,\n- $2\\times 2$: $\\det\\begin{bmatrix}a&b\\\\c&d\\end{bmatrix} = ad - bc$,\n- $3\\times 3$ (**reguła Sarrusa** — dopisujemy 1. i 2. kolumnę z prawej strony lub 1. i 2. wiersz pod spodem): $\\det A = a_{11}a_{22}a_{33} + a_{12}a_{23}a_{31} + a_{13}a_{21}a_{32} - a_{13}a_{22}a_{31} - a_{11}a_{23}a_{32} - a_{12}a_{21}a_{33}$.\n**Interpretacja geometryczna (Wykład 02, sl. 24–25):**\n- Pole równoległoboku rozpiętego na wektorach $\\vec{u}=(a,b)$ i $\\vec{v}=(c,d)$ w $\\mathbb{R}^2$ wynosi $|D| = \\left|\\det\\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}\\right|$,\n- Objętość równoległościanu rozpiętego na trzech wektorach w $\\mathbb{R}^3$ wynosi $|V| = |\\det[\\vec{u};\\vec{v};\\vec{w}]|$. Znak wyznacznika informuje o orientacji układu wektorów, a $\\det A = 0$ oznacza spłaszczenie (liniową zależność wektorów).',
    key_points: [
      'Dokładny wzór Sarrusa dla $2\\times 2$ i $3\\times 3$ oraz wyraźne zastrzeżenie: **NIE wolno stosować Sarrusa dla $4\\times 4$ i większych!**',
      'Interpretacja geometryczna: $|\\det A|$ = pole równoległoboku (2D) / objętość równoległościanu (3D) / współczynnik skalowania objętości.',
      'Powiązanie z liniową zależnością: pole/objętość $= 0 \\iff \\det A = 0$.',
    ],
    common_mistakes:
      'Stosowanie reguły Sarrusa do macierzy $4\\times 4$ (daje tylko 8 z $4!=24$ składników — wynik prawie zawsze fałszywy!) albo pomijanie wartości bezwzględnej przy polu/objętości.',
    lab_connection:
      'Jakobian zmiany zmiennych w całkach wielokrotnych i sprawdzanie liniowej niezależności wektorów bazowych.',
    svg_diagram_id: 'alg-det-geometry',
  },
  {
    id: 'alg-q14',
    subject_id: 'algebra',
    number: 14,
    chapter_id: 'algebra-ch4',
    category: 'Wyznaczniki',
    question: 'Własności wyznaczników, twierdzenie Cauchy’ego i wyznacznik macierzy blokowej',
    short_answer:
      '$\\det(A^T)=\\det A$, $\\det(AB)=\\det A\\cdot\\det B$, $\\det(\\alpha A)=\\alpha^n\\det A$. Wyznacznik macierzy trójkątnej to iloczyn przekątnej, blokowej $\\det\\begin{bmatrix}A&C\\\\0&B\\end{bmatrix}=\\det A\\det B$. Zamiana wierszy zmienia znak, a $w_i+\\alpha w_j$ nie zmienia $\\det A$.',
    full_answer:
      'Kluczowe twierdzenia upraszczające liczenie wyznaczników (Wykład 02, sl. 26–33):\n1. **Macierz trójkątna / diagonalna:** $\\det A = a_{11}a_{22}\\cdots a_{nn}$.\n2. **Transpozycja:** $\\det(A^T) = \\det A$.\n3. **Twierdzenie Cauchy’ego:** $\\det(AB) = \\det A \\cdot \\det B$, skąd $\\det(A^m) = (\\det A)^m$ oraz $\\det(A^{-1}) = (\\det A)^{-1}$.\n4. **Wieloliniowość (jednorodność + addytywność wierszy/kolumn):** stałą $\\alpha$ wyłączamy z *jednego* wiersza, skąd dla całej macierzy stopnia $n$: **$\\det(\\alpha A) = \\alpha^n \\det A$** (np. dla $3\\times 3$ z $\\det A=-2$: $\\det(3A) = 3^3(-2) = -54$).\n5. **Macierz blokowa:** jeśli $A, B$ są kwadratowe, to $\\det\\begin{bmatrix}A&C\\\\0&B\\end{bmatrix} = \\det\\begin{bmatrix}A&0\\\\D&B\\end{bmatrix} = \\det A\\cdot\\det B$.\n6. **Kiedy $\\det A = 0$:** wiersz/kolumna zer, dwa równe wiersze/kolumny lub liniowa zależność wierszy/kolumn.\n7. **Operacje wierszowe:** zamiana dwóch wierszy $w_i\\leftrightarrow w_j$ zmienia znak $\\det$ na przeciwny; operacja $w_i + \\alpha w_j$ **nie zmienia** wartości wyznacznika!',
    key_points: [
      'Wzór $\\det(\\alpha A) = \\alpha^n \\det A$ (nie $\\alpha \\det A$!).',
      'Twierdzenie Cauchy’ego $\\det(AB) = \\det A\\cdot\\det B$, choć w ogólności $\\det(A+B) \\neq \\det A + \\det B$!',
      'Wzór blokowy $\\det\\begin{bmatrix}A&C\\\\0&B\\end{bmatrix} = \\det A\\cdot\\det B$ (ważne: $A$ i $B$ muszą być kwadratowe!).',
      'Operacja $w_i + \\alpha w_j$ nie zmienia $\\det$, a $w_i \\leftrightarrow w_j$ mnoży $\\det$ przez $-1$.',
    ],
    common_mistakes:
      'Błąd $\\det(3A) = 3\\det A$ zamiast $3^n\\det A$; pisanie $\\det(A+B) = \\det A + \\det B$ (fałsz! Addytywność dotyczy wyłącznie *jednego* wiersza przy pozostałych ustalonych).',
    lab_connection:
      'Zerowanie kolumny operacjami $w_i + \\alpha w_j$ przed rozwinięciem Laplace’a redukuje liczenie wyznacznika $4\\times 4$ lub $5\\times 5$ do jednego podwyznacznika.',
  },
  {
    id: 'alg-q15',
    subject_id: 'algebra',
    number: 15,
    chapter_id: 'algebra-ch4',
    category: 'Wyznaczniki',
    question: 'Dopełnienia algebraiczne i twierdzenie Laplace’a (rozwinięcie wyznacznika stopnia $n$)',
    short_answer:
      'Dopełnienie algebraiczne to $A_{ij}=(-1)^{i+j}\\det B_{ij}$, gdzie $B_{ij}$ powstaje po wykreśleniu $i$-tego wiersza i $j$-tej kolumny. Twierdzenie Laplace’a: $\\det A = \\sum_{k=1}^n a_{ik}A_{ik} = \\sum_{k=1}^n a_{kj}A_{kj}$.',
    full_answer:
      'Dla macierzy kwadratowej $A = [a_{ij}]_{n\\times n}$ definiujemy **dopełnienie algebraiczne** wyrazu $a_{ij}$ jako $A_{ij} = (-1)^{i+j}\\det B_{ij}$, gdzie minor $\\det B_{ij}$ jest wyznacznikiem macierzy stopnia $(n-1)$ otrzymanej przez usunięcie $i$-tego wiersza i $j$-tej kolumny (znaki $(-1)^{i+j}$ układają się w szachownicę z $+$ na pozycji $(1,1)$).\n\n**Twierdzenie Laplace’a** pozwala obliczyć wyznacznik dowolnego stopnia $n$, rozwijając go względem wybranego $i$-tego wiersza lub $j$-tej kolumny:\n$$\\det A = a_{i1}A_{i1} + a_{i2}A_{i2} + \\dots + a_{in}A_{in} = a_{1j}A_{1j} + a_{2j}A_{2j} + \\dots + a_{nj}A_{nj}$$\nW praktyce zawsze wybieramy linię (wiersz lub kolumnę) z **największą liczbą zer** — a jeszcze lepiej: najpierw operacjami $w_r + \\alpha w_s$ (które nie zmieniają $\\det A$) wyzerować wszystkie poza jednym elementem danej linii, dzięki czemu w rozwinięciu Laplace’a zostaje tylko jeden niezerowy wyraz!',
    key_points: [
      'Wzór $A_{ij} = (-1)^{i+j}\\det B_{ij}$ — nie myl z samym minorem $\\det B_{ij}$ (znak szachownicy jest kluczowy!).',
      'Rozwinięcie względem dowolnego wiersza lub kolumny daje zawsze tę samą wartość $\\det A$.',
      'Optymalna strategia: najpierw wyzeruj wiersz/kolumnę przez $w_i + \\alpha w_j$, dopiero potem zastosuj Laplace’a.',
    ],
    common_mistakes:
      'Zapomnienie czynnika $(-1)^{i+j}$ albo używanie indeksu w nowej (zmniejszonej) macierzy zamiast oryginalnego $(i,j)$.',
    lab_connection:
      'Podstawowa metoda ręcznego liczenia wyznaczników $4\\times 4$ oraz wielomianów charakterystycznych $\\det(A-\\lambda I)$ (np. przykład $3\\times 3$ w Wykładzie 04, sl. 10).',
  },
  {
    id: 'alg-q16',
    subject_id: 'algebra',
    number: 16,
    chapter_id: 'algebra-ch4',
    category: 'Wyznaczniki',
    question: 'Macierz osobliwa vs nieosobliwa, macierz dołączona $A^D$ i wzór $A^{-1}=\\frac{1}{\\det A}A^D$',
    short_answer:
      'Macierz kwadratowa jest nieosobliwa (odwracalna) $\\iff \\det A \\neq 0$. Macierz dołączona $A^D=[A_{ij}]^T$ to transponowana macierz dopełnień, spełnia $AA^D=(\\det A)I$, skąd $A^{-1}=\\frac{1}{\\det A}A^D$ i dla $2\\times 2$: $\\frac{1}{ad-bc}\\begin{bmatrix}d&-b\\\\-c&a\\end{bmatrix}$.',
    full_answer:
      'Macierz kwadratową $A$ nazywamy **nieosobliwą**, gdy $\\det A \\neq 0$, a **osobliwą**, gdy $\\det A = 0$. **Macierzą dołączoną** $A^D$ nazywamy **transponowaną** macierz dopełnień algebraicznych: $A^D = [A_{ij}]^T$ (czyli na pozycji $(i,j)$ macierzy $A^D$ stoi dopełnienie $A_{ji}$!). Dla każdej macierzy kwadratowej zachodzi tożsamość (Wykład 02, sl. 40):\n$$A \\cdot A^D = A^D \\cdot A = (\\det A) \\cdot I_n$$\nWynika stąd fundamentalne twierdzenie: **$A$ jest odwracalna $\\iff \\det A \\neq 0$**, a wtedy:\n$$A^{-1} = \\frac{1}{\\det A} \\cdot A^D, \\qquad \\det(A^{-1}) = \\frac{1}{\\det A}$$\nDla macierzy $2\\times 2$ daje to błyskawiczny wzór:\n$$\\begin{bmatrix}a & b \\\\ c & d\\end{bmatrix}^{-1} = \\frac{1}{ad - bc}\\begin{bmatrix}d & -b \\\\ -c & a\\end{bmatrix}$$',
    key_points: [
      'Równoważność: $A$ odwracalna $\\iff$ $A$ nieosobliwa $\\iff \\det A \\neq 0$.',
      'Kluczowa transpozycja w definicji macierzy dołączonej: $A^D = [A_{ij}]^T$.',
      'Wzór $A^{-1} = \\frac{1}{\\det A}A^D$, tożsamość $\\det(A^{-1}) = \\frac{1}{\\det A}$ oraz wzór dla $2\\times 2$.',
    ],
    common_mistakes:
      'Brak transpozycji macierzy dopełnień $[A_{ij}]$ przed podzieleniem przez $\\det A$; pomylenie znaków szachownicy $(-1)^{i+j}$ w dopełnieniach.',
    lab_connection:
      'Dla macierzy $2\\times 2$ i rzadkich $3\\times 3$ (z wieloma zerami) wzór przez $A^D$ bywa szybszy na kolokwium niż eliminacja Gaussa–Jordana.',
  },
  {
    id: 'alg-q17',
    subject_id: 'algebra',
    number: 17,
    chapter_id: 'algebra-ch5',
    category: 'Układy równań',
    question: 'Zapis macierzowy układu równań liniowych $AX=B$, układy jednorodne i interpretacja geometryczna w $\\mathbb{R}^3$',
    short_answer:
      'Układ $m$ równań z $n$ niewiadomymi zapisujemy jako $AX=B$ z macierzą rozszerzoną $[A|B]$. Układ jednorodny ($AX=0$) ma zawsze rozwiązanie zerowe i zbiór jego rozwiązań jest podprzestrzenią $\\mathbb{R}^n$. W $\\mathbb{R}^3$ rozwiązania to przecięcia płaszczyzn.',
    full_answer:
      'Układ $m$ równań liniowych z $n$ niewiadomymi równoważnie zapisujemy jako $A\\cdot X = B$, gdzie $A_{m\\times n}$ to macierz współczynników, $X_{n\\times 1}$ wektor niewiadomych, a $B_{m\\times 1}$ kolumna wyrazów wolnych; blok $[A\\,|\\,B]$ to **macierz rozszerzona układu**.\n\n- **Układ jednorodny** ($B=0$, czyli $AX=0$): zawsze niesprzeczny, bo posiada rozwiązanie zerowe $X=0$; zbiór jego rozwiązań jest podprzestrzenią liniową $\\mathbb{R}^n$ (zamknięty na dodawanie rozwiązań i mnożenie przez skalar).\n- **Układ niejednorodny** ($B\\neq 0$): może być oznaczony (1 rozwiązanie), nieoznaczony ($\\infty$ rozwiązań) lub sprzeczny ($0$ rozwiązań).\n- **Interpretacja w $\\mathbb{R}^3$ (Wykład 03, sl. 7):** jedno równanie to płaszczyzna; 2 równania przecinają się w prostą, płaszczyznę lub $\\emptyset$; 3 równania przecinają się w 1 punkt (układ Cramera), prostą, płaszczyznę lub $\\emptyset$.',
    key_points: [
      'Wymiary macierzy w $A_{m\\times n} X_{n\\times 1} = B_{m\\times 1}$ oraz definicja macierzy rozszerzonej $[A\\,|\\,B]$.',
      'Układ jednorodny $AX=0$ nigdy nie jest sprzeczny; jego zbiór rozwiązań to podprzestrzeń $\\mathbb{R}^n$.',
      'Wszystkie możliwe geometryczne przecięcia 1, 2 i 3 płaszczyzn w $\\mathbb{R}^3$.',
    ],
    common_mistakes:
      'Twierdzenie, że układ jednorodny może być sprzeczny (fałsz — zawsze spełnia go $X=0$!) lub mylenie liczby równań $m$ z liczbą niewiadomych $n$.',
    lab_connection:
      'Modelowanie obwodów elektrycznych (prawa Kirchhoffa), przepływów sieciowych i węzłów kratownic sprowadza się do układu $AX=B$.',
    svg_diagram_id: 'alg-linear-systems',
  },
  {
    id: 'alg-q18',
    subject_id: 'algebra',
    number: 18,
    chapter_id: 'algebra-ch5',
    category: 'Układy równań',
    question: 'Układ Cramera i metoda wyznacznikowa (wzory Cramera)',
    short_answer:
      'Układ Cramera to układ kwadratowy ($m=n$) o $\\det A\\neq 0$. Ma dokładnie jedno rozwiązanie: $x_j = \\frac{\\det A_{x_j}}{\\det A}$, gdzie $A_{x_j}$ powstaje przez wstawienie kolumny $B$ w miejsce $j$-tej kolumny macierzy $A$.',
    full_answer:
      '**Definicja (Wykład 03, sl. 8–9):** Układ $n$ równań liniowych z $n$ niewiadomymi nazywamy **układem Cramera**, jeżeli $\\det A \\neq 0$.\n**Twierdzenie Cramera:** Każdy układ Cramera ma **dokładnie jedno rozwiązanie** dane wzorami:\n$$x_1 = \\frac{\\det A_{x_1}}{\\det A}, \\quad x_2 = \\frac{\\det A_{x_2}}{\\det A}, \\quad \\dots, \\quad x_n = \\frac{\\det A_{x_n}}{\\det A}$$\ngdzie $A_{x_j}$ otrzymujemy z macierzy $A$ przez zastąpienie $j$-tej kolumny (współczynników przy niewiadomej $x_j$) kolumną wyrazów wolnych $B$.\n**Uwaga o przypadku jednorodnym:** Dla kwadratowego układu jednorodnego $AX=0$ wszystkie wyznaczniki $\\det A_{x_j}=0$ (mają kolumnę zer), więc gdy $\\det A\\neq 0$, jedynym rozwiązaniem jest $X=0$. Stąd niezerowe rozwiązania $AX=0$ istnieją **tylko gdy $\\det A=0$**!',
    key_points: [
      'Dwa warunki układu Cramera: kwadratowość ($m=n$) oraz nieosobliwość ($\\det A \\neq 0$).',
      'Konstrukcja $A_{x_j}$: podmiana $j$-tej **kolumny** (nie wiersza!) na wektor $B$.',
      'Zastosowanie do układów jednorodnych: $\\det A \\neq 0 \\implies$ tylko $X=0$; niezerowe rozwiązania wymagają $\\det A = 0$.',
    ],
    common_mistakes:
      'Podmienianie wiersza zamiast kolumny w $A_{x_j}$; próba stosowania wzorów Cramera przy $\\det A = 0$ lub dla układu prostokątnego ($m \\neq n$).',
    lab_connection:
      'Wzory Cramera są świetne dla $2\\times 2$, $3\\times 3$ oraz układów z parametrem symbolicznym (łatwo wyznaczyć jedną wybraną niewiadomą bez rozwiązywania całego układu).',
    svg_diagram_id: 'alg-linear-systems',
  },
  {
    id: 'alg-q19',
    subject_id: 'algebra',
    number: 19,
    chapter_id: 'algebra-ch5',
    category: 'Układy równań',
    question: 'Metoda eliminacji Gaussa–Jordana dla układów równań liniowych ($[A\\,|\\,B] \\to [I\\,|\\,X]$)',
    short_answer:
      'Zapisujemy macierz rozszerzoną $[A\\,|\\,B]$ i wyłącznie operacjami elementarnymi na wierszach redukujemy ją do $[I\\,|\\,X]$ (dla układów Cramera) lub postaci schodkowej zredukowanej (dla dowolnych układów).',
    full_answer:
      'Metoda eliminacji (Wykład 03, sl. 12–14) przekształca macierz rozszerzoną $[A\\,|\\,B]$ przy użyciu 3 dozwolonych operacji wierszowych ($\\alpha w_i$ dla $\\alpha\\neq 0$, $w_i + \\alpha w_j$, $w_i \\leftrightarrow w_j$), ponieważ odpowiadają one równoważnym przekształceniom układu równań (nie zmieniają zbioru rozwiązań!).\n- Dla układu Cramera lewy blok redukuje się do $I_n$, a w ostatniej kolumnie odczytujemy gotowy wektor $X$: $[A\\,|\\,B] \\to [I\\,|\\,X]$.\n- Metoda działa także dla **dowolnych układów** ($m\\neq n$ lub $\\det A=0$): wiersz $[0\\;\\cdots\\;0 \\mid c\\neq 0]$ oznacza sprzeczność, a brak piwotów w pewnych kolumnach daje zmienne wolne (parametry) i $\\infty$ rozwiązań.',
    key_points: [
      'Operacje wykonujemy wyłącznie na **wierszach** (operacje na kolumnach $A$ przestawiają niewiadome i są niedozwolone bez reindeksacji!).',
      'Dla układów Cramera: $[A\\,|\\,B] \\to [I\\,|\\,X]$.',
      'Rozpoznawanie sprzeczności ($0 = c \\neq 0$) oraz układu nieoznaczonego (zmienne wolne).',
      'Złożoność $O(n^3)$ — znacznie wydajniejsza od Cramera dla $n \\ge 4$.',
    ],
    common_mistakes:
      'Zapominanie o zastosowaniu operacji wierszowej także do prawej kolumny $B$; wykonywanie operacji kolumnowych na $[A\\,|\\,B]$.',
    lab_connection:
      'Podstawa solverów numerycznych (MATLAB `A\\b`, NumPy `np.linalg.solve` — rozkład LU z częściowym wyborem elementu głównego).',
  },
  {
    id: 'alg-q20',
    subject_id: 'algebra',
    number: 20,
    chapter_id: 'algebra-ch5',
    category: 'Układy równań',
    question: 'Metoda macierzowa $X = A^{-1}B$ i porównanie trzech metod rozwiązywania $AX=B$',
    short_answer:
      'Dla nieosobliwej macierzy $A$ równanie $AX=B$ mnożymy z lewej przez $A^{-1}$, dostając $X=A^{-1}B$. Metoda jest szczególnie opłacalna, gdy rozwiązujemy wiele układów z tą samą macierzą $A$ i różnymi prawymi stronami $B_1, B_2, \\dots$.',
    full_answer:
      'Jeśli $A \\in M_{n\\times n}$ jest nieosobliwa ($\\det A \\neq 0$), to istnieje $A^{-1}$. Mnożąc obustronnie **z lewej strony** równanie $AX=B$ przez $A^{-1}$ otrzymujemy:\n$$A^{-1}(AX) = A^{-1}B \\implies (A^{-1}A)X = A^{-1}B \\implies I_n X = A^{-1}B \\implies X = A^{-1}B$$\n**Porównanie trzech metod z Wykładu 03:**\n1. **Wzory Cramera:** wygodne przy $2\\times 2$, $3\\times 3$ lub gdy szukamy tylko jednej niewiadomej $x_k$; bezużyteczne dla dużych $n$ i przy $\\det A = 0$.\n2. **Eliminacja Gaussa–Jordana:** najbardziej uniwersalna i najszybsza dla pojedynczego układu (działa też dla $m\\neq n$ i $\\det A=0$).\n3. **Metoda macierzowa $X=A^{-1}B$:** droższa dla jednego $B$, ale świetna, gdy macierz $A$ jest stała i trzeba wielokrotnie przeliczać odpowiedzi $X_k = A^{-1}B_k$ dla różnych wektorów pobudzeń $B_k$.',
    key_points: [
      'Wyprowadzenie $X = A^{-1}B$ przez **lewostronne** mnożenie (prawostronne $B A^{-1}$ nawet nie ma zgodnych wymiarów!).',
      'Warunek stosowalności: $\\det A \\neq 0$.',
      'Kryteria wyboru między Cramerem, Gaussem–Jordanem a metodą macierzową.',
    ],
    common_mistakes:
      'Zapisywanie $X = B\\cdot A^{-1}$ zamiast $X = A^{-1}\\cdot B$ (brak przemienności i niezgodność wymiarów $(n\\times 1)\\cdot(n\\times n)$!).',
    lab_connection:
      'W analizie liniowych systemów stacjonarnych (LTI) i sieci rezystancyjnych raz odwrócona macierz impedancji pozwala wyznaczać prądy dla dowolnych źródeł napięcia.',
  },
  {
    id: 'alg-q21',
    subject_id: 'algebra',
    number: 21,
    chapter_id: 'algebra-ch6',
    category: 'Wartości i wektory własne',
    question: 'Definicja wartości własnej i wektora własnego macierzy oraz interpretacja geometryczna',
    short_answer:
      'Skalar $\\lambda\\in K$ jest wartością własną $A\\in M_{n\\times n}(K)$, jeśli istnieje **niezerowy** wektor $X$ taki, że $AX=\\lambda X$. Geometrycznie wektor własny zachowuje swój kierunek pod działaniem przekształcenia $A$ i ulega jedynie skalowaniu przez $\\lambda$.',
    full_answer:
      'Dla macierzy kwadratowej $A \\in M_{n\\times n}(K)$ skalar $\\lambda \\in K$ nazywamy **wartością własną**, a niezerowy wektor kolumnowy $X \\in M_{n\\times 1}(K)$ ($X\\neq 0$) — odpowiadającym jej **wektorem własnym**, jeżeli spełnione jest równanie:\n$$A \\cdot X = \\lambda \\cdot X$$\n**Własności podstawowe (Wykład 04, sl. 3–4):**\n- Wektor zerowy $X = 0$ **nigdy** nie jest wektorem własnym (gdyby był, każda liczba $\\lambda$ spełniałaby $A\\cdot 0 = \\lambda\\cdot 0$!).\n- Jeśli $X$ jest wektorem własnym dla $\\lambda$, to każda niezerowa wielokrotność $\\alpha X$ ($\\alpha\\neq 0$) również nim jest: $A(\\alpha X)=\\alpha(AX)=\\alpha(\\lambda X)=\\lambda(\\alpha X)$.\n- Geometrycznie przekształcenie $X \\mapsto AX$ rozciąga/ściska (i dla $\\lambda<0$ odwraca zwrot) wektor własny wzdłuż tej samej prostej, nie zmieniając jego kierunku. Liczba $\\lambda = 0$ **może** być wartością własną — zachodzi to dokładnie wtedy, gdy $\\det A = 0$ (macierz jest osobliwa).',
    key_points: [
      'Równanie $AX = \\lambda X$ z obowiązkowym zastrzeżeniem **$X \\neq 0$**.',
      'Skalowalność: $\\alpha X$ ($\\alpha\\neq 0$) też jest wektorem własnym dla tej samej $\\lambda$ (wektor własny wyznaczony jest z dokładnością do niezerowej stałej).',
      'Uwaga: $\\lambda = 0$ JEST dopuszczalną wartością własną (dla macierzy osobliwych); zakazane jest tylko $X = 0$!',
      'Sens geometryczny: kierunki niezmiennicze przekształcenia liniowego.',
    ],
    common_mistakes:
      'Mylenie zakazu $X \\neq 0$ z zakazem $\\lambda \\neq 0$ — wartość własna $\\lambda$ jak najbardziej może wynosić $0$!',
    lab_connection:
      'Kluczowe w analizie głównych składowych (PCA), kompresji obrazów/wideo (DCT/KLT), stabilności układów dynamicznych i rankingu PageRank.',
    svg_diagram_id: 'alg-eigen-transform',
  },
  {
    id: 'alg-q22',
    subject_id: 'algebra',
    number: 22,
    chapter_id: 'algebra-ch6',
    category: 'Wartości i wektory własne',
    question: 'Wielomian charakterystyczny $\\chi_A(\\lambda) = \\det(A - \\lambda I)$ — wyprowadzenie i procedura wyznaczania widma',
    short_answer:
      'Równanie $AX=\\lambda X$ przepisujemy jako jednorodny układ $(A-\\lambda I)X=0$, który ma niezerowe rozwiązania $\\iff \\chi_A(\\lambda)=\\det(A-\\lambda I)=0$. Pierwiastki $\\chi_A$ to wartości własne, a rozwiązania $(A-\\lambda_i I)X=0$ to wektory własne.',
    full_answer:
      'Wyprowadzenie równania charakterystycznego (Wykład 04, sl. 5–6):\n$$AX = \\lambda X \\iff AX - \\lambda I_n X = 0 \\iff (A - \\lambda I_n)\\cdot X = 0$$\nJest to kwadratowy układ jednorodny $n$ równań z $n$ niewiadomymi. Z twierdzenia Cramera ma on niezerowe rozwiązanie $X \\neq 0$ **wtedy i tylko wtedy**, gdy jego macierz współczynników jest osobliwa:\n$$\\chi_A(\\lambda) = \\det(A - \\lambda I_n) = 0$$\n**Algorytm wyznaczania wartości i wektorów własnych:**\n1. Odejmij $\\lambda$ od wyrazów na głównej przekątnej $A$ i oblicz wielomian charakterystyczny $\\chi_A(\\lambda) = \\det(A-\\lambda I)$.\n2. Znajdź pierwiastki $\\lambda_1, \\dots, \\lambda_k$ równania $\\chi_A(\\lambda) = 0$ (w żądanym ciele $\\mathbb{R}$ lub $\\mathbb{C}$).\n3. Dla każdej wartości własnej $\\lambda_i$ rozwiąż jednorodny układ $(A - \\lambda_i I)X = 0$, wybierając bazowe wektory własne dla każdego parametru wolnego.',
    key_points: [
      'Konieczność wstawienia macierzy jednostkowej $I_n$: $(A - \\lambda I_n)X = 0$ (nie $A - \\lambda$).',
      'Połączenie z Rozdziałem 5: niezerowe rozwiązania układu jednorodnego $\\iff \\det(A-\\lambda I)=0$.',
      'Kontrola rachunków: dla każdego wyliczonego $\\lambda_i$ macierz $A-\\lambda_i I$ musi mieć wiersze liniowo zależne; jeśli wyjdzie $X=0$, popełniłeś błąd w $\\lambda_i$!',
      'Dwie błyskawiczne kontrole: $\\sum \\lambda_i = \\operatorname{tr}(A)$ oraz $\\prod \\lambda_i = \\det(A)$.',
    ],
    common_mistakes:
      'Odejmowanie $\\lambda$ od wszystkich wyrazów macierzy zamiast tylko od głównej przekątnej; gubienie znaku przy $\\lambda_i < 0$ (np. dla $\\lambda=-1$ mamy $A - (-1)I = A + I$).',
    lab_connection:
      'Dla macierzy $2\\times 2$ wielomian ma zawsze prostą postać $\\chi_A(\\lambda) = \\lambda^2 - (\\operatorname{tr} A)\\lambda + \\det A$.',
    svg_diagram_id: 'alg-eigen-transform',
  },
  {
    id: 'alg-q23',
    subject_id: 'algebra',
    number: 23,
    chapter_id: 'algebra-ch6',
    category: 'Wartości i wektory własne',
    question: 'Wielokrotna wartość własna (przykład $3\\times 3$) i wielowymiarowa podprzestrzeń własna',
    short_answer:
      'Gdy pierwiastek $\\lambda$ wielomianu $\\chi_A(\\lambda)$ ma krotność algebraiczną $k > 1$, układ $(A-\\lambda I)X=0$ może mieć nawet do $k$ zmiennych wolnych — wtedy dla jednej wartości własnej uzyskujemy kilka liniowo niezależnych wektorów własnych.',
    full_answer:
      'W przykładzie $3\\times 3$ z Wykładu 04 (sl. 10–12) dla macierzy $A = \\begin{bmatrix}-1&-3&0\\\\2&4&0\\\\-1&-1&2\\end{bmatrix}$ rozwinięcie Laplace’a względem 3. kolumny daje $\\chi_A(\\lambda) = (2-\\lambda)^2(1-\\lambda)$, czyli $\\lambda_1 = 1$ (pojedyncza) oraz $\\lambda_{2,3} = 2$ (podwójna).\n\nPo podstawieniu podwójnej wartości własnej $\\lambda = 2$ do $(A-2I)X=0$ dostajemy macierz $\\begin{bmatrix}-3&-3&0\\\\2&2&0\\\\-1&-1&0\\end{bmatrix}$, w której wszystkie trzy równania redukują się do jednego warunku $x = -y$, natomiast zmienna $z$ jest całkowicie wolna! Stąd rozwiązanie ogólne ma **dwa niezależne parametry**:\n$$X = \\begin{bmatrix}-y\\\\y\\\\z\\end{bmatrix} = y\\begin{bmatrix}-1\\\\1\\\\0\\end{bmatrix} + z\\begin{bmatrix}0\\\\0\\\\1\\end{bmatrix}$$\nOznacza to, że podprzestrzeń własna dla $\\lambda=2$ jest 2-wymiarową płaszczyzną rozpiętą na dwóch liniowo niezależnych wektorach własnych $X_2 = [-1,1,0]^T$ i $X_3 = [0,0,1]^T$. Uwaga: nie zawsze krotność geometryczna dorównuje algebraicznej (dla macierzy defektywnych, np. $\\begin{bmatrix}2&1\\\\0&2\\end{bmatrix}$, mimo podwójnego $\\lambda=2$ istnieje tylko 1 niezależny wektor własny!).',
    key_points: [
      'Wykorzystanie struktury blokowej / zer w kolumnie (Laplace!) zamiast rozwijania wielomianu 3. stopnia Sarrussem.',
      'Rozpoznanie zmiennych wolnych (np. wyzerowanie całej kolumny zmiennej $z$ oznacza, że $z$ jest dowolnym parametrem!).',
      'Rozbicie wektora ogólnego na sumę kombinacji parametrów: $y X_2 + z X_3$.',
      'Krotność geometryczna spełnia zawsze $1 \\le k_{\\text{geom}} \\le k_{\\text{alg}}$.',
    ],
    common_mistakes:
      'Traktowanie znikającej zmiennej $z$ (zerowej kolumny w $A-\\lambda I$) jako $z = 0$ zamiast jako zmiennej wolnej $z \\in \\mathbb{R}$ — to fatalny błąd tracący cały wektor własny $[0,0,1]^T$!',
    lab_connection:
      'Istnienie $n$ liniowo niezależnych wektorów własnych jest warunkiem koniecznym i dostatecznym diagonalizacji macierzy $A = P D P^{-1}$.',
  },
  {
    id: 'alg-q24',
    subject_id: 'algebra',
    number: 24,
    chapter_id: 'algebra-ch6',
    category: 'Wartości i wektory własne',
    question: 'Brak rzeczywistych wartości własnych (macierz obrotu) i przejście do widma nad $\\mathbb{C}$',
    short_answer:
      'Macierz rzeczywista może nie mieć rzeczywistych wartości własnych — klasycznym przykładem jest obrót o $90^\\circ$, $A=\\begin{bmatrix}0&-1\\\\1&0\\end{bmatrix}$, o wielomianie $\\chi_A(\\lambda)=\\lambda^2+1$. Nad $\\mathbb{C}$ ma sprzężone wartości własne $\\lambda=\\pm j$.',
    full_answer:
      'Rozważmy macierz obrotu o $+90^\\circ$ z Wykładu 04 (sl. 13): $A = \\begin{bmatrix}0 & -1 \\\\ 1 & 0\\end{bmatrix} \\in M_{2\\times 2}(\\mathbb{R})$. Jej wielomian charakterystyczny wynosi:\n$$\\chi_A(\\lambda) = \\det(A - \\lambda I) = \\begin{vmatrix}-\\lambda & -1 \\\\ 1 & -\\lambda\\end{vmatrix} = \\lambda^2 + 1$$\nRównanie $\\lambda^2 = -1$ nie ma rozwiązań w zbiorze liczb rzeczywistych $\\mathbb{R}$, zatem $A$ **nie posiada rzeczywistych wartości ani wektorów własnych**. Intuicja geometryczna jest natychmiastowa: obrót o $90^\\circ$ obraca każdy niezerowy wektor w $\\mathbb{R}^2$ na kierunek prostopadły, więc żaden kierunek nie pozostaje niezmienniczy.\n\nNatomiast nad ciałem liczb zespolonych $\\mathbb{C}$ (zgodnie z zasadniczym twierdzeniem algebry) każdy wielomian stopnia $n$ ma dokładnie $n$ pierwiastków (z krotnościami): tutaj $\\lambda_1 = j$, $\\lambda_2 = -j$ (para sprzężona, jak zawsze dla rzeczywistych macierzy!). Warto zapamiętać, że dla dowolnej macierzy obrotu o kąt $\\theta$ mamy $\\chi(\\lambda) = \\lambda^2 - 2(\\cos\\theta)\\lambda + 1$, skąd $\\lambda = e^{\\pm j\\theta}$.',
    key_points: [
      'Przykład wykładowy $A = \\begin{bmatrix}0&-1\\\\1&0\\end{bmatrix} \\implies \\chi_A(\\lambda) = \\lambda^2 + 1$.',
      'Brak wartości własnych nad $\\mathbb{R}$ i geometryczne wytłumaczenie (brak prostej niezmienniczej przy obrocie).',
      'Nad $\\mathbb{C}$: $\\lambda_{1,2} = \\pm j$ (zespolone wartości własne macierzy rzeczywistych występują zawsze parami sprzężonymi $\\alpha \\pm j\\beta$).',
      'Klamra całego kursu: Liczby zespolone z Wykładu 01 są niezbędne do pełnej teorii widmowej z Wykładu 04!',
    ],
    common_mistakes:
      'Twierdzenie, że każda macierz rzeczywista ma rzeczywiste wartości własne (prawda dla macierzy **symetrycznych** $A=A^T$, ale fałsz w ogólności, np. dla macierzy obrotu!).',
    lab_connection:
      'Zespolone wartości własne w układach dynamicznych i filtrach IIR opisują drgania oscylacyjne (częstość określa $\\operatorname{Im}\\lambda$, a tłumienie/stabilność $\\operatorname{Re}\\lambda$).',
    svg_diagram_id: 'alg-eigen-transform',
  },
];
