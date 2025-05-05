
import React from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CreatorCTA: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-[30%] w-72 h-72 bg-creator-purple rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-0 right-[20%] w-72 h-72 bg-creator-blue rounded-full filter blur-[100px]"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3 order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">Ready to launch your creator token?</h2>
            <p className="text-gray-300 mb-6 max-w-xl">
              Join thousands of creators who are building sustainable careers through direct community support. Launch your token and start building your decentralized fan economy today.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="glass-card p-6 shadow-sm">
                <div className="text-4xl font-bold text-creator-purple mb-2">5M+</div>
                <p className="text-gray-300">Invested in creators</p>
              </div>
              <div className="glass-card p-6 shadow-sm">
                <div className="text-4xl font-bold text-creator-blue mb-2">10K+</div>
                <p className="text-gray-300">Active creators</p>
              </div>
            </div>
            
            <Link to="/become-creator">
              <Button className="btn-gradient">
                Launch as a Creator <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="relative">              
              <div className="glass-card p-8 mt-6 bg-gradient-to-br from-creator-darkPurple to-[#352F5B]">
                <h3 className="text-2xl font-semibold text-white mb-6">Creator Benefits</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-green-500 mt-1 mr-3 flex items-center justify-center text-white text-xs">✓</div>
                    <span className="text-gray-200">Direct funding from your community</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-green-500 mt-1 mr-3 flex items-center justify-center text-white text-xs">✓</div>
                    <span className="text-gray-200">Retain creative independence</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-green-500 mt-1 mr-3 flex items-center justify-center text-white text-xs">✓</div>
                    <span className="text-gray-200">Build a more engaged community</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-green-500 mt-1 mr-3 flex items-center justify-center text-white text-xs">✓</div>
                    <span className="text-gray-200">Reward early supporters</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-green-500 mt-1 mr-3 flex items-center justify-center text-white text-xs">✓</div>
                    <span className="text-gray-200">Own your content on IPFS</span>
                  </li>
                </ul>
              </div>
              
              <div className="absolute -bottom-6 -right-6 glass-card p-4 max-w-[220px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-creator-purple to-creator-blue"></div>
                  <div>
                    <p className="text-sm font-medium text-white">Sarah Johnson</p>
                    <p className="text-xs text-gray-300">Digital Artist</p>
                  </div>
                </div>
                <p className="text-xs text-gray-200">"I've raised over 20K SOL from my community, allowing me to focus on my art full-time."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatorCTA;
