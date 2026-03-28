import { SectionWrapper } from "../shared/SectionWrapper";
import { DemoCard } from "../shared/DemoCard";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const typeScale = [
  { name: "Display", class: "text-4xl font-bold", size: "36px / font-bold", usage: "Page hero titles" },
  { name: "H1", class: "text-3xl font-bold", size: "30px / font-bold", usage: "Page section titles" },
  { name: "H2", class: "text-2xl font-semibold", size: "24px / font-semibold", usage: "Card headers" },
  { name: "H3", class: "text-xl font-semibold", size: "20px / font-semibold", usage: "Section sub-headings" },
  { name: "H4", class: "text-lg font-medium", size: "18px / font-medium", usage: "Balance amounts" },
  { name: "Body", class: "text-base", size: "16px / regular", usage: "Primary body text" },
  { name: "Small", class: "text-sm", size: "14px / regular", usage: "Descriptions, labels" },
  { name: "Caption", class: "text-xs text-muted-foreground", size: "12px / regular", usage: "Helper text, metadata" },
];

const weights = [
  { name: "Regular", weight: "400", class: "font-normal" },
  { name: "Medium", weight: "500", class: "font-medium" },
  { name: "Semibold", weight: "600", class: "font-semibold" },
  { name: "Bold", weight: "700", class: "font-bold" },
];

export function TypographySection() {
  return (
    <SectionWrapper
      id="typography"
      title="Typography"
      description="DM Sans for UI text — clean, geometric, and legible at all sizes. Geist Mono for code, IDs, amounts, and monospaced content."
    >
      {/* Font Families */}
      <div className="grid sm:grid-cols-2 gap-4">
        <DemoCard label="DM Sans — UI Font" description="font-sans / var(--font-dm-sans)">
          <div className="space-y-3">
            <p className="text-3xl font-bold">Aa Bb Cc</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
              abcdefghijklmnopqrstuvwxyz<br />
              0123456789 !@#$%^&*()
            </p>
            <p className="text-sm">BeamPay — Send money, fast.</p>
          </div>
        </DemoCard>
        <DemoCard label="Geist Mono — Monospace" description="font-mono / var(--font-geist-mono)">
          <div className="space-y-3">
            <p className="text-3xl font-bold font-mono">Aa Bb Cc</p>
            <p className="text-sm text-muted-foreground font-mono leading-relaxed">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
              abcdefghijklmnopqrstuvwxyz<br />
              0123456789 !@#$%^&*()
            </p>
            <p className="text-sm font-mono">$1,234.56 · Rp 19,506,480</p>
          </div>
        </DemoCard>
      </div>

      <Separator />

      {/* Type Scale */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-foreground">Type Scale</p>
        <div className="rounded-xl border border-border overflow-hidden">
          {typeScale.map(({ name, class: cls, size, usage }, i) => (
            <div
              key={name}
              className={cn(
                "flex items-baseline gap-6 px-5 py-4",
                i < typeScale.length - 1 && "border-b border-border"
              )}
            >
              <div className={cn("flex-1 min-w-0", cls)}>
                The quick brown fox
              </div>
              <div className="flex-shrink-0 text-right space-y-0.5 hidden sm:block">
                <p className="text-xs font-mono text-muted-foreground">{name}</p>
                <p className="text-[11px] font-mono text-muted-foreground/60">{size}</p>
              </div>
              <div className="flex-shrink-0 text-right hidden lg:block">
                <p className="text-[11px] text-muted-foreground">{usage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Font Weights */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-foreground">Font Weights</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {weights.map(({ name, weight, class: cls }) => (
            <DemoCard key={name} label={`${name} · ${weight}`}>
              <p className={cn("text-2xl text-foreground", cls)}>BeamPay</p>
              <p className="text-xs font-mono text-muted-foreground mt-2">{cls}</p>
            </DemoCard>
          ))}
        </div>
      </div>

      <Separator />

      {/* Mono usage */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-foreground">Monospace Usage</p>
        <div className="grid sm:grid-cols-3 gap-4">
          <DemoCard label="Currency Amounts">
            <p className="text-2xl font-bold font-mono text-foreground">$1,234.56</p>
            <p className="text-sm font-mono text-muted-foreground">Rp 19,506,480</p>
          </DemoCard>
          <DemoCard label="Transaction IDs">
            <p className="text-sm font-mono text-foreground">txn_abc123def456</p>
            <p className="text-xs font-mono text-muted-foreground mt-1">usr_9f8e7d6c5b4a</p>
          </DemoCard>
          <DemoCard label="Timestamps">
            <p className="text-sm font-mono text-foreground">2026-03-27</p>
            <p className="text-xs font-mono text-muted-foreground mt-1">14:32:07 UTC+7</p>
          </DemoCard>
        </div>
      </div>
    </SectionWrapper>
  );
}
