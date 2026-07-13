import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-2xl",
        hover && "transition-all duration-300 hover:border-white/15 hover:shadow-lg dark:hover:border-white/15",
        className
      )}
    >
      {children}
    </div>
  );
}
