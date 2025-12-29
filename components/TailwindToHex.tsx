import React, { useState, useEffect, useMemo } from 'react';
import { findHexByClass, ALL_TAILWIND_COLORS } from '../utils/colorUtils';
import { TailwindColor } from '../types';
import ColorCard from './ColorCard';
import { Search, X } from 'lucide-react';

const TailwindToHex: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [match, setMatch] = useState<TailwindColor | null>(null);
  const [suggestions, setSuggestions] = useState<TailwindColor[]>([]);

  // Group colors by family (e.g., 'slate', 'red')
  const colorGroups = useMemo(() => {
    const groups: Record<string, TailwindColor[]> = {};
    ALL_TAILWIND_COLORS.forEach(c => {
      const parts = c.class.split('-');
      // Handle standard palette format "name-weight"
      const base = parts.length > 1 ? parts[0] : 'other';
      if (!groups[base]) groups[base] = [];
      groups[base].push(c);
    });
    return groups;
  }, []);

  useEffect(() => {
    if (!input.trim()) {
      setMatch(null);
      setSuggestions([]);
      return;
    }

    const found = findHexByClass(input);
    setMatch(found || null);

    // Suggestions logic
    const cleanInput = input.toLowerCase().replace(/^(bg|text|border|ring)-/, '');
    const filtered = ALL_TAILWIND_COLORS.filter(tc => 
      tc.class.includes(cleanInput)
    ).slice(0, 12);
    
    setSuggestions(filtered);

  }, [input]);

  return (
    <div className="space-y-8">
       <div className="space-y-2 max-w-3xl mx-auto">
        <label className="text-sm font-medium text-slate-400">Enter Tailwind Class</label>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. blue-500, red-600..."
            className="w-full bg-slate-800 border border-slate-700 text-white text-lg pl-12 pr-12 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all font-mono"
          />
          {input && (
            <button
              onClick={() => setInput('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1.5 rounded-full hover:bg-slate-700/50 transition-colors"
              title="Clear input"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {match ? (
          <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
             <h2 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-3">Exact Match</h2>
             <ColorCard color={match} isClosest={true} />
          </div>
        ) : input ? (
          // Suggestions View
          suggestions.length > 0 ? (
             <div className="max-w-4xl mx-auto">
                 <h2 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-3">Suggestions</h2>
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                   {suggestions.map(s => (
                     <button 
                      key={s.class}
                      onClick={() => setInput(s.class)}
                      className="flex flex-col items-center gap-2 p-3 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 hover:border-pink-500/50 transition-all"
                     >
                       <div className="w-full h-8 rounded" style={{backgroundColor: s.hex}} />
                       <span className="text-xs text-slate-300 font-mono">{s.class}</span>
                     </button>
                   ))}
                 </div>
             </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
               <p>No class found matching "{input}"</p>
            </div>
          )
        ) : (
            // Full Palette View (Default)
            <div className="animate-in fade-in duration-700">
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-px bg-slate-800 flex-1"></div>
                    <span className="text-slate-500 text-sm font-medium uppercase tracking-widest">Full Tailwind Palette</span>
                    <div className="h-px bg-slate-800 flex-1"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(colorGroups).map(([family, colors]) => (
                        <div key={family} className="bg-slate-800/30 rounded-xl p-4 border border-slate-800/50 hover:border-slate-700 transition-colors">
                            <h3 className="text-slate-300 font-bold capitalize mb-3">{family}</h3>
                            <div className="grid grid-cols-6 gap-2">
                                {colors.map(c => {
                                    const shade = c.class.split('-').pop();
                                    const isLight = ['50', '100', '200', '300', '400'].includes(shade||'');
                                    return (
                                        <button
                                            key={c.class}
                                            onClick={() => setInput(c.class)}
                                            className="group relative w-full aspect-square rounded shadow-sm flex items-center justify-center hover:scale-110 hover:z-10 transition-all ring-1 ring-white/5"
                                            style={{ backgroundColor: c.hex }}
                                            title={c.class}
                                        >
                                           <span className={`text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity ${
                                                isLight ? 'text-slate-900' : 'text-white'
                                           }`}>
                                               {shade}
                                           </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default TailwindToHex;