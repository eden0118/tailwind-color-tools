/**
 * HexToTailwind - Hex 色碼轉換為最接近的 Tailwind 顏色
 *
 * 功能：
 * - 管理三種色彩格式（Hex、RGB、OKLCH）的同步轉換
 * - 實時計算並顯示最接近的 Tailwind 顏色匹配
 * - 提供視覺流程：輸入 → 檢測 → 匹配結果
 */
import { memo } from 'react';
import { useColorInput } from '@/hooks/useColorInput';
import DetectedColorSection from './hexToTailwind/DetectedColorSection';
import ColorMatchList from './hexToTailwind/ColorMatchList';
import ArrowDownIcon from './hexToTailwind/ArrowDownIcon';
import ColorInput from './ColorInput';
import { DEFAULT_COLOR } from '@/constants';

// ============================================================================
// HexToTailwind Component - Hex 轉 Tailwind 顏色轉換頁面
// ============================================================================

const HexToTailwind = memo(() => {
  const {
    hexInput,
    rgbInput,
    oklchInput,
    parsedColor,
    matches,
    setHexInput,
    setRgbInput,
    setOklchInput,
  } = useColorInput(DEFAULT_COLOR);

  return (
    <div className="space-y-8">
      {/* ====================================================================
          輸入區塊 - 三種格式的顏色輸入欄（Hex、RGB、OKLCH）
          ==================================================================== */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <ColorInput
          label="HEX Code"
          value={hexInput}
          onChange={setHexInput}
          placeholder="#3cc766"
          accentColor="hex"
        />

        <ColorInput
          label="RGB Values"
          value={rgbInput}
          onChange={setRgbInput}
          placeholder="60, 199, 102"
          accentColor="rgb"
        />

        <ColorInput
          label="OKLCH"
          value={oklchInput}
          onChange={setOklchInput}
          placeholder="oklch(73.40% 0.181 149.31)"
          accentColor="oklch"
        />
      </div>

      {parsedColor && (
        <div className="animate-in fade-in slide-in-from-bottom-2 space-y-6 duration-500">
          <DetectedColorSection color={parsedColor} />
          <ArrowDownIcon />
          {matches.length > 0 && <ColorMatchList matches={matches} />}
        </div>
      )}
    </div>
  );
});

HexToTailwind.displayName = 'HexToTailwind';

export default HexToTailwind;
