"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";
import type {
  Transaction,
  SavedCard,
  WalletData,
  WalletContextType,
} from "@/types";

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [savedCards, setSavedCards] = useState<SavedCard[]>([]);

  // Load wallet data from localStorage when user changes
  useEffect(() => {
    if (currentUser) {
      const walletData = JSON.parse(
        localStorage.getItem(`wallet_${currentUser.id}`) || "{}"
      );
      setBalance(walletData.balance || 0);
      setTransactions(walletData.transactions || []);
      setSavedCards(walletData.savedCards || []);
    } else {
      setBalance(0);
      setTransactions([]);
      setSavedCards([]);
    }
  }, [currentUser]);

  // Save wallet data to localStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      const walletData: WalletData = {
        balance,
        transactions,
        savedCards,
      };
      localStorage.setItem(
        `wallet_${currentUser.id}`,
        JSON.stringify(walletData)
      );
    }
  }, [balance, transactions, savedCards, currentUser]);

  const topUp = async (
    amount: number,
    card?: SavedCard,
    saveCard?: boolean,
    cardDetails?: {
      cardNumber: string;
      expiry: string;
      cvc: string;
    }
  ): Promise<void> => {
    if (!currentUser) return;

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Create transaction
    const transaction: Transaction = {
      id: crypto.randomUUID(),
      type: "topup",
      amount,
      description: card
        ? `Top-up using ${card.label}`
        : "Top-up",
      date: new Date().toISOString(),
      status: "completed",
    };

    // Update balance and transactions
    setBalance((prev) => prev + amount);
    setTransactions((prev) => [transaction, ...prev]);

    // Save card if requested and cardDetails provided
    if (saveCard && cardDetails) {
      const lastFour = cardDetails.cardNumber.slice(-4);
      const newCard: SavedCard = {
        id: crypto.randomUUID(),
        lastFour,
        expiry: cardDetails.expiry,
        label: `Card ending in ${lastFour}`,
      };
      setSavedCards((prev) => [...prev, newCard]);
    }

    toast.success(`Successfully added $${amount.toFixed(2)} to your balance`);
  };

  const send = async (
    recipientEmail: string,
    amount: number
  ): Promise<void> => {
    if (!currentUser) return;

    // Validate balance
    if (amount > balance) {
      toast.error("Insufficient balance");
      throw new Error("Insufficient balance");
    }

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Create transaction
    const transaction: Transaction = {
      id: crypto.randomUUID(),
      type: "send",
      amount,
      description: `Sent to ${recipientEmail}`,
      date: new Date().toISOString(),
      status: "completed",
    };

    // Update balance and transactions
    setBalance((prev) => prev - amount);
    setTransactions((prev) => [transaction, ...prev]);

    toast.success(`Successfully sent $${amount.toFixed(2)} to ${recipientEmail}`);
  };

  const deleteSavedCard = (cardId: string) => {
    setSavedCards((prev) => prev.filter((card) => card.id !== cardId));
    toast.success("Card deleted successfully");
  };

  return (
    <WalletContext.Provider
      value={{
        balance,
        transactions,
        savedCards,
        topUp,
        send,
        deleteSavedCard,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
