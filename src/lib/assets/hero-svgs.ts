import type { AssetMode } from "./floating-assets";

export interface HeroSvgTransform {
  x: number;
  y: number;
  rotation?: number;
}

export interface HeroSvg {
  id: string;
  label: string;
  src: string;
  width: number;
  positions: Record<AssetMode, HeroSvgTransform>;
}

const SVGS = "/floating-assets/svgs";

// width = render width (px); x/y = center position (% of screen) per mode.
export const heroSvgs: HeroSvg[] = [
  {
    id: "bun",
    label: "Bun",
    src: `${SVGS}/bun.svg`,
    width: 60,
    positions: {
      chaos: { x: 12.6, y: 24.3 },
      cleaned: { x: 18, y: 28 },
      notebook: { x: 8, y: 18 },
    },
  },
  {
    id: "claude",
    label: "Claude",
    src: `${SVGS}/claude.svg`,
    width: 60,
    positions: {
      chaos: { x: 92.2, y: 25.1 },
      cleaned: { x: 34, y: 28 },
      notebook: { x: 90, y: 20 },
    },
  },
  {
    id: "comment-cursor",
    label: "Comment cursor",
    src: `${SVGS}/comment-cursor.svg`,
    width: 60,
    positions: {
      chaos: { x: 63.2, y: 18.4 },
      cleaned: { x: 50, y: 28 },
      notebook: { x: 50, y: 12 },
    },
  },
  {
    id: "figma",
    label: "Figma",
    src: `${SVGS}/figma.svg`,
    width: 60,
    positions: {
      chaos: { x: 83.2, y: 85.9 },
      cleaned: { x: 82, y: 28 },
      notebook: { x: 85, y: 78 },
    },
  },
  {
    id: "github",
    label: "GitHub",
    src: `${SVGS}/github.svg`,
    width: 60,
    positions: {
      chaos: { x: 70, y: 86 },
      cleaned: { x: 34, y: 50 },
      notebook: { x: 70, y: 86 },
    },
  },
  {
    id: "gsap",
    label: "GSAP",
    src: `${SVGS}/gsap.svg`,
    width: 60,
    positions: {
      chaos: { x: 12.2, y: 81.4 },
      cleaned: { x: 50, y: 50 },
      notebook: { x: 24, y: 60 },
    },
  },
  {
    id: "notion",
    label: "Notion",
    src: `${SVGS}/notion.svg`,
    width: 60,
    positions: {
      chaos: { x: 47.8, y: 82.9 },
      cleaned: { x: 66, y: 50 },
      notebook: { x: 76, y: 35 },
    },
  },
  {
    id: "npm",
    label: "npm",
    src: `${SVGS}/npm.svg`,
    width: 60,
    positions: {
      chaos: { x: 92, y: 55 },
      cleaned: { x: 82, y: 50 },
      notebook: { x: 92, y: 55 },
    },
  },
  {
    id: "ring-text-badge",
    label: "Ring text badge",
    src: `${SVGS}/ring-text-badge.svg`,
    width: 60,
    positions: {
      chaos: { x: 55.3, y: 56.9 },
      cleaned: { x: 34, y: 72 },
      notebook: { x: 12, y: 45 },
    },
  },
  {
    id: "smiley-face-badge",
    label: "Smiley face badge",
    src: `${SVGS}/smiley-face-badge.svg`,
    width: 60,
    positions: {
      chaos: { x: 97.6, y: 39.9 },
      cleaned: { x: 66, y: 72 },
      notebook: { x: 88, y: 90 },
    },
  },
];
