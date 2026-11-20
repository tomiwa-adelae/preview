(function () {
  var form = document.getElementById('consultForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = (form.querySelector('#c-name').value.split(' ')[0]) || 'there';
    var old = form.querySelector('.done'); if (old) old.remove();
    var d = document.createElement('div'); d.className = 'done';
    d.textContent = 'Thank you, ' + name + '. On the live site this request goes straight to ' + form.dataset.who + ' by email and WhatsApp, and they get back to you to arrange next steps.';
    form.appendChild(d);
  });
})();
