"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Project from "@/components/Project";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <main className="w-full flex flex-col">
      <Navbar />
      <Hero />
      <Project />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
