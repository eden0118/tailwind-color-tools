/**
 * @fileoverview
 * Core TypeScript types and interfaces used throughout the application
 *
 * Defines color data structures, UI modes, and type-safe patterns
 * for color conversion, matching, and display
 */

/**
 * Represents a standard Tailwind CSS color
 */
export interface TailwindColor {
  /**
   * The class name of the color, e.g. "blue-500"
   */
  class: string;
  /**
   * The hex code of the color, e.g. "#3b82f6"
   */
  hex: string;
  /**
   * The RGB representation of the color
   */
  rgb: { r: number; g: number; b: number };
}

/**
 * Represents a Tailwind color that matches an input color
 * Extends TailwindColor with a distance/similarity metric
 */
export interface ColorMatch extends TailwindColor {
  /**
   * Perceptual distance from the input color
   * Lower values indicate closer color match
   * Calculated as Euclidean distance in RGB color space
   */
  distance: number;
}

/**
 * Defines the two primary operation modes of the application
 */
export enum AppMode {
  /**
   * "Code to Class" mode: Convert color codes (Hex, RGB, OKLCH) to nearest Tailwind class
   */
  HEX_TO_TAILWIND = 'HEX_TO_TAILWIND',
  /**
   * "Class to Code" mode: Convert Tailwind class names to their color codes
   */
  TAILWIND_TO_HEX = 'TAILWIND_TO_HEX',
}
