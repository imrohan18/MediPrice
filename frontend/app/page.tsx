"use client";

import { SearchForm } from "./components/SearchForm";
import {
  Activity, MapPin, BadgeDollarSign, CheckCircle, Star,
  Shield, TrendingDown, Zap, ArrowRight, Search, Heart, ChevronDown,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

/* ─── Scroll-triggered wrapper ─── */
function AnimatedSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated Counter ─── */
function StatCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1800;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-4xl font-extrabold text-foreground tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ─── FAQ accordion item ─── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border/60 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left font-medium text-foreground hover:bg-muted/40 transition-colors"
      >
        {q}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 ml-4"
        >
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.28 }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">{a}</p>
      </motion.div>
    </div>
  );
}

/* ─── Data ─── */
const steps = [
  {
    number: "01",
    Icon: Search,
    title: "Search Your Medicine",
    description:
      "Type any medication name, strength, or brand into our search bar. We cover generics and branded drugs alike.",
  },
  {
    number: "02",
    Icon: BadgeDollarSign,
    title: "Compare Live Prices",
    description:
      "Instantly view prices from multiple pharmacies near you. No registration, no insurance paperwork.",
  },
  {
    number: "03",
    Icon: MapPin,
    title: "Pick & Save",
    description:
      "Choose the best deal, get directions, and walk in knowing you're paying the lowest available price.",
  },
];

const features = [
  {
    Icon: Zap,
    colorClass: "bg-primary/10 text-primary",
    title: "Instant Results",
    description:
      "Real-time data delivers up-to-date prices across hundreds of pharmacies in seconds — no waiting.",
  },
  {
    Icon: Shield,
    colorClass: "bg-emerald-500/10 text-emerald-500",
    title: "No Insurance Required",
    description:
      "All prices shown are cash-pay. No account needed, no insurance forms — transparent pricing for everyone.",
  },
  {
    Icon: TrendingDown,
    colorClass: "bg-sky-500/10 text-sky-500",
    title: "Save Up to 50%",
    description:
      "Generic substitutes and cross-pharmacy comparisons have helped patients save hundreds per prescription.",
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    role: "Diabetes Patient",
    avatar: "SM",
    quote:
      "I was paying $180/month for Metformin. MediPrice showed me a pharmacy 2 miles away charging $45. Truly life-changing.",
    stars: 5,
  },
  {
    name: "James L.",
    role: "Parent of 3",
    avatar: "JL",
    quote:
      "With three kids, prescription costs add up fast. This app saved our family over $600 last year. Simple and incredibly accurate.",
    stars: 5,
  },
  {
    name: "Dr. Priya K.",
    role: "Family Physician",
    avatar: "PK",
    quote:
      "I recommend MediPrice to every uninsured patient. It removes the guesswork and helps them afford their medications.",
    stars: 5,
  },
];

const faqs = [
  {
    q: "Is MediPrice free to use?",
    a: "Yes, completely free. No sign-up, no subscription, and no hidden fees — ever.",
  },
  {
    q: "How accurate are the prices?",
    a: "Prices are sourced from pharmacy databases and refreshed regularly. We recommend confirming at the counter as prices can occasionally vary.",
  },
  {
    q: "Does it work without insurance?",
    a: "Absolutely. MediPrice was built specifically for cash-pay patients. All prices shown are out-of-pocket.",
  },
  {
    q: "Which pharmacies are covered?",
    a: "We cover major chains like CVS, Walgreens, and Walmart, as well as thousands of independent local pharmacies.",
  },
];

