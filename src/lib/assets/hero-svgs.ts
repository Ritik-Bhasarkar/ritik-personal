export interface HeroSvgPoint {
  x: number;
  y: number;
}

export interface HeroSvg {
  id: string;
  label: string;
  src: string;
  width: number;
  showOnAbout: boolean;
  hero: HeroSvgPoint;
  statement: HeroSvgPoint;
  about: HeroSvgPoint;
}

const SVGS = "/floating-assets/svgs";

// Journey keyframes (center position, % of viewport): hero -> statement -> [dock on work cards] -> about.
// statement points sit in the side gutters so they never cover the statement text.
export const heroSvgs: HeroSvg[] = [
  {
    id: "bun",
    label: "Bun",
    src: `${SVGS}/bun.svg`,
    width: 60,
    showOnAbout: false,
    hero: { x: 12.6, y: 24.3 },
    statement: { x: 10, y: 18 },
    about: { x: 69.2, y: 30.5 },
  },
  {
    id: "claude",
    label: "Claude",
    src: `${SVGS}/claude.svg`,
    width: 60,
    showOnAbout: true,
    hero: { x: 93.9, y: 25.9 },
    statement: { x: 90, y: 16 },
    about: { x: 41.3, y: 16.8 },
  },
  {
    id: "comment-cursor",
    label: "Comment cursor",
    src: `${SVGS}/comment-cursor.svg`,
    width: 60,
    showOnAbout: true,
    hero: { x: 67.5, y: 27.7 },
    statement: { x: 53.2, y: 64.3 },
    about: { x: 84, y: 18 },
  },
  {
    id: "figma",
    label: "Figma",
    src: `${SVGS}/figma.svg`,
    width: 60,
    showOnAbout: false,
    hero: { x: 93.6, y: 84.7 },
    statement: { x: 85.1, y: 52 },
    about: { x: 68, y: 78.4 },
  },
  {
    id: "github",
    label: "GitHub",
    src: `${SVGS}/github.svg`,
    width: 60,
    showOnAbout: false,
    hero: { x: 50, y: 30.7 },
    statement: { x: 6.2, y: 61.1 },
    about: { x: 75.1, y: 29 },
  },
  {
    id: "gsap",
    label: "GSAP",
    src: `${SVGS}/gsap.svg`,
    width: 60,
    showOnAbout: true,
    hero: { x: 12.2, y: 81.4 },
    statement: { x: 95.3, y: 66.2 },
    about: { x: 12, y: 72 },
  },
  {
    id: "notion",
    label: "Notion",
    src: `${SVGS}/notion.svg`,
    width: 60,
    showOnAbout: false,
    hero: { x: 42.5, y: 86.5 },
    statement: { x: 56, y: 88.7 },
    about: { x: 81.4, y: 28.7 },
  },
  {
    id: "npm",
    label: "npm",
    src: `${SVGS}/npm.svg`,
    width: 60,
    showOnAbout: false,
    hero: { x: 92, y: 55 },
    statement: { x: 90.8, y: 92.2 },
    about: { x: 92, y: 55 },
  },
  {
    id: "ring-text-badge",
    label: "Ring text badge",
    src: `${SVGS}/ring-text-badge.svg`,
    width: 60,
    showOnAbout: true,
    hero: { x: 55.3, y: 56.9 },
    statement: { x: 60, y: 15.9 },
    about: { x: 71.1, y: 57.1 },
  },
  {
    id: "smiley-face-badge",
    label: "Smiley face badge",
    src: `${SVGS}/smiley-face-badge.svg`,
    width: 60,
    showOnAbout: true,
    hero: { x: 82, y: 43.4 },
    statement: { x: 41.3, y: 74 },
    about: { x: 50, y: 14 },
  },
];
