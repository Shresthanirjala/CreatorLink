
import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const mockCreators = [
  {
    id: 1,
    name: "Alex Rivera",
    category: "Music Producer",
    image: "",
    price: "0.0045",
    change: "+24.5%",
    positive: true,
    holders: 235,
    description: "Electronic music producer creating ambient soundscapes and lo-fi beats."
  },
  {
    id: 2,
    name: "Emma Chen",
    category: "Digital Artist",
    image: "",
    price: "0.0098",
    change: "+12.3%",
    positive: true,
    holders: 189,
    description: "Creating digital art and NFTs inspired by cyberpunk and futuristic themes."
  },
  {
    id: 3,
    name: "James Wilson",
    category: "Tech Creator",
    image: "",
    price: "0.0076",
    change: "+18.7%",
    positive: true,
    holders: 423,
    description: "Developer and tech educator sharing insights on blockchain and web development."
  },
  {
    id: 4,
    name: "Maya Johnson",
    category: "Fitness Instructor",
    image: "",
    price: "0.0032",
    change: "-3.2%",
    positive: false,
    holders: 97,
    description: "Specializing in HIIT workouts and mindfulness techniques for busy professionals."
  },
  {
    id: 5,
    name: "David Park",
    category: "Game Developer",
    image: "",
    price: "0.0055",
    change: "+9.1%",
    positive: true,
    holders: 167,
    description: "Indie game developer creating pixel art adventures and open world experiences."
  },
  {
    id: 6,
    name: "Sophia Martinez",
    category: "Writer",
    image: "",
    price: "0.0022",
    change: "+5.4%",
    positive: true,
    holders: 78,
    description: "Science fiction author exploring the intersection of technology and humanity."
  },
  {
    id: 7,
    name: "Noah Taylor",
    category: "Photographer",
    image: "",
    price: "0.0018",
    change: "-1.7%",
    positive: false,
    holders: 56,
    description: "Travel photographer documenting remote landscapes and cultural stories."
  },
  {
    id: 8,
    name: "Olivia Brown",
    category: "Podcaster",
    image: "",
    price: "0.0043",
    change: "+15.2%",
    positive: true,
    holders: 145,
    description: "Host of 'Future Forward', a podcast exploring emerging tech and societal changes."
  }
];

const CreatorGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {mockCreators.map(creator => (
        <div key={creator.id} className="token-card">
          <div className="h-40 bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              [Creator Cover]
            </div>
            <div className="absolute top-4 right-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm text-xs px-2 py-1 rounded-full">
              {creator.category}
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-600 -mt-10 border-4 border-white dark:border-gray-800 shadow-md"></div>
                <div className="ml-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{creator.name}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{creator.holders} holders</p>
                </div>
              </div>
              <div className={`text-xs px-2 py-1 rounded ${creator.positive ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}>
                {creator.change}
              </div>
            </div>
            
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{creator.description}</p>
            
            <div className="mt-4 border-t border-gray-100 dark:border-gray-800 pt-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Token Price</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{creator.price} SOL</p>
                </div>
                <Link to={`/creator/${creator.id}`}>
                  <Button variant="outline" size="sm" className="gap-1 text-black">
                    View <ExternalLink className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CreatorGrid;
