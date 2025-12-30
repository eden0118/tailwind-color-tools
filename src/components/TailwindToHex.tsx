import { useState, useEffect, useMemo, memo, useCallback } from 'react';
import { findHexByClass, ALL_TAILWIND_COLORS } from '@/utils/colorUtils';
import { TailwindColor } from '@/types';
import ColorCard from '@/components/ColorCard';
import { Search, X } from 'lucide-react';
import { SUGGESTION_LIMIT } from '@/constants';

// ============================================================================
// TailwindToHex Component - Tailwind 顏色類別查詢和預覽
// ============================================================================

/**
 * TailwindToHex - 搜尋並查詢 Tailwind 顏色類別
 *
 * 此頁面允許使用者：
 * 1. 搜尋特定的 Tailwind 顏色類別（如 blue-500、red-600）
 * 2. 查看搜尋結果的精確匹配和相關建議
 * 3. 瀏覽完整的 Tailwind 調色盤，按顏色家族組織
 * 4. 點擊任何顏色快速查看詳細資訊並複製
 *
 * 技術實作：
 * - 使用 useState 管理搜尋輸入和結果狀態
 * - 使用 useMemo 優化色彩組群的計算（僅在首次渲染時執行）
 * - 使用 memo() 優化各個子元件的渲染
 * - 使用 useCallback 確保回調函數的穩定性
 * - 支援三種視圖模式：精確匹配、建議、全調色盤
 *
 * 工作流程：
 * 1. 使用者在搜尋欄輸入顏色類別名稱（如 "blue-500"）
 * 2. useEffect 監聽 input 變化，觸發搜尋邏輯
 * 3. 如果有精確匹配，顯示 ExactMatchView
 * 4. 如果沒有精確匹配，顯示相關的建議顏色（SuggestionsView）
 * 5. 沒有輸入時，顯示完整調色盤（PaletteView）
 */
const TailwindToHex = memo(() => {
  // ========================================================================
  // State Management - 狀態管理
  // ========================================================================

  const [input, setInput] = useState('');
  const [match, setMatch] = useState<TailwindColor | null>(null);
  const [suggestions, setSuggestions] = useState<TailwindColor[]>([]);

  // ========================================================================
  // Computed Values - 計算值
  // ========================================================================

  /**
   * colorGroups - 按顏色家族組織所有 Tailwind 顏色
   *
   * 依賴於 ALL_TAILWIND_COLORS 常數（但實際上不變），
   * 所以空依賴陣列 [] 表示此值只在初始化時計算一次。
   *
   * 結果結構：
   * {
   *   'slate': [{ class: 'slate-50', hex: '#f8fafc', ... }, ...],
   *   'red': [{ class: 'red-50', hex: '#fef2f2', ... }, ...],
   *   ...
   * }
   */
  const colorGroups = useMemo(() => buildColorGroups(), []);

  // ========================================================================
  // Effect: Handle Search Input Changes - 處理搜尋輸入變化
  // ========================================================================

  /**
   * useEffect - 監聽 input 變化並更新匹配和建議結果
   *
   * 流程：
   * 1. 如果輸入為空，清除匹配和建議，並返回到調色盤視圖
   * 2. 嘗試精確匹配輸入的顏色類別名稱（使用 findHexByClass）
   * 3. 如果沒有精確匹配，提供建議清單
   *    - 移除前綴（bg-、text-、border- 等）進行模糊匹配
   *    - 限制建議數量為 SUGGESTION_LIMIT（通常 12）
   */
  // Handle input changes
  useEffect(() => {
    if (!input.trim()) {
      setMatch(null);
      setSuggestions([]);
      return;
    }

    // 嘗試精確匹配搜尋查詢
    const found = findHexByClass(input);
    setMatch(found || null);

    // 生成建議清單（用於部分匹配）
    const cleanInput = input.toLowerCase().replace(/^(bg|text|border|ring)-/, '');
    const filtered = ALL_TAILWIND_COLORS.filter((tc) => tc.class.includes(cleanInput)).slice(
      0,
      SUGGESTION_LIMIT
    );

    setSuggestions(filtered);
  }, [input]);

  // ========================================================================
  // Event Handlers - 事件處理
  // ========================================================================

  const handleClearInput = useCallback(() => setInput(''), []);

  return (
    <div className="space-y-8">
      {/* ====================================================================
          搜尋區塊 - 用於快速查詢 Tailwind 顏色類別
          ==================================================================== */}
      <SearchInput value={input} onChange={setInput} onClear={handleClearInput} />

      <div className="space-y-4">
        {/* ================================================================
            精確匹配視圖 - 當使用者輸入的顏色類別完全匹配時顯示
            ================================================================ */}
        {match && <ExactMatchView match={match} />}

        {/* ================================================================
            建議視圖 - 當輸入有值但沒有精確匹配時顯示
            顯示相關的建議顏色網格
            ================================================================ */}
        {input && !match && <SuggestionsView suggestions={suggestions} onSelect={setInput} />}

        {/* ================================================================
            無結果視圖 - 當搜尋無結果時顯示
            ================================================================ */}
        {input && !match && suggestions.length === 0 && <NoResultsView query={input} />}

        {/* ================================================================
            調色盤視圖 - 當沒有輸入時顯示完整的 Tailwind 調色盤
            按顏色家族（slate、red、blue 等）組織
            ================================================================ */}
        {!input && <PaletteView colorGroups={colorGroups} onSelectColor={setInput} />}
      </div>
    </div>
  );
});

