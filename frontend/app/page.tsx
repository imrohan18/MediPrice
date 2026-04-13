import { SearchForm } from "./components/SearchForm";
import { Pill, ArrowRight, Activity, MapPin, BadgeDollarSign } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-full items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10 px-4 md:px-6 py-24 lg:py-32 flex flex-col items-center text-center">
        
        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 backdrop-blur-sm">
          <Activity className="mr-2 h-4 w-4" />
          <span>Real-time pharmacy pricing near you</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground max-w-4xl mb-6">
          Never Overpay for <br/> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
            Prescription Meds
          </span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mb-12">
          Compare prices across local pharmacies instantly. Save up to 50% on your cash-pay medications without jumping between stores.
        </p>

        <div className="w-full mb-16">
          <SearchForm />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full text-left">
          <div className="flex flex-col p-6 rounded-2xl bg-card border border-border/50 shadow-sm transition-all hover:shadow-md">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
              <Pill className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Search Any Med</h3>
            <p className="text-muted-foreground">Just type your prescription name, strength, and quantity to get started.</p>
          </div>
          
          <div className="flex flex-col p-6 rounded-2xl bg-card border border-border/50 shadow-sm transition-all hover:shadow-md">
            <div className="h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 text-emerald-500">
              <BadgeDollarSign className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Compare Prices</h3>
            <p className="text-muted-foreground">See exact out-of-pocket prices from different pharmacies.</p>
          </div>
          
          <div className="flex flex-col p-6 rounded-2xl bg-card border border-border/50 shadow-sm transition-all hover:shadow-md">
            <div className="h-12 w-12 rounded-lg bg-sky-500/10 flex items-center justify-center mb-4 text-sky-500">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Find the Nearest</h3>
            <p className="text-muted-foreground">Use our map view to find the most convenient pharmacy with the best deal.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
