/* The behaviour of a post, in four independent parts: typesetting the formulas, the
   scrolling title screen, the reading-progress bar, and the light/dark switch.
   Adapted from the scripts of https://bourgain-talagrand.munozlahoz.xyz */

/* 1. The formulas. The page writes them in TeX, \( … \) inline and \[ … \] displayed, and
   this typesets them with KaTeX (katex.min.js, loaded just before). The macros of the paper
   are in window.POST_MACROS, written into the page by tools/tex2post.py from the preamble.
   The title screen is typeset first and shown (class math-title); the paper follows in
   slices of 30 ms after each frame so that the title screen keeps moving (class math-ready
   when done). Until then each part is hidden rather than shown as TeX (css/06-math.css). */
(function () {
  'use strict';
  var root = document.documentElement;
  var MACROS = window.POST_MACROS || {};
  var FORMULA = /\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g;

  function find(where) {
    var nodes = [];
    if (!where || !window.katex) return nodes;
    var walker = document.createTreeWalker(where, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var parent = node.parentNode.nodeName;
        if (parent === 'SCRIPT' || parent === 'STYLE' || parent === 'CODE') return NodeFilter.FILTER_REJECT;
        return /\\[([]/.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
    });
    while (walker.nextNode()) nodes.push(walker.currentNode);
    return nodes;
  }

  function typeset(nodes, from, budget) {
    var start = performance.now(), parts = [], html = [], to = from;
    while (to < nodes.length && (to === from || performance.now() - start < budget)) {
      var text = nodes[to++].nodeValue, pieces = [], last = 0, m;
      FORMULA.lastIndex = 0;
      while ((m = FORMULA.exec(text))) {
        if (m.index > last) pieces.push(text.slice(last, m.index));
        pieces.push(html.length);
        html.push(katex.renderToString(m[1] !== undefined ? m[1] : m[2], {
          displayMode: m[1] === undefined,
          macros: Object.assign({}, MACROS),
          output: 'htmlAndMathml',
          throwOnError: false,
          strict: 'ignore',
          trust: false
        }));
        last = FORMULA.lastIndex;
      }
      if (last < text.length) pieces.push(text.slice(last));
      parts.push(pieces);
    }
    var parsed = document.createElement('template');
    parsed.innerHTML = html.join('');
    var formulas = Array.prototype.slice.call(parsed.content.children);
    parts.forEach(function (pieces, i) {
      var node = nodes[from + i], fragment = document.createDocumentFragment();
      pieces.forEach(function (piece) {
        fragment.appendChild(typeof piece === 'number' ? formulas[piece] : document.createTextNode(piece));
      });
      node.parentNode.replaceChild(fragment, node);
    });
    return to;
  }

  function step(where, done, gradually, then) {
    var nodes = find(where), i = 0;
    function later() { requestAnimationFrame(function () { setTimeout(next, 0); }); }
    function next() {
      try {
        i = typeset(nodes, i, gradually ? 30 : Infinity);
      } catch (e) {
        i = nodes.length;
        throw e;
      } finally {
        if (i < nodes.length) later();
        else { root.classList.add(done); if (then) then(); }
      }
    }
    if (gradually) later(); else next();
  }

  // A displayed formula a little too wide for the column (up to 25%) is set a little smaller
  // so that it fits; a wider one keeps its size and scrolls sideways (css/06-math.css).
  function fit() {
    document.querySelectorAll('main .katex-display').forEach(function (d) {
      var k = d.firstElementChild;
      if (!k) return;
      k.style.fontSize = '';
      var over = d.scrollWidth / d.clientWidth;
      if (over > 1.002 && over < 1.25) k.style.fontSize = (0.99 / over).toFixed(3) + 'em';
    });
  }
  var fitPending = false;
  window.addEventListener('resize', function () {
    if (!root.classList.contains('math-ready') || fitPending) return;
    fitPending = true;
    requestAnimationFrame(function () { fitPending = false; fit(); });
  });
  function fitWhenReady() { fit(); if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit); }

  var navigation = performance.getEntriesByType ? performance.getEntriesByType('navigation')[0] : null;
  var atTop = !location.hash && (!navigation || navigation.type === 'navigate');
  step(document.querySelector('.title-block'), 'math-title', false);
  step(document.body, 'math-ready', atTop, fitWhenReady);
})();

/* 2. The title screen: while its stage scrolls past, the composition stays in place, the
   title fades out and the front matter fades into its place. */
(function () {
  'use strict';
  var stage = document.querySelector('.landing-stage');
  if (!stage) return;
  function ramp(a, b, x) { var t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); }
  var pending = false;
  function update() {
    pending = false;
    var r = stage.getBoundingClientRect(), range = r.height - window.innerHeight;
    var u = range > 0 ? Math.min(1, Math.max(0, -r.top / range)) : 0;
    var title = 1 - ramp(0.06, 0.38, u), note = ramp(0.32, 0.62, u);
    stage.style.setProperty('--stage-title', title.toFixed(3));
    stage.style.setProperty('--stage-note', note.toFixed(3));
    stage.classList.toggle('note-on', note > 0.5);
  }
  function schedule() { if (!pending) { pending = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  update();
})();

/* 3. Reading progress below the contents, with an eye to hide it (remembered per browser).
   It runs from the first section to the references. */
(function () {
  'use strict';
  var box = document.querySelector('.reading-progress');
  if (!box) return;
  var bar = box.querySelector('.progress-bar');
  var fill = box.querySelector('.progress-fill');
  var label = box.querySelector('.progress-label');
  var eye = box.querySelector('.progress-eye');
  var start = document.querySelector('.sec');
  var end = document.getElementById('references');
  var pending = false;
  function update() {
    pending = false;
    var top = start ? start.getBoundingClientRect().top + window.scrollY : 0;
    var bottom = end ? end.getBoundingClientRect().top + window.scrollY : document.documentElement.scrollHeight;
    var max = bottom - window.innerHeight - top;
    var p = max > 0 ? Math.min(1, Math.max(0, (window.scrollY - top) / max)) : 1;
    var pct = Math.round(p * 100);
    fill.style.width = (100 * p) + '%';
    label.textContent = pct + '%';
    bar.setAttribute('aria-valuenow', String(pct));
  }
  function schedule() { if (!pending) { pending = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  if (window.ResizeObserver) new ResizeObserver(schedule).observe(document.body);

  function setHidden(hidden, remember) {
    box.classList.toggle('is-hidden', hidden);
    var text = hidden ? 'Show reading progress' : 'Hide reading progress';
    eye.setAttribute('aria-pressed', String(hidden));
    eye.setAttribute('aria-label', text);
    eye.title = text;
    if (remember) { try { localStorage.setItem('progress-hidden', hidden ? '1' : '0'); } catch (e) {} }
  }
  var stored = false;
  try { stored = localStorage.getItem('progress-hidden') === '1'; } catch (e) {}
  setHidden(stored, false);
  eye.addEventListener('click', function () { setHidden(!box.classList.contains('is-hidden'), true); });
  update();
})();

/* 4. The light/dark switch. The choice is kept in the browser; the page's <head> applies it
   (or the system preference) before the first paint. */
(function () {
  'use strict';
  var root = document.documentElement, button = document.querySelector('.theme-toggle');
  if (!button) return;
  function label() {
    var text = root.dataset.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    button.setAttribute('aria-label', text);
    button.title = text;
  }
  label();
  button.addEventListener('click', function () {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
    label();
  });
})();
