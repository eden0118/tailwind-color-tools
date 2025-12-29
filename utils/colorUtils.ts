import { TailwindColor, ColorMatch } from '../types';

// Helper to convert Hex to RGB
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

// Helper to convert RGB to Hex
export const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (n: number) => {
    const hex = Math.max(0, Math.min(255, Math.round(n))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

// Helper to convert RGB to OKLCH string
export const rgbToOklch = (r: number, g: number, b: number): string => {
  // 1. sRGB to Linear sRGB
  const toLinear = (c: number) => {
      let val = c / 255;
      return (val > 0.04045) ? Math.pow((val + 0.055) / 1.055, 2.4) : val / 12.92;
  }
  let lr = toLinear(r);
  let lg = toLinear(g);
  let lb = toLinear(b);

  // 2. Linear sRGB to LMS
  let l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  let m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  let s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;

  // 3. Cube root (approximate cone response)
  let l_ = Math.cbrt(l);
  let m_ = Math.cbrt(m);
  let s_ = Math.cbrt(s);

  // 4. LMS to OKLab
  let L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
  let a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
  let b_ = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;

  // 5. OKLab to OKLCH
  let C = Math.sqrt(a * a + b_ * b_);
  let h = Math.atan2(b_, a) * (180 / Math.PI);
  if (h < 0) h += 360;

  // Format
  // L is 0-1, formatted as percentage
  const L_perc = parseFloat((L * 100).toFixed(2)) + '%';
  // C is typically 0-0.4
  const C_val = parseFloat(C.toFixed(3));
  // H is 0-360
  const h_val = parseFloat(h.toFixed(2));

  // Handle almost black/white or achromatic
  if (L < 0.0001) return "oklch(0% 0 0)";
  if (C < 0.0001) return `oklch(${L_perc} 0 0)`;
  
  return `oklch(${L_perc} ${C_val} ${h_val})`;
};

// Helper: OKLCH to RGB
export const oklchToRgb = (l: number, c: number, h: number): { r: number; g: number; b: number } => {
  // L [0..1], C [0..~0.4], H [0..360]

  // 1. OKLCH -> OKLab
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);

  // 2. OKLab -> LMS' (approximate inverse of LMS -> OKLab matrix)
  // Using the inverse matrix from standard OKLab implementations
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.2914855480 * b;

  // 3. LMS' -> LMS (cube)
  const l3 = l_ * l_ * l_;
  const m3 = m_ * m_ * m_;
  const s3 = s_ * s_ * s_;

  // 4. LMS -> Linear sRGB
  const rLin = +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  const gLin = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  const bLin = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.7076147010 * s3;

  // 5. Linear sRGB -> sRGB (Gamma correction)
  const toSrgb = (val: number) => {
    const v = val > 0.0031308 ? 1.055 * Math.pow(val, 1 / 2.4) - 0.055 : 12.92 * val;
    return Math.max(0, Math.min(255, Math.round(v * 255)));
  };

  return {
    r: toSrgb(rLin),
    g: toSrgb(gLin),
    b: toSrgb(bLin),
  };
};

export const parseHex = (input: string): string | null => {
  const clean = input.trim().toLowerCase();
  if (/^#?([0-9a-f]{3}|[0-9a-f]{6})$/.test(clean)) {
    const rgb = hexToRgb(clean);
    return rgb ? rgbToHex(rgb.r, rgb.g, rgb.b) : null;
  }
  return null;
}

export const parseRgbString = (input: string): { r: number, g: number, b: number } | null => {
  const clean = input.trim().toLowerCase();
  const rgbRegex = /^(?:rgba?\(?)?\s*(\d{1,3})[,\s]+\s*(\d{1,3})[,\s]+\s*(\d{1,3})(?:[,\s/]+\s*[\d\.]+)?\)?$/;
  const match = rgbRegex.exec(clean);
  if (match) {
    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);
    if (r <= 255 && g <= 255 && b <= 255) {
       return { r, g, b };
    }
  }
  return null;
}

