import React, { useState } from 'react';
import { findClosestTailwindColors, parseHex, parseRgbString, parseOklchString, rgbToHex, rgbToOklch, oklchToRgb, hexToRgb } from '../utils/colorUtils';
import { ColorMatch, TailwindColor } from '../types';
import ColorCard from './ColorCard';
import { ArrowDown } from 'lucide-react';

const HexToTailwind: React.FC = () => {
  const [hexInput, setHexInput] = useState<string>('#3b82f6');
  const [rgbInput, setRgbInput] = useState<string>('59, 130, 246');
  const [oklchInput, setOklchInput] = useState<string>('oklch(60.13% 0.198 255.45)');
  
  const [results, setResults] = useState<ColorMatch[]>([]);
  const [parsedColor, setParsedColor] = useState<TailwindColor | null>(null);

  // Initialize on mount
  React.useEffect(() => {
     handleHexChange('#3b82f6');
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateAll = (rgb: {r: number, g: number, b: number}) => {
     const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
     const oklch = rgbToOklch(rgb.r, rgb.g, rgb.b);
     
     // Set valid parsed color
     setParsedColor({
       class: 'Input Color',
       hex: hex,
       rgb: rgb
     });

     // Find tailwind matches
     try {
       const closest = findClosestTailwindColors(hex);
       setResults(closest);
     } catch (e) {
       console.error(e);
       setResults([]);
     }
     
     return { hex, oklch };
  }

  const handleHexChange = (val: string) => {
    setHexInput(val);
    const parsed = parseHex(val);
    if (parsed) {
        const rgb = hexToRgb(parsed);
        if (rgb) {
            const { oklch } = updateAll(rgb);
            // Update other fields
            setRgbInput(`${rgb.r}, ${rgb.g}, ${rgb.b}`);
            setOklchInput(oklch);
        }
    } else {
        // Invalidate if too short? 
        // Or just don't update others
    }
  };

  const handleRgbChange = (val: string) => {
    setRgbInput(val);
    const parsed = parseRgbString(val);
    if (parsed) {
        const { hex, oklch } = updateAll(parsed);
        setHexInput(hex);
        setOklchInput(oklch);
    }
  };

  const handleOklchChange = (val: string) => {
    setOklchInput(val);
    const parsed = parseOklchString(val);
    if (parsed) {
        const rgb = oklchToRgb(parsed.l, parsed.c, parsed.h);
        const { hex } = updateAll(rgb);
        setHexInput(hex);
        setRgbInput(`${rgb.r}, ${rgb.g}, ${rgb.b}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Three Input Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* HEX Input */}
          <div className="space-y-2">
             <label className="text-xs font-bold text-indigo-400 uppercase tracking-wider">HEX Code</label>
             <div className="relative">
                 <input
                    type="text"
                    value={hexInput}
                    onChange={(e) => handleHexChange(e.target.value)}
                    placeholder="#3b82f6"
                    className="w-full bg-slate-800 border border-slate-700 text-white pl-4 pr-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-mono"
                 />
                 <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-bold">#</div>
             </div>
          </div>

          {/* RGB Input */}
          <div className="space-y-2">
             <label className="text-xs font-bold text-pink-400 uppercase tracking-wider">RGB Values</label>
             <input
                type="text"
                value={rgbInput}
                onChange={(e) => handleRgbChange(e.target.value)}
                placeholder="59, 130, 246"
                className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all font-mono"
             />
          </div>

          {/* OKLCH Input */}
          <div className="space-y-2">
             <label className="text-xs font-bold text-green-400 uppercase tracking-wider">OKLCH</label>
             <input
                type="text"
                value={oklchInput}
                onChange={(e) => handleOklchChange(e.target.value)}
                placeholder="oklch(0.6 0.2 250)"
                className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all font-mono"
             />
          </div>

      </div>

      {/* Current Color Indicator */}
      <div className="flex justify-center -mt-4 mb-4">
         <div 
           className="w-16 h-16 rounded-full border-4 border-slate-800 shadow-lg transition-colors duration-300"
           style={{ backgroundColor: parsedColor ? parsedColor.hex : 'transparent' }}
         />
      </div>

      <div className="space-y-6">
        {parsedColor && (
           <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
             <div className="flex items-center gap-4 mb-4">
                 <div className="h-px bg-slate-800 flex-1"></div>
                 <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Detected Color</span>
                 <div className="h-px bg-slate-800 flex-1"></div>
             </div>
             <ColorCard color={parsedColor} />
             
             <div className="flex justify-center mt-6 text-slate-600">
                <ArrowDown size={24} className="animate-bounce" />
             </div>
           </div>
        )}

        {results.length > 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            <h2 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-4">Closest Tailwind Matches</h2>
            <div className="space-y-3">
              {results.map((match, idx) => (
                <ColorCard key={match.class} color={match} isClosest={idx === 0} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HexToTailwind;