TailwindToHex.displayName = 'TailwindToHex';

// ============================================================================
// Sub Components - 子元件
// ============================================================================

/**
 * SearchInput - 搜尋輸入欄
 *
 * 用途：
 * - 供使用者輸入 Tailwind 顏色類別名稱
 * - 提供清除按鈕快速重置搜尋
 * - 視覺反饋（焦點時的環形）
 *
 * @param value - 當前輸入值
 * @param onChange - 輸入變化回調
 * @param onClear - 清除輸入回調
 */
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

const SearchInput = memo<SearchInputProps>(({ value, onChange, onClear }) => (
  <div className="mx-auto max-w-3xl space-y-2">
    <label className="text-sm font-medium text-text-muted">Enter Tailwind Class</label>
    <div className="relative">
      <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-text-muted" size={20} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. blue-500, red-600..."
        className="w-full rounded-xl border border-border bg-background-secondary py-4 pr-12 pl-12 font-mono text-lg text-text-primary transition-all focus:ring-2 focus:ring-pink-500 focus:outline-none"
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full p-1.5 text-text-muted transition-colors hover:bg-border/50 hover:text-text-secondary"
          title="Clear input"
        >
          <X size={18} />
        </button>
      )}
    </div>
  </div>
));

SearchInput.displayName = 'SearchInput';

/**
 * ExactMatchView - 精確匹配結果視圖
 *
 * 用途：
 * - 當搜尋找到精確匹配的 Tailwind 顏色時顯示
 * - 使用 ColorCard 展示完整的顏色資訊和複製選項
 * - 用 isClosest=true 突出顯示
 *
 * @param match - 精確匹配的 TailwindColor 物件
 */
interface ExactMatchViewProps {
  match: TailwindColor;
}

const ExactMatchView = memo<ExactMatchViewProps>(({ match }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-3xl duration-500">
    <h2 className="mb-3 text-sm font-semibold tracking-wider text-text-muted uppercase">
      Exact Match
    </h2>
    <ColorCard color={match} isClosest={true} />
  </div>
));

ExactMatchView.displayName = 'ExactMatchView';

/**
 * SuggestionsView - 建議顏色網格
 *
 * 用途：
 * - 當沒有精確匹配但有相關建議時顯示
 * - 以網格形式展示建議的顏色
 * - 使用者可點擊建議顏色進行搜尋
 *
 * @param suggestions - 建議顏色陣列
 * @param onSelect - 顏色被選中時的回調（填入搜尋欄）
 */
interface SuggestionsViewProps {
  suggestions: TailwindColor[];
  onSelect: (value: string) => void;
}

const SuggestionsView = memo<SuggestionsViewProps>(({ suggestions, onSelect }) => (
  <div className="mx-auto max-w-4xl">
    <h2 className="mb-3 text-sm font-semibold tracking-wider text-text-muted uppercase">
      Suggestions
    </h2>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {suggestions.map((s) => (
        <button
          key={s.class}
          onClick={() => onSelect(s.class)}
          className="flex flex-col items-center gap-2 rounded-lg border border-border bg-background-secondary p-3 transition-all hover:border-pink-500/50 hover:bg-border"
        >
          <div className="h-8 w-full rounded" style={{ backgroundColor: s.hex }} />
          <span className="font-mono text-xs text-text-secondary">{s.class}</span>
        </button>
      ))}
    </div>
  </div>
));

SuggestionsView.displayName = 'SuggestionsView';

/**
 * NoResultsView - 無結果訊息
 *
 * 用途：
 * - 當搜尋無任何結果時顯示友善的提示訊息
 *
 * @param query - 用戶搜尋的查詢字串
 */
interface NoResultsViewProps {
  query: string;
}

const NoResultsView = memo<NoResultsViewProps>(({ query }) => (
  <div className="py-12 text-center text-text-muted">
    <p>No class found matching "{query}"</p>
  </div>
));

NoResultsView.displayName = 'NoResultsView';

/**
 * PaletteView - 完整調色盤視圖
 *
 * 用途：
 * - 當使用者沒有進行搜尋時顯示完整的 Tailwind 調色盤
 * - 按顏色家族（slate、red、blue 等）組織
 * - 每個顏色家族顯示為一個卡片
 *
 * @param colorGroups - 按家族組織的顏色物件
 * @param onSelectColor - 顏色被選中時的回調
 */