export const parseOklchString = (input: string): { l: number; c: number; h: number } | null => {
    const clean = input.trim().toLowerCase();
    // Support oklch(L C H) or oklch(L% C H) with space or comma separators
    const regex = /^oklch\(\s*([\d.]+%?)\s+[,\/]?\s*([\d.]+)\s+[,\/]?\s*([\d.]+)(?:\s*\/.*)?\s*\)$/;
    
    const match = regex.exec(clean);
    if (!match) return null;

    let lStr = match[1];
    let c = parseFloat(match[2]);
    let h = parseFloat(match[3]);
    
    let l = parseFloat(lStr);
    if (lStr.endsWith('%')) {
        l = l / 100;
    }
    
    return { l, c, h };
}

// Helper to parse Hex or RGB/RGBA input (Legacy wrapper)
export const parseColor = (input: string): { hex: string; rgb: { r: number; g: number; b: number } } | null => {
  const hex = parseHex(input);
  if (hex) {
    const rgb = hexToRgb(hex);
    if (rgb) return { hex, rgb };
  }

  const rgb = parseRgbString(input);
  if (rgb) {
    return { hex: rgbToHex(rgb.r, rgb.g, rgb.b), rgb };
  }
  
  const oklch = parseOklchString(input);
  if (oklch) {
      const rgbVal = oklchToRgb(oklch.l, oklch.c, oklch.h);
      return { hex: rgbToHex(rgbVal.r, rgbVal.g, rgbVal.b), rgb: rgbVal };
  }

  return null;
};

// Helper to calculate Euclidean distance between two colors
const getDistance = (
  rgb1: { r: number; g: number; b: number },
  rgb2: { r: number; g: number; b: number }
): number => {
  return Math.sqrt(
    Math.pow(rgb1.r - rgb2.r, 2) +
    Math.pow(rgb1.g - rgb2.g, 2) +
    Math.pow(rgb1.b - rgb2.b, 2)
  );
};

