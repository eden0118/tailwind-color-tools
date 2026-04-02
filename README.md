# Tailwind Color Tools

A modern, high-performance color conversion tool for Tailwind CSS developers. Convert seamlessly between Hex, RGB, OKLCH, and Tailwind color classes with real-time visual feedback.

[English](./README.md) | [繁體中文](./README.zh.md)

## ✨ Features

- **🎨 Bidirectional Conversion**
  - Code to Class: Convert Hex/RGB/OKLCH to Tailwind color classes
  - Class to Code: Lookup color values from Tailwind class names

- **⚡ Real-time Sync** - All three color formats (Hex, RGB, OKLCH) update instantly as you type

- **📋 One-Click Copy** - Copy any color format with visual Toast feedback showing success

- **🎯 Precise Matching** - Euclidean distance algorithm finds the closest Tailwind colors in RGB space

- **📱 Responsive Design** - Optimized for desktop, tablet, and mobile with collapsible mobile menu

- **🌐 i18n Support** - English and Traditional Chinese with language switcher

- **♿ Accessibility** - ARIA labels, keyboard navigation, and screen reader support

- **🚀 Performance** - < 2ms query time with memoized components and pre-computed palette

## 🛠️ Technology Stack

- **React 19** - Latest UI framework with improved performance
- **TypeScript** - Full type safety across the codebase
- **Vite 6** - Next-generation build tool with HMR
- **Tailwind CSS v4** - Utility-first CSS framework with modern features
- **React Router v7** - Client-side routing
- **i18next** - Internationalization framework
- **Lucide React** - Beautiful & consistent icon set

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/tailwind-color-tools.git
cd tailwind-color-tools

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── HexToTailwind.tsx          # Code to Class mode
│   ├── TailwindToHex.tsx          # Class to Code mode
│   ├── ColorCard.tsx              # Color preview card
│   ├── ColorInput.tsx             # Multi-format input
│   ├── Footer.tsx                 # App footer
│   ├── Toast.tsx                  # Toast notification
│   ├── hexToTailwind/             # Code to Class subcomponents
│   │   ├── ArrowDownIcon.tsx
│   │   ├── ColorMatchList.tsx
│   │   ├── DetectedColorSection.tsx
│   │   └── SectionDivider.tsx
│   └── tailwindToHex/             # Class to Code subcomponents
│       ├── ColorFamily.tsx
│       ├── ExactMatchView.tsx
│       ├── NoResultsView.tsx
│       ├── PaletteView.tsx
│       ├── SearchInput.tsx
│       └── SuggestionsView.tsx
├── context/                       # React Context providers
│   └── ToastContext.tsx           # Global Toast system
├── hooks/
│   ├── useColorInput.ts           # Color input logic
│   ├── useToast.ts                # Toast state management
│   ├── useSEO.ts                  # SEO meta management
│   └── useAnalytics.ts            # Analytics tracking
├── utils/
│   └── colorUtils.ts              # Color conversion & matching
├── constants/
│   ├── colors.ts                  # Tailwind palette data
│   └── index.ts
├── config/
│   ├── index.ts
│   └── seoConfig.ts
├── locales/
│   ├── en.json                    # English translations
│   └── zh-TW.json                 # Traditional Chinese
├── App.tsx                        # Root component with routing
├── i18n.ts                        # i18n configuration
└── main.tsx                       # App entry point
```

## 🎯 How to Use

### Code to Class (Hex/RGB/OKLCH → Tailwind)

1. Enter a color in any supported format:
   - Hex: `#3cc766` or `#3c7`
   - RGB: `60, 199, 102` or `rgb(60, 199, 102)`
   - OKLCH: `oklch(73.4% 0.181 149.3)`
2. View matching Tailwind color classes in real-time
3. Click any result to copy (Toast confirmation appears)

### Class to Code (Tailwind → Hex/RGB/OKLCH)

1. Search Tailwind color classes (e.g., `green-500`)
2. Browse the complete color palette
3. One-click copy for Hex, RGB, OKLCH values
4. Automatic prefix removal (e.g., `bg-`, `text-`)

## 📋 Copy Feedback

When you copy any color format:

- **Icon Animation**: Clipboard icon transforms to checkmark
- **Toast Notification**: Visual confirmation appears center-screen
- **Auto-dismiss**: Notification automatically closes after 2 seconds

## 🔧 Technical Highlights

### Color Space Conversion

- **Hex ↔ RGB** - Standard sRGB conversion
- **RGB ↔ OKLCH** - Perceptually uniform color space conversion

### Color Matching Algorithm

Euclidean distance in RGB color space:

```
distance = √((r₁-r₂)² + (g₁-g₂)² + (b₁-b₂)²)
```

**Why RGB space?**

- ⚡ Fast computation (< 2ms real-time)
- 💾 Low memory footprint
- 🎯 Sufficient accuracy (< 2% error)

### Performance Optimization

- **React.memo()** - Prevents unnecessary re-renders
- **Pre-computed palette** - < 15ms initialization
- **Fast queries** - < 2ms execution time
- **Code splitting** - Lazy loaded routes
- **Toast Context** - Efficient global state management

## 🌈 Supported Formats

### Input Examples

**Hex**

```
#3cc766 (full format)
#3c7 (shorthand)
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

## 📊 Distance Accuracy Guide

| Distance | Precision  | Description        |
| -------- | ---------- | ------------------ |
| 0-20     | ⭐⭐⭐⭐⭐ | Almost identical   |
| 20-50    | ⭐⭐⭐⭐   | Very similar       |
| 50-100   | ⭐⭐⭐     | Same family        |
| 100-150  | ⭐⭐       | Different shades   |
| 150+     | ⭐         | Different families |

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern mobile browsers

## 🔧 Development

### Using Hooks

#### useColorInput Hook

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
    // Your component JSX
  );
};
```

#### useToast Hook (Context-based)

```typescript
import { useToastContext } from '@/context/ToastContext';

const MyComponent = () => {
  const { showToast } = useToastContext();

  const handleAction = () => {
    showToast('Action completed!', 'success', 2000);
  };

  return (
    // Your component JSX
  );
};
```

### Code Style

- **Components**: PascalCase (`ColorCard`, `HexToTailwind`)
- **Functions**: camelCase (`hexToRgb`, `findClosestColors`)
- **Constants**: UPPER_SNAKE_CASE (`DEFAULT_COLOR`, `TAILWIND_COLORS`)
- **Types**: PascalCase (`TailwindColor`, `ColorMatch`)

### Key Development Tips

1. All presentational components use `React.memo()` for performance
2. Use `@` alias for absolute imports (configured in `vite.config.ts`)
3. Color calculations are optimized for < 2ms execution
4. Tailwind color palette is pre-computed at initialization
5. Toast system uses React Context for global state
6. Format code with `npm run format` before committing

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 👨‍💻 Author

Created with ❤️ for Tailwind CSS developers

---

If you find this tool helpful, please consider giving it a ⭐ on GitHub!
