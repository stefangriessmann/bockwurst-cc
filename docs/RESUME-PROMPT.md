# Wiedereinstieg auf neuem Rechner — Ablage, Installation & Initial-Prompt

> Schnellstart für die Weiterarbeit von einem anderen Rechner / Claude-Account (z. B. Urlaub).
> Volle Referenz: [`HANDOVER.md`](HANDOVER.md). Laufender Stand: [`STATUS.md`](STATUS.md) (je Projekt).

## 1. Ablage (empfohlen)
Ein Arbeitsordner, beide Repos nebeneinander, die zwei Transfer-Dateien (aus Google Drive) in `_transfer/`:
```
<Arbeitsordner>/            z. B. C:\dev\bockwurst\   (Mac/Linux: ~/bockwurst/)
├── bockwurst-cc/           ← git clone (TYPO3-Website)
├── sport-events/           ← git clone (Event-Guide)
└── _transfer/              ← die 2 Dateien aus Google Drive
    ├── bockwurst-db.sql.gz          (TYPO3-Inhalt/DB – nicht in git)
    └── bockwurst-fileadmin.tgz      (Fotos/fileadmin – nicht in git)
```

## 2. Installation (einmalig)
Voraussetzungen: **Docker Desktop, DDEV, git, gh** (`gh auth login` mit deinem GitHub-Account `stefangriessmann`).
```bash
cd <Arbeitsordner>
git clone https://github.com/stefangriessmann/bockwurst-cc
git clone https://github.com/stefangriessmann/sport-events

cd bockwurst-cc
ddev start
ddev composer install
ddev import-db --file=../_transfer/bockwurst-db.sql.gz     # TYPO3-Inhalt (Home, 9 Touren, /touren, /impressum, /datenschutz)
tar xzf ../_transfer/bockwurst-fileadmin.tgz -C public      # Fotos → public/fileadmin/
ddev exec vendor/bin/typo3 extension:setup                  # v14 Schema-Migration (NICHT database:updateschema)
ddev exec vendor/bin/typo3 cache:flush
# BE-Admin-Passwort lokal neu setzen – exakter Befehl in STATUS.md „Wiedereinstieg"
```
Prüfen: `curl -k https://bockwurst-cc.ddev.site/` (Frontend serverseitig prüfen; der Automations-/In-App-Browser scheitert am DDEV-Self-Signed-Zertifikat → im eigenen Browser ansehen). **sport-events** braucht keine Installation (statisch; Deploy via Netlify bei Push).

Die zwei Transfer-Dateien nach dem Import **nicht** ins Repo legen (bewusst außerhalb von git).

## 3. Initial-Prompt (in Claude einfügen — gestartet im `<Arbeitsordner>`)
```text
Projekt „bockwurst.cc" – ich arbeite von einem anderen Rechner/Account weiter.
Es gibt ZWEI Projekte nebeneinander in diesem Ordner:
- bockwurst-cc/   = TYPO3-v14-Website, lokal via DDEV (noch nicht deployed)
- sport-events/   = Event-Guide, statische Site, LIVE auf Netlify (bockwurst.cc)

SCHRITT 0 – Kontext einlesen (zuerst, nichts anderes tun):
1) bockwurst-cc/docs/HANDOVER.md   (Wiedereinstieg von fremdem Rechner – START HIER)
2) bockwurst-cc/docs/STATUS.md     (laufender Stand TYPO3)
3) bockwurst-cc/CLAUDE.md          (Governance/Regeln)
4) sport-events/docs/STATUS.md     (laufender Stand Event-Guide)
   sport-events/docs/TECHNISCHE-DOKUMENTATION.md (Deploy-Flow §6)
Deine Projekt-Memories fehlen auf diesem Account – die o. g. Dateien sind die Wahrheit.

SCHRITT 1 – Umgebung prüfen (nicht neu aufsetzen, nur verifizieren):
- bockwurst-cc: `ddev start`, dann `curl -k https://bockwurst-cc.ddev.site/` (HTTP 200?).
  DB-Inhalt + Fotos wurden aus ../_transfer importiert (siehe HANDOVER Schritt 4).
  Frontend serverseitig per `curl -k` prüfen (Automations-Browser scheitert am DDEV-Zertifikat).
  Kein python/node/jq auf dem Host → `ddev exec php`.
- sport-events: rein statisch; Deploy via Netlify bei Push (main=Live, staging=Staging).

REGELN: nah am TYPO3-Core, wenige Extensions; Secrets nie committen (config/system/settings.php
ist git-ignoriert); nach jedem sinnvollen Schritt committen + nach origin/main pushen;
STATUS.md am Ende pflegen; Zeitzone Europe/Berlin.

Bitte lies zuerst die vier Dateien, fasse mir den aktuellen Stand + die offenen Aufgaben
beider Projekte in 5–8 Zeilen zusammen, prüfe kurz die Umgebung – und warte dann auf meine Aufgabe.
```

## 4. Zugänge (Werte nicht hier — hol sie dir)
- **GitHub** `stefangriessmann` (Push-Recht) → `gh auth login`.
- **Netlify** (Site `bockwurst-events`) → nur nötig, falls ein Event-Guide-Deploy klemmt (Deploy-Log/Env-Vars/Plugins).
- **TYPO3-BE-Passwort**: lokal neu setzen (s. o.). **Strava-MCP**: nur für neue Tourdaten neu verbinden.
