# bockwurst.cc – Cookie- & Consent-Inventar

> Living document · Stand: 2026-07-02. Zweck: alle Cookies und externen Dienste **laufend sammeln**, damit die Cookie-Consent-Konfiguration später vollständig ist.
> Kategorien nach `sport-events/docs/DSGVO-COOKIE-CONSENT-KONZEPT.md`: **Notwendig · Funktional · Externe Medien · Statistik**.
> Stance (2026-07-02): „kein Tracking" gelockert — **wo nötig erlaubt**; Consent regelt die Freigabe.

## Consent-Werkzeug (offene Entscheidung)
- **Option A – Bootstrap-Package-eigenes `cookie-consent`** (ist über das `full`-Set schon aktiv): spart eine zusätzliche Extension → näher an „möglichst wenige Extensions".
- **Option B – `sg_cookie_optin`** (sgalinski, v14 ✅): mächtiger, In-House-Erfahrung (FutureSax), Klick-zum-Laden, Einwilligungs-Hash als Nachweis.
- → später entscheiden, sobald der Umfang externer Dienste feststeht.

## Inventar

| Dienst / Cookie | Zweck | Kategorie | Consent nötig? | Status | Notiz |
|---|---|---|---|---|---|
| `fe_typo_user` (TYPO3) | Frontend-Session (nur bei Login/Formular) | Notwendig | nein | aktiv (Core) | Session-Cookie |
| `be_typo_user` (TYPO3) | Backend-Session (Redaktion) | Notwendig | nein | aktiv (Core) | nur Backend |
| Consent-Speicherung | merkt die Einwilligungs-Entscheidung | Notwendig | nein | geplant | vom Consent-Tool selbst |
| **Google Fonts** (via BSP `google-font`-Set) | Web-Schriften | Externe Medien | ja | aktiv (BSP full) | **ersetzen durch selbst gehostete Schriften** (Event-Guide-Prinzip) → dann kein Consent |
| **Google Tag Manager** (via BSP `google-tag-manager`-Set) | Tag-/Tracking-Container | Statistik | ja | aktiv, aber **inert** (keine Container-ID gesetzt) | nur aktivieren, wenn Tracking wirklich gewünscht |
| **YouTube** (Tour-Videos, Shorts) | Video-Einbettung | Externe Medien | ja | **entschieden 2026-07-03: echtes Embed + Consent** | Vorschau/Player direkt einbetten (statt „2-Klick, kein Embed"), freigeschaltet über den Cookie-Consent. `youtube-nocookie.com`. → aktuelles `bockwurst_tourvideo`-CE (Link-only) wird auf consent-gated Embed umgestellt, sobald das Consent-Tool steht. |
| **Spotify** („Sound der Tour") | Player | Externe Medien | ja | geplant (analog YouTube: Embed + Consent) | Player-Embed, freigeschaltet über Cookie-Consent |
| **Leaflet** (Karten-JS/CSS) | Streckenkarte | Funktional | nein | **self-hosted** (Tour-Map-CE) | v1.9.4 in `Resources/Public/Vendor/leaflet/`, kein CDN-Abruf |
| **Karten-Tiles** (CARTO Voyager, `basemaps.cartocdn.com`) | Kartenhintergrund | Externe Medien | **ja** (externer Tile-Server) | **aktiv** (Tour-Map-CE) | Drittabruf beim Kartenrendern. TODO: Klick-zum-Laden/Consent oder gecachter Tile-Proxy → dann kein Drittabruf |
| **Strava** (API) | Streckendaten, Stats, Höhenprofil, GPX | Externe Medien | nein (serverseitig, offline) | **aktiv** (Tourenportal) | Abruf via MCP → als `public/data/touren/<id>.json`+`.gpx` im Repo; **kein** Frontend-Drittabruf. Nur der „In Strava ansehen"-Link führt extern. |
| **Analytics** (Tool offen) | Besucherstatistik | Statistik | ja | optional/später | GPC respektieren (Website-Spec: Privacy) |

## Pflege
- Bei **jeder** neuen Einbindung eines externen Dienstes oder Cookies: hier eintragen (Dienst, Zweck, Kategorie, Consent-Bedarf).
- Vor dem Launch: Datenschutzerklärung aus diesem Inventar ableiten (Dienst, Zweck, Empfänger) — fachkundig prüfen lassen.
- Bezug: Website-Spec-Kategorie **Privacy** (Consent, GPC) + `DSGVO-COOKIE-CONSENT-KONZEPT.md`.
