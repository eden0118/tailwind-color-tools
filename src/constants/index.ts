export { COLORS, DEFAULT_COLOR } from './colors';

// UI Constants
export const DEFAULT_MATCH_LIMIT = 5;
export const SUGGESTION_LIMIT = 12;
export const COPY_FEEDBACK_DURATION = 2000; // ms

// Regex Patterns
export const HEX_PATTERN = /^#?([a-f\d]{3}|[a-f\d]{6})$/i;
export const RGB_PATTERN =
  /^(?:rgba?\(?)?\s*(\d{1,3})[,\s]+\s*(\d{1,3})[,\s]+\s*(\d{1,3})(?:[,\s/]+\s*[\d\.]+)?\)?$/;
export const OKLCH_PATTERN =
  /^oklch\(\s*([\d.]+%?)\s+[,\/]?\s*([\d.]+)\s+[,\/]?\s*([\d.]+)(?:\s*\/.*)?\s*\)$/;
