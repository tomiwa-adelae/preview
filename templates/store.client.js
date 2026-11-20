(function () {
  var D = JSON.parse(document.getElementById('site-data').textContent);
  var P = D.products, cur = D.currency || '₦', filter = 'all', bag = [];
  function money(n) { return cur + Number(n).toLocaleString(); }
  function esc(s) { var d = document.createElement('div'); d.textContent = s == null ? '' : s; return d.innerHTML; }
  function render() {
    document.getElementById('grid').innerHTML = P.map(function (p, i) { return { p: p, i: i }; })
      .filter(function (x) { return filter === 'all' || (x.p.tags || []).indexOf(filter) > -1; })
      .map(function (x) {
        var p = x.p;
        return '<div class="card"><div class="img">' +
          (p.was ? '<span class="tag">Save ' + money(p.was - p.now) + '</span>' : (p.badge ? '<span class="tag">' + esc(p.badge) + '</span>' : '')) +
          '<img class="ph" src="photos/' + esc(p.img) + '" alt="' + esc(p.name) + '" loading="lazy"' + (p.pos ? ' style="object-position:' + esc(p.pos) + '"' : '') + '>' +
          '<button class="add" data-add="' + x.i + '">Add to bag</button></div>' +
          '<h4>' + esc(p.name) + '</h4>' + (p.meta ? '<div class="meta">' + esc(p.meta) + '</div>' : '') +
          '<div class="pr"><b>' + money(p.now) + '</b>' + (p.was ? '<s>' + money(p.was) + '</s>' : '') + '</div></div>';
      }).join('');
  }
  function drawBag() {
    document.getElementById('count').textContent = bag.length;
    document.getElementById('lines').innerHTML = bag.length ? bag.map(function (i, k) {
      return '<div class="line"><img src="photos/' + esc(P[i].img) + '" alt=""><div><h5>' + esc(P[i].name) + '</h5><small>' + money(P[i].now) + '</small></div><button data-rm="' + k + '">Remove</button></div>';
    }).join('') : '<p class="empty">Your bag is empty. Add something to see checkout.</p>';
    document.getElementById('subtotal').textContent = money(bag.reduce(function (s, i) { return s + P[i].now; }, 0));
    document.getElementById('hint').textContent = '';
  }
  function toggle(o) { document.body.classList.toggle('open', o); }
  function hint(t) { document.getElementById('hint').textContent = bag.length ? t : 'Add an item first.'; }
  render(); drawBag();
  document.addEventListener('click', function (e) {
    var f = e.target.closest('[data-f]');
    if (f) { filter = f.dataset.f; document.querySelectorAll('.chip').forEach(function (c) { c.classList.toggle('on', c === f); }); render(); }
    var a = e.target.closest('[data-add]'); if (a) { bag.push(+a.dataset.add); drawBag(); toggle(true); }
    var r = e.target.closest('[data-rm]'); if (r) { bag.splice(+r.dataset.rm, 1); drawBag(); }
  });
  document.getElementById('openBag').onclick = function () { toggle(true); };
  document.getElementById('closeBag').onclick = function () { toggle(false); };
  document.getElementById('scrim').onclick = function () { toggle(false); };
  document.getElementById('checkout').onclick = function () { hint('On the live site this opens a secure Paystack payment.'); };
  var wa = document.getElementById('waOrder');
  if (wa) wa.onclick = function () { hint('On the live site this sends the full order to ' + D.name + ' on WhatsApp.'); };
  var cc = document.getElementById('customCta');
  if (cc) cc.onclick = function () { cc.textContent = cc.dataset.msg; };
})();
