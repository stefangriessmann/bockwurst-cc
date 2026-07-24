# bockwurst.cc — Handover (Weiterarbeit von anderem Rechner / Claude-Account)

> Zweck: nahtlos an **beiden** Projekten weiterarbeiten, wenn du NICHT an diesem Rechner/Account bist
> (z. B. Urlaub, privater Claude-Account). Ergänzt die beiden `docs/STATUS.md` (= laufende Wahrheit je Projekt).
> Stand: 2026-07-20. Enthält **keine Secrets** (Repos sind öffentlich).

## 0. So startest du mit Claude (privater Account)
Sag Claude zu Beginn sinngemäß:
> „Projekt bockwurst.cc. Lies zuerst `docs/HANDOVER.md`, dann `docs/STATUS.md` (bockwurst-cc) und `docs/STATUS.md` (sport-events). Dann warte auf meine Aufgabe."

⚠️ **Claudes Projekt-Memories sind account-/rechner-lokal** und fehlen auf dem privaten Account. Diese Datei + die STATUS-Dateien ersetzen sie — deshalb sind hier alle wichtigen Fakten zusammengefasst.

## 1. Die zwei Projekte (beide GitHub, public, Branch `main`)
| Projekt | Was | Repo | Live? | Laufende Wahrheit |
|---|---|---|---|---|
| **bockwurst-cc** | TYPO3-v14-Website, lokal via DDEV | `stefangriessmann/bockwurst-cc` | **nein** (nur lokal; Deployment = Phase 2 offen) | `docs/STATUS.md` |
| **sport-events** | Event-Guide (statische Site) | `stefangriessmann/sport-events` | **ja**, Netlify → **bockwurst.cc** | `docs/STATUS.md` (+ `docs/TECHNISCHE-DOKUMENTATION.md`) |

sport-events hat zwei Branches: **`main` = Live**, **`staging` = Staging-Subdomain**.

