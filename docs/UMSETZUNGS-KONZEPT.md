# bockwurst.cc – Umsetzungs-Konzept (Design → TYPO3)

> Stand: 2026-07-02. Wie wir Design-Seiten strukturiert in TYPO3 v14 umsetzen: **erst wiederverwenden (Core/BSP), dann custom**. Governance: `CLAUDE.md` (nah am Core, wenige Extensions).

## 1. Methodik – pro Seite dieselben 5 Fragen

Für **jede** Seite/jeden Block klären wir:

1. **Zweck & Typ** – Detailseite · Übersicht/Liste · Landingpage · Startseite.
2. **Content-Modell** – welche Felder sind **redaktionell** (im CMS gepflegt) vs. **fix** (im Template).
3. **TYPO3-Baustein** – welches **Core-/BSP-Content-Element** deckt es ab? Nur wo keins passt → **eigenes CE**.
4. **Redaktion** – wie pflegt der Redakteur das (Seite + Content-Elemente, Seiteneigenschaften, Datei-Upload …)?
5. **Design + Umsetzung** – was muss **Claude Design** noch liefern, was brauche **ich** zum Bauen?

Grundprinzip: **Seiten + Content-Elemente** (kein eigenes Record-Modell, solange nicht nötig). Wiederverwendbare Bausteine werden **einmal** gestylt (unser Theme-SCSS über BSP), nicht dupliziert.

## 2. Baustein-Wiederverwendungs-Karte (einmal bauen, überall nutzen)

| Bedarf | Lösung | Custom? |
|---|---|---|
| Bildergalerie + Lightbox | **BSP `Gallery`** + `bootstrap.lightbox` (PhotoSwipe) | nein – nur bockwurst-Styling |
| YouTube-/Video-Embed (2-Klick/Consent) | **BSP `ExternalMedia`** (youtube-nocookie) + Consent | nein |
| Spotify-Player | **BSP `ExternalMedia`** (oEmbed) oder `Audio` | nein |
| Karten-Raster aus Seiten (Touren-Grid, Übersicht) | **BSP `MenuCardList` / `MenuThumbnailList` / `MenuCardDir`** – zieht Titel/Bild/Teaser aus den Seiten | nein |
| Fließtext / Bericht | **BSP `Text` / `Textmedia`** | nein |
| Highlights / Aufzählung | **BSP `Bullets` / `IconGroup` / `List`** | nein |
| Akkordeon, Tabs, Slider, Timeline, Zitat, Social-Links | **BSP** (`Accordion`, `Tab`, `Carousel`, `Timeline`, `Quote`, `SocialLinks`) | nein |
| **Streckenkarte (Leaflet) + Höhenprofil** | **eigenes CE** (kein Core/BSP-Pendant) – aus GPX/Strava | **ja** |
| **Eckdaten-Leiste (km/hm/Dauer/Ø)** | **eigenes CE** (kleine Feld-Gruppe) oder kreativ mit `IconGroup`/`Table` | **ja (klein)** |
| Consent-Layer | BSP-`cookie-consent` **oder** `sg_cookie_optin` (offen, siehe Cookie-Inventar) | nein |

→ Genuin custom fürs Tourenportal sind nur **(a) Karte+Höhenprofil** und **(b) die Eckdaten-Leiste**. Alles andere = BSP.

## 3. Tour-Detailseite – angewandt (Design liegt vor: `design/design_handoff_bockwurst/tour-detail.html`)

**Typ:** Detailseite. **Jede Tour = eine Seite** unter dem Elternknoten „Touren".

| Design-Element | TYPO3-Baustein | Redaktionell gepflegt |
|---|---|---|
| Hero (Titel, Bild) | BSP `Header` + Seitenbild / `Image` | Titel = Seitentitel; Bild = Seiten-/CE-Feld |
| Eckdaten (km, hm, Dauer, Ø) | **eigenes CE „Tour-Stats"** | Zahlen als CE-Felder |
| Highlights | BSP `Bullets`/`IconGroup` | Liste |
| Streckenkarte + Höhenprofil | **eigenes CE „Tour-Map"** | GPX-Datei-Upload (v1) |
| YouTube-Video | BSP `ExternalMedia` | Video-URL |
| Spotify | BSP `ExternalMedia` | Playlist-URL |
| Bericht (Fließtext) | BSP `Text`/`Textmedia` | Text |
| Galerie + Lightbox | BSP `Gallery` | Bilder-Auswahl |

