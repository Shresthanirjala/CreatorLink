
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PortfolioHeader from "@/components/Portfolio/PortfolioHeader";
import HoldingsTable from "@/components/Portfolio/HoldingsTable";
import TransactionHistory from "@/components/Portfolio/TransactionHistory";
import { useNavigate } from "react-router-dom"
import { Rocket } from "lucide-react"

const Portfolio = () => {
  const navigate = useNavigate()

  const handleCreateToken = () => {
    // Navigate to the token creation page
    navigate("/create")
    console.log("Navigating to token creation page")
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black text-white">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <div className="container">
          <div
            className="mb-8 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                  Your Portfolio
                </h1>
                <p className="text-gray-300">
                  Track and manage your creator token investments.
                </p>
              </div>

              <button
                onClick={handleCreateToken}
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 rounded-lg text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Rocket size={18} className="animate-pulse" />
                Create Token
              </button>
            </div>
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
  )
};

export default Portfolio;
