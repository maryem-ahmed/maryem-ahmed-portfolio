"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThreadCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    let frameId: number;
    let idCounter = 0;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      setTrail((prev) => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: idCounter++ }];
        if (newTrail.length > 20) {
          return newTrail.slice(newTrail.length - 20);
        }
        return newTrail;
      });
    };

    const shrinkTrail = () => {
      setTrail((prev) => (prev.length > 0 ? prev.slice(1) : prev));
      frameId = requestAnimationFrame(shrinkTrail);
    };

    window.addEventListener("mousemove", updateMousePosition);
    frameId = requestAnimationFrame(shrinkTrail);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      <style>{`
        body {
          cursor: none;
        }
        a, button, [role="button"] {
          cursor: none;
        }
      `}</style>
      
      {/* The Needle */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-6 w-6 -rotate-45 text-white"
        >
          <path d="M21 3l-6 6" />
          <path d="M21 3v6" />
          <path d="M21 3h-6" />
          <path d="M15 9l-9 9" />
          <circle cx="4" cy="20" r="2" />
        </svg>
      </motion.div>

      {/* The Thread Trail */}
      <svg
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-full w-full"
        style={{ mixBlendMode: "screen" }}
      >
        <polyline
          points={trail.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="none"
          stroke="var(--color-tatreez-red)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            filter: "drop-shadow(0 0 4px var(--color-tatreez-red))",
            opacity: 0.7,
          }}
        />
      </svg>
    </>
  );
}
