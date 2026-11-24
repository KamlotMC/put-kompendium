# PUT Kompendium — Semestr I (MiKC / ICT)

Kompletna, samowystarczalna platforma webowa do nauki wszystkich **6 przedmiotów I semestru Politechniki Poznańskiej**:

| Przedmiot | Rozdziały | Zagadnienia | Fiszki (SM-2) | Quizy | Słownik | Moduł interaktywny |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Wprowadzenie do sieci komputerowych** | 9 | 60 | 76 | 70 | 32 | Trener podsieci IPv4 |
| **Analiza matematyczna** | 9 | 30 | 66 | 52 | 32 | Laboratorium wykresów |
| **Probabilistyka** | 6 | 25 | 48 | 44 | 28 | Laboratorium rozkładów i Bayesa |
| **Algebra liniowa dla ICT** | 6 | 24 | 48 | 44 | 26 | Laboratorium algebry ($\mathbb{C}$, macierze) |
| **Algorytmy i struktury danych (AiSD)** | 8 | 28 | 56 | 48 | 30 | Laboratorium AiSD (sortowanie, AVL, numeryka) |
| **Fizyka** | 5 | 20 | 40 | 36 | 24 | Laboratorium fizyki (wektory, rzuty, niepewności) |
| **Łącznie** | **43** | **187** | **334** | **294** | **172** | **6 laboratoriów + 46 schematów SVG** |

---

## Wymagania

- **Node.js >= 22.13** (zalecane **Node 24 LTS** lub nowszy — korzysta z wbudowanego modułu `node:sqlite`, bez potrzeby kompilacji natywnych rozszerzeń C++).
- Frontend zbudowany w **React 19 + Vite + Tailwind CSS + KaTeX**, serwowany bezpośrednio przez jeden lekki serwer **Express 5 + SQLite (WAL)**.

---

## Uruchomienie lokalne

```bash
npm install
npm run build
npm start
```

Aplikacja uruchomi się pod adresem `http://127.0.0.1:3456`. Przy pierwszym starcie baza SQLite (`data/study.db`) tworzy się i zasila automatycznie (`seedDatabase` jest idempotentne).

W trybie deweloperskim (hot-reload backend + Vite):

```bash
npm run dev
```

Uruchomienie testów automatycznych (API, integralność treści, diagramów, obrazków i SQLite):

```bash
npm run test:api
```

---

## Opcje hostowania (produkcja)

### 1. Docker / Docker Compose (najprostsza na VPS, serwerze domowym lub NAS)

```bash
docker compose up -d --build
```

- Aplikacja słucha na porcie `3456` (można zmienić przez `PORT=8080 docker compose up -d`).
- Postępy nauki (SQLite) zapisują się w trwałym wolumenie `study_data` (`/app/data/study.db`) — nie znikną po przebudowaniu obrazu.
- Wbudowany `HEALTHCHECK` monitoruje `/api/health`.

### 2. Własny VPS (Linux + systemd + automatyczny HTTPS przez Caddy)

1. Skopiuj projekt do `/opt/put-kompendium` i zbuduj:
   ```bash
   cd /opt/put-kompendium
   npm ci
   npm run build
   mkdir -p data
   sudo chown -R www-data:www-data /opt/put-kompendium
   ```
2. Zainstaluj usługę `systemd` z [`deploy/put-kompendium.service`](./deploy/put-kompendium.service):
   ```bash
   sudo cp deploy/put-kompendium.service /etc/systemd/system/
   sudo systemctl daemon-reload
   sudo systemctl enable --now put-kompendium
   ```
3. Skonfiguruj reverse proxy z automatycznym certyfikatem Let's Encrypt używając [`deploy/Caddyfile`](./deploy/Caddyfile) (podmień domenę `kompendium.twojadomena.pl` na swoją) i przeładuj Caddy:
   ```bash
   sudo systemctl reload caddy
   ```

### 3. PaaS w chmurze (Render / Railway / Fly.io)

- **Render:** wgraj repozytorium na GitHub/GitLab i użyj gotowego pliku [`render.yaml`](./render.yaml) (*New → Blueprint*). Uruchamia obraz z `Dockerfile` i podpina dysk trwały pod `/app/data`.
- **Railway / Fly.io:** wystarczy wskazać repozytorium z `Dockerfile`, podpiąć wolumen pod `/app/data` i ustawić zmienne:
  - `NODE_ENV=production`
  - `HOST=0.0.0.0`
  - `TRUST_PROXY=true`
  - `STUDY_DB_PATH=/app/data/study.db`

### 4. Natychmiastowe udostępnienie znajomym bez VPS (Cloudflare Tunnel)

Jeśli chcesz od razu wystawić działającą lokalnie instancję pod publicznym adresem HTTPS (bez przekierowywania portów na routerze):

```bash
# Terminal 1 — uruchom zbudowaną platformę
npm run build && npm start

# Terminal 2 — wystaw publiczny adres https://....trycloudflare.com
cloudflared tunnel --url http://127.0.0.1:3456
```

---

## Zmienne środowiskowe (`.env.example`)

| Zmienna | Domyślnie | Opis |
| :--- | :--- | :--- |
| `PORT` | `3456` | Port HTTP serwera |
| `HOST` | `127.0.0.1` (`0.0.0.0` w prod) | Adres nasłuchu |
| `STUDY_DB_PATH` (lub `DB_PATH`) | `./data/study.db` | Ścieżka do pliku bazy SQLite |
| `TRUST_PROXY` | `false` | Ustaw `true` za Caddy/Nginx/Cloudflare/Render |
| `CORS_ORIGIN` | `*` | Dozwolone domeny CORS (rozdzielone przecinkami) |

---

## Kopia zapasowa postępów

- W lewym dolnym rogu aplikacji dostępny jest przycisk **Eksportuj kopię zapasową (JSON)** (endpoint `GET /api/backup`).
- Na serwerze wystarczy kopiować plik bazy danych (`data/study.db`). Przy zatrzymaniu serwera (`SIGTERM`/`SIGINT`) serwer wykonuje bezpieczne `PRAGMA wal_checkpoint(TRUNCATE)` przed zamknięciem połączenia.