interface PaletteViewProps {
  colorGroups: Record<string, TailwindColor[]>;
  onSelectColor: (colorClass: string) => void;
}

const PaletteView = memo<PaletteViewProps>(({ colorGroups, onSelectColor }) => (
  <div className="animate-in fade-in duration-700">
    <div className="mb-6 flex items-center gap-4">
      <div className="h-px flex-1 bg-background-secondary"></div>
      <span className="text-sm font-medium tracking-widest text-text-muted uppercase">
        Full Tailwind Palette
      </span>
      <div className="h-px flex-1 bg-background-secondary"></div>
    </div>

    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Object.entries(colorGroups).map(([family, colors]) => (
        <ColorFamily key={family} name={family} colors={colors} onSelectColor={onSelectColor} />
      ))}
    </div>
  </div>
));

PaletteView.displayName = 'PaletteView';

/**
 * ColorFamily - 單個顏色家族卡片
 *
 * 用途：
 * - 展示一個顏色家族的所有色調（50-950）
 * - 以 6×N 網格顯示所有顏色
 * - 支援懸停時顯示色號（shade）標籤
 *
 * @param name - 顏色家族名稱（如 'slate'、'red'）
 * @param colors - 該家族的所有顏色
 * @param onSelectColor - 顏色被選中時的回調
 */
interface ColorFamilyProps {
  name: string;
  colors: TailwindColor[];
  onSelectColor: (colorClass: string) => void;
}

const ColorFamily = memo<ColorFamilyProps>(({ name, colors, onSelectColor }) => (
  <div className="rounded-xl border border-background-secondary/50 bg-background-secondary/30 p-4 transition-colors hover:border-border">
    <h3 className="mb-3 font-bold text-text-secondary capitalize">{name}</h3>
    {/*
      顏色網格 - 6 列布局

      特點：
      - 每個顏色格子可點擊，觸發搜尋
      - 懸停時自動放大並顯示色號（shade）標籤
      - 根據亮度自動選擇文字顏色（亮色背景用黑色，深色背景用白色）
    */}
    <div className="grid grid-cols-6 gap-2">
      {colors.map((c) => {
        // 提取色號（50、100、200 等）
        const shade = c.class.split('-').pop();
        // 判斷是否為淺色調（50-400），以便決定覆蓋文字顏色
        const isLight = ['50', '100', '200', '300', '400'].includes(shade || '');

        return (
          <button
            key={c.class}
            onClick={() => onSelectColor(c.class)}
            className="group relative flex aspect-square items-center justify-center rounded shadow-sm ring-1 ring-white/5 transition-all hover:z-10 hover:scale-110"
            style={{ backgroundColor: c.hex }}
            title={c.class}
          >
            {/*
              色號標籤 - 懸停時顯示
              根據背景亮度選擇文字顏色以確保可讀性
            */}
            <span
              className={`text-[10px] font-bold opacity-0 transition-opacity group-hover:opacity-100 ${
                isLight ? 'text-background-primary' : 'text-text-primary'
              }`}
            >
              {shade}
            </span>
          </button>
        );
      })}
    </div>
  </div>
));

ColorFamily.displayName = 'ColorFamily';

// ============================================================================
// Utility Functions - 工具函數
// ============================================================================

/**
 * buildColorGroups - 按顏色家族組織所有 Tailwind 顏色
 *
 * 算法：
 * 1. 遍歷所有 Tailwind 顏色
 * 2. 根據顏色類別名中的首個部分（如 'blue' 在 'blue-500'）分組
 * 3. 返回一個物件，鍵為家族名稱，值為該家族的所有顏色陣列
 *
 * 範例輸出：
 * {
 *   'slate': [slate-50, slate-100, ...],
 *   'red': [red-50, red-100, ...],
 *   'blue': [blue-50, blue-100, ...]
 * }
 *
 * 此函數被 useMemo 包裹，因此只在元件初始化時執行一次。
 *
 * @returns 按家族組織的顏色物件
 */
function buildColorGroups(): Record<string, TailwindColor[]> {
  const groups: Record<string, TailwindColor[]> = {};

  ALL_TAILWIND_COLORS.forEach((color) => {
    // 將顏色類別分割為部分（如 'blue-500' → ['blue', '500']）
    const parts = color.class.split('-');
    // 取第一部分作為家族名稱，如果只有一部分則用 'other'
    const base = parts.length > 1 ? parts[0] : 'other';

    // 初始化家族陣列（如果還不存在）
    if (!groups[base]) {
      groups[base] = [];
    }
    // 新增顏色到家族
    groups[base].push(color);
  });

  return groups;
}

export default TailwindToHex;
