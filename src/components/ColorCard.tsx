import React from 'react';
import { ColorMatch, TailwindColor } from '@/types';
import { Clipboard, Check } from 'lucide-react';
import { rgbToOklch } from '@/utils/colorUtils';

interface ColorCardProps {
  color: TailwindColor | ColorMatch;
  isClosest?: boolean;
}

const ColorCard: React.FC<ColorCardProps> = ({ color, isClosest }) => {
  const [copied, setCopied] = React.useState<string | null>(null);

  const handleCopy = (text: string, type: 'hex' | 'class' | 'rgb' | 'oklch') => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const getContrastColor = (hex: string) => {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return yiq >= 128 ? 'black' : 'white';
  };

  const textColor = getContrastColor(color.hex);
  const rgbString = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
  const oklchString = rgbToOklch(color.rgb.r, color.rgb.g, color.rgb.b);

  return (
    <div className={`relative flex flex-col md:flex-row items-center gap-4 p-4 rounded-xl transition-all duration-300 ${isClosest ? 'bg-slate-800 ring-2 ring-indigo-500 shadow-lg scale-[1.02]' : 'bg-slate-800/50 hover:bg-slate-800'}`}>
      
      {/* Color Swatch */}
      <div 
        className="w-full md:w-24 h-24 rounded-lg shadow-inner flex items-center justify-center shrink-0"
        style={{ backgroundColor: color.hex }}
      >
        {isClosest && <span className={`text-xs font-bold px-2 py-1 rounded-full bg-black/20 text-${textColor}`}>Exact-ish</span>}
      </div>

      {/* Info */}
      <div className="flex-1 w-full text-center md:text-left">
        <h3 className="text-xl font-bold text-white mb-1">{color.class}</h3>
        
        <div className="flex flex-col md:flex-row gap-3 mt-2 justify-center md:justify-start">
          
          {/* Copy Class */}
          <button 
            onClick={() => handleCopy(color.class, 'class')}
            className="flex items-center justify-center gap-2 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded text-sm text-slate-300 transition-colors"
          >
            <span className="font-mono">{color.class}</span>
            {copied === 'class' ? <Check size={14} className="text-green-400" /> : <Clipboard size={14} />}
          </button>

          {/* Copy Hex */}
          <button 
            onClick={() => handleCopy(color.hex, 'hex')}
            className="flex items-center justify-center gap-2 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded text-sm text-slate-300 transition-colors"
          >
            <span className="font-mono uppercase">{color.hex}</span>
            {copied === 'hex' ? <Check size={14} className="text-green-400" /> : <Clipboard size={14} />}
          </button>
        </div>

        {/* RGB & OKLCH Info */}
        <div className="mt-2 flex flex-col md:flex-row items-center md:items-start gap-1 md:gap-4 text-slate-500">
           {/* RGB */}
           <div className="flex items-center gap-2">
             <span className="text-xs font-mono">
               {rgbString}
             </span>
             <button
               onClick={() => handleCopy(rgbString, 'rgb')}
               className="text-slate-600 hover:text-slate-400 transition-colors"
               title="Copy RGB"
             >
               {copied === 'rgb' ? <Check size={12} className="text-green-400" /> : <Clipboard size={12} />}
             </button>
           </div>
           
           {/* OKLCH */}
           <div className="flex items-center gap-2">
              <span className="text-xs font-mono">
                {oklchString}
              </span>
              <button
                onClick={() => handleCopy(oklchString, 'oklch')}
                className="text-slate-600 hover:text-slate-400 transition-colors"
                title="Copy OKLCH"
              >
                {copied === 'oklch' ? <Check size={12} className="text-green-400" /> : <Clipboard size={12} />}
              </button>
           </div>
        </div>
      </div>

       {/* Distance Badge for Matches */}
       {'distance' in color && (
         <div className="text-right hidden md:block">
           <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Deviation</div>
           <div className={`text-lg font-mono font-bold ${(color as ColorMatch).distance < 10 ? 'text-green-400' : 'text-yellow-400'}`}>
             {(color as ColorMatch).distance.toFixed(2)}
           </div>
         </div>
       )}
    </div>
  );
};

export default ColorCard;