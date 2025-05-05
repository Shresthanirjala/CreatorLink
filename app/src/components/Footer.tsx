
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/80 backdrop-blur-md border-t border-white/10 pt-16 pb-8 text-gray-300">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">C</div>
              <span className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">CreatorLink</span>
            </Link>
            <p className="text-gray-400">
              The decentralized platform connecting creators with their community through tokenized support.
            </p>
            <div className="mt-6 flex gap-3">
              <a 
                href="#" 
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:border-blue-500/50 border border-white/10 transition-all"
              >
                <span className="text-sm">X</span>
              </a>
              <a 
                href="#" 
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:border-blue-500/50 border border-white/10 transition-all"
              >
                <span className="text-sm">D</span>
              </a>
              <a 
                href="#" 
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:border-blue-500/50 border border-white/10 transition-all"
              >
                <span className="text-sm">T</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><Link to="/explore" className="text-gray-400 hover:text-blue-400 transition-colors">Explore Creators</Link></li>
              <li><Link to="/how-it-works" className="text-gray-400 hover:text-blue-400 transition-colors">How It Works</Link></li>
              <li><Link to="/become-creator" className="text-gray-400 hover:text-blue-400 transition-colors">Become a Creator</Link></li>
              <li><Link to="/tokenomics" className="text-gray-400 hover:text-blue-400 transition-colors">Tokenomics</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-gray-400 hover:text-blue-400 transition-colors">Blog</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-blue-400 transition-colors">FAQ</Link></li>
              <li><Link to="/support" className="text-gray-400 hover:text-blue-400 transition-colors">Support</Link></li>
              <li><Link to="/documentation" className="text-gray-400 hover:text-blue-400 transition-colors">Documentation</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="text-gray-400 hover:text-blue-400 transition-colors">Cookie Policy</Link></li>
              <li><Link to="/compliance" className="text-gray-400 hover:text-blue-400 transition-colors">Compliance</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} CreatorLink. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <div className="px-4 py-2 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full border border-white/5 inline-flex items-center">
              <span className="text-xs text-blue-400 mr-2">Powered by</span>
              <span className="text-xs bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text font-medium">Solana</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
