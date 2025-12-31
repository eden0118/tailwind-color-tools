import { memo } from 'react';
import { TailwindColor } from '@/types';
import ColorFamily from './ColorFamily';

interface PaletteViewProps {
  colorGroups: Record<string, TailwindColor[]>;
  onSelectColor: (colorClass: string) => void;
}

const PaletteView = memo<PaletteViewProps>(({ colorGroups, onSelectColor }) => (
  <div className="animate-in fade-in duration-700">
    <div className="mb-6 flex items-center gap-4">
      <div className="bg-background-secondary h-px flex-1"></div>
      <span className="text-text-muted text-sm font-medium tracking-widest uppercase">
        Full Tailwind Palette
      </span>
      <div className="bg-background-secondary h-px flex-1"></div>
    </div>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Object.entries(colorGroups).map(([family, colors]) => (
        <ColorFamily key={family} name={family} colors={colors} onSelectColor={onSelectColor} />
      ))}
    </div>
  </div>
));

PaletteView.displayName = 'PaletteView';
export default PaletteView;
