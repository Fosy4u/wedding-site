import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("space-y-4", centered && "text-center", className)}>
      {eyebrow ? (
        <p className="tracking-[0.28em] uppercase text-xs text-[var(--color-soft-gold)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-heading text-4xl leading-tight text-[var(--color-warm-black)] md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-[var(--color-muted-green)]/80 text-base md:text-lg",
            centered && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
