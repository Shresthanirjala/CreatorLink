
import React from "react";
import { Button } from "../ui/button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { name: "Jan", price: 0.0015 },
  { name: "Feb", price: 0.0018 },
  { name: "Mar", price: 0.0025 },
  { name: "Apr", price: 0.0022 },
  { name: "May", price: 0.0035 },
  { name: "Jun", price: 0.0040 },
  { name: "Jul", price: 0.0045 },
];

const TokenChart: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Token Performance</h3>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold">0.0045 SOL</span>
            <span className="ml-2 text-green-500 text-sm">+24.5% (30d)</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">1D</Button>
          <Button variant="ghost" size="sm">1W</Button>
          <Button variant="secondary" size="sm">1M</Button>
          <Button variant="ghost" size="sm">All</Button>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#9b87f5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis hide />
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#9b87f5"
              fillOpacity={1}
              fill="url(#colorPrice)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="border border-gray-100 dark:border-gray-700 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Market Cap</p>
              <p className="font-semibold">52,438 SOL</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Supply</p>
              <p className="font-semibold">10,000,000</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-100 dark:border-gray-700 rounded-lg p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Buy/Sell</p>
            <p className="text-sm text-green-500">Low 2.1% spread</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Sell</Button>
            <Button className="bg-creator-purple hover:bg-creator-purple/90" size="sm">Buy</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenChart;
