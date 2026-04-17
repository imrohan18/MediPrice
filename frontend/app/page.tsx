import { SearchForm } from "./components/SearchForm";
import {
  Pill,
  Activity,
  MapPin,
  BadgeDollarSign,
} from "lucide-react";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-full items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 h-[500px] w-[500px] rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

        <div className="container relative z-10 flex flex-col items-center px-4 py-24 text-center md:px-6 lg:py-32">
          <div className="mb-8 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
            <Activity className="mr-2 h-4 w-4" />
            <span>Real-time pharmacy pricing near you</span>
          </div>

          <h1 className="mb-6 max-w-4xl text-4xl font-extrabold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Never Overpay for <br />
            <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
              Prescription Meds
            </span>
          </h1>

          <p className="mb-12 max-w-2xl text-xl text-muted-foreground">
            Compare prices across local pharmacies instantly. Save up to 50%
            on your cash-pay medications without jumping between stores.
          </p>

          <div className="mb-16 w-full">
            <SearchForm />
          </div>

          <div className="grid w-full max-w-5xl grid-cols-1 gap-8 text-left md:grid-cols-3">
            <div className="flex flex-col rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Pill className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Search Any Med</h3>
              <p className="text-muted-foreground">
                Just type your prescription name, strength, and quantity to get started.
              </p>
            </div>

            <div className="flex flex-col rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                <BadgeDollarSign className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Compare Prices</h3>
              <p className="text-muted-foreground">
                See exact out-of-pocket prices from different pharmacies.
              </p>
            </div>

            <div className="flex flex-col rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-sky-500/10 text-sky-500">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Find the Nearest</h3>
              <p className="text-muted-foreground">
                Use our map view to find the most convenient pharmacy with the best deal.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}