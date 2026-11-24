export const CHAPTERS_7_9 = [
  {
    id: 'sieci-ch7',
    subject_id: 'sieci',
    order_index: 7,
    slug: 'protokoly-ip-tcp-udp-i-adresowanie',
    title: 'Rozdział 7: Protokoły IP, TCP i UDP oraz adresowanie IPv4 i podsieci',
    subtitle: 'Nagłówek IP, fragmentacja, TTL, opcje, klasy i adresy prywatne IPv4, obliczanie podsieci, nagłówek TCP, flagi, PAR, okno przesuwne, 3-Way Handshake, SYN Flood oraz UDP',
    lecture_ref: 'Wykład 7 (W7_IP_TCP_M.pdf)',
    estimated_minutes: 45,
    summary:
      'Serce stosu TCP/IP — dokładnie rozpisana budowa bit po bicie nagłówka IPv4 (z fragmentacją, TTL, flagami i opcjami), struktura adresu IPv4, klasy A–E, adresy prywatne RFC 1918, maski podsieci i metoda wyznaczania podsieci (pytanie 60!), pełna analiza niezawodnego protokołu TCP (porty, gniazda, nagłówek, 6 flag, potwierdzanie PAR, sterowanie przepływem oknem, 3-Way Handshake, ataki SYN Flood) oraz lekkiego protokołu UDP z pseudonagłówkiem.',
    exam_questions: [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 47, 48, 49, 60],
    key_takeaways: [
      'Nagłówek IPv4 ma min. 20 bajtów (IHL = 5 słów 32-bitowych). We fragmentacji uczestniczą 3 pola: Identyfikacja (16b), Flagi (3b: 0, DF, MF) oraz Przesunięcie fragmentu (13b, w jednostkach po 8 bajtów).',
      'TTL (8 bitów) ogranicza liczbę przeskoków przez routery — każdy router zmniejsza TTL o 1; gdy TTL = 0, pakiet jest odrzucany (ochrona przed pętlami) i wysyłany jest komunikat ICMP Time Exceeded.',
      'Prywatne zakresy IPv4 (RFC 1918): 10.0.0.0/8 (10.0.0.0–10.255.255.255), 172.16.0.0/12 (172.16.0.0–172.31.255.255) oraz 192.168.0.0/16 (192.168.0.0–192.168.255.255).',
      'Nagłówek TCP (min. 20 B) zawiera 6 flag (URG, ACK, PSH, RST, SYN, FIN), 32-bitowe numery SEQ/ACK (mechanizm PAR — potwierdzenie następnego oczekiwanego bajtu) oraz 16-bitowe pole Okno (Window — sterowanie przepływem).',
      'Three-Way Handshake (RFC 793): SYN (SEQ=x) → SYN+ACK (SEQ=y, ACK=x+1) → ACK (SEQ=x+1, ACK=y+1). UDP ma 8-bajtowy nagłówek, działa bezpołączeniowo, obsługuje broadcast i liczy sumę kontrolną z pseudonagłówkiem IP.',
    ],
    figures: [
      '/media/sieci/w7_s05_naglowek_ip.png',
      '/media/sieci/w7_s10_klasy_ip.png',
      '/media/sieci/w7_s17_naglowek_tcp.png',
      '/media/sieci/w7_s22_handshake_rfc793.png',
      '/media/sieci/w7_s27_naglowek_udp.png',
      '/media/sieci/w7_s29_udp_checksum.png',
    ],
    sections: [
      {
        id: 'protokol-ip-i-naglowek',
        heading: '7.1. Protokół IP, budowa nagłówka, fragmentacja, TTL, flagi i opcje (Pyt. 32–36)',
        blocks: [
          {
            type: 'p',
            text: '**Protokół IP (Internet Protocol)** tworzy uniwersalną „kopertę” (**datagram IP**) pozwalającą przesyłać dane między niejednorodnymi podsieciami (które wewnątrz używają własnych ramek i adresów MAC). Jego główne funkcje to: **(1)** definiowanie datagramów, **(2)** definiowanie schematu adresowania, **(3)** przekazywanie danych między warstwą dostępu a warstwą transportową, **(4)** kierowanie (routing) datagramów do odległych hostów oraz **(5)** fragmentacja i składanie datagramów. IP jest protokołem **bezpołączeniowym i zawodnym** (*best-effort*) — każdy pakiet podróżuje niezależnie, może zaginąć, ulec duplikacji lub dotrzeć w innej kolejności.',
          },
          {
            type: 'svg',
            diagramId: 'ipv4-header',
            title: 'Interaktywny nagłówek datagramu IPv4 — kliknij dowolne pole, aby poznać rozmiar i rolę (Pyt. 32–36)',
            caption: 'Wszystkie pola nagłówka IPv4 (20 bajtów bazowych + opcjonalne Opcje i Wypełnienie) z podświetleniem pól fragmentacji.',
          },
          {
            type: 'figure',
            src: '/media/sieci/w7_s05_naglowek_ip.png',
            caption: 'Oryginalny schemat formatu datagramu IPv4 z wykładu (siatka 32-bitowych słów).',
            source: 'W7_IP_TCP_M.pdf, slajd 5',
          },
          {
            type: 'table',
            caption: 'Szczegółowy opis wszystkich pól nagłówka datagramu IPv4 (Pyt. 32)',
            headers: ['Pole nagłówka', 'Rozmiar', 'Opis i znaczenie na egzaminie'],
            rows: [
              ['**Wersja (Version)**', '4 bity', 'Określa wersję protokołu IP (dla IPv4 wartość `4`, dla IPv6 wartość `6`).'],
              ['**Długość nagłówka (IHL)**', '4 bity', 'Długość nagłówka wyrażona w **32-bitowych słowach** (4-bajtowych). Minimalna wartość = **5** ($5 \\times 4 = 20$ bajtów — brak opcji); maksymalna = 15 (60 bajtów).'],
              ['**Typ usługi (ToS)**', '8 bitów', 'Określa jakość usługi (QoS): bity 0–2 to **Pierwszeństwo** (8 priorytetów od `000` Zwyczajny do `111` Kontrola sieci), bit 3 = małe opóźnienie (`D`), bit 4 = wysoka przepustowość (`T`), bit 5 = wysoka niezawodność (`R`), bity 6–7 zarezerwowane (współcześnie DSCP + ECN).'],
              ['**Całkowita długość (Total Length)**', '16 bitów', 'Całkowity rozmiar datagramu (nagłówek + dane) w oktetach (bajtach). Maksymalnie **$2^{16}-1 = 65\\,535$ bajtów**. Po fragmentacji pole to wskazuje rozmiar *bieżącego fragmentu*, a nie oryginalnego datagramu.'],
              ['**Identyfikacja (Identification)** *(fragmentacja!)*', '16 bitów', 'Unikatowy numer datagramu nadawany przez źródło (zwykle +1 dla kolejnego datagramu). **Wszystkie fragmenty jednego podzielonego datagramu mają tę samą wartość Identyfikacji**, co pozwala odbiorcy złożyć je z powrotem.'],
              ['**Flagi (Flags)** *(fragmentacja! — Pyt. 35)*', '3 bity', '• **Bit 0**: zarezerwowany, zawsze `0`.\n• **Bit 1 — DF (Don’t Fragment)**: `0` = fragmentacja dozwolona; `1` = **fragmentacja zakazana** (jeśli pakiet przekracza MTU łącza, router go odrzuca i odsyła ICMP — używane np. w Path MTU Discovery).\n• **Bit 2 — MF (More Fragments)**: `1` = po tym fragmencie nastąpią kolejne fragmenty; `0` = to jest **ostatni fragment** (albo datagram nie był dzielony).'],
              ['**Przesunięcie fragmentu (Fragment Offset)** *(fragmentacja!)*', '13 bitów', 'Określa pozycję bajtów danych danego fragmentu względem początku oryginalnego datagramu. Mierzone w **jednostkach po 8 bajtów (64 bity)** (stąd rozmiar danych każdego fragmentu poza ostatnim musi być wielokrotnością 8 B). Dla pierwszego fragmentu wynosi `0`.'],
              ['**Czas życia (TTL — Time To Live)** *(Pyt. 34)*', '8 bitów', 'Maksymalna liczba **przeskoków (skoków przez routery)**. Ustawiana przez nadawcę (np. 32, 64, 128, max 255). **Każdy router po drodze zmniejsza TTL o 1**; gdy `TTL` osiągnie `0`, pakiet zostaje **skasowany** (zabezpieczenie przed nieskończonym krążeniem w pętli routingu), a router wysyła komunikat ICMP *Time Exceeded*.'],
              ['**Protokół (Protocol)**', '8 bitów', 'Wskazuje protokół warstwy wyższej przenoszony w polu Dane: **`1` = ICMP**, **`6` = TCP**, **`17` = UDP**, **`8` = EGP**, **`89` = OSPF**. *(Uwaga: na slajdzie 9 w PDF-ie jest drobna literówka „16 : TCP” — standardowy numer IANA dla TCP to **6**!)*'],
              ['**Suma kontrolna nagłówka (Header Checksum)**', '16 bitów', 'Chroni **wyłącznie nagłówek IP** (nie dane). Ponieważ każdy router modyfikuje przynajmniej pole `TTL`, suma kontrolna **musi być weryfikowana i przeliczana od nowa w każdym węźle**.'],
              ['**Źródłowy i Docelowy adres IP**', '2 × 32 bity', '32-bitowe adresy logiczne nadawcy i odbiorcy datagramu (nie zmieniają się w trakcie routingu, chyba że po drodze działa NAT).'],
              ['**Opcje (Options)** *(Pyt. 36)* i **Wypełnienie (Padding)**', 'Zmienna (do 40 B)', 'Opcjonalne pole wykorzystywane głównie w datagramach diagnostycznych i specjalnych: **testowanie sieci, pomiary czasu (Timestamp), rejestracja trasy (Record Route), routing źródłowy (Loose/Strict Source Routing) oraz opcje bezpieczeństwa (Security)**. **Padding** (zera) dopełnia nagłówek do całkowitej wielokrotności 32 bitów.'],
            ],
          },
          {
            type: 'callout',
            variant: 'exam',
            title: 'Zestawienie pod Pytanie 33 (Fragmentacja datagramu IP)',
            text: 'Gdy datagram IP musi przejść przez sieć o mniejszym maksymalnym rozmiarze ramki (**MTU**, np. Ethernet 1500 B), router dzieli go na mniejsze fragmenty. W procesie podziału i ponownego składania (wykonywanego dopiero przez **host docelowy**!) biorą bezpośredni udział: **(1) Identyfikacja** (16b — wiąże fragmenty jednego datagramu), **(2) Flagi DF i MF** (3b — czy wolno dzielić oraz czy to ostatni fragment), **(3) Przesunięcie fragmentu** (13b — pozycja danych w wielokrotnościach 8 oktetów) oraz aktualizowane w każdym fragmencie **(4) Całkowita długość** (i suma kontrolna nagłówka).',
          },
        ],
      },
      {
        id: 'adresowanie-ip-i-podsieci',
        heading: '7.2. Budowa adresu IPv4, klasy, adresy prywatne, maska CIDR i obliczanie podsieci (Pyt. 47–49, 60)',
        blocks: [
          {
            type: 'p',
            text: '**Adres IPv4 (Pyt. 47)** to **32-bitowy (4-bajtowy)** identyfikator logiczny interfejsu sieciowego zapisywany zwykle w notacji dziesiętnej z kropkami (4 oktety `0–255`, np. `192.168.10.25`). Każdy adres składa się z dwóch części: **części sieciowej (Network ID)** — identyfikującej sieć/podsieć — oraz **części hosta (Host ID)** — identyfikującej konkretny interfejs w tej sieci.',
          },
          {
            type: 'figure',
            src: '/media/sieci/w7_s10_klasy_ip.png',
            caption: 'Historyczny podział adresów IPv4 na klasy A, B, C, D (multicast) i E (specjalne).',
            source: 'W7_IP_TCP_M.pdf, slajd 10',
          },
          {
            type: 'table',
            caption: 'Klasy adresów IPv4 (historyczne adresowanie klasowe)',
            headers: ['Klasa', 'Bity wiodące', 'Zakres 1. oktetu / adresów', 'Podział (sieć / host)', 'Liczba hostów w sieci / przeznaczenie'],
            rows: [
              ['**A**', '`0...`', '`0.0.0.0 – 127.255.255.255` *(użytkowe 1–126; 127 = loopback)*', '7 bitów sieci (126 sieci) / **24 bity hosta**', '$2^{24}-2 = 16\\,777\\,214$ hostów *(na slajdzie literówka 16.777.124)*; ogromne sieci'],
              ['**B**', '`10...`', '`128.0.0.0 – 191.255.255.255`', '14 bitów sieci (16 384) / **16 bitów hosta**', '$2^{16}-2 = 65\\,534$ hostów; średnie i duże organizacje'],
              ['**C**', '`110...`', '`192.0.0.0 – 223.255.255.255`', '21 bitów sieci (2 097 152) / **8 bitów hosta**', '$2^8-2 = 254$ hosty (256 adresów łącznie); małe sieci lokalne'],
              ['**D**', '`1110...`', '`224.0.0.0 – 239.255.255.255`', 'Brak podziału sieć/host', 'Adresy **rozsyłania grupowego (multicast)** (IGMP, OSPF)'],
              ['**E**', '`1111...`', '`240.0.0.0 – 255.255.255.255`', 'Brak podziału sieć/host', 'Zarezerwowane przez IETF do badań i zastosowań specjalnych'],
            ],
          },
          {
            type: 'p',
            text: '**Prywatne adresy IPv4 (RFC 1918 — Pyt. 48):** Ponieważ pula publicznych adresów IPv4 jest ograniczona (~4,3 mld), wydzielono 3 zakresy adresów prywatnych przeznaczonych wyłącznie do **sieci lokalnych (LAN/Intranet)**. Routery brzegowe Internetu **ignorują (nie rutują) tych adresów w sieci publicznej**. Wiele różnych firm i domów może używać dokładnie tych samych adresów prywatnych bez konfliktów, a dostęp do Internetu zapewnia translacja **NAT/PAT** na routerze brzegowym:',
          },
          {
            type: 'table',
            caption: 'Trzy pule prywatnych adresów IPv4 (OBOWIĄZKOWE NA PAMIĘĆ — Pyt. 48!)',
            headers: ['Zakres adresów', 'Odpowiednik klasowy', 'Prefiks CIDR', 'Liczba adresów'],
            rows: [
              ['`10.0.0.0 – 10.255.255.255`', '1 sieć klasy A', '`10.0.0.0/8`', '16 777 216'],
              ['`172.16.0.0 – 172.31.255.255`', '16 ciągłych sieci klasy B', '`172.16.0.0/12`', '1 048 576'],
              ['`192.168.0.0 – 192.168.255.255`', '256 ciągłych sieci klasy C', '`192.168.0.0/16`', '65 536'],
            ],
          },
          {
            type: 'p',
            text: '**Adresowanie bezklasowe i maska podsieci (Pyt. 49):** Sztywny podział na klasy A/B/C marnował adresy (firma potrzebująca 500 adresów dostawała klasę B na 65 534 hosty!). **Adresowanie bezklasowe (CIDR)** znosi granice klas — granicę między częścią sieciową a częścią hosta w dowolnym miejscu wyznacza **32-bitowa maska podsieci**, złożona z ciągłego bloku jedynek (`1` — bity sieci) oraz następującego po nich ciągłego bloku zer (`0` — bity hosta). Długość bloku jedynek zapisujemy skrótowo po ukośniku, np. `/26` = `255.255.255.192`.',
          },
          {
            type: 'callout',
            variant: 'lab',
            title: 'Algorytm do Pytania 60 — Jak błyskawicznie policzyć podsieć z dowolnego IP i maski?',
            text: 'Dla danego adresu IP i maski o długości prefiksu $/n$ (gdzie liczba bitów hosta to $h = 32 - n$):\n1. **Adres sieci (Network Address)** = bitowe **`IP AND Maska`** (wszystkie $h$ bitów hosta wyzerowane).\n2. **Adres rozgłoszeniowy (Broadcast)** = **`Adres sieci OR (NOT Maska)`** (wszystkie $h$ bitów hosta ustawione na `1`).\n3. **Pierwszy użyteczny host** = `Adres sieci + 1`; **Ostatni użyteczny host** = `Broadcast - 1`.\n4. **Liczba użytecznych adresów hostów** = **$2^{32-n} - 2$** (odejmujemy 2, bo adres sieci i broadcast są zarezerwowane; dla `/31` i `/32` patrz przypadki specjalne).\n\n**Przykład rozwiązany:** `192.168.10.137 /26` (`255.255.255.192`).\n• Ciekawy jest 4. oktet: `192` daje krok bloku $256 - 192 = 64$ (podsieci: `.0`, `.64`, `.128`, `.192`).\n• `137` wpada w blok `128..191` → **Adres sieci:** `192.168.10.128`, **Broadcast:** `192.168.10.191`.\n• **Zakres hostów:** `192.168.10.129 – 192.168.10.190`.\n• **Liczba hostów:** $2^{32-26} - 2 = 2^6 - 2 = 62$ hosty.\n👉 Poćwicz to na żywo w naszym **Trenerze Podsieci IP** w menu po lewej!',
          },
        ],
      },
      {
        id: 'protokol-tcp',
        heading: '7.3. Protokół TCP: porty, budowa nagłówka, flagi, potwierdzanie PAR, okno i 3-Way Handshake (Pyt. 37–42)',
        blocks: [
          {
            type: 'p',
            text: '**TCP (Transmission Control Protocol)** to **niezawodny, połączeniowy** protokół warstwy transportowej działający na **strumieniach (potokach) bajtów** nad zawodnym i bezpołączeniowym IP. Jednostką danych (PDU) w TCP jest **segment**. Podstawowe funkcje TCP: **(1)** detekcja i korekcja błędów (sumy kontrolne + retransmisje), **(2)** sterowanie przepływem (okno przesuwne), **(3)** dzielenie i składanie wiadomości w całość w poprawnej kolejności (numery sekwencyjne), **(4)** odrzucanie duplikatów. Ze względu na tryb połączeniowy (klient–serwer) TCP **nie obsługuje transmisji broadcast ani multicast**.',
          },
          {
            type: 'p',
            text: '**Numery portów i gniazda (Pyt. 41):** Jeden komputer uruchamia jednocześnie wiele aplikacji sieciowych (przeglądarkę, pocztę, SSH). Aby warstwa transportowa dostarczyła segment dokładnie do właściwego procesu, stosuje się **16-bitowe numery portów** (`0–65535`). Dolny zakres to tzw. **dobrze znane porty (*well-known ports*)** przypisane standardowym usługom (wg wykładu zakres 0–255, wg IANA 0–1023), np. dla TCP: **FTP (21)**, **SSH (22)**, **Telnet (23)**, **SMTP (25)**, **HTTP (80)**, **HTTPS (443)**; dla UDP: **DNS (53)**, **TFTP (69)**, **RPC (111)**, **SNMP (161)**. Para `(adres IP + numer portu)` tworzy **gniazdo (socket)** jednoznacznie identyfikujące końcówkę komunikacji.',
          },
          {
            type: 'svg',
            diagramId: 'tcp-header',
            title: 'Interaktywny nagłówek segmentu TCP — kliknij pola i poznaj wszystkie 6 flag (Pyt. 37–40)',
            caption: '20 bajtów nagłówka bazowego TCP: porty, SEQ, ACK, Data Offset, 6 flag kontrolnych, Okno, Suma kontrolna, Urgent Pointer.',
          },
          {
            type: 'figure',
            src: '/media/sieci/w7_s17_naglowek_tcp.png',
            caption: 'Oryginalny schemat formatu pakietu (segmentu) TCP z wykładu.',
            source: 'W7_IP_TCP_M.pdf, slajd 17',
          },
          {
            type: 'table',
            caption: '6 jednobitowych flag kontrolnych w nagłówku TCP (Pyt. 38)',
            headers: ['Flaga', 'Rozwinięcie', 'Znaczenie i moment użycia'],
            rows: [
              ['**URG**', 'Urgent', 'Oznacza ważność pola **Wskaźnik ważnych danych (*Urgent Pointer*)** — dane priorytetowe wymagające natychmiastowej analizy.'],
              ['**ACK**', 'Acknowledgement', 'Oznacza ważność pola **Numer potwierdzenia (*Acknowledgement Number*)** — ustawiona w niemal każdym segmencie po pierwszym `SYN`.'],
              ['**PSH**', 'Push', 'Wymusza **natychmiastowe przekazanie** odebranych danych z bufora TCP do aplikacji bez czekania na zapełnienie bufora (np. interaktywna sesja Telnet/SSH).'],
              ['**RST**', 'Reset', 'Natychmiastowe, awaryjne **zresetowanie / skasowanie połączenia** wskutek błędu, odrzucenia połączenia lub próby komunikacji z zamkniętym portem.'],
              ['**SYN**', 'Synchronize', '**Synchronizacja numerów sekwencyjnych** — używana przy nawiązywaniu połączenia (kroki 1 i 2 *Three-Way Handshake*).'],
              ['**FIN**', 'Finish', 'Informuje o **zakończeniu przesyłania danych** przez nadawcę i inicjuje kontrolowane zamknięcie połączenia.'],
            ],
          },
          {
            type: 'list',
            items: [
              {
                title: 'Mechanizm potwierdzania w TCP — PAR (Pyt. 39)',
                text: 'TCP zapewnia niezawodność poprzez **PAR (Positive Acknowledgement with Retransmission — pozytywne potwierdzenie z retransmisją)**. Każdy bajt w strumieniu jest liczony przez 32-bitowy **Numer sekwencyjny (`SEQ`)** (wskazuje pozycję pierwszego bajtu danych w segmencie). Odbiorca odsyła segment z flagą `ACK=1` oraz 32-bitowym **Numerem potwierdzenia (`ACK Number`)**, który jest **kumulatywny** i zawiera **numer kolejnego bajtu, jakiego odbiorca się spodziewa** — potwierdzając tym samym poprawny odbiór wszystkich bajtów aż do `ACK - 1`. Jeśli nadawca nie dostanie potwierdzenia przed upływem czasu oczekiwania (*timeout*), **retransmituje** utracony segment. Numery sekwencyjne pozwalają też poskładać segmenty przybyłe w złej kolejności i odrzucić duplikaty.',
              },
              {
                title: 'Mechanizm sterowania przepływem — Okno przesuwne (Window) (Pyt. 40)',
                text: 'Aby szybki nadawca nie zalał i nie przepełnił buforów wolniejszego odbiorcy, nagłówek TCP zawiera 16-bitowe pole **Okno (`Window`)**. Odbiorca informuje w nim na bieżąco nadawcę, **ile bajtów (oktetów) danych może on jeszcze wysłać bez otrzymania kolejnego potwierdzenia** — odpowiada to aktualnej wolnej pojemności bufora odbiorczego. Gdy aplikacja odbiorcy nadąża z czytaniem danych, okno przesuwa się do przodu (i może rosnąć); gdy bufor się zapełnia, odbiorca zmniejsza `Window` (nawet do `0`, wstrzymując chwilowo nadawanie). Dzięki temu transmisja jest jednocześnie płynna (wiele segmentów „w locie”) i bezpieczna przed utratą danych.',
              },
              {
                title: 'Opcje TCP — MSS (Maximum Segment Size)',
                text: 'Standardowo wykorzystywaną opcją w polu Opcje jest **MSS**, określająca maksymalny rozmiar danych segmentu TCP (negocjowany w pakietach `SYN`, aby uniknąć fragmentacji IP — typowo 1460 B dla MTU 1500 B Ethernetu).',
              },
            ],
          },
          {
            type: 'svg',
            diagramId: 'three-way-handshake',
            title: 'Interaktywny przebieg nawiązywania połączenia TCP: Three-Way Handshake (RFC 793 — Pyt. 42)',
            caption: 'Przeklikaj kolejne kroki nawiązywania połączenia (CLOSED / LISTEN → SYN-SENT → SYN-RECEIVED → ESTABLISHED).',
          },
          {
            type: 'figure',
            src: '/media/sieci/w7_s22_handshake_rfc793.png',
            caption: 'Oryginalny schemat Three-Way Handshake wg RFC 793 ze slajdu wykładowego (SEQ=100, SEQ=300, ACK=101, ACK=301).',
            source: 'W7_IP_TCP_M.pdf, slajd 22',
          },
          {
            type: 'callout',
            variant: 'warning',
            title: 'Atak SYN Flood i 4 metody przeciwdziałania (z Wykładu 7)',
            text: '**Jak działa atak SYN Flood?** Napastnik wysyła lawinę pakietów `SYN` (zwykle ze sfałszowanym źródłowym IP — *IP spoofing*). Serwer na każdy odpowiada `SYN+ACK` i rezerwuje wpis w ograniczonej tablicy półotwartych połączeń w pamięci RAM, czekając na końcowe `ACK`, które nigdy nie nadejdzie. Tablica ulega przepełnieniu i serwer przestaje obsługiwać legalnych użytkowników (odmowa usługi DoS).\n**4 metody ochrony:** (1) **Firewalle** limitujące liczbę napływających pakietów `SYN`, (2) **SYN cookies** — serwer koduje stan kryptograficznie w początkowym numerze sekwencyjnym `ISN` wysyłanym w `SYN+ACK`, **bez zapisywania połączenia w pamięci RAM** aż do nadejścia poprawnego `ACK`, (3) **zwiększenie kolejki Backlog**, (4) **nadpisywanie najstarszych półotwartych połączeń** (*recycling the oldest half-open TCP connection*).',
          },
        ],
      },
      {
        id: 'protokol-udp',
        heading: '7.4. Protokół UDP i porównanie z TCP (Pyt. 43)',
        blocks: [
          {
            type: 'p',
            text: '**UDP (User Datagram Protocol)** to lekki, **bezpołączeniowy i zawodny** protokół warstwy transportowej dający aplikacjom niemal bezpośredni dostęp do usług datagramowych IP przy minimalnym narzucie (nagłówek ma zaledwie **8 bajtów** zamiast min. 20 B w TCP!).',
          },
          {
            type: 'list',
            items: [
              {
                title: 'Kluczowe cechy i funkcje UDP (Pyt. 43)',
                text: '• **Multipleksowanie aplikacji przez 16-bitowe porty** (Port źródłowy i Port docelowy — dostarczanie do właściwego procesu).\n• **Brak nawiązywania i zamykania połączenia** (brak opóźnień 3-Way Handshake), brak potwierdzeń, brak retransmisji i brak kontroli przepływu.\n• **Obsługa transmisji broadcast i multicast** (niemożliwe w TCP!).\n• **Opcjonalna weryfikacja integralności (Suma kontrolna UDP)** liczona nie tylko z nagłówka i danych UDP, ale także z **12-bajtowego pseudonagłówka IP** (Źródłowe IP, Docelowe IP, Zero, Protokół `17`, Długość UDP) — chroni to przed dostarczeniem datagramu na błędny adres IP.\n• **Kiedy wybieramy UDP?** Gdy ilość danych jest mała i narzut zestawienia TCP byłby większy niż ponowne wysłanie zapytania (**DNS, DHCP, SNMP, TFTP**) albo gdy ważniejsza jest **aktualność niż dokładność** (transmisja w czasie rzeczywistym: **VoIP, streaming wideo RTP, gry sieciowe**).',
              },
            ],
          },
          {
            type: 'figure_grid',
            items: [
              {
                src: '/media/sieci/w7_s27_naglowek_udp.png',
                caption: 'Minimalistyczny 8-bajtowy nagłówek pakietu UDP: Port źródłowy, Port docelowy, Długość, Suma kontrolna.',
                source: 'W7_IP_TCP_M.pdf, slajd 27',
              },
              {
                src: '/media/sieci/w7_s29_udp_checksum.png',
                caption: 'Struktura z 12-bajtowym pseudonagłówkiem IP używana do obliczenia sumy kontrolnej UDP.',
                source: 'W7_IP_TCP_M.pdf, slajd 29',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sieci-ch8',
    subject_id: 'sieci',
    order_index: 8,
    slug: 'protokoly-routingu-i-cidr',
    title: 'Rozdział 8: Protokoły routingu (RIP, OSPF, IGRP, BGP) oraz mechanizmy CIDR',
    subtitle: 'Systemy autonomiczne AS, klasyfikacja routingu, algorytm wektora odległości (RIP), stanu łącza (OSPF), wektora ścieżki (BGP) i CIDR/VLSM',
    lecture_ref: 'Wykład 8 (W8_prot_rou_M.pdf)',
    estimated_minutes: 35,
    summary:
      'Wszystko o wyznaczaniu tras w sieciach IP: definicja systemu autonomicznego (AS), klasyfikacja metod routingu (statyczny vs dynamiczny, wewnętrzny IGP vs zewnętrzny EGP), dokładne działanie i parametry RIP, 5 komunikatów i 3 podprotokoły OSPF (Hello, Exchange, Flooding, DR/BDR, obszary, ABR), złożona metryka IGRP, międzyoperatorski BGPv4 oraz mechanizmy wprowadzane przez CIDR (VLSM i agregacja tras).',
    exam_questions: [49, 50, 51, 52, 53, 54],
    key_takeaways: [
      'System autonomiczny (AS — RFC 1771) to zbiór routerów i sieci pod jedną administracją techniczną, używający wspólnego protokołu wewnętrznego (IGP) i komunikujący się z innymi AS przez protokół zewnętrzny (EGP, obecnie BGP).',
      'RIP (wektor odległości, Bellmana-Forda): metryka = liczba przeskoków (hops), maks. 15, 16 = sieć nieosiągalna; rozgłasza tablice co 30 s; nie uwzględnia pasma ani opóźnień.',
      'OSPF (stan łącza, Dijkstra): używa multicastu i 5 typów komunikatów (Hello, Database Description, Link-State Request, Link-State Update, Link-State Acknowledgment) oraz podprotokołów Hello (DR/BDR), Exchange (master/slave) i Flooding (zmiany, co 30 min, max wiek 1 h).',
      'BGPv4 (wektor ścieżki nad TCP): zapobiega pętlom między AS przez listę numerów AS, nie używa prostych metryk lecz atrybuty i polityki wyboru.',
      'CIDR wprowadza dwa kluczowe mechanizmy: (1) VLSM (maski zmiennej długości bez sztywnych klas A/B/C) oraz (2) agregację tras (route aggregation / supernetting), zmniejszającą rozmiary tablic routingu w rdzeniu Internetu.',
    ],
    figures: [],
    sections: [
      {
        id: 'klasyfikacja-routingu-i-as',
        heading: '8.1. System autonomiczny (AS) i klasyfikacja metod routingu (Pyt. 50)',
        blocks: [
          {
            type: 'p',
            text: '**Routing** to proces optymalnego wyznaczania tras i kierowania pakietów w warstwie 3 od źródła do celu poprzez węzły pośredniczące (routery). **System autonomiczny (AS — Autonomous System, RFC 1771)** to zbiór sieci lokalnych i routerów pozostający pod **jedną administracją techniczną**, korzystający wewnątrz z jednego wewnętrznego protokołu routingu i wspólnej metryki, a na zewnątrz (do komunikacji z innymi systemami autonomicznymi) z zewnętrznego protokołu routingu.',
          },
          {
            type: 'table',
            caption: 'Pełna klasyfikacja rodzajów routingu (Pyt. 50)',
            headers: ['Kryterium podziału', 'Rodzaj routingu', 'Charakterystyka, zalety i wady'],
            rows: [
              [
                '**Sposób tworzenia tablicy routingu**',
                '**Routing statyczny**',
                'Administrator ręcznie i na stałe konfiguruje trasy na każdym routerze. **Zalety:** brak narzutu obliczeniowego i sieciowego na protokoły, pełna kontrola, idealny dla małych sieci lub tras domyślnych. **Wady:** ogromny nakład pracy w dużych sieciach; **przy awarii łącza/routera lub zmianie topologii nie reaguje automatycznie** — wymaga ręcznej interwencji administratora.',
              ],
              [
                '**Sposób tworzenia tablicy routingu**',
                '**Routing dynamiczny**',
                'Routery automatycznie wymieniają informacje o sieciach za pomocą protokołów routingu i same wyznaczają optymalne trasy, **samoczynnie reagując na awarie i zmiany topologii**. Wymaga większej mocy CPU, pamięci oraz niewielkiego pasma na komunikaty sterujące.',
              ],
              [
                '**Zasięg działania (względem AS)**',
                '**Routing wewnętrzny (IGP — Interior)**',
                'Działa **wewnątrz jednego systemu autonomicznego (AS)**. Dzieli się według algorytmu na:\n• **Wektor odległości (Distance-Vector)**: np. **RIP**, **IGRP**, EIGRP.\n• **Stan łącza (Link-State)**: np. **OSPF**, IS-IS.',
              ],
              [
                '**Zasięg działania (względem AS)**',
                '**Routing zewnętrzny (EGP — Exterior)**',
                'Działa **pomiędzy różnymi systemami autonomicznymi (AS)** na brzegu sieci operatorów. Wykorzystuje protokół **wektora ścieżki (Path-Vector)**: obecnie **BGP (BGPv4)** (dawniej wycofany już EGP).',
              ],
            ],
          },
        ],
      },
      {
        id: 'protokol-rip',
        heading: '8.2. Protokół RIP — zasada działania, parametry i tablica routingu (Pyt. 51 i 52)',
        blocks: [
          {
            type: 'p',
            text: '**RIP (Routing Information Protocol)** to najstarszy klasyczny protokół routingu wewnętrznego (IGP), opracowany w Xerox PARC, włączony do BSD 4.2 (1982) i ustandaryzowany jako **RIPv1 (RFC 1058, klasowy)**, **RIPv2 (RFC 1388 / 1723, obsługa masek/CIDR i multicast)** oraz **RIPng (RFC 2080, dla IPv6)**.',
          },
          {
            type: 'list',
            items: [
              {
                title: 'Algorytm i zasada działania RIP (Pyt. 51)',
                text: 'RIP jest protokołem **wektora odległości (Distance-Vector)** opartym na algorytmie najkrótszej ścieżki **Bellmana-Forda**. Każdy router regularnie — **co 30 sekund** — rozsyła do swoich bezpośrednich sąsiadów swoją tablicę tras zawierającą dwie kluczowe informacje: **(1) odległość (dystans)** do każdej znanej sieci docelowej oraz **(2) kierunek (wektor)**, czyli przez którego sąsiada tam dotrzeć. Odbierający router zwiększa otrzymaną metrykę o 1 (przeskok przez nadawcę); jeśli nowa trasa ma **mniejszą metrykę** niż aktualnie znana (lub pochodzi od tego samego sąsiada), aktualizuje swoją tablicę routingu.',
              },
              {
                title: 'Kluczowe parametry RIP (OBOWIĄZKOWE — Pyt. 51)',
                text: '• **Metryka:** wyłącznie **liczba przeskoków (hop count)** — liczba routerów na drodze do celu.\n• **Maksymalna dopuszczalna liczba przeskoków:** **15** (RIP nie nadaje się do dużych sieci!).\n• **Wartość nieskończoności:** **16 przeskoków = sieć nieosiągalna** (chroni przed zliczaniem w nieskończoność w pętlach).\n• **Okres aktualizacji (Update Timer):** **30 sekund** (cykliczne rozsyłanie pełnych tablic; dodatkowo istnieją timery ważności trasy, np. 180 s invalid / 240 s flush).\n• **Główna wada:** RIP zakłada, że najkrótsza droga = najmniej routerów, **zupełnie ignorując przepustowość łącza, opóźnienia i obciążenie** (może wybrać 1 wolne łącze 10 Mb/s zamiast 2 superszybkich światłowodów 10 Gb/s!), ponadto wolno osiąga zbieżność.',
              },
              {
                title: 'Informacje zawarte w tablicy routingu protokołu RIP (Pyt. 52)',
                text: 'Każdy wpis w tablicy routingu RIP przechowuje:\n1. **Adres sieci docelowej** (w RIPv2 także **maska podsieci**).\n2. **Adres kolejnego przeskoku (Next Hop)** — adres IP sąsiedniego routera, na który należy przekazać pakiet (wektor kierunku).\n3. **Interfejs wyjściowy** lokalnego routera prowadzący do tego sąsiada.\n4. **Metrykę (liczbę przeskoków — 1..15, 16 = nieosiągalna)**.\n5. **Znaczniki czasu (timery)** ważności/aktualności wpisu oraz flagi zmiany trasy (czy wpis został niedawno zaktualizowany i wymaga rozesłania).',
              },
            ],
          },
        ],
      },
      {
        id: 'protokol-ospf',
        heading: '8.3. Protokół OSPF — komunikaty, podprotokoły i obszary (Pyt. 53)',
        blocks: [
          {
            type: 'p',
            text: '**OSPF (Open Shortest Path First)** został opracowany przez IETF pod koniec lat 80. jako skalowalny i szybki następca RIP. Należy do protokołów **stanu łącza (Link-State)** (używa algorytmu najkrótszej ścieżki **Dijkstry / SPF**). Do komunikacji wykorzystuje **multicast** (zamiast broadcastu) i działa bezpośrednio nad IP (`Protocol = 89`).',
          },
          {
            type: 'p',
            text: 'W przeciwieństwie do RIP, routery OSPF **nie wymieniają między sobą gotowych tablic routingu**. Zamiast tego rozsyłają informacje o **topologii sieci i stanie własnych łączy** (koszt zależny np. od przepustowości, obciążenia, współczynników administracyjnych) w postaci ogłoszeń **LSA (Link-State Advertisements)**. Każdy router w tym samym obszarze buduje identyczną **bazę danych stanu łączy (LSDB)** — pełną mapę topologii — a następnie lokalnie wylicza drzewo najkrótszych ścieżek do wszystkich sieci.',
          },
          {
            type: 'table',
            caption: '5 typów komunikatów wymienianych w protokole OSPF (Pyt. 53 — OBOWIĄZKOWE!)',
            headers: ['Typ', 'Nazwa komunikatu (PL / EN)', 'Rola w protokole OSPF'],
            rows: [
              ['**Typ 1**', '**Hello**', 'Wykrywanie i utrzymywanie relacji sąsiedztwa z innymi routerami OSPF; wybór **routera desygnowanego (DR)** i **zapasowego (BDR)** w sieciach wielodostępowych (redukuje liczbę relacji sąsiedzkich i ruch multicastowy).'],
              ['**Typ 2**', '**Opisy baz danych**\n*(Database Description — DBD)*', 'Przenoszą skrócone nagłówki (spis treści) baz LSDB podczas fazy synchronizacji (**Exchange**), aby router sprawdził, których rekordów LSA mu brakuje lub które ma nieaktualne.'],
              ['**Typ 3**', '**Żądanie danych o stanie połączeń**\n*(Link-State Request — LSR)*', 'Router prosi sąsiada o przesłanie pełnej treści konkretnych, brakujących lub nowszych rekordów stanu łącza (LSA) wykrytych po analizie pakietów DBD.'],
              ['**Typ 4**', '**Dane aktualizujące stan połączeń**\n*(Link-State Update — LSU)*', 'Przenoszą pełne rekordy LSA — w odpowiedzi na LSR oraz w protokole **Flooding** przy zmianach topologii, cyklicznych odświeżeniach (co 30 min) i usuwaniu wygasłych wpisów (po 1 h).'],
              ['**Typ 5**', '**Potwierdzenie stanu połączenia**\n*(Link-State Acknowledgment — LSAck)*', 'Niezawodne potwierdzenie poprawnego odbioru otrzymanych komunikatów aktualizujących `LSU` (zapewnia spójność baz LSDB).'],
            ],
          },
          {
            type: 'list',
            items: [
              {
                title: 'Trzy podprotokoły wspomagające w OSPF',
                text: '1) **Protokół Hello** — nawiązywanie sąsiedztwa i wybór **DR (Designated Router)** oraz **BDR (Backup Designated Router)**.\n2) **Protokół Exchange** — asymetryczna (wybór ról *master* i *slave*) wstępna synchronizacja baz LSDB za pomocą pakietów `DBD`, `LSR` i `LSU`.\n3) **Protokół Flooding (zalewanie)** — ujednolicanie baz LSDB po nawiązaniu pełnego sąsiedztwa (`LSU` + `LSAck`) w **trzech sytuacjach**: natychmiast po wykryciu awarii/zmiany stanu interfejsu, cyklicznie co **30 minut**, oraz w celu usunięcia przeterminowanych rekordów (czas życia rekordu LSA wg RFC 1583 = **1 godzina**).',
              },
              {
                title: 'Hierarchia obszarów (Areas) i zalety/wady OSPF',
                text: 'Duże sieci OSPF dzieli się na **obszary (Areas)** łączone ze szkieletem przez routery brzegowe **ABR (Area Border Routers)** — zmniejsza to rozmiar bazy LSDB i przyspiesza obliczenia. **Zalety OSPF:** brak pętli routingu, bardzo szybka zbieżność, efektywne użycie pasma (aktualizacje wysyłane tylko przy zmianach), wysoka skalowalność i brak limitu 15 przeskoków. **Wada:** znacznie większa złożoność obliczeniowa i konfiguracyjna niż w RIP (a nawet BGP).',
              },
            ],
          },
        ],
      },
      {
        id: 'igrp-bgp-cidr',
        heading: '8.4. Protokoły IGRP i BGP oraz mechanizmy wprowadzone przez CIDR (Pyt. 54)',
        blocks: [
          {
            type: 'list',
            items: [
              {
                title: 'Protokół IGRP (Interior Gateway Routing Protocol — Cisco)',
                text: 'Wewnętrzny protokół **wektora odległości** stworzony przez Cisco w połowie lat 80. jako odpowiedź na ograniczenia RIP. Zamiast prostej liczby przeskoków wykorzystuje **złożoną metrykę kombinującą 4 parametry**: **(1) Opóźnienie** (wielokrotności 10 µs), **(2) Pasmo** (od 1200 b/s do 10 Gb/s), **(3) Obciążenie** (1–255) oraz **(4) Niezawodność** (1–255).',
              },
              {
                title: 'Protokół BGP (Border Gateway Protocol — BGPv4, RFC 4271 / 1771)',
                text: 'Jednoczący cały Internet protokół **routingu zewnętrznego (EGP)** działający pomiędzy systemami autonomicznymi (AS). Jest protokołem **wektora ścieżki (Path-Vector)** i wykorzystuje niezawodny protokół **TCP** do wymiany aktualizacji. Nie stosuje tradycyjnych pojedynczych metryk, lecz **atrybuty i polityki wyboru**. Rozgłasza osiągalne prefiksy IP wraz z pełną **listą numerów AS (AS_PATH)** po drodze — pozwala to zbudować graf powiązań AS i **skutecznie eliminować pętle między systemami autonomicznymi** (router odrzuca trasę zawierającą jego własny numer AS). Obsługuje 3 typy routingu: (1) między różnymi AS (eBGP), (2) wewnątrz AS (iBGP), (3) tranzyt ruchu przez pośredni AS.',
              },
              {
                title: 'Mechanizmy sieciowe wprowadzane przez CIDR (Pyt. 54 — OBOWIĄZKOWE!)',
                text: '**CIDR (Classless Inter-Domain Routing)** wprowadził dwa przełomowe mechanizmy, które wspólnie z BGP-4 pozwoliły tymczasowo zażegnać tzw. **„trzecią śmierć Internetu”** (1. wyczerpanie 8-bitowych numerów AS, 2. wyczerpanie adresów klasy B, 3. wyczerpanie całej puli adresów IPv4):\n1. **Maski podsieci o zmiennej długości — VLSM (Variable Length Subnet Masks) i zniesienie klas A/B/C:** Długość maski (`/n`) jest dobierana elastycznie dokładnie do potrzeb danej podsieci lub organizacji (np. zamiast całej klasy B o 65 534 adresach firma potrzebująca 2000 adresów dostaje blok 8 ciągłych klas C, czyli prefiks `/21`), co radykalnie **zwiększa efektywność wykorzystania puli IPv4**.\n2. **Agregacja tras (Route Aggregation / Supernetting / Summarization):** Możliwość scalania wielu sąsiednich podsieci w **jeden wspólny wpis prefiksowy** w tablicach routingu na wyższych poziomach hierarchii (np. 16 sieci `/24` zapisanych jako jeden wpis `/20`). **Drastycznie zmniejsza to rozmiar tablic routingu** i obciążenie routerów szkieletowych Internetu! Koncepcję tę zaadaptowano również w IPv6.',
              },
            ],
          },
          {
            type: 'table',
            caption: 'Szybkie porównanie protokołów routingu: RIP vs OSPF vs IGRP vs BGP',
            headers: ['Protokół', 'Zakres', 'Typ algorytmu', 'Metryka / kryterium', 'Kluczowa cecha'],
            rows: [
              ['**RIP**', 'IGP (wewnątrz AS)', 'Wektor odległości (Bellman-Ford)', 'Liczba przeskoków (max 15, 16 = ∞)', 'Rozsyła tablice co 30 s; prosty, nieskalowalny'],
              ['**OSPF**', 'IGP (wewnątrz AS)', 'Stan łącza (Dijkstra / SPF)', 'Koszt łącza (pasmo, obciążenie itd.)', '5 komunikatów, multicast, baza LSDB, obszary + ABR'],
              ['**IGRP**', 'IGP (Cisco)', 'Wektor odległości', 'Złożona: pasmo, opóźnienie, obciążenie, niezawodność', 'Własnościowy następca RIP (później EIGRP)'],
              ['**BGPv4**', 'EGP (między AS)', 'Wektor ścieżki (Path-Vector)', 'Atrybuty (np. lista AS) i polityki', 'Działa nad TCP; łączy cały globalny Internet; eliminuje pętle AS'],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sieci-ch9',
    subject_id: 'sieci',
    order_index: 9,
    slug: 'uslugi-bezpieczenstwo-internet-przyszlosci',
    title: 'Rozdział 9: Usługi sieciowe, bezpieczeństwo (Firewall, VPN) i Internet Przyszłości',
    subtitle: 'Intranet, Ekstranet, Internet, DHCP, DNS, NAT/PAT, Proxy, URL, WWW, ping/ipconfig, Zapora sieciowa, VPN oraz 4 filary Internetu Przyszłości',
    lecture_ref: 'Wykład 9 (wymagane_pojecia_M.pdf) + Zagadnienia 55–59',
    estimated_minutes: 30,
    summary:
      'Kompletne wyjaśnienie wszystkich 13 pojęć wymaganych na teście zaliczeniowym (Intranet, Ekstranet, URL, Proxy, NAT, PAT, DNS, WWW, DHCP, ICMP, ARP, ping, ipconfig), szczegółowe omówienie zapory sieciowej (7 funkcji, DMZ), wirtualnych sieci prywatnych VPN (Site-to-Site, Client-to-Site, tunelowanie PPTP/L2TP/IPSec) oraz koncepcji ewolucyjnego (NGI/NGN) i rewolucyjnego rozwoju sieci (4 filary Internetu Przyszłości).',
    exam_questions: [55, 56, 57, 58, 59],
    key_takeaways: [
      'Intranet = prywatna sieć organizacji oparta na technologiach internetowych (TCP/IP, WWW), dostępna tylko wewnątrz firmy. Ekstranet = bezpieczne rozszerzenie intranetu dla wybranych partnerów zewnętrznych.',
      'DHCP automatycznie przydziela konfigurację sieciową (IP, maskę, bramę domyślną, DNS) na czas dzierżawy w 4-etapowym procesie DORA (Discover–Offer–Request–Acknowledge).',
      'DNS to hierarchiczny, rozproszony system tłumaczący czytelne dla człowieka nazwy domenowe (np. put.poznan.pl) na adresy IP (i odwrotnie — zapytania odwrotne PTR).',
      'NAT (Network Address Translation) tłumaczy adresy prywatne na publiczne — 3 rodzaje: NAT statyczny (1:1), NAT dynamiczny (z puli publicznych IP) oraz PAT / NAT Overload (N:1 z użyciem numerów portów).',
      'Zapora sieciowa (Firewall) działa w warstwach L3/L4/L7 i realizuje 7 funkcji (filtrowanie, NAT, uwierzytelnianie, anty-malware, DMZ, VPN, szyfrowanie). VPN wykorzystuje tunelowanie (PPTP, L2TP, IPSec) w trybach Site-to-Site i Client-to-Site.',
    ],
    figures: ['/media/sieci/w9_s10_filary_fi.png'],
    sections: [
      {
        id: 'intranet-ekstranet-internet-www-url',
        heading: '9.1. Intranet, Ekstranet, Internet, WWW, URL i Proxy (Pyt. 55 i 56 + Wymagane pojęcia)',
        blocks: [
          {
            type: 'p',
            text: 'Na slajdzie 3 pliku *wymagane_pojecia_M.pdf* wykładowca wymienił 13 kluczowych pojęć, których definicje i działanie trzeba biegle wyjaśnić na teście, a pytania **55–59** szczegółowo testują najważniejsze z nich.',
          },
          {
            type: 'list',
            items: [
              {
                title: 'Intranet (Pyt. 55)',
                text: '**Wewnętrzna, prywatna sieć komputerowa organizacji** (przedsiębiorstwa, uczelni, urzędu) wykorzystująca standardowe technologie i protokoły internetowe (stos **TCP/IP**, strony WWW/HTTP, pocztę wewnętrzną), ale **dostępna wyłącznie dla uprawnionych pracowników/członków** danej organizacji. Służy do bezpiecznego obiegu dokumentów, baz wiedzy, komunikacji i systemów firmowych. Często jest oddzielony od publicznego Internetu zaporą sieciową (lub wręcz całkowicie odcięty od Internetu ze względów bezpieczeństwa i produktywności).',
              },
              {
                title: 'Ekstranet',
                text: 'Kontrolowane, zabezpieczone (np. przez VPN i uwierzytelnianie) rozszerzenie firmowego intranetu, udostępniające wybraną część zasobów **zaufanym podmiotom zewnętrznym** — partnerom biznesowym, dostawcom, podwykonawcom lub kluczowym klientom.',
              },
              {
                title: 'Internet (Pyt. 56) vs WWW',
                text: '**Internet** to **globalna infrastruktura** — ogólnoświatowa „sieć sieci” łącząca miliony sieci lokalnych i operatorskich za pomocą wspólnego stosu protokołów **TCP/IP**. Natomiast **WWW (World Wide Web)** (stworzone przez Tima Bernersa-Lee w 1990 r.) to **tylko jedna z usług** działających w Internecie (obok poczty e-mail, FTP, VoIP, SSH) — rozproszony system dokumentów hipertekstowych (stron internetowych) przesyłanych protokołami **HTTP/HTTPS**.',
              },
              {
                title: 'URL (Uniform Resource Locator)',
                text: 'Ujednolicony adres wskazujący dokładną lokalizację zasobu w Internecie i sposób dostępu do niego, np. `https://ekursy.put.poznan.pl:443/course/view.php?id=42#sekcja1` (`protokół://host:port/ścieżka?parametry#fragment`).',
              },
              {
                title: 'Serwer Proxy (serwer pośredniczący)',
                text: 'Pośrednik umieszczony między klientem (np. siecią firmową) a serwerami docelowymi w Internecie. Klient wysyła żądanie do Proxy, a Proxy wykonuje je w jego imieniu. Główne zastosowania: **(1) buforowanie (caching)** często pobieranych stron (oszczędność pasma i przyspieszenie), **(2) kontrola dostępu i filtrowanie treści** (blokowanie niepożądanych stron w firmie), **(3) maskowanie tożsamości/adresu IP klienta** oraz logowanie ruchu. Odmiana **Reverse Proxy** stoi przed serwerami firmy (równoważenie obciążenia, odciążenie SSL, ochrona).',
              },
            ],
          },
        ],
      },
      {
        id: 'dhcp-dns-nat-pat-narzedzia',
        heading: '9.2. Kluczowe usługi sieciowe: DHCP, DNS, NAT/PAT oraz narzędzia ping i ipconfig (Pyt. 57–59)',
        blocks: [
          {
            type: 'list',
            items: [
              {
                title: 'Protokół DHCP (Dynamic Host Configuration Protocol) — Pyt. 57',
                text: 'Służy do **automatycznego, dynamicznego przydzielania konfiguracji sieciowej** hostom podłączanym do sieci (działa nad UDP: serwer port `67`, klient port `68`), eliminując ręczną konfigurację i konflikty adresów IP. Serwer DHCP przekazuje klientowi: **(1) adres IP**, **(2) maskę podsieci**, **(3) adres bramy domyślnej (Default Gateway)**, **(4) adresy serwerów DNS** (oraz ewentualnie czas dzierżawy, nazwę domeny, serwer NTP). Konfiguracja przydzielana jest na określony **czas dzierżawy (*lease time*)** w 4-krokowym procesie **DORA**:\n1. **DHCP Discover** (klient rozgłasza broadcast: *„Szukam serwera DHCP!”*).\n2. **DHCP Offer** (serwer proponuje wolny adres IP z puli i parametry).\n3. **DHCP Request** (klient rozgłasza, że akceptuje ofertę wybranego serwera).\n4. **DHCP Acknowledge (ACK)** (serwer potwierdza i zatwierdza dzierżawę).',
              },
              {
                title: 'System DNS (Domain Name System) — Pyt. 58',
                text: '**DNS** to globalny, **hierarchiczny i rozproszony system nazw domenowych**, działający jak „książka telefoniczna Internetu” — tłumaczy przyjazne dla człowieka nazwy domenowe (np. `www.put.poznan.pl`) na adresy liczbowe **IP** (rekordy `A` dla IPv4, `AAAA` dla IPv6) oraz obsługuje rekordy pocztowe (`MX`), aliasy (`CNAME`), serwery nazw (`NS`) i zapytania odwrotne (`PTR`: IP → nazwa). Korzysta z portu `53` (UDP dla zwykłych zapytań, TCP dla transferu stref/dużych odpowiedzi).\n**W jakich przypadkach komputer korzysta z DNS?** Za każdym razem, gdy użytkownik lub aplikacja odwołuje się do zasobu za pomocą **nazwy domenowej zamiast surowego adresu IP** (wpisanie adresu WWW w przeglądarce, wysłanie e-maila — zapytanie o rekord `MX` odbiorcy, uruchomienie `ping put.poznan.pl`, połączenie z serwerem gry/SSH/FTP po nazwie), a odpowiedniego mapowania nie ma jeszcze w lokalnej pamięci podręcznej (*DNS cache*) ani w lokalnym pliku `hosts`.',
              },
              {
                title: 'NAT i PAT (Network / Port Address Translation) — Pyt. 59',
                text: '**NAT** to mechanizm działający na routerze brzegowym (lub zaporze), polegający na **translacji (podmianie) prywatnych adresów IP** z sieci lokalnej na **publiczne adresy IP** przy wyjściu do Internetu (i odwrotnie dla pakietów wracających, na podstawie dynamicznej tablicy translacji). Pozwala zaoszczędzić publiczne adresy IPv4 i dodatkowo ukrywa wewnętrzną strukturę sieci LAN.\n**Trzy główne rodzaje NAT:**\n• **Statyczny NAT (1:1)** — jeden konkretny adres prywatny jest na stałe przypisany do jednego adresu publicznego (np. dla serwera WWW/poczty w sieci firmowej, aby był dostępny z zewnątrz).\n• **Dynamiczny NAT (N:M)** — adresy prywatne dynamicznie wypożyczają wolne adresy publiczne z puli wykupionej przez firmę (jednocześnie dostęp do Internetu ma tyle hostów, ile jest publicznych IP w puli).\n• **PAT (Port Address Translation / NAT Overload / NAPT — N:1)** — najpopularniejszy wariant domowy i firmowy! **Wiele (setki) komputerów z adresami prywatnymi dzieli JEDEN publiczny adres IP**; router rozróżnia poszczególne połączenia, przepisując w nagłówkach TCP/UDP także **unikatowe numery portów źródłowych** i zapisując mapowanie `(IP_pryw:port_pryw ↔ IP_publ:port_publ)` w tablicy NAT.',
              },
            ],
          },
          {
            type: 'svg',
            diagramId: 'nat-pat',
            title: 'Jak działa PAT (NAT Overload): translacja wielu prywatnych hostów przez 1 publiczne IP z użyciem portów',
            caption: 'Prześledź zmiany adresu źródłowego i numeru portu w tabeli translacji routera brzegowego.',
          },
          {
            type: 'callout',
            variant: 'lab',
            title: 'Narzędzia diagnostyczne z laboratoriów: ping oraz ipconfig (z listy wymaganych pojęć)',
            text: '• **`ping <cel>`** — wykorzystuje komunikaty **ICMP Echo Request** i **ICMP Echo Reply** do sprawdzenia osiągalności hosta w sieci, pomiaru opóźnienia tam i z powrotem (**RTT** w ms), wykrycia utraty pakietów oraz odczytu pola **TTL** (pozwalającego oszacować liczbę przeskoków / system odbiorcy).\n• **`ipconfig`** (Windows; odpowiedniki Linux: `ip addr`, `ip route`) — wyświetla bieżącą konfigurację interfejsów TCP/IP: adres IPv4/IPv6, maskę podsieci i bramę domyślną. Ważne przełączniki: `ipconfig /all` (dodatkowo adres fizyczny **MAC**, serwery **DNS**, adres serwera **DHCP** i czas dzierżawy), `ipconfig /release` i `ipconfig /renew` (zwolnienie i odnowienie dzierżawy DHCP), `ipconfig /flushdns` (wyczyszczenie lokalnej pamięci podręcznej DNS).',
          },
        ],
      },
      {
        id: 'firewall-vpn-future-internet',
        heading: '9.3. Zapora sieciowa (Firewall), VPN i Internet Przyszłości (4 filary)',
        blocks: [
          {
            type: 'p',
            text: '**Zapora sieciowa (Firewall)** to element bezpieczeństwa instalowany w kanale komunikacyjnym pomiędzy chronioną siecią wewnętrzną a zewnętrzną siecią stanowiącą źródło zagrożeń (np. Internetem). Realizuje swoje zadania w różnych warstwach modelu komunikacji — szczególnie w warstwie **międzysieciowej (IP)**, **transportowej (porty TCP/UDP)** i **zastosowań/aplikacji (głęboka inspekcja protokołów)**.',
          },
          {
            type: 'list',
            items: [
              {
                title: '7 funkcji zapory sieciowej (wg wykładu)',
                text: '1. **Filtrowanie pakietów** (blokowanie/przepuszczanie ruchu wg reguł IP, portów, protokołów, stanu połączenia).\n2. **Translacja adresów (NAT/PAT)**.\n3. **Uwierzytelnianie użytkowników**.\n4. **Ochrona przed programami szkodliwymi** (malware, wirusy, włamania).\n5. **Tworzenie stref zdemilitaryzowanych (DMZ)** — odizolowana podsieć dla publicznych serwerów (np. WWW, poczta), aby w razie ich włamania atakujący nie miał dostępu do wewnętrznej sieci LAN.\n6. **Tworzenie wirtualnych sieci prywatnych (VPN)**.\n7. **Szyfrowanie danych**.',
              },
              {
                title: 'Wirtualna sieć prywatna (VPN — Virtual Private Network)',
                text: 'Grupa co najmniej dwóch połączonych komputerów lub sieci komunikujących się w sposób bezpieczny, za pomocą **tunelowania**, poprzez **sieć publiczną** (np. Internet). Zapewnia **szyfrowanie danych**, silne **uwierzytelnianie** oraz **maskowanie struktury sieci wewnętrznej**. Jest strukturą *logiczną* (wirtualną) — stacje końcowe korzystają z niej tak, jakby łączyło je prywatne łącze fizyczne.\n**Dwa podstawowe rodzaje VPN:**\n• **Site-to-Site** — łączy dwie odległe **sieci LAN** (np. oddziały firmy); tunel zestawiają brzegowe urządzenia VPN (routery/firewalle).\n• **Client-to-Site** — łączy pojedynczą zdalną **stację PC** (np. pracownika na home office) z firmową **siecią LAN**; tunel otwiera oprogramowanie klienta VPN na PC i brzegowy **koncentrator VPN**.\n**Protokoły tunelujące** (wytwarzające ochronną „osłonę” pakietów): **PPTP** (*Point-to-Point Tunneling Protocol*), **L2TP** (*Layer Two Tunneling Protocol*) oraz **IPSec** (*IP Security*).',
              },
            ],
          },
          {
            type: 'p',
            text: '**Rozwój Internetu i Internet Przyszłości:** Wyróżniamy dwa podejścia do rozwoju architektury Internetu: **(1) ewolucyjne** ulepszanie obecnej infrastruktury — **NGI (Next Generation Internet)** / **NGN (Next Generation Network)** oraz **(2) rewolucyjne** zaprojektowanie zupełnie nowej organizacji sieci i modeli biznesowych — **FI (Future Internet / Internet Przyszłości / Internet 3.0)**.',
          },
          {
            type: 'figure',
            src: '/media/sieci/w9_s10_filary_fi.png',
            caption: 'Świątynia Internetu Przyszłości: 4 filary podtrzymujące Społeczeństwo na nowej Infrastrukturze Internetu Przyszłości.',
            source: 'wymagane_pojecia_M.pdf, slajd 10',
          },
          {
            type: 'table',
            caption: 'Cztery filary Internetu Przyszłości (Future Internet)',
            headers: ['Filar (PL / EN)', 'Główna idea i zadania'],
            rows: [
              ['**1. Internet Społecznościowy**\n*(Internet by and for People)*', 'Medium dla nieograniczonego przepływu informacji i likwidacji cyfrowego podziału świata; ułatwianie życia ludzi i biznesu niezależnie od skali oraz przełamywanie barier między nadawcą i odbiorcą.'],
              ['**2. Internet Informacji i Wiedzy**\n*(Internet of Contents and Knowledge)*', 'Wspieranie mechanizmów tworzenia, wyszukiwania i rozpowszechniania rzetelnej wiedzy na poziomie lokalnym i globalnym.'],
              ['**3. Internet Rzeczy (IoT)**\n*(Internet of Things)*', 'Ogólnoświatowa sieć adresowalnych, połączonych obiektów komunikujących się standardowymi protokołami — nie tylko komputery i telefony, ale niemal każdy przedmiot/czujnik wokół nas.'],
              ['**4. Internet Usług (IoS)**\n*(Internet of Services)*', 'Nowy sposób uruchamiania i świadczenia zbiorów aplikacji sieciowych: powszechnych, przemysłowych, logistycznych, ePłatności, eBiznes, eEnergia, eZdrowie, eUrząd.'],
            ],
          },
        ],
      },
    ],
  },
];
