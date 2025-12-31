/**
 * @fileoverview
 * HexToTailwind 頁面元件
 *
 * 主要責任：
 * 1. 管理三種色彩格式輸入（Hex、RGB、OKLCH）的同步轉換
 * 2. 實時計算與顯示最接近的 Tailwind 色彩匹配
 * 3. 提供清晰的視覺流程：輸入 → 檢測 → 匹配結果
 *
 * 工作流程：
 * 1. useColorInput Hook 管理色彩狀態與轉換邏輯
 * 2. 三個 ColorInput 元件接收使用者輸入（Hex、RGB、OKLCH）
 * 3. 檢測顏色區塊顯示解析後的色彩
 * 4. 動畫箭頭引導視線
 * 5. 匹配結果列表展示最接近的 Tailwind 色彩（最接近者高亮）
 *
 * 效能最佳化：
 * - 使用 React.memo() 防止不必要重繪
 * - ColorInput 與 ColorCard 皆已最佳化
 * - 色彩匹配在 useColorInput 中預計算
 *
 * UX 特色：
 * - 即時預覽：每個輸入框左側顯示色卡預覽
 * - 複製反饋：一鍵複製，顯示 ✓ 確認
 * - 錯誤恢復：無效輸入時優雅降級，灰色色卡提示
 * - 響應式：行動裝置上自動堆疊三欄輸入框
 */
import { memo } from 'react';
import { useColorInput } from '@/hooks/useColorInput';
import DetectedColorSection from './hexToTailwind/DetectedColorSection';
import ColorMatchList from './hexToTailwind/ColorMatchList';
import ArrowDownIcon from './hexToTailwind/ArrowDownIcon';
import ColorInput from './ColorInput';
import { DEFAULT_COLOR } from '@/constants';

// ============================================================================
// HexToTailwind Component - Hex 轉 Tailwind 顏色轉換頁面
// ============================================================================

/**
 * HexToTailwind - Hex 色碼轉換為最接近的 Tailwind 顏色
 *
 * 此頁面允許使用者：
 * 1. 輸入 Hex 色碼、RGB 或 OKLCH 格式的顏色
 * 2. 自動解析並顯示檢測到的色彩（在轉換區塊中）
 * 3. 看到最接近的 Tailwind 顏色匹配結果
 * 4. 複製匹配的顏色類別名或十六進位代碼
 *
 * 技術實作：
 * - 使用 useColorInput Hook 管理三種色彩格式的雙向同步
 * - 使用歐幾里得距離演算法在 RGB 色彩空間中尋找最接近的顏色
 * - 使用 memo() 優化重新渲染性能
 * - ColorInput 元件支援三種格式的獨立輸入
 * - 色彩預覽圓形提供即時視覺反饋
 *
 * 工作流程：
 * 1. 使用者在任一輸入欄輸入色彩（Hex、RGB 或 OKLCH）
 * 2. useColorInput Hook 自動驗證並轉換為其他格式
 * 3. 檢測到的顏色顯示在色彩預覽圓形和 ColorCard 中
 * 4. 最接近的 Tailwind 顏色列表在下方顯示
 * 5. 最接近的顏色用特殊樣式突出顯示（isClosest=true）
 */
const HexToTailwind = memo(() => {
  // ========================================================================
  // State - 使用 useColorInput Hook 管理顏色狀態
  // ========================================================================

  const {
    hexInput,
    rgbInput,
    oklchInput,
    parsedColor,
    matches,
    setHexInput,
    setRgbInput,
    setOklchInput,
  } = useColorInput(DEFAULT_COLOR);

  return (
    <div className="space-y-8">
      {/* ====================================================================
          輸入區塊 - 三種格式的顏色輸入欄（Hex、RGB、OKLCH）
          ==================================================================== */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Hex 色碼輸入 - 最常見的格式 */}
        <ColorInput
          label="HEX Code"
          value={hexInput}
          onChange={setHexInput}
          placeholder="#3b82f6"
          accentColor="hex"
        />

        {/* RGB 輸入 - 供參考和調整 */}
        <ColorInput
          label="RGB Values"
          value={rgbInput}
          onChange={setRgbInput}
          placeholder="59, 130, 246"
          accentColor="rgb"
        />

        {/* OKLCH 輸入 - 感知均勻色彩空間 */}
        <ColorInput
          label="OKLCH"
          value={oklchInput}
          onChange={setOklchInput}
          placeholder="oklch(0.6 0.2 250)"
          accentColor="oklch"
        />
      </div>

      {/* ====================================================================
          色彩預覽 - 圓形預覽框，即時反映使用者輸入的顏色
          ==================================================================== */}
      {/* <div className="my-4 p-4 flex justify-center">
        <div
          className="h-16 w-16 rounded-full border-4 border-gray-300 shadow-lg transition-colors duration-300"
          style={{ backgroundColor: parsedColor?.hex || 'transparent' }}
        />
      </div> */}

      {/* Results Section */}
      {parsedColor && (
        <div className="animate-in fade-in slide-in-from-bottom-2 space-y-6 duration-500">
          {/* ================================================================
              分割線和標題 - 區隔檢測到的顏色區塊
              ================================================================ */}
          <DetectedColorSection color={parsedColor} />
          <ArrowDownIcon />
          {matches.length > 0 && <ColorMatchList matches={matches} />}
        </div>
      )}
    </div>
  );
});

HexToTailwind.displayName = 'HexToTailwind';

export default HexToTailwind;
