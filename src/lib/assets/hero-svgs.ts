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
  about: HeroSvgPoint;
}

const SVGS = "/floating-assets/svgs";

// hero/about = center position (% of screen). Icons lerp from hero -> about on scroll.
// showOnAbout: false icons fade out as the about section is reached.
export const heroSvgs: HeroSvg[] = [
  {
    id: "bun",
    label: "Bun",
    src: `${SVGS}/bun.svg`,
    width: 60,
    showOnAbout: false,
    hero: { x: 12.6, y: 24.3 },
    about: { x: 12.6, y: 24.3 },
  },
  {
    id: "claude",
    label: "Claude",
    src: `${SVGS}/claude.svg`,
    width: 60,
    showOnAbout: true,
    hero: { x: 92.2, y: 25.1 },
    about: { x: 14, y: 20 },
  },
  {
    id: "comment-cursor",
    label: "Comment cursor",
    src: `${SVGS}/comment-cursor.svg`,
    width: 60,
    showOnAbout: true,
    hero: { x: 63.2, y: 18.4 },
    about: { x: 84, y: 18 },
  },
  {
    id: "figma",
    label: "Figma",
    src: `${SVGS}/figma.svg`,
    width: 60,
    showOnAbout: false,
    hero: { x: 83.2, y: 85.9 },
    about: { x: 83.2, y: 85.9 },
  },
  {
    id: "github",
    label: "GitHub",
    src: `${SVGS}/github.svg`,
    width: 60,
    showOnAbout: false,
    hero: { x: 70, y: 86 },
    about: { x: 70, y: 86 },
  },
  {
    id: "gsap",
    label: "GSAP",
    src: `${SVGS}/gsap.svg`,
    width: 60,
    showOnAbout: true,
    hero: { x: 12.2, y: 81.4 },
    about: { x: 12, y: 72 },
  },
  {
    id: "notion",
    label: "Notion",
    src: `${SVGS}/notion.svg`,
    width: 60,
    showOnAbout: false,
    hero: { x: 47.8, y: 82.9 },
    about: { x: 47.8, y: 82.9 },
  },
  {
    id: "npm",
    label: "npm",
    src: `${SVGS}/npm.svg`,
    width: 60,
    showOnAbout: false,
    hero: { x: 92, y: 55 },
    about: { x: 92, y: 55 },
  },
  {
    id: "ring-text-badge",
    label: "Ring text badge",
    src: `${SVGS}/ring-text-badge.svg`,
    width: 60,
    showOnAbout: true,
    hero: { x: 55.3, y: 56.9 },
    about: { x: 86, y: 70 },
  },
  {
    id: "smiley-face-badge",
    label: "Smiley face badge",
    src: `${SVGS}/smiley-face-badge.svg`,
    width: 60,
    showOnAbout: true,
    hero: { x: 97.6, y: 39.9 },
    about: { x: 50, y: 14 },
  },
];
