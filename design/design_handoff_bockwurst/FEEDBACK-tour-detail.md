# Feedback — Tour-Detailseite (1. Iteration)

> Von Claude Design (liest Repo) an Claude Code. Referenz: `design/design_handoff_bockwurst/tour-detail.html`.
> Stand geprüft: `main` @ 1b75d59 — `TourStats.html`, `TourMap.html`, `tour-map.js`, `bockwurst-tour.css`, `bockwurst-tokens.css`.

## ✅ Originalgetreu (so lassen)
- **Tokens** (`bockwurst-tokens.css`): Farben, Typescale, Schatten, Radien exakt; Fonts self-hosted; Logo-Lockup (cc-Räder cobalt/pink), Header/Footer-Rahmen, Link-Hover→Pink.
- **TourStats-CE**: 5 Kacheln inkl. `avg_watts`→Kalorien-Fallback.
- **TourMap-CE**: Leaflet (weiße Kontur + Cobalt-Linie + Volt-Start), Höhenprofil-SVG mit Cobalt-Gradient, GPX/Strava-Buttons, self-hosted & bedingt geladen.

## 🐞 Bugs / Abweichungen
1. **Höhenprofil – rechtes km-Label wird abgeschnitten.** End-Label sitzt bei `left:100%`, CSS `.bw-elev-xax span{transform:translateX(-50%)}` zentriert → rechte Hälfte ragt raus/kollidiert.
   **Fix:** letztes Label rechtsbündig (`transform:translateX(-100%)`) — im JS als Sonderfall ausgeben oder per `:last-child`-Regel. Oberstes Y-Label (`top:6px`) analog `translateY(0)`, sonst clippt es oben.
2. **Content-Breite:** `--maxw:1280px` (Event-Guide). **Tour-Seite = 1080px** — sicherstellen, dass die Tour wirklich eine 1080er-Spalte nutzt.
3. **Reihenfolge/Vollständigkeit:** aktuell nur *Stats + Map*. Soll-Reihenfolge:
   **Hero → Highlights → Map+Höhenprofil → Video → Soundtrack → Bericht → Galerie**.

## 🔲 Fehlende Blöcke (Design-Spec)
- **Hero**: vollflächiges Bild, Titel als **einziges `<h1>`** (Bricolage 800), Eckdaten als Overlay/darunter.
- **Highlights** direkt **unter dem Hero** (kurze Karten/Chips) — nicht am Seitenende.
- **YouTube** (2-Klick, statisches Vorschaubild, kein Embed/Consent) — Video `YmrZUVxX2yw`.
- **Soundtrack (Spotify-Embed)**: **breitenbegrenzt** (nicht full-bleed), klarer Abstand nach unten.
- **Bericht**: `.prose`-Maß (~65ch, `--fs-lead`/`--fs-body`, großzügige Absatzabstände), Persönlichkeits-Headlines.
- **Bildergalerie am Ende des Berichts** mit **sichtbaren Bildunterschriften unter jedem Bild** + Lightbox (Upload-Fotos).

## 🎛️ Qualität / State-of-the-art
- **Vertikaler Rhythmus** zwischen gestapelten CEs vereinheitlichen (8px-System, konsistente Section-Paddings).
- **Motion** dezent (Scroll-Reveal, Count-up), `prefers-reduced-motion` respektieren.
- **A11y/SEO**: genau ein `<h1>`, Landmarks `header/main/section/footer`, `SportsEvent`/`Article`-JSON-LD für die Tour (wie im Event-Guide).
- **DE/EN** für neue Blöcke (Video/Soundtrack/Galerie-Captions) mitziehen.

## Fazit
Fundament (Tokens, Stats, Karte) originalgetreu. Für „fertige Detailseite" fehlen v. a. **Hero, Highlights, Video, Soundtrack, Bericht-Prose, Galerie** in richtiger Reihenfolge, plus **km-Label-Fix** im Höhenprofil und **1080px-Spalte**.
