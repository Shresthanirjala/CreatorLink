
import React from "react";
import { Button } from "../ui/button";
import { Wallet, Plus, ArrowUpRight, ArrowDownRight } from "lucide-react";

const PortfolioHeader: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-2">Your Portfolio</h2>
          <div className="flex flex-wrap gap-6 items-baseline">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Value</p>
              <p className="text-3xl font-bold">245.78 SOL</p>
              <p className="text-sm text-green-500">+12.4% (7d)</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Creator Tokens</p>
              <p className="text-xl font-semibold">12</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:items-end justify-center gap-3">
          <div className="flex gap-3">
            <Button className="btn-gradient gap-2 flex-1 md:flex-auto">
              <Plus className="h-4 w-4" /> Add Funds
            </Button>
            <Button variant="outline" className="gap-2 flex-1 md:flex-auto">
              <Wallet className="h-4 w-4" /> Withdraw
            </Button>
          </div>
          
          <div className="text-sm">
            <span className="text-gray-600 dark:text-gray-400">Wallet:</span> abc123...def
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <div className="border border-gray-100 dark:border-gray-700 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Best Performer</p>
            <div className="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 text-xs px-2 py-1 rounded-full">+24.5%</div>
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 mr-3"></div>
            <div>
              <p className="font-medium">Alex Rivera</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">0.0045 SOL</p>
            </div>
          </div>
        </div>
        
        <div className="border border-gray-100 dark:border-gray-700 rounded-lg p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Recent Transaction</p>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-500 mr-3">
              <ArrowDownRight className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">Bought Emma Chen</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">0.0098 SOL x 50</p>
            </div>
          </div>
        </div>
        
        <div className="border border-gray-100 dark:border-gray-700 rounded-lg p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Top Holding</p>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 mr-3"></div>
            <div>
              <p className="font-medium">James Wilson</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">23.4% of portfolio</p>
            </div>
          </div>
        </div>
        
        <div className="border border-gray-100 dark:border-gray-700 rounded-lg p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Referral Rewards</p>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-creator-purple/20 flex items-center justify-center text-creator-purple mr-3">
              <Plus className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">1.25 SOL earned</p>
              <p className="text-sm text-creator-purple">Invite friends →</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioHeader;
