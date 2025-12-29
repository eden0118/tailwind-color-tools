# Tailwind Color Master

一個現代化、高效能的 Tailwind CSS 顏色工具，幫助開發者輕鬆在 Hex、RGB、OKLCH 和 Tailwind 顏色類別之間轉換。

## ✨ 功能特色

- **🎨 Hex to Tailwind**：輸入任意顏色代碼（Hex、RGB、OKLCH），自動找到最接近的 Tailwind 顏色類別
- **🌈 Tailwind to Hex**：瀏覽完整的 Tailwind 調色盤，快速查找顏色對應的 Hex、RGB、OKLCH 值
- **⚡ 實時同步**：三種顏色格式實時聯動轉換
- **🎯 精確匹配**：使用 Euclidean 距離演算法找到最接近的顏色
- **♿ 無障礙設計**：支援鍵盤導航和螢幕閱讀器
- **📱 響應式設計**：完美支援桌面、平板和手機設備

## 🛠 技術棧

- **React 19** - 現代 UI 框架
- **TypeScript** - 型別安全的開發體驗
- **Vite 6** - 超快速開發伺服器
- **Tailwind CSS v4** - 實用優先的 CSS 框架
- **OKLCH 色彩空間** - 知覺均勻的顏色轉換
- **Lucide React** - 輕量級 SVG 圖示庫
- **Prettier** - 自動程式碼格式化

## 🚀 快速開始

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建構生產版本
npm run build

# 預覽生產版本
npm run preview

# 格式化程式碼
npm run format
```

## 📁 專案結構

```
tailwind-color-tools/
├── public/                    # 靜態資源
├── src/
│   ├── components/            # React 元件層
│   │   ├── ColorCard.tsx      # 顏色資訊卡片（支援複製）
│   │   ├── ColorInput.tsx     # 統一的顏色輸入框
│   │   ├── Footer.tsx         # 頁腳元件
│   │   ├── HexToTailwind.tsx # Hex→Tailwind 轉換頁面
│   │   └── TailwindToHex.tsx # Tailwind→Hex 查詢頁面
│   ├── hooks/                 # 自訂 React Hooks
│   │   └── useColorInput.ts  # 多格式顏色輸入管理 Hook
│   ├── constants/             # 常數和配置
│   │   ├── colors.ts          # Tailwind 顏色調色盤
│   │   └── index.ts           # 導出所有常數
│   ├── utils/                 # 工具函式
│   │   └── colorUtils.ts      # 顏色轉換和匹配演算法
│   ├── types.ts               # TypeScript 型別定義
│   ├── App.tsx                # 主應用元件（導航和佈局）
│   ├── main.tsx               # 應用入口點
│   └── index.css              # 全局樣式
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
└── README.md
```

## 🎯 核心功能說明

### Hex to Tailwind 模式
1. 輸入任意顏色格式（Hex、RGB、OKLCH）
2. 實時同步顯示其他格式的等效值
3. 自動計算並顯示最接近的 5 個 Tailwind 顏色
4. 一鍵複製顏色代碼和類別名稱

### Tailwind to Hex 模式
1. 搜尋 Tailwind 顏色類別（如 `blue-500`）
2. 瀏覽完整的顏色調色盤（按色系分組）
3. 一鍵複製 Hex、RGB、OKLCH 值
4. 支援前綴自動移除（如 `bg-` 前綴）

## 🔧 技術亮點

### 顏色空間轉換
- **Hex ↔ RGB** - 標準 sRGB 轉換
- **RGB ↔ OKLCH** - 知覺均勻的顏色空間
- **OKLCH ↔ RGB** - 反向轉換

### 顏色匹配演算法
- 使用 Euclidean 距離在 RGB 空間中計算顏色接近度
- 預先計算所有 Tailwind 顏色以優化效能
- 支援自訂匹配數量限制

### 效能優化
- 使用 `React.memo()` 防止不必要的重新渲染
- 使用 `useCallback` 穩定函數參考
- 使用 `useMemo` 快取計算結果

## 📝 程式碼架構

### 元件層次結構
```
App (模式切換 + 佈局)
├── Header (導航和標題)
├── HexToTailwind / TailwindToHex (頁面容器)
│   ├── ColorInput × 3 (Hex/RGB/OKLCH 輸入)
│   └── ColorCard × 1+ (顏色卡片)
│       ├── CopyButton (複製按鈕)
│       └── FormatDisplay (格式顯示)
└── Footer (頁腳)
```

### Hook 架構
- `useColorInput` - 管理 Hex、RGB、OKLCH 三種格式的同步轉換

### 工具函式分組
```
colorUtils.ts
├── Color Space Conversion (顏色空間轉換)
├── Color Format Parsing (格式解析)
└── Tailwind Color Matching (顏色匹配)
```

## 🎨 Tailwind 4.0 特性

- 使用 `bg-linear-to-br` 漸層語法
- 使用 Tailwind Prettier 外掛自動排序類別
- 響應式設計使用 `md:` 和 `sm:` 斷點

## 📚 API 文檔

### `useColorInput(defaultColor?: string)`
```typescript
// 返回物件包含：
{
  hexInput: string;              // Hex 格式輸入
  rgbInput: string;              // RGB 格式輸入
  oklchInput: string;            // OKLCH 格式輸入
  parsedColor: TailwindColor;    // 解析後的顏色物件
  matches: ColorMatch[];         // 最接近的 5 個 Tailwind 顏色
  setHexInput: (value: string) => void;
  setRgbInput: (value: string) => void;
  setOklchInput: (value: string) => void;
}
```

### `colorUtils.ts` 匯出的主要函式
- `hexToRgb(hex: string)` - Hex 轉 RGB
- `rgbToHex(r, g, b)` - RGB 轉 Hex
- `rgbToOklch(r, g, b)` - RGB 轉 OKLCH
- `oklchToRgb(l, c, h)` - OKLCH 轉 RGB
- `parseHex/parseRgb/parseOklch()` - 格式解析
- `findClosestTailwindColors(hex)` - 顏色匹配
- `findHexByClass(className)` - 類別查詢

## 🌐 支援的瀏覽器

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## 📄 授權

MIT License
│   ├── types.ts         # TypeScript 類型定義
│   └── index.css        # 全域樣式
├── index.html           # HTML 模板
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .prettierrc          # Prettier 配置
└── README.md
```

## License

MIT
