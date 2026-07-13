"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

import { motion } from "framer-motion";

export function KeffiyehDivider() {
  return (
    <div className="keffiyeh-divider my-12 sm:my-14" aria-hidden>
      <motion.svg 
        viewBox="0 0 240 16" 
        className="h-4 w-48 text-foreground" 
        preserveAspectRatio="none"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        transition={{ staggerChildren: 0.2 }}
      >
        <motion.rect 
          x="0" y="2" width="240" height="2" 
          fill="var(--color-tatreez-red)" opacity="0.9" 
          variants={{
            hidden: { width: 0 },
            visible: { width: 240, transition: { duration: 1, ease: "easeInOut" } }
          }}
        />
        <motion.rect 
          x="0" y="7" width="240" height="3" 
          fill="currentColor" opacity="0.8" 
          variants={{
            hidden: { width: 0 },
            visible: { width: 240, transition: { duration: 1.2, ease: "easeInOut" } }
          }}
        />
        <motion.rect 
          x="0" y="13" width="240" height="1.5" 
          fill="var(--color-tatreez-green)" opacity="0.9" 
          variants={{
            hidden: { width: 0 },
            visible: { width: 240, transition: { duration: 0.8, ease: "easeInOut" } }
          }}
        />
      </motion.svg>
    </div>
  );
}

export const YarnDivider = KeffiyehDivider;

export function CrochetHoop({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("crochet-hoop relative w-fit", className)}>
      <div className="hoop-outer rounded-full p-[3px]">
        <div className="hoop-inner rounded-full p-[2px]">
          <div className="overflow-hidden rounded-full">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function CrochetCard({
  children,
  className,
  swatch,
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  swatch?: "solid" | "stripe" | "mesh";
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "crochet-card rounded-lg",
        swatch === "solid" && "swatch-solid",
        swatch === "stripe" && "swatch-stripe",
        swatch === "mesh" && "swatch-mesh",
        hover && "crochet-card-hover",
        className
      )}
    >
      {children}
    </div>
  );
}

export const TatreezDivider = KeffiyehDivider;
export const TatreezFrame = CrochetHoop;
export const TatreezCard = CrochetCard;
