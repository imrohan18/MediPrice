
"use client";

import Link from "next/link";
import { Pill, Twitter, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Pill className="h-5 w-5" />
              </div>

              <span className="text-xl font-bold text-foreground">
                MediPrice
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
              Compare medicine prices, find nearby pharmacies, and save more on every prescription.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              Quick Links
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/about" className="hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/pharmacies" className="hover:text-primary transition-colors">
                Pharmacies
              </Link>
              <Link href="/contact" className="hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              Resources
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/support" className="hover:text-primary transition-colors">
                Support
              </Link>
              <Link href="/faq" className="hover:text-primary transition-colors">
                FAQs
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              Follow Us
            </h3>

            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Stay updated with new pharmacy deals, medicine savings tips, and platform updates.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <a
                href="#"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Twitter className="h-4 w-4" />
              </a>

              <a
                href="#"
                aria-label="Github"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Github className="h-4 w-4" />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <p className="text-sm text-muted-foreground">
            © 2026 MediPrice. All rights reserved.
          </p>

          <p className="text-sm text-muted-foreground">
            Designed for accessible and affordable healthcare.
          </p>
import Link from "next/link";
import { Pill } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 py-12 mt-auto">
      <div className="container mx-auto px-4 max-w-screen-xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="flex flex-col items-start gap-4 col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/20">
                <Pill className="h-4 w-4 text-primary" />
              </div>
              <span className="font-semibold tracking-tight text-lg">
                MediPrice
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Built for transparent medicine pricing. Compare prescription prices across nearby pharmacies instantly and save money.
            </p>
          </div>
          
          <div className="flex flex-col gap-3">
            <h3 className="font-medium text-sm text-foreground">Company</h3>
            <Link href="/about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">About Us</Link>
            <Link href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Contact</Link>
          </div>
          
          <div className="flex flex-col gap-3">
            <h3 className="font-medium text-sm text-foreground">Legal</h3>
            <Link href="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-center md:text-left text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MediPrice. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">Search</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
