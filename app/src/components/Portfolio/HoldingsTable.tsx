import React from "react";
import { TrendingUp, TrendingDown, ExternalLink } from "lucide-react";

const mockHoldings = [
  {
    id: 1,
    creator: "Alex Rivera",
    category: "Music Producer",
    amount: 250,
    value: 1.125,
    price: 0.0045,
    change: "+24.5%",
    positive: true,
    avatar: "A"
  },
  {
    id: 2,
    creator: "Emma Chen",
    category: "Digital Artist",
    amount: 400,
    value: 3.92,
    price: 0.0098,
    change: "+12.3%",
    positive: true,
    avatar: "E"
  },
  {
    id: 3,
    creator: "James Wilson",
    category: "Tech Creator",
    amount: 7600,
    value: 57.76,
    price: 0.0076,
    change: "+18.7%",
    positive: true,
    avatar: "J"
  },
  {
    id: 4,
    creator: "Maya Johnson",
    category: "Fitness Instructor",
    amount: 1200,
    value: 3.84,
    price: 0.0032,
    change: "-3.2%",
    positive: false,
    avatar: "M"
  },
  {
    id: 5,
    creator: "David Park",
    category: "Game Developer",
    amount: 900,
    value: 4.95,
    price: 0.0055,
    change: "+9.1%",
    positive: true,
    avatar: "D"
  }
];

const HoldingsTable = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden mb-8">
      {/* Header */}
      <div className="p-6 pb-3 flex justify-between items-center border-b border-gray-100 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Your Holdings</h3>
        <button className="px-4 py-2 text-sm bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium">
          View All
        </button>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th className="text-left py-4 px-6 font-medium text-gray-500 dark:text-gray-300">Creator</th>
              <th className="hidden md:table-cell text-left py-4 px-6 font-medium text-gray-500 dark:text-gray-300">Category</th>
              <th className="text-right py-4 px-6 font-medium text-gray-500 dark:text-gray-300">Amount</th>
              <th className="text-right py-4 px-6 font-medium text-gray-500 dark:text-gray-300">Value</th>
              <th className="text-right hidden md:table-cell py-4 px-6 font-medium text-gray-500 dark:text-gray-300">Price</th>
              <th className="text-right py-4 px-6 font-medium text-gray-500 dark:text-gray-300">24h</th>
              <th className="py-4 px-6"></th>
            </tr>
          </thead>
          <tbody>
            {mockHoldings.map(holding => (
              <tr 
                key={holding.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-0"
              >
                <td className="py-4 px-6 font-medium">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                      holding.id % 2 === 0 ? 'bg-indigo-500' : 'bg-emerald-500'
                    }`}>
                      {holding.avatar}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800 dark:text-gray-100">{holding.creator}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 md:hidden">{holding.category}</div>
                    </div>
                  </div>
                </td>
                <td className="hidden md:table-cell py-4 px-6 text-gray-600 dark:text-gray-400">
                  {holding.category}
                </td>
                <td className="py-4 px-6 text-right font-medium text-gray-700 dark:text-gray-300">
                  {holding.amount.toLocaleString()}
                </td>
                <td className="py-4 px-6 text-right font-bold text-gray-900 dark:text-white">
                  {holding.value.toFixed(2)} <span className="text-gray-500 dark:text-gray-400 font-normal">SOL</span>
                </td>
                <td className="py-4 px-6 text-right hidden md:table-cell text-gray-700 dark:text-gray-300">
                  {holding.price} SOL
                </td>
                <td className="py-4 px-6">
                  <div className={`flex items-center justify-end gap-1 font-medium ${
                    holding.positive ? 'text-emerald-500' : 'text-red-500'
                  }`}>
                    {holding.positive ? 
                      <TrendingUp className="h-4 w-4" /> : 
                      <TrendingDown className="h-4 w-4" />
                    }
                    {holding.change}
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  <a href={`/creator/${holding.id}`} className="inline-block">
                    <button className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-2 h-8 w-8 flex items-center justify-center">
                      <ExternalLink className="h-4 w-4 text-gray-500" />
                    </button>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HoldingsTable;