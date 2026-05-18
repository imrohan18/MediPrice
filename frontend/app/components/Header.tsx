"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Pill, Search, Menu, X } from "lucide-react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pt-4 px-4">
      <div className="flex h-14 w-full max-w-3xl items-center justify-between rounded-full border border-border/50 bg-background/85 px-3 shadow-lg shadow-black/5 backdrop-blur-md">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2 rounded-full px-3 py-1.5 transition-all hover:bg-muted"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary">
            <Pill className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-base font-bold tracking-tight">MediPrice</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-1.5 transition-all hover:bg-muted hover:text-foreground ${
                pathname === link.href ? "text-foreground" : "text-foreground/60"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* CTA */}
          <Link
            href="/search"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:scale-105 active:scale-95"
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Search Meds</span>
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="mt-2 w-full max-w-3xl rounded-2xl border border-border/50 bg-background/95 shadow-lg backdrop-blur-md p-3 md:hidden">
          <nav className="flex flex-col gap-1 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-xl px-4 py-3 transition-all hover:bg-muted hover:text-foreground ${
                  pathname === link.href ? "bg-muted text-foreground" : "text-foreground/60"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/search"
              onClick={() => setMenuOpen(false)}
              className="mt-1 flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
            >
              <Search className="h-4 w-4" />
              Search Medicines
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
