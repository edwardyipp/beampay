"use client";

import { useState } from "react";
import { useWallet } from "@/context/WalletContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PinVerificationModal } from "@/components/PinVerificationModal";
import { toast } from "sonner";

export function SendForm() {
  const { balance, send } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);

  const [recipientEmail, setRecipientEmail] = useState("");
  const [amount, setAmount] = useState("");

  const [pendingRecipient, setPendingRecipient] = useState("");
  const [pendingAmount, setPendingAmount] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const sendAmount = parseFloat(amount);

    if (sendAmount <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }

    if (sendAmount > balance) {
      toast.error("Insufficient balance");
      return;
    }

    // Require PIN verification
    setPendingRecipient(recipientEmail);
    setPendingAmount(sendAmount);
    setShowPinModal(true);
  };

  const executeSend = async () => {
    setIsLoading(true);
    try {
      await send(pendingRecipient, pendingAmount);

      // Reset form
      setRecipientEmail("");
      setAmount("");
    } catch (error) {
      // Error already handled by context
    } finally {
      setIsLoading(false);
    }
  };

  const handlePinSuccess = () => {
    setShowPinModal(false);
    executeSend();
  };

  return (
    <>
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
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Available balance: ${balance.toFixed(2)}
          </p>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Sending..." : "Send Money"}
        </Button>
      </form>

      <PinVerificationModal
        isOpen={showPinModal}
        onClose={() => setShowPinModal(false)}
        onSuccess={handlePinSuccess}
        title="Confirm Transaction"
        description={`Enter your PIN to send $${pendingAmount.toFixed(2)} to ${pendingRecipient}`}
      />
    </>
  );
}
