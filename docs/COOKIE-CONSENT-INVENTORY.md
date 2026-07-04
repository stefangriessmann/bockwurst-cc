# bockwurst.cc – Cookie- & Consent-Inventar

> Living document · Stand: 2026-07-02. Zweck: alle Cookies und externen Dienste **laufend sammeln**, damit die Cookie-Consent-Konfiguration später vollständig ist.
> Kategorien nach `sport-events/docs/DSGVO-COOKIE-CONSENT-KONZEPT.md`: **Notwendig · Funktional · Externe Medien · Statistik**.
> Stance (2026-07-02): „kein Tracking" gelockert — **wo nötig erlaubt**; Consent regelt die Freigabe.

## Consent-Werkzeug (entschieden 2026-07-04)
- **Kein Cookie-Banner.** Die Seite setzt **keine nicht-essenziellen Cookies** (Schriften self-hosted, GTM inert, externe Medien via Click-to-Load) → ein Banner wäre überflüssig/irreführend. BSP-`cookie-consent` daher **deaktiviert** (`page.theme.cookieconsent.enable: false` in `settings.yaml`), damit auch dessen eigener `cookieconsent_status`-Cookie entfällt.
- **Verworfen: `sg_cookie_optin`** (sgalinski) — die für Banner/iframe-Blockade **nötige Dateigenerierung ist ohne Lizenzschlüssel deaktiviert** (Freemium), unverhältnismäßig; deinstalliert.
- **Externe Medien** (YouTube/Spotify) laufen per **Click-to-Load** (lädt erst auf Nutzerklick = Einwilligung). Footer-Claim „Kein Tracking · Keine Cookies" wurde entfernt (2026-07-04) — als absolute Aussage nicht mehr geführt.

## Inventar

| Dienst / Cookie | Zweck | Kategorie | Consent nötig? | Status | Notiz |
|---|---|---|---|---|---|
| `fe_typo_user` (TYPO3) | Frontend-Session (nur bei Login/Formular) | Notwendig | nein | aktiv (Core) | Session-Cookie |
| `be_typo_user` (TYPO3) | Backend-Session (Redaktion) | Notwendig | nein | aktiv (Core) | nur Backend |
| `cookieconsent_status` (BSP cookie-consent) | merkt die Banner-Entscheidung | Notwendig | nein | **deaktiviert** | Banner aus (`cookieconsent.enable: false`) → Cookie entfällt |
| **Google Fonts** (via BSP `google-font`-Set) | Web-Schriften | Externe Medien | ja | aktiv (BSP full) | **ersetzen durch selbst gehostete Schriften** (Event-Guide-Prinzip) → dann kein Consent |
| **Google Tag Manager** (via BSP `google-tag-manager`-Set) | Tag-/Tracking-Container | Statistik | ja | aktiv, aber **inert** (keine Container-ID gesetzt) | nur aktivieren, wenn Tracking wirklich gewünscht |
| **YouTube** (Tour-Videos) | Video-Einbettung | Externe Medien | ja | **aktiv: Click-to-Load** (`bockwurst_tourvideo`-CE) | `youtube-nocookie.com`-Embed lädt **erst auf Nutzerklick** (in-place, autoplay). Vor dem Klick **kein** Drittabruf (Quelltext ohne iframe). Ohne JS: Link öffnet YouTube extern. |
| **Spotify** („Sound der Tour") | Player | Externe Medien | ja | geplant (analog: Click-to-Load) | Player-Embed erst auf Klick; Playlist-URL von Stefan ausstehend |
| **Leaflet** (Karten-JS/CSS) | Streckenkarte | Funktional | nein | **self-hosted** (Tour-Map-CE) | v1.9.4 in `Resources/Public/Vendor/leaflet/`, kein CDN-Abruf |
| **Karten-Tiles** (CARTO Voyager, `basemaps.cartocdn.com`) | Kartenhintergrund | Externe Medien | **ja** (externer Tile-Server) | **aktiv** (Tour-Map-CE) | Drittabruf beim Kartenrendern. TODO: Klick-zum-Laden/Consent oder gecachter Tile-Proxy → dann kein Drittabruf |
| **Strava** (API) | Streckendaten, Stats, Höhenprofil, GPX | Externe Medien | nein (serverseitig, offline) | **aktiv** (Tourenportal) | Abruf via MCP → als `public/data/touren/<id>.json`+`.gpx` im Repo; **kein** Frontend-Drittabruf. Nur der „In Strava ansehen"-Link führt extern. |
| **Analytics** (Tool offen) | Besucherstatistik | Statistik | ja | optional/später | GPC respektieren (Website-Spec: Privacy) |

## Pflege
- Bei **jeder** neuen Einbindung eines externen Dienstes oder Cookies: hier eintragen (Dienst, Zweck, Kategorie, Consent-Bedarf).
- Vor dem Launch: Datenschutzerklärung aus diesem Inventar ableiten (Dienst, Zweck, Empfänger) — fachkundig prüfen lassen.
- Bezug: Website-Spec-Kategorie **Privacy** (Consent, GPC) + `DSGVO-COOKIE-CONSENT-KONZEPT.md`.
