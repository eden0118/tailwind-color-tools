# Color Converter

A modern, high-performance Tailwind CSS color conversion tool that enables developers to seamlessly convert colors between Hex, RGB, OKLCH, and Tailwind color classes.

[English](./README.md) | [中文](./README.zh.md)

## Features

- **Code to Class** - Input any color code (Hex, RGB, OKLCH) and automatically find the closest Tailwind color class
- **Class to Code** - Browse the complete Tailwind color palette and quickly lookup corresponding color values
- **Real-time Synchronization** - Three color formats synchronize in real-time as you type
- **Precise Matching** - Uses Euclidean distance algorithm in RGB color space to find the closest match
- **Responsive Design** - Perfect support for desktop, tablet, and mobile devices
- **Mode Switching** - Easy toggle between conversion modes with icon-based navigation

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
├── components/
│   ├── App.tsx                      # Main application with mode switching
│   ├── ColorCard.tsx                # Color information display
│   ├── ColorInput.tsx               # Multi-format color input
│   ├── HexToTailwind.tsx            # Code to Class conversion
│   ├── TailwindToHex.tsx            # Class to Code lookup
│   ├── Footer.tsx                   # Footer section
│   ├── hexToTailwind/
│   │   ├── ColorMatchList.tsx       # List of matching colors
│   │   ├── DetectedColorSection.tsx # Detected color display
│   │   ├── SectionDivider.tsx       # Visual separator
│   │   └── ArrowDownIcon.tsx        # Arrow icon
│   └── tailwindToHex/
│       ├── ColorFamily.tsx          # Color family group
│       ├── ExactMatchView.tsx       # Exact color match display
│       ├── NoResultsView.tsx        # No results message
│       ├── PaletteView.tsx          # Full palette view
│       ├── SearchInput.tsx          # Search functionality
│       └── SuggestionsView.tsx      # Color suggestions
├── hooks/
│   ├── index.ts
│   Code to Class (Hex to Tailwind)

1. Input any color format (Hex, RGB, OKLCH)
2. Real-time display of equivalent values in other formats
3. Automatically calculate and display the closest Tailwind colors
4. One-click copy for color codes and class names

### Class to Code (Tailwind to Hex)

1. Search Tailwind color classes (e.g., `green-500`)
2. Browse the complete color palette by family
3. View exact matches and similar color suggestions
4. One-click copy for Hex, RGB, OKLCH values
5
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

````

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
const {, HexToTailwind)
- **Functions**: camelCase (hexToRgb, findClosestTailwindColors)
- **Constants**: UPPER_SNAKE_CASE (DEFAULT_COLOR)
- **Types**: PascalCase (TailwindColor, ColorMatch, AppMode)
- **Enums**: PascalCase with UPPER_SNAKE_CASE values (AppMode.HEX_TO_TAILWIND)

## Development Tips

- All components are wrapped with `React.memo()` for optimal performance
- Use the `@` alias for absolute imports (configured in `vite.config.ts`)
- Color calculations are optimized to run in < 2ms for real-time feedback
- The Tailwind color palette is pre-computed for fast lookups
  parsedColor, // Parsed color object
  matches, // List of closest colors
  setHexInput, // Update Hex input
  setRgbInput, // Update RGB input
  setOklchInput, // Update OKLCH input
} = useColorInput(defaultColor);
````

## Code Style Guide

- **Components**: PascalCase (ColorCard)
- **Functions**: camelCase (hexToRgb)
- **Constants**: UPPER_SNAKE_CASE (DEFAULT_COLOR)
- **Types**: PascalCase (TailwindColor)

## License

MIT License

---

Created with care for Tailwind CSS developers
