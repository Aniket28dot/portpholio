import * as React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border",
        "bg-white/40 dark:bg-zinc-900/40",
        "backdrop-blur-md backdrop-saturate-150",
        "border-white/20 dark:border-white/10",
        "shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]",
        "transition-all duration-300 hover:bg-white/50 dark:hover:bg-zinc-900/50 hover:shadow-lg hover:border-white/30",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent dark:from-white/5 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
