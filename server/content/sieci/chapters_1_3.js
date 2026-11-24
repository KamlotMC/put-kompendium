export const CHAPTERS_1_3 = [
  {
    id: 'sieci-ch1',
    subject_id: 'sieci',
    order_index: 1,
    slug: 'wprowadzenie-klasyfikacja-komutacja',
    title: 'Rozdział 1: Wprowadzenie do sieci, klasyfikacja i komutacja',
    subtitle: 'Ewolucja teleinformatyki, sieci LAN/MAN/WAN/GAN, podsieć komunikacyjna oraz mechanizmy komutacji',
    lecture_ref: 'Wykład 1 (MiKC_W1.pdf) + notatki z Wykładu 2',
    estimated_minutes: 30,
    summary:
      'Poznasz definicję sieci telekomunikacyjnej i teleinformatycznej, etapy jej rozwoju od lat 60. do ery światłowodów WDM, klasyfikację sieci ze względu na zasięg (LAN, MAN, WAN, GAN), budowę podsieci komunikacyjnej oraz trzy fundamentalne sposoby realizacji połączeń: komutację kanałów, komutację pakietów (wiadomości i datagramów) oraz komutację kanałów wirtualnych (SVC i PVC).',
    exam_questions: [1, 6, 56],
    key_takeaways: [
      'Sieć teleinformatyczna to połączenie informatyki i telekomunikacji — bez warstwy telekomunikacyjnej usługi sieciowe komputerów nie mogłyby działać.',
      'Komutacja kanałów (PSTN, ISDN) ma 3 fazy i rezerwuje fizyczne zasoby na wyłączność; komutacja datagramów wysyła niezależne pakiety różnymi drogami; komutacja kanałów wirtualnych (SVC/PVC) łączy zalety obu podejść przez numer kanału i tablice w węzłach.',
      'LAN (~2 km, 1 właściciel, 10 Mb/s–dziesiątki Gb/s), MAN (~50 km, np. POZMAN/PCSS w Poznaniu, do 100 Gb/s), WAN (kraj/świat, infrastruktura operatorów, większe opóźnienia i stopa błędów), GAN (globalne B-ISDN).',
      'Technologia WDM (zwielokrotnienie z podziałem długości fali w światłowodzie) + kompresja multimediów (ze 155 Mb/s w ATM do ~4 Mb/s dla Full HD) sprawiły, że zamiast skomplikowanego oszczędzania pasma w ATM zwyciężył model szerokopasmowy oparty na IP/WDM.',
    ],
    figures: [
      '/media/sieci/w1_s03_komunikacja.png',
      '/media/sieci/w1_s05_ewolucja.png',
      '/media/sieci/w1_s06_mainframe.png',
      '/media/sieci/w1_s07_hdd.png',
      '/media/sieci/w1_s13_podsieci.png',
      '/media/sieci/w1_s14_internet.png',
      '/media/sieci/w1_s18_komutacja_wiad.png',
      '/media/sieci/w1_s19_komutacja_datag.png',
      '/media/sieci/w1_s23_topologie_pakiet.png',
    ],
    sections: [
      {
        id: 'pojecie-i-ewolucja',
        heading: '1.1. Sieć telekomunikacyjna, teleinformatyczna i etapy rozwoju transmisji danych',
        blocks: [
          {
            type: 'p',
            text: '**Sieć telekomunikacyjna** to zbiór łączy telekomunikacyjnych, węzłów i innych urządzeń wymaganych do przesyłania informacji pomiędzy dwoma lub więcej urządzeniami komunikacyjnymi. Jej podstawowym zadaniem jest przesyłanie informacji użytkownika w dowolnej formie (głos, tekst, obraz, wideo, dane binarne).',
          },
          {
            type: 'p',
            text: 'W praktyce często używa się zamiennie pojęć **sieć komputerowa** oraz **sieć teleinformatyczna**. Termin *sieć teleinformatyczna* podkreśla synergię dwóch dziedzin: **informatyki** (przetwarzanie i świadczenie usług) oraz **telekomunikacji** (przesyłanie sygnałów przez fizyczne łącza). Bez ich ścisłej współpracy nie byłoby możliwe tworzenie współczesnych usług sieciowych.',
          },
          {
            type: 'figure_grid',
            items: [
              {
                src: '/media/sieci/w1_s03_komunikacja.png',
                caption: 'Różne rodzaje sieci umożliwiających komunikację między ludźmi (Internet, LAN/MAN, telefonia, satelita, TV/Radio, poczta).',
                source: 'MiKC_W1.pdf, slajd 3',
              },
              {
                src: '/media/sieci/w1_s05_ewolucja.png',
                caption: 'Oś czasu ewolucji sieci teleinformatycznych: od mainframe’ów i sieci gwiaździstych po ARPANET, ALOHA, Ethernet i Cambridge Ring.',
                source: 'MiKC_W1.pdf, slajd 5 (G. Waters)',
              },
            ],
          },
          {
            type: 'list',
            ordered: true,
            items: [
              {
                title: 'Lata 60. XX wieku — wielodostęp i modemy telefoniczne',
                text: 'Transmisja danych przez analogową sieć telefoniczną z wykorzystaniem modemów (z jednego centralnego komputera typu *mainframe* korzystało wiele terminali). W 1964 r. Paul Baran opublikował ideę rozproszonej sieci z komutacją pakietów.',
              },
              {
                title: 'Lata 70. XX wieku — rozległe sieci pakietowe i narodziny wielodostępu',
                text: 'Rozwój rozległych sieci pakietowych (ARPANET). Na Hawajach powstała bezprzewodowa sieć **ALOHA** (Norman Abramson, 1970), która badała problem współdzielonego medium i kolizji — zainspirowało to Roberta Metcalfe’a i Davida Boggsa (1976) do stworzenia sieci **Ethernet** (początkowo 2,96 Mb/s, później 10 Mb/s), a w 1979 r. w Cambridge opracowano bezkolizyjny **Cambridge Ring** (prekursor Token Ring).',
              },
              {
                title: 'Wczesne lata 80. — ISDN, sieci LAN i łączenie LAN z WAN',
                text: 'Wprowadzenie cyfrowej sieci telefonicznej **ISDN** (dwa cyfrowe kanały rozmówne po 64 kb/s zamiast pojedynczej linii analogowej, możliwość jednoczesnej rozmowy i transmisji danych), dynamiczny rozwój sieci lokalnych **LAN** oraz łączenie wysp LAN poprzez sieci rozległe WAN.',
              },
              {
                title: 'Koniec lat 80. — B-ISDN, ATM, MAN i Frame Relay',
                text: 'Próba budowy szerokopasmowej sieci zintegrowanej **B-ISDN** z wykorzystaniem techniki **ATM** (Asynchronous Transfer Mode — kanały 155 Mb/s projektowane specjalnie pod multimedia w erze braku szerokiego pasma), rozwój sieci miejskich **MAN**, techniki **Frame Relay** (uproszczone przesyłanie ramek do łączenia odległych LAN-ów, np. w Polsce sieć Polpak-T z gwarantowanymi kanałami 8–16 kb/s, by serwery nie traciły synchronizacji) oraz usługi **SMDS**.',
              },
              {
                title: 'Koniec lat 90. — rewolucja WDM i triumf IP/WDM',
                text: 'Przełomem okazała się optyczna technologia **WDM (Wavelength Division Multiplexing)** — zwielokrotnienie z podziałem długości fali, pozwalające w jednym włóknie światłowodowym transmitować wiele niezależnych kanałów (np. 4 × 2,5 Gb/s = 10 Gb/s, a potem 32, 64 i więcej długości fal). W połączeniu z postępem kompresji wideo (spadek wymagań dla wideo z 155 Mb/s do ~2–4 Mb/s dla Full HD) sprawiło to, że drogi i niekompatybilny ze sprzętem IP standard ATM przegrał z architekturą **IP/WDM**. Równolegle rozwijała się telefonia komórkowa i system **UMTS**.',
              },
              {
                title: 'Początek XXI wieku i przyszłość — sieci konwergentne i szerokopasmowe',
                text: 'Integracja wszystkich usług (głos, dane, wideo, IoT) w sieciach szerokopasmowych opartych na protokole IP. Nawet sieci komórkowe stanowią dziś przede wszystkim bezprzewodową końcówkę dostępową — stacje bazowe i tak są łączone ze szkieletem sieci za pomocą światłowodów. Wizje przyszłości obejmują m.in. wirtualne sieci wydzielone pod streaming z gwarancją jakości oraz sieci świadome treści (*Content Aware Networks*).',
              },
            ],
          },
          {
            type: 'figure_grid',
            items: [
              {
                src: '/media/sieci/w1_s06_mainframe.png',
                caption: 'Komputer typu Mainframe z okresu początków przetwarzania sieciowego i pracy z terminalami.',
                source: 'MiKC_W1.pdf, slajd 6',
              },
              {
                src: '/media/sieci/w1_s07_hdd.png',
                caption: 'Historyczny dysk twardy IBM 3330 (1970, 200 MB) — kontekst kosztów dawnych zasobów współdzielonych w sieciach.',
                source: 'MiKC_W1.pdf, slajd 7',
              },
            ],
          },
          {
            type: 'callout',
            variant: 'info',
            title: 'Ważna uwaga z wykładu o umowach „do 1 Gb/s” i koncentracji ruchu',
            text: 'Współczesne sieci dostępowe wykorzystują współdzieloną infrastrukturę transmisyjną i zjawisko **koncentracji** (podobnie jak w dawnych koncentratorach telefonicznych, gdzie 512 abonentów dzieliło 60 kanałów rozmównych w dwóch traktach PCM po 30 kanałów). Umowa z operatorem jest podpisywana na szybkość „do” określonej wartości, ponieważ statystycznie nie wszyscy abonenci generują maksymalny ruch jednocześnie.',
          },
        ],
      },
      {
        id: 'klasyfikacja-lan-man-wan-gan',
        heading: '1.2. Klasyfikacja sieci komputerowych: LAN, MAN, WAN i GAN',
        blocks: [
          {
            type: 'p',
            text: 'Podstawowym kryterium podziału sieci komputerowych jest ich **zasięg geograficzny**, własność infrastruktury oraz stosowane techniki transmisyjne. Zagadnienie to odpowiada bezpośrednio **pytaniu egzaminacyjnemu nr 6**.',
          },
          {
            type: 'table',
            caption: 'Porównanie charakterystycznych cech sieci LAN, MAN, WAN oraz GAN',
            headers: ['Typ sieci', 'Zasięg i własność', 'Przepustowość i standardy', 'Cechy charakterystyczne i przykłady'],
            rows: [
              [
                '**LAN** (Local Area Network)',
                'Niewielki obszar — ok. **2 km** średnicy (budynek, kampus firmy/uczelni). **Należy do jednego właściciela**.',
                'Od **10 Mb/s do kilkudziesięciu Gb/s**; głównie **Ethernet** (10/100 Mb/s, 1/10 Gb/s), dawniej FDDI 100 Mb/s i Token Ring 4/16 Mb/s.',
                'Od kilku do kilkuset/kilku tysięcy urządzeń; łatwa rozbudowa; **duża niezawodność** i niska stopa błędów; współdzielenie drukarek, pamięci, usług; zwykle (choć nie zawsze — np. odizolowany intranet) podłączona do Internetu.',
              ],
              [
                '**MAN** (Metropolitan Area Network)',
                'Aglomeracja miejska — średnica ok. **50 km**. Pośrednia między LAN i WAN. Zwykle zarządzana przez operatora miejskiego lub ośrodek akademicki.',
                'Od setek Mb/s do **100 Gb/s**; media **światłowodowe** + **Ethernet** (1/10/100 Gb/s), dawniej **FDDI** (100 Mb/s) i **ATM** (155/622 Mb/s, 2,5 Gb/s).',
                'W Polsce powstawały w latach 90. z funduszy KBN, łącząc sieci uczelniane. Przykład: poznańska sieć **POZMAN** (operator: **PCSS** — Poznańskie Centrum Superkomputerowo-Sieciowe), połączona z krajową siecią **PIONIER** i europejską **GÉANT**.',
              ],
              [
                '**WAN** (Wide Area Network)',
                'Duży obszar geograficzny: województwo, kraj, kontynent, świat. Korzysta z infrastruktury **operatorów telekomunikacyjnych**.',
                'Dowolne standardy transmisyjne i media (światłowody, radiolinie, satelity) + **protokół IP**.',
                'Łączy odległe sieci LAN i MAN oraz oddziały firm bez ograniczeń odległości. **Znaczne opóźnienia propagacyjne** (szczególnie na łączach satelitarnych), **większa częstość błędów** i większa podatność na uszkodzenia łączy niż w LAN/MAN. Przykładem jest Internet.',
              ],
              [
                '**GAN** (Global Area Network)',
                'Zasięg globalny — połączenia międzykontynentalne i ogólnoświatowe.',
                'Szerokopasmowe sieci z integracją usług **B-ISDN** (Broadband Integrated Services Digital Networks), nowoczesne sieci światłowodowo-satelitarne.',
                'Koncepcja globalnej sieci zintegrowanej usługowo obejmującej cały świat.',
              ],
            ],
          },
          {
            type: 'callout',
            variant: 'exam',
            title: 'Wskazówka na zaliczenie (Pytanie nr 6)',
            text: 'Odpowiadając na pytanie o cechy LAN, MAN i WAN, nie wymieniaj samych skrótów ani zasięgów! Skomentuj **własność infrastruktury** (jeden właściciel w LAN vs operatorzy w WAN), **niezawodność i opóźnienia** (niskie w LAN, wyższe błędy i opóźnienia propagacyjne w WAN), **typowe technologie** (Ethernet, światłowód, dawniej FDDI/ATM) oraz podaj poznański przykład sieci MAN (**POZMAN / PCSS / PIONIER / GÉANT**) — wykładowca bardzo ceni ten kontekst.',
          },
        ],
      },
      {
        id: 'podsieci-i-topologie',
        heading: '1.3. Warstwowa struktura sieci, podsieć komunikacyjna i topologie sieci pakietowych',
        blocks: [
          {
            type: 'p',
            text: 'W ujęciu klasycznym sieć komputerowa dzieli się na **zasoby sieciowe** (komputery obsługowe `KO`, terminale `T`, koncentratory `K`, procesory czołowe `P.Cz.`) oraz **podsieć komunikacyjną** złożoną z połączonych ze sobą węzłów komunikacyjnych `W` (dzisiejszych routerów/przełączników szkieletowych), które odpowiadają za przenoszenie danych między końcowymi zasobami.',
          },
          {
            type: 'p',
            text: 'Współczesny Internet ma strukturę hierarchicznej „sieci sieci”: na brzegu znajdują się sieci domowe, korporacyjne, mobilne i centra danych, połączone przez lokalnych dostawców (Local/Regional ISP) z sieciami szkieletowymi globalnych operatorów (National/Global ISP) i sieciami dostawców treści.',
          },
          {
            type: 'figure_grid',
            items: [
              {
                src: '/media/sieci/w1_s13_podsieci.png',
                caption: 'Ogólna warstwowa struktura sieci komputerowej: podsieć komunikacyjna (węzły W) oraz podłączone zasoby (KO, P.Cz., K, T).',
                source: 'MiKC_W1.pdf, slajd 13',
              },
              {
                src: '/media/sieci/w1_s14_internet.png',
                caption: 'Składniki współczesnego Internetu: sieci dostępowe (domowe, firmowe, mobilne) oraz szkielet ISP.',
                source: 'MiKC_W1.pdf, slajd 14 (Kurose & Ross)',
              },
            ],
          },
          {
            type: 'p',
            text: 'Podsieci komunikacyjne klasyfikujemy według trzech kryteriów: **(1) sposobu realizacji połączeń (komutacji)**, **(2) sposobu sterowania** (sterowanie **scentralizowane** — jeden ośrodek decyduje o trasach, proste, ale pojedynczy punkt awarii i wąskie gardło; vs sterowanie **rozproszone** — każdy węzeł podejmuje decyzje na podstawie wymiany informacji z sąsiadami, odporne na awarie i skalowalne) oraz **(3) konfiguracji zwanej topologią sieci**.',
          },
          {
            type: 'figure',
            src: '/media/sieci/w1_s23_topologie_pakiet.png',
            caption: 'Topologie sieci pakietowych: gwiazda, pętla, drzewo, siatka zupełna (pełna) oraz siatka niezupełna (częściowa).',
            source: 'MiKC_W1.pdf, slajd 23',
          },
          {
            type: 'list',
            items: [
              {
                title: 'Gwiazda i drzewo',
                text: 'Prosta konfiguracja i łatwe dodawanie węzłów, ale awaria węzła centralnego/korzenia odcina komunikację w poddrzewie.',
              },
              {
                title: 'Pętla (pierścień)',
                text: 'Każdy węzeł ma dwóch sąsiadów; w pętli podwójnej (np. FDDI) awaria jednego łącza nie przerywa pracy.',
              },
              {
                title: 'Siatka zupełna (pełna) vs niezupełna (częściowa)',
                text: 'W pełnej siatce każdy z $n$ węzłów jest połączony bezpośrednio z każdym innym (liczba łączy $\\frac{n(n-1)}{2}$ — ogromna niezawodność, ale bardzo wysoki koszt). W praktyce rozległe sieci pakietowe (jak Internet) stosują **siatkę częściową (niezupełną)**, zapewniającą alternatywne trasy przy rozsądnej liczbie łączy.',
              },
            ],
          },
        ],
      },
      {
        id: 'komutacja',
        heading: '1.4. Mechanizmy komutacji: kanałów, pakietów i kanałów wirtualnych',
        blocks: [
          {
            type: 'p',
            text: 'Jednym z absolutnie kluczowych zagadnień (bezpośrednio **pytanie nr 1 na zaliczeniu**) jest rozróżnienie metod komutacji w podsieci komunikacyjnej. Wyróżniamy sieci z komutacją: **kanałów**, **pakietów** (wiadomości oraz datagramów), **kanałów wirtualnych**, a także komutacją **blokową** i **hybrydową**.',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              {
                title: 'Komutacja kanałów (Circuit Switching)',
                text: 'Przed rozpoczęciem przesyłania danych zestawiana jest dedykowana droga połączeniowa złożona z kolejno połączonych kanałów fizycznych pomiędzy nadawcą a odbiorcą. Transmisja składa się zawsze z **trzech faz**: (1) zestawienie połączenia, (2) przesyłanie danych, (3) rozłączenie połączenia. Kanały fizyczne są zarezerwowane na wyłączność przez cały czas trwania połączenia — **nie mogą być używane przez inne połączenia nawet w chwilach ciszy** (niskie wykorzystanie pasma przy ruchu impulsowym, za to stałe opóźnienie i gwarantowana przepustowość). Dopiero rozłączenie zwalnia kanały dla innych użytkowników. Przykłady: tradycyjna analogowa sieć telefoniczna (PSTN) oraz cyfrowa sieć telefoniczna **ISDN**.',
              },
              {
                title: 'Komutacja pakietów — wariant A: Komutacja wiadomości (Message Switching)',
                text: 'Nie zestawia się dedykowanego kanału fizycznego. **Cała wiadomość** otrzymuje nagłówek z adresem docelowym i jest przesyłana jako jeden duży pakiet od węzła do węzła w trybie *store-and-forward* (zapamiętaj i prześlij). Wadą są bardzo duże wymagania na bufory w węzłach oraz blokowanie łącza przez długie wiadomości.',
              },
              {
                title: 'Komutacja pakietów — wariant B: Komutacja datagramów (Datagram Packet Switching)',
                text: 'Wiadomość jest dzielona na mniejsze, ponumerowane części — **datagramy** (pakiety). Każdy datagram ma własny nagłówek z pełnymi adresami źródła i przeznaczenia oraz numerem kolejnym i jest **przesyłany przez sieć całkowicie niezależnie** (usługa bezpołączeniowa). Poszczególne pakiety tej samej wiadomości mogą dotrzeć do celu **różnymi trasami** i w **innej kolejności**, mogą też ulec zgubieniu lub duplikacji — ich poskładaniem zajmuje się warstwa wyższa odbiorcy (np. TCP). Zaletą jest doskonałe wykorzystanie łączy (współdzielenie pasma) i odporność na awarię węzła w trakcie transmisji. Przykład: protokół **IP** w Internecie.',
              },
              {
                title: 'Komutacja kanałów wirtualnych (Virtual Circuit Switching)',
                text: 'Jest to **usługa połączeniowa** działająca w sieci pakietowej, łącząca zalety komutacji kanałów i pakietów. Przed przesłaniem danych zestawiany jest **kanał wirtualny** (logiczny odpowiednik łącza fizycznego) od nadawcy do odbiorcy. Każde połączenie otrzymuje lokalny **numer kanału (identyfikator VC)**, dzięki czemu pakiety z danymi nie muszą przenosić pełnych adresów komputerów w nagłówku — wystarczy krótki numer kanału oraz informacja, z którego węzła pakiet przybył. Węzły utrzymują **tablice połączeń** z jednym wpisem na każdy aktywny kanał wirtualny i wiedzą dokładnie, na jaki port wysłać pakiet. Właściwą kolejność gwarantuje numeracja sekwencyjna, a zasoby fizyczne łącza nadal są współdzielone statystycznie między wieloma kanałami wirtualnymi! Przykłady: X.25, Frame Relay, ATM, MPLS.',
              },
            ],
          },
          {
            type: 'figure_grid',
            items: [
              {
                src: '/media/sieci/w1_s18_komutacja_wiad.png',
                caption: 'Komutacja wiadomości: cała wiadomość opatrywana jest pojedynczym nagłówkiem i przesyłana jako jeden blok.',
                source: 'MiKC_W1.pdf, slajd 18',
              },
              {
                src: '/media/sieci/w1_s19_komutacja_datag.png',
                caption: 'Komutacja datagramów: podział wiadomości na niezależne części (1–4), każda z własnym nagłówkiem N.',
                source: 'MiKC_W1.pdf, slajd 19',
              },
            ],
          },
          {
            type: 'callout',
            variant: 'info',
            title: 'Dwa rodzaje połączeń w komutacji kanałów wirtualnych: SVC i PVC',
            text: '**SVC (Switched Virtual Circuit)** — tymczasowe połączenie wirtualne zestawiane na żądanie użytkownika na krótki czas; specjalny pakiet służbowy wyznacza trasę i tworzy wpisy w tablicach węzłów, a na koniec inny pakiet rozłącza połączenie i usuwa te wpisy. **PVC (Permanent Virtual Circuit)** — stałe połączenie wirtualne konfigurowane ręcznie przez administratorów sieci między parą użytkowników; działa cały czas z przypisanymi na stałe numerami kanałów, więc w sieci krążą wyłącznie pakiety z danymi (brak narzutu na zestawianie i rozłączanie).',
          },
          {
            type: 'table',
            caption: 'Zestawienie porównawcze trzech metod komutacji',
            headers: ['Cecha', 'Komutacja kanałów', 'Komutacja datagramów (pakietów)', 'Komutacja kanałów wirtualnych'],
            rows: [
              ['Tryb pracy', 'Połączeniowy (3 fazy)', 'Bezpołączeniowy', 'Połączeniowy (SVC: 3 fazy; PVC: stałe)'],
              ['Wykorzystanie łącza', 'Zasoby zarezerwowane na wyłączność (marnowane w ciszy)', 'Współdzielone dynamicznie (bardzo wysokie)', 'Współdzielone dynamicznie (wysokie)'],
              ['Nagłówek pakietu', 'Brak pakietów (ciągły strumień)', 'Pełne adresy źródła i celu (duży nagłówek)', 'Krótki numer kanału wirtualnego'],
              ['Stan w węzłach pośrednich', 'Stan fizycznego przełączenia', 'Brak stanu połączeń (tylko tablica routingu)', 'Tablica otwartych kanałów wirtualnych'],
              ['Kolejność i trasa', 'Zawsze ta sama trasa i kolejność', 'Różne trasy, możliwa zmiana kolejności', 'Jedna ustalona trasa, zachowana kolejność'],
              ['Przykłady', 'PSTN, ISDN', 'IP (Internet)', 'X.25, Frame Relay, ATM'],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sieci-ch2',
    subject_id: 'sieci',
    order_index: 2,
    slug: 'model-iso-osi',
    title: 'Rozdział 2: Model odniesienia ISO/OSI',
    subtitle: 'Architektura 7-warstwowa ISO 7498 / ITU-T X.200, założenia dekompozycji, enkapsulacja PDU i rola każdej warstwy',
    lecture_ref: 'Wykład 2 (W2_OSI_M.pdf)',
    estimated_minutes: 25,
    summary:
      'Szczegółowe omówienie siedmiowarstwowego modelu odniesienia dla współpracy systemów otwartych (ISO/OSI): dlaczego podzielono komunikację na warstwy, jak działa komunikacja wirtualna i enkapsulacja PDU, czym są warstwy partnerskie, segmenty (entity) i punkty SAP oraz jakie dokładnie zadania realizuje każda z 7 warstw — od fizycznego bitu po aplikację użytkownika.',
    exam_questions: [2],
    key_takeaways: [
      'Model OSI (ISO 7498 z 1984 r., odpowiednik ITU-T X.200) to logiczny model referencyjny złożony z 7 warstw, ułatwiający niezależną standaryzację protokołów.',
      'Równorzędne warstwy (warstwy partnerskie) nie komunikują się bezpośrednio — faktyczna transmisja zachodzi wyłącznie przez warstwę fizyczną, po drodze każda warstwa dokłada nagłówek (a L2 także ogon DT).',
      'Systemy końcowe implementują wszystkie warstwy 1–7, natomiast węzły sieciowe pośredniczące (routery) implementują warstwy 1–3.',
      'Warstwa 4 (transportowa) to pierwsza warstwa typu end-to-end (koniec–koniec) między systemami końcowymi.',
    ],
    figures: [
      '/media/sieci/w2_s04_filozof_tlumacz.png',
      '/media/sieci/w2_s09_osi_warstwy.png',
      '/media/sieci/w2_s17_osi_wezly.png',
    ],
    sections: [
      {
        id: 'definicja-zalozenia-osi',
        heading: '2.1. Definicja, standardy, założenia i cele modelu ISO/OSI',
        blocks: [
          {
            type: 'p',
            text: '**Model odniesienia dla współpracy systemów otwartych — OSI (Open Systems Interconnection Reference Model)** to powszechnie uznawany, standaryzowany przez organizację **ISO** model architektury komunikacyjnej sieci. Opisuje środowisko, w którym dwa dowolne systemy otwarte mogą wymieniać informacje pod warunkiem zaimplementowania tych samych protokołów komunikacyjnych. Jest to logiczna struktura obejmująca **7 podstawowych warstw**.',
          },
          {
            type: 'p',
            text: 'Prace nad modelem rozpoczęto w **1977 roku**, a końcowa norma ukazała się w **1984 roku** jako **ISO 7498**. Technicznie zgodną wersję dla telekomunikacji opublikował komitet **CCITT** (obecnie **ITU-T**) jako zalecenie **X.200**.',
          },
          {
            type: 'figure',
            src: '/media/sieci/w2_s04_filozof_tlumacz.png',
            caption: 'Analogia architektury warstwowej (Tanenbaum): filozofowie (W3) komunikują się logicznie przez tłumaczy (W2) i sekretarki z faksem (W1). Zmiana języka między tłumaczami nie wpływa na filozofów ani faks.',
            source: 'W2_OSI_M.pdf, slajd 4',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              {
                title: 'Założenie 1: Umiarkowana liczba warstw',
                text: 'Nie należy tworzyć zbyt wielu warstw, aby ich opis i współpraca nie stały się nadmiernie skomplikowane.',
              },
              {
                title: 'Założenie 2: Proste granice i mało interakcji',
                text: 'Granice między sąsiednimi warstwami tworzymy tak, by liczba interakcji przez styk była jak najmniejsza, a opis usług prosty.',
              },
              {
                title: 'Założenie 3: Grupowanie podobnych funkcji',
                text: 'Podobne zadania powinny znaleźć się w obrębie jednej warstwy.',
              },
              {
                title: 'Założenie 4: Wyraźne różnice między warstwami',
                text: 'Usługi różnych warstw powinny wyraźnie różnić się procesami, technologiami lub poziomem abstrakcji danych.',
              },
              {
                title: 'Założenie 5: Niezależność implementacji',
                text: 'Zmiana sposobu realizacji warstwy (np. wymiana sprzętu) nie może wymuszać zmiany usług świadczonych warstwie wyższej ani oczekiwanych od warstwy niższej.',
              },
              {
                title: 'Założenie 6: Praktyczne styki',
                text: 'Granice należy wyznaczać tam, gdzie ze względów praktycznych wygodnie jest mieć standaryzowany styk.',
              },
            ],
          },
          {
            type: 'callout',
            variant: 'info',
            title: 'Trzy główne cele standaryzacji w modelu OSI',
            text: '(1) Stworzenie ogólnej struktury pod dalszą standaryzację — w każdej warstwie można definiować jeden lub wiele protokołów. (2) Możliwość **równoległego i niezależnego** rozwijania standardów dla różnych warstw, co przyspiesza postęp. (3) **Izolacja zmian** — modyfikacja standardu w jednej warstwie nie wpływa na oprogramowanie działające w pozostałych warstwach.',
          },
        ],
      },
      {
        id: 'pojecia-i-enkapsulacja',
        heading: '2.2. Podstawowe pojęcia: warstwy partnerskie, segmenty (entity), SAP i enkapsulacja',
        blocks: [
          {
            type: 'list',
            items: [
              {
                title: 'Warstwy partnerskie (Peer Layers)',
                text: 'Warstwy tego samego poziomu w dwóch różnych systemach otwartych (np. warstwa transportowa komputera A i warstwa transportowa komputera B). Komunikują się one wyłącznie **wirtualnie** za pomocą wspólnego protokołu warstwy $N$.',
              },
              {
                title: 'Segmenty (ang. Entity / N-segment)',
                text: 'Aktywne zasoby (procesy, moduły sprzętowe/programowe) w warstwie $N$, odpowiedzialne za realizację usług tej warstwy i protokołu komunikacji z warstwą partnerską. W jednej warstwie może działać wiele identycznych lub różnych $N$-segmentów (np. jednocześnie TCP i UDP w warstwie 4).',
              },
              {
                title: 'Styk i punkt dostępu do usług SAP (Service Access Point)',
                text: 'Każdy segment komunikuje się z warstwą wyższą lub niższą przez standaryzowany **styk**, realizowany za pomocą jednego lub wielu punktów dostępu do usług **SAP** (za pomocą prymitywów żądania/wskazania).',
              },
              {
                title: 'Enkapsulacja i jednostki PDU (Protocol Data Unit)',
                text: 'Gdy aplikacja X wysyła dane do aplikacji Y, dane schodzą w dół stosu od warstwy 7 do 1. Każda warstwa dodaje własny nagłówek (`AH`, `PH`, `SH`, `TH`, `NH`, `DH`), a warstwa łącza danych dodatkowo sumę kontrolną na końcu — ogon (`DT`). Dopiero warstwa fizyczna wysyła strumień bitów przez medium. W systemie odbiorczym zachodzi **dekapsulacja** (zdejmowanie kolejnych nagłówków od warstwy 1 do 7).',
              },
            ],
          },
          {
            type: 'figure_grid',
            items: [
              {
                src: '/media/sieci/w2_s09_osi_warstwy.png',
                caption: 'Model 7 warstw OSI oraz proces enkapsulacji kolejnych jednostek danych (A-PDU aż do DL-PDU z nagłówkiem DH i ogonem DT).',
                source: 'W2_OSI_M.pdf, slajd 9',
              },
              {
                src: '/media/sieci/w2_s17_osi_wezly.png',
                caption: 'Systemy końcowe (warstwy 1–7) komunikujące się przez węzły sieciowe (routery), które implementują tylko warstwy 1–3.',
                source: 'W2_OSI_M.pdf, slajd 17',
              },
            ],
          },
        ],
      },
      {
        id: 'funkcjonalnosc-7-warstw',
        heading: '2.3. Szczegółowa charakterystyka funkcjonalna wszystkich 7 warstw modelu OSI',
        blocks: [
          {
            type: 'p',
            text: 'Poniższe zestawienie wyczerpująco odpowiada na **pytanie egzaminacyjne nr 2 („Funkcjonalność warstw modelu OSI”)**. Zapamiętaj kolejność warstw (od dołu 1→7: **F**izyczna, **Ł**ącza danych, **S**ieciowa, **T**ransportowa, **S**esji, **P**rezentacji, **A**plikacji) oraz konkretne zadania i protokoły każdej z nich.',
          },
          {
            type: 'table',
            caption: 'Wszystkie 7 warstw modelu ISO/OSI — funkcje, PDU, urządzenia i przykładowe standardy',
            headers: ['Nr', 'Warstwa (PL / EN)', 'Jednostka (PDU)', 'Kluczowe funkcje i mechanizmy', 'Przykładowe standardy / uwagi'],
            rows: [
              [
                '**7**',
                '**Warstwa aplikacji**\n*(Application Layer)*',
                'Dane / A-PDU',
                'Umożliwia programom użytkowym dostęp do środowiska sieciowego OSI; zawiera mechanizmy zarządzające i wspierające aplikacje rozproszone (transfer plików, poczta, obsługa transakcji). Z perspektywy użytkownika realizuje wirtualne przesłanie danych.',
                'HTTP, FTP, SMTP, DNS, Telnet, SNMP',
              ],
              [
                '**6**',
                '**Warstwa prezentacji**\n*(Presentation Layer)*',
                'Dane / P-PDU',
                'Definiuje format i reprezentację danych (składnię). Przekształca kody i formaty użytkownika na format sieciowy i odwrotnie: **kodowanie znaków, kompresja, szyfrowanie i deszyfrowanie**. Uzgadnia abstrakcyjną syntaktykę z warstwą 7 oraz syntaktykę transferu z partnerską warstwą 6.',
                'Virtual Terminal Protocol (terminale wizualne), ASN.1, TLS/SSL, JPEG/MPEG',
              ],
              [
                '**5**',
                '**Warstwa sesji**\n*(Session Layer)*',
                'Dane / S-PDU',
                'Zapewnia uporządkowaną wymianę danych (dialog/sesję) między partnerskimi warstwami prezentacji. Określa **tryb dialogu** (dwukierunkowy jednoczesny *full-duplex*, naprzemienny *half-duplex*, jednokierunkowy *simplex*), synchronizuje dostęp do zasobów, wstawia **punkty synchronizacyjne (kontrolne)** oraz umożliwia odtwarzanie i restart przerwanego dialogu.',
                'RPC, NetBIOS, protokoły kontroli sesji i tokenów dialogu',
              ],
              [
                '**4**',
                '**Warstwa transportowa**\n*(Transport Layer)*',
                'Segment (TCP) / Datagram (UDP) / T-PDU',
                '**Pierwsza warstwa typu end-to-end** (między systemami końcowymi). Dzieli wiadomości na bloki i składa je u odbiorcy; zapewnia bezbłędne dostarczenie bez utraty, duplikacji czy zmiany kolejności; kontroluje priorytety, opóźnienia, przepływ i tajność; optymalizuje wykorzystanie warstwy sieciowej.',
                'W OSI zdefiniowano **5 klas protokołów transportowych** (TP0–TP4); w Internecie: **TCP**, **UDP**',
              ],
              [
                '**3**',
                '**Warstwa sieciowa**\n*(Network Layer)*',
                'Pakiet / Datagram / N-PDU',
                'Zapewnia przesyłanie pakietów przez całą sieć komunikacyjną i dostarczanie ich wskazanym adresatom. Główne zadanie to **wybór trasy (routing)** w obrębie podsieci i między podsieciami. Działa w trybie połączeniowym lub bezpołączeniowym; może potwierdzać odbiór. **Węzły sieciowe (routery) realizują warstwy 1–3.**',
                'Dawniej **CCITT X.25**, obecnie **IP** (oraz ICMP, RIP, OSPF, BGP)',
              ],
              [
                '**2**',
                '**Warstwa łącza danych**\n*(Data Link Layer)*',
                'Ramka (Frame) / DL-PDU',
                'Zapewnia niezawodną transmisję przez pojedynczy kanał między **dwoma sąsiednimi węzłami** sieci. Organizuje bity w numerowane **ramki**, zabezpiecza przed błędami kodowaniem **CRC**, stosuje potwierdzenia odbioru i retransmisję uszkodzonych ramek. W sieciach LAN (IEEE 802) dzieli się na podwarstwy **LLC** i **MAC**.',
                '**HDLC** i jego odmiany: **LAP-B** (sieci X.25), **LAP-D** (kanał D w ISDN); w LAN: Ethernet (802.3), Token Ring (802.5), Wi-Fi (802.11)',
              ],
              [
                '**1**',
                '**Warstwa fizyczna**\n*(Physical Layer)*',
                'Bit',
                'Zapewnia przesyłanie surowego strumienia bitów przez medium transmisyjne. Określa warunki **elektryczne, mechaniczne, funkcjonalne i proceduralne** niezbędne do zestawienia, utrzymania i rozłączenia łącza fizycznego (poziomy napięć, czas trwania bitu, kształty wtyków). **Uwaga: charakterystyka samego medium fizycznego nie należy do modelu OSI!**',
                'CCITT **V.24**, **RS-232C**, **X.21**, warstwa PHY Ethernetu',
              ],
            ],
          },
          {
            type: 'callout',
            variant: 'warning',
            title: 'Częsta pułapka egzaminacyjna!',
            text: '1) **Medium transmisyjne** (kabel, światłowód, fale radiowe) formalnie leży *poniżej* warstwy 1 — model OSI nie standaryzuje samej charakterystyki medium. 2) **Warstwa 2** działa tylko *hop-by-hop* (między sąsiednimi węzłami), **warstwa 3** prowadzi pakiety przez wiele sieci (routing), a dopiero **warstwa 4** jest pierwszą warstwą **end-to-end** (komunikacja proces–proces między hostami końcowymi).',
          },
        ],
      },
    ],
  },
  {
    id: 'sieci-ch3',
    subject_id: 'sieci',
    order_index: 3,
    slug: 'model-tcpip-i-historia-internetu',
    title: 'Rozdział 3: Architektura TCP/IP, ARP/ICMP/IGMP i historia Internetu',
    subtitle: '4-warstwowy model TCP/IP, porównanie z OSI, szczegółowe działanie ARP, ICMP i IGMP oraz kamienie milowe Internetu',
    lecture_ref: 'Wykład 3 (W3_TCP_M.pdf)',
    estimated_minutes: 30,
    summary:
      'Poznasz genezę i budowę czterowarstwowej architektury TCP/IP (standard de facto), szczegółową rolę każdej warstwy i działających w niej protokołów, porównanie OSI vs TCP/IP, kluczowe protokoły warstwy międzysieciowej (ARP z tablicą ARP, ICMP używany przez ping/traceroute, IGMP dla multicastu) oraz historię ARPANET, komputerów IMP i początków Internetu w Polsce.',
    exam_questions: [3, 4, 5, 44, 45, 46, 56],
    key_takeaways: [
      'TCP/IP powstał wcześniej niż model OSI jako otwarty standard de facto (DARPA, Kahn & Cerf 1973; wdrożony w Internecie 1 stycznia 1983 r. w miejsce NCP; spopularyzowany dzięki darmowej implementacji w Berkeley UNIX).',
      'Architektura TCP/IP ma 4 warstwy: (1) Dostępu do sieci, (2) Międzysieciową, (3) Transportową (Host-to-Host) oraz (4) Procesów/Aplikacji.',
      'ARP odwzorowuje logiczny adres IP na sprzętowy adres MAC w tej samej sieci lokalnej (rozgłoszenie ARP Request → odpowiedź unicast ARP Reply → zapis w tablicy ARP cache).',
      'ICMP raportuje błędy i stany sieciowe wewnątrz datagramów IP (używany przez ping i traceroute). IGMP zarządza przynależnością hostów do grup multicast (adresy klasy D).',
    ],
    figures: [
      '/media/sieci/w3_s14_tcpip_protokoly.png',
      '/media/sieci/w3_s15_osi_vs_tcpip.png',
      '/media/sieci/w3_s20_arpanet_1969.png',
      '/media/sieci/w3_s22_arpanet_rozwoj.png',
    ],
    sections: [
      {
        id: 'geneza-i-struktura-tcpip',
        heading: '3.1. Geneza, ogólna struktura architektury TCP/IP i porównanie z OSI',
        blocks: [
          {
            type: 'p',
            text: '**TCP/IP** oznacza jednocześnie nazwę rodziny protokołów (od dwóch głównych: *Transmission Control Protocol* i *Internet Protocol*) oraz nazwę **czterowarstwowego modelu architektury sieciowej**. Powstał w wyniku prac badawczych amerykańskiej agencji **DARPA** nadzorowanej przez Departament Obrony USA, aby umożliwić komunikację między heterogenicznymi komputerami różnych producentów korzystającymi z rozmaitych łączy (wolnych, szybkich, bezprzewodowych).',
          },
          {
            type: 'p',
            text: 'Prace nad protokołem TCP rozpoczęli w **1973 r.** **Bob Kahn (DARPA)** i **Vinton Cerf (Stanford)**. Początkowo TCP miał realizować wszystkie usługi w jednym protokole. Jednak **Danny Cohen (USC)** zauważył, że nie wszystkie aplikacje wymagają pełnej niezawodności (czasem ważniejsza jest *aktualność niż dokładność*, np. transmisja mowy w czasie rzeczywistym). Dlatego rozdzielono protokół na **IP** (podstawowe adresowanie i kierowanie pakietów) oraz **TCP** (niezawodność, kontrola przepływu, składanie danych), a dodatkowo stworzono lekki, bezpołączeniowy protokół **UDP** korzystający bezpośrednio z IP.',
          },
          {
            type: 'callout',
            variant: 'info',
            title: 'Dlaczego TCP/IP wygrał z formalnym modelem OSI?',
            text: '1) Powstał **wcześniej niż OSI** — warstwy TCP/IP są wynikiem analizy istniejących, działających protokołów, a nie teoretycznego projektu. 2) Stał się **standardem de facto** (powszechnie przyjętym w praktyce, bez narzucania przez formalne organizacje). 3) Został wbudowany w darmowy system **Berkeley UNIX (BSD)**, co błyskawicznie rozpowszechniło go na uczelniach. 4) Był **otwartym standardem** z dostępnym kodem źródłowym — każdy mógł go rozwijać.',
          },
          {
            type: 'svg',
            diagramId: 'osi-vs-tcpip',
            title: 'Interaktywne porównanie modeli ISO/OSI (7 warstw) i TCP/IP (4 warstwy)',
            caption: 'Kliknij dowolną warstwę, aby zobaczyć jej dokładną rolę, jednostkę PDU i mapowanie pomiędzy modelami.',
          },
          {
            type: 'figure_grid',
            items: [
              {
                src: '/media/sieci/w3_s15_osi_vs_tcpip.png',
                caption: 'Oryginalny schemat z wykładu: mapowanie 7 warstw OSI na 4 warstwy TCP/IP (5–7 → Aplikacji, 4 → Transportowa, 3 → Międzysieciowa, 1–2 → Dostępowa).',
                source: 'W3_TCP_M.pdf, slajd 15',
              },
              {
                src: '/media/sieci/w3_s14_tcpip_protokoly.png',
                caption: 'Przegląd protokołów w poszczególnych warstwach architektury TCP/IP.',
                source: 'W3_TCP_M.pdf, slajd 14',
              },
            ],
          },
        ],
      },
      {
        id: 'funkcjonalnosc-warstw-tcpip',
        heading: '3.2. Funkcjonalność warstw modelu TCP/IP i przypisane im protokoły',
        blocks: [
          {
            type: 'p',
            text: 'Ta sekcja bezpośrednio odpowiada na **pytania egzaminacyjne nr 3, 4 i 5** (struktura, funkcjonalność oraz protokoły poszczególnych warstw architektury TCP/IP).',
          },
          {
            type: 'table',
            caption: 'Cztery warstwy modelu TCP/IP — funkcje, sprzęt i protokoły',
            headers: ['Warstwa TCP/IP', 'Odpowiednik OSI', 'Szczegółowa funkcjonalność', 'Protokoły i technologie'],
            rows: [
              [
                '**4. Warstwa procesów / aplikacji**\n*(Process / Application Layer)*',
                'Warstwy 5, 6, 7\n(Sesji, Prezentacji, Aplikacji)',
                'Zapewnia aplikacjom i użytkownikom dostęp do zasobów sieciowych, ich podział i współużytkowanie. Realizuje kontakt z procesem/użytkownikiem, **konwersję formatu danych, szyfrowanie, deszyfrowanie, kompresję**, zdalne wywoływanie procedur (RPC) i przesyłanie danych aplikacji.',
                '**Nad TCP:** HTTP/HTTPS, FTP, SMTP, Telnet, SSH, POP3, IMAP\n**Nad UDP:** DNS, RTP/RTCP, NFS, SNMP, DHCP, TFTP',
              ],
              [
                '**3. Warstwa transportowa**\n*(Host-to-Host Layer)*',
                'Warstwa 4\n(Transportowa)',
                'Zarządzanie i sterowanie przepływem wiadomości między nadawcą a odbiorcą (komunikacja koniec–koniec). Kieruje dane do właściwych aplikacji na podstawie **numerów portów**, odpowiada za niezawodność (w TCP), nawiązywanie i zrywanie połączeń oraz kontrolę błędów.',
                '**TCP** (połączeniowy, niezawodny, klient–serwer) oraz **UDP** (bezpołączeniowy, szybki, bez gwarancji dostarczenia)',
              ],
              [
                '**2. Warstwa międzysieciowa**\n*(Internetwork Layer)*',
                'Warstwa 3\n(Sieciowa)',
                'Odpowiada za **adresowanie logiczne (IP)** oraz **określanie i obsługę drogi (routing)** pakietów między niejednorodnymi sieciami. Świadczy usługę **bezpołączeniową** — każdy pakiet może iść inną trasą, bez potwierdzeń, sterowania przepływem i porządkowania kolejności. Implementowana w hostach i routerach.',
                '• **Rutujące (przenoszące dane):** IP, IPX, DDP\n• **Rutingu (wyznaczania tras):** RIP, OSPF, BGP, EGP\n• **Kontroli i błędów:** ICMP\n• **Odwzorowania adresów:** ARP, RARP\n• **Zarządzania grupami:** IGMP',
              ],
              [
                '**1. Warstwa dostępu do sieci**\n*(Network Access Layer)*',
                'Warstwy 1 i 2\n(Fizyczna i Łącza danych)',
                'Koordynuje wymianę danych między urządzeniami podłączonymi do **tej samej sieci lokalnej/łącza**. Obejmuje sygnalizację elektryczną/optyczną w medium (skrętka, światłowód), ramkowanie, dostęp do medium, lokalną kontrolę błędów, priorytety i sprzęt (karty NIC, koncentratory, przełączniki, modemy).',
                'Ethernet (IEEE 802.3), Wi-Fi (802.11), Token Ring (802.5), PPP, Frame Relay, ATM',
              ],
            ],
          },
        ],
      },
      {
        id: 'arp-icmp-igmp',
        heading: '3.3. Protokoły pomocnicze warstwy międzysieciowej: ARP, RARP, ICMP i IGMP',
        blocks: [
          {
            type: 'p',
            text: 'Wokół protokołu IP działa zestaw kluczowych protokołów wspomagających. Pytania o **ARP**, **tablicę ARP** oraz **ICMP** pojawiają się niemal na każdym zaliczeniu (**pytania 44, 45 i 46**).',
          },
          {
            type: 'list',
            items: [
              {
                title: 'Protokół ARP (Address Resolution Protocol) — odwzorowanie IP → MAC (Pyt. 44 i 45)',
                text: 'W sieci lokalnej (Ethernet) ramki dostarczane są wyłącznie za pomocą 48-bitowych sprzętowych **adresów MAC**, natomiast aplikacje i warstwa sieciowa posługują się logicznymi **adresami IP**. Gdy host A chce wysłać pakiet do hosta B (lub bramy domyślnej) w **tej samej sieci lokalnej** i nie zna jego adresu MAC, wysyła **rozgłoszeniowe (broadcast)** żądanie **ARP Request**: *„Kto ma adres IP v.x.y.z? Podaj mi swój adres MAC”*. Dociera ono do wszystkich stacji w domenie rozgłoszeniowej, ale odpowiada (**unicast ARP Reply**) wyłącznie właściciel tego adresu IP. Aby nie wysyłać zapytań przed każdą ramką, każdy komputer utrzymuje w pamięci RAM **tablicę ARP (ARP cache)** przechowującą pary `(adres IP ↔ adres MAC)` wraz z czasem wygasania wpisu (wpisy dynamiczne wygasają po kilku minutach, wpisy statyczne są stałe). Przed wysłaniem ramki host najpierw sprawdza tablicę ARP; jeśli wpis istnieje, natychmiast używa zapisanego MAC, a dopiero przy jego braku uruchamia procedurę ARP Request.',
              },
              {
                title: 'Protokół RARP (Reverse Address Resolution Protocol)',
                text: 'Działa w odwrotnym kierunku (`MAC → IP`). Umożliwiał komputerom bezdyskowym (znającym tylko własny sprzętowy adres MAC) pobranie swojego adresu IP z serwera przy starcie (obecnie zastąpiony przez BOOTP i DHCP).',
              },
              {
                title: 'Protokół ICMP (Internet Control Message Protocol) — diagnostyka i błędy (Pyt. 46)',
                text: 'Ponieważ IP jest zawodny i bezpołączeniowy, potrzebny jest mechanizm raportowania problemów. Gdy router nie może dostarczyć datagramu (np. sieć/host nieosiągalny, wygasł licznik `TTL = 0`, przekroczone MTU przy fladze `DF=1`) albo wykryje anomalię, wysyła do nadawcy komunikat **ICMP**. Komunikaty ICMP są przenoszone bezpośrednio wewnątrz datagramów IP (pole `Protocol = 1`). ICMP jest podstawą dwóch najważniejszych narzędzi diagnostycznych z laboratoriów: **`ping`** (wysyła *Echo Request* i mierzy czas do odbioru *Echo Reply*) oraz **`traceroute` / `tracert`** (wysyła pakiety z rosnącym `TTL = 1, 2, 3...`, wywołując od kolejnych routerów komunikaty *ICMP Time Exceeded*).',
              },
              {
                title: 'Protokół IGMP (Internet Group Management Protocol)',
                text: 'Używany przez hosty do zgłaszania przyłączania się i opuszczania **grup rozsyłania grupowego (multicast)** identyfikowanych adresami IP **klasy D** (`224.0.0.0–239.255.255.255`). Host ma swój normalny adres (A/B/C) oraz dodatkowo adres(y) klasy D. Działa dwufazowo: (1) host przystępujący do grupy wysyła zgłoszenie IGMP do routerów multicastowych, które zestawiają trasy dystrybucji; (2) routery cyklicznie odpytują hosty o aktualne członkostwo, aby nie przesyłać zbędnego ruchu do pustych podsieci.',
              },
            ],
          },
          {
            type: 'callout',
            variant: 'lab',
            title: 'Praktyka laboratoryjna (Windows / Linux)',
            text: 'W laboratorium tablicę ARP wyświetlisz poleceniem `arp -a` (Windows/Linux) lub `ip neigh` (Linux), a działanie ICMP sprawdzisz przez `ping 8.8.8.8` oraz `tracert 8.8.8.8` (Windows) / `traceroute 8.8.8.8` (Linux). Pamiętaj też, że dla celu w *innej* podsieci ARP szuka adresu MAC **bramy domyślnej (routera)**, a nie zdalnego serwera!',
          },
        ],
      },
      {
        id: 'historia-internetu',
        heading: '3.4. Historia powstania Internetu, ARPANET, IMP i Internet w Polsce',
        blocks: [
          {
            type: 'p',
            text: '**Internet** (pytanie nr 56) to globalna, zdecentralizowana „sieć sieci” łącząca miliony sieci lokalnych, akademickich, biznesowych i rządowych na całym świecie za pomocą wspólnego stosu protokołów **TCP/IP**. Jego korzenie sięgają zimnej wojny i wystrzelenia przez ZSRR satelity Sputnik (1957), po którym USA powołały agencję **ARPA**.',
          },
          {
            type: 'p',
            text: 'Tradycyjne centrale telefoniczne były łatwym celem w ataku nuklearnym, a łączność radiowa zawodziła przez zakłócenia jonosfery. W **1964 r. Paul Baran** (RAND Corporation) opublikował raport *„On Distributed Communications Networks”* proponując zdecentralizowaną sieć o topologii oczkowej (*fishnet*) z **komutacją pakietów**, zdolną przetrwać zniszczenie wielu węzłów. W **1969 r.** uruchomiono **ARPANET** łączący 4 pierwsze węzły łączami 50 kb/s: **UCLA**, **SRI** (Stanford), **UCSB** oraz **University of Utah**.',
          },
          {
            type: 'p',
            text: 'Kluczowym pomysłem **Wesleya Clarka** było wprowadzenie dedykowanych komputerów komunikacyjnych **IMP (Interface Message Processor)** — niezależnych od hostów (mainframe’ów), stanowiących bufor obsługujący wszystkie funkcje sieciowe wspólnym protokołem. Komputery IMP są uznawane za **bezpośredniego przodka dzisiejszych routerów**.',
          },
          {
            type: 'figure_grid',
            items: [
              {
                src: '/media/sieci/w3_s20_arpanet_1969.png',
                caption: 'Historyczny szkic pierwszych 4 węzłów ARPANET w grudniu 1969 r. (UCLA, SRI, UCSB, Utah) z łączami 50 kb/s.',
                source: 'W3_TCP_M.pdf, slajd 20',
              },
              {
                src: '/media/sieci/w3_s22_arpanet_rozwoj.png',
                caption: 'Dynamiczny rozwój sieci ARPANET od grudnia 1969 r. (4 węzły) do września 1972 r.',
                source: 'W3_TCP_M.pdf, slajd 22 (A. Tanenbaum)',
              },
            ],
          },
          {
            type: 'table',
            caption: 'Najważniejsze daty w historii Internetu i Internetu w Polsce',
            headers: ['Rok / Data', 'Wydarzenie'],
            rows: [
              ['**1957**', 'Powołanie agencji **ARPA** po wystrzeleniu Sputnika.'],
              ['**1964**', '**Paul Baran** (RAND) publikuje koncepcję rozproszonej sieci pakietowej (*fishnet*).'],
              ['**1969**', 'Uruchomienie **ARPANET** (4 węzły: UCLA, SRI, UCSB, Utah; komputery IMP).'],
              ['**1970**', 'Wprowadzenie protokołu przesyłania plików **FTP**.'],
              ['**1971**', '**Ray Tomlinson** wysyła pierwszą wiadomość e-mail (początki poczty elektronicznej).'],
              ['**1973–1974**', 'Bob Kahn i Vint Cerf projektują TCP; w 1974 r. w ich pracy po raz pierwszy pada słowo **Internet**.'],
              ['**1 stycznia 1983**', 'Odłączenie wojskowej części **MILNET**; ARPANET przechodzi z NCP na **TCP/IP** — narodziny właściwego Internetu.'],
              ['**1990**', '**Tim Berners-Lee** w CERN tworzy **World Wide Web (WWW)**. Po zniesieniu embarga COCOM (luty 1990) Polska w maju dołącza do **EARN/BITNET**, a 17 lipca węzeł **PLEARN** (UW) łączy się z DKEARN w Kopenhadze (9600 b/s). Duńczyk **Jan Sørensen** rejestruje domenę **`.pl`**.'],
              ['**17 sierpnia 1991**', 'Pierwsza bezpośrednia wymiana poczty elektronicznej w Internecie (IP) między Warszawą a Kopenhagą — oficjalny początek Internetu w Polsce.'],
              ['**Listopad 1993**', 'Zespół **NASK** uruchamia pierwszą polską stronę WWW na polskim serwerze (*„Polska Strona Domowa / Polish Home Page”*).'],
            ],
          },
        ],
      },
    ],
  },
];
