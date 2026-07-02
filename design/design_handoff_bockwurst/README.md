# Handoff: bockwurst.cc — Event-Guide & Tour-Detailseite

## Overview
Design references for **bockwurst.cc** ("Stefans Rennrad Welt" / "Stefan's Cycling World") — the cycling content brand of Stefan Grießmann (Chemnitz). Two surfaces are covered:

1. **Event-Guide** — a bilingual (DE/EN) event finder: 1000+ road, triathlon, swim and run events across Germany, filterable by sport, period and postcode radius, shown as list or calendar. This is a **re-skin of the existing live app** (`bockwurst-events.netlify.app`) in the new corporate design.
2. **Tour-Detailseite** — a tour/event story page: hero, key stats, Leaflet route map, elevation profile, YouTube video (2-click / no-consent), a Spotify soundtrack embed, a long-form report, highlights, and an image gallery with captions.

Target platform: **responsive website in TYPO3 (current LTS)**.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing the intended look and behavior, **not** production code to copy verbatim. The task is to **recreate these designs in the target codebase's environment** (TYPO3 Fluid templates + its JS/CSS pipeline) using its established patterns. Where behavior is described below, implement it against real data sources (the existing event snapshots, GPX files, YouTube feed, Spotify) rather than the embedded sample data.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, interactions and copy are all in place. Recreate pixel-perfectly. The embedded event data, GPX route, images, and video/playlist IDs are **real sample content** standing in for CMS-driven fields — treat them as placeholders for dynamic data.

---

## Brand & Design Tokens

### Colors
| Token | Hex | Role |
|---|---|---|
| `--ink` | `#0C0E14` | Text, dark bands, footer, primary borders |
| `--bg` | `#FFFFFF` | Page background |
| `--soft` | `#F4F6F9` | Section tint / cards ground |
| `--line` | `#E7EAF0` | Hairline borders |
| `--mut` | `#4C5363` | Muted / secondary text (AA-contrast on white) |
| `--cobalt` | `#2B5BFF` | **Primary** — logo, links, primary buttons, "Rad" category |
| `--pink` | `#FF2E86` | **Secondary brand accent** — logo 2nd wheel, title hover, Triathlon category. Used sparingly. |
| `--volt` | `#C7F23A` | **Action/signal** — Early-bird/CTA highlights, play buttons. Never in the logo. |
| `--green` | `#13C766` | Sport category: Laufen (run) |
| `--cyan` | `#1FB6C9` | Sport category: Schwimmen (swim) |
| `--yellow` | `#FBC400` | Sport category / highlight accents |

**Color system rules:** Cobalt = identity/primary. Pink = playful twist, derived from the logo, used sparingly (title hover, must-see pill, triathlon). Volt-green = action/signal only. The neon quartet (blue/green/pink/yellow) is the **functional sport-category scale** (dots/badges), not decoration.

### Typography (Google Fonts)
- **Bricolage Grotesque** (800) — display / headlines, tight tracking `-.02em`/`-.03em`
- **Familjen Grotesk** (400–700) — body copy
- **JetBrains Mono** (400/500) — data, labels, kickers, dates, km (uppercase, wide letter-spacing `.1em`–`.26em`)

Type scale (CSS custom props):
`--fs-hero:clamp(34px,5vw,58px)` · `--fs-h2:clamp(24px,3vw,34px)` · `--fs-h3:20px` · `--fs-lead:18px` · `--fs-body:16px` · `--fs-sm:14px` · `--fs-label:12px` · `--fs-micro:11px`

Heading hierarchy is semantic: one H1 (hero), H2 per section, H3 for sub-blocks (promo card titles, etc.).

### Shape, shadow, spacing
- Content column: `--maxw:1080px` (tour) / `1280px` (event-guide), centered, side padding `clamp(16–20px,3–4vw,40–48px)`.
- Radii: cards 14–20px, pills/buttons 999px.
- Card shadow: `--card-sh: 0 1px 2px rgba(16,20,30,.05), 0 14px 28px -16px rgba(16,20,30,.16)`; hover `--card-sh-h: 0 2px 6px rgba(16,20,30,.07), 0 26px 46px -20px rgba(16,20,30,.30)`.
- Subtle dotted page texture on tinted grounds: `radial-gradient(rgba(16,20,30,.045) 1px, transparent 1.5px)` @ 24px.
- Spacing rhythm is 8px-based; sections ~clamp(40–90px) vertical.

