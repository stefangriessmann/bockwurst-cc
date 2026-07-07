# bockwurst.cc – Projektstatus & Wiedereinstieg

> Stand: 2026-07-07. **Zweck:** verlustfreier Wiedereinstieg (neue Session / nach Kontext-Zusammenfassung). Kurz & aktuell halten.

## Wo wir stehen
- **TYPO3 v14.3.4** lokal via **DDEV**, läuft unter `https://bockwurst-cc.ddev.site/`.
- **bockwurst-Theme** (`packages/bockwurst_sitepackage/`) auf **Bootstrap Package**: eigener **Rahmen rendert** (Header mit Logo-SVG + Footer-Partial), **Schriften self-hosted**, **Design-Tokens**, eigenes Page-Template.
- **Footer (2026-07-06):** Engagement-Band nach Homepage-Handoff — 6 Points (Markenbotschafter) + Triathlon Chemnitz (Mitglied/Aushilfstrainer), freigestellte White-Logos auf Schwarz (`Resources/Public/Images/*-white.png`), Spalten (Entdecken/Kanäle/Rechtliches), Leiste nur „© Stefan Grießmann · bockwurst.cc". Partial `Partials/Page/Footer.html` (Default+Tour), CSS in `bockwurst-tokens.css`. Nur DE; „Kein Tracking/Werbefrei" ganz raus.
- **Tourenportal-Kern steht** (2026-07-03): 9 kuratierte Touren als `public/data/touren/<id>.json`+`.gpx` (Strava via MCP, res=300, downsampled). Drei Custom-CEs im Sitepackage: **`bockwurst_tourstats`** (Eckdaten), **`bockwurst_tourmap`** (Leaflet-Karte + Höhenprofil-SVG), **`bockwurst_tourvideo`** (2-Klick-YouTube, kein Embed/Consent). Gemeinsamer `TourDataProcessor` (DI) liest die JSON; Feld `tx_bockwurst_strava_id` an tt_content **und pages**. Leaflet **self-hosted**, Assets bedingt via `f:asset`.
- **Tour-Seitenlayout** (`backend_layout` „tour" → `Tour.html`): Hero (einziges `<h1>`, Region/Datum/Flag/Schwierigkeit aus Strava, Hero-Bild aus Seiten-Medium mit Gradient-Fallback), **1080px-Spalte**, `Article`-JSON-LD, Landmarks, vertikaler Rhythmus, Prose-Maß. Beispielseite **MSR300** unter `/tour-msr300` (Seite uid 2, Layout „tour", Strava-ID als Seiteneigenschaft): Hero → Stats → Karte+Höhenprofil → Video → Bericht. Serverseitig verifiziert (1× h1, JSON-LD, 0 Exceptions).
- **Design-Feedback R1** (`Downloads/FEEDBACK-tour-detail.md`) abgearbeitet: Bug km-/Höhen-Label gefixt; 1080-Spalte, Reihenfolge, ein h1, JSON-LD, Prose, Video-Block erledigt. **Offen (brauchen Assets):** Hero-**Foto**, Galerie-**Fotos** (Upload; kein Strava-Foto-Endpoint), **Spotify-Playlist-URL** (Embed/Klick-zum-Laden), Highlights-Texte, echter Bericht-Text; dazu Motion/Scroll-Reveal.
- **Design-Pipeline**: Handoff + Konzepte in `design/`; Claude Design **liest** Repo, Claude Code **schreibt**. Neues Design: ZIP herunterladen → nach `design/` committen.
- Alles auf GitHub `stefangriessmann/bockwurst-cc`, Branch **`main`** (einziger Branch). Repo ist **öffentlich** (für Claude-Design-Zugriff; Secrets sauber, lokales BE-PW rotiert). Letzte Commits: Tour-Layout (`d75f46b`), Video-CE (`3080440`), Touren-Raster Startseite (`7c4de19`), 6-Points-Sektion (`3f3dcbc`).

