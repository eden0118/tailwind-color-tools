/**
 * @fileoverview
 * colorUtils.ts 單元測試
 *
 * 測試所有色彩轉換函式的正確性：
 * - Hex ↔ RGB 轉換
 * - RGB ↔ OKLCH 轉換
 * - 格式解析（parseHex、parseRgb、parseOklch）
 * - 顏色匹配與搜尋
 */
import { describe, it, expect } from 'vitest';
import {
  hexToRgb,
  rgbToHex,
  rgbToOklch,
  oklchToRgb,
  parseHex,
  parseRgbString,
  parseOklchString,
  findHexByClass,
  ALL_TAILWIND_COLORS,
} from '@/utils/colorUtils';

describe('Color Space Conversion', () => {
  describe('hexToRgb', () => {
    it('should convert full hex to RGB', () => {
      expect(hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
      expect(hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0 });
    });

    it('should convert shorthand hex to RGB', () => {
      expect(hexToRgb('#fff')).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb('#f00')).toEqual({ r: 255, g: 0, b: 0 });
    });

    it('should handle case-insensitive input', () => {
      expect(hexToRgb('#FFF')).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb('#AbCdEf')).toEqual({ r: 171, g: 205, b: 239 });
    });

    it('should return null for invalid hex', () => {
      expect(hexToRgb('invalid')).toBeNull();
      expect(hexToRgb('#gggggg')).toBeNull();
    });
  });

  describe('rgbToHex', () => {
    it('should convert RGB to hex', () => {
      expect(rgbToHex(255, 255, 255)).toBe('#ffffff');
      expect(rgbToHex(0, 0, 0)).toBe('#000000');
      expect(rgbToHex(255, 0, 0)).toBe('#ff0000');
    });

    it('should clamp values to 0-255 range', () => {
      expect(rgbToHex(256, -1, 128)).toBe('#ff0080');
    });
  });

  describe('rgbToOklch and oklchToRgb', () => {
    it('should convert RGB to OKLCH format', () => {
      const oklch = rgbToOklch(255, 0, 0);
      expect(oklch).toMatch(/oklch\(/);
      expect(oklch).toMatch(/%/);
    });

    it('should convert OKLCH back to RGB', () => {
      const rgb = oklchToRgb(0.628, 0.259, 29.23);
      expect(rgb.r).toBeGreaterThan(0);
      expect(rgb.g).toBeGreaterThan(0);
      expect(rgb.b).toBeGreaterThan(0);
    });

    it('should handle white color correctly', () => {
      const oklch = rgbToOklch(255, 255, 255);
      expect(oklch).toContain('100');
    });
  });
});

describe('Color Format Parsing', () => {
  describe('parseHex', () => {
    it('should parse valid hex colors', () => {
      expect(parseHex('#ffffff')).toBe('#ffffff');
      expect(parseHex('#fff')).toBe('#ffffff');
      expect(parseHex('FF0000')).toBe('#ff0000');
    });

    it('should return null for invalid hex', () => {
      expect(parseHex('not-hex')).toBeNull();
      expect(parseHex('#gggg')).toBeNull();
    });

    it('should handle whitespace', () => {
      expect(parseHex('  #fff  ')).toBe('#ffffff');
    });
  });

  describe('parseRgbString', () => {
    it('should parse RGB strings with various separators', () => {
      expect(parseRgbString('255, 128, 0')).toEqual({ r: 255, g: 128, b: 0 });
      expect(parseRgbString('255 128 0')).toEqual({ r: 255, g: 128, b: 0 });
      expect(parseRgbString('rgb(255, 128, 0)')).toEqual({ r: 255, g: 128, b: 0 });
    });

    it('should return null for out-of-range values', () => {
      expect(parseRgbString('256, 128, 0')).toBeNull();
      expect(parseRgbString('255, 256, 0')).toBeNull();
    });

    it('should handle whitespace', () => {
      expect(parseRgbString('  255 , 128 , 0  ')).toEqual({ r: 255, g: 128, b: 0 });
    });
  });

  describe('parseOklchString', () => {
    it('should parse OKLCH strings', () => {
      const result = parseOklchString('oklch(60% 0.2 250)');
      expect(result?.l).toBeCloseTo(0.6);
      expect(result?.c).toBeCloseTo(0.2);
      expect(result?.h).toBeCloseTo(250);
    });

    it('should handle percentage format for lightness', () => {
      const result = parseOklchString('oklch(100% 0 0)');
      expect(result?.l).toBe(1.0);
    });
  });
});

describe('Tailwind Color Matching', () => {
  describe('findHexByClass', () => {
    it('should find colors by class name', () => {
      const color = findHexByClass('blue-500');
      expect(color).toBeDefined();
      expect(color?.class).toBe('blue-500');
    });

    it('should handle case-insensitive search', () => {
      const color1 = findHexByClass('BLUE-500');
      const color2 = findHexByClass('blue-500');
      expect(color1?.class).toBe(color2?.class);
    });

    it('should remove common CSS prefixes', () => {
      const withoutPrefix = findHexByClass('blue-500');
      const withPrefix = findHexByClass('bg-blue-500');
      expect(withPrefix?.class).toBe(withoutPrefix?.class);
    });

    it('should return undefined for non-existent colors', () => {
      expect(findHexByClass('nonexistent-color')).toBeUndefined();
    });
  });

  describe('ALL_TAILWIND_COLORS', () => {
    it('should contain all expected color families', () => {
      const families = new Set(ALL_TAILWIND_COLORS.map((c) => c.class.split('-')[0]));
      expect(families.size).toBeGreaterThan(10);
      expect(families.has('blue')).toBe(true);
      expect(families.has('red')).toBe(true);
      expect(families.has('slate')).toBe(true);
    });

    it('should have valid hex values for all colors', () => {
      ALL_TAILWIND_COLORS.forEach((color) => {
        expect(color.hex).toMatch(/^#[0-9a-f]{6}$/i);
      });
    });

    it('should have valid RGB values for all colors', () => {
      ALL_TAILWIND_COLORS.forEach((color) => {
        expect(color.rgb.r).toBeGreaterThanOrEqual(0);
        expect(color.rgb.r).toBeLessThanOrEqual(255);
        expect(color.rgb.g).toBeGreaterThanOrEqual(0);
        expect(color.rgb.g).toBeLessThanOrEqual(255);
        expect(color.rgb.b).toBeGreaterThanOrEqual(0);
        expect(color.rgb.b).toBeLessThanOrEqual(255);
      });
    });
  });
});
