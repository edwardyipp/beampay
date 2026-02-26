"use client";

import { useWallet } from "@/context/WalletContext";
import { ArrowDown } from "lucide-react";
import { convertUsdToIdr } from "@/lib/currency-utils";

interface TransactionHistoryProps {
  limit?: number;
}

// Exact colors from the Figma design
const avatarColors = [
  "bg-[#ec4899]",
  "bg-[#3b82f6]",
  "bg-[#eab308]",
  "bg-[#a855f7]",
  "bg-[#14b8a6]",
  "bg-[#f97316]",
  "bg-[#22c55e]",
  "bg-[#ef4444]",
];

function getColorForName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

function getInitials(description: string): string {
  const emailMatch = description.match(/Sent to (.+)/);
  if (emailMatch) {
    const email = emailMatch[1];
    const localPart = email.split("@")[0];
    const parts = localPart.split(/[._-]/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return localPart.slice(0, 2).toUpperCase();
  }
  return description.slice(0, 2).toUpperCase();
}

function getDisplayName(description: string): string {
  const emailMatch = description.match(/Sent to (.+)/);
  if (emailMatch) {
    return emailMatch[1];
  }
  return description;
}

function formatTransactionDate(dateStr: string): string {
  const date = new Date(dateStr);
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const day = date.getDate();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${month} ${day}, ${hours}:${minutes}`;
}

export function TransactionHistory({ limit }: TransactionHistoryProps = {}) {
  const { transactions } = useWallet();

  const displayedTransactions = limit
    ? transactions.slice(0, limit)
    : transactions;

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg">No transactions yet</p>
        <p className="text-sm mt-1">
          Your transaction history will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border">
      {displayedTransactions.map((transaction) => {
        const isTopUp = transaction.type === "topup";
        const idrAmount = convertUsdToIdr(transaction.amount);
        const displayName = getDisplayName(transaction.description);
        const initials = isTopUp ? null : getInitials(transaction.description);
        const avatarColor = isTopUp
          ? "bg-gray-200 dark:bg-gray-700"
          : getColorForName(transaction.description);

        return (
          <div
            key={transaction.id}
            className="flex items-center gap-3 py-3"
          >
            {/* Avatar */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${avatarColor}`}
            >
              {isTopUp ? (
                <ArrowDown className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              ) : (
                <span className="text-base font-medium text-white">
                  {initials}
                </span>
              )}
            </div>

            {/* Name & Date — 16px name, 14px date (Figma css-d2rx8f / css-paf74l) */}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-base text-foreground truncate">
                {isTopUp ? "Top Up" : displayName}
              </p>
              <p className="text-sm text-muted-foreground">
                {formatTransactionDate(transaction.date)}
              </p>
            </div>

            {/* Amounts — 16px amount, 14px IDR, all text-foreground (Figma css-k985ld / css-hc81ev, color: #030712) */}
            <div className="text-right flex-shrink-0">
              <p className="font-medium text-base text-foreground">
                {isTopUp ? "+" : "-"}
                {transaction.amount.toFixed(2)} USD
              </p>
              <p className="text-sm text-muted-foreground">
                {isTopUp ? "+" : "-"}
                {idrAmount.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                IDR
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
