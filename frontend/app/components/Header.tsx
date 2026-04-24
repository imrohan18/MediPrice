import Link from "next/link";
import { Pill, Search } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/90 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Pill className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">MediPrice</span>
        </Link>

        {/* Nav */}
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="/about" className="text-foreground/60 transition-colors hover:text-foreground">About</Link>
          <Link href="/contact" className="text-foreground/60 transition-colors hover:text-foreground">Contact</Link>
        </nav>

        {/* CTA */}
        <Link
          href="/search"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Search Meds</span>
        </Link>
      </div>
    </header>
  );
}
