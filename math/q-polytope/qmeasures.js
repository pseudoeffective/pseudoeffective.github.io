/* Figure 1, interactive: the coefficients of the generalized Rogers–Szegő polynomial of kP
   (the left-hand side of Theorem 1) for the hexagon P, as a function of q and of k
   (the printed figure has k = 30).

   This is Fpermutahedron2[k, i, j, q] from the notebook q-local1.nb: the q-multinomial
       [ 6k ; x, y, k+y-x, 2k-x, 2k-y, k+x-y ]_q   on the grid 0 <= x, y <= 2k,
   and 0 off kP (where some entry is negative). It is computed in log form,
   log (q;q)_n = sum_{i<=n} log(1 - q^i), and drawn as columns, like DiscretePlot3D with
   ExtentSize -> Full and the TemperatureMap colours, heights scaled so that the largest
   coefficient is 1. Drag (or arrow keys) to turn the plot. */
(function () {
  'use strict';
  var fig = document.getElementById('applet-qmeasures');
  if (!fig) return;
  var canvas = fig.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  var slider = fig.querySelector('#q-slider');
  var kSlider = fig.querySelector('#k-slider');
  var qOut = fig.querySelector('[data-out="q"]');
  var kOut = fig.querySelector('[data-out="k"]');
  var peakOut = fig.querySelector('[data-out="peak"]');
  var playButton = fig.querySelector('[data-play]');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // the dilation kP: a (2k+1) x (2k+1) grid, and |a| = 6k
  var K, N, TOTAL, heights;
  function setK(k) {
    K = k; N = 2 * K + 1; TOTAL = 6 * K;
    heights = new Float64Array(N * N);
    orderKey = '';
  }
  var view = { az: -0.62, el: 0.62 };
  var VIEWS = { tilted: { az: -0.62, el: 0.62 }, above: { az: 0, el: Math.PI / 2 } };

  // ---------------------------------------------------------------- the coefficients
  function compute(q) {
    var L = new Float64Array(TOTAL + 1), qi = 1;
    for (var n = 1; n <= TOTAL; n++) { qi *= q; L[n] = L[n - 1] + Math.log1p(-qi); }
    var logs = new Float64Array(N * N), max = -Infinity, count = 0, ai = 0, aj = 0;
    for (var i = 0; i < N; i++) {
      for (var j = 0; j < N; j++) {
        var e3 = K + j - i, e6 = K + i - j, e4 = 2 * K - i, e5 = 2 * K - j, v;
        if (e3 < 0 || e6 < 0) v = -Infinity;
        else v = L[TOTAL] - L[i] - L[j] - L[e3] - L[e4] - L[e5] - L[e6];
        logs[i * N + j] = v;
        if (v > max + 1e-9) { max = v; count = 1; ai = i; aj = j; }
        else if (Math.abs(v - max) <= 1e-9) count++;
      }
    }
    for (var k = 0; k < N * N; k++) heights[k] = logs[k] === -Infinity ? 0 : Math.exp(logs[k] - max);
    // count > 1: the maximum is attained (to 9 digits) at several points; for small q the
    // coefficients deep inside kP agree to many digits, and at q = 0 they are all 1
    return { q: q, log10: max / Math.LN10, count: count, at: [ai, aj] };
  }

  // ---------------------------------------------------------------- colours
  // an approximation of Mathematica's "TemperatureMap"
  var STOPS = [[0, 0.43, 0.57, 0.95], [0.25, 0.70, 0.80, 0.97], [0.45, 0.96, 0.96, 0.94],
               [0.65, 0.98, 0.90, 0.50], [0.82, 0.97, 0.66, 0.38], [1, 0.91, 0.38, 0.38]];
  var SHADES = [1, 0.82, 0.66];  // top, and the two visible sides
  var LUT = [];
  (function () {
    for (var t = 0; t < 256; t++) {
      var x = t / 255, s = 1;
      while (s < STOPS.length - 1 && STOPS[s][0] < x) s++;
      var a = STOPS[s - 1], b = STOPS[s], u = (x - a[0]) / (b[0] - a[0]);
      var rgb = [1, 2, 3].map(function (c) { return a[c] + u * (b[c] - a[c]); });
      LUT.push(SHADES.map(function (f) {
        return 'rgb(' + rgb.map(function (c) { return Math.round(255 * c * f); }).join(',') + ')';
      }));
    }
  })();

  // ---------------------------------------------------------------- drawing
  var order = null, orderKey = '';
  setK(parseInt(kSlider.value, 10));
  function sortCells(c, s) {
    var key = K + ':' + Math.sign(c).toFixed(0) + Math.sign(s).toFixed(0) + Math.round(view.az * 50);
    if (key === orderKey) return;
    orderKey = key;
    order = [];
    for (var k = 0; k < N * N; k++) order.push(k);
    var depth = function (k) { var x = Math.floor(k / N) - K, y = K - k % N; return x * s + y * c; };
    order.sort(function (a, b) { return depth(a) - depth(b); });
  }

  var W = 0, H = 0, dpr = 1;
  function resize() {
    dpr = window.devicePixelRatio || 1;
    var r = canvas.getBoundingClientRect();
    W = Math.max(1, Math.round(r.width * dpr));
    H = Math.max(1, Math.round(r.height * dpr));
    if (canvas.width !== W || canvas.height !== H) { canvas.width = W; canvas.height = H; }
    draw();
  }

  function draw() {
    if (!W) return;
    var c = Math.cos(view.az), s = Math.sin(view.az);
    var se = Math.sin(view.el), ce = Math.cos(view.el);
    var Z = 0.42 * N;  // height of the tallest column (Mathematica's default box ratios)
    // fit the whole box [-K-.5, K+.5]^2 x [0, Z] into the canvas, whatever q is
    var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    [-K - 0.5, K + 0.5].forEach(function (x) {
      [-K - 0.5, K + 0.5].forEach(function (y) {
        [0, Z].forEach(function (z) {
          var px = x * c - y * s, py = (x * s + y * c) * se - z * ce;
          minX = Math.min(minX, px); maxX = Math.max(maxX, px);
          minY = Math.min(minY, py); maxY = Math.max(maxY, py);
        });
      });
    });
    var pad = 0.04 * Math.min(W, H);
    var scale = Math.min((W - 2 * pad) / (maxX - minX), (H - 2 * pad) / (maxY - minY));
    var ox = W / 2 - scale * (minX + maxX) / 2, oy = H / 2 - scale * (minY + maxY) / 2;
    function P(x, y, z) { return [ox + scale * (x * c - y * s), oy + scale * ((x * s + y * c) * se - z * ce)]; }

    sortCells(c, s);
    ctx.clearRect(0, 0, W, H);
    ctx.lineJoin = 'round';
    ctx.lineWidth = Math.max(0.5, 0.35 * dpr);
    ctx.strokeStyle = 'rgba(20, 24, 40, 0.28)';
    edges = scale > 3.2 * dpr;  // column edges only while the cells are big enough to show them
    var sides = view.el < 1.5;
    // which two side faces point towards the viewer: +x, -x, +y, -y
    var fx = s > 0 ? 0.5 : -0.5, fy = c > 0 ? 0.5 : -0.5;
    // the neighbours in front of those faces, as index steps: x + 1 is i + 1, y + 1 is j - 1
    var di = fx > 0 ? 1 : -1, dj = fy > 0 ? -1 : 1;
    for (var n = 0; n < order.length; n++) {
      var k = order[n], i = Math.floor(k / N), j = k % N, x = i - K, y = K - j, h = heights[k];
      var z = h * Z, col = LUT[Math.min(255, Math.round(h * 255))];
      if (sides && z > 1e-3) {
        // the face at x + fx, then the face at y + fy; only the part above the neighbour in
        // front of it shows (the neighbour is drawn later and covers the rest)
        var ni = i + di, z1 = (ni >= 0 && ni < N) ? heights[ni * N + j] * Z : 0;
        if (z1 < z - 1e-6) {
          quad(P(x + fx, y - 0.5, z1), P(x + fx, y + 0.5, z1), P(x + fx, y + 0.5, z), P(x + fx, y - 0.5, z), col[1]);
        }
        var nj = j + dj, z2 = (nj >= 0 && nj < N) ? heights[i * N + nj] * Z : 0;
        if (z2 < z - 1e-6) {
          quad(P(x - 0.5, y + fy, z2), P(x + 0.5, y + fy, z2), P(x + 0.5, y + fy, z), P(x - 0.5, y + fy, z), col[2]);
        }
      }
      quad(P(x - 0.5, y - 0.5, z), P(x + 0.5, y - 0.5, z), P(x + 0.5, y + 0.5, z), P(x - 0.5, y + 0.5, z), col[0]);
    }
  }
  function quad(a, b, c, d, fill) {
    ctx.beginPath();
    ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.lineTo(c[0], c[1]); ctx.lineTo(d[0], d[1]);
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    if (edges) ctx.stroke();
  }
  var edges = true;

  // ---------------------------------------------------------------- readout
  function formatPeak(r) {
    if (r.q === 0) return ' = 1, at every lattice point of <i>kP</i>';
    var e = Math.floor(r.log10), m = Math.pow(10, r.log10 - e);
    var value = e < 4 ? Math.pow(10, r.log10).toFixed(e < 1 ? 3 : 1)
                      : m.toFixed(2) + ' × 10<sup>' + e + '</sup>';
    var where = r.count > 1 ? ', nearly constant inside <i>kP</i>'
                            : ', at <i>u</i> = (' + r.at[0] + ', ' + r.at[1] + ')';
    return ' ≈ ' + value + where;
  }

  var pending = false;
  function update() {
    var q = parseFloat(slider.value), k = parseInt(kSlider.value, 10);
    if (k !== K) setK(k);
    kOut.textContent = String(k);
    var r = compute(q);
    qOut.textContent = q.toFixed(3).replace(/0$/, '');
    peakOut.innerHTML = formatPeak(r);
    fig.querySelectorAll('[data-q]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(Math.abs(parseFloat(btn.dataset.q) - q) < 1e-9));
    });
    draw();
  }
  function schedule() { if (!pending) { pending = true; requestAnimationFrame(function () { pending = false; update(); }); } }

  // ---------------------------------------------------------------- controls
  slider.addEventListener('input', function () { stop(); schedule(); });
  kSlider.addEventListener('input', schedule);
  fig.querySelectorAll('[data-q]').forEach(function (btn) {
    btn.addEventListener('click', function () { stop(); slider.value = btn.dataset.q; schedule(); });
  });
  fig.querySelectorAll('[data-view]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var v = VIEWS[btn.dataset.view];
      view.az = v.az; view.el = v.el;
      pressView(btn.dataset.view);
      draw();
    });
  });
  function pressView(name) {
    fig.querySelectorAll('[data-view]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.view === name)); });
  }

  // play: sweep q from 0 to 0.99 (or from where it is)
  var playing = null;
  function stop() {
    if (playing) { cancelAnimationFrame(playing.raf); playing = null; playButton.textContent = 'play'; playButton.setAttribute('aria-pressed', 'false'); }
  }
  playButton.addEventListener('click', function () {
    if (playing) { stop(); return; }
    var max = parseFloat(slider.max);
    var from = parseFloat(slider.value) >= max - 1e-9 ? 0 : parseFloat(slider.value);
    var duration = 7000 * (max - from) / max, t0 = performance.now();
    playButton.textContent = 'pause';
    playButton.setAttribute('aria-pressed', 'true');
    playing = { raf: 0 };
    (function frame(now) {
      var t = Math.min(1, (now - t0) / duration);
      slider.value = (from + (max - from) * t).toFixed(3);
      update();
      if (t < 1 && playing) playing.raf = requestAnimationFrame(frame); else stop();
    })(t0);
  });
  if (reduceMotion) playButton.title = 'Sweeps q from 0 to 0.99';

  // turning the plot
  var drag = null;
  canvas.addEventListener('pointerdown', function (e) {
    drag = { x: e.clientX, y: e.clientY, az: view.az, el: view.el };
    canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener('pointermove', function (e) {
    if (!drag) return;
    view.az = drag.az - (e.clientX - drag.x) * 0.008;
    view.el = Math.min(Math.PI / 2, Math.max(0.12, drag.el + (e.clientY - drag.y) * 0.006));
    pressView(view.el >= Math.PI / 2 - 1e-6 ? 'above' : '');
    draw();
  });
  ['pointerup', 'pointercancel'].forEach(function (t) { canvas.addEventListener(t, function () { drag = null; }); });
  canvas.addEventListener('keydown', function (e) {
    var d = { ArrowLeft: [0.08, 0], ArrowRight: [-0.08, 0], ArrowUp: [0, 0.06], ArrowDown: [0, -0.06] }[e.key];
    if (!d) return;
    e.preventDefault();
    view.az += d[0];
    view.el = Math.min(Math.PI / 2, Math.max(0.12, view.el + d[1]));
    pressView(view.el >= Math.PI / 2 - 1e-6 ? 'above' : '');
    draw();
  });

  if (window.ResizeObserver) new ResizeObserver(resize).observe(canvas);
  else window.addEventListener('resize', resize);
  update();
  resize();
})();
