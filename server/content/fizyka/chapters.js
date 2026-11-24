// Fizyka — Rozdziały 1–5
// Źródło: Wykłady prowadzącego (Instytut Fizyki, WIMiFT PP):
// Wykład 1 (Wektory), Wykład 2A/2B (Kinematyka), Wykład 3 (Dynamika) + Laboratorium Fizyki WIMiFT PP

export const FIZYKA_CHAPTERS = [
  {
    id: 'fizyka-ch1',
    subject_id: 'fizyka',
    order_index: 1,
    slug: 'uklad-si-analiza-wymiarowa-wektory',
    title: 'Rozdział 1: Układ SI, analiza wymiarowa i rachunek wektorowy',
    subtitle: 'Wykład 1: wielkości skalarne i wektorowe, nowoczesny układ SI, przeliczanie jednostek, iloczyn skalarny i wektorowy',
    lecture_ref: 'Wykład 1 · slajdy 1–29',
    estimated_minutes: 40,
    summary:
      'Matematyka jako język fizyki (pochodna i całka), podział wielkości fizycznych na skalary i wektory, redefinicja układu SI oparta na stałych fundamentalnych (c, h, Δν_Cs), przedrostki i analiza wymiarowa oraz pełny rachunek wektorowy w 3D: składowe, długość, dodawanie, odejmowanie, iloczyn skalarny i iloczyn wektorowy (wyznacznik 3×3).',
    exam_questions: [1, 2, 3, 4],
    key_takeaways: [
      '**Skalar** opisuje wyłącznie wartość liczbową z jednostką (np. masa, czas, temperatura, energia), natomiast **wektor** posiada wartość (długość), kierunek, zwrot oraz punkt zaczepienia (np. położenie, prędkość, przyspieszenie, siła, pęd).',
      'Współczesny **układ SI (od 2019 r.)** definiuje wszystkie 7 jednostek podstawowych przez stałe fizyczne: metr przez prędkość światła $c = 299\\,792\\,458\\,\\text{m/s}$, a kilogram przez stałą Plancka $h = 6{,}626\\,070\\,15 \\cdot 10^{-34}\\,\\text{J}\\cdot\\text{s}$ (zastępując dawny walec Pt–Ir z Sèvres).',
      '**Iloczyn skalarny** $\\vec{a}\\cdot\\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\alpha = a_x b_x + a_y b_y + a_z b_z$ daje **SKALAR**, jest przemienny i zeruje się dla wektorów **prostopadłych** ($\\alpha = 90^\\circ$).',
      '**Iloczyn wektorowy** $\\vec{a}\\times\\vec{b}$ daje **WEKTOR** prostopadły do obu czynników o długości $|\\vec{a}||\\vec{b}|\\sin\\alpha$, jest **antyprzemienny** ($\\vec{a}\\times\\vec{b} = -\\vec{b}\\times\\vec{a}$) i zeruje się dla wektorów **równoległych** ($\\alpha = 0^\\circ$ lub $180^\\circ$).',
    ],
    sections: [
      {
        id: 'fiz-1-1',
        heading: '1.1. Matematyka jako język fizyki, wielkości fizyczne i układ SI',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Wielkości skalarne vs wektorowe i narzędzia analizy (Wykład 1, sl. 3–9)',
            text: 'Fizyka opisuje zjawiska językiem matematyki, wykorzystując dwa kluczowe pojęcia rachunku różniczkowego i całkowego:\n- **Pochodna** $\\frac{df(x)}{dx} = \\lim_{\\Delta x \\to 0}\\frac{f(x+\\Delta x)-f(x)}{\\Delta x} = \\operatorname{tg}\\alpha$ wyraża *chwilową szybkość zmian* wielkości (np. $v = \\frac{dx}{dt}$, $a = \\frac{dv}{dt}$).\n- **Całka oznaczona** $\\int_a^b f(x)\\,dx = F(b) - F(a)$ wyznacza *skumulowany efekt* w przedziale czasu/przestrzeni (np. droga jako pole pod wykresem $v(t)$, praca jako pole pod $F(x)$).\n\nKażdy wynik pomiaru wielkości fizycznej zapisujemy jako **wartość liczbową wraz z niepewnością i jednostką**.',
          },
          {
            type: 'table',
            headers: ['Wielkość podstawowa SI', 'Jednostka (symbol)', 'Podstawa definicji (SI 2019, W1 sl. 10–14)'],
            rows: [
              ['Długość', 'metr (`m`)', 'Droga światła w próżni w czasie $\\frac{1}{299\\,792\\,458}\\,\\text{s}$'],
              ['Masa', 'kilogram (`kg`)', 'Ustalona stała Plancka $h = 6{,}626\\,070\\,15\\cdot 10^{-34}\\,\\text{J}\\cdot\\text{s}$ (dawniej prototyp Pt–Ir)'],
              ['Czas', 'sekunda (`s`)', '$9\\,192\\,631\\,770$ okresów promieniowania przejścia nadsubtelnego atomu $^{133}\\text{Cs}$'],
              ['Prąd elektryczny', 'amper (`A`)', 'Ustalony ładunek elementarny $e = 1{,}602\\,176\\,634\\cdot 10^{-19}\\,\\text{C}$'],
              ['Temperatura termodyn.', 'kelwin (`K`)', 'Ustalona stała Boltzmanna $k_B = 1{,}380\\,649\\cdot 10^{-23}\\,\\text{J/K}$'],
              ['Liczność materii / światłość', 'mol (`mol`) / kandela (`cd`)', 'Stała Avogadra $N_A$ oraz skuteczność świetlna $K_{\\text{cd}}$'],
            ],
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykład 1.1 (Wykład 1, sl. 17): Przeliczanie jednostek i analiza wymiarowa',
            text: '1. **Prędkość** ($\\text{km/h} \\leftrightarrow \\text{m/s}$, czynnik $3{,}6$):\n$$36\\,\\frac{\\text{km}}{\\text{h}} = \\frac{36 \\cdot 1000\\,\\text{m}}{3600\\,\\text{s}} = 10\\,\\frac{\\text{m}}{\\text{s}}$$\n2. **Gęstość** ($\\text{g/cm}^3 \\to \\text{kg/m}^3$, uwaga na potęgowanie przedrostka $(10^{-2})^3 = 10^{-6}$!):\n$$10\\,\\frac{\\text{g}}{\\text{cm}^3} = \\frac{10 \\cdot 10^{-3}\\,\\text{kg}}{(10^{-2}\\,\\text{m})^3} = \\frac{10^{-2}}{10^{-6}}\\,\\frac{\\text{kg}}{\\text{m}^3} = 10\\cdot 10^3\\,\\frac{\\text{kg}}{\\text{m}^3} = 10\\,000\\,\\frac{\\text{kg}}{\\text{m}^3}$$\n**Analiza wymiarowa** pozwala natychmiast wykryć błędy we wzorach: po obu stronach równania fizycznego muszą stać identyczne wymiary (np. $[v] = \\text{m/s}$, $[a\\cdot t] = \\frac{\\text{m}}{\\text{s}^2}\\cdot\\text{s} = \\text{m/s}$).',
          },
        ],
      },
      {
        id: 'fiz-1-2',
        heading: '1.2. Wektory w 3D, wersory, dodawanie i rozkład na składowe',
        blocks: [
          {
            type: 'paragraph',
            text: 'Dla punktów $A=(x_1,y_1,z_1)$ i $B=(x_2,y_2,z_2)$ wektor $\\vec{W}_{AB}$ zapisujemy w postaci współrzędnych lub kombinacji wersorów osi $\\hat{i}, \\hat{j}, \\hat{k}$ (W1 sl. 20–24):',
          },
          {
            type: 'math',
            tex: '\\vec{W}_{AB} = [x_2 - x_1,\\; y_2 - y_1,\\; z_2 - z_1] = x\\hat{i} + y\\hat{j} + z\\hat{k}, \\qquad |\\vec{W}_{AB}| = \\sqrt{x^2 + y^2 + z^2}',
            caption: 'Współrzędne wektora od A do B oraz jego moduł (długość euklidesowa).',
          },
          {
            type: 'list',
            items: [
              '**Dodawanie i odejmowanie:** $\\vec{a} \\pm \\vec{b} = [a_x \\pm b_x,\\; a_y \\pm b_y,\\; a_z \\pm b_z]$ (geometrycznie: metoda trójkąta lub równoległoboku; odejmowanie to dodanie wektora przeciwnego $\\vec{a} + (-\\vec{b})$).',
              '**Rozkład wektora 2D na składowe** pod kątem $\\alpha$ do osi $OX$: $a_x = |\\vec{a}|\\cos\\alpha$, $a_y = |\\vec{a}|\\sin\\alpha$, przy czym $|\\vec{a}| = \\sqrt{a_x^2 + a_y^2}$ oraz $\\operatorname{tg}\\alpha = a_y / a_x$.',
              '**Mnożenie wektora przez skalar $\\lambda \\in \\mathbb{R}$:** $\\lambda\\vec{b} = [\\lambda b_x, \\lambda b_y, \\lambda b_z]$ — wynikiem jest **WEKTOR** o długości $|\\lambda|\\cdot|\\vec{b}|$ (dla $\\lambda < 0$ odwraca się zwrot).',
            ],
          },
        ],
      },
      {
        id: 'fiz-1-3',
        heading: '1.3. Iloczyn skalarny i iloczyn wektorowy (z wyznacznika 3×3)',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Dwa rodzaje mnożenia wektorów (Wykład 1, sl. 25–27)',
            text: '**1. Iloczyn skalarny (wynik: SKALAR):**\n$$\\vec{a}\\cdot\\vec{b} = |\\vec{a}|\\,|\\vec{b}|\\cos\\angle(\\vec{a},\\vec{b}) = a_x b_x + a_y b_y + a_z b_z$$\nWłasności: **przemienny** ($\\vec{a}\\cdot\\vec{b} = \\vec{b}\\cdot\\vec{a}$), rozdzielny względem dodawania, $(\\alpha\\vec{a})\\cdot\\vec{b} = \\alpha(\\vec{a}\\cdot\\vec{b})$. Warunek prostopadłości: $\\vec{a} \\perp \\vec{b} \\iff \\vec{a}\\cdot\\vec{b} = 0$ (bo $\\cos 90^\\circ = 0$). Zastosowanie w fizyce: praca $W = \\vec{F}\\cdot\\Delta\\vec{r}$.\n\n**2. Iloczyn wektorowy (wynik: WEKTOR $\\vec{c} \\perp \\vec{a}$ i $\\vec{c} \\perp \\vec{b}$):**\n$$|\\vec{a}\\times\\vec{b}| = |\\vec{a}|\\,|\\vec{b}|\\sin\\angle(\\vec{a},\\vec{b}) \\quad \\text{(pole równoległoboku!)}$$\n$$\\vec{a}\\times\\vec{b} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ a_x & a_y & a_z \\\\ b_x & b_y & b_z \\end{vmatrix} = [a_y b_z - a_z b_y,\\; a_z b_x - a_x b_z,\\; a_x b_y - a_y b_x]$$\nWłasności: **antyprzemienny** ($\\vec{a}\\times\\vec{b} = -\\vec{b}\\times\\vec{a}$), zeruje się dla wektorów równoległych ($\\sin 0^\\circ = 0$). Zwrot wyznacza reguła prawej dłoni / śruby prawoskrętnej. Zastosowanie: $\\vec{v} = \\vec{\\omega}\\times\\vec{r}$, moment siły $\\vec{M} = \\vec{r}\\times\\vec{F}$.',
          },
          {
            type: 'callout',
            variant: 'warning',
            title: 'Uwaga na literówkę na slajdzie 27 (Wykład 1)!',
            text: 'Na slajdzie 27 w punkcie ćwiczeniowym wydrukowano: „wykaż nieprzemienność iloczynu skalarnego”. Jest to drobna literówka redakcyjna — **iloczyn skalarny jest przemienny** ($\\vec{a}\\cdot\\vec{b} = \\vec{b}\\cdot\\vec{a}$), a **nieprzemienny (antyprzemienny) jest iloczyn wektorowy** ($\\vec{a}\\times\\vec{b} = -\\vec{b}\\times\\vec{a}$)!',
          },
          {
            type: 'svg',
            diagramId: 'phys-vectors-3d',
            title: 'Interaktywny kalkulator i wizualizacja wektorów: składowe, suma, iloczyn skalarny i wektorowy',
            caption: 'Zmieniaj składowe wektorów a i b, aby obserwować kąt między nimi, rzut skalarny oraz pole równoległoboku |a × b|.',
          },
        ],
      },
    ],
  },
  {
    id: 'fizyka-ch2',
    subject_id: 'fizyka',
    order_index: 2,
    slug: 'kinematyka-prostoliniowa-rzuty',
    title: 'Rozdział 2: Kinematyka ruchu prostoliniowego, rzuty i transformacja Galileusza',
    subtitle: 'Wykład 2A: wektor wodzący, droga vs przemieszczenie, pochodne v(t) i a(t), ruch jednostajnie zmienny i rzuty',
    lecture_ref: 'Wykład 2A · slajdy 1–35',
    estimated_minutes: 45,
    summary:
      'Opis geometryczny ruchu punktu materialnego: wektor wodzący r(t), różnica między wektorem przemieszczenia Δr a drogą skalarną s, prędkość i przyspieszenie chwilowe jako pierwsza i druga pochodna położenia, wyprowadzenie równań ruchu jednostajnie zmiennego przez całkowanie, rzuty w jednorodnym polu grawitacyjnym (g = 9,80665 m/s²) oraz składanie prędkości Galileusza.',
    exam_questions: [5, 6, 7, 8],
    key_takeaways: [
      '**Przemieszczenie** $\\Delta\\vec{r} = \\vec{r}_2 - \\vec{r}_1$ jest wektorem zależnym tylko od punktu startu i mety (po powrocie do startu $\\Delta\\vec{r} = \\vec{0}$!), a **droga** $s$ jest zawsze nieujemnym skalarem równym długości całego toru.',
      'Prędkość chwilowa to $\\vec{v}(t) = \\frac{d\\vec{r}}{dt}$, a przyspieszenie chwilowe to $\\vec{a}(t) = \\frac{d\\vec{v}}{dt} = \\frac{d^2\\vec{r}}{dt^2}$. Wzór $v_{\\text{śr}} = \\frac{v_1+v_2}{2}$ działa **tylko** w ruchu jednostajnie zmiennym; ogólnie zawsze $v_{\\text{śr}} = \\frac{\\sum s_i}{\\sum t_i}$!',
      'Całkowanie stałego przyspieszenia $a = \\text{const}$ daje $v(t) = v_0 + at$ oraz $x(t) = x_0 + v_0 t + \\frac{1}{2}at^2$ (skąd bezczasowy wzór $v^2 - v_0^2 = 2a\\Delta x$).',
      '**Rzut ukośny** rozkładamy na dwa niezależne ruchy: jednostajny w poziomie ($x(t)=v_0\\cos\\alpha\\cdot t$) i jednostajnie zmienny w pionie ($y(t)=h_0 + v_0\\sin\\alpha\\cdot t - \\frac{1}{2}gt^2$); maksymalny zasięg z $h_0=0$ zachodzi dla $\\alpha = 45^\\circ$.',
    ],
    sections: [
      {
        id: 'fiz-2-1',
        heading: '2.1. Punkt materialny, wektor wodzący, przemieszczenie vs droga',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Podstawowe pojęcia kinematyki (Wykład 2A, sl. 2–16)',
            text: '**Kinematyka** bada geometryczny aspekt ruchu ciał w czasie *bez* uwzględniania ich masy i działających sił. **Punkt materialny** to wyidealizowany model ciała o masie skupionej w punkcie o zerowej objętości (brak obrotów i drgań własnych).\n- **Wektor (promień) wodzący:** $\\vec{r}(t) = [x(t), y(t), z(t)]$ poprowadzony z początku układu odniesienia do ciała.\n- **Wektor przemieszczenia:** $\\Delta\\vec{r} = \\vec{r}_2 - \\vec{r}_1 = [x_1-x_0, y_1-y_0, z_1-z_0]$.\n- **Prędkość chwilowa i przyspieszenie chwilowe:**\n$$\\vec{v}(t) = \\lim_{\\Delta t \\to 0}\\frac{\\Delta\\vec{r}}{\\Delta t} = \\frac{d\\vec{r}}{dt} = [v_x, v_y, v_z], \\qquad \\vec{a}(t) = \\lim_{\\Delta t \\to 0}\\frac{\\Delta\\vec{v}}{\\Delta t} = \\frac{d\\vec{v}}{dt} = \\frac{d^2\\vec{r}}{dt^2}$$\n- **Prędkość średnia (skalarna po drodze):** $v_{\\text{śr}} = \\frac{\\Delta S}{\\Delta t} = \\frac{\\sum s_i}{\\sum t_i}$ (wektorowa: $\\vec{v}_{\\text{śr}} = \\frac{\\Delta\\vec{r}}{\\Delta t}$ — może być ujemna lub zerowa przy powrocie do punktu startu!).',
          },
          {
            type: 'callout',
            variant: 'warning',
            title: 'Pułapka egzaminacyjna z prędkością średnią!',
            text: 'Jeżeli samochód przejedzie pierwszą **połowę drogi** z prędkością $v_1 = 40\\,\\text{km/h}$, a drugą **połowę drogi** z $v_2 = 60\\,\\text{km/h}$, to prędkość średnia NIE wynosi $50\\,\\text{km/h}$! Czas to $t_1 = \\frac{s/2}{v_1}$ i $t_2 = \\frac{s/2}{v_2}$, więc:\n$$v_{\\text{śr}} = \\frac{s}{t_1 + t_2} = \\frac{2v_1 v_2}{v_1 + v_2} = \\frac{2\\cdot 40\\cdot 60}{100} = 48\\,\\text{km/h}$$ (średnia harmoniczna!). Średnia arytmetyczna $\\frac{v_1+v_2}{2}$ działa tylko przy równych czasach lub stałym przyspieszeniu $a=\\text{const}$.',
          },
        ],
      },
      {
        id: 'fiz-2-2',
        heading: '2.2. Klasyfikacja ruchów i wyprowadzenie równań ruchu przez całkowanie',
        blocks: [
          {
            type: 'callout',
            variant: 'proof',
            title: 'Wyprowadzenie wzorów ruchu jednostajnie zmiennego z definicji pochodnej (Wykład 2A, sl. 24)',
            text: 'Dla stałego przyspieszenia $a = \\text{const}$ rozdzielamy zmienne i całkujemy od $t=0$ (gdzie $v=v_0, x=x_0$) do chwili $t$:\n1. Z $a = \\frac{dv}{dt} \\implies dv = a\\,dt$:\n$$\\int_{v_0}^{v(t)} dv = \\int_0^t a\\,dt\' \\implies v(t) - v_0 = a t \\implies v(t) = v_0 + a t$$\n2. Z $v(t) = \\frac{dx}{dt} \\implies dx = (v_0 + a t)\\,dt$:\n$$\\int_{x_0}^{x(t)} dx = \\int_0^t (v_0 + a t\')\\,dt\' \\implies x(t) = x_0 + v_0 t + \\frac{1}{2} a t^2$$\n*(Uwaga na drobną literówkę ze slajdu 24 W2A: pod nagłówkiem ruchu przyspieszonego z $a > 0$ pozostawiono znaki minus z poprzedniego slajdu — oczywiście dla ruchu przyspieszonego mamy $+at$ i $+\\frac{1}{2}at^2$, a dla opóźnionego z wartością $|a|>0$ wstawiamy minus.)*\n3. Wyrugowanie czasu $t = \\frac{v - v_0}{a}$ daje bardzo przydatny **wzór bezczasowy**: $v^2 - v_0^2 = 2a(x - x_0)$.',
          },
        ],
      },
      {
        id: 'fiz-2-3',
        heading: '2.3. Ruch w polu grawitacyjnym (rzuty) i transformacja Galileusza',
        blocks: [
          {
            type: 'paragraph',
            text: 'W jednorodnym polu grawitacyjnym ($g = 9{,}80665\\,\\text{m/s}^2$, bez oporów powietrza) zasada niezależności ruchów pozwala rozłożyć **rzut ukośny** pod kątem $\\alpha$ z prędkością $v_0$ na osie $OX$ ($a_x = 0$) i $OY$ ($a_y = -g$):',
          },
          {
            type: 'math',
            tex: 'x(t) = v_0 \\cos\\alpha \\cdot t, \\qquad y(t) = h_0 + v_0 \\sin\\alpha \\cdot t - \\frac{1}{2}gt^2',
            caption: 'Równania parametryczne rzutu ukośnego (dla $h_0=0$: czas lotu $t_c = \\frac{2v_0\\sin\\alpha}{g}$, wysokość $H_{\\max} = \\frac{v_0^2\\sin^2\\alpha}{2g}$, zasięg $Z = \\frac{v_0^2\\sin(2\\alpha)}{g}$).',
          },
          {
            type: 'paragraph',
            text: '**Transformacja Galileusza (składanie prędkości, W2A sl. 33):** jeśli układ $U\'$ porusza się względem układu $U$ z prędkością $\\vec{V}_{\\text{układu}}(t)$, to prędkość ciała w układzie $U$ jest sumą wektorową $\\vec{V}(t) = \\vec{V}_{\\text{układu}}(t) + \\vec{V}_{\\text{ciała}}(t)$ (np. łódź przepływająca rzekę z prądem lub prostopadle do nurtu). Pamiętaj kluczowy wniosek z W2A sl. 35: **zmiana kierunku prędkości powoduje równie realne przyspieszenie jak zmiana jej wartości**!',
          },
          {
            type: 'svg',
            diagramId: 'phys-kinematics-graphs',
            title: 'Interaktywne wykresy kinematyczne x(t), v(t), a(t) oraz parabola rzutu ukośnego',
            caption: 'Porównaj nachylenie stycznej (pochodna) i pole pod wykresem v(t) (droga) oraz sprawdź zasięg rzutu ukośnego dla różnych kątów α.',
          },
        ],
      },
    ],
  },
  {
    id: 'fizyka-ch3',
    subject_id: 'fizyka',
    order_index: 3,
    slug: 'kinematyka-ruchu-po-okregu',
    title: 'Rozdział 3: Kinematyka ruchu po okręgu i ruch krzywoliniowy',
    subtitle: 'Wykład 2B: okres T, częstotliwość f, ω i ε, wektory v = ω × r, przyspieszenie dośrodkowe a_n i styczne a_s',
    lecture_ref: 'Wykład 2B · slajdy 36–51',
    estimated_minutes: 35,
    summary:
      'Kompletny opis ruchu krzywoliniowego po okręgu: okres i częstotliwość, kąt zakreślony θ w radianach, prędkość kątowa ω i przyspieszenie kątowe ε, pełna tabela analogii między ruchem postępowym a obrotowym, związki wektorowe v = ω × r oraz a_s = ε × r, wyprowadzenie przyspieszenia dośrodkowego a_n = v²/r = ω²r oraz rozkład przyspieszenia całkowitego a = a_n + a_s.',
    exam_questions: [9, 10, 11, 12],
    key_takeaways: [
      'W ruchu jednostajnym po okręgu wartość prędkości jest stała, lecz **zmienia się jej kierunek**, więc zawsze występuje niezerowe **przyspieszenie dośrodkowe (normalne)** $a_n = \\frac{v^2}{r} = \\omega^2 r$ skierowane do środka okręgu.',
      'Wielkości kątowe są ścisłymi analogami prostoliniowych: $s \\leftrightarrow \\theta$ ($\\text{rad}$), $v \\leftrightarrow \\omega = \\frac{d\\theta}{dt}$ ($\\text{rad/s}$), $a_s \\leftrightarrow \\varepsilon = \\frac{d\\omega}{dt}$ ($\\text{rad/s}^2$).',
      'Związki wektorowe (reguła prawej dłoni): $\\vec{v} = \\vec{\\omega} \\times \\vec{r}$ oraz przyspieszenie styczne $\\vec{a}_s = \\vec{\\varepsilon} \\times \\vec{r}$ (skalarnie $v = \\omega r$, $a_s = \\varepsilon r$).',
      'Przyspieszenie całkowite w zmiennym ruchu po okręgu to suma dwóch prostopadłych składowych $\\vec{a} = \\vec{a}_n + \\vec{a}_s$, skąd jego wartość wynosi $a = \\sqrt{a_n^2 + a_s^2}$.',
    ],
    sections: [
      {
        id: 'fiz-3-1',
        heading: '3.1. Okres, częstotliwość, wielkości kątowe i tabela analogii',
        blocks: [
          {
            type: 'paragraph',
            text: 'W ruchu po okręgu o promieniu $r$ położenie punktu opisujemy kątem zakreślonym w radianach $d\\theta = \\frac{ds}{r}$ (konwencja znaku z W2B sl. 44: obrót **przeciwnie do ruchu wskazówek zegara** daje $\\Delta\\theta > 0$). Czas jednego pełnego obrotu to **okres** $T\\,[\\text{s}]$, a liczba obrotów na sekundę to **częstotliwość** $f = \\frac{1}{T}\\,[\\text{Hz} = \\text{s}^{-1}]$.',
          },
          {
            type: 'table',
            headers: ['Ruch prostoliniowy (postępowy)', 'Ruch po okręgu (kątowy)', 'Związek (dla promienia $r$)'],
            rows: [
              ['Położenie / droga $s\\,[\\text{m}]$', 'Kąt zakreślony $\\theta\\,[\\text{rad}]$', '$s = \\theta \\cdot r$'],
              ['Prędkość liniowa $v = \\frac{ds}{dt}\\,[\\text{m/s}]$', 'Prędkość kątowa $\\omega = \\frac{d\\theta}{dt} = \\frac{2\\pi}{T} = 2\\pi f\\,[\\text{s}^{-1}]$', '$\\vec{v} = \\vec{\\omega}\\times\\vec{r}$ ($v = \\omega r$)'],
              ['Przyspieszenie styczne $a_s = \\frac{dv}{dt}\\,[\\text{m/s}^2]$', 'Przyspieszenie kątowe $\\varepsilon = \\frac{d\\omega}{dt}\\,[\\text{s}^{-2}]$', '$\\vec{a}_s = \\vec{\\varepsilon}\\times\\vec{r}$ ($a_s = \\varepsilon r$)'],
              ['$v(t) = v_0 + a t$', '$\\omega(t) = \\omega_0 + \\varepsilon t$', 'Ruch jednostajnie zmienny'],
              ['$s(t) = s_0 + v_0 t \\pm \\frac{1}{2}at^2$', '$\\theta(t) = \\theta_0 + \\omega_0 t \\pm \\frac{1}{2}\\varepsilon t^2$', 'Pełna analogia wzorów!'],
            ],
          },
        ],
      },
      {
        id: 'fiz-3-2',
        heading: '3.2. Przyspieszenie dośrodkowe (normalne) $a_n$ i całkowite $\\vec{a} = \\vec{a}_n + \\vec{a}_s$',
        blocks: [
          {
            type: 'callout',
            variant: 'proof',
            title: 'Wyprowadzenie przyspieszenia dośrodkowego $a_n = v^2/r = \\omega^2 r$ (Wykład 2B, sl. 41)',
            text: 'W małym czasie $\\Delta t$ promień wodzący obraca się o kąt $\\Delta\\theta = \\frac{\\Delta s}{r} = \\frac{v\\Delta t}{r}$. Trójkąt utworzony przez wektory $\\vec{v}_1, \\vec{v}_2$ i przyrost $\\Delta\\vec{v} = \\vec{v}_2 - \\vec{v}_1$ jest podobny do trójkąta równoramiennego o ramionach $r$ i podstawie $\\Delta s$:\n$$\\frac{|\\Delta\\vec{v}|}{v} \\approx \\frac{\\Delta s}{r} = \\frac{v\\Delta t}{r} \\implies a_n = \\lim_{\\Delta t \\to 0}\\frac{|\\Delta\\vec{v}|}{\\Delta t} = \\frac{v^2}{r} = \\frac{(\\omega r)^2}{r} = \\omega^2 r$$\nWektor $\\vec{a}_n$ jest zawsze prostopadły do prędkości $\\vec{v}$ i skierowany do środka okręgu (odpowiada wyłącznie za *zmianę kierunku* prędkości).',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykład 3.1: Przyspieszenie całkowite w zmiennym ruchu po okręgu',
            text: 'Koło o promieniu $r = 0{,}5\\,\\text{m}$ rusza ze spoczynku ($\\omega_0 = 0$) z przyspieszeniem kątowym $\\varepsilon = 2\\,\\text{rad/s}^2$. Wyznacz przyspieszenie całkowite punktu na obwodzie po czasie $t = 2\\,\\text{s}$:\n1. Prędkość kątowa: $\\omega = \\varepsilon t = 2 \\cdot 2 = 4\\,\\text{rad/s}$ (liniowa $v = \\omega r = 2\\,\\text{m/s}$).\n2. Przyspieszenie styczne (zmienia wartość $v$): $a_s = \\varepsilon r = 2 \\cdot 0{,}5 = 1\\,\\text{m/s}^2$.\n3. Przyspieszenie dośrodkowe (zmienia kierunek $\\vec{v}$): $a_n = \\omega^2 r = 16 \\cdot 0{,}5 = 8\\,\\text{m/s}^2$.\n4. Przyspieszenie całkowite (ponieważ $\\vec{a}_n \\perp \\vec{a}_s$): $a = \\sqrt{a_n^2 + a_s^2} = \\sqrt{8^2 + 1^2} = \\sqrt{65} \\approx 8{,}06\\,\\text{m/s}^2$.',
          },
          {
            type: 'svg',
            diagramId: 'phys-circular-motion',
            title: 'Interaktywny schemat ruchu po okręgu: wektory v, a_n, a_s i przyspieszenie całkowite a',
            caption: 'Zmieniaj prędkość kątową ω oraz przyspieszenie kątowe ε, aby obserwować obrót wektora przyspieszenia całkowitego a = a_n + a_s.',
          },
        ],
      },
    ],
  },
  {
    id: 'fizyka-ch4',
    subject_id: 'fizyka',
    order_index: 4,
    slug: 'dynamika-zasady-newtona-ped-zderzenia',
    title: 'Rozdział 4: Dynamika punktu materialnego, zasady Newtona, pęd i zderzenia',
    subtitle: 'Wykład 3: ciężkość, tarcie, prawo Hooke’a, trzy zasady Newtona, pęd F = dp/dt, zderzenia niesprężyste i sprężyste',
    lecture_ref: 'Wykład 3 · slajdy 1–32',
    estimated_minutes: 50,
    summary:
      'Przyczyny ruchu i odkształceń ciał: definicja siły i zasada superpozycji, główne siły mechaniki (grawitacja i ciężkość, tarcie posuwiste na płaszczyźnie i równi pochyłej, sprężystość Hooke’a), I, II i III zasada dynamiki Newtona, definicja pędu i uogólniona II zasada F = dp/dt, wyprowadzenie zasady zachowania pędu (1D i 3D, odrzut) oraz analityczne rozwiązanie zderzeń idealnie niesprężystych i idealnie sprężystych.',
    exam_questions: [13, 14, 15, 16, 17],
    key_takeaways: [
      '**Trzy zasady dynamiki Newtona (1687):** I — istnieje układ inercjalny, w którym $\\sum\\vec{F}=0 \\Rightarrow \\vec{v}=\\text{const}$; II — $\\vec{a} = \\frac{\\vec{F}_w}{m}$ (uogólniona: $\\vec{F}_w = \\frac{d\\vec{p}}{dt}$); III — akcja i reakcja $\\vec{F}_{BA} = -\\vec{F}_{AB}$ działają na **dwa różne ciała**, więc **nigdy się nie równoważą**!',
      'Najważniejsze siły z W3: ciężkości $F_g = mg = G\\frac{mM}{R^2}$, tarcia posuwistego $T = fN$ (na równi o kącie $\\alpha$: $N = mg\\cos\\alpha$, $F_s = mg\\sin\\alpha$), sprężystości Hooke’a $\\vec{F}_s = -k\\vec{x}$.',
      '**Zasada zachowania pędu** ($\\vec{F}_{\\text{zew}} = \\vec{0} \\implies \\vec{P} = \\sum \\vec{p}_i = \\text{const}$) wynika wprost z II i III zasady Newtona i obowiązuje **zawsze** (zarówno w skali makro, jak i mikroskopowej!).',
      'W **zderzeniu idealnie niesprężystym** zachowany jest tylko pęd ($v_k = \\frac{m_1 v_{1p}+m_2 v_{2p}}{m_1+m_2}$, część $E_k$ zamienia się w ciepło/odkształcenie); w **idealnie sprężystym** zachowany jest pęd **i** energia kinetyczna.',
    ],
    sections: [
      {
        id: 'fiz-4-1',
        heading: '4.1. Siła, zasada superpozycji i trzy zasady dynamiki Newtona',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Trzy zasady dynamiki Newtona i zasada superpozycji (Wykład 3, sl. 4–19)',
            text: '- **Zasada superpozycji sił:** niezależne siły działające na punkt materialny zastępujemy jedną **siłą wypadkową** $\\vec{F}_w = \\sum_{i=1}^n \\vec{F}_i$ (suma wektorowa!). Jednostka: $1\\,\\text{N} = 1\\,\\text{kg}\\cdot\\frac{\\text{m}}{\\text{s}^2}$.\n- **I zasada (bezwładności):** istnieje układ odniesienia (inercjalny), w którym jeśli $\\sum\\vec{F} = \\vec{0}$, to ciało spoczywa lub porusza się ruchem jednostajnym prostoliniowym ($\\vec{p} = \\text{const}$).\n- **II zasada:** przyspieszenie jest wprost proporcjonalne do siły wypadkowej i odwrotnie proporcjonalne do masy: $\\vec{a} = \\frac{\\vec{F}_w}{m} \\iff \\vec{F}_w = m\\vec{a}$. Postać uogólniona (ważna także dla zmiennej masy, np. rakiety!): $\\vec{F}_w = \\frac{d\\vec{p}}{dt} = \\frac{d(m\\vec{v})}{dt}$.\n- **III zasada (akcji i reakcji):** $\\vec{F}_{BA} = -\\vec{F}_{AB}$ — równe co do wartości i kierunku, przeciwne zwroty, **zaczepione do dwóch różnych ciał**!',
          },
          {
            type: 'table',
            headers: ['Rodzaj siły (W3 sl. 6–11)', 'Wzór', 'Kierunek, zwrot i uwagi'],
            rows: [
              ['Siła ciężkości / grawitacji', '$F_g = mg = G\\frac{mM}{R^2}$', 'Zawsze pionowo w dół (do środka masy Ziemi); $g = G\\frac{M}{R^2}$'],
              ['Tarcie posuwiste', '$T = f \\cdot N$', 'Zawsze przeciwnie do kierunku ruchu (lub tendencji ruchu); $N$ = siła nacisku $\\perp$'],
              ['Równia pochyła (kąt $\\alpha$)', '$F_s = mg\\sin\\alpha,\\; N = mg\\cos\\alpha$', 'Zsuwanie bez poślizgu przy $a = g(\\sin\\alpha - f\\cos\\alpha)$ dla $\\operatorname{tg}\\alpha > f$'],
              ['Siła sprężystości (Hooke)', '$\\vec{F}_s = -k\\vec{x}$', 'Tylko w zakresie odkształceń sprężystych (pochodzi z oddziaływań Coulomba); minus = zwrot przeciwny do wychylenia'],
            ],
          },
        ],
      },
      {
        id: 'fiz-4-2',
        heading: '4.2. Pęd, wyprowadzenie zasady zachowania pędu oraz zderzenia 1D',
        blocks: [
          {
            type: 'callout',
            variant: 'proof',
            title: 'Wyprowadzenie zasady zachowania pędu układu izolowanego (Wykład 3, sl. 23–24)',
            text: 'Rozważmy izolowany układ dwóch oddziałujących ciał. Z II zasady $\\vec{F}_{12} = \\frac{d\\vec{p}_1}{dt}$ oraz $\\vec{F}_{21} = \\frac{d\\vec{p}_2}{dt}$, a z III zasady $\\vec{F}_{21} = -\\vec{F}_{12}$. Dodając stronami:\n$$\\frac{d\\vec{p}_1}{dt} + \\frac{d\\vec{p}_2}{dt} = \\frac{d}{dt}(\\vec{p}_1 + \\vec{p}_2) = \\vec{F}_{12} + \\vec{F}_{21} = \\vec{0} \\implies \\vec{P} = \\vec{p}_1 + \\vec{p}_2 = \\text{const}$$\nW 3D zasada zachowania działa niezależnie dla każdej ze składowych ($F_x=0 \\Rightarrow p_x=\\text{const}$ itd.). Klasyczny przykład: odrzut w układzie „my–sanki” ($m_1 v_1 + m_2 v_2 = 0$).',
          },
          {
            type: 'callout',
            variant: 'theorem',
            title: 'Zderzenia idealnie niesprężyste vs idealnie sprężyste (Wykład 3, sl. 25–28)',
            text: '**1. Zderzenie idealnie niesprężyste** (ciała zlepiają się: $v_{1k} = v_{2k} = v_k$):\n$$m_1 v_{1p} + m_2 v_{2p} = (m_1 + m_2) v_k \\implies v_k = \\frac{m_1 v_{1p} + m_2 v_{2p}}{m_1 + m_2}$$\nEnergia kinetyczna **nie jest zachowana** (część zamienia się w ciepło / deformację).\n\n**2. Zderzenie idealnie sprężyste** (zachowany pęd ORAZ energia kinetyczna):\nZ układu $m_1(v_{1k}-v_{1p}) = m_2(v_{2p}-v_{2k})$ oraz $m_1(v_{1k}^2-v_{1p}^2) = m_2(v_{2p}^2-v_{2k}^2)$ po podzieleniu stronami (korzystając z $a^2-b^2=(a-b)(a+b)$) otrzymujemy $v_{1k} - v_{2k} = -(v_{1p} - v_{2p})$, a po rozwiązaniu układu liniowego:\n$$v_{1k} = \\frac{m_1 - m_2}{m_1 + m_2} v_{1p} + \\frac{2m_2}{m_1 + m_2} v_{2p}, \\qquad v_{2k} = \\frac{m_2 - m_1}{m_1 + m_2} v_{2p} + \\frac{2m_1}{m_1 + m_2} v_{1p}$$\n*Przypadki szczególne:* dla $m_1 = m_2$ ciała dokładnie **wymieniają się prędkościami** ($v_{1k} = v_{2p},\\; v_{2k} = v_{1p}$ — kule bilardowe!); gdy $m_2 \\gg m_1$ i $v_{2p}=0$ (ściana), piłka odbija się z $v_{1k} \\approx -v_{1p}$.',
          },
          {
            type: 'svg',
            diagramId: 'phys-dynamics-collisions',
            title: 'Interaktywny schemat sił na równi pochyłej oraz zderzeń sprężystych i niesprężystych 1D',
            caption: 'Porównaj rozkład ciężaru mg na składowe F_s i N na równi pochyłej oraz bilans pędu i energii kinetycznej przed i po zderzeniu.',
          },
        ],
      },
    ],
  },
  {
    id: 'fizyka-ch5',
    subject_id: 'fizyka',
    order_index: 5,
    slug: 'laboratorium-niepewnosci-pomiarowe-stokes',
    title: 'Rozdział 5: Opracowanie pomiarów, niepewności pomiarowe i lepkość (Stokes / Andrade)',
    subtitle: 'Laboratorium Fizyki WIMiFT PP: niepewność typu A i B, Student–Fisher, różniczka logarytmiczna, prawo Stokesa i linearyzacja Andrade',
    lecture_ref: 'Laboratorium Fizyki · Opracowanie danych i ćw. 107',
    estimated_minutes: 40,
    summary:
      'Metodyka laboratorium fizycznego na Politechnice Poznańskiej: szacowanie niepewności pomiarowej małej serii (odchylenie standardowe średniej s(x̄) i współczynnik Studenta–Fishera t_n), propagacja błędów metodą różniczki zupełnej i różniczki logarytmicznej, reguły zaokrąglania wyników końcowych oraz kompletne opracowanie fizyki lepkości cieczy: prawo Newtona, prawo Stokesa, siła wyporu Archimedesa, wiskozymetr Höplera i linearyzacja równania Andrade.',
    exam_questions: [18, 19, 20],
    key_takeaways: [
      'Dla małej serii $n$ pomiarów niepewność średniej obliczamy ze wzoru $\\Delta\\bar{x} = t_n \\cdot s(\\bar{x}) = t_n\\sqrt{\\frac{\\sum (x_i - \\bar{x})^2}{n(n-1)}}$, gdzie $t_n$ to współczynnik Studenta–Fishera (dla $n=3$ i $p=68{,}3\\%$: $t_3 = 1{,}3$).',
      '**Metoda różniczki logarytmicznej** dla iloczynów/ilorazów $y = C \\cdot a^p b^q / c^r$ sprowadza się natychmiast do sumy błędów względnych: $\\frac{\\Delta y}{y} = |p|\\frac{\\Delta a}{a} + |q|\\frac{\\Delta b}{b} + |r|\\frac{\\Delta c}{c}$.',
      'Zasada zaokrąglania wyniku $y \\pm \\Delta y$: niepewność $\\Delta y$ zaokrąglamy do **1 cyfry znaczącej** (lub **2 cyfr**, jeśli pierwsza cyfra to $1, 2$ lub $3$), a wynik $y$ dopasowujemy do **tego samego rzędu dziesiętnego**!',
      'Opór lepkiej cieczy opisuje **prawo Stokesa** $F_T = 6\\pi\\eta r v$, a temperaturową zależność lepkości cieczy opisuje wykładnicze **równanie Andrade** $\\eta(T) = A e^{B/T}$, które po zlogarytmowaniu daje prostą $\\ln\\eta = \\ln A + B\\cdot\\frac{1}{T}$ z energią aktywacji $E_a = B R$.',
    ],
    sections: [
      {
        id: 'fiz-5-1',
        heading: '5.1. Niepewności pomiarowe: statystyka małej serii, różniczka zupełna i logarytmiczna',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Niepewność średniej arytmetycznej i propagacja niepewności (Laboratorium PP)',
            text: '1. **Seria $n$ niezależnych pomiarów** $x_1, \\dots, x_n$:\n$$\\bar{x} = \\frac{1}{n}\\sum_{i=1}^n x_i, \\qquad s(\\bar{x}) = \\sqrt{\\frac{\\sum_{i=1}^n (x_i - \\bar{x})^2}{n(n-1)}}, \\qquad \\Delta\\bar{x} = t_n \\cdot s(\\bar{x})$$\nDla poziomu ufności $p = 68{,}3\\%$: $t_3 = 1{,}3$, $t_4 = 1{,}2$, $t_5 = 1{,}15$, $t_{10} = 1{,}06$ (dla dużych $n$: $t_n \\to 1$).\n\n2. **Metoda różniczki zupełnej** (dla dowolnej funkcji $y = f(x_1, \\dots, x_m)$ — maksymalny błąd bezwzględny):\n$$\\Delta y = \\sum_{i=1}^m \\left|\\frac{\\partial f}{\\partial x_i}\\right| \\Delta x_i$$\n3. **Metoda różniczki logarytmicznej** (szczególnie wygodna dla wzorów iloczynowo-ilorazowych): logarytmujemy obie strony $\\ln y = \\dots$, różniczkujemy i zamieniamy wszystkie znaki minus na **plus** (błędy sumują się pesymistycznie!).',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykład 5.1: Różniczka logarytmiczna dla wiskozymetru Höplera $\\eta = K(d_k - d_c)t$',
            text: 'Logarytmujemy wyrażenie: $\\ln\\eta = \\ln K + \\ln(d_k - d_c) + \\ln t$. Różniczkując stronami i biorąc wartości bezwzględne (pamiętając, że w różnicy $d_k - d_c$ niepewności **dodają się**: $\\Delta(d_k - d_c) = \\Delta d_k + \\Delta d_c$!):\n$$\\frac{\\Delta\\eta}{\\eta} = \\frac{\\Delta K}{K} + \\frac{\\Delta d_k + \\Delta d_c}{d_k - d_c} + \\frac{\\Delta t}{t}$$\nDla danych pomiarowych w $T = 28\\,^\\circ\\text{C}$: $\\eta = 0{,}7496\\,\\text{Pa}\\cdot\\text{s}$ oraz $\\Delta\\eta = 0{,}0180\\,\\text{Pa}\\cdot\\text{s}$ ($\\varepsilon_w = 2{,}40\\%$). Ponieważ pierwsza cyfra znacząca $\\Delta\\eta$ to $1$, zachowujemy 2 cyfry znaczące ($0{,}018$) i wynik zapisujemy jako **$\\eta = (0{,}750 \\pm 0{,}018)\\,\\text{Pa}\\cdot\\text{s}$**.',
          },
        ],
      },
      {
        id: 'fiz-5-2',
        heading: '5.2. Lepkość cieczy, prawo Stokesa i linearyzacja równania Andrade',
        blocks: [
          {
            type: 'paragraph',
            text: 'Lepkość dynamiczna $\\eta\\,[\\text{Pa}\\cdot\\text{s}]$ opisuje tarcie wewnętrzne między warstwami płynu w ruchu laminarnym ($F_T = \\eta S \\frac{dv}{dz}$). Dla kulki o promieniu $r$ i gęstości $d_k$ opadającej ze stałą prędkością $v = l/t$ w cieczy o gęstości $d_c$ zachodzi równowaga trzech sił: ciężkości $F_G = \\frac{4}{3}\\pi r^3 d_k g$, wyporu Archimedesa $F_W = \\frac{4}{3}\\pi r^3 d_c g$ oraz oporu **Stokesa** $F_T = 6\\pi\\eta r v$:',
          },
          {
            type: 'math',
            tex: 'F_G - F_W - F_T = 0 \\implies 6\\pi\\eta r \\frac{l}{t} = \\frac{4}{3}\\pi r^3 (d_k - d_c) g \\implies \\eta = \\frac{2(d_k - d_c) g r^2 t}{9l}',
            caption: 'Wyprowadzenie wzoru Stokesa na współczynnik lepkości dynamicznej; w wiskozymetrze Höplera czynniki geometryczne skupia stała kalibracyjna $K$: $\\eta = K(d_k - d_c)t$.',
          },
          {
            type: 'paragraph',
            text: 'Ze wzrostem temperatury lepkość cieczy **maleje wykładniczo** (w przeciwieństwie do gazów, gdzie lepkość rośnie z $T$!). Opisuje to **równanie Andrade (Arrheniusa)**:\n$$\\eta(T) = A \\exp\\!\\left(\\frac{B}{T}\\right) \\iff \\ln\\eta = \\ln A + B\\cdot\\frac{1}{T}$$\nWykres w układzie $(\\frac{1}{T}, \\ln\\eta)$ jest linią prostą o nachyleniu $B$, z którego metodą regresji liniowej wyznaczamy **energię aktywacji lepkiego przepływu** $E_a = B \\cdot R$ ($R = 8{,}314\\,\\text{J/(mol}\\cdot\\text{K)}$).',
          },
          {
            type: 'svg',
            diagramId: 'phys-lab-uncertainty',
            title: 'Interaktywna krzywa lepkości η(T) i linearyzacja Andrade ln(η) względem 1000/T',
            caption: 'Przełączaj widok między krzywą wykładniczą η(T) z słupkami niepewności Δ η a prostą regresji liniowej Andrade ln η = ln A + B/T.',
          },
        ],
      },
    ],
  },
];
