"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { DemoCard } from "../shared/DemoCard";
import { SectionWrapper } from "../shared/SectionWrapper";

function getStrength(pw: string) {
  if (pw.length === 0) return { level: 0, label: "", color: "" };
  if (pw.length < 6) return { level: 1, label: "Weak", color: "bg-red-500" };
  const hasUpper = /[A-Z]/.test(pw);
  const hasLower = /[a-z]/.test(pw);
  const hasNumber = /\d/.test(pw);
  const hasSpecial = /[^A-Za-z0-9]/.test(pw);
  const variety = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
  if (pw.length >= 12 && variety >= 3) return { level: 4, label: "Strong", color: "bg-green-500" };
  if (pw.length >= 8 && variety >= 2) return { level: 3, label: "Good", color: "bg-primary" };
  return { level: 2, label: "Fair", color: "bg-amber-500" };
}

export function PasswordStrengthDemo() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const strength = getStrength(password);

  return (
    <SectionWrapper
      id="password-strength"
      title="Password Strength"
      description="4-segment strength bar with live validation checklist. Used in the signup flow."
    >
      <DemoCard label="Interactive Demo — Try typing a password" dark>
        <div className="max-w-sm space-y-4">
          <div className="space-y-1.5">
            <Label className="text-white/80 text-sm">Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Try typing a password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 bg-white/[0.07] border-white/10 text-white placeholder:text-white/30 focus:border-primary/50 focus:ring-primary/20 pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
              >
                {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
              </button>
            </div>

            {/* Strength bar */}
            {password.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div key={level} className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${level <= strength.level ? strength.color : "bg-transparent"}`}
                        style={{ width: level <= strength.level ? "100%" : "0%" }}
                      />
                    </div>
                  ))}
                </div>
                <p className={`text-xs ${strength.level <= 1 ? "text-red-400" : strength.level === 2 ? "text-amber-400" : strength.level === 3 ? "text-primary/80" : "text-green-400"}`}>
                  {strength.label}
                </p>
              </div>
            )}
          </div>

          {/* Requirements checklist */}
          <div className="space-y-1.5">
            {[
              { met: password.length >= 6, text: "At least 6 characters" },
              { met: /[A-Z]/.test(password) && /[a-z]/.test(password), text: "Upper & lowercase letters" },
              { met: /\d/.test(password), text: "A number" },
              { met: /[^A-Za-z0-9]/.test(password), text: "A special character" },
            ].map(({ met, text }) => (
              <p key={text} className={`text-xs flex items-center gap-1.5 transition-colors ${met ? "text-green-400" : "text-white/30"}`}>
                <span className={`inline-block w-1.5 h-1.5 rounded-full transition-colors ${met ? "bg-green-400" : "bg-white/20"}`} />
                {text}
              </p>
            ))}
          </div>
        </div>
      </DemoCard>
    </SectionWrapper>
  );
}
