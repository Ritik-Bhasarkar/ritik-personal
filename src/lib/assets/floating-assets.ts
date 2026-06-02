export type AssetMode = "chaos" | "cleaned" | "notebook";

export interface AssetTransform {
  x: number;
  y: number;
  rotation: number;
}

export interface FloatingAsset {
  id: string;
  label: string;
  image: string;
  svg: string;
  sound: string;
  width: number;
  z?: number;
  positions: Record<AssetMode, AssetTransform>;
}

export const ASSET_MODES: AssetMode[] = ["chaos", "cleaned", "notebook"];

export const DEFAULT_ASSET_MODE: AssetMode = "chaos";

// Single fixed scale applied to every asset (size is driven by `width`).
export const ASSET_SCALE = 1;

const IMAGES = "/floating-assets/images";
const SOUNDS = "/floating-assets/sound-effects";

export const floatingAssets: FloatingAsset[] = [
  {
    id: "coffee-tube",
    label: "Blue Bottle coffee tube",
    image: `${IMAGES}/blue-bottle-coffee-tube.png`,
    svg: "",
    sound: `${SOUNDS}/water-drop.mp3`,
    width: 158,
    positions: {
      chaos: { x: 85.4, y: 61.6, rotation: -14 },
      cleaned: { x: 18, y: 22, rotation: 0 },
      notebook: { x: 20, y: 25, rotation: -5 },
    },
  },
  {
    id: "folder",
    label: "Blue folder icon",
    image: `${IMAGES}/blue-folder-icon.png`,
    svg: "",
    sound: `${SOUNDS}/folder.mp3`,
    width: 115,
    positions: {
      chaos: { x: 76.5, y: 40.2, rotation: -11 },
      cleaned: { x: 39, y: 22, rotation: 0 },
      notebook: { x: 78, y: 28, rotation: 5 },
    },
  },
  {
    id: "paracetamol-box",
    label: "Doliprane paracetamol box",
    image: `${IMAGES}/doliprane-paracetamol-box.png`,
    svg: "",
    sound: `${SOUNDS}/pill.mp3`,
    width: 61,
    positions: {
      chaos: { x: 4.4, y: 77.3, rotation: -16 },
      cleaned: { x: 61, y: 22, rotation: 0 },
      notebook: { x: 80, y: 70, rotation: -4 },
    },
  },
  {
    id: "dictionary-clipping",
    label: "Dreams dictionary clipping",
    image: `${IMAGES}/dreams-dictionary-clipping.png`,
    svg: "",
    sound: `${SOUNDS}/turnpage.mp3`,
    width: 125,
    z: 40,
    positions: {
      chaos: { x: 21.8, y: 24.7, rotation: -12 },
      cleaned: { x: 82, y: 22, rotation: 0 },
      notebook: { x: 22, y: 72, rotation: 6 },
    },
  },
  {
    id: "table-lamp",
    label: "Flowerpot table lamp",
    image: `${IMAGES}/flowerpot-table-lamp.png`,
    svg: "",
    sound: `${SOUNDS}/desk-lamp.mp3`,
    width: 202,
    z: 40,
    positions: {
      chaos: { x: 12.4, y: 24.9, rotation: 0 },
      cleaned: { x: 18, y: 50, rotation: 0 },
      notebook: { x: 10, y: 48, rotation: 0 },
    },
  },
  {
    id: "film-roll",
    label: "Kodak Portra 400 film",
    image: `${IMAGES}/kodak-portra-400-film.png`,
    svg: "",
    sound: `${SOUNDS}/analog-camera.mp3`,
    width: 150,
    positions: {
      chaos: { x: 8.1, y: 57.1, rotation: 13 },
      cleaned: { x: 39, y: 50, rotation: 0 },
      notebook: { x: 88, y: 50, rotation: -6 },
    },
  },
  {
    id: "ms-paint-toolbar",
    label: "MS Paint toolbar",
    image: `${IMAGES}/ms-paint-toolbar.png`,
    svg: "",
    sound: `${SOUNDS}/windows-xp.mp3`,
    width: 100,
    positions: {
      chaos: { x: 94.3, y: 57.3, rotation: 0 },
      cleaned: { x: 61, y: 50, rotation: 0 },
      notebook: { x: 35, y: 15, rotation: 4 },
    },
  },
  {
    id: "gel-pen",
    label: "Muji clear gel pen",
    image: `${IMAGES}/muji-clear-gel-pen.png`,
    svg: "",
    sound: `${SOUNDS}/pen-click.mp3`,
    width: 72,
    positions: {
      chaos: { x: 26.2, y: 34, rotation: 3 },
      cleaned: { x: 82, y: 50, rotation: 0 },
      notebook: { x: 65, y: 15, rotation: -4 },
    },
  },
  {
    id: "notebook",
    label: "Open grid notebook",
    image: `${IMAGES}/open-grid-notebook.png`,
    svg: "",
    sound: `${SOUNDS}/writing-scribble-on-paper.wav`,
    width: 553,
    positions: {
      chaos: { x: 5.7, y: 47.2, rotation: -26 },
      cleaned: { x: 18, y: 78, rotation: 0 },
      notebook: { x: 50, y: 48, rotation: 0 },
    },
  },
  {
    id: "cursor-arrow",
    label: "Pixel cursor arrow",
    image: `${IMAGES}/pixel-cursor-arrow.png`,
    svg: "",
    sound: `${SOUNDS}/mouse-click.mp3`,
    width: 55,
    positions: {
      chaos: { x: 73.9, y: 11, rotation: -14 },
      cleaned: { x: 39, y: 78, rotation: 0 },
      notebook: { x: 66, y: 82, rotation: 0 },
    },
  },
  {
    id: "torn-note",
    label: "Torn paper note with paperclip",
    image: `${IMAGES}/torn-paper-note-with-paperclip.png`,
    svg: "",
    sound: `${SOUNDS}/paper-ripping.mp3`,
    width: 211,
    positions: {
      chaos: { x: -3.9, y: 30, rotation: 0 },
      cleaned: { x: 61, y: 78, rotation: 0 },
      notebook: { x: 34, y: 84, rotation: 3 },
    },
  },
  {
    id: "lighter",
    label: "White Bic lighter",
    image: `${IMAGES}/white-bic-lighter.png`,
    svg: "",
    sound: `${SOUNDS}/lighter.wav`,
    width: 61,
    positions: {
      chaos: { x: 21, y: 49.9, rotation: -26 },
      cleaned: { x: 82, y: 78, rotation: 0 },
      notebook: { x: 90, y: 82, rotation: -8 },
    },
  },
];
