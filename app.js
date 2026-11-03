// Nestra site — theme toggle, scroll reveals, parallax
(function () {
  var root = document.documentElement;

  // ---- theme toggle (initial theme set inline in <head> to avoid flash) ----
  var btn = document.querySelector('.theme-toggle');
  if (btn) {
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('nestra-theme', next); } catch (e) {}
    });
  }

  // ---- scroll-reveal ----
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // ---- nav shadow on scroll + shelf parallax ----
  var nav = document.querySelector('nav');
  var stage = document.querySelector('.stage');
  function onScroll() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 18);
    if (stage) stage.style.setProperty('--py', (window.scrollY * 0.05) + 'px');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- hero shelf 3D tilt on mouse move (skipped for reduced-motion / touch) ----
  var shelf = document.querySelector('.shelf');
  var hero = document.querySelector('.hero');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (shelf && hero && !reduce && window.matchMedia('(pointer:fine)').matches) {
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      var dx = (e.clientX - r.left) / r.width - 0.5;
      var dy = (e.clientY - r.top) / r.height - 0.5;
      shelf.style.setProperty('--ry', (dx * 7).toFixed(2) + 'deg');
      shelf.style.setProperty('--rx', (dy * -5).toFixed(2) + 'deg');
    });
    hero.addEventListener('mouseleave', function () {
      shelf.style.setProperty('--ry', '0deg');
      shelf.style.setProperty('--rx', '0deg');
    });
  }
})();
