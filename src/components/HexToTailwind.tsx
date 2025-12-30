import { memo } from 'react';
import { useColorInput } from '@/hooks/useColorInput';
import ColorCard from '@/components/ColorCard';
import ColorInput from './ColorInput';
import { ArrowDown } from 'lucide-react';
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
 * - 使用歐幾里得距離演算法在 OKLCH 色彩空間中尋找最接近的顏色
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
          accentColor="indigo"
          icon="#"
        />

        {/* RGB 輸入 - 供參考和調整 */}
        <ColorInput
          label="RGB Values"
          value={rgbInput}
          onChange={setRgbInput}
          placeholder="59, 130, 246"
          accentColor="pink"
        />

        {/* OKLCH 輸入 - 感知均勻色彩空間 */}
        <ColorInput
          label="OKLCH"
          value={oklchInput}
          onChange={setOklchInput}
          placeholder="oklch(0.6 0.2 250)"
          accentColor="green"
        />
      </div>

      {/* ====================================================================
          色彩預覽 - 圓形預覽框，即時反映使用者輸入的顏色
          ==================================================================== */}
      <div className="-mt-4 mb-4 flex justify-center">
        <div
          className="h-16 w-16 rounded-full border-4 border-slate-800 shadow-lg transition-colors duration-300"
          style={{ backgroundColor: parsedColor?.hex || 'transparent' }}
        />
      </div>

      {/* Results Section */}
      {parsedColor && (
        <div className="animate-in fade-in slide-in-from-bottom-2 space-y-6 duration-500">
          {/* ================================================================
              分割線和標題 - 區隔檢測到的顏色區塊
              ================================================================ */}
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-800"></div>
            <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">
              Detected Color
            </span>
            <div className="h-px flex-1 bg-slate-800"></div>
          </div>

          {/* ================================================================
              解析後的顏色顯示 - 使用 ColorCard 元件展示完整顏色資訊
              包括：顏色名稱、Hex、RGB、OKLCH 和複製按鈕
              ================================================================ */}
          <ColorCard color={parsedColor} />

          {/* ================================================================
              箭頭動畫 - 從輸入到結果的視覺引導
              ================================================================ */}
          <div className="flex justify-center text-slate-600">
            <ArrowDown size={24} className="animate-bounce" />
          </div>

          {/* ================================================================
              最接近的顏色列表 - 顯示從 Tailwind 調色盤中找到的匹配項
              使用歐幾里得距離演算法在 OKLCH 色彩空間中計算
              ================================================================ */}
          {matches.length > 0 && (
            <div className="space-y-4">
              {/* 分割線和標題 */}
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-800"></div>
                <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                  Closest Matches
                </span>
                <div className="h-px flex-1 bg-slate-800"></div>
              </div>

              {/* 顏色卡片列表
                  - 第一個結果（index === 0）用 isClosest=true 突出顯示
                  - 其餘結果正常顯示，包含偏差指標
              */}
              <div className="space-y-3">
                {matches.map((match, index) => (
                  <ColorCard key={match.class} color={match} isClosest={index === 0} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

HexToTailwind.displayName = 'HexToTailwind';

export default HexToTailwind;
