/*
 * bockwurst.cc – Startseite: Scroll-Reveal + Count-up.
 * Respektiert prefers-reduced-motion (dann alles sofort sichtbar, Zahlen final).
 * Ohne JS/IntersectionObserver bleibt alles sichtbar (Zahlen sind serverseitig final gerendert).
 */
(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  function fmt(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target)) { return; }
    var suffix = el.getAttribute('data-suffix') || '';
    var start = null, dur = 1100;
    function step(ts) {
      if (start === null) { start = ts; }
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(target * eased)) + suffix;
      if (p < 1) { requestAnimationFrame(step); }
    }
    requestAnimationFrame(step);
  }

  function boot() {
    if (reduce || !hasIO) { return; }
    document.documentElement.classList.add('bw-anim');

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        entry.target.classList.add('is-in');
        var counter = entry.target.querySelector ? entry.target.querySelector('[data-count]') : null;
        if (entry.target.hasAttribute && entry.target.hasAttribute('data-count')) { countUp(entry.target); }
        var counters = entry.target.querySelectorAll ? entry.target.querySelectorAll('[data-count]') : [];
        Array.prototype.forEach.call(counters, countUp);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

    Array.prototype.forEach.call(document.querySelectorAll('.bw-reveal'), function (el) { io.observe(el); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
