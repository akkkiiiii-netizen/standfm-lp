// スクロールに合わせて各セクションをふわっと表示させる演出。
//
// 要素を隠すクラスはこのスクリプトが付けるため、JSが動かない環境では
// 最初からすべて表示されます（真っ白にはなりません）。
//
// 表示判定は getBoundingClientRect で位置を直接測っています。
// IntersectionObserver は一部の描画環境で発火しないことがあり、
// その場合ページ全体が不可視のまま残ってしまうため使っていません。
(function () {
  var pending = [].slice.call(document.querySelectorAll('.hero, .section, .cta'));
  if (!pending.length) return;

  pending.forEach(function (el) { el.classList.add('reveal'); });

  function check() {
    for (var i = pending.length - 1; i >= 0; i--) {
      var rect = pending[i].getBoundingClientRect();
      var enteredFromBelow = rect.top < window.innerHeight * 0.88;
      var notScrolledPast = rect.bottom > 0;

      if (enteredFromBelow && notScrolledPast) {
        pending[i].classList.add('is-visible');
        pending.splice(i, 1);
      }
    }
    if (!pending.length) {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    }
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      check();
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  check();                    // 初期表示ぶん
  window.addEventListener('load', check);  // 画像読み込みで高さが変わった場合に備えて
})();
