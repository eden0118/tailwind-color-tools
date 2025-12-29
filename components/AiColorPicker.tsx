import React, { useState } from 'react';
import { generateColorFromDescription } from '../services/geminiService';
import { findClosestTailwindColors } from '../utils/colorUtils';
import { AiColorResponse, ColorMatch } from '../types';
import ColorCard from './ColorCard';
import { Sparkles, ArrowRight, Loader2, X } from 'lucide-react';

const AiColorPicker: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AiColorResponse | null>(null);
  const [matches, setMatches] = useState<ColorMatch[]>([]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setAiResult(null);
    setMatches([]);

    try {
      const result = await generateColorFromDescription(prompt);
      setAiResult(result);
      
      // Once we have the Hex from AI, find closest Tailwind colors
      const tailwindMatches = findClosestTailwindColors(result.hex, 3);
      setMatches(tailwindMatches);
    } catch (err) {
      console.error(err);
      // Fallback or error toast could go here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Describe it. We find it.
        </h2>
        <p className="text-slate-400">
          Describe a mood, object, or scene, and Gemini will generate the perfect hex code and find the nearest Tailwind equivalents.
        </p>
      </div>

      <form onSubmit={handleGenerate} className="relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. The color of a stormy ocean at midnight..."
          className="w-full bg-slate-800 border border-slate-700 text-white text-lg p-4 pr-16 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all min-h-[120px] resize-none"
        />
        
        {prompt && (
          <button
            type="button"
            onClick={() => setPrompt('')}
            className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 p-1 rounded-full hover:bg-slate-700/50 transition-colors"
            title="Clear prompt"
          >
            <X size={18} />
          </button>
        )}

        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="absolute bottom-4 right-4 bg-purple-600 hover:bg-purple-500 text-white p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-900/20"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
        </button>
      </form>

      {aiResult && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          {/* AI Generated Result */}
          <div className="bg-slate-800/80 border border-purple-500/30 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles size={120} />
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 items-center relative z-10">
               <div className="w-32 h-32 rounded-full border-4 border-slate-700 shadow-2xl shrink-0" style={{ backgroundColor: aiResult.hex }} />
               <div className="text-center md:text-left flex-1">
                 <div className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-1">Gemini Suggestion</div>
                 <h3 className="text-2xl font-bold text-white mb-2">{aiResult.name}</h3>
                 <p className="text-slate-300 italic mb-4">"{aiResult.description}"</p>
                 <div className="inline-block bg-slate-900 px-3 py-1 rounded font-mono text-purple-200 border border-purple-500/30">
                   {aiResult.hex}
                 </div>
               </div>
            </div>
          </div>

          <div className="flex items-center justify-center text-slate-500">
            <ArrowRight className="transform rotate-90 md:rotate-0" />
          </div>

          {/* Tailwind Matches */}
          <div className="space-y-4">
             <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Closest Tailwind Classes</h3>
             {matches.map((match, idx) => (
               <ColorCard key={match.class} color={match} isClosest={idx === 0} />
             ))}
          </div>

        </div>
      )}
    </div>
  );
};

export default AiColorPicker;