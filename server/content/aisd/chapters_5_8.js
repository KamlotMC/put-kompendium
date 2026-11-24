// Algorytmy i struktury danych — Rozdziały 5–8
// Źródło: Wykłady prowadzącego (Instytut Radiokomunikacji / Teleinformatyki, PUT):
// Wyklad 5.pdf (sl. 1–59), Wyklad 6.pdf (sl. 1–48)

export const AISD_CHAPTERS_5_8 = [
  {
    id: 'aisd-ch5',
    subject_id: 'aisd',
    order_index: 5,
    slug: 'tablice-rozproszone-haszowanie',
    title: 'Rozdział 5: Tablice rozproszone (haszowanie, funkcje mieszające i kolizje)',
    subtitle: 'Wykład 5 (cz. 1): T = (K, D, h), radix-128, dzielenie vs mnożenie (A ≈ 0,618), łańcuchowanie i otwarte adresowanie',
    lecture_ref: 'Wykład 5 · slajdy 1–13',
    estimated_minutes: 35,
    summary:
      'Tablice rozproszone jako szybkie słowniki $O(1)$ średnio: definicja $T=(K,D,h)$, współczynnik obciążenia $\\alpha = W/N$, konwersja kluczy tekstowych (radix-128 i sumowanie cyfr), funkcje mieszające przez dzielenie i przez mnożenie (ze złotą stałą $A = (\\sqrt{5}-1)/2$), oraz dwie strategie rozwiązywania kolizji: łańcuchowanie bezpośrednie i otwarte adresowanie (liniowe, kwadratowe, podwójne mieszanie, flagi usunięcia i rehaszowanie).',
    exam_questions: [16, 17, 18],
    key_takeaways: [
      'Tablica rozproszona to trójka **$T = (K, D, h)$** z funkcją mieszającą $h: K \\to D$; dla dobrze zaprojektowanej funkcji i umiarkowanego współczynnika obciążenia $\\alpha = W/N$ średnia złożoność `insert`/`search`/`delete` wynosi **$O(1)$**.',
      'W **haszowaniu przez dzielenie** $h(k) = k \\bmod N$ rozmiar $N$ powinien być **liczbą pierwszą** daleką od potęg $2^p$ i $2^p - 1$. W **haszowaniu przez mnożenie** $h(k) = \\lfloor N((kA)\\bmod 1)\\rfloor$ z $A = \\frac{\\sqrt{5}-1}{2} \\approx 0{,}618034$ dobór $N$ może być dowolny (chętnie $N = 2^p$).',
      '**Łańcuchowanie bezpośrednie** trzyma kolidujące elementy na listach przy komórkach: wstawianie na początek listy to zawsze $O(1)$, średnie wyszukiwanie to $O(W/N)$, pesymistyczne $O(w)$ (wszystkie w jednej liście).',
      'W **otwartym adresowaniu** ciąg $h(k,0),\\dots,h(k,N-1)$ musi być permutacją $0..N-1$, a **usuwanie nie może zerować komórki** — wstawiamy **flagę usuniętej wartości** (aby nie przerwać łańcucha poszukiwań!). Gdy $\\alpha > 0{,}5\\text{–}0{,}8$, podwajamy tablicę i przeliczamy hasze od nowa.',
    ],
    sections: [
      {
        id: 'aisd-5-1',
        heading: '5.1. Definicja $T=(K,D,h)$, konwersja kluczy i funkcje mieszające',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Tablica rozproszona i cechy dobrej funkcji mieszającej (Wykład 5, sl. 4–6)',
            text: '**Tablica rozproszona** to trójka $T = (K, D, h)$: zbiór kluczy $K$, zbiór adresów komórek $D$ (rozmiar $N$) oraz **funkcja mieszająca** $h: K \\to D$. Stosunek liczby zapisanych elementów $W$ do rozmiaru tablicy $N$ to **współczynnik obciążenia (load factor)** $\\alpha = \\frac{W}{N}$.\n\n**Dobra funkcja mieszająca** musi być: (1) szybka w obliczeniu, (2) deterministyczna (zawsze ten sam wynik dla tego samego klucza), (3) odwzorowywać każdy klucz w poprawny indeks $0..N-1$ oraz (4) równomiernie rozpraszać klucze po całej tablicy (w celu ochrony przed celowym wywoływaniem kolizji stosuje się losowanie funkcji z predefiniowanej rodziny).',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Przykład 5.1 (Wykład 5, sl. 7–9): Konwersja klucza `"abc"` oraz dzielenie vs mnożenie',
            text: '**1. Konwersja klucza tekstowego `"abc"` (`a`=97, `b`=98, `c`=99):**\n- **Radix-128** (kodowanie 7-bitowe ASCII): $k = 97\\cdot 128^2 + 98\\cdot 128 + 99 = 1\\,601\\,891$.\n- **Sumowanie bloków 2-cyfrowych** (zapis `097`, `098`, `099` $\\to$ ciąg `00 97 09 80 99`): $00+97+09+80+99 = 285$.\n\n**2. Haszowanie przez dzielenie ($h(k) = k \\bmod N$):** dla $N = 991$ (liczba pierwsza):\n$$h(\\text{"abc"}) = 1\\,601\\,891 \\bmod 991 = 435$$\n*(Dlaczego nie $N=2^p$? Bo $k \\bmod 2^p$ bierze tylko $p$ najmłodszych bitów! Dlaczego nie $2^p-1$? Bo przestawienie sąsiednich znaków daje tę samą resztę!)*\n\n**3. Haszowanie przez mnożenie ($h(k) = \\lfloor N \\cdot ((kA)\\bmod 1)\\rfloor$):** dla $A = \\frac{\\sqrt{5}-1}{2} \\approx 0{,}6180339887$ i $N = 512 = 2^9$:\n$$k\\cdot A = 1\\,601\\,891 \\cdot 0{,}6180339887 = 990\\,023{,}0841926\\dots \\implies (kA)\\bmod 1 = 0{,}0841926\\dots$$\n$$h(\\text{"abc"}) = \\lfloor 512 \\cdot 0{,}0841926317 \\rfloor = \\lfloor 43{,}1066 \\rfloor = 43$$',
          },
        ],
      },
      {
        id: 'aisd-5-2',
        heading: '5.2. Rozwiązywanie konfliktów (kolizji): łańcuchowanie vs otwarte adresowanie',
        blocks: [
          {
            type: 'paragraph',
            text: '**Konflikt (kolizja)** zachodzi, gdy dla różnych kluczy $k \\neq l$ otrzymujemy $h(k) = h(l)$. Jeżeli $|K| > N$, kolizje są nieuniknione (zasada szufladkowa Dirichleta). Stosujemy dwie główne metody:',
          },
          {
            type: 'table',
            headers: ['Strategia / Wariant', 'Wzór / Mechanizm', 'Zalety, wady i złożoność'],
            rows: [
              ['Łańcuchowanie bezpośrednie', 'Tablica wskaźników do list liniowych z parami `(k, v)`', 'Wstawianie na początek $O(1)$; wyszukiwanie/usuwanie średnio $O(W/N)$, pesymistycznie $O(w)$'],
              ['Otwarte — liniowe', '$h(k, j) = (h_b(k) + j) \\bmod N$', 'Proste, brak dodatkowych struktur; wada: **grupowanie pierwotne** (długie spójne bloki zajętych komórek)'],
              ['Otwarte — kwadratowe', '$h(k, j) = (h_b(k) + a_1 j + a_2 j^2) \\bmod N$', 'Łagodzi grupowanie pierwotne; przy $N=2^p$ i $a_1=a_2=\\frac{1}{2}$ odwiedza wszystkie $N$ komórek'],
              ['Otwarte — podwójne mieszanie', '$h(k, j) = (h_b(k) + j\\cdot h_c(k)) \\bmod N$', 'Znikome grupowanie wtórne — dwa klucze o tym samym $h_b(k)$ mają różne kroki $h_c(k)$!'],
            ],
          },
          {
            type: 'callout',
            variant: 'warning',
            title: 'Kluczowe niuanse otwartego adresowania (Wykład 5, sl. 12–13)',
            text: '1. **Usuwanie (flaga usuniętej komórki / tombstone):** usunięty element zastępujemy specjalną flagą `DELETED` (nie `EMPTY`!). Podczas **wyszukiwania** mijamy `DELETED` i szukamy dalej (stajemy dopiero na kluczu lub pustej komórce); podczas **wstawiania** możemy nadpisać pierwszą napotkaną komórkę pustą lub `DELETED`.\n2. **Oczekiwana liczba porównań przy idealnym mieszaniu ($\\alpha = W/N < 1$):**\n- wyszukiwanie nieudane / wstawianie: $\\le \\frac{1}{1-\\alpha}$ (dla $\\alpha=0{,}5$: $\\le 2$; dla $\\alpha=0{,}9$: $\\le 10$!),\n- wyszukiwanie udane / usuwanie: $\\le \\frac{1}{\\alpha}\\ln\\frac{1}{1-\\alpha} + \\frac{1}{\\alpha}$.\n3. Gdy $\\alpha$ przekroczy próg $0{,}5\\text{–}0{,}8$, **rozszerzamy** (zwykle podwajamy) tablicę i **ponownie haszujemy** wszystkie elementy (bo zmiana $N$ zmienia funkcję $h$!). *(Uwaga: na sl. 13 w formule podwójnego mieszania wkradł się zbędny znak `+` przed `%N`.)*',
          },
          {
            type: 'svg',
            diagramId: 'aisd-hash-table',
            title: 'Interaktywna symulacja kolizji (łańcuchowanie vs adresowanie otwarte) oraz wykres kosztu $1/(1-\\alpha)$',
            caption: 'Porównaj rozmieszczenie kluczy przy kolizjach i sprawdź, jak gwałtownie rośnie koszt otwartego adresowania powyżej $\\alpha = 0{,}8$.',
          },
        ],
      },
    ],
  },
  {
    id: 'aisd-ch6',
    subject_id: 'aisd',
    order_index: 6,
    slug: 'drzewa-kopiec-bst-avl',
    title: 'Rozdział 6: Drzewa binarne, trawersowanie, kopiec, Heapsort, BST i drzewa AVL',
    subtitle: 'Wykład 5 (cz. 2): VLR/LVR/LRV/BFS, kopiec tablicowy, Heapsort, BST, rotacje AVL i wyszukiwanie połówkowe',
    lecture_ref: 'Wykład 5 · slajdy 14–58',
    estimated_minutes: 55,
    summary:
      'Struktury drzewiaste: terminologia, 4 porządki przechodzenia drzew binarnych (pre-order, in-order, post-order, BFS), kopiec binarny (max/min) w reprezentacji tablicowej 1-indeksowanej i sortowanie Heapsort ($O(n\\log n)$), drzewa poszukiwań binarnych BST (wstawianie, szukanie, usuwanie w 3 przypadkach, degeneracja $h=n$), drzewa wyważone AVL (współczynnik równowagi $bf_i = h_L - h_R$, rotacja lewa i prawa) oraz algorytmy równoważenia i wyszukiwania binarnego ($O(\\log n)$).',
    exam_questions: [19, 20, 21, 22],
    key_takeaways: [
      'Drzewo to struktura $S=(D,R,e)$ o **dokładnie jednym korzeniu** ($|r_{\\text{we}}|=1$) i **dokładnie jednej ścieżce** od korzenia do każdego węzła (brak cykli!).',
      '4 przejścia drzewa binarnego: **Pre-order (VLR)** — najpierw węzeł; **In-order (LVR)** — w BST daje ciąg **posortowany rosnąco**!; **Post-order (LRV)** — korzeń na samym końcu; **BFS** — poziomami z użyciem **kolejki FIFO**.',
      '**Kopiec binarny** to drzewo **zupełne** trzymane w tablicy od indeksu `1` (`A[0]` puste): dzieci `A[i]` to **`A[2i]`** i **`A[2i+1]`**, rodzic to **`A[⌊i/2⌋]`**. Wstawianie i usuwanie korzenia trwa $O(\\log n)$, a **Heapsort** sortuje w miejscu w $O(n\\log n)$ (niestabilnie).',
      'W **drzewie AVL** w każdym węźle $|bf_i| = |h_L(w_i) - h_R(w_i)| \\le 1$ (gwarantuje wysokość $O(\\log n)$ i operacje w $O(\\log n)$): gdy $bf < -1$ wykonujemy **rotację lewą**, a gdy $bf > 1$ — **rotację prawą** (każda rotacja przepisuje tylko 2 wskaźniki!).',
    ],
    sections: [
      {
        id: 'aisd-6-1',
        heading: '6.1. Drzewa binarne i cztery sposoby przechodzenia (VLR, LVR, LRV, BFS)',
        blocks: [
          {
            type: 'paragraph',
            text: 'W drzewie wyróżniamy **korzeń** (bez rodzica), **liście** (bez dzieci), **węzły wewnętrzne**, **poziomy** (odległość od korzenia), **gałęzie** (maksymalne ścieżki korzeń$\\to$liść), **wysokość $h$** (maksymalna długość gałęzi), **stopień drzewa** (maks. liczba dzieci; dla drzewa binarnego = 2) oraz **drzewo zupełne (kompletne)** (wszystkie poziomy pełne oprócz ewentualnie ostatniego wypełnionego od lewej). Każde drzewo binarne definiuje się rekurencyjnie jako trójkę *(korzeń, lewe poddrzewo, prawe poddrzewo)*.',
          },
          {
            type: 'table',
            headers: ['Rodzaj przejścia', 'Kolejność (symbol)', 'Struktura / Zastosowanie', 'Kolejność na drzewie W5 sl. 19–22'],
            rows: [
              ['Wzdłużne (**Pre-order**)', 'Korzeń → Lewe → Prawe (**VLR**)', 'DFS (rekurencja / stos); kopiowanie struktury drzewa', '1 (korzeń) → 2 → 3 → 4 → 5 → 6 → 7 → 8'],
              ['Poprzeczne (**In-order**)', 'Lewe → Korzeń → Prawe (**LVR**)', 'DFS; w drzewie BST wypisuje klucze **rosnąco**!', '1 (najbardziej lewy) → 2 → 3 → 4 → 5 (korzeń) → 6 → 7 → 8'],
              ['Wsteczne (**Post-order**)', 'Lewe → Prawe → Korzeń (**LRV**)', 'DFS; bezpieczne usuwanie drzewa (najpierw dzieci!)', '1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 (korzeń na końcu)'],
              ['Wszerz (**BFS**)', 'Poziom po poziomie od korzenia', 'Iteracyjnie z **kolejką FIFO**; najkrótsza droga w warstwach', '1 (poz. 0) → 2, 3 (poz. 1) → 4, 5, 6, 7 (poz. 2) → 8 (poz. 3)'],
            ],
          },
        ],
      },
      {
        id: 'aisd-6-2',
        heading: '6.2. Kopiec binarny (Heap) i sortowanie przez kopcowanie (Heapsort)',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Kopiec binarny w reprezentacji tablicowej (Wykład 5, sl. 24–34)',
            text: '**Kopiec binarny** to **zupełne** drzewo binarne częściowo uporządkowane: w kopcu typu **max** każdy rodzic ma priorytet $\\ge$ swoich dzieci (maksimum zawsze w korzeniu `A[1]`), a w kopcu typu **min** — $\\le$ dzieci (minimum w `A[1]`).\n\nPonieważ drzewo jest zupełne, przechowujemy je bez wskaźników w tablicy `A[1..n]` (`A[0]` nieużywane):\n$$\\text{lewe dziecko } A[i] = A[2i], \\qquad \\text{prawe dziecko } A[i] = A[2i+1], \\qquad \\text{rodzic } A[i] = A[\\lfloor i/2 \\rfloor]$$\n- **Wstawianie ($O(\\log n)$):** dopisz na koniec jako ostatni liść i przesiewaj w górę (zamieniaj z rodzicem, dopóki naruszony jest warunek kopca; przykład W5 sl. 26–28: wstawienie `4` do kopca min).\n- **Usuwanie korzenia ($O(\\log n)$):** wstaw ostatni liść na miejsce korzenia, zmniejsz rozmiar o 1 i przesiewaj w dół (zamieniaj z dzieckiem o wyższym priorytecie; przykład W5 sl. 29–33: usunięcie `2` i przesiewanie `14` w dół).',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Heapsort — 2 etapy (Wykład 5, sl. 36–38) + uwaga na błąd granicy pętli!',
            text: '**Etap 1 (budowa kopca max):** dla każdego kolejnego elementu przesiewamy go w górę, aż korzeń `A[1]` zawiera maksimum (dla `[4, 2, 1, 5, 6, 3, 8, 4]` otrzymujemy kopiec `[8, 5, 6, 4, 4, 1, 3, 2]`).\n**Etap 2 ($n-1$ razy rozbiórka kopca):** zamieniamy korzeń `A[1]` z ostatnim elementem `A[i]` (maksimum trafia na koniec posortowanego sufiksu!), skracamy kopiec o 1 i przesiewamy nowy korzeń w dół.\n\n**Własności:** złożoność zawsze **$O(n\\log n)$**, sortuje **w miejscu ($O(1)$)**, ale **nie jest stabilny** (nie zachowuje kolejności FIFO dla równych priorytetów).\n**Błąd w pseudokodzie na slajdzie 38 W5:** po dopisaniu zera na indeksie 0 (`A = [0, A]`) elementy kopca zajmują indeksy `1..n`, więc pierwsza pętla `FOR i = 2, 3, ..., n-1` pomija ostatni element `A[n]`! Poprawna granica to **`FOR i = 2, 3, ..., n`**.',
          },
        ],
      },
      {
        id: 'aisd-6-3',
        heading: '6.3. Drzewo BST, równoważenie AVL (rotacje) i wyszukiwanie połówkowe',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Drzewo poszukiwań binarnych BST i 3 przypadki usuwania (Wykład 5, sl. 39–50)',
            text: 'W **BST** dla każdego węzła $w_i$ wszystkie klucze w lewym poddrzewie są mniejsze, a w prawym większe: $k_{\\text{left}(w_i)} < k_{w_i} < k_{\\text{right}(w_i)}$ (duplikaty domyślnie odrzucamy lub kierujemy nieostrą nierównością). Minimum to najbardziej lewy węzeł, maksimum to najbardziej prawy, a przejście **in-order** daje posortowany ciąg!\n\n**Usuwanie węzła `x` z BST (3 przypadki):**\n1. **Brak dzieci (liść):** ustaw odpowiedni wskaźnik rodzica na `NIL`.\n2. **Jedno dziecko:** przepnij wskaźnik rodzica bezpośrednio na jedyne dziecko węzła `x`.\n3. **Dwoje dzieci:** zamień klucz `x` z **największym elementem lewego poddrzewa** (poprzednik in-order, np. `9` $\\leftrightarrow$ `8` na sl. 47–48) lub **najmniejszym elementem prawego poddrzewa** (następnik in-order), a następnie usuń ten zamieniony węzeł (ma on już co najwyżej 1 dziecko!).\n\n**Zagrożenie:** wstawianie posortowanych danych degeneruje BST do listy liniowej o wysokości $h = n$ (wyszukiwanie spada z $O(\\log n)$ do $O(n)$!).',
          },
          {
            type: 'callout',
            variant: 'theorem',
            title: 'Drzewo AVL, rotacje oraz metody równoważenia i Binary Search (Wykład 5, sl. 51–58)',
            text: '- **Drzewo wyważone (AVL — Adelson-Velsky & Landis):** dla każdego węzła współczynnik równowagi $bf_i = h_L(w_i) - h_R(w_i)$ spełnia **$|bf_i| \\le 1$** (w przeciwieństwie do drzewa **DDW** — dokładnie wyważonego, gdzie $|n_L - n_R| \\le 1$ dotyczy *liczby węzłów*!). Gwarantuje wysokość i czas operacji **$O(\\log n)$**.\n- **Rotacja lewa (CCW, gdy $bf < -1$):** prawe dziecko staje się nowym korzeniem poddrzewa, stary korzeń schodzi jako jego lewe dziecko, a dawne *lewe poddrzewo prawego dziecka* przepinamy jako *prawe poddrzewo* starego korzenia.\n- **Rotacja prawa (CW, gdy $bf > 1$):** symetrycznie — lewe dziecko wchodzi w górę, a jego dawne *prawe poddrzewo* staje się *lewym poddrzewem* starego korzenia. Każda rotacja przepisuje tylko 2 wskaźniki ($O(1)$)!\n- **Trzy metody globalnego równoważenia BST:** (1) **Martin–Ness** (posortuj + rekurencyjnie wstawiaj mediany — jak w przykładzie `[2, 3, 5, 8, 11, 14, 18]` z kolejką FIFO na sl. 55–58!), (2) **Day–Stout–Warren (DSW)** (rotacje w prawo do „winorośli”, potem rotacje w lewo), (3) usuwanie i ponowne wstawianie korzeni niezbalansowanych poddrzew.\n- **Wyszukiwanie połówkowe (`binary_search`):** na posortowanej tablicy liczy `median = (end - start + 1)//2 + start` i odrzuca połowę tablicy w każdym kroku $\\implies$ złożoność **$O(\\log n)$**.',
          },
          {
            type: 'svg',
            diagramId: 'aisd-tree-traversals',
            title: 'Interaktywne drzewo binarne: animacja Pre/In/Post-order i BFS + rotacje AVL + kopiec tablicowy',
            caption: 'Przełączaj tryb między trawersowaniem drzewa z W5 (sl. 19–22), rotacjami lewą/prawą AVL (sl. 52–53) oraz korespondencją kopiec $\\leftrightarrow$ tablica `A[1..n]`.',
          },
        ],
      },
    ],
  },
  {
    id: 'aisd-ch7',
    subject_id: 'aisd',
    order_index: 7,
    slug: 'metody-numeryczne-taylor-rownania-nieliniowe',
    title: 'Rozdział 7: Metody numeryczne — zbieżność, Heron, szeregi Taylora i równania nieliniowe',
    subtitle: 'Wykład 6 (cz. 1–3): kryteria stopu, √S Herona, rekurencja Taylora oraz bisekcja, falsi, sieczne i Newton–Raphson',
    lecture_ref: 'Wykład 6 · slajdy 1–29',
    estimated_minutes: 45,
    summary:
      'Podstawy obliczeń numerycznych i zbieżności iteracyjnej, bezwzględne i względne warunki stopu, metoda Herona na $\\sqrt{S}$, przybliżanie funkcji szeregami Taylora–Maclaurina (w tym eliminacja przepełnienia $x^i/i!$ przez zależność rekurencyjną $a_i = \\frac{x}{i}a_{i-1}$) oraz kompletne porównanie czterech metod rozwiązywania równań nieliniowych $f(x)=0$: bisekcji, falsi, siecznych i Newtona–Raphsona.',
    exam_questions: [23, 24, 25],
    key_takeaways: [
      'W praktyce nie znamy wartości dokładnej $\\hat{x}$, więc stosujemy kryteria stopu oparte na kolejnych przybliżeniach: **dokładność bezwzględną** $\\Delta = |x_i - x_{i-1}| < \\epsilon$, **względną** $\\delta = \\frac{|x_i - x_{i-1}|}{|x_i|} < \\epsilon$ oraz obowiązkowy **limit iteracji `maxn`** (ochrona przed rozbieżnością!).',
      'Przy obliczaniu $e^x = \\sum \\frac{x^i}{i!}$ osobne liczenie $x^i$ oraz $i!$ powoduje szybkie przepełnienie (`overflow`); przekształcenie multiplikatywne **$a_i = \\frac{x}{i}\\cdot a_{i-1}$** ($a_0 = 1$) rozwiązuje ten problem i przyspiesza algorytm z $O(i^2)$ do $O(1)$ na wyraz!',
      '**Bisekcja** i **Regula Falsi** wymagają przedziału $[a,b]$ z przeciwnymi znakami $f(a)\\cdot f(b) < 0$ i zachowują nawiasowanie pierwiastka (zawsze zbieżne dla ciągłej $f$). **Metoda siecznych** bierze zawsze dwa ostatnie punkty (szybsza, ale może uciec od rozwiązania, np. przy lokalnym ekstremum!).',
      '**Metoda Newtona–Raphsona** $x_i = x_{i-1} - \\frac{f(x_{i-1})}{f\'(x_{i-1})}$ nie wymaga przedziału $[a,b]$, zbiega najszybciej (kwadratowo), ale wymaga znajomości $f\'(x)$ oraz $f\'(x) \\neq 0$ w obszarze poszukiwań.',
    ],
    sections: [
      {
        id: 'aisd-7-1',
        heading: '7.1. Zbieżność, kryteria stopu, metoda Herona i rekurencyjny szereg Taylora',
        blocks: [
          {
            type: 'paragraph',
            text: 'Ciąg przybliżeń $(x_i)$ jest zbieżny do rozwiązania dokładnego $\\hat{x}$, gdy błąd $h_i = |x_i - \\hat{x}| \\to 0$. Ponieważ $\\hat{x}$ jest nieznane, kończymy iteracje, gdy błąd bezwzględny $|x_i - x_{i-1}| < \\epsilon$ (lub $|f(x_i) - f(x_{i-1})| < \\epsilon$), względny $\\frac{|x_i - x_{i-1}|}{|x_i|} < \\epsilon$, bądź gdy osiągniemy górny limit `maxn`.',
          },
          {
            type: 'callout',
            variant: 'example',
            title: 'Metoda Herona ($\\sqrt{S}$) i rekurencyjny szereg Taylora–Maclaurina (Wykład 6, sl. 8–16)',
            text: '**1. Metoda Herona (babilońska) dla $\\sqrt{S}$ ($S > 0$):**\n$$x_n = \\frac{1}{2}\\left(x_{n-1} + \\frac{S}{x_{n-1}}\\right)$$\nDla $S = 9$ i $r_0 = 9$: $9 \\to 5 \\to 3{,}4 \\to 3{,}0235 \\to 3{,}00009 \\to 3{,}0000000014$ (w 5 krokach 9 cyfr dokładnych!).\n\n**2. Szereg Taylora wokół $a$** ($f(x) = \\sum_{n=0}^{\\infty}\\frac{f^{(n)}(a)}{n!}(x-a)^n$; dla $a=0$ — **szereg Maclaurina**): na wykładzie omówiono 6 rozwinięć: $e^x$, $\\sin x$, $\\cos x$, $\\sinh x$, $\\cosh x$ i $\\ln(1+x)$ (dla $-1 < x \\le 1$, indeks startowy $i_0 = 1$).\n\n**3. Wyprowadzenie rekurencyjnego wyrazu dla $e^x$ (unikanie przepełnienia `x^i / i!`):**\n$$m = \\frac{a_i}{a_{i-1}} = \\frac{x^i / i!}{x^{i-1} / (i-1)!} = \\frac{x}{i} \\implies a_0 = 1,\\quad a_i = \\frac{x}{i}\\cdot a_{i-1}$$\nAnalogicznie dla $\\sin x$: $a_0 = x,\\; a_i = -\\frac{x^2}{2i(2i+1)}\\cdot a_{i-1}$ (każdy nowy wyraz to 1 mnożenie i 1 dzielenie zamiast silni!).',
          },
        ],
      },
      {
        id: 'aisd-7-2',
        heading: '7.2. Cztery metody znajdowania miejsc zerowych równań nieliniowych $f(x)=0$',
        blocks: [
          {
            type: 'table',
            headers: ['Metoda', 'Wzór na kolejne przybliżenie', 'Wymagane założenia', 'Zalety / Pułapki (Wykład 6, sl. 18–29)'],
            rows: [
              ['**Bisekcja (połowienie)**', '$c = \\frac{a+b}{2}$', '$f$ ciągła na $[a,b]$ i $f(a)\\cdot f(b) < 0$', 'Zawsze zbieżna (szerokość przedziału maleje jak $(b-a)/2^n$), ale wolna'],
              ['**Regula falsi**', '$c = b - \\frac{f(b)(b-a)}{f(b)-f(a)}$', '$f$ ciągła na $[a,b]$ i $f(a)\\cdot f(b) < 0$', 'Przecięcie siecznej z osią $OX$ z zachowaniem różnych znaków; może utknąć przy jednym końcu'],
              ['**Siecznych (secant)**', '$a_n = a_{n-1} - \\frac{f(a_{n-1})(a_{n-1}-a_{n-2})}{f(a_{n-1})-f(a_{n-2})}$', 'Dwa punkty startowe $a_0, a_1$', 'Nie sprawdza znaków (zawsze 2 ostatnie punkty) — szybsza, lecz potrafi rozbiec się (sl. 24: $-148{,}1$)!'],
              ['**Newtona–Raphsona**', '$x_i = x_{i-1} - \\frac{f(x_{i-1})}{f\'(x_{i-1})}$', 'Punkt startowy $x_0$, $f$ różniczkowalna, $f\'(x)\\neq 0$', 'Najszybsza (zbieżność kwadratowa: $3 \\to 2{,}5625 \\to 2{,}4423 \\to 2{,}4335$!); wrażliwa na $f\'(x)\\approx 0$'],
            ],
          },
          {
            type: 'callout',
            variant: 'warning',
            title: 'Błędy w pseudokodach i rachunkach ze slajdów Wykładu 6 (sl. 19–25) — świetnie ćwiczą zadania egzaminacyjne!',
            text: '1. **Slajd 19 i 22:** dla $f(x) = x^3 - 2x^2 + x - 5$ dokładna wartość w $x=4$ to $64 - 32 + 4 - 5 = \\mathbf{31}$ (na slajdach użyto `34`, co przesunęło liczby w pierwszym kroku falsi).\n2. **Slajd 21 (wyprowadzenie falsi):** w ostatniej linijce zgubiono czynnik $f(b)$ w liczniku (poprawnie: $c = b - \\frac{\\mathbf{f(b)}(b-a)}{f(b)-f(a)}$).\n3. **Slajd 23 (algorytm `falsi`):** w gałęzi wyboru podprzedziału wydrukowano `IF f(a)*f(b) < 0` zamiast **`IF f(a)*f(c) < 0`**! Ponieważ `f(a)*f(b) < 0` było prawdziwe na wejściu, w oryginale pętla zawsze nadpisywałaby `b = c` nawet gdy pierwiastek leży w `[c, b]`!\n4. **Slajd 25 (algorytm `secant`):** nagłówek skopiowano jako `falsi(a0,a1,...)`, a warunek wejścia używa niezdefiniowanych `a, b` zamiast `a0, a1`.',
          },
          {
            type: 'svg',
            diagramId: 'aisd-root-finding',
            title: 'Interaktywne porównanie bisekcji, regula falsi, siecznych i Newtona–Raphsona na $f(x)=x^3-2x^2+x-5$',
            caption: 'Przełączaj metody i przesuwaj numer iteracji, aby zobaczyć cięciwy, styczne i tempo zbieżności do pierwiastka $x^* \\approx 2{,}4335$.',
          },
        ],
      },
    ],
  },
  {
    id: 'aisd-ch8',
    subject_id: 'aisd',
    order_index: 8,
    slug: 'optymalizacja-rozniczkowanie-numeryczne',
    title: 'Rozdział 8: Optymalizacja (złoty podział, Newton) i różniczkowanie numeryczne (MRS, Lagrange)',
    subtitle: 'Wykład 6 (cz. 4–5): α = (√5−1)/2, optymalizacja przez f′(x) = 0, różnice proste/wsteczne/centralne i wielomian Lagrange’a',
    lecture_ref: 'Wykład 6 · slajdy 30–47',
    estimated_minutes: 45,
    summary:
      'Klasyfikacja problemów optymalizacji, metoda złotego podziału ($\\alpha \\approx 0{,}618034$) wykorzystująca tylko jedną nową ewaluację funkcji na krok, szukanie ekstremów metodami bisekcji i Newtona ($f\'(x)/f\'\'(x)$), wyprowadzenie wzorów Metody Różnic Skończonych (prosta, wsteczna, centralna, wyższe rzędy) z szeregu Taylora wraz z analizą błędu obcięcia $O(h)$ vs $O(h^2)$ i niestabilności numerycznej dla małego $h$, oraz różniczkowanie wielomianem Lagrange’a z dowodem równoważności dla siatki równomiernej.',
    exam_questions: [26, 27, 28],
    key_takeaways: [
      'W **metodzie złotego podziału** stała $\\alpha = \\frac{\\sqrt{5}-1}{2} \\approx 0{,}618034$ (z $\\alpha^2 + \\alpha - 1 = 0$) gwarantuje, że po odrzuceniu jednego krańca **drugi punkt wewnętrzny zostaje ponownie wykorzystany** ($x_2 \\leftarrow x_1$ lub $x_1 \\leftarrow x_2$) — oszczędzamy 50% wywołań funkcji $f$!',
      'Szukanie ekstremum przez miejsca zerowe $f\'(x)=0$ (bisekcja na $f\'$ lub Newton $x_i = x_{i-1} - \\frac{f\'(x_{i-1})}{f\'\'(x_{i-1})}$) wymaga dodatkowej weryfikacji, czy znaleziono minimum czy maksimum (znak $f\'\'$ lub porównanie z krańcami przedziału).',
      'W **Metodzie Różnic Skończonych (MRS)** różnica prosta i wsteczna mają błąd obcięcia **$O(h)$** ($\\frac{f\'\'(\\xi)h}{2!}$), a **różnica centralna** $\\frac{f(x_0+h)-f(x_0-h)}{2h}$ aż **$O(h^2)$** ($\\frac{f^{(3)}(\\xi)h^2}{3!}$), bo wyrazy z $h^2$ znoszą się!',
      'Zbyt małe $h$ (np. $h < 10^{-8}$) **pogarsza** wynik z powodu **niestabilności numerycznej** (błędu zaokrągleń przy odejmowaniu niemal równych liczb i dzieleniu przez mikroskopijne $h$). **Wielomian Lagrange’a** działa również na **nierównomiernej** siatce punktów!',
    ],
    sections: [
      {
        id: 'aisd-8-1',
        heading: '8.1. Optymalizacja: metoda złotego podziału oraz bisekcja i Newton na $f\'(x)=0$',
        blocks: [
          {
            type: 'callout',
            variant: 'definition',
            title: 'Metoda złotego podziału (Wykład 6, sl. 31–34)',
            text: 'Szukamy minimum ciągłej funkcji jednomodalnej $f(x)$ na przedziale $[a,b]$ bez użycia pochodnych. Dzielimy $[a,b]$ punktami $x_1 < x_2$ tak, aby $x_2 - a = b - x_1$ oraz zachodziła złota proporcja:\n$$\\frac{b - x_1}{b - a} = \\frac{b - x_2}{b - x_1} = \\alpha \\implies \\alpha^2 + \\alpha - 1 = 0 \\implies \\alpha = \\frac{\\sqrt{5}-1}{2} \\approx 0{,}618034$$\nWzory na punkty wewnętrzne:\n$$x_1 = \\alpha a + (1-\\alpha)b, \\qquad x_2 = (1-\\alpha)a + \\alpha b$$\n- Jeśli $f(x_1) \\le f(x_2)$, minimum leży w $[a, x_2]$: podstawiamy $b = x_2$, $x_2 = x_1$ (już policzone!) i liczymy tylko nowe $x_1 = \\alpha a + (1-\\alpha)b$.\n- Jeśli $f(x_1) > f(x_2)$, minimum leży w $[x_1, b]$: podstawiamy $a = x_1$, $x_1 = x_2$ i liczymy tylko nowe $x_2 = (1-\\alpha)a + \\alpha b$.\n*(Dla maksimum odwracamy znak nierówności lub minimalizujemy $-f(x)$. Uwaga na błąd w pseudokodzie ze sl. 34 W6: w pętli `WHILE` zabrakło inkrementacji `SET n = n + 1`!)*',
          },
          {
            type: 'paragraph',
            text: '**Alternatywa różniczkowa (sl. 35–36):** szukamy miejsca zerowego pierwszej pochodnej $f\'(x) = 0$ metodą bisekcji lub metodą Newtona:\n$$x_i = x_{i-1} - \\frac{f\'(x_{i-1})}{f\'\'(x_{i-1})}$$\nDla $f(x) = x^3 - 2x^2 + x - 5$ mamy $f\'(x) = 3x^2 - 4x + 1$ oraz $f\'\'(x) = 6x - 4$; startując z $x_0 = 2$ Newton w 5 krokach zbiega do dokładnego minimum lokalnego $x = 1$ ($2 \\to 1{,}375 \\to 1{,}099 \\to 1{,}011 \\to 1{,}00019 \\to 1{,}00000005$). *(Na sl. 35 w bisekcji dla $f\'$ wkradł się błędny minus przy $f\'(1{,}15)=+0{,}3675$, ale wybór $b=1{,}15$ był poprawny.)*',
          },
        ],
      },
      {
        id: 'aisd-8-2',
        heading: '8.2. Różniczkowanie numeryczne: MRS (wyprowadzenie z Taylora) i wielomian Lagrange’a',
        blocks: [
          {
            type: 'callout',
            variant: 'proof',
            title: 'Wyprowadzenie różnicy prostej i centralnej z szeregu Taylora (Wykład 6, sl. 40–42)',
            text: 'Rozwijamy $f(x_0 + h)$ i $f(x_0 - h)$ w szereg Taylora wokół $x_0$:\n$$f(x_0 + h) = f(x_0) + f\'(x_0)h + \\frac{f\'\'(x_0)}{2!}h^2 + \\frac{f^{(3)}(x_0)}{3!}h^3 + \\dots$$\n$$f(x_0 - h) = f(x_0) - f\'(x_0)h + \\frac{f\'\'(x_0)}{2!}h^2 - \\frac{f^{(3)}(x_0)}{3!}h^3 + \\dots$$\n1. Z pierwszego równania po podzieleniu przez $h$ dostajemy **różnicę prostą** $f\'(x_0) \\approx \\frac{f(x_0+h)-f(x_0)}{h}$ z błędem obcięcia $-\\frac{f\'\'(\\xi)}{2!}h = O(h)$ (analogicznie **różnica wsteczna** $\\frac{f(x_0)-f(x_0-h)}{h}$ ma błąd $O(h)$).\n2. **Odejmując równania stronami**, wyrazy z $f(x_0)$ oraz $\\frac{f\'\'(x_0)}{2!}h^2$ **znoszą się dokładnie**, skąd **różnica centralna**:\n$$f\'(x_0) = \\frac{f(x_0+h) - f(x_0-h)}{2h} - \\frac{f^{(3)}(\\xi)}{3!}h^2 \\quad \\text{(błąd rzędu } O(h^2)\\text{!)}$$',
          },
          {
            type: 'table',
            headers: ['Wzór MRS (Wykład 6, sl. 41–45)', 'Postać', 'Rząd błędu / Uwaga'],
            rows: [
              ['Różnica prosta ($f\'$)', '$\\frac{f(x_0+h) - f(x_0)}{h}$', '$O(h)$ — 2-punktowy'],
              ['Różnica wsteczna ($f\'$)', '$\\frac{f(x_0) - f(x_0-h)}{h}$', '$O(h)$ — 2-punktowy'],
              ['Różnica centralna ($f\'$)', '$\\frac{f(x_0+h) - f(x_0-h)}{2h}$', '$O(h^2)$ — idealna m.in. do Newtona bez jawnej pochodnej!'],
              ['3-punktowa jednostronna ($f\'$)', '$\\frac{-3f(x_0)+4f(x_0+h)-f(x_0+2h)}{2h}$', '$O(h^2)$ — na brzegu dziedziny'],
              ['4-punktowa centralna ($f\'$)', '$\\frac{f(x_0-2h)-8f(x_0-h)+8f(x_0+h)-f(x_0+2h)}{12h}$', '$O(h^4)$ — bardzo wysoka dokładność'],
              ['2. pochodna centralna ($f\'\'$)', '$\\frac{f(x_0-h) - 2f(x_0) + f(x_0+h)}{h^2}$', '$O(h^2)$ *(uwaga: na sl. 45 omyłkowo wydrukowano $x_0+2h$ zamiast $x_0+h$!)*'],
              ['2. pochodna 5-pkt. centralna', '$\\frac{-f(x_0-2h)+16f(x_0-h)-30f(x_0)+16f(x_0+h)-f(x_0+2h)}{12h^2}$', '$O(h^4)$'],
            ],
          },
          {
            type: 'callout',
            variant: 'theorem',
            title: 'Różniczkowanie wielomianem interpolacyjnym Lagrange’a (Wykład 6, sl. 46–47)',
            text: 'Gdy węzły pomiarowe $(x_0, y_0), (x_1, y_1), (x_2, y_2)$ są **nierównomiernie rozłożone**, MRS wprost nie działa — budujemy wielomian Lagrange’a stopnia 2 i różniczkujemy go analitycznie:\n$$w(x) = \\sum_{i=0}^{n-1} y_i \\prod_{j=0,\, j\\neq i}^{n-1} \\frac{x - x_j}{x_i - x_j}$$\n$$w\'(x) = \\frac{2x-x_1-x_2}{(x_0-x_1)(x_0-x_2)}y_0 + \\frac{2x-x_0-x_2}{(x_1-x_0)(x_1-x_2)}y_1 + \\frac{2x-x_0-x_1}{(x_2-x_0)(x_2-x_1)}y_2$$\n**Dowód spójności z MRS (sl. 47):** dla siatki równomiernej ($x_1 - x_0 = x_2 - x_1 = h,\\; x_2 - x_0 = 2h$) w punkcie środkowym $x = x_1$ środkowy licznik $2x_1 - x_0 - x_2 = h - h = 0$, a pozostałe dwa dają dokładnie:\n$$w\'(x_1) = \\frac{-h}{(-h)(-2h)}y_0 + 0 + \\frac{h}{(2h)(h)}y_2 = \\frac{y_2 - y_0}{2h} = \\frac{f(x_1+h) - f(x_1-h)}{2h}$$',
          },
          {
            type: 'svg',
            diagramId: 'aisd-numeric-diff',
            title: 'Interaktywna wizualizacja MRS: sieczne proste/centralne oraz niestabilność numeryczna dla małego $h$',
            caption: 'Porównaj błąd bezwzględny przybliżenia $f\'(2)$ dla $f(x)=x^2\\sin x + 3x + \\cos x + 2$ (Wykład 6, sl. 43) w funkcji kroku $h = 10^{-k}$ — zauważ minimum błędu przed dominacją zaokrągleń!',
          },
        ],
      },
    ],
  },
];
