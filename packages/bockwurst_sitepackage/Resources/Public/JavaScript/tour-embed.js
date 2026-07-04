/*
 * bockwurst.cc – generisches Click-to-Load für externe Medien (YouTube, Spotify …).
 * Ein Element mit [data-embed-src] wird erst auf Nutzerklick durch ein <iframe>
 * ersetzt. Vor dem Klick wird nichts an den Drittanbieter übertragen = Einwilligung.
 * Ohne JS bleibt der href des Elements als Fallback (öffnet den Dienst extern).
 *
 * Attribute:
 *   data-embed-src     (Pflicht) iframe-URL
 *   data-embed-title   Titel für a11y
 *   data-embed-height  feste Höhe in px (z. B. Spotify-Player); fehlt → 16:9
 */
(function () {
  'use strict';

  function loadEmbed(trigger) {
    var src = trigger.getAttribute('data-embed-src');
    if (!src) { return; }
    var height = trigger.getAttribute('data-embed-height');

    var frame = document.createElement('div');
    frame.className = 'bw-embedframe' + (height ? ' bw-embedframe--fixed' : '');

    var iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.title = trigger.getAttribute('data-embed-title') || 'Eingebetteter Inhalt';
    iframe.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture; clipboard-write; fullscreen');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    iframe.setAttribute('loading', 'lazy');
    if (height) { iframe.style.height = parseInt(height, 10) + 'px'; }

    frame.appendChild(iframe);
    trigger.parentNode.replaceChild(frame, trigger);
  }

  function boot() {
    var triggers = document.querySelectorAll('[data-embed-src]');
    Array.prototype.forEach.call(triggers, function (trigger) {
      trigger.addEventListener('click', function (event) {
        event.preventDefault();
        loadEmbed(trigger);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
