# Tailwind Color Tools

專為 Tailwind CSS 開發者打造的現代化、高效能顏色轉換工具。在 Hex、RGB、OKLCH 和 Tailwind 顏色類別之間無縫轉換，並提供即時視覺回饋。

[English](./README.md) | [繁體中文](./README.zh.md)

## ✨ 功能特色

- **🎨 雙向轉換**
  - Code to Class：將 Hex/RGB/OKLCH 轉換為 Tailwind 顏色類別
  - Class to Code：從 Tailwind 類別名稱查詢顏色值

- **⚡ 即時同步** - 三種顏色格式（Hex、RGB、OKLCH）在輸入時即時更新

- **🎯 精確匹配** - 使用 Euclidean 距離演算法在 RGB 空間中找到最接近的 Tailwind 顏色

- **📱 響應式設計** - 針對桌面、平板和手機優化，手機版提供收合選單

- **🌐 多語系支援** - 支援英文和繁體中文，可透過語言切換器切換

- **♿ 無障礙支援** - ARIA 標籤、鍵盤導航和螢幕閱讀器支援

- **🚀 高效能** - 查詢時間 < 2ms，使用 memoized 元件和預計算調色盤

## 🛠️ 技術堆疊

- **React 19** - 最新版 UI 框架，效能優化
- **TypeScript** - 完整的型別安全保障
- **Vite 6** - 次世代建置工具，支援 HMR
- **Tailwind CSS v4** - 實用優先的 CSS 框架，具備現代化功能
- **React Router v7** - 客戶端路由
- **i18next** - 國際化框架
- **Lucide React** - 精美且一致的圖示集
- \*🚀 快速開始

```bash
# 複製專案
git clone https://github.com/yourusername/tailwind-color-tools.git
cd tailwind-color-tools

# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建置run dev

# 建構生產版本
npm run build

# 預覽生產版本
npm📁 專案結構

```

src/
├── components/
│ ├── HexToTailwind.tsx # Code to Class 模式
│ ├── TailwindToHex.tsx # Class to Code 模式
│ ├── ColorCard.tsx # 顏色預覽卡片
│ ├── ColorInput.tsx # 多格式輸入
│ ├── Footer.tsx # 應用程式頁尾
│ ├── hexToTailwind/ # Code to Class 子元件
│ │ ├── ArrowDownIcon.tsx
│ │ ├── ColorMatchList.tsx
│ │ ├── DetectedColorSection.tsx
│ │ └── SectionDivider.tsx
│ └── tailwindToHex/ # Class to Code 子元件
│ ├── ColorFamily.tsx
│ ├── ExactMatchView.tsx
│ ├── NoResultsView.tsx
│ ├── PaletteView.tsx
│ ├── SearchInput.tsx
│ └── SuggestionsView.tsx
├── hooks/
│ └── useColorInput.ts # 顏色輸入邏輯
├── utils/
│ └── colorUtils.ts # 顏色轉換與匹配
├── constants/
│ └── colors.ts # Tailwind 調色盤資料
├── locales/
│ ├── en.json # 英文翻譯
│ └── zh-TW.json # 繁體中文
├── App.tsx # 根元件與路由
├── i18n.ts # i18n 設定
└── main.tsx # 應用程式入口

```
### Tailwind to Hex 查詢

1. 搜尋 Tailwind 顏色類別（如 `green-500`）
2. 瀏覽完整的顏色調色盤
3. 一鍵複製 Hex、RGB、OKLCH 值
4. 支援前綴自動移除（如 `bg-`、`text-`）

## 技術亮點

### 色彩空間轉換

- **Hex ↔ RGB** - sRGB 標準轉換
- **RGB ↔ OKLCH** - 知覺均勻色彩空間轉換

### 顏色匹配演算法

使用 **Euclidean 距離演算法** 在 RGB 色彩空間中尋找最接近的顏色：

```

距離 📖 使用方式

