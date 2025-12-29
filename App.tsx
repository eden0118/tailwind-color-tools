import React, { useState } from 'react';
import { Palette, Hash, Sparkles } from 'lucide-react';
import HexToTailwind from './components/HexToTailwind';
import TailwindToHex from './components/TailwindToHex';
import AiColorPicker from './components/AiColorPicker';
import { AppMode } from './types';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.HEX_TO_TAILWIND);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans selection:bg-indigo-500/30">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Palette size={18} className="text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white hidden sm:block">
              Tailwind<span className="text-indigo-400">ColorMaster</span>
            </h1>
          </div>
          
          <nav className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700">
            <button
              onClick={() => setMode(AppMode.HEX_TO_TAILWIND)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                mode === AppMode.HEX_TO_TAILWIND ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Hash size={14} /> Hex <span className="hidden sm:inline">to Class</span>
            </button>
            <button
              onClick={() => setMode(AppMode.TAILWIND_TO_HEX)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                mode === AppMode.TAILWIND_TO_HEX ? 'bg-pink-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Palette size={14} /> Class <span className="hidden sm:inline">to Hex</span>
            </button>
            <button
              onClick={() => setMode(AppMode.AI_GENERATOR)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                mode === AppMode.AI_GENERATOR ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles size={14} /> AI <span className="hidden sm:inline">Generator</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="bg-slate-900/50 rounded-3xl min-h-[60vh]">
          {mode === AppMode.HEX_TO_TAILWIND && <HexToTailwind />}
          {mode === AppMode.TAILWIND_TO_HEX && <TailwindToHex />}
          {mode === AppMode.AI_GENERATOR && <AiColorPicker />}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-slate-600 text-sm">
        <p>Built for developers with React and Tailwind.</p>
      </footer>
    </div>
  );
};

export default App;