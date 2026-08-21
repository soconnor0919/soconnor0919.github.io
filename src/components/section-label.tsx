import { cn } from "~/lib/utils";

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-muted-foreground text-xs font-semibold tracking-widest uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}
