(function () {
  var btn = document.getElementById('lang-toggle');
  if (!btn) return;

  btn.addEventListener('click', function () {
    var html = document.documentElement;
    var current = html.classList.contains('lang-en') ? 'en' : 'he';
    var next = current === 'he' ? 'en' : 'he';

    html.lang = next;
    html.dir = next === 'he' ? 'rtl' : 'ltr';
    html.className = 'lang-' + next;
    localStorage.setItem('lang', next);
  });
})();
