// スクロールに合わせて各セクションをふわっと表示させる演出。
// JS を無効にしている環境ではクラスが付かないため、通常表示のままになります。
(function () {
  var targets = document.querySelectorAll('.section, .cta, .hero');
  if (!targets.length || !('IntersectionObserver' in window)) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  targets.forEach(function (el) {
    el.classList.add('reveal');
    observer.observe(el);
  });
})();
