// Generates the static feeds from datesFolder/dates.json:
//   feed.xml            RSS 2.0, newest announced #UmbracoTees day first
//   calendar.ics        subscribable calendar containing every date
//   calendar/<date>.ics single-event download for each date
//   datesFolder/announced.json  remembers when each date was first seen (RSS pubDate)
//
// Run with: node scripts/build-feeds.mjs
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, unlinkSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://isitumbracoteesday.today';
const TITLE = '#UmbracoTees Day';
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const p = (...parts) => join(root, ...parts);

// ---------- load dates (YYYY-MM-DD, newest first, de-duplicated) ----------
const dates = [...new Set(
  JSON.parse(readFileSync(p('datesFolder', 'dates.json'), 'utf8')).map(d => String(d).slice(0, 10))
)].sort().reverse();

// ---------- announced-at state ----------
const statePath = p('datesFolder', 'announced.json');
const state = existsSync(statePath) ? JSON.parse(readFileSync(statePath, 'utf8')) : {};
const nowIso = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
const todayIso = nowIso.slice(0, 10);
for (const d of dates) {
  // A date we have never seen: if it's already past, use the day itself, otherwise it's being announced now.
  if (!state[d]) state[d] = d < todayIso ? `${d}T09:00:00Z` : nowIso;
}
for (const d of Object.keys(state)) if (!dates.includes(d)) delete state[d];
const sortedState = Object.fromEntries(Object.entries(state).sort(([a], [b]) => (a < b ? 1 : -1)));
writeFileSync(statePath, JSON.stringify(sortedState, null, 2) + '\n');

// ---------- helpers ----------
const parts = d => d.split('-').map(Number);
const prettyDate = d => {
  const [y, m, day] = parts(d);
  const dow = new Date(Date.UTC(y, m - 1, day)).getUTCDay();
  return `${DAYS[dow]} ${day} ${MONTHS[m - 1]} ${y}`;
};
const compact = d => d.replaceAll('-', '');
const nextDay = d => {
  const [y, m, day] = parts(d);
  return new Date(Date.UTC(y, m - 1, day + 1)).toISOString().slice(0, 10);
};
const icsStamp = iso => iso.replace(/[-:]/g, '').replace(/\.\d+/, '');
const esc = s => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
const xml = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// RFC 5545: fold lines at 75 octets, CRLF endings
function fold(line) {
  const buf = Buffer.from(line, 'utf8');
  if (buf.length <= 75) return line;
  const out = [];
  let start = 0;
  let limit = 75;
  while (start < buf.length) {
    let end = Math.min(start + limit, buf.length);
    while (end < buf.length && (buf[end] & 0xc0) === 0x80) end--; // don't split a UTF-8 sequence
    out.push(buf.subarray(start, end).toString('utf8'));
    start = end;
    limit = 74; // continuation lines start with a space
  }
  return out.join('\r\n ');
}

const vevent = d => [
  'BEGIN:VEVENT',
  `UID:umbracotees-${d}@isitumbracoteesday.today`,
  `DTSTAMP:${icsStamp(state[d])}`,
  `DTSTART;VALUE=DATE:${compact(d)}`,
  `DTEND;VALUE=DATE:${compact(nextDay(d))}`,
  `SUMMARY:${esc(`${TITLE} \u{1F455}`)}`,
  `DESCRIPTION:${esc(`Wear your Umbraco merch and share a photo with #umbracoTees.\n${SITE}`)}`,
  `URL:${SITE}/`,
  'TRANSP:TRANSPARENT',
  'BEGIN:VALARM',
  'ACTION:DISPLAY',
  `DESCRIPTION:${esc(`It's ${TITLE} today!`)}`,
  'TRIGGER:PT9H',
  'END:VALARM',
  'END:VEVENT',
];

const calendar = (name, ds) => [
  'BEGIN:VCALENDAR',
  'VERSION:2.0',
  'PRODID:-//isitumbracoteesday.today//UmbracoTees Day//EN',
  'CALSCALE:GREGORIAN',
  'METHOD:PUBLISH',
  `X-WR-CALNAME:${esc(name)}`,
  'REFRESH-INTERVAL;VALUE=DURATION:PT12H',
  'X-PUBLISHED-TTL:PT12H',
  ...ds.flatMap(vevent),
  'END:VCALENDAR',
].map(fold).join('\r\n') + '\r\n';

// ---------- calendar files ----------
writeFileSync(p('calendar.ics'), calendar(TITLE, [...dates].reverse()));

mkdirSync(p('calendar'), { recursive: true });
for (const f of readdirSync(p('calendar'))) if (f.endsWith('.ics') && !dates.includes(f.slice(0, -4))) unlinkSync(p('calendar', f));
for (const d of dates) writeFileSync(p('calendar', `${d}.ics`), calendar(`${TITLE} ${d}`, [d]));

// ---------- RSS ----------
const items = dates.map(d => {
  const pretty = prettyDate(d);
  const upcoming = d >= todayIso;
  const desc = upcoming
    ? `The next ${TITLE} is ${pretty}. Pull on your Umbraco merch and share it with #umbracoTees. Add it to your calendar: ${SITE}/calendar/${d}.ics`
    : `${TITLE} was held on ${pretty}.`;
  return `    <item>
      <title>${xml(`${TITLE}: ${pretty}`)}</title>
      <link>${SITE}/</link>
      <guid isPermaLink="false">umbracotees-${d}</guid>
      <pubDate>${new Date(state[d]).toUTCString()}</pubDate>
      <description>${xml(desc)}</description>
    </item>`;
});
const newest = dates.map(d => state[d]).sort().pop();

writeFileSync(p('feed.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xml(TITLE)}</title>
    <link>${SITE}/</link>
    <description>Announcements for the next #UmbracoTees day, when the Umbraco community wears its merch.</description>
    <language>en-gb</language>
    <lastBuildDate>${new Date(newest).toUTCString()}</lastBuildDate>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>
${items.join('\n')}
  </channel>
</rss>
`);

console.log(`Built feed.xml, calendar.ics and ${dates.length} single-event files.`);