## 2. Zugänge, die du brauchst (Werte hier bewusst NICHT — hol sie dir)
- **GitHub** `stefangriessmann` (Push-Recht) → `gh auth login`.
- **Netlify** (Team „stefan-griessmann's team", Site `bockwurst-events`) → für Deploy-Logs, Env-Vars, Plugins/Extensions. Wichtig zur Fehlersuche bei Deploys.
- **TYPO3-Backend-Admin-Passwort** (lokal, NICHT im Repo) → auf neuem Rechner neu setzen (s. u.).
- **Strava** (nur falls neue Tourdaten): Strava-MCP-Connector im Claude-Account neu verbinden.
- Netlify-Env-Vars (bereits in Netlify gesetzt, nicht im Repo): `GITHUB_ISSUES_TOKEN` (Event-Einreichung → GitHub-Issue), `RESEND_API_KEY` (Scraper-Ergebnis-Mails).

## 3. ⚠️ VOR der Abreise an DIESEM Rechner erledigen (sonst kein nahtloser TYPO3-Start!)
Der **TYPO3-Seiteninhalt liegt in der DDEV-Datenbank, NICHT in git**, ebenso die **Fotos** in `public/fileadmin/`. Ohne diese hast du auf dem neuen Rechner ein leeres TYPO3.
```bash
cd bockwurst-cc
ddev export-db --file=../bockwurst-db.sql.gz          # DB-Dump (Home, 9 Touren, /touren, /impressum, /datenschutz + alle CEs)
tar czf ../bockwurst-fileadmin.tgz public/fileadmin    # Fotos (Tour-Hero/Galerie) – nicht in git
```
Beide Dateien mitnehmen (USB/Cloud) — **nicht** ins öffentliche Repo committen.

## 4. bockwurst-cc auf neuem Rechner aufsetzen
Voraussetzungen: **Docker Desktop**, **DDEV**, git, gh. (Falls Docker aus: Docker Desktop starten, dann `ddev start`.)
```bash
git clone https://github.com/stefangriessmann/bockwurst-cc && cd bockwurst-cc
ddev start                                   # erzeugt Container + config/system/settings.php (encryptionKey/DB) neu
ddev composer install                        # falls vendor/ fehlt
ddev import-db --file=/pfad/bockwurst-db.sql.gz         # ← Inhalt aus Schritt 3
tar xzf /pfad/bockwurst-fileadmin.tgz                    # Fotos zurück nach public/fileadmin/
ddev exec vendor/bin/typo3 extension:setup              # v14: Schema-Migration (NICHT database:updateschema)
ddev exec vendor/bin/typo3 cache:flush
# BE-Admin-Passwort neu setzen (lokal):
ddev exec vendor/bin/typo3 setup --no-interaction --admin-username=admin --admin-user-password='<neu>' --create-site=0 || \
  ddev exec vendor/bin/typo3 backend:user:create ...    # exakter Befehl siehe STATUS.md „Wiedereinstieg"
```
- Frontend prüfen: `curl -k https://bockwurst-cc.ddev.site/` — **der Automations-/In-App-Browser scheitert am DDEV-Self-Signed-Zertifikat**; visuell im eigenen Browser prüfen.
- Backend: `ddev launch typo3`.

## 5. sport-events (Event-Guide) — Weiterarbeit
```bash
git clone https://github.com/stefangriessmann/sport-events && cd sport-events
```
- **Statische Site, KEIN Build.** Bearbeitet werden: `index.html`, `data/*.json`, `scripts/` (Python-Scraper), `netlify/functions/`.
- **Deploy-Flow (Netlify, Doku §6):** Push auf `main` → **Live** (bockwurst.cc); Push auf `staging` → Staging. Empfohlen: erst `staging` pushen, E2E (Playwright) grün abwarten, dann `git checkout main && git merge --ff-only staging && git push`. Für kleine, sichere Fixes ist auch direkt auf `main` ok (der Scraper-Bot pusht auch direkt auf main).
- **Datenpipeline:** GitHub-Actions-Cron (weekly **Mo 03:00 UTC**, monthly **1. 05:00 UTC**) scraped → committet `data/*.json` auf `main` → Netlify deployt. **Verlass dich nicht allein auf den Cron** (GitHub überspringt `schedule` gern). Manuell anstoßen:
  `gh workflow run weekly_update.yml -R stefangriessmann/sport-events --ref main` — dann `gh run watch <id>`.
- **E2E:** Playwright-Tests laufen nach Push auf `main`/`staging` (nicht bei Bot-`GITHUB_TOKEN`-Pushes → Daten-Deploys triggern kein E2E).
- **Staging = Live nachziehen** (ohne lokalen Klon anzufassen): `git push --force-with-lease origin origin/main:staging`.

## 6. Aktueller Stand (Kurz — Details in den STATUS.md)
- **TYPO3 (bockwurst-cc):** Startseite komplett — Hero · Touren-Grid · 6 Points (Live-Countdown) · Events (echte Daten aus Snapshot) · Shorts (Embeds) · Über · Footer. Zusätzlich `/touren`-Übersicht, `/impressum`, `/datenschutz`, Favicon v2 (freigestellt + maskable). Consent: **direkte youtube-nocookie-Embeds** (consent-frei ist KEIN Muss mehr). **Noch nicht deployed.**
- **Event-Guide (sport-events):** LIVE. Daten Stand 20.07. Datumsfilter (keine vergangenen Events), „Letzte Aktualisierung"-Footer, **selbstaktualisierende „Neuestes Video"-Karte** (Netlify-Function `latest-video` ← YouTube-RSS). rad-net-Scraper mit gedeckeltem Backoff + `timeout-minutes: 30`.

## 7. Offene Aufgaben
**bockwurst-cc:** Zwift-Nav (braucht Zwift-Profil-URL) · PWA-`site.webmanifest` · „Meine Geschichte"-Seite (CTA in Über) · DE/EN-Zweitsprache · **Phase-2-Deployment: Hetzner-VPS (CX22) + Cloudflare, inkl. DB-Migration** (siehe `docs/TYPO3-SETUP-PLAN.md`).
**sport-events:** optional echte „neues Event"-Mail via **Resend** in `create-issue.js` (braucht `RESEND_API_KEY` als Netlify-Env-Var) · rad-net-Härtung, falls Voll-Blocks häufiger werden.

## 8. Wichtige Gotchas (kompakt)
- **Secrets nie committen** (`config/system/settings.php` ist git-ignoriert). Repos sind öffentlich.
- **Host hat kein python/node/jq** → im TYPO3-Projekt alles über `ddev exec …`; im Container erzeugte Dateien ggf. via stdout auf den Host leiten (Mutagen-Sync-Verzögerung).
- **Windows/CRLF**: git warnt „LF→CRLF" — harmlos.
- TYPO3 v14: Schema-Migration = `ddev exec vendor/bin/typo3 extension:setup` (+ `cache:flush`), **nicht** `database:updateschema`.
- Netlify: **`@netlify/plugin-emails` wurde entfernt** (hatte Deploys 6h hängen lassen → cancelled). Falls Deploys wieder scheitern → Netlify-Deploy-Log lesen (das ist die einzige Wahrheit; ohne Netlify-Zugang nicht diagnostizierbar).
- Frontend-Deploys von sport-events: nach Push „Published" im Netlify-Dashboard prüfen; normal in 1–3 min live.

## 9. Governance (bleibt gültig)
`CLAUDE.md`: nah am TYPO3-Core, wenige/aktiv gepflegte Extensions, `specification.website/spec` als Leitbild, offizielle TYPO3-Doku als primäre Quelle. Nach jedem sinnvollen Schritt committen + nach `origin/main` pushen. **STATUS.md am Ende pflegen.** Zeitzone Europe/Berlin. Zeit/Kosten in `CONTROLLING.md`.
