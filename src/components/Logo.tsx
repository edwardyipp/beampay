export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-bold bg-gradient-to-r from-primary to-blue-600 dark:to-primary-light bg-clip-text text-transparent ${className}`}>
      BeamPay
    </span>
  );
}
