"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Photo = {
  src: string;
  alt: string;
};

export function EventGalleryLightbox({ photos: photosProp }: { photos: Photo[] }) {
  // Guard against duplicate entries reaching the gallery (same still listed
  // twice, e.g. from a data mixup) — de-dupe by src rather than trusting callers.
  const photos = photosProp.filter(
    (photo, i) => photosProp.findIndex((p) => p.src === photo.src) === i
  );

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [failedSrcs, setFailedSrcs] = useState<Set<string>>(new Set());
  const closeRef = useRef<HTMLButtonElement>(null);

  const isOpen = openIndex !== null;

  useEffect(() => {
    if (!isOpen) return;

    closeRef.current?.focus();
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") {
        setOpenIndex((i) => (i === null ? i : (i + 1) % photos.length));
      }
      if (e.key === "ArrowLeft") {
        setOpenIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
      }
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, photos.length]);

  return (
    <>
      {/* flex-wrap + justify-center rather than a grid, so a gallery with
          fewer than 3 stills centers its row instead of left-aligning with
          dead space on the right (grid can't center a partial last row). */}
      <div className="flex flex-wrap justify-center gap-4">
        {photos.map((photo, i) =>
          failedSrcs.has(photo.src) ? (
            <div
              key={photo.src}
              className="flex aspect-[4/3] w-full items-center justify-center rounded-xl bg-ink-soft text-xs text-paper/40 sm:w-[calc((100%-2rem)/3)]"
            >
              Image unavailable
            </div>
          ) : (
            <button
              key={photo.src}
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`Expand photo: ${photo.alt}`}
              className="group relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-xl sm:w-[calc((100%-2rem)/3)]"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                onError={() =>
                  setFailedSrcs((prev) => new Set(prev).add(photo.src))
                }
              />
              <span className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
            </button>
          )
        )}
      </div>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo, expanded view"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          onClick={() => setOpenIndex(null)}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpenIndex(null)}
              aria-label="Close"
              className="absolute -top-10 right-0 cursor-pointer font-mono text-xs uppercase tracking-widest text-paper/70 hover:text-paper"
            >
              Close ✕
            </button>

            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-black">
              <Image
                src={photos[openIndex].src}
                alt={photos[openIndex].alt}
                fill
                sizes="(min-width: 1024px) 900px, 100vw"
                className="object-contain"
                priority
              />
            </div>

            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setOpenIndex((openIndex - 1 + photos.length) % photos.length)}
                  aria-label="Previous photo"
                  className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-ink/70 text-paper transition-colors hover:bg-ink"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M11 3L5 9l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setOpenIndex((openIndex + 1) % photos.length)}
                  aria-label="Next photo"
                  className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-ink/70 text-paper transition-colors hover:bg-ink"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M7 3l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
