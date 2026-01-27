/**
 * @fileoverview
 * ColorMatchList - Display list of closest matching Tailwind colors
 *
 * Responsibilities:
 * - Show all matching colors found for the input hex/RGB/OKLCH
 * - Highlight first match as the closest (most similar)
 * - Display each match with staggered animation
 * - Show color distance/difference information
 */
import { memo } from 'react';
import ColorCard from '@/components/ColorCard';
import SectionDivider from './SectionDivider';
import { ColorMatch } from '@/types';

interface ColorMatchListProps {
  matches: ColorMatch[];
}

// Display list of matching colors with animations
const ColorMatchList = memo<ColorMatchListProps>(({ matches }) => (
  <div className="space-y-4">
    {/* Section divider header */}
    <SectionDivider label="Closest Matches" />

    {/* List of matched colors with staggered animation */}
    <div className="space-y-3">
      {matches.map((match, index) => (
        <div
          key={match.class}
          className="animate-fade-in-up opacity-0"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Highlight first match as closest */}
          <ColorCard color={match} isClosest={index === 0} />
        </div>
      ))}
    </div>
  </div>
));

ColorMatchList.displayName = 'ColorMatchList';
export default ColorMatchList;
