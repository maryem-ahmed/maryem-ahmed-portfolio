import { ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/effects/fade-in";
import { CrochetCard } from "@/components/ui/crochet";
import { SectionHeading } from "@/components/ui/section-heading";
import { certifications } from "@/data/portfolio";

export function Certifications() {
  return (
    <section id="certifications" className="scroll-mt-8 py-2">
      <SectionHeading id="certifications-heading" title="Certifications" />

      <div className="grid gap-3 sm:grid-cols-2">
        {certifications.map((cert, i) => {
          const card = (
            <CrochetCard hover className="flex items-start justify-between gap-3 p-4">
              <div>
                <h3 className="text-sm font-medium">{cert.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{cert.issuer}</p>
              </div>
              {cert.url !== "#" && (
                <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              )}
            </CrochetCard>
          );

          return (
            <FadeIn key={cert.name} delay={i * 0.05}>
              {cert.url !== "#" ? (
                <a href={cert.url} target="_blank" rel="noopener noreferrer" className="block">
                  {card}
                </a>
              ) : (
                card
              )}
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
