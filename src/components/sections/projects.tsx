"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/ui/brand-icons";
import { FadeIn } from "@/components/effects/fade-in";
import { CrochetCard } from "@/components/ui/crochet";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const allTech = [...new Set(projects.flatMap((p) => p.tech))];

export function Projects() {
  const [filter, setFilter] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const filtered = filter ? projects.filter((p) => p.tech.includes(filter)) : projects;
  const displayed = showAll ? filtered : filtered.filter((p) => p.featured);

  return (
    <section id="projects" className="scroll-mt-8 py-2">
      <SectionHeading id="projects-heading" title="Projects" />

      <FadeIn className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter(null)}
          className={cn(
            "rounded-sm px-3.5 py-1.5 text-xs font-medium transition-all",
            !filter ? "glass-pill-active glass-pill" : "glass-pill text-muted-foreground hover:text-foreground"
          )}
        >
          All
        </button>
        {allTech.slice(0, 10).map((tech) => (
          <button
            key={tech}
            onClick={() => setFilter(filter === tech ? null : tech)}
            className={cn(
              "rounded-sm px-3.5 py-1.5 text-xs font-medium transition-all",
              filter === tech ? "glass-pill-active glass-pill" : "glass-pill text-muted-foreground hover:text-foreground"
            )}
          >
            {tech}
          </button>
        ))}
      </FadeIn>

      <div className="grid gap-4 md:grid-cols-2">
        {displayed.map((project, i) => (
          <FadeIn key={project.id} delay={i * 0.06}>
            <CrochetCard hover className="tatreez-accent flex h-full flex-col p-5">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-medium">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.subtitle}</p>
                </div>
                <span className="glass-pill shrink-0 rounded-sm px-2 py-0.5 text-[10px]">
                  {project.badge}
                </span>
              </div>

              <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              <div className="mb-4 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span key={t} className="glass-pill rounded-sm px-2 py-0.5 font-mono text-[10px]">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 border-t border-border pt-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-accent"
                >
                  <GitHubIcon className="h-3.5 w-3.5" />
                  Source
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-accent"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Demo
                </a>
              </div>
            </CrochetCard>
          </FadeIn>
        ))}
      </div>

      {filtered.length > displayed.length && !showAll && (
        <FadeIn className="mt-8 text-center">
          <button
            onClick={() => setShowAll(true)}
            className="glass-subtle rounded-sm border-2 px-6 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
          >
            Show All Projects ({filtered.length})
          </button>
        </FadeIn>
      )}
    </section>
  );
}
