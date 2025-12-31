# Tailwind Color Master

A modern, high-performance Tailwind CSS color conversion tool that enables developers to seamlessly convert colors between Hex, RGB, OKLCH, and Tailwind color classes.

[English](./README.md) | [中文](./README.zh.md)

## Features

- **Hex to Tailwind** - Input any color code and automatically find the closest Tailwind color class
- **Tailwind to Hex** - Browse the complete Tailwind color palette and quickly lookup corresponding color values
- **Real-time Synchronization** - Three color formats synchronize in real-time as you type
- **Precise Matching** - Uses Euclidean distance algorithm in RGB color space to find the closest match
- **Responsive Design** - Perfect support for desktop, tablet, and mobile devices

## Technology Stack

- **React 19** - Modern UI framework
- **TypeScript** - Type-safe development experience
- **Vite 6** - Lightning-fast development server
- **Tailwind CSS v4** - Utility-first CSS framework
- **Lucide React** - Lightweight SVG icon library
- **Prettier** - Automatic code formatting

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Format code
npm run format
```

## Project Structure

```
src/
├── components/              # UI components
│   ├── App.tsx
│   ├── ColorCard.tsx       # Color information card
│   ├── ColorInput.tsx      # Multi-format color input
│   ├── HexToTailwind.tsx   # Hex → Tailwind conversion
│   ├── TailwindToHex.tsx   # Tailwind → Hex lookup
│   ├── Footer.tsx
│   ├── hexToTailwind/      # Sub-components
│   └── tailwindToHex/      # Sub-components
├── hooks/
│   └── useColorInput.ts    # Color synchronization hook
├── constants/
│   └── colors.ts           # Tailwind color palette
├── utils/
│   └── colorUtils.ts       # Color conversion algorithms
├── types.ts                # TypeScript type definitions
└── index.css               # Global styles
```

## Core Features

### Hex to Tailwind Conversion

1. Input any color format (Hex, RGB, OKLCH)
2. Real-time display of equivalent values in other formats
3. Automatically calculate and display the closest Tailwind colors
4. One-click copy for color codes and class names

### Tailwind to Hex Lookup

1. Search Tailwind color classes (e.g., `green-500`)
2. Browse the complete color palette
3. One-click copy for Hex, RGB, OKLCH values
4. Automatic prefix removal (e.g., `bg-`, `text-`)

## Technical Highlights

### Color Space Conversion

- **Hex ↔ RGB** - Standard sRGB conversion
- **RGB ↔ OKLCH** - Perceptually uniform color space conversion

### Color Matching Algorithm

Uses the **Euclidean distance algorithm** in RGB color space to find the closest color:

```
distance = sqrt((r₁-r₂)² + (g₁-g₂)² + (b₁-b₂)²)
```

**Why RGB?**

- Fast computation (real-time feedback < 2ms)
- Low precomputation cost
- Sufficient matching accuracy (RGB error < 2%)

### Performance Optimization

- Uses `React.memo()` to prevent unnecessary re-renders
- Pre-computes color palette (< 15ms)
- Real-time queries execute in < 2ms

## Supported Color Formats

### Input Formats

Hex

- `#3cc766` (full)
- `#3c7` (shorthand)

RGB

- `60, 199, 102`
- `rgb(60, 199, 102)`

OKLCH

- `oklch(73.4% 0.181 149.3)`

### Default Color

The application displays Green-500 (`#3cc766`) by default.

## Color Matching Precision

| Distance Range | Precision Level | Description                        |
| -------------- | --------------- | ---------------------------------- |
| 0-20           | Very High       | Almost identical                   |
| 20-50          | High            | Very close                         |
| 50-100         | Medium          | Same color family with differences |
| 100-150        | Low             | Different shades                   |
| 150+           | Very Low        | Different color families           |

## Supported Browsers

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Using useColorInput Hook

```typescript
const {
  hexInput, // Hex format input
  rgbInput, // RGB format input
  oklchInput, // OKLCH format input
  parsedColor, // Parsed color object
  matches, // List of closest colors
  setHexInput, // Update Hex input
  setRgbInput, // Update RGB input
  setOklchInput, // Update OKLCH input
} = useColorInput(defaultColor);
```

## Code Style Guide

- **Components**: PascalCase (ColorCard)
- **Functions**: camelCase (hexToRgb)
- **Constants**: UPPER_SNAKE_CASE (DEFAULT_COLOR)
- **Types**: PascalCase (TailwindColor)

## License

MIT License

---

Created with care for Tailwind CSS developers
