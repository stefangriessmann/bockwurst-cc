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
| 3 | 2026-07-02 | 14:20 | _läuft_ | _läuft_ | TYPO3 · Setup | Controlling angelegt; DDEV-/TYPO3-Einrichtung | auto |

## Summen je Phase (h:mm)

| Phase | Summe |
|-------|-------|
| Event-Guide | _?_ |
| TYPO3 · Planung | _?_ |
| TYPO3 · Setup | _läuft_ |
| **Gesamt** | **_?_** |

_(Summen aktualisiere ich, sobald Dauern feststehen.)_

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
