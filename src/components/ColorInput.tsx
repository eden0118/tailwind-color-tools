import { memo } from 'react';

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  accentColor: 'indigo' | 'pink' | 'green';
  icon?: string;
}

const accentMap = {
  indigo: 'indigo-400 focus:ring-indigo-500',
  pink: 'pink-400 focus:ring-pink-500',
  green: 'green-400 focus:ring-green-500',
};

/**
 * Reusable color input field component
 */
const ColorInput = memo<ColorInputProps>(
  ({ label, value, onChange, placeholder, accentColor, icon }) => {
    const accentClasses = accentMap[accentColor];

    return (
      <div className="space-y-2">
        <label className={`text-xs font-bold uppercase tracking-wider text-${accentClasses.split(' ')[0]}`}>
          {label}
        </label>
        <div className="relative">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 font-mono text-white transition-all focus:outline-none focus:ring-2 ${accentClasses}`}
          />
          {icon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
              {icon}
            </div>
          )}
        </div>
      </div>
    );
  }
);

ColorInput.displayName = 'ColorInput';

export default ColorInput;
