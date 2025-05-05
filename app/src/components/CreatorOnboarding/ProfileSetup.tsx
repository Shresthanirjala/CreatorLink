
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  "Music",
  "Art",
  "Technology",
  "Gaming",
  "Education",
  "Fitness",
  "Writing"
];

const ProfileSetup: React.FC<{ onNext: () => void; onBack: () => void }> = ({ onNext, onBack }) => {
  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 mb-8">
        <h2 className="text-xl font-semibold mb-6">Create Your Profile</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Tell your fans about yourself. This information will be published to IPFS and tied to your creator token.
        </p>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="profile-image">Profile Image</Label>
              <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750">
                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4 flex items-center justify-center">
                  <Upload className="h-6 w-6 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">SVG, PNG, JPG (max. 2MB)</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cover-image">Cover Image</Label>
              <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750">
                <div className="w-32 h-16 bg-gray-100 dark:bg-gray-700 mb-4 rounded flex items-center justify-center">
                  <Upload className="h-6 w-6 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">16:9 ratio recommended</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Creator Name</Label>
            <Input id="name" placeholder="Your name or brand name" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category, index) => (
                    <SelectItem key={index} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="url">Website or Social URL</Label>
              <Input id="url" placeholder="https://" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" placeholder="Tell your fans about yourself and what you create..." className="min-h-32" />
          </div>
          
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <Button variant="outline" className="w-full sm:w-auto" onClick={onBack}>
              Back
            </Button>
            <Button className="btn-gradient w-full sm:w-auto ml-auto" onClick={onNext}>
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
