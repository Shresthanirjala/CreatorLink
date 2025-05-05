
import React from "react";
import { Button } from "../ui/button";
import { Share2, Star, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface ProfileHeaderProps {
  creator: {
    id: number;
    name: string;
    category: string;
    bio: string;
    followers: number;
    holders: number;
  };
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ creator }) => {
  return (
    <div className="relative">
      <div className="h-64 bg-gradient-to-r from-creator-darkPurple to-[#352F5B] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-[10%] left-[20%] w-72 h-72 bg-creator-purple rounded-full filter blur-[100px]"></div>
          <div className="absolute bottom-[10%] right-[30%] w-64 h-64 bg-creator-blue rounded-full filter blur-[100px]"></div>
        </div>
      </div>
      
      <div className="container relative -mt-20 pb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 pt-24 relative">
          <div className="absolute -top-16 left-6 w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 border-4 border-white dark:border-gray-800 shadow-md"></div>
          
          <div className="ml-0 md:ml-36">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold">{creator.name}</h1>
                  <div className="bg-creator-purple/10 text-creator-purple text-xs px-2 py-1 rounded-full">Verified</div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{creator.category}</p>
              </div>
              
              <div className="flex gap-3 mt-4 md:mt-0">
                <Button variant="outline" size="sm" className="gap-2">
                  <Star className="h-4 w-4" /> Follow
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="h-4 w-4" /> Share
                </Button>
                <Button className="btn-gradient gap-2">
                  Buy Token <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              {creator.bio}
            </p>
            
            <div className="flex flex-wrap gap-6 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Followers:</span> <strong>{creator.followers.toLocaleString()}</strong>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Token Holders:</span> <strong>{creator.holders.toLocaleString()}</strong>
              </div>
              <Link to="#" className="text-creator-purple hover:underline">solana.com/wallet/abc123...def</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