// Flattened Tailwind Palette (Standard v3)
const COLORS: Record<string, string> = {
  // Base
  'white': '#ffffff',
  'black': '#000000',
  // Slate
  'slate-50': '#f8fafc', 'slate-100': '#f1f5f9', 'slate-200': '#e2e8f0', 'slate-300': '#cbd5e1', 'slate-400': '#94a3b8',
  'slate-500': '#64748b', 'slate-600': '#475569', 'slate-700': '#334155', 'slate-800': '#1e293b', 'slate-900': '#0f172a', 'slate-950': '#020617',
  // Gray
  'gray-50': '#f9fafb', 'gray-100': '#f3f4f6', 'gray-200': '#e5e7eb', 'gray-300': '#d1d5db', 'gray-400': '#9ca3af',
  'gray-500': '#6b7280', 'gray-600': '#4b5563', 'gray-700': '#374151', 'gray-800': '#1f2937', 'gray-900': '#111827', 'gray-950': '#030712',
  // Zinc
  'zinc-50': '#fafafa', 'zinc-100': '#f4f4f5', 'zinc-200': '#e4e4e7', 'zinc-300': '#d4d4d8', 'zinc-400': '#a1a1aa',
  'zinc-500': '#71717a', 'zinc-600': '#52525b', 'zinc-700': '#3f3f46', 'zinc-800': '#27272a', 'zinc-900': '#18181b', 'zinc-950': '#09090b',
  // Neutral
  'neutral-50': '#fafafa', 'neutral-100': '#f5f5f5', 'neutral-200': '#e5e5e5', 'neutral-300': '#d4d4d4', 'neutral-400': '#a3a3a3',
  'neutral-500': '#737373', 'neutral-600': '#525252', 'neutral-700': '#404040', 'neutral-800': '#262626', 'neutral-900': '#171717', 'neutral-950': '#0a0a0a',
  // Stone
  'stone-50': '#fafaf9', 'stone-100': '#f5f5f4', 'stone-200': '#e7e5e4', 'stone-300': '#d6d3d1', 'stone-400': '#a8a29e',
  'stone-500': '#78716c', 'stone-600': '#57534e', 'stone-700': '#44403c', 'stone-800': '#292524', 'stone-900': '#1c1917', 'stone-950': '#0c0a09',
  // Red
  'red-50': '#fef2f2', 'red-100': '#fee2e2', 'red-200': '#fecaca', 'red-300': '#fca5a5', 'red-400': '#f87171',
  'red-500': '#ef4444', 'red-600': '#dc2626', 'red-700': '#b91c1c', 'red-800': '#991b1b', 'red-900': '#7f1d1d', 'red-950': '#450a0a',
  // Orange
  'orange-50': '#fff7ed', 'orange-100': '#ffedd5', 'orange-200': '#fed7aa', 'orange-300': '#fdba74', 'orange-400': '#fb923c',
  'orange-500': '#f97316', 'orange-600': '#ea580c', 'orange-700': '#c2410c', 'orange-800': '#9a3412', 'orange-900': '#7c2d12', 'orange-950': '#431407',
  // Amber
  'amber-50': '#fffbeb', 'amber-100': '#fef3c7', 'amber-200': '#fde68a', 'amber-300': '#fcd34d', 'amber-400': '#fbbf24',
  'amber-500': '#f59e0b', 'amber-600': '#d97706', 'amber-700': '#b45309', 'amber-800': '#92400e', 'amber-900': '#78350f', 'amber-950': '#451a03',
  // Yellow
  'yellow-50': '#fefce8', 'yellow-100': '#fef9c3', 'yellow-200': '#fef08a', 'yellow-300': '#fde047', 'yellow-400': '#facc15',
  'yellow-500': '#eab308', 'yellow-600': '#ca8a04', 'yellow-700': '#a16207', 'yellow-800': '#854d0e', 'yellow-900': '#713f12', 'yellow-950': '#422006',
  // Lime
  'lime-50': '#f7fee7', 'lime-100': '#ecfccb', 'lime-200': '#d9f99d', 'lime-300': '#bef264', 'lime-400': '#a3e635',
  'lime-500': '#84cc16', 'lime-600': '#65a30d', 'lime-700': '#4d7c0f', 'lime-800': '#3f6212', 'lime-900': '#365314', 'lime-950': '#1a2e05',
  // Green
  'green-50': '#f0fdf4', 'green-100': '#dcfce7', 'green-200': '#bbf7d0', 'green-300': '#86efac', 'green-400': '#4ade80',
  'green-500': '#22c55e', 'green-600': '#16a34a', 'green-700': '#15803d', 'green-800': '#166534', 'green-900': '#14532d', 'green-950': '#052e16',
  // Emerald
  'emerald-50': '#ecfdf5', 'emerald-100': '#d1fae5', 'emerald-200': '#a7f3d0', 'emerald-300': '#6ee7b7', 'emerald-400': '#34d399',
  'emerald-500': '#10b981', 'emerald-600': '#059669', 'emerald-700': '#047857', 'emerald-800': '#065f46', 'emerald-900': '#064e3b', 'emerald-950': '#022c22',
  // Teal
  'teal-50': '#f0fdfa', 'teal-100': '#ccfbf1', 'teal-200': '#99f6e4', 'teal-300': '#5eead4', 'teal-400': '#2dd4bf',
  'teal-500': '#14b8a6', 'teal-600': '#0d9488', 'teal-700': '#0f766e', 'teal-800': '#115e59', 'teal-900': '#134e4a', 'teal-950': '#042f2e',
  // Cyan
  'cyan-50': '#ecfeff', 'cyan-100': '#cffafe', 'cyan-200': '#a5f3fc', 'cyan-300': '#67e8f9', 'cyan-400': '#22d3ee',
  'cyan-500': '#06b6d4', 'cyan-600': '#0891b2', 'cyan-700': '#0e7490', 'cyan-800': '#155f75', 'cyan-900': '#164e63', 'cyan-950': '#083344',
  // Sky
  'sky-50': '#f0f9ff', 'sky-100': '#e0f2fe', 'sky-200': '#bae6fd', 'sky-300': '#7dd3fc', 'sky-400': '#38bdf8',
  'sky-500': '#0ea5e9', 'sky-600': '#0284c7', 'sky-700': '#0369a1', 'sky-800': '#075985', 'sky-900': '#0c4a6e', 'sky-950': '#082f49',
  // Blue
  'blue-50': '#eff6ff', 'blue-100': '#dbeafe', 'blue-200': '#bfdbfe', 'blue-300': '#93c5fd', 'blue-400': '#60a5fa',
  'blue-500': '#3b82f6', 'blue-600': '#2563eb', 'blue-700': '#1d4ed8', 'blue-800': '#1e40af', 'blue-900': '#1e3a8a', 'blue-950': '#172554',
  // Indigo
  'indigo-50': '#eef2ff', 'indigo-100': '#e0e7ff', 'indigo-200': '#c7d2fe', 'indigo-300': '#a5b4fc', 'indigo-400': '#818cf8',
  'indigo-500': '#6366f1', 'indigo-600': '#4f46e5', 'indigo-700': '#4338ca', 'indigo-800': '#3730a3', 'indigo-900': '#312e81', 'indigo-950': '#1e1b4b',
  // Violet
  'violet-50': '#f5f3ff', 'violet-100': '#ede9fe', 'violet-200': '#ddd6fe', 'violet-300': '#c4b5fd', 'violet-400': '#a78bfa',
  'violet-500': '#8b5cf6', 'violet-600': '#7c3aed', 'violet-700': '#6d28d9', 'violet-800': '#5b21b6', 'violet-900': '#4c1d95', 'violet-950': '#2e1065',
  // Purple
  'purple-50': '#faf5ff', 'purple-100': '#f3e8ff', 'purple-200': '#e9d5ff', 'purple-300': '#d8b4fe', 'purple-400': '#c084fc',
  'purple-500': '#a855f7', 'purple-600': '#9333ea', 'purple-700': '#7e22ce', 'purple-800': '#6b21a8', 'purple-900': '#581c87', 'purple-950': '#3b0764',
  // Fuchsia
  'fuchsia-50': '#fdf4ff', 'fuchsia-100': '#fae8ff', 'fuchsia-200': '#f5d0fe', 'fuchsia-300': '#f0abfc', 'fuchsia-400': '#e879f9',
  'fuchsia-500': '#d946ef', 'fuchsia-600': '#c026d3', 'fuchsia-700': '#a21caf', 'fuchsia-800': '#86198f', 'fuchsia-900': '#701a75', 'fuchsia-950': '#4a044e',
  // Pink
  'pink-50': '#fdf2f8', 'pink-100': '#fce7f3', 'pink-200': '#fbcfe8', 'pink-300': '#f9a8d4', 'pink-400': '#f472b6',
  'pink-500': '#ec4899', 'pink-600': '#db2777', 'pink-700': '#be185d', 'pink-800': '#9d174d', 'pink-900': '#831843', 'pink-950': '#500724',
  // Rose
  'rose-50': '#fff1f2', 'rose-100': '#ffe4e6', 'rose-200': '#fecdd3', 'rose-300': '#fda4af', 'rose-400': '#fb7185',
  'rose-500': '#f43f5e', 'rose-600': '#e11d48', 'rose-700': '#be123c', 'rose-800': '#9f1239', 'rose-900': '#881337', 'rose-950': '#4c0519',
};

