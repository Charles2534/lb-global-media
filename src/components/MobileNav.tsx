"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { navLinks } from "@/lib/site";

export function MobileNav() {
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

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-label="Open menu"
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-paper/20 text-paper transition-colors hover:border-paper/50"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2.5 5.5h15M2.5 10h15M2.5 14.5h15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-0 z-[100] flex h-dvh w-screen flex-col bg-ink"
          >
            <div className="flex h-20 shrink-0 items-center justify-between px-6">
              <span className="font-mono text-xs uppercase tracking-widest text-paper/50">
                Menu
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-paper/20 text-paper transition-colors hover:border-paper/50"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 2l14 14M16 2L2 16"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-2 overflow-y-auto px-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-display border-b rule-on-dark py-4 text-3xl font-semibold tracking-tight text-paper transition-opacity active:opacity-60"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="shrink-0 px-6 pb-10">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center rounded-full bg-gradient-brand px-6 py-4 font-mono text-xs uppercase tracking-widest text-white"
              >
                Get in Touch
              </Link>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
