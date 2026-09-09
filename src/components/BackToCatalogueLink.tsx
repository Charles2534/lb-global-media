"use client";

import { useRouter } from "next/navigation";

// A plain <Link href="/catalogue"> is a fresh forward navigation, so the
// browser/Next.js always scrolls it to the top — there's no history entry to
// restore a scroll position from. router.back() instead replays the actual
// back-navigation, which is what lets Next.js's built-in scroll restoration
// return the user to their exact prior scroll position on the catalogue grid.
// Safe to call even with no history to go back to (e.g. a title page opened
// directly from an external link) — it's just a silent no-op, not an error.
export function BackToCatalogueLink() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="inline-flex cursor-pointer items-center gap-2 font-mono text-xs uppercase tracking-widest text-paper/60 transition-colors hover:text-paper"
    >
      ← Back to Catalogue
    </button>
  );
}
