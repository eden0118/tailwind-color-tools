# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Toast Notification System** - Added visual feedback when copying colors
  - Global Toast provider for consistent notifications across the app
  - Toast component displays in center of screen with smooth animations
  - Supports success and error notification types
  - Automatic dismissal after configurable duration
  - New `useToast` Hook for managing toast state
  - New `ToastContext` for global toast accessibility
  - Smooth `animate-fade-in-scale` animation for toast appearance

### Changed

- Enhanced `ColorCard` component to show Toast notifications on copy
- Updated copy feedback to combine icon animation + toast message
- Improved user experience with more prominent copy success indication

### Technical

- New components: `Toast.tsx`
- New hooks: `useToast.ts`
- New context: `ToastContext.tsx`
- Updated CSS animations in `index.css` with `animate-fade-in-scale`

---

## [1.0.0] - 2026-03-XX

### Added

- Initial release
- Bidirectional color conversion (Hex/RGB/OKLCH ↔ Tailwind CSS)
- Real-time color format sync
- Color matching algorithm using Euclidean distance
- Responsive design for desktop, tablet, and mobile
- Internationalization support (English, Traditional Chinese)
- Full accessibility support with ARIA labels
- One-click copy functionality for color values
- Color palette browser
- Exact and fuzzy color matching
- Performance optimized with React.memo and pre-computed palette

[Unreleased]: https://github.com/eden/tailwind-color-tools/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/eden/tailwind-color-tools/releases/tag/v1.0.0
