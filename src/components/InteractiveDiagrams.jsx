import React, { useState } from 'react';
import katex from 'katex';
import { ChevronLeft, ChevronRight, Layers, Shield, Cpu, Network, LineChart, BarChart3, Sigma, GitBranch, Atom } from 'lucide-react';
import { MATH_DIAGRAM_REGISTRY } from './MathDiagrams.jsx';
import { PROB_DIAGRAM_REGISTRY } from './ProbDiagrams.jsx';
import { ALG_DIAGRAM_REGISTRY } from './AlgDiagrams.jsx';
import { AISD_DIAGRAM_REGISTRY } from './AisdDiagrams.jsx';
import { PHYS_DIAGRAM_REGISTRY } from './PhysDiagrams.jsx';

function renderMathTitle(text) {
  if (!text || !text.includes('$')) return text;
  const parts = text.split(/(\$[^$]+\$)/g);
  return parts.map((part, i) => {
    if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
      try {
        const html = katex.renderToString(part.slice(1, -1), { displayMode: false, throwOnError: false });
        return <span key={i} dangerouslySetInnerHTML={{ __html: html }} />;
      } catch {
        return <code key={i}>{part}</code>;
      }
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

// 1. Interactive OSI vs TCP/IP Comparator
function OsiVsTcpIpDiagram() {
  const [selected, setSelected] = useState(4);
  const osiLayers = [
    { num: 7, name: 'Aplikacji', en: 'Application', pdu: 'Dane (A-PDU)', tcpip: 'Warstwa procesów / aplikacji', color: '#ef4444', desc: 'Interfejs dla programów użytkowych (HTTP, FTP, SMTP, DNS, Telnet, DHCP).', hw: 'Hosty końcowe' },
    { num: 6, name: 'Prezentacji', en: 'Presentation', pdu: 'Dane (P-PDU)', tcpip: 'Warstwa procesów / aplikacji', color: '#f97316', desc: 'Formatowanie, kodowanie znaków, kompresja, szyfrowanie i deszyfrowanie (Virtual Terminal, TLS).', hw: 'Hosty końcowe' },
    { num: 5, name: 'Sesji', en: 'Session', pdu: 'Dane (S-PDU)', tcpip: 'Warstwa procesów / aplikacji', color: '#eab308', desc: 'Zarządzanie dialogiem (simplex/half/full-duplex), punkty synchronizacyjne, wznawianie sesji.', hw: 'Hosty końcowe' },
    { num: 4, name: 'Transportowa', en: 'Transport', pdu: 'Segment / Datagram', tcpip: 'Warstwa transportowa (Host-to-Host)', color: '#10b981', desc: 'Pierwsza warstwa END-TO-END! Porty 16-bitowe, niezawodność i okno przesuwne (TCP) lub szybki transport bezpołączeniowy (UDP).', hw: 'Hosty końcowe' },
    { num: 3, name: 'Sieciowa', en: 'Network', pdu: 'Pakiet / Datagram IP', tcpip: 'Warstwa międzysieciowa', color: '#3b82f6', desc: 'Adresowanie logiczne (IP), wybór trasy (routing: RIP, OSPF, BGP), diagnostyka (ICMP), odwzorowanie (ARP), multicast (IGMP).', hw: 'Routery (L1–L3)' },
    { num: 2, name: 'Łącza danych', en: 'Data Link', pdu: 'Ramka (Frame)', tcpip: 'Warstwa dostępu do sieci', color: '#6366f1', desc: 'Transmisja między sąsiednimi węzłami, ramkowanie, CRC, w LAN podział IEEE 802 na LLC (802.2) i MAC (CSMA/CD, Token Ring, Wi-Fi).', hw: 'Przełączniki, mosty, NIC' },
    { num: 1, name: 'Fizyczna', en: 'Physical', pdu: 'Bit', tcpip: 'Warstwa dostępu do sieci', color: '#8b5cf6', desc: 'Strumień bitów, sygnalizacja elektryczna/optyczna, wtyki (V.24, RS-232C, X.21). Uwaga: samo medium nie należy do OSI!', hw: 'Koncentratory (huby), regeneratory' },
  ];

  const active = osiLayers.find((l) => l.num === selected) || osiLayers[3];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        <div className="md:col-span-5 space-y-1.5">
          <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">Model ISO/OSI (7 warstw)</div>
          {osiLayers.map((l) => {
            const isSel = l.num === selected;
            return (
              <button
                key={l.num}
                onClick={() => setSelected(l.num)}
                className="w-full text-left px-3 py-2 rounded-lg border transition-all flex items-center justify-between cursor-pointer"
                style={{
                  borderColor: isSel ? l.color : 'var(--border)',
                  background: isSel ? `${l.color}20` : 'var(--bg-elevated)',
                  transform: isSel ? 'translateX(4px)' : 'none',
                }}
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className="w-6 h-6 rounded-md text-xs font-bold text-white flex items-center justify-center shrink-0"
                    style={{ background: l.color }}
                  >
                    {l.num}
                  </span>
                  <span className="font-semibold text-sm">{l.name}</span>
                </span>
                <span className="text-xs font-mono text-[var(--text-muted)]">{l.pdu}</span>
              </button>
            );
          })}
        </div>

        <div className="md:col-span-3 flex flex-col gap-1.5">
          <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">Model TCP/IP (4 warstwy)</div>
          <button
            onClick={() => setSelected(7)}
            className="flex-[3] rounded-lg border px-3 py-3 text-left flex flex-col justify-center cursor-pointer transition-all"
            style={{
              borderColor: selected >= 5 ? '#ef4444' : 'var(--border)',
              background: selected >= 5 ? 'rgba(239,68,68,0.14)' : 'var(--bg-elevated)',
            }}
          >
            <div className="text-xs font-bold text-red-500">4. Aplikacji / Procesów</div>
            <div className="text-[11px] text-[var(--text-muted)] mt-1">HTTP, FTP, SMTP, DNS, DHCP, RTP, SNMP</div>
          </button>
          <button
            onClick={() => setSelected(4)}
            className="flex-1 rounded-lg border px-3 py-2 text-left flex flex-col justify-center cursor-pointer transition-all"
            style={{
              borderColor: selected === 4 ? '#10b981' : 'var(--border)',
              background: selected === 4 ? 'rgba(16,185,129,0.14)' : 'var(--bg-elevated)',
            }}
          >
            <div className="text-xs font-bold text-emerald-500">3. Transportowa</div>
            <div className="text-[11px] text-[var(--text-muted)]">TCP, UDP</div>
          </button>
          <button
            onClick={() => setSelected(3)}
            className="flex-1 rounded-lg border px-3 py-2 text-left flex flex-col justify-center cursor-pointer transition-all"
            style={{
              borderColor: selected === 3 ? '#3b82f6' : 'var(--border)',
              background: selected === 3 ? 'rgba(59,130,246,0.14)' : 'var(--bg-elevated)',
            }}
          >
            <div className="text-xs font-bold text-blue-500">2. Międzysieciowa</div>
            <div className="text-[11px] text-[var(--text-muted)]">IP, ICMP, ARP, IGMP, RIP, OSPF, BGP</div>
          </button>
          <button
            onClick={() => setSelected(2)}
            className="flex-[2] rounded-lg border px-3 py-3 text-left flex flex-col justify-center cursor-pointer transition-all"
            style={{
              borderColor: selected <= 2 ? '#6366f1' : 'var(--border)',
              background: selected <= 2 ? 'rgba(99,102,241,0.14)' : 'var(--bg-elevated)',
            }}
          >
            <div className="text-xs font-bold text-indigo-500">1. Dostępu do sieci</div>
            <div className="text-[11px] text-[var(--text-muted)] mt-1">Ethernet, Wi-Fi, Token Ring, PPP, ATM</div>
          </button>
        </div>

        <div className="md:col-span-4 card-subtle p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white"
                style={{ background: active.color }}
              >
                Warstwa {active.num} OSI
              </span>
              <span className="text-xs text-[var(--text-muted)]">{active.en}</span>
            </div>
            <h4 className="font-bold text-base mb-2">{active.name}</h4>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{active.desc}</p>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--border)] space-y-1.5 text-xs">
            <div><span className="text-[var(--text-muted)]">Odpowiednik TCP/IP:</span> <strong>{active.tcpip}</strong></div>
            <div><span className="text-[var(--text-muted)]">Jednostka danych (PDU):</span> <code className="prose-code">{active.pdu}</code></div>
            <div><span className="text-[var(--text-muted)]">Sprzęt / miejsce:</span> <strong>{active.hw}</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. Interactive IPv4 Header Inspector
function Ipv4HeaderDiagram() {
  const fields = [
    { id: 'ver', label: 'Wersja', bits: 4, span: 4, row: 1, color: '#2563eb', desc: '4 bity — wersja protokołu IP (wartość 4 dla IPv4, 6 dla IPv6).' },
    { id: 'ihl', label: 'IHL', bits: 4, span: 4, row: 1, color: '#3b82f6', desc: '4 bity — długość nagłówka w słowach 32-bitowych. Min. wartość = 5 (20 bajtów, bez opcji), max = 15 (60 bajtów).' },
    { id: 'tos', label: 'Typ usługi (ToS)', bits: 8, span: 8, row: 1, color: '#0284c7', desc: '8 bitów — jakość usługi (QoS): bity 0–2 pierwszeństwo (8 poziomów), bit 3 małe opóźnienie, bit 4 wysoka przepustowość, bit 5 wysoka niezawodność.' },
    { id: 'len', label: 'Całkowita długość (Total Length)', bits: 16, span: 16, row: 1, color: '#0369a1', desc: '16 bitów — całkowity rozmiar datagramu (nagłówek + dane) w bajtach, max 65 535 B. Po fragmentacji oznacza rozmiar bieżącego fragmentu!' },
    { id: 'id', label: 'Identyfikacja (Identification)', bits: 16, span: 16, row: 2, color: '#d97706', frag: true, desc: '16 bitów [FRAGMENTACJA!] — unikatowy identyfikator datagramu. Wszystkie fragmenty tego samego datagramu mają tę samą wartość, co pozwala je złożyć.' },
    { id: 'flags', label: 'Flagi', bits: 3, span: 3, row: 2, color: '#ea580c', frag: true, desc: '3 bity [FRAGMENTACJA!] — Bit 0 = 0 (rezerwa); Bit 1 = DF (Don’t Fragment: 1=zakaz); Bit 2 = MF (More Fragments: 1=kolejne części, 0=ostatnia).' },
    { id: 'off', label: 'Przesunięcie fragmentu (Fragment Offset)', bits: 13, span: 13, row: 2, color: '#c2410c', frag: true, desc: '13 bitów [FRAGMENTACJA!] — pozycja bajtów fragmentu w oryginalnym datagramie mierzona w blokach po 8 bajtów (64 bity). Pierwszy fragment = 0.' },
    { id: 'ttl', label: 'TTL (Czas życia)', bits: 8, span: 8, row: 3, color: '#059669', desc: '8 bitów — maksymalna liczba przeskoków przez routery. Każdy router zmniejsza TTL o 1; przy TTL=0 pakiet jest kasowany (ochrona przed pętlami) + ICMP Time Exceeded.' },
    { id: 'proto', label: 'Protokół', bits: 8, span: 8, row: 3, color: '#0d9488', desc: '8 bitów — protokół warstwy wyższej: 1 = ICMP, 6 = TCP (uwaga na literówkę „16” na slajdzie!), 17 = UDP, 8 = EGP, 89 = OSPF.' },
    { id: 'csum', label: 'Suma kontrolna nagłówka', bits: 16, span: 16, row: 3, color: '#047857', desc: '16 bitów — chroni wyłącznie nagłówek IP. Ponieważ każdy router zmienia TTL, suma jest przeliczana w każdym węźle!' },
    { id: 'src', label: 'Źródłowy adres IP (Source IP Address)', bits: 32, span: 32, row: 4, color: '#4f46e5', desc: '32 bity — adres IP nadawcy datagramu.' },
    { id: 'dst', label: 'Docelowy adres IP (Destination IP Address)', bits: 32, span: 32, row: 5, color: '#4338ca', desc: '32 bity — adres IP adresata (używany przez routery do wyboru trasy).' },
    { id: 'opt', label: 'Opcje (Options — diagnostyka, pomiary, bezpieczeństwo)', bits: '0–320', span: 24, row: 6, color: '#64748b', desc: 'Zmienna długość (opcjonalne) — testowanie, Record Route, Timestamp, Source Routing, bezpieczeństwo.' },
    { id: 'pad', label: 'Wypełnienie', bits: '0–24', span: 8, row: 6, color: '#475569', desc: 'Zera dopełniające długość nagłówka do całkowitej wielokrotności 32 bitów.' },
  ];
  const [activeId, setActiveId] = useState('flags');
  const active = fields.find((f) => f.id === activeId) || fields[0];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-mono px-1">
        <span>Bit 0</span>
        <span className="text-amber-600 dark:text-amber-400 font-sans font-semibold">Pomarańczowe pola = Fragmentacja IP (Pyt. 33 i 35)</span>
        <span>Bit 31 (32 bity = 4 bajty / wiersz)</span>
      </div>
      <div className="space-y-1.5">
        {[1, 2, 3, 4, 5, 6].map((r) => (
          <div key={r} className="grid gap-1.5" style={{ gridTemplateColumns: 'repeat(32, minmax(0, 1fr))' }}>
            {fields
              .filter((f) => f.row === r)
              .map((f) => {
                const isAct = f.id === activeId;
                return (
                  <button
                    key={f.id}
                    onClick={() => setActiveId(f.id)}
                    style={{
                      gridColumn: `span ${f.span} / span ${f.span}`,
                      background: isAct ? f.color : `${f.color}22`,
                      borderColor: isAct ? f.color : `${f.color}66`,
                      color: isAct ? '#ffffff' : 'var(--text)',
                    }}
                    className="border rounded-lg py-2.5 px-1.5 text-center transition-all cursor-pointer overflow-hidden"
                  >
                    <div className="text-[11px] sm:text-xs font-bold truncate">{f.label}</div>
                    <div className="text-[10px] opacity-80 font-mono">{f.bits} b</div>
                  </button>
                );
              })}
          </div>
        ))}
      </div>
      <div className="card-subtle p-3.5 text-sm">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-0.5 rounded text-xs font-bold text-white" style={{ background: active.color }}>
            {active.label}
          </span>
          <span className="text-xs font-mono text-[var(--text-muted)]">Rozmiar: {active.bits} bitów</span>
          {active.frag && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-300">
              Udział we fragmentacji
            </span>
          )}
        </div>
        <p className="text-[var(--text-secondary)] leading-relaxed m-0">{active.desc}</p>
      </div>
    </div>
  );
}

