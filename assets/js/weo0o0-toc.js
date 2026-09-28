/* Right-hand guide links for PC widths Chirpy still treats as "no TOC column" (992–1199px). */
(function () {
  var tocRoot = document.getElementById('toc');
  var wrapper = document.getElementById('toc-wrapper');
  if (!tocRoot || !wrapper) return;

  var pc = window.matchMedia('(min-width: 992px)');
  var wide = window.matchMedia('(min-width: 1200px)');
  var observer = null;

  function headingText(heading) {
    var clone = heading.cloneNode(true);
    clone.querySelectorAll('.anchor').forEach(function (node) {
      node.remove();
    });
    return (clone.textContent || '').replace(/\s+/g, ' ').trim();
  }

  function clearBuilt() {
    if (tocRoot.dataset.wnBuilt !== '1') return;
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    tocRoot.innerHTML = '';
    delete tocRoot.dataset.wnBuilt;
  }

  function watch(links) {
    if (observer) observer.disconnect();
    if (!('IntersectionObserver' in window)) return;

    var byId = {};
    links.forEach(function (link) {
      var href = link.getAttribute('href') || '';
      if (href.charAt(0) === '#') byId[href.slice(1)] = link;
    });

    observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var active = byId[entry.target.id];
          if (!active) return;
          links.forEach(function (link) {
            link.classList.remove('is-active-link');
          });
          active.classList.add('is-active-link');
        });
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: 0 }
    );

    Object.keys(byId).forEach(function (id) {
      var heading = document.getElementById(id);
      if (heading) observer.observe(heading);
    });
  }

  function build() {
    if (wide.matches) {
      if (observer) observer.disconnect();
      delete tocRoot.dataset.wnBuilt;
      return;
    }

    if (!pc.matches) {
      clearBuilt();
      return;
    }

    var content = document.querySelector('main article .content');
    if (!content) return;

    var headings = content.querySelectorAll('h2, h3, h4');
    var list = document.createElement('ul');
    list.className = 'toc-list';

    headings.forEach(function (heading) {
      if (!heading.id) return;
      var item = document.createElement('li');
      item.className = 'toc-list-item';
      var link = document.createElement('a');
      link.className = 'toc-link node-name--' + heading.tagName;
      link.setAttribute('href', '#' + heading.id);
      link.textContent = headingText(heading);
      item.appendChild(link);
      list.appendChild(item);
    });

    if (!list.childElementCount) return;

    if (observer) observer.disconnect();
    tocRoot.innerHTML = '';
    tocRoot.appendChild(list);
    tocRoot.dataset.wnBuilt = '1';
    wrapper.classList.remove('invisible');
    watch(list.querySelectorAll('a.toc-link'));
  }

  function schedule() {
    window.setTimeout(build, 0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', schedule);
  } else {
    schedule();
  }

  pc.addEventListener('change', schedule);
  wide.addEventListener('change', schedule);
})();
