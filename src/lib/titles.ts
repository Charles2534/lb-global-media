import fs from "node:fs";
import path from "node:path";
import { parse } from "csv-parse/sync";
import posterManifest from "../../public/titles/manifest.json";

// Titles whose licence has lapsed / are no longer being actively sold.
// Charles supplies this list as titles come off-sale — the page and trailer
// stay up, but any "watch to buy" link is suppressed for these slugs.
const DELISTED_SLUGS = new Set<string>(["into-her-own"]);

export type Title = {
  slug: string;
  title: string;
  poster: string;
  stills: string[];
  logline: string;
  genres: string[];
  countries: string[];
  year: number;
  releaseDate: string | null;
  runtime: string;
  trailerUrl: string;
  trailerYouTubeId: string | null;
  territories: string;
  whereToWatch: string;
  rating: string;
  subtitlesAvailable: string[];
  localizedVersions: string;
  licenceExpiry: string;
  delisted: boolean;
  keywordsTags: string[];
  director: string[];
  producers: string[];
  writer: string[];
  cast: string[];
  amazonComUrl: string | null;
  amazonCoUkUrl: string | null;
  tubiUrl: string | null;
  fawesomeUrl: string | null;
};

type CsvRow = {
  slug: string;
  title: string;
  poster_filename: string;
  logline: string;
  genres: string;
  countries: string;
  year: string;
  runtime: string;
  trailer_url: string;
  territories: string;
  where_to_watch: string;
  rating: string;
  subtitles_available: string;
  localized_versions: string;
  licence_expiry: string;
  poster_link_pcloud: string;
  release_date: string;
  amazon_com_url: string;
  amazon_co_uk_url: string;
  tubi_url: string;
  fawesome_url: string;
  keywords_tags: string;
  director: string;
  producers: string;
  writer: string;
  cast: string;
  // imdb_link intentionally not modeled here — it's in the source data for a
  // future decision, not for display. Do not add it to this type or
  // reference row.imdb_link anywhere; that's the guarantee it never renders.
};

function splitList(value: string, separator: string): string[] {
  return value
    .split(separator)
    .map((v) => v.trim())
    .filter(Boolean);
}

function extractYouTubeId(url: string): string | null {
  const match = url.match(/(?:v=|youtu\.be\/)([\w-]{11})/);
  return match ? match[1] : null;
}

// Up to 3 stills live at public/titles/<slug>/stills/still-N.<ext> when the
// source assets had a Stills folder for that title (see scripts/prepare-assets.mjs).
function resolveStills(slug: string): string[] {
  const dir = path.join(process.cwd(), "public", "titles", slug, "stills");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => /^still-\d+\./i.test(name))
    .sort()
    .map((name) => `/titles/${slug}/stills/${name}`);
}

// Real per-title watch links now exist for these four platforms. Only show
// a button where the title actually has one (and never for delisted titles).
function resolveWatchUrl(value: string, delisted: boolean): string | null {
  if (delisted) return null;
  return value.trim() || null;
}

function parseCsv(): Title[] {
  const csvPath = path.join(process.cwd(), "src", "data", "titles.csv");
  const raw = fs.readFileSync(csvPath, "utf-8");
  const rows = parse(raw, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as CsvRow[];

  // The source CSV has occasional duplicate slugs (re-exported rows with
  // updated fields further down the file) — last occurrence wins.
  const bySlug = new Map<string, Title>();

  for (const row of rows) {
    const slug = row.slug.trim();
    if (!slug) continue;

    const poster =
      (posterManifest as Record<string, string>)[slug] ?? "/titles/placeholder.png";
    const delisted = DELISTED_SLUGS.has(slug);

    bySlug.set(slug, {
      slug,
      title: row.title.trim(),
      poster,
      stills: resolveStills(slug),
      logline: row.logline.trim(),
      genres: splitList(row.genres, ";"),
      countries: splitList(row.countries, ","),
      year: Number.parseInt(row.year, 10),
      releaseDate: row.release_date.trim() || null,
      runtime: row.runtime.trim(),
      trailerUrl: row.trailer_url.trim(),
      trailerYouTubeId: extractYouTubeId(row.trailer_url),
      territories: row.territories.trim(),
      whereToWatch: row.where_to_watch.trim(),
      rating: row.rating.trim(),
      subtitlesAvailable: splitList(row.subtitles_available, ","),
      localizedVersions: row.localized_versions.trim(),
      licenceExpiry: row.licence_expiry.trim(),
      delisted,
      keywordsTags: splitList(row.keywords_tags, ","),
      director: splitList(row.director, ","),
      producers: splitList(row.producers, ","),
      writer: splitList(row.writer, ","),
      cast: splitList(row.cast, ","),
      amazonComUrl: resolveWatchUrl(row.amazon_com_url, delisted),
      amazonCoUkUrl: resolveWatchUrl(row.amazon_co_uk_url, delisted),
      tubiUrl: resolveWatchUrl(row.tubi_url, delisted),
      fawesomeUrl: resolveWatchUrl(row.fawesome_url, delisted),
    });
  }

  return Array.from(bySlug.values());
}

let cache: Title[] | null = null;

export function getAllTitles(): Title[] {
  if (!cache) cache = parseCsv();
  return cache;
}

export function getTitleBySlug(slug: string): Title | undefined {
  return getAllTitles().find((t) => t.slug === slug);
}

export function getAllGenres(): string[] {
  const set = new Set<string>();
  for (const t of getAllTitles()) {
    for (const g of t.genres) set.add(g);
  }
  return Array.from(set).sort();
}
