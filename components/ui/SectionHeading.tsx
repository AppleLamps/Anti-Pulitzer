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
        align === "center" ? (
          <p className="kicker">{eyebrow}</p>
        ) : (
          <div className="flex items-center gap-4">
            <span className="kicker whitespace-nowrap">{eyebrow}</span>
            <span className="h-px flex-1 bg-gold/30" />
          </div>
        )
      ) : null}
      <div className="space-y-3">
        <h2 className="font-heading text-3xl tracking-tight text-foreground md:text-4xl">
          {title}
        </h2>
        {align === "center" ? (
          <div className="editorial-rule mx-auto max-w-[6rem]" />
        ) : null}
      </div>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}
