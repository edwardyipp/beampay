import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-center gap-6 text-sm text-muted-foreground">
          <Link href="/design-system" className="hover:text-primary">
            Design System
          </Link>
          <Link href="/documentation" className="hover:text-primary">
            Documentation
          </Link>
        </div>
      </div>
    </footer>
  );
}