// Convert the record to an array of TailwindColor objects for searching
export const ALL_TAILWIND_COLORS: TailwindColor[] = Object.entries(COLORS).map(([name, hex]) => {
  const rgb = hexToRgb(hex);
  if (!rgb) throw new Error(`Invalid hex in palette: ${hex}`);
  return {
    class: name,
    hex,
    rgb,
  };
});

// Find Closest Tailwind Colors
export const findClosestTailwindColors = (inputHex: string, limit = 5): ColorMatch[] => {
  const inputRgb = hexToRgb(inputHex);
  if (!inputRgb) return [];

  const matches: ColorMatch[] = ALL_TAILWIND_COLORS.map((tc) => ({
    ...tc,
    distance: getDistance(inputRgb, tc.rgb),
  }));

  // Sort by distance (ascending)
  matches.sort((a, b) => a.distance - b.distance);

  return matches.slice(0, limit);
};

// Find Hex by Class
export const findHexByClass = (className: string): TailwindColor | undefined => {
  // Normalize input (remove 'bg-', 'text-', etc. if user added them, though the prompt implies inputting just class names or color names)
  // Let's assume input is like 'blue-500' or 'bg-blue-500'.
  const cleanClass = className.replace(/^(bg|text|border|ring)-/, '');
  return ALL_TAILWIND_COLORS.find((tc) => tc.class === cleanClass);
};