### Logo
Wordmark `bockwurst.cc` in Bricolage 800; the two "c"s of `.cc` are drawn as **spoked bike wheels** (SVG, first wheel cobalt, second pink). The dot before "cc" is cobalt. On dark grounds: wordmark white, wheels stay cobalt+pink. Claim below (mono, uppercase): "Stefans Rennrad Welt" / "Stefan's Cycling World". A standalone two-wheel mark is used as favicon/avatar.

### Motion
Dezent, keine Schrift-Animationen. Scroll-reveal (fade + 18px rise, `cubic-bezier(.16,1,.3,1)`), count-up numbers when in view, subtle hero image parallax, hover lifts (`translateY(-2/-3px)`). All gated behind `prefers-reduced-motion`.

---

## Bilingual (DE/EN)
Every visible string carries `data-de` / `data-en`; a DE/EN toggle swaps `innerHTML` and `document.documentElement.lang`. The claim also switches. Default `de`.

---

## Surface A — Event-Guide (`bockwurst-events/relaunch.html`)

**Layout (top→bottom):**
- **Sticky header** — logo lockup + claim; nav currently shows only "Event-Guide" (Touren / Tipps & Tricks / Indoor Cycling are planned but hidden in this version); DE/EN toggle. Header enlarges the logo (~27–34px).
- **Ink title band** — kicker ("Event-Guide · kostenlos & werbefrei · Stand …"), H1 "Finde dein nächstes Rennen.", lead.
- **Promo row (2 cards, equal height):**
  - **6Points card** (dark) — kicker H3 "Event-Highlight", local white 6Points logo (`assets/6points-logo-white.png`), "★ Markenbotschafter Deutschland · Stefan", copy "Rund um Mallorca. 3 Tage, traumhafte Strecke, eine gute Sache. Fahr mit mir mit.", **live countdown to 2027-05-14 09:00** labelled "Countdown bis zum Start", CTA "Startplatz sichern →" → `https://6pointschallenges.com/product/mallorca-may-2027/`.
  - **YouTube card** (dark, ink) — kicker H3 "Neuestes Video", static preview image (`assets/yt-preview.png` = repo `og-image.png`), "★ Must-See" pill, duration badge, channel "Stefan_Rennrad_Chemnitz", title. The whole thumbnail is an `<a>` to `youtube.com/watch?v=…` (new tab) — **no embed, no cookie consent**. "Abonnieren" links to the channel.
- **Eventsuche block** — H2 "Eventsuche" + sub "Sportart, Zeitraum & Umkreis wählen"; sport buttons (Radsport/Triathlon/Schwimmen/Laufen/Alle, each with house line-icon + category color); filter bar: **Zeitraum** select (Alle / Dieses Wochenende / Diesen Monat / Nächste 30 Tage / Eigener Zeitraum… → reveals Von/Bis date inputs), **In der Nähe (PLZ)** input, **Umkreis** select, **Event-Typ** dropdown (checkbox popover, closes on outside-click), **↺ Zurücksetzen**.
- **Result bar** — stat tiles (Treffer / Diese Woche / Event-Typen / Gemerkt) + a refined **Ansicht** segmented switch (Liste / Kalender) with a sliding ink indicator and hover icon-rotation. Switch hidden on mobile (list only).
- **Liste** — event cards: left date block (day/mon/weekday, weekend highlighted green), title (clickable `<a>` to event URL, **hover → pink**), meta line (badge with category dot + type, Ort, Verein, "DE · LV"), distance chip when PLZ set, distance/strecken pills right. "Mehr Events laden" pagination (8 per page) with "x von y angezeigt".
- **Kalender** — events grouped by month into cards.
- **Event vorschlagen** — collapsible **side tab** (right edge, slides out on hover, arrow icon rotates 180°); mobile = round button bottom-right. Opens a modal form (Titel, Sportart, Datum, Ort, PLZ, Strecke, Link) → success state; note "Dein Vorschlag wird geprüft und dann freigeschaltet."
- **Slim footer** (matches live) — logo (blue+pink, white wordmark), Impressum / Datenschutzerklärung (open legal modals), "© Stefan Grießmann · bockwurst.cc · Kein Tracking · Keine Cookies · Werbefrei".

