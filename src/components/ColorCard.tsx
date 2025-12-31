/**
 * @fileoverview
 * ColorCard 元件 - 顏色詳細資訊卡片
 *
 * 責任：
 * - 展示單一顏色的完整資訊（Hex、RGB、OKLCH）
 * - 提供一鍵複製功能（複製 Hex、RGB、OKLCH 或 Tailwind Class）
 * - 視覺化顏色預覽與亮度指標
 * - 突出顯示「最接近」的匹配顏色（isClosest=true）
 *
 * 複製反饋：
 * - 點擊複製時，按鈕文字切換為 ✓ 並禁用 0.5 秒
 * - 確保使用者清晰看到複製完成的反饋
 *
 * 支援的顏色類型：
 * - TailwindColor：Tailwind 預設色彩（帶 class 名稱）
 * - ColorMatch：搜尋結果（可能帶 distance 偏差值）
 */
import { useState, useCallback, memo } from 'react';
import { ColorMatch, TailwindColor } from '@/types';
import { Clipboard, Check } from 'lucide-react';
import { rgbToOklch } from '@/utils/colorUtils';
import { COPY_FEEDBACK_DURATION } from '@/constants';

// ============================================================================
// Types
// ============================================================================

interface ColorCardProps {
  color: TailwindColor | ColorMatch;
  isClosest?: boolean;
}

type CopyType = 'hex' | 'class' | 'rgb' | 'oklch' | null;

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * 根據背景色亮度判斷文字應使用的對比色
 *
 * 使用 YIQ 公式計算亮度，確保文字可讀性。
 * YIQ 是基於人眼對不同顏色頻率敏感度的加權平均。
 *
 * @param hex - Hex 色碼（如 #3b82f6）
 * @returns 'black' 用於淺色背景，'white' 用於深色背景
 */
const getContrastColor = (hex: string): 'black' | 'white' => {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  // YIQ 公式：考慮人眼對不同顏色的敏感度
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness >= 128 ? 'black' : 'white';
};

// ============================================================================
// Sub Components - 子元件
// ============================================================================

/**
 * CopyButton - 可複製內容的按鈕
 *
 * 用途：
 * - 顯示可複製的內容（Hex、顏色名稱、RGB 等）
 * - 點擊後複製內容到剪貼板
 * - 短暫顯示複製成功的視覺反饋（綠色勾選標記）
 *
 * @param text - 要複製的文本內容
 * @param type - 複製類型（用於狀態管理）
 * @param isCopied - 是否正在顯示複製成功狀態
 * @param onCopy - 複製事件回調
 */
interface CopyButtonProps {
  text: string;
  type: CopyType;
  isCopied: boolean;
  onCopy: (text: string, type: CopyType) => void;
}

const CopyButton = memo<CopyButtonProps>(({ text, type, isCopied, onCopy }) => (
  <button
    onClick={() => onCopy(text, type)}
    className="bg-border text-muted hover:bg-ui hover:text-primary flex items-center justify-center gap-1 rounded px-3 py-1.5 text-xs transition-colors md:text-sm"
  >
    <span className="font-mono">{text}</span>
    {isCopied ? <Check size={14} className="text-accent-green" /> : <Clipboard size={14} />}
  </button>
));

CopyButton.displayName = 'CopyButton';

/**
 * FormatDisplay - 格式顯示區塊
 *
 * 用途：
 * - 展示特定顏色格式的值（RGB、OKLCH 等）
 * - 提供便捷的複製按鈕
 * - 右側小圖示按鈕以節省空間
 *
 * @param text - 格式值文本
 * @param type - 格式類型
 * @param isCopied - 是否正在顯示複製成功狀態
 * @param onCopy - 複製事件回調
 */
interface FormatDisplayProps {
  text: string;
  type: CopyType;
  isCopied: boolean;
  onCopy: (text: string, type: CopyType) => void;
}

const FormatDisplay = memo<FormatDisplayProps>(({ text, type, isCopied, onCopy }) => (
  <div className="flex items-center gap-2">
    <span className="font-mono text-xs">{text}</span>
    <button
      onClick={() => onCopy(text, type)}
      className="text-ui hover:text-muted transition-colors"
      title={`Copy ${type?.toUpperCase()}`}
    >
      {isCopied ? <Check size={12} className="text-accent-green" /> : <Clipboard size={12} />}
    </button>
  </div>
));

FormatDisplay.displayName = 'FormatDisplay';

