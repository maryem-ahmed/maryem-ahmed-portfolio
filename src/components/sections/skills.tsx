import { FadeIn } from "@/components/effects/fade-in";
import { CrochetCard } from "@/components/ui/crochet";
import { SectionHeading } from "@/components/ui/section-heading";
import { skillCategories } from "@/data/portfolio";

const swatches = ["solid", "stripe", "mesh", "solid", "stripe", "mesh"] as const;

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-8">
      <SectionHeading id="skills-heading" title="Skills" />

      <div className="grid gap-4 sm:grid-cols-2">
        {skillCategories.map((cat, i) => (
          <FadeIn key={cat.name} delay={i * 0.04}>
            <CrochetCard hover swatch={swatches[i % swatches.length]} className="p-5">
              <h3 className="mb-3 text-sm font-semibold">{cat.name}</h3>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span key={skill} className="glass-pill px-2.5 py-1 text-muted-foreground">
                    {skill}
                  </span>
                ))}
              </div>
            </CrochetCard>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
