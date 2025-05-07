import React from "react";
import { ArrowUpRight, ArrowDownRight, ExternalLink, Filter, Search } from "lucide-react";

// Simplified Button component for the example
const Button = ({ variant = "default", size = "default", className = "", children, ...props }) => {
  const variantClasses = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800",
    ghost: "hover:bg-gray-100 dark:hover:bg-gray-800",
  };
  
  const sizeClasses = {
    default: "py-2 px-4",
    sm: "py-1 px-3 text-sm",
  };
  
  return (
    <button 
      className={`rounded-md font-medium transition-colors ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Table components
const Table = ({ children }) => (
  <table className="w-full">
    {children}
  </table>
);

const TableHeader = ({ children }) => (
  <thead>
    {children}
  </thead>
);

const TableBody = ({ children }) => (
  <tbody>
    {children}
  </tbody>
);

const TableRow = ({ children, className = "" }) => (
  <tr className={className}>
    {children}
  </tr>
);

const TableHead = ({ children, className = "" }) => (
  <th className={`px-4 py-3 text-left text-sm text-black ${className}`}>
    {children}
  </th>
);

const TableCell = ({ children, className = "" }) => (
  <td className={`px-4 py-4 text-sm  text-black ${className}`}>
    {children}
  </td>
);

const mockTransactions = [
  {
    id: 1,
    type: "buy",
    creator: "Emma Chen",
    amount: 50,
    price: 0.0098,
    total: 0.49,
    date: "May 3, 2025",
    time: "14:32",
    avatar: "E"
  },
  {
    id: 2,
    type: "sell",
    creator: "David Park",
    amount: 100,
    price: 0.0058,
    total: 0.58,
    date: "May 2, 2025",
    time: "09:15",
    avatar: "D"
  },
  {
    id: 3,
    type: "buy",
    creator: "James Wilson",
    amount: 200,
    price: 0.0076,
    total: 1.52,
    date: "May 1, 2025",
    time: "17:45",
    avatar: "J"
  },
  {
    id: 4,
    type: "buy",
    creator: "Alex Rivera",
    amount: 150,
    price: 0.0045,
    total: 0.675,
    date: "Apr 28, 2025",
    time: "11:22",
    avatar: "A"
  },
  {
    id: 5,
    type: "sell",
    creator: "Maya Johnson",
    amount: 300,
    price: 0.0034,
    total: 1.02,
    date: "Apr 25, 2025",
    time: "16:08",
    avatar: "M"
  }
];

const TransactionHistory = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
      {/* Header Section */}
      <div className="p-6 flex justify-between items-center border-b border-gray-100 dark:border-gray-700">
        <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Transaction History</h3>
        <div className="flex items-center space-x-2">
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions"
              className="pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline text-black">Filter</span>
          </Button>
        </div>
      </div>
      
      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50 dark:bg-gray-800">
        <div className="flex flex-col">
          <span className="text-sm text-gray-500 dark:text-gray-400">Total Transactions</span>
          <span className="text-2xl font-bold text-black">5</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500 dark:text-gray-400">Total Volume</span>
          <span className="text-2xl font-bold text-black">4.26 SOL</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500 dark:text-gray-400">Buy Orders</span>
          <span className="text-2xl font-bold text-green-500">3</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500 dark:text-gray-400">Sell Orders</span>
          <span className="text-2xl font-bold text-red-500">2</span>
        </div>
      </div>
      
      {/* Table Section */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-800">
              <TableHead className="font-semibold">Type</TableHead>
              <TableHead className="font-semibold">Creator</TableHead>
              <TableHead className="text-right font-semibold">Amount</TableHead>
              <TableHead className="text-right font-semibold">Price</TableHead>
              <TableHead className="text-right font-semibold">Total</TableHead>
              <TableHead className="hidden md:table-cell font-semibold">Date</TableHead>
 
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTransactions.map(tx => (
              <TableRow 
                key={tx.id} 
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      tx.type === 'buy' 
                        ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400' 
                        : 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400'
                    }`}>
                      {tx.type === 'buy' ? (
                        <ArrowDownRight className="h-5 w-5" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5" />
                      )}
                    </div>
                    <span className={`font-medium capitalize ${
                      tx.type === 'buy' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {tx.type}
                    </span>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                      {tx.avatar}
                    </div>
                    <span className="font-medium">{tx.creator}</span>
                  </div>
                </TableCell>
                
                <TableCell className="text-right">
                  <span className="font-mono">{tx.amount.toLocaleString()}</span>
                </TableCell>
                
                <TableCell className="text-right">
                  <div className="flex flex-col items-end">
                    <span className="font-mono">{tx.price}</span>
                    <span className="text-xs text-black dark:text-gray-400">SOL</span>
                  </div>
                </TableCell>
                
                <TableCell className="text-right">
                  <div className="font-medium font-mono text-gray-900 dark:text-gray-100">
                    {tx.total} SOL
                  </div>
                </TableCell>
                
                <TableCell className="hidden md:table-cell">
                  <div className="flex flex-col">
                    <span className="text-gray-900 dark:text-gray-100">{tx.date}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{tx.time}</span>
                  </div>
                </TableCell>
                
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <ExternalLink className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer with pagination */}
      <div className="p-4 flex justify-between items-center border-t border-gray-100 dark:border-gray-700">
        <span className="text-sm text-gray-500 dark:text-gray-400">Showing 5 of 25 transactions</span>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-sm text-black">Previous</Button>
          <Button variant="outline" size="sm" className="text-sm bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900 dark:text-blue-400 dark:border-blue-800">1</Button>
          <Button variant="outline" size="sm" className="text-sm text-black">2</Button>
          <Button variant="outline" size="sm" className="text-sm text-black">3</Button>
          <Button variant="outline" size="sm" className="text-sm text-black">Next</Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;