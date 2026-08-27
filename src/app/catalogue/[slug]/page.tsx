import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { getAllTitles, getTitleBySlug } from "@/lib/titles";

export function generateStaticParams() {
  return getAllTitles().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const title = getTitleBySlug(slug);
  if (!title) return {};

  return {
    title: title.title,
    description: title.logline,
  };
}

const BackToCatalogue = () => (
  <Link
    href="/catalogue"
    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-paper/60 transition-colors hover:text-paper"
  >
    ← Back to Catalogue
  </Link>
);

export default async function TitleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = getTitleBySlug(slug);
  if (!title) notFound();

  // The first still (when we have one) doubles as landscape key art for the
  // banner up top; anything past that is shown as additional stills below.
  const [keyArt, ...additionalStills] = title.stills;

  return (
    <>
      <section className="border-b rule-on-dark pb-8 pt-8 sm:pt-12">
        <Container>
          <BackToCatalogue />
        </Container>
      </section>

      {keyArt && (
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-ink-soft">
          <Image
            src={keyArt}
            alt={`${title.title} key art`}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
        </div>
      )}

      <section className="border-b rule-on-dark py-16">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl bg-ink-soft">
            <Image
              src={title.poster}
              alt={`${title.title} poster`}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-contain"
              priority
            />
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-paper/50">
              {title.genres.join(" · ")}
            </p>
            <h1 className="font-display mt-3 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
              {title.title}
            </h1>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
              <div>
                <dt className="font-mono text-xs uppercase tracking-wide text-paper/45">Year</dt>
                <dd className="mt-1 text-sm text-paper/80">{title.year}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-wide text-paper/45">Runtime</dt>
                <dd className="mt-1 text-sm text-paper/80">{title.runtime}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-wide text-paper/45">Rating</dt>
                <dd className="mt-1 text-sm text-paper/80">{title.rating}</dd>
              </div>
              <div className="col-span-2 sm:col-span-3">
                <dt className="font-mono text-xs uppercase tracking-wide text-paper/45">Countries</dt>
                <dd className="mt-1 text-sm text-paper/80">{title.countries.join(", ")}</dd>
              </div>
              {title.subtitlesAvailable.length > 0 && (
                <div className="col-span-2 sm:col-span-3">
                  <dt className="font-mono text-xs uppercase tracking-wide text-paper/45">
                    Subtitles
                  </dt>
                  <dd className="mt-1 text-sm text-paper/80">
                    {title.subtitlesAvailable.join(", ")}
                  </dd>
                </div>
              )}
            </dl>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-paper/75">
              {title.logline}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              {title.amazonUrl && (
                <a
                  href={title.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-gradient-brand px-6 py-3 font-mono text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-90"
                >
                  Watch on Amazon
                </a>
              )}
              <Link
                href="/contact?type=licensing"
                className="rounded-full border border-paper/25 px-6 py-3 font-mono text-xs uppercase tracking-widest text-paper transition-colors hover:border-paper/60"
              >
                Enquire About Licensing
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {title.trailerYouTubeId && (
        <section className="border-b rule-on-paper bg-paper py-16 text-paper-foreground">
          <Container>
            <h2 className="font-display text-2xl font-semibold">Trailer</h2>
            <div className="mt-6 aspect-video w-full overflow-hidden rounded-2xl bg-black">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${title.trailerYouTubeId}`}
                title={`${title.title} trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </Container>
        </section>
      )}

      {additionalStills.length > 0 && (
        <section className="border-b rule-on-dark py-16">
          <Container>
            <h2 className="font-display text-2xl font-semibold">Stills</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {additionalStills.map((src) => (
                <div
                  key={src}
                  className="relative aspect-[4/3] overflow-hidden rounded-xl bg-ink-soft"
                >
                  <Image
                    src={src}
                    alt={`${title.title} still`}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="bg-ink py-16">
        <Container className="text-center">
          <BackToCatalogue />
        </Container>
      </section>
    </>
  );
}
