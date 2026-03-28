"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { DemoCard } from "../shared/DemoCard";
import { SectionWrapper } from "../shared/SectionWrapper";
import { Lock } from "lucide-react";

export function PinInputDemo() {
  const [pin, setPin] = useState(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const isComplete = pin.every((d) => d !== "");

  return (
    <SectionWrapper
      id="pin-input"
      title="PIN Input"
      description="4-digit security PIN with auto-advance on entry and backspace navigation. Used in PinSetupModal and PinVerificationModal."
    >
      <DemoCard label="Interactive Demo">
        <div className="max-w-xs mx-auto space-y-5">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm font-semibold text-foreground">Security PIN</p>
            <p className="text-xs text-muted-foreground text-center">
              4-digit PIN for authorizing transactions
            </p>
          </div>

          <div className="flex justify-center gap-3">
            {pin.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="password"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-14 h-14 text-center text-2xl font-bold"
              />
            ))}
          </div>

          {isComplete && (
            <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
              ✓ PIN set successfully
            </p>
          )}

          <p className="text-xs text-muted-foreground text-center">
            Cannot be sequential (1234) or repeated (0000)
          </p>
        </div>
      </DemoCard>
    </SectionWrapper>
  );
}
