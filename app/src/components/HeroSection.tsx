
import React from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-[10%] w-72 h-72 bg-blue-500 rounded-full filter blur-[120px] opacity-30 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-[10%] w-72 h-72 bg-purple-500 rounded-full filter blur-[120px] opacity-30 animate-pulse-slow"></div>
        <div className="absolute top-1/4 right-1/3 w-40 h-40 bg-pink-500 rounded-full filter blur-[100px] opacity-20 animate-float"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0xNGg0djFoLTR2LTF6bTAtN2g0djFoLTR2LTF6TTEwIDI3aDR2MWgtNHYtMXptMC03aDR2MWgtNHYtMXptMC03aDR2MWgtNHYtMXoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-500/20">
              <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">Revolutionary Creator Economy</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Invest in creators. <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Grow together.</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-lg mx-auto md:mx-0">
              CreatorLink is the first decentralized platform where fans can invest directly in their favorite creators and share in their success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/explore">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium px-6 py-3 rounded-lg transition-all hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 border-0 w-full sm:w-auto">
                  Explore Creators <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/become-creator">
                <Button variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/20 hover:border-blue-400 w-full sm:w-auto hover:scale-105 transition-transform duration-300">
                  Launch as a Creator
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <div className="backdrop-blur-md bg-black/30 border border-white/10 p-6 md:p-8 rounded-2xl relative hover:shadow-xl hover:shadow-blue-500/10 hover:scale-[1.02] transition-all duration-300">
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-3 py-1 rounded-md">
                Trending
              </div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mr-4 overflow-hidden flex items-center justify-center text-white font-bold">AR</div>
                <div>
                  <h3 className="font-semibold text-white">Alex Rivera</h3>
                  <p className="text-sm text-gray-300">Music Producer</p>
                </div>
                <div className="ml-auto bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded">+24.5%</div>
              </div>
              <div className="h-32 bg-gray-800/50 backdrop-blur-md rounded-lg mb-6 overflow-hidden border border-white/5">
                <div className="h-full w-full bg-gradient-to-r from-gray-800/50 to-gray-800/30 flex items-center justify-center relative">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
                    <path 
                      d="M0,150 L0,40 C50,60 100,100 150,30 C200,0 250,20 300,50 C350,80 400,120 400,100 L400,150 Z" 
                      fill="url(#chartGradient)" 
                      strokeWidth="2"
                      stroke="rgba(59, 130, 246, 0.8)"
                    />
                    <defs>
                      <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
                        <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute top-3 left-3 text-xs text-blue-400">SOL</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-400">Current Price</p>
                  <p className="text-xl font-semibold text-white">0.0045 SOL</p>
                </div>
                <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 transition-all border-0">Buy Token</Button>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 backdrop-blur-md bg-black/30 border border-white/10 p-4 rounded-xl max-w-[180px] animate-fade-in hover:shadow-xl hover:scale-[1.05] transition-all duration-300" style={{ animationDelay: "0.8s" }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 overflow-hidden flex items-center justify-center text-white text-xs font-bold">EC</div>
                <div className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded">+12.3%</div>
              </div>
              <h4 className="text-sm font-medium text-white">Emma Chen</h4>
              <p className="text-xs text-gray-400">Digital Artist</p>
            </div>
            
            <div className="absolute -top-6 -right-6 backdrop-blur-md bg-black/30 border border-white/10 p-4 rounded-xl max-w-[180px] animate-fade-in hover:shadow-xl hover:scale-[1.05] transition-all duration-300" style={{ animationDelay: "1s" }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 overflow-hidden flex items-center justify-center text-white text-xs font-bold">JW</div>
                <div className="bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded">+18.7%</div>
              </div>
              <h4 className="text-sm font-medium text-white">James Wilson</h4>
              <p className="text-xs text-gray-400">Tech Creator</p>
            </div>
          </div>
        </div>
        
        <div className="mt-20 md:mt-32 text-center relative z-10">
          <p className="text-gray-400 mb-8">Trusted by creators and fans worldwide</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
            <div className="w-24 h-8 bg-gradient-to-r from-white/10 to-white/5 rounded hover:bg-white/20 transition-all"></div>
            <div className="w-24 h-8 bg-gradient-to-r from-white/10 to-white/5 rounded hover:bg-white/20 transition-all"></div>
            <div className="w-24 h-8 bg-gradient-to-r from-white/10 to-white/5 rounded hover:bg-white/20 transition-all"></div>
            <div className="w-24 h-8 bg-gradient-to-r from-white/10 to-white/5 rounded hover:bg-white/20 transition-all"></div>
            <div className="w-24 h-8 bg-gradient-to-r from-white/10 to-white/5 rounded hover:bg-white/20 transition-all"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
