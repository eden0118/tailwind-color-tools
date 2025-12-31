# CONTRIBUTING.md

開發指南與貢獻流程

## 開發環境設定

```bash
# 安裝依賴
npm install

# 啟動開發伺服器（熱更新）
npm run dev

# 執行測試
npm run test

# 查看測試 UI
npm run test:ui

# 格式化程式碼
npm run format
```

## 程式碼規範

### 命名約定

- **元件**：PascalCase（如 ColorCard、HexToTailwind）
- **函式**：camelCase（如 hexToRgb、useColorInput）
- **常數**：UPPER_SNAKE_CASE（如 DEFAULT_COLOR、SUGGESTION_LIMIT）
- **型別**：PascalCase（如 TailwindColor、ColorMatch）

### 檔案結構

```
src/
├── components/          # UI 元件層
│   ├── HexToTailwind.tsx
│   ├── hexToTailwind/   # 子元件
│   └── ...
├── hooks/              # 自訂 Hooks
├── utils/              # 工具函式
├── constants/          # 常數與配置
├── types.ts            # TypeScript 型別定義
└── styles/             # 全局樣式
```

### JSDoc 註解

所有函式與元件應包含 JSDoc 註解：

```typescript
/**
 * 轉換 Hex 顏色為 RGB
 *
 * @param hex - 十六進位顏色字串（#RGB 或 #RRGGBB）
 * @returns RGB 物件 {r, g, b}，無效時返回 null
 *
 * @example
 * hexToRgb('#fff') // { r: 255, g: 255, b: 255 }
 */
export const hexToRgb = (hex: string): RGB | null => {
  // ...
};
```

## 測試指南

### 撰寫測試

```typescript
import { describe, it, expect } from 'vitest';

describe('功能模組', () => {
  it('應該執行特定行為', () => {
    const result = myFunction('input');
    expect(result).toBe('expected');
  });
});
```

### 測試覆蓋率目標

- colorUtils.ts：> 95%
- useColorInput：> 85%
- 元件邏輯：> 80%

### 執行測試

```bash
# 單次執行
npm run test

# 監聽模式
npm run test -- --watch

# 查看覆蓋率
npm run test:coverage
```

## 效能最佳實踐

1. **元件最佳化**
   - 使用 `React.memo()` 包裝演示性元件
   - 使用 `useCallback` 穩定回調函數
   - 避免在渲染時建立新物件

2. **計算最佳化**
   - 使用 `useMemo` 快取昂貴計算
   - 預計算 Tailwind 色彩表（僅初始化一次）
   - 避免在迴圈中進行複雜轉換

3. **DOM 最佳化**
   - 搜尋結果限制在 12 個
   - 使用 key 屬性提高列表效率
   - 虛擬化長列表（若超過 100 項）

## 提交指南

### 提交訊息格式

```
<type>: <subject>

<body>

<footer>
```

**Type:**

- feat: 新功能
- fix: 修復 BUG
- docs: 文檔更新
- style: 代碼風格（不影響邏輯）
- refactor: 重構
- test: 測試新增或修改
- perf: 效能最佳化

**Example:**

```
feat: 新增深色模式支援

- 新增 DarkMode toggle 元件
- 更新 Tailwind 設定支援 dark: 前綴
- 所有元件已支援深色模式

Closes #123
```

## 常見問題

### Q: 如何新增新的色彩轉換函式？

A:

1. 在 `src/utils/colorUtils.ts` 中實作函式
2. 補充 JSDoc 與 @fileoverview
3. 在 `src/utils/__tests__/colorUtils.test.ts` 新增測試
4. 更新 README 的 API 文檔

### Q: 如何優化色彩匹配速度？

A:

- 已使用 RGB 空間（比 OKLCH 更快）
- Tailwind 色彩表預計算，避免重複
- 考慮使用 WebWorker 進行複雜計算

### Q: 支援哪些瀏覽器？

A: Chrome/Edge 90+、Firefox 88+、Safari 14+

## 相關資源

- [Tailwind CSS 文檔](https://tailwindcss.com/)
- [OKLCH 色彩空間](https://oklch.com/)
- [React 官方文檔](https://react.dev/)
- [TypeScript 手冊](https://www.typescriptlang.org/docs/)