// ============================================================================
// Main Component - 主元件
// ============================================================================

/**
 * ColorCard - 顏色資訊卡片元件
 *
 * 此元件展示單個顏色的完整資訊，包括：
 * - 顏色預覽（色塊）
 * - 顏色名稱（Tailwind 類別名）
 * - 複製按鈕（支援 Hex、RGB、OKLCH 和類別名）
 * - 偏差指標（僅在匹配結果中顯示）
 * - 最接近指標（當 isClosest 為 true）
 *
 * @param color - 顏色物件（可以是 TailwindColor 或 ColorMatch）
 * @param isClosest - 是否是最接近的匹配（用於突出顯示）
 *
 * 關鍵特性：
 * - 使用 memo() 防止不必要的重新渲染
 * - useCallback() 確保複製函數的穩定性
 * - 自動計算對比色以確保文字可讀性
 * - 支援 Hex、RGB、OKLCH 三種格式的複製
 */
const ColorCard = memo<ColorCardProps>(({ color, isClosest }) => {
  // ========================================================================
  // State Management
  // ========================================================================

  const [copied, setCopied] = useState<CopyType>(null);

  // ========================================================================
  // Event Handlers - 事件處理
  // ========================================================================

  /**
   * handleCopy - 複製內容到剪貼板
   *
   * 流程：
   * 1. 寫入文本到剪貼板 API
   * 2. 設定複製成功的視覺狀態
   * 3. 在 COPY_FEEDBACK_DURATION（2秒）後清除狀態
   */
  const handleCopy = useCallback((text: string, type: CopyType) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    const timer = setTimeout(() => setCopied(null), COPY_FEEDBACK_DURATION);
    return () => clearTimeout(timer);
  }, []);

  // ========================================================================
  // Derived Values - 衍生值
  // ========================================================================

  const textColor = getContrastColor(color.hex);
  const rgbString = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
  const oklchString = rgbToOklch(color.rgb.r, color.rgb.g, color.rgb.b);

  // ========================================================================
  // Render
  // ========================================================================

  return (
    <div
      className={`relative flex flex-col items-center gap-4 rounded-xl p-4 transition-all duration-300 md:flex-row ${
        isClosest
          ? 'bg-background-secondary ring-accent scale-[1.02] shadow-lg ring-2'
          : 'bg-background-secondary/50 hover:bg-background-secondary'
      }`}
    >
      {/* 色塊預覽 */}
      <div
        className="flex h-24 w-full shrink-0 items-center justify-center rounded-lg shadow-inner md:w-24"
        style={{ backgroundColor: color.hex }}
      >
        {isClosest && (
          <span
            className={`rounded-full bg-black/20 px-2 py-1 text-xs font-bold text-${textColor}`}
          >
            Closest
          </span>
        )}
      </div>

      {/* 資訊區塊 */}
      <div className="w-full flex-1 text-center md:text-left">
        {/* 顏色名稱 + 複製小按鈕 */}
        <div className="flex items-center justify-center gap-2 md:justify-start">
          <h3 className="text-primaryText text-xl font-bold">{color.class}</h3>
          <button
            onClick={() => handleCopy(color.class, 'class')}
            className="hover:text-accent transition-colors"
            title="Copy class name"
          >
            {copied === 'class' ? (
              <Check size={16} className="text-accent" />
            ) : (
              <Clipboard size={16} strokeWidth={2} />
            )}
          </button>
        </div>

        {/* 複製按鈕（Hex、RGB、OKLCH） */}
        <div className="mt-3 flex flex-col gap-2 md:flex-row md:gap-3">
          <CopyButton text={color.hex} type="hex" isCopied={copied === 'hex'} onCopy={handleCopy} />
          <CopyButton text={rgbString} type="rgb" isCopied={copied === 'rgb'} onCopy={handleCopy} />
          <CopyButton
            text={oklchString}
            type="oklch"
            isCopied={copied === 'oklch'}
            onCopy={handleCopy}
          />
        </div>
      </div>

      {/* 偏差指標（僅在匹配結果中顯示） */}
      {'distance' in color && (
        <div className="hidden text-right md:block">
          <div className="text-muted mb-1 text-xs tracking-wider uppercase">Deviation</div>
          <div
            className={`font-mono text-lg font-bold ${
              (color as ColorMatch).distance < 10 ? 'text-accent-green' : 'text-accent'
            }`}
          >
            {(color as ColorMatch).distance.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
});

ColorCard.displayName = 'ColorCard';

export default ColorCard;