// 3. Interactive TCP Header Inspector
function TcpHeaderDiagram() {
  const fields = [
    { id: 'sport', label: 'Port źródłowy', bits: 16, span: 16, row: 1, color: '#2563eb', desc: '16 bitów — identyfikuje proces/aplikację wysyłającą (u klienta zwykle port efemeryczny).' },
    { id: 'dport', label: 'Port docelowy', bits: 16, span: 16, row: 1, color: '#1d4ed8', desc: '16 bitów — identyfikuje usługę docelową (np. FTP 21, SSH 22, Telnet 23, SMTP 25, HTTP 80, HTTPS 443).' },
    { id: 'seq', label: 'Numer sekwencyjny (Sequence Number)', bits: 32, span: 32, row: 2, color: '#059669', desc: '32 bity — pozycja pierwszego bajtu danych w tym segmencie. Pozwala złożyć dane w kolejności i wykryć utraty/duplikaty.' },
    { id: 'ack', label: 'Numer potwierdzenia (Acknowledgement Number)', bits: 32, span: 32, row: 3, color: '#0d9488', desc: '32 bity — ważny przy ACK=1. Zawiera numer NASTĘPNEGO oczekiwanego bajtu (= kumulatywne potwierdzenie odbioru do ACK−1).' },
    { id: 'doff', label: 'Przes. danych', bits: 4, span: 4, row: 4, color: '#64748b', desc: '4 bity (Data Offset) — długość nagłówka TCP w słowach 32-bitowych (min. 5 = 20 bajtów bez opcji).' },
    { id: 'res', label: 'Rez.', bits: 6, span: 6, row: 4, color: '#475569', desc: '6 bitów zarezerwowanych — zawsze ustawione na 0.' },
    { id: 'flags', label: '6 Flag: U A P R S F', bits: 6, span: 6, row: 4, color: '#dc2626', desc: 'URG (ważne dane), ACK (ważność potwierdzenia), PSH (natychmiast do aplikacji), RST (reset błędu), SYN (synchronizacja), FIN (koniec danych).' },
    { id: 'win', label: 'Okno (Window — sterowanie przepływem)', bits: 16, span: 16, row: 4, color: '#d97706', desc: '16 bitów — liczba bajtów, jaką nadawca może wysłać bez kolejnego ACK (aktualny wolny bufor odbiorcy).' },
    { id: 'csum', label: 'Suma kontrolna', bits: 16, span: 16, row: 5, color: '#7c3aed', desc: '16 bitów — obejmuje nagłówek TCP, dane oraz pseudonagłówek IP.' },
    { id: 'urg', label: 'Wskaźnik ważnych danych', bits: 16, span: 16, row: 5, color: '#9333ea', desc: '16 bitów — wskazuje koniec danych pilnych; aktywny wyłącznie przy fladze URG = 1.' },
    { id: 'opt', label: 'Opcje (np. MSS — Maximum Segment Size) + Wypełnienie', bits: '0–320', span: 32, row: 6, color: '#64748b', desc: 'Najważniejsza opcja to MSS (maksymalny rozmiar danych w segmencie TCP negocjowany przy SYN).' },
  ];
  const [activeId, setActiveId] = useState('flags');
  const active = fields.find((f) => f.id === activeId) || fields[0];

  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        {[1, 2, 3, 4, 5, 6].map((r) => (
          <div key={r} className="grid gap-1.5" style={{ gridTemplateColumns: 'repeat(32, minmax(0, 1fr))' }}>
            {fields
              .filter((f) => f.row === r)
              .map((f) => {
                const isAct = f.id === activeId;
                return (
                  <button
                    key={f.id}
                    onClick={() => setActiveId(f.id)}
                    style={{
                      gridColumn: `span ${f.span} / span ${f.span}`,
                      background: isAct ? f.color : `${f.color}22`,
                      borderColor: isAct ? f.color : `${f.color}66`,
                      color: isAct ? '#ffffff' : 'var(--text)',
                    }}
                    className="border rounded-lg py-2.5 px-1.5 text-center transition-all cursor-pointer overflow-hidden"
                  >
                    <div className="text-[11px] sm:text-xs font-bold truncate">{f.label}</div>
                    <div className="text-[10px] opacity-80 font-mono">{f.bits} b</div>
                  </button>
                );
              })}
          </div>
        ))}
      </div>
      <div className="card-subtle p-3.5 text-sm">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-0.5 rounded text-xs font-bold text-white" style={{ background: active.color }}>
            {active.label}
          </span>
          <span className="text-xs font-mono text-[var(--text-muted)]">{active.bits} bitów</span>
        </div>
        <p className="text-[var(--text-secondary)] leading-relaxed m-0">{active.desc}</p>
      </div>
    </div>
  );
}

