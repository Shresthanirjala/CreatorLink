
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Wallet, Search, Bell, User, Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`w-full py-4 fixed top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-black/80 backdrop-blur-md border-b border-white/10 shadow-lg" 
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">C</div>
          <span className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">CreatorLink</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/explore" className="text-gray-300 hover:text-blue-400 transition-colors">
            Explore
          </Link>
          <Link to="/how-it-works" className="text-gray-300 hover:text-blue-400 transition-colors">
            How It Works
          </Link>
          <Link to="/blog" className="text-gray-300 hover:text-blue-400 transition-colors">
            Blog
          </Link>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full text-gray-300 hover:bg-white/5">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full text-gray-300 hover:bg-white/5">
            <Bell className="h-5 w-5" />
          </Button>
          <Link to="/portfolio">
            <Button variant="ghost" size="icon" className="rounded-full text-gray-300 hover:bg-white/5">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Button className="hidden md:flex bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:scale-105">
            <Wallet className="h-4 w-4 mr-2" /> Connect
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-gray-300 hover:bg-white/5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-md border-b border-white/10 py-4 animate-fade-in">
          <div className="container flex flex-col gap-4">
            <Link 
              to="/explore" 
              className="text-gray-300 hover:text-blue-400 py-2 px-4 hover:bg-white/5 rounded-lg transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore
            </Link>
            <Link 
              to="/how-it-works" 
              className="text-gray-300 hover:text-blue-400 py-2 px-4 hover:bg-white/5 rounded-lg transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link 
              to="/blog" 
              className="text-gray-300 hover:text-blue-400 py-2 px-4 hover:bg-white/5 rounded-lg transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 mt-2">
              <Wallet className="h-4 w-4 mr-2" /> Connect Wallet
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
