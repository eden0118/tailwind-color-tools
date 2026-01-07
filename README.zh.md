# Color Converter

一個現代化、高效能的 Tailwind CSS 顏色轉換工具，幫助開發者輕鬆在 Hex、RGB、OKLCH 和 Tailwind 顏色類別之間進行轉換。

[English](./README.md) | [中文](./README.zh.md)

## 功能特色

- **Code to Class** - 輸入任意顏色代碼（Hex、RGB、OKLCH），自動找到最接近的 Tailwind 顏色類別
- **Class to Code** - 瀏覽完整 Tailwind 調色盤，快速查找顏色對應的代碼值
- **實時同步** - 三種顏色格式實時聯動轉換
- **精確匹配** - 使用 Euclidean 距離演算法在 RGB 色彩空間中尋找最接近的顏色
- **響應式設計** - 完美支援桌面、平板和手機設備
- **模式切換** - 透過圖標導航輕鬆切換轉換模式

## 技術棧

- **React 19** - 現代 UI 框架
- **TypeScript** - 型別安全的開發體驗
- **Vite 6** - 超快速開發伺服器
- **Tailwind CSS v4** - 實用優先的 CSS 框架
- **Lucide React** - 輕量級 SVG 圖示庫
- **Prettier** - 自動程式碼格式化

## 快速開始

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

## 專案結構

```
src/
├── components/
│   ├── App.tsx                      # 主應用程式及模式切換
│   ├── ColorCard.tsx                # 顏色資訊顯示
│   ├── ColorInput.tsx               # 多格式顏色輸入框
│   ├── HexToTailwind.tsx            # Code to Class 轉換
│   ├── TailwindToHex.tsx            # Class to Code 查詢
│   ├── Footer.tsx                   # 頁尾區塊
│   ├── hexToTailwind/
│   │   ├── ColorMatchList.tsx       # 匹配顏色清單
│   │   ├── DetectedColorSection.tsx # 偵測到的顏色顯示
│   │   ├── SectionDivider.tsx       # 視覺分隔線
│   │   └── ArrowDownIcon.tsx        # 向下箭頭圖標
│   └── tailwindToHex/
│       ├── ColorFamily.tsx          # 顏色族群分組
│       ├── ExactMatchView.tsx       # 精確顏色匹配顯示
│       ├── NoResultsView.tsx        # 無結果訊息
│       ├── PaletteView.tsx          # 完整調色盤檢視
│       ├── SearchInput.tsx          # 搜尋功能
│       └── SuggestionsView.tsx      # 顏色建議
├── hooks/
│   ├── index.ts
│   Code to Class (Hex 到 Tailwind)

1. 輸入任意顏色格式（Hex、RGB、OKLCH）
2. 實時同步顯示其他格式的等效值
3. 自動計算並顯示最接近的 Tailwind 顏色
4. 一鍵複製顏色代碼和類別名稱

### Class to Code (Tailwind 到 Hex)

1. 搜尋 Tailwind 顏色類別（如 `green-500`）
2. 瀏覽按顏色族群組織的完整調色盤
3. 檢視精確匹配和相似顏色建議
4. 一鍵複製 Hex、RGB、OKLCH 值
5
### Hex to Tailwind 轉換

1. 輸入任意顏色格式（Hex、RGB、OKLCH）
2. 實時同步顯示其他格式的等效值
3. 自動計算並顯示最接近的 Tailwind 顏色
4. 一鍵複製顏色代碼和類別名稱

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

距離 = sqrt((r₁-r₂)² + (g₁-g₂)² + (b₁-b₂)²)

````

**為什麼選擇 RGB？**

- 計算速度快（實時反饋 < 2ms）
- 預計算成本低
- 匹配精度足夠（RGB 誤差 < 2%）

### 效能最佳化

- 使用 `React.memo()` 防止不必要的重新渲染
- 色彩表預計算（< 15ms）
- 實時查詢耗時 < 2ms

## 支援的顏色格式

### 輸入格式

Hex

- `#3cc766` (完整)
- `#3c7` (縮寫)

RGB

- `60, 199, 102`
- `rgb(60, 199, 102)`

OKLCH

- `oklch(73.4% 0.181 149.3)`

### 預設顏色

應用預設顯示顏色為 Green-500 (`#3cc766`)

## 色彩匹配精度

| 距離範圍 | 精度等級 | 說明           |
| -------- | -------- | -------------- |
| 0-20     | 非常高   | 幾乎完全相同   |
| 20-50    | 高       | 非常接近       |
| 50-100   | 中       | 同色系但有差異 |
| 100-150  | 低       | 不同深淺       |
| 150+     | 很低     | 不同色系       |

## 支援的瀏覽器

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## 使用 useColorInput Hook

```typescript
const {、HexToTailwind)
- **函式**：camelCase (hexToRgb、findClosestTailwindColors)
- **常數**：UPPER_SNAKE_CASE (DEFAULT_COLOR)
- **型別**：PascalCase (TailwindColor、ColorMatch、AppMode)
- **枚舉**：PascalCase 且值為 UPPER_SNAKE_CASE (AppMode.HEX_TO_TAILWIND)

## 開發提示

- 所有元件都使用 `React.memo()` 包裝以獲得最佳效能
- 在 `vite.config.ts` 中配置的 `@` 別名用於絕對導入
- 顏色計算經過最佳化，實時反饋耗時 < 2ms
- Tailwind 顏色調色盤經過預計算以實現快速查找
  parsedColor, // 解析後的顏色
  matches, // 最接近的顏色列表
  setHexInput, // 更新 Hex 輸入
  setRgbInput, // 更新 RGB 輸入
  setOklchInput, // 更新 OKLCH 輸入
} = useColorInput(defaultColor);
````

## 代碼規範

- **元件**：PascalCase (ColorCard)
- **函式**：camelCase (hexToRgb)
- **常數**：UPPER_SNAKE_CASE (DEFAULT_COLOR)
- **型別**：PascalCase (TailwindColor)

## 授權

MIT License

**Created with ❤️ for Tailwind CSS developers**
