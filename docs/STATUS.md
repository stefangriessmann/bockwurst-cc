# bockwurst.cc – Projektstatus & Wiedereinstieg

> Stand: 2026-07-03. **Zweck:** verlustfreier Wiedereinstieg (neue Session / nach Kontext-Zusammenfassung). Kurz & aktuell halten.

## Wo wir stehen
- **TYPO3 v14.3.4** lokal via **DDEV**, läuft unter `https://bockwurst-cc.ddev.site/`.
- **bockwurst-Theme** (`packages/bockwurst_sitepackage/`) auf **Bootstrap Package**: eigener **Rahmen rendert** (Header mit Logo-SVG + Slim-Footer „Kein Tracking …"), **Schriften self-hosted**, **Design-Tokens**, eigenes Page-Template.
- **Tourenportal-Kern steht** (2026-07-03): 9 kuratierte Touren als `public/data/touren/<id>.json`+`.gpx` (Strava via MCP, res=300, downsampled). Zwei Custom-CEs im Sitepackage: **`bockwurst_tourstats`** (Eckdaten-Leiste) + **`bockwurst_tourmap`** (Leaflet-Karte + Höhenprofil-SVG). Gemeinsamer `TourDataProcessor` (DI) liest die JSON; Feld `tx_bockwurst_strava_id` an tt_content. Leaflet **self-hosted**, Assets bedingt via `f:asset`. Beispielseite **MSR300** unter `/tour-msr300` (Seite uid 2, 4 CEs) – Frontend serverseitig verifiziert (Stats/Höhenprofil-Kopf/Karten-JSON/GPX+JSON HTTP 200; alle 9 Payloads round-trip-valid).
- **Design-Pipeline**: Handoff + Konzepte in `design/`; Claude Design **liest** Repo, Claude Code **schreibt**. Neues Design: ZIP herunterladen → nach `design/` committen.
- Alles auf GitHub `stefangriessmann/bockwurst-cc`, Branch **`main`** (einziger Branch). Letzter Commit: Tourenportal (`79fbea4`).

## Nächster Bau-Schritt (Kern erledigt – Ausbau)
**Tourenportal ausbauen** (Details `UMSETZUNGS-KONZEPT.md` §3–5):
1. **MSR300-Seite vervollständigen**: Fotos/Galerie (BSP `Gallery`, Upload – kein Strava-MCP-Foto-Endpoint), YouTube (`YmrZUVxX2yw`) + Spotify via BSP `ExternalMedia` (Klick-zum-Laden), Hero/Rating/Vernetzung als Theme-CSS wie im Design (`tour-detail.html`).
2. **Restliche 8 Tour-Seiten** anlegen (IDs+YT in `sport-events/docs/TOUREN-KURATIERT.md`; #7/#8 YT-IDs fehlen noch). Datendateien liegen schon vor.
3. **Touren-Übersicht/Grid** (BSP `MenuCardList`) auf Startseite/Portalseite.
Alternativ: **Startseite** (braucht erst Design von Claude Design).

## Wiedereinstieg – so läuft die Umgebung wieder
- **DDEV starten:** neues Terminal → `cd C:\Users\stefan.griessmann\claude\bockwurst-cc` → `ddev start` (Container liegen auf Platte). `ddev launch typo3` öffnet das Backend.
- **Backend-Login (lokal):** `admin` / `BockwurstDev2026!` (nur lokal; bei Verlust neu setzbar via `ddev exec vendor/bin/typo3 setup ... --admin-user-password=...`).
- **git/gh:** `gh` unter `C:\Program Files\GitHub CLI\gh.exe`, benutzerweit eingeloggt (keyring, stefangriessmann). Push/pull laufen. Details: Memory `bockwurst-deploy-environment`.
- **Strava-MCP:** in dieser Session verbunden (Stefan Griessmann). ⚠️ **Kann in einer neuen Session Re-Auth brauchen** — dann Strava-Connector neu verbinden, bevor Tour-Daten geholt werden.
- **Sprache Deutsch (2026-07-03):** Site-Standardsprache (Sprache 0) ist `Deutsch`/`de_DE.UTF-8` (in `config/sites/main/config.yaml`, committed). BE-Oberfläche des Admins auf Deutsch (`be_users.lang='de'`). **Auf frischer Umgebung nötig** (settings.php ist git-ignoriert): `LANG/availableLocales=['de']` in `config/system/settings.php` setzen → `ddev exec vendor/bin/typo3 language:update de` → `cache:flush`.

## Wichtige Gotchas (auch im Projektgedächtnis)
- **Frame-Fix:** Nach `typo3 setup` erzeugte `config/sites/<id>/setup.typoscript` **löschen** — sie überschreibt sonst das Site-Set-`page`-Objekt (→ kein Rahmen). *(Bereits erledigt.)*
- **Secrets:** `config/system/settings.php` ist bewusst **git-ignoriert** (encryptionKey, DB) — nie committen.
- **Zeilenenden:** Editieren auf Windows kann CRLF erzeugen; bei „ganze Datei geändert"-Diffs `sed -i 's/\r$//'`.
- **DB-Migration/Cache (v14):** kein `database:updateschema` — nutze `ddev exec vendor/bin/typo3 extension:setup` (führt Schema-Migration) + `cache:flush`.
- **Tourdaten-Ort:** `public/data/touren/` (nicht Repo-Root). Grund: GPX/JSON web-served **und** committed. `.gitignore` hat dafür `!/public/data` (sonst schluckt `/public/*` alles). `TourDataProcessor` liest über `Environment::getPublicPath()`.
- **Frontend-Verifikation im Automations-Chrome:** scheitert am DDEV-Self-Signed-Zertifikat (isoliertes Profil vertraut mkcert-CA nicht; `file://`/`127.0.0.1` gesperrt). → Server-HTML per `curl -k` prüfen, visuell im **eigenen Browser** von Stefan. `python`/`node`/`jq` fehlen auf dem Host → für Skripting `ddev exec php` nutzen.
- **avg_watts:** MSR300 (`18715623879`) hat unbrauchbare Power-Daten (Stream fast nur 0) → in der JSON auf `null` gesetzt; die Stat-Leiste fällt dann ehrlich auf **Kalorien** zurück.

## Governance & Detaildocs (im Repo)
`CLAUDE.md` (Regeln/Leitbild/Quellen) · `docs/TYPO3-SETUP-PLAN.md` · `docs/UMSETZUNGS-KONZEPT.md` (Baustein-Wiederverwendung, Strava-Pfad) · `docs/COOKIE-CONSENT-INVENTORY.md` · `CONTROLLING.md` (Zeit/Kosten).

## Offene Kleinigkeiten
- Kosten-Controlling: **Abo-Modell** → keine €-Grenzkosten pro Projekt; Verbrauch = **Kontingent-Anteil** (App → Usage). Optional als %-Schnappschuss in `CONTROLLING.md`. (`/cost` zeigt nur die jeweilige Session, nicht projektweit.)
- Fotos fürs Tourenportal: kein Strava-MCP-Foto-Endpoint → separat (Upload).