// 4. Interactive 3-Way Handshake Stepper
function ThreeWayHandshakeDiagram() {
  const [step, setStep] = useState(1);
  const steps = [
    {
      title: 'Stan początkowy',
      aState: 'CLOSED',
      bState: 'LISTEN',
      packet: null,
      dir: null,
      desc: 'Serwer B nasłuchuje na otwartym porcie (stan LISTEN). Klient A nie ma jeszcze otwartego połączenia (CLOSED).',
    },
    {
      title: 'Krok 1: Klient A wysyła SYN',
      aState: 'SYN-SENT',
      bState: 'SYN-RECEIVED',
      packet: 'CTL = SYN   |   SEQ = 100',
      dir: 'right',
      desc: 'Host A inicjuje połączenie i proponuje swój początkowy numer sekwencyjny (ISN = 100). Po wysłaniu A przechodzi w SYN-SENT, a B po odbiorze w SYN-RECEIVED.',
    },
    {
      title: 'Krok 2: Serwer B odpowiada SYN + ACK',
      aState: 'SYN-SENT',
      bState: 'SYN-RECEIVED',
      packet: 'CTL = SYN, ACK   |   SEQ = 300, ACK = 101',
      dir: 'left',
      desc: 'Serwer B potwierdza odbiór SYN od klienta (ACK = 100 + 1 = 101) oraz synchronizuje własny początkowy numer sekwencyjny (SEQ = 300).',
    },
    {
      title: 'Krok 3: Klient A wysyła ACK → Połączenie ustanowione!',
      aState: 'ESTABLISHED',
      bState: 'ESTABLISHED',
      packet: 'CTL = ACK   |   SEQ = 101, ACK = 301',
      dir: 'right',
      desc: 'Host A potwierdza odbiór SYN od B (ACK = 300 + 1 = 301). Obie strony przechodzą w stan ESTABLISHED — od tego momentu następuje dwukierunkowa transmisja danych!',
    },
  ];
  const cur = steps[step];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-1.5">
          {steps.map((s, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer border transition-all ${
                step === i
                  ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                  : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border)]'
              }`}
            >
              {i === 0 ? 'Start' : `Krok ${i}`}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="btn-secondary !py-1 !px-2.5 text-xs"
          >
            <ChevronLeft className="w-4 h-4" /> Wstecz
          </button>
          <button
            onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
            disabled={step === steps.length - 1}
            className="btn-primary !py-1 !px-2.5 text-xs"
          >
            Dalej <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="card-subtle p-4">
        <div className="grid grid-cols-3 items-center gap-3 text-center">
          <div className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
            <div className="text-xs text-[var(--text-muted)]">Klient (TCP A)</div>
            <div className="mt-1 inline-block px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-500/15 text-blue-600 dark:text-blue-300">
              {cur.aState}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center min-h-[68px]">
            {cur.packet ? (
              <>
                <div className="text-[11px] sm:text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-[var(--accent)] text-white shadow-sm">
                  {cur.packet}
                </div>
                <div className="mt-2 w-full flex items-center">
                  {cur.dir === 'left' && <span className="text-[var(--accent)] font-bold text-lg leading-none">◄</span>}
                  <div className="h-0.5 flex-1 bg-[var(--accent)]" />
                  {cur.dir === 'right' && <span className="text-[var(--accent)] font-bold text-lg leading-none">►</span>}
                </div>
              </>
            ) : (
              <span className="text-xs text-[var(--text-muted)]">Oczekiwanie na inicjację połączenia</span>
            )}
          </div>

          <div className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
            <div className="text-xs text-[var(--text-muted)]">Serwer (TCP B)</div>
            <div className="mt-1 inline-block px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-300">
              {cur.bState}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[var(--border)]">
          <div className="text-sm font-bold mb-1">{cur.title}</div>
          <p className="text-sm text-[var(--text-secondary)] m-0">{cur.desc}</p>
        </div>
      </div>
    </div>
  );
}

// 5. Structured Cabling PN-EN 50173 Interactive Diagram
function StructuredCablingDiagram() {
  const segments = [
    { id: 'campus', title: 'Okablowanie kampusowe (CD ↔ BD)', len: 'max 1500 m', media: 'Światłowód', desc: 'Opcjonalny podsystem łączący odległe budynki. Stosuje się światłowód ze względu na zasięg i izolację galwaniczną.' },
    { id: 'vertical', title: 'Okablowanie pionowe / szkieletowe (BD ↔ FD)', len: 'max 500 m', media: 'Światłowód', desc: 'Łączy główny punkt dystrybucyjny budynku (BD) ze wszystkimi punktami piętrowymi (FD) w pionowych szybach.' },
    { id: 'patch', title: 'Odcinek 1 poziomy: Kabel krosowy w szafie FD', len: 'max 5 m', media: 'Skrętka (linka)', desc: 'Łączy port aktywnego przełącznika w szafie 19" z gniazdem panelu krosowego (patch panelu).' },
    { id: 'perm', title: 'Odcinek 2 poziomy: Kabel stały (Permanent Link)', len: 'max 90 m', media: 'Skrętka (drut)', desc: 'Biegnie na stałe w ścianach/korytach od panelu krosowego w FD (ew. przez punkt TP) do gniazda abonenckiego TO (2×RJ-45).' },
    { id: 'work', title: 'Odcinek 3 poziomy: Kabel przyłączeniowy (stacyjny)', len: 'max 5 m', media: 'Skrętka (linka)', desc: 'Łączy gniazdo abonenckie TO (2×RJ-45) z kartą sieciową komputera użytkownika. Razem poziome: 5 + 90 + 5 = 100 m!' },
  ];
  const [sel, setSel] = useState('perm');
  const active = segments.find((s) => s.id === sel) || segments[3];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {segments.map((s) => {
          const isAct = s.id === sel;
          const isHoriz = ['patch', 'perm', 'work'].includes(s.id);
          return (
            <button
              key={s.id}
              onClick={() => setSel(s.id)}
              className="p-3 rounded-xl border text-left transition-all cursor-pointer"
              style={{
                borderColor: isAct ? 'var(--accent)' : 'var(--border)',
                background: isAct ? 'var(--accent-soft)' : 'var(--bg-elevated)',
              }}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                {isHoriz ? 'Poziome (≤100 m)' : 'Szkielet'}
              </div>
              <div className="text-lg font-extrabold font-mono text-[var(--accent)] mt-0.5">{s.len}</div>
              <div className="text-xs font-semibold mt-1 leading-snug">{s.title.split(':')[0]}</div>
              <div className="text-[11px] text-[var(--text-muted)] mt-1">{s.media}</div>
            </button>
          );
        })}
      </div>
      <div className="card-subtle p-3.5 text-sm">
        <div className="font-bold text-[var(--text)] mb-1">{active.title} — <span className="font-mono text-[var(--accent)]">{active.len}</span></div>
        <p className="text-[var(--text-secondary)] m-0">{active.desc}</p>
      </div>
    </div>
  );
}

// 6. Collision vs Broadcast Domain Interactive Comparator
function DomainsCompareDiagram() {
  const [device, setDevice] = useState('switch');
  const configs = {
    hub: {
      name: 'Koncentrator (Hub — L1)',
      col: '1 domena kolizyjna (wspólna dla wszystkich 4 PC!)',
      bc: '1 domena rozgłoszeniowa',
      colorCol: '#ef4444',
      colorBc: '#f59e0b',
      note: 'Hub bezkrytycznie powiela bity na wszystkie porty — kolizje przy jednoczesnym nadawaniu, dzielone pasmo, half-duplex.',
    },
    switch: {
      name: 'Przełącznik (Switch — L2, bez VLAN)',
      col: '4 domeny kolizyjne (każdy port = osobna domena!)',
      bc: '1 domena rozgłoszeniowa (wspólna!)',
      colorCol: '#10b981',
      colorBc: '#f59e0b',
      note: 'Switch separuje domeny kolizyjne (zero kolizji w full-duplex!), ale ramki broadcast (ARP/DHCP) nadal trafiają na wszystkie porty.',
    },
    vlan: {
      name: 'Przełącznik + 2 sieci VLAN (802.1Q)',
      col: '4 domeny kolizyjne',
      bc: '2 domeny rozgłoszeniowe (VLAN 10 i VLAN 20 odizolowane!)',
      colorCol: '#10b981',
      colorBc: '#3b82f6',
      note: 'Podział na VLAN logicznie rozdziela domeny rozgłoszeniowe. Do komunikacji między VLAN 10 a VLAN 20 potrzebny jest router/L3.',
    },
    router: {
      name: 'Router (Warstwa 3 — 4 interfejsy)',
      col: '4 domeny kolizyjne',
      bc: '4 domeny rozgłoszeniowe (każdy interfejs = osobna podsieć IP!)',
      colorCol: '#10b981',
      colorBc: '#8b5cf6',
      note: 'Router blokuje broadcasty warstwy 2 między interfejsami — separuje zarówno domeny kolizyjne, jak i rozgłoszeniowe.',
    },
  };
  const c = configs[device];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {Object.entries(configs).map(([k, v]) => (
          <button
            key={k}
            onClick={() => setDevice(k)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border cursor-pointer transition-all ${
              device === k
                ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border)]'
            }`}
          >
            {v.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3.5 rounded-xl border" style={{ borderColor: c.colorCol, background: `${c.colorCol}14` }}>
          <div className="text-xs font-bold uppercase tracking-wider" style={{ color: c.colorCol }}>Domeny kolizyjne (dla 4 portów)</div>
          <div className="text-sm font-bold mt-1">{c.col}</div>
        </div>
        <div className="p-3.5 rounded-xl border" style={{ borderColor: c.colorBc, background: `${c.colorBc}14` }}>
          <div className="text-xs font-bold uppercase tracking-wider" style={{ color: c.colorBc }}>Domeny rozgłoszeniowe (dla 4 portów)</div>
          <div className="text-sm font-bold mt-1">{c.bc}</div>
        </div>
      </div>

      <div className="card-subtle p-3.5 text-sm text-[var(--text-secondary)]">
        <strong className="text-[var(--text)]">Wniosek egzaminacyjny: </strong>
        {c.note}
      </div>
    </div>
  );
}