## CE-Baukasten (Sitepackage, alle datengetrieben aus data/touren/<id>.json)
`bockwurst_tourhighlights` (Karten km/Titel/Text) · `bockwurst_tourstats` (Eckdaten) · `bockwurst_tourmap` (Leaflet+Höhenprofil) · `bockwurst_tourvideo` (YouTube Click-to-Load) · `bockwurst_toursound` (Spotify Click-to-Load). Bericht = BSP `text`. Reihenfolge MSR300: Hero → Stats → Highlights → Karte → Video → Soundtrack → Bericht.

## Consent (entschieden 2026-07-04): kein Cookie-Banner
`sg_cookie_optin` verworfen (Dateigenerierung lizenzpflichtig), **BSP-`cookie-consent` deaktiviert** (`page.theme.cookieconsent.enable: false`) — Seite setzt keine nicht-essenziellen Cookies. Externe Medien per **Click-to-Load** (gemeinsames `tour-embed.js`, `[data-embed-src]`, lädt erst auf Klick). Footer-Claim „Kein Tracking/Keine Cookies" entfernt (nur „Werbefrei"). Karten-Tiles (CARTO) laden weiter beim Aufruf (bewusst akzeptiert; optional später Click-to-Load/Tile-Proxy).

## Stand: MSR300-Detailseite KOMPLETT (Design-Feedback R1 durch)
Reihenfolge Hero(Foto IMG_3584) → Stats → Highlights → Karte+Höhenprofil → Video → Soundtrack → Bericht → Galerie(9 Fotos+Lightbox). CE-Baukasten inkl. `bockwurst_tourgallery` (Lightbox via `tour-gallery.js`, liest `gallery`-Array). Hero liest `tour.hero_image` (Fallback Seiten-Medium → Gradient).
**Fotos:** liegen in `fileadmin/user_upload/` (IMG_35xx/36xx), **nicht in git** (`/public/*` ignoriert; Media wird beim Deploy separat synchronisiert), per direkter URL aus der JSON referenziert. Chat-Uploads landen NICHT automatisch in fileadmin → Redakteur/Stefan lädt hoch.
**Noch von Stefan ersetzbar (Platzhalter):** Highlights-Texte (JSON `highlights`).

## Startseite (in Arbeit, inkrementell) — `backend_layout „home"` → `Home.html`
Spec: `design/design_handoff_bockwurst/HANDOFF-homepage.md` (+ `home.html`). Home-Seite (uid 1) auf Layout „home".
- **Increment 1 ✅ (2026-07-06):** Gerüst + **Hero** (Kicker, einziges h1, 2 CTAs, Count-up-Stats, MSR300-Tour-Karte mit echtem Bild) + Header-Nav + Sektions-Gerüst (Touren/6 Points/Events/Shorts/Über als Stubs) + Footer. `bockwurst-home.css` + `bockwurst-home.js` (Count-up + Reveal). Nur DE.
- **Increment 2 ✅ (2026-07-07):** **Touren-Raster** (Sektion „Touren"). Serverseitig via neuem **`TourGridProcessor`** (`page.10.dataProcessing.30`, `as=tourGrid`): `PageRepository::getMenu()` über die Kind-Tour-Seiten (mit Strava-ID), angereichert aus `data/touren/<id>.json` (Titel, Region, km, Schwierigkeit, Video-ja/nein, Hero-Bild). Fluid-`f:for` in `Home.html`, Link je Seite via `f:link.page`. Karten: Foto oder **Gradient-Fallback** (aktuell 1× Foto/MSR300, 8× Gradient), Play-/Video-Marker nur bei YouTube-ID (7/9), Badge = **Schwierigkeit** farbcodiert (Leicht=green/Mittel=cobalt/Schwer=pink). Responsive 3/2/1 Spalten. **„Alle Touren →"-Morelink entfernt** (alle 9 Touren stehen inline; ein dediziertes `/touren`-Overview wäre die künftige Heimat des Links). Verifiziert: HTTP 200, keine Exceptions, Tour-Detailseiten unberührt.
- **Increment 3 ✅ (2026-07-07):** **6-Points-Sektion** (`bw-sixp`). Dunkler Banner nach Handoff: 6-Points-White-Logo (via `f:uri.resource`), Botschafter-Zeile, H2 „Rund um **Mallorca**" (gelb/`--yellow`), Text, **Live-Countdown** bis 2027-05-14 09:00 (`initCountdown` in `bockwurst-home.js`, läuft unabhängig von reduced-motion; **No-JS-Fallback** „14. Mai 2027 · Mallorca"), Volt-CTA → `6pointschallenges.com/product/mallorca-may-2027/`. Foto-Spalte = **echtes Mallorca-Foto** (`Resources/Public/Images/stefan-mallorca.jpg`, Stefan am Cap Formentor) über Gradient-Fallback, Ausschnitt `58% 30%`. Verifiziert: HTTP 200, Logo/Foto/JS 200, keine Exceptions.
  - **Foto-Herkunft:** lag im Event-Guide-Repo (`sport-events/assets/img-e8513056.jpg`), fehlte in bockwurst-cc. Als **fixes Brand-Asset** in den Sitepackage übernommen (wie die Logos → committet, deployt mit dem Code, kein Media-Sync). Optimiert 708 KB → 240 KB (1400px/q82). Referenz via `f:uri.resource`.
