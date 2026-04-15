"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { ChevronRight, Pill, AlertCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface Medicine {
  id: string;
  name: string;
  strength: string;
  pack_size: string;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams?.get("q") || "";

  const [results, setResults] = useState<Medicine[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setIsLoading(true);
      setError("");
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
        const res = await fetch(`${baseUrl}/api/search?q=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error("Failed to fetch results");
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error(err);
        setError("Could not load search results. Is the backend running?");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Search Results</h1>
        <p className="text-muted-foreground">
          Showing results for <span className="font-semibold text-foreground">"{query}"</span>
        </p>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="w-10 h-10 animate-spin mb-4" />
          <p>Searching for medicines...</p>
        </div>
      )}

      {error && !isLoading && (
        <div className="p-6 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive flex flex-col items-center text-center">
          <AlertCircle className="w-10 h-10 mb-2" />
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !error && results.length === 0 && query && (
         <div className="p-12 rounded-xl border border-border/50 bg-card text-center text-muted-foreground flex flex-col items-center">
            <Pill className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-lg">No medicines found matching your query.</p>
            <p className="text-sm mt-2">Try searching for generic names like "Paracetamol" or "Atorvastatin".</p>
         </div>
      )}

      {!isLoading && !error && results.length > 0 && (
        <motion.div 
          className="grid gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {results.map((med) => (
            <motion.div
              key={med.id}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <Link href={`/compare/${med.id}`}>
                <div className="group flex items-center justify-between p-6 rounded-2xl border border-border/50 bg-card transition-all hover:border-primary/40 hover:shadow-md cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <Pill className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {med.name}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {med.strength} • {med.pack_size}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-muted-foreground group-hover:text-primary transition-colors">
                    <span className="mr-2 text-sm font-medium">Compare Prices</span>
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="w-10 h-10 animate-spin mb-4" />
          <p>Loading search...</p>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
