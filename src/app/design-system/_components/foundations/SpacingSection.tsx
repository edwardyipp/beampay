import { SectionWrapper } from "../shared/SectionWrapper";
import { DemoCard } from "../shared/DemoCard";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const spacingScale = [
  { name: "4px", class: "h-1", tailwind: "space-y-1 / gap-1", usage: "Inline gap between labels and inputs" },
  { name: "8px", class: "h-2", tailwind: "space-y-2 / gap-2", usage: "Between small related items" },
  { name: "12px", class: "h-3", tailwind: "space-y-3 / gap-3", usage: "Between form fields (tight)" },
  { name: "16px", class: "h-4", tailwind: "space-y-4 / gap-4", usage: "Between form elements" },
  { name: "20px", class: "h-5", tailwind: "space-y-5 / gap-5", usage: "Content sections (tight)" },
  { name: "24px", class: "h-6", tailwind: "space-y-6 / gap-6", usage: "Between sections, card padding" },
  { name: "32px", class: "h-8", tailwind: "space-y-8 / gap-8", usage: "Major section breaks" },
  { name: "40px", class: "h-10", tailwind: "space-y-10 / gap-10", usage: "Page-level top spacing" },
];

const radiiTokens = [
  { name: "radius-sm", value: "6px", class: "rounded-sm", usage: "Small chips" },
  { name: "radius-md", value: "8px", class: "rounded-md", usage: "Small cards" },
  { name: "radius-lg", value: "10px", class: "rounded-lg", usage: "Default" },
  { name: "radius-xl", value: "14px", class: "rounded-xl", usage: "Cards, inputs" },
  { name: "radius-2xl", value: "18px", class: "rounded-2xl", usage: "Large cards" },
  { name: "radius-3xl", value: "22px", class: "rounded-3xl", usage: "Modals" },
  { name: "radius-4xl", value: "26px", class: "rounded-4xl", usage: "Sheets" },
  { name: "full", value: "9999px", class: "rounded-full", usage: "Buttons, badges, pills" },
];

const touchTargets = [
  { name: "xs", height: "h-6", px: "24px", class: "text-xs", usage: "Inline tags" },
  { name: "sm", height: "h-8", px: "32px", class: "text-sm", usage: "Small buttons" },
  { name: "default", height: "h-12", px: "48px", class: "text-[15px] font-semibold", usage: "Standard (inputs, buttons)" },
];

export function SpacingSection() {
  return (
    <SectionWrapper
      id="spacing"
      title="Spacing & Radius"
      description="8px base spacing unit with a consistent rhythm. Touch targets default to 48px (h-12) for mobile-first accessibility. All interactive elements use rounded-full (pills) or rounded-xl."
    >
      {/* Spacing Scale */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-foreground">Spacing Scale</p>
        <div className="rounded-xl border border-border overflow-hidden">
          {spacingScale.map(({ name, class: cls, tailwind, usage }, i) => (
            <div
              key={name}
              className={cn(
                "flex items-center gap-4 px-5 py-3",
                i < spacingScale.length - 1 && "border-b border-border"
              )}
            >
              <div className="w-32 flex-shrink-0 flex items-end gap-2">
                <div className={cn("w-full bg-primary/40 rounded-full", cls)} />
              </div>
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <span className="text-sm font-mono font-medium text-foreground w-10 flex-shrink-0">{name}</span>
                <span className="text-xs font-mono text-muted-foreground hidden sm:block">{tailwind}</span>
                <span className="text-xs text-muted-foreground hidden lg:block">{usage}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Border Radius */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-foreground">Border Radius Tokens</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {radiiTokens.map(({ name, value, class: cls, usage }) => (
            <div key={name} className="flex items-start gap-3 p-3 rounded-xl border border-border bg-card">
              <div className={cn("w-10 h-10 bg-primary/20 border-2 border-primary/40 flex-shrink-0", cls)} />
              <div className="min-w-0">
                <p className="text-xs font-mono font-medium text-foreground">{name}</p>
                <p className="text-[11px] font-mono text-muted-foreground">{value}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{usage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Touch Targets */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-foreground">Touch Targets</p>
        <p className="text-xs text-muted-foreground">All interactive elements meet or exceed WCAG 2.5.5 minimum 44px target size.</p>
        <DemoCard>
          <div className="flex flex-wrap items-end gap-4">
            {touchTargets.map(({ name, height, px, class: cls, usage }) => (
              <div key={name} className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "rounded-full bg-primary/20 border-2 border-primary/30 flex items-center justify-center px-5",
                    height, cls
                  )}
                >
                  <span className="text-muted-foreground">Aa</span>
                </div>
                <div className="text-center">
                  <p className="text-[11px] font-mono text-foreground">{name}</p>
                  <p className="text-[10px] text-muted-foreground">{px}</p>
                  <p className="text-[10px] text-muted-foreground">{usage}</p>
                </div>
              </div>
            ))}

            {/* Measurement indicator */}
            <div className="flex-1 min-w-[120px]">
              <div className="bg-muted rounded-xl p-3 space-y-1.5">
                <p className="text-[11px] font-semibold text-foreground">Standard: h-12</p>
                <p className="text-[11px] text-muted-foreground">48px height for all primary buttons and text inputs. Ensures comfortable touch targets on mobile.</p>
              </div>
            </div>
          </div>
        </DemoCard>
      </div>
    </SectionWrapper>
  );
}
