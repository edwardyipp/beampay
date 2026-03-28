import { Badge } from "@/components/ui/badge";
import { SectionWrapper } from "../shared/SectionWrapper";
import { DemoCard } from "../shared/DemoCard";
import { Separator } from "@/components/ui/separator";
import { Check, Clock, X, AlertCircle, Info } from "lucide-react";

const variants = ["default", "secondary", "outline", "destructive", "ghost", "link"] as const;

export function BadgeShowcase() {
  return (
    <SectionWrapper
      id="badge"
      title="Badge"
      description="Pill-shaped status indicators. 6 variants from the design system plus semantic colors for transaction and system states."
    >
      {/* All Variants */}
      <DemoCard label="Variants">
        <div className="flex flex-wrap gap-3">
          {variants.map((v) => (
            <div key={v} className="flex flex-col items-center gap-2">
              <Badge variant={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</Badge>
              <span className="text-[10px] font-mono text-muted-foreground">{v}</span>
            </div>
          ))}
        </div>
      </DemoCard>

      <Separator />

      {/* Semantic Badges */}
      <DemoCard label="Semantic Status Badges">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400">
              <Check className="w-3 h-3 mr-1" />Completed
            </Badge>
            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400">
              <Clock className="w-3 h-3 mr-1" />Pending
            </Badge>
            <Badge className="bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400">
              <X className="w-3 h-3 mr-1" />Failed
            </Badge>
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400">
              <Info className="w-3 h-3 mr-1" />Info
            </Badge>
            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400">
              <AlertCircle className="w-3 h-3 mr-1" />Warning
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Semantic badges use fixed colors (not theme tokens) so they remain recognizable in both light and dark mode.
          </p>
        </div>
      </DemoCard>

      <Separator />

      {/* Usage in context */}
      <DemoCard label="In Context — Transaction List">
        <div className="space-y-3 max-w-sm">
          {[
            { label: "Coffee Shop · $4.50", badge: "Completed", badgeClass: "bg-green-100 text-green-700" },
            { label: "Transfer to Alex · $50.00", badge: "Pending", badgeClass: "bg-amber-100 text-amber-700" },
            { label: "Subscription · $9.99", badge: "Failed", badgeClass: "bg-red-100 text-red-700" },
          ].map(({ label, badge, badgeClass }) => (
            <div key={label} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
              <span className="text-sm text-foreground">{label}</span>
              <Badge className={badgeClass}>{badge}</Badge>
            </div>
          ))}
        </div>
      </DemoCard>
    </SectionWrapper>
  );
}
