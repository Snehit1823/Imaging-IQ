"use client";

import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { CorePillars } from "@/components/core-pillars";
import { InteractiveDemo } from "@/components/interactive-demo";
import { Footer } from "@/components/footer";

export default function Home() {
  // Reverted: No session checking here to avoid the redirect loop/flash
  return (
    <main className="min-h-screen bg-[#0F172A]">
      <Navbar />
      <HeroSection />
      <CorePillars />
      <InteractiveDemo />
      <Footer />
    </main>
  );
}