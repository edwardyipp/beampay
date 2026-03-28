"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "../shared/SectionWrapper";
import { DemoCard } from "../shared/DemoCard";

const toastExamples = [
  {
    label: "Default",
    variant: "default",
    action: () => toast("BeamPay notification", { description: "Your settings have been updated." }),
  },
  {
    label: "Success",
    variant: "success",
    action: () => toast.success("Transfer complete!", { description: "$50.00 sent to Alex Johnson." }),
  },
  {
    label: "Error",
    variant: "destructive",
    action: () => toast.error("Transfer failed", { description: "Insufficient balance. Please top up." }),
  },
  {
    label: "Info",
    variant: "outline",
    action: () => toast.info("PIN setup required", { description: "Set a PIN to secure your transfers." }),
  },
  {
    label: "Warning",
    variant: "outline",
    action: () => toast.warning("Session expiring", { description: "You will be logged out in 5 minutes." }),
  },
  {
    label: "Loading",
    variant: "secondary",
    action: () => {
      const id = toast.loading("Processing transfer...");
      setTimeout(() => toast.success("Transfer complete!", { id }), 2000);
    },
  },
] as const;

export function ToastShowcase() {
  return (
    <SectionWrapper
      id="toast"
      title="Toast / Sonner"
      description="Notification toasts via Sonner. Types: default, success, error, info, warning, loading. Positioned top-right on desktop, top-center on mobile."
    >
      <DemoCard label="Trigger Examples — Click to preview">
        <div className="flex flex-wrap gap-3">
          {toastExamples.map(({ label, variant, action }) => (
            <Button
              key={label}
              variant={variant as Parameters<typeof Button>[0]["variant"]}
              onClick={action}
            >
              {label}
            </Button>
          ))}
        </div>
      </DemoCard>

      <DemoCard label="Loading → Success Pattern">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            The loading toast automatically resolves after 2 seconds when you click &quot;Loading&quot; above.
            This pattern is used for the top-up flow.
          </p>
          <div className="bg-muted rounded-xl p-4 font-mono text-xs text-muted-foreground space-y-1">
            <p><span className="text-primary">const</span> id = toast.loading(&quot;Processing...&quot;)</p>
            <p><span className="text-muted-foreground/60">// after async operation:</span></p>
            <p>toast.success(&quot;Done!&quot;, {'{ id }'})</p>
          </div>
        </div>
      </DemoCard>
    </SectionWrapper>
  );
}
