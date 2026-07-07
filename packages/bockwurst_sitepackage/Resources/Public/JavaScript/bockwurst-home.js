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

  // 6-Points-Countdown bis 2027-05-14 09:00 (Europe/Berlin). Läuft unabhängig
  // von prefers-reduced-motion (Information, keine Animation). Ohne JS bleibt
  // der serverseitige Fallback („14. Mai 2027 · Mallorca") stehen.
  function initCountdown() {
    var el = document.getElementById('bw-cd');
    if (!el) { return; }
    var target = new Date('2027-05-14T09:00:00').getTime();
    function tick() {
      var s = Math.max(0, Math.floor((target - Date.now()) / 1000));
      var d = Math.floor(s / 86400); s -= d * 86400;
      var h = Math.floor(s / 3600); s -= h * 3600;
      var m = Math.floor(s / 60);
      var units = [[d, 'Tage'], [h, 'Std'], [m, 'Min']];
      el.innerHTML = units.map(function (u) {
        return '<div class="bw-cd-u"><b>' + u[0] + '</b><span>' + u[1] + '</span></div>';
      }).join('');
    }
    tick();
    setInterval(tick, 60000);
  }

  // Mobile-Navigation: Burger toggelt das Nav-Panel (≤720px). Schließt beim
  // Klick auf einen Link. Ohne JS bleibt die Nav auf Mobile ausgeblendet
  // (Sektionen sind auch per Scroll erreichbar).
  function initNav() {
    var burger = document.querySelector('.bw-burger');
    var nav = document.getElementById('bw-nav-home');
    if (!burger || !nav) { return; }
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Menü öffnen');
      }
    });
  }

  function boot() {
    initCountdown();
    initNav();
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
