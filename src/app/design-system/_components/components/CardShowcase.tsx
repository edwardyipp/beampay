import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { SectionWrapper } from "../shared/SectionWrapper";
import { DemoCard } from "../shared/DemoCard";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings } from "lucide-react";

export function CardShowcase() {
  return (
    <SectionWrapper
      id="card"
      title="Card"
      description="rounded-xl surface container. Sub-components: CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter."
    >
      {/* Anatomy */}
      <DemoCard label="Card Anatomy">
        <div className="grid sm:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>CardDescription — supporting text below the title</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">CardContent — the primary body area for any content.</p>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-muted-foreground">CardFooter — metadata or actions</p>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>With CardAction</CardTitle>
              <CardDescription>Action placed in top-right via CardAction</CardDescription>
              <CardAction>
                <Button size="icon-sm" variant="ghost"><Settings /></Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">CardAction renders in the top-right corner of the header.</p>
            </CardContent>
          </Card>
        </div>
      </DemoCard>

      <Separator />

      {/* Variants */}
      <DemoCard label="Styled Variants">
        <div className="grid sm:grid-cols-3 gap-4">
          {/* Standard */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Standard Card</CardTitle>
              <CardDescription>bg-card with border</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Default shadow-sm and rounded-xl.</p>
            </CardContent>
          </Card>

          {/* Muted */}
          <Card className="bg-muted border-0">
            <CardHeader>
              <CardTitle className="text-base">Muted Card</CardTitle>
              <CardDescription>bg-muted, no border</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Used for secondary information panels.</p>
            </CardContent>
          </Card>

          {/* Neon gradient */}
          <Card className="bg-gradient-to-br from-neon-300 to-neon-400 border-0 text-neon-950">
            <CardHeader>
              <CardTitle className="text-base text-neon-950">Neon Card</CardTitle>
              <CardDescription className="text-neon-950/60">from-neon-300 to-neon-400</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-neon-950/70 text-sm">Used for BalanceCard — always light mode styling.</p>
            </CardContent>
          </Card>
        </div>
      </DemoCard>

      <Separator />

      {/* Complex card example */}
      <DemoCard label="Real-World Example — Account Summary">
        <div className="max-w-sm">
          <Card>
            <CardHeader>
              <CardTitle>John Doe</CardTitle>
              <CardDescription>john@example.com</CardDescription>
              <CardAction>
                <Badge variant="secondary">Verified</Badge>
              </CardAction>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Balance</span>
                <span className="font-semibold font-mono">$1,234.56</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Currency</span>
                <span className="font-medium">USD</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Saved cards</span>
                <span className="font-medium">2</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">View Transactions</Button>
            </CardFooter>
          </Card>
        </div>
      </DemoCard>
    </SectionWrapper>
  );
}
