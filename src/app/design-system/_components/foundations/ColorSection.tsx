import { SectionWrapper } from "../shared/SectionWrapper";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const neonScale = [
  { step: "50", hex: "#FCFFE5", dark: false },
  { step: "100", hex: "#F6FFC7", dark: false },
  { step: "200", hex: "#ECFF95", dark: false },
  { step: "300", hex: "#D9FF51", dark: false, brand: true },
  { step: "400", hex: "#C6F625", dark: false },
  { step: "500", hex: "#A7DD05", dark: false },
  { step: "600", hex: "#81B100", dark: true },
  { step: "700", hex: "#618605", dark: true },
  { step: "800", hex: "#4E690B", dark: true },
  { step: "900", hex: "#41590E", dark: true },
  { step: "950", hex: "#213201", dark: true },
];

const themeTokens = [
  { token: "background", class: "bg-background", border: true, desc: "Page background" },
  { token: "foreground", class: "bg-foreground", desc: "Primary text" },
  { token: "card", class: "bg-card", border: true, desc: "Card surface" },
  { token: "card-foreground", class: "bg-card-foreground", desc: "Card text" },
  { token: "primary", class: "bg-primary", desc: "Brand primary" },
  { token: "primary-foreground", class: "bg-primary-foreground", border: true, desc: "Primary text" },
  { token: "secondary", class: "bg-secondary", border: true, desc: "Secondary surface" },
  { token: "muted", class: "bg-muted", border: true, desc: "Muted surface" },
  { token: "muted-foreground", class: "bg-muted-foreground", desc: "Subdued text" },
  { token: "accent", class: "bg-accent", border: true, desc: "Accent surface" },
  { token: "destructive", class: "bg-destructive", desc: "Error / danger" },
  { token: "border", class: "bg-border", border: true, desc: "Borders" },
  { token: "ring", class: "bg-ring", desc: "Focus ring" },
];

const semanticColors = [
  { label: "Success", swatch: "bg-green-500", chip: "bg-green-100 text-green-700", usage: "Completed, confirmations" },
  { label: "Info", swatch: "bg-blue-500", chip: "bg-blue-100 text-blue-700", usage: "Card labels, info states" },
  { label: "Warning", swatch: "bg-amber-500", chip: "bg-amber-100 text-amber-700", usage: "Pending, alerts" },
  { label: "Destructive", swatch: "bg-red-500", chip: "bg-red-100 text-red-700", usage: "Errors, delete actions" },
];

function TokenGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {themeTokens.map(({ token, class: cls, border, desc }) => (
        <div key={token} className="flex items-center gap-3">
          <div
            className={cn("w-10 h-10 rounded-lg flex-shrink-0", cls, border && "border border-border")}
          />
          <div className="min-w-0">
            <p className="text-xs font-medium text-foreground truncate">{token}</p>
            <p className="text-[11px] text-muted-foreground truncate">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ColorSection() {
  return (
    <SectionWrapper
      id="color"
      title="Color"
      description="The neon lime scale is BeamPay's signature palette — it powers the dark theme accent, BalanceCard gradient, and Pay button. Semantic tokens adapt between light and dark mode."
    >
      {/* Neon Scale */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-foreground">Neon Lime — Brand Scale</p>
          <span className="text-[11px] text-muted-foreground font-mono">bg-neon-{"{step}"}</span>
        </div>
        <div className="flex rounded-xl overflow-hidden border border-border">
          {neonScale.map(({ step, hex, dark: useDark, brand }) => (
            <div
              key={step}
              className={cn("flex-1 group relative", brand && "ring-2 ring-foreground ring-inset")}
              style={{ background: hex }}
              title={`neon-${step}: ${hex}`}
            >
              <div className="h-16 sm:h-20 w-full" />
              <div
                className={cn(
                  "absolute bottom-0 left-0 right-0 px-1 py-1 opacity-0 group-hover:opacity-100 transition-opacity text-center",
                  useDark ? "text-white/80" : "text-black/60"
                )}
              >
                <p className="text-[9px] font-mono leading-tight">{step}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Scale labels */}
        <div className="flex">
          {neonScale.map(({ step, hex, brand }) => (
            <div key={step} className={cn("flex-1 text-center", brand && "relative")}>
              {brand && (
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-[9px] font-bold text-foreground whitespace-nowrap">
                  ★ 300
                </span>
              )}
              <p className="text-[9px] text-muted-foreground font-mono">{step}</p>
              <p className="text-[8px] text-muted-foreground/60 font-mono hidden sm:block">{hex.slice(1)}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-4 h-4 rounded bg-neon-300 border border-border" />
            <span><span className="font-mono font-medium text-foreground">neon-300</span> — dark primary, Pay button, BalanceCard gradient</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-4 h-4 rounded bg-neon-950" />
            <span><span className="font-mono font-medium text-foreground">neon-950</span> — primary-foreground in dark mode</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Theme Tokens — Current Theme */}
      <div className="space-y-4">
        <p className="text-sm font-semibold text-foreground">Theme Tokens — Current Theme</p>
        <p className="text-xs text-muted-foreground -mt-2">Toggle the theme in the header to compare light and dark values.</p>
        <TokenGrid />
      </div>

      {/* Always-dark preview */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-foreground">Dark Mode Tokens</p>
        <div className="dark rounded-xl overflow-hidden border border-white/10">
          <div className="bg-background p-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {themeTokens.map(({ token, class: cls, border, desc }) => (
                <div key={token} className="flex items-center gap-3">
                  <div
                    className={cn("w-10 h-10 rounded-lg flex-shrink-0", cls, border && "border border-border")}
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{token}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Semantic Colors */}
      <div className="space-y-4">
        <p className="text-sm font-semibold text-foreground">Semantic Colors</p>
        <p className="text-xs text-muted-foreground -mt-2">Fixed regardless of theme — used for transaction status, alerts, and destructive actions.</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {semanticColors.map(({ label, swatch, chip, usage }) => (
            <div key={label} className="space-y-2">
              <div className={cn("h-12 rounded-lg", swatch)} />
              <div>
                <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium", chip)}>
                  {label}
                </span>
                <p className="text-[11px] text-muted-foreground mt-1">{usage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
