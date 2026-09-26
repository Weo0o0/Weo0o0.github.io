(function () {
  'use strict';

  var root = document.documentElement;
  var header = document.getElementById('topbar-wrapper');
  var toggle = document.getElementById('wn-nav-toggle');
  var drawer = document.getElementById('wn-drawer');
  var backdrop = document.getElementById('wn-drawer-backdrop');
  var searchCancel = document.getElementById('search-cancel');
  var desktopQuery = window.matchMedia('(min-width: 992px)');
  var reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (!header) return;

  function isDrawerOpen() {
    return !!(toggle && toggle.classList.contains('is-open'));
  }

  function isSearchOpen() {
    return !!(searchCancel && searchCancel.classList.contains('d-block'));
  }

  /* ---------- Scroll: glass canopy + hide on scroll down ---------- */

  var lastScroll = window.scrollY;
  var ticking = false;

  function setHidden(hidden) {
    header.classList.toggle('is-hidden', hidden);
    root.classList.toggle('wn-topbar-shown', !hidden);
  }

  function updateHeader() {
    ticking = false;
    var current = window.scrollY;
    header.classList.toggle('is-scrolled', current > 30);

    var pinned = isDrawerOpen() || isSearchOpen() || !!header.querySelector(':focus-visible');
    if (pinned || current <= 0) {
      setHidden(false);
    } else if (current > lastScroll && current > 150) {
      setHidden(true);
    } else if (current < lastScroll && (lastScroll - current > 10 || current < 50)) {
      setHidden(false);
    }

    lastScroll = Math.max(current, 0);
  }

  window.addEventListener(
    'scroll',
    function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateHeader);
      }
    },
    { passive: true }
  );
  header.addEventListener('focusin', function () {
    setHidden(false);
  });
  updateHeader();

  /* ---------- Drawer ---------- */

  if (toggle && drawer && backdrop) {
    var inertTargets = [];

    function focusables() {
      return [toggle].concat(Array.prototype.slice.call(drawer.querySelectorAll('a[href], button')));
    }

    function trapFocus(event) {
      if (event.key !== 'Tab') return;
      var items = focusables();
      var first = items[0];
      var last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        last.focus();
        event.preventDefault();
      } else if (!event.shiftKey && document.activeElement === last) {
        first.focus();
        event.preventDefault();
      }
    }

    function setBackgroundInert(inert) {
      if (inert) {
        inertTargets = Array.prototype.filter.call(
          document.querySelectorAll('#sidebar, #main-wrapper > .container > *'),
          function (el) {
            return el !== header && el !== drawer && el !== backdrop;
          }
        );
      }
      inertTargets.forEach(function (el) {
        if (inert) el.setAttribute('inert', '');
        else el.removeAttribute('inert');
      });
      if (!inert) inertTargets = [];
    }

    function openMenu() {
      toggle.classList.add('is-open');
      drawer.classList.add('is-open');
      backdrop.classList.add('is-open');
      header.classList.add('is-drawer-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', '메뉴 닫기');
      document.body.style.overflow = 'hidden';
      setHidden(false);
      setBackgroundInert(true);
      drawer.style.transform = '';
      backdrop.style.opacity = '';
      var firstLink = drawer.querySelector('a[href]');
      if (firstLink) firstLink.focus({ preventScroll: true });
      document.addEventListener('keydown', trapFocus);
    }

    function closeMenu(options) {
      if (!isDrawerOpen()) return;
      toggle.classList.remove('is-open');
      drawer.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      header.classList.remove('is-drawer-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', '메뉴 열기');
      document.body.style.overflow = '';
      setBackgroundInert(false);
      drawer.style.transform = '';
      backdrop.style.opacity = '';
      document.removeEventListener('keydown', trapFocus);
      if (!options || options.restoreFocus !== false) toggle.focus({ preventScroll: true });
    }

    toggle.addEventListener('click', function () {
      if (isDrawerOpen()) closeMenu();
      else openMenu();
    });
    backdrop.addEventListener('click', function () {
      closeMenu();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && isDrawerOpen()) closeMenu();
    });
    desktopQuery.addEventListener('change', function (event) {
      if (event.matches) closeMenu({ restoreFocus: false });
    });

    /* Swipe right to close, with an eased drag. */
    var startX = 0;
    var currentX = 0;
    var startTime = 0;
    var swiping = false;

    drawer.addEventListener(
      'touchstart',
      function (event) {
        startX = currentX = event.touches[0].clientX;
        startTime = Date.now();
        swiping = true;
        drawer.style.transition = 'none';
        backdrop.style.transition = 'none';
      },
      { passive: true }
    );

    drawer.addEventListener(
      'touchmove',
      function (event) {
        if (!swiping) return;
        currentX = event.touches[0].clientX;
        var diff = currentX - startX;
        if (diff <= 0) return;
        var width = drawer.offsetWidth;
        var progress = Math.min(1, diff / width);
        var eased = (1 - Math.exp(-3 * progress)) / (1 - Math.exp(-3));
        drawer.style.transform = 'translateX(' + eased * width + 'px)';
        backdrop.style.opacity = String(1 - eased);
      },
      { passive: true }
    );

    drawer.addEventListener('touchend', function () {
      if (!swiping) return;
      swiping = false;
      drawer.style.transition = '';
      backdrop.style.transition = '';
      var diff = currentX - startX;
      var velocity = diff / Math.max(Date.now() - startTime, 1);
      if (diff > 75 || (velocity > 0.3 && diff > 25)) {
        closeMenu();
      } else {
        drawer.style.transform = '';
        backdrop.style.opacity = '';
      }
    });

    /* Telemetry */
    var cores = document.getElementById('wn-sys-cores');
    if (cores && navigator.hardwareConcurrency) cores.textContent = String(navigator.hardwareConcurrency);

    var rtt = document.getElementById('wn-sys-rtt');
    if (rtt && window.performance && performance.getEntriesByType) {
      var nav = performance.getEntriesByType('navigation')[0];
      if (nav && nav.responseStart > 0) {
        var ms = Math.round(nav.responseStart - nav.requestStart);
        rtt.textContent = ms + 'ms // ' + (ms < 50 ? 'FAST' : ms < 200 ? 'STABLE' : 'SLOW');
      }
    }
  }

  /* ---------- Number keys jump to sidebar tabs (1 = home) ---------- */

  window.addEventListener('keydown', function (event) {
    if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey || event.isComposing) return;
    if (!/^[1-9]$/.test(event.key)) return;

    var active = document.activeElement;
    if (
      active &&
      (active.isContentEditable ||
        /^(INPUT|TEXTAREA|SELECT)$/.test(active.tagName) ||
        active.closest('search, dialog, [popover]'))
    ) {
      return;
    }

    var link = document.querySelector('#wn-drawer a[data-nav-key="' + event.key + '"]');
    if (!link) return;
    event.preventDefault();

    var here = window.location.pathname.replace(/\/$/, '') || '/';
    var target = new URL(link.href, window.location.href).pathname.replace(/\/$/, '') || '/';
    if (here === target) {
      window.scrollTo({ top: 0, behavior: reduceQuery.matches ? 'auto' : 'smooth' });
    } else {
      window.location.href = link.href;
    }
  });
})();
