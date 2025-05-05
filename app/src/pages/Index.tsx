
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import TrendingCreators from "@/components/TrendingCreators";
import CreatorCTA from "@/components/CreatorCTA";
import FAQSection from "@/components/FAQSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <FeatureSection />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <TrendingCreators />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
          <CreatorCTA />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "0.9s" }}>
          <FAQSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
