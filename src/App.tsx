import { memo } from 'react';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { Palette, Hash, Languages } from 'lucide-react';
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
      <main className="mx-auto max-w-5xl px-6 py-8 md:py-12">
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

  return (
    <header className="bg-background/50 sticky top-0 z-50 border-b border-slate-600 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        {/* App logo and title */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-yellow-500 to-orange-500 shadow-lg shadow-indigo-500/20">
            <Palette size={18} className="text-white" />
          </div>
          <h1 className="hidden text-xl font-bold tracking-tight text-white sm:block">
            {t('app.title')}
          </h1>
        </div>
        {/* Mode switcher buttons and Language Switcher */}
        <div className="flex items-center gap-4">
          <ModeSwitch />
          <LanguageSwitch />
        </div>
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
      className="text-muted hover:text-primary flex items-center justify-center rounded-lg p-2 transition-colors"
      title="Switch Language"
    >
      <Languages size={20} />
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
const ModeSwitch = memo(() => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2 md:gap-4">
      {/* Switch to HexToTailwind mode */}
      <ModeButton icon={Hash} label={t('mode.codeToClass')} to="/code-to-class" />
      {/* Switch to TailwindToHex mode */}
      <ModeButton icon={Palette} label={t('mode.classToCode')} to="/class-to-code" />
    </div>
  );
});

ModeSwitch.displayName = 'ModeSwitch';

interface ModeButtonProps {
  icon: typeof Hash;
  label: string;
  to: string;
}

/**
 * ModeButton component - Individual mode switcher button
 * Displays icon and label, highlights when active
 */
const ModeButton = memo<ModeButtonProps>(({ icon: Icon, label, to }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-all md:gap-2 md:px-4 md:py-2 md:text-sm ${
        isActive
          ? 'bg-accent text-gray-900 shadow-lg'
          : 'text-muted bg-background hover:text-muted-hover'
      }`
    }
  >
    {/* Icon from Lucide React */}
    <Icon size={16} /> {label}
  </NavLink>
));

ModeButton.displayName = 'ModeButton';

export default App;
