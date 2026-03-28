import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionWrapper } from "../shared/SectionWrapper";
import { DemoCard } from "../shared/DemoCard";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export function InputShowcase() {
  return (
    <SectionWrapper
      id="input"
      title="Input"
      description="h-12 (48px) tall, rounded-xl, with 200ms transition on focus. Two visual contexts: standard (theme-aware) and dark-auth (translucent bg with lime focus ring)."
    >
      {/* Standard inputs */}
      <DemoCard label="Standard — Light / Dark Adaptive">
        <div className="grid sm:grid-cols-2 gap-4 max-w-lg">
          <div className="space-y-2">
            <Label>Default</Label>
            <Input placeholder="Placeholder text" />
          </div>
          <div className="space-y-2">
            <Label>With value</Label>
            <Input defaultValue="john@example.com" />
          </div>
          <div className="space-y-2">
            <Label>Disabled</Label>
            <Input disabled placeholder="Cannot edit" />
          </div>
          <div className="space-y-2">
            <Label>Number</Label>
            <Input type="number" placeholder="0.00" />
          </div>
        </div>
      </DemoCard>

      <Separator />

      {/* With labels and helpers */}
      <DemoCard label="With Labels and Helper Text">
        <div className="max-w-sm space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="ex-email">Email address</Label>
            <Input id="ex-email" type="email" placeholder="you@example.com" />
            <p className="text-xs text-muted-foreground">We&apos;ll never share your email with anyone.</p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ex-amount">Transfer amount</Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
              <Input id="ex-amount" type="number" placeholder="0.00" className="pl-8" />
            </div>
            <p className="text-xs text-muted-foreground">Available balance: $1,234.56</p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ex-error" className="text-destructive">Email (error state)</Label>
            <Input
              id="ex-error"
              type="email"
              defaultValue="not-an-email"
              aria-invalid="true"
              className="border-destructive focus-visible:ring-destructive/30"
            />
            <p className="text-xs text-destructive">Please enter a valid email address.</p>
          </div>
          <Button className="w-full">Continue</Button>
        </div>
      </DemoCard>

      <Separator />

      {/* Dark auth context */}
      <DemoCard label="Dark Auth Context (Signup / Login flow)" dark>
        <div className="max-w-sm space-y-4">
          <div className="space-y-1.5">
            <Label className="text-white/80 text-sm">Email address</Label>
            <Input
              type="email"
              placeholder="you@example.com"
              className="h-12 bg-white/[0.07] border-white/10 text-white placeholder:text-white/30 focus:border-primary/50 focus:ring-primary/20"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-white/80 text-sm">Password</Label>
            <Input
              type="password"
              placeholder="At least 6 characters"
              className="h-12 bg-white/[0.07] border-white/10 text-white placeholder:text-white/30 focus:border-primary/50 focus:ring-primary/20"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-white/40 text-sm">Disabled</Label>
            <Input
              disabled
              placeholder="Cannot edit"
              className="h-12 bg-white/[0.03] border-white/5 text-white/30 placeholder:text-white/15"
            />
          </div>
        </div>
      </DemoCard>
    </SectionWrapper>
  );
}
