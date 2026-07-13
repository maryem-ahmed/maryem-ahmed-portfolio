"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Mail, MapPin, Terminal } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { CrochetHoop } from "@/components/ui/crochet";
import { TerminalMode } from "@/components/ui/terminal-mode";
import { personal, focusThreads } from "@/data/portfolio";

export function Hero() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <motion.section
      id="about"
      className="scroll-mt-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center gap-10 text-center lg:flex-row lg:items-start lg:gap-12 lg:text-left">
        <div className="shrink-0">
          <CrochetHoop>
            <div className="relative h-32 w-32 sm:h-36 sm:w-36">
              <Image
                src={personal.avatar}
                alt={personal.name}
                fill
                className="profile-image object-cover"
                priority
                sizes="144px"
              />
            </div>
          </CrochetHoop>
          <p className="status-badge mx-auto lg:mx-0">{personal.availability}</p>
        </div>

        <div className="flex-1">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {personal.name}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">{personal.title}</p>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base lg:mx-0">
            {personal.tagline}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            <a href="#projects" className="inline-flex items-center gap-2 bg-foreground px-4 py-2 text-sm text-background rounded-full transition-colors hover:bg-foreground/90 hover:scale-105">
              View work
              <ArrowDown className="h-3.5 w-3.5" />
            </a>
            <a href={personal.github} target="_blank" rel="noopener noreferrer" className="glass-subtle px-3.5 py-2 text-sm">
              <span className="inline-flex items-center gap-1.5">
                <GitHubIcon className="h-3.5 w-3.5" /> GitHub
              </span>
            </a>
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="glass-subtle px-3.5 py-2 text-sm">
              <span className="inline-flex items-center gap-1.5">
                <LinkedInIcon className="h-3.5 w-3.5" /> LinkedIn
              </span>
            </a>
            <a href={`mailto:${personal.email}`} className="glass-subtle px-3.5 py-2 text-sm">
              <span className="inline-flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" /> Email
              </span>
            </a>
            <button onClick={() => setIsTerminalOpen(true)} className="glass-subtle px-3.5 py-2 text-sm text-green-600 dark:text-green-400 hover:bg-green-500/10">
              <span className="inline-flex items-center gap-1.5">
                <Terminal className="h-3.5 w-3.5" /> Geek Mode
              </span>
            </button>
          </div>

          <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {personal.location}
          </p>

          <div className="mt-7 space-y-3">
            <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
              Core focus
            </p>
            <div className="flex flex-wrap justify-center gap-1.5 lg:justify-start">
              {focusThreads.map((thread) => (
                <span key={thread} className="focus-tag">
                  {thread}
                </span>
              ))}
            </div>
            <p className="focus-card rounded-lg border border-border bg-card px-4 py-3 text-left text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Current · </span>
              {personal.currentFocus}
            </p>
          </div>
        </div>
      </div>

      <TerminalMode isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
    </motion.section>
  );
}
