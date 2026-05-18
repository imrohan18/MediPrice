import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ScrollButtons from "./components/ScrollButtons";
import CursorGlow from "./components/CursorGlow";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MediPrice | Transparent Medicine Pricing",
  description: "Compare prescription prices across nearby pharmacies instantly.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background selection:bg-primary/20">
        <Header />

        <main className="flex-1 flex flex-col pt-20 sm:pt-20">
          {children}
        </main>

        <Footer />

        {/* UI Enhancements */}
        <ScrollButtons />
        <CursorGlow />
      </body>
    </html>
  );
}