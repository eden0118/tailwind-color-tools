# Tailwind Color Master

一個實用的 Tailwind CSS 顏色工具，幫助開發者輕鬆在 Hex、RGB、OKLCH 和 Tailwind 顏色類別之間轉換。

## 功能特色

- **Hex to Tailwind**: 輸入任意顏色代碼（Hex、RGB、OKLCH），找到最接近的 Tailwind 顏色類別
- **Tailwind to Hex**: 瀏覽完整的 Tailwind 調色盤，快速查找顏色對應的 Hex 值

## 技術棧

- React 19
- TypeScript
- Vite 6
- Tailwind CSS v4
- Prettier + prettier-plugin-tailwindcss

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
tailwind-color-tools/
├── public/              # 靜態資源
├── src/
│   ├── components/      # React 組件
│   │   ├── ColorCard.tsx
│   │   ├── HexToTailwind.tsx
│   │   └── TailwindToHex.tsx
│   ├── utils/           # 工具函式
│   │   └── colorUtils.ts
│   ├── App.tsx          # 主應用組件
│   ├── main.tsx         # 應用入口
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
