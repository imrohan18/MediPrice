export const metadata = {
  title: "Contact | MediPrice",
  description: "Get in touch with the MediPrice team.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-screen-md">
      <h1 className="text-3xl font-bold mb-6 tracking-tight">Contact Us</h1>
      <p className="text-muted-foreground mb-8 text-lg">
        Have questions or feedback? We'd love to hear from you.
      </p>
      
      <div className="space-y-6">
        <div className="p-6 border border-border/40 rounded-xl bg-card">
          <h2 className="text-xl font-semibold mb-2">Customer Support</h2>
          <p className="text-muted-foreground mb-4">
            For help with using the app or questions about pricing data.
          </p>
          <a href="mailto:support@mediprice.app" className="text-primary hover:underline font-medium">
            support@mediprice.app
          </a>
        </div>
        
        <div className="p-6 border border-border/40 rounded-xl bg-card">
          <h2 className="text-xl font-semibold mb-2">Pharmacy Partnerships</h2>
          <p className="text-muted-foreground mb-4">
            Interested in listing your pharmacy prices on MediPrice?
          </p>
          <a href="mailto:partners@mediprice.app" className="text-primary hover:underline font-medium">
            partners@mediprice.app
          </a>
        </div>
      </div>
    </div>
  );
}
