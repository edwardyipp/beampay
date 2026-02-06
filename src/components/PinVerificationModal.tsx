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
import { PinVerificationModalProps } from "@/types";

export function PinVerificationModal({
  isOpen,
  onClose,
  onSuccess,
  title,
  description,
}: PinVerificationModalProps) {
  const { currentUser } = useAuth();
  const [pin, setPin] = useState<string[]>(["", "", "", ""]);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Auto-focus first input when modal opens
  useEffect(() => {
    if (isOpen && !isLocked) {
      setTimeout(() => inputRefs[0].current?.focus(), 100);
    }
  }, [isOpen, isLocked]);

  // Handle lockout timer
  useEffect(() => {
    if (lockoutTime) {
      const timer = setInterval(() => {
        const remaining = lockoutTime - Date.now();
        if (remaining <= 0) {
          setIsLocked(false);
          setLockoutTime(null);
          setAttempts(0);
          setError("");
          clearInterval(timer);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [lockoutTime]);

  const handlePinChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setError("");

    // Auto-advance to next input
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = () => {
    const enteredPin = pin.join("");

    if (enteredPin.length !== 4) {
      setError("Please enter all 4 digits");
      return;
    }

    if (enteredPin === currentUser?.pin) {
      // Success
      setPin(["", "", "", ""]);
      setAttempts(0);
      setError("");
      onSuccess();
      onClose();
    } else {
      // Failed attempt
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 3) {
        // Lock for 5 minutes
        setIsLocked(true);
        setLockoutTime(Date.now() + 5 * 60 * 1000);
        setError("Too many failed attempts. Try again in 5 minutes.");
        setPin(["", "", "", ""]);
      } else {
        setError(`Incorrect PIN. ${3 - newAttempts} attempts remaining.`);
        setPin(["", "", "", ""]);
        inputRefs[0].current?.focus();
      }
    }
  };

  const handleCancel = () => {
    setPin(["", "", "", ""]);
    setError("");
    onClose();
  };

  const getRemainingTime = () => {
    if (!lockoutTime) return "";
    const remaining = Math.ceil((lockoutTime - Date.now()) / 1000);
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* PIN Input */}
          <div className="flex justify-center gap-3">
            {pin.map((digit, index) => (
              <Input
                key={index}
                ref={inputRefs[index]}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handlePinChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={isLocked}
                className="w-14 h-14 text-center text-2xl font-bold"
              />
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}

          {/* Lockout Timer */}
          {isLocked && lockoutTime && (
            <p className="text-sm text-center text-gray-600">
              Try again in {getRemainingTime()}
            </p>
          )}

          {/* Buttons */}
          <div className="space-y-2">
            <Button
              onClick={handleVerify}
              disabled={isLocked || pin.some((d) => !d)}
              className="w-full"
            >
              Verify
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
