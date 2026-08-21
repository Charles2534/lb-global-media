import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { navLinks, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b rule-on-dark bg-ink/90 backdrop-blur">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/brand/logo.png"
            alt={site.name}
            width={184}
            height={56}
            priority
            className="h-14 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-widest text-paper/75 transition-colors hover:text-paper"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="hidden shrink-0 items-center gap-2 rounded-full bg-paper px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-ink transition-opacity hover:opacity-90 sm:inline-flex"
        >
          Get in Touch
        </Link>
      </Container>

      {/* Mobile nav */}
      <Container className="flex gap-6 overflow-x-auto pb-4 md:hidden">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="shrink-0 font-mono text-xs uppercase tracking-widest text-paper/75"
          >
            {link.label}
          </Link>
        ))}
      </Container>
    </header>
  );
}
