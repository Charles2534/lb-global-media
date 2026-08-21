import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { navLinks, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t rule-on-dark bg-ink">
      <Container className="py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <Image
              src="/brand/logo.png"
              alt={site.name}
              width={160}
              height={49}
              className="h-8 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm text-paper/60">
              {site.description}
            </p>
          </div>

          <div className="flex flex-col gap-3 font-mono text-xs uppercase tracking-widest">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-paper/60 transition-colors hover:text-paper"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`mailto:${site.email}`}
              className="text-paper/60 transition-colors hover:text-paper"
            >
              {site.email}
            </a>
          </div>

          <div className="font-mono text-xs uppercase tracking-widest text-paper/40">
            <p>United Kingdom &middot; France &middot; Thailand</p>
            <p className="mt-2">&copy; {new Date().getFullYear()} {site.name}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
