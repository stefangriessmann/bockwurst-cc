# Favicon & Social-Kachel — Übergabe

## Dateien (in `assets/`)
- `favicon.svg` — Vektor-Favicon (zwei halb-offene „c"-Räder, Kobalt + Pink auf Ink, `rx=14`).
- `favicon-16.png`, `favicon-32.png`, `favicon-48.png` — klassische Tab-Favicons.
- `favicon-180.png` — Apple Touch Icon.
- `favicon-512.png` — PWA / App-Icon.
- `og-tile.png` (+ `.svg`) — Social-/OG-Kachel 1200×630 (Räder + Wortmarke `bockwurst.cc` + Claim „Stefans Rennrad Welt").

## Einbau im `<head>`
```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32">
<link rel="icon" href="/favicon-16.png" sizes="16x16">
<link rel="apple-touch-icon" href="/favicon-180.png">
<meta property="og:image" content="/og-tile.png">
<meta name="twitter:card" content="summary_large_image">
```

## Regeln
- **Favicon = nur die Räder** (kein Text — bei 16/32px unleserlich).
- Text nur in breiten Formaten: OG-Kachel oder die bestehende Wortmarke im Header.
- Für TYPO3: Dateien in `Resources/Public/Icons/` (o. ä.) ablegen und die `<head>`-Referenzen im Site-Package setzen; PNGs ggf. als `favicon.ico`-Bundle zusätzlich generieren.
