import { Separator } from "@/components/ui/separator";
import { SectionWrapper } from "../shared/SectionWrapper";
import { DemoCard } from "../shared/DemoCard";

export function SeparatorShowcase() {
  return (
    <SectionWrapper
      id="separator"
      title="Separator"
      description="Visual divider using the border color token. Supports horizontal (default) and vertical orientations."
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <DemoCard label="Horizontal">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Section A</p>
              <p className="text-xs text-muted-foreground mt-1">Content above the separator</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm font-medium">Section B</p>
              <p className="text-xs text-muted-foreground mt-1">Content below the separator</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm font-medium">Section C</p>
              <p className="text-xs text-muted-foreground mt-1">Another separated block</p>
            </div>
          </div>
        </DemoCard>

        <DemoCard label="Vertical">
          <div className="flex items-center gap-4 h-20">
            <div className="text-center">
              <p className="text-2xl font-bold font-mono">12</p>
              <p className="text-xs text-muted-foreground mt-1">Transactions</p>
            </div>
            <Separator orientation="vertical" />
            <div className="text-center">
              <p className="text-2xl font-bold font-mono">$1.2k</p>
              <p className="text-xs text-muted-foreground mt-1">Total sent</p>
            </div>
            <Separator orientation="vertical" />
            <div className="text-center">
              <p className="text-2xl font-bold font-mono">3</p>
              <p className="text-xs text-muted-foreground mt-1">Cards saved</p>
            </div>
          </div>
        </DemoCard>
      </div>
    </SectionWrapper>
  );
}