// 7. VLAN 802.1Q Tag Anatomy
function Vlan8021qDiagram() {
  const parts = [
    { id: 'tpid', name: 'TPID (Tag Protocol ID)', size: '16 bitów (2 B)', val: '0x8100', color: '#2563eb', desc: 'Stała wartość 0x8100 informująca przełącznik, że ramka zawiera 4-bajtowy znacznik VLAN IEEE 802.1Q.' },
    { id: 'pri', name: 'Priorytet (IEEE 802.1p)', size: '3 bity', val: '0 – 7', color: '#059669', desc: 'Określa priorytet klasy ruchu (QoS) — np. wyższy priorytet dla ruchu głosowego VoIP.' },
    { id: 'cfi', name: 'CFI (Canonical Format)', size: '1 bit', val: '0 (Eth) / 1 (TR)', color: '#d97706', desc: 'Wskazuje technologię LAN: 0 dla sieci Ethernet, 1 dla sieci Token Ring.' },
    { id: 'vid', name: 'VLAN ID (VID)', size: '12 bitów', val: '1 – 4094', color: '#7c3aed', desc: 'Jednoznaczny identyfikator sieci VLAN (0 = brak VLAN, 1 = domyślny/mosty, 0xFFF = zarezerwowane → 4094 sieci VLAN).' },
  ];
  const [sel, setSel] = useState('vid');
  const active = parts.find((p) => p.id === sel) || parts[3];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-6 gap-1 text-center text-xs font-mono">
        <div className="p-2 rounded bg-[var(--bg-subtle)] border border-[var(--border)]">DA (6 B)</div>
        <div className="p-2 rounded bg-[var(--bg-subtle)] border border-[var(--border)]">SA (6 B)</div>
        <div className="p-2 rounded bg-[var(--accent)] text-white font-bold col-span-2">Znacznik 802.1Q (4 B)</div>
        <div className="p-2 rounded bg-[var(--bg-subtle)] border border-[var(--border)]">Typ/Dł. (2 B)</div>
        <div className="p-2 rounded bg-[var(--bg-subtle)] border border-[var(--border)]">Dane + FCS</div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {parts.map((p) => {
          const isAct = p.id === sel;
          return (
            <button
              key={p.id}
              onClick={() => setSel(p.id)}
              style={{
                borderColor: isAct ? p.color : 'var(--border)',
                background: isAct ? `${p.color}20` : 'var(--bg-elevated)',
              }}
              className="p-2.5 rounded-xl border text-left cursor-pointer transition-all"
            >
              <div className="text-xs font-bold" style={{ color: p.color }}>{p.name}</div>
              <div className="text-xs font-mono mt-1">{p.size}</div>
              <div className="text-[11px] font-mono text-[var(--text-muted)]">{p.val}</div>
            </button>
          );
        })}
      </div>
      <div className="card-subtle p-3.5 text-sm text-[var(--text-secondary)]">
        <strong className="text-[var(--text)]">{active.name}: </strong>
        {active.desc}
      </div>
    </div>
  );
}

