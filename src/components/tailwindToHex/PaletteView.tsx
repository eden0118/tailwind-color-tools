/**
 * @fileoverview
 * PaletteView - Display complete Tailwind color palette organized by color families
 *
 * Responsibilities:
 * - Show all available Tailwind colors when no search query is active
 * - Group colors by family (slate, red, blue, etc.)
 * - Allow user to select any color to populate search input
 * - Provide visual overview of entire Tailwind color system
 */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { TailwindColor } from '@/types';
import ColorFamily from './ColorFamily';

interface PaletteViewProps {
  colorGroups: Record<string, TailwindColor[]>;
  onSelectColor: (colorClass: string) => void;
}

// Display full Tailwind palette organized by color families
const PaletteView = memo<PaletteViewProps>(({ colorGroups, onSelectColor }) => {
  const { t } = useTranslation();

  return (
    <div className="animate-in fade-in duration-700">
      {/* Section divider header */}
      <div className="mb-6 flex items-center gap-4">
        <div className="bg-background-secondary h-px flex-1"></div>
        <span className="text-muted text-sm font-medium tracking-widest uppercase">
          {t('tailwindToHex.palette')}
        </span>
        <div className="bg-background-secondary h-px flex-1"></div>
      </div>

      {/* Grid of color families */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(colorGroups).map(([family, colors]) => (
          <ColorFamily key={family} name={family} colors={colors} onSelectColor={onSelectColor} />
        ))}
      </div>
    </div>
  );
});

PaletteView.displayName = 'PaletteView';
export default PaletteView;
