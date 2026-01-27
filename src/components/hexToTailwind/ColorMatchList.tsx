import { memo } from 'react';
import ColorCard from '@/components/ColorCard';
import SectionDivider from './SectionDivider';
import { ColorMatch } from '@/types';

interface ColorMatchListProps {
  matches: ColorMatch[];
}

const ColorMatchList = memo<ColorMatchListProps>(({ matches }) => (
  <div className="space-y-4">
    <SectionDivider label="Closest Matches" />
    <div className="space-y-3">
      {matches.map((match, index) => (
        <div
          key={match.class}
          className="animate-fade-in-up opacity-0"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <ColorCard color={match} isClosest={index === 0} />
        </div>
      ))}
    </div>
  </div>
));

ColorMatchList.displayName = 'ColorMatchList';
export default ColorMatchList;
