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

      {/* Fixed center mark: a regular five-point star on the broken base,
          geometrically centred on the seal's midpoint (100,100). */}
      <g
        stroke="currentColor"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="1.6"
      >
        <path d="M100 68 L106.8 85.7 L125.7 86.7 L110.9 98.6 L115.9 116.8 L100 106.5 L84.1 116.8 L89.1 98.6 L74.3 86.7 L93.2 85.7 Z" />
        <path d="M84 125 H116" />
        <path d="M88.5 130 H111.5" strokeOpacity="0.55" />
      </g>
    </svg>
  );
}
