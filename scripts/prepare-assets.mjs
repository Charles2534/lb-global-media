// One-off asset normalization: copies curated source assets from Media/ into public/,
// and resolves each titles.csv row to its actual poster file regardless of naming.
// Run manually with: node scripts/prepare-assets.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const MEDIA = path.join(ROOT, "Media");
const PUBLIC = path.join(ROOT, "public");

function copy(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`  ${path.relative(ROOT, src)} -> ${path.relative(ROOT, dest)}`);
}

// Some partner logos ship with a flat, uniform background baked in (a solid
// card behind the mark) instead of real transparency. On our dark logo strip
// that shows up as a visible rectangle. Chroma-key it out: sample the corner
// color and fade anything close to it to transparent, with a soft ramp so
// anti-aliased edges (e.g. a circular badge) don't get a hard cutout halo.
async function copyChromaKeyed(src, dest, { lowThreshold = 18, highThreshold = 40 } = {}) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const img = sharp(src);
  const { data, info } = await img.raw().ensureAlpha().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const [cr, cg, cb] = [data[0], data[1], data[2]];

  for (let i = 0; i < data.length; i += channels) {
    const dr = data[i] - cr;
    const dg = data[i + 1] - cg;
    const db = data[i + 2] - cb;
    const dist = Math.sqrt(dr * dr + dg * dg + db * db);
    if (dist <= lowThreshold) {
      data[i + 3] = 0;
    } else if (dist < highThreshold) {
      const t = (dist - lowThreshold) / (highThreshold - lowThreshold);
      data[i + 3] = Math.round(data[i + 3] * t);
    }
  }

  await sharp(data, { raw: { width, height, channels } }).png().toFile(dest);
  console.log(`  ${path.relative(ROOT, src)} -> ${path.relative(ROOT, dest)} (chroma-keyed transparent)`);
}

console.log("Brand:");
copy(
  path.join(MEDIA, "BRAND", "lb-global-media-gradient-1280x390.png"),
  path.join(PUBLIC, "brand", "logo.png")
);
copy(
  path.join(MEDIA, "BRAND", "lb-global-media-gradient-2560x780.png"),
  path.join(PUBLIC, "brand", "logo-lg.png")
);

console.log("Partners:");
const PARTNERS = path.join(MEDIA, "PARTNERS");

// Plain copies — these already have real (or acceptably close-to-theme) transparency.
const partnerMap = {
  "amazon.png": "Amazon-Prime-Video-Emblem.png",
  "tubi.png": "Tubi-Logo.png",
  "digitalvirgo.webp": "DV_Square_No-Baseline_white.webp",
  "hoopla.png": "hoopla-logo-blue copy.png",
};
for (const [destName, srcName] of Object.entries(partnerMap)) {
  copy(path.join(PARTNERS, srcName), path.join(PUBLIC, "partners", destName));
}

// Chroma-keyed copies — these ship with a flat solid background baked in
// (navy / charcoal / near-black card behind the mark) that would otherwise
// show as a visible rectangle now that logos render at full opacity.
const chromaKeyMap = {
  "boxbrazil.png": "Box Brazil 2.jpg",
  "futuretoday.png": "ft-dark-bg.png",
  "ottstudio.png": "OTT Studio logo.jpg",
};
for (const [destName, srcName] of Object.entries(chromaKeyMap)) {
  await copyChromaKeyed(path.join(PARTNERS, srcName), path.join(PUBLIC, "partners", destName));
}

console.log("Production:");
copy(
  path.join(MEDIA, "PRODUCTION", "footprint-map.png"),
  path.join(PUBLIC, "production", "footprint-map.png")
);
copy(
  path.join(MEDIA, "PRODUCTION", "519000_IP.jpg"),
  path.join(PUBLIC, "production", "masterclass-wide.jpg")
);

// Home / hero octagon placeholder video — NOT run as part of this script, since
// it needs the `ffmpeg` binary rather than sharp. Source:
// Media/HOME/octagon-hero-video-1.mp4.mp4 (1920x1080 h264+aac, 10.4MB, 24.5s;
// note the accidental double ".mp4" in the filename on disk). Re-run this
// command by hand if the source placeholder is ever replaced — it center-crops
// the 16:9 source to a 1:1 square (matching the object-cover crop the octagon
// already applies at render time, so no extra content is lost), downscales to
// 720x720 (2x the largest on-screen render size, 560px, for retina), strips
// the unused audio track (video is always muted), and adds +faststart for
// progressive playback:
//
//   ffmpeg -i "Media/HOME/octagon-hero-video-1.mp4.mp4" \
//     -vf "crop=1080:1080:420:0,scale=720:720" \
//     -an -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -movflags +faststart \
//     public/home/hero-octagon.mp4
//
// Poster frame (shown for first paint, before the video loads) extracted from
// the transcoded output at the 1s mark:
//
//   ffmpeg -ss 1 -i public/home/hero-octagon.mp4 -frames:v 1 -q:v 3 \
//     public/home/hero-octagon-poster.jpg
//
// Result: 10.4MB -> 2.6MB video, plus a 78KB poster.

console.log("Home / masterclass photos:");
const MASTERCLASS = path.join(
  MEDIA,
  "HOME",
  "PHOTOS - IP IS YOUR ASSET 17th JAN 2026 MASTERCLASS"
);
const masterclassPicks = ["90000_IP.jpg", "650000_IP.jpg", "655000_IP.jpg"];
masterclassPicks.forEach((name, i) => {
  copy(path.join(MASTERCLASS, name), path.join(PUBLIC, "home", "masterclass", `photo-${i + 1}.jpg`));
});

