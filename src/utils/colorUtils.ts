import { TailwindColor, ColorMatch } from '@/types';
import {
  COLORS,
  HEX_PATTERN,
  RGB_PATTERN,
  OKLCH_PATTERN,
  DEFAULT_MATCH_LIMIT,
} from '@/constants';

interface RGB {
  r: number;
  g: number;
  b: number;
}

// ============================================================================
// Color Space Conversion Functions
// ============================================================================

/**
 * Converts hexadecimal color string to RGB object
 * Supports both full (#RRGGBB) and shorthand (#RGB) formats
 */
export const hexToRgb = (hex: string): RGB | null => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (_m, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

/**
 * Converts RGB values to hexadecimal color string
 * Clamps values to 0-255 range
 */
const colorToHex = (n: number): string => {
  const clamped = Math.max(0, Math.min(255, Math.round(n)));
  const hex = clamped.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
};

export const rgbToHex = (r: number, g: number, b: number): string => {
  return `#${colorToHex(r)}${colorToHex(g)}${colorToHex(b)}`;
};

// ============================================================================
// OKLCH Color Space Conversion
// ============================================================================

/**
 * Converts RGB to OKLCH color space
 * OKLCH is a perceptually uniform color space that's better for color matching
 */
export const rgbToOklch = (r: number, g: number, b: number): string => {
  // 1. sRGB to Linear sRGB
  const toLinear = (c: number) => {
    const val = c / 255;
    return val > 0.04045 ? Math.pow((val + 0.055) / 1.055, 2.4) : val / 12.92;
  };

  const lr = toLinear(r);
  const lg = toLinear(g);
  const lb = toLinear(b);

  // 2. Linear sRGB to LMS
  const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;

  // 3. Cone response (cube root)
  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  // 4. LMS to OKLab
  const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
  const b_ = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;

  // 5. OKLab to OKLCH
  const C = Math.sqrt(a * a + b_ * b_);
  let h = Math.atan2(b_, a) * (180 / Math.PI);
  if (h < 0) h += 360;

  // Format output
  if (L < 0.0001) return 'oklch(0% 0 0)';
  if (C < 0.0001) return `oklch(${(L * 100).toFixed(2)}% 0 0)`;

  const L_perc = (L * 100).toFixed(2);
  const C_val = C.toFixed(3);
  const h_val = h.toFixed(2);

  return `oklch(${L_perc}% ${C_val} ${h_val})`;
};

/**
 * Converts OKLCH color space to RGB
 * Inverse transformation of rgbToOklch
 */
export const oklchToRgb = (l: number, c: number, h: number): RGB => {
  // 1. OKLCH -> OKLab
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);

  // 2. OKLab -> LMS'
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.2914855480 * b;

  // 3. LMS' -> LMS (cube)
  const l3 = l_ * l_ * l_;
  const m3 = m_ * m_ * m_;
  const s3 = s_ * s_ * s_;

  // 4. LMS -> Linear sRGB
  const rLin = 4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  const gLin = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  const bLin = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.7076147010 * s3;

  // 5. Linear sRGB -> sRGB (Gamma correction)
  const toSrgb = (val: number) => {
    const v = val > 0.0031308 ? 1.055 * Math.pow(val, 1 / 2.4) - 0.055 : 12.92 * val;
    return Math.max(0, Math.min(255, Math.round(v * 255)));
  };

  return {
    r: toSrgb(rLin),
    g: toSrgb(gLin),
    b: toSrgb(bLin),
  };
};

// ============================================================================
// Color Format Parsing Functions
// ============================================================================

/**
 * Parses hexadecimal color input
 * Validates format and returns normalized hex string
 */
export const parseHex = (input: string): string | null => {
  const clean = input.trim().toLowerCase();
  if (!HEX_PATTERN.test(clean)) return null;
  const rgb = hexToRgb(clean);
  return rgb ? rgbToHex(rgb.r, rgb.g, rgb.b) : null;
};

/**
 * Parses RGB color string
 * Supports: "255, 128, 0" or "rgb(255 128 0)" formats
 */
export const parseRgbString = (input: string): RGB | null => {
  const clean = input.trim().toLowerCase();
  const match = RGB_PATTERN.exec(clean);

  if (!match) return null;

  const r = parseInt(match[1], 10);
  const g = parseInt(match[2], 10);
  const b = parseInt(match[3], 10);

  return r <= 255 && g <= 255 && b <= 255 ? { r, g, b } : null;
};

/**
 * Parses OKLCH color string
 * Format: "oklch(L% C H)" where L is 0-100%, C is typically 0-0.4, H is 0-360
 */
export const parseOklchString = (
  input: string
): { l: number; c: number; h: number } | null => {
  const clean = input.trim().toLowerCase();
  const match = OKLCH_PATTERN.exec(clean);

  if (!match) return null;

  let l = parseFloat(match[1]);
  const c = parseFloat(match[2]);
  const h = parseFloat(match[3]);

  // Convert percentage to decimal
  if (match[1].endsWith('%')) {
    l = l / 100;
  }

  return { l, c, h };
};

/**
 * Unified color parser
 * Attempts to parse input as any supported format
 */
export const parseColor = (input: string): { hex: string; rgb: RGB } | null => {
  // Try Hex first
  const hex = parseHex(input);
  if (hex) {
    const rgb = hexToRgb(hex);
    if (rgb) return { hex, rgb };
  }

  // Try RGB
  const rgb = parseRgbString(input);
  if (rgb) return { hex: rgbToHex(rgb.r, rgb.g, rgb.b), rgb };

  // Try OKLCH
  const oklch = parseOklchString(input);
  if (oklch) {
    const rgbVal = oklchToRgb(oklch.l, oklch.c, oklch.h);
    return { hex: rgbToHex(rgbVal.r, rgbVal.g, rgbVal.b), rgb: rgbVal };
  }

  return null;
};

// ============================================================================
// Tailwind Color Matching Functions
// ============================================================================

/**
 * Calculates Euclidean distance between two RGB colors
 * Lower distance = more similar colors
 */
const colorDistance = (rgb1: RGB, rgb2: RGB): number => {
  const dr = rgb1.r - rgb2.r;
  const dg = rgb1.g - rgb2.g;
  const db = rgb1.b - rgb2.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
};

/**
 * Converts color palette record to TailwindColor array
 */
const buildColorPalette = (colors: Record<string, string>): TailwindColor[] => {
  return Object.entries(colors)
    .map(([name, hex]) => {
      const rgb = hexToRgb(hex);
      if (!rgb) throw new Error(`Invalid hex in palette: ${hex}`);
      return { class: name, hex, rgb };
    });
};

// Precomputed palette
export const ALL_TAILWIND_COLORS: TailwindColor[] = buildColorPalette(COLORS);

/**
 * Finds closest matching Tailwind colors to a given hex color
 */
export const findClosestTailwindColors = (
  inputHex: string,
  limit = DEFAULT_MATCH_LIMIT
): ColorMatch[] => {
  const inputRgb = hexToRgb(inputHex);
  if (!inputRgb) return [];

  return ALL_TAILWIND_COLORS.map((tc) => ({
    ...tc,
    distance: colorDistance(inputRgb, tc.rgb),
  }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
};

/**
 * Finds exact Tailwind color by class name
 * Normalizes input by removing common CSS prefixes
 */
export const findHexByClass = (className: string): TailwindColor | undefined => {
  const cleanClass = className.replace(/^(bg|text|border|ring)-/, '').toLowerCase();
  return ALL_TAILWIND_COLORS.find((tc) => tc.class === cleanClass);
};