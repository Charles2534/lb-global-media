import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { PillList } from "@/components/PillList";
import { NumberedList } from "@/components/NumberedList";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Production & Global Partnerships",
  description:
    "LB Global Media develops and supports selected productions and international co-productions across Europe, Asia and Latin America.",
};

const focusAreas = [
  "Coming-of-age",
  "LGBTQ+",
  "Horror and Thriller",
  "Science Fiction",
  "Asian Voices",
  "Black Cinema & African Perspectives",
  "European Stories",
  "Cultural Identity & Diaspora",
  "Resilience and Human Connection",
];

const formats = ["Feature films", "Vertical series & Microdramas", "Series", "Short Films"];

const whatWeBring = [
  {
    title: "International Acquisition & Distribution",
    body: "Extensive experience in international content acquisition and distribution.",
  },
  {
    title: "Established Relationships",
    body: "Relationships with platforms, filmmakers and production partners.",
  },
  {
    title: "Proven Curation",
    body: "Experience curating & distributing content to platforms worldwide.",
  },
  {
    title: "Cross-Border Perspective",
    body: "Cross-border development and co-production perspectives.",
  },
  {
    title: "Efficient Co-Production Models",
    body: "Cost-efficient, multi-national co-production models.",
  },
  {
    title: "Access to Talent",
    body: "Access to emerging creative talent and distinctive global stories.",
  },
  {
    title: "International Positioning",
    body: "Support in positioning projects for international audiences and partners.",
  },
];

export default function ProductionPage() {
  return (
    <>
      <section className="border-b rule-on-dark pb-16 pt-16 sm:pt-24">
        <Container>
          <p className="font-mono text-xs uppercase tracking-widest text-paper/50">
            Production &amp; Global Partnerships
          </p>
          <h1 className="font-display mt-5 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            {site.name} as a{" "}
            <span className="text-gradient">Global Co-Production Partner</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper/70">
            Alongside curation and distribution, {site.name} develops and
            supports selected productions and international co-productions
            with the potential to connect with audiences across borders.
          </p>
        </Container>
      </section>

      <section className="border-b rule-on-paper bg-paper py-24 text-paper-foreground">
        <Container>
          <SectionHeading
            index="(01)"
            eyebrow="What We Are Looking For"
            title="Distinctive Voices, International Potential"
            tone="paper"
          />
          <p className="mt-6 max-w-2xl text-paper-foreground/70">
            We are particularly interested in projects with distinctive
            creative voices, strong international potential and themes that
            travel across and transcend cultures. Our focus areas include:
          </p>
          <div className="mt-6">
            <PillList items={focusAreas} tone="paper" />
          </div>

          <p className="mt-10 max-w-2xl text-paper-foreground/70">
            We consider selected projects at different stages, from early
            development through to production and distribution. Formats
            include:
          </p>
          <div className="mt-6">
            <PillList items={formats} tone="paper" />
          </div>
        </Container>
      </section>

      <section className="border-b rule-on-dark py-24">
        <Container>
          <SectionHeading
            index="(02)"
            eyebrow="Regional Production & Talent Networks"
            title="A Multicultural Team, Across Three Continents"
          />
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper/70">
            Our multicultural team operates across London, Paris and Bangkok,
            supported by creative and industry relationships throughout
            Europe, Asia and Latin America.
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-paper/70">
            Our truly international and unique DNA makes us well-positioned
            for international media co-productions. Our international
            perspective helps us identify cross-border opportunities, connect
            complementary partners and support stories capable of resonating
            beyond their country of origin.
          </p>

          <div className="mt-12 rounded-2xl border rule-on-dark p-8">
            <p className="font-display text-xl font-semibold">
              Weerada Sucharitkul
              <span className="ml-3 font-mono text-xs font-normal uppercase tracking-widest text-paper/50">
                Founder &amp; CEO
              </span>
            </p>
            <p className="mt-4 max-w-2xl leading-relaxed text-paper/70">
              Founder and CEO Weerada Sucharitkul brings more than a decade of
              experience in international content acquisition and
              distribution. An alumna of the EAVE Ties That Bind international
              co-production programme, she has lived in 11 countries across
              five continents and has a particular interest in projects
              connecting Asia, Europe and Latin America.
            </p>
          </div>

          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-paper/70">
            At {site.name}, we are particularly interested in projects which
            bring fresh, authentic perspectives from under-represented voices
            around the world.
          </p>
        </Container>
      </section>

      <section className="border-b rule-on-paper bg-paper py-24 text-paper-foreground">
        <Container>
          <SectionHeading
            index="(03)"
            eyebrow="Our International Footprint"
            title="Europe, Asia & Latin America"
            tone="paper"
          />

          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
              <Image
                src="/production/footprint-map.png"
                alt="Map of LB Global Media's international footprint across Europe, Asia and Latin America"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain"
              />
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <h3 className="font-display text-lg font-semibold">Europe</h3>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-paper-foreground/70">
                  <li>France and UK-based operations with strong industry presence</li>
                  <li>Production foothold in Spain and Catalonia</li>
                  <li>Additional partners in Eastern Europe: Lithuania, Poland, and Serbia</li>
                  <li>Exploring new opportunities in the Canary Islands, Belgium, Italy, and Ibermedia pathways</li>
                </ul>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold">Asia</h3>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-paper-foreground/70">
                  <li>Established industry and local connections in Thailand</li>
                  <li>Growing networks in Singapore, Japan, Indonesia, and Malaysia</li>
                </ul>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold">Latin America</h3>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-paper-foreground/70">
                  <li>Strong networks with producers and filmmakers in Mexico, Colombia &amp; Brazil</li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b rule-on-dark py-24">
        <Container>
          <SectionHeading index="(04)" eyebrow="What We Bring" title="Why Partner With Us" />
          <div className="mt-14">
            <NumberedList items={whatWeBring} columns={2} />
          </div>
        </Container>
      </section>

      <section className="bg-ink py-24">
        <Container className="text-center">
          <h2 className="font-display text-4xl font-semibold sm:text-5xl">
            <span className="text-gradient">Partner</span> With Us
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-paper/70">
            We welcome discussions with producers, filmmakers, financiers,
            platforms and other organisations seeking international production
            or distribution partners. If you are developing a project that
            aligns with our vision and would love to explore potential
            synergies, we would like to hear from you.
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-paper/70">
            {site.name} is committed to discovering and elevating distinctive
            voices from around the world — whether by introducing existing
            films to new audiences or helping original stories reach the
            screen.
          </p>
          <div className="mt-10">
            <Link
              href="/contact?type=partnership"
              className="rounded-full bg-gradient-brand px-6 py-3 font-mono text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-90"
            >
              Get in Touch
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
