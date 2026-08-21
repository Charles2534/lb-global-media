import Image from "next/image";
import { partners } from "@/lib/site";

export function LogoStrip() {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {partners.map((partner) => (
        <li
          key={partner.name}
          className="flex h-24 items-center justify-center rounded-2xl bg-paper-foreground/[0.03] p-6"
        >
          <div className="relative h-10 w-full grayscale opacity-60 transition duration-300 hover:grayscale-0 hover:opacity-100">
            <Image
              src={`/partners/${partner.file}`}
              alt={partner.name}
              fill
              sizes="200px"
              className="object-contain"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
