import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SectionWrapper } from "../shared/SectionWrapper";
import { DemoCard } from "../shared/DemoCard";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export function TabsShowcase() {
  return (
    <SectionWrapper
      id="tabs"
      title="Tabs"
      description="Content organizer with two visual variants: default (muted bg pill) and line (underline indicator). Supports horizontal and vertical orientations."
    >
      {/* Default variant */}
      <DemoCard label="Default Variant — Filled Background">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-4">
            <div className="bg-muted/40 rounded-xl p-4 text-sm text-muted-foreground">
              Overview tab content — balance summary, recent activity, quick actions.
            </div>
          </TabsContent>
          <TabsContent value="transactions" className="mt-4">
            <div className="bg-muted/40 rounded-xl p-4 text-sm text-muted-foreground">
              Transactions tab content — list of all payments and top-ups.
            </div>
          </TabsContent>
          <TabsContent value="cards" className="mt-4">
            <div className="bg-muted/40 rounded-xl p-4 text-sm text-muted-foreground">
              Cards tab content — saved payment methods.
            </div>
          </TabsContent>
        </Tabs>
      </DemoCard>

      <Separator />

      {/* Line variant */}
      <DemoCard label="Line Variant — Underline Indicator">
        <Tabs defaultValue="all">
          <TabsList variant="line">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="sent">Sent</TabsTrigger>
            <TabsTrigger value="received">Received</TabsTrigger>
            <TabsTrigger value="topup">Top Up</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <div className="space-y-2">
              {["Coffee · $4.50", "Transfer to Alex · $50.00", "Top up · +$100.00"].map((item) => (
                <div key={item} className="flex items-center justify-between p-3 rounded-xl bg-muted/40 text-sm">
                  <span>{item}</span>
                  <Badge variant="secondary">Completed</Badge>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="sent" className="mt-4">
            <div className="bg-muted/40 rounded-xl p-4 text-sm text-muted-foreground">Sent transactions only.</div>
          </TabsContent>
          <TabsContent value="received" className="mt-4">
            <div className="bg-muted/40 rounded-xl p-4 text-sm text-muted-foreground">Received transactions only.</div>
          </TabsContent>
          <TabsContent value="topup" className="mt-4">
            <div className="bg-muted/40 rounded-xl p-4 text-sm text-muted-foreground">Top-up history only.</div>
          </TabsContent>
        </Tabs>
      </DemoCard>

      <Separator />

      {/* Pill-shaped custom (matching this design system's own tabs) */}
      <DemoCard label="Pill-Shaped Tabs (BeamPay style)">
        <Tabs defaultValue="foundation">
          <TabsList className="rounded-full h-10 px-1">
            <TabsTrigger value="foundation" className="rounded-full px-5">Foundation</TabsTrigger>
            <TabsTrigger value="components" className="rounded-full px-5">Components</TabsTrigger>
            <TabsTrigger value="patterns" className="rounded-full px-5">Patterns</TabsTrigger>
          </TabsList>
          <TabsContent value="foundation" className="mt-4">
            <div className="bg-muted/40 rounded-xl p-4 text-sm text-muted-foreground">
              This is the style used for this design system page&apos;s own navigation.
            </div>
          </TabsContent>
          <TabsContent value="components" className="mt-4">
            <div className="bg-muted/40 rounded-xl p-4 text-sm text-muted-foreground">Components tab content.</div>
          </TabsContent>
          <TabsContent value="patterns" className="mt-4">
            <div className="bg-muted/40 rounded-xl p-4 text-sm text-muted-foreground">Patterns tab content.</div>
          </TabsContent>
        </Tabs>
      </DemoCard>

      <Separator />

      {/* With disabled tab */}
      <DemoCard label="With Disabled Tab">
        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
            <TabsTrigger value="another">Another</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="mt-4">
            <div className="bg-muted/40 rounded-xl p-4 text-sm text-muted-foreground">
              Active tab. The middle tab is disabled and cannot be selected.
            </div>
          </TabsContent>
          <TabsContent value="another" className="mt-4">
            <div className="bg-muted/40 rounded-xl p-4 text-sm text-muted-foreground">Another tab.</div>
          </TabsContent>
        </Tabs>
      </DemoCard>
    </SectionWrapper>
  );
}
