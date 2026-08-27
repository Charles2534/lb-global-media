import Image from "next/image";
import Link from "next/link";
import type { Title } from "@/lib/titles";
import { TrailerButton } from "./TrailerButton";

export function TitleCard({ title }: { title: Title }) {
  return (
    <article
      id={title.slug}
      className="group flex scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-paper/10 bg-paper/[0.03] transition-colors hover:border-paper/25"
    >
      <Link
        href={`/catalogue/${title.slug}`}
        className="relative block aspect-[2/3] w-full overflow-hidden bg-ink-soft"
      >
        <Image
          src={title.poster}
          alt={`${title.title} poster`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <Link href={`/catalogue/${title.slug}`}>
            <h3 className="font-display text-lg font-semibold leading-tight hover:underline">
              {title.title}
            </h3>
          </Link>
          <span className="shrink-0 font-mono text-xs text-paper/50">{title.year}</span>
        </div>

        <p className="line-clamp-3 text-sm leading-relaxed text-paper/65">
          {title.logline}
        </p>

        <div className="mt-auto flex flex-col gap-3 pt-2">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-wide text-paper/45">
            <div>
              <dt className="inline">Runtime </dt>
              <dd className="inline text-paper/70">{title.runtime}</dd>
            </div>
            <div>
              <dt className="inline">Rating </dt>
              <dd className="inline text-paper/70">{title.rating}</dd>
            </div>
            <div className="col-span-2">
              <dt className="inline">Origin </dt>
              <dd className="inline text-paper/70">{title.countries.join(", ")}</dd>
            </div>
            <div className="col-span-2">
              <dt className="inline">Watch </dt>
              <dd className="inline text-paper/70">{title.whereToWatch}</dd>
            </div>
          </dl>

          <div className="flex flex-wrap gap-2">
            {title.genres.map((genre) => (
              <span
                key={genre}
                className="rounded-full border border-paper/15 px-2.5 py-1 text-[11px] text-paper/60"
              >
                {genre}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <TrailerButton youTubeId={title.trailerYouTubeId} title={title.title} />
            <Link
              href={`/catalogue/${title.slug}`}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-paper/25 px-4 py-2 font-mono text-xs uppercase tracking-widest text-paper transition-colors hover:border-paper/60"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
