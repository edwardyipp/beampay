import { DemoCard } from "../shared/DemoCard";
import { SectionWrapper } from "../shared/SectionWrapper";
import { ArrowLeft, Moon, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Static demo version — no useAuth dependency */
function MockPageHeader({
  mode,
}: {
  mode: "avatar" | "title-back" | "title-only";
}) {
  if (mode === "avatar") {
    return (
      <div className="flex items-center justify-between py-4 px-5 bg-card border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
            JD
          </div>
          <span className="font-semibold text-sm text-foreground">John</span>
        </div>
        <Button size="icon-md" variant="ghost">
          <Moon className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  if (mode === "title-back") {
    return (
      <div className="flex items-center gap-3 py-4 px-5 bg-card border-b border-border">
        <Button size="icon-sm" variant="ghost" className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-base font-semibold text-foreground">Settings</h1>
      </div>
    );
  }

  // title-only
  return (
    <div className="py-4 px-5 bg-card border-b border-border">
      <h1 className="text-base font-semibold text-foreground">Activities</h1>
    </div>
  );
}

export function PageHeaderDemo() {
  return (
    <SectionWrapper
      id="page-header"
      title="Page Header"
      description="Three modes: Avatar (dashboard), Title + Back arrow (settings sub-pages), Title only (top-level pages). The theme toggle only appears in avatar mode."
    >
      <div className="grid gap-4">
        {/* Avatar mode */}
        <DemoCard label="Avatar Mode — Dashboard">
          <div className="space-y-3">
            <MockPageHeader mode="avatar" />
            <p className="text-xs text-muted-foreground">Shows initials, first name, and optional theme toggle (showThemeToggle prop). Links to /settings.</p>
          </div>
        </DemoCard>

        {/* Title + back */}
        <DemoCard label="Title + Back Mode — Settings Sub-pages">
          <div className="space-y-3">
            <MockPageHeader mode="title-back" />
            <p className="text-xs text-muted-foreground">Round back button + page title. Used on /settings/* sub-pages. backHref prop controls destination.</p>
          </div>
        </DemoCard>

        {/* Title only */}
        <DemoCard label="Title Only Mode — Top-level Pages">
          <div className="space-y-3">
            <MockPageHeader mode="title-only" />
            <p className="text-xs text-muted-foreground">Plain title without navigation. Used on /transactions and /settings hub.</p>
          </div>
        </DemoCard>
      </div>

      {/* Settings menu item */}
      <div className="rounded-xl border border-border bg-muted/30 p-5 space-y-3">
        <p className="text-sm font-semibold text-foreground">SettingsPageWrapper</p>
        <p className="text-xs text-muted-foreground">
          Wraps all settings sub-pages with auth check, PageHeader (title + backHref), slide-in animation from right, and{" "}
          <span className="font-mono text-foreground">max-w-md mx-auto px-5 pb-10</span> layout. No BottomNav.
        </p>
        <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
          <Button size="icon-sm" variant="ghost" className="rounded-full">
            <Settings className="w-4 h-4" />
          </Button>
          <div>
            <p className="text-xs font-medium text-foreground">Appearance</p>
            <p className="text-[11px] text-muted-foreground">Light, dark, or system theme</p>
          </div>
          <ArrowLeft className="w-5 h-5 text-muted-foreground ml-auto rotate-180" />
        </div>
      </div>
    </SectionWrapper>
  );
}
