import { useState, useCallback, useEffect } from 'react';
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

export const useColorInput = (defaultColor: string = DEFAULT_COLOR): UseColorInputReturn => {
  // 1. 輔助函數：統一計算初始狀態，避免 Hardcode
  const getInitialState = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (rgb) {
      return {
        hex,
        rgb: `${rgb.r}, ${rgb.g}, ${rgb.b}`,
        oklch: rgbToOklch(rgb.r, rgb.g, rgb.b),
        parsed: {
          class: 'Input Color',
          hex,
          rgb,
        },
        matches: findClosestTailwindColors(hex),
      };
    }
    // Fallback 如果 defaultColor 無效
    return {
      hex,
      rgb: '',
      oklch: '',
      parsed: null,
      matches: [],
    };
  };

  // 2. 使用 Lazy Initialization 設定初始值
  const initialState = getInitialState(defaultColor);

  // 我們將 inputs 分離出來以便獨立控制 (因為使用者輸入時可能是無效字串，不能一直同步 state)
  const [hexInput, setHexInputState] = useState(initialState.hex);
  const [rgbInput, setRgbInputState] = useState(initialState.rgb);
  const [oklchInput, setOklchInputState] = useState(initialState.oklch);
  const [parsedColor, setParsedColor] = useState<TailwindColor | null>(initialState.parsed);
  const [matches, setMatches] = useState<ColorMatch[]>(initialState.matches);

  // 3. 核心更新邏輯：當解析出有效 RGB 時，更新所有衍生的“有效”狀態
  // 注意：這裡只更新「計算後的值」，不直接覆寫使用者的輸入框，除非是跨格式同步
  const syncValidColor = useCallback((rgb: RGB, sourceFormat: 'hex' | 'rgb' | 'oklch') => {
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    const oklch = rgbToOklch(rgb.r, rgb.g, rgb.b);
    const rgbStr = `${rgb.r}, ${rgb.g}, ${rgb.b}`;

    // 更新已解析的顏色物件
    setParsedColor({
      class: 'Input Color',
      hex,
      rgb,
    });

    try {
      setMatches(findClosestTailwindColors(hex));
    } catch (error) {
      console.error('Color matching error:', error);
      setMatches([]);
    }

    // 同步更新其他格式的 Input 字串
    // (如果不更新，當使用者在 Hex 輸入有效值，RGB 輸入框不會變動)
    if (sourceFormat !== 'hex') setHexInputState(hex);
    if (sourceFormat !== 'rgb') setRgbInputState(rgbStr);
    if (sourceFormat !== 'oklch') setOklchInputState(oklch);
  }, []);

  // 4. 清除邏輯
  const clearParsedState = useCallback(() => {
    setParsedColor(null);
    setMatches([]);
  }, []);

  // ============================================================================
  // Input Handlers
  // ============================================================================

  const setHexInput = useCallback(
    (val: string) => {
      setHexInputState(val); // 總是允許使用者輸入任何內容
      const parsed = parseHex(val);

      if (parsed) {
        const rgb = hexToRgb(parsed);
        if (rgb) {
          syncValidColor(rgb, 'hex');
        } else {
          clearParsedState();
        }
      } else {
        // 邏輯修正：只要輸入無效，就應該清除解析狀態，以免誤導使用者
        clearParsedState();
      }
    },
    [syncValidColor, clearParsedState]
  );

  const setRgbInput = useCallback(
    (val: string) => {
      setRgbInputState(val);
      const parsed = parseRgbString(val);

      if (parsed) {
        syncValidColor(parsed, 'rgb');
      } else {
        clearParsedState();
      }
    },
    [syncValidColor, clearParsedState]
  );

  const setOklchInput = useCallback(
    (val: string) => {
      setOklchInputState(val);
      const parsed = parseOklchString(val);

      if (parsed) {
        const rgb = oklchToRgb(parsed.l, parsed.c, parsed.h);
        syncValidColor(rgb, 'oklch');
      } else {
        clearParsedState();
      }
    },
    [syncValidColor, clearParsedState]
  );

  // 如果需要回應外部 defaultColor 的變化 (Optional)
  useEffect(() => {
    if (defaultColor) {
      const initialState = getInitialState(defaultColor);
      setHexInputState(initialState.hex);
      setRgbInputState(initialState.rgb);
      setOklchInputState(initialState.oklch);
      setParsedColor(initialState.parsed);
      setMatches(initialState.matches);
    }
  }, [defaultColor]);

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
