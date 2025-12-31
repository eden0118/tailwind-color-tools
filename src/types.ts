/**
 * @fileoverview
 * 這個檔案定義了整個應用程式中使用的核心 TypeScript 型別。
 */

/**
 * 代表一個標準的 Tailwind CSS 顏色。
 */
export interface TailwindColor {
  /**
   * 顏色的 class 名稱，例如 "blue-500"。
   */
  class: string;
  /**
   * 顏色的十六進位碼，例如 "#3b82f6"。
   */
  hex: string;
  /**
   * 顏色的 RGB 表示。
   */
  rgb: { r: number; g: number; b: number };
}

/**
 * 代表一個與輸入顏色匹配的 Tailwind 顏色。
 * 繼承自 `TailwindColor`，並額外包含一個距離值。
 */
export interface ColorMatch extends TailwindColor {
  /**
   * 與輸入顏色的感知距離。
   * 數值越小，表示顏色越接近。
   * 這個距離是在 RGB 空間中計算的歐幾里得距離。
   */
  distance: number;
}

/**
 * 定義應用程式的兩種主要功能模式。
 */
export enum AppMode {
  /**
   * "Code to Class" 模式：將十六進位碼等顏色值轉換為最接近的 Tailwind class。
   */
  HEX_TO_TAILWIND = 'HEX_TO_TAILWIND',
  /**
   * "Class to Code" 模式：將 Tailwind class 名稱轉換為其對應的顏色碼。
   */
  TAILWIND_TO_HEX = 'TAILWIND_TO_HEX',
}