**Redaktion:** Redakteur legt eine Tour-Seite an → füllt **Seiteneigenschaften** (Titel, Teaser-Bild, Region, Distanz – speisen später das Grid) → fügt die Content-Elemente ein. Standard-TYPO3-Workflow.

## 4. Entscheidung: Tour-**Liste** vs. nur Startseiten-Einstieg

Dank BSP-`MenuCardList` ist das **kein Entweder-oder und kein Extra-Bau**:
- **Jetzt:** Auf der **Startseite** ein kuratiertes „Touren-Highlights"-Grid = ein `MenuCardList`-CE, das auf ausgewählte Tour-Seiten zeigt. Reicht für den Start (wenige Touren).
- **Später (wenn viele Touren):** eine eigene **Tourenportal-Übersichtsseite** = dasselbe CE über **alle** Tour-Seiten, plus optional die interaktive Touren-Landkarte (eigenes CE, wie „Tour-Map" über alle Touren).

**Empfehlung:** mit dem Startseiten-Grid starten, dedizierte Übersichtsseite erst bei Bedarf – identischer Baustein, kein Mehraufwand.

## 5. Was Claude Design (noch) liefern muss / Was ich zum Bauen brauche

**Claude Design – offen:**
- **Startseite** (inkl. „Touren-Highlights"-Karten-Design) – nächster Prompt liegt bereit.
- Weitere Seiten nach Bedarf (Über Bockwurst, 6 Points, Zwift).
- Tour-Detailseite ist **fertig gestaltet** (tour-detail.html) ✅ – kein neuer Design-Bedarf.

**Entschieden (2026-07-02):**
1. **Redaktionsmodell:** Seiten + Content-Elemente ✅.
2. **Datenquelle Karte/Höhenprofil/Stats:** **Strava (automatisch)** ✅.

### Strava-Datenpfad (validiert via Strava-MCP)
Verbunden als Stefan Griessmann. Pro kuratierter Tour (IDs aus `TOUREN-KURATIERT.md`) automatisch verfügbar:
- **Stats** (Distanz, Höhenmeter, Dauer, Ø-/Max-Tempo, Kalorien, Kadenz) + **`reduced_polyline`** (Route) via `list_activities`.
- **Höhenprofil + präzise Strecke + GPX** via `get_activity_streams` (`altitude`/`location`/`distance`) — **downsampled** (Resolution ~300 Punkte, sonst zu groß).
- ⚠️ **Fotos: NICHT** über den MCP verfügbar (kein Foto-Endpoint) → Galerie separat füllen (Upload/manuell).

**Architektur:** MCP-Fetch → **Datendateien** im Repo (`data/touren/<strava-id>.json` + `.gpx`) → TYPO3-CEs rendern daraus:
- **Tour-Stats-CE** (Eckdaten-Leiste) — liest Stats.
- **Tour-Map-CE** (Leaflet-Karte + Höhenprofil-SVG) — liest Polyline/Höhen-Stream/GPX.
- **BSP `Gallery`** für Fotos · **BSP `ExternalMedia`** für YouTube/Spotify · **BSP `Text`** für Bericht.
- Redakteur setzt je Tour-Seite die **Strava-Activity-ID** (+ YouTube-ID, Bericht, Fotos); der Rest kommt aus der Datendatei.

**Später (optional):** eigener Strava-**OAuth-Pipeline** (GitHub Actions, wie Event-Guide-Scraper) für automatischen Refresh aller ~80 Touren. Für den Start reicht MCP-Fetch der 9 kuratierten Touren.

**Nächster Bau-Schritt:** (a) Datendateien der 9 kuratierten Touren via MCP holen (downsampled), (b) Tour-Stats- + Tour-Map-CE bauen, (c) eine Beispiel-Tour-Seite zusammensetzen.
