import * as React from "react";
import { cn } from "@/lib/utils";

interface NeuCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "flat" | "pressed" | "convex";
}

export function NeuCard({ children, className, variant = "flat", ...props }: NeuCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl transition-all duration-300",
        "bg-[var(--color-neu-base)] dark:bg-[var(--color-neu-base-dark)]",
        variant === "flat" && "neu-flat hover:translate-y-[-2px]",
        variant === "pressed" && "neu-pressed",
        variant === "convex" && "neu-convex",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Backward-compatible alias so existing imports keep working
export { NeuCard as GlassCard };
