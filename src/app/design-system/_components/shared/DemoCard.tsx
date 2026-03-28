import { cn } from "@/lib/utils";

interface DemoCardProps {
  label?: string;
  description?: string;
  /** Force dark mode styling inside this card */
  dark?: boolean;
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}

export function DemoCard({ label, description, dark, children, className, innerClassName }: DemoCardProps) {
  return (
    <div className={cn("rounded-xl border border-border overflow-hidden", className)}>
      {(label || description) && (
        <div className="px-5 py-3 border-b border-border bg-muted/30">
          {label && (
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">{label}</p>
          )}
          {description && (
            <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
          )}
        </div>
      )}
      {dark ? (
        <div className="dark">
          <div className={cn("bg-background p-6", innerClassName)}>{children}</div>
        </div>
      ) : (
        <div className={cn("p-6 bg-card", innerClassName)}>{children}</div>
      )}
    </div>
  );
}
