"use client";

import { useWallet } from "@/context/WalletContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function SavedCards() {
  const { savedCards, deleteSavedCard } = useWallet();

  if (savedCards.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No saved cards yet</p>
        <p className="text-sm mt-1">Save a card when topping up for faster payments</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {savedCards.map((card) => (
        <div
          key={card.id}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-8 bg-gradient-to-br from-gray-700 to-gray-900 rounded flex items-center justify-center">
              <div className="w-6 h-6 bg-gray-400 rounded-full opacity-50"></div>
            </div>
            <div>
              <p className="font-medium text-sm">{card.label}</p>
              <p className="text-xs text-gray-500">Expires {card.expiry}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => deleteSavedCard(card.id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
