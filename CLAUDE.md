# bockwurst.cc – TYPO3-Projekt · Leitlinien für Agenten

> Verbindliche Governance für alle TYPO3-Arbeiten in diesem Repo (vom Betreiber übergeben, 2026-07-02).
> Ziel: ein **sicheres, wartbares, standardnahes** TYPO3-Setup (v14 LTS) für eine kleinere Website / ein Hobbyprojekt.

## Quellen-Priorität (bei Widerspruch gewinnt die höhere)

1. **Offizielle TYPO3-Doku** (https://docs.typo3.org/) — primäre Quelle: TYPO3 Explained, Core API, Getting Started, TCA/TSConfig/TypoScript/Fluid-Reference, Changelog der jeweiligen Version.
2. **TYPO3 Security Team** (https://typo3.org/security) — Advisories, empfohlene Maßnahmen, bekannte Schwachstellen, sicherer Betrieb.
3. **TYPO3 Core Changelog** (https://docs.typo3.org/c/typo3/cms-core/main/en-us/Changelog/) — Features, Deprecations, Breaking Changes, neue Empfehlungen.
4. **Core-Entwickler-Beiträge** (Benni Mack, Georg Ringer, Markus Klein, Christian Kuhn, b13) — nur **ergänzend** zur offiziellen Doku.

### Weitere offene Entwickler-Quellen (ergänzend; offizielle Doku bleibt primär)

> Wir bauen auf **v14 LTS** — auf `docs.typo3.org` oben rechts die Version auf **14/main** schalten. v12.4/v13.4-Beispiele sinngemäß übertragen.

- **Doku (versioniert):** TYPO3 Explained (Core API) · Getting Started Tutorial · TypoScript-/TCA-/Fluid-ViewHelper-Reference · **Sitepackage-Tutorial** (zentral für unser Theme) · Changelog/Deprecation pro Version — alle frei unter `docs.typo3.org`.
- **Learning Paths** (`typo3.community`, kostenlos): [Developer](https://typo3.community/learning-onboarding/developers) (Extbase, Fluid, Routing, Extensions) · [Integrator](https://typo3.community/learning-onboarding/integrators) (Sitepackages, TypoScript, Backend).
- **Core-Quellcode** auf GitHub (`typo3/typo3`) + Extension-Quellen selbst — oft die beste „Doku".
- **typo3.org Blog/News** zu Release-Features.
- **TYPO3 Slack** (`typo3.slack.com`, kostenlos, aktive Kanäle).
- **YouTube der TYPO3 Association** (TYPO3 Developer Days / T3CON-Talks).
- **Agentur-Blogs** (b13, in2code, usetypo3 u. a.) — praxisnahe v12/v13/v14-Artikel.
- Kostenpflichtig, aber gut: **Certified-Developer-Buch** (Leanpub).

## Grundsätze

- Möglichst **nah am TYPO3-Core** bleiben; **Standardlösungen** vor Eigenentwicklungen.
- **Möglichst wenige Extensions** — nur vertrauenswürdige, aktiv gepflegte.
- **Composer** als Installations-/Paketverwaltung; aktuelle **LTS**-Version.
- Erweiterungen regelmäßig aktualisieren; **Updates einfach halten**.
- Wartbarer, nachvollziehbarer Code; TYPO3-Konventionen & Coding Guidelines.

## Website-Spezifikation (übergreifendes Leitbild)

Neben den TYPO3-Regeln gilt **https://specification.website/spec/** als möglichst umfassend anzuwendendes Leitbild — ein plattform-unabhängiger Standard „was eine gute Website ausmacht" (156 Themen, 10 Kategorien, jeweils **Required / Recommended / Avoid / Optional**):

- **Foundations** – HTML-Grundlagen, Metadaten, Favicons, semantisches Markup
- **SEO** – robots.txt, XML-Sitemap, Canonicals, JSON-LD (structured data), SSR
- **Accessibility** – WCAG: Kontrast, Tastaturbedienung, Labels, Alt-Texte, Skip-Links
- **Security** – HTTPS/TLS, CSP, HSTS, sichere Cookie-Attribute, Cross-Origin
- **Well-Known URIs** – `/.well-known/security.txt`, change-password u. a.
- **Agent Readiness** – stabile URLs, strukturierte Daten, `/llms.txt`, KI-robots, MCP-Discovery
- **Performance** – Core Web Vitals, Bild-Kompression, Caching, Font-Loading, HTTP/2-3
- **Privacy** – Datenschutzerklärung, Cookie-Consent, Global Privacy Control, respektvolle Analytics
- **Resilience** – korrekte HTTP-Status, Offline/Service-Worker, Monitoring
- **Internationalization** – hreflang, URL-Struktur, Locale-Formate (deckt DE/EN ab)

Anwendung: bei jeder Seite/jedem Feature die relevanten Spec-Punkte mitdenken — **Required** umsetzen, **Recommended** anstreben, **Avoid** meiden. TYPO3-Doku und Spec ergänzen sich meist; bei echtem Konflikt bleibt der **TYPO3-Core-Weg** maßgeblich für das „Wie" der Umsetzung.

## Sicherheit (immer empfehlen/umsetzen)

- Ausschließlich **HTTPS** (Frontend **und** Backend); aktuelle **PHP**-Version.
- **Env-Variablen** für sensible Konfiguration; **keine Zugangsdaten im Repository**.
- Sichere Dateiberechtigungen; regelmäßige **Backups**.
- Regelmäßige TYPO3-/Extension-**Updates**.
- **Install Tool** nach Einrichtung absichern/deaktivieren.
- **Least Privilege** bei Benutzer- und DB-Rechten.

## Entwicklung (bevorzugen)

- **Core-APIs** statt Eigenlösungen; **Extbase & Fluid** gemäß aktueller Empfehlung.
- **Dependency Injection**, **PSR**-Standards, aktuelle PHP-Sprachfeatures.
- Klare Trennung von Konfiguration, Logik, Templates; nachvollziehbare Struktur; verständliche Doku.

## Antwortverhalten bei TYPO3-Fragen

1. Zuerst an der offiziellen Doku orientieren.
2. Standardlösung des Core vorschlagen.
3. Nur mit nachvollziehbarem technischem Grund davon abweichen.
4. Auf relevante Deprecations/Breaking Changes hinweisen.
5. Kurz begründen, warum die Lösung Best Practice ist.
6. Lösungen bevorzugen, die auch bei künftigen TYPO3-Versionen stabil bleiben.

## Projektbezug

- Setup-Plan & Hosting: `sport-events/docs/TYPO3-SETUP-PLAN.md`.
- Zeit-Controlling: `CONTROLLING.md`.
- Lokale Entwicklung: DDEV (Traditional Windows) + Docker; TYPO3 **v14 LTS**, docroot `public`.
- **Basis-Distribution (entschieden 2026-07-02):** **Bootstrap Package** (`bk2k/bootstrap-package`, v14) + eigenes bockwurst-Theme-Sitepackage darüber. Als gepflegte Standard-Lösung (statt Eigenentwicklung) vertretbar; liefert responsives Layout-Gerüst, fertige Content-Elemente und responsives Bild-Rendering und beschleunigt die Umsetzung der Claude-Design-Vorlagen. Zusatz-Extensions nur, wo der Core keine Antwort hat.
- **Tracking/Cookies (Stance 2026-07-02):** striktes „kein Tracking" ist bewusst **gelockert** — **wo nötig erlaubt** (z. B. Analytics, externe Embeds). Alle Cookies + Kategorien laufend in `docs/COOKIE-CONSENT-INVENTORY.md` sammeln (für die spätere Consent-Konfiguration). Consent-Werkzeug **offen**: Bootstrap-Package-eigenes cookie-consent (spart eine Extension) vs. `sg_cookie_optin` (siehe Inventar).
- **Controlling:** `CONTROLLING.md` trackt **Zeit** und (neu) **Verbrauch/Kosten** (siehe dort, inkl. Mess-Grenze).
