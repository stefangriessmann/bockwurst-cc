# bockwurst.cc – Projektstatus & Wiedereinstieg

> Stand: 2026-07-02. **Zweck:** verlustfreier Wiedereinstieg (neue Session / nach Kontext-Zusammenfassung). Kurz & aktuell halten.

## Wo wir stehen
- **TYPO3 v14.3.4** lokal via **DDEV**, läuft unter `https://bockwurst-cc.ddev.site/`.
- **bockwurst-Theme** (`packages/bockwurst_sitepackage/`) auf **Bootstrap Package**: eigener **Rahmen rendert** (Header mit Logo-SVG + Slim-Footer „Kein Tracking …"), **Schriften self-hosted**, **Design-Tokens**, eigenes Page-Template.
- **Design-Pipeline**: Handoff + Konzepte in `design/`; Claude Design **liest** Repo, Claude Code **schreibt**. Neues Design: ZIP herunterladen → nach `design/` committen.
- Alles auf GitHub `stefangriessmann/bockwurst-cc`, Branch **`main`** (einziger Branch).

## Nächster Bau-Schritt (bereit, hängt an nichts)
**Tourenportal** (Details siehe `UMSETZUNGS-KONZEPT.md` §3–5):
1. Daten der 9 kuratierten Touren via **Strava-MCP** holen (downsampled, Resolution ~300) → `data/touren/<strava-id>.json` + `.gpx`. IDs in `sport-events/docs/TOUREN-KURATIERT.md`.
2. **Tour-Stats-CE** + **Tour-Map-CE** bauen (nach `design/design_handoff_bockwurst/tour-detail.html`).
3. Beispiel-Tour-Seite (MSR300, ID 18715623879) zusammensetzen.
Alternativ zuerst: **Startseite** (braucht erst Design von Claude Design; Prompt-Vorlage im Chat/Konzept).

## Wiedereinstieg – so läuft die Umgebung wieder
- **DDEV starten:** neues Terminal → `cd C:\Users\stefan.griessmann\claude\bockwurst-cc` → `ddev start` (Container liegen auf Platte). `ddev launch typo3` öffnet das Backend.
- **Backend-Login (lokal):** `admin` / `BockwurstDev2026!` (nur lokal; bei Verlust neu setzbar via `ddev exec vendor/bin/typo3 setup ... --admin-user-password=...`).
- **git/gh:** `gh` unter `C:\Program Files\GitHub CLI\gh.exe`, benutzerweit eingeloggt (keyring, stefangriessmann). Push/pull laufen. Details: Memory `bockwurst-deploy-environment`.
- **Strava-MCP:** in dieser Session verbunden (Stefan Griessmann). ⚠️ **Kann in einer neuen Session Re-Auth brauchen** — dann Strava-Connector neu verbinden, bevor Tour-Daten geholt werden.

## Wichtige Gotchas (auch im Projektgedächtnis)
- **Frame-Fix:** Nach `typo3 setup` erzeugte `config/sites/<id>/setup.typoscript` **löschen** — sie überschreibt sonst das Site-Set-`page`-Objekt (→ kein Rahmen). *(Bereits erledigt.)*
- **Secrets:** `config/system/settings.php` ist bewusst **git-ignoriert** (encryptionKey, DB) — nie committen.
- **Zeilenenden:** Editieren auf Windows kann CRLF erzeugen; bei „ganze Datei geändert"-Diffs `sed -i 's/\r$//'`.

## Governance & Detaildocs (im Repo)
`CLAUDE.md` (Regeln/Leitbild/Quellen) · `docs/TYPO3-SETUP-PLAN.md` · `docs/UMSETZUNGS-KONZEPT.md` (Baustein-Wiederverwendung, Strava-Pfad) · `docs/COOKIE-CONSENT-INVENTORY.md` · `CONTROLLING.md` (Zeit/Kosten).

## Offene Kleinigkeiten
- Kosten-Controlling: **Abo-Modell** → keine €-Grenzkosten pro Projekt; Verbrauch = **Kontingent-Anteil** (App → Usage). Optional als %-Schnappschuss in `CONTROLLING.md`. (`/cost` zeigt nur die jeweilige Session, nicht projektweit.)
- Fotos fürs Tourenportal: kein Strava-MCP-Foto-Endpoint → separat (Upload).
