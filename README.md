Welcome to the repo for https://isitumbracoteesday.today

A simple site that shows a countdown to when the next #umbracoTees day will be held.

## Announcing a new date

1. Add the date to `datesFolder/dates.json` (e.g. `"2027-02-26T09:00:00"`) and push to `main`.
2. The **Build feeds** GitHub Action runs `node scripts/build-feeds.mjs` and commits the generated files.

To build locally instead, run `node scripts/build-feeds.mjs` and commit the output.

## Adding gallery photos

1. Put the original photos in `umbracoTeesGallery/YYYY-MM-DD/`, named after the #UmbracoTees day (e.g. `umbracoTeesGallery/2026-10-23/`).
2. Push to `main`. The **Build gallery** GitHub Action resizes them, strips EXIF/GPS data and updates the gallery.

Supported: JPG, PNG, WebP, GIF, AVIF (convert HEIC to JPG first). Folders not named `YYYY-MM-DD` are ignored.
To build locally, run `npm install` then `node scripts/build-gallery.mjs`.
Generated files: `gallery/` and `datesFolder/gallery.json`. Don't edit them by hand.

## Subscribing

| What | URL |
| --- | --- |
| RSS feed (new item per announced date) | https://isitumbracoteesday.today/feed.xml |
| Calendar subscription (all dates) | https://isitumbracoteesday.today/calendar.ics (`webcal://` also works) |
| Single date download | https://isitumbracoteesday.today/calendar/YYYY-MM-DD.ics |

Generated files: `feed.xml`, `calendar.ics`, `calendar/*.ics` and `datesFolder/announced.json`
(which records when each date was first announced, used for the RSS `pubDate`). Don't edit them by hand.
