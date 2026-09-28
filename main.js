/* Small helpers used on every page. */
(function () {
  // Mobile menu
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
    });
  }

  // "Our kids today" carousel arrows
  var track = document.querySelector('.kids-track');
  if (track) {
    var prev = document.querySelector('.car-prev');
    var next = document.querySelector('.car-next');
    var step = function () { var c = track.querySelector('.kid-card'); return c ? c.getBoundingClientRect().width + 28 : 400; };
    var sync = function () {
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    };
    prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
    track.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();
  }

  // Newsletter sign-up link
  var cfg = window.RTBF_CONFIG || {};
  var sub = document.getElementById('subscribe-link');
  if (sub && cfg.SUBSCRIBE_URL) { sub.href = cfg.SUBSCRIBE_URL; sub.target = '_blank'; sub.rel = 'noopener'; }
})();
