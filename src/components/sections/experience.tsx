import { FadeIn } from "@/components/effects/fade-in";
import { CrochetCard } from "@/components/ui/crochet";
import { SectionHeading } from "@/components/ui/section-heading";
import { experience } from "@/data/portfolio";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-8 py-2">
      <SectionHeading id="experience-heading" title="Experience" />

      <div className="space-y-4">
        {experience.map((job, i) => (
          <FadeIn key={job.role} delay={i * 0.08}>
            <CrochetCard hover className="tatreez-accent p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-medium">{job.role}</h3>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                </div>
                <p className="text-xs text-muted-foreground">{job.period}</p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {job.highlights[0]}
              </p>
              <ul className="mt-2 space-y-1">
                {job.highlights.slice(1).map((h) => (
                  <li key={h} className="text-sm text-muted-foreground">· {h}</li>
                ))}
              </ul>
            </CrochetCard>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
