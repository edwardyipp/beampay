"use client";

import { useState } from "react";
import { useWallet } from "@/context/WalletContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SendForm() {
  const { balance, send } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const sendAmount = parseFloat(amount);

      if (sendAmount > balance) {
        return; // Error toast will be shown by context
      }

      await send(recipientEmail, sendAmount);

      // Reset form
      setRecipientEmail("");
      setAmount("");
    } catch (error) {
      // Error already handled by context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="recipient">Recipient Email</Label>
        <Input
          id="recipient"
          type="email"
          placeholder="recipient@example.com"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="sendAmount">Amount</Label>
        <Input
          id="sendAmount"
          type="number"
          step="0.01"
          min="0.01"
          max={balance}
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <p className="text-xs text-gray-500">
          Available balance: ${balance.toFixed(2)}
        </p>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading || balance === 0}>
        {isLoading ? "Sending..." : "Send Money"}
      </Button>
    </form>
  );
}
