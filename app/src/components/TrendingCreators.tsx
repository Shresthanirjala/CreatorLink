import React, { useState } from 'react';
import { ChevronRight, Flame, ThumbsUp, TrendingUp, Users, Award, Calendar } from "lucide-react";
import { Link } from 'react-router-dom';

const TrendingCreators = () => {
  // Mock creators data
  const mockCreators = [
    {
      id: 1,
      name: "Alex Morgan",
      initials: "AM",
      category: "Music Producer",
      price: "14.2",
      change: "+24.6%",
      positive: true
    },
    {
      id: 2,
      name: "Sarah Chen",
      initials: "SC",
      category: "Digital Artist",
      price: "8.7",
      change: "+12.3%",
      positive: true
    },
    {
      id: 3,
      name: "Michael Rivera",
      initials: "MR",
      category: "Content Creator",
      price: "5.3",
      change: "-8.1%",
      positive: false
    },
    {
      id: 4,
      name: "Jordan Taylor",
      initials: "JT",
      category: "Game Developer",
      price: "11.9",
      change: "+7.4%",
      positive: true
    }
  ];

  // Filter tabs data
  const filterTabs = [
    { id: 'trending', label: 'Trending', icon: <TrendingUp className="h-4 w-4" /> },
    { id: 'popular', label: 'Popular', icon: <ThumbsUp className="h-4 w-4" /> },
    { id: 'new', label: 'New Arrivals', icon: <Calendar className="h-4 w-4" /> },
    { id: 'featured', label: 'Featured', icon: <Award className="h-4 w-4" /> },
    { id: 'all', label: 'All Creators', icon: <Users className="h-4 w-4" /> }
  ];

  const [selectedTab, setSelectedTab] = useState('trending');

  return (
    <section className="py-16 bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-100">Creators</h2>
            <p className="text-gray-400 mt-1">Discover top performing creators on our platform</p>
          </div>
          <Link
            to="/explore"
            className="text-blue-400 hover:underline flex items-center"
          >
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

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
              className="bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors duration-300"
            >
              <div className="h-36 bg-gray-700 relative flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center text-gray-300 font-medium text-xl">
                  {creator.initials}
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center font-medium text-gray-300">
                      {creator.initials}
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium text-gray-100">
                        {creator.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {creator.category}
                      </p>
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
                      <p className="text-xs text-gray-400">
                        Token Price
                      </p>
                      <p className="font-medium text-gray-100">{creator.price} SOL</p>
                    </div>
                    <a href={`#creator-${creator.id}`}>
                      <button
                        className="px-3 py-1 text-sm text-gray-300 border border-gray-600 rounded hover:bg-gray-700 transition-colors"
                      >
                        View Profile
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingCreators;