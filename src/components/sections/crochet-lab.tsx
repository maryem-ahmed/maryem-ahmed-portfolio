"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Wand2, Eraser, Scissors, Mail } from "lucide-react";
import { InstagramIcon } from "@/components/ui/brand-icons";
import { CrochetCard } from "@/components/ui/crochet";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/effects/fade-in";
import { cn } from "@/lib/utils";

const GRID_SIZE = 16;
const COLORS = [
  "transparent",       // 0: Eraser
  "var(--kufiya-red)", // 1: Red
  "var(--kufiya-black)",// 2: Black
  "var(--kufiya-green)",// 3: Green
];

export function CrochetLab() {
  const [grid, setGrid] = useState<number[][]>(() => generateEmptyGrid());
  const [activeColor, setActiveColor] = useState<number>(1);
  const [isDrawing, setIsDrawing] = useState(false);

  function generateEmptyGrid() {
    return Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(0));
  }

  function handleClear() {
    setGrid(generateEmptyGrid());
  }

  function handleMagicAI() {
    const newGrid = generateEmptyGrid();
    const halfSize = GRID_SIZE / 2;
    for (let r = 0; r < halfSize; r++) {
      for (let c = 0; c < halfSize; c++) {
        if (Math.random() > 0.6) {
          const colorRand = Math.random();
          let colorId = 1; // Red
          if (colorRand > 0.8) colorId = 2; // Black
          else if (colorRand > 0.7) colorId = 3; // Green

          // Mirror across all 4 quadrants
          newGrid[r][c] = colorId;
          newGrid[r][GRID_SIZE - 1 - c] = colorId;
          newGrid[GRID_SIZE - 1 - r][c] = colorId;
          newGrid[GRID_SIZE - 1 - r][GRID_SIZE - 1 - c] = colorId;
        }
      }
    }
    setGrid(newGrid);
  }

  const paintCell = useCallback((r: number, c: number) => {
    setGrid((prev) => {
      const newGrid = [...prev];
      newGrid[r] = [...newGrid[r]];
      newGrid[r][c] = activeColor;
      return newGrid;
    });
  }, [activeColor]);

  return (
    <section id="crochet-lab" className="scroll-mt-8 py-2">
      <SectionHeading id="crochet-lab-heading" title="Interactive Crochet Lab" />
      <p className="mb-8 text-sm text-muted-foreground">
        Design your own Palestinian Tatreez or Crochet pattern pixel by pixel.
      </p>

      <FadeIn>
        <CrochetCard className="tatreez-accent flex flex-col gap-8 p-6 lg:flex-row lg:items-start lg:p-8">
          
          {/* Controls & CTA */}
          <div className="flex flex-col gap-6 lg:w-1/2">
            
            <div>
              <h3 className="mb-3 text-lg font-semibold">1. Choose your yarn</h3>
              <div className="flex gap-3">
                <button 
                  onClick={() => setActiveColor(1)}
                  className={cn("w-8 h-8 rounded-full bg-tatreez-red shadow-sm transition-transform", activeColor === 1 ? "scale-125 ring-2 ring-foreground ring-offset-2 ring-offset-background" : "hover:scale-110")}
                  title="Tatreez Red"
                />
                <button 
                  onClick={() => setActiveColor(3)}
                  className={cn("w-8 h-8 rounded-full bg-tatreez-green shadow-sm transition-transform", activeColor === 3 ? "scale-125 ring-2 ring-foreground ring-offset-2 ring-offset-background" : "hover:scale-110")}
                  title="Olive Green"
                />
                <button 
                  onClick={() => setActiveColor(2)}
                  className={cn("w-8 h-8 rounded-full bg-foreground shadow-sm transition-transform", activeColor === 2 ? "scale-125 ring-2 ring-foreground ring-offset-2 ring-offset-background" : "hover:scale-110")}
                  title="Keffiyeh Black"
                />
                <button 
                  onClick={() => setActiveColor(0)}
                  className={cn("w-8 h-8 rounded-full bg-background border-2 border-dashed border-border flex items-center justify-center transition-transform", activeColor === 0 ? "scale-125 ring-2 ring-foreground ring-offset-2 ring-offset-background" : "hover:scale-110")}
                  title="Eraser"
                >
                  <Eraser className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleMagicAI}
                className="flex flex-1 items-center justify-center gap-2 rounded-sm bg-muted px-4 py-2 text-xs font-medium text-foreground transition-all hover:bg-muted/80 border border-border"
              >
                <Wand2 className="h-4 w-4 text-tatreez-red" />
                Magic Pattern
              </button>
              <button
                onClick={handleClear}
                className="flex items-center justify-center gap-2 rounded-sm bg-background px-4 py-2 text-xs font-medium text-foreground transition-all hover:bg-muted/50 border border-border"
              >
                <Scissors className="h-4 w-4" />
                Clear
              </button>
            </div>

            <div className="mt-4 rounded-xl border-2 border-dashed border-tatreez-green/40 bg-tatreez-green/5 p-5 text-center shadow-inner">
              <h4 className="font-medium text-foreground mb-2">Love your design?</h4>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                Want to bring this custom crochet pattern (or any other idea) to life? I take custom crochet requests!
              </p>
              <div className="flex flex-col gap-2">
                <a 
                  href="https://www.instagram.com/twistedd_store/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
                >
                  <InstagramIcon className="h-4 w-4" />
                  Visit @twistedd_store
                </a>
                <a 
                  href="mailto:maryemahmed707@gmail.com?subject=Custom%20Crochet%20Order" 
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
                >
                  <Mail className="h-4 w-4" />
                  Contact Maryem
                </a>
              </div>
            </div>
          </div>

          {/* Grid Area */}
          <div className="flex w-full justify-center lg:w-1/2">
            <div 
              className="grid gap-[1px] bg-border p-[1px] rounded-sm shadow-2xl cursor-crosshair touch-none select-none"
              style={{ 
                gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
                width: '100%',
                maxWidth: '320px',
                aspectRatio: '1/1'
              }}
              onMouseLeave={() => setIsDrawing(false)}
              onMouseUp={() => setIsDrawing(false)}
            >
              {grid.map((row, r) => 
                row.map((cell, c) => (
                  <div
                    key={`${r}-${c}`}
                    onMouseDown={() => {
                      setIsDrawing(true);
                      paintCell(r, c);
                    }}
                    onMouseEnter={() => {
                      if (isDrawing) paintCell(r, c);
                    }}
                    // Touch support for mobile drawing
                    onTouchStart={() => {
                      setIsDrawing(true);
                      paintCell(r, c);
                    }}
                    onTouchMove={(e) => {
                      if (!isDrawing) return;
                      const touch = e.touches[0];
                      const target = document.elementFromPoint(touch.clientX, touch.clientY);
                      if (target && target.hasAttribute('data-row')) {
                        const targetR = parseInt(target.getAttribute('data-row') || '0');
                        const targetC = parseInt(target.getAttribute('data-col') || '0');
                        paintCell(targetR, targetC);
                      }
                    }}
                    onTouchEnd={() => setIsDrawing(false)}
                    data-row={r}
                    data-col={c}
                    className="w-full h-full bg-background relative flex items-center justify-center transition-colors duration-100"
                    style={{ backgroundColor: cell === 0 ? 'var(--background)' : COLORS[cell] }}
                  >
                    {cell !== 0 && (
                      <span className="text-[7px] sm:text-[10px] font-mono opacity-50 mix-blend-overlay pointer-events-none">v</span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </CrochetCard>
      </FadeIn>
    </section>
  );
}
