"use client";

import { motion } from "framer-motion";
import { ShieldCheck, HeartPulse, BadgeDollarSign, Pill } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-full items-center py-16 px-4 md:px-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background relative overflow-hidden">
      
      {/* Background decorations */}
      <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10 max-w-5xl">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-6"
        >
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-2 backdrop-blur-sm">
            <HeartPulse className="mr-2 h-4 w-4" />
            <span>Our Mission</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
            Healthcare Transparency <br className="hidden sm:block" /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
              For Everyone
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We believe that no one should overpay for essential medications. By bringing real-time pharmacy pricing directly to your phone, we empower you to make informed decisions about your health.
          </p>
        </motion.div>

        {/* Feature/Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col p-8 rounded-3xl bg-card border border-border/50 shadow-sm transition-all hover:shadow-md glass relative group overflow-hidden"
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-500" />
            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary relative z-10">
              <BadgeDollarSign className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-bold mb-3 relative z-10">Fair Pricing</h3>
            <p className="text-muted-foreground leading-relaxed relative z-10">
              Prescription prices can vary up to 50% between pharmacies in the same city. We find the most affordable options so you keep more money in your pocket.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col p-8 rounded-3xl bg-card border border-border/50 shadow-sm transition-all hover:shadow-md glass relative group overflow-hidden"
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-sky-500/10 rounded-full blur-2xl group-hover:bg-sky-500/20 transition-all duration-500" />
            <div className="h-14 w-14 rounded-2xl bg-sky-500/10 flex items-center justify-center mb-6 text-sky-500 relative z-10">
              <Pill className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-bold mb-3 relative z-10">Comprehensive</h3>
            <p className="text-muted-foreground leading-relaxed relative z-10">
              Whether you need branded treatments or generic equivalents, our database is constantly updating to ensure you always have access to the medication you need.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col p-8 rounded-3xl bg-card border border-border/50 shadow-sm transition-all hover:shadow-md glass md:col-span-2 lg:col-span-1 relative group overflow-hidden"
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500" />
            <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 text-emerald-500 relative z-10">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-bold mb-3 relative z-10">Trust & Security</h3>
            <p className="text-muted-foreground leading-relaxed relative z-10">
              We never store sensitive personal prescription information. Your searches are private, secure, and used solely to match you with the best nearby pharmacy rates.
            </p>
          </motion.div>

        </div>

        {/* The Story Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-card border border-border/40 rounded-[2rem] p-8 md:p-12 shadow-xl shadow-primary/5 max-w-4xl mx-auto"
        >
          <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
            <p>
              MediPrice was born out of a simple, frustrating observation: buying medicine shouldn't feel like a negotiation or a guessing game. Like many of our users, our founders experienced the shock of walking into one pharmacy and getting a quote, only to find the exact same prescription for half the price just a few blocks away.
            </p>
            <p>
              For individuals managing chronic conditions or caregivers supporting elderly family members, this lack of transparency isn't just inconvenient—it's a massive financial burden. 
            </p>
            <p className="font-medium text-foreground">
              We built MediPrice to level the playing field. By aggregating public retail prices and providing an intuitive tool to search your local area, we're putting the power to choose back where it belongs: in your hands.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
