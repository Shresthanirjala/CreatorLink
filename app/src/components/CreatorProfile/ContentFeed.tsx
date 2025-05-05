
import React from "react";
import { Button } from "../ui/button";
import { MessageSquare, Heart, Share2, Play } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const posts = [
  {
    id: 1,
    type: "video",
    title: "Behind the scenes of my latest project",
    content: "In this video, I show you how I created the sound design for the new game...",
    likes: 187,
    comments: 32,
    time: "2 days ago",
    preview: true
  },
  {
    id: 2,
    type: "update",
    title: "New album coming next month!",
    content: "I'm excited to announce that my new album will be released on June 15th. Token holders will get early access and exclusive bonus tracks!",
    likes: 243,
    comments: 57,
    time: "5 days ago",
    preview: false
  },
  {
    id: 3,
    type: "image",
    title: "Sneak peek of upcoming artwork",
    content: "Here's a preview of what I've been working on for the past few weeks...",
    likes: 118,
    comments: 24,
    time: "1 week ago",
    preview: false
  }
];

const ContentFeed: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="updates">Updates</TabsTrigger>
          <TabsTrigger value="holders">Holders</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>
        <TabsContent value="content" className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="border border-gray-100 dark:border-gray-700 rounded-lg p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-lg">{post.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{post.time}</p>
                </div>
                {post.preview && (
                  <div className="bg-creator-purple/10 text-creator-purple text-xs px-2 py-1 rounded-full">
                    Holder Preview
                  </div>
                )}
              </div>
              
              {post.type === 'video' && (
                <div className="relative h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button variant="outline" size="icon" className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white">
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
              )}
              
              {post.type === 'image' && (
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    [Image Preview]
                  </div>
                </div>
              )}
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">{post.content}</p>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <button className="flex items-center gap-1 hover:text-creator-purple">
                  <Heart className="h-4 w-4" /> {post.likes}
                </button>
                <button className="flex items-center gap-1 hover:text-creator-purple">
                  <MessageSquare className="h-4 w-4" /> {post.comments}
                </button>
                <button className="flex items-center gap-1 ml-auto hover:text-creator-purple">
                  <Share2 className="h-4 w-4" /> Share
                </button>
              </div>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="updates">
          <div className="text-center py-6 text-gray-500">Content for Updates tab will appear here</div>
        </TabsContent>
        <TabsContent value="holders">
          <div className="text-center py-6 text-gray-500">Content for Holders tab will appear here</div>
        </TabsContent>
        <TabsContent value="about">
          <div className="text-center py-6 text-gray-500">Content for About tab will appear here</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentFeed;
