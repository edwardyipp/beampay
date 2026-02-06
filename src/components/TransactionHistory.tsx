"use client";

import { useWallet } from "@/context/WalletContext";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

interface TransactionHistoryProps {
  limit?: number;
}

export function TransactionHistory({ limit }: TransactionHistoryProps = {}) {
  const { transactions } = useWallet();

  const displayedTransactions = limit ? transactions.slice(0, limit) : transactions;

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        <p className="text-lg">No transactions yet</p>
        <p className="text-sm mt-1">Your transaction history will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {displayedTransactions.map((transaction) => {
        const isTopUp = transaction.type === "topup";
        const date = new Date(transaction.date);

        return (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isTopUp
                    ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                    : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                }`}
              >
                {isTopUp ? (
                  <ArrowDownLeft className="h-5 w-5" />
                ) : (
                  <ArrowUpRight className="h-5 w-5" />
                )}
              </div>

              <div>
                <p className="font-medium text-sm dark:text-gray-200">
                  {isTopUp ? "Top Up" : "Transfer"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{transaction.description}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {date.toLocaleDateString()} at {date.toLocaleTimeString()}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p
                className={`font-semibold ${
                  isTopUp ? "text-green-600 dark:text-green-400" : "text-blue-600 dark:text-blue-400"
                }`}
              >
                {isTopUp ? "+" : "-"}${transaction.amount.toFixed(2)}
              </p>
              <Badge variant="secondary" className="mt-1 text-xs">
                {transaction.status}
              </Badge>
            </div>
          </div>
        );
      })}
    </div>
  );
}
