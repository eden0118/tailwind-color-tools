import { useState, memo } from 'react';
import { Palette, Hash } from 'lucide-react';
import HexToTailwind from '@/components/HexToTailwind';
import TailwindToHex from '@/components/TailwindToHex';
import Footer from './components/Footer';
import { AppMode } from '@/types';

/**
 * @fileoverview
 * 應用程式的主組件 (App Component)。
 *
 * - 負責整個應用的基本佈局，包括頁首 (Header)、主要內容區 (Main) 和頁腳 (Footer)。
 * - 管理應用程式的當前模式 (`mode`)，用於在 "Hex→Tailwind" 和 "Tailwind→Hex" 兩種轉換器之間切換。
 * - 根據 `mode` 狀態，條件性地渲染 `HexToTailwind` 或 `TailwindToHex` 組件。
 */
const App = memo(() => {
  // `mode` 狀態用於控制當前顯示哪個轉換器工具。
  const [mode, setMode] = useState<AppMode>(AppMode.HEX_TO_TAILWIND);

  return (
    <div className="selection:bg-primary/30 min-h-screen font-sans">
      {/* 頁首：包含 Logo 和模式切換器 */}
      <Header mode={mode} onModeChange={setMode} />

      {/* 主要內容區域 */}
      <main className="mx-auto max-w-5xl px-4 py-8 md:py-12">
        <div className="bg-background-primary/50 min-h-[60vh] rounded-3xl p-8">
          {/* 根據當前模式，渲染對應的功能組件 */}
          {mode === AppMode.HEX_TO_TAILWIND && <HexToTailwind />}
          {mode === AppMode.TAILWIND_TO_HEX && <TailwindToHex />}
        </div>
      </main>

      {/* 頁腳 */}
      <Footer />
    </div>
  );
});

App.displayName = 'App';

// ============================================================================
// #region 子組件 (Sub Components)
// ============================================================================

interface HeaderProps {
  mode: AppMode;
  onModeChange: (mode: AppMode) => void;
}

/**
 * 頁首組件 (Header)
 * 包含 Logo 和模式切換器，提供在不同功能間導航的方式。
 * 使用 sticky 定位，使其在滾動時固定在頁面頂部。
 */
const Header = memo<HeaderProps>(({ mode, onModeChange }) => (
  <header className="bg-background/50 sticky top-0 z-50 border-b border-slate-600 backdrop-blur-md">
    <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
      {/* Logo 和應用程式標題 */}
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
          <Palette size={18} className="text-white" />
        </div>
        <h1 className="hidden text-xl font-bold tracking-tight text-white sm:block">
          Tailwind<span className="text-primary">ColorMaster</span>
        </h1>
      </div>

      {/* 模式切換導航 */}
      <ModeSwitch mode={mode} onModeChange={onModeChange} />
    </div>
  </header>
));

Header.displayName = 'Header';

/**
 * 模式切換器 (ModeSwitch)
 * 一組按鈕，用於在 "Code to Class" (Hex→Tailwind) 和 "Class to Code" (Tailwind→Hex) 兩種模式之間進行切換。
 * 當前選中的模式會有特別的樣式。
 */
const ModeSwitch = memo<HeaderProps>(({ mode, onModeChange }) => (
  <div className="flex items-center gap-4">
    {/* "Hex to Tailwind" 按鈕 */}
    <button
      onClick={() => onModeChange(AppMode.HEX_TO_TAILWIND)}
      className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
        mode === AppMode.HEX_TO_TAILWIND
          ? 'bg-accent text-gray-900 shadow-lg' // 選中時的樣式
          : 'text-muted hover:text-muted-hover' // 未選中時的樣式
      }`}
    >
      <Hash size={16} /> Code to Class
    </button>

    {/* "Tailwind to Hex" 按鈕 */}
    <button
      onClick={() => onModeChange(AppMode.TAILWIND_TO_HEX)}
      className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
        mode === AppMode.TAILWIND_TO_HEX
          ? 'bg-accent text-gray-900 shadow-lg' // 選中時的樣式
          : 'text-muted hover:text-muted-hover' // 未選中時的樣式
      }`}
    >
      <Palette size={16} /> Class to Code
    </button>
  </div>
));

ModeSwitch.displayName = 'ModeSwitch';

// #endregion

export default App;
