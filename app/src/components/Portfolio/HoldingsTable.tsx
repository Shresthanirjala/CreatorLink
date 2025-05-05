
import React from "react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const mockHoldings = [
  {
    id: 1,
    creator: "Alex Rivera",
    category: "Music Producer",
    amount: 250,
    value: 1.125,
    price: 0.0045,
    change: "+24.5%",
    positive: true
  },
  {
    id: 2,
    creator: "Emma Chen",
    category: "Digital Artist",
    amount: 400,
    value: 3.92,
    price: 0.0098,
    change: "+12.3%",
    positive: true
  },
  {
    id: 3,
    creator: "James Wilson",
    category: "Tech Creator",
    amount: 7600,
    value: 57.76,
    price: 0.0076,
    change: "+18.7%",
    positive: true
  },
  {
    id: 4,
    creator: "Maya Johnson",
    category: "Fitness Instructor",
    amount: 1200,
    value: 3.84,
    price: 0.0032,
    change: "-3.2%",
    positive: false
  },
  {
    id: 5,
    creator: "David Park",
    category: "Game Developer",
    amount: 900,
    value: 4.95,
    price: 0.0055,
    change: "+9.1%",
    positive: true
  }
];

const HoldingsTable: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden mb-6">
      <div className="p-6 pb-3 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Your Holdings</h3>
        <Button variant="ghost" size="sm">View All</Button>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Creator</TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead className="text-right hidden md:table-cell">Price</TableHead>
              <TableHead className="text-right">24h</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockHoldings.map(holding => (
              <TableRow key={holding.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    {holding.creator}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell text-gray-600 dark:text-gray-400">{holding.category}</TableCell>
                <TableCell className="text-right">{holding.amount.toLocaleString()}</TableCell>
                <TableCell className="text-right font-medium">{holding.value.toFixed(2)} SOL</TableCell>
                <TableCell className="text-right hidden md:table-cell">{holding.price} SOL</TableCell>
                <TableCell className={`text-right ${holding.positive ? 'text-green-500' : 'text-red-500'}`}>
                  {holding.change}
                </TableCell>
                <TableCell className="text-right">
                  <Link to={`/creator/${holding.id}`}>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default HoldingsTable;
