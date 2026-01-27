import { memo, useState } from 'react';
import { TailwindColor } from '@/types';
import { SUGGESTION_LIMIT } from '@/constants';

/**
 * @fileoverview
 * SuggestionsView - Display matching Tailwind colors with expand/collapse functionality
 *
 * Responsibilities:
 * - Show paginated list of color suggestions (default limit: 12)
 * - Provide "Show More" button to expand all results
 * - Handle expand/collapse state with smooth transitions
 * - Allow selection of color by clicking on color card
 */
interface SuggestionsViewProps {
  suggestions: TailwindColor[];
  onSelect: (value: string) => void;
}

const SuggestionsView = memo<SuggestionsViewProps>(({ suggestions, onSelect }) => {
  // State for expand/collapse functionality
  const [isExpanded, setIsExpanded] = useState(false);

  // Display count based on expanded state
  const displayCount = isExpanded ? suggestions.length : SUGGESTION_LIMIT;
  const displayedSuggestions = suggestions.slice(0, displayCount);
  const hasMore = suggestions.length > SUGGESTION_LIMIT;

  return (
    <div className="mx-auto max-w-4xl">
      {/* Section title */}
      <h2 className="text-muted mb-3 text-sm font-semibold tracking-wider uppercase">
        Suggestions
      </h2>

      {/* Color suggestion grid - shows paginated results */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {displayedSuggestions.map((s, index) => (
          <button
            key={s.class}
            onClick={() => onSelect(s.class)}
            className="border-muted animate-scale-in hover:border-accent flex flex-col items-center gap-2 rounded-lg border bg-gray-950/5 p-3 opacity-0 transition-all hover:bg-white/5"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Color preview rectangle */}
            <div
              className="h-8 w-full rounded shadow-lg shadow-white/5"
              style={{ backgroundColor: s.hex }}
            />
            {/* Color class name label */}
            <span className="text-secondaryText font-mono text-xs">{s.class}</span>
          </button>
        ))}
      </div>

      {/* Show More / Show Less button - appears when results exceed limit */}
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
