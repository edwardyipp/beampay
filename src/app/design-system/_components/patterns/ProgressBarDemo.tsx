"use client";

import { useState } from "react";
import { DemoCard } from "../shared/DemoCard";
import { SectionWrapper } from "../shared/SectionWrapper";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const steps = [
  { label: "Email", desc: "Enter your email address" },
  { label: "Password", desc: "Create a secure password" },
  { label: "Verify", desc: "Confirm your email" },
];

export function ProgressBarDemo() {
  const [step, setStep] = useState(1);

  return (
    <SectionWrapper
      id="progress-bar"
      title="Multi-Step Progress Bar"
      description="3-segment animated progress bar with staggered neon lime gradient fill. Used in the 3-step signup flow."
    >
      <DemoCard label="Interactive Demo — Click to navigate steps" dark>
        <div className="max-w-sm space-y-5">
          {/* Progress bar */}
          <div className="flex gap-1.5">
            {steps.map((s, i) => (
              <div key={s.label} className="flex-1 h-1 rounded-full overflow-hidden bg-white/10">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: i + 1 <= step ? "100%" : "0%",
                    background: i + 1 <= step
                      ? "linear-gradient(90deg, var(--color-neon-300), var(--color-neon-400))"
                      : "transparent",
                    transition: `width 500ms cubic-bezier(0.32, 0.72, 0, 1) ${i * 60}ms`,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Step indicator */}
          <div className="text-center space-y-0.5">
            <p className="text-xs text-white/40 font-mono">Step {step} of {steps.length}</p>
            <p className="text-base font-semibold text-white">{steps[step - 1].label}</p>
            <p className="text-sm text-white/60">{steps[step - 1].desc}</p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="text-white/60 hover:text-white"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>

            <div className="flex gap-1.5">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStep(i + 1)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i + 1 === step ? "bg-primary w-4" : i + 1 < step ? "bg-primary/40" : "bg-white/20"
                  }`}
                />
              ))}
            </div>

            <Button
              size="sm"
              onClick={() => setStep((s) => Math.min(steps.length, s + 1))}
              disabled={step === steps.length}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </DemoCard>
    </SectionWrapper>
  );
}
