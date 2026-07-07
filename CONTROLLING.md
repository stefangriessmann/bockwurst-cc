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
| 6 | 2026-07-03 | 08:52 | 10:42 | 1:50 | Tourenportal | Strava-Daten der 9 Touren holen (inkl. ~1 h MCP-Fetch im Hintergrund) → data/touren/*.json+gpx; Tour-Stats- + Tour-Map-CE; Standardsprache Deutsch + BE-Sprachpakete | geschätzt (Commits) |
| 7 | 2026-07-03 | 15:09 | 15:27 | 0:18 | Tourenportal | Repo-public-Vorbereitung (lokales BE-PW aus Doku + rotiert), Höhenprofil-Achsenlabel-Fix | geschätzt (Commits) |
| 8 | 2026-07-03 | 19:21 | 19:39 | 0:18 | Tourenportal | Tour-Seitenlayout (backend_layout „tour", Hero, 1080-Spalte, JSON-LD) + Video-CE | geschätzt (Commits) |
| 9 | 2026-07-04 | 15:51 | 16:17 | 0:26 | Tourenportal | Consent-Weg: sg_cookie_optin installiert→verworfen→freies BSP-cookie-consent; Video Click-to-Load; Banner weg; Soundtrack-CE (Spotify) | geschätzt (Commits) |
| 10 | 2026-07-04 | 18:39 | 19:26 | 0:47 | Tourenportal | Scroll-Reveal, Highlights-CE, Galerie-CE + Lightbox + Hero-Foto → **MSR300-Detailseite komplett** | geschätzt (Commits) |
| 11 | 2026-07-06 | 07:00 | 08:33 | 0:50 | Startseite/Footer | Homepage-Handoff ins Repo übernommen; Footer-Engagement-Band (6 Points + Triathlon Chemnitz) umgesetzt | geschätzt (Commits) |

## Summen je Phase (h:mm)

| Phase | Summe |
|-------|-------|
| Event-Guide | _Rückblick, offen_ |
| TYPO3 · Planung | ~0:11 (+ Rückblick offen) |
| TYPO3 · Setup | ~3:34 |
| Tourenportal (Blöcke 6–10) | ~3:39 |
| Startseite/Footer (Block 11) | ~0:50 |
| **Gesamt (gemessen + geschätzt)** | **~8:15** |

_(Blöcke 1–5 = live getrackte „auto"-Zeit (~3:45). Blöcke 6–11 = **aus Git-Commit-Zeitstempeln geschätzt** (~4:30): aktive Fenster zwischen erstem/letztem Commit eines Blocks, lange Pausen dazwischen ausgeschlossen; enthält Claude-Arbeit + Interaktion/Reviews, inkl. ~1 h Hintergrund-MCP-Fetch in Block 6. Zeilen 1 & 2 sind Rückblick ohne Messung. Nicht enthalten: kurze Event-Guide-Diagnose am 06.07., reine Denkpausen.)_

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
| 2026-07-06 (Vormittag) | 18 % (Reset 11:30) | 34 % (Reset 06.07. 15:00); Fable 7 % | $0,00 (Abo-inklusiv) |

_Bei Bedarf weitere Schnappschüsse ergänzen; ein €-Posten entfällt (Abo)._
_Zwischen den Snapshots 07-03→07-06 entstanden: Tourenportal-Kern + MSR300-Detailseite komplett (7 CE-Typen, Hero/Galerie/Lightbox, Click-to-Load YouTube/Spotify), Consent-Entscheidung, Footer-Engagement-Band, DE-BE. Wochen-Anteil daher 17 %→34 %._

### Effizienz-Hinweis (aus App → Usage)
- **~99 % der Nutzung lief bei >150k Kontext.** Lange Sessions sind auch mit Cache teurer. Empfehlung der Anzeige: **`/compact` mitten in einer Aufgabe** (kürzt Kontext, Arbeit läuft weiter) bzw. **`/clear` beim Wechsel auf eine neue Aufgabe**. Für dieses Projekt: nach abgeschlossenen Blöcken (z. B. „MSR300 fertig") ruhig `/clear` — Wiedereinstieg über `docs/STATUS.md` ist verlustfrei.

## Entscheidungen (Bezug)
- Basis-Distribution: **Bootstrap Package** (`bk2k/bootstrap-package` ^16, v14) + eigenes bockwurst-Theme-Sitepackage darüber. Entschieden 2026-07-02.
