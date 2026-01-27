import { useState, memo } from 'react';
import { Palette, Hash } from 'lucide-react';
import HexToTailwind from '@/components/HexToTailwind';
import TailwindToHex from '@/components/TailwindToHex';
import Footer from './components/Footer';
import { AppMode } from '@/types';

/**
 * @fileoverview
 * Main application component - Root component for the Color Converter app
 *
 * Responsibilities:
 * - Manage application mode state (HEX_TO_TAILWIND or TAILWIND_TO_HEX)
 * - Render header with mode switcher
 * - Conditionally render active conversion mode
 * - Provide layout structure and styling
 * - Handle mode switching between two conversion directions
 */
const App = memo(() => {
  // Current application mode state
  const [mode, setMode] = useState<AppMode>(AppMode.HEX_TO_TAILWIND);

  return (
    <div className="selection:bg-primary/30 min-h-screen font-sans">
      {/* Application header with navigation */}
      <Header mode={mode} onModeChange={setMode} />
      {/* Main content area - renders active mode */}
      <main className="mx-auto max-w-5xl px-6 py-8 md:py-12">
        <div
          key={mode}
          className="bg-background-primary/50 animate-fade-in-up min-h-[60vh] rounded-3xl"
        >
          {/* Render HexToTailwind converter when active */}
          {mode === AppMode.HEX_TO_TAILWIND && <HexToTailwind />}
          {/* Render TailwindToHex converter when active */}
          {mode === AppMode.TAILWIND_TO_HEX && <TailwindToHex />}
        </div>
      </main>
      {/* Application footer */}
      <Footer />
    </div>
  );
});

App.displayName = 'App';

interface HeaderProps {
  mode: AppMode;
  onModeChange: (mode: AppMode) => void;
}

/**
 * Header component - Navigation bar with app branding and mode switcher
 */
const Header = memo<HeaderProps>(({ mode, onModeChange }) => (
  <header className="bg-background/50 sticky top-0 z-50 border-b border-slate-600 backdrop-blur-md">
    <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
      {/* App logo and title */}
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-yellow-500 to-orange-500 shadow-lg shadow-indigo-500/20">
          <Palette size={18} className="text-white" />
        </div>
        <h1 className="hidden text-xl font-bold tracking-tight text-white sm:block">
          Color<span className="text-accent"> Converter</span>
        </h1>
      </div>
      {/* Mode switcher buttons */}
      <ModeSwitch mode={mode} onModeChange={onModeChange} />
    </div>
  </header>
));

Header.displayName = 'Header';

/**
 * ModeSwitch component - Container for mode switcher buttons
 */
const ModeSwitch = memo<HeaderProps>(({ mode, onModeChange }) => (
  <div className="flex items-center gap-4">
    {/* Switch to HexToTailwind mode */}
    <ModeButton
      icon={Hash}
      label="Code to Class"
      isActive={mode === AppMode.HEX_TO_TAILWIND}
      onClick={() => onModeChange(AppMode.HEX_TO_TAILWIND)}
    />
    {/* Switch to TailwindToHex mode */}
    <ModeButton
      icon={Palette}
      label="Class to Code"
      isActive={mode === AppMode.TAILWIND_TO_HEX}
      onClick={() => onModeChange(AppMode.TAILWIND_TO_HEX)}
    />
  </div>
));

ModeSwitch.displayName = 'ModeSwitch';

interface ModeButtonProps {
  icon: typeof Hash;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

/**
 * ModeButton component - Individual mode switcher button
 * Displays icon and label, highlights when active
 */
const ModeButton = memo<ModeButtonProps>(({ icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    aria-pressed={isActive}
    className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-all md:gap-2 md:px-4 md:py-2 md:text-sm ${
      isActive
        ? 'bg-accent text-gray-900 shadow-lg'
        : 'text-muted bg-background hover:text-muted-hover'
    }`}
  >
    {/* Icon from Lucide React */}
    <Icon size={16} /> {label}
  </button>
));

ModeButton.displayName = 'ModeButton';

export default App;
