(function () {
  var D = JSON.parse(document.getElementById('site-data').textContent);
  var el = document.getElementById('count');
  if (el && D.countdownTo) {
    var end = new Date(D.countdownTo);
    var tick = function () {
      var ms = end - Date.now();
      if (ms <= 0) { el.innerHTML = '<span>' + (D.countdownDone || 'This offer has closed.') + '</span>'; return; }
      var d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24, m = Math.floor(ms / 6e4) % 60;
      el.innerHTML = '<div><b>' + d + '</b><small>days</small></div><div><b>' + h + '</b><small>hrs</small></div><div><b>' + m + '</b><small>mins</small></div><span>' + (D.countdownLabel || 'left') + '</span>';
    };
    tick(); setInterval(tick, 30000);
  }
  var cta = document.getElementById('featureCta');
  if (cta) cta.onclick = function () { document.getElementById('featureMsg').textContent = D.featureMsg || 'On the live site this opens Paystack to pay securely.'; };
  var form = document.getElementById('bookForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = (form.querySelector('#b-name').value.split(' ')[0]) || 'there';
    var old = form.querySelector('.done'); if (old) old.remove();
    var d = document.createElement('div'); d.className = 'done';
    d.textContent = 'Thanks ' + name + '! On the live site your request goes straight to ' + form.dataset.who + ', who replies with availability and a quote.';
    form.appendChild(d);
  });
})();