// 8. NAT / PAT Flow Diagram
function NatPatDiagram() {
  const [host, setHost] = useState('A');
  const rows = [
    { id: 'A', priv: '192.168.1.10 : 51001', pub: '83.14.22.5 : 40001', dst: '150.254.5.10 : 443' },
    { id: 'B', priv: '192.168.1.11 : 51001', pub: '83.14.22.5 : 40002', dst: '150.254.5.10 : 443' },
  ];

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {rows.map((r) => (
          <button
            key={r.id}
            onClick={() => setHost(r.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border cursor-pointer ${
              host === r.id
                ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border)]'
            }`}
          >
            Śledź sesję Host {r.id} ({r.priv})
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs sm:text-sm border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)] text-left text-[var(--text-muted)]">
              <th className="py-2 px-3">Host LAN</th>
              <th className="py-2 px-3">Adres prywatny : port</th>
              <th className="py-2 px-3">Po translacji PAT (1 publiczne IP!)</th>
              <th className="py-2 px-3">Serwer docelowy</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                className={`border-b border-[var(--border)] font-mono ${
                  host === r.id ? 'bg-[var(--accent-soft)] font-semibold' : ''
                }`}
              >
                <td className="py-2.5 px-3 font-sans">Host {r.id}</td>
                <td className="py-2.5 px-3 text-blue-600 dark:text-blue-300">{r.priv}</td>
                <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400">{r.pub}</td>
                <td className="py-2.5 px-3 text-[var(--text-secondary)]">{r.dst}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-[var(--text-muted)] m-0">
        Zauważ: oba komputery wylosowały ten sam port źródłowy <code className="prose-code">51001</code>, ale router PAT przepisał je na różne porty publiczne (<code className="prose-code">40001</code> vs <code className="prose-code">40002</code>), dzięki czemu po powrocie odpowiedzi z Internetu dokładnie wie, do którego komputera ją odesłać!
      </p>
    </div>
  );
}

const REGISTRY = {
  'osi-vs-tcpip': { icon: Layers, Component: OsiVsTcpIpDiagram, kind: 'Schemat sieciowy' },
  'ipv4-header': { icon: Network, Component: Ipv4HeaderDiagram, kind: 'Schemat nagłówka' },
  'tcp-header': { icon: Cpu, Component: TcpHeaderDiagram, kind: 'Schemat nagłówka' },
  'three-way-handshake': { icon: Network, Component: ThreeWayHandshakeDiagram, kind: 'Diagram sekwencji' },
  'structured-cabling': { icon: Layers, Component: StructuredCablingDiagram, kind: 'Schemat fizyczny' },
  'domains-compare': { icon: Shield, Component: DomainsCompareDiagram, kind: 'Porównanie topologii' },
  'vlan-8021q': { icon: Layers, Component: Vlan8021qDiagram, kind: 'Schemat ramki' },
  'nat-pat': { icon: Shield, Component: NatPatDiagram, kind: 'Schemat translacji' },
  ...Object.fromEntries(
    Object.entries(MATH_DIAGRAM_REGISTRY).map(([id, def]) => [
      id,
      { icon: LineChart, Component: def.Component, kind: 'Wykres / rysunek' },
    ])
  ),
  ...Object.fromEntries(
    Object.entries(PROB_DIAGRAM_REGISTRY).map(([id, def]) => [
      id,
      { icon: BarChart3, Component: def.Component, kind: 'Wykres probabilistyczny' },
    ])
  ),
  ...Object.fromEntries(
    Object.entries(ALG_DIAGRAM_REGISTRY).map(([id, def]) => [
      id,
      { icon: Sigma, Component: def.Component, kind: 'Schemat algebraiczny' },
    ])
  ),
  ...Object.fromEntries(
    Object.entries(AISD_DIAGRAM_REGISTRY).map(([id, def]) => [
      id,
      { icon: GitBranch, Component: def.Component, kind: 'Schemat algorytmiczny' },
    ])
  ),
  ...Object.fromEntries(
    Object.entries(PHYS_DIAGRAM_REGISTRY).map(([id, def]) => [
      id,
      { icon: Atom, Component: def.Component, kind: 'Schemat fizyczny' },
    ])
  ),
};

export function InteractiveDiagram({ diagramId, title, caption }) {
  const entry = REGISTRY[diagramId];
  if (!entry) return null;
  const Icon = entry.icon;
  const Comp = entry.Component;

  return (
    <figure className="my-5 rounded-md border border-[var(--border)] bg-[var(--bg-elevated)] overflow-hidden">
      <div className="px-4 py-2.5 border-b border-[var(--border)] bg-[var(--bg-subtle)] flex items-center gap-2.5">
        <Icon className="w-4 h-4 text-[var(--accent)] shrink-0" />
        <div className="min-w-0">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
            {entry.kind}
          </div>
          {title && (
            <figcaption className="text-sm font-semibold text-[var(--text-primary)] leading-snug">
              {renderMathTitle(title)}
            </figcaption>
          )}
        </div>
      </div>
      <div className="p-4 sm:p-5">
        <Comp />
        {caption && <p className="text-xs text-[var(--text-muted)] mt-3 mb-0">{renderMathTitle(caption)}</p>}
      </div>
    </figure>
  );
}
