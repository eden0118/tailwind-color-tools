/**
 * @fileoverview
 * TailwindToHex 頁面元件
 *
 * 主要責任：
 * 1. 搜尋 Tailwind 色彩類別名（如 blue-500、red-600）
 * 2. 展示精確匹配、模糊建議、或完整調色盤
 * 3. 提供快速查找與顏色預覽功能
 *
 * 三種視圖模式：
 * 1. 精確匹配 (ExactMatchView) - 搜尋完全相符時顯示
 * 2. 建議清單 (SuggestionsView) - 無精確匹配但有相關顏色時顯示
 * 3. 調色盤 (PaletteView) - 無搜尋時顯示完整 Tailwind 調色盤
 * 4. 無結果 (NoResultsView) - 搜尋無任何結果時顯示
 *
 * 特色功能：
 * - 自動前綴移除：支援 bg-、text-、border-、ring- 前綴自動去除
 * - 色系分組：調色盤按顏色家族（slate、red、blue 等）組織
 * - 色號懸停：6 列網格中，懸停時顯示色號（50、100、200 等）
 * - 實時搜尋：輸入時立即更新建議
 *
 * 效能最佳化：
 * - useMemo：色組在初始化時計算一次
 * - memo()：所有子元件都已包裝，避免不必要重繪
 * - useCallback：回調函數穩定，避免破壞依賴陣列
 *
 * 組件拆分優勢：
 * - SearchInput：統一搜尋欄，支援清除功能
 * - ExactMatchView / SuggestionsView / NoResultsView：各司其職
 * - PaletteView + ColorFamily：調色盤展示與色系細節
 * - 易於擴展：新增搜尋功能或過濾不需修改主邏輯
 */
import { useState, useEffect, useMemo, memo, useCallback } from 'react';
import { findHexByClass, ALL_TAILWIND_COLORS, buildColorGroups } from '@/utils/colorUtils';
import { useSEO } from '@/hooks/useSEO';
import { getPageSEO } from '@/config/seoConfig';
import { TailwindColor } from '@/types';
import SearchInput from './tailwindToHex/SearchInput';
import ExactMatchView from './tailwindToHex/ExactMatchView';
import SuggestionsView from './tailwindToHex/SuggestionsView';
import NoResultsView from './tailwindToHex/NoResultsView';
import PaletteView from './tailwindToHex/PaletteView';

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
  // SEO Initialization - SEO 設定初始化
  // ========================================================================
  useSEO(getPageSEO('classToCode'));

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
    const filtered = ALL_TAILWIND_COLORS.filter((tc) => tc.class.includes(cleanInput));

    setSuggestions(filtered);
  }, [input]);

  // ========================================================================
  // Event Handlers - 事件處理
  // ========================================================================

  const handleClearInput = useCallback(() => setInput(''), []);

  return (
    <div className="space-y-8">
      <SearchInput value={input} onChange={setInput} onClear={handleClearInput} />
      <div className="space-y-4">
        {match && <ExactMatchView match={match} />}
        {input && !match && <SuggestionsView suggestions={suggestions} onSelect={setInput} />}
        {input && !match && suggestions.length === 0 && <NoResultsView query={input} />}
        {!input && <PaletteView colorGroups={colorGroups} onSelectColor={setInput} />}
      </div>
    </div>
  );
});

TailwindToHex.displayName = 'TailwindToHex';

export default TailwindToHex;
