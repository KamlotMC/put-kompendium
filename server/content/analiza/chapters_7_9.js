export const ANALIZA_CHAPTERS_7_9 = [
  {
    id: 'analiza-ch7',
    subject_id: 'analiza',
    order_index: 7,
    slug: 'calki-nieoznaczone-czesci-podstawienie',
    title: 'Rozdział 7: Całki nieoznaczone — funkcja pierwotna, podstawowe wzory, części i podstawienie',
    subtitle: 'Definicja pierwotnej i całki nieoznaczonej, 11 całek bazowych, wyprowadzenie całkowania przez części i podstawienie oraz przykłady 51–60',
    lecture_ref: 'Wykład cz. 2, rozdz. 6.1–6.3 (str. 15–16)',
    estimated_minutes: 35,
    summary:
      'Wprowadzenie do rachunku całkowego: czym jest funkcja pierwotna i dlaczego zawsze dodajemy stałą $+c$, pełna tablica 11 całek podstawowych (Przykłady 51–54), skąd wynikają wzory na całkowanie przez części i przez podstawienie (Tw. 38 i 39 — pełne dowody!), ważny wniosek logarytmiczny $\\int \\frac{g\'}{g} = \\ln|g|+c$ (Przykład 57), zastosowanie fizyczne rzutu pionowego (Przykład 58) oraz całki z $\\operatorname{arctg} x$, $\\min\\{x, x^2\\}$ i wzór rekurencyjny (Przykłady 59–60).',
    exam_questions: [22, 23, 24],
    key_takeaways: [
      'Całka nieoznaczona $\\int f(x)\\,dx = F(x) + c$ to **rodzina wszystkich funkcji pierwotnych** (dla których $F\'(x) = f(x)$); każdą całkę możesz natychmiast sprawdzić, różniczkując wynik!',
      'Każda funkcja ciągła na przedziale ma całkę nieoznaczoną (Tw. 36), choć nie zawsze da się ją zapisać za pomocą funkcji elementarnych (np. $\\int e^{-x^2}\\,dx$).',
      'Wzór na całkowanie przez części $\\int u v\' = u v - \\int u\' v$ pochodzi wprost ze wzoru na pochodną iloczynu $(uv)\' = u\'v + uv\'$!',
      'Wzór na całkowanie przez podstawienie $\\int f(g(x))g\'(x)\\,dx = \\int f(t)\\,dt$ pochodzi wprost z reguły łańcuchowej $[F(g(x))]\' = f(g(x))g\'(x)$!',
    ],
    figures: [],
    sections: [
      {
        id: 'pierwotna-i-wzory-podstawowe',
        heading: '7.1. Funkcja pierwotna, całka nieoznaczona i 11 całek bazowych (Przykłady 51–54)',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Definicje 39–40 oraz Twierdzenia 34–37',
            text: 'Funkcja $F$ jest **funkcją pierwotną** dla $f$ na przedziale $I$, gdy $F\'(x) = f(x)$ dla $x \\in I$. Ponieważ pochodna stałej wynosi $0$, wszystkie pierwotne różnią się wyłącznie o stałą $c \\in \\mathbb{R}$ (wynika to z Tw. Lagrange’a — jeśli $G\' - F\' = 0$, to $G - F = c$). Rodzinę $\\{F(x) + c : c \\in \\mathbb{R}\\}$ nazywamy **całką nieoznaczoną** $\\int f(x)\\,dx = F(x) + c$.\n• Całkowanie i różniczkowanie są operacjami odwrotnymi: $\\left[\\int f(x)\\,dx\\right]\' = f(x)$ oraz $\\int f\'(x)\\,dx = f(x) + c$ (Tw. 35).\n• **Liniowość całki (Tw. 37):** $\\int (af(x) + bg(x))\\,dx = a\\int f(x)\\,dx + b\\int g(x)\\,dx$.',
          },
          {
            type: 'table',
            caption: 'Wszystkie 11 podstawowych całek z wykładu (str. 15–16 — OBOWIĄZKOWE NA PAMIĘĆ!)',
            headers: ['Całka', 'Wynik', 'Całka', 'Wynik'],
            rows: [
              ['1. $\\int 0\\,dx$', '$c$', '7. $\\int \\cos x\\,dx$', '$\\sin x + c$'],
              ['2. $\\int x^n\\,dx \\;(n\\neq -1)$', '$\\frac{x^{n+1}}{n+1} + c$', '8. $\\int \\frac{dx}{\\cos^2 x}$', '$\\operatorname{tg} x + c$'],
              ['3. $\\int \\frac{1}{x}\\,dx$', '$\\ln|x| + c$', '9. $\\int \\frac{dx}{\\sin^2 x}$', '$-\\operatorname{ctg} x + c$'],
              ['4. $\\int a^x\\,dx \\;(a>0, a\\neq 1)$', '$\\frac{a^x}{\\ln a} + c$', '10. $\\int \\frac{dx}{\\sqrt{1-x^2}}$', '$\\arcsin x + c$'],
              ['5. $\\int e^x\\,dx$', '$e^x + c$', '11. $\\int \\frac{dx}{1+x^2}$', '$\\operatorname{arctg} x + c$'],
              ['6. $\\int \\sin x\\,dx$', '$-\\cos x + c$', '*Wniosek:* $\\int \\frac{g\'(x)}{g(x)}\\,dx$', '$\\ln|g(x)| + c$'],
            ],
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykłady 53 i 54 (rozwiązane)',
            text: '**Przykład 53:**\n• $\\int \\sqrt{x}\\,dx = \\int x^{1/2}\\,dx = \\frac{x^{3/2}}{3/2} + c = \\mathbf{\\frac{2}{3}x\\sqrt{x} + c}$.\n• $\\int \\frac{dx}{x^2} = \\int x^{-2}\\,dx = \\frac{x^{-1}}{-1} + c = \\mathbf{-\\frac{1}{x} + c}$.\n• $\\int \\frac{dx}{5^x} = \\int \\left(\\frac{1}{5}\\right)^x\\,dx = \\frac{(1/5)^x}{\\ln(1/5)} + c = \\mathbf{-\\frac{1}{5^x \\ln 5} + c}$.\n\n**Przykład 54:** $\\int(3x^2 - 4x + 7 - 4\\cos x)\\,dx = \\mathbf{x^3 - 2x^2 + 7x - 4\\sin x + c}$.',
          },
          {
            type: 'svg',
            diagramId: 'antiderivative-family',
            title: 'Wykres interaktywny (Rozdział 7): Rodzina funkcji pierwotnych $F(x) + C$ — dlaczego stała $C$ nie zmienia nachylenia?',
          },
        ],
      },
      {
        id: 'calkowanie-czesci-podstawienie',
        heading: '7.2. Całkowanie przez części i przez podstawienie — skąd się biorą i Przykłady 55–60',
        blocks: [
          {
            type: 'callout',
            variant: 'proof',
            title: 'Dowody Twierdzeń 38 i 39 — Skąd biorą się obie główne metody całkowania?',
            text: '**1) Skąd pochodzi całkowanie przez części (Tw. 38)?**\nZaczynamy od wzoru na pochodną iloczynu: $\\big(u(x)v(x)\\big)\' = u\'(x)v(x) + u(x)v\'(x)$. Przenosimy $u\'v$ na lewą stronę: $u(x)v\'(x) = (u(x)v(x))\' - u\'(x)v(x)$. Całkujemy obie strony i korzystamy z $\\int (uv)\'\,dx = uv$:\n$$\\int u(x)v\'(x)\\,dx = u(x)v(x) - \\int u\'(x)v(x)\\,dx. \\quad \\square$$\n*Praktyczna reguła wyboru $u$ („LIATE”):* Jako $u$ (które różniczkujemy!) najchętniej bierzemy **L**ogarytmy, funkcje **I**nwersyjne (cyklometryczne $\\operatorname{arctg}, \\arcsin$), potem wielomiany (**A**lgebraiczne $x^n$), a jako $v\'$ (które całkujemy) bierzemy $e^x, \\sin x, \\cos x$.\n\n**2) Skąd pochodzi całkowanie przez podstawienie (Tw. 39)?**\nNiech $F$ będzie pierwotną dla $f$ ($F\' = f$). Z reguły łańcuchowej dla funkcji złożonej: $\\big[F(g(x))\\big]\' = F\'(g(x))g\'(x) = f(g(x))g\'(x)$. Zatem $F(g(x))$ jest pierwotną dla $f(g(x))g\'(x)$ — czyli podstawiając $t = g(x)$ ($dt = g\'(x)\\,dx$), dostajemy:\n$$\\int f(g(x))g\'(x)\\,dx = \\int f(t)\\,dt = F(t) + c = F(g(x)) + c. \\quad \\square$$',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykłady 55, 56 i 57 (rozwiązane krok po kroku!)',
            text: '**Przykład 55 (przez części — 3 klasyczne triki!):**\n1) $\\int x e^x\\,dx$: bierzemy $u = x \\,(u\'=1)$, $v\' = e^x \\,(v=e^x)$ $\\implies x e^x - \\int e^x\\,dx = \\mathbf{e^x(x-1) + c}$.\n2) **Całka zwrotna (pętla!)** $I = \\int \\sin x\\, e^x\\,dx$: całkujemy przez części DWUKROTNIE (konsekwentnie biorąc funkcję tryg. jako $u$):\n   • I raz ($u = \\sin x, v\' = e^x$): $I = e^x\\sin x - \\int e^x\\cos x\\,dx$.\n   • II raz ($u = \\cos x, v\' = e^x$): $I = e^x\\sin x - \\big(e^x\\cos x + \\int e^x\\sin x\\,dx\\big) = e^x(\\sin x - \\cos x) - I$.\n   Przenosimy $-I$ na lewą stronę: $2I = e^x(\\sin x - \\cos x) \\implies \\mathbf{I = \\frac{1}{2}e^x(\\sin x - \\cos x) + c}$!\n3) **Trik z jedynką!** $\\int \\ln x\\,dx = \\int 1 \\cdot \\ln x\\,dx$: bierzemy $u = \\ln x \\,(u\'=\\frac{1}{x})$, $v\' = 1 \\,(v=x)$:\n$$= x\\ln x - \\int x \\cdot \\frac{1}{x}\\,dx = \\mathbf{x\\ln x - x + c}.$$\n\n**Przykład 56 (przez podstawienie):**\n• $\\int \\frac{dx}{\\sqrt{2x+5}}$: $t = 2x+5$, $dt = 2\\,dx \\implies dx = \\frac{1}{2}dt$: $\\frac{1}{2}\\int t^{-1/2}\\,dt = \\sqrt{t} + c = \\mathbf{\\sqrt{2x+5} + c}$.\n• $\\int e^{\\sin x}\\cos x\\,dx$: $t = \\sin x$, $dt = \\cos x\\,dx$: $\\int e^t\\,dt = \\mathbf{e^{\\sin x} + c}$.\n• $\\int \\frac{\\arcsin x}{\\sqrt{1-x^2}}\\,dx$: $t = \\arcsin x$, $dt = \\frac{dx}{\\sqrt{1-x^2}}$: $\\int t\\,dt = \\frac{t^2}{2} + c = \\mathbf{\\frac{1}{2}\\arcsin^2 x + c}$.\n\n**Przykład 57 (wniosek logarytmiczny i ważne całki tryg.):**\n• $\\int \\operatorname{tg} x\\,dx = \\int \\frac{\\sin x}{\\cos x}\\,dx = -\\int \\frac{(\\cos x)\'}{\\cos x}\\,dx = \\mathbf{-\\ln|\\cos x| + c}$.\n• $\\int \\operatorname{ctg} x\\,dx = \\int \\frac{\\cos x}{\\sin x}\\,dx = \\mathbf{\\ln|\\sin x| + c}$.\n• $\\int \\frac{dx}{\\sin x} = \\int \\frac{dx}{2\\sin\\frac{x}{2}\\cos\\frac{x}{2}} = \\int \\frac{\\frac{1}{2\\cos^2(x/2)}}{\\operatorname{tg}(x/2)}\\,dx = \\mathbf{\\ln\\left|\\operatorname{tg}\\frac{x}{2}\\right| + c}$.\n• $\\int \\frac{dx}{\\cos x} = \\int \\frac{dx}{\\sin(x + \\frac{\\pi}{2})} = \\mathbf{\\ln\\left|\\operatorname{tg}\\left(\\frac{x}{2} + \\frac{\\pi}{4}\\right)\\right| + c}$.',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykłady 58, 59 i 60 — Rzut pionowy, $\\operatorname{arctg} x$, $\\min\\{x, x^2\\}$ i wzór rekurencyjny',
            text: '**Przykład 58 (Fizyka):** Przyspieszenie $a(t) = v\'(t) = -g$. Całkując: $v(t) = -gt + C_1$. Z warunku $v(0) = v_0 \\implies C_1 = v_0$, więc $v(t) = v_0 - gt$. Całkując ponownie: $s(t) = v_0 t - \\frac{1}{2}gt^2 + C_2$ (dla $s(0)=0$: $s(t) = v_0 t - \\frac{1}{2}gt^2$).\n\n**Przykład 59:**\n1) $\\int \\operatorname{arctg} x\\,dx$ (trik $u=\\operatorname{arctg} x$, $v\'=1$): $= x\\operatorname{arctg} x - \\int \\frac{x}{1+x^2}\\,dx = \\mathbf{x\\operatorname{arctg} x - \\frac{1}{2}\\ln(1+x^2) + c}$.\n2) $\\int \\frac{x\\,dx}{\\cos^2 x}$ ($u = x$, $v\' = \\frac{1}{\\cos^2 x} \\implies v = \\operatorname{tg} x$): $= x\\operatorname{tg} x - \\int \\operatorname{tg} x\\,dx = \\mathbf{x\\operatorname{tg} x + \\ln|\\cos x| + c}$.\n3) $\\int \\min\\{x, x^2\\}\\,dx$: zauważmy, że $x^2 \\le x \\iff x \\in [0, 1]$! Więc na $(0,1)$ całkujemy $x^2$ ($\\frac{x^3}{3}$), a poza $[0,1]$ całkujemy $x$ ($\\frac{x^2}{2}$), sklejając stałe tak, aby pierwotna była ciągła w $0$ i $1$:\n$$F(x) = \\begin{cases} \\frac{1}{2}x^2 + c & \\text{dla } x < 0, \\\\ \\frac{1}{3}x^3 + c & \\text{dla } 0 \\le x \\le 1, \\\\ \\frac{1}{2}x^2 - \\frac{1}{6} + c & \\text{dla } x > 1. \\end{cases}$$\n\n**Przykład 60 (Wzór rekurencyjny):** Dla $\\int x^n e^x\\,dx$ bierzemy $u = x^n$ ($u\' = n x^{n-1}$), $v\' = e^x$ ($v = e^x$) $\\implies \\int x^n e^x\\,dx = x^n e^x - n\\int x^{n-1}e^x\\,dx$. Stąd dla $n = 2$:\n$$\\int x^2 e^x\\,dx = x^2 e^x - 2\\int x e^x\\,dx = x^2 e^x - 2(xe^x - e^x) + c = \\mathbf{e^x(x^2 - 2x + 2) + c}.$$',
          },
        ],
      },
    ],
  },
  {
    id: 'analiza-ch8',
    subject_id: 'analiza',
    order_index: 8,
    slug: 'calkowanie-wymierne-trygonometryczne-niewymierne',
    title: 'Rozdział 8: Całkowanie funkcji wymiernych, trygonometrycznych i niewymiernych',
    subtitle: 'Dzielenie wielomianów, ułamki proste I i II rodzaju, wzory redukcyjne dla sin/cos/tg, podstawienie uniwersalne tg(x/2), podstawienie Eulera i metoda współczynników nieoznaczonych',
    lecture_ref: 'Wykład cz. 3, rozdz. 6.4–6.7 (str. 17–20)',
    estimated_minutes: 45,
    summary:
      'Kompletny warsztat zaawansowanego całkowania z wykładu cz. 3: 5-krokowy algorytm całkowania funkcji wymiernych (Przykłady 61–66) wraz z wyprowadzeniem wzoru rekurencyjnego dla $(x^2+a^2)^m$, wszystkie metody dla funkcji trygonometrycznych — iloczyny, wzory redukcyjne, podstawienie uniwersalne $t=\\operatorname{tg}\\frac{x}{2}$ oraz kryteria parzystości (Przykłady 67–75) oraz całkowanie funkcji niewymiernych, podstawienie Eulera $\\int \\frac{dx}{\\sqrt{x^2+k}}$ i metoda współczynników nieoznaczonych (Przykłady 76–80).',
    exam_questions: [25, 26, 27],
    key_takeaways: [
      'Algorytm funkcji wymiernej $\\frac{L(x)}{M(x)}$: (1) Jeśli $\\deg L \\ge \\deg M$, NAJPIERW podziel wielomiany! (2) Rozłóż $M(x)$ na czynniki liniowe i nierozkładalne kwadratowe ($\\Delta < 0$). (3) Rozłóż na ułamki proste I i II rodzaju. (4) Scałkuj każdy ułamek ($\\ln$, potęga, $\\operatorname{arctg}$ lub rekurencja).',
      'Zawsze używaj najszybszego podstawienia trygonometrycznego: $R(-\\sin, -\\cos)=R \\implies t=\\operatorname{tg} x$; $R(-\\sin,\\cos)=-R \\implies t=\\cos x$; $R(\\sin,-\\cos)=-R \\implies t=\\sin x$; dopiero gdy żadne nie działa — uniwersalne $t=\\operatorname{tg}\\frac{x}{2}$!',
      'Dwie najważniejsze całki niewymierne z pierwiastkiem z trójmianu kwadratowego (po sprowadzeniu do postaci kanonicznej): $\\int\\frac{dx}{\\sqrt{x^2+k}} = \\ln|x+\\sqrt{x^2+k}|+c$ (dla $a>0$) oraz $\\int\\frac{dx}{\\sqrt{a^2-x^2}} = \\arcsin\\frac{x}{a}+c$ (dla $a<0$).',
    ],
    figures: [],
    sections: [
      {
        id: 'funkcje-wymierne',
        heading: '8.1. Algorytm całkowania funkcji wymiernych i ułamki proste (Przykłady 61–66)',
        blocks: [
          {
            type: 'callout',
            variant: 'theorem',
            title: 'Algorytm całkowania funkcji wymiernej $\\int \\frac{L(x)}{M(x)}\\,dx$ (Def. 41 i Tw. 40)',
            text: '1. **Dzielenie wielomianów:** Jeśli $\\deg L \\ge \\deg M$, dzielimy pisemnie: $\\frac{L(x)}{M(x)} = W(x) + \\frac{P(x)}{M(x)}$, gdzie $\\deg P < \\deg M$.\n2. **Faktoryzacja mianownika $M(x)$:** Rozkładamy $M(x)$ nad $\\mathbb{R}$ na czynniki liniowe $(a_i x + b_i)^{n_i}$ oraz nierozkładalne kwadratowe $(c_j x^2 + d_j x + e_j)^{m_j}$ (o $\\Delta = d_j^2 - 4 c_j e_j < 0$).\n3. **Rozkład na ułamki proste (Tw. 40):**\n   • Czynnikowi $(ax+b)^n$ odpowiada suma $n$ ułamków I rodzaju: $\\frac{A_1}{ax+b} + \\frac{A_2}{(ax+b)^2} + \\dots + \\frac{A_n}{(ax+b)^n}$.\n   • Czynnikowi $(cx^2+dx+e)^m$ odpowiada suma $m$ ułamków II rodzaju: $\\frac{B_1 x + C_1}{cx^2+dx+e} + \\dots + \\frac{B_m x + C_m}{(cx^2+dx+e)^m}$.\n4. **Całkowanie ułamków I rodzaju:** przez proste podstawienie $t = ax + b$ (dostajemy $\\ln|ax+b|$ dla $n=1$ albo potęgę dla $n>1$).\n5. **Całkowanie ułamków II rodzaju:** rozbijamy licznik na wielokrotność pochodnej mianownika plus stałą: $\\frac{\\alpha(2cx+d)}{cx^2+dx+e} + \\frac{\\beta}{cx^2+dx+e}$. Pierwsza część daje $\\alpha\\ln|cx^2+dx+e|$, a drugą sprowadzamy przez postać kanoniczną do wzoru:\n$$\\int\\frac{dx}{x^2 + a^2} = \\frac{1}{a}\\operatorname{arctg}\\frac{x}{a} + c \\quad (a > 0)$$\n(a dla potęgi $m \\ge 2$ stosujemy wzór rekurencyjny!).',
          },
          {
            type: 'callout',
            variant: 'proof',
            title: 'Skąd bierze się wzór rekurencyjny na $I_m = \\int \\frac{dx}{(x^2+a^2)^m}$ (str. 18)?',
            text: 'Przekształcamy $I_{m-1} = \\int \\frac{1}{(x^2+a^2)^{m-1}}\\,dx$ przez części ($u = (x^2+a^2)^{-(m-1)}$, $v\'=1 \\implies v=x$, $u\' = -2(m-1)x(x^2+a^2)^{-m}$):\n$$I_{m-1} = \\frac{x}{(x^2+a^2)^{m-1}} + 2(m-1)\\int\\frac{x^2}{(x^2+a^2)^m}\\,dx.$$\nW liczniku ostatniej całki dopisujemy $+a^2 - a^2$: $\\frac{x^2 + a^2 - a^2}{(x^2+a^2)^m} = \\frac{1}{(x^2+a^2)^{m-1}} - \\frac{a^2}{(x^2+a^2)^m}$, co daje:\n$$I_{m-1} = \\frac{x}{(x^2+a^2)^{m-1}} + 2(m-1)I_{m-1} - 2(m-1)a^2 I_m.$$\nWyliczając z tego równania $I_m$, otrzymujemy dokładnie wzór ze skryptu:\n$$\\int\\frac{dx}{(x^2+a^2)^m} = \\frac{x}{2(m-1)a^2(x^2+a^2)^{m-1}} + \\frac{2m-3}{2(m-1)a^2}\\int\\frac{dx}{(x^2+a^2)^{m-1}}. \\quad \\square$$',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykłady 61–65 (wybrane kluczowe rozwiązania krok po kroku)',
            text: '**Przykład 61a:** $\\frac{x^3+2}{x+1} = \\frac{(x^3+1) + 1}{x+1} = x^2 - x + 1 + \\frac{1}{x+1} \\implies \\int = \\mathbf{\\frac{x^3}{3} - \\frac{x^2}{2} + x + \\ln|x+1| + c}$.\n\n**Przykład 62a:** $\\frac{4x+3}{3x^2+7x+2} = \\frac{4x+3}{(3x+1)(x+2)} = \\frac{A}{3x+1} + \\frac{B}{x+2}$. Mnożymy przez mianownik: $4x+3 = A(x+2) + B(3x+1)$.\n• $x = -2$: $-5 = -5B \\implies B = 1$.\n• $x = -\\frac{1}{3}$: $\\frac{5}{3} = \\frac{5}{3}A \\implies A = 1$.\nWynik rozkładu: $\\frac{1}{3x+1} + \\frac{1}{x+2}$.\n\n**Przykład 62c:** $\\frac{1}{(x-1)(x^2+1)} = \\frac{A}{x-1} + \\frac{Bx+C}{x^2+1} \\implies 1 = A(x^2+1) + (Bx+C)(x-1)$. Dla $x=1$: $A = \\frac{1}{2}$; porównując współczynniki przy $x^2$ i wyraz wolny: $B = -\\frac{1}{2}$, $C = -\\frac{1}{2}$.\n\n**Przykład 64:**\n• $\\int \\frac{dx}{x^2+9} = \\mathbf{\\frac{1}{3}\\operatorname{arctg}\\frac{x}{3} + c}$.\n• $\\int \\frac{dx}{x^2-2x+2} = \\int \\frac{dx}{(x-1)^2 + 1} = \\mathbf{\\operatorname{arctg}(x-1) + c}$.\n• $\\int \\frac{x\\,dx}{x^2-2x+2} = \\frac{1}{2}\\int\\frac{(2x-2)+2}{x^2-2x+2}\\,dx = \\frac{1}{2}\\int\\frac{2x-2}{x^2-2x+2}\\,dx + \\int\\frac{dx}{(x-1)^2+1} = \\mathbf{\\frac{1}{2}\\ln(x^2-2x+2) + \\operatorname{arctg}(x-1) + c}$.\n\n**Przykład 65:** $\\int \\frac{x\\,dx}{(x^2-2x+2)^2} = \\frac{1}{2}\\int\\frac{2x-2}{(x^2-2x+2)^2}\\,dx + \\int\\frac{dx}{((x-1)^2+1)^2}$. Pierwsza część ($t=x^2-2x+2$) daje $-\\frac{1}{2(x^2-2x+2)}$. Druga z wzoru rekurencyjnego ($m=2, a=1, u=x-1$) daje $\\frac{x-1}{2((x-1)^2+1)} + \\frac{1}{2}\\operatorname{arctg}(x-1)$. Razem: $\\mathbf{\\frac{x-2}{2(x^2-2x+2)} + \\frac{1}{2}\\operatorname{arctg}(x-1) + c}$.',
          },
        ],
      },
      {
        id: 'funkcje-trygonometryczne',
        heading: '8.2. Całkowanie funkcji trygonometrycznych — redukcja i podstawienia (Przykłady 67–75)',
        blocks: [
          {
            type: 'table',
            caption: 'Ściągawka wyboru podstawienia dla całek $\\int R(\\sin x, \\cos x)\\,dx$ (str. 18–19)',
            headers: ['Warunek symetrii funkcji $R(\\sin x, \\cos x)$', 'Podstawienie', 'Wzory zamiany ($dx, \\sin x, \\cos x$)'],
            rows: [
              ['$R(-\\sin x, -\\cos x) = R(\\sin x, \\cos x)$ *(parzysta względem pary)*', '$t = \\operatorname{tg} x$', '$dx = \\frac{dt}{1+t^2},\\; \\sin x = \\frac{t}{\\sqrt{1+t^2}},\\; \\cos x = \\frac{1}{\\sqrt{1+t^2}}$ *(szybciej: $\\cos^2 x = \\frac{1}{1+t^2}$)*'],
              ['$R(-\\sin x, \\cos x) = -R(\\sin x, \\cos x)$ *(nieparzysta w $\\sin$)*', '$t = \\cos x$', '$dt = -\\sin x\\,dx$, $\\sin^2 x = 1 - t^2$'],
              ['$R(\\sin x, -\\cos x) = -R(\\sin x, \\cos x)$ *(nieparzysta w $\\cos$)*', '$t = \\sin x$', '$dt = \\cos x\\,dx$, $\\cos^2 x = 1 - t^2$'],
              ['**Uniwersalne** *(działa ZAWSZE, gdy inne zawodzą)*', '$t = \\operatorname{tg}\\frac{x}{2}$', '$dx = \\frac{2\\,dt}{1+t^2},\\; \\sin x = \\frac{2t}{1+t^2},\\; \\cos x = \\frac{1-t^2}{1+t^2}$'],
            ],
          },
          {
            type: 'callout',
            variant: 'proof',
            title: 'Skąd się biorą wzory redukcyjne dla $\\int \\sin^n x\\,dx$ oraz $\\int \\operatorname{tg}^n x\\,dx$ (Przykłady 69–72)?',
            text: '**1) Wzór na $I_n = \\int \\sin^n x\\,dx$ ($n \\ge 2$):** Rozbijamy $\\sin^n x = \\sin^{n-1}x \\cdot \\sin x$ i całkujemy przez części ($u = \\sin^{n-1}x$, $v\' = \\sin x \\implies v = -\\cos x$):\n$$I_n = -\\sin^{n-1}x\\cos x + (n-1)\\int \\sin^{n-2}x \\underbrace{\\cos^2 x}_{1 - \\sin^2 x}\\,dx = -\\sin^{n-1}x\\cos x + (n-1)I_{n-2} - (n-1)I_n.$$\nPrzenosząc $-(n-1)I_n$ na lewo mamy $n I_n$, więc dzieląc przez $n$:\n$$\\int \\sin^n x\\,dx = -\\frac{1}{n}\\sin^{n-1}x\\cos x + \\frac{n-1}{n}\\int \\sin^{n-2}x\\,dx. \\quad \\square$$\n**2) Wzór na $\\int \\operatorname{tg}^n x\\,dx$ ($n > 2$, Przykład 72):** Z tożsamości $\\operatorname{tg}^2 x = \\frac{1}{\\cos^2 x} - 1$:\n$$\\int \\operatorname{tg}^n x\\,dx = \\int \\operatorname{tg}^{n-2}x\\left(\\frac{1}{\\cos^2 x} - 1\\right)dx = \\frac{\\operatorname{tg}^{n-1}x}{n-1} - \\int \\operatorname{tg}^{n-2}x\\,dx. \\quad \\square$$',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykłady 68, 69, 71, 74 i 75 (rozwiązane krok po kroku)',
            text: '**Przykład 68 (iloczyny funkcji):** Z $\\sin\\alpha\\cos\\beta = \\frac{1}{2}[\\sin(\\alpha+\\beta)+\\sin(\\alpha-\\beta)]$:\n$$\\int \\sin 3x\\cos 2x\\,dx = \\frac{1}{2}\\int(\\sin 5x + \\sin x)\\,dx = \\mathbf{-\\frac{1}{10}\\cos 5x - \\frac{1}{2}\\cos x + c}.$$\n\n**Przykład 69:** Z $\\sin^2 x = \\frac{1-\\cos 2x}{2}$ i $\\cos^2 x = \\frac{1+\\cos 2x}{2}$:\n$$\\int \\sin^2 x\\,dx = \\mathbf{\\frac{x}{2} - \\frac{\\sin 2x}{4} + c}, \\qquad \\int \\cos^2 x\\,dx = \\mathbf{\\frac{x}{2} + \\frac{\\sin 2x}{4} + c}.$$\n\n**Przykład 71:** $\\int \\operatorname{tg}^2 x\\,dx = \\int\\left(\\frac{1}{\\cos^2 x} - 1\\right)dx = \\mathbf{\\operatorname{tg} x - x + c}$.\n\n**Przykład 74 ($R(-\\sin,-\\cos)=R \\implies t=\\operatorname{tg} x$):** $\\int \\frac{dx}{1 + 2\\cos^2 x}$. Skoro $\\cos^2 x = \\frac{1}{1+t^2}$ i $dx = \\frac{dt}{1+t^2}$:\n$$= \\int \\frac{\\frac{dt}{1+t^2}}{1 + \\frac{2}{1+t^2}} = \\int \\frac{dt}{t^2 + 3} = \\frac{1}{\\sqrt{3}}\\operatorname{arctg}\\frac{t}{\\sqrt{3}} + c = \\mathbf{\\frac{1}{\\sqrt{3}}\\operatorname{arctg}\\left(\\frac{\\operatorname{tg} x}{\\sqrt{3}}\\right) + c}.$$\n\n**Przykład 75:** W $\\int \\frac{\\sin^4 x}{\\cos x}\\,dx$ funkcja jest nieparzysta w $\\cos x$ $\\implies$ podstawiamy $t = \\sin x$ ($dt = \\cos x\\,dx$ po domnożeniu licznika i mianownika przez $\\cos x$): $\\int \\frac{t^4}{1 - t^2}\\,dt$ (zwykła całka wymierna!).',
          },
          {
            type: 'svg',
            diagramId: 'trig-weierstrass-circle',
            title: 'Rysunek geometryczny (Rozdział 8): Skąd bierze się podstawienie uniwersalne $t = \\operatorname{tg}\\frac{x}{2}$? (Rzut stereograficzny okręgu)',
          },
        ],
      },
      {
        id: 'funkcje-niewymierne',
        heading: '8.3. Całkowanie funkcji niewymiernych, podstawienie Eulera i współczynniki nieoznaczone (Przykłady 76–80)',
        blocks: [
          {
            type: 'callout',
            variant: 'proof',
            title: 'Skąd bierze się wzór $\\int \\frac{dx}{\\sqrt{x^2 + k}} = \\ln|x + \\sqrt{x^2 + k}| + c$ (Podstawienie Eulera)?',
            text: 'Podstawiamy **$t = x + \\sqrt{x^2 + k}$**. Różniczkujemy obie strony:\n$$dt = \\left(1 + \\frac{2x}{2\\sqrt{x^2+k}}\\right)dx = \\frac{\\sqrt{x^2+k} + x}{\\sqrt{x^2+k}}\\,dx = \\frac{t}{\\sqrt{x^2+k}}\\,dx \\implies \\frac{dx}{\\sqrt{x^2+k}} = \\frac{dt}{t}!$$\nCałka staje się natychmiastowa: $\\int \\frac{dt}{t} = \\ln|t| + c = \\ln|x + \\sqrt{x^2 + k}| + c$. $\\square$\nAnalogicznie dla $a > 0$ w $\\int \\frac{dx}{\\sqrt{a^2 - x^2}}$ podstawienie $x = a t$ ($dx = a\\,dt$) daje od razu $\\int \\frac{dt}{\\sqrt{1-t^2}} = \\arcsin\\frac{x}{a} + c$.',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykłady 76–80 (rozwiązane krok po kroku!)',
            text: '**Przykład 76 (wspólny mianownik wykładników):** $\\int \\frac{dx}{\\sqrt{x} + \\sqrt[3]{x}}$ — wykładniki $\\frac{1}{2}$ i $\\frac{1}{3}$ mają wspólny mianownik $n = 6$, więc podstawiamy **$x = t^6$**, $dx = 6t^5\\,dt$:\n$$= \\int \\frac{6t^5\\,dt}{t^3 + t^2} = 6\\int \\frac{t^3}{t + 1}\\,dt = 6\\int\\left(t^2 - t + 1 - \\frac{1}{t+1}\\right)dt = 2t^3 - 3t^2 + 6t - 6\\ln|t+1| + c, \\quad t = \\sqrt[6]{x}.$$\n\n**Przykład 78 ($a > 0$, postać kanoniczna + wzór Eulera):** $\\int \\frac{dx}{\\sqrt{x^2 - 6x + 15}} = \\int \\frac{dx}{\\sqrt{(x-3)^2 + 6}}$. Podstawienie $u = x - 3$ daje $\\mathbf{\\ln\\left|x - 3 + \\sqrt{x^2 - 6x + 15}\\right| + c}$.\n\n**Przykład 79 ($a < 0$, rozbicie licznika na pochodną + stałą):** $\\int \\frac{x - 5}{\\sqrt{5 + 4x - x^2}}\\,dx$. Pochodna spod pierwiastka to $4 - 2x$, więc zapisujemy $x - 5 = -\\frac{1}{2}(4 - 2x) - 3$:\n$$= -\\frac{1}{2}\\int\\frac{4-2x}{\\sqrt{5+4x-x^2}}\\,dx - 3\\int\\frac{dx}{\\sqrt{9 - (x-2)^2}} = \\mathbf{-\\sqrt{5+4x-x^2} - 3\\arcsin\\frac{x-2}{3} + c}.$$\n\n**Przykład 80 (Metoda współczynników nieoznaczonych):** $\\int \\frac{-2x^2 - 3x + 4}{\\sqrt{1 - x^2}}\\,dx$. Ponieważ $\\deg W_n = 2$, przewidujemy rozwiązanie postaci:\n$$\\int \\frac{-2x^2 - 3x + 4}{\\sqrt{1-x^2}}\\,dx = (ax + b)\\sqrt{1-x^2} + A\\int\\frac{dx}{\\sqrt{1-x^2}}.$$\nRóżniczkujemy obie strony i mnożymy przez $\\sqrt{1-x^2}$:\n$$-2x^2 - 3x + 4 = a(1-x^2) - x(ax+b) + A = -2ax^2 - bx + (a + A).$$\nPorównując współczynniki przy potęgach $x$: $-2a = -2 \\implies a = 1$; $-b = -3 \\implies b = 3$; $a + A = 4 \\implies A = 3$.\nOstateczny wynik: $\\mathbf{(x + 3)\\sqrt{1 - x^2} + 3\\arcsin x + c}$!',
          },
        ],
      },
    ],
  },
  {
    id: 'analiza-ch9',
    subject_id: 'analiza',
    order_index: 9,
    slug: 'calka-oznaczona-zastosowania-niewlasciwe',
    title: 'Rozdział 9: Całka oznaczona Riemanna, pola, objętości, fizyka i całki niewłaściwe',
    subtitle: 'Sumy całkowe (RYSUNKI str. 20–21), funkcja górnej granicy, wzór Newtona–Leibniza, pola obszarów, długość łuku, kula i stożek, praca/droga oraz całki niewłaściwe I i II rodzaju',
    lecture_ref: 'Wykład cz. 3, rozdz. 7.1–7.4 (str. 20–24)',
    estimated_minutes: 45,
    summary:
      'Ukoronowanie analizy jednej zmiennej: konstrukcja całki oznaczonej Riemanna (4 RYSUNKI ze str. 20–21!), obliczenie $\\int_0^b x^2\\,dx$ wprost z definicji (Przykład 81), wartość średnia funkcji, funkcja górnej granicy całkowania i pełny dowód wzoru Newtona–Leibniza (Tw. 45 i 46), całkowanie przez części i podstawienie z zamianą granic (Przykłady 82–85), obliczanie pól między krzywymi (Przykład 86), długość łuku, objętość i pole kuli oraz stożka (Przykłady 88–90), droga i praca w fizyce oraz całki niewłaściwe I i II rodzaju (Przykłady 91–92).',
    exam_questions: [28, 29, 30],
    key_takeaways: [
      'Całka oznaczona $\\int_a^b f(x)\\,dx$ jest **liczbą** (granicą sum Riemanna $\\sum f(\\xi_i)\\Delta a_i$), a całka nieoznaczona jest **rodziną funkcji**! Łączy je fundamentalne **Twierdzenie Newtona–Leibniza**: $\\int_a^b f(x)\\,dx = F(b) - F(a)$.',
      'Przy podstawieniu w całce oznaczonej (Tw. 48) zmieniamy granice całkowania na $\\alpha = g(a)$, $\\beta = g(b)$ — wtedy NIE trzeba już wracać do zmiennej $x$!',
      'Dla funkcji nieparzystej na przedziale symetrycznym $[-a, a]$ mamy $\\int_{-a}^a f(x)\\,dx = 0$; dla parzystej $2\\int_0^a f(x)\\,dx$ (Fakt 10).',
      'Zawsze sprawdzaj, czy funkcja nie ma punktu nieciągłości (bieguna) WEWNĄTRZ przedziału całkowania! W $\\int_{-1}^1 \\frac{dx}{x^2}$ ślepe użycie Newtona–Leibniza daje fałszywy wynik $-2$ (dla dodatniej funkcji!), podczas gdy całka jest **rozbieżna do $+\\infty$** (Przykład 92)!',
    ],
    figures: [],
    sections: [
      {
        id: 'riemann-newton-leibniz',
        heading: '9.1. Suma Riemanna, 4 RYSUNKI ze str. 20–21, dowód wzoru Newtona–Leibniza (Przykłady 81–85)',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Definicje 42–44 i Twierdzenia 41–46 — Całka Riemanna, wartość średnia i Newton–Leibniz',
            text: 'Dzielimy $[a,b]$ punktami $a=a_0 < a_1 < \\dots < a_n = b$ o średnicy podziału $\\delta = \\max \\Delta a_i$ i wybieramy punkty pośrednie $\\xi_i \\in [a_{i-1}, a_i]$. **Całką oznaczoną Riemanna** nazywamy granicę sumy całkowej:\n$$\\int_a^b f(x)\\,dx = \\lim_{\\delta\\to 0}\\sum_{i=1}^n f(\\xi_i)\\Delta a_i.$$\n• **Tw. 43 (Oszacowanie):** Jeśli $m \\le f(x) \\le M$ na $[a,b]$, to $m(b-a) \\le \\int_a^b f(x)\\,dx \\le M(b-a)$.\n• **Tw. 44 (Całkowe o wartości średniej):** Dla $f$ ciągłej na $[a,b]$ istnieje $c \\in (a,b)$ takie, że $f(c) = f_{\\text{śr}} = \\frac{1}{b-a}\\int_a^b f(x)\\,dx$.\n• **Tw. 45 i 46 (Podstawowe twierdzenie rachunku całkowego i wzór Newtona–Leibniza):** Dla $f$ ciągłej na $[a,b]$ funkcja górnej granicy $F(x) = \\int_a^x f(t)\\,dt$ spełnia $F\'(x) = f(x)$, a dla dowolnej pierwotnej $F$:\n$$\\int_a^b f(x)\\,dx = \\big[F(x)\\big]_a^b = F(b) - F(a).$$',
          },
          {
            type: 'svg',
            diagramId: 'riemann-sum-integral',
            title: 'Interaktywne RYSUNKI ze str. 20–21: Sumy Riemanna, Oszacowanie m(b-a)≤∫f≤M(b-a), Wartość średnia oraz Funkcja górnej granicy F(x)',
            caption: 'Zmieniaj liczbę prostokątów $n$ w sumie Riemanna dla $x^2$ (Przykład 81) oraz obejrzyj wszystkie 4 brakujące rysunki z wykładu cz. 3.',
          },
          {
            type: 'callout',
            variant: 'proof',
            title: 'Dowody Twierdzeń 45 i 46 — Skąd się bierze wzór Newtona–Leibniza?',
            text: '**Dowód Tw. 45 ($F\'(x) = f(x)$):** Dla $F(x) = \\int_a^x f(t)\\,dt$ liczymy iloraz różnicowy:\n$$\\frac{F(x+h) - F(x)}{h} = \\frac{1}{h}\\left(\\int_a^{x+h} f(t)\\,dt - \\int_a^x f(t)\\,dt\\right) = \\frac{1}{h}\\int_x^{x+h} f(t)\\,dt.$$\nZ **Tw. 44 o wartości średniej** istnieje punkt $c_h$ między $x$ a $x+h$ taki, że prawa strona wynosi dokładnie $f(c_h)$. Gdy $h \\to 0$, to $c_h \\to x$, a z ciągłości $f$ mamy $f(c_h) \\to f(x)$, czyli $F\'(x) = f(x)$!\n\n**Dowód Tw. 46 (Newton–Leibniz):** Skoro $\\Phi(x) = \\int_a^x f(t)\\,dt$ jest pierwotną dla $f$, to każda inna pierwotna $F$ różni się o stałą: $F(x) = \\Phi(x) + C$. Ponieważ $\\Phi(a) = \\int_a^a f = 0$, mamy $C = F(a)$, a zatem $F(b) - F(a) = \\Phi(b) = \\int_a^b f(t)\\,dt$. $\\square$',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykłady 81–85 (rozwiązane krok po kroku!)',
            text: '**Przykład 81 (Z definicji Riemanna!):** $\\int_0^b x^2\\,dx$. Dzielimy $[0, b]$ na $n$ równych odcinków długości $\\Delta a_i = \\frac{b}{n}$ i wybieramy lewe końce $\\xi_i = \\frac{(i-1)b}{n}$ ($i=1,\\dots,n$). Suma całkowa:\n$$S_n = \\sum_{i=1}^n \\left(\\frac{(i-1)b}{n}\\right)^2 \\cdot \\frac{b}{n} = \\frac{b^3}{n^3}\\big(0^2 + 1^2 + \\dots + (n-1)^2\\big) = \\frac{b^3}{n^3} \\cdot \\frac{n(n-1)(2n-1)}{6} \\xrightarrow{n\\to\\infty} \\mathbf{\\frac{b^3}{3}}.$$\n\n**Przykład 82:** $\\int_0^1 (x^2 + 1)\\,dx = \\left[\\frac{x^3}{3} + x\\right]_0^1 = \\frac{1}{3} + 1 = \\mathbf{\\frac{4}{3}}$.\n**Przykład 83 (Wartość średnia $\\sin x$ na $[0,\\pi]$):** $f_{\\text{śr}} = \\frac{1}{\\pi - 0}\\int_0^\\pi \\sin x\\,dx = \\frac{1}{\\pi}[-\\cos x]_0^\\pi = \\frac{1-(-1)}{\\pi} = \\mathbf{\\frac{2}{\\pi}}$.\n\n**Przykład 84 (Podstawienie ze zmianą granic i części):**\n• $\\int_1^{e^8} \\frac{dx}{x\\sqrt{1+\\ln x}}$: podstawiamy $t = 1 + \\ln x$, $dt = \\frac{dx}{x}$; nowe granice: $x=1 \\implies t=1$, $x=e^8 \\implies t=9$:\n$$= \\int_1^9 t^{-1/2}\\,dt = \\big[2\\sqrt{t}\\big]_1^9 = 2(3 - 1) = \\mathbf{4}.$$\n• $\\int_0^\\pi x\\sin x\\,dx$ ($u=x, v\'=\\sin x$): $= \\big[-x\\cos x\\big]_0^\\pi + \\int_0^\\pi \\cos x\\,dx = (-\\pi(-1) - 0) + [\\sin x]_0^\\pi = \\mathbf{\\pi}$.\n\n**Przykład 85 (Tw. 49 — skończona liczba wyjątków nie zmienia całki!):** $\\int_{-\\pi}^{\\pi} \\operatorname{sgn}(|\\sin 4x|)\\,dx$. Funkcja $|\\sin 4x| > 0$ wszędzie poza skończoną liczbą zer ($x = k\\frac{\\pi}{4}$), więc $\\operatorname{sgn}(|\\sin 4x|) = 1$ niemal wszędzie $\\implies \\int_{-\\pi}^\\pi 1\\,dx = \\mathbf{2\\pi}$!',
          },
        ],
      },
      {
        id: 'zastosowania-geometria-fizyka',
        heading: '9.2. Pola obszarów, długość łuku, objętości i pola brył obrotowych oraz fizyka (Przykłady 86–90)',
        blocks: [
          {
            type: 'table',
            caption: 'Wszystkie wzory geometryczne i fizyczne całki oznaczonej (str. 22–23)',
            headers: ['Wielkość', 'Wzór', 'Komentarz / intuicja'],
            rows: [
              ['**Pole między krzywymi** ($f \\ge g$)', '$P = \\int_a^b \\big(f(x) - g(x)\\big)\\,dx$', 'Całkujemy zawsze *(krzywa górna − krzywa dolna)*; przy zmianie znaku rozbijamy na przedziały!'],
              ['**Symetria na $[-a,a]$** (Fakt 10)', 'Nieparzysta: $\\int_{-a}^a f = 0$; Parzysta: $2\\int_0^a f$', 'Błyskawicznie rozwiązuje całki takie jak Przykład 87!'],
              ['**Długość łuku krzywej**', '$L = \\int_a^b \\sqrt{1 + (f\'(x))^2}\\,dx$', 'Z twierdzenia Pitagorasa dla elementu łuku $ds = \\sqrt{dx^2 + dy^2} = \\sqrt{1+(y\')^2}\\,dx$.'],
              ['**Objętość bryły obrotowej** ($OX$)', '$V = \\pi \\int_a^b [f(x)]^2\\,dx$', 'Suma nieskończenie cienkich krążków (walców) o polu $\\pi r^2 = \\pi[f(x)]^2$ i grubości $dx$.'],
              ['**Pole powierzchni obrotowej** ($OX$)', '$S = 2\\pi \\int_a^b f(x)\\sqrt{1 + (f\'(x))^2}\\,dx$', 'Suma wstążek (pobocznic stożków ściętych) o obwodzie $2\\pi f(x)$ i szerokości łuku $ds$.'],
              ['**Objętość przez przekroje $S(x)$**', '$V = \\int_a^b S(x)\\,dx$', 'Uogólnienie (zasada Cavalieriego) — np. stożek, ostrosłup.'],
              ['**Droga i praca w fizyce** (Fakty 11–12)', '$L = \\int_a^b v(t)\\,dt$, $\\; W = \\int_a^b F(x)\\,dx$', 'Droga przy zmiennej prędkości oraz praca zmiennej siły wzdłuż osi $OX$.'],
            ],
          },
          {
            type: 'svg',
            diagramId: 'areas-between-curves',
            title: 'Wykresy do Przykładu 86 — Wszystkie 3 obszary ograniczone krzywymi z obliczeniem pól',
            caption: 'Przełączaj podpunkty (1), (2) i (3), aby zobaczyć punkty przecięcia i dokładne granice rozbicia całek.',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykłady 86–90 (rozwiązane krok po kroku!)',
            text: '**Przykład 86 (Pola obszarów):**\n1) $y = x^3 + x^2 - 2x = x(x-1)(x+2)$ i $y = 0$: zera $-2, 0, 1$. Na $(-2,0)$ krzywa leży nad osią $OX$, a na $(0,1)$ pod nią:\n$$P = \\int_{-2}^0 (x^3+x^2-2x)\\,dx - \\int_0^1 (x^3+x^2-2x)\\,dx = \\frac{8}{3} + \\frac{5}{12} = \\mathbf{\\frac{37}{12}}.$$\n2) $y = x^3$ i $y = 4x$: przecięcia $x = -2, 0, 2$; z symetrii:\n$$P = 2\\int_0^2 (4x - x^3)\\,dx = 2\\left[2x^2 - \\frac{x^4}{4}\\right]_0^2 = 2(8 - 4) = \\mathbf{8}.$$\n3) $y = x^2$, $y = \\frac{1}{2}x^2$, $y = 2x$: przecięcia $x^2 = 2x \\implies x=2$ oraz $\\frac{1}{2}x^2 = 2x \\implies x=4$. Dzielimy obszar w $x = 2$:\n$$P = \\int_0^2\\left(x^2 - \\frac{1}{2}x^2\\right)dx + \\int_2^4\\left(2x - \\frac{1}{2}x^2\\right)dx = \\frac{4}{3} + \\frac{8}{3} = \\mathbf{4}.$$\n\n**Przykład 87 (Fakt 10 — funkcje nieparzyste!):** Zarówno $\\sqrt[3]{\\sin x}$, jak i $e^{x^2}\\sin x$ są **nieparzyste** ($f(-x) = -f(x)$) na przedziałach symetrycznych $[-\\pi,\\pi]$ oraz $[-1,1]$ $\\implies$ obie całki są równe dokładnie **$0$** bez żadnego całkowania!\n\n**Przykład 88 (Długość łuku okręgu):** $y = \\sqrt{1-x^2}$ na $[0, \\frac{\\sqrt{2}}{2}]$. Mamy $y\' = \\frac{-x}{\\sqrt{1-x^2}} \\implies 1 + (y\')^2 = \\frac{1}{1-x^2}$. Stąd:\n$$L = \\int_0^{\\sqrt{2}/2} \\frac{dx}{\\sqrt{1-x^2}} = \\big[\\arcsin x\\big]_0^{\\sqrt{2}/2} = \\mathbf{\\frac{\\pi}{4}} \\quad (\\text{dokładnie } \\tfrac{1}{8} \\text{ obwodu okręgu } 2\\pi!).$$\n\n**Przykłady 89 i 90 (Wyprowadzenie wzorów na kulę i stożek!):**\n• **Kula o promieniu $R$:** obracamy półokrąg $f(x) = \\sqrt{R^2 - x^2}$ na $[-R, R]$:\n  $$V = \\pi\\int_{-R}^R (R^2 - x^2)\\,dx = 2\\pi\\left[R^2 x - \\frac{x^3}{3}\\right]_0^R = \\mathbf{\\frac{4}{3}\\pi R^3},$$\n  $$S = 2\\pi\\int_{-R}^R \\sqrt{R^2-x^2}\\cdot\\frac{R}{\\sqrt{R^2-x^2}}\\,dx = 2\\pi R\\int_{-R}^R 1\\,dx = \\mathbf{4\\pi R^2}.$$\n• **Stożek (promień podstawy $r$, wysokość $h$):** pole przekroju w odległości $x \\in [0, h]$ od wierzchołka wynosi $S(x) = \\pi\\left(\\frac{r}{h}x\\right)^2$:\n  $$V = \\int_0^h \\pi\\frac{r^2}{h^2}x^2\\,dx = \\pi\\frac{r^2}{h^2}\\cdot\\frac{h^3}{3} = \\mathbf{\\frac{1}{3}\\pi r^2 h}.$$',
          },
        ],
      },
      {
        id: 'calki-niewlasciwe',
        heading: '9.3. Całki niewłaściwe I i II rodzaju — zbieżność, rozbieżność i pułapki (Przykłady 91–92)',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Całki niewłaściwe I rodzaju (nieograniczony przedział) i II rodzaju (funkcja nieograniczona)',
            text: '• **I rodzaju:** $\\displaystyle\\int_a^\\infty f(x)\\,dx = \\lim_{T\\to\\infty}\\int_a^T f(x)\\,dx$. Dla $\\int_{-\\infty}^\\infty f(x)\\,dx$ rozbijamy w dowolnym $a \\in \\mathbb{R}$ na $\\int_{-\\infty}^a + \\int_a^\\infty$ — całka jest zbieżna **tylko wtedy, gdy OBIE połówki są niezależnie zbieżne!**\n• **II rodzaju (biegun w $b$):** $\\displaystyle\\int_a^b f(x)\\,dx = \\lim_{\\varepsilon\\to 0^+}\\int_a^{b-\\varepsilon} f(x)\\,dx$ (analogicznie w $a$: $\\lim_{\\varepsilon\\to 0^+}\\int_{a+\\varepsilon}^b$). Jeśli punkt nieograniczoności $c$ leży **wewnątrz** $(a, b)$, obowiązkowo rozbijamy całkę w punkcie $c$ na dwie całki!',
          },
          {
            type: 'svg',
            diagramId: 'solid-of-revolution-and-improper',
            title: 'Rysunki do Przykładów 89–92: Bryły obrotowe (kula/stożek) oraz całki niewłaściwe I i II rodzaju',
            caption: 'Porównaj zbieżne pole $\\int_0^\\infty \\frac{dx}{1+x^2}=\\frac{\\pi}{2}$ z rozbieżnym $\\int_1^\\infty \\frac{dx}{x}=\\infty$ oraz biegunem w $x=0$ dla $\\int_{-1}^1 \\frac{dx}{x^2}$.',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykłady 91 i 92 (rozwiązane krok po kroku!)',
            text: '**Przykład 91 (Całki niewłaściwe I rodzaju):**\n1) $\\displaystyle\\int_1^\\infty \\frac{dx}{x} = \\lim_{T\\to\\infty} [\\ln x]_1^T = \\lim_{T\\to\\infty} \\ln T = +\\infty$ $\\implies$ **całka rozbieżna**.\n2) $\\displaystyle\\int_0^\\infty \\frac{dx}{1+x^2} = \\lim_{T\\to\\infty} [\\operatorname{arctg} x]_0^T = \\frac{\\pi}{2} - 0 = \\mathbf{\\frac{\\pi}{2}}$ $\\implies$ **zbieżna**.\n3) $\\displaystyle\\int_{-\\infty}^0 \\frac{dx}{1+x^2} = \\lim_{T\\to -\\infty} [\\operatorname{arctg} x]_T^0 = 0 - \\left(-\\frac{\\pi}{2}\\right) = \\mathbf{\\frac{\\pi}{2}}$ $\\implies$ **zbieżna**.\n4) Ponieważ obie połówki są zbieżne: $\\displaystyle\\int_{-\\infty}^\\infty \\frac{dx}{1+x^2} = \\frac{\\pi}{2} + \\frac{\\pi}{2} = \\mathbf{\\pi}$.\n\n**Przykład 92 (SŁYNNA PUŁAPKA EGZAMINACYJNA!):** Oblicz $\\displaystyle\\int_{-1}^1 \\frac{dx}{x^2}$.\nFunkcja $\\frac{1}{x^2}$ jest **nieograniczona w $c = 0 \\in (-1, 1)$**! Jeśli ślepo zastosujemy Newtona–Leibniza: $[-\\frac{1}{x}]_{-1}^1 = -1 - 1 = -2$ (ABSURD — całka z dodatniej funkcji nie może być ujemna!).\nPoprawnie — rozbijamy w $c = 0$ na dwie całki II rodzaju:\n$$\\int_0^1 \\frac{dx}{x^2} = \\lim_{\\varepsilon\\to 0^+}\\left[-\\frac{1}{x}\\right]_\\varepsilon^1 = \\lim_{\\varepsilon\\to 0^+}\\left(-1 + \\frac{1}{\\varepsilon}\\right) = +\\infty.$$\nJuż jedna część jest rozbieżna $\\implies$ **całka $\\int_{-1}^1 \\frac{dx}{x^2}$ jest ROZBIEŻNA (do $+\\infty$)**!',
          },
        ],
      },
    ],
  },
];
