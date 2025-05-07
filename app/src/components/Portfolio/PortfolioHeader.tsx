import React from "react";
import { Button } from "../ui/button";
import { Wallet, Plus, ArrowUpRight, ArrowDownRight, ChevronRight, TrendingUp, ExternalLink } from "lucide-react";

const PortfolioHeader = () => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="flex flex-wrap gap-8 items-baseline">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Total Value
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-bold text-gray-900 dark:text-white">
                  245.78 SOL
                </p>
                <div className="flex items-center text-green-500 font-medium">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>12.4% (7d)</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Creator Tokens
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                12
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:items-end justify-center gap-4">
          <div className="flex gap-3 w-full md:w-auto">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white shadow-md hover:shadow-lg transition-all duration-200 gap-2 flex-1 md:flex-auto py-6">
              <Plus className="h-4 w-4" /> Add Funds
            </Button>
            <Button
              variant="outline"
              className="border-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 gap-2 flex-1 md:flex-auto py-6"
            >
              <Wallet className="h-4 w-4 text-black" />
              <p className="text-black">Withdraw</p>
            </Button>
          </div>

          <div className="text-sm flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2">
            <Wallet className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-600 dark:text-gray-300 font-medium">
              abc123...def
            </span>
            <ExternalLink className="h-3 w-3 ml-2 text-gray-500 dark:text-gray-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-5 border-l-4 border-green-500">
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Best Performer
            </p>
            <div className="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 text-xs px-3 py-1 rounded-full font-medium">
              +24.5%
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 mr-4 flex items-center justify-center text-white font-bold">
              AR
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Alex Rivera
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                0.0045 SOL
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-5 border-l-4 border-blue-500">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
            Recent Transaction
          </p>
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-500 mr-4">
              <ArrowDownRight className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Bought Emma Chen
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                0.0098 SOL × 50
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-5 border-l-4 border-purple-500">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
            Top Holding
          </p>
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 mr-4 flex items-center justify-center text-white font-bold">
              JW
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                James Wilson
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                23.4% of portfolio
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-5 border-l-4 border-indigo-500">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
            Referral Rewards
          </p>
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-500 mr-4">
              <Plus className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                1.25 SOL earned
              </p>
              <div className="flex items-center text-sm text-indigo-500 font-medium mt-1 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Invite friends
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default PortfolioHeader;