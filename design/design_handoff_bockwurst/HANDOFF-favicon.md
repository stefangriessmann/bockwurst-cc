# Favicon & Social-Kachel — Übergabe (v2, freigestellt)

> Ersetzt die erste Favicon-Fassung (dunkle Kachel, bei 16px kaum erkennbar).

## Was neu ist
Favicon ist jetzt **freigestellt (transparent)** mit **fetten „c"-Ringen** (offen wie im Logo), Kobalt + Pink — klar erkennbar ab 16px, funktioniert auf hellen **und** dunklen Browser-Tabs. Zusätzlich eine **maskable**-Variante auf weißer Kachel für PWA/Homescreen.

## Dateien (in `assets/`)
- `favicon.svg` — Vektor-Favicon, transparent (Standard).
- `favicon-16.png`, `favicon-32.png` — Tab-Favicons.
- `favicon-180.png` — Apple Touch Icon (Hinweis: iOS mag Transparenz nicht → besser die maskable/weiße Kachel als Apple-Touch-Icon verwenden, s.u.).
- `favicon-512.png` — großes transparentes PNG.
- `favicon-maskable.svg` + `favicon-maskable-512.png` — weiße Kachel, für PWA `purpose:"maskable"` und Apple-Touch-Icon.
- `og-tile.png` (+ `.svg`) — Social-/OG-Kachel 1200×630 (bereits geliefert).

## Einbau im `<head>`
```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32">
<link rel="icon" href="/favicon-16.png" sizes="16x16">
<link rel="apple-touch-icon" href="/favicon-maskable-512.png">
<meta property="og:image" content="/og-tile.png">
<meta name="twitter:card" content="summary_large_image">
```
PWA-Manifest: `favicon-512.png` (`purpose:"any"`) + `favicon-maskable-512.png` (`purpose:"maskable"`).

## Regeln
- **Favicon = nur die Ringe** (kein Text — bei 16/32px unleserlich).
- Transparent als Standard; weiße Kachel überall dort, wo kein Alpha erlaubt ist (iOS-Homescreen).
- Referenz-Screens: `explorations/favicon.card.html` (Größen) und `explorations/favicon-in-context.html` (Tab/Lesezeichen/App-Icon).
