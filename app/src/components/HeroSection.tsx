import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowRight, Star, TrendingUp, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-indigo-950 to-black pt-28 pb-20 md:pt-36 md:pb-32">
      
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className={`absolute rounded-full opacity-20 animate-float-slow`}
            style={{
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              background: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, 0.8)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
        <div className="absolute top-0 left-[5%] w-96 h-96 bg-blue-600 rounded-full filter blur-[150px] opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-[5%] w-96 h-96 bg-purple-600 rounded-full filter blur-[150px] opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-pink-600 rounded-full filter blur-[120px] opacity-10 animate-float"></div>
      </div>
      
    
      <div className="absolute inset-0 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0xNGg0djFoLTR2LTF6bTAtN2g0djFoLTR2LTF6TTEwIDI3aDR2MWgtNHYtMXptMC03aDR2MWgtNHYtMXptMC03aDR2MWgtNHYtMXoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>
      
      
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      
      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className={`lg:col-span-5 text-center lg:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center mb-6 px-4 py-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full border border-blue-500/20 backdrop-blur-sm">
              <div className="flex-shrink-0 w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 mr-2"></div>
              <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">Revolutionary Creator Economy</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
              Invest in <span className="relative">
                creators
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5.5C32 2 71 1 152.5 6.5C238 12 280 10.5 299 5.5" stroke="url(#paint0_linear)" strokeWidth="3" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="paint0_linear" x1="1" y1="6" x2="299" y2="6" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#3B82F6" stopOpacity="0.3"/>
                      <stop offset="0.5" stopColor="#8B5CF6" stopOpacity="1"/>
                      <stop offset="1" stopColor="#3B82F6" stopOpacity="0.3"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span><br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 text-transparent bg-clip-text">Grow together.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-lg mx-auto lg:mx-0 font-light">
              CreatorLink is the first decentralized platform where fans can invest directly in their favorite creators and share in their success journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start mb-6">
              <Link to="/explore" className="group">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium px-7 py-6 rounded-xl transition-all hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105 border-0 w-full sm:w-auto group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500">
                  <span className="flex items-center">
                    Explore Creators 
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
              
              <Link to="/become-creator" className="group">
                <Button variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/20 hover:border-blue-400 w-full sm:w-auto px-7 py-6 rounded-xl group-hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                  <span className="flex items-center">
                    Launch as a Creator
                    <div className="w-1 h-1 rounded-full bg-blue-400 ml-3 group-hover:w-4 transition-all duration-300"></div>
                  </span>
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-400 text-sm mt-8">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-gray-900 bg-gradient-to-br from-gray-800 to-gray-700"></div>
                ))}
              </div>
              <div className="ml-2 text-sm">
                <span className="text-white font-medium">2,400+</span> creators already onboard
              </div>
            </div>
          </div>
          
          <div className={`lg:col-span-7 relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative z-10 h-full">
              
              <div className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 via-gray-900/90 to-black/80 border border-white/10 p-6 md:p-8 rounded-2xl relative hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-[1.02] transition-all duration-500 group">
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-3 py-1 rounded-md flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>Trending Creator</span>
                </div>
                
                <div className="flex items-center mb-8">
                  <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mr-4 overflow-hidden">
                    <div className="w-full h-full rounded-full bg-blue-800 flex items-center justify-center text-white font-bold overflow-hidden">
                      <span className="text-lg">AR</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-semibold text-white text-lg">Alex Rivera</h3>
                      <div className="ml-2 flex items-center text-yellow-400">
                        <Star className="fill-yellow-400 h-3 w-3" />
                        <Star className="fill-yellow-400 h-3 w-3" />
                        <Star className="fill-yellow-400 h-3 w-3" />
                        <Star className="fill-yellow-400 h-3 w-3" />
                        <Star className="fill-yellow-400 h-3 w-3" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-300">Grammy-Nominated Music Producer</p>
                  </div>
                  <div className="ml-auto bg-green-500/20 text-green-400 text-xs px-3 py-1.5 rounded-lg flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>+24.5%</span>
                  </div>
                </div>
                
                <div className="h-48 bg-gradient-to-b from-gray-800/40 to-gray-900/40 backdrop-blur-md rounded-xl mb-6 overflow-hidden border border-white/5 p-4 hover:border-blue-500/30 transition-all group-hover:shadow-inner">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-gray-400 text-sm">
                      <Shield className="h-4 w-4 mr-1 text-blue-400" />
                      <span>Token Performance (SOL)</span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-2 py-1 rounded-md bg-gray-700/50 text-xs text-gray-300">1D</button>
                      <button className="px-2 py-1 rounded-md bg-blue-500/20 text-xs text-blue-400">1W</button>
                      <button className="px-2 py-1 rounded-md bg-gray-700/50 text-xs text-gray-300">1M</button>
                      <button className="px-2 py-1 rounded-md bg-gray-700/50 text-xs text-gray-300">1Y</button>
                    </div>
                  </div>
                  
                  <div className="h-full w-full flex items-end justify-center relative">
                    <svg className="absolute inset-0 w-full h-32" viewBox="0 0 400 100" preserveAspectRatio="none">
                      <path 
                        d="M0,80 L0,70 C20,68 40,60 60,55 C80,50 100,45 120,50 C140,55 160,70 180,65 C200,60 220,40 240,30 C260,20 280,25 300,35 C320,45 340,60 360,55 C380,50 400,40 400,35 L400,80 Z" 
                        fill="url(#chartGradient)" 
                        strokeWidth="2"
                        stroke="rgba(59, 130, 246, 0.8)"
                      />
                      <path 
                        d="M0,70 C20,68 40,60 60,55 C80,50 100,45 120,50 C140,55 160,70 180,65 C200,60 220,40 240,30 C260,20 280,25 300,35 C320,45 340,60 360,55 C380,50 400,40 400,35" 
                        fill="none"
                        strokeWidth="3"
                        stroke="url(#lineGradient)"
                      />
                      <defs>
                        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
                          <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                        </linearGradient>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="rgba(59, 130, 246, 1)" />
                          <stop offset="100%" stopColor="rgba(139, 92, 246, 1)" />
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    
                    {[35, 55, 65, 30, 35].map((pos, i) => (
                      <div 
                        key={i} 
                        className="absolute h-2 w-2 bg-white rounded-full shadow-lg shadow-blue-500/30"
                        style={{ 
                          bottom: `${pos}%`, 
                          left: `${20 + i * 20}%`,
                          transform: 'translate(-50%, 50%)'
                        }}
                      />
                    ))}
                    
                  
                    <div className="absolute h-4 w-4 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50 ring-4 ring-blue-500/20" style={{ bottom: '30%', left: '60%', transform: 'translate(-50%, 50%)' }}>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-900/90 text-blue-100 px-2 py-1 rounded text-xs whitespace-nowrap">
                        0.0045 SOL
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Current Token Price</p>
                    <p className="text-2xl font-semibold text-white flex items-center">
                      0.0045 SOL
                      <span className="ml-2 text-green-400 text-sm font-normal">+24.5% this week</span>
                    </p>
                  </div>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 transition-all border-0 whitespace-nowrap">
                    Buy Creator Token
                  </Button>
                </div>
              </div>
              
        
              <div className="absolute -bottom-8 -left-8 backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/80 border border-white/10 p-4 rounded-xl max-w-[200px] transform hover:scale-110 transition-all duration-300 shadow-xl shadow-black/30 hover:shadow-blue-900/20" style={{ transform: `translateY(${scrollY * 0.05}px)` }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-r from-blue-500 to-purple-500 overflow-hidden">
                    <div className="w-full h-full rounded-full bg-blue-800 flex items-center justify-center text-white text-xs font-bold">EC</div>
                  </div>
                  <div className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-md flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>+12.3%</span>
                  </div>
                </div>
                <h4 className="text-sm font-medium text-white">Emma Chen</h4>
                <p className="text-xs text-gray-400">Digital Artist & Designer</p>
                <div className="mt-2 pt-2 border-t border-white/5">
                  <p className="text-xs text-gray-500">Token Price</p>
                  <p className="text-sm font-medium text-white">0.0028 SOL</p>
                </div>
              </div>
              
              <div className="absolute -top-8 -right-8 backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/80 border border-white/10 p-4 rounded-xl max-w-[200px] transform hover:scale-110 transition-all duration-300 shadow-xl shadow-black/30 hover:shadow-purple-900/20" style={{ transform: `translateY(${scrollY * -0.03}px)` }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-r from-blue-500 to-purple-500 overflow-hidden">
                    <div className="w-full h-full rounded-full bg-blue-800 flex items-center justify-center text-white text-xs font-bold">JW</div>
                  </div>
                  <div className="bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded-md flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>+18.7%</span>
                  </div>
                </div>
                <h4 className="text-sm font-medium text-white">James Wilson</h4>
                <p className="text-xs text-gray-400">Tech Creator & Developer</p>
                <div className="mt-2 pt-2 border-t border-white/5">
                  <p className="text-xs text-gray-500">Token Price</p>
                  <p className="text-sm font-medium text-white">0.0036 SOL</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={`mt-24 md:mt-32 text-center relative z-10 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-gray-400 mb-8 font-light">Trusted by leading creators and fans worldwide</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[1, 2, 3, 4, 5].map((i) => (
              <div 
                key={i}
                className="w-28 h-10 relative group cursor-pointer" 
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 blur-lg"></div>
                <div className="relative h-full w-full bg-gradient-to-r from-white/10 to-white/5 rounded-lg flex items-center justify-center group-hover:from-white/20 group-hover:to-white/10 transition-all duration-300">
                  <div className="w-5 h-5 rounded-full bg-white/20 group-hover:bg-white/40 transition-all duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
    </div>
  );
};

export default HeroSection;