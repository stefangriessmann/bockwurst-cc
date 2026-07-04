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

## CE-Baukasten (Sitepackage, alle datengetrieben aus data/touren/<id>.json)
`bockwurst_tourhighlights` (Karten km/Titel/Text) · `bockwurst_tourstats` (Eckdaten) · `bockwurst_tourmap` (Leaflet+Höhenprofil) · `bockwurst_tourvideo` (YouTube Click-to-Load) · `bockwurst_toursound` (Spotify Click-to-Load). Bericht = BSP `text`. Reihenfolge MSR300: Hero → Stats → Highlights → Karte → Video → Soundtrack → Bericht.

## Consent (entschieden 2026-07-04): kein Cookie-Banner
`sg_cookie_optin` verworfen (Dateigenerierung lizenzpflichtig), **BSP-`cookie-consent` deaktiviert** (`page.theme.cookieconsent.enable: false`) — Seite setzt keine nicht-essenziellen Cookies. Externe Medien per **Click-to-Load** (gemeinsames `tour-embed.js`, `[data-embed-src]`, lädt erst auf Klick). Footer-Claim „Kein Tracking/Keine Cookies" entfernt (nur „Werbefrei"). Karten-Tiles (CARTO) laden weiter beim Aufruf (bewusst akzeptiert; optional später Click-to-Load/Tile-Proxy).

## Stand: MSR300-Detailseite KOMPLETT (Design-Feedback R1 durch)
Reihenfolge Hero(Foto IMG_3584) → Stats → Highlights → Karte+Höhenprofil → Video → Soundtrack → Bericht → Galerie(9 Fotos+Lightbox). CE-Baukasten inkl. `bockwurst_tourgallery` (Lightbox via `tour-gallery.js`, liest `gallery`-Array). Hero liest `tour.hero_image` (Fallback Seiten-Medium → Gradient).
**Fotos:** liegen in `fileadmin/user_upload/` (IMG_35xx/36xx), **nicht in git** (`/public/*` ignoriert; Media wird beim Deploy separat synchronisiert), per direkter URL aus der JSON referenziert. Chat-Uploads landen NICHT automatisch in fileadmin → Redakteur/Stefan lädt hoch.
**Noch von Stefan ersetzbar (Platzhalter):** Highlights-Texte (JSON `highlights`).

## Nächster Bau-Schritt
- **Restliche 8 Tour-Seiten** anlegen (Datendateien + youtube_id liegen vor; #7/#8 YT-IDs fehlen, Spotify/Highlights/Fotos je Tour optional). Muster: Seite mit backend_layout „tour" + Strava-ID als Seiteneigenschaft + die Tour-CEs.
- **Touren-Übersicht/Grid** (BSP `MenuCardList`) auf Startseite/Portalseite.
- **Startseite** (braucht Design von Claude Design).
- Optional: Karten-Tiles Click-to-Load/Proxy; DE/EN-Zweitsprache.

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
