/**
 * @fileoverview
 * ExactMatchView - Display exact Tailwind color match found by search
 *
 * Responsibilities:
 * - Show when a precise match for the searched Tailwind class is found
 * - Display color card with complete color information
 * - Highlight as the primary result with animation
 */
import { memo } from 'react';
import { TailwindColor } from '@/types';
import ColorCard from '@/components/ColorCard';

interface ExactMatchViewProps {
  match: TailwindColor;
}

// Display exact match result with fade-in animation
const ExactMatchView = memo<ExactMatchViewProps>(({ match }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-3xl duration-500">
    {/* Section header */}
    <h2 className="text-muted mb-3 text-sm font-semibold tracking-wider uppercase">Exact Match</h2>
    {/* Color card displaying the matched Tailwind color */}
    <ColorCard color={match} />
  </div>
));

ExactMatchView.displayName = 'ExactMatchView';
export default ExactMatchView;
