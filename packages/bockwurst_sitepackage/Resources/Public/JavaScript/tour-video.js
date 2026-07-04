/*
 * bockwurst.cc – Tour-Video Click-to-Load.
 * Ersetzt die statische Vorschau erst auf Nutzerklick durch das
 * youtube-nocookie-Embed (autoplay). Bis dahin wird nichts an YouTube
 * übertragen. Ohne JS bleibt der Link (öffnet YouTube extern) als Fallback.
 */
(function () {
  'use strict';

  function loadEmbed(thumb) {
    var id = thumb.getAttribute('data-yt');
    if (!id) { return; }

    var frame = document.createElement('div');
    frame.className = 'bw-ytframe';

    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0';
    iframe.title = thumb.getAttribute('data-title') || 'YouTube-Video';
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    iframe.setAttribute('loading', 'lazy');

    frame.appendChild(iframe);
    thumb.parentNode.replaceChild(frame, thumb);
  }

  function boot() {
    var thumbs = document.querySelectorAll('.bw-ytthumb[data-yt]');
    Array.prototype.forEach.call(thumbs, function (thumb) {
      thumb.addEventListener('click', function (event) {
        event.preventDefault();
        loadEmbed(thumb);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
