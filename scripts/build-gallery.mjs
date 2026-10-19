// Builds the gallery from photo folders.
//
// Drop original photos in umbracoTeesGallery/YYYY-MM-DD/ (named after the #UmbracoTees day) and push.
// For every photo this writes, into gallery/YYYY-MM-DD/:
//   <name>-<hash>-thumb.webp   small, for the grid
//   <name>-<hash>-full.webp    resized, for the lightbox
// EXIF data (including GPS location) is stripped and phone rotation is applied.
// It then writes datesFolder/gallery.json, which gallery.js reads.
//
// Outputs are named after a hash of the source file, so unchanged photos are skipped on later runs
// and replaced or deleted photos are cleaned up.
//
// Run with: node scripts/build-gallery.mjs
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, unlinkSync, rmSync } from 'node:fs';
import { dirname, extname, join, parse } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(root, 'umbracoTeesGallery');
const OUT = join(root, 'gallery');
const MANIFEST = join(root, 'datesFolder', 'gallery.json');

const THUMB_WIDTH = 640;
const FULL_LONG_EDGE = 1800;
const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);
const DAY_FOLDER = /^\d{4}-\d{2}-\d{2}$/;

const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'photo';

const days = [];
const skipped = [];

for (const folder of readdirSync(SRC, { withFileTypes: true })) {
  if (!folder.isDirectory()) continue;
  if (!DAY_FOLDER.test(folder.name)) {
    skipped.push(`${folder.name}/ (folder must be named YYYY-MM-DD)`);
    continue;
  }
  const date = folder.name;
  const dayDir = join(SRC, date);
  const outDir = join(OUT, date);
  mkdirSync(outDir, { recursive: true });

  const files = readdirSync(dayDir, { withFileTypes: true })
    .filter(f => f.isFile())
    .map(f => f.name)
    .sort(collator.compare);

  const photos = [];
  const keep = new Set();

  for (const file of files) {
    const ext = extname(file).toLowerCase();
    if (!IMAGE_EXT.has(ext)) {
      skipped.push(`${date}/${file} (unsupported type${ext === '.heic' ? ': convert HEIC to JPG first' : ''})`);
      continue;
    }
    const data = readFileSync(join(dayDir, file));
    const hash = createHash('sha1').update(data).digest('hex').slice(0, 8);
    const base = `${slug(parse(file).name)}-${ext.slice(1)}-${hash}`;
    const thumbName = `${base}-thumb.webp`;
    const fullName = `${base}-full.webp`;
    keep.add(thumbName).add(fullName);

    const thumbPath = join(outDir, thumbName);
    const fullPath = join(outDir, fullName);

    let width, height;
    try {
      if (!existsSync(thumbPath) || !existsSync(fullPath)) {
        // .rotate() applies the EXIF orientation; sharp drops all other metadata by default
        const img = () => sharp(data, { failOn: 'none' }).rotate();
        await img().resize({ width: THUMB_WIDTH, withoutEnlargement: true }).webp({ quality: 74 }).toFile(thumbPath);
        await img()
          .resize({ width: FULL_LONG_EDGE, height: FULL_LONG_EDGE, fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(fullPath);
      }
      ({ width, height } = await sharp(thumbPath).metadata());
    } catch (err) {
      skipped.push(`${date}/${file} (could not process: ${err.message})`);
      keep.delete(thumbName);
      keep.delete(fullName);
      continue;
    }

    photos.push({
      thumb: `gallery/${date}/${thumbName}`,
      full: `gallery/${date}/${fullName}`,
      w: width,
      h: height,
    });
  }

  // Remove outputs whose source photo was replaced or deleted
  for (const f of readdirSync(outDir)) if (!keep.has(f)) unlinkSync(join(outDir, f));

  if (photos.length) days.push({ date, photos });
  else rmSync(outDir, { recursive: true, force: true });
}

// Remove gallery output for days that no longer have a source folder
if (existsSync(OUT)) {
  for (const f of readdirSync(OUT, { withFileTypes: true })) {
    if (f.isDirectory() && !days.some(d => d.date === f.name)) rmSync(join(OUT, f.name), { recursive: true, force: true });
  }
}

days.sort((a, b) => (a.date < b.date ? 1 : -1));
writeFileSync(MANIFEST, JSON.stringify({ days }, null, 2) + '\n');

const total = days.reduce((n, d) => n + d.photos.length, 0);
console.log(`Gallery: ${total} photos across ${days.length} days.`);
if (skipped.length) console.warn(`Skipped:\n  ${skipped.join('\n  ')}`);
