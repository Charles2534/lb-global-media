"use client";

import { useEffect, useRef, useState } from "react";

export function TrailerButton({
  youTubeId,
  title,
}: {
  youTubeId: string | null;
  title: string;
}) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    closeRef.current?.focus();
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!youTubeId) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-paper/25 px-4 py-2 font-mono text-xs uppercase tracking-widest text-paper transition-colors hover:border-paper/60"
      >
        Watch Trailer
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} trailer`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              className="absolute -top-10 right-0 cursor-pointer font-mono text-xs uppercase tracking-widest text-paper/70 hover:text-paper"
            >
              Close ✕
            </button>
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${youTubeId}?autoplay=1`}
                title={`${title} trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
