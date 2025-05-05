
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PortfolioHeader from "@/components/Portfolio/PortfolioHeader";
import HoldingsTable from "@/components/Portfolio/HoldingsTable";
import TransactionHistory from "@/components/Portfolio/TransactionHistory";

const Portfolio = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black text-white">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <div className="container">
          <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">Your Portfolio</h1>
            <p className="text-gray-300">
              Track and manage your creator token investments.
            </p>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <PortfolioHeader />
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <HoldingsTable />
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <TransactionHistory />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
