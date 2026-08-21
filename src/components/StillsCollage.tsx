import Image from "next/image";

type Still = { src: string; alt: string; className: string };

export function StillsCollage({ stills }: { stills: Still[] }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md sm:aspect-[4/3] sm:max-w-lg">
      {stills.map((still) => (
        <div
          key={still.src}
          className={`absolute overflow-hidden rounded-xl shadow-2xl shadow-black/40 ring-1 ring-paper/10 ${still.className}`}
        >
          <Image
            src={still.src}
            alt={still.alt}
            fill
            sizes="320px"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
