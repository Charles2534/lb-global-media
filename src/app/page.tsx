import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { NumberedList } from "@/components/NumberedList";
import { PillList } from "@/components/PillList";
import { LogoStrip } from "@/components/LogoStrip";
import { StillsCollage } from "@/components/StillsCollage";
import { site } from "@/lib/site";

const ethos = [
  {
    title: "Thoughtful Curation",
    body: "We select films for their thematic, emotional and visual compatibility.",
  },
  {
    title: "Global & Diverse Narratives",
    body: "We bring together stories, filmmakers and audiences from different cultures.",
  },
  {
    title: "Emerging Filmmakers",
    body: "We help new talent reach wider audiences and gain long-term visibility.",
  },
  {
    title: "Building Creative Bridges",
    body: "We connect filmmakers, producers, cultures and audiences internationally.",
  },
  {
    title: "Responsible Innovation",
    body: "We embrace new technologies and models that empower creativity, production and distribution without losing creative control.",
  },
];

const partnerTypes = [
  "Streaming & VOD platforms",
  "Broadcasters",
  "Airlines and hospitality providers",
  "Telecommunications companies",
  "Educational platforms",
  "Cultural institutions",
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b rule-on-dark pb-24 pt-16 sm:pt-24">
        <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-paper/50">
              International Film Production &amp; Distribution
            </p>
            <h1 className="font-display mt-5 text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Global Stories.
              <br />
              <span className="text-gradient">Curated, Produced</span>
              <br />
              &amp; Distributed.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-paper/70">
              {site.name} is an international film production &amp; distribution
              company with operations in the UK, France and Thailand. We curate,
              produce, and distribute feature-length anthologies featuring
              exceptional short films from around the world — bringing
              complementary films together around a shared theme to create
              cohesive viewing experiences for global audiences while showcasing
              a new generation of filmmakers.
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-paper/70">
              Alongside our anthology catalogue, we develop, produce and
              collaborate on selected film and television projects with
              international potential.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/catalogue"
                className="rounded-full bg-gradient-brand px-6 py-3 font-mono text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-90"
              >
                Browse the Catalogue
              </Link>
              <Link
                href="/production"
                className="rounded-full border border-paper/25 px-6 py-3 font-mono text-xs uppercase tracking-widest text-paper transition-colors hover:border-paper/60"
              >
                Partner With Us
              </Link>
            </div>
          </div>

          <StillsCollage
            stills={[
              {
                src: "/home/stills/still-3.png",
                alt: "Still from Tender Resistance",
                className: "left-0 top-0 h-3/5 w-3/4 rotate-[-4deg]",
              },
              {
                src: "/home/stills/still-4.png",
                alt: "Still from Where We Begin",
                className: "bottom-0 right-0 h-3/5 w-3/5 rotate-[3deg]",
              },
              {
                src: "/home/stills/still-1.png",
                alt: "Still from Beyond Our End",
                className: "bottom-6 left-6 h-2/5 w-2/5 rotate-[-2deg] hidden sm:block",
              },
            ]}
          />
        </Container>
      </section>

      {/* What drives us */}
      <section className="border-b rule-on-paper bg-paper py-24 text-paper-foreground">
        <Container>
          <SectionHeading index="(01)" eyebrow="What Drives Us" title="Our Ethos" tone="paper" />
          <div className="mt-14">
            <NumberedList items={ethos} tone="paper" columns={3} />
          </div>
          <p className="font-display mt-16 max-w-3xl text-2xl leading-snug text-paper-foreground/80">
            {site.name} is the evolution of{" "}
            <span className="text-gradient">FilmDoo</span>, carrying forward a
            decade-long legacy of global content acquisition and international
            distribution expertise into a new, agile distribution model.
          </p>
        </Container>
      </section>

      {/* Who we work with */}
      <section className="border-b rule-on-dark py-24">
        <Container>
          <SectionHeading index="(02)" eyebrow="Who We Work With" title="Our Partners" />
          <div className="mt-10">
            <PillList items={[...partnerTypes]} />
          </div>

          <p className="mt-16 font-mono text-xs uppercase tracking-widest text-paper/50">
            Discover Some of Our Global Partners
          </p>
          <div className="mt-6">
            <LogoStrip />
          </div>
        </Container>
      </section>

      {/* Events & industry engagement */}
      <section className="bg-paper py-24 text-paper-foreground">
        <Container>
          <SectionHeading
            index="(03)"
            eyebrow="Events & Industry Engagement"
            title="Building the Room, Not Just the Deal"
            tone="paper"
          />
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper-foreground/70">
            We bring filmmakers, producers and industry professionals together
            to exchange knowledge, build relationships and explore the changing
            international content market.
          </p>
          <p className="font-display mt-6 text-xl font-semibold">
            Film Business Masterclass: Content Is King, Distribution Is
            Emperor, IP Is Your Asset
            <span className="block text-base font-normal text-paper-foreground/60">
              Bangkok — 17 January 2026
            </span>
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative aspect-[4/3] overflow-hidden rounded-xl"
              >
                <Image
                  src={`/home/masterclass/photo-${i}.jpg`}
                  alt={`Film Business Masterclass, Bangkok, 17 January 2026 — photo ${i}`}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Closing CTA */}
      <section className="bg-ink py-24">
        <Container className="text-center">
          <h2 className="font-display text-4xl font-semibold sm:text-5xl">
            Have a title, a project, or a{" "}
            <span className="text-gradient">partnership</span> in mind?
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/catalogue"
              className="rounded-full border border-paper/25 px-6 py-3 font-mono text-xs uppercase tracking-widest text-paper transition-colors hover:border-paper/60"
            >
              Explore the Catalogue
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="rounded-full bg-gradient-brand px-6 py-3 font-mono text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-90"
            >
              Get in Touch
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
