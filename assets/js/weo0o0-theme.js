(function () {
  'use strict';

  var root = document.documentElement;
  var THEME_COLORS = { dark: '#0b0e14', light: '#f8fafc' };
  var LABELS = { dark: '밝은 화면으로 전환', light: '어두운 화면으로 전환' };

  function current() {
    return root.dataset.bsTheme === 'light' ? 'light' : 'dark';
  }

  function sync() {
    var mode = current();
    var button = document.getElementById('wn-theme-toggle');
    if (button) {
      button.setAttribute('aria-label', LABELS[mode]);
      button.setAttribute('title', LABELS[mode]);
    }
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (meta) {
      meta.setAttribute('content', THEME_COLORS[mode]);
    });
  }

  function apply(mode) {
    if (window.Theme && Theme.isToggleable) {
      Theme.update(mode);
    } else {
      root.dataset.bsTheme = mode;
    }
    sync();
  }

  function toggle(event) {
    var next = current() === 'dark' ? 'light' : 'dark';
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!document.startViewTransition || reduce) {
      apply(next);
      return;
    }

    /* Keyboard activation reports 0,0; grow the circle from the button instead. */
    var rect = event.currentTarget.getBoundingClientRect();
    var x = event.clientX || rect.left + rect.width / 2;
    var y = event.clientY || rect.top + rect.height / 2;
    var radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    root.classList.add('wn-theme-transition');
    var transition = document.startViewTransition(function () {
      apply(next);
    });

    transition.ready.then(function () {
      root.animate(
        { clipPath: ['circle(0px at ' + x + 'px ' + y + 'px)', 'circle(' + radius + 'px at ' + x + 'px ' + y + 'px)'] },
        { duration: 450, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' }
      );
    });

    transition.finished.then(function () {
      root.classList.remove('wn-theme-transition');
    });
  }

  function start() {
    var button = document.getElementById('wn-theme-toggle');
    if (button) button.addEventListener('click', toggle);
    sync();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
