/*
 * bockwurst.cc – dezentes Scroll-Reveal für die Tour-Detailseite.
 * Blendet Hero + gestapelte Inhaltsblöcke beim Reinscrollen sanft ein.
 * Respektiert prefers-reduced-motion (dann passiert nichts, alles bleibt sichtbar).
 * Ohne JS/ohne IntersectionObserver bleibt ebenfalls alles sichtbar (kein FOUC-Risiko
 * für Nutzer ohne die Animation).
 */
(function () {
  'use strict';

  if (!('IntersectionObserver' in window)) { return; }
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { return; }

  // Erst wenn Animation wirklich läuft, wird der versteckte Anfangszustand aktiv.
  document.documentElement.classList.add('bw-anim');

  function boot() {
    var els = document.querySelectorAll('.bw-hero, .bw-tour-content > *');
    if (!els.length) { return; }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    Array.prototype.forEach.call(els, function (el) {
      el.classList.add('bw-reveal');
      io.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
