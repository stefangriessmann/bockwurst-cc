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
| **YouTube** (Tour-Videos, Shorts) | Video-Einbettung | Externe Medien | ja | geplant | Klick-zum-Laden; `youtube-nocookie.com` |
| **Spotify** („Sound der Tour") | Player | Externe Medien | ja | geplant | Klick-zum-Laden |
| **Karten** (Leaflet + OSM-Tiles) | Streckenkarte, Touren-Landkarte | Funktional / Externe Medien | ja (bei externem Tile-Server) | geplant | ggf. gecachter Tile-Proxy → dann kein Drittabruf |
| **Strava** (Embeds/API) | Streckendaten, Aktivitäten | Externe Medien | ja bei Embed; serverseitiger API-Abruf unkritisch | geplant | Tourenportal |
| **Analytics** (Tool offen) | Besucherstatistik | Statistik | ja | optional/später | GPC respektieren (Website-Spec: Privacy) |

## Pflege
- Bei **jeder** neuen Einbindung eines externen Dienstes oder Cookies: hier eintragen (Dienst, Zweck, Kategorie, Consent-Bedarf).
- Vor dem Launch: Datenschutzerklärung aus diesem Inventar ableiten (Dienst, Zweck, Empfänger) — fachkundig prüfen lassen.
- Bezug: Website-Spec-Kategorie **Privacy** (Consent, GPC) + `DSGVO-COOKIE-CONSENT-KONZEPT.md`.
