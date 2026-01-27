import { memo, useState } from 'react';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { Palette, Hash, Languages, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import HexToTailwind from '@/components/HexToTailwind';
import TailwindToHex from '@/components/TailwindToHex';
import Footer from './components/Footer';

/**
 * @fileoverview
 * Main application component - Root component for the Color Converter app
 *
 * Responsibilities:
 * - Manage application routing
 * - Render header with navigation
 * - Provide layout structure and styling
 */
const App = memo(() => {
  return (
    <div className="selection:bg-primary/30 min-h-screen font-sans">
      {/* Application header with navigation */}
      <Header />
      {/* Main content area - renders active mode */}
      <main className="mx-auto max-w-5xl min-w-xs px-6 py-8 md:py-12">
        <div className="bg-background-primary/50 animate-fade-in-up min-h-[60vh] rounded-3xl">
          <Routes>
            <Route path="/" element={<Navigate to="/code-to-class" replace />} />
            <Route path="/code-to-class" element={<HexToTailwind />} />
            <Route path="/class-to-code" element={<TailwindToHex />} />
          </Routes>
        </div>
      </main>
      {/* Application footer */}
      <Footer />
    </div>
  );
});

App.displayName = 'App';

/**
 * Header component - Navigation bar with app branding and mode switcher
 */
const Header = memo(() => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background/50 sticky top-0 z-50 border-b border-slate-600 backdrop-blur-md">
      <div className="mx-auto max-w-5xl px-4 py-4">
        <div className="flex items-center justify-between">
          {/* App logo and title */}
          <div className="flex items-center gap-2">
            <Palette size={20} />

            <h1 className="text-lg font-bold tracking-tight text-white md:text-xl">
              {t('app.title')}
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-4 md:flex">
            <ModeSwitch />
            <LanguageSwitch />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-muted hover:text-primary flex items-center justify-center rounded-lg p-2 transition-colors md:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="animate-fade-in-up mt-4 flex flex-col gap-3 border-t border-slate-600 pt-4 md:hidden">
            <ModeSwitch onNavigate={() => setIsMenuOpen(false)} />
            <LanguageSwitch />
          </div>
        )}
      </div>
    </header>
  );
});

Header.displayName = 'Header';

/**
 * LanguageSwitch component - Switch between languages
 */
const LanguageSwitch = memo(() => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language.startsWith('zh') ? 'en' : 'zh-TW');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="text-muted hover:text-primary flex w-full items-center justify-center gap-2 rounded-lg p-3 text-sm font-medium transition-colors md:w-auto md:p-2"
      title="Switch Language"
    >
      <Languages size={20} />
      <span className="text-xs font-bold md:hidden">
        {i18n.language.startsWith('zh') ? 'Switch to English' : '切換至繁體中文'}
      </span>
      <span className="ml-1 hidden text-xs font-bold md:block">
        {i18n.language.startsWith('zh') ? '繁中' : 'EN'}
      </span>
    </button>
  );
});

LanguageSwitch.displayName = 'LanguageSwitch';

/**
 * ModeSwitch component - Container for mode switcher buttons
 */
const ModeSwitch = memo(({ onNavigate }: { onNavigate?: () => void }) => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:gap-4">
      {/* Switch to HexToTailwind mode */}
      <ModeButton
        icon={Hash}
        label={t('mode.codeToClass')}
        to="/code-to-class"
        onClick={onNavigate}
      />
      {/* Switch to TailwindToHex mode */}
      <ModeButton
        icon={Palette}
        label={t('mode.classToCode')}
        to="/class-to-code"
        onClick={onNavigate}
      />
    </div>
  );
});

ModeSwitch.displayName = 'ModeSwitch';

interface ModeButtonProps {
  icon: typeof Hash;
  label: string;
  to: string;
  onClick?: () => void;
}

/**
 * ModeButton component - Individual mode switcher button
 * Displays icon and label, highlights when active
 */
const ModeButton = memo<ModeButtonProps>(({ icon: Icon, label, to, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-base font-medium transition-all md:w-auto md:gap-2 md:px-4 md:py-2 md:text-sm ${
        isActive
          ? 'bg-accent text-gray-900 shadow-lg'
          : 'text-muted bg-background hover:text-muted-hover'
      }`
    }
  >
    {/* Icon from Lucide React */}
    <Icon size={18} className="md:h-4 md:w-4" /> {label}
  </NavLink>
));

ModeButton.displayName = 'ModeButton';

export default App;
