(function () {
  var D = JSON.parse(document.getElementById('site-data').textContent);
  var C = D.colors, P = D.products, cur = 'ngn', bag = 0;
  function esc(s) { var d = document.createElement('div'); d.textContent = s == null ? '' : s; return d.innerHTML; }
  function fmt(p) { return cur === 'ngn' ? '₦' + Number(p.ngn).toLocaleString() : '$' + p.usd; }
  function render() {
    document.getElementById('products').innerHTML = P.map(function (p, i) {
      var colors = Object.keys(p.img).filter(function (c) { return c !== 'all'; });
      var sw = colors.length > 1
        ? colors.map(function (c) { return '<button class="sw' + (c === p.color ? ' on' : '') + '" style="background:' + C[c] + '" data-i="' + i + '" data-c="' + c + '" aria-label="' + c + '"></button>'; }).join('')
        : (p.color === 'all' ? Object.keys(C).map(function (c) { return '<span class="sw" style="background:' + C[c] + '"></span>'; }).join('') : '<span class="sw on" style="background:' + (C[p.color] || '#ccc') + '"></span>');
      var pos = (p.pos && p.pos[p.color]) || 'center top';
      return '<div class="card"><div class="img">' + (p.badge ? '<span class="badge">' + esc(p.badge) + '</span>' : '') +
        '<img class="ph" src="photos/' + esc(p.img[p.color]) + '" alt="' + esc(p.name) + '" loading="lazy" style="object-position:' + pos + '">' +
        '<button class="quick" data-add="' + i + '">Add to bag</button></div>' +
        '<div class="meta"><h4>' + esc(p.name) + (p.sub ? '<span>' + esc(p.sub) + '</span>' : '') + '</h4><span class="price">' + fmt(p) + '</span></div>' +
        '<div class="swatches">' + sw + '</div></div>';
    }).join('');
  }
  render();
  document.addEventListener('click', function (e) {
    var sw = e.target.closest('button.sw'); if (sw) { P[sw.dataset.i].color = sw.dataset.c; render(); }
    var add = e.target.closest('[data-add]');
    if (add) { bag++; document.getElementById('bagCount').textContent = bag; add.textContent = 'Added ✦'; setTimeout(function () { add.textContent = 'Add to bag'; }, 1200); }
    var cb = e.target.closest('[data-cur]');
    if (cb) { cur = cb.dataset.cur; document.querySelectorAll('[data-cur]').forEach(function (b) { b.classList.toggle('on', b === cb); }); render(); }
    var pick = e.target.closest('[data-pick]');
    if (pick) { P.forEach(function (p) { if (p.img[pick.dataset.pick]) p.color = pick.dataset.pick; }); render(); }
  });
  var j = document.getElementById('join');
  if (j) j.addEventListener('submit', function (e) { e.preventDefault(); j.querySelector('button').textContent = 'Welcome ✦'; j.querySelector('input').value = ''; });
})();
