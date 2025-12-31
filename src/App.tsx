import { useState, memo } from 'react';
import { Palette, Hash } from 'lucide-react';
import HexToTailwind from '@/components/HexToTailwind';
import TailwindToHex from '@/components/TailwindToHex';
import Footer from './components/Footer';
import { AppMode } from '@/types';

/**
 * Main Application Component
 * Provides mode switching between Hex→Tailwind and Tailwind→Hex converters
 */
const App = memo(() => {
  const [mode, setMode] = useState<AppMode>(AppMode.HEX_TO_TAILWIND);

  return (
    <div className="selection:bg-primary/30 min-h-screen font-sans">
      {/* Header */}
      <Header mode={mode} onModeChange={setMode} />

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-4 py-8 md:py-12">
        <div className="bg-background-primary/50 min-h-[60vh] rounded-3xl p-8">
          {mode === AppMode.HEX_TO_TAILWIND && <HexToTailwind />}
          {mode === AppMode.TAILWIND_TO_HEX && <TailwindToHex />}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
});

App.displayName = 'App';

// ============================================================================
// Sub Components
// ============================================================================

/**
 * Header component with mode switcher
 */
interface HeaderProps {
  mode: AppMode;
  onModeChange: (mode: AppMode) => void;
}

const Header = memo<HeaderProps>(({ mode, onModeChange }) => (
  <header className="border-border-secondary bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md">
    <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
          <Palette size={18} className="text-white" />
        </div>
        <h1 className="hidden text-xl font-bold tracking-tight text-white sm:block">
          Tailwind<span className="text-primary">ColorMaster</span>
        </h1>
      </div>

      {/* Mode Navigation */}
      <ModeSwitch mode={mode} onModeChange={onModeChange} />
    </div>
  </header>
));

Header.displayName = 'Header';

/**
 * Mode switcher button group
 * Displays left/right buttons for switching between conversion modes
 */
const ModeSwitch = memo<HeaderProps>(({ mode, onModeChange }) => (
  <div className="flex items-center gap-4">
    {/* Hex to Tailwind Button */}
    <button
      onClick={() => onModeChange(AppMode.HEX_TO_TAILWIND)}
      className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
        mode === AppMode.HEX_TO_TAILWIND
          ? 'bg-indigo-600 text-white shadow-lg'
          : 'text-text-muted hover:text-text-muted-hover'
      }`}
    >
      <Hash size={16} /> Code to Class
    </button>

    {/* Tailwind to Hex Button */}
    <button
      onClick={() => onModeChange(AppMode.TAILWIND_TO_HEX)}
      className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
        mode === AppMode.TAILWIND_TO_HEX
          ? 'bg-teal-600 text-white shadow-lg'
          : 'text-text-muted hover:text-text-muted-hover'
      }`}
    >
      <Palette size={16} /> Class to Code
    </button>
  </div>
));

ModeSwitch.displayName = 'ModeSwitch';

export default App;
