"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X } from "lucide-react";
import { personal, focusThreads } from "@/data/portfolio";

interface TerminalModeProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TerminalMode({ isOpen, onClose }: TerminalModeProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ type: "input" | "output"; content: React.ReactNode }[]>([
    { type: "output", content: 'Welcome to MaryemOS v1.0.0 (Geek Mode)\nType "help" to see available commands.' }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === "clear") {
      setHistory([]);
      return;
    }

    let output: React.ReactNode = "";

    switch (trimmedCmd) {
      case "help":
        output = (
          <div className="flex flex-col gap-1">
            <span>Available commands:</span>
            <span>  <span className="text-green-400">about</span>      - Display personal information</span>
            <span>  <span className="text-green-400">skills</span>     - List core technical skills</span>
            <span>  <span className="text-green-400">contact</span>    - Show contact details</span>
            <span>  <span className="text-green-400">clear</span>      - Clear terminal screen</span>
            <span>  <span className="text-green-400">exit</span>       - Return to visual portfolio</span>
          </div>
        );
        break;
      case "about":
        output = (
          <div className="flex flex-col gap-1">
            <span>Name: {personal.name}</span>
            <span>Title: {personal.title}</span>
            <span className="mt-2 text-gray-400">"{personal.tagline}"</span>
          </div>
        );
        break;
      case "skills":
        output = (
          <div className="flex flex-col gap-1">
            <span>Loading core focus threads...</span>
            <div className="mt-2 grid grid-cols-2 gap-2 text-green-300">
              {focusThreads.map(skill => <span key={skill}>- {skill}</span>)}
            </div>
          </div>
        );
        break;
      case "contact":
        output = (
          <div className="flex flex-col gap-1">
            <span>Email: <a href={`mailto:${personal.email}`} className="underline hover:text-green-300">{personal.email}</a></span>
            <span>GitHub: <a href={personal.github} target="_blank" className="underline hover:text-green-300">{personal.github}</a></span>
            <span>LinkedIn: <a href={personal.linkedin} target="_blank" className="underline hover:text-green-300">{personal.linkedin}</a></span>
            <span>Location: {personal.location}</span>
          </div>
        );
        break;
      case "exit":
        onClose();
        return;
      case "":
        return;
      default:
        output = <span className="text-red-400">Command not found: {cmd}. Type "help" for a list of commands.</span>;
    }

    setHistory(prev => [
      ...prev,
      { type: "input", content: `guest@maryem-os:~$ ${cmd}` },
      { type: "output", content: output }
    ]);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && input !== "") return;
    
    handleCommand(input);
    setInput("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm sm:p-8"
        >
          <div className="relative flex h-full w-full max-w-4xl flex-col overflow-hidden rounded-lg border border-border bg-[#0C0C0C] font-mono text-sm text-green-500 shadow-2xl">
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-[#1A1A1A] px-4 py-2">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4" />
                <span className="text-xs text-gray-400">guest@maryem-os ~ bash</span>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Terminal Body */}
            <div 
              className="flex-1 overflow-y-auto p-4"
              onClick={() => inputRef.current?.focus()}
            >
              <div className="flex flex-col gap-2 whitespace-pre-wrap">
                {history.map((entry, i) => (
                  <div key={i} className={entry.type === "input" ? "text-gray-300" : "mb-2"}>
                    {entry.content}
                  </div>
                ))}
              </div>
              
              <form onSubmit={onSubmit} className="mt-2 flex items-center gap-2">
                <span className="text-gray-300 shrink-0">guest@maryem-os:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent text-green-500 outline-none placeholder:text-green-900/50"
                  spellCheck={false}
                  autoComplete="off"
                />
              </form>
              <div ref={bottomRef} className="h-4" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
