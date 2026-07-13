"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { CrochetCard } from "@/components/ui/crochet";
import { SectionHeading } from "@/components/ui/section-heading";
import { experience, education } from "@/data/portfolio";
import { FadeIn } from "@/components/effects/fade-in";

export function Timeline() {
  const timelineItems = [
    ...experience.map(item => ({ ...item, isEdu: false })),
    ...education.map(item => ({ ...item, isEdu: true }))
  ];

  return (
    <section id="journey" className="scroll-mt-8 py-2 relative">
      <SectionHeading id="journey-heading" title="Journey" />

      <div className="relative mt-8 pl-4 sm:pl-8">
        {/* The Yarn Thread */}
        <motion.div 
          className="absolute left-[15px] sm:left-[31px] top-2 bottom-0 w-[2px] bg-border origin-top"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        <div className="flex flex-col gap-10">
          {timelineItems.map((item, i) => (
            <FadeIn key={i} delay={i * 0.1} className="relative">
              {/* Stitch/Node */}
              <div className="absolute -left-[30px] sm:-left-[38px] top-4 flex h-8 w-8 items-center justify-center rounded-full bg-background border-2 border-tatreez-red z-10 shadow-[0_0_10px_rgba(228,49,43,0.2)]">
                {item.isEdu ? (
                  <GraduationCap className="h-3.5 w-3.5 text-foreground" />
                ) : (
                  <Briefcase className="h-3.5 w-3.5 text-tatreez-green" />
                )}
              </div>

              {/* Content */}
              <CrochetCard className="tatreez-accent">
                <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">
                      {item.isEdu ? item.degree : item.role}
                    </h3>
                    <p className="text-muted-foreground mt-1">
                      {item.isEdu ? item.institution : item.company}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="glass-pill inline-block rounded-sm px-2.5 py-1 text-xs font-medium">
                      {item.period}
                    </span>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.location}
                    </p>
                  </div>
                </div>

                <ul className="ml-4 list-outside list-disc space-y-2 text-sm text-muted-foreground marker:text-tatreez-red">
                  {item.highlights.map((highlight, j) => (
                    <li key={j} className="pl-2 leading-relaxed">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </CrochetCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
