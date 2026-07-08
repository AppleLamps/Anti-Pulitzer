import { masthead } from "@/lib/site";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  kicker?: string;
  title: string;
  standfirst?: string;
  /** Left-hand folio label; defaults to the masthead motto. */
  folio?: string;
  className?: string;
};

/**
 * The section-front masthead used at the top of interior pages: a ruled folio
 * strip, then a large left-aligned Fraunces title and a standfirst deck.
 */
export function PageHeader({
  kicker,
  title,
  standfirst,
  folio,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn(className)}>
      <div className="masthead-rule" />
      <div className="folio-bar py-3">
        <span className="text-gold/70">{folio ?? masthead.motto}</span>
        <span className="hidden sm:inline">
          {masthead.volume} · {masthead.edition}
        </span>
      </div>
      <div className="masthead-rule" />

      <div className="mt-8 md:mt-10">
        {kicker ? <p className="kicker">{kicker}</p> : null}
        <h1 className="mt-4 font-heading text-4xl leading-[1.02] tracking-tight text-foreground md:text-6xl">
          {title}
        </h1>
        {standfirst ? (
          <p className="mt-6 max-w-2xl font-heading text-lg italic leading-snug text-muted-foreground md:text-xl">
            {standfirst}
          </p>
        ) : null}
      </div>
    </header>
  );
}
