// Countdown, upcoming dates and calendar links for the home page.
(function () {
  var SITE = 'https://isitumbracoteesday.today';
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var timer = document.getElementById('timer');
  var actions = document.getElementById('next-actions');
  var upcomingEl = document.getElementById('upcoming');
  var upcomingWrap = document.getElementById('upcoming-section');

  // dates.json holds "YYYY-MM-DDT09:00:00"; only the day matters (the event is all day).
  function toDay(str) {
    var p = String(str).slice(0, 10).split('-').map(Number);
    return new Date(p[0], p[1] - 1, p[2]);
  }
  function iso(d) { return String(d).slice(0, 10); }
  function startOfToday() {
    var t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }
  function pretty(day, opts) {
    return day.toLocaleDateString('en-GB', opts || { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }
  function googleUrl(isoDate) {
    var start = isoDate.replace(/-/g, '');
    var next = toDay(isoDate);
    next.setDate(next.getDate() + 1);
    var end = next.getFullYear() + String(next.getMonth() + 1).padStart(2, '0') + String(next.getDate()).padStart(2, '0');
    return 'https://calendar.google.com/calendar/render?action=TEMPLATE' +
      '&text=' + encodeURIComponent('#UmbracoTees Day 👕') +
      '&dates=' + start + '/' + end +
      '&details=' + encodeURIComponent('Wear your Umbraco merch and share a photo with #umbracoTees.\n' + SITE);
  }
  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (html) n.innerHTML = html;
    return n;
  }
  var calIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>';

  function renderActions(isoDate) {
    if (!actions) return;
    actions.innerHTML = '';
    actions.appendChild(el('a', { class: 'btn primary', href: googleUrl(isoDate), target: '_blank', rel: 'noopener' }, calIcon + 'Add to Google Calendar'));
    actions.appendChild(el('a', { class: 'btn', href: 'calendar/' + isoDate + '.ics', download: 'umbracotees-' + isoDate + '.ics' }, calIcon + 'Download .ics'));
  }

  function renderUpcoming(days) {
    if (!upcomingEl) return;
    if (days.length < 2) { upcomingWrap.hidden = true; return; }
    upcomingWrap.hidden = false;
    upcomingEl.innerHTML = '';
    days.forEach(function (d) {
      var i = iso(d.iso);
      var li = el('li');
      li.innerHTML =
        '<div class="date-badge"><b>' + d.day.getDate() + '</b><span>' + MONTHS[d.day.getMonth()] + '</span></div>' +
        '<div class="date-text"><strong>' + pretty(d.day) + '</strong><small>All day</small></div>';
      var row = el('div', { class: 'row-actions' });
      row.appendChild(el('a', { class: 'btn', href: googleUrl(i), target: '_blank', rel: 'noopener' }, 'Google'));
      row.appendChild(el('a', { class: 'btn', href: 'calendar/' + i + '.ics', download: 'umbracotees-' + i + '.ics' }, '.ics'));
      li.appendChild(row);
      upcomingEl.appendChild(li);
    });
  }

  function unit(n, label) {
    return '<div class="unit"><b>' + n + '</b><span>' + label + '</span></div>';
  }

  var target = null; // Date of the next #UmbracoTees day (midnight local)

  function tick() {
    if (!timer) return;
    var now = new Date();
    if (!target) {
      timer.innerHTML = '<p class="none">Nothing planned yet, check back soon.</p>';
      return;
    }
    if (target.getTime() === startOfToday().getTime()) {
      timer.innerHTML = '<div class="today-banner">It’s #UmbracoTees day today! 👕<small>Pull on your merch and share it with #umbracoTees</small></div>';
      return;
    }
    var diff = target - now;
    var s = Math.floor(diff / 1000);
    timer.innerHTML =
      '<div class="countdown" role="timer" aria-label="Time until the next #UmbracoTees day">' +
      unit(Math.floor(s / 86400), 'days') +
      unit(Math.floor(s / 3600) % 24, 'hours') +
      unit(Math.floor(s / 60) % 60, 'minutes') +
      unit(s % 60, 'seconds') +
      '</div><p class="when">' + pretty(target) + '</p>';
  }

  fetch('datesFolder/dates.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var today = startOfToday().getTime();
      var days = data
        .map(function (s) { return { iso: iso(s), day: toDay(s) }; })
        .filter(function (d) { return d.day.getTime() >= today; })
        .sort(function (a, b) { return a.day - b.day; });

      if (days.length) {
        target = days[0].day;
        renderActions(days[0].iso);
      }
      renderUpcoming(days);
      tick();
      setInterval(tick, 1000);
    })
    .catch(function (err) {
      console.error('Error fetching dates:', err);
      if (timer) timer.innerHTML = '<p class="none">Couldn’t load the date, try again soon.</p>';
    });

  // "Copy" buttons next to the feed / calendar URLs
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var input = document.getElementById(btn.getAttribute('data-copy'));
      if (!input) return;
      var done = function () {
        var old = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(function () { btn.textContent = old; }, 1500);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(input.value).then(done);
      else { input.select(); document.execCommand('copy'); done(); }
    });
  });
})();
