import { memo, useState } from 'react';
import { TailwindColor } from '@/types';
import { SUGGESTION_LIMIT } from '@/constants';

interface SuggestionsViewProps {
  suggestions: TailwindColor[];
  onSelect: (value: string) => void;
}

const SuggestionsView = memo<SuggestionsViewProps>(({ suggestions, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayCount = isExpanded ? suggestions.length : SUGGESTION_LIMIT;
  const displayedSuggestions = suggestions.slice(0, displayCount);
  const hasMore = suggestions.length > SUGGESTION_LIMIT;

  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="text-muted mb-3 text-sm font-semibold tracking-wider uppercase">
        Suggestions
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {displayedSuggestions.map((s, index) => (
          <button
            key={s.class}
            onClick={() => onSelect(s.class)}
            className="border-border bg-background-secondary hover:bg-border animate-scale-in hover:border-accent flex flex-col items-center gap-2 rounded-lg border p-3 opacity-0 transition-all"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="h-8 w-full rounded" style={{ backgroundColor: s.hex }} />
            <span className="text-secondaryText font-mono text-xs">{s.class}</span>
          </button>
        ))}
      </div>
      {hasMore && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary hover:text-accent px-4 py-2 text-sm font-semibold transition-colors"
          >
            {isExpanded ? 'Show Less' : `Show More (${suggestions.length - SUGGESTION_LIMIT} more)`}
          </button>
        </div>
      )}
    </div>
  );
});

SuggestionsView.displayName = 'SuggestionsView';
export default SuggestionsView;
