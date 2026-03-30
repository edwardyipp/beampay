import { Button } from "@/components/ui/button";
import { SectionWrapper } from "../shared/SectionWrapper";
import { DemoCard } from "../shared/DemoCard";
import { Separator } from "@/components/ui/separator";
import { Send, Plus, X, Settings, ArrowUpRight } from "lucide-react";

const variants = ["primary", "secondary", "outline", "ghost", "destructive", "link"] as const;
const variantLabels: Record<string, string> = {
  primary: "Primary",
  secondary: "Secondary",
  outline: "Outline",
  ghost: "Ghost",
  destructive: "Destructive",
  link: "Link",
};

export function ButtonShowcase() {
  return (
    <SectionWrapper
      id="button"
      title="Button"
      description="Pill-shaped (rounded-full) at all sizes. 6 semantic variants, 8 size options. Active press gives 2% scale-down feedback."
    >
      {/* All Variants */}
      <DemoCard label="Variants">
        <div className="flex flex-wrap gap-3">
          {variants.map((v) => (
            <Button key={v} variant={v}>{variantLabels[v]}</Button>
          ))}
        </div>
      </DemoCard>

      {/* Sizes */}
      <DemoCard label="Text Button Sizes">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <Button size="xs">Extra Small</Button>
            <span className="text-[10px] font-mono text-muted-foreground">xs · 24px</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button size="sm">Small</Button>
            <span className="text-[10px] font-mono text-muted-foreground">sm · 30px</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button size="md">Medium</Button>
            <span className="text-[10px] font-mono text-muted-foreground">md · 42px</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button size="lg">Large</Button>
            <span className="text-[10px] font-mono text-muted-foreground">lg · 56px</span>
          </div>
        </div>
      </DemoCard>

      {/* Icon Buttons */}
      <DemoCard label="Icon Button Sizes">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <Button size="icon-xs"><Plus /></Button>
            <span className="text-[10px] font-mono text-muted-foreground">icon-xs · 24px</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button size="icon-sm"><Plus /></Button>
            <span className="text-[10px] font-mono text-muted-foreground">icon-sm · 30px</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button size="icon-md"><Settings /></Button>
            <span className="text-[10px] font-mono text-muted-foreground">icon · 42px</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button size="icon-lg"><ArrowUpRight /></Button>
            <span className="text-[10px] font-mono text-muted-foreground">icon-lg · 56px</span>
          </div>
        </div>
      </DemoCard>

      {/* States */}
      <DemoCard label="States">
        <div className="flex flex-wrap gap-3">
          <div className="flex flex-col items-center gap-2">
            <Button>Default</Button>
            <span className="text-[10px] text-muted-foreground">Default</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button disabled>Disabled</Button>
            <span className="text-[10px] text-muted-foreground">Disabled</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button variant="outline" disabled>Disabled</Button>
            <span className="text-[10px] text-muted-foreground">Outline Disabled</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button variant="destructive">Delete Account</Button>
            <span className="text-[10px] text-muted-foreground">Destructive</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button variant="destructive" disabled>Disabled</Button>
            <span className="text-[10px] text-muted-foreground">Destructive Disabled</span>
          </div>
        </div>
      </DemoCard>

      {/* Full-width CTA */}
      <DemoCard label="Full-Width CTA — Light Context">
        <div className="max-w-sm space-y-3">
          <Button className="w-full">Save Changes</Button>
          <Button className="w-full" variant="outline">Cancel</Button>
          <Button className="w-full" disabled>Processing...</Button>
        </div>
      </DemoCard>

      {/* Dark context CTA */}
      <DemoCard label="Full-Width CTA — Dark Context (Signup / Auth flow)" dark>
        <div className="max-w-sm space-y-3">
          <Button className="w-full">Continue</Button>
          <Button disabled className="w-full">Disabled</Button>
          <div className="w-full h-[42px] rounded-full bg-white/10 flex items-center justify-center text-[15px] font-semibold text-white cursor-pointer hover:bg-white/15 transition-colors">
            Secondary Dark
          </div>
        </div>
      </DemoCard>

      <Separator />

      {/* With Icons */}
      <DemoCard label="Buttons with Icons">
        <div className="flex flex-wrap gap-3">
          <Button><Send className="w-4 h-4 mr-1.5" />Send Money</Button>
          <Button variant="outline"><Plus className="w-4 h-4 mr-1.5" />Add Card</Button>
          <Button variant="secondary"><Settings className="w-4 h-4 mr-1.5" />Settings</Button>
          <Button variant="destructive"><X className="w-4 h-4 mr-1.5" />Delete</Button>
        </div>
      </DemoCard>
    </SectionWrapper>
  );
}
