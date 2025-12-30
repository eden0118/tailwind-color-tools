import { memo, useState, useRef } from "react";
import { Info } from "lucide-react";

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  accentColor: "indigo" | "pink" | "green";
  icon?: string;
  helpText?: string;
}

/**
 * 色碼格式說明 - 各種格式的參數意義
 */
const FORMAT_TOOLTIPS = {
  "HEX Code": `Hexadecimal color format:
#RRGGBB
- R: Red component (00–FF)
- G: Green component (00–FF)
- B: Blue component (00–FF)
Each pair represents a color channel.
Example: #3b82f6`,

  "RGB Values": `RGB color format:
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
  indigo: {
    label: 'text-accent-indigo',
    ring: 'focus:ring-accent-indigo-focus',
  },
  pink: {
    label: 'text-accent-pink',
    ring: 'focus:ring-pink-500',
  },
  green: {
    label: 'text-accent-green',
    ring: 'focus:ring-green-500',
  },
};

/**
 * Reusable color input field component
 */
const ColorInput = memo<ColorInputProps>(
  ({ label, value, onChange, placeholder, accentColor, icon, helpText }) => {
    const [isTooltipVisible, setTooltipVisible] = useState(false);
    const showTimeoutRef = useRef<number | null>(null);
    const hideTimeoutRef = useRef<number | null>(null);

    const accentStyles = accentMap[accentColor];
    const tooltipText =
      helpText || FORMAT_TOOLTIPS[label as keyof typeof FORMAT_TOOLTIPS] || '';

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
          <label
            className={`text-xs font-bold tracking-wider uppercase ${accentStyles.label}`}
          >
            {label}
          </label>
          {/* Info Icon with Tooltip */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              className="cursor-pointer text-text-muted transition-colors hover:text-text-secondary"
              aria-label="Color format info"
            >
              <Info size={14} />
            </button>

            {/* Tooltip */}
            {isTooltipVisible && tooltipText && (
              <div className="absolute top-full left-1/2 z-50 mt-2 w-max max-w-xs -translate-x-1/2 transform">
                <div className="whitespace-pre-wrap rounded-lg border border-border bg-background-primary px-3 py-2 text-xs text-text-secondary shadow-lg">
                  {tooltipText}
                  {/* Tooltip Arrow */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-background-primary"></div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="relative">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full rounded-lg border border-border bg-background-secondary px-4 py-3 font-mono text-text-primary transition-all focus:ring-2 focus:outline-none ${accentStyles.ring}`}
          />
          {icon && (
            <div className="absolute top-1/2 right-3 -translate-y-1/2 text-xs font-bold text-text-muted">
              {icon}
            </div>
          )}
        </div>
      </div>
    );
  }
);

ColorInput.displayName = "ColorInput";

export default ColorInput;