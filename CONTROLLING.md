# bockwurst.cc – Zeit-Controlling

> Zweck: nachvollziehen, wie viel **Zeit** und wie viel **Verbrauch/Kosten** (Claude-Nutzung) in welche Projektschritte fließen (Aufbau der Seite mit Claude).
> Zeitzone: lokal (Europe/Berlin). Halbautomatisch von Claude geführt.
>
> **Steuer-Signale (jederzeit):**
> - `Start: <Schritt>` – neuen Zeitblock beginnen
> - `Pause` / `Stop` – laufenden Block schließen
> - freie Angabe, z. B. „ich hab 2h an X gesessen" – wird als manueller Block eingetragen
>
> **Spalte „Typ":** `auto` = von Claude an Schritt-Grenzen gestempelt (enthält ggf. Denk-/Tipppausen) · `manuell` = von dir angegeben/geschätzt (genauer für echte Arbeitszeit).

## Erfassung

| # | Datum | Von | Bis | Dauer | Phase | Tätigkeit | Typ |
|---|-------|-----|-----|-------|-------|-----------|-----|
| 1 | 2026-07-01 | – | – | _?_ | Event-Guide | Kachel-Rollout: Diagnose roter e2e, Scraper- + zentraler Daten-Fix (ortlose Events), Deploy staging→live, Verifikation | manuell (Schätzung nachtragen) |
| 2 | 2026-07-02 | – | 14:20 | _?_ | TYPO3 · Planung | Setup-Plan v14 erstellt, Hosting-Auswahl (Hetzner VPS), Netlify-Ausstieg (Cloudflare Pages), Basis-Distribution geklärt | manuell (Schätzung nachtragen) |
| 3 | 2026-07-02 | 14:20 | 17:34 | 3:14 | TYPO3 · Setup | DDEV + TYPO3 v14 lokal, Bootstrap Package, eigenes Theme-Sitepackage (Schriften self-hosted, Design-Tokens, Logo-SVG, eigenes Page-Template), Design-Pipeline (GitHub-Repo `bockwurst-cc` + `design/`), Governance/Controlling, Frame-Blocker-Diagnose | auto |
| 4 | 2026-07-02 | ~21:15 | 21:35 | ~0:20 | TYPO3 · Setup | **Frame-Blocker gelöst**: setup-generierte `config/sites/main/setup.typoscript` entfernt → eigener Header (Logo) + Slim-Footer rendert; Doku/Memory aktualisiert. (Wall-Clock 17:34→21:35 war lange Pause – NICHT gezählt.) | auto (geschätzt) |
| 5 | 2026-07-03 | ~08:11 | 08:22 | ~0:11 | TYPO3 · Planung | Umsetzungs-Konzept (Baustein-Wiederverwendung Core/BSP, Strava-Datenpfad via MCP validiert), Entwickler-Quellen, Kontext-Absicherung (STATUS.md + Resume-Memory + Wiedereinstiegs-Prompt). (Nacht 07-02→07-03 = Pause, nicht gezählt.) | auto |

## Summen je Phase (h:mm)

| Phase | Summe |
|-------|-------|
| Event-Guide | _Rückblick, offen_ |
| TYPO3 · Planung | ~0:11 (+ Rückblick offen) |
| TYPO3 · Setup | ~3:34 |
| **Gesamt (gemessen)** | **~3:45** |

_(Gemessen = live getrackte „auto"-Blöcke. Zeilen 1 & 2 sind Rückblick ohne exakte Messung. „auto" enthält Denk-/Interaktionspausen.)_

## Hinweise
- **Modus (mit dir abgestimmt):** automatisch — getrackt wird die Zeit, während Claude arbeitet (Interaktions-/Arbeitszeit). Keine manuellen Schätzungen nötig.
- Zeilen 1 & 2 sind Rückblick (vor Einführung des Loggings, nicht exakt gemessen) → bleiben ohne harte Dauer.
- Ab Zeile 3 läuft die Erfassung „live": Anfang/Ende der Schritte mit echter Uhrzeit gestempelt.

## Verbrauch & Kosten (Claude-Nutzung)

> **Abo-Modell (geklärt 2026-07-03):** Auf dem aktuellen Plan fallen **keine €-Grenzkosten pro Projekt** an — die Nutzungsanzeige (App → Usage) zeigt **$0,00** und misst Verbrauch als **Anteil am Kontingent**: ein rollierendes **5h-Session-Fenster** + ein **Wochen-Limit**, nicht als Geldbetrag.
> Ein sauberer €-Betrag **pro Projekt ist damit nicht erfassbar**. Die Werte sind zudem **maschinen-lokal + kumulativ** (nicht projekt-isoliert) → nur grobe Orientierung. Steuergröße ist der **Kontingent-Anteil**, nicht €.

**Kontingent-Schnappschüsse (App → Usage):**

| Datum | 5h-Session-Fenster | Woche (alle Modelle) | $ (Grenzkosten) |
|---|---|---|---|
| 2026-07-03 ~08:25 | 13 % (Reset 12:49) | 17 % (Reset 06.07.) | $0,00 (Abo-inklusiv) |

_Bei Bedarf weitere Schnappschüsse ergänzen; ein €-Posten entfällt (Abo)._

## Entscheidungen (Bezug)
- Basis-Distribution: **Bootstrap Package** (`bk2k/bootstrap-package` ^16, v14) + eigenes bockwurst-Theme-Sitepackage darüber. Entschieden 2026-07-02.
