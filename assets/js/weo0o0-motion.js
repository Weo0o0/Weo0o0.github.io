(function () {
  'use strict';

  var root = document.documentElement;
  var reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  var finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

  function setupReveal() {
    if (!root.classList.contains('wn-motion')) return;

    var cards = document.querySelectorAll('#post-list .card-wrapper');
    if (!cards.length) {
      root.classList.add('wn-motion-ready');
      return;
    }

    var batch = 0;
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.style.setProperty('--wn-delay', Math.min(batch, 6) * 70 + 'ms');
          entry.target.classList.add('wn-in');
          batch += 1;
          observer.unobserve(entry.target);
        });
        window.requestAnimationFrame(function () {
          batch = 0;
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    cards.forEach(function (card) {
      observer.observe(card);
    });
    root.classList.add('wn-motion-ready');
  }

  function setupSpotlight() {
    if (reduceQuery.matches || !finePointerQuery.matches) return;

    var frame = 0;
    var x = 0;
    var y = 0;

    function paint() {
      frame = 0;
      root.style.setProperty('--wn-x', x + 'px');
      root.style.setProperty('--wn-y', y + 'px');
    }

    window.addEventListener(
      'pointermove',
      function (event) {
        if (event.pointerType && event.pointerType !== 'mouse') return;
        x = event.clientX;
        y = event.clientY;
        root.classList.add('wn-pointer');
        if (!frame) frame = window.requestAnimationFrame(paint);
      },
      { passive: true }
    );

    document.addEventListener('pointerleave', function () {
      root.classList.remove('wn-pointer');
    });
  }

  function start() {
    setupReveal();
    setupSpotlight();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
