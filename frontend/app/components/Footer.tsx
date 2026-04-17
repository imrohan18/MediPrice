
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
        </div>
      </div>
    </footer>
  );
}
