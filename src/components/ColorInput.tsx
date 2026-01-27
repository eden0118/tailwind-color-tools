/**
 * @fileoverview
 * ColorInput 元件 - 多格式顏色輸入框
 *
 * 責任：
 * - 提供單一輸入欄供三種色彩格式（Hex、RGB、OKLCH）使用
 * - 視覺反饋：強調色環圓、Placeholder 提示、標籤識別
 * - 支援不同的「強調色」（hex、rgb、oklch），視覺上區分三個輸入框
 * - 處理使用者輸入並觸發父元件的 onChange 回調
 *
 * 設計特色：
 * - 左側圓形色卡顯示解析後的顏色預覽（若格式有效）
 * - 右側標籤清晰標示輸入格式類型
 * - 焦點時環形變換顏色，提供視覺反饋
 * - 虛擬框架指導使用者輸入格式
 */
import { memo, useState, useRef, useId } from 'react';
import { Info } from 'lucide-react';

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  accentColor: 'hex' | 'rgb' | 'oklch';
  helpText?: string;
}

/**
 * 色碼格式說明 - 各種格式的參數意義
 */
const FORMAT_TOOLTIPS = {
  'HEX Code': `Hexadecimal color format:
#RRGGBB
- R: Red component (00–FF)
- G: Green component (00–FF)
- B: Blue component (00–FF)
Each pair represents a color channel.
Example: #3b82f6`,

  'RGB Values': `RGB color format:
rgb(R, G, B)
- R: Red component (0–255)
- G: Green component (0–255)
- B: Blue component (0–255)
Example: rgb(59, 130, 246)`,

  OKLCH: `Perceptually uniform color space:
oklch(L, C, H)
- L: Lightness (0–1)
- C: Chroma (0–0.4, higher = more saturated)
- H: Hue angle (0°–360°)
OKLCH aligns more closely with human color perception, ideal for contrast and color manipulation.`,

  Hex: `Hexadecimal color format:
#RGB or #RRGGBB
- Each channel ranges from 00–FF (0–255)
The short form (#RGB) automatically expands to the full form (#RRGGBB).`,

  RGB: `RGB color format:
rgb(R, G, B)
- Each channel ranges from 0–255
Commonly used for screen color representation.`,
};

const accentMap = {
  hex: {
    label: 'text-hex-accent',
    ring: 'focus:ring-hex-accent',
  },
  rgb: {
    label: 'text-rgb-accent',
    ring: 'focus:ring-rgb-accent',
  },
  oklch: {
    label: 'text-oklch-accent',
    ring: 'focus:ring-oklch-accent',
  },
};

/**
 * Reusable color input field component
 */
const ColorInput = memo<ColorInputProps>(
  ({ label, value, onChange, placeholder, accentColor, helpText }) => {
    const inputId = useId();
    const tooltipId = useId();
    const [isTooltipVisible, setTooltipVisible] = useState(false);
    const showTimeoutRef = useRef<number | null>(null);
    const hideTimeoutRef = useRef<number | null>(null);

    const accentStyles = accentMap[accentColor];
    const tooltipText = helpText || FORMAT_TOOLTIPS[label as keyof typeof FORMAT_TOOLTIPS] || '';

    const handleMouseEnter = () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
      showTimeoutRef.current = window.setTimeout(() => {
        setTooltipVisible(true);
      }, 300);
    };

    const handleMouseLeave = () => {
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current);
        showTimeoutRef.current = null;
      }
      hideTimeoutRef.current = window.setTimeout(() => {
        setTooltipVisible(false);
      }, 200);
    };

    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label htmlFor={inputId} className={`input-label ${accentStyles.label}`}>
            {label}
          </label>
          {/* Info Icon with Tooltip */}
          <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button
              type="button"
              className="text-muted hover:text-secondaryText cursor-pointer transition-colors"
              aria-label="Color format info"
              aria-expanded={isTooltipVisible}
              aria-haspopup="true"
              aria-describedby={isTooltipVisible ? tooltipId : undefined}
            >
              <Info size={14} />
            </button>

            {/* Tooltip */}
            {isTooltipVisible && tooltipText && (
              <div
                id={tooltipId}
                role="tooltip"
                className="border-border bg-background text-secondaryText absolute top-full left-1/2 z-50 mt-2 w-max max-w-xs -translate-x-1/2 transform rounded-lg border px-3 py-2 text-xs whitespace-pre-wrap shadow-lg"
              >
                {tooltipText}
                {/* Tooltip Arrow */}
                  <div className="border-b-primary absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent"></div>
              </div>
            )}
          </div>
        </div>
        <div className="relative">
          <input
            id={inputId}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`input ${accentStyles.ring}`}
          />
        </div>
      </div>
    );
  }
);

ColorInput.displayName = 'ColorInput';

export default ColorInput;