**Data model per event:** `art, datum(date_iso), titel, ort, plz, strecken, verein, lv, country, url, lat, lon`. Split into 4 snapshots (rad / tri / lauf / swim). Sport derived from `art` via a type→sport map.

**Distance filter:** Haversine from a postcode centroid (live uses full PLZ_MAP + geocoding; sample uses a small PLZ table). Shows "~N km" and filters by radius.

**SEO/GEO/AEO already wired in `relaunch.html` head:** title/description/keywords/canonical/hreflang(de,en,x-default)/robots, Open-Graph + Twitter cards, and JSON-LD (`WebSite` + `Person` + `CollectionPage`, plus a dynamically built `ItemList` of `SportsEvent` objects with geo/organizer). In TYPO3, render events **server-side** so crawlers see the list in the DOM.

**Icons:** bespoke house line-icon set (single 2px stroke, geometric, `currentColor`) — bike, waves/swim, tri, run, grid, list, calendar, star, route, etc. No emoji as UI icons.

## Surface B — Tour-Detailseite (`bockwurst-website/tour-detail.html`)

**Layout:** hero (image + title + key stats) → **Highlights** (just under hero) → route **map (Leaflet)** + **elevation profile** (real GPX polyline; rightmost elevation label must not overlap the axis) → **YouTube video** (2-click) → **Soundtrack** (Spotify embed, constrained width, proper bottom spacing) → long-form **Bericht** (report prose, personality-rich headlines) → **image gallery** at the end of the report with **visible captions under each image** + lightbox. Column `--maxw:1080px`.

**Voice/personality:** copy is warm, self-deprecating, upbeat ("306 Kilometer, eine Nacht, null Schlaf — selbst schuld, aber glücklich"). Keep this tone.

---

## Interactions & Behavior
- DE/EN toggle (see above).
- Event-Guide: sport select resets type filters; Zeitraum "Eigener Zeitraum" reveals date range; type dropdown = checkbox popover, outside-click closes; view switch slides indicator; "Mehr laden" paginates; suggest side-tab hover slide-out + modal; star to save (updates "Gemerkt" count).
- YouTube: static image + `<a>` to watch URL, **no iframe/consent**.
- Tour: Leaflet map with route polyline + markers; elevation profile SVG; gallery lightbox.
- Countdown ticks to 2027-05-14 09:00.
- All motion respects `prefers-reduced-motion`.

## Assets
- `assets/6points-logo-white.png` — official 6Points logo (white), user-supplied.
- `assets/yt-preview.png` — YouTube preview (= repo `og-image.png`).
- Tour images — real ride photos, embedded as data-URIs in the standalone export.
- Logo & house icons — inline SVG (no icon font).
- Fonts — Google Fonts CDN (Bricolage Grotesque, Familjen Grotesk, JetBrains Mono).
- Map — Leaflet 1.9.4 + CARTO light tiles (event-guide map was removed; tour page uses Leaflet).

## Files in this bundle
- `relaunch.html` — **Event-Guide**, full re-skin (the primary reference for that surface).
- `preview.html` — Event-Guide with a Desktop/Mobile toggle (view persists via localStorage).
- `tour-detail.html` — **Tour-Detailseite** source.
- `tour-detail-standalone.html` — fully self-contained tour page (images inlined) — good for offline review.
- `EventTable.jsx`, `CalendarView.jsx`, `PromoZone.jsx`, `Sidebar.jsx`, `Header.jsx`, `app.jsx`, `sample-data.jsx` — earlier React component breakdown of the finder (reference for structure).
- Design-system source lives in the project root: `styles.css` + `tokens/` (colors, typography, spacing, fonts, base), `components/`, `readme.md`, `SKILL.md`.

## Notes
- The bundled HTML are **design references** — recreate in TYPO3 Fluid with server-side data, not shipped as-is.
- Fonts load from Google CDN; for offline/self-hosting drop woff2 into the theme and swap the `@import` for `@font-face`.
- Event data here is a static sample; wire the live snapshot pipeline + full PLZ map in TYPO3.
