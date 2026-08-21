import Image from "next/image";
import { partners } from "@/lib/site";

function LogoCard({ partner }: { partner: (typeof partners)[number] }) {
  const isLarge = partner.size === "lg";

  return (
    <div
      className={`flex h-28 items-center justify-center rounded-2xl bg-paper-foreground/[0.03] ${
        isLarge ? "p-4" : "p-6"
      }`}
    >
      <div
        className={`logo-hover relative w-full transition-transform duration-300 ${
          isLarge ? "h-20" : "h-14"
        }`}
      >
        <Image
          src={`/partners/${partner.file}`}
          alt={partner.name}
          fill
          sizes="(min-width: 768px) 220px, 45vw"
          className="object-contain"
        />
      </div>
    </div>
  );
}

export function LogoStrip() {
  return (
    <div>
      {/* Mobile & tablet: simple wrapping grid */}
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:hidden">
        {partners.map((partner) => (
          <li key={partner.name}>
            <LogoCard partner={partner} />
          </li>
        ))}
      </ul>

      {/* Desktop: staggered brick grid — each bottom-row logo centered in the
          gap between the two logos above it. */}
      <ul className="hidden md:grid md:grid-cols-8 md:gap-x-6 md:gap-y-8">
        <li className="col-span-2 col-start-1">
          <LogoCard partner={partners[0]} />
        </li>
        <li className="col-span-2 col-start-3">
          <LogoCard partner={partners[1]} />
        </li>
        <li className="col-span-2 col-start-5">
          <LogoCard partner={partners[2]} />
        </li>
        <li className="col-span-2 col-start-7">
          <LogoCard partner={partners[3]} />
        </li>
        <li className="col-span-2 col-start-2">
          <LogoCard partner={partners[4]} />
        </li>
        <li className="col-span-2 col-start-4">
          <LogoCard partner={partners[5]} />
        </li>
        <li className="col-span-2 col-start-6">
          <LogoCard partner={partners[6]} />
        </li>
      </ul>
    </div>
  );
}
