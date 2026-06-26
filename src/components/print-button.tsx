"use client";

import type { ComponentProps } from "react";
import { Printer } from "lucide-react";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

type PrintButtonProps = {
  className?: string;
  size?: ComponentProps<typeof Button>["size"];
};

export function PrintButton({ className, size }: PrintButtonProps) {
  return (
    <Button
      type="button"
      size={size}
      onClick={() => window.print()}
      className={cn("print-hidden", className)}
    >
      <Printer className="size-4" />
      Print PDF
    </Button>
  );
}
