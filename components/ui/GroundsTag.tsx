import { cn } from "@/lib/utils";

type GroundsTagProps = {
  children: React.ReactNode;
  className?: string;
};

/** A boxed mono category label used in the Grounds column and its key. */
export function GroundsTag({ children, className }: GroundsTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-gold/30 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-gold/80",
        className,
      )}
    >
      {children}
    </span>
  );
}
