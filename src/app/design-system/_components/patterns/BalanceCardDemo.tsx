import { BalanceCard } from "@/components/BalanceCard";
import { DemoCard } from "../shared/DemoCard";
import { SectionWrapper } from "../shared/SectionWrapper";
import { Separator } from "@/components/ui/separator";

const currencies = [
  { currency: "USD", balance: 1250 },
  { currency: "EUR", balance: 890 },
  { currency: "SGD", balance: 2340 },
  { currency: "JPY", balance: 150000 },
];

export function BalanceCardDemo() {
  return (
    <SectionWrapper
      id="balance-card"
      title="Balance Card"
      description="3D tilt card with neon lime gradient. Responds to pointer position and device gyroscope. Always uses light-mode lime styling regardless of active theme."
    >
      <DemoCard label="Live Demo — Hover / tilt to see 3D effect">
        <div className="max-w-sm">
          <BalanceCard demo demoBalance={1250.75} demoCurrency="USD" />
        </div>
      </DemoCard>

      <Separator />

      {/* Currency variants */}
      <DemoCard label="Currency Variants">
        <div className="grid sm:grid-cols-2 gap-4">
          {currencies.map(({ currency, balance }) => (
            <BalanceCard key={currency} demo demoBalance={balance} demoCurrency={currency} />
          ))}
        </div>
      </DemoCard>

      <Separator />

      {/* Technical notes */}
      <div className="rounded-xl border border-border bg-muted/30 p-5 space-y-3">
        <p className="text-sm font-semibold text-foreground">Implementation Notes</p>
        <div className="space-y-2 text-xs text-muted-foreground">
          <p>• <span className="font-mono text-foreground">demo={`{true}`}</span> prop bypasses WalletContext — use in non-authenticated contexts</p>
          <p>• <span className="font-mono text-foreground">demoBalance</span> + <span className="font-mono text-foreground">demoCurrency</span> set the displayed values</p>
          <p>• Tilt uses <span className="font-mono text-foreground">pointer events</span> + <span className="font-mono text-foreground">DeviceOrientationEvent</span> (requires permission on iOS)</p>
          <p>• Always uses inline <span className="font-mono text-foreground">from-neon-300 to-neon-400</span> gradient — not affected by dark mode</p>
          <p>• IDR conversion: <span className="font-mono text-foreground">convertUsdToIdr()</span> at static 15,800 rate</p>
        </div>
      </div>
    </SectionWrapper>
  );
}
