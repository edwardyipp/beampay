import { DemoCard } from "../shared/DemoCard";
import { SectionWrapper } from "../shared/SectionWrapper";
import { Separator } from "@/components/ui/separator";
import { Home, Clock, ScanLine } from "lucide-react";

function StaticBottomNavPill({ activeTab }: { activeTab: "home" | "pay" | "activities" }) {
  return (
    <div className="flex justify-center">
      <div
        className="relative flex items-center bg-white dark:bg-card rounded-[32px] p-1"
        style={{ boxShadow: "0px 8px 40px 0px rgba(0,0,0,0.12)", gap: "120px" }}
      >
        {/* Home */}
        <div
          className={`w-[92px] h-[54px] rounded-full flex flex-col justify-center items-center gap-0.5 transition-colors ${
            activeTab === "home" ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          <Home className="w-[22px] h-[22px]" />
          <span className="text-[12px] font-medium">Home</span>
        </div>

        {/* Activities */}
        <div
          className={`w-[92px] h-[54px] rounded-full flex flex-col justify-center items-center gap-0.5 transition-colors ${
            activeTab === "activities" ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          <Clock className="w-[22px] h-[22px]" />
          <span className="text-[12px] font-medium">Activities</span>
        </div>

        {/* Pay — absolute centered, slightly elevated */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "calc(50% - 5px)",
            transform: "translateX(-50%) translateY(-50%)",
          }}
        >
          <div className="pay-btn-wrapper">
            <div className="pay-btn-outer">
              <div className="pay-btn-inner">
                <ScanLine className="w-[32px] h-[32px]" />
                <span className="text-[12px] font-medium leading-4">Pay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BottomNavDemo() {
  return (
    <SectionWrapper
      id="bottom-nav"
      title="Bottom Navigation"
      description="Floating pill navigation fixed to the viewport bottom. The Pay button is elevated above the pill with a 3-layer CSS gradient architecture."
    >
      {/* Three active states */}
      <DemoCard label="Active States">
        <div className="space-y-6">
          {(["home", "activities"] as const).map((tab) => (
            <div key={tab} className="space-y-2">
              <p className="text-xs font-mono text-muted-foreground capitalize">{tab} active</p>
              <div className="bg-muted/30 rounded-xl py-4">
                <StaticBottomNavPill activeTab={tab} />
              </div>
            </div>
          ))}
        </div>
      </DemoCard>

      <Separator />

      {/* Dark variant */}
      <DemoCard label="Dark Mode" dark>
        <div className="bg-background rounded-xl py-4">
          <StaticBottomNavPill activeTab="home" />
        </div>
      </DemoCard>

      <Separator />

      {/* CSS architecture notes */}
      <div className="rounded-xl border border-border bg-muted/30 p-5 space-y-3">
        <p className="text-sm font-semibold text-foreground">Pay Button CSS Architecture</p>
        <div className="space-y-2 text-xs text-muted-foreground font-mono">
          <p><span className="text-foreground">.pay-btn-wrapper</span> — outer ring, gray gradient light / dark-card dark</p>
          <p><span className="text-foreground">.pay-btn-outer</span> — lime border ring, #D9FF51→#81B700 gradient</p>
          <p><span className="text-foreground">.pay-btn-inner</span> — inner lime gradient, icon + label at #415C0B</p>
          <p className="text-muted-foreground/60 pt-1">Uses 3 nested divs to achieve the layered glow effect</p>
        </div>
      </div>
    </SectionWrapper>
  );
}
