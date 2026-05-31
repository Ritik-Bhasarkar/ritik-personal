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
      chaos: { x: 8, y: 18 },
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
      chaos: { x: 90, y: 20 },
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
      chaos: { x: 50, y: 12 },
      cleaned: { x: 50, y: 28 },
      notebook: { x: 50, y: 12 },
    },
  },
  {
    id: "facetime",
    label: "FaceTime",
    src: `${SVGS}/facetime.svg`,
    width: 60,
    positions: {
      chaos: { x: 15, y: 80 },
      cleaned: { x: 66, y: 28 },
      notebook: { x: 15, y: 80 },
    },
  },
  {
    id: "figma",
    label: "Figma",
    src: `${SVGS}/figma.svg`,
    width: 60,
    positions: {
      chaos: { x: 85, y: 78 },
      cleaned: { x: 82, y: 28 },
      notebook: { x: 85, y: 78 },
    },
  },
  {
    id: "github-glyph",
    label: "GitHub glyph",
    src: `${SVGS}/github-glyph.svg`,
    width: 60,
    positions: {
      chaos: { x: 30, y: 30 },
      cleaned: { x: 18, y: 50 },
      notebook: { x: 30, y: 30 },
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
      chaos: { x: 24, y: 60 },
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
      chaos: { x: 76, y: 35 },
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
    id: "paperclip",
    label: "Paperclip",
    src: `${SVGS}/paperclip.svg`,
    width: 60,
    positions: {
      chaos: { x: 45, y: 72 },
      cleaned: { x: 18, y: 72 },
      notebook: { x: 45, y: 72 },
    },
  },
  {
    id: "ring-text-badge",
    label: "Ring text badge",
    src: `${SVGS}/ring-text-badge.svg`,
    width: 60,
    positions: {
      chaos: { x: 12, y: 45 },
      cleaned: { x: 34, y: 72 },
      notebook: { x: 12, y: 45 },
    },
  },
  {
    id: "safari",
    label: "Safari",
    src: `${SVGS}/safari.svg`,
    width: 60,
    positions: {
      chaos: { x: 60, y: 48 },
      cleaned: { x: 50, y: 72 },
      notebook: { x: 60, y: 48 },
    },
  },
  {
    id: "smiley-face-badge",
    label: "Smiley face badge",
    src: `${SVGS}/smiley-face-badge.svg`,
    width: 60,
    positions: {
      chaos: { x: 88, y: 90 },
      cleaned: { x: 66, y: 72 },
      notebook: { x: 88, y: 90 },
    },
  },
];
