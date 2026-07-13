import { BackToTop } from "@/components/layout/back-to-top";
import { KeffiyehDivider } from "@/components/ui/crochet";
import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";
import { AILab } from "@/components/sections/ai-lab";
import { Projects } from "@/components/sections/projects";
import { Timeline } from "@/components/sections/timeline";
import { Certifications } from "@/components/sections/certifications";
import { TatreezGenerator } from "@/components/sections/tatreez-generator";
import { Contact } from "@/components/sections/contact";
import { personal } from "@/data/portfolio";

export default function Home() {
  return (
    <main className="relative z-10 mx-auto min-h-screen w-full max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
      <Hero />

      <KeffiyehDivider />
      <AILab />

      <KeffiyehDivider />
      <Skills />

      <KeffiyehDivider />
      <Projects />

      <KeffiyehDivider />
      <Timeline />

      <KeffiyehDivider />
      <Certifications />

      <KeffiyehDivider />
      <TatreezGenerator />

      <KeffiyehDivider />
      <Contact />

      <footer className="mt-20 border-t border-border pt-8 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {personal.name}
        </p>
        <p className="mt-1 text-xs text-muted-foreground/70">AI Engineer · Cairo, Egypt</p>
      </footer>

      <BackToTop />
    </main>
  );
}
