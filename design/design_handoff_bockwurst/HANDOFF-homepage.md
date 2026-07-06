# Handoff — Startseite (Homepage / Marken-Wegweiser)

> Von Claude Design an Claude Code. Referenz-Design: `design/design_handoff_bockwurst/home.html` (in diesem Ordner beigelegt).
> Status: **vom Kunden abgenommen.** Strikt im bestehenden Design-System (Tokens/Farben/Typo/Logo) umsetzen — TYPO3 Fluid, serverseitige Daten.

## Seitenreihenfolge (Blöcke)
1. **Sticky-Header** — Logo-Lockup (cc-Speichenräder cobalt+pink) + Claim „Stefans Rennrad Welt", DE/EN-Umschalter, Nav: Events · Touren · Über · Zwift · 6 Points; Burger < 900px.
2. **Hero** — Kicker, H1 „Stefans Rennrad Welt." (letzte Zeile pink, **einziges `<h1>`**), Lead, 2 CTAs (primär cobalt „Neueste Tour ansehen", ghost „Zum Event-Guide"), Count-up-Stats (90+ Videos · 1.000+ Events · 4 Länder) + große Tour-Karte (Bild, Tag, Titel, Daten, Volt-Play).
3. **Touren & Videos** — Section-Label + H2, 3er-Kartenraster (Bild, Kategorie-Tag, H3-Titel, Region · km · ▶ Video), Hover-Zoom/Lift. „Alle Touren →".
4. **6 Points** — dunkler Banner: Logo (weiß), Botschafter-Zeile, H2 mit „Mallorca" (sun/gelb), Text, **Live-Countdown bis 2027-05-14 09:00**, Volt-CTA „Startplatz sichern →" → `https://6pointschallenges.com/product/mallorca-may-2027/`, Foto rechts (mobil oben).
5. **Event-Teaser** — getönter/gepunkteter Grund, 5 aktuellste Events (Datum-Block, Kategorie-Badge+Dot, Ort, LV, Distanz), Absprung „Zum Event-Guide →".
6. **YouTube-Shorts** — 4 Hochkant-Kacheln (9:13), statisches Vorschaubild + YT-Marker, **2-Klick/consent-frei** → Kanal. Keine Embeds.
7. **Über Bockwurst** — Foto + Section-Label + H2 „Positiv bekloppt. Rennrad-verliebt…" + Anriss + „Meine Geschichte →".
8. **Footer** (dunkel):
   - **Engagement-Band** (oben, zentriert): Label + H3 „Wofür ich mit im Sattel sitze"; zwei **freigestellte Logos auf Schwarz**, verlinkt:
     - **6 Points** (`6points-logo-white.png`) → `https://6pointschallenges.com` · Rolle „Markenbotschafter Deutschland" (volt) · Claim „Cycling-Challenge auf Mallorca".
     - **Triathlon Chemnitz e.V.** (`triathlon-chemnitz-white.png` = Original mit auf **weiß umgefärbtem** „CHEMNITZ e.V."-Schriftzug, farbige Figuren erhalten) → `https://www.triathlonchemnitz.de` · Rolle „Mitglied & Aushilfstrainer" · Claim „Wir bewegen Chemnitz" / „We move Chemnitz".
     - feine vertikale Trennlinie zwischen beiden; mobil untereinander.
   - **Spalten:** Logo + Claim · Entdecken · Kanäle (YouTube, 6 Points, Zwift, Strava) · Rechtliches (Impressum, Datenschutz).
   - **Leiste:** „© Stefan Grießmann · bockwurst.cc" (Zeile „Kein Tracking · Keine Cookies · Werbefrei" wurde entfernt).

## Design-System (einhalten)
- Farben: `--ink #0C0E14 · --bg #FFFFFF · --soft #F4F6F9 · --line #E7EAF0 · --mut #4C5363 · --cobalt #2B5BFF · --pink #FF2E86 · --volt #C7F23A · green #13C766 · cyan #1FB6C9 · yellow #FBC400`. Cobalt = Identität, Pink = Twist (sparsam), Volt = Action/Signal.
- Typo: Bricolage Grotesque 800 (Headlines), Familjen Grotesk (Text), JetBrains Mono (Labels/Daten, uppercase, wide tracking). clamp()-Typescale wie im Referenz-`<style>`.
- Spacing 8px-System; Card-Schatten `--card-sh`; Radien 14–20px, Pills 999px; gepunktete Textur auf getönten Flächen.
- Motion dezent: Scroll-Reveal (fade + 16px), Count-up bei Sichtbarkeit, Hover-Lift; **`prefers-reduced-motion` respektieren**.
- Zweisprachig via `data-de`/`data-en`, `<html lang>` + Claim/Slogans mitschalten (auch „We move Chemnitz").
- A11y/SEO: genau ein `<h1>`, `header/main/section/footer`-Landmarks; selbst gehostete Schriften; werbefrei, kein Tracking.

## Assets (in diesem Ordner)
`home.html` (Referenz), `6points-logo-white.png`, `triathlon-chemnitz-white.png`, plus Foto-Platzhalter (MSR300/Mallorca). Touren/Events/Shorts/Über-Texte später mit echten Daten füllen.

## Hinweise
- Referenz-HTML = **Design-Vorlage**, nicht 1:1 ausliefern — in Fluid mit CMS-Daten nachbauen.
- Countdown, Shorts, Event-Teaser aus echten Quellen speisen (YouTube-Feed, Event-Snapshots).
