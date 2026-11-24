// Fizyka — 20 zagadnień egzaminacyjnych i laboratoryjnych (Wykłady 1–3 + Laboratorium WIMiFT PP)

export const FIZYKA_EXAM_TOPICS = [
  // Rozdział 1 (Zagadnienia 1–4)
  {
    id: 'fiz-q01',
    subject_id: 'fizyka',
    number: 1,
    chapter_id: 'fizyka-ch1',
    category: 'Układ SI i wektory',
    question: 'Wielkości skalarne a wektorowe, nowoczesny układ SI (2019), przeliczanie jednostek i analiza wymiarowa',
    short_answer:
      'Skalar opisuje wyłącznie wartość z jednostką, a wektor dodatkowo kierunek, zwrot i punkt zaczepienia. Nowoczesny układ SI opiera 7 jednostek podstawowych na stałych fizycznych ($c, h, \\Delta\\nu_{\\text{Cs}}, e, k_B, N_A, K_{\\text{cd}}$), a analiza wymiarowa sprawdza spójność jednostek po obu stronach wzoru.',
    full_answer:
      '**Wielkość fizyczną** podajemy zawsze jako liczbę (z niepewnością) oraz jednostkę. **Skalary** (np. masa, czas, droga, temperatura, energia, praca) są w pełni określone przez pojedynczą liczbę; **wektory** (np. położenie $\\vec{r}$, przemieszczenie $\\Delta\\vec{r}$, prędkość $\\vec{v}$, przyspieszenie $\\vec{a}$, siła $\\vec{F}$, pęd $\\vec{p}$) wymagają wartości (długości), kierunku, zwrotu i punktu zaczepienia.\n\n**Układ SI (7 jednostek podstawowych: m, kg, s, A, K, mol, cd):**\n- Od 2019 r. zrezygnowano z materialnego wzorca kilograma (walca Pt–Ir w Sèvres) i zdefiniowano **kilogram** poprzez ustalenie dokładnej wartości stałej Plancka $h = 6{,}626\\,070\\,15 \\cdot 10^{-34}\\,\\text{J}\\cdot\\text{s}$.\n- **Metr** to droga przebyta przez światło w próżni w czasie $\\frac{1}{299\\,792\\,458}\\,\\text{s}$.\n\n**Przeliczanie jednostek i analiza wymiarowa (W1 sl. 17):**\n- $36\\,\\text{km/h} = \\frac{36\\cdot 1000\\,\\text{m}}{3600\\,\\text{s}} = 10\\,\\text{m/s}$ (dzielenie przez $3{,}6$).\n- $10\\,\\text{g/cm}^3 = \\frac{10\\cdot 10^{-3}\\,\\text{kg}}{(10^{-2}\\,\\text{m})^3} = 10\\,000\\,\\text{kg/m}^3$ (należy podnieść przedrostek centy $10^{-2}$ do potęgi 3!).\n- Analiza wymiarowa weryfikuje poprawność wzoru: po obu stronach równości wymiary muszą być identyczne.',
    key_points: [
      'Cechy odróżniające wektor od skalara (wartość, kierunek, zwrot, punkt zaczepienia).',
      'Definicja metra (przez $c$) oraz współczesna definicja kilograma (przez stałą Plancka $h$).',
      'Przeliczanie $\\text{km/h} \\leftrightarrow \\text{m/s}$ ($\\div 3{,}6$) oraz jednostek objętościowych i gęstości ($1\\,\\text{g/cm}^3 = 1000\\,\\text{kg/m}^3$).',
      'Rola analizy wymiarowej w weryfikacji wzorów fizycznych.',
    ],
    common_mistakes:
      'Zapominanie o potęgowaniu przedrostka przy zamianie $\\text{cm}^2$ lub $\\text{cm}^3$ na $\\text{m}^2, \\text{m}^3$ ($1\\,\\text{cm}^3 = 10^{-6}\\,\\text{m}^3$, nie $10^{-2}\\,\\text{m}^3$!).',
    lab_connection:
      'Każdy wynik na laboratorium fizyki wymaga podania jednostki SI oraz sprawdzenia zgodności wymiarów wzoru roboczego.',
    svg_diagram_id: 'phys-vectors-3d',
  },
  {
    id: 'fiz-q02',
    subject_id: 'fizyka',
    number: 2,
    chapter_id: 'fizyka-ch1',
    category: 'Układ SI i wektory',
    question: 'Zapis wektora w 3D, wersory, długość wektora, dodawanie, odejmowanie, rozkład na składowe i mnożenie przez skalar',
    short_answer:
      'Wektor $\\vec{W}_{AB} = [x_2-x_1, y_2-y_1, z_2-z_1] = x\\hat{i}+y\\hat{j}+z\\hat{k}$ ma długość $\\sqrt{x^2+y^2+z^2}$. Dodajemy i odejmujemy po współrzędnych, a mnożenie przez liczbę $\\lambda\\vec{b}$ skaluje długość przez $|\\lambda|$ i daje wektor.',
    full_answer:
      'W kartezjańskim układzie współrzędnych z wersorami jednostkowymi $\\hat{i}, \\hat{j}, \\hat{k}$ wektor łączący $A=(x_1,y_1,z_1)$ z $B=(x_2,y_2,z_2)$ ma postać (W1 sl. 20–24):\n$$\\vec{W}_{AB} = [x_2 - x_1,\\; y_2 - y_1,\\; z_2 - z_1] = x\\hat{i} + y\\hat{j} + z\\hat{k}, \\qquad |\\vec{W}_{AB}| = \\sqrt{x^2 + y^2 + z^2}$$\n- **Dodawanie:** $\\vec{a} + \\vec{b} = [a_x+b_x,\\; a_y+b_y,\\; a_z+b_z]$ (geometrycznie: metoda równoległoboku lub wieloboku/trójkąta).\n- **Odejmowanie:** $\\vec{a} - \\vec{b} = \\vec{a} + (-\\vec{b}) = [a_x-b_x,\\; a_y-b_y,\\; a_z-b_z]$.\n- **Rozkład na składowe w 2D:** dla wektora $\\vec{a}$ nachylonego pod kątem $\\alpha$ do osi $OX$: $a_x = |\\vec{a}|\\cos\\alpha$, $a_y = |\\vec{a}|\\sin\\alpha$.\n- **Mnożenie przez skalar $\\lambda$:** $\\lambda\\vec{b} = [\\lambda b_x, \\lambda b_y, \\lambda b_z]$ — wynikiem jest **wektor** o długości $|\\lambda\\vec{b}| = |\\lambda|\\cdot|\\vec{b}|$ (dla $\\lambda < 0$ zwrot ulega odwróceniu).',
    key_points: [
      'Współrzędne wektora $AB$ to „koniec minus początek” ($B - A$).',
      'Wzór na długość (moduł) wektora 3D: $\\sqrt{x^2+y^2+z^2}$.',
      'Rozkład na składowe $a_x = a\\cos\\alpha$, $a_y = a\\sin\\alpha$ (kluczowy dla rzutów i równi pochyłej!).',
      'Mnożenie wektora przez skalar daje zawsze **wektor** (np. $\\vec{F} = m\\vec{a}$, $\\vec{p} = m\\vec{v}$).',
    ],
    common_mistakes:
      'Zamiana kolejności przy obliczaniu $\\vec{W}_{AB}$ ($A-B$ zamiast $B-A$ daje wektor przeciwny!) oraz zamiana $\\sin$ z $\\cos$ przy rozkładaniu siły na równi pochyłej.',
    lab_connection:
      'Kalkulator wektorów 3D w Laboratorium Fizyki (Zakładka 1) pozwala przetestować wszystkie operacje na dowolnych współrzędnych.',
    svg_diagram_id: 'phys-vectors-3d',
  },
  {
    id: 'fiz-q03',
    subject_id: 'fizyka',
    number: 3,
    chapter_id: 'fizyka-ch1',
    category: 'Układ SI i wektory',
    question: 'Iloczyn skalarny wektorów — definicja geometryczna i algebraiczna, własności, warunek prostopadłości i zastosowania w fizyce',
    short_answer:
      '$\\vec{a}\\cdot\\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\alpha = a_x b_x + a_y b_y + a_z b_z$ jest **skalarem**, jest przemienny, rozdzielny względem dodawania i wynosi $0$ wtedy i tylko wtedy, gdy wektory (niezerowe) są prostopadłe.',
    full_answer:
      '**Iloczyn skalarny** dwóch wektorów $\\vec{a}, \\vec{b}$ (W1 sl. 25) jest liczbą rzeczywistą (**skalarem**!) określoną równoważnie:\n$$\\vec{a}\\cdot\\vec{b} = |\\vec{a}|\\,|\\vec{b}|\\cos\\angle(\\vec{a},\\vec{b}) = a_x b_x + a_y b_y + a_z b_z$$\n**Własności:**\n1. **Przemienność:** $\\vec{a}\\cdot\\vec{b} = \\vec{b}\\cdot\\vec{a}$ *(uwaga na literówkę ze slajdu 27 W1, gdzie omyłkowo poproszono o dowód „nieprzemienności” iloczynu skalarnego!)*. \n2. **Łączność ze skalarem:** $(\\alpha\\vec{a})\\cdot\\vec{b} = \\alpha(\\vec{a}\\cdot\\vec{b})$.\n3. **Rozdzielność względem dodawania:** $(\\vec{a}+\\vec{b})\\cdot\\vec{c} = \\vec{a}\\cdot\\vec{c} + \\vec{b}\\cdot\\vec{c}$.\n4. **Kryterium ortogonalności:** dla niezerowych wektorów $\\vec{a}\\perp\\vec{b} \\iff \\vec{a}\\cdot\\vec{b} = 0$ (bo $\\cos 90^\\circ = 0$).\n5. **Wyznaczanie kąta między wektorami:** $\\cos\\alpha = \\frac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}||\\vec{b}|}$.\n\n**Zastosowanie w fizyce:** praca mechaniczna stałej siły $W = \\vec{F}\\cdot\\Delta\\vec{r} = F\\Delta r\\cos\\alpha$ (siła prostopadła do toru, np. dośrodkowa, wykonuje zerową pracę!).',
    key_points: [
      'Wynikiem iloczynu skalarnego jest zawsze **SKALAR** (liczba), nie wektor.',
      'Dwie równoważne postaci: $|\\vec{a}||\\vec{b}|\\cos\\alpha$ oraz $a_x b_x + a_y b_y + a_z b_z$.',
      'Warunek prostopadłości $\\vec{a}\\cdot\\vec{b}=0$ oraz wzór na $\\cos\\alpha$.',
      'Przemienność iloczynu skalarnego w opozycji do antyprzemienności wektorowego.',
    ],
    common_mistakes:
      'Mylenie $\\cos\\alpha$ (skalarny) z $\\sin\\alpha$ (wektorowy) oraz zapisywanie wyniku iloczynu skalarnego jako wektora $[a_xb_x, a_yb_y, a_zb_z]$.',
    lab_connection:
      'Używany przy obliczaniu pracy, mocy chwilowej $P = \\vec{F}\\cdot\\vec{v}$ i kątów między kierunkami wektorów 3D.',
    svg_diagram_id: 'phys-vectors-3d',
  },
  {
    id: 'fiz-q04',
    subject_id: 'fizyka',
    number: 4,
    chapter_id: 'fizyka-ch1',
    category: 'Układ SI i wektory',
    question: 'Iloczyn wektorowy wektorów — definicja, wzór z wyznacznika 3×3, antyprzemienność, sens geometryczny i zastosowania',
    short_answer:
      '$\\vec{c} = \\vec{a}\\times\\vec{b}$ to **wektor** prostopadły do obu czynników (reguła prawej dłoni) o długości $|\\vec{a}||\\vec{b}|\\sin\\alpha$ równej polu równoległoboku. Jest antyprzemienny ($\\vec{a}\\times\\vec{b} = -\\vec{b}\\times\\vec{a}$) i zeruje się dla wektorów równoległych.',
    full_answer:
      '**Iloczyn wektorowy** $\\vec{c} = \\vec{a}\\times\\vec{b}$ (W1 sl. 26) zwraca **WEKTOR** spełniający:\n- **Kierunek:** prostopadły do płaszczyzny wyznaczonej przez $\\vec{a}$ i $\\vec{b}$ ($\\vec{c}\\perp\\vec{a}$ oraz $\\vec{c}\\perp\\vec{b}$).\n- **Zwrot:** wyznacza reguła śruby prawoskrętnej / prawej dłoni (obrót od pierwszego wektora $\\vec{a}$ do drugiego $\\vec{b}$).\n- **Długość (moduł):** $|\\vec{a}\\times\\vec{b}| = |\\vec{a}|\\,|\\vec{b}|\\sin\\angle(\\vec{a},\\vec{b})$ — równa **polu równoległoboku** rozpiętego na $\\vec{a}$ i $\\vec{b}$.\n- **Postać współrzędnościowa (wyznacznik formalny 3×3):**\n$$\\vec{a}\\times\\vec{b} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ a_x & a_y & a_z \\\\ b_x & b_y & b_z \\end{vmatrix} = [a_y b_z - a_z b_y,\\; a_z b_x - a_x b_z,\\; a_x b_y - a_y b_x]$$\n**Kluczowe własności:** **antyprzemienność** $\\vec{a}\\times\\vec{b} = -(\\vec{b}\\times\\vec{a})$ oraz $\\vec{a} \\parallel \\vec{b} \\iff \\vec{a}\\times\\vec{b} = \\vec{0}$ (bo $\\sin 0^\\circ = \\sin 180^\\circ = 0$).\n\n**Zastosowania w fizyce:** prędkość liniowa $\\vec{v} = \\vec{\\omega}\\times\\vec{r}$, przyspieszenie styczne $\\vec{a}_s = \\vec{\\varepsilon}\\times\\vec{r}$, moment siły $\\vec{M} = \\vec{r}\\times\\vec{F}$, siła Lorentza $\\vec{F} = q(\\vec{v}\\times\\vec{B})$.',
    key_points: [
      'Wynik to **WEKTOR** prostopadły do płaszczyzny czynników.',
      'Wzór wyznacznikowy oraz poprawne znaki trzech składowych (zwłaszcza środkowej: $a_z b_x - a_x b_z = -(a_x b_z - a_z b_x)$!).',
      'Antyprzemienność $\\vec{a}\\times\\vec{b} = -\\vec{b}\\times\\vec{a}$ (kolejność w $\\vec{\\omega}\\times\\vec{r}$ i $\\vec{r}\\times\\vec{F}$ ma kluczowe znaczenie!).',
      'Kryterium równoległości: $\\vec{a}\\times\\vec{b} = \\vec{0}$.',
    ],
    common_mistakes:
      'Zgubienie znaku minus przy środkowej współrzędnej $\\hat{j}$ podczas rozwijania wyznacznika 3×3; zamiana kolejności $\\vec{r}\\times\\vec{\\omega}$ zamiast $\\vec{\\omega}\\times\\vec{r}$.',
    lab_connection:
      'Przetestuj wyliczanie iloczynu wektorowego i antyprzemienność w Laboratorium Fizyki (Zakładka 1).',
    svg_diagram_id: 'phys-vectors-3d',
  },

  // Rozdział 2 (Zagadnienia 5–8)
  {
    id: 'fiz-q05',
    subject_id: 'fizyka',
    number: 5,
    chapter_id: 'fizyka-ch2',
    category: 'Kinematyka prostoliniowa',
    question: 'Punkt materialny, wektor wodzący $\\vec{r}(t)$, różnica między przemieszczeniem $\\Delta\\vec{r}$ a drogą $s$ oraz względność ruchu',
    short_answer:
      'Ruch to względna zmiana położenia w wybranym układzie odniesienia. Przemieszczenie $\\Delta\\vec{r} = \\vec{r}_2 - \\vec{r}_1$ jest wektorem łączącym start z metą, a droga $s$ to skalar równy długości całej przebytej trajektorii ($s \\ge |\\Delta\\vec{r}|$).',
    full_answer:
      '**Punkt materialny** (W2A sl. 3) to model ciała posiadającego masę, lecz o pomijalnych wymiarach geometrycznych (zerowej objętości — nie wykonuje obrotów ani drgań własnych).\n- **Ruch jest względny** — zależy od przyjętego układu odniesienia (np. pasażer w pociągu spoczywa względem wagonu, ale porusza się względem torów).\n- **Promień (wektor) wodzący $\\vec{r}(t) = [x(t), y(t), z(t)]$** określa położenie punktu względem początku układu współrzędnych.\n- **Przemieszczenie** $\\Delta\\vec{r} = \\vec{r}_2 - \\vec{r}_1$ zależy wyłącznie od położenia początkowego i końcowego (wektor! Gdy ciało okrąży bieżnię 400 m i wróci na start, $\\Delta\\vec{r} = \\vec{0}$).\n- **Droga $s$** jest skalarem równym długości łuku trajektorii — nigdy nie maleje ($s = 400\\,\\text{m}$ po pełnym okrążeniu). Zawsze zachodzi $s \\ge |\\Delta\\vec{r}|$, a równość tylko dla ruchu prostoliniowego bez zawracania.',
    key_points: [
      'Definicja punktu materialnego i względności ruchu (konieczność wskazania układu odniesienia).',
      'Różnica między wektorem przemieszczenia $\\Delta\\vec{r} = \\vec{r}_2 - \\vec{r}_1$ a skalarną drogą $s$.',
      'Przykład pokazujący różnicę: pełne okrążenie ($s = 2\\pi r$, ale $|\\Delta\\vec{r}| = 0$).',
    ],
    common_mistakes:
      'Utożsamianie drogi z przemieszczeniem w ruchu krzywoliniowym lub prostoliniowym ze zmianą zwrotu ruchu.',
    lab_connection:
      'Różnica ta bezpośrednio rzutuje na różnicę między wektorową prędkością średnią ($\\Delta\\vec{r}/\\Delta t$) a skalarną szybkością średnią ($s/\\Delta t$).',
    svg_diagram_id: 'phys-kinematics-graphs',
  },
  {
    id: 'fiz-q06',
    subject_id: 'fizyka',
    number: 6,
    chapter_id: 'fizyka-ch2',
    category: 'Kinematyka prostoliniowa',
    question: 'Prędkość chwilowa i średnia, przyspieszenie chwilowe i średnie — definicje różniczkowe i klasyczne pułapki',
    short_answer:
      'Prędkość chwilowa to pochodna położenia $\\vec{v} = \\frac{d\\vec{r}}{dt}$, a przyspieszenie chwilowe to $\\vec{a} = \\frac{d\\vec{v}}{dt} = \\frac{d^2\\vec{r}}{dt^2}$. Prędkość średnia po drodze to zawsze $v_{\\text{śr}} = \\frac{\\sum s_i}{\\sum t_i}$ (nie $\\frac{v_1+v_2}{2}$ dla równych odcinków drogi!).',
    full_answer:
      '**Prędkość chwilowa (W2A sl. 10–14):**\n$$\\vec{v}(t) = \\lim_{\\Delta t \\to 0}\\frac{\\Delta\\vec{r}}{\\Delta t} = \\frac{d\\vec{r}}{dt} = \\left[\\frac{dx}{dt},\\; \\frac{dy}{dt},\\; \\frac{dz}{dt}\\right] \\quad \\left[\\frac{\\text{m}}{\\text{s}}\\right]$$\nGeometrycznie w 1D $v(t) = \\operatorname{tg}\\alpha$ to nachylenie stycznej do wykresu $x(t)$.\n- **Prędkość średnia (skalarna):** $v_{\\text{śr}} = \\frac{\\Delta S}{\\Delta t} = \\frac{\\sum s_i}{\\sum t_i}$. Wzór $v_{\\text{śr}} = \\frac{v_1+v_2}{2}$ obowiązuje *wyłącznie* dla ruchu jednostajnie zmiennego (albo przy równych czasach jazdy $t_1=t_2$). Przy równych połowach drogi daje średnią harmoniczną $\\frac{2v_1 v_2}{v_1+v_2}$.\n\n**Przyspieszenie chwilowe i średnie (W2A sl. 15–16):**\n$$\\vec{a}(t) = \\lim_{\\Delta t \\to 0}\\frac{\\Delta\\vec{v}}{\\Delta t} = \\frac{d\\vec{v}}{dt} = \\frac{d^2\\vec{r}}{dt^2} \\quad \\left[\\frac{\\text{m}}{\\text{s}^2}\\right], \\qquad \\vec{a}_{\\text{śr}} = \\frac{\\Delta\\vec{v}}{\\Delta t}$$\nUwaga: przyspieszenie powstaje zarówno przy zmianie *wartości* prędkości, jak i przy zmianie jej *kierunku* (np. ruch jednostajny po okręgu ma $a \\neq 0$!).',
    key_points: [
      'Związek różniczkowy: $\\vec{r}(t) \\xrightarrow{d/dt} \\vec{v}(t) \\xrightarrow{d/dt} \\vec{a}(t)$ oraz odwrotny związek całkowy.',
      'Kiedy wolno, a kiedy NIE wolno stosować $v_{\\text{śr}} = (v_1+v_2)/2$.',
      'Fakt, że zmiana samego kierunku $\\vec{v}$ generuje niezerowe przyspieszenie.',
    ],
    common_mistakes:
      'Stosowanie średniej arytmetycznej $(v_1+v_2)/2$ dla równych odcinków drogi; przekonanie, że w ruchu ze stałą wartością prędkości przyspieszenie musi być zerowe.',
    lab_connection:
      'Wyznaczanie pochodnej położenia z pomiarów dyskretnych łączy się bezpośrednio z metodą różnic skończonych (AiSD).',
    svg_diagram_id: 'phys-kinematics-graphs',
  },
  {
    id: 'fiz-q07',
    subject_id: 'fizyka',
    number: 7,
    chapter_id: 'fizyka-ch2',
    category: 'Kinematyka prostoliniowa',
    question: 'Ruch jednostajny i jednostajnie zmienny prostoliniowy — wyprowadzenie równań z definicji pochodnej i interpretacja wykresów',
    short_answer:
      'Dla $a=\\text{const}$ całkowanie $dv=a\\,dt$ i $dx=v(t)\\,dt$ prowadzi do $v(t)=v_0+at$ oraz $x(t)=x_0+v_0 t+\\frac{1}{2}at^2$ (oraz $v^2-v_0^2=2a\\Delta x$). Pole pod wykresem $v(t)$ daje przyrost położenia.',
    full_answer:
      '**1. Ruch jednostajny prostoliniowy ($\\vec{v} = \\text{const},\\; \\vec{a} = \\vec{0}$, W2A sl. 19):**\n$$x(t) = x_0 + v t$$\n**2. Ruch jednostajnie zmienny prostoliniowy ($a = \\text{const} \\neq 0$, W2A sl. 20–24):**\nCałkując $a = \\frac{dv}{dt}$ w granicach od $(0, v_0)$ do $(t, v)$:\n$$v(t) = v_0 + a t$$\nNastępnie całkując $v(t) = \\frac{dx}{dt}$ od $(0, x_0)$ do $(t, x)$:\n$$x(t) = x_0 + \\int_0^t (v_0 + a t\')\\,dt\' = x_0 + v_0 t + \\frac{1}{2} a t^2$$\n*(Dla ruchu opóźnionego z wartością opóźnienia $|a|>0$ wstawiamy minus: $v=v_0-|a|t$, $x=x_0+v_0 t - \\frac{1}{2}|a|t^2$; uwaga na literówkę na slajdzie 24 W2A, gdzie dla $a>0$ zostawiono znak minus!)*\n**Wzór bezczasowy** (po wyrugowaniu $t = (v-v_0)/a$): $v^2 - v_0^2 = 2a\\Delta x$.\n**Interpretacja graficzna:** pole trapezu pod wykresem $v(t)$ od $0$ do $t$ wynosi $\\frac{v_0 + (v_0+at)}{2}\\cdot t = v_0 t + \\frac{1}{2}at^2 = \\Delta x$.',
    key_points: [
      'Kompletne wyprowadzenie $v(t)$ i $x(t)$ przez dwukrotne całkowanie $a = \\text{const}$ (zadanie ze slajdu 24 W2A!).',
      'Wyprowadzenie wzoru bezczasowego $v^2 - v_0^2 = 2a\\Delta x$ (np. droga hamowania $s_h = v_0^2/(2|a|)$).',
      'Interpretacja geometryczna: droga jako pole pod wykresem $v(t)$, prędkość jako nachylenie $x(t)$.',
    ],
    common_mistakes:
      'Mylenie znaku przyspieszenia $a$ w ruchu opóźnionym (zwrot $\\vec{a}$ przeciwny do $\\vec{v}_0$); pomijanie $x_0$ i $v_0$ przy warunkach początkowych.',
    lab_connection:
      'Interaktywne wykresy $x(t), v(t), a(t)$ w Rozdziale 2 obrazują dokładnie pochodną i pole pod krzywą.',
    svg_diagram_id: 'phys-kinematics-graphs',
  },
  {
    id: 'fiz-q08',
    subject_id: 'fizyka',
    number: 8,
    chapter_id: 'fizyka-ch2',
    category: 'Kinematyka prostoliniowa',
    question: 'Rzuty w polu grawitacyjnym (spadek swobodny, rzut poziomy i ukośny) oraz transformacja Galileusza (składanie prędkości)',
    short_answer:
      'Rzut ukośny rozkładamy na ruch jednostajny w poziomie ($x = v_0\\cos\\alpha\\cdot t$) i jednostajnie zmienny w pionie ($y = h_0 + v_0\\sin\\alpha\\cdot t - \\frac{1}{2}gt^2$). Transformacja Galileusza sumuje wektorowo prędkość układu i prędkość względną ciała.',
    full_answer:
      '**1. Rzut ukośny w polu grawitacyjnym ($g = 9{,}80665\\,\\text{m/s}^2$, bez oporów powietrza, W2A sl. 30–31):**\nSkładowe prędkości początkowej: $v_{0x} = v_0\\cos\\alpha$, $v_{0y} = v_0\\sin\\alpha$. Ponieważ $a_x = 0$ i $a_y = -g$:\n$$x(t) = v_0\\cos\\alpha\\cdot t, \\qquad y(t) = h_0 + v_0\\sin\\alpha\\cdot t - \\frac{1}{2}gt^2$$\nDla startu z poziomu ziemi ($h_0 = 0$):\n- **Czas wznoszenia** ($v_y = 0$): $t_w = \\frac{v_0\\sin\\alpha}{g}$, całkowity czas lotu $t_c = 2t_w = \\frac{2v_0\\sin\\alpha}{g}$.\n- **Wysokość maksymalna:** $H_{\\max} = \\frac{v_0^2\\sin^2\\alpha}{2g}$.\n- **Zasięg:** $Z = v_{0x} t_c = \\frac{v_0^2\\sin(2\\alpha)}{g}$ — maksimum dla $\\sin(2\\alpha) = 1 \\implies \\alpha = 45^\\circ$! Kąty dopełniające (np. $30^\\circ$ i $60^\\circ$) dają ten sam zasięg.\n- **Tor ruchu** $y(x) = x\\operatorname{tg}\\alpha - \\frac{g}{2v_0^2\\cos^2\\alpha}x^2$ jest **parabolą**.\n- Dla rzutu poziomego ($\\alpha = 0$ z wysokości $h_0$): $t_c = \\sqrt{2h_0/g}$ (nie zależy od $v_0$!), $Z = v_0\\sqrt{2h_0/g}$.\n\n**2. Transformacja Galileusza (W2A sl. 33):**\n$$\\vec{V}(t) = \\vec{V}_{\\text{układu}}(t) + \\vec{V}_{\\text{ciała}}(t)$$\nObowiązuje w mechanice klasycznej ($v \\ll c$).',
    key_points: [
      'Zasada niezależności składowych ruchu w poziomie i pionie (czas spadku nie zależy od $v_{0x}$!).',
      'Wyprowadzenie $t_c, H_{\\max}, Z$ oraz dowód, że maksymalny zasięg (dla $h_0=0$) zachodzi przy $\\alpha = 45^\\circ$.',
      'Wektorowe składanie prędkości Galileusza $\\vec{V} = \\vec{V}_{\\text{układu}} + \\vec{V}_{\\text{ciała}}$.',
    ],
    common_mistakes:
      'Stosowanie wzoru $Z = \\frac{v_0^2\\sin(2\\alpha)}{g}$ gdy $h_0 > 0$ (wtedy czas lotu trzeba wyznaczyć z równania kwadratowego $y(t) = 0$!); twierdzenie, że w najwyższym punkcie toru prędkość całkowita jest zerowa (zeruje się tylko $v_y$, nadal zostaje $v_x = v_0\\cos\\alpha$!).',
    lab_connection:
      'Symulator rzutu ukośnego z regulacją $v_0, \\alpha, h_0$ znajduje się w Laboratorium Fizyki (Zakładka 1).',
    svg_diagram_id: 'phys-kinematics-graphs',
  },

  // Rozdział 3 (Zagadnienia 9–12)
  {
    id: 'fiz-q09',
    subject_id: 'fizyka',
    number: 9,
    chapter_id: 'fizyka-ch3',
    category: 'Ruch po okręgu',
    question: 'Okres $T$, częstotliwość $f$, prędkość liniowa $v$ oraz prędkość kątowa $\\omega$ i przyspieszenie kątowe $\\varepsilon$',
    short_answer:
      'Okres $T = 1/f$ to czas pełnego obrotu, prędkość liniowa wynosi $v = 2\\pi r/T = \\omega r$, prędkość kątowa to $\\omega = \\frac{d\\theta}{dt} = 2\\pi f\\,[\\text{rad/s}]$, a przyspieszenie kątowe to $\\varepsilon = \\frac{d\\omega}{dt} = \\frac{d^2\\theta}{dt^2}\\,[\\text{rad/s}^2]$.',
    full_answer:
      'W ruchu punktu po okręgu o promieniu $r$ (W2B sl. 39–46):\n- **Okres $T\\,[\\text{s}]$** — czas jednego pełnego obiegu; **częstotliwość $f = \\frac{1}{T}\\,[\\text{Hz} = \\text{s}^{-1}]$** — liczba obiegów na sekundę.\n- **Kąt zakreślony w radianach:** $d\\theta = \\frac{ds}{r}$ (dodatni przy obrocie przeciwnym do wskazówek zegara — CCW).\n- **Prędkość kątowa chwilowa:** $\\omega = \\frac{d\\theta}{dt} = \\lim_{\\Delta t \\to 0}\\frac{\\Delta\\theta}{\\Delta t}\\,[\\text{rad/s} = \\text{s}^{-1}]$. W ruchu jednostajnym $\\omega = \\frac{2\\pi}{T} = 2\\pi f$.\n- **Przyspieszenie kątowe chwilowe:** $\\varepsilon = \\frac{d\\omega}{dt} = \\frac{d^2\\theta}{dt^2}\\,[\\text{rad/s}^2 = \\text{s}^{-2}]$; średnie $\\varepsilon_{\\text{śr}} = \\frac{\\Delta\\omega}{\\Delta t}$.\n- **Prędkość liniowa** jest zawsze styczna do okręgu i ma wartość $v = \\frac{2\\pi r}{T} = \\omega r$.',
    key_points: [
      'Radian jako wielkość bezwymiarowa: $d\\theta = ds/r$ (stąd jednostka $[\\omega] = \\text{s}^{-1}$ i $[\\varepsilon] = \\text{s}^{-2}$).',
      'Związki $T = 1/f$, $\\omega = 2\\pi/T = 2\\pi f$ oraz $v = \\omega r$.',
      'Konwencja znaku: $\\Delta\\theta > 0$ dla obrotu przeciwnie do wskazówek zegara.',
    ],
    common_mistakes:
      'Mylenie częstotliwości $f\\,[\\text{Hz}]$ (obroty/s) z prędkością kątową $\\omega\\,[\\text{rad/s}]$ (brak czynnika $2\\pi$!) oraz wstawianie kątów w stopniach zamiast radianów.',
    lab_connection:
      'Kluczowe przy przeliczaniu obrotów silników (RPM $\\to \\omega = 2\\pi \\cdot \\text{RPM}/60$).',
    svg_diagram_id: 'phys-circular-motion',
  },
  {
    id: 'fiz-q10',
    subject_id: 'fizyka',
    number: 10,
    chapter_id: 'fizyka-ch3',
    category: 'Ruch po okręgu',
    question: 'Związki wektorowe między wielkościami kątowymi i liniowymi ($\\vec{v} = \\vec{\\omega}\\times\\vec{r}$, $\\vec{a}_s = \\vec{\\varepsilon}\\times\\vec{r}$) oraz analogie ruch postępowy ↔ obrotowy',
    short_answer:
      'Wektory $\\vec{\\omega}$ i $\\vec{\\varepsilon}$ leżą wzdłuż osi obrotu (reguła prawej dłoni). Prędkość liniowa to $\\vec{v} = \\vec{\\omega}\\times\\vec{r}$, przyspieszenie styczne to $\\vec{a}_s = \\vec{\\varepsilon}\\times\\vec{r}$, a równania ruchu po okręgu powstają przez zamianę $s\\to\\theta, v\\to\\omega, a\\to\\varepsilon$.',
    full_answer:
      '**Wektorowy opis obrotu (W2B sl. 45–48):**\nWektor prędkości kątowej $\\vec{\\omega}$ jest wektorem osiowym (pseudowektorem) prostopadłym do płaszczyzny okręgu, o zwrocie wyznaczonym regułą prawej dłoni (palce zgodnie z ruchem, kciuk wskazuje $\\vec{\\omega}$). Wówczas:\n$$\\vec{v} = \\vec{\\omega} \\times \\vec{r}, \\qquad \\vec{a}_s = \\vec{\\varepsilon} \\times \\vec{r}$$\nSprawdzenie wymiarów: $[\\omega\\cdot r] = \\text{s}^{-1}\\cdot\\text{m} = \\text{m/s}$, $[\\varepsilon\\cdot r] = \\text{s}^{-2}\\cdot\\text{m} = \\text{m/s}^2$.\n\n**Tabela analogii dla ruchu jednostajnie zmiennego (W2B sl. 47):**\n- $v(t) = v_0 + at \\quad \\Longleftrightarrow \\quad \\omega(t) = \\omega_0 + \\varepsilon t$,\n- $s(t) = s_0 + v_0 t \\pm \\frac{1}{2}at^2 \\quad \\Longleftrightarrow \\quad \\theta(t) = \\theta_0 + \\omega_0 t \\pm \\frac{1}{2}\\varepsilon t^2$,\n- $v^2 - v_0^2 = 2a\\Delta s \\quad \\Longleftrightarrow \\quad \\omega^2 - \\omega_0^2 = 2\\varepsilon\\Delta\\theta$.',
    key_points: [
      'Kierunek wektorów $\\vec{\\omega}$ i $\\vec{\\varepsilon}$ (wzdłuż osi obrotu, prostopadle do płaszczyzny ruchu!).',
      'Poprawna kolejność w iloczynach wektorowych: $\\vec{\\omega}\\times\\vec{r}$ i $\\vec{\\varepsilon}\\times\\vec{r}$ (odwrotna kolejność odwraca znak!).',
      'Pełna analogia wzorów kinematycznych ($s\\to\\theta, v\\to\\omega, a\\to\\varepsilon$).',
    ],
    common_mistakes:
      'Rysowanie wektora $\\vec{\\omega}$ jako stycznego do okręgu (styczny jest $\\vec{v}$, natomiast $\\vec{\\omega}$ jest prostopadły do płaszczyzny okręgu!).',
    lab_connection:
      'Analogie te rozszerzają się w dalszej mechanice na dynamikę bryły sztywnej ($m \\to I$, $\\vec{F} \\to \\vec{M}$, $\\vec{p} \\to \\vec{L}$).',
    svg_diagram_id: 'phys-circular-motion',
  },
  {
    id: 'fiz-q11',
    subject_id: 'fizyka',
    number: 11,
    chapter_id: 'fizyka-ch3',
    category: 'Ruch po okręgu',
    question: 'Przyspieszenie dośrodkowe (normalne) $a_n = v^2/r = \\omega^2 r$ — wyprowadzenie i interpretacja fizyczna',
    short_answer:
      'Przyspieszenie dośrodkowe odpowiada wyłącznie za zmianę kierunku wektora prędkości, jest skierowane zawsze do środka okręgu (prostopadle do $\\vec{v}$) i ma wartość $a_n = \\frac{v^2}{r} = \\omega^2 r$.',
    full_answer:
      '**Wyprowadzenie (W2B sl. 41):**\nW ruchu jednostajnym po okręgu długość wektora prędkości jest stała ($|\\vec{v}_1| = |\\vec{v}_2| = v$), ale w czasie $\\Delta t$ kierunek prędkości obraca się o kąt $\\Delta\\theta = \\frac{\\Delta s}{r}$. Z podobieństwa trójkąta równoramiennego wektorów prędkości $(\\vec{v}_1, \\vec{v}_2, \\Delta\\vec{v})$ oraz trójkąta promieni $(\\vec{r}_1, \\vec{r}_2, \\Delta\\vec{r})$:\n$$\\frac{|\\Delta\\vec{v}|}{v} \\approx \\frac{\\Delta s}{r} = \\frac{v\\Delta t}{r} \\implies a_n = \\lim_{\\Delta t \\to 0}\\frac{|\\Delta\\vec{v}|}{\\Delta t} = \\frac{v^2}{r}$$\nPodstawiając $v = \\omega r$, dostajemy równoważną postać $a_n = \\omega^2 r = \\frac{4\\pi^2 r}{T^2}$.\n\n**Wektorowo:** $\\vec{a}_n = \\vec{\\omega} \\times (\\vec{\\omega}\\times\\vec{r}) = -\\omega^2 \\vec{r}$ (znak minus potwierdza zwrot do środka okręgu!). Siłą wywołującą to przyspieszenie jest wypadkowa siła dośrodkowa $F_d = m\\frac{v^2}{r}$ (np. grawitacja, naciąg nici lub tarcie opon na zakręcie).',
    key_points: [
      'Dowód geometryczny z podobieństwa trójkątów ($\\Delta v / v = \\Delta s / r$).',
      'Obie równoważne postaci: $a_n = v^2/r$ oraz $a_n = \\omega^2 r$.',
      'Kierunek prostopadły do $\\vec{v}$, zwrot do środka okręgu; rola: zakrzywianie toru bez zmiany wartości $v$.',
    ],
    common_mistakes:
      'Twierdzenie, że „siła dośrodkowa” to osobny, tajemniczy rodzaj oddziaływania (w rzeczywistości rolę siły dośrodkowej pełni konkretna siła fizyczna: grawitacja, tarcie, naciąg lub siła Lorentza).',
    lab_connection:
      'Interaktywny diagram ruchu po okręgu pokazuje wzrost $a_n \\propto \\omega^2$ względem $a_s$.',
    svg_diagram_id: 'phys-circular-motion',
  },
  {
    id: 'fiz-q12',
    subject_id: 'fizyka',
    number: 12,
    chapter_id: 'fizyka-ch3',
    category: 'Ruch po okręgu',
    question: 'Przyspieszenie całkowite w zmiennym ruchu po okręgu ($\\vec{a} = \\vec{a}_n + \\vec{a}_s$) oraz klasyfikacja ruchów według $a_n$ i $a_s$',
    short_answer:
      'Przyspieszenie całkowite to suma wektorowa prostopadłych składowych: dośrodkowej $a_n = v^2/r$ (zmiana kierunku) i stycznej $a_s = dv/dt = \\varepsilon r$ (zmiana wartości prędkości). Jego moduł to $a = \\sqrt{a_n^2 + a_s^2}$.',
    full_answer:
      'W dowolnym ruchu krzywoliniowym (w szczególności zmiennym ruchu po okręgu, W2B sl. 49) wektor przyspieszenia całkowitego rozkładamy na dwie wzajemnie **prostopadłe** składowe:\n$$\\vec{a} = \\vec{a}_n + \\vec{a}_s, \\qquad |\\vec{a}| = \\sqrt{a_n^2 + a_s^2} = \\sqrt{\\left(\\frac{v^2}{r}\\right)^2 + (\\varepsilon r)^2}$$\ngdzie:\n- $\\vec{a}_n$ (normalne / dośrodkowe) zmienia **kierunek** prędkości,\n- $\\vec{a}_s$ (styczne) zmienia **wartość** prędkości (zgodne z $\\vec{v}$ przy przyspieszaniu, przeciwne przy hamowaniu).\n\n**Klasyfikacja ruchów ze względu na $(a_n, a_s)$:**\n1. $a_n = 0,\\; a_s = 0$: ruch jednostajny prostoliniowy.\n2. $a_n = 0,\\; a_s \\neq 0$: ruch zmienny prostoliniowy.\n3. $a_n \\neq 0,\\; a_s = 0$: ruch jednostajny krzywoliniowy (np. jednostajny po okręgu).\n4. $a_n \\neq 0,\\; a_s \\neq 0$: ruch zmienny krzywoliniowy (przyspieszony lub opóźniony po okręgu).',
    key_points: [
      'Wzór wektorowy $\\vec{a} = \\vec{a}_n + \\vec{a}_s$ i skalarny $a = \\sqrt{a_n^2 + a_s^2}$ (twierdzenie Pitagorasa!).',
      'Odrębna fizyczna rola $a_n$ (kierunek) i $a_s$ (wartość prędkości).',
      'Kompletna 4-przypadkowa klasyfikacja ruchów wg zerowania się $a_n$ i $a_s$.',
    ],
    common_mistakes:
      'Algebraiczne dodawanie $a = a_n + a_s$ zamiast sumy pitagorejskiej $\\sqrt{a_n^2 + a_s^2}$!',
    lab_connection:
      'Sprawdź wizualnie kąt odchylenia wektora $\\vec{a}$ od promienia na interaktywnym diagramie w Rozdziale 3.',
    svg_diagram_id: 'phys-circular-motion',
  },

  // Rozdział 4 (Zagadnienia 13–17)
  {
    id: 'fiz-q13',
    subject_id: 'fizyka',
    number: 13,
    chapter_id: 'fizyka-ch4',
    category: 'Dynamika i pęd',
    question: 'I, II i III zasada dynamiki Newtona oraz zasada superpozycji sił — sformułowania, postać uogólniona i pułapki',
    short_answer:
      'I zasada definiuje układ inercjalny ($\\sum\\vec{F}=0 \\Rightarrow \\vec{v}=\\text{const}$), II zasada wiąże siłę wypadkową z tempem zmiany pędu $\\vec{F}_w = \\frac{d\\vec{p}}{dt} = m\\vec{a}$, a III zasada mówi o wzajemności oddziaływań $\\vec{F}_{BA} = -\\vec{F}_{AB}$ działających na dwa różne ciała.',
    full_answer:
      '**Zasada superpozycji sił (W3 sl. 12–13):** niezależne siły zastępujemy jedną wektorową sumą $\\vec{F}_w = \\sum_{i=1}^n \\vec{F}_i$.\n\n**Trzy zasady dynamiki Newtona (1687, W3 sl. 14–21):**\n1. **I zasada (bezwładności):** istnieje inercjalny układ odniesienia, w którym jeśli na ciało nie działają siły lub siły się równoważą ($\\sum\\vec{F} = \\vec{0}$), to ciało spoczywa lub porusza się ruchem jednostajnym prostoliniowym ($\\vec{p} = \\text{const}$).\n2. **II zasada:** przyspieszenie jest wprost proporcjonalne do **siły wypadkowej** i odwrotnie proporcjonalne do masy: $\\vec{a} = \\frac{\\vec{F}_w}{m} \\iff \\vec{F}_w = m\\vec{a}$. **Postać uogólniona** (ważna również przy zmiennej masie $m(t)$, np. rakiecie!): $\\vec{F}_w = \\frac{d\\vec{p}}{dt} = \\frac{d(m\\vec{v})}{dt}$.\n3. **III zasada (akcji i reakcji):** jeżeli ciało $A$ działa na $B$ siłą $\\vec{F}_{AB}$, to $B$ działa na $A$ siłą $\\vec{F}_{BA} = -\\vec{F}_{AB}$ (ten sam kierunek i wartość, przeciwny zwrot, **dwa różne ciała**!).\n\n**Najważniejsza pułapka:** siły akcji i reakcji **nigdy się nie równoważą**, ponieważ działają na dwa różne ciała (np. dla książki na stole: ciężar $F_g$ i reakcja stołu $R$ równoważą się z I zasady, ale NIE są parą akcji–reakcji; reakcją do ciężaru książki jest przyciąganie Ziemi przez książkę!).',
    key_points: [
      'Rola I zasady jako definicji **układu inercjalnego**.',
      'W II zasadzie występuje **siła wypadkowa** $\\vec{F}_w = \\sum\\vec{F}_i$ oraz uogólnienie $\\vec{F}_w = d\\vec{p}/dt$.',
      'W III zasadzie siły $\\vec{F}_{AB}$ i $\\vec{F}_{BA}$ są przyłożone do **różnych ciał**, więc nie mogą się wzajemnie znosić.',
    ],
    common_mistakes:
      'Uznawanie pary (ciężar książki, reakcja podłoża) za siły z III zasady Newtona — obie działają na książkę, więc to równowaga sił z I zasady, a nie akcja–reakcja!',
    lab_connection:
      'Podstawa zapisu równań ruchu (np. równowaga sił $F_G - F_W - F_T = 0$ w ćwiczeniu ze Stokesa).',
    svg_diagram_id: 'phys-dynamics-collisions',
  },
  {
    id: 'fiz-q14',
    subject_id: 'fizyka',
    number: 14,
    chapter_id: 'fizyka-ch4',
    category: 'Dynamika i pęd',
    question: 'Siła ciężkości, siła tarcia posuwistego (płaszczyzna i równia pochyła) oraz siła sprężystości (prawo Hooke’a)',
    short_answer:
      'Ciężkość to $F_g = mg = G\\frac{mM}{R^2}$; tarcie posuwiste wynosi $T = fN$ (na równi o kącie $\\alpha$: $N=mg\\cos\\alpha$, $F_s=mg\\sin\\alpha$, więc $a=g(\\sin\\alpha - f\\cos\\alpha)$); prawo Hooke’a opisuje sprężystość $\\vec{F}_s = -k\\vec{x}$.',
    full_answer:
      '**1. Siła ciężkości / grawitacji (W3 sl. 6–7):**\n$$F_g = G\\frac{mM}{R^2} = m\\cdot g \\implies g = G\\frac{M}{R^2} \\approx 9{,}81\\,\\text{m/s}^2$$\n\n**2. Siła tarcia posuwistego i równia pochyła (W3 sl. 8–9):**\nTarcie zawsze przeciwdziała ruchowi (lub próbie ruchu) stykających się powierzchni: $T = f\\cdot N$, gdzie $N$ to siła nacisku prostopadła do podłoża.\nNa **równi pochyłej** o kącie nachylenia $\\alpha$ rozkładamy ciężar $mg$ na składową zsuwającą $F_s = mg\\sin\\alpha$ (równoległą do równi) i nacisk $N = mg\\cos\\alpha$ (prostopadły do równi). Z II zasady Newtona:\n$$m a = F_s - T = mg\\sin\\alpha - f mg\\cos\\alpha \\implies a = g(\\sin\\alpha - f\\cos\\alpha)$$\n*(Zauważ: przyspieszenie na równi **nie zależy od masy $m$**! Warunek rozpoczęcia zsuwania to $F_s > T_{\\max} \\iff \\operatorname{tg}\\alpha > f_s$.)*\n\n**3. Siła sprężystości — prawo Hooke’a (W3 sl. 10–11):**\n$$\\vec{F}_s = -k\\vec{x}$$\ngdzie $k\\,[\\text{N/m}]$ to współczynnik sprężystości. Obowiązuje **wyłącznie dla odkształceń sprężystych** (mikroskopowo wynika z oddziaływań elektrostatycznych Coulomba między atomami). Znak minus oznacza, że siła zawsze dąży do przywrócenia położenia równowagi.',
    key_points: [
      'Zależność $T = fN$ z wyraźnym rozróżnieniem nacisku $N$ od ciężaru $mg$ (na równi $N = mg\\cos\\alpha \\neq mg$!).',
      'Wyprowadzenie przyspieszenia na równi $a = g(\\sin\\alpha - f\\cos\\alpha)$ i kąta tarcia $\\operatorname{tg}\\alpha_{\\text{gran}} = f_s$.',
      'Prawo Hooke’a $\\vec{F}_s = -k\\vec{x}$ — sens znaku minus i zakres stosowalności (odkształcenia sprężyste).',
    ],
    common_mistakes:
      'Przyjmowanie $N = mg$ na równi pochyłej lub przy ciągnięciu klocka siłą pod kątem; zamiana $\\sin\\alpha$ z $\\cos\\alpha$ (sprawdź granicę $\\alpha \\to 0$: $F_s$ musi maleć do $0$, więc musi mieć $\\sin\\alpha$!).',
    lab_connection:
      'Interaktywny symulator równi pochyłej w Laboratorium Fizyki (Zakładka 2) natychmiast przelicza $F_s, N, T, a$ i próg poślizgu.',
    svg_diagram_id: 'phys-dynamics-collisions',
  },
  {
    id: 'fiz-q15',
    subject_id: 'fizyka',
    number: 15,
    chapter_id: 'fizyka-ch4',
    category: 'Dynamika i pęd',
    question: 'Definicja pędu $\\vec{p} = m\\vec{v}$, wyprowadzenie zasady zachowania pędu (1D i 3D) oraz zjawisko odrzutu',
    short_answer:
      'Pęd to wektor $\\vec{p}=m\\vec{v}\\,[\\text{kg}\\cdot\\text{m/s}]$. Jeśli wypadkowa sił zewnętrznych jest zerowa ($\\vec{F}_{\\text{zew}}=0$), to z II i III zasady Newtona całkowity pęd układu pozostaje stały: $\\vec{P} = \\sum\\vec{p}_i = \\text{const}$.',
    full_answer:
      '**Pęd punktu materialnego (W3 sl. 20–24, 29–31):**\n$$\\vec{p} = m\\vec{v} \\quad \\left[\\text{kg}\\cdot\\frac{\\text{m}}{\\text{s}} = \\text{N}\\cdot\\text{s}\\right]$$\nKierunek i zwrot pędu pokrywają się z prędkością $\\vec{v}$.\n\n**Wyprowadzenie zasady zachowania pędu dla układu izolowanego dwóch ciał:**\nNiech ciała oddziałują siłami wewnętrznymi $\\vec{F}_{12}$ i $\\vec{F}_{21}$. Z uogólnionej II zasady Newtona $\\vec{F}_{12} = \\frac{d\\vec{p}_1}{dt}$ oraz $\\vec{F}_{21} = \\frac{d\\vec{p}_2}{dt}$, a z III zasady $\\vec{F}_{21} = -\\vec{F}_{12}$. Zatem:\n$$\\frac{d\\vec{p}_1}{dt} + \\frac{d\\vec{p}_2}{dt} = \\frac{d}{dt}(\\vec{p}_1 + \\vec{p}_2) = \\vec{F}_{12} + \\vec{F}_{21} = \\vec{0} \\implies \\vec{P} = \\vec{p}_1 + \\vec{p}_2 = \\text{const}$$\nW 3D zasada działa niezależnie dla każdej osi: $F_x=0 \\Rightarrow p_x=\\text{const}$, $F_y=0 \\Rightarrow p_y=\\text{const}$, $F_z=0 \\Rightarrow p_z=\\text{const}$.\n\n**Zjawisko odrzutu (W3 sl. 29 „My–Sanki”):** przy starcie ze spoczynku ($\\vec{P}_p = \\vec{0}$) odepchnięcie sanek masy $m_1$ z prędkością $v_1$ w prawo nadaje człowiekowi masy $m_2$ prędkość $v_2 = -\\frac{m_1}{m_2}v_1$ w lewo (ta sama zasada napędza rakiety w próżni!).',
    key_points: [
      'Wektorowy charakter pędu $\\vec{p} = m\\vec{v}$ i jego jednostka $\\text{kg}\\cdot\\text{m/s}$.',
      'Pełny 3-linijkowy dowód z II i III zasady Newtona ($\\frac{d}{dt}(\\vec{p}_1+\\vec{p}_2)=\\vec{0}$).',
      'Uniwersalność zasady zachowania pędu (działa w skali makro i mikroskopowej, także przy zderzeniach niesprężystych!).',
    ],
    common_mistakes:
      'Pomijanie znaków (zwrotów wektorów!) w równaniu zachowania pędu 1D — pęd jest wektorem, więc ruch w lewo ma przeciwny znak do ruchu w prawo!',
    lab_connection:
      'Zasada zachowania pędu jest punktem wyjścia dla obu typów zderzeń w kolejnym zagadnieniu i w Laboratorium Fizyki.',
    svg_diagram_id: 'phys-dynamics-collisions',
  },
  {
    id: 'fiz-q16',
    subject_id: 'fizyka',
    number: 16,
    chapter_id: 'fizyka-ch4',
    category: 'Dynamika i pęd',
    question: 'Zderzenia idealnie niesprężyste — wyprowadzenie prędkości końcowej $v_k$ oraz bilans straty energii kinetycznej',
    short_answer:
      'W zderzeniu idealnie niesprężystym ciała łączą się i poruszają dalej razem z prędkością $v_k = \\frac{m_1 v_{1p}+m_2 v_{2p}}{m_1+m_2}$ (średnia ważona masami). Pęd jest zachowany, lecz część energii kinetycznej ulega rozproszeniu na ciepło i deformację.',
    full_answer:
      '**Zderzenie idealnie niesprężyste (W3 sl. 25):** po zderzeniu oba ciała złączają się i mają wspólną prędkość końcową $v_{1k} = v_{2k} = v_k$. Z zasady zachowania pędu (układ izolowany):\n$$m_1 v_{1p} + m_2 v_{2p} = (m_1 + m_2) v_k \\implies v_k = \\frac{m_1 v_{1p} + m_2 v_{2p}}{m_1 + m_2}$$\nPrędkość końcowa jest średnią ważoną prędkości początkowych z wagami równymi masom (pamiętając o znakach wektorowych — przy zderzeniu czołowym $v_{2p} < 0$!).\n\n**Bilans energii kinetycznej:** w zderzeniu niesprężystym energia kinetyczna **maleje** ($E_{k,\\text{końc}} < E_{k,\\text{pocz}}$), a strata $\\Delta E_k = E_{k,\\text{pocz}} - E_{k,\\text{końc}} = \\frac{1}{2}\\frac{m_1 m_2}{m_1+m_2}(v_{1p} - v_{2p})^2 > 0$ zamienia się w energię wewnętrzną (ciepło, dźwięk, trwałe odkształcenie). Przykład: wbicie pocisku w wahadło balistyczne lub złączenie dwóch wagonów kolejowych.',
    key_points: [
      'Warunek definicyjny: $v_{1k} = v_{2k} = v_k$ oraz zachowanie pędu.',
      'Wzór $v_k = \\frac{m_1 v_{1p}+m_2 v_{2p}}{m_1+m_2}$ z uwzględnieniem zwrotów prędkości.',
      'Fakt, że pęd jest zachowany, ale **energia kinetyczna NIE jest zachowana** (maksymalna strata $E_k$ możliwa przy zachowaniu pędu).',
    ],
    common_mistakes:
      'Próba stosowania zasady zachowania energii kinetycznej do zderzenia niesprężystego; dodawanie modułów zamiast wektorów przy zderzeniu czołowym.',
    lab_connection:
      'Kalkulator zderzeń 1D w Laboratorium Fizyki (Zakładka 2) wylicza $v_k$ oraz procent utraconej energii kinetycznej.',
    svg_diagram_id: 'phys-dynamics-collisions',
  },
  {
    id: 'fiz-q17',
    subject_id: 'fizyka',
    number: 17,
    chapter_id: 'fizyka-ch4',
    category: 'Dynamika i pęd',
    question: 'Zderzenia idealnie sprężyste 1D — pełne wyprowadzenie wzorów na $v_{1k}$ i $v_{2k}$ oraz przypadki szczególne',
    short_answer:
      'W zderzeniu idealnie sprężystym zachowane są jednocześnie pęd i energia kinetyczna. Dzieląc równanie energii przez równanie pędu uzyskujemy $v_{1k}-v_{2k}=-(v_{1p}-v_{2p})$, skąd wyznaczamy jawne wzory na $v_{1k}$ i $v_{2k}$.',
    full_answer:
      '**Wyprowadzenie (W3 sl. 26–28):**\nZapisujemy zasadę zachowania pędu oraz zasadę zachowania energii kinetycznej (po pomnożeniu przez 2 i pogrupowaniu mas):\n$$\\begin{cases} m_1(v_{1k} - v_{1p}) = m_2(v_{2p} - v_{2k}) \\\\ m_1(v_{1k} - v_{1p})(v_{1k} + v_{1p}) = m_2(v_{2p} - v_{2k})(v_{2p} + v_{2k}) \\end{cases}$$\nZakładając, że doszło do zderzenia ($v_{1k} \\neq v_{1p}$), dzielimy drugie równanie stronami przez pierwsze:\n$$v_{1k} + v_{1p} = v_{2p} + v_{2k} \\iff v_{1k} - v_{2k} = -v_{1p} + v_{2p}$$\n*(Sens fizyczny: prędkość względna oddalania po zderzeniu równa się prędkości względnej zbliżania przed zderzeniem!)*\nRozwiązując układ liniowy z równaniem pędu (mnożąc drugie równanie przez $m_2$ lub $-m_1$), otrzymujemy:\n$$v_{1k} = \\frac{m_1 - m_2}{m_1 + m_2} v_{1p} + \\frac{2m_2}{m_1 + m_2} v_{2p}, \\qquad v_{2k} = \\frac{m_2 - m_1}{m_1 + m_2} v_{2p} + \\frac{2m_1}{m_1 + m_2} v_{1p}$$\n**Przypadki szczególne:**\n- $m_1 = m_2$: **wymiana prędkości** ($v_{1k} = v_{2p}$, $v_{2k} = v_{1p}$).\n- $m_2 \\gg m_1,\\; v_{2p} = 0$ (ściana): $v_{1k} \\approx -v_{1p}$, $v_{2k} \\approx 0$.\n- $m_1 \\gg m_2,\\; v_{2p} = 0$ (ciężarówka uderza w stojącą piłkę): $v_{1k} \\approx v_{1p}$, $v_{2k} \\approx 2v_{1p}$!',
    key_points: [
      'Sztuczka algebraiczna: rozkład różnicy kwadratów $v_{1k}^2 - v_{1p}^2 = (v_{1k}-v_{1p})(v_{1k}+v_{1p})$ i podział stronami.',
      'Równanie prędkości względnej $v_{1k} - v_{2k} = -(v_{1p} - v_{2p})$.',
      'Kompletne wzory końcowe na $v_{1k}$ i $v_{2k}$ oraz 3 przypadki graniczne ($m_1=m_2$, $m_2 \\gg m_1$, $m_1 \\gg m_2$).',
    ],
    common_mistakes:
      'Pomylenie znaków w licznikach $(m_1 - m_2)$ vs $(m_2 - m_1)$ lub próba rozwiązywania układu kwadratowego bez dzielenia stronami (niepotrzebnie skomplikowane rachunki).',
    lab_connection:
      'Przetestuj wszystkie 3 przypadki graniczne (w tym $v_{2k} \\approx 2v_{1p}$) w Laboratorium Fizyki (Zakładka 2).',
    svg_diagram_id: 'phys-dynamics-collisions',
  },

  // Rozdział 5 (Zagadnienia 18–20)
  {
    id: 'fiz-q18',
    subject_id: 'fizyka',
    number: 18,
    chapter_id: 'fizyka-ch5',
    category: 'Laboratorium i pomiary',
    question: 'Opracowanie małej serii pomiarów: średnia arytmetyczna, odchylenie standardowe średniej $s(\\bar{x})$, współczynnik Studenta–Fishera $t_n$ i reguły zaokrąglania',
    short_answer:
      'Dla małej serii $n$ pomiarów niepewność średniej wynosi $\\Delta\\bar{x} = t_n\\sqrt{\\frac{\\sum(x_i-\\bar{x})^2}{n(n-1)}}$, gdzie $t_n$ to współczynnik Studenta–Fishera (np. $t_3=1{,}3$ dla $p=68{,}3\\%$). Niepewność zaokrąglamy do 1–2 cyfr znaczących, a wynik do tego samego miejsca po przecinku.',
    full_answer:
      'W laboratorium fizyki (wg podręcznika Szuby) dla serii $n$ powtórzeń bezpośredniego pomiaru $x_1, \\dots, x_n$ wyznaczamy:\n1. **Średnią arytmetyczną:** $\\bar{x} = \\frac{1}{n}\\sum_{i=1}^n x_i$.\n2. **Odchylenie standardowe średniej:**\n$$s(\\bar{x}) = \\sqrt{\\frac{\\sum_{i=1}^n (x_i - \\bar{x})^2}{n(n-1)}}$$\n*(Zwróć uwagę na $n(n-1)$ w mianowniku: $s(x)$ pojedynczego pomiaru ma $n-1$, a średniej jest $\\sqrt{n}$ razy mniejsze!)*\n3. **Korektę Studenta–Fishera dla małych prób:** $\\Delta\\bar{x} = t_n \\cdot s(\\bar{x})$ (dla $p=68{,}3\\%$: $t_3 = 1{,}3$, $t_4 = 1{,}2$, $t_5 = 1{,}15$).\n4. **Reguły zapisu końcowego $x \\pm \\Delta x$:**\n   - Jeśli pierwsza niezerowa cyfra $\\Delta x$ to $1, 2$ lub $3$ (czasem wg normy tylko $1$ lub $2$), zostawiamy **2 cyfry znaczące** (np. $0{,}018$); dla cyfr $4\\text{–}9$ (albo $3\\text{–}9$) zaokrąglamy do **1 cyfry znaczącej** (zawsze w górę/zgodnie z konwencją).\n   - Wartość główną $\\bar{x}$ zaokrąglamy **dokładnie do tej samej pozycji dziesiętnej** co $\\Delta x$ (np. $0{,}750 \\pm 0{,}018$, nigdy $0{,}7496 \\pm 0{,}02$!).',
    key_points: [
      'Dokładny wzór na $s(\\bar{x})$ z mianownikiem $n(n-1)$ oraz mnożenie przez $t_n$.',
      'Rozróżnienie niepewności typu A (statystycznej z serii) od typu B (granicznej z działki przyrządu).',
      'Zgodność miejsc po przecinku między wynikiem końcowym $\\bar{x}$ a jego niepewnością $\\Delta\\bar{x}$.',
    ],
    common_mistakes:
      'Dzielenie przez $n^2$ zamiast $n(n-1)$; zapisywanie wyniku z większą liczbą cyfr niż pozwala niepewność (np. `0,74963 ± 0,02`).',
    lab_connection:
      'Kalkulator niepewności w Laboratorium Fizyki (Zakładka 3) automatycznie wylicza $\\bar{x}, s(\\bar{x}), \\Delta\\bar{x}$ i zaokrąglony zapis.',
    svg_diagram_id: 'phys-lab-uncertainty',
  },
  {
    id: 'fiz-q19',
    subject_id: 'fizyka',
    number: 19,
    chapter_id: 'fizyka-ch5',
    category: 'Laboratorium i pomiary',
    question: 'Propagacja niepewności pomiarowych: metoda różniczki zupełnej oraz metoda różniczki logarytmicznej',
    short_answer:
      'Gdy wielkość $y=f(x_1,\\dots,x_m)$ wyznaczamy pośrednio, maksymalną niepewność daje różniczka zupełna $\\Delta y = \\sum |\\frac{\\partial f}{\\partial x_i}|\\Delta x_i$. Dla wzorów iloczynowo-ilorazowych znacznie szybsza jest różniczka logarytmiczna dająca błąd względny $\\frac{\\Delta y}{y}$.',
    full_answer:
      '**1. Metoda różniczki zupełnej (uniwersalna):**\n$$\\Delta y = \\left|\\frac{\\partial f}{\\partial x_1}\\right|\\Delta x_1 + \\left|\\frac{\\partial f}{\\partial x_2}\\right|\\Delta x_2 + \\dots + \\left|\\frac{\\partial f}{\\partial x_m}\\right|\\Delta x_m$$\nWszystkie wyrazy bierzemy z **wartością bezwzględną** (pesymistyczne nakładanie się błędów — nigdy się nie odejmują!).\n\n**2. Metoda różniczki logarytmicznej (dla iloczynów, ilorazów i potęg):**\nDla $y = C \\cdot \\frac{a^p b^q}{c^r}$ logarytmujemy stronami ($\\ln y = \\ln C + p\\ln a + q\\ln b - r\\ln c$), różniczkujemy ($\\frac{dy}{y} = p\\frac{da}{a} + q\\frac{db}{b} - r\\frac{dc}{c}$) i zastępujemy znaki wartościami bezwzględnymi:\n$$\\frac{\\Delta y}{y} = |p|\\frac{\\Delta a}{a} + |q|\\frac{\\Delta b}{b} + |r|\\frac{\\Delta c}{c}$$\n**Przykład laboratoryjny (wiskozymetr Höplera $\\eta = K(d_k - d_c)t$):**\n$$\\frac{\\Delta\\eta}{\\eta} = \\frac{\\Delta K}{K} + \\frac{\\Delta d_k + \\Delta d_c}{d_k - d_c} + \\frac{\\Delta t}{t}$$\nZauważ kluczowy detal w różnicy $(d_k - d_c)$: niepewność różnicy to **suma** $\\Delta d_k + \\Delta d_c$!',
    key_points: [
      'Dlaczego wszystkie pochodne cząstkowe bierzemy w wartości bezwzględnej (błędy nie mogą się wzajemnie kasować).',
      'Szybka reguła dla różniczki logarytmicznej: wykładnik schodzi przed błąd względny z wartością bezwzględną.',
      'Dla sumy i różnicy $(a \\pm b)$ niepewność bezwzględna to zawsze $\\Delta a + \\Delta b$.',
    ],
    common_mistakes:
      'Pozostawianie znaku minus w różniczce logarytmicznej (np. odejmowanie $\\Delta t_0 / t_0$ zamiast dodawania!), co zaniża niepewność.',
    lab_connection:
      'Kalkulator różniczki logarytmicznej w Laboratorium Fizyki (Zakładka 3) pokazuje rozpisany udział każdego czynnika w błędzie względnym.',
    svg_diagram_id: 'phys-lab-uncertainty',
  },
  {
    id: 'fiz-q20',
    subject_id: 'fizyka',
    number: 20,
    chapter_id: 'fizyka-ch5',
    category: 'Laboratorium i pomiary',
    question: 'Lepkość cieczy: prawo Newtona, prawo Stokesa, równowaga opadającej kulki (Höpler) oraz linearyzacja równania Andrade',
    short_answer:
      'Z równowagi sił $F_G - F_W - F_T = 0$ (ciężar, wypór Archimedesa, opór Stokesa $6\\pi\\eta rv$) wynika $\\eta = \\frac{2(d_k-d_c)gr^2 t}{9l}$. Zależność $\\eta(T)=Ae^{B/T}$ linearyzujemy jako $\\ln\\eta = \\ln A + B\\cdot(1/T)$, wyznaczając energię aktywacji $E_a = BR$.',
    full_answer:
      '**1. Prawo tarcia wewnętrznego Newtona i prawo Stokesa:**\nSiła tarcia między warstwami płynu wynosi $F_T = \\eta S \\frac{dv}{dz}$ (jednostka $[\\eta] = \\text{Pa}\\cdot\\text{s} = \\frac{\\text{kg}}{\\text{m}\\cdot\\text{s}}$). Dla kulki o promieniu $r$ poruszającej się laminarnie z prędkością $v$ działa siła oporu **Stokesa**: $F_T = 6\\pi\\eta r v$.\n\n**2. Równowaga dynamiczna opadającej kulki:**\nW ruchu jednostajnym ($F_w = 0$) ciężar kulki $F_G = \\frac{4}{3}\\pi r^3 d_k g$ równoważony jest przez wypór Archimedesa $F_W = \\frac{4}{3}\\pi r^3 d_c g$ oraz opór Stokesa:\n$$6\\pi\\eta r \\frac{l}{t} = \\frac{4}{3}\\pi r^3 (d_k - d_c)g \\implies \\eta = \\frac{2(d_k - d_c) g r^2 t}{9l}$$\nW wiskozymetrze Höplera czynniki geometryczne i kąt pochylenia tuby ($10^\\circ$) zastępuje stała kalibracyjna $K$ wyznaczana w temperaturze odniesienia $T_0$: $\\eta = K(d_k - d_c)t$.\n\n**3. Temperaturowa zależność lepkości cieczy (równanie Andrade / Arrheniusa):**\nZe wzrostem temperatury energia kinetyczna cząsteczek rośnie i łatwiej pokonują bariery międzycząsteczkowe, więc lepkość cieczy maleje wykładniczo:\n$$\\eta(T) = A\\exp\\!\\left(\\frac{B}{T}\\right) \\iff \\ln\\eta = \\ln A + B\\cdot\\frac{1}{T}$$\nZ nachylenia prostej $B$ (w układzie $1/T$ w $\\text{K}^{-1}$!) obliczamy energię aktywacji lepkiego przepływu $E_a = B \\cdot R$ ($R = 8{,}314\\,\\text{J/(mol}\\cdot\\text{K)}$).',
    key_points: [
      'Równowaga trzech sił: $F_G = F_W + F_T$ i pełne wyprowadzenie wzoru Stokesa na $\\eta$.',
      'Jednostka lepkości dynamicznej: $1\\,\\text{Pa}\\cdot\\text{s} = 1\\,\\text{N}\\cdot\\text{s/m}^2 = 1\\,\\text{kg/(m}\\cdot\\text{s)}$.',
      'Przeliczenie temperatury na **kelwiny** ($T[\\text{K}] = t[^\\circ\\text{C}] + 273{,}15$) przed linearyzacją Andrade $\\ln\\eta = \\ln A + B/T$!',
      'Przeciwny kierunek zmian $\\eta(T)$ dla cieczy (maleje) i gazów (rośnie wraz z $T$).',
    ],
    common_mistakes:
      'Wstawianie temperatury w stopniach Celsjusza zamiast kelwinów do równania Andrade $\\exp(B/T)$; pomijanie siły wyporu Archimedesa $F_W$ (wstawienie samego $d_k$ zamiast $d_k - d_c$).',
    lab_connection:
      'Interaktywny wykres krzywej $\\eta(T)$ i prostej Andrade znajduje się w Rozdziale 5 (`phys-lab-uncertainty`).',
    svg_diagram_id: 'phys-lab-uncertainty',
  },
];
