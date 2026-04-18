export const metadata = {
  title: "Terms of Service | MediPrice",
  description: "Terms of Service for MediPrice.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-screen-md prose prose-gray dark:prose-invert">
      <h1 className="text-3xl font-bold mb-6 tracking-tight">Terms of Service</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: April 2026</p>
      
      <div className="space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using MediPrice, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">2. Information Accuracy</h2>
          <p>
            MediPrice aggregates publicly available pricing data and user-submitted reports to help you find affordable medicine. While we strive for accuracy, we cannot guarantee that the prices displayed will exactly match the prices at the physical pharmacy counter. Prices are subject to change by the pharmacy without notice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">3. Not Medical Advice</h2>
          <p>
            MediPrice is a price comparison tool, not a healthcare provider. The information provided is not intended as medical advice. Always consult with a qualified healthcare professional regarding any medical conditions or treatment decisions.
          </p>
        </section>
      </div>
    </div>
  );
}
