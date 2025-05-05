
import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const mockCreators = [
  {
    id: 1,
    name: "Alex Rivera",
    category: "Music Producer",
    image: "",
    price: "0.0045",
    change: "+24.5%",
    positive: true
  },
  {
    id: 2,
    name: "Emma Chen",
    category: "Digital Artist",
    image: "",
    price: "0.0098",
    change: "+12.3%",
    positive: true
  },
  {
    id: 3,
    name: "James Wilson",
    category: "Tech Creator",
    image: "",
    price: "0.0076",
    change: "+18.7%",
    positive: true
  },
  {
    id: 4,
    name: "Maya Johnson",
    category: "Fitness Instructor",
    image: "",
    price: "0.0032",
    change: "-3.2%",
    positive: false
  }
];

const TrendingCreators: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Trending Creators</h2>
          <Link
            to="/explore"
            className="text-creator-purple hover:underline flex items-center"
          >
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockCreators.map((creator) => (
            <div key={creator.id} className="token-card">
              <div className="h-40 bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  [Creator Cover]
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-600 -mt-10 border-4 border-white dark:border-gray-800 shadow-md">
                      <img
                        src="./logo.jpeg "
                        className="w-12 h-10 rounded-full"
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-black">
                        {creator.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {creator.category}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`text-xs px-2 py-1 rounded ${
                      creator.positive
                        ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {creator.change}
                  </div>
                </div>

                <div className="mt-4 border-t border-gray-100 dark:border-gray-800 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Token Price
                      </p>
                      <p className="font-semibold text-black">{creator.price} SOL</p>
                    </div>
                    <Link to={`/creator/${creator.id}`}>
                      <Button variant="outline" className="text-black" size="sm">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
};

export default TrendingCreators;
