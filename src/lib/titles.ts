import fs from "node:fs";
import path from "node:path";
import { parse } from "csv-parse/sync";
import posterManifest from "../../public/titles/manifest.json";

export type Title = {
  slug: string;
  title: string;
  poster: string;
  logline: string;
  genres: string[];
  countries: string[];
  year: number;
  runtime: string;
  trailerUrl: string;
  trailerYouTubeId: string | null;
  territories: string;
  whereToWatch: string;
  rating: string;
  subtitlesAvailable: string[];
  localizedVersions: string;
  licenceExpiry: string;
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

    bySlug.set(slug, {
      slug,
      title: row.title.trim(),
      poster,
      logline: row.logline.trim(),
      genres: splitList(row.genres, ";"),
      countries: splitList(row.countries, ","),
      year: Number.parseInt(row.year, 10),
      runtime: row.runtime.trim(),
      trailerUrl: row.trailer_url.trim(),
      trailerYouTubeId: extractYouTubeId(row.trailer_url),
      territories: row.territories.trim(),
      whereToWatch: row.where_to_watch.trim(),
      rating: row.rating.trim(),
      subtitlesAvailable: splitList(row.subtitles_available, ","),
      localizedVersions: row.localized_versions.trim(),
      licenceExpiry: row.licence_expiry.trim(),
    });
  }

  return Array.from(bySlug.values());
}

let cache: Title[] | null = null;

export function getAllTitles(): Title[] {
  if (!cache) cache = parseCsv();
  return cache;
}

export function getAllGenres(): string[] {
  const set = new Set<string>();
  for (const t of getAllTitles()) {
    for (const g of t.genres) set.add(g);
  }
  return Array.from(set).sort();
}
