"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { DemoCard } from "../shared/DemoCard";
import { SectionWrapper } from "../shared/SectionWrapper";

export function VerificationCodeDemo() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setCode(pasted.split(""));
      inputRefs.current[5]?.focus();
    }
  };

  const isComplete = code.every((d) => d !== "");

  return (
    <SectionWrapper
      id="verification-code"
      title="Verification Code"
      description="6-digit OTP input with auto-advance on entry and backspace navigation. Used in the email verification step of signup."
    >
      <DemoCard label="Interactive Demo — Type or paste 6 digits" dark>
        <div className="max-w-sm space-y-5">
          <div className="text-center space-y-1">
            <p className="text-sm font-medium text-white">Enter verification code</p>
            <p className="text-xs text-white/50">Sent to john@example.com</p>
          </div>
          <div className="flex justify-center gap-2.5" onPaste={handlePaste}>
            {code.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-11 h-14 text-center text-xl font-bold bg-white/[0.07] border-white/10 text-white rounded-xl focus:border-primary/50 focus:ring-primary/20"
              />
            ))}
          </div>
          {isComplete && (
            <p className="text-center text-sm text-green-400">✓ Code entered — submitting...</p>
          )}
          <p className="text-xs text-white/30 text-center">Try pasting: 123456</p>
        </div>
      </DemoCard>
    </SectionWrapper>
  );
}
