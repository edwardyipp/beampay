"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { SectionWrapper } from "../shared/SectionWrapper";
import { DemoCard } from "../shared/DemoCard";
import { Separator } from "@/components/ui/separator";

export function CheckboxShowcase() {
  const [checked, setChecked] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [terms, setTerms] = useState(false);

  return (
    <SectionWrapper
      id="checkbox"
      title="Checkbox"
      description="Selection control for multi-select scenarios. Used in signup for legal consent and marketing opt-in."
    >
      {/* States */}
      <DemoCard label="States">
        <div className="flex flex-wrap gap-8">
          <div className="flex flex-col items-center gap-3">
            <Checkbox />
            <span className="text-xs text-muted-foreground">Unchecked</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Checkbox defaultChecked />
            <span className="text-xs text-muted-foreground">Checked</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Checkbox disabled />
            <span className="text-xs text-muted-foreground">Disabled</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Checkbox disabled defaultChecked />
            <span className="text-xs text-muted-foreground">Disabled Checked</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Checkbox checked={checked} onCheckedChange={(v) => setChecked(!!v)} />
            <span className="text-xs text-muted-foreground">Interactive</span>
          </div>
        </div>
      </DemoCard>

      <Separator />

      {/* With labels */}
      <DemoCard label="With Labels — Signup Flow Usage">
        <div className="max-w-sm space-y-4">
          <div className="flex items-start gap-3">
            <Checkbox
              id="terms"
              checked={terms}
              onCheckedChange={(v) => setTerms(!!v)}
              className="mt-0.5"
            />
            <Label htmlFor="terms" className="text-sm font-normal leading-relaxed cursor-pointer">
              I agree to the{" "}
              <span className="text-primary underline">Terms of Service</span> and{" "}
              <span className="text-primary underline">Privacy Policy</span>
            </Label>
          </div>
          <div className="flex items-start gap-3">
            <Checkbox
              id="marketing"
              checked={marketing}
              onCheckedChange={(v) => setMarketing(!!v)}
              className="mt-0.5"
            />
            <Label htmlFor="marketing" className="text-sm font-normal leading-relaxed cursor-pointer">
              Send me product updates and promotions (optional)
            </Label>
          </div>
          <div className="flex items-start gap-3 opacity-50">
            <Checkbox id="required" disabled className="mt-0.5" />
            <Label htmlFor="required" className="text-sm font-normal leading-relaxed">
              Disabled field (read-only)
            </Label>
          </div>
        </div>
      </DemoCard>
    </SectionWrapper>
  );
}
