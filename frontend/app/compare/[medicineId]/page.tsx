"use client";

import { use, useEffect, useState } from "react";
import { ArrowLeft, Loader2, MapPin, Pill, Store, TrendingDown, AlertCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Medicine {
  id: string;
  name: string;
  strength: string;
  pack_size: string;
}

interface PharmacyPrice {
  pharmacy_name: string;
  distance_km: number;
  type: string;
  price_per_unit: number;
  total_price: number;
  lat: number;
  lon: number;
  last_updated: string;
}

interface CompareResult {
  medicine: Medicine;
  prices: PharmacyPrice[];
  error?: string;
}

export default function ComparePage({ params }: { params: Promise<{ medicineId: string }> }) {
  // Extract medicineId from the Promise params
  const { medicineId } = use(params);

  const [result, setResult] = useState<CompareResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompare = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/compare/${medicineId}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        
        if (data.error) {
          setError(data.error);
        } else {
          // Sort prices ascending
          data.prices.sort((a: PharmacyPrice, b: PharmacyPrice) => a.total_price - b.total_price);
          setResult(data);
        }
      } catch (err) {
        console.error(err);
        setError("Could not load price comparison.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompare();
  }, [medicineId]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-muted-foreground">
        <Loader2 className="w-12 h-12 animate-spin mb-4 text-primary" />
        <p className="text-lg">Crunching numbers across pharmacies...</p>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Oops!</h2>
        <p className="text-muted-foreground mb-8">{error || "Something went wrong."}</p>
        <Link href="/" className="text-primary hover:underline">
          Go back to search
        </Link>
      </div>
    );
  }

  const { medicine, prices } = result;
  // Mark the cheapest
  const cheapestPrice = prices[0]?.total_price;

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Back link */}
      <Link href="javascript:history.back()" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to results
      </Link>

      {/* Header Info */}
      <div className="bg-card border border-border/50 rounded-3xl p-6 md:p-8 mb-8 flex flex-col md:flex-row md:items-center justify-between shadow-sm">
        <div className="flex items-center space-x-5 mb-4 md:mb-0">
          <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <Pill className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              {medicine.name}
            </h1>
            <p className="text-lg text-muted-foreground mt-1">
              {medicine.strength} • {medicine.pack_size}
            </p>
          </div>
        </div>
        
        <div className="flex flex-col items-start md:items-end p-4 rounded-xl bg-primary/5 border border-primary/10">
          <p className="text-sm font-medium text-emerald-600 flex items-center mb-1">
            <TrendingDown className="w-4 h-4 mr-1" />
            Best Price Found
          </p>
          <p className="text-3xl font-extrabold text-primary">
            ₹{cheapestPrice.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Price List */}
        <div className="lg:col-span-2 flex flex-col space-y-4">
          <h2 className="text-xl font-bold mb-2">Available at {prices.length} Pharmacies</h2>
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            className="space-y-4"
          >
            {prices.map((pharmacy, idx) => {
              const isCheapest = idx === 0;
              return (
                <motion.div 
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border ${isCheapest ? 'border-primary/50 shadow-md bg-card ring-1 ring-primary/20' : 'border-border/50 bg-card hover:border-primary/30 transition-colors'}`}
                >
                  <div className="flex-1 mb-4 sm:mb-0">
                    <div className="flex items-center space-x-2 mb-1">
                      {isCheapest && (
                        <span className="px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider">
                          Best Offer
                        </span>
                      )}
                      <span className="text-xs font-medium text-muted-foreground uppercase bg-muted px-2 py-0.5 rounded-md">
                        {pharmacy.type}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold flex items-center mt-2">
                       <Store className="w-5 h-5 mr-2 text-muted-foreground" />
                       {pharmacy.pharmacy_name}
                    </h3>
                    <p className="text-sm text-muted-foreground flex items-center mt-1">
                      <MapPin className="w-4 h-4 mr-1 opacity-70" /> {pharmacy.distance_km} km away
                    </p>
                  </div>

                  <div className="flex flex-col items-start sm:items-end">
                    <p className="text-2xl font-bold flex items-end">
                       ₹{pharmacy.total_price.toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      ₹{pharmacy.price_per_unit.toFixed(2)} / unit
                    </p>
                    <p className="text-xs text-muted-foreground/60 mt-2">
                      Updated: {new Date(pharmacy.last_updated).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Map / Context Area */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <h2 className="text-xl font-bold mb-4">Location</h2>
            <div className="w-full h-[400px] bg-muted/30 border border-border/50 rounded-3xl overflow-hidden relative group">
              {/* Map Placeholder */}
              <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=18.5204,73.8567&zoom=14&size=600x400&scale=2&maptype=roadmap&style=feature:administrative%7Celement:labels.text.fill%7Ccolor:0x444444&style=feature:landscape%7Celement:all%7Ccolor:0xf2f2f2&key=INSERT_YOUR_KEY')] bg-cover bg-center opacity-40 blur-[2px] grayscale transition-all group-hover:grayscale-0 group-hover:blur-none duration-500"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm group-hover:opacity-0 transition-opacity duration-500">
                <MapPin className="w-12 h-12 text-primary mb-3" />
                <p className="font-semibold px-4 text-center">Interactive map will display pins for each pharmacy</p>
                <p className="text-sm text-muted-foreground px-4 text-center mt-2">(Mapbox or Google Maps integration)</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 rounded-2xl bg-sky-500/5 border border-sky-500/20 flex gap-3 text-sm text-sky-700 dark:text-sky-300">
               <AlertCircle className="shrink-0 w-5 h-5" />
               <p>Prices shown are estimates based on our latest data. Always verify over counter.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
