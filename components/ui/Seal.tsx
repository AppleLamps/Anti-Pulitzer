import { cn } from "@/lib/utils";
import { sealText } from "@/lib/site";

type SealProps = {
  className?: string;
  /** Repeated marque that runs around the ring. */
  label?: string;
};

/**
 * The institutional emblem: an inverted, broken laurel-star inside a rotating
 * ring of small-caps text. The ring turns slowly; the mark stays fixed.
 */
export function Seal({ className, label = sealText }: SealProps) {
  const ring = (label + label).toUpperCase();

  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-label="The Anti-Pulitzer seal"
      className={cn("text-gold", className)}
    >
      <defs>
        <path
          id="seal-ring-path"
          fill="none"
          d="M 100,21 a 79,79 0 1,1 0,158 a 79,79 0 1,1 0,-158"
        />
      </defs>

      <g className="seal-ring">
        <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1" />
        <circle cx="100" cy="100" r="88" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" />
        <circle cx="100" cy="100" r="62" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" />
        <text
          fill="currentColor"
          fillOpacity="0.85"
          fontSize="8.6"
          letterSpacing="1.9"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <textPath href="#seal-ring-path" startOffset="0">
            {ring}
          </textPath>
        </text>
      </g>

      {/* Fixed center mark: the inverted broken star. */}
      <g
        transform="translate(62.4 60.4) scale(1.57)"
        stroke="currentColor"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path d="M24 4L28 14H38L30 20L33 30L24 24L15 30L18 20L10 14H20L24 4Z" strokeWidth="1.1" />
        <path d="M14 36H34" strokeWidth="1.1" />
        <path d="M16 40H32" strokeWidth="1.1" strokeOpacity="0.6" />
      </g>
    </svg>
  );
}
