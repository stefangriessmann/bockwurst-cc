/*
 * bockwurst.cc – Tour-Karte + Höhenprofil.
 * Liest die Tourdaten (Route + Höhenprofil) aus dem in das CE eingebetteten
 * <script type="application/json"> und rendert Leaflet-Karte + Höhenprofil-SVG.
 * Läuft nur, wenn ein Tour-Map-CE auf der Seite ist (Assets werden per f:asset
 * bedingt geladen). Kein Tracking, keine Cookies.
 */
(function () {
  'use strict';

  var COBALT = '#2B5BFF';
  var VOLT = '#C7F23A';

  function initMap(container, data) {
    var mapEl = container.querySelector('.bw-map');
    if (!mapEl || typeof L === 'undefined' || !data.route || !data.route.length) {
      return;
    }

    var map = L.map(mapEl, { scrollWheelZoom: false });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap, © CARTO',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    // Weiße Kontur unter der farbigen Linie (wie im Design).
    L.polyline(data.route, { color: '#fff', weight: 9, opacity: 0.95, lineJoin: 'round', lineCap: 'round' }).addTo(map);
    var line = L.polyline(data.route, { color: COBALT, weight: 5, opacity: 1, lineJoin: 'round', lineCap: 'round' }).addTo(map);

    if (data.start) {
      L.circleMarker(data.start, { radius: 9, color: '#fff', weight: 3, fillColor: VOLT, fillOpacity: 1 })
        .addTo(map)
        .bindPopup('Start / Ziel');
    }

    var fit = function () {
      map.invalidateSize();
      map.fitBounds(line.getBounds().pad(0.12));
    };
    fit();
    // Nach Font-/Layout-Reflow erneut einpassen.
    setTimeout(fit, 120);
  }

  function initElevation(container, data) {
    var svg = container.querySelector('.bw-elev-svg');
    var yax = container.querySelector('.bw-elev-yax');
    var xax = container.querySelector('.bw-elev-xax');
    var elev = data.elevation;
    if (!svg || !elev || !elev.altitude_m || !elev.altitude_m.length) {
      return;
    }

    var pts = elev.altitude_m;
    var dist = elev.distance_km || [];
    var total = data.totalKm || (dist.length ? dist[dist.length - 1] : pts.length);
    var W = 1000, H = 130, pad = 6, n = pts.length - 1;
    var floor = 0;
    var max = Math.max.apply(null, pts);
    var ceil = Math.max(50, Math.ceil(max / 50) * 50);

    var x = function (i) { return pad + (i / n) * (W - 2 * pad); };
    var y = function (v) { return H - pad - ((v - floor) / (ceil - floor)) * (H - 2 * pad); };

    var d = 'M' + x(0) + ',' + y(pts[0]);
    for (var i = 1; i <= n; i++) {
      d += ' L' + x(i).toFixed(1) + ',' + y(pts[i]).toFixed(1);
    }
    var area = d + ' L' + x(n).toFixed(1) + ',' + H + ' L' + x(0) + ',' + H + ' Z';

    var grid = '';
    for (var e = floor; e <= ceil; e += 50) {
      var yy = y(e).toFixed(1);
      grid += '<line x1="0" y1="' + yy + '" x2="' + W + '" y2="' + yy + '" stroke="#0C0E14" stroke-opacity=".10" stroke-width="1"/>';
    }

    svg.innerHTML =
      '<defs><linearGradient id="bw-eg" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="' + COBALT + '" stop-opacity=".35"/>' +
      '<stop offset="1" stop-color="' + COBALT + '" stop-opacity="0"/></linearGradient></defs>' +
      grid +
      '<path d="' + area + '" fill="url(#bw-eg)"/>' +
      '<path d="' + d + '" fill="none" stroke="' + COBALT + '" stroke-width="2.5" stroke-linejoin="round"/>';

    if (yax) {
      var yl = '';
      for (var e2 = floor; e2 <= ceil; e2 += 50) {
        yl += '<span style="top:' + y(e2).toFixed(1) + 'px">' + e2 + ' m</span>';
      }
      yax.innerHTML = yl;
    }

    if (xax && total) {
      var xl = '';
      var step = total > 150 ? 50 : (total > 60 ? 20 : 10);
      for (var km = 0; km <= total - step; km += step) {
        xl += '<span style="left:' + ((km / total) * 100).toFixed(1) + '%">' + km + '</span>';
      }
      xl += '<span style="left:100%">' + Math.round(total) + ' km</span>';
      xax.innerHTML = xl;
    }
  }

  function boot() {
    var containers = document.querySelectorAll('.bw-tourmap');
    Array.prototype.forEach.call(containers, function (container) {
      var holder = container.querySelector('.bw-tourmap-data');
      if (!holder) { return; }
      var data;
      try {
        data = JSON.parse(holder.textContent);
      } catch (err) {
        return;
      }
      initMap(container, data);
      initElevation(container, data);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
