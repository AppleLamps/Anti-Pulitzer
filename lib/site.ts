import type { Metadata } from "next";

export const siteName = "The Anti-Pulitzer";
export const tagline = "Recognizing journalism that fails the public.";
export const description =
  "The Anti-Pulitzer highlights reporting that falls short of the standards the public deserves... the inverse of journalism's highest honor.";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/criteria", label: "Criteria" },
  { href: "/nominate", label: "Nominate" },
  { href: "/archive", label: "Archive" },
] as const;

export const sealText = "The Anti-Pulitzer · Accountability in Journalism · ";

export const hero = {
  status: "Nominations open soon ... first recipients announced thereafter.",
  eyebrow: "Est. 2026 · A public record of journalistic failure",
  title: siteName,
  tagline,
  statement: {
    lead: "The Pulitzer honors journalism at its best.",
    turn: "The Anti-Pulitzer keeps the record of its worst.",
  },
  primaryCta: { label: "Read the criteria", href: "/criteria" },
  secondaryCta: { label: "The mission", href: "/about" },
} as const;

export const pillars = [
  {
    title: "Transparency",
    description:
      "We name the work, the outlet, and the failure... no vague hand-waving, no protected narratives.",
  },
  {
    title: "Accountability",
    description:
      "Journalism that shields power while attacking the vulnerable deserves to be remembered.",
  },
  {
    title: "Public Harm",
    description:
      "We focus on reporting that causes measurable damage to truth, victims, or democratic discourse.",
  },
] as const;

export const howItWorks = [
  {
    step: "01",
    title: "Nominate",
    description:
      "The public submits examples of reporting that failed basic standards of accuracy, fairness, or integrity.",
    status: "Forthcoming",
  },
  {
    step: "02",
    title: "Review",
    description:
      "Submissions are evaluated against published criteria by an independent panel.",
    status: "Forthcoming",
  },
  {
    step: "03",
    title: "Announce",
    description:
      "Recipients are named publicly, with documented reasoning and source material.",
    status: "Forthcoming",
  },
] as const;

export const closing = {
  eyebrow: "The standard",
  quote:
    "Excellence in journalism is celebrated every year. Failure is quietly forgotten. This is the record that remembers it.",
  primaryCta: { label: "Read the criteria", href: "/criteria" },
  secondaryCta: { label: "About the project", href: "/about" },
} as const;

export const aboutContent = {
  mission: [
    "The Pulitzer Prize celebrates journalism at its best. The Anti-Pulitzer exists for the opposite reason: to document and highlight reporting that betrays the public trust.",
    "In an era of declining confidence in major outlets, there is growing demand for institutions willing to name failure as clearly as others name excellence. The Anti-Pulitzer is that institution.",
  ],
  isList: [
    "A cultural accountability project focused on journalistic failure",
    "A permanent public record of work that meets our published criteria",
    "An invitation for outlets to do better... or face lasting reputational consequence",
  ],
  isNotList: [
    "A legal adjudication or finding of fact",
    "A substitute for courts, regulators, or internal newsroom review",
    "A partisan attack on journalism as a profession",
  ],
};

export const criteriaItems = [
  {
    title: "Factual negligence or distortion",
    description:
      "Material errors, selective omission, or framing that misleads readers on matters of public importance.",
  },
  {
    title: "Victim-blaming or power-protection framing",
    description:
      "Coverage that attacks or diminishes vulnerable subjects while softening scrutiny of powerful figures.",
  },
  {
    title: "Undisclosed conflicts of interest",
    description:
      "Reporting tainted by undisclosed financial, political, or personal relationships with subjects.",
  },
  {
    title: "Harm disproportionate to public interest",
    description:
      "Stories that inflict serious reputational or personal damage without commensurate public benefit.",
  },
] as const;

export const criteriaNote =
  "Criteria subject to revision before first announcement.";

export const emptyStates = {
  nominate: {
    label: "Nominations",
    status: "Not yet open",
    heading: "Nominations Opening Soon",
    body: "The nomination process is not yet live. Check back for an announcement on when submissions will open.",
    links: [
      { label: "Review the criteria", href: "/criteria" },
      { label: "Read the mission", href: "/about" },
    ],
  },
  archive: {
    label: "The Record",
    status: "Empty",
    heading: "No Winners Announced Yet",
    body: "The first Anti-Pulitzer recipients will be published here, with full documentation and reasoning.",
    links: [
      { label: "How nominations work", href: "/nominate" },
      { label: "Evaluation criteria", href: "/criteria" },
    ],
  },
} as const;

export const footer = {
  blurb:
    "An accountability project that documents journalism failing the public: factual negligence, victim-blaming, undisclosed conflicts, and harm out of proportion to public interest.",
  disclaimer: "Opinion and criticism; not legal findings.",
  socialLinks: [
    { label: "X", href: "#" },
    { label: "Contact", href: "#" },
  ],
};

export function createPageMetadata(title: string, pageDescription?: string): Metadata {
  return {
    title,
    description: pageDescription ?? description,
    openGraph: {
      title: `${title} | ${siteName}`,
      description: pageDescription ?? description,
      siteName,
    },
  };
}
