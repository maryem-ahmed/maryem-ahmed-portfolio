import { personal } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 sm:flex-row">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {personal.name}
        </p>
        <p className="text-xs text-muted-foreground">
          {personal.title} · {personal.location}
        </p>
      </div>
    </footer>
  );
}
