"use client";

import { useMemo, useState } from "react";
import type { Title } from "@/lib/titles";
import { TitleCard } from "./TitleCard";

export function CatalogueBrowser({
  titles,
  genres,
}: {
  titles: Title[];
  genres: string[];
}) {
  const [query, setQuery] = useState("");
  const [activeGenre, setActiveGenre] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return titles
      .filter((t) => (activeGenre ? t.genres.includes(activeGenre) : true))
      .filter((t) =>
        query.trim()
          ? t.title.toLowerCase().includes(query.trim().toLowerCase())
          : true
      )
      .sort((a, b) => b.year - a.year);
  }, [titles, query, activeGenre]);

  return (
    <div>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative w-full sm:max-w-xs">
          <span className="sr-only">Search titles</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles…"
            className="w-full rounded-full border border-paper/20 bg-transparent px-5 py-2.5 text-sm text-paper placeholder:text-paper/40 focus:border-paper/50 focus:outline-none"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveGenre(null)}
            aria-pressed={activeGenre === null}
            className={`cursor-pointer rounded-full border px-3.5 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors ${
              activeGenre === null
                ? "border-paper bg-paper text-ink"
                : "border-paper/20 text-paper/60 hover:border-paper/50"
            }`}
          >
            All
          </button>
          {genres.map((genre) => (
            <button
              key={genre}
              type="button"
              onClick={() => setActiveGenre(genre === activeGenre ? null : genre)}
              aria-pressed={activeGenre === genre}
              className={`cursor-pointer rounded-full border px-3.5 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors ${
                activeGenre === genre
                  ? "border-paper bg-paper text-ink"
                  : "border-paper/20 text-paper/60 hover:border-paper/50"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 font-mono text-xs uppercase tracking-widest text-paper/40">
        {filtered.length} title{filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-paper/50">
          No titles match that search. Try another genre or keyword.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((title) => (
            <TitleCard key={title.slug} title={title} />
          ))}
        </div>
      )}
    </div>
  );
}
