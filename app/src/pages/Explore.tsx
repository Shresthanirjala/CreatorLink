import { useState } from "react";
import { ChevronDown, Stars, Filter, Search, TrendingUp, Zap, Clock, User } from "lucide-react";
import Navbar from "@/components/Navbar";

// Mock data for creators
const mockCreators = [
  {
    id: 1,
    name: "Jessica Chen",
    initials: "JC",
    category: "Digital Artist",
    price: "12.45",
    change: "+24.5%",
    positive: true,
    followers: "12.5K",
    popularity: 85
  },
  {
    id: 2,
    name: "Mark Wilson",
    initials: "MW",
    category: "Music Producer",
    price: "8.20",
    change: "-3.1%",
    positive: false,
    followers: "8.2K",
    popularity: 72
  },
  {
    id: 3,
    name: "Sophia Rodriguez",
    initials: "SR",
    category: "Content Creator",
    price: "22.75",
    change: "+42.3%",
    positive: true,
    followers: "56.8K",
    popularity: 94
  },
  {
    id: 4,
    name: "Aiden Park",
    initials: "AP",
    category: "Photographer",
    price: "5.10",
    change: "+12.8%",
    positive: true,
    followers: "6.3K",
    popularity: 68
  },
  {
    id: 5,
    name: "Emma Thompson",
    initials: "ET",
    category: "Fashion Designer",
    price: "18.90",
    change: "-5.4%",
    positive: false,
    followers: "24.1K",
    popularity: 81
  },
  {
    id: 6,
    name: "Tyler Johnson",
    initials: "TJ",
    category: "Podcaster",
    price: "9.35",
    change: "+18.7%",
    positive: true,
    followers: "15.9K",
    popularity: 77
  },
  {
    id: 7,
    name: "Maya Patel",
    initials: "MP",
    category: "3D Animator",
    price: "31.20",
    change: "+67.2%",
    positive: true,
    followers: "42.7K",
    popularity: 92
  },
  {
    id: 8,
    name: "Lucas Croft",
    initials: "LC",
    category: "Game Developer",
    price: "14.75",
    change: "-1.8%",
    positive: false,
    followers: "19.3K",
    popularity: 79
  }
];

// Button component to avoid shadcn/ui dependency
const Button = ({ children, variant = "default", size = "default", className = "", onClick }) => {
  const variants = {
    default: "bg-blue-600 hover:bg-blue-700 text-white",
    outline: "bg-transparent border hover:bg-opacity-10 hover:bg-white",
    ghost: "bg-transparent hover:bg-white hover:bg-opacity-10",
    secondary: "bg-gray-800 hover:bg-gray-700 text-white"
  };
  
  const sizes = {
    default: "py-2 px-4",
    sm: "py-1 px-3 text-sm",
    lg: "py-3 px-6 text-lg"
  };
  
  const baseClasses = "font-medium rounded-md transition-colors duration-200 flex items-center gap-2";
  
  return (
    <button 
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

// Filter component
const CreatorFilter = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex-grow max-w-md bg-gray-800 rounded-lg overflow-hidden flex items-center px-3">
        <Search className="h-5 w-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search creators..."
          className="w-full bg-transparent border-none outline-none p-3 text-gray-200 placeholder-gray-500"
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={() => {}} variant="secondary" className="gap-2">
          <Filter className="h-4 w-4" /> Filters
        </Button>

        <select className="bg-gray-800 text-gray-300 border border-gray-700 rounded-md py-2 px-3 outline-none appearance-none cursor-pointer">
          <option>All Categories</option>
          <option>Digital Art</option>
          <option>Music</option>
          <option>Content Creation</option>
          <option>Photography</option>
        </select>

        <select className="bg-gray-800 text-gray-300 border border-gray-700 rounded-md py-2 px-3 outline-none appearance-none cursor-pointer">
          <option>Price: Any</option>
          <option>Under 10 SOL</option>
          <option>10-20 SOL</option>
          <option>Over 20 SOL</option>
        </select>
      </div>
    </div>
  )
};

// Creator Grid component
const CreatorGrid = () => {
  const [selectedTab, setSelectedTab] = useState("trending");
  
  const filterTabs = [
    { id: "trending", label: "Trending", icon: <TrendingUp className="h-4 w-4" /> },
    { id: "popular", label: "Most Popular", icon: <Zap className="h-4 w-4" /> },
    { id: "newest", label: "Newest", icon: <Clock className="h-4 w-4" /> },
    { id: "following", label: "Following", icon: <User className="h-4 w-4" /> }
  ];
  
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex gap-1 overflow-x-auto pb-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedTab === tab.id
                  ? "bg-blue-500/20 text-blue-400"
                  : "text-gray-400 hover:text-gray-300 hover:bg-gray-800"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <select className="bg-gray-800 text-gray-300 border border-gray-700 rounded-md py-1.5 px-3 text-sm outline-none appearance-none cursor-pointer">
          <option>Sort: Default</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Popularity</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockCreators.map((creator) => (
          <div
            key={creator.id}
            className="bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10"
          >
            <div className="h-40 bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-t-lg relative flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600/30 to-purple-600/30 backdrop-blur-md flex items-center justify-center text-gray-200 font-bold text-2xl border-2 border-gray-600/50 z-10">
                {creator.initials}
              </div>

              <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-gray-900/70 backdrop-blur-sm rounded text-xs text-gray-300 flex items-center gap-1">
                <User className="h-3 w-3" /> {creator.followers}
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600/30 to-purple-600/30 flex items-center justify-center font-medium text-gray-200 border border-gray-700/50">
                    {creator.initials}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-100">
                      {creator.name}
                    </h3>
                    <p className="text-sm text-gray-400">{creator.category}</p>
                  </div>
                </div>
                <div
                  className={`text-xs px-2 py-1 rounded ${
                    creator.positive
                      ? "bg-green-900/20 text-green-400"
                      : "bg-red-900/20 text-red-400"
                  }`}
                >
                  {creator.change}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-700">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-400">Token Price</p>
                    <p className="font-medium text-gray-100">
                      {creator.price} SOL
                    </p>
                  </div>
                  <Button
                    onClick={() => {}}
                    variant="outline"
                    size="sm"
                    className="text-blue-400 border-blue-500/30 hover:bg-blue-500/10"
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};


const Explore = () => {
  const [showMore, setShowMore] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-950 to-black text-white relative">
      <Navbar/>
     
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 via-transparent to-transparent"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-5 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-700 rounded-full mix-blend-screen filter blur-3xl opacity-5"></div>
      </div>
      

      
      <main className="flex-grow pt-28 pb-16 z-10 relative">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-2">
              <Stars className="h-5 w-5 text-blue-400" />
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                Explore Creators
              </h1>
            </div>
            <p className="text-gray-300 max-w-2xl">
              Discover and invest in the next generation of creators across all categories.
              Find rising talent and be part of their journey to success.
            </p>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-800/80 shadow-lg">
            <CreatorFilter />
          </div>
          
          <div>
            <CreatorGrid />
          </div>
          
          <div className="mt-12 text-center">
            <Button
              onClick={() => setShowMore(!showMore)}
              variant="outline"
              className="gap-2 border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:text-white hover:border-blue-400 transition-all duration-300 px-6 py-2 rounded-full"
            >
              Load More <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
      
   
    </div>
  );
};

export default Explore;