import { SectionWrapper } from "../shared/SectionWrapper";
import { DemoCard } from "../shared/DemoCard";
import { Separator } from "@/components/ui/separator";
import {
  ArrowDownLeft, ArrowUpRight, X, House, Clock, ScanLine,
  ChevronLeft, ChevronRight, Moon, Sun, CreditCard, Send,
  Plus, Eye, EyeOff, Check, Lock, Settings, User, Palette,
  Shield, LogOut, Trash2, Mail, Camera, Copy, AlertCircle,
  ArrowLeft, Bell, Info,
} from "lucide-react";

const icons = [
  { Icon: ArrowDownLeft, name: "ArrowDownLeft", usage: "Top up / credit" },
  { Icon: ArrowUpRight, name: "ArrowUpRight", usage: "Send / debit" },
  { Icon: Send, name: "Send", usage: "Transfer action" },
  { Icon: CreditCard, name: "CreditCard", usage: "Payment cards" },
  { Icon: Plus, name: "Plus", usage: "Add / create" },
  { Icon: X, name: "X", usage: "Close / remove" },
  { Icon: Check, name: "Check", usage: "Success / confirm" },
  { Icon: ChevronLeft, name: "ChevronLeft", usage: "Back navigation" },
  { Icon: ChevronRight, name: "ChevronRight", usage: "Forward / reveal" },
  { Icon: ArrowLeft, name: "ArrowLeft", usage: "Page back button" },
  { Icon: Eye, name: "Eye", usage: "Show password" },
  { Icon: EyeOff, name: "EyeOff", usage: "Hide password" },
  { Icon: Lock, name: "Lock", usage: "Security / PIN" },
  { Icon: Shield, name: "Shield", usage: "Security settings" },
  { Icon: AlertCircle, name: "AlertCircle", usage: "Warnings / errors" },
  { Icon: Settings, name: "Settings", usage: "Settings page" },
  { Icon: User, name: "User", usage: "Profile / account" },
  { Icon: Mail, name: "Mail", usage: "Email fields" },
  { Icon: Camera, name: "Camera", usage: "Photo upload" },
  { Icon: Palette, name: "Palette", usage: "Appearance theme" },
  { Icon: Copy, name: "Copy", usage: "Clipboard copy" },
  { Icon: LogOut, name: "LogOut", usage: "Sign out" },
  { Icon: Trash2, name: "Trash2", usage: "Delete / remove" },
  { Icon: Moon, name: "Moon", usage: "Dark mode toggle" },
  { Icon: Sun, name: "Sun", usage: "Light mode toggle" },
  { Icon: House, name: "House", usage: "Home (BottomNav)" },
  { Icon: Clock, name: "Clock", usage: "Activities (BottomNav)" },
  { Icon: ScanLine, name: "ScanLine", usage: "Pay (BottomNav)" },
  { Icon: Bell, name: "Bell", usage: "Notifications" },
  { Icon: Info, name: "Info", usage: "Informational" },
];

const containerPatterns = [
  { bg: "bg-green-100", text: "text-green-600", label: "Success", Icon: ArrowDownLeft },
  { bg: "bg-blue-100", text: "text-blue-600", label: "Info", Icon: ArrowUpRight },
  { bg: "bg-red-100", text: "text-red-600", label: "Error", Icon: X },
  { bg: "bg-amber-100", text: "text-amber-600", label: "Warning", Icon: AlertCircle },
  { bg: "bg-muted", text: "text-muted-foreground", label: "Neutral", Icon: Settings },
  { bg: "bg-primary/10", text: "text-primary", label: "Primary", Icon: ScanLine },
];

export function IconographySection() {
  return (
    <SectionWrapper
      id="iconography"
      title="Iconography"
      description="Lucide React — consistent stroke-based icons at 1.5px weight. Used at 16px (small), 20px (standard), and 24px (prominent) sizes."
    >
      {/* Icon Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
        {icons.map(({ Icon, name, usage }) => (
          <div
            key={name}
            className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors group"
            title={usage}
          >
            <Icon className="w-5 h-5 text-foreground" />
            <p className="text-[10px] font-mono text-muted-foreground text-center leading-tight truncate w-full">{name}</p>
          </div>
        ))}
      </div>

      <Separator />

      {/* Icon Sizes */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-foreground">Icon Sizes</p>
        <DemoCard>
          <div className="flex flex-wrap gap-8">
            {[
              { label: "Small — 16px", size: "w-4 h-4", cls: "text-xs" },
              { label: "Default — 20px", size: "w-5 h-5", cls: "text-xs" },
              { label: "Prominent — 24px", size: "w-6 h-6", cls: "text-xs" },
              { label: "Large — 32px", size: "w-8 h-8", cls: "text-xs" },
            ].map(({ label, size }) => (
              <div key={label} className="flex flex-col items-center gap-3">
                <Settings className={size} />
                <p className="text-[11px] text-muted-foreground font-mono whitespace-nowrap">{label}</p>
              </div>
            ))}
          </div>
        </DemoCard>
      </div>

      <Separator />

      {/* Icon Containers */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-foreground">Icon Container Patterns</p>
        <p className="text-xs text-muted-foreground">Colored circle containers used for transaction types and contextual indicators.</p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {containerPatterns.map(({ bg, text, label, Icon }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${bg}`}>
                <Icon className={`w-5 h-5 ${text}`} />
              </div>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
