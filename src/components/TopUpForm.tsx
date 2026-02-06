"use client";

import { useState } from "react";
import { useWallet } from "@/context/WalletContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export function TopUpForm() {
  const { savedCards, topUp } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [useNewCard, setUseNewCard] = useState(savedCards.length === 0);

  const [selectedCardId, setSelectedCardId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [amount, setAmount] = useState("");
  const [saveCard, setSaveCard] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const topUpAmount = parseFloat(amount);

      if (useNewCard) {
        await topUp(
          topUpAmount,
          undefined,
          saveCard,
          { cardNumber, expiry, cvc }
        );
      } else {
        const card = savedCards.find((c) => c.id === selectedCardId);
        if (card) {
          await topUp(topUpAmount, card);
        }
      }

      // Reset form
      setAmount("");
      setCardNumber("");
      setExpiry("");
      setCvc("");
      setSaveCard(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          min="0.01"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>

      {savedCards.length > 0 && (
        <div className="flex items-center space-x-2">
          <Checkbox
            id="useNewCard"
            checked={useNewCard}
            onCheckedChange={(checked) => setUseNewCard(checked as boolean)}
          />
          <label
            htmlFor="useNewCard"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
          >
            Use a new card
          </label>
        </div>
      )}

      {!useNewCard && savedCards.length > 0 ? (
        <div className="space-y-2">
          <Label htmlFor="savedCard">Select Card</Label>
          <Select value={selectedCardId} onValueChange={setSelectedCardId} required>
            <SelectTrigger>
              <SelectValue placeholder="Choose a saved card" />
            </SelectTrigger>
            <SelectContent>
              {savedCards.map((card) => (
                <SelectItem key={card.id} value={card.id}>
                  {card.label} • Expires {card.expiry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\s/g, "");
                if (value.length <= 16 && /^\d*$/.test(value)) {
                  setCardNumber(value);
                }
              }}
              maxLength={16}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry (MM/YY)</Label>
              <Input
                id="expiry"
                type="text"
                placeholder="12/26"
                value={expiry}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, "");
                  if (value.length >= 2) {
                    value = value.slice(0, 2) + "/" + value.slice(2, 4);
                  }
                  setExpiry(value);
                }}
                maxLength={5}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input
                id="cvc"
                type="text"
                placeholder="123"
                value={cvc}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 3 && /^\d*$/.test(value)) {
                    setCvc(value);
                  }
                }}
                maxLength={3}
                required
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="saveCard"
              checked={saveCard}
              onCheckedChange={(checked) => setSaveCard(checked as boolean)}
            />
            <label
              htmlFor="saveCard"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Save this card for future use
            </label>
          </div>
        </>
      )}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Processing..." : "Top Up"}
      </Button>
    </form>
  );
}