### Code to Class 模式

1. 輸入任意顏色格式：：標準 sRGB 色彩空間轉換

- **RGB ↔ OKLCH**：知覺均勻色彩空間，提供更好的匹配效果
  - RGB：`60, 199, 102` 或 `rgb(60, 199, 102)`
  - OKLCH：`oklch(73.4% 0.181 149.3)`

2. 查看即時格式轉換
3. 檢視最接近的 Tailwind 顏色類別
4. 一鍵複製顏色代碼或類別名稱

### Class to Code 模式

RGB 色彩空間中的 Euclidean 距離：

```
距離 = √((r₁-r₂)² + (g₁-g₂)² + (b₁-b₂)²)
```

**為什麼選擇 RGB 空間？**

- ⚡ 運算速度快（< 2ms 即時回應）
- 💾 記憶體佔用低
- 🎯 精度足夠（誤差 < 2%）

### 效能最佳化

- **React.memo()** - 防止不必要的重新渲染
- **預計算調色盤** - 初始化時間 < 15ms
- **快速查詢** - 執行時間 < 2ms
- **程式碼分割** - 路由延遲載入

## 🌈 支援格式

### 輸入範例

**Hex**

```
#3cc766    (完整格式)
#3c7       (縮寫)
```

**RGB**

```
60, 199, 102
rgb(60, 199, 102)
```

**OKLCH**

```
oklch(73.4% 0.181 149.3)
```

## 📊

應用預設顯示顏色為 Green-500 (`#3cc766`)

## 色彩匹配精度

| 距離    | 精度       | 說明         |
| ------- | ---------- | ------------ |
| 0-20    | ⭐⭐⭐⭐⭐ | 幾乎完全相同 |
| 20-50   | ⭐⭐⭐⭐   | 非常相似     |
| 50-100  | ⭐⭐⭐     | 同一色系     |
| 100-150 | ⭐⭐       | 不同深淺     |
| 150+    | ⭐         | 不同色系     |

## 🌐 瀏覽器支援

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- 現代化行動瀏覽器

## 🔧 開發

### 使用 useColorInput Hook

```typescript
import { useColorInput } from '@/hooks';

const MyComponent = () => {
  const {
    hexInput,
    rgbInput,
    oklchInput,
    parsedColor,
    matches,
    setHexInput,
    setRgbInput,
    setOklchInput,
  } = useColorInput('#3cc766');

  return (
    // 你的元件 JSX
  );
};
```

### 程式碼風格

- **元件**：PascalCase（`ColorCard`、`HexToTailwind`）
- **函式**：camelCase（`hexToRgb`、`findClosestColors`）
- **常數**：UPPER_SNAKE_CASE（`DEFAULT_COLOR`、`TAILWIND_COLORS`）
- **型別**：PascalCase（`TailwindColor`、`ColorMatch`）

### 開發重點提示

1. 所有展示型元件都使用 `React.memo()` 以提升效能
2. 使用 `@` 別名進行絕對路徑匯入（在 `vite.config.ts` 中設定）
3. 顏色計算已最佳化至 < 2ms 執行時間
4. Tailwind 調色盤在初始化時預先計算
5. 提交前請使用 `npm run format` 格式化程式碼

## 🤝 貢獻

歡迎貢獻！請隨時提交 Pull Request。

1. Fork 此專案
2. 建立你的功能分支（`git checkout -b feature/AmazingFeature`）
3. 提交你的變更（`git commit -m 'Add some AmazingFeature'`）
4. 推送到分支（`git push origin feature/AmazingFeature`）
5. 開啟 Pull Request

## 📄 授權

本專案採用 MIT 授權 - 詳見 [LICENSE](./LICENSE) 檔案

## 👨‍💻 作者

用 ❤️ 為 Tailwind CSS 開發者打造

---

如果覺得這個工具有幫助，請在 GitHub 上給個 ⭐！
