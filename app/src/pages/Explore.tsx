
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CreatorFilter from "@/components/CreatorFilter";
import CreatorGrid from "@/components/CreatorGrid";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const Explore = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black text-white">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <div className="container">
          <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">Explore Creators</h1>
            <p className="text-white">
              Discover and invest in the next generation of creators across all categories.
            </p>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CreatorFilter />
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <CreatorGrid />
          </div>
          
          <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button variant="outline" className="gap-2 border-blue-500 text-blue-400 hover:bg-blue-500/20 hover:scale-105 transition-transform duration-300">
              Load More <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Explore;
