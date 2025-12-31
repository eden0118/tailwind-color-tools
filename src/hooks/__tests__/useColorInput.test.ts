/**
 * @fileoverview
 * useColorInput Hook 單元測試
 *
 * 測試色彩格式同步轉換邏輯
 */
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useColorInput } from '@/hooks/useColorInput';

describe('useColorInput Hook', () => {
  it('should initialize with default color', () => {
    const { result } = renderHook(() => useColorInput('#3b82f6'));
    expect(result.current.hexInput).toBe('#3b82f6');
  });

  it('should sync RGB when Hex changes', () => {
    const { result } = renderHook(() => useColorInput());
    act(() => {
      result.current.setHexInput('#ff0000');
    });
    expect(result.current.rgbInput).toContain('255');
    expect(result.current.rgbInput).toContain('0');
  });

  it('should sync OKLCH when Hex changes', () => {
    const { result } = renderHook(() => useColorInput());
    act(() => {
      result.current.setHexInput('#ffffff');
    });
    expect(result.current.oklchInput).toContain('oklch');
  });

  it('should find closest Tailwind colors', () => {
    const { result } = renderHook(() => useColorInput('#3b82f6'));
    expect(result.current.matches.length).toBeGreaterThan(0);
    expect(result.current.matches[0].distance).toBeLessThanOrEqual(
      result.current.matches[1]?.distance || Infinity
    );
  });

  it('should parse color correctly', () => {
    const { result } = renderHook(() => useColorInput('#ff0000'));
    expect(result.current.parsedColor?.hex).toBe('#ff0000');
  });
});