- **Offen je Sektion:** ~~Touren-Grid~~ ✅; ~~6 Points~~ ✅; **Events** → Daten aus `sport-events` (Integration) oder Link-out; **Shorts** → **4 Short-IDs**; **Über** → **Text + Foto**. Pro Tour weiterhin offen: Hero-Foto (→ füllt automatisch die Grid-Karte statt Gradient), Highlights, Bericht, Bayern-YT-IDs.

## Alle 9 Tour-Detailseiten angelegt (2026-07-06) — DB-Inhalt (lokale Instanz, nicht in git)
Slugs: `/tour-msr300` (komplett) · `/tour-rund-um-berlin` · `/tour-bayrischzell-sudelfeldpass`* · `/tour-schliersee-tegernsee-spitzingsee`* · `/tour-spreewaldmarathon-200` · `/tour-mallorca-etappe-1/2/3` · `/tour-rochlitzer-berg-colditz-100`. Alle Layout „tour" + Strava-ID als Seiteneigenschaft. Bausteine: Eckdaten + Karte/Höhenprofil + Video (außer *= keine YouTube-ID) + **Blindtext-Bericht** (Platzhalter). Offen je Tour: Hero-Foto (Gradient-Fallback), Highlights, Galerie/Fotos, Soundtrack, echter Bericht.
- **Restliche 8 Tour-Seiten** anlegen (Datendateien + youtube_id liegen vor; #7/#8 YT-IDs fehlen, Spotify/Highlights/Fotos je Tour optional). Muster: Seite mit backend_layout „tour" + Strava-ID als Seiteneigenschaft + die Tour-CEs.
- **Touren-Übersicht/Grid** (BSP `MenuCardList`) auf Startseite/Portalseite.
- **Impressum + Datenschutz** als Seiten anlegen (Footer verlinkt `/impressum`, `/datenschutz` – noch tot; vor Launch rechtlich Pflicht).
- **DE/EN-Zweitsprache** (Sprache 1): dann Footer-Claims/Nav zweisprachig; optional Karten-Tiles Click-to-Load/Proxy.

## Separates Projekt / offene Frage (Event-Guide `sport-events`)
Stefan bemerkte: live werden noch Events vom 01.07. gezeigt. **Diagnose:** Scraper-Cron ist gesund (weekly Mo + monthly; nächster Lauf Mo 06.07.), aber die Browse-Liste (Zeitraum „alle") filtert **nicht** nach heute → vergangene Tage bleiben bis zum nächsten Scrape sichtbar. **Fix offen (Freigabe abwarten):** in `sport-events/index.html` Basisfilter `e.datum >= TODAY_ISO` ergänzen, committen/pushen → Cloudflare Pages. (Live-Seite → vorher OK einholen.)

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
