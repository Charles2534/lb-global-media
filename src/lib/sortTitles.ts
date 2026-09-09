// Kept separate from titles.ts on purpose: titles.ts does filesystem reads
// (fs/path/csv-parse) and must never be value-imported from a client
// component, or bundlers try to pull that server-only code into the browser
// bundle. This file only takes a type-only import, which TypeScript erases
// entirely at compile time, so it's safe for client components to use.
import type { Title } from "./titles";

// Sorts newest-first. Uses the precise release_date when a title has one;
// falls back to Jan 1 of its year otherwise. Both branches must resolve to
// a real timestamp (ms since epoch) — comparing a bare year like 2026
// against Date.parse()'s ~1.7-trillion-ms output always loses, silently
// sorting every year-only title to the very end regardless of its year.
function timeOf(title: Title): number {
  return title.releaseDate ? Date.parse(title.releaseDate) : new Date(title.year, 0, 1).getTime();
}

export function sortByReleaseDateDesc(titles: Title[]): Title[] {
  return [...titles].sort((a, b) => timeOf(b) - timeOf(a));
}
