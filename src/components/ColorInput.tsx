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
import { memo, useState, useId } from 'react';
import { useTranslation } from 'react-i18next';
import { Info } from 'lucide-react';

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  accentColor: 'hex' | 'rgb' | 'oklch';
  helpText?: string;
}

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
    const { t } = useTranslation();
    const inputId = useId();
    const [isExpanded, setIsExpanded] = useState(false);

    const accentStyles = accentMap[accentColor];
    const tooltipText = helpText || t(`tooltips.${accentColor}`);

    // Click: Toggle expanded description
    const handleInfoClick = () => {
      setIsExpanded(!isExpanded);
    };

    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <label htmlFor={inputId} className={`input-label ${accentStyles.label}`}>
            {label}
          </label>
          {/* Info Icon - Click to expand description */}
          <button
            type="button"
            onClick={handleInfoClick}
            className="text-muted hover:text-secondaryText cursor-pointer transition-colors"
            aria-label="Color format info"
            aria-expanded={isExpanded}
            aria-haspopup="true"
          >
            <Info size={14} />
          </button>
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

        {/* Expanded Description - shown below input when clicked */}
        {isExpanded && tooltipText && (
          <div className="text-secondaryText bg-secondary/50 flex flex-col items-center justify-between overflow-hidden rounded-lg font-mono text-xs leading-relaxed whitespace-pre-wrap shadow">
            <div className="w-full flex-1 p-4">{tooltipText}</div>

            <button
              onClick={() => setIsExpanded(false)}
              className="text-primary hover:text-accent w-full shrink-0 bg-black/50 py-1.5 text-sm uppercase transition-all hover:bg-black/90"
              aria-label="Close description"
              title={t('common.close')}
            >
              {t('common.close')}
            </button>
          </div>
        )}
      </div>
    );
  }
);

ColorInput.displayName = 'ColorInput';

export default ColorInput;
