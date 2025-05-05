
import React from "react";
import { Wallet, Users, ChartBar, Upload } from "lucide-react";

const features = [
  {
    icon: <Wallet className="h-12 w-12 text-creator-purple" />,
    title: "Direct Investment",
    description: "Fans can buy creator tokens directly with cryptocurrency, creating true ownership and alignment."
  },
  {
    icon: <ChartBar className="h-12 w-12 text-creator-blue" />,
    title: "Growth Potential",
    description: "As creators gain popularity, their token value increases, rewarding early supporters."
  },
  {
    icon: <Users className="h-12 w-12 text-creator-pink" />,
    title: "Community Building",
    description: "Token holders become part of an exclusive community with special access and benefits."
  },
  {
    icon: <Upload className="h-12 w-12 text-green-500" />,
    title: "Decentralized Storage",
    description: "Creator profiles and content are stored on IPFS, ensuring censorship resistance and permanence."
  }
];

const FeatureSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-900 border-t border-gray-800">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-white">How CreatorLink Works</h2>
          <p className="text-gray-300">
            CreatorLink brings together creators and fans in a unique ecosystem where everyone can win. Our platform enables direct investment in creator success through tokenization.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card p-6 hover:shadow-md transition-all"
            >
              <div className="mb-5">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
