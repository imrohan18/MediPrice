export const metadata = {
  title: "Privacy Policy | MediPrice",
  description: "Privacy Policy for MediPrice.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-screen-md prose prose-gray dark:prose-invert">
      <h1 className="text-3xl font-bold mb-6 tracking-tight">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: April 2026</p>
      
      <div className="space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">1. Introduction</h2>
          <p>
            At MediPrice, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information when you use our website and mobile application.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">2. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us, such as when you create an account, save favorite medicines, or submit pricing reports. This may include your email address and location data if you choose to share it for finding nearby pharmacies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">3. How We Use Your Information</h2>
          <p>
            We use the information we collect to provide, maintain, and improve our services, specifically to show you relevant medication prices at pharmacies near you. We do not sell your personal data to third parties.
          </p>
        </section>
      </div>
    </div>
  );
}
