// Kept separate from titles.ts on purpose: titles.ts does filesystem reads
// (fs/path/csv-parse) and must never be value-imported from a client
// component, or bundlers try to pull that server-only code into the browser
// bundle. This file only takes a type-only import, which TypeScript erases
// entirely at compile time, so it's safe for client components to use.
import type { Title } from "./titles";

// Sorts newest-first. Uses the precise release_date when a title has one;
// falls back to year (all we have today — see README-assets.md) otherwise.
export function sortByReleaseDateDesc(titles: Title[]): Title[] {
  return [...titles].sort((a, b) => {
    const aTime = a.releaseDate ? Date.parse(a.releaseDate) : a.year;
    const bTime = b.releaseDate ? Date.parse(b.releaseDate) : b.year;
    return bTime - aTime;
  });
}
