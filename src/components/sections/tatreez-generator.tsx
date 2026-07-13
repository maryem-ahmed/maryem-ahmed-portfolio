"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Wand2, Download } from "lucide-react";
import { CrochetCard } from "@/components/ui/crochet";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/effects/fade-in";

const GRID_SIZE = 16;
const COLORS = [
  "transparent",       // 0
  "var(--kufiya-red)", // 1
  "var(--kufiya-black)",// 2
  "var(--kufiya-green)",// 3
];

export function TatreezGenerator() {
  const [grid, setGrid] = useState<number[][]>(() => generateEmptyGrid());
  const [isGenerating, setIsGenerating] = useState(false);

  function generateEmptyGrid() {
    return Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(0));
  }

  function handleGenerate() {
    setIsGenerating(true);
    
    // Simulate AI Generation time
    setTimeout(() => {
      const newGrid = generateEmptyGrid();
      
      // Generate only the top-left quadrant and mirror it to create symmetry (traditional tatreez style)
      const halfSize = GRID_SIZE / 2;
      for (let r = 0; r < halfSize; r++) {
        for (let c = 0; c < halfSize; c++) {
          // Probability of placing a stitch
          if (Math.random() > 0.6) {
            // Randomly pick a color (mostly red, some green/black)
            const colorRand = Math.random();
            let colorId = 1; // Red
            if (colorRand > 0.8) colorId = 2; // Black
            else if (colorRand > 0.7) colorId = 3; // Green

            // Mirror across all 4 quadrants
            newGrid[r][c] = colorId; // Top-Left
            newGrid[r][GRID_SIZE - 1 - c] = colorId; // Top-Right
            newGrid[GRID_SIZE - 1 - r][c] = colorId; // Bottom-Left
            newGrid[GRID_SIZE - 1 - r][GRID_SIZE - 1 - c] = colorId; // Bottom-Right
          }
        }
      }
      
      setGrid(newGrid);
      setIsGenerating(false);
    }, 800);
  }

  return (
    <section id="tatreez-generator" className="scroll-mt-8 py-2">
      <SectionHeading id="tatreez-heading" title="AI Tatreez Generator" />
      <p className="mb-8 text-sm text-muted-foreground">
        A playful Generative AI experiment. Click the button to generate a unique, symmetrical Palestinian cross-stitch pattern.
      </p>

      <FadeIn>
        <CrochetCard className="tatreez-accent flex flex-col items-center gap-8 p-8 sm:flex-row">
          <div className="flex flex-col items-center gap-4 sm:w-1/2">
            <h3 className="text-xl font-medium">Create your pattern</h3>
            <p className="text-center text-sm text-muted-foreground">
              This tool uses a symmetric generation algorithm to mimic the geometric beauty of traditional Palestinian embroidery.
            </p>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="mt-4 flex items-center gap-2 rounded-sm bg-tatreez-red px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-red-700 disabled:opacity-50"
            >
              {isGenerating ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                  <Wand2 className="h-4 w-4" />
                </motion.div>
              ) : (
                <Wand2 className="h-4 w-4" />
              )}
              {isGenerating ? "Generating..." : "Generate Pattern"}
            </button>
          </div>

          <div className="flex w-full justify-center sm:w-1/2">
            <div 
              className="grid gap-[1px] bg-border p-[1px] rounded-sm shadow-xl"
              style={{ 
                gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
                width: '100%',
                maxWidth: '280px',
                aspectRatio: '1/1'
              }}
            >
              {grid.map((row, rIndex) => 
                row.map((cell, cIndex) => (
                  <motion.div
                    key={`${rIndex}-${cIndex}`}
                    initial={false}
                    animate={{ 
                      backgroundColor: COLORS[cell],
                      scale: cell !== 0 ? [0.8, 1.1, 1] : 1
                    }}
                    transition={{ duration: 0.3, delay: (rIndex + cIndex) * 0.01 }}
                    className="w-full h-full bg-background relative flex items-center justify-center"
                  >
                    {cell !== 0 && (
                      <span className="text-[6px] sm:text-[8px] font-mono opacity-40 mix-blend-overlay">x</span>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </CrochetCard>
      </FadeIn>
    </section>
  );
}
