import { FadeIn } from "@/components/effects/fade-in";
import { CrochetCard } from "@/components/ui/crochet";
import { SectionHeading } from "@/components/ui/section-heading";
import { education } from "@/data/portfolio";

export function Education() {
  return (
    <section id="education" className="scroll-mt-8 py-2">
      <SectionHeading id="education-heading" title="Education" />

      <div className="space-y-4">
        {education.map((edu, i) => (
          <FadeIn key={edu.degree} delay={i * 0.08}>
            <CrochetCard hover className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-medium">{edu.degree}</h3>
                  <p className="text-sm text-muted-foreground">{edu.institution}</p>
                </div>
                <p className="text-xs text-muted-foreground">{edu.period}</p>
              </div>
              <ul className="mt-3 space-y-1">
                {edu.highlights.map((h) => (
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
