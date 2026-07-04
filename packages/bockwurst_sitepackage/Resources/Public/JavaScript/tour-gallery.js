/*
 * bockwurst.cc – Tour-Galerie-Lightbox.
 * Öffnet Galerie-Bilder in einem Overlay (Vor/Zurück, ESC, Pfeiltasten).
 * Rein lokal, keine externen Abhängigkeiten. Ohne JS bleiben die Bilder
 * als normales Grid sichtbar (kein Lightbox, aber voll nutzbar).
 */
(function () {
  'use strict';

  function initGallery(gallery) {
    var figs = Array.prototype.slice.call(gallery.querySelectorAll('figure'));
    if (!figs.length) { return; }

    var lb = document.createElement('div');
    lb.className = 'bw-lb';
    lb.innerHTML =
      '<button class="bw-lb-x" aria-label="Schließen">&times;</button>' +
      '<button class="bw-lb-prev" aria-label="Zurück">&#8249;</button>' +
      '<img alt="">' +
      '<div class="bw-lb-cap"></div>' +
      '<button class="bw-lb-next" aria-label="Weiter">&#8250;</button>';
    document.body.appendChild(lb);

    var big = lb.querySelector('img');
    var cap = lb.querySelector('.bw-lb-cap');
    var idx = 0;

    function show(i) {
      idx = (i + figs.length) % figs.length;
      var fig = figs[idx];
      var img = fig.querySelector('img');
      big.src = img.getAttribute('src');
      big.alt = img.getAttribute('alt') || '';
      cap.textContent = fig.getAttribute('data-cap') || '';
      lb.classList.add('is-open');
    }
    function close() { lb.classList.remove('is-open'); big.src = ''; }

    figs.forEach(function (fig, i) {
      fig.setAttribute('role', 'button');
      fig.setAttribute('tabindex', '0');
      fig.addEventListener('click', function () { show(i); });
      fig.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(i); }
      });
    });

    lb.querySelector('.bw-lb-x').addEventListener('click', close);
    lb.querySelector('.bw-lb-prev').addEventListener('click', function (e) { e.stopPropagation(); show(idx - 1); });
    lb.querySelector('.bw-lb-next').addEventListener('click', function (e) { e.stopPropagation(); show(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) { close(); } });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) { return; }
      if (e.key === 'Escape') { close(); }
      else if (e.key === 'ArrowLeft') { show(idx - 1); }
      else if (e.key === 'ArrowRight') { show(idx + 1); }
    });
  }

  function boot() {
    var galleries = document.querySelectorAll('.bw-gallery');
    Array.prototype.forEach.call(galleries, initGallery);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
