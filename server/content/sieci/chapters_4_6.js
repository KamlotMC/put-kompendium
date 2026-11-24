export const CHAPTERS_4_6 = [
  {
    id: 'sieci-ch4',
    subject_id: 'sieci',
    order_index: 4,
    slug: 'sieci-lan-llc-mac-topologie',
    title: 'Rozdział 4: Sieci LAN — podwarstwy LLC i MAC, protokoły dostępu i topologie',
    subtitle: 'Architektura IEEE 802, zadania LLC i MAC, działanie CSMA/CD, Token Ring i CSMA/CA, formaty ramek oraz topologie LAN',
    lecture_ref: 'Wykład 4 (W4_LAN_M.pdf)',
    estimated_minutes: 35,
    summary:
      'Dokładna analiza warstwy łącza danych w sieciach lokalnych według komitetu IEEE 802: rozbicie na podwarstwy LLC (802.2) i MAC (802.3, 802.4, 802.5, 802.11), szczegółowy przebieg rywalizacyjnego protokołu CSMA/CD, bezkolizyjnego Token Ring oraz bezprzewodowego CSMA/CA (z RTS/CTS), dokładna budowa ramek Ethernet / 802.3 / 802.5 oraz porównanie topologii sieci LAN.',
    exam_questions: [7, 8, 9, 10, 11],
    key_takeaways: [
      'IEEE 802 dzieli warstwę łącza danych (L2) na podwarstwę LLC (IEEE 802.2 — identyfikacja protokołów wyższych przez SAP, enkapsulacja, uniezależnienie od medium) oraz MAC (sterowanie dostępem do medium, ramkowanie, adresy MAC, CRC).',
      'CSMA/CD (Ethernet): nasłuch nośnej → strefa buforowa → nadawanie z równoczesnym nasłuchem kolizji → sygnał JAM (32–48 bitów) → losowy czas wycofywania (exponential backoff, podwajanie) → maks. 16 prób. Min. ramka = 64 B (512 bitów), okno kolizji = 51,2 µs, IFG = 9,6 µs.',
      'Token Ring (IEEE 802.5, 4 lub 16 Mb/s): brak kolizji dzięki jednemu krążącemu tokenowi (3 B: SD-AC-ED); nadawca zamienia token na ramkę, odbiorca kopiuje i ustawia bity AC=11 w polu FS, ramka wraca do nadawcy, który zwalnia token.',
      'CSMA/CA (IEEE 802.11 Wi-Fi) unika kolizji zamiast je wykrywać (różnica mocy Tx/Rx), korzysta z DIFS, losowego backoffu, SIFS+ACK oraz opcjonalnej rezerwacji kanału RTS/CTS dla długich ramek.',
    ],
    figures: [
      '/media/sieci/w4_s03_osi_ieee802.png',
      '/media/sieci/w4_s05_ieee802_zalecenia.png',
      '/media/sieci/w4_s10_siec_lan.png',
      '/media/sieci/w4_s11_csma_kolizje.png',
      '/media/sieci/w4_s15_token_ring.png',
      '/media/sieci/w4_s18_csmaca_difs.png',
      '/media/sieci/w4_s19_csmaca_rts_cts.png',
      '/media/sieci/w4_s21_ramka_8023.png',
      '/media/sieci/w4_s22_ramka_8025.png',
      '/media/sieci/w4_s24_ramka_ethernet.png',
      '/media/sieci/w4_s25_topologie_lan.png',
    ],
    sections: [
      {
        id: 'ieee802-llc-mac',
        heading: '4.1. Architektura IEEE 802: podział warstwy 2 na LLC i MAC',
        blocks: [
          {
            type: 'p',
            text: 'W sieciach rozległych z łączami punkt–punkt wystarczy jednolita warstwa łącza danych z modelu OSI. W sieciach lokalnych **LAN** korzystających ze **współdzielonego medium propagacyjnego** pojawia się jednak fundamentalny problem arbitrażu: *która stacja ma w danej chwili prawo nadawać?* Dlatego komitet **IEEE 802** podzielił warstwę łącza danych na dwie wyspecjalizowane podwarstwy: górną **LLC** oraz dolną **MAC** (odpowiedź na **pytania nr 7 i 8**).',
          },
          {
            type: 'figure_grid',
            items: [
              {
                src: '/media/sieci/w4_s03_osi_ieee802.png',
                caption: 'Relacja modelu OSI/ISO i architektury IEEE 802 — rozbicie warstwy łącza danych na LLC i MAC.',
                source: 'W4_LAN_M.pdf, slajd 3',
              },
              {
                src: '/media/sieci/w4_s05_ieee802_zalecenia.png',
                caption: 'Podstawowe zalecenia IEEE 802: wspólna warstwa LLC (802.2) nad różnymi standardami MAC (802.3, 802.4, 802.5) i mediami.',
                source: 'W4_LAN_M.pdf, slajd 5',
              },
            ],
          },
          {
            type: 'table',
            caption: 'Podział odpowiedzialności pomiędzy podwarstwą LLC a podwarstwą MAC (Pyt. 7 i 8)',
            headers: ['Podwarstwa', 'Standardy', 'Kluczowe funkcje i odpowiedzialności'],
            rows: [
              [
                '**LLC**\n*(Logical Link Control — sterowanie logiczne łączem)*',
                'IEEE **802.2** (wspólna dla wszystkich LAN)',
                '• **Uniezależnienie** warstwy sieciowej (L3) od szczegółów medium i procedur dostępu (MAC).\n• **Identyfikacja protokołów wyższych warstw** i enkapsulacja za pomocą pola typu lub **SAP (Service Access Point)** — wiele protokołów L3 może współdzielić jedno łącze fizyczne.\n• Obsługa usług **bezpołączeniowych** oraz **połączeniowych**.\n• **Sterowanie przepływem** oraz zabezpieczenie przed zagubieniem i duplikacją ramek.\n• Obsługa styku między siecią lokalną a warstwą sieciową.',
              ],
              [
                '**MAC**\n*(Media Access Control — dostęp do medium)*',
                '• **802.3** (CSMA/CD / Ethernet)\n• **802.4** (Token Bus)\n• **802.5** (Token Ring)\n• **802.11** (WLAN CSMA/CA)',
                '• **Sterowanie dostępem do współdzielonego medium transmisyjnego** przez wiele stacji (rozstrzyganie, kto może nadawać).\n• **Ramkowanie** — pakowanie danych w oddzielne ramki z adresami źródłowym (`SA`) i docelowym (`DA`) oraz sumą kontrolną `CRC` i przekazywanie ich do warstwy fizycznej.\n• **Wykrywanie uszkodzeń** (CRC) i powtórne przesyłanie uszkodzonej ramki.\n• Ściśle powiązana z warstwą fizyczną (granica między MAC i PHY częściowo się zaciera).',
              ],
            ],
          },
        ],
      },
      {
        id: 'protokol-csmacd',
        heading: '4.2. Protokół CSMA/CD (Ethernet — IEEE 802.3)',
        blocks: [
          {
            type: 'p',
            text: '**CSMA/CD (Carrier Sense Multiple Access with Collision Detection)** to **rywalizacyjny** (probabilistyczny) protokół dostępu do współdzielonej magistrali w klasycznym Ethernecie (odpowiedź na **pytanie nr 10**). Zapewnia równouprawnienie wszystkim stacjom i brak jednego punktu awarii (awaria dowolnej stacji nie zatrzymuje sieci).',
          },
          {
            type: 'figure_grid',
            items: [
              {
                src: '/media/sieci/w4_s10_siec_lan.png',
                caption: 'Współdzielona magistrala Ethernet — wszystkie stacje podłączone są do jednego medium transmisyjnego.',
                source: 'W4_LAN_M.pdf, slajd 10',
              },
              {
                src: '/media/sieci/w4_s11_csma_kolizje.png',
                caption: 'Powstanie kolizji: wskutek skończonego czasu propagacji dwie stacje mogą jednocześnie uznać medium za wolne i zacząć nadawać.',
                source: 'W4_LAN_M.pdf, slajd 11 (Kurose & Ross)',
              },
            ],
          },
          {
            type: 'list',
            ordered: true,
            items: [
              {
                title: 'Krok 1 — Ciągły nasłuch nośnej (Carrier Sense)',
                text: 'Każda karta sieciowa stale monitoruje medium (poziom napięcia/sygnału), sprawdzając, czy kanał jest **wolny**, **zajęty** czy trwa **strefa buforowa** (*InterFrame Gap* — minimalny czas jałowy `9,6 µs` dla 10 Mb/s po zakończeniu poprzedniej transmisji, aby żadna para hostów nie zmonopolizowała łącza).',
              },
              {
                title: 'Krok 2 — Rozpoczęcie nadawania z równoczesnym nasłuchem',
                text: 'Gdy kanał jest bezczynny przez wymagany czas, stacja rozpoczyna transmisję ramki, ale **jednocześnie nasłuchuje medium**, porównując sygnał wracający z sygnałem nadawanym.',
              },
              {
                title: 'Krok 3 — Wykrycie kolizji (Collision Detection) i sygnał JAM',
                text: 'Jeżeli wskutek opóźnienia propagacji co najmniej dwie stacje zaczęły nadawać równocześnie, sygnały się sumują i zniekształcają (sygnał odbierany ≠ nadawany). Karta, która wykryła kolizję, **natychmiast przerywa nadawanie danych** i wysyła krótki sygnał zagłuszający **JAM** (32–48 bitów specjalnego wzorca bez 32-bitowego CRC), aby wszystkie pozostałe stacje na pewno rozpoznały kolizję i odrzuciły uszkodzoną ramkę.',
              },
              {
                title: 'Krok 4 — Losowe wycofanie (Binary Exponential Backoff) i limit prób',
                text: 'Stacje uczestniczące w kolizji milkną i losują czas oczekiwania przed ponowną próbą (z generatora opartego m.in. na 6-bajtowym adresie MAC, aby minimalizować ponowne zderzenie). Jeśli kolizja wystąpi ponownie, **zakres losowanego czasu jest podwajany**. Po **`n = 16` kolejnych nieudanych próbach** (`AttemptLimit = 16`) karta porzuca transmisję ramki i zgłasza błąd warstwom wyższym.',
              },
              {
                title: 'Krok 5 — Odbiór ramek przez stacje',
                text: 'W sieci ze wspólnym medium każda karta sieciowa „widzi” wszystkie przepływające ramki i sprawdza ich docelowy adres MAC (`DA`). Do warstw wyższych przekazywane są wyłącznie ramki zaadresowane do niej (lub rozgłoszeniowe/multicastowe).',
              },
            ],
          },
          {
            type: 'callout',
            variant: 'exam',
            title: 'Dlaczego minimalna ramka Ethernet ma dokładnie 64 bajty? (Często pytane na zaliczeniu!)',
            text: 'Aby nadawca mógł wykryć kolizję swojej ramki nawet z najdalszą stacją w sieci, **czas nadawania ramki musi być co najmniej równy dwukrotnemu maksymalnemu czasowi propagacji sygnału ($T_{\\text{nad}} \\ge 2 \\cdot T_{\\text{prop}}$)** — inaczej nadawca skończyłby wysyłanie, zanim zniekształcony sygnał kolizji zdążyłby do niego wrócić! W Ethernecie 10 Mb/s (maks. długość grubego kabla koncentrycznego 1,5 km) okno kolizji (slot time) wynosi **$51,2\\,\\mu\\text{s}$**, co przy $10\\,\\text{Mb/s}$ daje dokładnie **$512\\text{ bitów} = 64\\text{ bajty}$** minimalnego rozmiaru ramki! (Uwaga: na slajdzie 14 napisano skrótowo „nie powinien przekraczać” w odwrotnym sensie — fizycznie czas nadawania musi być **nie mniejszy** niż $2\\cdot T_{\\text{prop}}$, żeby zdążyć wykryć kolizję w oknie $51,2\\,\\mu\\text{s}$!).',
          },
        ],
      },
      {
        id: 'token-ring-i-csmaca',
        heading: '4.3. Protokół Token Ring (IEEE 802.5) oraz CSMA/CA (IEEE 802.11 WLAN)',
        blocks: [
          {
            type: 'p',
            text: '**Token Ring (IEEE 802.5)** — opracowany przez firmę **IBM** w latach 70. dla topologii pierścienia (szybkości **4 lub 16 Mb/s**), obecnie wyparty przez przełączany Ethernet — realizuje **deterministyczny, bezkolizyjny** dostęp do medium za pomocą techniki przekazywania żetonu (*token passing*, stosowanej też w FDDI). Odpowiada na **pytanie nr 11**.',
          },
          {
            type: 'figure',
            src: '/media/sieci/w4_s15_token_ring.png',
            caption: 'Topologia pierścienia Token Ring (IEEE 802.5) — w sieci krąży jeden niepodzielny żeton (token).',
            source: 'W4_LAN_M.pdf, slajd 15',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              {
                title: 'Przechwycenie wolnego tokenu',
                text: 'Po pierścieniu krąży stale dokładnie **jeden wolny token** (3-bajtowa ramka `SD | AC | ED` z bitem `T=0` w polu kontroli dostępu `AC`). Stacja chcąca nadać dane czeka na wolny token, przechwytuje go, zmienia bit tokenu na ramkę danych (`T=1`, `FF=01`) i wysyła ramkę w pierścień. Ponieważ token jest tylko jeden, **kolizje są całkowicie niemożliwe**.',
              },
              {
                title: 'Retransmisja w pierścieniu i odbiór przez adresata',
                text: 'Ramka jest przekazywana kolejno od stacji do stacji w jednym kierunku. Stacja będąca adresatem (`DA`) **kopiuje zawartość ramki do swojego bufora**, modyfikuje bity potwierdzenia w polu **Frame Status (`FS`)** na końcu ramki (np. `AC=11` oznacza rozpoznanie adresu i poprawne skopiowanie) i przesyła ramkę dalej.',
              },
              {
                title: 'Powrót do nadawcy i zwolnienie tokenu',
                text: 'Po pełnym obiegnięciu pierścienia ramka wraca do nadawcy. Nadawca sprawdza pole `FS` (wie więc natychmiast, czy odbiorca istniał i odebrał ramkę — `AC=00` brak stacji, `AC=10` brak akceptacji, `AC=11` potwierdzenie odbioru!), usuwa ramkę z pierścienia i **generuje z powrotem wolny token** dla kolejnych stacji (zwykle stacja może trzymać token tylko na jeden cykl/limit czasu).',
              },
              {
                title: 'Nadzór nad tokenem (z komentarza wykładowcy na Wykładzie 2)',
                text: 'Ceną za brak kolizji jest złożoność **monitorowania tokenu** — w sieci działają liczniki czasu i wyznaczona stacja monitorująca (*Active Monitor*), która musi wykryć i odtworzyć token, jeśli stacja go trzymająca ulegnie awarii lub straci zasilanie, albo usunąć nieskończenie krążącą ramkę.',
              },
            ],
          },
          {
            type: 'p',
            text: '**CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance)** to metoda dostępu w bezprzewodowych sieciach **WLAN (Wi-Fi, IEEE 802.11)**. W eterze nie da się tanio i niezawodnie wykrywać kolizji w trakcie nadawania, ponieważ moc własnego sygnału nadawanego jest o wiele rzędów wielkości większa niż sygnału odbieranego (plus problem ukrytych stacji). Dlatego Wi-Fi stosuje **unikanie kolizji** oraz obowiązkowe potwierdzenia `ACK` w warstwie łącza:',
          },
          {
            type: 'list',
            items: [
              {
                title: 'Podstawowy cykl DIFS → DATA → SIFS → ACK',
                text: 'Jeśli kanał jest wolny przez czas **DIFS (Distributed Inter-Frame Space)**, nadawca wysyła całą ramkę `DATA`. Jeśli kanał jest zajęty, losuje licznik wstrzymania (*backoff*), który odlicza w dół wyłącznie gdy kanał jest wolny (gdy jest zajęty, licznik jest pauzowany). Odbiorca po poprawnym odbiorze odczekuje krótki czas **SIFS (Short Inter-Frame Spacing)** i wysyła potwierdzenie **ACK**. Brak ACK zwiększa okno losowania i powoduje retransmisję.',
              },
              {
                title: 'Opcjonalna rezerwacja kanału RTS / CTS',
                text: 'Dla długich ramek `DATA` (powyżej progu RTS) nadawca może wysłać krótką ramkę **RTS (Request to Send)** z informacją o czasie potrzebnym na `DATA + ACK`. Punkt dostępowy (AP) rozgłasza **CTS (Clear to Send)**, które daje nadawcy zezwolenie, a wszystkim pozostałym stacjom (nawet ukrytym!) nakazuje milczenie na zarezerwowany czas. Ewentualna kolizja krótkich ramek RTS marnuje znacznie mniej pasma niż kolizja długiej ramki danych.',
              },
            ],
          },
          {
            type: 'figure_grid',
            items: [
              {
                src: '/media/sieci/w4_s18_csmaca_difs.png',
                caption: 'Przebieg transmisji w IEEE 802.11 CSMA/CA: oczekiwanie DIFS, wysłanie DATA, przerwa SIFS i potwierdzenie ACK.',
                source: 'W4_LAN_M.pdf, slajd 18 (Kurose & Ross)',
              },
              {
                src: '/media/sieci/w4_s19_csmaca_rts_cts.png',
                caption: 'Rezerwacja kanału przez wymianę RTS–CTS ograniczająca skutki kolizji przy długich ramkach.',
                source: 'W4_LAN_M.pdf, slajd 19 (Kurose & Ross)',
              },
            ],
          },
        ],
      },
      {
        id: 'formaty-ramek-i-topologie',
        heading: '4.4. Formaty ramek (IEEE 802.3, Ethernet II, IEEE 802.5) oraz topologie sieci LAN',
        blocks: [
          {
            type: 'p',
            text: 'Warto znać budowę ramek warstwy łącza danych — szczególnie różnicę między polem `LE` (długość) w ramce **IEEE 802.3** a polem `TYPE` w ramce **Ethernet II** (gdy wartość $\\ge 1536$ czyli `0x0600`, określa typ protokołu warstwy sieciowej: `0x0800` = IPv4, `0x0806` = ARP, `0x86DD` = IPv6; gdy $\\le 1500$ czyli `0x05DC`, oznacza długość danych).',
          },
          {
            type: 'figure_grid',
            items: [
              {
                src: '/media/sieci/w4_s21_ramka_8023.png',
                caption: 'Format ramki IEEE 802.3: PR (7B), SFD (1B), DA (2/6B), SA (2/6B), LE (2B), LLC+PAD (46–1500B), CRC (4B).',
                source: 'W4_LAN_M.pdf, slajd 21',
              },
              {
                src: '/media/sieci/w4_s24_ramka_ethernet.png',
                caption: 'Format ramki Ethernet II oraz kluczowe parametry czasowe/rozmiarowe sieci 10 Mb/s.',
                source: 'W4_LAN_M.pdf, slajd 24',
              },
            ],
          },
          {
            type: 'figure',
            src: '/media/sieci/w4_s22_ramka_8025.png',
            caption: 'Format ramki danych IEEE 802.5 (Token Ring) z polami SD, AC, FC, DA, SA, DANE, CRC, ED oraz statusem FS.',
            source: 'W4_LAN_M.pdf, slajd 22',
          },
          {
            type: 'p',
            text: '**Topologie sieci LAN** (**pytanie egzaminacyjne nr 9**) określają fizyczny lub logiczny sposób połączenia stacji w sieci lokalnej. Wyróżniamy cztery podstawowe topologie LAN:',
          },
          {
            type: 'figure',
            src: '/media/sieci/w4_s25_topologie_lan.png',
            caption: 'Cztery główne topologie sieci LAN: magistrala, pętla (pierścień), gwiazda oraz rozszerzona gwiazda.',
            source: 'W4_LAN_M.pdf, slajd 25',
          },
          {
            type: 'table',
            caption: 'Porównanie topologii sieci LAN (Pyt. 9)',
            headers: ['Topologia', 'Zasada budowy', 'Zalety', 'Wady'],
            rows: [
              [
                '**Magistrala (Bus)**',
                'Wszystkie stacje podłączone do jednego wspólnego przewodu (np. kabla koncentrycznego z terminatorami na końcach).',
                'Niski koszt, mało kabla, prosta instalacja w małych sieciach.',
                'Jedna domena kolizyjna; **przerwanie kabla głównego paraliżuje całą sieć**; trudna diagnostyka uszkodzeń i rozbudowa.',
              ],
              [
                '**Pętla / Pierścień (Ring)**',
                'Stacje połączone kolejno w zamknięty obwód, sygnał krąży od stacji do stacji (np. Token Ring, FDDI).',
                'Brak kolizji (z tokenem), przewidywalny czas dostępu nawet przy dużym obciążeniu.',
                'W pojedynczym pierścieniu uszkodzenie łącza lub stacji przerywa pracę sieci (wymagane obejścia MAU lub podwójny pierścień); kłopotliwe dodawanie stacji.',
              ],
              [
                '**Gwiazda (Star)**',
                'Każda stacja ma własny kabel do centralnego węzła (koncentratora lub przełącznika). Obecnie dominujący standard w LAN.',
                'Awaria jednego kabla lub stacji **nie zakłóca pracy pozostałych**; łatwa diagnostyka, rozbudowa i zarządzanie; z przełącznikiem brak kolizji.',
                'Większe zużycie kabla; **awaria centralnego urządzenia** odcina podłączone do niego stacje.',
              ],
              [
                '**Rozszerzona gwiazda (Extended Star / Hierarchiczna)**',
                'Połączenie wielu topologii gwiazdy w strukturę wielopoziomową (np. przełączniki piętrowe podłączone do przełącznika szkieletowego).',
                'Wysoka skalowalność, idealna dla dużych budynków i okablowania strukturalnego, dobra izolacja ruchu.',
                'Większa złożoność konfiguracji (konieczność STP przy połączeniach redundantnych) i zależność od przełącznika rdzeniowego.',
              ],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sieci-ch5',
    subject_id: 'sieci',
    order_index: 5,
    slug: 'okablowanie-strukturalne-i-media',
    title: 'Rozdział 5: Okablowanie strukturalne i media transmisyjne (skrętka, światłowód)',
    subtitle: 'Normy EN 50173 / ISO 11801, elementy i odległości (90m+5m+5m), szafy i zasilanie, rodzaje i kategorie skrętki oraz światłowody',
    lecture_ref: 'Wykład 5 (W5_strukturalne_M.pdf)',
    estimated_minutes: 35,
    summary:
      'Kompletne opracowanie systemu okablowania strukturalnego budynków (normy amerykańskie, międzynarodowe i europejskie, punkty dystrybucyjne CD/BD/FD, odcinki okablowania poziomego i ich maksymalne długości, szafy 19", panele krosowe i zasilanie UPS) oraz szczegółowa fizyka, budowa i klasyfikacja mediów transmisyjnych: skrętki miedzianej (UTP/STP/FTP, Kat. 1–7, RJ-45) i światłowodów (skokowy, gradientowy, jednomodowy, okna transmisyjne).',
    exam_questions: [27, 28, 29, 30, 31],
    key_takeaways: [
      'Okablowanie strukturalne to otwarty, ujednolicony system okablowania budynku (EIA/TIA 568 → ISO/IEC 11801 → PN-EN 50173), niezależny od producenta i obsługujący różne technologie sieciowe oraz telefoniczne.',
      'Maksymalne długości wg PN-EN 50173: okablowanie kampusowe (CD–BD) do 1500 m, pionowe/szkieletowe budynku (BD–FD) do 500 m, poziome (FD–komputer) do 100 m = max 90 m kabel stały (permanent link) + max 5 m kabel krosowy w szafie + max 5 m kabel przyłączeniowy (stacyjny).',
      'Rodzaje skrętki: UTP, STP, S-STP, FTP, F-FTP, S-FTP; kategorie: Kat. 1 (głos), 2 (4 MHz), 3 (10 MHz, 10Base-T), 4 (16 MHz), 5 (100 MHz, 100 m), 5e (ulepszona, 1 Gb/s), 6 (200/250 MHz, 10 Gb/s), 7 (600 MHz, S-STP, nowe złącza zamiast RJ-45).',
      'Światłowód (rdzeń n₁ > płaszcz n₂ = 125 µm): wielomodowy skokowy (MMF-SI, rdzeń 50/62,5 µm), wielomodowy gradientowy (MMF-GI, mniejsza dyspersja), jednomodowy (SMF, rdzeń kilka µm ~9 µm, największy zasięg i pasmo). Całkowicie odporny na EMI, 3 okna transmisyjne (850 / 1310 / 1550 nm).',
    ],
    figures: [
      '/media/sieci/w5_s12_elementy_odleglosci.png',
      '/media/sieci/w5_s13_szafy.png',
      '/media/sieci/w5_s14_patchpanel.png',
      '/media/sieci/w5_s16_szafa_aktywna.png',
      '/media/sieci/w5_s17_listwy.png',
      '/media/sieci/w5_s23_skretka_rodzaje.png',
      '/media/sieci/w5_s26_rj45.png',
      '/media/sieci/w5_s28_swiatlowod_propagacja.png',
      '/media/sieci/w5_s29_okna_transmisyjne.png',
      '/media/sieci/w5_s30_rodzaje_swiatlowodow.png',
      '/media/sieci/w5_s31_kable_swiatlowodowe.png',
    ],
    sections: [
      {
        id: 'normy-okablowania',
        heading: '5.1. Idea okablowania strukturalnego i zestawienie norm (EIA/TIA, ISO, PN-EN)',
        blocks: [
          {
            type: 'p',
            text: '**System okablowania strukturalnego** to zespół norm i rozwiązań ujednolicających infrastrukturę kablową budynku dla sieci komputerowej, telefonicznej i sterującej. Ma **charakter otwarty** (niezależny od producenta sprzętu i przyszłych technologii) oraz pozwala na łatwą zmianę aranżacji biura bez kucia ścian i wymiany kabli.',
          },
          {
            type: 'table',
            caption: 'Kluczowe normy okablowania strukturalnego i etapy ich stosowania',
            headers: ['Norma', 'Organizacja / Zasięg', 'Zakres i zastosowanie'],
            rows: [
              ['**EIA/TIA 568** (1991)', 'USA (TIA/EIA)', 'Pierwsza fundamentalna norma komercyjnego okablowania budynków (*Commercial Building Telecommunication Cabling Standard*).'],
              ['**ISO/IEC 11801**', 'Międzynarodowa', 'Okablowanie ogólnego przeznaczenia (*Generic cabling for customer premises*), stworzona na bazie norm amerykańskich.'],
              ['**PN-EN 50173** (+ EN 50167/50168/50169)', 'Europejska / Polska', 'Główna norma europejska definiująca elementy systemu (CD, BD, FD, TP, TO), kategorie kabli i długości. (50167 – poziome, 50168 – pionowe, 50169 – krosowe/stacyjne).'],
              ['**PN-EN 50174-1 i 50174-2**', 'Europejska / Polska', 'Cz. 1: specyfikacja, zapewnienie jakości, eksploatacja i naprawy. Cz. 2: planowanie i wykonawstwo instalacji wewnątrz budynków (miedź + światłowód, EMC, uziemienia).'],
              ['**PN-EN 50310**', 'Europejska / Polska', 'Połączenia wyrównawcze i uziemiające w budynkach ze sprzętem IT — bezpieczeństwo przeciwporażeniowe i elektromagnetyczne (już na etapie projektowania budynku!).'],
              ['**PN-EN 50346**', 'Europejska / Polska', 'Metody **badania i certyfikacji (testowania)** zainstalowanego okablowania strukturalnego.'],
            ],
          },
          {
            type: 'callout',
            variant: 'info',
            title: 'Ważne zalecenia instalatorskie z normy PN-EN 50173',
            text: '• Minimum **1 punkt dystrybucyjny na każde piętro** oraz **1 punkt na każde 1000 m²** powierzchni.\n• Minimum **podwójne gniazdo abonenckie (2×RJ-45) na każde 10 m²** powierzchni biurowej (do jednego skrętka 100 Ω / 120 Ω, zalecana 100 Ω kat. 5+, do drugiego skrętka lub światłowód).\n• **Rozplot kabla UTP przy zarabianiu wtyku/gniazda nie może przekraczać 13 mm** (większy rozplot drastycznie zwiększa przesłuchy NEXT!).\n• Nie wolno mieszać w jednym połączeniu kabli miedzianych o różnej impedancji ani światłowodów o różnych średnicach rdzenia.\n• Wszystkie ułożone kable muszą być zakończone (nawet nieużywane), a każdy element musi być trwale oznaczony i udokumentowany.',
          },
        ],
      },
      {
        id: 'elementy-i-odleglosci',
        heading: '5.2. Elementy okablowania strukturalnego i odcinki okablowania poziomego (Pyt. 29 i 30)',
        blocks: [
          {
            type: 'p',
            text: 'Architektura okablowania strukturalnego tworzy hierarchiczną **gwiazdę**. Zapamiętaj dokładne nazwy wszystkich podsystemów (odpowiedź na **pytanie nr 30**) oraz dokładny podział długości w okablowaniu poziomym (**pytanie nr 29**):',
          },
          {
            type: 'svg',
            diagramId: 'structured-cabling',
            title: 'Schemat hierarchii okablowania strukturalnego PN-EN 50173 i odcinków okablowania poziomego (90 m + 5 m + 5 m)',
            caption: 'Interaktywny schemat pokazujący podsystemy CD → BD → FD → TP → TO oraz maksymalne długości odcinków.',
          },
          {
            type: 'figure',
            src: '/media/sieci/w5_s12_elementy_odleglosci.png',
            caption: 'Oryginalny schemat z wykładu (PN-EN 50173): CD, BD, FD oraz limity długości (kampusowe 1500 m, pionowe 500 m, poziome 100 m).',
            source: 'W5_strukturalne_M.pdf, slajd 12',
          },
          {
            type: 'list',
            items: [
              {
                title: '1. Punkt rozdzielczy kampusu (CD — Campus Distributor) i okablowanie kampusowe (międzybudynkowe)',
                text: 'Składnik opcjonalny dla zespołów budynków. Zapewnia łączność między oddalonymi budynkami — długość **do 1500 m**, realizowane niemal wyłącznie **światłowodem** (odporność na różnice potencjałów ziemi i wyładowania atmosferyczne).',
              },
              {
                title: '2. Budynkowy punkt dystrybucyjny (BD — Building Distributor) i okablowanie pionowe (szkieletowe)',
                text: 'Łączy wszystkie kondygnacyjne punkty dystrybucyjne (FD) z głównym punktem budynku (BD). Prowadzone w pionowych szybach kablowych. Maksymalna długość **do 500 m**, najczęściej **światłowód**.',
              },
              {
                title: '3. Piętrowy / kondygnacyjny punkt dystrybucyjny (FD — Floor Distributor)',
                text: 'Miejsce styku okablowania poziomego z pionowym. Mieści się w **szafie montażowej 19"** (wiszącej lub stojącej) i zawiera **panele krosowe (patch panele)** z zakończeniami kabli poziomych, krótkie kable krosowe (*patch cords*) oraz urządzenia aktywne (przełączniki) i listwy zasilające/wentylatory.',
              },
              {
                title: '4. Okablowanie poziome (Horizontal Cabling) — maksymalnie 100 m (Pyt. 29!)',
                text: 'Prowadzi od punktu dystrybucyjnego piętra (FD) do stanowisk pracy, niemal zawsze realizowane skrętką miedzianą. Składa się z **trzech wyraźnych odcinków** (z opcjonalnym punktem konsolidacyjnym TP po drodze):\n• **Kabel stały (instalacyjny / permanent link)**: od panelu krosowego w FD do gniazda abonenckiego TO — **maksymalnie 90 m**.\n• **Kabel krosowy (patch cord w szafie)**: łączący port przełącznika z gniazdem panelu krosowego w FD — **maksymalnie 5 m**.\n• **Kabel przyłączeniowy / stacyjny (terminalowy)**: łączący gniazdo abonenckie TO ze stacją roboczą (kartą sieciową komputera) — **maksymalnie 5 m**.\nŁączna długość kanału transmisyjnego nie może przekroczyć **$90\\text{ m} + 5\\text{ m} + 5\\text{ m} = 100\\text{ m}$**!',
              },
              {
                title: '5. Punkt pośredni / konsolidacyjny (TP — Transition Point) i gniazdo abonenckie (TO — Telecommunication Outlet)',
                text: 'Punkt konsolidacyjny (opcjonalny) ułatwia późniejsze przestawianie ścianek działowych (bez przerw w połączeniu przed TP). **Gniazdo abonenckie (TO)** to końcowy punkt okablowania poziomego od strony użytkownika — zazwyczaj **dwa gniazda RJ-45** w puszce lub listwie kablowej.',
              },
              {
                title: '6. Dedykowana instalacja elektryczna i zasilanie awaryjne (UPS)',
                text: 'W okablowaniu poziomym zasilania sprzętu IT stosuje się miedziane przewody o przekroju **2,5 mm²** prowadzone w oddzielnych przegrodach listew/kanałów (ochrona przed zakłóceniami). Przed zanikami napięcia chronią bezprzerwowe zasilacze **UPS** (o zerowym czasie przełączania — centralne lub indywidualne) oraz dla długich przerw **generatory spalinowe**.',
              },
            ],
          },
          {
            type: 'figure_grid',
            items: [
              {
                src: '/media/sieci/w5_s13_szafy.png',
                caption: 'Szafy montażowe 19" (wisząca i stojąca) chroniące sprzęt aktywny i krosownice.',
                source: 'W5_strukturalne_M.pdf, slajd 13',
              },
              {
                src: '/media/sieci/w5_s14_patchpanel.png',
                caption: 'Przykładowy panel krosowy (patch panel) — ułatwia elastyczne zarządzanie okablowaniem.',
                source: 'W5_strukturalne_M.pdf, slajd 14',
              },
            ],
          },
          {
            type: 'figure_grid',
            items: [
              {
                src: '/media/sieci/w5_s16_szafa_aktywna.png',
                caption: 'W pełni okablowana szafa dystrybucyjna z panelami krosowymi i przełącznikami.',
                source: 'W5_strukturalne_M.pdf, slajd 16',
              },
              {
                src: '/media/sieci/w5_s17_listwy.png',
                caption: 'Koryta i listwy instalacyjne rozdzielające prowadzenie kabli logicznych od elektrycznych.',
                source: 'W5_strukturalne_M.pdf, slajd 17',
              },
            ],
          },
        ],
      },
      {
        id: 'skretka-rodzaje-kategorie',
        heading: '5.3. Media transmisyjne LAN: Skrętka — rodzaje ekranowania i kategorie (Pyt. 28)',
        blocks: [
          {
            type: 'p',
            text: 'W sieciach LAN stosuje się trzy grupy mediów transmisyjnych: **skrętka miedziana** (dominująca w okablowaniu poziomym), **światłowód** (szkielety pionowe, kampusowe i duże odległości), **fale radiowe** (WLAN Wi-Fi) oraz historycznie **kabel koncentryczny** (cienki 10Base2 i gruby 10Base5).',
          },
          {
            type: 'p',
            text: '**Skrętka (Twisted Pair Cable)** składa się najczęściej z **4 par** izolowanych żył miedzianych skręconych ze sobą (ok. 26 skrętów/m, przy czym **każda para ma inny skok skrętu**, co wzajemnie znosi zakłócenia elektromagnetyczne i minimalizuje przesłuchy między parami). Do zakańczania stosuje się 8-pozycyjne złącza modularne **RJ-45** (8P8C).',
          },
          {
            type: 'figure_grid',
            items: [
              {
                src: '/media/sieci/w5_s23_skretka_rodzaje.png',
                caption: 'Przekrój i budowa popularnych rodzajów skrętki: nieekranowanej UTP, ekranowanej oplotem STP i foliowanej FTP.',
                source: 'W5_strukturalne_M.pdf, slajd 23',
              },
              {
                src: '/media/sieci/w5_s26_rj45.png',
                caption: 'Gniazda oraz wtyk modularny RJ-45 stosowane do łączenia skrętki z urządzeniami sieciowymi.',
                source: 'W5_strukturalne_M.pdf, slajd 26',
              },
            ],
          },
          {
            type: 'table',
            caption: 'Rodzaje ekranowania skrętki (wg wykładu — Pyt. 28)',
            headers: ['Oznaczenie', 'Pełna nazwa', 'Budowa ekranowania i zastosowanie'],
            rows: [
              ['**UTP**', 'Unshielded Twisted Pair', 'Skrętka **nieekranowana** — brak folii i oplotu. Najtańsza, najbardziej elastyczna i najpopularniejsza w typowych biurach o niskim poziomie zakłóceń.'],
              ['**STP**', 'Shielded Twisted Pair', 'Skrętka **ekranowana oplotem** (siatką miedzianą) — lepsza ochrona przed zakłóceniami elektromagnetycznymi.'],
              ['**S-STP**', 'Screened STP', 'Skrętka **podwójnie ekranowana** — każda para ma osobny ekran z oplotu, a cały kabel dodatkowo otoczony jest wspólnym oplotem. Wymagana dla Kat. 7.'],
              ['**FTP**', 'Foiled Twisted Pair', 'Skrętka **foliowana** — ekran w postaci folii (wg slajdu: każda para otoczona folią; w normie ISO F/UTP to folia wokół wszystkich par, U/FTP to folia na każdą parę).'],
              ['**F-FTP**', 'Foiled FTP', 'Każda para otoczona osobnym ekranem z folii + cały kabel dodatkowo owinięty wspólną folią.'],
              ['**S-FTP**', 'Screened FTP', 'Każda para otoczona osobnym ekranem z folii + cały kabel pokryty wspólnym **oplotem** (bardzo wysoka odporność na zakłócenia w środowiskach przemysłowych).'],
            ],
          },
          {
            type: 'table',
            caption: 'Kategorie kabli typu skrętka (Kat. 1 – Kat. 7 wg wykładu — Pyt. 28)',
            headers: ['Kategoria', 'Pasmo częstotliwości', 'Typowa przepustowość / standard', 'Charakterystyka'],
            rows: [
              ['**Kat. 1**', 'Pasmo głosowe', 'Nie do transmisji danych', 'Tradycyjna nieekranowana skrętka telefoniczna wyłącznie do przesyłania mowy.'],
              ['**Kat. 2**', 'do **4 MHz**', 'Do 4 Mb/s', 'Nieekranowana skrętka, tylko **2 pary** przewodów (stare terminale/Token Ring).'],
              ['**Kat. 3**', 'do **10 MHz**', '4 Mb/s (Token Ring), **10 Mb/s** (10Base-T)', '4 pary skręconych przewodów; pierwszy popularny kabel dla Ethernetu po skrętce.'],
              ['**Kat. 4**', 'do **16 MHz**', '16 Mb/s (Token Ring)', '4 pary przewodów; zaprojektowana głównie pod szybszy Token Ring 16 Mb/s.'],
              ['**Kat. 5**', 'do **100 MHz**', '100 Mb/s (Fast Ethernet), do **1 Gb/s** na 100 m', '4 pary, każda o innym skoku skrętu; poprawna instalacja pozwala osiągnąć 1 Gb/s do 100 m.'],
              ['**Kat. 5e** *(enhanced)*', 'do **100 MHz** (ostrzejsze normy przesłuchów)', '**1 Gb/s** (1000Base-T)', 'Ulepszona wersja Kat. 5 o mniejszych przesłuchach; standardowo zalecana dla nowych instalacji gigabitowych.'],
              ['**Kat. 6**', 'do **200 MHz** *(wg TIA 250 MHz)*', 'do **10 Gb/s** (na krótszych odcinkach; 10 Gb/s na 100 m dla 6A)', 'Lepsza separacja par (często wewnętrzny separator krzyżowy); wysoka odporność na przesłuchy.'],
              ['**Kat. 7**', 'do **600 MHz**', '**10 Gb/s+**', 'Wymaga podwójnego ekranowania **S-STP** (każda para osobno) oraz **nowego typu złączy** zamiast klasycznego RJ-45 (np. GG45/TERA).'],
            ],
          },
        ],
      },
      {
        id: 'swiatlowody',
        heading: '5.4. Światłowody: budowa, propagacja światła, okna transmisyjne i rodzaje (Pyt. 31)',
        blocks: [
          {
            type: 'p',
            text: '**Światłowód** przewodzi informację w postaci impulsów światła (fali elektromagnetycznej z zakresu podczerwieni) w cienkim włóknie ze szkła kwarcowego. Składa się z dwóch warstw szkła o **różnych współczynnikach załamania** ($n_1 > n_2$), dzięki czemu zachodzi zjawisko **całkowitego wewnętrznego odbicia**:',
          },
          {
            type: 'list',
            items: [
              {
                title: 'Rdzeń (Core, współczynnik $n_1$)',
                text: 'Wewnętrzna część prowadząca światło. Średnica wynosi **62,5 µm** lub **50 µm** w światłowodach wielomodowych (skokowych i gradientowych) oraz zaledwie **kilka µm (zwykle ~8–10 µm)** w światłowodach jednomodowych.',
              },
              {
                title: 'Płaszcz (Cladding, współczynnik $n_2 < n_1$)',
                text: 'Warstwa zewnętrzna szkła o znormalizowanej średnicy **125 µm**, odbijająca promienie z powrotem do rdzenia.',
              },
              {
                title: 'Warstwy ochronne kabla',
                text: 'Powłoka akrylowa (pierwotna), tuba izolacyjna (luźna lub ścisła), oplot z włókien **kewlarowych** (odporność na rozciąganie), elementy wzmacniające (centralny pręt dielektryczny), powłoka zewnętrzna. Kable światłowodowe produkuje się w konstrukcjach **rurowych (tubowych)** oraz **rozetowych**.',
              },
            ],
          },
          {
            type: 'figure_grid',
            items: [
              {
                src: '/media/sieci/w5_s28_swiatlowod_propagacja.png',
                caption: 'Propagacja promienia świetlnego w światłowodzie skokowym (całkowite wewnętrzne odbicie na granicy rdzeń n₁ / płaszcz n₂).',
                source: 'W5_strukturalne_M.pdf, slajd 28',
              },
              {
                src: '/media/sieci/w5_s29_okna_transmisyjne.png',
                caption: 'Tłumienie światłowodu w funkcji długości fali: 3 okna transmisyjne (~850 nm, ~1310 nm, ~1550 nm) i mechanizmy strat (rozpraszanie Rayleigha, pik OH, absorpcja IR).',
                source: 'W5_strukturalne_M.pdf, slajd 29',
              },
            ],
          },
          {
            type: 'figure_grid',
            items: [
              {
                src: '/media/sieci/w5_s30_rodzaje_swiatlowodow.png',
                caption: 'Rodzaje światłowodów i ich profile współczynnika załamania oraz rozmycie impulsu (dyspersja): planarny, wielomodowy skokowy, gradientowy, jednomodowy i eliptyczny.',
                source: 'W5_strukturalne_M.pdf, slajd 30',
              },
              {
                src: '/media/sieci/w5_s31_kable_swiatlowodowe.png',
                caption: 'Konstrukcje wielowłóknowych kabli światłowodowych: rurowe (tubowe) i rozetowe.',
                source: 'W5_strukturalne_M.pdf, slajd 31',
              },
            ],
          },
          {
            type: 'table',
            caption: 'Porównanie trzech głównych rodzajów światłowodów telekomunikacyjnych (Pyt. 31)',
            headers: ['Rodzaj światłowodu', 'Średnica rdzenia / płaszcza', 'Profil załamania i propagacja', 'Własności i zastosowanie'],
            rows: [
              [
                '**Wielomodowy skokowy**\n*(MMF Step-Index)*',
                '50 µm lub 62,5 µm / **125 µm**',
                'Skokowa zmiana współczynnika na granicy $n_1 / n_2$. Wiele promieni (modów) biegnie po łamanych drogach różnej długości.',
                'Duża **dyspersja modowa** (impuls ulega silnemu rozmyciu, bo promienie docierają w różnym czasie) → najmniejsze pasmo i zasięg (krótkie połączenia, tani nadajnik LED).',
              ],
              [
                '**Wielomodowy gradientowy**\n*(MMF Graded-Index)*',
                '50 µm lub 62,5 µm / **125 µm**',
                'Współczynnik załamania maleje płynnie (parabolicznie) od osi rdzenia ku płaszczowi. Promienie biegną po torach sinusoidalnych i przyspieszają dalej od osi.',
                'Znacznie **mniejsza dyspersja modowa** niż w skokowym (promienie docierają niemal jednocześnie). Szeroko stosowany w szkieletach budynków i LAN (np. **1000Base-SX**, do kilkuset m – 2 km).',
              ],
              [
                '**Jednomodowy**\n*(SMF — Single-Mode Fiber)*',
                'kilka µm (~**9 µm**) / **125 µm**',
                'Bardzo cienki rdzeń przepuszcza tylko **jeden mod** (promień równoległy do osi). Brak dyspersji modowej.',
                '**Największe pasmo i zasięg** (od kilku km do dziesiątek/setek km ze wzmacniaczami, obsługa WDM, np. **1000Base-LX**). Wymaga precyzyjnego źródła laserowego i dokładniejszego spawania.',
              ],
            ],
          },
          {
            type: 'callout',
            variant: 'info',
            title: 'Kluczowe zalety światłowodów i okna transmisyjne',
            text: '• **Bardzo szerokie pasmo transmisyjne** (terabity/s dzięki WDM).\n• **Całkowita odporność na zakłócenia elektromagnetyczne (EMI)** i brak promieniowania (trudny podsłuch, brak pętli mas między budynkami).\n• **Duży zasięg segmentów** (2000 m, 5000 m, a dla SMF dziesiątki km) i zgodność ze standardami Ethernet (`10Base-FL`, `100Base-FX`, `1000Base-SX`, `1000Base-LX`).\n• Zazwyczaj wykorzystuje się **parę włókien**: jedno do nadawania (Tx) i jedno do odbioru (Rx).\n• **Trzy okna transmisyjne** (minima tłumienia): I okno ~**850 nm** (~2,5 dB/km), II okno ~**1310 nm** (~0,35 dB/km), III okno ~**1550 nm** (~0,17–0,2 dB/km — najniższe tłumienie, główny zakres dla WDM).',
          },
        ],
      },
    ],
  },
  {
    id: 'sieci-ch6',
    subject_id: 'sieci',
    order_index: 6,
    slug: 'sprzet-sieciowy-warstwa2-i-routery',
    title: 'Rozdział 6: Sprzęt sieciowy, domeny, VLAN, STP, agregacja łączy i routery',
    subtitle: 'NIC/MAC, regenerator, hub, most, przełącznik (4 tryby, tablica MAC), STP, VLAN 802.1Q, trunking, LAG/LACP, stakowanie, budowa routera i routera klasy operatorskiej',
    lecture_ref: 'Wykład 6 (W6_sprzet_M.pdf)',
    estimated_minutes: 45,
    summary:
      'Najobszerniejszy wykład kursu (47 slajdów, aż 15 pytań egzaminacyjnych nr 12–27!). Poznasz pełną hierarchię urządzeń sieciowych od warstwy 1 do 3, pojęcie domeny kolizyjnej i rozgłoszeniowej, zasady działania przełącznika i tworzenia tablicy MAC, 4 tryby przełączania (C-T, F-F, S-F, I-S), protokół STP, sieci wirtualne VLAN 802.1Q z trunkingiem, agregację łączy (LAG/LACP/EtherChannel/MC-LAG), stakowanie oraz dokładną budowę routera małego i routera klasy operatorskiej.',
    exam_questions: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
    key_takeaways: [
      'Regenerator i koncentrator (hub) działają w warstwie 1 — nie filtrują ramek i tworzą JEDNĄ wspólną domenę kolizyjną i rozgłoszeniową.',
      'Most i przełącznik (switch) działają w warstwie 2 (adresy MAC) — każdy port przełącznika to ODDZIELNA domena kolizyjna, ale wszystkie porty (w tym samym VLAN) należą do jednej domeny rozgłoszeniowej.',
      'Router działa w warstwie 3 (adresy IP) — separuje domeny rozgłoszeniowe, wybiera trasy (routing) i łączy różne sieci LAN/WAN oraz sieci VLAN.',
      '4 tryby przełączania: Cut-Through (~40 ns, tylko DA), Fragment-Free (~65 ns, pierwsze 64 B), Store-and-Forward (cała ramka + CRC), Intelligent Switching (adaptacyjnie C-T ↔ S-F).',
      'VLAN 802.1Q dodaje 4-bajtowy znacznik (TPID 0x8100 + 3b priorytet 802.1p + 1b CFI + 12b VID = 4094 sieci VLAN). STP blokuje pętle w L2 (BPDU, Root Bridge). LAG/LACP (802.1AX) łączy wiele portów w jeden logiczny kanał.',
    ],
    figures: [
      '/media/sieci/w6_s05_mac_eui64.png',
      '/media/sieci/w6_s06_nic.png',
      '/media/sieci/w6_s09_hub.png',
      '/media/sieci/w6_s12_mosty.png',
      '/media/sieci/w6_s20_switch_struktura.png',
      '/media/sieci/w6_s24_router_cisco.png',
      '/media/sieci/w6_s27_router_op_arch.png',
      '/media/sieci/w6_s28_router_op_schemat.png',
      '/media/sieci/w6_s29_cisco_crs3.png',
      '/media/sieci/w6_s32_vlan_8021q.png',
      '/media/sieci/w6_s36_trunking.png',
      '/media/sieci/w6_s39_agregacja_laczy.png',
      '/media/sieci/w6_s46_stakowanie.png',
    ],
    sections: [
      {
        id: 'nic-regenerator-hub-most',
        heading: '6.1. Elementy sieci LAN: karta sieciowa (NIC), regenerator, koncentrator (hub) i most',
        blocks: [
          {
            type: 'p',
            text: 'Aby zbudować lokalną sieć komputerową (**pytanie nr 27**), potrzebujemy: **(1) komputerów/hostów z kartami sieciowymi (NIC)**, **(2) medium transmisyjnego** (np. skrętka Kat. 5e/6, światłowód lub fale radiowe) z pasywnymi elementami okablowania (gniazda RJ-45, patch panele, szafy 19"), **(3) urządzeń aktywnych warstwy 2** (przełączników — dawniej koncentratorów/mostów) łączących hosty w gwiazdę, **(4) routera** (jeśli łączymy podsieci, VLAN-y lub chcemy wyjść do sieci WAN/Internetu) oraz **(5) oprogramowania sieciowego i stosu protokołów** (TCP/IP, sterowniki, usługi DHCP/DNS).',
          },
          {
            type: 'list',
            items: [
              {
                title: 'Karta sieciowa (NIC — Network Interface Card)',
                text: 'Stanowi fizyczny interfejs między komputerem a siecią LAN (układ wbudowany na płycie głównej lub karta PCI/PCIe). Posiada unikatowy w skali świata **adres MAC** (48-bitowy EUI-48 lub 64-bitowy EUI-64: pierwsze 24 bity to **kod producenta OUI**, np. Intel `00-AA-00`, 3Com `00-20-AF`, Cisco `00-00-0C`, z bitami `G/I` Group/Individual oraz `U/L` Universal/Local, a reszta to numer seryjny wyrobu). Funkcje karty: **(a)** konwersja danych równoległa ↔ szeregowa, **(b)** wzmocnienie sygnału, **(c)** ewentualna kompresja przed transmisją, **(d)** realizacja protokołu dostępu do medium (np. CSMA/CD).',
              },
              {
                title: 'Regenerator (Repeater — Warstwa 1)',
                text: 'Proste urządzenie warstwy fizycznej, które wzmacnia i odtwarza zniekształcony tłumieniem sygnał elektryczny/optyczny oraz odtwarza preambułę (synchronizację), pozwalając wydłużyć kabel. Nie analizuje nagłówków ani adresów MAC — łączone segmenty stają się jedną siecią i wspólną domeną kolizyjną.',
              },
              {
                title: 'Koncentrator (Hub — Warstwa 1)',
                text: '**Wieloportowy regenerator** pracujący w warstwie fizycznej. Odbiera sygnał na jednym porcie, regeneruje go i **powiela bezwarunkowo na WSZYSTKIE pozostałe porty** (poza portem źródłowym). Nie filtruje ramek, nie analizuje adresów MAC. Wszystkie podłączone stacje współdzielą całkowitą przepustowość i należą do **jednej domeny kolizyjnej** (obowiązuje półdupleks i CSMA/CD).',
              },
              {
                title: 'Most (Bridge — Warstwa 2)',
                text: 'Łączy dwa lub więcej segmentów LAN w warstwie łącza danych. W odróżnieniu od koncentratora **uczy się położenia stacji** w swojej **tablicy mostowania** (zapisując: `adres źródłowy MAC`, `numer portu`, `czas pojawienia się ramki` do usuwania starych wpisów) i **filtruje ruch lokalny**, przepuszczając na drugą stronę tylko ruch międzysegmentowy — tym samym **rozdziela domeny kolizyjne**. Wyróżniamy: mosty transparentne/przezroczyste (**IEEE 802.1D** z algorytmem STA), mosty z routingiem źródłowym (**SRB — IEEE 802.5**), mieszane (**SRT**) oraz **mosty translacyjne** (łączące różne technologie L2, np. Ethernet z Token Ring). Most nie widzi adresów IP, więc nie może podzielić sieci IP na podsieci.',
              },
            ],
          },
          {
            type: 'figure_grid',
            items: [
              {
                src: '/media/sieci/w6_s05_mac_eui64.png',
                caption: 'Budowa adresu fizycznego MAC (EUI-64): kod producenta (OUI), numer seryjny oraz bity G/I i U/L.',
                source: 'W6_sprzet_M.pdf, slajd 5',
              },
              {
                src: '/media/sieci/w6_s06_nic.png',
                caption: 'Przykładowa karta sieciowa Gigabit Desktop NIC (PCI).',
                source: 'W6_sprzet_M.pdf, slajd 6',
              },
            ],
          },
          {
            type: 'figure_grid',
            items: [
              {
                src: '/media/sieci/w6_s09_hub.png',
                caption: 'Koncentrator (hub) — wieloportowy regenerator warstwy fizycznej.',
                source: 'W6_sprzet_M.pdf, slajd 9',
              },
              {
                src: '/media/sieci/w6_s12_mosty.png',
                caption: 'Most dzielący rozbudowaną sieć na oddzielne segmenty (domeny kolizyjne).',
                source: 'W6_sprzet_M.pdf, slajd 12',
              },
            ],
          },
        ],
      },
      {
        id: 'domeny-i-przelaczniki',
        heading: '6.2. Domeny kolizyjne i rozgłoszeniowe oraz przełącznik ethernetowy (Pyt. 12–19)',
        blocks: [
          {
            type: 'p',
            text: 'Zrozumienie różnicy między **domeną kolizyjną** a **domeną rozgłoszeniową** jest fundamentem pytań **12, 14, 15 i 16**:',
          },
          {
            type: 'svg',
            diagramId: 'domains-compare',
            title: 'Wizualizacja: Koncentrator (Hub) vs Przełącznik (Switch) vs Router — domeny kolizyjne i rozgłoszeniowe',
            caption: 'Porównaj liczbę domen kolizyjnych i rozgłoszeniowych w zależności od zastosowanego urządzenia sieciowego.',
          },
          {
            type: 'list',
            items: [
              {
                title: 'Domena kolizyjna (Collision Domain) — Pyt. 12 i 15',
                text: 'Obszar sieci lokalnej, w którym ramki wysłane jednocześnie przez dwie karty sieciowe mogą ulec fizycznej kolizji (współdzielone medium: magistrala, hub). **Jak zmniejszać wielkość domeny kolizyjnej?** Zastępując koncentratory **mostami** lub **przełącznikami**! Każdy port przełącznika tworzy **odrębną domenę kolizyjną** (mikrosegmentacja — przy bezpośrednim połączeniu 1 host ↔ 1 port w trybie pełnego dupleksu kolizje zostają całkowicie wyeliminowane, a każdy host dostaje pełne pasmo portu!).',
              },
              {
                title: 'Domena rozgłoszeniowa (Broadcast Domain) — Pyt. 12 i 16',
                text: 'Obszar sieci, do którego docierają ramki rozgłoszeniowe (broadcast, np. `FF:FF:FF:FF:FF:FF` używane przez ARP czy DHCP) wysłane przez dowolny komputer. Wszystkie porty koncentratora, mostu i zwykłego przełącznika należą do **tej samej domeny rozgłoszeniowej**. **Jak separować domeny rozgłoszeniowe?** (1) Fizycznie za pomocą **routera** (urządzenia warstwy 3, który nie przepuszcza rozgłoszeń L2 między swoimi interfejsami) lub (2) logicznie na przełącznikach poprzez podział na **wirtualne sieci VLAN** (przy czym komunikacja *między* VLAN-ami i tak wymaga routera lub przełącznika L3!).',
              },
            ],
          },
          {
            type: 'p',
            text: '**Przełącznik ethernetowy (Switch — Pyt. 13, 14, 18, 19)** to „inteligentny, wieloportowy most” warstwy 2 (istnieją też przełączniki trasujące *Layer 3 Switching* odczytujące adresy IP). Wewnątrz posiada procesor RISC, procesor zarządzania, pamięć buforowania ramek, inteligentny układ przełączający (ASIC) oraz sprzętową **tablicę adresów MAC (tablicę przełączania)**.',
          },
          {
            type: 'figure',
            src: '/media/sieci/w6_s20_switch_struktura.png',
            caption: 'Struktura wewnętrzna przełącznika ethernetowego: procesor RISC, procesor zarządzania, bufory ramek, inteligentny układ przełączający i tablica adresów.',
            source: 'W6_sprzet_M.pdf, slajd 20',
          },
          {
            type: 'callout',
            variant: 'exam',
            title: 'Jak przełącznik tworzy tablicę przełączania (MAC Table)? — Pyt. 19',
            text: 'Przełącznik uczy się **dynamicznie i automatycznie na podstawie adresu ŹRÓDŁOWEGO (`SA`)** każdej przychodzącej ramki! Gdy ramka wpada na port $P$, przełącznik zapisuje w tablicy wpis: `(MAC źródłowy, numer portu P, znacznik czasu/aging)`. Następnie sprawdza **adres DOCELOWY (`DA`)**:\n1) Jeśli `DA` **jest w tablicy** i leży na innym porcie → wysyła ramkę **wyłącznie na ten jeden port** (forwarding).\n2) Jeśli `DA` leży na tym samym porcie, z którego przyszła ramka → **odrzuca (filtruje)** ją.\n3) Jeśli `DA` **nie ma jeszcze w tablicy** (lub jest adresem broadcast) → rozsyła ramkę na **wszystkie pozostałe porty** (*flooding*), a gdy odbiorca odpowie, natychmiast uczy się jego portu z jego adresu źródłowego! Nieaktywne wpisy po upływie czasu starzenia są usuwane.',
          },
          {
            type: 'table',
            caption: 'Cztery sposoby przełączania ramek w przełącznikach ethernetowych (Pyt. 18)',
            headers: ['Tryb przełączania', 'Moment podjęcia decyzji', 'Opóźnienie', 'Kontrola błędów i cechy'],
            rows: [
              [
                '**1. Cut-Through (C-T)**\n*(skrócona analiza adresu)*',
                'Natychmiast po odczytaniu początku ramki z docelowym adresem MAC (`DA`).',
                '**Minimalne** (~**40 ns**)',
                '**Brak kontroli błędów** — przełącznik może przesyłać dalej uszkodzone ramki (złe CRC) oraz szczątki ramek kolizyjnych.',
              ],
              [
                '**2. Fragment-Free (F-F)**\n*(analiza min. długości ramki)*',
                'Po odebraniu i sprawdzeniu **pierwszych 64 bajtów** ramki.',
                'Niewielkie (~**65 ns**)',
                'Eliminuje większość ramek uszkodzonych w kolizjach (*runts* < 64 B zgodnie ze standardem Ethernet), ale nie sprawdza końcowej sumy CRC całej ramki.',
              ],
              [
                '**3. Store-and-Forward (S-F)**\n*(komutacja pełnych ramek)*',
                'Dopiero po odebraniu **całej ramki** do bufora i przeliczeniu sumy kontrolnej **CRC**.',
                'Największe (**zależne od długości ramki**)',
                '**Najwyższa niezawodność** — błędne ramki są odrzucane na wejściu; wymagany przy łączeniu portów o różnych prędkościach (np. 100 Mb/s → 1 Gb/s).',
              ],
              [
                '**4. Intelligent Switching (I-S)**\n*(przełączanie inteligentne)*',
                'Dynamiczne przełączanie między **C-T** i **S-F** w locie.',
                'Adaptacyjne',
                'Przy niskiej liczbie błędów działa szybko w trybie **Cut-Through**; gdy liczba błędów przekroczy próg, automatycznie przechodzi w bezpieczny tryb **Store-and-Forward**.',
              ],
            ],
          },
          {
            type: 'p',
            text: 'Dodatkowo wykład wyróżnia dwa ogólne **tryby pracy przełącznika**: **TP (Transparent Bridging)** dla pojedynczego przełącznika oraz **ES (Express Switching)**, który wydziela specjalny **port backbone** do łączenia z innymi przełącznikami — ramki o znanym adresie idą na właściwy port lokalny, a ramki o nieznanym adresie kierowane są od razu na port backbone.',
          },
        ],
      },
      {
        id: 'stp-vlan-lag-stakowanie',
        heading: '6.3. Zaawansowana warstwa 2: STP, VLAN (802.1Q), Trunking, Agregacja łączy i Stakowanie (Pyt. 17, 20–22)',
        blocks: [
          {
            type: 'list',
            items: [
              {
                title: 'Protokół drzewa rozpinającego STP (Spanning-Tree Protocol, IEEE 802.1D) — Pyt. 17',
                text: '**Gdzie i po co?** Stosowany między **przełącznikami i mostami** w warstwie 2, gdy między nimi istnieją nadmiarowe (redundantne) połączenia fizyczne tworzące **pętle**. W warstwie 2 nie ma pola `TTL` (jak w IP!), więc pętla powoduje natychmiastową **burzę rozgłoszeniową** (ramki broadcast krążą w nieskończoność, duplikując się i zawieszając sieć) oraz niestabilność tablic MAC. STP wymienia ramki sterujące **BPDU (Bridge Protocol Data Unit)**, wybiera główny przełącznik — **korzeń (Root Bridge)** — i **logicznie blokuje nadmiarowe porty** tworzące pętle, przekształcając fizyczną siatkę w logiczne **drzewo** (tylko jedna aktywna ścieżka). Zablokowane łącza pełnią rolę **łączy zapasowych** — w razie awarii głównego kabla STP automatycznie odblokowuje ścieżkę zapasową!',
              },
              {
                title: 'Sieci wirtualne VLAN (IEEE 802.1Q) — Pyt. 22',
                text: '**VLAN (Virtual LAN)** to logiczne zgrupowanie stacji końcowych w wydzieloną sieć warstwy 2 (osobną domenę rozgłoszeniową), **niezależnie od ich fizycznego podłączenia** do różnych portów lub różnych przełączników. Jak przełączniki rozpoznają przynależność ramki do VLAN-u? Standard **IEEE 802.1Q** wstawia wewnątrz nagłówka ramki Ethernet (między adresem źródłowym a polem Typ/Długość) **4-bajtowy znacznik (tag)**:\n• **TPID (Tag Protocol ID, 2 bajty)** = stała wartość `0x8100` sygnalizująca ramkę 802.1Q.\n• **TCI (Tag Control Information, 2 bajty)**: **Priorytet użytkownika (3 bity, IEEE 802.1p)** dla QoS + **CFI (Canonical Format Indicator, 1 bit)** (`0` dla Ethernetu, `1` dla Token Ring) + **VLAN ID / VID (12 bitów)** określający numer sieci VLAN ($2^{12} = 4096$ wartości: `0` brak VLAN, `1` domyślny/dla mostów, `0xFFF = 4095` zarezerwowane → **4094 wartości użytkowych**).\nPort obsługujący jeden VLAN dla hosta to **port dostępowy (access port)**, a port przenoszący wiele VLAN-ów między przełącznikami to **port trunkowy (trunk port)** (negocjowany np. przez Cisco **DTP**). Ruch nieoznakowany na łączu trunkowym trafia do tzw. **VLAN-u natywnego**. Komunikacja między różnymi sieciami VLAN **zawsze wymaga urządzenia warstwy 3 (routera lub przełącznika L3)**.',
              },
            ],
          },
          {
            type: 'svg',
            diagramId: 'vlan-8021q',
            title: 'Interaktywna anatomia 4-bajtowego znacznika IEEE 802.1Q w ramce Ethernet',
            caption: 'Dokładny rozkład bitów TPID (0x8100), Priorytetu 802.1p, CFI oraz 12-bitowego VLAN ID.',
          },
          {
            type: 'figure_grid',
            items: [
              {
                src: '/media/sieci/w6_s32_vlan_8021q.png',
                caption: 'Oryginalny schemat ramki Ethernet ze wstawionym 4-bajtowym znacznikiem VLAN 802.1Q.',
                source: 'W6_sprzet_M.pdf, slajd 32',
              },
              {
                src: '/media/sieci/w6_s36_trunking.png',
                caption: 'Trunking: przesyłanie ruchu z wielu sieci VLAN (100, 200, 300, 400) przez jedno fizyczne łącze między przełącznikami.',
                source: 'W6_sprzet_M.pdf, slajd 36',
              },
            ],
          },
          {
            type: 'p',
            text: '**W jaki sposób można łączyć przełączniki między sobą? (Pyt. 20) oraz czym jest agregacja łączy? (Pyt. 21)**',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              {
                title: '1. Zwykłe połączenie port–port (kaskadowe / uplink) i Trunking 802.1Q',
                text: 'Połączenie pojedynczym kablem (skrętka lub światłowód przez szybki port uplink/backbone). Gdy skonfigurowane są VLAN-y, łącze pracuje jako **port trunkowy** przenoszący tagowane ramki wszystkich lub wybranych VLAN-ów.',
              },
              {
                title: '2. Agregacja łączy (Link Aggregation / LAG — IEEE 802.3ad → 802.1AX) — Pyt. 21',
                text: 'Polega na **połączeniu wielu fizycznych portów i kabli między przełącznikami (lub serwerem a przełącznikiem) w jeden wspólny kanał logiczny (LAG)**. Kluczowa zaleta: dla protokołu **STP** cała grupa jest traktowana jako **jeden port logiczny**, dzięki czemu STP nie blokuje pozostałych kabli! Daje to **(a) zwielokrotnioną przepustowość i równoważenie obciążenia** (dystrybucja sesji wg `src`, `dst` lub `src-dst` adresów MAC/IP lub portów TCP/UDP; domyślnie `src-dst-mac`) oraz **(b) redundancję i wysoką dostępność** (awaria jednego kabla nie zrywa połączenia). Negocjację dynamiczną realizuje otwarty protokół **LACP** (ramki **LACPDU**). Własnościowe implementacje: Cisco **EtherChannel** (do 8 aktywnych + 8 zapasowych portów failover; tryb statyczny `mode on` lub dynamiczny **PAgP** / **LACP**), HP nazywa LAG terminem **„trunk”** (uwaga na kolizję nazw z 802.1Q!). Zaawansowany wariant **MC-LAG / Multi-Chassis LAG** (np. Cisco **vPC / Cross-Stack EtherChannel**, HP rozproszony trunking) pozwala zakończyć zagregowane łącze na **dwóch różnych fizycznych przełącznikach**, dzięki czemu sieć przetrwa awarię całego przełącznika!',
              },
              {
                title: '3. Stakowanie / łączenie w stos (Stacking — np. Cisco StackWise)',
                text: 'Łączenie grupy przełączników specjalnymi, ultraszybkimi kablami z tyłu obudów, łączącymi bezpośrednio ich **wewnętrzne szyny danych** (np. do 9 przełączników Cisco 3750 w jeden logiczny organizm). Zalety: **(a)** nie marnuje się przednich portów klienckich, **(b)** znacznie wyższa przepustowość niż zwykłe porty Ethernet, **(c)** uproszczone zarządzanie — cały stos ma **jeden wspólny adres IP zarządzania** i jedną konfigurację.',
              },
            ],
          },
          {
            type: 'figure_grid',
            items: [
              {
                src: '/media/sieci/w6_s39_agregacja_laczy.png',
                caption: 'Idea działania agregacji portów (LAG): wiele fizycznych połączeń widzianych przez STP jako jedno logiczne łącze.',
                source: 'W6_sprzet_M.pdf, slajd 39',
              },
              {
                src: '/media/sieci/w6_s46_stakowanie.png',
                caption: 'Stakowanie (Cisco StackWise) — bezpośrednie spięcie szyn danych przełączników z tyłu obudowy.',
                source: 'W6_sprzet_M.pdf, slajd 46',
              },
            ],
          },
        ],
      },
      {
        id: 'routery-i-klasa-operatorska',
        heading: '6.4. Routery: różnice względem przełącznika, funkcje, budowa ogólna i router klasy operatorskiej (Pyt. 23–26)',
        blocks: [
          {
            type: 'p',
            text: '**Router** to urządzenie działające w warstwach **1, 2 i 3** modelu OSI. Jego głównym zadaniem jest **wybór optymalnej trasy (routing)** i przekazywanie pakietów między różnymi sieciami (LAN–LAN, LAN–MAN, LAN–WAN, węzły sieci WAN oraz routing między VLAN-ami) na podstawie **docelowego adresu IP**. Przejście pakietu przez jeden router nazywamy **przeskokiem (hop)**.',
          },
          {
            type: 'table',
            caption: 'Porównanie przełącznika (Switch) i routera — kluczowe różnice (Pyt. 23)',
            headers: ['Cecha', 'Przełącznik ethernetowy (Switch L2)', 'Router (L3)'],
            rows: [
              ['Warstwa modelu OSI', 'Warstwa 2 (łącza danych) + warstwa 1', 'Warstwa 3 (sieciowa) + warstwy 2 i 1'],
              ['Jednostka i adresacja', 'Ramki, sprzętowe **adresy MAC**', 'Pakiety/datagramy, logiczne **adresy IP**'],
              ['Podstawa decyzji', 'Tablica przełączania (MAC ↔ port)', 'Tablica routingu (sieć docelowa + maska → next hop / interfejs) + protokoły routingu (RIP, OSPF, BGP)'],
              ['Domena kolizyjna', 'Separuje (każdy port = osobna domena)', 'Separuje (każdy interfejs = osobna domena)'],
              ['Domena rozgłoszeniowa', '**NIE separuje** (chyba że skonfigurowano VLAN)', '**SEPARUJE** (każdy interfejs to osobna podsieć / domena broadcast)'],
              ['Rola w sieci', 'Budowa sieci LAN, łączenie stacji w tej samej podsieci', 'Łączenie różnych sieci/podsieci, LAN–WAN, NAT, filtrowanie, routing między VLAN-ami'],
            ],
          },
          {
            type: 'p',
            text: '**Funkcje routera (Pyt. 24):** (1) wyznaczanie optymalnej ścieżki na podstawie tablicy routingu i znajomości topologii (protokoły routingu dynamicznego lub wpisy statyczne), (2) przekazywanie pakietów między interfejsami (z dekrementacją TTL, przeliczeniem sumy kontrolnej i wymianą nagłówka L2/MAC na każdym przeskoku!), (3) segmentacja domen rozgłoszeniowych i dużych sieci LAN, (4) łączenie heterogenicznych technologii (np. Ethernet LAN ↔ światłowód/łącze szeregowe WAN), (5) funkcje dodatkowe: routing między VLAN-ami, NAT/PAT, listy kontroli dostępu (ACL/firewall), DHCP.',
          },
          {
            type: 'p',
            text: '**Ogólna budowa routera (Pyt. 25):** Pod względem architektury router przypomina wyspecjalizowany komputer, ale **nie posiada klasycznego dysku twardego HDD** — opiera się wyłącznie na pamięciach półprzewodnikowych. Jego główne elementy to:',
          },
          {
            type: 'list',
            items: [
              {
                title: 'Procesor (CPU) i system operacyjny (np. Cisco IOS)',
                text: 'CPU inicjuje system, wykonuje rozkazy systemu operacyjnego (np. IOS), uruchamia pliki konfiguracyjne, oblicza trasy (protokoły routingu) i steruje interfejsami. Większe routery mają wiele procesorów.',
              },
              {
                title: 'Dwie magistrale komunikacyjne',
                text: '**Magistrala systemowa** — łączy CPU z interfejsami sieciowymi i gniazdami rozszerzeń (przesyła pakiety do i z interfejsów). **Magistrala CPU** — służy procesorowi do dostępu do pamięci routera (instrukcje i dane).',
              },
              {
                title: 'Pamięci półprzewodnikowe (widoczne na schemacie Cisco)',
                text: '**DRAM/RAM** (bieżąca konfiguracja `running-config`, tablice routingu, bufory pakietów — ulotna), **NVRAM** (zapisana konfiguracja startowa `startup-config` — nieulotna), **Flash** (obraz systemu operacyjnego IOS), **Boot ROM** (kod rozruchowy i diagnostyka POST).',
              },
              {
                title: 'Interfejsy (moduły wejścia/wyjścia)',
                text: 'Interfejsy **LAN** (np. Ethernet), interfejsy **WAN** (np. sloty WIC, łącza szeregowe/optyczne) oraz porty zarządzania: **konsola (Console)** i port pomocniczy **AUX** (z układem UART).',
              },
            ],
          },
          {
            type: 'figure',
            src: '/media/sieci/w6_s24_router_cisco.png',
            caption: 'Schemat budowy małego routera Cisco: procesor, magistrala CPU i magistrala systemowa, układ ASIC, pamięci Flash/NVRAM/DRAM/Boot ROM oraz interfejsy LAN/WAN/AUX/Konsola.',
            source: 'W6_sprzet_M.pdf, slajd 24',
          },
          {
            type: 'p',
            text: '**Budowa i zasada działania routera klasy operatorskiej (Pyt. 26):** W rdzeniu Internetu i sieciach operatorów (np. **Cisco CRS-3 o przepustowości 322 Tb/s**) architektura ze wspólną magistralą i jednym CPU byłaby całkowicie niewydolna. Router klasy operatorskiej ma **modułową, rozproszoną, wieloszafową architekturę z fizycznym rozdzieleniem ścieżki danych (*data plane*) od ścieżki sterowania (*control plane*)**:',
          },
          {
            type: 'list',
            items: [
              {
                title: 'Karty liniowe (LC — Line Cards) — lokalne przetwarzanie pakietów',
                text: 'Każda karta liniowa obsługuje zestaw ultraszybkich interfejsów i posiada **własne, dedykowane układy sprzętowe**: **układ nadawczo-odbiorczy** (fizyczny odbiór/nadawanie optyczne), **układ ramkujący** (wyodrębnianie ramek/pakietów), **procesor sieciowy (NPU)** z własną pamięcią (lokalną kopią tablicy przekazywania — błyskawicznie szuka trasy dla każdego pakietu bez angażowania głównego CPU!), **układ zarządzający ruchem** (kolejkowanie, buforowanie, QoS) oraz lokalne CPU/pamięć.',
              },
              {
                title: 'Pole komutacyjne (Switching Fabric) ze sterownikiem FSC',
                text: 'Szybka, wielodrogowa matryca przełączająca łącząca bezpośrednio wszystkie karty liniowe ze sobą (często zduplikowana dla niezawodności). Przenosi pakiety z karty liniowej wejściowej prosto do karty wyjściowej z gigantyczną przepustowością, bez udziału sterownika tras! Nadzorowane jest przez **sterownik pola komutacyjnego (FSC)** i synchronizowane przez **zegar systemowy (CLK)**.',
              },
              {
                title: 'Warstwa sterowania: RC, MC i LSC',
                text: '**Sterownik tras (RC — Route Controller)** uruchamia protokoły routingu (OSPF, BGP), buduje globalną tablicę routingu i dystrybuuje skompilowane tablice przekazywania do wszystkich kart liniowych. **Sterownik zarządzający (MC — Management Controller)** obsługuje konfigurację, monitoring i administratora. **Sterowniki kart liniowych (LSC)** pośredniczą w sterowaniu poszczególnymi półkami kart liniowych. Dzięki temu **ścieżka danych** (karta wejściowa → pole komutacyjne → karta wyjściowa) działa w 100% sprzętowo z szybkością łącza, podczas gdy **ścieżka sterowania** biegnie osobno!',
              },
            ],
          },
          {
            type: 'figure_grid',
            items: [
              {
                src: '/media/sieci/w6_s27_router_op_arch.png',
                caption: 'Architektura logiczna routera klasy operatorskiej: karty liniowe (układ Tx/Rx, ramkujący, procesor sieciowy, zarządzanie ruchem), pole komutacyjne, sterownik tras i zarządzający.',
                source: 'W6_sprzet_M.pdf, slajd 27',
              },
              {
                src: '/media/sieci/w6_s28_router_op_schemat.png',
                caption: 'Architektura szafowa routera operatorskiego: rozdzielenie ścieżki danych (linia przerywana) od ścieżki sterowania (linia ciągła), LC, LSC, RC, MC, FSC, CLK.',
                source: 'W6_sprzet_M.pdf, slajd 28',
              },
            ],
          },
          {
            type: 'figure',
            src: '/media/sieci/w6_s29_cisco_crs3.png',
            caption: 'Przykład rzeczywistego wieloszafowego routera operatorskiego: Cisco CRS-3 o przepustowości do 322 Tb/s.',
            source: 'W6_sprzet_M.pdf, slajd 29',
          },
        ],
      },
    ],
  },
];
