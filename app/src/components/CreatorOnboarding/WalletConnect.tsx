
import React from "react";
import { Button } from "../ui/button";
import { Wallet } from "lucide-react";

const WalletConnect: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 mb-8">
        <h2 className="text-xl font-semibold mb-6 text-center">Connect Your Wallet</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
          Connect your Solana wallet to continue. This will be used to receive payments and manage your creator token.
        </p>
        
        <Button className="w-full btn-gradient mb-4 h-12 gap-2" onClick={onNext}>
          <Wallet className="h-5 w-5" /> Connect Wallet
        </Button>
        
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have a wallet?{" "}
          <a href="#" className="text-creator-purple hover:underline">
            Create one
          </a>
        </div>
      </div>
      
      <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
        <p className="mb-2">Supported wallets:</p>
        <div className="flex justify-center gap-4 items-center">
          <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default WalletConnect;
