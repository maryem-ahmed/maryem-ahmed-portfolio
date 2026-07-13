"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Wand2, Eraser, Scissors, Mail, Download, Undo, Redo, Grid3x3 } from "lucide-react";
import { InstagramIcon } from "@/components/ui/brand-icons";
import { CrochetCard } from "@/components/ui/crochet";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/effects/fade-in";
import { cn } from "@/lib/utils";
import html2canvas from "html2canvas";

export function CrochetLab() {
  const [gridSize, setGridSize] = useState(16);
  
  // Need a function to generate empty grid before initializing state
  const generateEmptyGrid = useCallback((size: number) => {
    return Array(size).fill("").map(() => Array(size).fill("transparent"));
  }, []);

  const [grid, setGrid] = useState<string[][]>(() => generateEmptyGrid(16));
  
  // History for Undo/Redo
  const [history, setHistory] = useState<string[][][]>([generateEmptyGrid(16)]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const [activeColor, setActiveColor] = useState<string>("var(--kufiya-red)");
  const [customColor, setCustomColor] = useState<string>("#3b82f6");
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const gridRef = useRef<HTMLDivElement>(null);

  const pushToHistory = useCallback((newGrid: string[][]) => {
    setHistory(prevHistory => {
      const newHistory = prevHistory.slice(0, historyIndex + 1);
      newHistory.push(newGrid);
      return newHistory;
    });
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  function handleClear() {
    const newGrid = generateEmptyGrid(gridSize);
    setGrid(newGrid);
    pushToHistory(newGrid);
  }

  function handleGridSizeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newSize = parseInt(e.target.value);
    if (confirm("Changing grid size will clear your current pattern. Are you sure?")) {
      setGridSize(newSize);
      const newGrid = generateEmptyGrid(newSize);
      setGrid(newGrid);
      setHistory([newGrid]);
      setHistoryIndex(0);
    } else {
      e.target.value = gridSize.toString();
    }
  }

  function handleUndo() {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      setGrid(history[prevIndex]);
    }
  }

  function handleRedo() {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setGrid(history[nextIndex]);
    }
  }

  function handleMagicAI() {
    const newGrid = generateEmptyGrid(gridSize);
    const halfSize = Math.floor(gridSize / 2);
    for (let r = 0; r < halfSize; r++) {
      for (let c = 0; c < halfSize; c++) {
        if (Math.random() > 0.6) {
          const colorRand = Math.random();
          let color = "var(--kufiya-red)";
          if (colorRand > 0.8) color = "var(--kufiya-black)";
          else if (colorRand > 0.7) color = "var(--kufiya-green)";

          newGrid[r][c] = color;
          newGrid[r][gridSize - 1 - c] = color;
          newGrid[gridSize - 1 - r][c] = color;
          newGrid[gridSize - 1 - r][gridSize - 1 - c] = color;
        }
      }
    }
    setGrid(newGrid);
    pushToHistory(newGrid);
  }

  async function handleDownload() {
    if (!gridRef.current) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(gridRef.current, {
        backgroundColor: "var(--background)",
        scale: 2,
      });
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = `crochet-pattern-${gridSize}x${gridSize}.png`;
      link.click();
    } catch (error) {
      console.error("Failed to download pattern:", error);
    } finally {
      setIsDownloading(false);
    }
  }

  const paintCell = useCallback((r: number, c: number) => {
    setGrid((prev) => {
      if (prev[r][c] === activeColor) return prev;
      const newGrid = [...prev];
      newGrid[r] = [...newGrid[r]];
      newGrid[r][c] = activeColor;
      return newGrid;
    });
  }, [activeColor]);

  function handleInteractionEnd() {
    if (isDrawing) {
      setIsDrawing(false);
      // Wait for React state to update grid before pushing to history
      setTimeout(() => {
        setGrid(currentGrid => {
          pushToHistory(currentGrid);
          return currentGrid;
        });
      }, 0);
    }
  }

  // Prevent scrolling while drawing on mobile
  useEffect(() => {
    const preventScroll = (e: TouchEvent) => {
      if (isDrawing) e.preventDefault();
    };
    document.addEventListener("touchmove", preventScroll, { passive: false });
    return () => document.removeEventListener("touchmove", preventScroll);
  }, [isDrawing]);


  return (
    <section id="crochet-lab" className="scroll-mt-8 py-2">
      <SectionHeading id="crochet-lab-heading" title="Interactive Crochet Lab" />
      <p className="mb-8 text-sm text-muted-foreground">
        Design your own custom Crochet pattern pixel by pixel.
      </p>

      <FadeIn>
        <CrochetCard className="tatreez-accent flex flex-col gap-8 p-6 lg:flex-row lg:items-start lg:p-8">
          
          {/* Controls & CTA */}
          <div className="flex flex-col gap-6 lg:w-1/2">
            
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h3 className="mb-3 text-sm font-semibold">1. Choose Yarn</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <button 
                    onClick={() => setActiveColor("var(--kufiya-red)")}
                    className={cn("w-8 h-8 rounded-full bg-tatreez-red shadow-sm transition-transform", activeColor === "var(--kufiya-red)" ? "scale-125 ring-2 ring-foreground ring-offset-2 ring-offset-background" : "hover:scale-110")}
                    title="Tatreez Red"
                  />
                  <button 
                    onClick={() => setActiveColor("var(--kufiya-green)")}
                    className={cn("w-8 h-8 rounded-full bg-tatreez-green shadow-sm transition-transform", activeColor === "var(--kufiya-green)" ? "scale-125 ring-2 ring-foreground ring-offset-2 ring-offset-background" : "hover:scale-110")}
                    title="Olive Green"
                  />
                  <button 
                    onClick={() => setActiveColor("var(--kufiya-black)")}
                    className={cn("w-8 h-8 rounded-full bg-foreground shadow-sm transition-transform", activeColor === "var(--kufiya-black)" ? "scale-125 ring-2 ring-foreground ring-offset-2 ring-offset-background" : "hover:scale-110")}
                    title="Keffiyeh Black"
                  />
                  <label 
                    className={cn("w-8 h-8 rounded-full shadow-sm transition-transform flex items-center justify-center cursor-pointer border-2 border-border overflow-hidden", activeColor === customColor ? "scale-125 ring-2 ring-foreground ring-offset-2 ring-offset-background" : "hover:scale-110")}
                    style={{ backgroundColor: customColor }}
                    title="Custom Color"
                  >
                    <input 
                      type="color" 
                      value={customColor} 
                      onChange={(e) => {
                        setCustomColor(e.target.value);
                        setActiveColor(e.target.value);
                      }}
                      onClick={() => setActiveColor(customColor)}
                      className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                    />
                  </label>
                  <button 
                    onClick={() => setActiveColor("transparent")}
                    className={cn("w-8 h-8 rounded-full bg-background border-2 border-dashed border-border flex items-center justify-center transition-transform", activeColor === "transparent" ? "scale-125 ring-2 ring-foreground ring-offset-2 ring-offset-background" : "hover:scale-110")}
                    title="Eraser"
                  >
                    <Eraser className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-semibold flex items-center gap-1.5"><Grid3x3 className="w-4 h-4" /> Grid Size</h3>
                <select 
                  value={gridSize} 
                  onChange={handleGridSizeChange}
                  className="bg-background border border-border rounded-sm px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-tatreez-red transition-all cursor-pointer"
                >
                  <option value={16}>16 x 16 (Standard)</option>
                  <option value={24}>24 x 24 (Detailed)</option>
                  <option value={32}>32 x 32 (Pro)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={handleUndo}
                disabled={historyIndex === 0}
                className="flex items-center justify-center gap-1.5 rounded-sm bg-background px-3 py-2 text-xs font-medium text-foreground transition-all hover:bg-muted/50 border border-border disabled:opacity-40 disabled:cursor-not-allowed"
                title="Undo"
              >
                <Undo className="h-3.5 w-3.5" /> Undo
              </button>
              <button
                onClick={handleRedo}
                disabled={historyIndex === history.length - 1}
                className="flex items-center justify-center gap-1.5 rounded-sm bg-background px-3 py-2 text-xs font-medium text-foreground transition-all hover:bg-muted/50 border border-border disabled:opacity-40 disabled:cursor-not-allowed"
                title="Redo"
              >
                <Redo className="h-3.5 w-3.5" /> Redo
              </button>
              <button
                onClick={handleClear}
                className="flex items-center justify-center gap-1.5 rounded-sm bg-background px-3 py-2 text-xs font-medium text-foreground transition-all hover:bg-muted/50 border border-border"
              >
                <Scissors className="h-3.5 w-3.5" /> Clear
              </button>
              <button
                onClick={handleMagicAI}
                className="flex items-center justify-center gap-1.5 rounded-sm bg-muted px-3 py-2 text-xs font-medium text-foreground transition-all hover:bg-muted/80 border border-border"
              >
                <Wand2 className="h-3.5 w-3.5 text-tatreez-red" /> Magic
              </button>
            </div>

            <div className="flex justify-center w-full">
               <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="w-full flex items-center justify-center gap-2 rounded-sm bg-tatreez-green text-white px-4 py-3 text-sm font-medium transition-all hover:bg-green-700 disabled:opacity-70 border border-transparent"
                >
                  <Download className={cn("h-4 w-4", isDownloading && "animate-bounce")} />
                  {isDownloading ? "Downloading..." : "Download Pattern (PNG)"}
              </button>
            </div>

            <div className="mt-2 rounded-xl border-2 border-dashed border-tatreez-green/40 bg-tatreez-green/5 p-5 text-center shadow-inner">
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
              ref={gridRef}
              className="grid gap-[1px] bg-border p-[1px] rounded-sm shadow-2xl cursor-crosshair touch-none select-none relative"
              style={{ 
                gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                width: '100%',
                maxWidth: '360px',
                aspectRatio: '1/1'
              }}
              onMouseLeave={handleInteractionEnd}
              onMouseUp={handleInteractionEnd}
              onTouchEnd={handleInteractionEnd}
              onTouchCancel={handleInteractionEnd}
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
                    data-row={r}
                    data-col={c}
                    className="w-full h-full relative flex items-center justify-center transition-colors duration-100"
                    style={{ backgroundColor: cell === "transparent" ? 'var(--background)' : cell }}
                  >
                    {cell !== "transparent" && (
                      <span className={cn("font-mono opacity-50 mix-blend-overlay pointer-events-none", gridSize > 24 ? "text-[5px]" : gridSize > 16 ? "text-[7px]" : "text-[8px] sm:text-[10px]")}>v</span>
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
