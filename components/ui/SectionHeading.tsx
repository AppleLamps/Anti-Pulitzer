import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-4",
        align === "center" && "mx-auto max-w-2xl text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
          {eyebrow}
        </p>
      ) : null}
      <div className="space-y-3">
        <h2 className="font-heading text-3xl tracking-tight text-foreground md:text-4xl">
          {title}
        </h2>
        <div className={cn("editorial-rule", align === "center" && "mx-auto")} />
      </div>
      {description ? (
        <p className="text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}
