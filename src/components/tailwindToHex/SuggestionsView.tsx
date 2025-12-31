import { memo } from 'react';
import { TailwindColor } from '@/types';

interface SuggestionsViewProps {
  suggestions: TailwindColor[];
  onSelect: (value: string) => void;
}

const SuggestionsView = memo<SuggestionsViewProps>(({ suggestions, onSelect }) => (
  <div className="mx-auto max-w-4xl">
    <h2 className="text-muted mb-3 text-sm font-semibold tracking-wider uppercase">Suggestions</h2>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {suggestions.map((s) => (
        <button
          key={s.class}
          onClick={() => onSelect(s.class)}
          className="border-border bg-background-secondary hover:bg-border flex flex-col items-center gap-2 rounded-lg border p-3 transition-all hover:border-pink-500/50"
        >
          <div className="h-8 w-full rounded" style={{ backgroundColor: s.hex }} />
          <span className="text-secondaryText font-mono text-xs">{s.class}</span>
        </button>
      ))}
    </div>
  </div>
));

SuggestionsView.displayName = 'SuggestionsView';
export default SuggestionsView;
