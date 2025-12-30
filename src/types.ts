export interface TailwindColor {
  class: string;
  hex: string;
  rgb: { r: number; g: number; b: number };
}

export interface ColorMatch extends TailwindColor {
  distance: number;
}

export enum AppMode {
  HEX_TO_TAILWIND = 'HEX_TO_TAILWIND',
  TAILWIND_TO_HEX = 'TAILWIND_TO_HEX',
}
