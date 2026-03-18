"use client";

import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { validatePin } from "@/lib/validators";
import { toast } from "sonner";
import type { PinSetupModalProps } from "@/types";

export function PinSetupModal({
  isOpen,
  onClose,
  onSuccess,
}: PinSetupModalProps) {
  const { setPin: savePin } = useAuth();
  const [pin, setPin] = useState<string[]>(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState<string[]>(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);

  const pinInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const confirmPinInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Auto-focus first input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => pinInputRefs[0].current?.focus(), 100);
    }
  }, [isOpen]);

  const handlePinChange = (
    index: number,
    value: string,
    isConfirm: boolean
  ) => {
    if (value && !/^\d$/.test(value)) return;

    if (isConfirm) {
      const newPin = [...confirmPin];
      newPin[index] = value;
      setConfirmPin(newPin);
      if (value && index < 3) {
        confirmPinInputRefs[index + 1].current?.focus();
      }
    } else {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);
      if (value && index < 3) {
        pinInputRefs[index + 1].current?.focus();
      } else if (value && index === 3) {
        // Auto-focus first confirm PIN input
        setTimeout(() => confirmPinInputRefs[0].current?.focus(), 100);
      }
    }
  };

  const handlePinKeyDown = (
    index: number,
    e: React.KeyboardEvent,
    isConfirm: boolean
  ) => {
    const currentPin = isConfirm ? confirmPin : pin;
    const refs = isConfirm ? confirmPinInputRefs : pinInputRefs;
    if (e.key === "Backspace" && !currentPin[index] && index > 0) {
      refs[index - 1].current?.focus();
    }
  };

  const handleSubmit = async () => {
    const pinStr = pin.join("");
    const confirmPinStr = confirmPin.join("");

    if (pinStr.length !== 4) {
      toast.error("Please enter a 4-digit PIN");
      return;
    }

    const pinValidation = validatePin(pinStr);
    if (!pinValidation.valid) {
      toast.error(pinValidation.error || "Invalid PIN");
      return;
    }

    if (pinStr !== confirmPinStr) {
      toast.error("PINs do not match");
      return;
    }

    setIsLoading(true);
    const success = await savePin(pinStr);
    setIsLoading(false);

    if (success) {
      toast.success("PIN created successfully");
      setPin(["", "", "", ""]);
      setConfirmPin(["", "", "", ""]);
      onSuccess();
      onClose();
    }
  };

  const handleCancel = () => {
    setPin(["", "", "", ""]);
    setConfirmPin(["", "", "", ""]);
    onClose();
  };

  const pinInputClasses =
    "w-14 h-14 text-center text-2xl font-bold";

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Set up your security PIN</DialogTitle>
          <DialogDescription>
            Create a 4-digit PIN for transactions and sensitive actions
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Create PIN */}
          <div>
            <p className="text-xs text-muted-foreground mb-2 text-center">
              Create PIN
            </p>
            <div className="flex justify-center gap-3">
              {pin.map((digit, index) => (
                <Input
                  key={index}
                  ref={pinInputRefs[index]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) =>
                    handlePinChange(index, e.target.value, false)
                  }
                  onKeyDown={(e) => handlePinKeyDown(index, e, false)}
                  className={pinInputClasses}
                />
              ))}
            </div>
          </div>

          {/* Confirm PIN */}
          <div>
            <p className="text-xs text-muted-foreground mb-2 text-center">
              Confirm PIN
            </p>
            <div className="flex justify-center gap-3">
              {confirmPin.map((digit, index) => (
                <Input
                  key={index}
                  ref={confirmPinInputRefs[index]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) =>
                    handlePinChange(index, e.target.value, true)
                  }
                  onKeyDown={(e) => handlePinKeyDown(index, e, true)}
                  className={pinInputClasses}
                />
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-2">
            <Button
              onClick={handleSubmit}
              disabled={
                isLoading ||
                pin.some((d) => !d) ||
                confirmPin.some((d) => !d)
              }
              className="w-full"
            >
              {isLoading ? "Setting up..." : "Set PIN"}
            </Button>
            <Button
              onClick={handleCancel}
              variant="ghost"
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