/* ─── Page ─── */
export default function Home() {
  return (
    <div className="flex flex-col">

      {/* ══ HERO ══ */}
      <section className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/6 via-background to-background px-4 py-24">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -left-48 top-1/4 h-125 w-125 rounded-full bg-primary/8 blur-3xl" />
        <div className="pointer-events-none absolute -right-48 bottom-1/4 h-150 w-150 rounded-full bg-sky-500/8 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-175 w-175 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/4 blur-3xl" />

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm"
          >
            <Activity className="mr-2 h-3.5 w-3.5" />
            Real-time pharmacy pricing near you
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 text-5xl font-extrabold leading-[1.1] tracking-tight text-foreground md:text-7xl"
          >
            Never Overpay for
            <br />
            <span className="bg-linear-to-r from-primary via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Prescription Meds
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-5 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            Compare prescription prices across local pharmacies instantly. Save up to 50% on
            cash-pay medications — no insurance, no sign-up required.
          </motion.p>

          {/* Trust pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground"
          >
            {["100% Free", "No Account Needed", "Cash-Pay Friendly"].map((label) => (
              <span key={label} className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-primary" />
                {label}
              </span>
            ))}
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-14 w-full max-w-2xl"
          >
            <SearchForm />
          </motion.div>

          {/* Social proof avatars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center gap-3"
          >
            <div className="flex -space-x-2">
              {["A", "B", "C", "D"].map((l, i) => (
                <div
                  key={i}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-linear-to-br from-primary to-emerald-400 text-xs font-bold text-primary-foreground"
                >
                  {l}
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">2,400+</span> patients saved money
              this month
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══ STATS STRIP ══ */}
      <section className="border-y border-border/50 bg-muted/25 py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <AnimatedSection className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: 500, label: "Pharmacies Listed", suffix: "+" },
              { value: 12000, label: "Medicines Tracked", suffix: "+" },
              { value: 50, label: "Average Savings", suffix: "%" },
              { value: 24, label: "Hour Price Updates", suffix: "/7" },
            ].map((s, i) => (
              <motion.div key={i} variants={fadeUp} className="text-center">
                <StatCounter value={s.value} suffix={s.suffix} />
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section className="px-4 py-24">
        <div className="container mx-auto max-w-7xl">
          <AnimatedSection className="mb-16 text-center">
            <motion.p variants={fadeUp} className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              How It Works
            </motion.p>
            <motion.h2 variants={fadeUp} className="mb-4 text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
              Three steps to big savings
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto max-w-xl text-lg text-muted-foreground">
              No complicated forms, no hold music. Just fast, transparent pricing at your fingertips.
            </motion.p>
          </AnimatedSection>

          <AnimatedSection className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group relative flex flex-col items-center rounded-2xl border border-border/50 bg-card p-8 text-center transition-all hover:border-primary/30 hover:shadow-lg"
              >
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-primary-foreground">
                  {step.number}
                </span>
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                  <step.Icon className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section className="bg-muted/20 px-4 py-24">
        <div className="container mx-auto max-w-7xl">
          <AnimatedSection className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            {/* Left copy */}
            <motion.div variants={fadeUp}>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Why MediPrice</p>
              <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
                Built for patients,
                <br />
                not profit
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                We believe everyone deserves access to affordable medications. MediPrice cuts through
                the complexity of drug pricing so you can focus on what matters — your health.
              </p>
              <ul className="mb-8 space-y-4">
                {[
                  "Compare generic and branded prices side by side",
                  "Works for uninsured and underinsured patients",
                  "No membership fees or hidden costs ever",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-semibold text-primary transition-all hover:gap-3"
              >
                Learn more about us <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            {/* Right feature cards */}
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              {features.map((feat, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-2xl border border-border/50 bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${feat.colorClass}`}>
                    <feat.Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold text-foreground">{feat.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{feat.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="px-4 py-24">
        <div className="container mx-auto max-w-7xl">
          <AnimatedSection className="mb-16 text-center">
            <motion.p variants={fadeUp} className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Testimonials
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
              Trusted by real patients
            </motion.h2>
          </AnimatedSection>

          <AnimatedSection className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex flex-col rounded-2xl border border-border/50 bg-card p-7 transition-all hover:border-primary/20 hover:shadow-lg"
              >
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="mb-6 flex-1 leading-relaxed text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-primary to-emerald-400 text-sm font-bold text-primary-foreground">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="bg-muted/20 px-4 py-24">
        <div className="container mx-auto max-w-3xl">
          <AnimatedSection className="mb-12 text-center">
            <motion.p variants={fadeUp} className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              FAQ
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
              Common questions
            </motion.h2>
          </AnimatedSection>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="space-y-3"
          >
            {faqs.map((faq, i) => (
              <FAQItem key={i} {...faq} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ CTA BANNER ══ */}
      <section className="px-4 py-24">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary via-emerald-500 to-teal-500 p-12 text-center md:p-20"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15)_0%,transparent_60%)]" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/5 blur-2xl" />

            <div className="relative z-10">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h2 className="mb-4 text-3xl font-extrabold text-white md:text-5xl">
                Start saving today
              </h2>
              <p className="mx-auto mb-10 max-w-xl text-lg text-white/80">
                Join thousands of patients who've already cut their prescription costs with MediPrice.
                It takes seconds.
              </p>
              <Link
                href="/search"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-primary shadow-xl transition-transform hover:scale-105 active:scale-95"
              >
                Search for a medicine <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
