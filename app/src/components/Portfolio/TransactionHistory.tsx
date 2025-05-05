
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
import { ArrowUpRight, ArrowDownRight, ExternalLink } from "lucide-react";

const mockTransactions = [
  {
    id: 1,
    type: "buy",
    creator: "Emma Chen",
    amount: 50,
    price: 0.0098,
    total: 0.49,
    date: "May 3, 2025",
    time: "14:32"
  },
  {
    id: 2,
    type: "sell",
    creator: "David Park",
    amount: 100,
    price: 0.0058,
    total: 0.58,
    date: "May 2, 2025",
    time: "09:15"
  },
  {
    id: 3,
    type: "buy",
    creator: "James Wilson",
    amount: 200,
    price: 0.0076,
    total: 1.52,
    date: "May 1, 2025",
    time: "17:45"
  },
  {
    id: 4,
    type: "buy",
    creator: "Alex Rivera",
    amount: 150,
    price: 0.0045,
    total: 0.675,
    date: "Apr 28, 2025",
    time: "11:22"
  },
  {
    id: 5,
    type: "sell",
    creator: "Maya Johnson",
    amount: 300,
    price: 0.0034,
    total: 1.02,
    date: "Apr 25, 2025",
    time: "16:08"
  }
];

const TransactionHistory: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 pb-3 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Transaction History</h3>
        <Button variant="ghost" size="sm">View All</Button>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Creator</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTransactions.map(tx => (
              <TableRow key={tx.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full ${tx.type === 'buy' ? 'bg-green-100 text-green-500 dark:bg-green-900/30' : 'bg-red-100 text-red-500 dark:bg-red-900/30'} flex items-center justify-center`}>
                      {tx.type === 'buy' ? (
                        <ArrowDownRight className="h-4 w-4" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4" />
                      )}
                    </div>
                    <span className="capitalize">{tx.type}</span>
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    {tx.creator}
                  </div>
                </TableCell>
                <TableCell className="text-right">{tx.amount.toLocaleString()}</TableCell>
                <TableCell className="text-right">{tx.price} SOL</TableCell>
                <TableCell className="text-right font-medium">{tx.total} SOL</TableCell>
                <TableCell className="hidden md:table-cell text-gray-600 dark:text-gray-400">
                  {tx.date} <span className="text-gray-400 dark:text-gray-500">{tx.time}</span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="gap-1">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionHistory;
