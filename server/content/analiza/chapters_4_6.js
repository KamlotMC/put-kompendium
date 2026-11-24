export const ANALIZA_CHAPTERS_4_6 = [
  {
    id: 'analiza-ch4',
    subject_id: 'analiza',
    order_index: 4,
    slug: 'granice-ciaglosc-asymptoty-funkcji',
    title: 'Rozdział 4: Granice funkcji (Heine i Cauchy), ciągłość, Darboux i asymptoty',
    subtitle: 'Otoczenie i sąsiedztwo, definicja Heinego i Cauchy’ego, 5 granic fundamentalnych, granice jednostronne, ciągłość, własność Darboux oraz asymptoty pionowe, poziome i ukośne',
    lecture_ref: 'Wykład cz. 1, rozdz. 4 (str. 6–9)',
    estimated_minutes: 35,
    summary:
      'Przejście od granic ciągów do granic funkcji: różnica między otoczeniem a sąsiedztwem, równoważność definicji Heinego i Cauchy’ego, dowód granicy $\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1$ i 5 fundamentalnych granic (Fakt 5), granice jednostronne (Przykłady 20–22), ciągłość i funkcja Dirichleta (Przykłady 23–25), własność Darboux i istnienie pierwiastków (Przykład 26) oraz wyznaczanie wszystkich trzech rodzajów asymptot (Przykłady 27–29).',
    exam_questions: [9, 10, 11, 12],
    key_takeaways: [
      'Granica w punkcie $x_0$ zależy wyłącznie od wartości w **sąsiedztwie** $S_\\delta(x_0) = (x_0-\\delta, x_0+\\delta)\\setminus\\{x_0\\}$ — wartość $f(x_0)$ może w ogóle nie istnieć!',
      'Granica obustronna $\\lim_{x\\to x_0} f(x)$ istnieje wtedy i tylko wtedy, gdy obie granice jednostronne (lewo- i prawostronna) istnieją i są równe (Tw. 13).',
      'Funkcja jest ciągła w $x_0 \\iff \\lim_{x\\to x_0} f(x) = f(x_0)$ (musi istnieć wartość w punkcie, granica i muszą być sobie równe!).',
      'Asymptota pozioma $y = b$ lub ukośna $y = ax + b$ ($a = \\lim \\frac{f(x)}{x}$, $b = \\lim (f(x)-ax)$) MOŻE przecinać wykres funkcji nawet nieskończenie wiele razy — np. $f(x)=\\frac{\\sin x}{x}$ przecina asymptotę $y=0$ w każdym $x=k\\pi$!',
    ],
    figures: [],
    sections: [
      {
        id: 'granica-heine-cauchy-fakt5',
        heading: '4.1. Definicja Heinego i Cauchy’ego, 5 granic fundamentalnych i granice jednostronne (Przykłady 18–22)',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Definicje 22–24 — Otoczenie, sąsiedztwo oraz granica wg Heinego i Cauchy’ego',
            text: '• **Otoczenie** $O_\\delta(x_0) = (x_0 - \\delta, x_0 + \\delta)$ zawiera $x_0$, natomiast **sąsiedztwo** $S_\\delta(x_0) = (x_0 - \\delta, x_0 + \\delta) \\setminus \\{x_0\\}$ **wyrzuca sam punkt $x_0$**.\n• **Definicja Heinego (ciągowa):** $\\lim_{x\\to x_0} f(x) = g$, jeśli dla **każdego** ciągu $(x_n)$ o wyrazach $x_n \\in S_\\delta(x_0)$ spełniającego $x_n \\to x_0$ zachodzi $f(x_n) \\to g$. *(Genialna do pokazywania, że granica NIE istnieje — wystarczy wskazać 2 różne ciągi dające różne granice!)*\n• **Definicja Cauchy’ego ($\\varepsilon$-$\\delta$):**\n$$\\lim_{x\\to x_0} f(x) = g \\iff \\forall_{\\varepsilon > 0}\\; \\exists_{\\delta > 0}\\; \\forall_x\\; \\big[0 < |x - x_0| < \\delta \\Rightarrow |f(x) - g| < \\varepsilon\\big].$$',
          },
          {
            type: 'callout',
            variant: 'theorem',
            title: 'Fakt 5 — Pięć granic fundamentalnych (OBOWIĄZKOWE NA PAMIĘĆ!)',
            text: '1. $\\displaystyle\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1$ *(skąd to się bierze? Dla $x \\in (0, \\frac{\\pi}{2})$ porównujemy pola wycinka koła i dwóch trójkątów: $\\sin x < x < \\operatorname{tg} x \\implies \\cos x < \\frac{\\sin x}{x} < 1$; z parzystości zachodzi też dla $x<0$, więc z Tw. o trzech funkcjach granica wynosi $1$!)*\n2. $\\displaystyle\\lim_{x\\to 0}\\frac{(1+x)^a - 1}{x} = a$ dla $a \\in \\mathbb{R}$\n3. $\\displaystyle\\lim_{x\\to 0}\\frac{a^x - 1}{x} = \\ln a$ dla $a > 0$ (w szczególności $\\lim_{x\\to 0}\\frac{e^x - 1}{x} = 1$)\n4. $\\displaystyle\\lim_{x\\to 0}\\frac{\\log_a(1+x)}{x} = \\frac{1}{\\ln a}$ dla $a > 0, a \\neq 1$ (w szczególności $\\lim_{x\\to 0}\\frac{\\ln(1+x)}{x} = 1$)\n5. $\\displaystyle\\lim_{x\\to 0}(1 + x)^{\\frac{1}{x}} = e$',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykłady 18–22 (rozwiązane krok po kroku)',
            text: '**Przykład 18 (dziura usuwalna):** $f(x) = \\frac{x^2 - 1}{x - 1}$, $x_0 = 1$. W samym $x_0=1$ funkcja nie jest określona, ale dla każdego $x \\neq 1$ możemy skrócić $(x-1)$:\n$$\\lim_{x\\to 1}\\frac{x^2-1}{x-1} = \\lim_{x\\to 1}\\frac{(x-1)(x+1)}{x-1} = \\lim_{x\\to 1}(x+1) = \\mathbf{2}.$$\n\n**Przykład 19:**\n1) $\\lim_{x\\to\\infty}\\frac{x^2+3x+2}{x^2+5x+6} = \\lim_{x\\to\\infty}\\frac{1 + 3/x + 2/x^2}{1 + 5/x + 6/x^2} = \\mathbf{1}$.\n2) $\\lim_{x\\to -2}\\frac{x^2+3x+2}{x^2+5x+6} = \\left[\\frac{0}{0}\\right] = \\lim_{x\\to -2}\\frac{(x+2)(x+1)}{(x+2)(x+3)} = \\lim_{x\\to -2}\\frac{x+1}{x+3} = \\frac{-1}{1} = \\mathbf{-1}$.\n3) $\\lim_{x\\to 0}\\frac{\\sin 2x}{\\sin 5x} = \\lim_{x\\to 0}\\left(\\frac{\\sin 2x}{2x} \\cdot \\frac{5x}{\\sin 5x} \\cdot \\frac{2}{5}\\right) = 1 \\cdot 1 \\cdot \\frac{2}{5} = \\mathbf{\\frac{2}{5}}$.\n\n**Przykłady 20 i 21 (granice jednostronne):** $f(x) = \\frac{|x+1|}{x+1}$ w $x_0 = -1$.\n• Dla $x > -1$ (prawostronnie): $|x+1| = x+1$, więc $\\lim_{x\\to -1^+} \\frac{x+1}{x+1} = \\mathbf{1}$.\n• Dla $x < -1$ (lewo­stronnie): $|x+1| = -(x+1)$, więc $\\lim_{x\\to -1^-} \\frac{-(x+1)}{x+1} = \\mathbf{-1}$.\nPonieważ granica lewostronna $\\neq$ prawostronnej ($-1 \\neq 1$), z Tw. 13 **granica $\\lim_{x\\to -1} f(x)$ NIE istnieje**.\n\n**Przykład 22 (zamiana zmiennej — Fakt 6):**\n1) $\\lim_{x\\to\\infty} x\\sin\\frac{1}{x}$: podstawiamy $u = \\frac{1}{x}$; gdy $x \\to \\infty$, to $u \\to 0^+$ i $x = \\frac{1}{u}$:\n$$= \\lim_{u\\to 0^+} \\frac{\\sin u}{u} = \\mathbf{1}.$$\n2) $\\lim_{x\\to \\frac{\\pi}{2}} \\frac{\\cos x}{\\pi - 2x}$: podstawiamy $u = x - \\frac{\\pi}{2} \\to 0$, czyli $x = u + \\frac{\\pi}{2}$. Ze wzoru redukcyjnego $\\cos(u + \\frac{\\pi}{2}) = -\\sin u$, a mianownik $\\pi - 2(u + \\frac{\\pi}{2}) = -2u$:\n$$= \\lim_{u\\to 0} \\frac{-\\sin u}{-2u} = \\frac{1}{2} \\lim_{u\\to 0}\\frac{\\sin u}{u} = \\mathbf{\\frac{1}{2}}.$$',
          },
          {
            type: 'svg',
            diagramId: 'limit-heine-cauchy-onesided',
            title: 'Wykresy do Rozdziału 4: dziura usuwalna, skok jednostronny, twierdzenie o 3 funkcjach dla $\\frac{\\sin x}{x}$ oraz własność Darboux',
            caption: 'Przełączaj 4 tryby, aby wizualnie zrozumieć najważniejsze zjawiska związane z granicami i ciągłością.',
          },
        ],
      },
      {
        id: 'ciaglosc-i-darboux',
        heading: '4.2. Ciągłość funkcji, funkcja Dirichleta i twierdzenie Darboux (Przykłady 23–26)',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Definicja 28 i Twierdzenia 14–18 — Ciągłość i własność Darboux',
            text: 'Funkcja $f$ określona w otoczeniu $x_0$ jest **ciągła w punkcie $x_0$** wtedy i tylko wtedy, gdy $$\\lim_{x\\to x_0} f(x) = f(x_0).$$\n• Suma, różnica, iloczyn, iloraz (przy $g(x_0)\\neq 0$), złożenie (Tw. 15) i funkcja odwrotna (Tw. 16) funkcji ciągłych są ciągłe.\n• **Twierdzenie 17 (Weierstrassa):** Funkcja ciągła na przedziale **domkniętym** $[a,b]$ jest na nim ograniczona (i osiąga swoje minimum i maksimum).\n• **Twierdzenie 18 (Własność Darboux):** Funkcja ciągła na $[x_1, x_2]$ przyjmuje każdą wartość pośrednią między $f(x_1)$ a $f(x_2)$. **Wniosek:** jeśli $f(x_1) \\cdot f(x_2) < 0$ (różne znaki na końcach), to istnieje co najmniej jeden pierwiastek $x_0 \\in (x_1, x_2)$ taki, że $f(x_0) = 0$.',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykłady 24, 25 i 26 (rozwiązane)',
            text: '**Przykład 24 (do­ciąganie dziury):** $f(x) = \\frac{\\sin x}{x}$ dla $x \\neq 0$ oraz $f(0) = 1$. Dla $x \\neq 0$ funkcja jest ilorazem funkcji ciągłych z niezerowym mianownikiem, więc jest ciągła. W punkcie $x_0 = 0$ sprawdzamy warunek ciągłości: $\\lim_{x\\to 0} \\frac{\\sin x}{x} = 1 = f(0)$ $\\Rightarrow$ **funkcja jest ciągła w całym $\\mathbb{R}$**!\n\n**Przykład 25 (Funkcja Dirichleta):** $D(x) = 1$ dla $x \\in \\mathbb{Q}$ i $D(x) = 0$ dla $x \\notin \\mathbb{Q}$. W dowolnie małym sąsiedztwie każdego punktu $x_0 \\in \\mathbb{R}$ leżą zarówno liczby wymierne ($D=1$), jak i niewymierne ($D=0$), więc granica wg Heinego nigdzie nie istnieje — funkcja jest **nigdzie nieciągła**!\n\n**Przykład 26 — Dowód z Tw. Darboux, że każdy wielomian nieparzystego stopnia ma pierwiastek rzeczywisty:**\nNiech $W(x) = a_n x^n + a_{n-1}x^{n-1} + \\dots + a_0$, gdzie $n$ jest **nieparzyste** i (bez straty ogólności) $a_n > 0$. Wyciągając $x^n$ przed nawias:\n$$\\lim_{x\\to +\\infty} W(x) = +\\infty, \\qquad \\lim_{x\\to -\\infty} W(x) = -\\infty \\quad (\\text{bo } (-\\infty)^n = -\\infty \\text{ dla } n \\text{ nieparzystego!}).$$\nZatem istnieje dostatecznie małe $x_1$, dla którego $W(x_1) < 0$, oraz dostatecznie duże $x_2$, dla którego $W(x_2) > 0$. Wielomian jest ciągły na $[x_1, x_2]$ i ma różne znaki na końcach ($W(x_1)W(x_2) < 0$), więc z wniosku z **Twierdzenia Darboux** istnieje $x_0 \\in (x_1, x_2)$ takie, że $W(x_0) = 0$. $\\square$',
          },
        ],
      },
      {
        id: 'asymptoty-wykresu',
        heading: '4.3. Asymptoty wykresu funkcji: pionowe, poziome i ukośne (Przykłady 27–29)',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Definicje 30–32 — Trzy rodzaje asymptot',
            text: '• **Asymptota pionowa $x = a$:** gdy $\\lim_{x\\to a^-} f(x) = \\pm\\infty$ (lewostronna) lub $\\lim_{x\\to a^+} f(x) = \\pm\\infty$ (prawostronna); szukamy jej na **krańcach dziedziny** (np. miejsca zerowe mianownika, $0^+$ dla $\\ln x$).\n• **Asymptota pozioma $y = b$ w $+\\infty$ (lub $-\\infty$):** gdy istnieje skończona granica $b = \\lim_{x\\to +\\infty} f(x)$ (lub $x \\to -\\infty$). Jest to szczególny przypadek asymptoty ukośnej z $a = 0$!\n• **Asymptota ukośna $y = ax + b$ w $+\\infty$ (osobno badamy w $-\\infty$!):** gdy istnieją obie skończone granice:\n$$a = \\lim_{x\\to \\pm\\infty}\\frac{f(x)}{x}, \\qquad b = \\lim_{x\\to \\pm\\infty}\\big(f(x) - ax\\big).$$\n**Odpowiedzi na pytania wykładowcy ze str. 9:** (1) Jeśli $y = ax+b$ jest asymptotą, to $\\lim_{x\\to\\pm\\infty}(f(x)-(ax+b)) = \\mathbf{0}$ (odległość pionowa wykresu od prostej dąży do zera). (2) **TAK, asymptota może mieć punkty wspólne z wykresem** (nawet nieskończenie wiele — patrz Przykład 28 poniżej!).',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykłady 27, 28 i 29 (rozwiązane krok po kroku z wykresami)',
            text: '**Przykład 27 — Asymptoty pionowe $f(x) = \\frac{1}{x^2 - 1} = \\frac{1}{(x-1)(x+1)}$:**\nDziedzina $D = \\mathbb{R} \\setminus \\{-1, 1\\}$. Badamy granice w punktach wyrzuconych:\n• Dla $x \\to 1^+$: mianownik $\\to 0^+$ $\\implies +\\infty$; dla $x \\to 1^-$: mianownik $\\to 0^-$ $\\implies -\\infty$. Stąd **$x = 1$** jest obustronną asymptotą pionową.\n• Analogicznie dla $x \\to -1^-$: $+\\infty$, dla $x \\to -1^+$: $-\\infty$ $\\implies$ **$x = -1$** też jest asymptotą pionową.\n*(Dodatkowo $y = 0$ jest asymptotą poziomą w $\\pm\\infty$.)*\n\n**Przykład 28 — Asymptota pozioma $f(x) = \\frac{\\sin x}{x}$:**\nPonieważ $-\\frac{1}{|x|} \\le \\frac{\\sin x}{x} \\le \\frac{1}{|x|} \\to 0$, mamy $\\lim_{x\\to\\pm\\infty} \\frac{\\sin x}{x} = 0$. Prosta **$y = 0$** jest asymptotą poziomą obustronną, a wykres **przecina ją nieskończenie wiele razy** (dla każdego $x = k\\pi$, $k \\in \\mathbb{Z}\\setminus\\{0\\}$)!\n\n**Przykład 29 — Asymptota ukośna $f(x) = x + \\frac{1}{x}$:**\n$$a = \\lim_{x\\to\\pm\\infty}\\frac{x + \\frac{1}{x}}{x} = \\lim_{x\\to\\pm\\infty}\\left(1 + \\frac{1}{x^2}\\right) = 1, \\qquad b = \\lim_{x\\to\\pm\\infty}\\left(x + \\frac{1}{x} - 1\\cdot x\\right) = \\lim_{x\\to\\pm\\infty}\\frac{1}{x} = 0.$$\nProsta **$y = x$** jest asymptotą ukośną w $+\\infty$ i $-\\infty$ (ponadto $x = 0$ jest asymptotą pionową).',
          },
          {
            type: 'svg',
            diagramId: 'asymptotes-plot',
            title: 'Wykresy do Przykładów 27, 28 i 29 — Asymptoty pionowe, poziome i ukośne',
            caption: 'Porównaj wszystkie trzy klasyczne przypadki z wykładu: bieguny funkcji wymiernej, gasnące oscylacje przecinające asymptotę oraz asymptotę ukośną $y=x$.',
          },
        ],
      },
    ],
  },
  {
    id: 'analiza-ch5',
    subject_id: 'analiza',
    order_index: 5,
    slug: 'pochodne-reguly-hospital-taylor',
    title: 'Rozdział 5: Pochodne funkcji, reguły różniczkowania, de l’Hospital i wzór Taylora',
    subtitle: 'Definicja pochodnej, interpretacja geometryczna (RYSUNEK) i fizyczna, wyprowadzenia wzorów, różniczka, reguła de l’Hospitala oraz wzór Taylora i Maclaurina',
    lecture_ref: 'Wykład cz. 1 (5.1–5.3) + cz. 2 (5.4–5.7), str. 9–12',
    estimated_minutes: 40,
    summary:
      'Pełny rachunek różniczkowy: skąd bierze się definicja pochodnej i równanie stycznej (RYSUNEK ze str. 10), dlaczego ciągłość nie gwarantuje różniczkowalności (Przykład 30: $|x|$), kompletna tablica pochodnych z wyprowadzeniami (Przykłady 31–35, w tym pochodna funkcji potęgowo-wykładniczej $f(x)^{g(x)}$), różniczka funkcji w obliczeniach przybliżonych (Przykład 36), reguła de l’Hospitala wraz z pułapką (Przykłady 38–39) oraz wzór Taylora/Maclaurina z szacowaniem reszty Lagrange’a (Przykłady 40–41).',
    exam_questions: [13, 14, 15, 16, 17],
    key_takeaways: [
      'Różniczkowalność $\\implies$ ciągłość (Tw. 19), ale NIE na odwrót! Klasyczny kontrprzykład: $p(x) = |x|$ jest ciągła w $0$, lecz jej pochodna lewostronna ($-1$) różni się od prawostronnej ($+1$).',
      'Geometrycznie $f\'(x_0)$ to współczynnik kierunkowy ($\\operatorname{tg}\\alpha$) stycznej do wykresu w punkcie $(x_0, f(x_0))$, będącej granicą siecznych przy $\\Delta x \\to 0$. Równanie stycznej: $y = f\'(x_0)(x - x_0) + f(x_0)$.',
      'Funkcje postaci $y = f(x)^{g(x)}$ różniczkujemy przez zamianę na $e^{g(x)\\ln f(x)}$ albo logarytmowanie stronami $\\ln y = g(x)\\ln f(x)$.',
      'Regułę de l’Hospitala stosujemy WYŁĄCZNIE do symboli $\\frac{0}{0}$ oraz $\\frac{\\infty}{\\infty}$ (pozostałe $0\\cdot\\infty, \\infty-\\infty, 1^\\infty, 0^0, \\infty^0$ sprowadzamy najpierw do ułamka!) i tylko wtedy, gdy istnieje granica $\\lim \\frac{f\'}{g\'}$!',
    ],
    figures: [],
    sections: [
      {
        id: 'definicja-pochodnej-rysunek',
        heading: '5.1. Definicja pochodnej, interpretacja geometryczna (RYSUNEK) i fizyczna (Przykłady 30–31)',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Definicja 33, Twierdzenie 19 i Fakt 7 — Pochodna, styczna i sens fizyczny',
            text: '**Pochodną (właściwą)** funkcji $f$ w punkcie $x_0$ nazywamy skończoną granicę ilorazu różnicowego:\n$$f\'(x_0) = \\lim_{x\\to x_0}\\frac{f(x) - f(x_0)}{x - x_0} = \\lim_{\\Delta x\\to 0}\\frac{f(x_0 + \\Delta x) - f(x_0)}{\\Delta x}.$$\n• **Sens geometryczny:** Iloraz $\\frac{f(x_0+\\Delta x)-f(x_0)}{\\Delta x}$ jest współczynnikiem kierunkowym **siecznej** przechodzącej przez punkty $P(x_0, f(x_0))$ i $Q(x_0+\\Delta x, f(x_0+\\Delta x))$. Gdy $\\Delta x \\to 0$, punkt $Q$ zsuwa się po wykresie do $P$, a sieczna przechodzi w **styczną** o równaniu:\n$$y = f\'(x_0)(x - x_0) + f(x_0).$$\n• **Sens fizyczny:** Dla położenia $s(t)$ pochodna $s\'(t_0)$ to **prędkość chwilowa** $v(t_0)$, $v\'(t_0)$ to **przyspieszenie chwilowe**, a dla ładunku $q(t)$ pochodna $q\'(t_0)$ to **natężenie chwilowe prądu**.\n• **Twierdzenie 19:** Jeśli $f$ ma pochodną właściwą w $x_0$, to jest w $x_0$ ciągła. **Twierdzenie odwrotne jest FAŁSZYWE!**',
          },
          {
            type: 'svg',
            diagramId: 'derivative-secant-tangent',
            title: 'Interaktywny RYSUNEK ze str. 10: Sieczna → Styczna, różniczka $df$ oraz ostrze funkcji $|x|$',
            caption: 'Przesuwaj suwak $\\Delta x \\to 0$, aby zobaczyć, jak sieczna zbliża się do stycznej i jak różniczka $df = f\'(x_0)\\Delta x$ przybliża prawdziwy przyrost $\\Delta y$. Przełącz zakładkę, aby obejrzeć nieróżniczkowalny punkt $x=0$ funkcji $|x|$.',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykłady 30 i 31 (wyprowadzenia krok po kroku!)',
            text: '**Przykład 30 — Czy istnieje pochodna $p(x) = |x|$ w punkcie $x_0 = 0$?**\nBadamy granice jednostronne ilorazu różnicowego w $x_0 = 0$:\n$$\\lim_{x\\to 0^+}\\frac{|x| - 0}{x - 0} = \\lim_{x\\to 0^+}\\frac{x}{x} = 1, \\qquad \\lim_{x\\to 0^-}\\frac{|x| - 0}{x - 0} = \\lim_{x\\to 0^-}\\frac{-x}{x} = -1.$$\nGranice jednostronne są różne ($1 \\neq -1$), więc **pochodna $p\'(0)$ NIE istnieje** (geometrycznie wykres ma w zerze ostre załamanie — nie ma jednej stycznej), mimo że funkcja jest w $0$ ciągła!\n\n**Przykład 31 — Skąd bierze się wzór $(\\sin x)\' = \\cos x$?**\nZ definicji pochodnej oraz tożsamości $\\sin\\alpha - \\sin\\beta = 2\\cos\\frac{\\alpha+\\beta}{2}\\sin\\frac{\\alpha-\\beta}{2}$:\n$$(\\sin x)\' = \\lim_{h\\to 0}\\frac{\\sin(x+h) - \\sin x}{h} = \\lim_{h\\to 0}\\frac{2\\cos\\!\\left(x + \\frac{h}{2}\\right)\\sin\\frac{h}{2}}{h} = \\lim_{h\\to 0}\\cos\\!\\left(x + \\frac{h}{2}\\right) \\cdot \\underbrace{\\frac{\\sin(h/2)}{h/2}}_{\\to 1} = \\mathbf{\\cos x}.$$',
          },
        ],
      },
      {
        id: 'tablica-pochodnych-reguly-rozniczka',
        heading: '5.2. Tablica pochodnych, reguły różniczkowania, funkcja odwrotna, $f(x)^{g(x)}$ i różniczka (Przykłady 32–37)',
        blocks: [
          {
            type: 'table',
            caption: 'Kompletna tablica pochodnych funkcji elementarnych i reguł różniczkowania (str. 10–11)',
            headers: ['Funkcja $f(x)$', 'Pochodna $f\'(x)$', 'Funkcja $f(x)$', 'Pochodna $f\'(x)$'],
            rows: [
              ['$c$ (stała)', '$0$', '$\\operatorname{tg} x$', '$\\frac{1}{\\cos^2 x}$'],
              ['$x^n$', '$n x^{n-1}$', '$\\operatorname{ctg} x$', '$-\\frac{1}{\\sin^2 x}$'],
              ['$a^x$ / $e^x$', '$a^x \\ln a$ / $e^x$', '$\\arcsin x$', '$\\frac{1}{\\sqrt{1 - x^2}}$'],
              ['$\\log_a x$ / $\\ln x$', '$\\frac{1}{x \\ln a}$ / $\\frac{1}{x}$', '$\\arccos x$', '$-\\frac{1}{\\sqrt{1 - x^2}}$'],
              ['$\\sin x$', '$\\cos x$', '$\\operatorname{arctg} x$', '$\\frac{1}{1 + x^2}$'],
              ['$\\cos x$', '$-\\sin x$', '$\\operatorname{arcctg} x$', '$-\\frac{1}{1 + x^2}$'],
            ],
          },
          {
            type: 'callout',
            variant: 'theorem',
            title: 'Twierdzenia 20–22 — Reguły różniczkowania (działania, złożenie, funkcja odwrotna)',
            text: '• **Suma i iloczyn:** $(f \\pm g)\' = f\' \\pm g\'$, $\\;(c\\cdot f)\' = c\\cdot f\'$, $\\;(f\\cdot g)\' = f\'g + fg\'$.\n• **Iloraz ($g \\neq 0$):** $\\displaystyle\\left(\\frac{f}{g}\\right)\' = \\frac{f\'g - fg\'}{g^2}$.\n• **Funkcja złożona (reguła łańcuchowa — Tw. 21):** $\\big[f(g(x))\\big]\' = f\'(g(x)) \\cdot g\'(x)$.\n• **Funkcja odwrotna (Tw. 22):** $\\displaystyle\\left(f^{-1}\\right)\'(y_0) = \\frac{1}{f\'(x_0)}$, gdzie $y_0 = f(x_0)$ i $f\'(x_0) \\neq 0$.',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykłady 32–37 (rozwiązane krok po kroku — w tym skąd się bierze $(\\arcsin x)\'$ i $(x^x)\'$!)',
            text: '**Przykład 32 (reguły):**\n• $(3x^2+5x-1)\' = 6x + 5$.\n• $(x^2 e^x)\' = (x^2)\'e^x + x^2(e^x)\' = 2xe^x + x^2 e^x = x(x+2)e^x$.\n• $(\\operatorname{tg} x)\' = \\left(\\frac{\\sin x}{\\cos x}\\right)\' = \\frac{\\cos x\\cdot\\cos x - \\sin x(-\\sin x)}{\\cos^2 x} = \\frac{\\cos^2 x + \\sin^2 x}{\\cos^2 x} = \\frac{1}{\\cos^2 x}$. Analogicznie $(\\operatorname{ctg} x)\' = -\\frac{1}{\\sin^2 x}$.\n\n**Przykład 33 (funkcja złożona):**\n• $\\big[(3x^2+5x-1)^{2012}\\big]\' = 2012(3x^2+5x-1)^{2011} \\cdot (6x+5)$.\n• $(e^{2x})\' = e^{2x} \\cdot (2x)\' = 2e^{2x}$.\n\n**Przykład 34 — Skąd się bierze wzór $(\\arcsin y)\' = \\frac{1}{\\sqrt{1-y^2}}$ (Tw. 22)?**\nFunkcją pierwotną jest $y = f(x) = \\sin x$ na $(-\\frac{\\pi}{2}, \\frac{\\pi}{2})$, gdzie $\\cos x > 0$. Z Tw. 22:\n$$(\\arcsin y)\' = \\frac{1}{(\\sin x)\'} = \\frac{1}{\\cos x} = \\frac{1}{\\sqrt{1 - \\sin^2 x}} = \\mathbf{\\frac{1}{\\sqrt{1 - y^2}}}.$$\n\n**Przykład 35 — Pochodna $y = x^x$ ($x > 0$):**\nZapisujemy $y = e^{x \\ln x}$ (bo $a = e^{\\ln a}$) i różniczkujemy jako funkcję złożoną:\n$$y\' = e^{x\\ln x} \\cdot (x \\ln x)\' = x^x \\cdot \\left(1\\cdot\\ln x + x\\cdot\\frac{1}{x}\\right) = \\mathbf{x^x(\\ln x + 1)}.$$\n\n**Przykład 36 (Różniczka funkcji — Definicja 34 i Fakt 8):** Przybliż $e^{-0{,}001}$.\nKorzystamy z $f(x_0 + \\Delta x) \\approx f(x_0) + f\'(x_0)\\Delta x$ dla $f(x) = e^x$, $x_0 = 0$, $\\Delta x = -0{,}001$:\n$$e^{-0{,}001} \\approx e^0 + e^0 \\cdot (-0{,}001) = 1 - 0{,}001 = \\mathbf{0{,}999}$$ *(dokładna wartość to $0{,}9990004998\\dots$ — błąd rzędu $5\\cdot 10^{-7}$!).*\n\n**Przykład 37 (Pochodne wyższych rzędów):** Dla $f(x)=x^3+5x+2$: $f\'=3x^2+5$, $f\'\'=6x$, $f\'\'\'=6$, $f^{(n)}=0$ dla $n\\ge 4$. Dla $g(x)=\\sin x$: cykl co 4 ($\\cos x, -\\sin x, -\\cos x, \\sin x$), ogólnie $g^{(n)}(x) = \\sin\\!\\left(x + n\\frac{\\pi}{2}\\right)$.',
          },
        ],
      },
      {
        id: 'hospital-i-taylor',
        heading: '5.3. Reguła de l’Hospitala oraz wzór Taylora i Maclaurina (Przykłady 38–41)',
        blocks: [
          {
            type: 'callout',
            variant: 'theorem',
            title: 'Twierdzenie 23 — Reguła de l’Hospitala (wraz z ważnym ostrzeżeniem!)',
            text: 'Jeżeli $f$ i $g$ są różniczkowalne w sąsiedztwie $x_0$, obie dążą jednocześnie do $0$ albo obie do $\\pm\\infty$ (symbol $\\frac{0}{0}$ lub $\\frac{\\infty}{\\infty}$), oraz **ISTNIEJE granica $\\lim_{x\\to x_0} \\frac{f\'(x)}{g\'(x)}$**, to\n$$\\lim_{x\\to x_0}\\frac{f(x)}{g(x)} = \\lim_{x\\to x_0}\\frac{f\'(x)}{g\'(x)}.$$\n*Uwaga:* Jeśli granica ilorazu pochodnych NIE istnieje, to nie oznacza, że nie istnieje wyjściowa granica — po prostu reguły de l’Hospitala **nie wolno wtedy użyć** (patrz Przykład 38.3 poniżej!).',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykłady 38 i 39 (rozwiązane krok po kroku — wszystkie typy nieoznaczoności!)',
            text: '**Przykład 38:**\n1) $\\displaystyle\\lim_{x\\to 0}\\frac{e^x - e^{-x}}{x} = \\left[\\frac{0}{0}\\right] \\stackrel{H}{=} \\lim_{x\\to 0}\\frac{e^x + e^{-x}}{1} = 1 + 1 = \\mathbf{2}$.\n2) $\\displaystyle\\lim_{x\\to\\infty}\\frac{\\ln(\\ln x)}{x} = \\left[\\frac{\\infty}{\\infty}\\right] \\stackrel{H}{=} \\lim_{x\\to\\infty}\\frac{\\frac{1}{x\\ln x}}{1} = \\mathbf{0}$.\n3) **PUŁAPKA!** $\\displaystyle\\lim_{x\\to\\infty}\\frac{x + \\sin x}{x - \\cos x}$ — jeśli bezmyślnie użyjemy de l’Hospitala, dostaniemy $\\frac{1 + \\cos x}{1 + \\sin x}$, które oscyluje i **nie ma granicy**! Zamiast tego dzielimy przez $x$:\n$$\\lim_{x\\to\\infty}\\frac{1 + \\frac{\\sin x}{x}}{1 - \\frac{\\cos x}{x}} = \\frac{1 + 0}{1 - 0} = \\mathbf{1}.$$\n\n**Przykład 39 (sprowadzanie $0\\cdot\\infty$, $\\infty-\\infty$, $1^\\infty$ do ułamka):**\n1) $[0\\cdot\\infty]$: $\\displaystyle\\lim_{x\\to 0^+} x e^{1/x} = \\lim_{x\\to 0^+}\\frac{e^{1/x}}{1/x} = \\left[\\frac{\\infty}{\\infty}\\right] \\stackrel{H}{=} \\lim_{x\\to 0^+}\\frac{e^{1/x}\\cdot(-1/x^2)}{-1/x^2} = \\lim_{x\\to 0^+} e^{1/x} = \\mathbf{+\\infty}$.\n2) $[\\infty - \\infty]$: sprowadzamy do wspólnego mianownika:\n$$\\lim_{x\\to 0}\\left(\\operatorname{ctg} x - \\frac{1}{x}\\right) = \\lim_{x\\to 0}\\frac{x\\cos x - \\sin x}{x\\sin x} \\stackrel{H}{=} \\lim_{x\\to 0}\\frac{\\cos x - x\\sin x - \\cos x}{\\sin x + x\\cos x} = \\lim_{x\\to 0}\\frac{-x\\sin x}{\\sin x + x\\cos x} \\stackrel{H}{=} \\lim_{x\\to 0}\\frac{-\\sin x - x\\cos x}{2\\cos x - x\\sin x} = \\frac{0}{2} = \\mathbf{0}.$$\n3) $[1^\\infty]$: zamieniamy $A^B = e^{B\\ln A}$ i liczymy granicę wykładnika:\n$$\\lim_{x\\to 0}\\frac{4\\ln(e^{2x}+3x)}{x} = \\left[\\frac{0}{0}\\right] \\stackrel{H}{=} \\lim_{x\\to 0} 4\\cdot\\frac{2e^{2x}+3}{e^{2x}+3x} = 4 \\cdot \\frac{2+3}{1} = 20 \\implies \\lim_{x\\to 0}(e^{2x}+3x)^{4/x} = \\mathbf{e^{20}}.$$',
          },
          {
            type: 'callout',
            variant: 'theorem',
            title: 'Twierdzenie 24 — Wzór Taylora i Maclaurina (z resztą w postaci Lagrange’a)',
            text: 'Jeśli funkcja $f$ ma ciągłą pochodną rzędu $n-1$ na przedziale domkniętym między $x_0$ i $x$ oraz pochodną rzędu $n$ wewnątrz tego przedziału, to istnieje punkt pośredni $c$ między $x_0$ a $x$ taki, że:\n$$f(x) = f(x_0) + \\frac{f\'(x_0)}{1!}(x-x_0) + \\frac{f\'\'(x_0)}{2!}(x-x_0)^2 + \\dots + \\frac{f^{(n-1)}(x_0)}{(n-1)!}(x-x_0)^{n-1} + \\underbrace{\\frac{f^{(n)}(c)}{n!}(x-x_0)^n}_{\\text{reszta } R_n(x)}.$$\nDla $x_0 = 0$ nazywamy go **wzorem Maclaurina**. **Skąd się bierze?** Budujemy wielomian, który w punkcie $x_0$ ma dokładnie tę samą wartość, tę samą 1. pochodną (nachylenie), 2. pochodną (krzywiznę), ..., $(n-1)$-szą pochodną co funkcja $f$ — stąd czynnik $\\frac{1}{k!}$ kasuje $k!$ powstające przy $k$-krotnym różniczkowaniu $(x-x_0)^k$!',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykłady 40 i 41 (rozwiązane krok po kroku + uwaga o literówce w PDF)',
            text: '**Przykład 40 (ważna uwaga!):** W tekście wykładu zapisano $f(x) = \\frac{1}{x^2}$, $x_0 = 0$, $n = 2$ — jednak $x_0 = 0 \\notin D_f$, więc w zerze wzór Taylora dla $\\frac{1}{x^2}$ **nie istnieje** (to drobna literówka w skrypcie — chodziło o $x_0 = 1$ lub $f(x) = \\frac{1}{(x+1)^2}$).\n• Dla **$f(x) = \\frac{1}{x^2}$ w $x_0 = 1$, $n = 2$**: $f(1) = 1$, $f\'(x) = -2x^{-3} \\implies f\'(1) = -2$, $f\'\'(x) = 6x^{-4}$. Wzór Taylora:\n$$\\frac{1}{x^2} = 1 - 2(x-1) + \\frac{6/c^4}{2!}(x-1)^2 = 1 - 2(x-1) + \\frac{3}{c^4}(x-1)^2 \\quad (c \\text{ między } 1 \\text{ i } x).$$\n\n**Przykład 41 — Oszacuj dokładność przybliżenia $\\sin x \\approx x - \\frac{x^3}{6}$ dla $|x| < \\frac{\\pi}{6}$:**\nPoliczmy pochodne $f(x) = \\sin x$ w $x_0 = 0$: $f(0)=0$, $f\'(0)=1$, $f\'\'(0)=0$, $f\'\'\'(0)=-1$, **$f^{(4)}(0)=0$**, $f^{(5)}(x) = \\cos x$.\nPonieważ wyraz z $x^4$ znika samoczynnie, piszemy wzór Maclaurina aż do **$n = 5$** (dzięki temu mamy znacznie ostrzejsze oszacowanie błędu niż dla $n = 4$!):\n$$\\sin x = x - \\frac{x^3}{6} + R_5(x), \\qquad R_5(x) = \\frac{\\cos c}{5!}x^5.$$\nSkoro $|\\cos c| \\le 1$ oraz $|x| < \\frac{\\pi}{6} \\approx 0{,}5236$:\n$$|R_5(x)| = \\frac{|\\cos c|}{120}|x|^5 < \\frac{1}{120}\\left(\\frac{\\pi}{6}\\right)^5 \\approx \\mathbf{0{,}000328}.$$\nBłąd przybliżenia dla kątów do $30^\\circ$ nie przekracza $0{,}00033$!',
          },
          {
            type: 'svg',
            diagramId: 'taylor-maclaurin',
            title: 'Interaktywny wykres: przybliżanie $\\sin x$ wielomianami Maclaurina (Przykład 41)',
            caption: 'Zmieniaj stopień wielomianu Maclaurina ($n=1, 3, 5, 7$) i sprawdź, jak dokładnie $x - \\frac{x^3}{6}$ pokrywa się z $\\sin x$ w paśmie $|x| < \\frac{\\pi}{6}$.',
          },
        ],
      },
    ],
  },
  {
    id: 'analiza-ch6',
    subject_id: 'analiza',
    order_index: 6,
    slug: 'twierdzenia-srednie-ekstrema-przebieg-zmiennosci',
    title: 'Rozdział 6: Twierdzenia Rolle’a i Lagrange’a, ekstrema, wypukłość i przebieg zmienności',
    subtitle: 'Wartość średnia, badanie monotoniczności, warunek konieczny Fermata, I i II warunek wystarczający, zadanie optymalizacyjne, wypukłość (RYSUNEK) i pełny przebieg zmienności',
    lecture_ref: 'Wykład cz. 2, rozdz. 5.8–5.11 (str. 12–15)',
    estimated_minutes: 35,
    summary:
      'Zastosowania rachunku różniczkowego do pełnego poznania kształtu wykresu funkcji: twierdzenia Rolle’a i Lagrange’a (Fakt 9, Przykład 42), monotoniczność z $f\'$ (Przykład 43), ekstrema lokalne i globalne — warunek Fermata, I i II kryterium (Przykłady 44–46), klasyczne zadanie optymalizacyjne z pudełkiem (Przykład 47) i wartości na przedziale domkniętym (Przykład 48), wypukłość/wklęsłość (RYSUNEK ze str. 13) i punkty przegięcia (Przykład 49) oraz kompletne 5-etapowe badanie przebiegu zmienności $f(x)=e^{-x^2/2}$ (Przykład 50).',
    exam_questions: [18, 19, 20, 21],
    key_takeaways: [
      'Twierdzenie Lagrange’a: istnieje $c \\in (a,b)$ o stycznej równoległej do siecznej przez końce przedziału: $f\'(c) = \\frac{f(b)-f(a)}{b-a}$. Z niego wynikają kryteria monotoniczności (Tw. 27) i stałości funkcji (Fakt 9).',
      'Twierdzenie Fermata (warunek konieczny): ekstremum może istnieć TYLKO tam, gdzie $f\'(x_0) = 0$ lub $f\'(x_0)$ nie istnieje. Uwaga: samo $f\'(x_0)=0$ NIE gwarantuje ekstremum (np. $f(x)=x^3$ albo $x^3e^{-x}$ w $x=0$)!',
      'II warunek wystarczający (Tw. 30): pierwsza niezerowa pochodna rzędu parzystego $\\implies$ ekstremum ($<0$ max, $>0$ min); rzędu nieparzystego $\\implies$ brak ekstremum!',
      'Wypukłość: $f\'\' > 0$ (sieczna leży POWYŻEJ wykresu, „miska” $\\cup$); wklęsłość: $f\'\' < 0$ (sieczna PONIŻEJ wykresu, „parasol” $\\cap$). Punkt przegięcia musi należeć do dziedziny i w nim $f\'\'$ zmienia znak!',
    ],
    figures: [],
    sections: [
      {
        id: 'rolle-lagrange-monotonicznosc',
        heading: '6.1. Twierdzenia Rolle’a i Lagrange’a oraz monotoniczność z pochodnej (Przykłady 42–43)',
        blocks: [
          {
            type: 'callout',
            variant: 'theorem',
            title: 'Twierdzenia 25–27 i Fakt 9 — Rolle, Lagrange i związek $f\'$ z monotonicznością',
            text: '• **Tw. 25 (Rolle’a):** Jeśli $f$ jest ciągła na $[a,b]$, różniczkowalna na $(a,b)$ oraz $f(a)=f(b)$, to istnieje $c \\in (a,b)$ takie, że $f\'(c) = 0$ (pozioma styczna).\n• **Tw. 26 (Lagrange’a o wartości średniej):** Jeśli $f$ jest ciągła na $[a,b]$ i różniczkowalna na $(a,b)$, to istnieje $c \\in (a,b)$ takie, że\n$$f\'(c) = \\frac{f(b) - f(a)}{b - a}.$$\n• **Fakt 9 (skąd się bierze? Z Tw. Lagrange’a dla $h = f - g$!):** Jeśli $f\'(x) = g\'(x)$ na przedziale $I$ oraz $f(x_0) = g(x_0)$ w choć jednym punkcie, to $f \\equiv g$ na całym przedziale $I$.\n• **Tw. 27:** Na przedziale $I$: $f\' > 0 \\implies$ rosnąca; $f\' < 0 \\implies$ malejąca; $f\' = 0 \\implies$ stała.',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykłady 42 i 43 (rozwiązane krok po kroku)',
            text: '**Przykład 42 (zastosowanie Faktu 9):** Wykaż, że $\\sin(\\arccos x) = \\sqrt{1 - x^2}$ dla $x \\in (-1, 1)$.\nOznaczmy $f(x) = \\sin(\\arccos x)$ i $g(x) = \\sqrt{1 - x^2}$.\n1) Sprawdzamy wartość w $x_0 = 0$: $f(0) = \\sin(\\frac{\\pi}{2}) = 1$, $g(0) = \\sqrt{1} = 1 \\implies f(0) = g(0)$.\n2) Liczymy pochodne obu funkcji na $(-1, 1)$:\n$$f\'(x) = \\cos(\\arccos x) \\cdot \\left(-\\frac{1}{\\sqrt{1-x^2}}\\right) = \\frac{-x}{\\sqrt{1-x^2}}, \\qquad g\'(x) = \\frac{-2x}{2\\sqrt{1-x^2}} = \\frac{-x}{\\sqrt{1-x^2}}.$$\nPochodne są identyczne i wartości w $0$ są równe $\\implies$ z Faktu 9 $f(x) = g(x)$ na całym $(-1, 1)$. $\\square$\n\n**Przykład 43:** Wyznacz przedziały, gdzie $f(x) = x \\ln x$ ($D_f = (0, \\infty)$) jest rosnąca.\nLiczymy pochodną: $f\'(x) = 1\\cdot\\ln x + x\\cdot\\frac{1}{x} = \\ln x + 1$.\n$$f\'(x) > 0 \\iff \\ln x > -1 \\iff x > e^{-1} = \\frac{1}{e}.$$\nFunkcja jest **rosnąca** na $(\\frac{1}{e}, \\infty)$ (i malejąca na $(0, \\frac{1}{e})$, z minimum lokalnym w $x = \\frac{1}{e}$).',
          },
        ],
      },
      {
        id: 'ekstrema-optymalizacja-wypuklosc',
        heading: '6.2. Ekstrema lokalne i globalne, zadanie optymalizacyjne oraz wypukłość (Przykłady 44–49)',
        blocks: [
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykłady 44, 45 i 46 (rozwiązane obiema metodami!) — Ekstrema $f(x) = x^3 e^{-x}$',
            text: '**Krok 1 — Warunek konieczny Fermata:** $D_f = \\mathbb{R}$. Liczymy pierwszą pochodną:\n$$f\'(x) = 3x^2 e^{-x} - x^3 e^{-x} = x^2(3 - x)e^{-x}.$$\nPonieważ $e^{-x} > 0$, mamy $f\'(x) = 0 \\iff x_1 = 0$ lub $x_2 = 3$ (to jedyni kandydaci na ekstrema).\n\n**Krok 2A — I warunek wystarczający (zmiana znaku $f\'$, Przykład 45):**\nZnak $f\'(x)$ zależy wyłącznie od czynnika $(3 - x)$, bo $x^2 e^{-x} \\ge 0$:\n• Dla $x \\in (-\\infty, 0)$ oraz $x \\in (0, 3)$ mamy $f\'(x) > 0$ — w $x_1 = 0$ pochodna **nie zmienia znaku** $\\implies$ **brak ekstremum w $0$**!\n• Dla $x \\in (3, \\infty)$ mamy $f\'(x) < 0$ — w $x_2 = 3$ znak zmienia się z $+$ na $-$ $\\implies$ **maksimum lokalne** $f(3) = 27 e^{-3}$.\n\n**Krok 2B — II warunek wystarczający (pochodne wyższych rzędów, Tw. 30, Przykład 46):**\nLiczymy $f\'\'(x) = (6x - 6x^2 + x^3)e^{-x}$ oraz $f\'\'\'(x) = (6 - 18x + 9x^2 - x^3)e^{-x}$:\n• W $x_2 = 3$: $f\'\'(3) = (18 - 54 + 27)e^{-3} = -9e^{-3} < 0$ (parzysty rząd $n=2$, ujemna) $\\implies$ **maksimum lokalne**.\n• W $x_1 = 0$: $f\'(0) = 0$, $f\'\'(0) = 0$, ale **$f\'\'\'(0) = 6 \\neq 0$** (pierwsza niezerowa pochodna jest **nieparzystego** rzędu $n = 3$) $\\implies$ **brak ekstremum**!',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykłady 47, 48 i 49 — Pudełko z kartonu, wartości skrajne na $[\\frac{1}{e}, e]$ oraz pułapka przegięcia $xe^{1/x}$',
            text: '**Przykład 47 (Optymalizacja — pudełko $5\\text{ dm} \\times 8\\text{ dm}$):**\nWycinamy w rogach kwadraty o boku $x$. Po zagięciu pudełko ma wymiary $(5 - 2x) \\times (8 - 2x)$ i wysokość $x$, gdzie $x \\in (0,\\, 2{,}5)$. Objętość:\n$$V(x) = x(5 - 2x)(8 - 2x) = 4x^3 - 26x^2 + 40x.$$\nSzukamy maksimum: $V\'(x) = 12x^2 - 52x + 40 = 4(3x^2 - 13x + 10) = 4(3x - 10)(x - 1) = 0$.\nPierwiastki to $x = 1$ oraz $x = \\frac{10}{3} \\approx 3{,}33 \\notin (0, 2{,}5)$. Dla $x < 1$ mamy $V\' > 0$, dla $x > 1$ mamy $V\' < 0$ $\\implies$ największą objętość ($V(1) = 1 \\cdot 3 \\cdot 6 = \\mathbf{18\\text{ dm}^3}$) uzyskamy, wycinając kwadraty o boku **$x = 1\\text{ dm}$**.\n\n**Przykład 48 — Minimum i maksimum globalne $f(x) = \\ln^2 x$ na $[\\frac{1}{e}, e]$:**\nSprawdzamy punkty krytyczne wewnątrz przedziału ORAZ oba końce przedziału! $f\'(x) = \\frac{2\\ln x}{x} = 0 \\iff x = 1 \\in [\\frac{1}{e}, e]$.\nPorównujemy wartości: $f(1) = 0$, $f(\\frac{1}{e}) = (-1)^2 = 1$, $f(e) = 1^2 = 1$. Zatem **najmniejsza wartość = $0$** (w $x=1$), a **największa wartość = $1$** (w $x=\\frac{1}{e}$ i $x=e$).\n\n**Przykład 49 (Wypukłość, wklęsłość i pułapka z dziedziną!) — $f(x) = x e^{1/x}$:**\nDziedzina $D = \\mathbb{R} \\setminus \\{0\\}$. Liczymy pochodne:\n$$f\'(x) = e^{1/x} + x e^{1/x}\\!\\left(-\\frac{1}{x^2}\\right) = e^{1/x}\\!\\left(1 - \\frac{1}{x}\\right), \\qquad f\'\'(x) = e^{1/x}\\!\\left(-\\frac{1}{x^2}\\right)\\!\\left(1 - \\frac{1}{x}\\right) + e^{1/x}\\frac{1}{x^2} = \\mathbf{\\frac{e^{1/x}}{x^3}}.$$\nPonieważ $e^{1/x} > 0$, znak $f\'\'$ zależy wyłącznie od $x^3$: na $(-\\infty, 0)$ mamy $f\'\' < 0$ (**wklęsła**), a na $(0, \\infty)$ mamy $f\'\' > 0$ (**wypukła**). **UWAGA:** mimo zmiany wypukłości po obu stronach zera, funkcja **NIE MA punktu przegięcia**, ponieważ $0 \\notin D_f$!',
          },
          {
            type: 'svg',
            diagramId: 'rolle-lagrange-convexity',
            title: 'Interaktywne rysunki: Twierdzenie Lagrange’a, RYSUNEK wypukłości/wklęsłości (str. 13) oraz wykresy $e^{-x^2/2}$ i $x^3 e^{-x}$',
            caption: 'Zobacz definicję wypukłości przez sieczną nad/pod krzywą oraz gotowy wykres z badania przebiegu zmienności (Przykład 50).',
          },
        ],
      },
      {
        id: 'badanie-przebiegu-zmiennosci',
        heading: '6.3. Kompletny 5-etapowy algorytm badania przebiegu zmienności — Przykład 50: $f(x) = e^{-x^2/2}$',
        blocks: [
          {
            type: 'p',
            text: 'W sekcji 5.10 wykładu podano standardowy schemat badania przebiegu zmienności funkcji — rozwiążmy krok po kroku wzorcowy **Przykład 50** (krzywa dzwonowa Gaussa $f(x) = e^{-x^2/2}$):',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              {
                title: 'Analiza funkcji',
                text: '(a) **Dziedzina:** $D_f = \\mathbb{R}$. (b) **Przecięcia z osiami:** z $OX$ brak (bo $e^u > 0$); z $OY$: $f(0) = e^0 = 1$, punkt $(0, 1)$. (c) **Parzystość:** $f(-x) = e^{-(-x)^2/2} = f(x)$ $\\Rightarrow$ **funkcja parzysta** (symetria względem osi $OY$); nieokresowa. (d) **Granice i asymptoty:** brak pionowych ($D_f = \\mathbb{R}$); $\\lim_{x\\to\\pm\\infty} e^{-x^2/2} = 0$ $\\Rightarrow$ **asymptota pozioma obustronna $y = 0$** (brak ukośnych).',
              },
              {
                title: 'Analiza I pochodnej (monotoniczność i ekstrema)',
                text: '$f\'(x) = -x e^{-x^2/2}$ ($D_{f\'} = \\mathbb{R}$). Miejsce zerowe: $f\'(x) = 0 \\iff x = 0$. Dla $x < 0$: $f\' > 0$ (rosnąca); dla $x > 0$: $f\' < 0$ (malejąca) $\\implies$ **maksimum lokalne i globalne** $f(0) = 1$.',
              },
              {
                title: 'Analiza II pochodnej (wypukłość i punkty przegięcia)',
                text: '$f\'\'(x) = (-1)\\cdot e^{-x^2/2} + (-x)(-x e^{-x^2/2}) = (x^2 - 1)e^{-x^2/2}$. Miejsca zerowe: $x = -1$ oraz $x = 1$. Dla $x \\in (-\\infty, -1) \\cup (1, \\infty)$: $f\'\' > 0$ (**wypukła**); dla $x \\in (-1, 1)$: $f\'\' < 0$ (**wklęsła**). Dwa **punkty przegięcia**: $P_1(-1, e^{-1/2})$ oraz $P_2(1, e^{-1/2})$, gdzie $e^{-1/2} \\approx 0{,}607$.',
              },
            ],
          },
          {
            type: 'table',
            caption: 'Etap 4 — Tabelka przebiegu zmienności funkcji $f(x) = e^{-x^2/2}$ (wykres interaktywny powyżej!)',
            headers: ['$x$', '$(-\\infty, -1)$', '$-1$', '$(-1, 0)$', '$0$', '$(0, 1)$', '$1$', '$(1, +\\infty)$'],
            rows: [
              ['$f\'(x)$', '$+$', '$+$', '$+$', '$0$', '$-$', '$-$', '$-$'],
              ['$f\'\'(x)$', '$+$', '$0$', '$-$', '$-$', '$-$', '$0$', '$+$'],
              ['$f(x)$', 'rosnąca, wypukła ($\\to 0^+$)', '**p. przeg.** $e^{-1/2}$', 'rosnąca, wklęsła', '**MAX** $1$', 'malejąca, wklęsła', '**p. przeg.** $e^{-1/2}$', 'malejąca, wypukła ($\\to 0^+$)'],
            ],
          },
        ],
      },
    ],
  },
];
