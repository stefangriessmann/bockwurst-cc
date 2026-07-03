# bockwurst.cc – Projektstatus & Wiedereinstieg

> Stand: 2026-07-03. **Zweck:** verlustfreier Wiedereinstieg (neue Session / nach Kontext-Zusammenfassung). Kurz & aktuell halten.

## Wo wir stehen
- **TYPO3 v14.3.4** lokal via **DDEV**, läuft unter `https://bockwurst-cc.ddev.site/`.
- **bockwurst-Theme** (`packages/bockwurst_sitepackage/`) auf **Bootstrap Package**: eigener **Rahmen rendert** (Header mit Logo-SVG + Slim-Footer „Kein Tracking …"), **Schriften self-hosted**, **Design-Tokens**, eigenes Page-Template.
- **Tourenportal-Kern steht** (2026-07-03): 9 kuratierte Touren als `public/data/touren/<id>.json`+`.gpx` (Strava via MCP, res=300, downsampled). Drei Custom-CEs im Sitepackage: **`bockwurst_tourstats`** (Eckdaten), **`bockwurst_tourmap`** (Leaflet-Karte + Höhenprofil-SVG), **`bockwurst_tourvideo`** (2-Klick-YouTube, kein Embed/Consent). Gemeinsamer `TourDataProcessor` (DI) liest die JSON; Feld `tx_bockwurst_strava_id` an tt_content **und pages**. Leaflet **self-hosted**, Assets bedingt via `f:asset`.
- **Tour-Seitenlayout** (`backend_layout` „tour" → `Tour.html`): Hero (einziges `<h1>`, Region/Datum/Flag/Schwierigkeit aus Strava, Hero-Bild aus Seiten-Medium mit Gradient-Fallback), **1080px-Spalte**, `Article`-JSON-LD, Landmarks, vertikaler Rhythmus, Prose-Maß. Beispielseite **MSR300** unter `/tour-msr300` (Seite uid 2, Layout „tour", Strava-ID als Seiteneigenschaft): Hero → Stats → Karte+Höhenprofil → Video → Bericht. Serverseitig verifiziert (1× h1, JSON-LD, 0 Exceptions).
- **Design-Feedback R1** (`Downloads/FEEDBACK-tour-detail.md`) abgearbeitet: Bug km-/Höhen-Label gefixt; 1080-Spalte, Reihenfolge, ein h1, JSON-LD, Prose, Video-Block erledigt. **Offen (brauchen Assets):** Hero-**Foto**, Galerie-**Fotos** (Upload; kein Strava-Foto-Endpoint), **Spotify-Playlist-URL** (Embed/Klick-zum-Laden), Highlights-Texte, echter Bericht-Text; dazu Motion/Scroll-Reveal.
- **Design-Pipeline**: Handoff + Konzepte in `design/`; Claude Design **liest** Repo, Claude Code **schreibt**. Neues Design: ZIP herunterladen → nach `design/` committen.
- Alles auf GitHub `stefangriessmann/bockwurst-cc`, Branch **`main`** (einziger Branch). Repo ist **öffentlich** (für Claude-Design-Zugriff; Secrets sauber, lokales BE-PW rotiert). Letzte Commits: Tour-Layout (`d75f46b`), Video-CE (`3080440`).

## Nächster Bau-Schritt (Kern + Layout erledigt – Ausbau)
**MSR300 fertigstellen** (Design-Feedback R1) – die noch offenen Blöcke brauchen Assets von Stefan:
1. **Hero-Foto** (Seiten-Medium der Tour-Seite) + **Galerie-Fotos** (Upload → BSP `Gallery` + Lightbox, Captions).
2. **Consent-Tool aufsetzen** (offene Entscheidung: BSP-eigenes `cookie-consent` vs. `sg_cookie_optin`, siehe Cookie-Inventar), dann:
   - **YouTube**: echtes Embed + Vorschau **gated über Consent** (Entscheidung 2026-07-03, ersetzt das aktuelle 2-Klick-Link-only-`bockwurst_tourvideo`-CE).
   - **Soundtrack**: Spotify-Playlist-URL → Player-Embed, ebenfalls consent-gated.
3. **Highlights**-Karten (BSP `Bullets`/`IconGroup`, direkt unter Hero) + echter **Bericht-Text**.
4. **Motion** (Scroll-Reveal, `prefers-reduced-motion`), DE/EN für neue Blöcke.
**Dann:** restliche 8 Tour-Seiten (Datendateien liegen vor; #7/#8 YT-IDs fehlen) · Touren-Übersicht/Grid (BSP `MenuCardList`) · Startseite (Design von Claude Design).

## Wiedereinstieg – so läuft die Umgebung wieder
- **DDEV starten:** neues Terminal → `cd C:\Users\stefan.griessmann\claude\bockwurst-cc` → `ddev start` (Container liegen auf Platte). `ddev launch typo3` öffnet das Backend.
- **Backend-Login (lokal):** User `admin`. **Passwort bewusst NICHT im Repo** (Repo kann öffentlich werden) — lokal separat notiert. Neu/zurücksetzen: `ddev exec vendor/bin/typo3 setup ... --admin-user-password=...`.
- **git/gh:** `gh` unter `C:\Program Files\GitHub CLI\gh.exe`, benutzerweit eingeloggt (keyring, stefangriessmann). Push/pull laufen. Details: Memory `bockwurst-deploy-environment`.
- **Strava-MCP:** in dieser Session verbunden (Stefan Griessmann). ⚠️ **Kann in einer neuen Session Re-Auth brauchen** — dann Strava-Connector neu verbinden, bevor Tour-Daten geholt werden.
- **Sprache Deutsch (2026-07-03):** Site-Standardsprache (Sprache 0) = `Deutsch`/`de_DE.UTF-8` (`config/sites/main/config.yaml`, committed). Deutsche Label-Pakete liegen versioniert unter `var/labels/de` (Ignore-Ausnahme `!/var/labels`) → BE-Oberfläche ist auch auf frischem Checkout deutsch. Admin: `be_users.lang='de'` (DB, nicht versioniert – neue BE-User in den Benutzereinstellungen auf Deutsch stellen). Label-Pakete aktualisieren: `LANG/availableLocales=['de']` in `config/system/settings.php` (git-ignoriert) + `ddev exec vendor/bin/typo3 language:update de`.

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
