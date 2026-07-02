# bockwurst.cc – TYPO3-Projekt · Leitlinien für Agenten

> Verbindliche Governance für alle TYPO3-Arbeiten in diesem Repo (vom Betreiber übergeben, 2026-07-02).
> Ziel: ein **sicheres, wartbares, standardnahes** TYPO3-Setup (v14 LTS) für eine kleinere Website / ein Hobbyprojekt.

## Quellen-Priorität (bei Widerspruch gewinnt die höhere)

1. **Offizielle TYPO3-Doku** (https://docs.typo3.org/) — primäre Quelle: TYPO3 Explained, Core API, Getting Started, TCA/TSConfig/TypoScript/Fluid-Reference, Changelog der jeweiligen Version.
2. **TYPO3 Security Team** (https://typo3.org/security) — Advisories, empfohlene Maßnahmen, bekannte Schwachstellen, sicherer Betrieb.
3. **TYPO3 Core Changelog** (https://docs.typo3.org/c/typo3/cms-core/main/en-us/Changelog/) — Features, Deprecations, Breaking Changes, neue Empfehlungen.
4. **Core-Entwickler-Beiträge** (Benni Mack, Georg Ringer, Markus Klein, Christian Kuhn, b13) — nur **ergänzend** zur offiziellen Doku.

## Grundsätze

- Möglichst **nah am TYPO3-Core** bleiben; **Standardlösungen** vor Eigenentwicklungen.
- **Möglichst wenige Extensions** — nur vertrauenswürdige, aktiv gepflegte.
- **Composer** als Installations-/Paketverwaltung; aktuelle **LTS**-Version.
- Erweiterungen regelmäßig aktualisieren; **Updates einfach halten**.
- Wartbarer, nachvollziehbarer Code; TYPO3-Konventionen & Coding Guidelines.

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
- **Offener Prüfpunkt (Basis-Distribution):** Bootstrap Package vs. core-nahes eigenes Sitepackage — im Licht dieser Leitlinien neu abzuwägen (siehe Setup-Plan §7).
