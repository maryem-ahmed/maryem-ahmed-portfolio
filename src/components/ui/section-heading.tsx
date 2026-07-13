import { FadeIn } from "@/components/effects/fade-in";

export function SectionHeading({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description?: string;
}) {
  return (
    <FadeIn className="mb-8">
      <h2 id={id} className="section-heading">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>
      )}
    </FadeIn>
  );
}
