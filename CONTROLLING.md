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

## Summen je Phase (h:mm)

| Phase | Summe |
|-------|-------|
| Event-Guide | _Rückblick, offen_ |
| TYPO3 · Planung | _Rückblick, offen_ |
| TYPO3 · Setup | ~3:34 |
| **Gesamt (gemessen)** | **~3:34** |

_(Gemessen = live getrackte „auto"-Blöcke. Zeilen 1 & 2 sind Rückblick ohne exakte Messung. „auto" enthält Denk-/Interaktionspausen.)_

## Hinweise
- **Modus (mit dir abgestimmt):** automatisch — getrackt wird die Zeit, während Claude arbeitet (Interaktions-/Arbeitszeit). Keine manuellen Schätzungen nötig.
- Zeilen 1 & 2 sind Rückblick (vor Einführung des Loggings, nicht exakt gemessen) → bleiben ohne harte Dauer.
- Ab Zeile 3 läuft die Erfassung „live": Anfang/Ende der Schritte mit echter Uhrzeit gestempelt.

## Verbrauch & Kosten (Claude-Nutzung)

> **Mess-Grenze (ehrlich):** Ich kann meinen eigenen Token-/Kostenverbrauch aus dieser Umgebung **nicht automatisch auslesen** — es gibt hier kein Tool dafür. Verlässliche Quelle: in der interaktiven Claude-Code-CLI der Befehl **`/cost`** (Tokens + Kosten der Session) bzw. die **Anthropic-Console** (Usage-Dashboard).
> **Vorgehen:** Am Ende einer Arbeits-Session `/cost` ausführen und mir die Zahlen nennen → ich trage sie hier ein. Ohne Angabe bleibt es offen (grobe Schätzung nur auf Wunsch, klar als solche markiert).

| # | Datum | Phase | Tokens (in/out) | Kosten | Quelle | Notiz |
|---|-------|-------|-----------------|--------|--------|-------|
| 1 | 2026-07-01/02 | Event-Guide + TYPO3 | _offen_ | _offen_ | `/cost` nachtragen | bisheriger Verlauf; Zahlen bei Gelegenheit aus `/cost` |

**Summe Kosten:** _offen_

## Entscheidungen (Bezug)
- Basis-Distribution: **Bootstrap Package** (`bk2k/bootstrap-package` ^16, v14) + eigenes bockwurst-Theme-Sitepackage darüber. Entschieden 2026-07-02.
