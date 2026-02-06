export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent ${className}`}>
      BeamPay
    </span>
  );
}
