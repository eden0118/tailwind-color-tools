import { useState, useCallback } from 'react';
import {
  hexToRgb,
  rgbToHex,
  rgbToOklch,
  parseHex,
  parseRgbString,
  parseOklchString,
  oklchToRgb,
  findClosestTailwindColors,
} from '@/utils/colorUtils';
import { ColorMatch, TailwindColor } from '@/types';
import { DEFAULT_COLOR } from '@/constants';

interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface UseColorInputReturn {
  hexInput: string;
  rgbInput: string;
  oklchInput: string;
  parsedColor: TailwindColor | null;
  matches: ColorMatch[];
  setHexInput: (value: string) => void;
  setRgbInput: (value: string) => void;
  setOklchInput: (value: string) => void;
}

/**
 * useColorInput - 多格式顏色輸入管理 Hook
 *
 * 此 Hook 管理三種顏色格式（Hex、RGB、OKLCH）的同步轉換。
 * 當任何一種格式的輸入變化時，自動計算其他兩種格式的等效值。
 *
 * @param defaultColor - 初始顏色值，預設為 #3b82f6（藍色-500）
 *
 * @returns 返回包含以下內容的物件：
 *   - hexInput: Hex 格式的輸入值
 *   - rgbInput: RGB 格式的輸入值
 *   - oklchInput: OKLCH 格式的輸入值
 *   - parsedColor: 解析後的顏色物件（包含 class、hex、rgb）
 *   - matches: 最接近的 5 個 Tailwind 顏色（按距離排序）
 *   - setHexInput: 更新 Hex 輸入的函數
 *   - setRgbInput: 更新 RGB 輸入的函數
 *   - setOklchInput: 更新 OKLCH 輸入的函數
 *
 * @example
 * ```tsx
 * const { hexInput, setHexInput, matches } = useColorInput('#ff0000');
 * // 使用 hexInput 和 setHexInput 管理紅色的 Hex 輸入
 * // matches 會自動包含最接近紅色的 Tailwind 顏色
 * ```
 */
export const useColorInput = (defaultColor: string = DEFAULT_COLOR): UseColorInputReturn => {
  // ============================================================================
  // State Management - 狀態管理
  // ============================================================================

  const [hexInput, setHexInputState] = useState(defaultColor);
  const [rgbInput, setRgbInputState] = useState('59, 130, 246');
  const [oklchInput, setOklchInputState] = useState('oklch(60.13% 0.198 255.45)');
  const [parsedColor, setParsedColor] = useState<TailwindColor | null>(null);
  const [matches, setMatches] = useState<ColorMatch[]>([]);

  /**
   * updateFromRgb - 從 RGB 值更新所有格式
   *
   * 這是核心更新邏輯。當任何格式轉換為 RGB 時，調用此函數：
   * 1. 將 RGB 轉換為 Hex
   * 2. 將 RGB 轉換為 OKLCH
   * 3. 解析顏色（設定 parsedColor）
   * 4. 找到最接近的 Tailwind 顏色（設定 matches）
   *
   * @param rgb - RGB 顏色物件 { r, g, b }
   * @returns 返回轉換後的 hex 和 oklch 字符串
   */
  const updateFromRgb = useCallback((rgb: RGB) => {
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    const oklch = rgbToOklch(rgb.r, rgb.g, rgb.b);

    // 設定已解析的顏色物件
    setParsedColor({
      class: 'Input Color',
      hex,
      rgb,
    });

    // 查找最接近的 Tailwind 顏色（錯誤處理）
    try {
      setMatches(findClosestTailwindColors(hex));
    } catch (error) {
      console.error('Color matching error:', error);
      setMatches([]);
    }

    return { hex, oklch };
  }, []);

  // ============================================================================
  // Input Handlers - 輸入處理函數
  // ============================================================================

  /**
   * setHexInput - 處理 Hex 格式輸入變化
   *
   * 流程：
   * 1. 驗證 Hex 格式（#RGB 或 #RRGGBB）
   * 2. 轉換為 RGB
   * 3. 更新所有格式
   */
  const setHexInput = useCallback((val: string) => {
    setHexInputState(val);
    const parsed = parseHex(val);
    if (parsed) {
      const rgb = hexToRgb(parsed);
      if (rgb) {
        const { oklch } = updateFromRgb(rgb);
        setRgbInputState(`${rgb.r}, ${rgb.g}, ${rgb.b}`);
        setOklchInputState(oklch);
      }
    }
  }, [updateFromRgb]);

  /**
   * setRgbInput - 處理 RGB 格式輸入變化
   *
   * 流程：
   * 1. 驗證 RGB 格式（如 "255, 128, 0"）
   * 2. 更新其他格式
   */
  const setRgbInput = useCallback((val: string) => {
    setRgbInputState(val);
    const parsed = parseRgbString(val);
    if (parsed) {
      const { hex, oklch } = updateFromRgb(parsed);
      setHexInputState(hex);
      setOklchInputState(oklch);
    }
  }, [updateFromRgb]);

  /**
   * setOklchInput - 處理 OKLCH 格式輸入變化
   *
   * 流程：
   * 1. 驗證 OKLCH 格式（如 "oklch(60% 0.2 255)"）
   * 2. 轉換為 RGB
   * 3. 更新其他格式
   */
  const setOklchInput = useCallback((val: string) => {
    setOklchInputState(val);
    const parsed = parseOklchString(val);
    if (parsed) {
      const rgb = oklchToRgb(parsed.l, parsed.c, parsed.h);
      const { hex } = updateFromRgb(rgb);
      setHexInputState(hex);
      setRgbInputState(`${rgb.r}, ${rgb.g}, ${rgb.b}`);
    }
  }, [updateFromRgb]);

  // 初始化：在首次渲染時設定初始狀態
  if (!parsedColor) {
    const rgb = hexToRgb(defaultColor);
    if (rgb) {
      updateFromRgb(rgb);
    }
  }

  return {
    hexInput,
    rgbInput,
    oklchInput,
    parsedColor,
    matches,
    setHexInput,
    setRgbInput,
    setOklchInput,
  };
};