console.log("Home / film stills:");
const STILLS = path.join(MEDIA, "HOME", "Film stills");
const stillsPicks = [
  "Beyond Our End 1.png",
  "From Her Bones 2.jpg",
  "Tender Resistance 1.png",
  "Where We Begin 3.png",
  "Love Evolving - still 5.jpg",
  "Sans Amour.png",
  "FREAKS_SCOPE_0032.jpg",
  "Remembering His Touch 9.jpg",
];
stillsPicks.forEach((name, i) => {
  copy(path.join(STILLS, name), path.join(PUBLIC, "home", "stills", `still-${i + 1}${path.extname(name).toLowerCase()}`));
});

console.log("Titles: resolving posters...");
const TITLES = path.join(MEDIA, "TITLES");
const OTHER = path.join(TITLES, "Other Titles");

// Slugs that have their own folder directly under Media/TITLES (poster.<ext>.<ext>)
function firstFileIn(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const file = entries.find((e) => e.isFile());
  return file ? path.join(dir, file.name) : null;
}

// Explicit overrides for slugs whose asset filenames don't match the slug at all,
// or where multiple candidate posters exist (see README-assets.md for rationale).
const explicitOverrides = {
  "the-first-taste": path.join(OTHER, "The First Taste_Poster 2 (Amazon).png"),
  "love-is-never-far": path.join(OTHER, "LOVE-IS-NEVER-FAR film - 1575x2100.png"),
  "when-you-look-beneath-the-skin": path.join(OTHER, "WYLBTS 3.2 (1200x1600).jpg"),
  "these-untold-secrets": path.join(OTHER, "THESE-UNTOLD-SECRETS_film-poster_1200X1600.jpg"),
  "before-the-dawn-breaks": path.join(OTHER, "before-the-dawn", "BEFORE-THE-DAWN-BREAKS-AMAZON-1200x1600.png"),
};

function resolvePoster(slug) {
  if (explicitOverrides[slug]) return explicitOverrides[slug];
  const topLevel = path.join(TITLES, slug);
  if (fs.existsSync(topLevel)) {
    const f = firstFileIn(topLevel);
    if (f) return f;
  }
  const otherLevel = path.join(OTHER, slug);
  if (fs.existsSync(otherLevel)) {
    const f = firstFileIn(otherLevel);
    if (f) return f;
  }
  return null;
}

const csvRaw = fs.readFileSync(path.join(TITLES, "titles.csv"), "utf-8");
// Minimal CSV split just to pull slugs (col 1) for this asset step; the app's real
// parser (src/lib/titles.ts) handles quoting properly for actual field data.
const lines = csvRaw.split(/\r?\n/).filter(Boolean);
const slugs = new Set();
for (let i = 1; i < lines.length; i++) {
  const slug = lines[i].split(",")[0].trim();
  if (slug) slugs.add(slug);
}

const missing = [];
const manifest = {};
for (const slug of slugs) {
  const src = resolvePoster(slug);
  if (!src) {
    missing.push(slug);
    continue;
  }
  const ext = path.extname(src).toLowerCase() || ".jpg";
  copy(src, path.join(PUBLIC, "titles", slug, `poster${ext}`));
  manifest[slug] = `/titles/${slug}/poster${ext}`;
}

fs.writeFileSync(
  path.join(PUBLIC, "titles", "manifest.json"),
  JSON.stringify(manifest, null, 2)
);
console.log(`Wrote poster manifest for ${Object.keys(manifest).length} slugs.`);

if (missing.length) {
  console.warn("\nWARNING: could not resolve a poster for:", missing.join(", "));
} else {
  console.log(`\nResolved posters for all ${slugs.size} unique title slugs.`);
}

console.log("\nTitles: resolving stills (up to 3 per title)...");

// Folders whose name doesn't match the slug at all (mirrors the poster
// overrides above, for the one slug that has a Stills folder to find).
const folderNameOverrides = {
  "before-the-dawn-breaks": path.join(OTHER, "before-the-dawn"),
};

function resolveTitleFolder(slug) {
  if (folderNameOverrides[slug]) return folderNameOverrides[slug];
  const topLevel = path.join(TITLES, slug);
  if (fs.existsSync(topLevel)) return topLevel;
  const otherLevel = path.join(OTHER, slug);
  if (fs.existsSync(otherLevel)) return otherLevel;
  return null;
}

function resolveStills(slug, max = 3) {
  const folder = resolveTitleFolder(slug);
  if (!folder) return [];
  const entries = fs.readdirSync(folder, { withFileTypes: true });
  const stillsDirEntry = entries.find((e) => e.isDirectory() && /^stills?$/i.test(e.name));
  if (!stillsDirEntry) return [];
  const stillsDir = path.join(folder, stillsDirEntry.name);
  const files = fs
    .readdirSync(stillsDir, { withFileTypes: true })
    .filter((e) => e.isFile() && /\.(jpe?g|png|webp)$/i.test(e.name))
    .map((e) => e.name)
    .sort();
  return files.slice(0, max).map((name) => path.join(stillsDir, name));
}

let titlesWithStills = 0;
let titlesWithoutStills = [];
for (const slug of slugs) {
  const stillPaths = resolveStills(slug);
  if (stillPaths.length === 0) {
    titlesWithoutStills.push(slug);
    continue;
  }
  titlesWithStills++;
  stillPaths.forEach((src, i) => {
    const ext = path.extname(src).toLowerCase() || ".jpg";
    copy(src, path.join(PUBLIC, "titles", slug, "stills", `still-${i + 1}${ext}`));
  });
}

console.log(`\nCopied stills for ${titlesWithStills} of ${slugs.size} title slugs.`);
if (titlesWithoutStills.length) {
  console.log("No stills available for:", titlesWithoutStills.join(", "));
}
