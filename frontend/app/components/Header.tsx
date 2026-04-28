import Link from "next/link";
import { Pill, Search } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      <div className="flex h-14 w-full max-w-3xl items-center justify-between rounded-full border border-border/50 bg-background/85 px-3 shadow-lg shadow-black/5 backdrop-blur-md">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full px-3 py-1.5 transition-all hover:bg-muted"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary">
            <Pill className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-base font-bold tracking-tight">MediPrice</span>
        </Link>

        {/* Nav */}
        <nav className="hidden items-center gap-1 text-sm font-medium md:flex">
          <Link
            href="/about"
            className="rounded-full px-4 py-1.5 text-foreground/60 transition-all hover:bg-muted hover:text-foreground"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="rounded-full px-4 py-1.5 text-foreground/60 transition-all hover:bg-muted hover:text-foreground"
          >
            Contact
          </Link>
        </nav>

        {/* CTA */}
        <Link
          href="/search"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:scale-105 active:scale-95"
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Search Meds</span>
        </Link>
      </div>
    </header>
  );
}
