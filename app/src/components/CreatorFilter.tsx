
import React from "react";
import { Button } from "./ui/button";
import { Search, Filter, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const categories = [
  "All Categories",
  "Music",
  "Art",
  "Technology",
  "Gaming",
  "Education",
  "Fitness",
  "Writing"
];

const CreatorFilter: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search creators..." className="pl-10" />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category, index) => (
                <SelectItem key={index} value={index === 0 ? "all" : category.toLowerCase()}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select defaultValue="trending">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="trending">Trending</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="priceAsc">Price: Low to High</SelectItem>
              <SelectItem value="priceDesc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="w-full sm:w-auto gap-2">
            <Filter className="h-4 w-4" /> More Filters
          </Button>
        </div>
      </div>
      
      <div className="mt-6 flex flex-wrap gap-2">
        <Button variant="secondary" size="sm" className="rounded-full">All</Button>
        <Button variant="ghost" size="sm" className="rounded-full">Music</Button>
        <Button variant="ghost" size="sm" className="rounded-full">Art</Button>
        <Button variant="ghost" size="sm" className="rounded-full">Technology</Button>
        <Button variant="ghost" size="sm" className="rounded-full">Gaming</Button>
        <Button variant="ghost" size="sm" className="rounded-full">Education</Button>
        <Button variant="ghost" size="sm" className="rounded-full">Fitness</Button>
      </div>
    </div>
  );
};

export default CreatorFilter;
