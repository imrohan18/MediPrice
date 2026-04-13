"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SearchForm() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsLoading(true);
    // Simple routing to search page with query
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      onSubmit={handleSearch}
      className="relative w-full max-w-2xl mx-auto shadow-2xl rounded-full bg-card ring-1 ring-border border border-border/50"
    >
      <div className="relative flex items-center w-full h-16 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-primary transition-all">
        <div className="pl-6 pr-4 flex items-center justify-center text-muted-foreground">
          <Search className="w-6 h-6" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a medicine name (e.g. Paracetamol)..."
          className="flex-1 h-full bg-transparent text-lg text-foreground outline-none placeholder:text-muted-foreground/70"
        />
        <div className="pr-2 pl-2">
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className={cn(
              "h-12 px-6 rounded-full font-semibold transition-all flex items-center justify-center min-w-[120px]",
              query.trim()
                ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-primary/20"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Compare"}
          </button>
        </div>
      </div>
    </motion.form>
  );
}
