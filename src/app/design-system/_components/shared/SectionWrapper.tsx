import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionWrapper({ id, title, description, children, className }: SectionWrapperProps) {
  return (
    <section id={id} className={cn("space-y-6", className)}>
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground mt-1.5 max-w-2xl leading-relaxed">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}
