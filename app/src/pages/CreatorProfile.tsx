
import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileHeader from "@/components/CreatorProfile/ProfileHeader";
import TokenChart from "@/components/CreatorProfile/TokenChart";
import ContentFeed from "@/components/CreatorProfile/ContentFeed";

const mockCreator = {
  id: 1,
  name: "Alex Rivera",
  category: "Music Producer",
  bio: "Electronic music producer creating ambient soundscapes and lo-fi beats. Based in Los Angeles, I've been producing music for over 5 years and have collaborated with artists worldwide.",
  followers: 12500,
  holders: 235
};

const CreatorProfile = () => {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, you would fetch creator data based on id
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <ProfileHeader creator={mockCreator} />
        
        <div className="container py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 order-2 lg:order-1">
              <TokenChart />
            </div>
            <div className="lg:col-span-2 order-1 lg:order-2">
              <ContentFeed />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreatorProfile;
